"use server"

import { db } from "@/db"
import { categories, users } from "@/db/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { can, type Permission } from "@/lib/supabase/permissions"

async function requirePermission(permission: Permission) {
  const session = await auth()
  const callerId = session?.user?.id

  if (!callerId) {
    throw new Error("Unauthorized")
  }

  const [caller] = await db
    .select({ id: users.id, role: users.role })
    .from(users)
    .where(eq(users.id, callerId))
    .limit(1)

  if (!caller || !can(caller.role, permission)) {
    throw new Error("Forbidden")
  }

  return caller
}

function getName(formData: FormData) {
  const value = formData.get("name")

  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error("Name is required")
  }

  return value.trim()
}

function getDescription(formData: FormData) {
  const value = formData.get("description")

  if (typeof value !== "string") {
    return null
  }

  return value.trim() || null
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export async function createCategory(formData: FormData) {
  await requirePermission("taxonomy:manage")

  const name = getName(formData)
  const description = getDescription(formData)

  await db.insert(categories).values({
    name,
    slug: slugify(name),
    description,
  })

  revalidatePath("/admin/categories")
  redirect("/admin/categories")
}

export async function updateCategory(categoryId: string, formData: FormData) {
  await requirePermission("taxonomy:manage")

  const name = getName(formData)
  const description = getDescription(formData)

  const [existingCategory] = await db
    .select({ id: categories.id })
    .from(categories)
    .where(eq(categories.id, categoryId))
    .limit(1)

  if (!existingCategory) {
    throw new Error("Category not found")
  }

  await db
    .update(categories)
    .set({
      name,
      slug: slugify(name),
      description,
    })
    .where(eq(categories.id, categoryId))

  revalidatePath("/admin/categories")
  redirect("/admin/categories")
}

export async function deleteCategory(categoryId: string) {
  await requirePermission("taxonomy:delete")

  const [existingCategory] = await db
    .select({ id: categories.id })
    .from(categories)
    .where(eq(categories.id, categoryId))
    .limit(1)

  if (!existingCategory) {
    throw new Error("Category not found")
  }

  await db.delete(categories).where(eq(categories.id, categoryId))
  revalidatePath("/admin/categories")
}

export async function getCategoryById(categoryId: string) {
  await requirePermission("taxonomy:manage")

  const [category] = await db
    .select()
    .from(categories)
    .where(eq(categories.id, categoryId))
    .limit(1)

  return category ?? null
}