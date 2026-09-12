import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { getCategoryById, updateCategory } from "@/app/admin/categories/actions"

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const category = await getCategoryById(id)

  if (!category) {
    notFound()
  }

  const updateCategoryWithId = updateCategory.bind(null, id)

  return (
    <div className="relative max-w-lg">
      <Link
        href="/admin/categories"
        className="inline-flex items-center gap-1.5 text-sm text-muted-teal hover:text-charcoal transition mb-5"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Categories
      </Link>

      <div className="rounded-2xl bg-card border border-soft-beige shadow-sm p-7">
        <h1 className="text-xl font-semibold text-charcoal mb-1">Edit Category</h1>
        <p className="text-sm text-muted-teal mb-6">
          Update details for &quot;{category.name}&quot;
        </p>

        <form action={updateCategoryWithId} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-charcoal mb-1.5">Name</label>
            <input
              name="name"
              type="text"
              defaultValue={category.name}
              required
              className="w-full rounded-lg border border-soft-beige bg-warm-white px-3.5 py-2.5 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-emerald focus:border-emerald transition"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-charcoal mb-1.5">
              Description <span className="text-muted-teal font-normal">(optional)</span>
            </label>
            <textarea
              name="description"
              rows={3}
              defaultValue={category.description ?? ""}
              className="w-full rounded-lg border border-soft-beige bg-warm-white px-3.5 py-2.5 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-emerald focus:border-emerald transition resize-none"
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
              href="/admin/categories"
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
