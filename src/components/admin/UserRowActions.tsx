"use client"

import { useState, useTransition } from "react"
import Link from "next/link"
import { Trash2, Loader2, Pencil } from "lucide-react"
import { deleteUser } from "@/app/admin/users/actions"

export function UserRowActions({ userId }: { userId: string }) {
  const [isPending, startTransition] = useTransition()
  const [confirmDelete, setConfirmDelete] = useState(false)

  function handleDelete() {
    if (!confirmDelete) {
      setConfirmDelete(true)

      setTimeout(() => {
        setConfirmDelete(false)
      }, 3000)

      return
    }

    startTransition(async () => {
      try {
        await deleteUser(userId)
        setConfirmDelete(false)
      } catch (error) {
        console.error("Failed to delete user:", error)
      }
    })
  }

  return (
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
  )
}
