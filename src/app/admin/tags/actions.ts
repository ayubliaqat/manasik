"use server"

import { db } from "@/db"
import { tags, users } from "@/db/schema"
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

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export async function createTag(formData: FormData) {
  await requirePermission("taxonomy:manage")

  const name = getName(formData)

  await db.insert(tags).values({
    name,
    slug: slugify(name),
  })

  revalidatePath("/admin/tags")
  redirect("/admin/tags")
}

export async function updateTag(tagId: string, formData: FormData) {
  await requirePermission("taxonomy:manage")

  const name = getName(formData)

  const [existingTag] = await db
    .select({ id: tags.id })
    .from(tags)
    .where(eq(tags.id, tagId))
    .limit(1)

  if (!existingTag) {
    throw new Error("Tag not found")
  }

  await db
    .update(tags)
    .set({ name, slug: slugify(name) })
    .where(eq(tags.id, tagId))

  revalidatePath("/admin/tags")
  redirect("/admin/tags")
}

export async function deleteTag(tagId: string) {
  await requirePermission("taxonomy:delete")

  const [existingTag] = await db
    .select({ id: tags.id })
    .from(tags)
    .where(eq(tags.id, tagId))
    .limit(1)

  if (!existingTag) {
    throw new Error("Tag not found")
  }

  await db.delete(tags).where(eq(tags.id, tagId))
  revalidatePath("/admin/tags")
}

export async function getTagById(tagId: string) {
  await requirePermission("taxonomy:manage")

  const [tag] = await db
    .select()
    .from(tags)
    .where(eq(tags.id, tagId))
    .limit(1)

  return tag ?? null
}