"use client"

import { useMemo, useState } from "react"
import Checklist, { type ChecklistGroup } from "./Checklist"

type Audience = "men" | "women" | "children"

type Item = { id: string; label: string; for?: Audience[] }
type Group = { title: string; items: Item[] }

const GROUPS: Group[] = [
  {
    title: "Clothing",
    items: [
      { id: "p-ihram", label: "Two sets of ihram", for: ["men"] },
      { id: "p-belt", label: "Ihram belt", for: ["men"] },
      { id: "p-abaya", label: "Loose abayas or modest dresses", for: ["women"] },
      { id: "p-scarf", label: "Headscarves, several spares", for: ["women"] },
      { id: "p-cotton", label: "Light cotton clothes" },
      { id: "p-socks", label: "Comfortable socks" },
      { id: "p-sandals", label: "Comfortable, easy-to-remove sandals" },
      { id: "p-jacket", label: "Light jacket for cold air conditioning" },
    ],
  },
  {
    title: "Toiletries",
    items: [
      { id: "p-soap", label: "Unscented soap and shampoo" },
      { id: "p-tooth", label: "Toothbrush and toothpaste" },
      { id: "p-sun", label: "Unscented sun cream" },
      { id: "p-lip", label: "Lip balm and moisturiser" },
      { id: "p-sanitary", label: "Sanitary supplies", for: ["women"] },
      { id: "p-nails", label: "Nail clippers and small scissors (checked luggage)" },
    ],
  },
  {
    title: "Health",
    items: [
      { id: "p-meds", label: "Regular medication with a doctor's letter" },
      { id: "p-pain", label: "Pain relief and rehydration salts" },
      { id: "p-blister", label: "Blister plasters and foot cream" },
      { id: "p-mask", label: "Face masks and hand sanitiser" },
    ],
  },
  {
    title: "Documents and money",
    items: [
      { id: "p-passport", label: "Passport and visa" },
      { id: "p-bookings", label: "Flight and hotel confirmations" },
      { id: "p-vaccine", label: "Vaccination certificates" },
      { id: "p-insurance", label: "Travel insurance details" },
      { id: "p-cash", label: "Some Saudi riyals in cash" },
      { id: "p-digital", label: "Digital copies of all documents on your phone" },
    ],
  },
  {
    title: "Electronics",
    items: [
      { id: "p-phone", label: "Phone and charger" },
      { id: "p-bank", label: "Power bank" },
      { id: "p-adapter", label: "Travel plug adaptor if needed" },
    ],
  },
  {
    title: "Worship and comfort",
    items: [
      { id: "p-bag", label: "Small backpack or sling bag" },
      { id: "p-mat", label: "Light, foldable prayer mat" },
      { id: "p-duabook", label: "Dua book or Quran" },
      { id: "p-bottle", label: "Reusable water bottle" },
      { id: "p-umbrella", label: "Umbrella or sun hat" },
      { id: "p-tasbih", label: "Tasbih or counter" },
    ],
  },
  {
    title: "Children",
    items: [
      { id: "p-wrist", label: "ID wristband with a contact number", for: ["children"] },
      { id: "p-spare", label: "Spare clothes for each day", for: ["children"] },
      { id: "p-snacks", label: "Snacks and a small toy", for: ["children"] },
      { id: "p-nappies", label: "Nappies and child medication", for: ["children"] },
      { id: "p-stroller", label: "Lightweight stroller", for: ["children"] },
    ],
  },
]

const AUDIENCES: { id: Audience; label: string }[] = [
  { id: "men", label: "Men" },
  { id: "women", label: "Women" },
  { id: "children", label: "With children" },
]

export default function UmrahPackingList() {
  const [audience, setAudience] = useState<Audience>("men")

  const groups = useMemo<ChecklistGroup[]>(
    () =>
      GROUPS.map((g) => ({
        title: g.title,
        items: g.items
          .filter((i) => !i.for || i.for.includes(audience))
          .map(({ id, label }) => ({ id, label })),
      })).filter((g) => g.items.length > 0),
    [audience]
  )

  return (
    <div>
      <div className="mb-5 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-4">
        <span className="text-xs font-semibold text-charcoal">Packing for</span>
        <div className="grid w-full grid-cols-3 rounded-xl border border-deep-teal/30 bg-white p-0.5 sm:w-auto">
          {AUDIENCES.map((a) => (
            <button
              key={a.id}
              type="button"
              onClick={() => setAudience(a.id)}
              aria-pressed={audience === a.id}
              className={`rounded-[10px] px-4 py-2 text-xs font-semibold transition-colors duration-200 ${
                audience === a.id
                  ? "bg-emerald text-white"
                  : "text-muted-teal hover:text-deep-teal"
              }`}
            >
              {a.label}
            </button>
          ))}
        </div>
      </div>

      <Checklist groups={groups} storageKey="manasik-umrah-packing" />
    </div>
  )
}