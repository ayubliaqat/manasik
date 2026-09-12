import Link from "next/link"
import { db } from "@/db"
import { users } from "@/db/schema"
import { desc } from "drizzle-orm"
import { Search } from "lucide-react"
import { UserRowActions } from "@/components/admin/UserRowActions"

export default async function AdminUsersPage() {
  const allUsers = await db
    .select()
    .from(users)
    .orderBy(desc(users.createdAt))

  return (
    <div className="relative">
      <div className="pointer-events-none absolute -top-10 -left-10 h-72 w-72 rounded-full bg-emerald/10 blur-3xl" />
      <div className="pointer-events-none absolute top-40 right-0 h-80 w-80 rounded-full bg-gold/10 blur-3xl" />

      <div className="relative">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-charcoal">
              All Users
            </h1>

            <p className="text-sm text-muted-teal mt-1">
              {allUsers.length}{" "}
              {allUsers.length === 1 ? "user" : "users"} registered
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-teal" />

              <input
                type="text"
                placeholder="Search users..."
                className="rounded-full border border-soft-beige bg-card pl-10 pr-4 py-2.5 text-sm text-charcoal placeholder:text-muted-teal focus:outline-none focus:ring-2 focus:ring-emerald focus:border-emerald transition w-56"
              />
            </div>

            <Link
              href="/admin/users/new"
              className="flex items-center gap-2 rounded-full bg-emerald hover:opacity-90 text-warm-white text-sm font-medium px-5 py-2.5 transition shadow-sm"
            >
              Add User
            </Link>
          </div>
        </div>

        <div className="rounded-2xl bg-card border border-soft-beige shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-soft-beige bg-soft-beige/40">
                <th className="text-left font-medium text-muted-teal px-6 py-3.5">
                  User
                </th>

                <th className="text-left font-medium text-muted-teal px-6 py-3.5">
                  Email
                </th>

                <th className="text-left font-medium text-muted-teal px-6 py-3.5">
                  Joined
                </th>

                <th className="text-right font-medium text-muted-teal px-6 py-3.5">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {allUsers.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-10 text-center text-muted-teal"
                  >
                    No users found.
                  </td>
                </tr>
              )}

              {allUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-soft-beige last:border-0 hover:bg-soft-beige/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-deep-teal/10 flex items-center justify-center text-deep-teal font-semibold text-xs shrink-0">
                        {(user.name ?? user.email)
                          ?.charAt(0)
                          .toUpperCase()}
                      </div>

                      <span className="font-medium text-charcoal">
                        {user.name ?? "—"}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-muted-teal">
                    {user.email}
                  </td>

                  <td className="px-6 py-4 text-muted-teal">
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }
                        )
                      : "—"}
                  </td>

                  <td className="px-6 py-4">
                    <UserRowActions userId={user.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
