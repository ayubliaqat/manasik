"use server"

import { db } from "@/db"
import { categories } from "@/db/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export async function createCategory(formData: FormData) {
  const name = formData.get("name") as string
  const description = formData.get("description") as string

  await db.insert(categories).values({
    name,
    slug: slugify(name),
    description: description || null,
  })

  revalidatePath("/admin/categories")
  redirect("/admin/categories")
}

export async function updateCategory(categoryId: string, formData: FormData) {
  const name = formData.get("name") as string
  const description = formData.get("description") as string

  await db
    .update(categories)
    .set({
      name,
      slug: slugify(name),
      description: description || null,
    })
    .where(eq(categories.id, categoryId))

  revalidatePath("/admin/categories")
  redirect("/admin/categories")
}

export async function deleteCategory(categoryId: string) {
  await db.delete(categories).where(eq(categories.id, categoryId))
  revalidatePath("/admin/categories")
}

export async function getCategoryById(categoryId: string) {
  const [category] = await db
    .select()
    .from(categories)
    .where(eq(categories.id, categoryId))
    .limit(1)
  return category
}
