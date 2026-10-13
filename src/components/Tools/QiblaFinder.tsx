"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Compass, LocateFixed, RotateCcw } from "lucide-react"
import ToolField from "./ToolField"

const KAABA = { lat: 21.422487, lng: 39.826206 }
const EARTH_RADIUS_KM = 6371

type Coords = { lat: number; lng: number }
type LocateStatus = "idle" | "locating" | "ready" | "error"
type CompassStatus = "off" | "on" | "unsupported" | "denied" | "insecure"
type Declination = { key: string; value: number | null } // value null = could not be worked out

const toRad = (d: number) => (d * Math.PI) / 180
const toDeg = (r: number) => (r * 180) / Math.PI
const norm360 = (d: number) => ((d % 360) + 360) % 360

// Initial great-circle bearing from anywhere on Earth to the Kaaba (0-360, clockwise from TRUE north)
function qiblaBearing({ lat, lng }: Coords) {
  const p1 = toRad(lat)
  const p2 = toRad(KAABA.lat)
  const dl = toRad(KAABA.lng - lng)
  const y = Math.sin(dl) * Math.cos(p2)
  const x = Math.cos(p1) * Math.sin(p2) - Math.sin(p1) * Math.cos(p2) * Math.cos(dl)
  return norm360(toDeg(Math.atan2(y, x)))
}

function distanceKm({ lat, lng }: Coords) {
  const dLat = toRad(KAABA.lat - lat)
  const dLng = toRad(KAABA.lng - lng)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat)) * Math.cos(toRad(KAABA.lat)) * Math.sin(dLng / 2) ** 2
  return 2 * EARTH_RADIUS_KM * Math.asin(Math.sqrt(a))
}

const CARDINALS = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"]
const cardinal = (deg: number) => CARDINALS[Math.round(deg / 22.5) % 16]

const cardShadow =
  "shadow-[inset_0_0_14px_rgba(6,63,58,0.2),0_2px_4px_rgba(6,63,58,0.1),0_12px_26px_rgba(6,63,58,0.18)]"

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-3 mt-7 border-b border-deep-teal/15 pb-2 font-heading text-sm font-semibold text-deep-teal first:mt-0">
      {children}
    </h3>
  )
}

type OrientationEvent = DeviceOrientationEvent & { webkitCompassHeading?: number }

export default function QiblaFinder() {
  const [coords, setCoords] = useState<Coords | null>(null)
  const [locate, setLocate] = useState<LocateStatus>("idle")
  const [locateError, setLocateError] = useState("")
  const [manualError, setManualError] = useState("")
  const [compass, setCompass] = useState<CompassStatus>("off")
  // Raw readings are MAGNETIC (what the phone sensor reports). True heading is worked out below.
  const [rotation, setRotation] = useState(0) // continuous, avoids spinning at 359 -> 0
  const [magHeading, setMagHeading] = useState<number | null>(null)
  const [decl, setDecl] = useState<Declination | null>(null)
  const [manualLat, setManualLat] = useState("")
  const [manualLng, setManualLng] = useState("")

  const lastRotation = useRef(0)
  const seeded = useRef(false) // true once the first real compass reading has arrived
  const lastBuzz = useRef(0)

  const bearing = useMemo(() => (coords ? qiblaBearing(coords) : null), [coords])
  const distance = useMemo(() => (coords ? distanceKm(coords) : null), [coords])

  // Magnetic declination for the user's position, so the compass points to TRUE north anywhere in the world
  const coordsKey = coords ? `${coords.lat.toFixed(2)},${coords.lng.toFixed(2)}` : ""
  const declValue = decl && decl.key === coordsKey ? decl.value : null
  const declApplied = declValue ?? 0

  useEffect(() => {
    if (!coords) return
    let cancelled = false
    const key = `${coords.lat.toFixed(2)},${coords.lng.toFixed(2)}`
    import("geomagnetism")
      .then((mod) => {
        const model = mod.model ?? (mod as unknown as { default: typeof mod }).default.model
        const value = model(new Date()).point([coords.lat, coords.lng]).decl
        if (!cancelled) setDecl({ key, value: Number.isFinite(value) ? value : null })
      })
      .catch(() => {
        if (!cancelled) setDecl({ key, value: null })
      })
    return () => {
      cancelled = true
    }
  }, [coords])

  // True-north heading and dial rotation
  const heading = magHeading === null ? null : norm360(magHeading + declApplied)
  const dialRotation = rotation + declApplied

  // Find my location (GPS)
  const findLocation = () => {
    setManualError("")

    if (typeof window !== "undefined" && !window.isSecureContext) {
      setLocate("error")
      setLocateError("Location needs a secure (HTTPS) connection. Enter your coordinates below instead.")
      return
    }
    if (!("geolocation" in navigator)) {
      setLocate("error")
      setLocateError("Location is not supported on this device. Enter your coordinates below.")
      return
    }

    setLocate("locating")
    setLocateError("")
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude })
        setLocate("ready")
        setLocateError("")
      },
      (err) => {
        setLocate("error")
        setLocateError(
          err.code === err.PERMISSION_DENIED
            ? "Location permission was denied. Allow it in your browser, or enter your coordinates below."
            : err.code === err.TIMEOUT
              ? "Finding your location took too long. Try again, or enter your coordinates below."
              : "Couldn't get your location. Try again, or enter your coordinates below."
        )
      },
      // City-level accuracy is plenty for a Qibla bearing, and is far more reliable than high accuracy
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 300000 }
    )
  }

  // Manual coordinates
  const applyManual = () => {
    const lat = parseFloat(manualLat)
    const lng = parseFloat(manualLng)
    if (!Number.isFinite(lat) || !Number.isFinite(lng) || Math.abs(lat) > 90 || Math.abs(lng) > 180) {
      setManualError("Enter a latitude between -90 and 90 and a longitude between -180 and 180.")
      return
    }
    setManualError("")
    setLocateError("")
    setCoords({ lat, lng })
    setLocate("ready")
  }

  // Compass listener
  const handleOrientation = useCallback((e: Event) => {
    const ev = e as OrientationEvent
    let h: number | null = null

    if (typeof ev.webkitCompassHeading === "number") {
      if (ev.webkitCompassHeading >= 0) h = ev.webkitCompassHeading // iOS: already clockwise from magnetic north
    } else if (ev.absolute && typeof ev.alpha === "number") {
      h = (360 - ev.alpha) % 360 // Android: absolute orientation only (relative alpha is not north)
    }
    if (h === null || Number.isNaN(h)) return

    if (!seeded.current) {
      lastRotation.current = h // first reading: snap, don't sweep from 0
      seeded.current = true
    } else {
      // Shortest signed angle from the last value to the new one. The double modulo keeps it correct
      // however many full turns the continuous rotation has built up.
      const delta = ((((h - lastRotation.current) % 360) + 540) % 360) - 180
      lastRotation.current += delta * 0.3 // smooth out sensor jitter
    }

    setRotation(lastRotation.current)
    setMagHeading(norm360(lastRotation.current))
  }, [])

  const startCompass = async () => {
    if (typeof window === "undefined" || !("DeviceOrientationEvent" in window)) {
      setCompass("unsupported")
      return
    }
    if (!window.isSecureContext) {
      setCompass("insecure")
      return
    }

    const DOE = DeviceOrientationEvent as unknown as {
      requestPermission?: () => Promise<"granted" | "denied">
    }

    if (typeof DOE.requestPermission === "function") {
      try {
        const result = await DOE.requestPermission()
        if (result !== "granted") {
          setCompass("denied")
          return
        }
      } catch {
        setCompass("denied")
        return
      }
    }

    seeded.current = false
    lastRotation.current = 0
    setRotation(0)
    setMagHeading(null)
    setCompass("on")
  }

  const stopCompass = () => {
    setCompass("off")
    setMagHeading(null)
    seeded.current = false
    lastRotation.current = 0
    setRotation(0)
  }

  // Manual dial (laptops, or phones with no compass sensor). The slider is the TRUE direction you face.
  const setManualHeading = (trueValue: number) => {
    const raw = trueValue - declApplied
    seeded.current = true
    lastRotation.current = raw
    setRotation(raw)
    setMagHeading(norm360(raw))
  }

  useEffect(() => {
    if (compass !== "on") return

    const eventName = "ondeviceorientationabsolute" in window ? "deviceorientationabsolute" : "deviceorientation"
    window.addEventListener(eventName, handleOrientation)

    // No real reading after a few seconds means there is no usable compass sensor
    const timer = window.setTimeout(() => {
      if (!seeded.current) setCompass("unsupported")
    }, 4000)

    return () => {
      window.removeEventListener(eventName, handleOrientation)
      window.clearTimeout(timer)
    }
  }, [compass, handleOrientation])

  const handleReset = () => {
    stopCompass()
    setCoords(null)
    setLocate("idle")
    setLocateError("")
    setManualError("")
    setManualLat("")
    setManualLng("")
  }

  // How far the phone is from pointing at the Qibla (positive = Qibla is to your right)
  const offBy = bearing !== null && heading !== null ? ((bearing - heading + 540) % 360) - 180 : null
  const aligned = offBy !== null && Math.abs(offBy) <= 5
  const atKaaba = distance !== null && distance < 0.5

  // Short buzz when you lock onto the Qibla (Android; ignored elsewhere), at most once every 2.5 seconds
  useEffect(() => {
    if (!aligned || typeof navigator === "undefined" || !("vibrate" in navigator)) return
    const now = Date.now()
    if (now - lastBuzz.current < 2500) return
    lastBuzz.current = now
    navigator.vibrate(40)
  }, [aligned])

  const compassHint = (() => {
    if (atKaaba) return "You are at the Kaaba. Face it from wherever you stand."
    if (offBy !== null) {
      return aligned
        ? "You are facing the Qibla."
        : `Turn ${offBy > 0 ? "right" : "left"} about ${Math.round(Math.abs(offBy))}°.`
    }
    if (compass === "on") return "Move your phone in a figure of 8 to wake the compass."
    if (compass === "unsupported")
      return bearing !== null
        ? "No compass sensor found. Rotate the dial below to the direction you are facing."
        : "No compass sensor found. Find your location to see the Qibla direction."
    if (compass === "denied") return "Compass permission was denied. Allow motion access in your browser settings."
    if (compass === "insecure") return "The live compass needs a secure (HTTPS) connection."
    return bearing !== null
      ? "Turn on the live compass, or rotate the dial below to the direction you are facing."
      : "Find your location to see the Qibla direction."
  })()

  const secondaryBtn = `
    flex flex-1 items-center justify-center gap-2 rounded-xl border border-deep-teal/40 px-4 py-2.5
    text-xs font-semibold text-deep-teal transition-colors duration-300
    hover:border-emerald hover:bg-emerald hover:text-white
    disabled:pointer-events-none disabled:opacity-50
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald/50
  `

  const declText =
    coords === null
      ? "—"
      : declValue === null
        ? decl && decl.key === coordsKey
          ? "Unavailable"
          : "…"
        : `${declValue >= 0 ? "+" : ""}${declValue.toFixed(1)}°`

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
      {/* Compass (hero) */}
      <section className={`rounded-2xl border-[1.5px] border-deep-teal/60 bg-card px-4 py-6 sm:px-6 sm:py-8 ${cardShadow}`}>
        <p
          aria-live={compass === "on" ? "off" : "polite"}
          className={`
            mx-auto mb-6 w-fit max-w-full rounded-full border px-4 py-2 text-center text-xs leading-relaxed
            transition-colors duration-300
            ${aligned ? "border-emerald bg-emerald/10 font-semibold text-emerald" : "border-deep-teal/20 bg-deep-teal/5 text-muted-teal"}
          `}
        >
          {compassHint}
        </p>
        <span className="sr-only" aria-live="polite">
          {aligned ? "You are facing the Qibla." : ""}
        </span>

        <div className="mx-auto w-full max-w-[340px] sm:max-w-[440px] xl:max-w-[500px]">
          <div
            className={`
              relative aspect-square rounded-full border-[1.5px] bg-warm-white transition-colors duration-300
              ${aligned ? "border-emerald" : "border-deep-teal/60"} ${cardShadow}
            `}
          >
            {aligned && (
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-full border-2 border-emerald/60 animate-ping motion-reduce:animate-none"
              />
            )}

            {/* Rotating dial */}
            <svg
              viewBox="0 0 200 200"
              role="img"
              aria-label={bearing !== null ? `Qibla is ${Math.round(bearing)} degrees from north` : "Qibla compass"}
              className="absolute inset-0 h-full w-full transition-transform duration-200 ease-out motion-reduce:transition-none"
              style={{ transform: `rotate(${-dialRotation}deg)` }}
            >
              <circle cx="100" cy="100" r="80" fill="none" className="text-deep-teal" stroke="currentColor" strokeOpacity="0.15" />
              <circle cx="100" cy="100" r="54" fill="none" className="text-deep-teal" stroke="currentColor" strokeOpacity="0.1" strokeDasharray="2 4" />

              {/* ticks */}
              {Array.from({ length: 72 }).map((_, i) => {
                const major = i % 9 === 0
                return (
                  <line
                    key={i}
                    x1="100"
                    y1="6"
                    x2="100"
                    y2={major ? 18 : 12}
                    transform={`rotate(${i * 5} 100 100)`}
                    className="text-deep-teal"
                    stroke="currentColor"
                    strokeOpacity={major ? 0.7 : 0.35}
                    strokeWidth={major ? 1.5 : 1}
                  />
                )
              })}

              {/* N E S W */}
              <text x="100" y="44" textAnchor="middle" className="text-emerald" fill="currentColor" fontSize="14" fontWeight="600">N</text>
              <text x="158" y="105" textAnchor="middle" className="text-deep-teal" fill="currentColor" fontSize="12" opacity="0.7">E</text>
              <text x="100" y="168" textAnchor="middle" className="text-deep-teal" fill="currentColor" fontSize="12" opacity="0.7">S</text>
              <text x="42" y="105" textAnchor="middle" className="text-deep-teal" fill="currentColor" fontSize="12" opacity="0.7">W</text>

              {/* Qibla pointer */}
              {bearing !== null && (
                <g transform={`rotate(${bearing} 100 100)`} className={aligned ? "text-emerald" : "text-gold"}>
                  <line x1="100" y1="100" x2="100" y2="54" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  <path d="M100 34 L109 56 L91 56 Z" fill="currentColor" />
                  {/* Kaaba marker */}
                  <rect x="90" y="6" width="20" height="22" rx="3" className="text-deep-teal" fill="currentColor" />
                  <rect x="90" y="6" width="20" height="22" rx="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <rect x="90" y="11" width="20" height="3" fill="currentColor" />
                </g>
              )}

              <circle cx="100" cy="100" r="6" className="text-deep-teal" fill="currentColor" />
              <circle cx="100" cy="100" r="2.5" className="text-gold" fill="currentColor" />
            </svg>

            {/* Fixed marker: the top of your phone */}
            <svg viewBox="0 0 200 200" className="pointer-events-none absolute inset-0 h-full w-full text-gold" aria-hidden="true">
              <path d="M92 0 L108 0 L100 12 Z" fill="currentColor" />
            </svg>
          </div>
        </div>

        {/* Manual dial for devices with no compass sensor (laptops), or before the live compass is on */}
        {compass !== "on" && bearing !== null && (
          <div className="mx-auto mt-6 w-full max-w-[340px] sm:max-w-[440px]">
            <label htmlFor="q-dial" className="mb-2 flex items-baseline justify-between text-xs font-semibold text-deep-teal">
              <span>Rotate the dial</span>
              <span className="font-normal text-muted-teal">
                {heading !== null ? `Facing ${Math.round(heading)}° ${cardinal(heading)}` : "Facing north"}
              </span>
            </label>
            <input
              id="q-dial"
              type="range"
              min={0}
              max={359}
              step={1}
              value={heading !== null ? Math.round(heading) % 360 : 0}
              onChange={(e) => setManualHeading(Number(e.target.value))}
              className="w-full accent-emerald"
            />
          </div>
        )}

        {/* Compact readout (mobile, where the result card is further down) */}
        {bearing !== null && distance !== null && (
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2 lg:hidden">
            <span className="rounded-full bg-deep-teal px-3 py-1.5 text-xs font-semibold text-gold">
              {bearing.toFixed(1)}° {cardinal(bearing)}
            </span>
            <span className="rounded-full border border-deep-teal/30 px-3 py-1.5 text-xs font-semibold text-deep-teal">
              {Math.round(distance).toLocaleString("en-GB")} km to the Kaaba
            </span>
          </div>
        )}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={findLocation}
            disabled={locate === "locating"}
            className="
              flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald px-4 py-2.5
              text-xs font-semibold text-white transition-colors duration-300 hover:bg-deep-teal
              disabled:opacity-60
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald/50
            "
          >
            <LocateFixed className="h-4 w-4" aria-hidden="true" />
            {locate === "locating" ? "Finding location…" : "Use my location"}
          </button>

          <button
            type="button"
            onClick={compass === "on" ? stopCompass : startCompass}
            disabled={bearing === null}
            className={secondaryBtn}
          >
            <Compass className="h-4 w-4" aria-hidden="true" />
            {compass === "on" ? "Turn off live compass" : "Turn on live compass"}
          </button>
        </div>

        {locateError && (
          <p role="alert" className="mt-3 text-center text-xs leading-relaxed text-muted-teal">
            {locateError}
          </p>
        )}
      </section>

      {/* Side column: result + manual coordinates */}
      <div className="flex flex-col gap-5">
        <aside
          aria-live="polite"
          className="
            rounded-2xl border-[1.5px] border-deep-teal bg-deep-teal p-5 text-white sm:p-6
            shadow-[0_4px_8px_rgba(6,63,58,0.2),0_18px_34px_rgba(6,63,58,0.28)]
          "
        >
          <p className="text-[11px] font-semibold uppercase tracking-wide text-white/70">Qibla direction</p>
          <p className="mt-1 font-serif text-[34px] font-medium leading-tight text-gold sm:text-[38px]">
            {bearing !== null ? `${bearing.toFixed(1)}°` : "—"}
          </p>
          <p className="mt-1 text-xs text-white/80">
            {bearing !== null ? `${cardinal(bearing)}, measured clockwise from true north` : "Find your location to begin."}
          </p>

          <dl className="mt-5 space-y-2.5 border-t border-white/15 pt-4 text-xs">
            <div className="flex items-baseline justify-between gap-3">
              <dt className="text-white/70">Distance to the Kaaba</dt>
              <dd className="font-semibold">
                {distance !== null ? `${Math.round(distance).toLocaleString("en-GB")} km` : "—"}
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-3">
              <dt className="text-white/70">Your latitude</dt>
              <dd className="font-semibold">{coords ? `${coords.lat.toFixed(4)}°` : "—"}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-3">
              <dt className="text-white/70">Your longitude</dt>
              <dd className="font-semibold">{coords ? `${coords.lng.toFixed(4)}°` : "—"}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-3">
              <dt className="text-white/70">Magnetic declination</dt>
              <dd className="font-semibold">{declText}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-3">
              <dt className="text-white/70">Phone heading</dt>
              <dd className="font-semibold">{heading !== null ? `${Math.round(heading)}°` : "—"}</dd>
            </div>
          </dl>

          <button
            type="button"
            onClick={handleReset}
            className="
              mt-5 flex w-full items-center justify-center gap-2
              rounded-xl border border-white/30 px-3.5 py-2.5
              text-xs font-semibold text-white
              transition-colors duration-300 hover:bg-white/10
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60
            "
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            Reset finder
          </button>

          <p className="mt-4 text-[11px] leading-relaxed text-white/60">
            Your location stays on your device and is never sent anywhere. Phone compasses point to magnetic north, so
            this tool corrects the reading to true north for your location. Compasses can still be thrown off by
            magnets, cases and metal, so keep your phone flat and away from them. If the needle looks wrong, move your
            phone in a figure of 8 to recalibrate it.
          </p>
        </aside>

        <section className={`rounded-2xl border-[1.5px] border-deep-teal/60 bg-card p-4 sm:p-6 ${cardShadow}`}>
          <Heading>Or enter coordinates</Heading>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <ToolField id="q-lat" label="Latitude" hint="From -90 to 90, for example 51.5074" unit="°" value={manualLat} onChange={setManualLat} />
            <ToolField id="q-lng" label="Longitude" hint="From -180 to 180, for example -0.1278" unit="°" value={manualLng} onChange={setManualLng} />
          </div>

          {manualError && (
            <p role="alert" className="mt-3 text-xs leading-relaxed text-muted-teal">
              {manualError}
            </p>
          )}

          <button
            type="button"
            onClick={applyManual}
            className="
              mt-4 w-full rounded-xl border border-deep-teal/40 px-4 py-2.5 text-xs font-semibold text-deep-teal
              transition-colors duration-300 hover:border-emerald hover:bg-emerald hover:text-white
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald/50
            "
          >
            Show Qibla for these coordinates
          </button>
        </section>
      </div>
    </div>
  )
}