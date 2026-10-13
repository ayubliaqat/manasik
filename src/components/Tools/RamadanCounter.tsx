"use client"

import { useState, useSyncExternalStore } from "react"
import { CalendarDays, Check, Moon, Star } from "lucide-react"

type Offset = -1 | 0 | 1
type TabId = "calendar" | "dates"
type Hijri = { day: number; month: number; year: number }
type DayInfo = { idx: number; h: Hijri }
type RamadanInfo = { startIdx: number; endIdx: number; year: number }
type EventInfo = { name: string; note: string; idx: number; h: Hijri }

const HIJRI_MONTHS = [
  "Muharram",
  "Safar",
  "Rabi' al-Awwal",
  "Rabi' al-Thani",
  "Jumada al-Ula",
  "Jumada al-Thani",
  "Rajab",
  "Sha'ban",
  "Ramadan",
  "Shawwal",
  "Dhul Qa'dah",
  "Dhul Hijjah",
]

const KEY_DATES = [
  { name: "Islamic New Year", note: "First day of Muharram", month: 1, day: 1 },
  { name: "Day of Ashura", note: "10 Muharram", month: 1, day: 10 },
  { name: "Ramadan begins", note: "First day of fasting", month: 9, day: 1 },
  { name: "Eid al-Fitr", note: "End of Ramadan", month: 10, day: 1 },
  { name: "Hajj begins", note: "Day of Tarwiyah", month: 12, day: 8 },
  { name: "Day of Arafah", note: "The standing at Arafah", month: 12, day: 9 },
  { name: "Eid al-Adha", note: "Festival of Sacrifice", month: 12, day: 10 },
]

const OFFSETS: { value: Offset; label: string }[] = [
  { value: -1, label: "1 day earlier" },
  { value: 0, label: "Saudi calendar" },
  { value: 1, label: "1 day later" },
]

const TABS: { id: TabId; label: string }[] = [
  { id: "calendar", label: "Ramadan calendar" },
  { id: "dates", label: "Islamic dates" },
]

const hijriFormatter = new Intl.DateTimeFormat("en-u-ca-islamic-umalqura", {
  day: "numeric",
  month: "numeric",
  year: "numeric",
})

const longDate = new Intl.DateTimeFormat("en-GB", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
})

const shortDate = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
})

const FAST_EVENT = "manasik-ramadan-fasts"

/* ---------- clock store ---------- */

function subscribeClock(onChange: () => void) {
  const id = setInterval(onChange, 1000)
  return () => clearInterval(id)
}

function getClock() {
  return Math.floor(Date.now() / 1000) * 1000
}

function getServerClock() {
  return 0
}

/* ---------- fasting store (localStorage) ---------- */

function subscribeFasts(onChange: () => void) {
  window.addEventListener("storage", onChange)
  window.addEventListener(FAST_EVENT, onChange)
  return () => {
    window.removeEventListener("storage", onChange)
    window.removeEventListener(FAST_EVENT, onChange)
  }
}

function readFasts(key: string) {
  try {
    return window.localStorage.getItem(key) ?? ""
  } catch {
    return ""
  }
}

function getServerFasts() {
  return ""
}

function parseFasts(raw: string): number[] {
  if (!raw) return []
  try {
    const value: unknown = JSON.parse(raw)
    if (!Array.isArray(value)) return []
    return value.filter((n): n is number => Number.isInteger(n))
  } catch {
    return []
  }
}

function toggleFast(key: string, day: number) {
  const current = parseFasts(readFasts(key))
  const next = current.includes(day)
    ? current.filter((n) => n !== day)
    : [...current, day].sort((a, b) => a - b)
  try {
    window.localStorage.setItem(key, JSON.stringify(next))
  } catch {
    return
  }
  window.dispatchEvent(new Event(FAST_EVENT))
}

/* ---------- date helpers ---------- */

function dateParts(ms: number) {
  if (!ms) return { y: 0, mo: 0, d: 0 }
  const dt = new Date(ms)
  return { y: dt.getFullYear(), mo: dt.getMonth(), d: dt.getDate() }
}

function hijriAt(y: number, mo: number, d: number): Hijri {
  const parts = hijriFormatter.formatToParts(new Date(y, mo, d, 12))
  const num = (type: string) =>
    Number(parts.find((p) => p.type === type)?.value ?? 0)
  return { day: num("day"), month: num("month"), year: num("year") }
}

function formatHijri(h: Hijri) {
  return `${h.day} ${HIJRI_MONTHS[h.month - 1] ?? ""} ${h.year} AH`
}

function pad(n: number) {
  return String(n).padStart(2, "0")
}

// Index 0 is today. "offset" shifts the Islamic date to match local moon sighting.
function buildData(y: number, mo: number, d: number, offset: Offset) {
  const days: DayInfo[] = []
  for (let i = -31; i <= 420; i++) {
    days.push({ idx: i, h: hijriAt(y, mo, d + i - offset) })
  }

  let ramadan: RamadanInfo | null = null
  let startIdx: number | null = null
  let year = 0
  for (const { idx, h } of days) {
    if (h.month === 9 && h.day === 1 && startIdx === null) {
      startIdx = idx
      year = h.year
    } else if (h.month === 10 && h.day === 1 && startIdx !== null) {
      if (idx > 0) {
        ramadan = { startIdx, endIdx: idx, year }
        break
      }
      startIdx = null
    }
  }

  const events: EventInfo[] = []
  for (const k of KEY_DATES) {
    const found = days.find(
      (x) => x.idx >= 0 && x.h.month === k.month && x.h.day === k.day
    )
    if (found) {
      events.push({ name: k.name, note: k.note, idx: found.idx, h: found.h })
    }
  }
  events.sort((a, b) => a.idx - b.idx)

  return { todayH: days[31].h, ramadan, events }
}

// Cached per day, so the scan runs once a day instead of every second.
const dataCache = new Map<string, ReturnType<typeof buildData>>()

function getData(y: number, mo: number, d: number, offset: Offset) {
  const key = `${y}-${mo}-${d}-${offset}`
  const hit = dataCache.get(key)
  if (hit) return hit
  const value = buildData(y, mo, d, offset)
  dataCache.set(key, value)
  return value
}

function splitTime(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000))
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  }
}

function relativeDays(idx: number) {
  if (idx === 0) return "Today"
  if (idx === 1) return "Tomorrow"
  return `In ${idx} days`
}

/* ---------- component ---------- */

export default function RamadanCounter() {
  const now = useSyncExternalStore(subscribeClock, getClock, getServerClock)
  const [offset, setOffset] = useState<Offset>(0)
  const [tab, setTab] = useState<TabId>("calendar")

  const { y, mo, d } = dateParts(now)
  const data = y ? getData(y, mo, d, offset) : null

  const info = data?.ramadan ?? null
  const ready = Boolean(now && data && info)

  const fastKey = `manasik-ramadan-fasts-${info?.year ?? 0}`
  const rawFasts = useSyncExternalStore(
    subscribeFasts,
    () => readFasts(fastKey),
    getServerFasts
  )
  const fasted = parseFasts(rawFasts)

  let during = false
  let dayNumber = 0
  let total = 0
  let startDate: Date | null = null
  let eidDate: Date | null = null
  let remainingMs = 0

  if (info && now) {
    startDate = new Date(y, mo, d + info.startIdx, 0, 0, 0)
    eidDate = new Date(y, mo, d + info.endIdx, 0, 0, 0)
    during = info.startIdx <= 0
    total = info.endIdx - info.startIdx
    dayNumber = during ? -info.startIdx + 1 : 0
    remainingMs = (during ? eidDate : startDate).getTime() - now
  }

  const t = splitTime(remainingMs)
  const pct = during && total ? Math.min(100, (dayNumber / total) * 100) : 0
  const lastTen = during && dayNumber >= total - 9

  const units = [
    { label: "Days", value: t.days },
    { label: "Hours", value: t.hours },
    { label: "Minutes", value: t.minutes },
    { label: "Seconds", value: t.seconds },
  ]

  const calendar =
    info && ready
      ? Array.from({ length: total }, (_, k) => ({
          day: k + 1,
          idx: info.startIdx + k,
          date: new Date(y, mo, d + info.startIdx + k),
        }))
      : []

  const fastedCount = fasted.filter((n) => n >= 1 && n <= total).length

  return (
    <div
      className="
        rounded-2xl border-[1.5px] border-deep-teal/60 bg-card p-5 sm:p-8
        shadow-[inset_0_0_14px_rgba(6,63,58,0.2),0_2px_4px_rgba(6,63,58,0.1),0_12px_26px_rgba(6,63,58,0.18)]
      "
    >
      {/* Today + adjustment */}
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="text-center md:text-left">
          <p className="text-xs font-medium uppercase tracking-wide text-deep-teal/80">
            Today
          </p>
          <p className="mt-1 font-heading text-base font-medium text-deep-teal sm:text-lg">
            {now ? longDate.format(now) : "--"}
          </p>
          <p className="mt-0.5 text-sm font-medium text-emerald">
            {data ? formatHijri(data.todayH) : "--"}
          </p>
        </div>

        <div className="md:w-[22rem]">
          <span className="mb-1.5 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-deep-teal/80">
            <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
            Date adjustment
          </span>
          <div className="grid grid-cols-1 gap-1 rounded-xl border border-deep-teal/30 bg-white p-1 sm:grid-cols-3">
            {OFFSETS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setOffset(opt.value)}
                aria-pressed={offset === opt.value}
                className={`rounded-lg px-3 py-1.5 text-sm transition ${
                  offset === opt.value
                    ? "bg-emerald text-white shadow-sm"
                    : "text-charcoal/70 hover:bg-emerald/10"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Countdown + details */}
      <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-5">
        <div className="relative overflow-hidden rounded-2xl bg-deep-teal p-5 shadow-[0_12px_26px_rgba(6,63,58,0.25)] sm:p-7 md:col-span-3">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-12 right-6 h-32 w-32 rounded-full bg-emerald/20 blur-2xl"
          />

          <div className="relative flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-gold">
              <Moon className="h-5 w-5" aria-hidden="true" />
            </span>
            <h3 className="font-heading text-base font-medium text-white sm:text-lg">
              {!ready
                ? "Ramadan"
                : during
                  ? "Time until Eid al-Fitr"
                  : `Time until Ramadan ${info?.year}`}
            </h3>
          </div>

          <div className="relative mt-6 grid grid-cols-4 gap-2 sm:gap-3">
            {units.map((u) => (
              <div
                key={u.label}
                className="rounded-xl bg-white/10 px-1 py-3 text-center sm:py-4"
              >
                <p className="font-heading text-2xl font-medium tabular-nums text-[#2BB589] sm:text-3xl lg:text-4xl">
                  {ready ? pad(u.value) : "--"}
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-wide text-white/70 sm:text-xs">
                  {u.label}
                </p>
              </div>
            ))}
          </div>

          {ready && during && (
            <div className="relative mt-6">
              <div className="flex items-center justify-between text-sm text-white/80">
                <span>
                  Day {dayNumber} of {total}
                </span>
                <span>{Math.round(pct)}%</span>
              </div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gold transition-all"
                  style={{ width: `${pct}%` }}
                />
              </div>
              {lastTen && (
                <p className="mt-3 text-sm text-gold">
                  The last ten days of Ramadan have begun.
                </p>
              )}
            </div>
          )}

          {ready && !during && (
            <p className="relative mt-6 text-center text-sm text-white/70">
              Counting down to the first day of Ramadan.
            </p>
          )}
        </div>

        <div className="space-y-3 md:col-span-2">
          <div className="rounded-xl border border-deep-teal/10 bg-white px-4 py-3">
            <p className="text-xs font-medium uppercase tracking-wide text-deep-teal/80">
              Ramadan starts
            </p>
            <p className="mt-1 font-heading text-base font-medium text-deep-teal">
              {ready && startDate ? longDate.format(startDate) : "--"}
            </p>
            <p className="text-sm text-emerald">
              {ready && info ? `1 Ramadan ${info.year} AH` : ""}
            </p>
          </div>

          <div className="rounded-xl border border-deep-teal/10 bg-white px-4 py-3">
            <p className="text-xs font-medium uppercase tracking-wide text-deep-teal/80">
              Eid al-Fitr
            </p>
            <p className="mt-1 font-heading text-base font-medium text-deep-teal">
              {ready && eidDate ? longDate.format(eidDate) : "--"}
            </p>
            <p className="text-sm text-emerald">
              {ready && info ? `1 Shawwal ${info.year} AH` : ""}
            </p>
          </div>

          <div className="rounded-xl border border-deep-teal/10 bg-white px-4 py-3">
            <p className="text-xs font-medium uppercase tracking-wide text-deep-teal/80">
              Length
            </p>
            <p className="mt-1 font-heading text-base font-medium text-deep-teal">
              {ready ? `${total} days` : "--"}
            </p>
          </div>
        </div>
      </div>

      <p className="mt-3 text-xs leading-5 text-charcoal/70">
        Dates follow the Saudi Umm al-Qura calendar. The real start depends on
        moon sighting, so it can be a day different where you live. The
        adjustment applies to every date on this page.
      </p>

      {/* Tabs */}
      <div
        role="tablist"
        aria-label="Ramadan tools"
        className="mt-7 grid grid-cols-2 gap-1 rounded-xl border border-deep-teal/30 bg-white p-1"
      >
        {TABS.map((opt) => (
          <button
            key={opt.id}
            type="button"
            role="tab"
            aria-selected={tab === opt.id}
            onClick={() => setTab(opt.id)}
            className={`rounded-lg px-2 py-2 text-xs transition sm:text-sm ${
              tab === opt.id
                ? "bg-emerald text-white shadow-sm"
                : "text-charcoal/70 hover:bg-emerald/10"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <div className="mt-5">
        {/* Calendar tab */}
        {tab === "calendar" && (
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-heading text-base font-medium text-deep-teal sm:text-lg">
                {ready && info ? `Ramadan ${info.year} calendar` : "Ramadan calendar"}
              </h3>
              {ready && (
                <p className="text-sm text-charcoal/70">
                  {fastedCount} of {total} days fasted
                </p>
              )}
            </div>

            {ready ? (
              <div className="mt-4 grid grid-cols-5 gap-2 sm:grid-cols-6 md:grid-cols-10">
                {calendar.map((c) => {
                  const isFasted = fasted.includes(c.day)
                  const isToday = c.idx === 0
                  const canMark = c.idx <= 0
                  const isLastTen = c.day > total - 10

                  let tone = "border-deep-teal/10 bg-white text-charcoal"
                  if (isFasted) tone = "border-emerald bg-emerald text-white"
                  else if (isLastTen) tone = "border-gold/60 bg-gold/10 text-charcoal"

                  return (
                    <button
                      key={c.day}
                      type="button"
                      disabled={!canMark}
                      onClick={() => toggleFast(fastKey, c.day)}
                      aria-pressed={isFasted}
                      aria-label={`Day ${c.day}, ${shortDate.format(c.date)}`}
                      className={`relative rounded-xl border px-1 py-2 text-center transition ${tone} ${
                        isToday ? "ring-2 ring-gold" : ""
                      } ${canMark ? "hover:border-emerald" : "cursor-not-allowed opacity-50"}`}
                    >
                      {isFasted && (
                        <Check
                          className="absolute right-1 top-1 h-3 w-3"
                          aria-hidden="true"
                        />
                      )}
                      <span className="block font-heading text-base font-medium">
                        {c.day}
                      </span>
                      <span className="block text-[10px] leading-4 opacity-75">
                        {shortDate.format(c.date)}
                      </span>
                    </button>
                  )
                })}
              </div>
            ) : (
              <p className="mt-4 text-sm text-charcoal/70">Loading calendar...</p>
            )}

            <p className="mt-3 text-xs leading-5 text-charcoal/70">
              Each box shows the day of Ramadan and its Gregorian date. Tap a day
              to mark it as fasted. Days after today are locked. The last ten
              days have a gold tint. Your ticks are saved only on this device.
            </p>
          </div>
        )}

        {/* Key Islamic dates tab */}
        {tab === "dates" && (
          <div>
            <h3 className="font-heading text-base font-medium text-deep-teal sm:text-lg">
              Upcoming Islamic dates
            </h3>

            {data && ready ? (
              <ul className="mt-4 space-y-2">
                {data.events.map((ev) => (
                  <li
                    key={ev.name}
                    className="flex items-center justify-between gap-3 rounded-xl border border-deep-teal/10 bg-white px-4 py-3"
                  >
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald/10 text-emerald">
                        <Star className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="font-heading text-base font-medium text-deep-teal">
                          {ev.name}
                        </p>
                        <p className="text-sm text-charcoal/70">
                          {longDate.format(new Date(y, mo, d + ev.idx))}
                        </p>
                        <p className="text-xs text-emerald">
                          {formatHijri(ev.h)} &middot; {ev.note}
                        </p>
                      </div>
                    </div>
                    <span className="shrink-0 rounded-full bg-gold/20 px-3 py-1 text-xs font-medium text-deep-teal">
                      {relativeDays(ev.idx)}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-sm text-charcoal/70">Loading dates...</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}