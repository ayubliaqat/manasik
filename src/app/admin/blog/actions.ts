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

function isPostgresError(error: unknown): error is { code: string; message: string } {
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
  ogTitle: z.string().optional().default(""),
  ogDescription: z.string().optional().default(""),
  ogImage: z.string().optional().default(""),
  twitterTitle: z.string().optional().default(""),
  twitterDescription: z.string().optional().default(""),
  twitterImage: z.string().optional().default(""),
  schemaType: z.string().default("BlogPosting"),
})

export type PostInput = z.infer<typeof postInputSchema>

async function requireEditorOrAdmin() {
  const session = await auth()
  const role = session?.user?.role

  if (!session?.user?.id || (role !== "admin" && role !== "Editor")) {
    throw new Error("Not authorized to manage posts")
  }

  return session
}

export async function createPost(rawData: PostInput) {
  const session = await requireEditorOrAdmin()
  const data = postInputSchema.parse(rawData)

  let newPost
  try {
    ;[newPost] = await db
      .insert(posts)
      .values({
        title: data.title,
        slug: data.slug || slugify(data.title),
        excerpt: data.excerpt || null,
        content: data.content,
        featuredImage: data.featuredImage || null,
        isFeatured: data.isFeatured,
        status: data.status,
        categoryId: data.categoryId || null,
        authorId: session.user.id,
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
        ogTitle: data.ogTitle || null,
        ogDescription: data.ogDescription || null,
        ogImage: data.ogImage || null,
        twitterTitle: data.twitterTitle || null,
        twitterDescription: data.twitterDescription || null,
        twitterImage: data.twitterImage || null,
        schemaType: data.schemaType,
        publishedAt: data.status === "published" ? new Date() : null,
      })
      .returning()
  } catch (error: unknown) {
    if (isPostgresError(error) && error.code === "23505") {
      throw new Error("A post with this slug already exists. Choose a different slug.")
    }
    throw new Error("Failed to create post. Please try again.")
  }

  if (data.tagIds.length > 0) {
    await db.insert(postTags).values(
      data.tagIds.map((tagId) => ({ postId: newPost.id, tagId }))
    )
  }

  revalidatePath("/admin/posts")
  redirect("/admin/posts")
}

export async function updatePost(postId: string, rawData: PostInput) {
  await requireEditorOrAdmin()
  const data = postInputSchema.parse(rawData)

  const [existing] = await db
    .select({ status: posts.status, publishedAt: posts.publishedAt, slug: posts.slug })
    .from(posts)
    .where(eq(posts.id, postId))
    .limit(1)

  if (!existing) {
    throw new Error("Post not found")
  }

  const nextSlug = data.slug || slugify(data.title)
  const slugChanged = nextSlug !== existing.slug

  const nextPublishedAt =
    data.status === "published"
      ? existing.publishedAt ?? new Date()
      : existing.publishedAt

  try {
    await db
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
        ogTitle: data.ogTitle || null,
        ogDescription: data.ogDescription || null,
        ogImage: data.ogImage || null,
        twitterTitle: data.twitterTitle || null,
        twitterDescription: data.twitterDescription || null,
        twitterImage: data.twitterImage || null,
        schemaType: data.schemaType,
        publishedAt: nextPublishedAt,
        updatedAt: new Date(),
      })
      .where(eq(posts.id, postId))
  } catch (error: unknown) {
    if (isPostgresError(error) && error.code === "23505") {
      throw new Error("A post with this slug already exists. Choose a different slug.")
    }
    throw new Error("Failed to update post. Please try again.")
  }

  if (slugChanged) {
    await db.insert(postSlugHistory).values({
      postId,
      oldSlug: existing.slug,
    })
  }

  await db.delete(postTags).where(eq(postTags.postId, postId))
  if (data.tagIds.length > 0) {
    await db.insert(postTags).values(
      data.tagIds.map((tagId) => ({ postId, tagId }))
    )
  }

  revalidatePath("/admin/posts")
  redirect("/admin/posts")
}

export async function deletePost(postId: string) {
  await requireEditorOrAdmin()
  await db.delete(posts).where(eq(posts.id, postId))
  revalidatePath("/admin/posts")
}

export async function getPostById(postId: string) {
  await requireEditorOrAdmin()
  const [post] = await db.select().from(posts).where(eq(posts.id, postId)).limit(1)
  return post
}

export async function resolveOldSlug(oldSlug: string) {
  const [record] = await db
    .select({ postId: postSlugHistory.postId })
    .from(postSlugHistory)
    .where(eq(postSlugHistory.oldSlug, oldSlug))
    .limit(1)

  if (!record) return null

  const [post] = await db
    .select({ slug: posts.slug })
    .from(posts)
    .where(eq(posts.id, record.postId))
    .limit(1)

  return post?.slug ?? null
}