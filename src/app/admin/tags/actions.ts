"use server"

import { db } from "@/db"
import { tags } from "@/db/schema"
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

export async function createTag(formData: FormData) {
  const name = formData.get("name") as string

  await db.insert(tags).values({
    name,
    slug: slugify(name),
  })

  revalidatePath("/admin/tags")
  redirect("/admin/tags")
}

export async function updateTag(tagId: string, formData: FormData) {
  const name = formData.get("name") as string

  await db
    .update(tags)
    .set({ name, slug: slugify(name) })
    .where(eq(tags.id, tagId))

  revalidatePath("/admin/tags")
  redirect("/admin/tags")
}

export async function deleteTag(tagId: string) {
  await db.delete(tags).where(eq(tags.id, tagId))
  revalidatePath("/admin/tags")
}

export async function getTagById(tagId: string) {
  const [tag] = await db.select().from(tags).where(eq(tags.id, tagId)).limit(1)
  return tag
}
