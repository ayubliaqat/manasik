import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { getUserById, updateUser } from "@/app/admin/users/actions"

export default async function EditUserPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const user = await getUserById(id)

  if (!user) {
    notFound()
  }

  const updateUserWithId = updateUser.bind(null, id)

  return (
    <div className="relative max-w-lg">
      <Link
        href="/admin/users"
        className="inline-flex items-center gap-1.5 text-sm text-muted-teal hover:text-charcoal transition mb-5"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Users
      </Link>

      <div className="rounded-2xl bg-card border border-soft-beige shadow-sm p-7">
        <h1 className="text-xl font-semibold text-charcoal mb-1">Edit User</h1>
        <p className="text-sm text-muted-teal mb-6">
          Update account details for {user.email}
        </p>

        <form action={updateUserWithId} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-charcoal mb-1.5">Name</label>
            <input
              name="name"
              type="text"
              defaultValue={user.name ?? ""}
              required
              className="w-full rounded-lg border border-soft-beige bg-warm-white px-3.5 py-2.5 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-emerald focus:border-emerald transition"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-charcoal mb-1.5">Email</label>
            <input
              name="email"
              type="email"
              defaultValue={user.email}
              required
              className="w-full rounded-lg border border-soft-beige bg-warm-white px-3.5 py-2.5 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-emerald focus:border-emerald transition"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-charcoal mb-1.5">
              New Password <span className="text-muted-teal font-normal">(leave blank to keep current)</span>
            </label>
            <input
              name="password"
              type="password"
              minLength={6}
              placeholder="••••••••"
              className="w-full rounded-lg border border-soft-beige bg-warm-white px-3.5 py-2.5 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-emerald focus:border-emerald transition"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-charcoal mb-1.5">Role</label>
            <select
              name="role"
              defaultValue={user.role}
              className="w-full rounded-lg border border-soft-beige bg-warm-white px-3.5 py-2.5 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-emerald focus:border-emerald transition"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="rounded-full bg-deep-teal hover:bg-dark-teal text-warm-white font-medium px-6 py-2.5 text-sm transition"
            >
              Save Changes
            </button>
            <Link
              href="/admin/users"
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
