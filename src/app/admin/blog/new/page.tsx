import { redirect } from "next/navigation"
import { db } from "@/db"
import { categories, tags, users } from "@/db/schema"
import { eq } from "drizzle-orm"
import { PostEditor } from "@/components/admin/post-editor/PostEditor"
import { auth } from "@/auth"
import { can } from "@/lib/supabase/permissions"
import type { Metadata } from "next"

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
}

export default async function NewPostPage() {
  const session = await auth()
  const callerId = session?.user?.id

  if (!callerId) {
    redirect("/login")
  }

  const [caller] = await db
    .select({
      id: users.id,
      role: users.role,
    })
    .from(users)
    .where(eq(users.id, callerId))
    .limit(1)

  if (!caller) {
    redirect("/login")
  }

  if (!can(caller.role, "posts:create")) {
    redirect("/admin/blog")
  }

  const [allCategories, allTags] = await Promise.all([
    db
      .select({
        id: categories.id,
        name: categories.name,
      })
      .from(categories),

    db
      .select({
        id: tags.id,
        name: tags.name,
      })
      .from(tags),
  ])

  const canPublish = can(caller.role, "posts:publish")

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-charcoal">
          Add New Post
        </h1>

        <p className="text-sm text-muted-teal mt-1">
          Write and publish a new Hajj/Umrah guide
        </p>
      </div>

      <PostEditor
        categories={allCategories}
        tags={allTags}
        canPublish={canPublish}
      />
    </div>
  )
}