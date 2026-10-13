"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { LocateFixed, MapPin, Navigation, Search } from "lucide-react"
import ToolField from "./ToolField"
import type { Mosque } from "./MosqueMap"

// Leaflet needs the browser, so load the map on the client only
const MosqueMap = dynamic(() => import("./MosqueMap"), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse bg-deep-teal/10" aria-hidden="true" />,
})

type Point = { lat: number; lng: number; label: string }

const UK_CITIES: Point[] = [
  { label: "London", lat: 51.5074, lng: -0.1278 },
  { label: "Birmingham", lat: 52.4862, lng: -1.8904 },
  { label: "Manchester", lat: 53.4808, lng: -2.2426 },
  { label: "Bradford", lat: 53.7938, lng: -1.7564 },
  { label: "Leicester", lat: 52.6369, lng: -1.1398 },
  { label: "Glasgow", lat: 55.8642, lng: -4.2518 },
  { label: "Cardiff", lat: 51.4816, lng: -3.1791 },
]

const RADII = [1, 3, 5, 10]
const EMPTY: Mosque[] = []

const cardShadow =
  "shadow-[inset_0_0_14px_rgba(6,63,58,0.2),0_2px_4px_rgba(6,63,58,0.1),0_12px_26px_rgba(6,63,58,0.18)]"

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-3 mt-7 border-b border-deep-teal/15 pb-2 font-heading text-sm font-semibold text-deep-teal first:mt-0">
      {children}
    </h3>
  )
}

const chipClass = (active: boolean) => `
  rounded-full border px-3.5 py-2 text-xs font-semibold transition-colors duration-300
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald/50
  ${
    active
      ? "border-deep-teal bg-deep-teal text-white"
      : "border-deep-teal/40 text-deep-teal hover:border-emerald hover:bg-emerald hover:text-white"
  }
`

function formatDistance(km: number): { value: string; unit: string } {
  if (km < 1) return { value: String(Math.round(km * 1000)), unit: "m" }
  return { value: km.toFixed(1), unit: "km" }
}

export default function MosqueFinder() {
  const [point, setPoint] = useState<Point | null>(null)
  const [radiusKm, setRadiusKm] = useState(3)
  const [result, setResult] = useState<{ key: string; mosques: Mosque[]; error: string } | null>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [locating, setLocating] = useState(false)
  const [postcode, setPostcode] = useState("")
  const [error, setError] = useState("")

  // Results are stored with the request they belong to, so loading and fetch errors are derived
  // during render instead of being set inside the effect.
  const key = point ? `${point.lat},${point.lng},${radiusKm}` : ""
  const ready = result?.key === key
  const loading = !!point && !ready
  const mosques = ready && result ? result.mosques : EMPTY
  const fetchError = ready && result ? result.error : ""

  const selectPoint = (p: Point) => {
    setPoint(p)
    setSelectedId(null)
    setError("")
  }

  const changeRadius = (r: number) => {
    setRadiusKm(r)
    setSelectedId(null)
  }

  // Fetch live mosques whenever the search point or radius changes (state is set only in the callbacks)
  useEffect(() => {
    if (!point) return
    const ctrl = new AbortController()
    const k = `${point.lat},${point.lng},${radiusKm}`
    fetch(`/api/mosques?lat=${point.lat}&lng=${point.lng}&radius=${radiusKm * 1000}`, { signal: ctrl.signal })
      .then(async (res) => {
        const data = await res.json()
        if (!res.ok) throw new Error(data?.error || "Could not load mosques.")
        setResult({ key: k, mosques: data.mosques as Mosque[], error: "" })
      })
      .catch((e: Error) => {
        if (e.name === "AbortError") return
        setResult({ key: k, mosques: [], error: e.message || "Could not load mosques." })
      })
    return () => ctrl.abort()
  }, [point, radiusKm])

  const detect = () => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setError("Location is not available in this browser. Choose a city or enter a postcode.")
      return
    }
    setLocating(true)
    setError("")
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocating(false)
        selectPoint({ lat: pos.coords.latitude, lng: pos.coords.longitude, label: "Your location" })
      },
      (err) => {
        setLocating(false)
        setError(
          err.code === 1
            ? "Location permission was denied. Allow it in your browser, or choose a city or postcode instead."
            : "We could not detect your location. Choose a city or enter a postcode instead."
        )
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 60000 }
    )
  }

  const searchPostcode = async () => {
    const pc = postcode.trim()
    if (!pc) return
    setError("")
    try {
      const res = await fetch(`https://api.postcodes.io/postcodes/${encodeURIComponent(pc)}`)
      const data = await res.json()
      if (!res.ok || !data?.result) throw new Error()
      selectPoint({ lat: data.result.latitude, lng: data.result.longitude, label: data.result.postcode })
    } catch {
      setError("We could not find that postcode. Check it and try again, for example B1 1AA.")
    }
  }

  const nearest = mosques[0]
  const near = nearest ? formatDistance(nearest.km) : null

  const hint = !point
    ? "Detect your location or choose a city to find mosques near you."
    : loading
      ? "Finding mosques nearby..."
      : fetchError
        ? "We could not load mosques just now."
        : mosques.length === 0
        ? `No mosques found within ${radiusKm} km. Try a larger distance.`
        : `${mosques.length} ${mosques.length === 1 ? "mosque" : "mosques"} within ${radiusKm} km of ${point.label}.`

  const secondaryBtn = `
    flex flex-1 items-center justify-center gap-2 rounded-xl border border-deep-teal/40 px-4 py-2.5
    text-xs font-semibold text-deep-teal transition-colors duration-300
    hover:border-emerald hover:bg-emerald hover:text-white
    disabled:pointer-events-none disabled:opacity-50
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald/50
  `

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
      {/* Finder (hero) */}
      <section className={`rounded-2xl border-[1.5px] border-deep-teal/60 bg-card px-4 py-6 sm:px-6 sm:py-8 ${cardShadow}`}>
        <button
          type="button"
          onClick={detect}
          disabled={locating}
          className="
            flex w-full items-center justify-center gap-2 rounded-xl bg-deep-teal px-4 py-3.5
            text-sm font-semibold text-white transition-colors duration-300 hover:bg-emerald
            disabled:pointer-events-none disabled:opacity-60
            focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald/50
          "
        >
          <LocateFixed className="h-4 w-4" aria-hidden="true" />
          {locating ? "Detecting your location..." : "Use my location"}
        </button>

        <Heading>Or search a UK city</Heading>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Choose a UK city">
          {UK_CITIES.map((c) => (
            <button
              key={c.label}
              type="button"
              onClick={() => selectPoint(c)}
              aria-pressed={point?.label === c.label}
              className={chipClass(point?.label === c.label)}
            >
              {c.label}
            </button>
          ))}
        </div>

        <Heading>Or enter a UK postcode</Heading>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <div className="flex-1">
            <ToolField
              id="m-postcode"
              label="Postcode"
              hint="For example B1 1AA"
              unit=""
              value={postcode}
              onChange={(v: string) => setPostcode(v)}
            />
          </div>
          <button type="button" onClick={searchPostcode} disabled={!postcode.trim()} className={`${secondaryBtn} sm:flex-none`}>
            <Search className="h-4 w-4" aria-hidden="true" />
            Find mosques
          </button>
        </div>

        <Heading>Distance</Heading>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Search distance">
          {RADII.map((r) => (
            <button key={r} type="button" onClick={() => changeRadius(r)} aria-pressed={r === radiusKm} className={chipClass(r === radiusKm)}>
              {r} km
            </button>
          ))}
        </div>

        {(error || fetchError) && (
          <p role="alert" className="mt-4 text-xs leading-relaxed text-muted-teal">
            {error || fetchError}
          </p>
        )}

        <p
          aria-live="polite"
          className={`
            mx-auto mb-5 mt-6 w-fit max-w-full rounded-full border px-4 py-2 text-center text-xs leading-relaxed
            transition-colors duration-300
            ${point && !loading && mosques.length > 0 ? "border-emerald bg-emerald/10 font-semibold text-emerald" : "border-deep-teal/20 bg-deep-teal/5 text-muted-teal"}
          `}
        >
          {hint}
        </p>

        {point && (
          <>
            <div className="h-[320px] overflow-hidden rounded-xl border border-deep-teal/30 sm:h-[400px]">
              <MosqueMap center={point} mosques={mosques} selectedId={selectedId} onSelect={setSelectedId} />
            </div>

            <ul className="mt-5 space-y-3">
              {mosques.map((m) => {
                const d = formatDistance(m.km)
                const active = m.id === selectedId
                return (
                  <li
                    key={m.id}
                    className={`flex items-start gap-3 rounded-xl border p-3.5 transition-colors duration-300 ${
                      active ? "border-emerald bg-emerald/10" : "border-deep-teal/20 bg-white/60"
                    }`}
                  >
                    <div className="w-[74px] shrink-0 rounded-lg bg-deep-teal py-2 text-center text-white">
                      <span className="block font-serif text-xl font-medium leading-none tabular-nums text-gold">{d.value}</span>
                      <span className="mt-1 block text-[11px] text-white/70">{d.unit}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-heading text-sm font-semibold text-deep-teal">{m.name}</h4>
                      {(m.address || m.openingHours || m.denomination) && (
                        <p className="mt-0.5 text-xs leading-relaxed text-muted-teal">
                          {[m.address, m.denomination, m.openingHours].filter(Boolean).join(" | ")}
                        </p>
                      )}
                      <div className="mt-2.5 flex flex-wrap gap-2">
                        <a
                          href={`https://www.google.com/maps/dir/?api=1&origin=${point.lat},${point.lng}&destination=${m.lat},${m.lng}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full border border-deep-teal bg-deep-teal px-3 py-1.5 text-xs font-semibold text-white transition-colors duration-300 hover:border-emerald hover:bg-emerald focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald/50"
                        >
                          <Navigation className="h-3 w-3" aria-hidden="true" />
                          Directions
                        </a>
                        <button
                          type="button"
                          onClick={() => setSelectedId(m.id)}
                          className="inline-flex items-center gap-1.5 rounded-full border border-deep-teal/40 px-3 py-1.5 text-xs font-semibold text-deep-teal transition-colors duration-300 hover:border-emerald hover:bg-emerald hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald/50"
                        >
                          <MapPin className="h-3 w-3" aria-hidden="true" />
                          Show on map
                        </button>
                        {m.website && /^https?:\/\//.test(m.website) && (
                          <a
                            href={m.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center rounded-full border border-deep-teal/40 px-3 py-1.5 text-xs font-semibold text-deep-teal transition-colors duration-300 hover:border-emerald hover:bg-emerald hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald/50"
                          >
                            Website
                          </a>
                        )}
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          </>
        )}
      </section>

      {/* Side column: stats */}
      <aside
        aria-live="polite"
        className="
          rounded-2xl border-[1.5px] border-deep-teal bg-deep-teal p-5 text-white sm:p-6
          shadow-[0_4px_8px_rgba(6,63,58,0.2),0_18px_34px_rgba(6,63,58,0.28)]
          lg:sticky lg:top-24
        "
      >
        <p className="text-[11px] font-semibold uppercase tracking-wide text-white/70">Nearest mosque</p>
        <p className="mt-1 font-serif text-[34px] font-medium leading-tight text-gold sm:text-[38px]">
          {near ? `${near.value} ${near.unit}` : "-"}
        </p>
        <p className="mt-1 text-xs text-white/80">{nearest ? nearest.name : "Choose a location to begin"}</p>

        <dl className="mt-5 space-y-2.5 border-t border-white/15 pt-4 text-xs">
          <div className="flex items-baseline justify-between gap-3">
            <dt className="text-white/70">Searching from</dt>
            <dd className="font-semibold">{point ? point.label : "Not set"}</dd>
          </div>
          <div className="flex items-baseline justify-between gap-3">
            <dt className="text-white/70">Distance</dt>
            <dd className="font-semibold">{radiusKm} km</dd>
          </div>
          <div className="flex items-baseline justify-between gap-3">
            <dt className="text-white/70">Mosques found</dt>
            <dd className="font-semibold">{point && !loading ? mosques.length : "-"}</dd>
          </div>
        </dl>

        {point && (
          <a
            href={`https://www.google.com/maps/search/mosque/@${point.lat},${point.lng},15z`}
            target="_blank"
            rel="noopener noreferrer"
            className="
              mt-5 flex w-full items-center justify-center gap-2
              rounded-xl border border-white/30 px-3.5 py-2.5 text-xs font-semibold text-white
              transition-colors duration-300 hover:bg-white/10
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60
            "
          >
            <Search className="h-3.5 w-3.5" aria-hidden="true" />
            Also search on Google Maps
          </a>
        )}

        <p className="mt-4 text-[11px] leading-relaxed text-white/60">
          Your location is used only to find mosques near you and is not stored. Mosque data comes from OpenStreetMap
          contributors and may be incomplete or out of date, so check opening and prayer times with the mosque.
          Distances are straight-line.
        </p>
      </aside>
    </div>
  )
}