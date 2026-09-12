import Link from "next/link"
import { ArrowLeft, UserPlus } from "lucide-react"
import { createUser } from "@/app/admin/users/actions"

export default function NewUserPage() {
  return (
    <div className="min-h-[calc(100vh-120px)] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Back */}
        <Link
          href="/admin/users"
          className="mb-5 inline-flex items-center gap-2 text-xs font-medium text-muted-teal transition hover:text-deep-teal"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Users
        </Link>

        {/* Card */}
        <div className="relative overflow-hidden rounded-3xl border border-soft-beige bg-card p-6 shadow-[0_18px_45px_rgba(23,43,42,0.10)] sm:p-7">
          {/* Decorative glow */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-emerald/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-gold/10 blur-3xl" />

          <div className="relative">
            {/* Header */}
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald/10 text-emerald">
                <UserPlus className="h-4.5 w-4.5" />
              </div>

              <h1 className="text-lg font-semibold tracking-tight text-charcoal">
                Add User
              </h1>
            </div>

            <form action={createUser} className="space-y-4">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-1.5 ml-1 block text-[11px] font-semibold text-charcoal"
                >
                  Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Enter full name"
                  className="h-11.5 w-full rounded-full border border-soft-beige bg-warm-white px-4 text-xs text-charcoal outline-none transition-all placeholder:text-muted-teal/50 hover:border-muted-teal/30 focus:border-emerald/60 focus:bg-card focus:ring-4 focus:ring-emerald/10"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 ml-1 block text-[11px] font-semibold text-charcoal"
                >
                  Email
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="Enter email address"
                  className="h-11.5 w-full rounded-full border border-soft-beige bg-warm-white px-4 text-xs text-charcoal outline-none transition-all placeholder:text-muted-teal/50 hover:border-muted-teal/30 focus:border-emerald/60 focus:bg-card focus:ring-4 focus:ring-emerald/10"
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-1.5 ml-1 block text-[11px] font-semibold text-charcoal"
                >
                  Password
                </label>

                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  minLength={6}
                  autoComplete="new-password"
                  placeholder="Create a password"
                  className="h-11.5 w-full rounded-full border border-soft-beige bg-warm-white px-4 text-xs text-charcoal outline-none transition-all placeholder:text-muted-teal/50 hover:border-muted-teal/30 focus:border-emerald/60 focus:bg-card focus:ring-4 focus:ring-emerald/10"
                />
              </div>

              {/* Role */}
              <div>
                <label
                  htmlFor="role"
                  className="mb-1.5 ml-1 block text-[11px] font-semibold text-charcoal"
                >
                  Role
                </label>

                <select
                  id="role"
                  name="role"
                  defaultValue="user"
                  className="h-11.5 w-full rounded-full border border-soft-beige bg-warm-white px-4 text-xs text-charcoal outline-none transition-all hover:border-muted-teal/30 focus:border-emerald/60 focus:bg-card focus:ring-4 focus:ring-emerald/10"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex h-11 flex-1 items-center justify-center rounded-full bg-gradient-to-r from-deep-teal to-emerald text-xs font-semibold text-warm-white shadow-[0_8px_20px_rgba(8,127,91,0.18)] transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_25px_rgba(8,127,91,0.24)] active:translate-y-0"
                >
                  Create User
                </button>

                <Link
                  href="/admin/users"
                  className="flex h-11 items-center justify-center rounded-full border border-soft-beige bg-soft-beige/50 px-6 text-xs font-semibold text-charcoal transition hover:bg-soft-beige"
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
