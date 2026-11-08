"use server"

import { db } from "@/db"
import { posts, postTags, postSlugHistory, tags, users } from "@/db/schema"
import { eq, inArray } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { can, type Role } from "@/lib/supabase/permissions"
import { z } from "zod"

const MAX_TAGS = 15
const MAX_TAG_LENGTH = 40

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

/**
 * Tag slugs keep letters and numbers from any language (so Arabic tags work),
 * unlike post slugs above.
 */
function tagSlugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function isPostgresError(
  error: unknown
): error is { code: string; message: string } {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof (error as { code: unknown }).code === "string"
  )
}

/**
 * Custom JSON-LD must be empty, or valid JSON (an object or an array),
 * with no <script> tags pasted in.
 */
function isValidJsonLd(value: string): boolean {
  if (!value) {
    return true
  }

  if (/<\/?script/i.test(value)) {
    return false
  }

  try {
    const parsed: unknown = JSON.parse(value)
    return typeof parsed === "object" && parsed !== null
  } catch {
    return false
  }
}

const postInputSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().optional().default(""),
  excerpt: z.string().optional().default(""),
  content: z.string().min(1, "Content is required"),
  featuredImage: z.string().optional().default(""),
  isFeatured: z.boolean().default(false),
  status: z.enum(["draft", "published", "scheduled"]),
  categoryId: z.string().uuid().nullable(),

  // Scheduling: an exact moment (ISO string) from the editor, turned into a Date
  scheduledAt: z
    .string()
    .nullable()
    .optional()
    .transform((value, ctx) => {
      if (!value) return null

      const date = new Date(value)

      if (Number.isNaN(date.getTime())) {
        ctx.addIssue({ code: "custom", message: "Invalid schedule date." })
        return z.NEVER
      }

      return date
    }),

  // Tags typed by the user for this post: cleaned, de-duplicated and capped
  tags: z
    .array(z.string())
    .default([])
    .transform((items) => {
      const seen = new Set<string>()
      const clean: { name: string; slug: string }[] = []

      for (const item of items) {
        const name = item.trim().replace(/\s+/g, " ").slice(0, MAX_TAG_LENGTH)
        const slug = tagSlugify(name)

        if (!name || !slug || seen.has(slug)) continue

        seen.add(slug)
        clean.push({ name, slug })

        if (clean.length >= MAX_TAGS) break
      }

      return clean
    }),

  // FAQs: trimmed, and empty items are dropped before saving
  faqs: z
    .array(
      z.object({
        question: z.string().max(300, "A FAQ question is too long"),
        answer: z.string().max(3000, "A FAQ answer is too long"),
      })
    )
    .max(30, "You can add up to 30 FAQs")
    .default([])
    .transform((items) =>
      items
        .map((faq) => ({
          question: faq.question.trim(),
          answer: faq.answer.trim(),
        }))
        .filter((faq) => faq.question && faq.answer)
    ),

  // SEO
  seoTitle: z.string().optional().default(""),
  metaDescription: z.string().optional().default(""),
  focusKeyphrase: z.string().optional().default(""),
  keyphraseDensity: z.number().min(0).max(100).default(0),
  canonicalUrl: z.string().optional().default(""),
  robotsIndex: z.string().default("index"),
  robotsFollow: z.string().default("follow"),
  breadcrumbTitle: z.string().optional().default(""),
  seoScore: z.number().min(0).max(100).default(0),
  readabilityScore: z.number().min(0).max(100).default(0),

  // Open Graph
  ogTitle: z.string().optional().default(""),
  ogDescription: z.string().optional().default(""),
  ogImage: z.string().optional().default(""),

  // Twitter
  twitterTitle: z.string().optional().default(""),
  twitterDescription: z.string().optional().default(""),
  twitterImage: z.string().optional().default(""),

  // Schema
  schemaType: z.string().default("BlogPosting"),
  customSchema: z
    .string()
    .max(50000, "Custom schema is too long")
    .optional()
    .default("")
    .transform((value) => value.trim())
    .refine(
      isValidJsonLd,
      "Custom schema must be valid JSON (an object or an array) with no <script> tags."
    ),
})

// The editor sends tags as plain names; the schema cleans them on the server.
export type PostInput = z.input<typeof postInputSchema>

type Caller = { id: string; role: Role }

type PostAccessInfo = {
  authorId: string | null
  status: string
}

type Tx = Parameters<Parameters<typeof db.transaction>[0]>[0]

/**
 * Returns the logged-in user with their CURRENT role from the database,
 * so a demoted or deleted user loses access immediately.
 */
async function getCaller(): Promise<Caller> {
  const session = await auth()
  const callerId = session?.user?.id

  if (!callerId) {
    throw new Error("Unauthorized")
  }

  const [caller] = await db
    .select({ id: users.id, role: users.role })
    .from(users)
    .where(eq(users.id, callerId))
    .limit(1)

  if (!caller) {
    throw new Error("Unauthorized")
  }

  return caller
}

/**
 * Editors and admins can edit any post.
 * Authors can edit only their own posts, and only while they are drafts.
 */
function canEditPost(caller: Caller, post: PostAccessInfo) {
  if (can(caller.role, "posts:edit:any")) {
    return true
  }

  return (
    can(caller.role, "posts:edit:own") &&
    post.authorId === caller.id &&
    post.status === "draft"
  )
}

/**
 * Editors and admins can delete any post.
 * Authors can delete only their own drafts.
 */
function canDeletePost(caller: Caller, post: PostAccessInfo) {
  if (can(caller.role, "posts:delete:any")) {
    return true
  }

  return (
    can(caller.role, "posts:delete:own") &&
    post.authorId === caller.id &&
    post.status === "draft"
  )
}

/**
 * A scheduled post needs a date in the future. Any other status
 * has no schedule, so the date is cleared.
 */
function resolveScheduledAt(
  status: string,
  scheduledAt: Date | null
): Date | null {
  if (status !== "scheduled") {
    return null
  }

  if (!scheduledAt) {
    throw new Error("Choose a date and time to schedule this post.")
  }

  if (scheduledAt.getTime() <= Date.now()) {
    throw new Error("The scheduled time must be in the future.")
  }

  return scheduledAt
}

/**
 * Turns the typed tag names into tag ids. Tags that don't exist yet are
 * created, and existing ones are reused by slug.
 */
async function resolveTagIds(
  tx: Tx,
  items: { name: string; slug: string }[]
): Promise<string[]> {
  if (items.length === 0) {
    return []
  }

  await tx
    .insert(tags)
    .values(items.map((t) => ({ name: t.name, slug: t.slug })))
    .onConflictDoNothing({ target: tags.slug })

  const rows = await tx
    .select({ id: tags.id })
    .from(tags)
    .where(
      inArray(
        tags.slug,
        items.map((t) => t.slug)
      )
    )

  return rows.map((r) => r.id)
}

/**
 * Create a new blog post.
 *
 * The post and its tags are created inside one transaction.
 * If anything fails, the entire operation is rolled back.
 */
export async function createPost(rawData: PostInput) {
  const caller = await getCaller()

  if (!can(caller.role, "posts:create")) {
    throw new Error("Forbidden")
  }

  const data = postInputSchema.parse(rawData)

  // Only roles with the publish permission may publish, schedule or feature.
  const canPublish = can(caller.role, "posts:publish")
  const status = canPublish ? data.status : "draft"
  const isFeatured = canPublish ? data.isFeatured : false

  const scheduledAt = resolveScheduledAt(status, data.scheduledAt)

  const slug = data.slug || slugify(data.title)

  if (!slug) {
    throw new Error("Unable to generate a valid slug from the title.")
  }

  // A scheduled post gets its publish date when it is due to go live.
  const publishedAt =
    status === "published" ? new Date() : status === "scheduled" ? scheduledAt : null

  try {
    await db.transaction(async (tx) => {
      const [newPost] = await tx
        .insert(posts)
        .values({
          title: data.title,
          slug,
          excerpt: data.excerpt || null,
          content: data.content,
          featuredImage: data.featuredImage || null,
          isFeatured,
          status,

          categoryId: data.categoryId || null,
          authorId: caller.id,

          // FAQs
          faqs: data.faqs,

          // SEO
          seoTitle: data.seoTitle || null,
          metaDescription: data.metaDescription || null,
          focusKeyphrase: data.focusKeyphrase || null,
          keyphraseDensity: data.keyphraseDensity,
          canonicalUrl: data.canonicalUrl || null,
          robotsIndex: data.robotsIndex,
          robotsFollow: data.robotsFollow,
          breadcrumbTitle: data.breadcrumbTitle || null,
          seoScore: data.seoScore,
          readabilityScore: data.readabilityScore,

          // Open Graph
          ogTitle: data.ogTitle || null,
          ogDescription: data.ogDescription || null,
          ogImage: data.ogImage || null,

          // Twitter
          twitterTitle: data.twitterTitle || null,
          twitterDescription: data.twitterDescription || null,
          twitterImage: data.twitterImage || null,

          // Schema
          schemaType: data.schemaType,
          customSchema: data.customSchema || null,

          // Publishing
          scheduledAt,
          publishedAt,
        })
        .returning()

      if (!newPost) {
        throw new Error("Post could not be created.")
      }

      const tagIds = await resolveTagIds(tx, data.tags)

      if (tagIds.length > 0) {
        await tx.insert(postTags).values(
          tagIds.map((tagId) => ({
            postId: newPost.id,
            tagId,
          }))
        )
      }
    })
  } catch (error: unknown) {
    if (isPostgresError(error)) {
      console.error("Create post database error:", {
        code: error.code,
        message: error.message,
      })

      // Duplicate slug
      if (error.code === "23505") {
        throw new Error(
          "A post with this slug already exists. Choose a different slug."
        )
      }

      // Foreign-key violation
      if (error.code === "23503") {
        throw new Error(
          "The selected category or author is no longer available. Please refresh the page and try again."
        )
      }

      // Not-null violation
      if (error.code === "23502") {
        throw new Error(
          "A required post field is missing. Please check the form and try again."
        )
      }

      // Undefined column/table/schema problems
      if (error.code === "42703" || error.code === "42P01") {
        throw new Error(
          "The database schema is out of date. Please run the latest Drizzle migration."
        )
      }
    }

    console.error("Create post error:", error)

    throw new Error("Failed to create post. Please try again.")
  }

  revalidatePath("/")
  revalidatePath("/blog")
  revalidatePath("/admin/blog")

  redirect("/admin/blog")
}

/**
 * Update an existing blog post.
 */
export async function updatePost(postId: string, rawData: PostInput) {
  const caller = await getCaller()
  const data = postInputSchema.parse(rawData)

  const [existing] = await db
    .select({
      status: posts.status,
      publishedAt: posts.publishedAt,
      slug: posts.slug,
      authorId: posts.authorId,
      isFeatured: posts.isFeatured,
    })
    .from(posts)
    .where(eq(posts.id, postId))
    .limit(1)

  if (!existing) {
    throw new Error("Post not found")
  }

  if (!canEditPost(caller, existing)) {
    throw new Error("Forbidden")
  }

  // Only roles with the publish permission may publish, schedule or feature.
  const canPublish = can(caller.role, "posts:publish")
  const status = canPublish ? data.status : "draft"
  const isFeatured = canPublish ? data.isFeatured : existing.isFeatured

  const scheduledAt = resolveScheduledAt(status, data.scheduledAt)

  const nextSlug = data.slug || slugify(data.title)

  if (!nextSlug) {
    throw new Error("Unable to generate a valid slug from the title.")
  }

  const slugChanged = nextSlug !== existing.slug

  const now = new Date()

  let nextPublishedAt: Date | null

  if (status === "published") {
    if (existing.status === "scheduled") {
      // Keep the scheduled date if it already passed, otherwise publish now
      nextPublishedAt =
        existing.publishedAt && existing.publishedAt <= now
          ? existing.publishedAt
          : now
    } else {
      nextPublishedAt = existing.publishedAt ?? now
    }
  } else if (status === "scheduled") {
    nextPublishedAt = scheduledAt
  } else {
    nextPublishedAt = existing.publishedAt
  }

  try {
    await db.transaction(async (tx) => {
      await tx
        .update(posts)
        .set({
          title: data.title,
          slug: nextSlug,
          excerpt: data.excerpt || null,
          content: data.content,
          featuredImage: data.featuredImage || null,
          isFeatured,
          status,

          categoryId: data.categoryId || null,

          // FAQs
          faqs: data.faqs,

          // SEO
          seoTitle: data.seoTitle || null,
          metaDescription: data.metaDescription || null,
          focusKeyphrase: data.focusKeyphrase || null,
          keyphraseDensity: data.keyphraseDensity,
          canonicalUrl: data.canonicalUrl || null,
          robotsIndex: data.robotsIndex,
          robotsFollow: data.robotsFollow,
          breadcrumbTitle: data.breadcrumbTitle || null,
          seoScore: data.seoScore,
          readabilityScore: data.readabilityScore,

          // Open Graph
          ogTitle: data.ogTitle || null,
          ogDescription: data.ogDescription || null,
          ogImage: data.ogImage || null,

          // Twitter
          twitterTitle: data.twitterTitle || null,
          twitterDescription: data.twitterDescription || null,
          twitterImage: data.twitterImage || null,

          // Schema
          schemaType: data.schemaType,
          customSchema: data.customSchema || null,

          // Publishing
          scheduledAt,
          publishedAt: nextPublishedAt,

          updatedAt: now,
        })
        .where(eq(posts.id, postId))

      if (slugChanged) {
        await tx.insert(postSlugHistory).values({
          postId,
          oldSlug: existing.slug,
        })
      }

      // Replace this post's tags with the ones typed in the editor
      await tx.delete(postTags).where(eq(postTags.postId, postId))

      const tagIds = await resolveTagIds(tx, data.tags)

      if (tagIds.length > 0) {
        await tx.insert(postTags).values(
          tagIds.map((tagId) => ({
            postId,
            tagId,
          }))
        )
      }
    })
  } catch (error: unknown) {
    if (isPostgresError(error)) {
      console.error("Update post database error:", {
        code: error.code,
        message: error.message,
      })

      if (error.code === "23505") {
        throw new Error(
          "A post with this slug already exists. Choose a different slug."
        )
      }

      if (error.code === "23503") {
        throw new Error(
          "The selected category is no longer available. Please refresh the page and try again."
        )
      }

      if (error.code === "23502") {
        throw new Error(
          "A required post field is missing. Please check the form and try again."
        )
      }

      if (error.code === "42703" || error.code === "42P01") {
        throw new Error(
          "The database schema is out of date. Please run the latest Drizzle migration."
        )
      }
    }

    console.error("Update post error:", error)

    throw new Error("Failed to update post. Please try again.")
  }

  revalidatePath("/")
  revalidatePath("/blog")
  revalidatePath("/admin/blog")
  revalidatePath(`/blog/${nextSlug}`)

  redirect("/admin/blog")
}

/**
 * Delete a blog post.
 */
export async function deletePost(postId: string): Promise<{ error?: string }> {
  const caller = await getCaller()

  const [existing] = await db
    .select({
      authorId: posts.authorId,
      status: posts.status,
    })
    .from(posts)
    .where(eq(posts.id, postId))
    .limit(1)

  if (!existing) {
    return { error: "Post not found" }
  }

  if (!canDeletePost(caller, existing)) {
    return { error: "You don't have permission to delete this post" }
  }

  try {
    await db.delete(posts).where(eq(posts.id, postId))
  } catch (error: unknown) {
    console.error("Delete post error:", error)

    return { error: "Failed to delete post. Please try again." }
  }

  revalidatePath("/")
  revalidatePath("/blog")
  revalidatePath("/admin/blog")

  return {}
}

/**
 * Get a post by ID for editing.
 * Returns null if the post doesn't exist or the caller may not edit it.
 */
export async function getPostById(postId: string) {
  const caller = await getCaller()

  const [post] = await db
    .select()
    .from(posts)
    .where(eq(posts.id, postId))
    .limit(1)

  if (!post || !canEditPost(caller, post)) {
    return null
  }

  return post
}

/**
 * Resolve an old slug to the current post slug.
 */
export async function resolveOldSlug(oldSlug: string) {
  const [record] = await db
    .select({
      postId: postSlugHistory.postId,
    })
    .from(postSlugHistory)
    .where(eq(postSlugHistory.oldSlug, oldSlug))
    .limit(1)

  if (!record) {
    return null
  }

  const [post] = await db
    .select({
      slug: posts.slug,
    })
    .from(posts)
    .where(eq(posts.id, record.postId))
    .limit(1)

  return post?.slug ?? null
}