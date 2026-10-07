"use server"

import { db } from "@/db"
import { users } from "@/db/schema"
import { and, eq, ne, sql } from "drizzle-orm"
import bcrypt from "bcryptjs"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { can } from "@/lib/supabase/permissions"

const ROLES = ["author", "editor", "admin"] as const
type Role = (typeof ROLES)[number]

async function requireUserManager() {
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

  if (!caller || !can(caller.role, "users:manage")) {
    throw new Error("Forbidden")
  }

  return caller
}

async function countAdmins() {
  const [row] = await db
    .select({ count: sql<number>`count(*)` })
    .from(users)
    .where(eq(users.role, "admin"))

  return Number(row?.count ?? 0)
}

function getRequiredString(formData: FormData, field: string) {
  const value = formData.get(field)

  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${field} is required`)
  }

  return value.trim()
}

function getRole(formData: FormData): Role {
  const value = formData.get("role")

  if (typeof value !== "string" || !ROLES.includes(value as Role)) {
    throw new Error("Invalid role")
  }

  return value as Role
}

function getEmail(formData: FormData) {
  const email = getRequiredString(formData, "email").toLowerCase()

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("Invalid email address")
  }

  return email
}

export async function createUser(formData: FormData) {
  await requireUserManager()

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
  await requireUserManager()

  const name = getRequiredString(formData, "name")
  const email = getEmail(formData)
  const role = getRole(formData)

  const passwordValue = formData.get("password")
  const password =
    typeof passwordValue === "string" ? passwordValue.trim() : ""

  const [existingUser] = await db
    .select({ id: users.id, role: users.role })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1)

  if (!existingUser) {
    throw new Error("User not found")
  }

  if (
    existingUser.role === "admin" &&
    role !== "admin" &&
    (await countAdmins()) <= 1
  ) {
    throw new Error("You cannot change the role of the last admin")
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
    role: Role
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

export async function deleteUser(userId: string): Promise<{ error?: string }> {
  const caller = await requireUserManager()

  if (!userId || typeof userId !== "string") {
    return { error: "Invalid user ID" }
  }

  if (userId === caller.id) {
    return { error: "You cannot delete your own account" }
  }

  const [existingUser] = await db
    .select({ id: users.id, role: users.role })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1)

  if (!existingUser) {
    return { error: "User not found" }
  }

  if (existingUser.role === "admin" && (await countAdmins()) <= 1) {
    return { error: "You cannot delete the last admin" }
  }

  await db.delete(users).where(eq(users.id, userId))

  revalidatePath("/admin/users")
  return {}
}

export async function getUserById(userId: string) {
  await requireUserManager()

  if (!userId || typeof userId !== "string") {
    return null
  }

  const [user] = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      role: users.role,
    })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1)

  return user ?? null
}