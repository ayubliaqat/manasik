"use client"

import { useState, useTransition } from "react"
import Link from "next/link"
import { Trash2, Loader2, Pencil } from "lucide-react"
import { deleteUser } from "@/app/admin/users/actions"

export function UserRowActions({ userId }: { userId: string }) {
  const [isPending, startTransition] = useTransition()
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function handleDelete() {
    if (!confirmDelete) {
      setConfirmDelete(true)

      setTimeout(() => {
        setConfirmDelete(false)
      }, 3000)

      return
    }

    setError(null)

    startTransition(async () => {
      try {
        const result = await deleteUser(userId)

        if (result?.error) {
          setError(result.error)
        }

        setConfirmDelete(false)
      } catch (err) {
        console.error("Failed to delete user:", err)
        setError("Could not delete this user")
        setConfirmDelete(false)
      }
    })
  }

  return (
    <div className="flex flex-col items-end gap-1.5">
      <div className="flex items-center justify-end gap-2">
        <Link
          href={`/admin/users/${userId}/edit`}
          className="flex items-center gap-1.5 rounded-full bg-soft-beige/60 text-charcoal hover:bg-soft-beige px-3 py-1.5 text-xs font-medium transition"
        >
          <Pencil className="h-3 w-3" />
          Edit
        </Link>

        <button
          type="button"
          onClick={handleDelete}
          disabled={isPending}
          className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition disabled:opacity-60 ${
            confirmDelete
              ? "bg-red-600 text-white"
              : "bg-red-50 text-red-600 hover:bg-red-100"
          }`}
        >
          {isPending ? (
            <Loader2 className="h-3 w-3 animate-spin" />
          ) : (
            <Trash2 className="h-3 w-3" />
          )}

          {confirmDelete ? "Confirm?" : "Delete"}
        </button>
      </div>

      {error && (
        <p role="alert" className="text-[11px] text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}