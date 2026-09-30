"use client"

import { useCallback, useMemo, useSyncExternalStore } from "react"
import { Check, RotateCcw } from "lucide-react"

export type ChecklistGroup = {
  title: string
  items: { id: string; label: string }[]
}

const CHANGE_EVENT = "manasik-checklist-change"

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback)
  window.addEventListener(CHANGE_EVENT, callback)
  return () => {
    window.removeEventListener("storage", callback)
    window.removeEventListener(CHANGE_EVENT, callback)
  }
}

function readStored(key: string) {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

export default function Checklist({
  groups,
  storageKey,
}: {
  groups: ChecklistGroup[]
  storageKey: string
}) {
  const raw = useSyncExternalStore(
    subscribe,
    () => readStored(storageKey),
    () => null
  )

  const checked = useMemo<string[]>(() => {
    if (!raw) return []
    try {
      const parsed = JSON.parse(raw)
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  }, [raw])

  const save = useCallback(
    (next: string[]) => {
      try {
        localStorage.setItem(storageKey, JSON.stringify(next))
      } catch {}
      window.dispatchEvent(new Event(CHANGE_EVENT))
    },
    [storageKey]
  )

  const toggle = (id: string) =>
    save(checked.includes(id) ? checked.filter((x) => x !== id) : [...checked, id])

  const total = groups.reduce((n, g) => n + g.items.length, 0)
  const done = groups.reduce(
    (n, g) => n + g.items.filter((i) => checked.includes(i.id)).length,
    0
  )
  const pct = total ? Math.round((done / total) * 100) : 0

  return (
    <div>
      {/* Progress */}
      <div
        className="
          mb-5 flex flex-col gap-4 rounded-2xl
          border-[1.5px] border-deep-teal/60 bg-card p-4 sm:flex-row sm:items-center sm:p-5
          shadow-[inset_0_0_14px_rgba(6,63,58,0.2),0_2px_4px_rgba(6,63,58,0.1),0_12px_26px_rgba(6,63,58,0.18)]
        "
      >
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-3">
            <p className="text-sm font-semibold text-deep-teal">
              {done} of {total} complete
            </p>
            <p className="text-sm font-semibold text-emerald">{pct}%</p>
          </div>
          <div
            className="mt-2 h-2.5 overflow-hidden rounded-full bg-emerald/15"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={pct}
            aria-label="Checklist progress"
          >
            <div
              className={`h-full rounded-full transition-all duration-500 ease-out ${
                pct === 100 ? "bg-gold" : "bg-emerald"
              }`}
              style={{ width: `${pct}%` }}
            />
          </div>
          {pct === 100 && (
            <p className="mt-2 text-xs text-muted-teal">
              All done. May your journey be easy and accepted.
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={() => save([])}
          className="
            flex shrink-0 items-center justify-center gap-2
            rounded-xl border border-deep-teal/40
            px-4 py-2.5 text-xs font-semibold text-deep-teal
            transition-colors duration-300
            hover:border-emerald hover:bg-emerald hover:text-white
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald/50
          "
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          Reset list
        </button>
      </div>

      {/* Groups */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {groups.map((group) => {
          const groupDone = group.items.filter((i) => checked.includes(i.id)).length
          return (
            <section
              key={group.title}
              className="
                min-w-0 rounded-2xl
                border-[1.5px] border-deep-teal/60 bg-card p-4
                shadow-[inset_0_0_14px_rgba(6,63,58,0.2),0_2px_4px_rgba(6,63,58,0.1),0_12px_26px_rgba(6,63,58,0.18)]
              "
            >
              <div className="mb-2 flex items-center justify-between gap-3 border-b border-deep-teal/15 pb-2.5">
                <h3 className="font-heading text-sm font-semibold text-deep-teal">
                  {group.title}
                </h3>
                <span className="rounded-full bg-emerald/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald">
                  {groupDone}/{group.items.length}
                </span>
              </div>

              <ul>
                {group.items.map((item) => {
                  const isChecked = checked.includes(item.id)
                  return (
                    <li key={item.id}>
                      <label className="flex cursor-pointer items-start gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-emerald/5">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggle(item.id)}
                          className="peer sr-only"
                        />
                        <span
                          className={`
                            mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center
                            rounded-md border-[1.5px] text-white
                            transition-colors duration-200
                            peer-focus-visible:ring-2 peer-focus-visible:ring-emerald/40
                            ${
                              isChecked
                                ? "border-emerald bg-emerald"
                                : "border-deep-teal/50 bg-white"
                            }
                          `}
                        >
                          {isChecked && <Check className="h-3.5 w-3.5" aria-hidden="true" />}
                        </span>
                        <span
                          className={`text-[13px] leading-snug transition-colors ${
                            isChecked ? "text-muted-teal line-through" : "text-charcoal"
                          }`}
                        >
                          {item.label}
                        </span>
                      </label>
                    </li>
                  )
                })}
              </ul>
            </section>
          )
        })}
      </div>
    </div>
  )
}