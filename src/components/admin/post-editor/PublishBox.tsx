"use client"

import { useState } from "react"
import { Loader2, Eye, Send, CalendarClock } from "lucide-react"
import type { PostStatus } from "./PostEditor"

function formatScheduled(value: string) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ""
  return date.toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function PublishBox({
  status,
  scheduledAt,
  onScheduledAtChange,
  isSaving,
  isEditing,
  canPublish,
  onSave,
  onCancel,
}: {
  status: PostStatus
  // Local date and time from the picker, e.g. "2026-11-20T09:30"
  scheduledAt: string
  onScheduledAtChange: (value: string) => void
  isSaving: boolean
  isEditing: boolean
  canPublish: boolean
  onSave: (status: PostStatus) => void
  onCancel: () => void
}) {
  // The date picker stays hidden until Schedule is clicked
  // (already open when editing a post that is scheduled)
  const [showSchedule, setShowSchedule] = useState(status === "scheduled")
  const [scheduleError, setScheduleError] = useState("")

  const scheduledTime = scheduledAt ? new Date(scheduledAt).getTime() : NaN
  const hasValidDate = Number.isFinite(scheduledTime)

  function toggleSchedule() {
    setScheduleError("")
    setShowSchedule((open) => !open)
  }

  function handleDateChange(value: string) {
    setScheduleError("")
    onScheduledAtChange(value)
  }

  function handleConfirmSchedule() {
    if (!hasValidDate) {
      setScheduleError("Choose a date and time first.")
      return
    }

    if (scheduledTime <= Date.now()) {
      setScheduleError("Choose a date and time in the future.")
      return
    }

    setScheduleError("")
    onSave("scheduled")
  }

  return (
    <div className="rounded-2xl bg-card border border-soft-beige shadow-sm p-5">
      <h3 className="text-sm font-semibold text-charcoal mb-4">Publish</h3>

      <div className="mb-4">
        <label className="block text-xs font-medium text-charcoal mb-1.5">
          Status
        </label>

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

          <span className="text-sm text-charcoal capitalize">
            {status}
            {status === "scheduled" && scheduledAt
              ? ` · ${formatScheduled(scheduledAt)}`
              : ""}
          </span>
        </div>
      </div>

      <div className="space-y-2">
        {canPublish && (
          <button
            type="button"
            disabled={isSaving}
            onClick={() => onSave("published")}
            className="w-full flex items-center justify-center gap-2 rounded-full bg-emerald hover:opacity-90 text-warm-white font-medium py-2.5 text-sm transition disabled:opacity-60"
          >
            {isSaving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}

            {isEditing ? "Update & Publish" : "Publish"}
          </button>
        )}

        {canPublish && (
          <>
            <button
              type="button"
              disabled={isSaving}
              onClick={toggleSchedule}
              aria-expanded={showSchedule}
              aria-controls="schedule-panel"
              className="w-full flex items-center justify-center gap-2 rounded-full bg-soft-beige/60 hover:bg-soft-beige text-charcoal font-medium py-2.5 text-sm transition disabled:opacity-60"
            >
              <CalendarClock className="h-4 w-4" />
              {status === "scheduled" ? "Update Schedule" : "Schedule"}
            </button>

            {showSchedule && (
              <div
                id="schedule-panel"
                className="rounded-xl border border-soft-beige bg-soft-beige/30 p-3.5 space-y-3"
              >
                <div>
                  <label
                    htmlFor="schedule-at"
                    className="block text-xs font-medium text-charcoal mb-1.5"
                  >
                    Publish on
                  </label>

                  <input
                    id="schedule-at"
                    type="datetime-local"
                    value={scheduledAt}
                    onChange={(e) => handleDateChange(e.target.value)}
                    className="w-full rounded-lg border border-soft-beige bg-warm-white px-3.5 py-2.5 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-emerald focus:border-emerald transition"
                  />

                  {scheduleError ? (
                    <p role="alert" className="mt-1.5 text-[11px] text-red-600">
                      {scheduleError}
                    </p>
                  ) : (
                    <p className="mt-1.5 text-[11px] text-muted-teal">
                      The post goes live automatically at this time.
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  disabled={isSaving || !scheduledAt}
                  onClick={handleConfirmSchedule}
                  className="w-full flex items-center justify-center gap-2 rounded-full bg-emerald hover:opacity-90 text-warm-white font-medium py-2.5 text-sm transition disabled:opacity-50 disabled:pointer-events-none"
                >
                  {isSaving ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <CalendarClock className="h-4 w-4" />
                  )}
                  Confirm Schedule
                </button>
              </div>
            )}
          </>
        )}

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