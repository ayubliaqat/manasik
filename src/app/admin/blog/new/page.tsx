import { db } from "@/db"
import { categories, tags } from "@/db/schema"
import { PostEditor } from "@/components/admin/post-editor/PostEditor"
import type { Metadata } from "next"

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default async function NewPostPage() {
  const [allCategories, allTags] = await Promise.all([
    db.select({ id: categories.id, name: categories.name }).from(categories),
    db.select({ id: tags.id, name: tags.name }).from(tags),
  ])

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-charcoal">Add New Post</h1>
        <p className="text-sm text-muted-teal mt-1">
          Write and publish a new Hajj/Umrah guide
        </p>
      </div>

      <PostEditor categories={allCategories} tags={allTags} />
    </div>
  )
}