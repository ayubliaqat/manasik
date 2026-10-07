export const ROLES = ["author", "editor", "admin"] as const
export type Role = (typeof ROLES)[number]

export type Permission =
  | "posts:create"
  | "posts:edit:own"
  | "posts:edit:any"
  | "posts:publish"
  | "posts:delete:own"
  | "posts:delete:any"
  | "taxonomy:manage"
  | "taxonomy:delete"
  | "media:upload"
  | "users:manage"

const PERMISSIONS: Record<Role, readonly Permission[]> = {
  author: [
    "posts:create",
    "posts:edit:own",
    "posts:delete:own",
    "media:upload",
  ],
  editor: [
    "posts:create",
    "posts:edit:own",
    "posts:edit:any",
    "posts:publish",
    "posts:delete:own",
    "posts:delete:any",
    "taxonomy:manage",
    "media:upload",
  ],
  admin: [
    "posts:create",
    "posts:edit:own",
    "posts:edit:any",
    "posts:publish",
    "posts:delete:own",
    "posts:delete:any",
    "taxonomy:manage",
    "taxonomy:delete",
    "media:upload",
    "users:manage",
  ],
}

export function isRole(value: unknown): value is Role {
  return typeof value === "string" && (ROLES as readonly string[]).includes(value)
}

export function can(role: unknown, permission: Permission): boolean {
  if (!isRole(role)) return false
  return PERMISSIONS[role].includes(permission)
}

type PostAccessInfo = {
  authorId: string | null
  status: string
}

/**
 * Editors and admins can edit any post.
 * Authors can edit only their own posts, and only while they are drafts.
 */
export function canEditPost(
  role: unknown,
  userId: string,
  post: PostAccessInfo
): boolean {
  if (can(role, "posts:edit:any")) return true

  return (
    can(role, "posts:edit:own") &&
    post.authorId === userId &&
    post.status === "draft"
  )
}

/**
 * Editors and admins can delete any post.
 * Authors can delete only their own drafts.
 */
export function canDeletePost(
  role: unknown,
  userId: string,
  post: PostAccessInfo
): boolean {
  if (can(role, "posts:delete:any")) return true

  return (
    can(role, "posts:delete:own") &&
    post.authorId === userId &&
    post.status === "draft"
  )
}