import Link from "next/link"
import { db } from "@/db"
import { categories } from "@/db/schema"
import { desc } from "drizzle-orm"
import { Plus, FolderTree } from "lucide-react"
import { CategoryRowActions } from "@/components/admin/CategoryRowActions"

export default async function AdminCategoriesPage() {
  const allCategories = await db
    .select()
    .from(categories)
    .orderBy(desc(categories.createdAt))

  return (
    <div className="relative">
      <div className="pointer-events-none absolute -top-10 -left-10 h-72 w-72 rounded-full bg-emerald/10 blur-3xl" />
      <div className="pointer-events-none absolute top-40 right-0 h-80 w-80 rounded-full bg-gold/10 blur-3xl" />

      <div className="relative">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-charcoal">Categories</h1>
            <p className="text-sm text-muted-teal mt-1">
              {allCategories.length} {allCategories.length === 1 ? "category" : "categories"}
            </p>
          </div>

          <Link
            href="/admin/categories/new"
            className="flex items-center gap-2 rounded-full bg-emerald hover:opacity-90 text-warm-white text-sm font-medium px-5 py-2.5 transition shadow-sm"
          >
            <Plus className="h-4 w-4" />
            Add Category
          </Link>
        </div>

        {allCategories.length === 0 ? (
          <div className="rounded-2xl bg-card border border-soft-beige shadow-sm p-12 text-center">
            <div className="h-12 w-12 rounded-xl bg-emerald/10 flex items-center justify-center mx-auto mb-3">
              <FolderTree className="h-5 w-5 text-emerald" />
            </div>
            <p className="text-sm font-medium text-charcoal">No categories yet</p>
            <p className="text-sm text-muted-teal mt-1">
              Create your first category to start organizing posts.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {allCategories.map((category) => (
              <div
                key={category.id}
                className="rounded-2xl bg-card border border-soft-beige shadow-sm p-5"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="h-10 w-10 rounded-xl bg-emerald/10 flex items-center justify-center shrink-0">
                    <FolderTree className="h-4 w-4 text-emerald" />
                  </div>
                </div>
                <h3 className="font-semibold text-charcoal">{category.name}</h3>
                <p className="text-xs text-muted-teal mt-0.5 mb-3">/{category.slug}</p>
                {category.description && (
                  <p className="text-sm text-muted-teal line-clamp-2 mb-4">
                    {category.description}
                  </p>
                )}
                <CategoryRowActions categoryId={category.id} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
