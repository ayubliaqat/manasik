"use server"

import { db } from "@/db"
import { posts, postTags } from "@/db/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { auth } from "@/auth"

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

type PostInput = {
  title: string
  slug: string
  excerpt: string
  content: string
  featuredImage: string
  status: string
  categoryId: string | null
  tagIds: string[]
  seoTitle: string
  metaDescription: string
  focusKeyphrase: string
  canonicalUrl: string
  robotsIndex: string
  robotsFollow: string
  breadcrumbTitle: string
  ogTitle: string
  ogDescription: string
  ogImage: string
  twitterTitle: string
  twitterDescription: string
  twitterImage: string
  schemaType: string
  publishedAt: string | null
}

export async function createPost(data: PostInput) {
  const session = await auth()

  const [newPost] = await db
    .insert(posts)
    .values({
      title: data.title,
      slug: data.slug || slugify(data.title),
      excerpt: data.excerpt || null,
      content: data.content,
      featuredImage: data.featuredImage || null,
      status: data.status,
      categoryId: data.categoryId || null,
      authorId: session?.user?.id ?? null,
      seoTitle: data.seoTitle || null,
      metaDescription: data.metaDescription || null,
      focusKeyphrase: data.focusKeyphrase || null,
      canonicalUrl: data.canonicalUrl || null,
      robotsIndex: data.robotsIndex,
      robotsFollow: data.robotsFollow,
      breadcrumbTitle: data.breadcrumbTitle || null,
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

  if (data.tagIds.length > 0) {
    await db.insert(postTags).values(
      data.tagIds.map((tagId) => ({ postId: newPost.id, tagId }))
    )
  }

  revalidatePath("/admin/posts")
  redirect("/admin/posts")
}

export async function updatePost(postId: string, data: PostInput) {
  await db
    .update(posts)
    .set({
      title: data.title,
      slug: data.slug || slugify(data.title),
      excerpt: data.excerpt || null,
      content: data.content,
      featuredImage: data.featuredImage || null,
      status: data.status,
      categoryId: data.categoryId || null,
      seoTitle: data.seoTitle || null,
      metaDescription: data.metaDescription || null,
      focusKeyphrase: data.focusKeyphrase || null,
      canonicalUrl: data.canonicalUrl || null,
      robotsIndex: data.robotsIndex,
      robotsFollow: data.robotsFollow,
      breadcrumbTitle: data.breadcrumbTitle || null,
      ogTitle: data.ogTitle || null,
      ogDescription: data.ogDescription || null,
      ogImage: data.ogImage || null,
      twitterTitle: data.twitterTitle || null,
      twitterDescription: data.twitterDescription || null,
      twitterImage: data.twitterImage || null,
      schemaType: data.schemaType,
      updatedAt: new Date(),
    })
    .where(eq(posts.id, postId))

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
  await db.delete(posts).where(eq(posts.id, postId))
  revalidatePath("/admin/posts")
}

export async function getPostById(postId: string) {
  const [post] = await db.select().from(posts).where(eq(posts.id, postId)).limit(1)
  return post
}
