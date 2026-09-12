"use client"

import { Loader2, Eye, Send } from "lucide-react"

export function PublishBox({
  status,
  isSaving,
  isEditing,
  onSave,
  onCancel,
}: {
  status: string
  isSaving: boolean
  isEditing: boolean
  onSave: (status: string) => void
  onCancel: () => void
}) {
  return (
    <div className="rounded-2xl bg-card border border-soft-beige shadow-sm p-5">
      <h3 className="text-sm font-semibold text-charcoal mb-4">Publish</h3>

      <div className="mb-4">
        <label className="block text-xs font-medium text-charcoal mb-1.5">Status</label>
        <div className="flex items-center gap-2">
          <span
            className={`h-2 w-2 rounded-full ${
              status === "published"
                ? "bg-emerald"
                : status === "scheduled"
                ? "bg-gold"
                : "bg-muted-teal"
            }`}
          />
          <span className="text-sm text-charcoal capitalize">{status}</span>
        </div>
      </div>

      <div className="space-y-2">
        <button
          type="button"
          disabled={isSaving}
          onClick={() => onSave("published")}
          className="w-full flex items-center justify-center gap-2 rounded-full bg-emerald hover:opacity-90 text-warm-white font-medium py-2.5 text-sm transition disabled:opacity-60"
        >
          {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          {isEditing ? "Update & Publish" : "Publish"}
        </button>

        <button
          type="button"
          disabled={isSaving}
          onClick={() => onSave("draft")}
          className="w-full flex items-center justify-center gap-2 rounded-full bg-soft-beige/60 hover:bg-soft-beige text-charcoal font-medium py-2.5 text-sm transition disabled:opacity-60"
        >
          <Eye className="h-4 w-4" />
          Save as Draft
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="w-full text-center text-xs text-muted-teal hover:text-charcoal py-1.5 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
