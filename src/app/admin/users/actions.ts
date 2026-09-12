"use server"

import { db } from "@/db"
import { users } from "@/db/schema"
import { and, eq, ne } from "drizzle-orm"
import bcrypt from "bcryptjs"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

function getRequiredString(formData: FormData, field: string) {
  const value = formData.get(field)

  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${field} is required`)
  }

  return value.trim()
}

function getRole(formData: FormData) {
  const value = formData.get("role")

  if (value !== "user" && value !== "admin") {
    throw new Error("Invalid role")
  }

  return value
}

function getEmail(formData: FormData) {
  const email = getRequiredString(formData, "email").toLowerCase()

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("Invalid email address")
  }

  return email
}

export async function createUser(formData: FormData) {
  const name = getRequiredString(formData, "name")
  const email = getEmail(formData)
  const password = getRequiredString(formData, "password")
  const role = getRole(formData)

  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters")
  }

  const [existingUser] = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, email))
    .limit(1)

  if (existingUser) {
    throw new Error("A user with this email already exists")
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  await db.insert(users).values({
    name,
    email,
    password: hashedPassword,
    role,
  })

  revalidatePath("/admin/users")
  redirect("/admin/users")
}

export async function updateUser(userId: string, formData: FormData) {
  const name = getRequiredString(formData, "name")
  const email = getEmail(formData)
  const role = getRole(formData)

  const passwordValue = formData.get("password")
  const password =
    typeof passwordValue === "string" ? passwordValue.trim() : ""

  const [existingUser] = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1)

  if (!existingUser) {
    throw new Error("User not found")
  }

  const [emailOwner] = await db
    .select({ id: users.id })
    .from(users)
    .where(
      and(
        eq(users.email, email),
        ne(users.id, userId)
      )
    )
    .limit(1)

  if (emailOwner) {
    throw new Error("A user with this email already exists")
  }

  const updateData: {
    name: string
    email: string
    role: "user" | "admin"
    password?: string
  } = {
    name,
    email,
    role,
  }

  if (password.length > 0) {
    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters")
    }

    updateData.password = await bcrypt.hash(password, 10)
  }

  await db
    .update(users)
    .set(updateData)
    .where(eq(users.id, userId))

  revalidatePath("/admin/users")
  redirect("/admin/users")
}

export async function deleteUser(userId: string) {
  if (!userId || typeof userId !== "string") {
    throw new Error("Invalid user ID")
  }

  const [existingUser] = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1)

  if (!existingUser) {
    throw new Error("User not found")
  }

  await db.delete(users).where(eq(users.id, userId))

  revalidatePath("/admin/users")
}

export async function getUserById(userId: string) {
  if (!userId || typeof userId !== "string") {
    return null
  }

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1)

  return user ?? null
}
