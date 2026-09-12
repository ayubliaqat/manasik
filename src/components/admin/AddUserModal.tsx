"use client"

import { useState, useRef } from "react"
import { Plus, X, Loader2 } from "lucide-react"
import { createUser } from "@/app/admin/users/actions"

export function AddUserModal() {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)

    try {
      await createUser(formData)

      setOpen(false)
      formRef.current?.reset()
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-full bg-emerald hover:opacity-90 text-warm-white text-sm font-medium px-5 py-2.5 transition shadow-sm"
      >
        <Plus className="h-4 w-4" />
        Add User
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/40 backdrop-blur-sm px-4">
          <div className="w-full max-w-sm rounded-2xl bg-card shadow-xl p-6 relative">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-muted-teal hover:text-charcoal transition"
            >
              <X className="h-4 w-4" />
            </button>

            <h2 className="text-lg font-semibold text-charcoal mb-1">
              Add New User
            </h2>

            <p className="text-sm text-muted-teal mb-5">
              Create a new account manually
            </p>

            <form
              ref={formRef}
              action={handleSubmit}
              className="space-y-3.5"
            >
              <div>
                <label className="block text-xs font-medium text-charcoal mb-1.5">
                  Name
                </label>

                <input
                  name="name"
                  type="text"
                  required
                  className="w-full rounded-lg border border-soft-beige bg-warm-white px-3.5 py-2.5 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-emerald focus:border-emerald transition"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-charcoal mb-1.5">
                  Email
                </label>

                <input
                  name="email"
                  type="email"
                  required
                  className="w-full rounded-lg border border-soft-beige bg-warm-white px-3.5 py-2.5 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-emerald focus:border-emerald transition"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-charcoal mb-1.5">
                  Password
                </label>

                <input
                  name="password"
                  type="password"
                  required
                  minLength={6}
                  className="w-full rounded-lg border border-soft-beige bg-warm-white px-3.5 py-2.5 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-emerald focus:border-emerald transition"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-charcoal mb-1.5">
                  Role
                </label>

                <select
                  name="role"
                  defaultValue="user"
                  className="w-full rounded-lg border border-soft-beige bg-warm-white px-3.5 py-2.5 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-emerald focus:border-emerald transition"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  <option value="user">Editor</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 rounded-full bg-deep-teal hover:bg-dark-teal text-warm-white font-medium py-2.5 text-sm transition disabled:opacity-60 mt-2"
              >
                {isSubmitting && (
                  <Loader2 className="h-4 w-4 animate-spin" />
                )}

                {isSubmitting ? "Creating..." : "Create User"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
