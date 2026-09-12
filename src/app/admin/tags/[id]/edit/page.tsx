import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { getTagById, updateTag } from "@/app/admin/tags/actions"

export default async function EditTagPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const tag = await getTagById(id)

  if (!tag) {
    notFound()
  }

  const updateTagWithId = updateTag.bind(null, id)

  return (
    <div className="relative max-w-md">
      <Link
        href="/admin/tags"
        className="inline-flex items-center gap-1.5 text-sm text-muted-teal hover:text-charcoal transition mb-5"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Tags
      </Link>

      <div className="rounded-2xl bg-card border border-soft-beige shadow-sm p-7">
        <h1 className="text-xl font-semibold text-charcoal mb-1">Edit Tag</h1>
        <p className="text-sm text-muted-teal mb-6">
          Update &quot;{tag.name}&quot;
        </p>

        <form action={updateTagWithId} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-charcoal mb-1.5">Name</label>
            <input
              name="name"
              type="text"
              defaultValue={tag.name}
              required
              className="w-full rounded-lg border border-soft-beige bg-warm-white px-3.5 py-2.5 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-emerald focus:border-emerald transition"
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="rounded-full bg-deep-teal hover:bg-dark-teal text-warm-white font-medium px-6 py-2.5 text-sm transition"
            >
              Save Changes
            </button>
            <Link
              href="/admin/tags"
              className="rounded-full bg-soft-beige/60 hover:bg-soft-beige text-charcoal font-medium px-6 py-2.5 text-sm transition"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
