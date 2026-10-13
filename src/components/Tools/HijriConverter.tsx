"use client"

import { useState, useSyncExternalStore } from "react"
import { CalendarDays, Check, Copy, RotateCcw } from "lucide-react"

type Offset = -1 | 0 | 1
type Mode = "greg" | "hijri"
type Hijri = { day: number; month: number; year: number }
type Result = { greg: Date; hijri: Hijri }
type MonthInfo = { month: number; start: Date | null; length: number }

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

const HIJRI_MONTHS_AR = [
  "محرم",
  "صفر",
  "ربيع الأول",
  "ربيع الآخر",
  "جمادى الأولى",
  "جمادى الآخرة",
  "رجب",
  "شعبان",
  "رمضان",
  "شوال",
  "ذو القعدة",
  "ذو الحجة",
]

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

const OFFSETS: { value: Offset; label: string }[] = [
  { value: -1, label: "1 day earlier" },
  { value: 0, label: "Saudi calendar" },
  { value: 1, label: "1 day later" },
]

const MODES: { id: Mode; label: string }[] = [
  { id: "greg", label: "Gregorian to Hijri" },
  { id: "hijri", label: "Hijri to Gregorian" },
]

const MIN_GREG_YEAR = 1900
const MAX_GREG_YEAR = 2070
const MIN_HIJRI_YEAR = 1320
const MAX_HIJRI_YEAR = 1490
const RING = 2 * Math.PI * 90

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

const gregMonthName = new Intl.DateTimeFormat("en-GB", { month: "long" })
const weekdayName = new Intl.DateTimeFormat("en-GB", { weekday: "long" })

const inputClass =
  "w-full rounded-xl border border-deep-teal/30 bg-white px-3 py-2.5 text-sm text-charcoal shadow-sm outline-none transition focus:border-emerald focus:ring-2 focus:ring-emerald/30"

/* ---------- today store (local date as YYYY-MM-DD) ---------- */

function subscribeToday(onChange: () => void) {
  const id = setInterval(onChange, 60000)
  return () => clearInterval(id)
}

function getToday() {
  const n = new Date()
  const mm = String(n.getMonth() + 1).padStart(2, "0")
  const dd = String(n.getDate()).padStart(2, "0")
  return `${n.getFullYear()}-${mm}-${dd}`
}

function getServerToday() {
  return ""
}

/* ---------- date helpers ---------- */

function hijriAt(y: number, mo: number, d: number): Hijri {
  const parts = hijriFormatter.formatToParts(new Date(y, mo, d, 12))
  const num = (type: string) =>
    Number(parts.find((p) => p.type === type)?.value ?? 0)
  return { day: num("day"), month: num("month"), year: num("year") }
}

function hijriText(h: Hijri) {
  return `${h.day} ${HIJRI_MONTHS[h.month - 1] ?? ""} ${h.year} AH`
}

function isoOf(date: Date) {
  const mm = String(date.getMonth() + 1).padStart(2, "0")
  const dd = String(date.getDate()).padStart(2, "0")
  return `${date.getFullYear()}-${mm}-${dd}`
}

// Start date and length of all 12 months of a Hijri year, cached per year.
// "offset" shifts the Islamic date to match local moon sighting.
const yearCache = new Map<string, MonthInfo[]>()

function getYearMonths(year: number, offset: Offset): MonthInfo[] {
  if (year < MIN_HIJRI_YEAR || year > MAX_HIJRI_YEAR) return []

  const key = `${year}-${offset}`
  const hit = yearCache.get(key)
  if (hit) return hit

  const gy = Math.floor(year * 0.970229 + 621.574)
  const starts = new Map<number, Date>()

  for (let k = 0; k < 1100 && starts.size < 13; k++) {
    const h = hijriAt(gy - 1, 0, 1 + k - offset)
    if (h.day !== 1) continue
    if (h.year === year) {
      starts.set(h.month, new Date(gy - 1, 0, 1 + k, 12))
    } else if (h.year === year + 1 && h.month === 1) {
      starts.set(13, new Date(gy - 1, 0, 1 + k, 12))
    }
  }

  const months: MonthInfo[] = []
  for (let m = 1; m <= 12; m++) {
    const start = starts.get(m) ?? null
    const next = starts.get(m + 1) ?? null
    const length =
      start && next
        ? Math.round((next.getTime() - start.getTime()) / 86400000)
        : 0
    months.push({ month: m, start, length })
  }

  yearCache.set(key, months)
  return months
}

function hijriToGre(
  day: number,
  month: number,
  year: number,
  offset: Offset
): Date | null {
  if (!Number.isInteger(day) || !Number.isInteger(year) || day < 1 || day > 30) {
    return null
  }
  const info = getYearMonths(year, offset)[month - 1]
  if (!info || !info.start || day > info.length) return null
  return new Date(
    info.start.getFullYear(),
    info.start.getMonth(),
    info.start.getDate() + day - 1,
    12
  )
}

/* ---------- component ---------- */

export default function HijriConverter() {
  const todayIso = useSyncExternalStore(
    subscribeToday,
    getToday,
    getServerToday
  )
  const [offset, setOffset] = useState<Offset>(0)
  const [mode, setMode] = useState<Mode>("greg")
  const [gregInput, setGregInput] = useState("")
  const [hDay, setHDay] = useState("")
  const [hMonth, setHMonth] = useState<number | null>(null)
  const [hYear, setHYear] = useState("")
  const [copied, setCopied] = useState(false)

  const ready = todayIso !== ""
  const [ty, tm, td] = ready ? todayIso.split("-").map(Number) : [0, 0, 0]
  const todayGreg = ready ? new Date(ty, tm - 1, td, 12) : null
  const todayH = ready ? hijriAt(ty, tm - 1, td - offset) : null

  const gIso = gregInput || todayIso
  const dayStr = hDay || (todayH ? String(todayH.day) : "")
  const monthNum = hMonth ?? todayH?.month ?? 9
  const yearStr = hYear || (todayH ? String(todayH.year) : "")

  let result: Result | null = null
  let error = ""

  if (ready) {
    if (mode === "greg") {
      const [yy, mm, dd] = gIso.split("-").map(Number)
      if (!yy || !mm || !dd || yy < MIN_GREG_YEAR || yy > MAX_GREG_YEAR) {
        error = `Choose a date between ${MIN_GREG_YEAR} and ${MAX_GREG_YEAR}.`
      } else {
        result = {
          greg: new Date(yy, mm - 1, dd, 12),
          hijri: hijriAt(yy, mm - 1, dd - offset),
        }
      }
    } else {
      const dayN = Number(dayStr)
      const yearN = Number(yearStr)
      const g = hijriToGre(dayN, monthNum, yearN, offset)
      if (g) {
        result = { greg: g, hijri: { day: dayN, month: monthNum, year: yearN } }
      } else {
        error = `That date does not exist. Check the day, month and year (years ${MIN_HIJRI_YEAR} to ${MAX_HIJRI_YEAR}).`
      }
    }
  }

  const months = result ? getYearMonths(result.hijri.year, offset) : []
  const viewInfo = result ? months[result.hijri.month - 1] : undefined
  const viewLength = viewInfo?.length || 30
  const progress = result ? Math.min(1, result.hijri.day / viewLength) : 0
  const runningThisYear = Boolean(
    result && todayH && result.hijri.year === todayH.year
  )
  const viewingRunningMonth = Boolean(
    runningThisYear && todayH && result && result.hijri.month === todayH.month
  )

  const monthDays =
    viewInfo && viewInfo.start
      ? Array.from({ length: viewInfo.length }, (_, k) => ({
          day: k + 1,
          date: new Date(
            viewInfo.start!.getFullYear(),
            viewInfo.start!.getMonth(),
            viewInfo.start!.getDate() + k,
            12
          ),
        }))
      : []
  const lead = viewInfo && viewInfo.start ? viewInfo.start.getDay() : 0

  function switchMode(next: Mode) {
    if (next === mode) return
    if (result) {
      if (next === "hijri") {
        setHDay(String(result.hijri.day))
        setHMonth(result.hijri.month)
        setHYear(String(result.hijri.year))
      } else {
        setGregInput(isoOf(result.greg))
      }
    }
    setMode(next)
  }

  function useToday() {
    setGregInput("")
    setHDay("")
    setHMonth(null)
    setHYear("")
  }

  function jumpToMonth(month: number) {
    if (!result) return
    setHDay("1")
    setHMonth(month)
    setHYear(String(result.hijri.year))
    setMode("hijri")
  }

  async function copyResult() {
    if (!result) return
    const text = `${hijriText(result.hijri)} = ${longDate.format(result.greg)}`
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      setCopied(false)
    }
  }

  /* circle content depends on the direction */
  const circleBig = result
    ? mode === "greg"
      ? result.hijri.day
      : result.greg.getDate()
    : "--"
  const circleLine1 = result
    ? mode === "greg"
      ? (HIJRI_MONTHS[result.hijri.month - 1] ?? "")
      : gregMonthName.format(result.greg)
    : ""
  const circleLine2 = result
    ? mode === "greg"
      ? `${result.hijri.year} AH`
      : String(result.greg.getFullYear())
    : ""
  const circleLine3 = result
    ? mode === "greg"
      ? (HIJRI_MONTHS_AR[result.hijri.month - 1] ?? "")
      : weekdayName.format(result.greg)
    : ""

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
            {todayGreg ? longDate.format(todayGreg) : "--"}
          </p>
          <p className="mt-0.5 text-sm font-medium text-emerald">
            {todayH ? hijriText(todayH) : "--"}
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

      {/* Direction pills */}
      <div
        role="tablist"
        aria-label="Conversion direction"
        className="mt-7 flex flex-wrap justify-center gap-2"
      >
        {MODES.map((opt) => (
          <button
            key={opt.id}
            type="button"
            role="tab"
            aria-selected={mode === opt.id}
            onClick={() => switchMode(opt.id)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
              mode === opt.id
                ? "border-emerald bg-emerald text-white shadow-sm"
                : "border-deep-teal/30 bg-white text-charcoal/70 hover:bg-emerald/10"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="mx-auto mt-5 max-w-lg">
        {mode === "greg" ? (
          <label className="block">
            <span className="mb-1.5 block text-center text-xs font-medium uppercase tracking-wide text-deep-teal/80">
              Gregorian date
            </span>
            <input
              type="date"
              value={gIso}
              min={`${MIN_GREG_YEAR}-01-01`}
              max={`${MAX_GREG_YEAR}-12-31`}
              onChange={(e) => setGregInput(e.target.value)}
              className={`${inputClass} mx-auto max-w-xs text-center`}
            />
          </label>
        ) : (
          <div>
            <span className="mb-1.5 block text-center text-xs font-medium uppercase tracking-wide text-deep-teal/80">
              Hijri date
            </span>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-5">
              <label className="block sm:col-span-1">
                <span className="mb-1 block text-xs text-charcoal/70">Day</span>
                <input
                  type="number"
                  inputMode="numeric"
                  min={1}
                  max={30}
                  value={dayStr}
                  onChange={(e) => setHDay(e.target.value)}
                  className={inputClass}
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="mb-1 block text-xs text-charcoal/70">Month</span>
                <select
                  value={monthNum}
                  onChange={(e) => setHMonth(Number(e.target.value))}
                  className={inputClass}
                >
                  {HIJRI_MONTHS.map((name, i) => (
                    <option key={name} value={i + 1}>
                      {i + 1}. {name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block sm:col-span-2">
                <span className="mb-1 block text-xs text-charcoal/70">Year (AH)</span>
                <input
                  type="number"
                  inputMode="numeric"
                  value={yearStr}
                  onChange={(e) => setHYear(e.target.value)}
                  className={inputClass}
                />
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Result circle */}
      <div className="mt-7 flex flex-col items-center">
        <div className="relative h-56 w-56 sm:h-64 sm:w-64">
          <svg
            viewBox="0 0 200 200"
            className="absolute inset-0 h-full w-full -rotate-90"
            aria-hidden="true"
          >
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              strokeWidth="8"
              className="stroke-deep-teal/15"
            />
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={RING}
              strokeDashoffset={RING * (1 - progress)}
              className="stroke-emerald transition-all duration-500"
            />
          </svg>

          <div className="absolute inset-4 flex flex-col items-center justify-center rounded-full bg-deep-teal px-3 text-center shadow-[0_12px_26px_rgba(6,63,58,0.3)]">
            <p className="font-heading text-5xl font-medium leading-none text-[#2BB589] sm:text-6xl">
              {circleBig}
            </p>
            <p className="mt-2 font-heading text-base font-medium text-white sm:text-lg">
              {circleLine1}
            </p>
            <p className="text-sm text-white/70">{circleLine2}</p>
            <p
              className="mt-1 text-sm text-gold"
              lang={mode === "greg" ? "ar" : undefined}
            >
              {circleLine3}
            </p>
          </div>
        </div>

        {result ? (
          <div className="mt-5 text-center">
            <p className="font-heading text-base font-medium text-emerald sm:text-lg">
              {hijriText(result.hijri)}
            </p>
            <p className="mt-1 text-sm text-charcoal/80 sm:text-base">
              {longDate.format(result.greg)}
            </p>
          </div>
        ) : (
          <p className="mt-5 max-w-md text-center text-sm leading-6 text-charcoal/70">
            {error || "Loading..."}
          </p>
        )}

        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={useToday}
            className="inline-flex items-center gap-2 rounded-xl border border-emerald/40 px-4 py-2 text-sm font-medium text-emerald transition hover:bg-emerald/10"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Use today
          </button>
          <button
            type="button"
            onClick={copyResult}
            disabled={!result}
            className="inline-flex items-center gap-2 rounded-xl bg-emerald px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {copied ? (
              <Check className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Copy className="h-4 w-4" aria-hidden="true" />
            )}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>

      {/* All months of the year */}
      {result && months.length > 0 && (
        <div className="mt-9">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-heading text-base font-medium text-deep-teal sm:text-lg">
              Months of {result.hijri.year} AH
            </h3>
            <div className="flex items-center gap-4 text-xs text-charcoal/70">
              <span className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-gold" aria-hidden="true" />
                Running now
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-emerald" aria-hidden="true" />
                Selected
              </span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {months.map((m) => {
              const isCurrent = Boolean(
                runningThisYear && todayH && m.month === todayH.month
              )
              const isSelected = m.month === result.hijri.month

              let tone =
                "border-deep-teal/10 bg-white text-charcoal hover:border-emerald"
              if (isCurrent) tone = "border-gold bg-gold text-deep-teal"
              else if (isSelected) tone = "border-emerald bg-emerald text-white"

              return (
                <button
                  key={m.month}
                  type="button"
                  onClick={() => jumpToMonth(m.month)}
                  aria-pressed={isSelected}
                  className={`rounded-xl border px-3 py-3 text-left transition ${tone} ${
                    isCurrent && isSelected
                      ? "ring-2 ring-emerald ring-offset-2 ring-offset-card"
                      : ""
                  }`}
                >
                  <span className="block text-[10px] font-medium uppercase tracking-wide opacity-70">
                    Month {m.month}
                  </span>
                  <span className="mt-0.5 flex items-baseline justify-between gap-2">
                    <span className="font-heading text-sm font-medium sm:text-base">
                      {HIJRI_MONTHS[m.month - 1]}
                    </span>
                    <span className="text-sm opacity-80" lang="ar">
                      {HIJRI_MONTHS_AR[m.month - 1]}
                    </span>
                  </span>
                  <span className="mt-1 block text-xs opacity-75">
                    {m.start
                      ? `${shortDate.format(m.start)} · ${m.length || "?"} days`
                      : "--"}
                  </span>
                </button>
              )
            })}
          </div>
          <p className="mt-2 text-xs leading-5 text-charcoal/70">
            Tap a month to jump to its first day. The date under each month is
            its Gregorian start.
          </p>
        </div>
      )}

      {/* Day view of the selected month */}
      {result && monthDays.length > 0 && (
        <div className="mt-8">
          <h3 className="font-heading text-base font-medium text-deep-teal sm:text-lg">
            {HIJRI_MONTHS[result.hijri.month - 1]} {result.hijri.year} AH
          </h3>

          <div className="mt-4 grid grid-cols-7 gap-1.5 sm:gap-2">
            {WEEKDAYS.map((w) => (
              <p
                key={w}
                className="pb-1 text-center text-[10px] font-medium uppercase tracking-wide text-deep-teal/70 sm:text-xs"
              >
                {w}
              </p>
            ))}

            {Array.from({ length: lead }, (_, i) => (
              <span key={`blank-${i}`} aria-hidden="true" />
            ))}

            {monthDays.map((c) => {
              const isToday = Boolean(
                viewingRunningMonth && todayH && c.day === todayH.day
              )
              const isSelected = c.day === result.hijri.day

              let tone = "border-deep-teal/10 bg-white text-charcoal"
              if (isToday) tone = "border-gold bg-gold text-deep-teal"
              else if (isSelected) tone = "border-emerald bg-emerald text-white"

              return (
                <div
                  key={c.day}
                  className={`rounded-lg border px-0.5 py-1.5 text-center sm:rounded-xl sm:py-2 ${tone} ${
                    isToday && isSelected
                      ? "ring-2 ring-emerald ring-offset-1 ring-offset-card"
                      : ""
                  }`}
                >
                  <span className="block font-heading text-sm font-medium sm:text-base">
                    {c.day}
                  </span>
                  <span className="block text-[9px] leading-3 opacity-75 sm:text-[10px] sm:leading-4">
                    {shortDate.format(c.date)}
                  </span>
                </div>
              )
            })}
          </div>

          <p className="mt-3 text-xs leading-5 text-charcoal/70">
            Each box shows the Hijri day with its Gregorian date underneath.
            Today is gold when you are viewing the running month, and your
            converted date is emerald.
          </p>
        </div>
      )}

      <p className="mt-6 text-xs leading-5 text-charcoal/70">
        Dates follow the Saudi Umm al-Qura calendar. The real start of a month
        depends on moon sighting, so it can be a day different where you live.
        Use the date adjustment to match your local calendar.
      </p>
    </div>
  )
}