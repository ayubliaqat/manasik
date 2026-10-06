"use server"

import { db } from "@/db"
import { posts, postTags, postSlugHistory } from "@/db/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { z } from "zod"

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
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

const postInputSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().optional().default(""),
  excerpt: z.string().optional().default(""),
  content: z.string().min(1, "Content is required"),
  featuredImage: z.string().optional().default(""),
  isFeatured: z.boolean().default(false),
  status: z.enum(["draft", "published", "scheduled"]),
  categoryId: z.string().uuid().nullable(),
  tagIds: z.array(z.string().uuid()).default([]),

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
})

export type PostInput = z.infer<typeof postInputSchema>

/**
 * Ensures the current user is an admin or editor.
 *
 * The role is normalized to a lowercase string before comparing, so this
 * compiles regardless of how the session role type is declared and handles
 * "Editor" / "editor" / "Admin" / "admin" consistently.
 */
async function requireEditorOrAdmin() {
  const session = await auth()
  const userId = session?.user?.id
  const role = String(session?.user?.role ?? "").toLowerCase()

  if (!userId || (role !== "admin" && role !== "editor")) {
    throw new Error("Not authorized to manage posts")
  }

  return { session, userId }
}

/**
 * Create a new blog post.
 *
 * The post and its tags are created inside one transaction.
 * If anything fails, the entire operation is rolled back.
 */
export async function createPost(rawData: PostInput) {
  const { userId } = await requireEditorOrAdmin()
  const data = postInputSchema.parse(rawData)

  const slug = data.slug || slugify(data.title)

  if (!slug) {
    throw new Error("Unable to generate a valid slug from the title.")
  }

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
          isFeatured: data.isFeatured,
          status: data.status,

          categoryId: data.categoryId || null,
          authorId: userId,

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

          // Publishing
          publishedAt: data.status === "published" ? new Date() : null,
        })
        .returning()

      if (!newPost) {
        throw new Error("Post could not be created.")
      }

      if (data.tagIds.length > 0) {
        await tx.insert(postTags).values(
          data.tagIds.map((tagId) => ({
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
          "The selected category, author, or tag is no longer available. Please refresh the page and try again."
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
  revalidatePath("/admin/posts")

  redirect("/admin/posts")
}

/**
 * Update an existing blog post.
 */
export async function updatePost(postId: string, rawData: PostInput) {
  await requireEditorOrAdmin()

  const data = postInputSchema.parse(rawData)

  const [existing] = await db
    .select({
      status: posts.status,
      publishedAt: posts.publishedAt,
      slug: posts.slug,
    })
    .from(posts)
    .where(eq(posts.id, postId))
    .limit(1)

  if (!existing) {
    throw new Error("Post not found")
  }

  const nextSlug = data.slug || slugify(data.title)

  if (!nextSlug) {
    throw new Error("Unable to generate a valid slug from the title.")
  }

  const slugChanged = nextSlug !== existing.slug

  const nextPublishedAt =
    data.status === "published"
      ? existing.publishedAt ?? new Date()
      : existing.publishedAt

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
          isFeatured: data.isFeatured,
          status: data.status,

          categoryId: data.categoryId || null,

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

          // Publishing
          publishedAt: nextPublishedAt,

          updatedAt: new Date(),
        })
        .where(eq(posts.id, postId))

      if (slugChanged) {
        await tx.insert(postSlugHistory).values({
          postId,
          oldSlug: existing.slug,
        })
      }

      // Replace existing tags
      await tx.delete(postTags).where(eq(postTags.postId, postId))

      if (data.tagIds.length > 0) {
        await tx.insert(postTags).values(
          data.tagIds.map((tagId) => ({
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
          "The selected category or tag is no longer available. Please refresh the page and try again."
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
  revalidatePath("/admin/posts")
  revalidatePath(`/blog/${nextSlug}`)

  redirect("/admin/posts")
}

/**
 * Delete a blog post.
 */
export async function deletePost(postId: string) {
  await requireEditorOrAdmin()

  try {
    await db.delete(posts).where(eq(posts.id, postId))
  } catch (error: unknown) {
    console.error("Delete post error:", error)

    throw new Error("Failed to delete post. Please try again.")
  }

  revalidatePath("/")
  revalidatePath("/blog")
  revalidatePath("/admin/posts")
}

/**
 * Get a post by ID.
 */
export async function getPostById(postId: string) {
  await requireEditorOrAdmin()

  const [post] = await db
    .select()
    .from(posts)
    .where(eq(posts.id, postId))
    .limit(1)

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