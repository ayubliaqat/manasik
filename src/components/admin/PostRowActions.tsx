"use client"

import { useState, useTransition } from "react"
import Link from "next/link"
import { Trash2, Loader2, Pencil, Eye } from "lucide-react"
import { deletePost } from "@/app/admin/blog/actions"

export function PostRowActions({
  postId,
  slug,
  canEdit,
  canDelete,
}: {
  postId: string
  slug: string
  canEdit: boolean
  canDelete: boolean
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

  const iconBtn =
    "inline-flex items-center justify-center h-7 w-7 shrink-0 rounded-full border border-emerald/25 text-muted-teal transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald/40"

  return (
    <div className="flex items-center gap-1">
      <Link
        href={`/blog/${slug}`}
        target="_blank"
        rel="noopener noreferrer"
        title="View post"
        aria-label="View post"
        className={`${iconBtn} hover:bg-soft-beige/70 hover:text-charcoal`}
      >
        <Eye className="h-3.5 w-3.5" aria-hidden="true" />
      </Link>

      {canEdit && (
        <Link
          href={`/admin/posts/${postId}/edit`}
          title="Edit post"
          aria-label="Edit post"
          className={`${iconBtn} hover:bg-soft-beige/70 hover:text-charcoal`}
        >
          <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      )}

      {canDelete && (
        <button
          type="button"
          onClick={handleDelete}
          disabled={isPending}
          title={confirmDelete ? "Click again to confirm delete" : "Delete post"}
          aria-label={confirmDelete ? "Confirm delete post" : "Delete post"}
          className={`${iconBtn} disabled:opacity-60 ${
            confirmDelete
              ? "bg-red-600 text-white hover:bg-red-600"
              : "text-red-600 hover:bg-red-50 hover:text-red-600"
          }`}
        >
          {isPending ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
          ) : (
            <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
          )}
        </button>
      )}
    </div>
  )
}