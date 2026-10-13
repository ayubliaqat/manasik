import { NextRequest, NextResponse } from "next/server"

export const runtime = "nodejs"

// Public Overpass mirrors, tried in order
const ENDPOINTS = ["https://overpass-api.de/api/interpreter", "https://overpass.kumi.systems/api/interpreter"]
const TTL_MS = 10 * 60 * 1000
const MAX_RESULTS = 40
const cache = new Map<string, { at: number; body: unknown }>()

type El = {
  type: string
  id: number
  lat?: number
  lon?: number
  center?: { lat: number; lon: number }
  tags?: Record<string, string>
}

function distanceKm(aLat: number, aLng: number, bLat: number, bLng: number) {
  const r = Math.PI / 180
  const h =
    Math.sin(((bLat - aLat) * r) / 2) ** 2 +
    Math.cos(aLat * r) * Math.cos(bLat * r) * Math.sin(((bLng - aLng) * r) / 2) ** 2
  return 12742 * Math.asin(Math.sqrt(h))
}

async function runQuery(query: string): Promise<El[]> {
  let lastError: unknown
  for (const url of ENDPOINTS) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          // Replace with your site and contact email, as Overpass asks for an identifiable client
          "User-Agent": "ManasikMosqueFinder/1.0 (https://your-site.example; contact@your-site.example)",
        },
        body: new URLSearchParams({ data: query }),
        signal: AbortSignal.timeout(20000),
        cache: "no-store",
      })
      if (!res.ok) throw new Error(`Overpass ${res.status}`)
      const json = (await res.json()) as { elements?: El[] }
      return json.elements ?? []
    } catch (e) {
      lastError = e
    }
  }
  throw lastError
}

export async function GET(req: NextRequest) {
  const p = req.nextUrl.searchParams
  const lat = Number(p.get("lat"))
  const lng = Number(p.get("lng"))
  const radius = Math.min(Math.max(Math.round(Number(p.get("radius") ?? 3000)) || 3000, 500), 15000)

  if (!Number.isFinite(lat) || !Number.isFinite(lng) || Math.abs(lat) > 90 || Math.abs(lng) > 180) {
    return NextResponse.json({ error: "Invalid coordinates" }, { status: 400 })
  }

  // Round to ~110 m so nearby searches share one cached result
  const key = `${lat.toFixed(3)}:${lng.toFixed(3)}:${radius}`
  const hit = cache.get(key)
  if (hit && Date.now() - hit.at < TTL_MS) return NextResponse.json(hit.body)

  const around = `(around:${radius},${lat},${lng})`
  const filter = `["amenity"="place_of_worship"]["religion"="muslim"]`
  const query = `[out:json][timeout:20];(node${filter}${around};way${filter}${around};relation${filter}${around};);out center tags;`

  try {
    const elements = await runQuery(query)
    const seen = new Set<string>()
    const mosques = elements
      .map((el) => {
        const eLat = el.lat ?? el.center?.lat
        const eLng = el.lon ?? el.center?.lon
        if (eLat === undefined || eLng === undefined) return null
        const id = `${el.type}/${el.id}`
        if (seen.has(id)) return null
        seen.add(id)
        const t = el.tags ?? {}
        const street = [t["addr:housenumber"], t["addr:street"]].filter(Boolean).join(" ")
        const address = [street, t["addr:city"], t["addr:postcode"]].filter(Boolean).join(", ")
        return {
          id,
          name: t.name || t["name:en"] || "Mosque (name not listed)",
          address,
          denomination: t.denomination || "",
          openingHours: t.opening_hours || "",
          website: t.website || t["contact:website"] || "",
          phone: t.phone || t["contact:phone"] || "",
          lat: eLat,
          lng: eLng,
          km: distanceKm(lat, lng, eLat, eLng),
        }
      })
      .filter((m): m is NonNullable<typeof m> => m !== null)
      .sort((a, b) => a.km - b.km)
      .slice(0, MAX_RESULTS)

    const body = { mosques, total: elements.length, source: "OpenStreetMap contributors" }
    cache.set(key, { at: Date.now(), body })
    if (cache.size > 500) cache.delete(cache.keys().next().value as string)
    return NextResponse.json(body)
  } catch {
    return NextResponse.json({ error: "Mosque data is busy right now. Please try again in a moment." }, { status: 502 })
  }
}