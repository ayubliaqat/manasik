"use client"

import { useState, useTransition } from "react"
import Link from "next/link"
import { Trash2, Loader2, Pencil, Eye } from "lucide-react"
import { deletePost } from "@/app/admin/blog/actions"

export function PostRowActions({
  postId,
  slug,
}: {
  postId: string
  slug: string
}) {
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

    startTransition(() => {
      deletePost(postId)
    })
  }

  return (
    <div className="flex items-center gap-2">
      <Link
        href={`/blog/${slug}`}
        target="_blank"
        rel="noopener noreferrer"
        title="View post"
        className="flex items-center justify-center h-8 w-8 rounded-full bg-soft-beige/60 text-charcoal hover:bg-soft-beige transition"
      >
        <Eye className="h-3.5 w-3.5" />
      </Link>

      <Link
        href={`/admin/posts/${postId}/edit`}
        title="Edit post"
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
