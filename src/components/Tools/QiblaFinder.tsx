"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import geomagnetism from "geomagnetism"
import { Compass, LocateFixed, MapPin } from "lucide-react"
import ToolField from "./ToolField"

const KAABA = { lat: 21.4225, lon: 39.8262 }

const toRad = (d: number) => (d * Math.PI) / 180
const toDeg = (r: number) => (r * 180) / Math.PI
const norm = (d: number) => ((d % 360) + 360) % 360

function qiblaBearing(lat: number, lon: number) {
  const p1 = toRad(lat)
  const p2 = toRad(KAABA.lat)
  const dl = toRad(KAABA.lon - lon)
  const y = Math.sin(dl) * Math.cos(p2)
  const x = Math.cos(p1) * Math.sin(p2) - Math.sin(p1) * Math.cos(p2) * Math.cos(dl)
  return norm(toDeg(Math.atan2(y, x)))
}

function distanceKm(lat: number, lon: number) {
  const R = 6371
  const dLat = toRad(KAABA.lat - lat)
  const dLon = toRad(KAABA.lon - lon)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat)) * Math.cos(toRad(KAABA.lat)) * Math.sin(dLon / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(a))
}

function cardinal(deg: number) {
  const points = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"]
  return points[Math.round(deg / 45) % 8]
}

type Coords = { lat: number; lon: number }

type IOSOrientationEvent = DeviceOrientationEvent & {
  webkitCompassHeading?: number
}

type OrientationPermissionApi = typeof DeviceOrientationEvent & {
  requestPermission?: () => Promise<"granted" | "denied">
}

const cardShadow =
  "shadow-[inset_0_0_14px_rgba(6,63,58,0.2),0_2px_4px_rgba(6,63,58,0.1),0_12px_26px_rgba(6,63,58,0.18)]"

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-3 mt-7 border-b border-deep-teal/15 pb-2 font-heading text-sm font-semibold text-deep-teal first:mt-0">
      {children}
    </h3>
  )
}

const secondaryBtn = `
  flex w-full items-center justify-center gap-2 rounded-xl border border-deep-teal/40 px-4 py-2.5
  text-xs font-semibold text-deep-teal transition-colors duration-300
  hover:border-emerald hover:bg-emerald hover:text-white
  disabled:pointer-events-none disabled:opacity-50
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald/50
`

export default function QiblaFinder() {
  const [coords, setCoords] = useState<Coords | null>(null)
  const [latInput, setLatInput] = useState("")
  const [lonInput, setLonInput] = useState("")
  const [error, setError] = useState("")
  const [locating, setLocating] = useState(false)
  const [compassOn, setCompassOn] = useState(false)
  const [heading, setHeading] = useState<number | null>(null)
  const [manualHeading, setManualHeading] = useState(0)

  const locateMe = () => {
    setError("")
    if (!("geolocation" in navigator)) {
      setError("Your browser does not support location. Enter your coordinates instead.")
      return
    }
    setLocating(true)
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude
        const lon = pos.coords.longitude
        setCoords({ lat, lon })
        setLatInput(lat.toFixed(4))
        setLonInput(lon.toFixed(4))
        setLocating(false)
      },
      () => {
        setError("We could not get your location. Allow access or enter your coordinates.")
        setLocating(false)
      },
      { enableHighAccuracy: true, timeout: 15000 }
    )
  }

  const showForCoordinates = () => {
    setError("")
    const lat = parseFloat(latInput)
    const lon = parseFloat(lonInput)
    if (Number.isNaN(lat) || Number.isNaN(lon)) {
      setError("Enter a valid latitude and longitude.")
      return
    }
    if (lat < -90 || lat > 90 || lon < -180 || lon > 180) {
      setError("Latitude must be between -90 and 90, and longitude between -180 and 180.")
      return
    }
    setCoords({ lat, lon })
  }

  const declination = useMemo(() => {
    if (!coords) return null
    try {
      const info = geomagnetism.model(new Date()).point([coords.lat, coords.lon])
      return info.decl
    } catch {
      return null
    }
  }, [coords])

  const startCompass = useCallback(async () => {
    setError("")
    try {
      const api = (window as unknown as { DeviceOrientationEvent?: OrientationPermissionApi })
        .DeviceOrientationEvent
      if (!api) {
        setError("This device does not support a live compass. Use the manual dial.")
        return
      }
      if (typeof api.requestPermission === "function") {
        const result = await api.requestPermission()
        if (result !== "granted") {
          setError("Motion access was not allowed. Use the manual dial instead.")
          return
        }
      }
      setCompassOn(true)
    } catch {
      setError("The compass could not start. Use the manual dial instead.")
    }
  }, [])

  useEffect(() => {
    if (!compassOn) return

    const onOrientation = (e: Event) => {
      const ev = e as IOSOrientationEvent
      if (typeof ev.webkitCompassHeading === "number") {
        setHeading(ev.webkitCompassHeading)
      }
    }
    const onAbsolute = (e: Event) => {
      const ev = e as DeviceOrientationEvent
      if (ev.alpha !== null) setHeading(norm(360 - ev.alpha))
    }

    window.addEventListener("deviceorientation", onOrientation, true)
    window.addEventListener("deviceorientationabsolute", onAbsolute, true)
    return () => {
      window.removeEventListener("deviceorientation", onOrientation, true)
      window.removeEventListener("deviceorientationabsolute", onAbsolute, true)
    }
  }, [compassOn])

  const stopCompass = () => {
    setCompassOn(false)
    setHeading(null)
  }

  const bearing = coords ? qiblaBearing(coords.lat, coords.lon) : null
  const distance = coords ? distanceKm(coords.lat, coords.lon) : null

  const magneticHeading = compassOn && heading !== null ? heading : manualHeading
  const trueHeading = norm(magneticHeading + (compassOn ? declination ?? 0 : 0))
  const diff = bearing === null ? 180 : Math.abs(((bearing - trueHeading + 540) % 360) - 180)
  const aligned = bearing !== null && diff < 5

  const hint =
    bearing === null
      ? locating
        ? "Detecting your location..."
        : "Set your location to see the Qibla direction."
      : aligned
        ? "You are facing the Qibla."
        : `Turn ${Math.round(diff)}° to face the Qibla.`

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
      {/* Finder (hero) */}
      <section
        className={`rounded-2xl border-[1.5px] border-deep-teal/60 bg-card px-4 py-6 sm:px-6 sm:py-8 ${cardShadow}`}
      >
        <button
          type="button"
          onClick={locateMe}
          disabled={locating}
          className="
            flex w-full items-center justify-center gap-2 rounded-xl bg-deep-teal px-4 py-3.5
            text-sm font-semibold text-white transition-colors duration-300 hover:bg-emerald
            disabled:pointer-events-none disabled:opacity-60
            focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald/50
          "
        >
          <LocateFixed className={`h-4 w-4 ${locating ? "animate-pulse" : ""}`} aria-hidden="true" />
          {locating ? "Detecting your location..." : coords ? "Refresh my location" : "Use my location"}
        </button>

        <Heading>Or enter your coordinates</Heading>
        <div
          className="grid grid-cols-1 gap-3 sm:grid-cols-2"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault()
              showForCoordinates()
            }
          }}
        >
          <ToolField
            id="q-lat"
            label="Latitude"
            hint="For example 31.5204"
            unit="°"
            value={latInput}
            onChange={(v: string) => setLatInput(v)}
          />
          <ToolField
            id="q-lon"
            label="Longitude"
            hint="For example 74.3587"
            unit="°"
            value={lonInput}
            onChange={(v: string) => setLonInput(v)}
          />
        </div>
        <button type="button" onClick={showForCoordinates} className={`${secondaryBtn} mt-3`}>
          <MapPin className="h-4 w-4" aria-hidden="true" />
          Show Qibla for these coordinates
        </button>

        {error && (
          <p role="alert" className="mt-4 text-xs leading-relaxed text-muted-teal">
            {error}
          </p>
        )}

        <p
          aria-live="polite"
          className={`
            mx-auto mb-5 mt-6 w-fit max-w-full rounded-full border px-4 py-2 text-center text-xs leading-relaxed
            transition-colors duration-300
            ${aligned ? "border-emerald bg-emerald/10 font-semibold text-emerald" : "border-deep-teal/20 bg-deep-teal/5 text-muted-teal"}
          `}
        >
          {hint}
        </p>

        {/* Dial */}
        <div className="flex flex-col items-center">
          <div className="relative h-64 w-64 sm:h-72 sm:w-72">
            <div
              className="absolute left-1/2 top-0 z-10 h-0 w-0 -translate-x-1/2 border-x-[10px] border-b-[18px] border-x-transparent"
              style={{ borderBottomColor: aligned ? "#0f9d6e" : "#063f3a" }}
              aria-hidden="true"
            />
            <div
              className={`absolute inset-3 rounded-full border-4 bg-white/60 transition-colors duration-300 ${
                aligned ? "border-emerald" : "border-deep-teal/30"
              }`}
              style={{
                transform: `rotate(${-trueHeading}deg)`,
                transition: compassOn ? "none" : "transform 0.2s ease-out",
              }}
              role="img"
              aria-label="Compass dial showing the Qibla direction"
            >
              <span className="absolute left-1/2 top-1 -translate-x-1/2 font-heading text-sm font-bold text-deep-teal">
                N
              </span>
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-semibold text-muted-teal">E</span>
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-xs font-semibold text-muted-teal">S</span>
              <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs font-semibold text-muted-teal">W</span>

              {bearing !== null && (
                <div className="absolute inset-0" style={{ transform: `rotate(${bearing}deg)` }}>
                  <div
                    className={`absolute left-1/2 top-9 h-24 w-1 -translate-x-1/2 rounded-full transition-colors duration-300 ${
                      aligned ? "bg-emerald" : "bg-gold"
                    }`}
                  />
                  <div
                    className={`absolute left-1/2 top-4 flex h-7 w-7 -translate-x-1/2 items-center justify-center rounded-md font-serif text-xs font-bold transition-colors duration-300 ${
                      aligned ? "bg-emerald text-white" : "bg-deep-teal text-gold"
                    }`}
                  >
                    K
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <Heading>Compass</Heading>
        {compassOn ? (
          <button type="button" onClick={stopCompass} className={secondaryBtn}>
            <Compass className="h-4 w-4" aria-hidden="true" />
            Turn off the live compass
          </button>
        ) : (
          <>
            <button type="button" onClick={startCompass} className={secondaryBtn}>
              <Compass className="h-4 w-4" aria-hidden="true" />
              Turn on the live compass
            </button>
            <div className="mt-4">
              <label htmlFor="manual-dial" className="mb-2 block text-xs font-medium text-muted-teal">
                Manual dial: set the direction you are facing ({Math.round(manualHeading)}°)
              </label>
              <input
                id="manual-dial"
                type="range"
                min={0}
                max={359}
                value={manualHeading}
                onChange={(e) => setManualHeading(Number(e.target.value))}
                className="w-full accent-emerald"
              />
            </div>
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
        <p className="text-[11px] font-semibold uppercase tracking-wide text-white/70">Qibla bearing</p>
        <p className="mt-1 font-serif text-[34px] font-medium leading-tight text-gold sm:text-[38px]">
          {bearing !== null ? `${bearing.toFixed(1)}° ${cardinal(bearing)}` : "-"}
        </p>
        <p className="mt-1 text-xs text-white/80">
          {bearing !== null ? "Measured from true north" : "Set your location to begin"}
        </p>

        <dl className="mt-5 space-y-2.5 border-t border-white/15 pt-4 text-xs">
          <div className="flex items-baseline justify-between gap-3">
            <dt className="text-white/70">Distance to the Kaaba</dt>
            <dd className="font-semibold">{distance !== null ? `${Math.round(distance).toLocaleString()} km` : "-"}</dd>
          </div>
          <div className="flex items-baseline justify-between gap-3">
            <dt className="text-white/70">Magnetic declination</dt>
            <dd className="font-semibold">
              {coords ? (declination === null ? "Not available" : `${declination.toFixed(1)}°`) : "-"}
            </dd>
          </div>
          <div className="flex items-baseline justify-between gap-3">
            <dt className="text-white/70">Latitude</dt>
            <dd className="font-semibold">{coords ? coords.lat.toFixed(4) : "-"}</dd>
          </div>
          <div className="flex items-baseline justify-between gap-3">
            <dt className="text-white/70">Longitude</dt>
            <dd className="font-semibold">{coords ? coords.lon.toFixed(4) : "-"}</dd>
          </div>
          <div className="flex items-baseline justify-between gap-3">
            <dt className="text-white/70">Phone heading</dt>
            <dd className="font-semibold">
              {compassOn && heading !== null ? `${Math.round(trueHeading)}°` : "Compass off"}
            </dd>
          </div>
        </dl>

        <p className="mt-4 text-[11px] leading-relaxed text-white/60">
          Your location stays on your device and is not stored. Phone compasses can be a few degrees off, so use this
          as a guide and confirm with a local mosque where you can.
        </p>
      </aside>
    </div>
  )
}