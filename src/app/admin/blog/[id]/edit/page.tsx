import { notFound } from "next/navigation"
import { db } from "@/db"
import { categories, tags, postTags } from "@/db/schema"
import { eq } from "drizzle-orm"
import { getPostById } from "@/app/admin/posts/actions"
import { PostEditor } from "@/components/admin/post-editor/PostEditor"

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const post = await getPostById(id)

  if (!post) {
    notFound()
  }

  const [allCategories, allTags, existingPostTags] = await Promise.all([
    db.select({ id: categories.id, name: categories.name }).from(categories),
    db.select({ id: tags.id, name: tags.name }).from(tags),
    db.select({ tagId: postTags.tagId }).from(postTags).where(eq(postTags.postId, id)),
  ])

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-charcoal">Edit Post</h1>
        <p className="text-sm text-muted-teal mt-1">Update &quot;{post.title}&quot;</p>
      </div>

      <PostEditor
        postId={post.id}
        categories={allCategories}
        tags={allTags}
        initialData={{
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt ?? "",
          content: post.content,
          featuredImage: post.featuredImage ?? "",
          status: post.status,
          categoryId: post.categoryId ?? "",
          tagIds: existingPostTags.map((t) => t.tagId),
          seoTitle: post.seoTitle ?? "",
          metaDescription: post.metaDescription ?? "",
          focusKeyphrase: post.focusKeyphrase ?? "",
          canonicalUrl: post.canonicalUrl ?? "",
          robotsIndex: post.robotsIndex,
          robotsFollow: post.robotsFollow,
          breadcrumbTitle: post.breadcrumbTitle ?? "",
          ogTitle: post.ogTitle ?? "",
          ogDescription: post.ogDescription ?? "",
          ogImage: post.ogImage ?? "",
          twitterTitle: post.twitterTitle ?? "",
          twitterDescription: post.twitterDescription ?? "",
          twitterImage: post.twitterImage ?? "",
          schemaType: post.schemaType,
        }}
      />
    </div>
  )
}
