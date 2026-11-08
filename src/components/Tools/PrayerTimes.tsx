"use client"

import { useCallback, useEffect, useState, useSyncExternalStore } from "react"
import { Clock, LocateFixed, MapPin, RefreshCw } from "lucide-react"

type Place = { lat: number; lng: number; label: string }
type GeoState = "locating" | "ready" | "denied" | "error"

const PRAYERS = [
  { key: "Fajr", label: "Fajr", arabic: "الفجر", counts: true },
  { key: "Sunrise", label: "Sunrise", arabic: "الشروق", counts: false },
  { key: "Dhuhr", label: "Dhuhr", arabic: "الظهر", counts: true },
  { key: "Asr", label: "Asr", arabic: "العصر", counts: true },
  { key: "Maghrib", label: "Maghrib", arabic: "المغرب", counts: true },
  { key: "Isha", label: "Isha", arabic: "العشاء", counts: true },
] as const

type Result =
  | {
      key: string
      status: "ok"
      timings: Record<string, string>
      hijri: string
      tz: string
    }
  | { key: string; status: "error" }

const GEO_OPTIONS: PositionOptions = {
  enableHighAccuracy: false,
  timeout: 12000,
  maximumAge: 600000,
}

// About 1 km of precision is plenty for prayer times, and keeps the exact position private
const round2 = (n: number) => Math.round(n * 100) / 100

const subscribeNoop = () => () => {}
const getSupported = () =>
  typeof navigator !== "undefined" && "geolocation" in navigator
const getServerSupported = () => true

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

// Turns coordinates into a short name like "Birmingham, United Kingdom"
async function labelFor(lat: number, lng: number): Promise<string> {
  try {
    const res = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
    )
    if (!res.ok) throw new Error("bad response")
    const json = await res.json()
    const town: string =
      json?.city || json?.locality || json?.principalSubdivision || ""
    let country = ""
    if (json?.countryCode) {
      try {
        country =
          new Intl.DisplayNames(["en"], { type: "region" }).of(
            String(json.countryCode)
          ) ?? ""
      } catch {
        country = ""
      }
    }
    return [town, country].filter(Boolean).join(", ") || "Your location"
  } catch {
    return "Your location"
  }
}

export default function PrayerTimes() {
  const supported = useSyncExternalStore(
    subscribeNoop,
    getSupported,
    getServerSupported
  )

  const [place, setPlace] = useState<Place | null>(null)
  const [geo, setGeo] = useState<GeoState>("locating")
  const [asr, setAsr] = useState<0 | 1>(0)
  const [attempt, setAttempt] = useState(0)
  const [now, setNow] = useState(() => Date.now())
  const [result, setResult] = useState<Result | null>(null)

  const onPosition = useCallback((pos: GeolocationPosition) => {
    const lat = round2(pos.coords.latitude)
    const lng = round2(pos.coords.longitude)
    setPlace({ lat, lng, label: "Your location" })
    setGeo("ready")
    labelFor(lat, lng).then((label) =>
      setPlace((p) => (p && p.lat === lat && p.lng === lng ? { ...p, label } : p))
    )
  }, [])

  const onGeoError = useCallback((err: GeolocationPositionError) => {
    setGeo(err.code === 1 ? "denied" : "error")
  }, [])

  const locate = useCallback(() => {
    if (typeof navigator === "undefined" || !navigator.geolocation) return
    setGeo("locating")
    navigator.geolocation.getCurrentPosition(onPosition, onGeoError, GEO_OPTIONS)
  }, [onPosition, onGeoError])

  // Ask for the visitor's location as soon as the page opens
  useEffect(() => {
    if (typeof navigator === "undefined" || !navigator.geolocation) return
    navigator.geolocation.getCurrentPosition(onPosition, onGeoError, GEO_OPTIONS)
  }, [onPosition, onGeoError])

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  // The place's own timezone comes back with the times; until then use the device timezone
  const tz =
    result?.status === "ok"
      ? result.tz
      : Intl.DateTimeFormat().resolvedOptions().timeZone

  const dateStr = apiDate(now, tz)
  const url = place
    ? `https://api.aladhan.com/v1/timings/${dateStr}?latitude=${place.lat}&longitude=${place.lng}&school=${asr}&latitudeAdjustmentMethod=3`
    : ""
  const requestKey = `${url}#${attempt}`

  useEffect(() => {
    if (!url) return
    const controller = new AbortController()

    fetch(url, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error("Request failed")
        return res.json()
      })
      .then((json) => {
        const zone = String(json.data?.meta?.timezone ?? "")
        if (json.code !== 200 || !json.data?.timings || !zone) {
          throw new Error("Bad response")
        }
        const h = json.data.date?.hijri
        setResult({
          key: requestKey,
          status: "ok",
          timings: json.data.timings,
          hijri: h ? `${h.day} ${h.month?.en} ${h.year} AH` : "",
          tz: zone,
        })
      })
      .catch((err: unknown) => {
        if (err instanceof Error && err.name === "AbortError") return
        setResult({ key: requestKey, status: "error" })
      })

    return () => controller.abort()
  }, [url, requestKey])

  const current = place && result && result.key === requestKey ? result : null
  const loading = !!place && current === null
  const timings = current?.status === "ok" ? current.timings : null

  const nowSeconds = secondsInZone(now, tz)

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
    timeZone: tz,
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(now)

  const nextPrayer = PRAYERS.find((p) => p.key === nextKey)

  const geoStatus: GeoState | "unsupported" = !supported ? "unsupported" : geo

  const promptText: Record<string, string> = {
    locating: "Finding your location...",
    denied:
      "Location is turned off for this site. Allow location in your browser or phone settings, then tap the button below.",
    error:
      "We could not find your location. Check that location is switched on, then try again.",
    unsupported:
      "This browser does not support location, so we cannot show prayer times for where you are.",
  }

  return (
    <div
      className="
        rounded-2xl border-[1.5px] border-deep-teal/60 bg-card p-5 sm:p-8
        shadow-[inset_0_0_14px_rgba(6,63,58,0.2),0_2px_4px_rgba(6,63,58,0.1),0_12px_26px_rgba(6,63,58,0.18)]
      "
    >
      {/* No location yet: ask for it */}
      {!place && (
        <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-gold/50 bg-soft-beige/60 px-5 py-10 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-deep-teal text-gold">
            <LocateFixed
              className={`h-6 w-6 ${geoStatus === "locating" ? "animate-pulse" : ""}`}
              aria-hidden="true"
            />
          </span>

          <p
            aria-live="polite"
            className="max-w-md text-sm leading-6 text-charcoal/80"
          >
            {promptText[geoStatus]}
          </p>

          {geoStatus !== "locating" && geoStatus !== "unsupported" && (
            <button
              type="button"
              onClick={locate}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald px-5 py-2.5 text-sm font-medium text-white transition hover:bg-emerald/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald/50"
            >
              <LocateFixed className="h-4 w-4" aria-hidden="true" />
              Use my location
            </button>
          )}
        </div>
      )}

      {place && (
        <>
          {/* Controls */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <span className="mb-1.5 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-deep-teal/80">
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                Your location
              </span>
              <div className="flex items-center justify-between gap-2 rounded-xl border border-deep-teal/30 bg-white px-3 py-2.5 shadow-sm">
                <span className="min-w-0 truncate text-sm text-charcoal">
                  {place.label}
                </span>
                <button
                  type="button"
                  onClick={locate}
                  disabled={geo === "locating"}
                  aria-label="Update my location"
                  title="Update my location"
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-deep-teal transition hover:bg-emerald hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald/50 disabled:pointer-events-none disabled:opacity-60"
                >
                  <LocateFixed
                    className={`h-3.5 w-3.5 ${geo === "locating" ? "animate-pulse" : ""}`}
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>

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
          <div className="mt-6 min-h-[44px] text-center md:text-left">
            {current?.status === "ok" && (
              <>
                <p className="font-heading text-base font-medium text-deep-teal sm:text-lg">
                  {gregorian}
                </p>
                {current.hijri && (
                  <p className="mt-0.5 text-sm text-charcoal/70">
                    {current.hijri}
                  </p>
                )}
              </>
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
                      at {to12h(timings[nextPrayer.key])} in {place.label}
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
                    We could not load the prayer times right now. Please check
                    your connection and try again.
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
        </>
      )}
    </div>
  )
}