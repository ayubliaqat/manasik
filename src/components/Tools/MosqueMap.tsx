"use client"

import { useEffect } from "react"
import { CircleMarker, MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

export type Mosque = {
  id: string
  name: string
  address: string
  denomination: string
  openingHours: string
  website: string
  phone: string
  lat: number
  lng: number
  km: number
}

type Props = {
  center: { lat: number; lng: number }
  mosques: Mosque[]
  selectedId: string | null
  onSelect: (id: string) => void
}

// Brand colours as hex, because Leaflet icons are plain HTML outside Tailwind. Match these to your theme.
const DEEP_TEAL = "#063F3A"
const GOLD = "#C9A24B"

const pin = (active: boolean) => {
  const s = active ? 32 : 24
  return L.divIcon({
    className: "",
    iconSize: [s, s],
    iconAnchor: [s / 2, s / 2],
    html: `<div style="width:${s}px;height:${s}px;border-radius:9999px;background:${active ? GOLD : DEEP_TEAL};border:3px solid #fff;box-shadow:0 2px 8px rgba(6,63,58,.45)"></div>`,
  })
}

function View({ center, mosques, selectedId }: Pick<Props, "center" | "mosques" | "selectedId">) {
  const map = useMap()

  // Fit the view to the search point and the results whenever they change
  useEffect(() => {
    const pts: [number, number][] = [[center.lat, center.lng], ...mosques.slice(0, 12).map((m): [number, number] => [m.lat, m.lng])]
    map.fitBounds(L.latLngBounds(pts), { padding: [36, 36], maxZoom: 16 })
  }, [center.lat, center.lng, mosques, map])

  // Fly to the mosque picked from the list
  useEffect(() => {
    const m = mosques.find((x) => x.id === selectedId)
    if (m) map.flyTo([m.lat, m.lng], Math.max(map.getZoom(), 16), { duration: 0.6 })
  }, [selectedId, mosques, map])

  return null
}

export default function MosqueMap({ center, mosques, selectedId, onSelect }: Props) {
  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={14}
      scrollWheelZoom={false}
      className="h-full w-full"
      style={{ zIndex: 0 }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        maxZoom={19}
      />
      <CircleMarker
        center={[center.lat, center.lng]}
        radius={9}
        pathOptions={{ color: "#fff", weight: 3, fillColor: "#2563eb", fillOpacity: 1 }}
      >
        <Popup>You are searching from here</Popup>
      </CircleMarker>
      {mosques.map((m) => (
        <Marker
          key={m.id}
          position={[m.lat, m.lng]}
          icon={pin(m.id === selectedId)}
          eventHandlers={{ click: () => onSelect(m.id) }}
        >
          <Popup>
            <strong>{m.name}</strong>
            {m.address ? <div>{m.address}</div> : null}
            <a
              href={`https://www.google.com/maps/dir/?api=1&origin=${center.lat},${center.lng}&destination=${m.lat},${m.lng}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Directions
            </a>
          </Popup>
        </Marker>
      ))}
      <View center={center} mosques={mosques} selectedId={selectedId} />
    </MapContainer>
  )
}