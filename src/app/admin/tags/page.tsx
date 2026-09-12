import Link from "next/link"
import { db } from "@/db"
import { tags } from "@/db/schema"
import { desc } from "drizzle-orm"
import { Plus, Tag as TagIcon } from "lucide-react"
import { TagRowActions } from "@/components/admin/TagRowActions"

export default async function AdminTagsPage() {
  const allTags = await db.select().from(tags).orderBy(desc(tags.createdAt))

  return (
    <div className="relative">
      <div className="pointer-events-none absolute -top-10 -left-10 h-72 w-72 rounded-full bg-emerald/10 blur-3xl" />
      <div className="pointer-events-none absolute top-40 right-0 h-80 w-80 rounded-full bg-gold/10 blur-3xl" />

      <div className="relative">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-charcoal">Tags</h1>
            <p className="text-sm text-muted-teal mt-1">
              {allTags.length} {allTags.length === 1 ? "tag" : "tags"}
            </p>
          </div>

          <Link
            href="/admin/tags/new"
            className="flex items-center gap-2 rounded-full bg-emerald hover:opacity-90 text-warm-white text-sm font-medium px-5 py-2.5 transition shadow-sm"
          >
            <Plus className="h-4 w-4" />
            Add Tag
          </Link>
        </div>

        {allTags.length === 0 ? (
          <div className="rounded-2xl bg-card border border-soft-beige shadow-sm p-12 text-center">
            <div className="h-12 w-12 rounded-xl bg-gold/15 flex items-center justify-center mx-auto mb-3">
              <TagIcon className="h-5 w-5 text-gold" />
            </div>
            <p className="text-sm font-medium text-charcoal">No tags yet</p>
            <p className="text-sm text-muted-teal mt-1">
              Create tags to help organize and filter your posts.
            </p>
          </div>
        ) : (
          <div className="rounded-2xl bg-card border border-soft-beige shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-soft-beige bg-soft-beige/40">
                  <th className="text-left font-medium text-muted-teal px-6 py-3.5">Tag</th>
                  <th className="text-left font-medium text-muted-teal px-6 py-3.5">Slug</th>
                  <th className="text-right font-medium text-muted-teal px-6 py-3.5">Actions</th>
                </tr>
              </thead>
              <tbody>
                {allTags.map((tag) => (
                  <tr
                    key={tag.id}
                    className="border-b border-soft-beige last:border-0 hover:bg-soft-beige/30 transition-colors"
                  >
                    <td className="px-6 py-3.5">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/15 text-gold px-3 py-1 text-xs font-medium">
                        <TagIcon className="h-3 w-3" />
                        {tag.name}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-muted-teal">/{tag.slug}</td>
                    <td className="px-6 py-3.5">
                      <div className="flex justify-end">
                        <TagRowActions tagId={tag.id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
