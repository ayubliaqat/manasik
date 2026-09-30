"use client"

import { useMemo, useState } from "react"
import { RotateCcw } from "lucide-react"
import ToolField from "./ToolField"

const CURRENCIES = ["GBP", "USD", "EUR", "SAR", "AED", "PKR"] as const
type Currency = (typeof CURRENCIES)[number]

const DEFAULTS = {
  travellers: "1",
  rooms: "1",
  nightsMakkah: "",
  nightsMadinah: "",
  flight: "",
  visa: "",
  rateMakkah: "",
  rateMadinah: "",
  food: "",
  transport: "",
  ziyarah: "",
  gifts: "",
  other: "",
  buffer: "10",
}
type Values = typeof DEFAULTS
type Key = keyof Values

const toNumber = (value: string) => {
  const n = parseFloat(value)
  return Number.isFinite(n) && n > 0 ? n : 0
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

export default function CostEstimator() {
  const [currency, setCurrency] = useState<Currency>("GBP")
  const [values, setValues] = useState<Values>(DEFAULTS)

  const set = (key: Key) => (value: string) =>
    setValues((prev) => ({ ...prev, [key]: value }))

  const money = useMemo(
    () =>
      new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency,
        maximumFractionDigits: 0,
      }),
    [currency]
  )

  const result = useMemo(() => {
    const travellers = Math.max(1, Math.round(toNumber(values.travellers)))
    const rooms = Math.max(1, Math.round(toNumber(values.rooms)))
    const nM = toNumber(values.nightsMakkah)
    const nD = toNumber(values.nightsMadinah)
    const days = nM + nD

    const rows = [
      { label: "Flights", amount: toNumber(values.flight) * travellers },
      { label: "Visa and permits", amount: toNumber(values.visa) * travellers },
      {
        label: "Hotels",
        amount: (nM * toNumber(values.rateMakkah) + nD * toNumber(values.rateMadinah)) * rooms,
      },
      { label: "Food", amount: toNumber(values.food) * days * travellers },
      { label: "Local transport", amount: toNumber(values.transport) },
      { label: "Ziyarah and tours", amount: toNumber(values.ziyarah) },
      { label: "Gifts and shopping", amount: toNumber(values.gifts) },
      { label: "Other costs", amount: toNumber(values.other) },
    ]

    const subtotal = rows.reduce((n, r) => n + r.amount, 0)
    const buffer = (subtotal * toNumber(values.buffer)) / 100
    const total = subtotal + buffer

    return { rows, subtotal, buffer, total, perPerson: total / travellers, travellers, days }
  }, [values])

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
      {/* Inputs */}
      <div className={`rounded-2xl border-[1.5px] border-deep-teal/60 bg-card p-4 sm:p-6 ${cardShadow}`}>
        <Heading>Your trip</Heading>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="c-currency" className="block text-xs font-semibold text-charcoal">
              Currency
            </label>
            <select
              id="c-currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value as Currency)}
              className="mt-1.5 w-full rounded-xl border border-deep-teal/30 bg-white px-3 py-2.5 text-sm text-charcoal focus:border-emerald focus:outline-none focus:ring-2 focus:ring-emerald/30"
            >
              {CURRENCIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <ToolField id="c-travellers" label="Travellers" unit="people" value={values.travellers} onChange={set("travellers")} />
          <ToolField id="c-nm" label="Nights in Makkah" unit="nights" value={values.nightsMakkah} onChange={set("nightsMakkah")} />
          <ToolField id="c-nd" label="Nights in Madinah" unit="nights" value={values.nightsMadinah} onChange={set("nightsMadinah")} />
        </div>

        <Heading>Flights and visa</Heading>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <ToolField id="c-flight" label="Flight per person" hint="Return ticket" unit={currency} value={values.flight} onChange={set("flight")} />
          <ToolField id="c-visa" label="Visa per person" unit={currency} value={values.visa} onChange={set("visa")} />
        </div>

        <Heading>Hotels</Heading>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <ToolField id="c-rooms" label="Rooms needed" unit="rooms" value={values.rooms} onChange={set("rooms")} />
          <span className="hidden sm:block" />
          <ToolField id="c-rm" label="Makkah per room" hint="Price per night" unit={currency} value={values.rateMakkah} onChange={set("rateMakkah")} />
          <ToolField id="c-rd" label="Madinah per room" hint="Price per night" unit={currency} value={values.rateMadinah} onChange={set("rateMadinah")} />
        </div>

        <Heading>Daily spending</Heading>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <ToolField id="c-food" label="Food per person" hint="Per day" unit={currency} value={values.food} onChange={set("food")} />
          <ToolField id="c-transport" label="Local transport" hint="Whole trip, all travellers" unit={currency} value={values.transport} onChange={set("transport")} />
        </div>

        <Heading>Extras</Heading>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <ToolField id="c-ziyarah" label="Ziyarah and tours" unit={currency} value={values.ziyarah} onChange={set("ziyarah")} />
          <ToolField id="c-gifts" label="Gifts and shopping" unit={currency} value={values.gifts} onChange={set("gifts")} />
          <ToolField id="c-other" label="Other costs" unit={currency} value={values.other} onChange={set("other")} />
          <ToolField id="c-buffer" label="Safety buffer" hint="Extra for unexpected costs" unit="%" value={values.buffer} onChange={set("buffer")} />
        </div>
      </div>

      {/* Result */}
      <aside
        aria-live="polite"
        className="
          rounded-2xl border-[1.5px] border-deep-teal bg-deep-teal p-5 text-white sm:p-6
          shadow-[0_4px_8px_rgba(6,63,58,0.2),0_18px_34px_rgba(6,63,58,0.28)]
          lg:sticky lg:top-24
        "
      >
        <p className="text-[11px] font-semibold uppercase tracking-wide text-white/70">
          Estimated total
        </p>
        <p className="mt-1 font-serif text-[34px] font-medium leading-tight text-gold sm:text-[38px]">
          {money.format(result.total)}
        </p>
        <p className="mt-1 text-xs text-white/80">
          {money.format(result.perPerson)} per person
          {result.days > 0 && ` for ${result.days} nights`}
        </p>

        <ul className="mt-5 space-y-3 border-t border-white/15 pt-4">
          {result.rows.map((row) => {
            const share = result.subtotal ? (row.amount / result.subtotal) * 100 : 0
            return (
              <li key={row.label}>
                <div className="flex items-baseline justify-between gap-3 text-xs">
                  <span className="text-white/75">{row.label}</span>
                  <span className="font-semibold">{money.format(row.amount)}</span>
                </div>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/15">
                  <div
                    className="h-full rounded-full bg-gold transition-all duration-500 ease-out"
                    style={{ width: `${share}%` }}
                  />
                </div>
              </li>
            )
          })}
          <li className="flex items-baseline justify-between gap-3 border-t border-white/15 pt-3 text-xs">
            <span className="text-white/75">Safety buffer</span>
            <span className="font-semibold">{money.format(result.buffer)}</span>
          </li>
        </ul>

        <button
          type="button"
          onClick={() => setValues(DEFAULTS)}
          className="
            mt-5 flex w-full items-center justify-center gap-2
            rounded-xl border border-white/30 px-3.5 py-2.5
            text-xs font-semibold text-white
            transition-colors duration-300 hover:bg-white/10
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60
          "
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          Reset estimator
        </button>

        <p className="mt-4 text-[11px] leading-relaxed text-white/60">
          This is an estimate only. Prices change by season and package, so
          check current rates before you book.
        </p>
      </aside>
    </div>
  )
}