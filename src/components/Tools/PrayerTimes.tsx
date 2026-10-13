"use client"

import { useEffect, useState } from "react"
import { Clock, MapPin, RefreshCw } from "lucide-react"

type City = { name: string; country: string; tz: string }

type Region = {
  id: string
  label: string
  method: number
  asr: 0 | 1
  cities: City[]
}

const REGIONS: Region[] = [
  {
    id: "uk",
    label: "United Kingdom",
    method: 3,
    asr: 0,
    cities: [
      { name: "London", country: "United Kingdom", tz: "Europe/London" },
      { name: "Birmingham", country: "United Kingdom", tz: "Europe/London" },
      { name: "Manchester", country: "United Kingdom", tz: "Europe/London" },
      { name: "Bradford", country: "United Kingdom", tz: "Europe/London" },
      { name: "Leicester", country: "United Kingdom", tz: "Europe/London" },
      { name: "Glasgow", country: "United Kingdom", tz: "Europe/London" },
      { name: "Cardiff", country: "United Kingdom", tz: "Europe/London" },
    ],
  },
  {
    id: "sa",
    label: "Saudi Arabia",
    method: 4,
    asr: 0,
    cities: [
      { name: "Makkah", country: "Saudi Arabia", tz: "Asia/Riyadh" },
      { name: "Madinah", country: "Saudi Arabia", tz: "Asia/Riyadh" },
      { name: "Jeddah", country: "Saudi Arabia", tz: "Asia/Riyadh" },
      { name: "Riyadh", country: "Saudi Arabia", tz: "Asia/Riyadh" },
    ],
  },
  {
    id: "pk",
    label: "Pakistan",
    method: 1,
    asr: 1,
    cities: [
      { name: "Lahore", country: "Pakistan", tz: "Asia/Karachi" },
      { name: "Karachi", country: "Pakistan", tz: "Asia/Karachi" },
      { name: "Islamabad", country: "Pakistan", tz: "Asia/Karachi" },
      { name: "Peshawar", country: "Pakistan", tz: "Asia/Karachi" },
    ],
  },
  {
    id: "kw",
    label: "Kuwait",
    method: 9,
    asr: 0,
    cities: [{ name: "Kuwait City", country: "Kuwait", tz: "Asia/Kuwait" }],
  },
  {
    id: "ae",
    label: "United Arab Emirates",
    method: 8,
    asr: 0,
    cities: [
      { name: "Dubai", country: "United Arab Emirates", tz: "Asia/Dubai" },
      { name: "Abu Dhabi", country: "United Arab Emirates", tz: "Asia/Dubai" },
    ],
  },
  {
    id: "tr",
    label: "Turkey",
    method: 13,
    asr: 0,
    cities: [
      { name: "Istanbul", country: "Turkey", tz: "Europe/Istanbul" },
      { name: "Ankara", country: "Turkey", tz: "Europe/Istanbul" },
    ],
  },
  {
    id: "us",
    label: "United States",
    method: 2,
    asr: 0,
    cities: [
      { name: "New York", country: "United States", tz: "America/New_York" },
      { name: "Chicago", country: "United States", tz: "America/Chicago" },
      { name: "Los Angeles", country: "United States", tz: "America/Los_Angeles" },
    ],
  },
  {
    id: "ca",
    label: "Canada",
    method: 2,
    asr: 0,
    cities: [
      { name: "Toronto", country: "Canada", tz: "America/Toronto" },
      { name: "Montreal", country: "Canada", tz: "America/Toronto" },
    ],
  },
]

const DEFAULT_REGION_ID = "uk"

const PRAYERS = [
  { key: "Fajr", label: "Fajr", arabic: "الفجر", counts: true },
  { key: "Sunrise", label: "Sunrise", arabic: "الشروق", counts: false },
  { key: "Dhuhr", label: "Dhuhr", arabic: "الظهر", counts: true },
  { key: "Asr", label: "Asr", arabic: "العصر", counts: true },
  { key: "Maghrib", label: "Maghrib", arabic: "المغرب", counts: true },
  { key: "Isha", label: "Isha", arabic: "العشاء", counts: true },
] as const

type Result =
  | { key: string; status: "ok"; timings: Record<string, string>; hijri: string }
  | { key: string; status: "error" }

function secondsInZone(ms: number, tz: string) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: tz,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(ms)
  const get = (type: string) =>
    Number(parts.find((p) => p.type === type)?.value ?? 0)
  return get("hour") * 3600 + get("minute") * 60 + get("second")
}

function apiDate(ms: number, tz: string) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: tz,
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).formatToParts(ms)
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? ""
  return `${get("day")}-${get("month")}-${get("year")}`
}

function toSeconds(time: string) {
  const [h, m] = time.slice(0, 5).split(":").map(Number)
  return (h || 0) * 3600 + (m || 0) * 60
}

function to12h(time: string) {
  const [h, m] = time.slice(0, 5).split(":").map(Number)
  const suffix = h >= 12 ? "PM" : "AM"
  const hour = h % 12 || 12
  return `${hour}:${String(m).padStart(2, "0")} ${suffix}`
}

function formatCountdown(totalSeconds: number) {
  const s = Math.max(0, totalSeconds)
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = s % 60
  return `${h}h ${String(m).padStart(2, "0")}m ${String(sec).padStart(2, "0")}s`
}

const selectClass =
  "w-full rounded-xl border border-deep-teal/30 bg-white px-3 py-2.5 text-sm text-charcoal shadow-sm outline-none transition focus:border-emerald focus:ring-2 focus:ring-emerald/30"

export default function PrayerTimes() {
  const [regionId, setRegionId] = useState(DEFAULT_REGION_ID)
  const [cityIndex, setCityIndex] = useState(0)
  const [asr, setAsr] = useState<0 | 1>(REGIONS[0].asr)
  const [attempt, setAttempt] = useState(0)
  const [now, setNow] = useState(() => Date.now())
  const [result, setResult] = useState<Result | null>(null)

  const region = REGIONS.find((r) => r.id === regionId) ?? REGIONS[0]
  const city = region.cities[cityIndex] ?? region.cities[0]

  const dateStr = apiDate(now, city.tz)
  const url = `https://api.aladhan.com/v1/timingsByCity/${dateStr}?city=${encodeURIComponent(
    city.name
  )}&country=${encodeURIComponent(city.country)}&method=${region.method}&school=${asr}&latitudeAdjustmentMethod=3`
  const requestKey = `${url}#${attempt}`

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const controller = new AbortController()

    fetch(url, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error("Request failed")
        return res.json()
      })
      .then((json) => {
        if (json.code !== 200 || !json.data?.timings) {
          throw new Error("Bad response")
        }
        const h = json.data.date?.hijri
        setResult({
          key: requestKey,
          status: "ok",
          timings: json.data.timings,
          hijri: h ? `${h.day} ${h.month?.en} ${h.year} AH` : "",
        })
      })
      .catch((err: unknown) => {
        if (err instanceof Error && err.name === "AbortError") return
        setResult({ key: requestKey, status: "error" })
      })

    return () => controller.abort()
  }, [url, requestKey])

  const current = result && result.key === requestKey ? result : null
  const loading = current === null
  const timings = current?.status === "ok" ? current.timings : null

  const nowSeconds = secondsInZone(now, city.tz)

  let nextKey: string | null = null
  let remaining = 0
  if (timings) {
    const upcoming = PRAYERS.filter((p) => p.counts).find(
      (p) => toSeconds(timings[p.key]) > nowSeconds
    )
    if (upcoming) {
      nextKey = upcoming.key
      remaining = toSeconds(timings[upcoming.key]) - nowSeconds
    } else {
      nextKey = "Fajr"
      remaining = toSeconds(timings.Fajr) + 86400 - nowSeconds
    }
  }

  const gregorian = new Intl.DateTimeFormat("en-GB", {
    timeZone: city.tz,
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(now)

  function handleRegionChange(id: string) {
    const next = REGIONS.find((r) => r.id === id) ?? REGIONS[0]
    setRegionId(next.id)
    setCityIndex(0)
    setAsr(next.asr)
  }

  const nextPrayer = PRAYERS.find((p) => p.key === nextKey)

  return (
    <div
      className="
        rounded-2xl border-[1.5px] border-deep-teal/60 bg-card p-5 sm:p-8
        shadow-[inset_0_0_14px_rgba(6,63,58,0.2),0_2px_4px_rgba(6,63,58,0.1),0_12px_26px_rgba(6,63,58,0.18)]
      "
    >
      {/* Controls */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <label className="block">
          <span className="mb-1.5 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-deep-teal/80">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            Region
          </span>
          <select
            value={region.id}
            onChange={(e) => handleRegionChange(e.target.value)}
            className={selectClass}
          >
            {REGIONS.map((r) => (
              <option key={r.id} value={r.id}>
                {r.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-deep-teal/80">
            City
          </span>
          <select
            value={cityIndex}
            onChange={(e) => setCityIndex(Number(e.target.value))}
            className={selectClass}
          >
            {region.cities.map((c, i) => (
              <option key={c.name} value={i}>
                {c.name}
              </option>
            ))}
          </select>
        </label>

        <div>
          <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-deep-teal/80">
            Asr calculation
          </span>
          <div className="grid grid-cols-2 gap-1 rounded-xl border border-deep-teal/30 bg-white p-1">
            {(
              [
                { value: 0, label: "Standard" },
                { value: 1, label: "Hanafi" },
              ] as const
            ).map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setAsr(opt.value)}
                aria-pressed={asr === opt.value}
                className={`rounded-lg px-3 py-1.5 text-sm transition ${
                  asr === opt.value
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

      {/* Date */}
      <div className="mt-6 text-center md:text-left">
        <p className="font-heading text-base font-medium text-deep-teal sm:text-lg">
          {gregorian}
        </p>
        {current?.status === "ok" && current.hijri && (
          <p className="mt-0.5 text-sm text-charcoal/70">{current.hijri}</p>
        )}
      </div>

      {/* Body */}
      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-5">
        {/* Next prayer */}
        <div className="relative overflow-hidden rounded-2xl bg-deep-teal p-5 shadow-[0_12px_26px_rgba(6,63,58,0.25)] sm:p-7 md:col-span-2">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-12 right-6 h-32 w-32 rounded-full bg-emerald/20 blur-2xl"
          />
          <div className="relative flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-gold">
              <Clock className="h-5 w-5" aria-hidden="true" />
            </span>
            <h3 className="font-heading text-base font-medium text-white sm:text-lg">
              Next prayer
            </h3>
          </div>

          <div className="relative mt-5 text-center">
            {nextPrayer && timings ? (
              <>
                <p className="font-heading text-3xl font-medium text-white sm:text-4xl">
                  {nextPrayer.label}
                </p>
                <p className="mt-1 text-lg text-gold" lang="ar" dir="rtl">
                  {nextPrayer.arabic}
                </p>
                <p className="mt-4 text-2xl font-medium tabular-nums text-[#2BB589] sm:text-3xl">
                  {formatCountdown(remaining)}
                </p>
                <p className="mt-2 text-sm text-white/70">
                  at {to12h(timings[nextPrayer.key])} in {city.name}
                </p>
              </>
            ) : (
              <p className="py-6 text-sm text-white/70">
                {current?.status === "error"
                  ? "Could not load prayer times."
                  : "Loading prayer times..."}
              </p>
            )}
          </div>
        </div>

        {/* Times list */}
        <div className="md:col-span-3">
          {current?.status === "error" ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 rounded-2xl border border-gold/50 bg-soft-beige/60 p-6 text-center">
              <p className="text-sm leading-6 text-charcoal/80">
                We could not load the prayer times right now. Please check your
                connection and try again.
              </p>
              <button
                type="button"
                onClick={() => setAttempt((n) => n + 1)}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald/90"
              >
                <RefreshCw className="h-4 w-4" aria-hidden="true" />
                Try again
              </button>
            </div>
          ) : (
            <ul className="space-y-2">
              {PRAYERS.map((p) => {
                const time = timings?.[p.key]
                const isNext = p.key === nextKey
                const passed = time ? toSeconds(time) <= nowSeconds : false
                return (
                  <li
                    key={p.key}
                    className={`flex items-center justify-between rounded-xl border px-4 py-3 transition ${
                      isNext
                        ? "border-emerald/50 bg-emerald/10"
                        : "border-deep-teal/10 bg-white"
                    } ${passed && !isNext ? "opacity-60" : ""}`}
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="font-heading text-base font-medium text-deep-teal">
                        {p.label}
                      </span>
                      <span
                        className="text-sm text-charcoal/60"
                        lang="ar"
                        dir="rtl"
                      >
                        {p.arabic}
                      </span>
                    </div>
                    <span
                      className={`text-base font-medium tabular-nums ${
                        isNext ? "text-emerald" : "text-charcoal"
                      }`}
                    >
                      {loading || !time ? "--:--" : to12h(time)}
                    </span>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}