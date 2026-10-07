import { notFound, redirect } from "next/navigation"
import { db } from "@/db"
import { categories, tags, postTags, users } from "@/db/schema"
import { eq } from "drizzle-orm"
import { getPostById } from "@/app/admin/blog/actions"
import { PostEditor, type PostStatus } from "@/components/admin/post-editor/PostEditor"
import { auth } from "@/auth"
import { can } from "@/lib/supabase/permissions"
import type { Metadata } from "next"

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
}

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const session = await auth()
  const callerId = session?.user?.id

  if (!callerId) {
    redirect("/login")
  }

  const [caller] = await db
    .select({
      id: users.id,
      role: users.role,
    })
    .from(users)
    .where(eq(users.id, callerId))
    .limit(1)

  if (!caller) {
    redirect("/login")
  }

  /*
   * getPostById() performs the authoritative edit-permission check
   * using the caller's CURRENT database role.
   */
  const post = await getPostById(id)

  if (!post) {
    notFound()
  }

  const [allCategories, allTags, existingPostTags] = await Promise.all([
    db
      .select({
        id: categories.id,
        name: categories.name,
      })
      .from(categories),

    db
      .select({
        id: tags.id,
        name: tags.name,
      })
      .from(tags),

    db
      .select({
        tagId: postTags.tagId,
      })
      .from(postTags)
      .where(eq(postTags.postId, id)),
  ])

  const canPublish = can(caller.role, "posts:publish")

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-charcoal">
          Edit Post
        </h1>

        <p className="text-sm text-muted-teal mt-1">
          Update &quot;{post.title}&quot;
        </p>
      </div>

      <PostEditor
        postId={post.id}
        categories={allCategories}
        tags={allTags}
        canPublish={canPublish}
        initialData={{
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt ?? "",
          content: post.content,
          featuredImage: post.featuredImage ?? "",
          isFeatured: post.isFeatured,
          status: post.status as PostStatus,
          categoryId: post.categoryId ?? "",
          tagIds: existingPostTags.map((tag) => tag.tagId),

          // SEO
          seoTitle: post.seoTitle ?? "",
          metaDescription: post.metaDescription ?? "",
          focusKeyphrase: post.focusKeyphrase ?? "",
          keyphraseDensity: post.keyphraseDensity ?? 0,
          canonicalUrl: post.canonicalUrl ?? "",
          robotsIndex: post.robotsIndex,
          robotsFollow: post.robotsFollow,
          breadcrumbTitle: post.breadcrumbTitle ?? "",
          seoScore: post.seoScore ?? 0,
          readabilityScore: post.readabilityScore ?? 0,

          // Open Graph
          ogTitle: post.ogTitle ?? "",
          ogDescription: post.ogDescription ?? "",
          ogImage: post.ogImage ?? "",

          // Twitter
          twitterTitle: post.twitterTitle ?? "",
          twitterDescription: post.twitterDescription ?? "",
          twitterImage: post.twitterImage ?? "",

          // Schema
          schemaType: post.schemaType,
        }}
      />
    </div>
  )
}