"use client"

import { useMemo, useState } from "react"
import { RotateCcw } from "lucide-react"
import ToolField from "./ToolField"

const CURRENCIES = ["GBP", "USD", "EUR", "SAR", "AED", "PKR"] as const
type Currency = (typeof CURRENCIES)[number]

const NISAB_GOLD_GRAMS = 87.48
const NISAB_SILVER_GRAMS = 612.36
const ZAKAT_RATE = 0.025

const EMPTY = {
  goldPrice: "",
  silverPrice: "",
  cash: "",
  bank: "",
  goldGrams: "",
  silverGrams: "",
  investments: "",
  business: "",
  receivables: "",
  debts: "",
}
type Values = typeof EMPTY
type Key = keyof Values

const toNumber = (value: string) => {
  const n = parseFloat(value)
  return Number.isFinite(n) && n > 0 ? n : 0
}

const cardShadow =
  "shadow-[inset_0_0_14px_rgba(6,63,58,0.2),0_2px_4px_rgba(6,63,58,0.1),0_12px_26px_rgba(6,63,58,0.18)]"

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-3 mt-7 border-b border-deep-teal/15 pb-2 font-heading text-sm font-semibold text-deep-teal">
      {children}
    </h3>
  )
}

export default function ZakatCalculator() {
  const [currency, setCurrency] = useState<Currency>("GBP")
  const [basis, setBasis] = useState<"silver" | "gold">("silver")
  const [values, setValues] = useState<Values>(EMPTY)

  const set = (key: Key) => (value: string) =>
    setValues((prev) => ({ ...prev, [key]: value }))

  const money = useMemo(
    () =>
      new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency,
        maximumFractionDigits: 2,
      }),
    [currency]
  )

  const result = useMemo(() => {
    const goldValue = toNumber(values.goldGrams) * toNumber(values.goldPrice)
    const silverValue = toNumber(values.silverGrams) * toNumber(values.silverPrice)

    const totalAssets =
      toNumber(values.cash) +
      toNumber(values.bank) +
      goldValue +
      silverValue +
      toNumber(values.investments) +
      toNumber(values.business) +
      toNumber(values.receivables)

    const debts = toNumber(values.debts)
    const netWealth = Math.max(0, totalAssets - debts)

    const nisab =
      basis === "silver"
        ? NISAB_SILVER_GRAMS * toNumber(values.silverPrice)
        : NISAB_GOLD_GRAMS * toNumber(values.goldPrice)

    const hasNisab = nisab > 0
    const eligible = hasNisab && netWealth >= nisab
    const zakat = eligible ? netWealth * ZAKAT_RATE : 0

    return { totalAssets, debts, netWealth, nisab, hasNisab, eligible, zakat }
  }, [values, basis])

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
      {/* Inputs */}
      <div className={`rounded-2xl border-[1.5px] border-deep-teal/60 bg-card p-4 sm:p-6 ${cardShadow}`}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="zakat-currency" className="block text-xs font-semibold text-charcoal">
              Currency
            </label>
            <select
              id="zakat-currency"
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

          <div>
            <label htmlFor="zakat-basis" className="block text-xs font-semibold text-charcoal">
              Nisab based on
            </label>
            <select
              id="zakat-basis"
              value={basis}
              onChange={(e) => setBasis(e.target.value as "silver" | "gold")}
              className="mt-1.5 w-full rounded-xl border border-deep-teal/30 bg-white px-3 py-2.5 text-sm text-charcoal focus:border-emerald focus:outline-none focus:ring-2 focus:ring-emerald/30"
            >
              <option value="silver">Silver (612.36 g)</option>
              <option value="gold">Gold (87.48 g)</option>
            </select>
          </div>
        </div>

        <Heading>Today&apos;s prices per gram</Heading>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <ToolField id="z-gold-price" label="Gold price" unit={currency} value={values.goldPrice} onChange={set("goldPrice")} />
          <ToolField id="z-silver-price" label="Silver price" unit={currency} value={values.silverPrice} onChange={set("silverPrice")} />
        </div>

        <Heading>Your assets</Heading>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <ToolField id="z-cash" label="Cash in hand" unit={currency} value={values.cash} onChange={set("cash")} />
          <ToolField id="z-bank" label="Bank savings" unit={currency} value={values.bank} onChange={set("bank")} />
          <ToolField id="z-gold" label="Gold owned" unit="g" value={values.goldGrams} onChange={set("goldGrams")} />
          <ToolField id="z-silver" label="Silver owned" unit="g" value={values.silverGrams} onChange={set("silverGrams")} />
          <ToolField id="z-invest" label="Investments and shares" unit={currency} value={values.investments} onChange={set("investments")} />
          <ToolField id="z-business" label="Business stock" hint="Goods held for sale" unit={currency} value={values.business} onChange={set("business")} />
          <ToolField id="z-owed" label="Money owed to you" hint="Loans you expect back" unit={currency} value={values.receivables} onChange={set("receivables")} />
        </div>

        <Heading>Your liabilities</Heading>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <ToolField id="z-debts" label="Debts due now" hint="Short-term debts and bills" unit={currency} value={values.debts} onChange={set("debts")} />
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
          Zakat due
        </p>
        <p className="mt-1 font-serif text-[34px] font-medium leading-tight text-gold sm:text-[38px]">
          {money.format(result.zakat)}
        </p>

        <p className="mt-2 text-xs leading-relaxed text-white/80">
          {!result.hasNisab
            ? `Enter today's ${basis} price to check the nisab.`
            : result.eligible
              ? "Your wealth is above the nisab. Zakat is 2.5% of your net wealth."
              : "Your net wealth is below the nisab, so zakat is not due."}
        </p>

        <dl className="mt-5 space-y-2.5 border-t border-white/15 pt-4 text-xs">
          <div className="flex items-baseline justify-between gap-3">
            <dt className="text-white/70">Total assets</dt>
            <dd className="font-semibold">{money.format(result.totalAssets)}</dd>
          </div>
          <div className="flex items-baseline justify-between gap-3">
            <dt className="text-white/70">Debts deducted</dt>
            <dd className="font-semibold">{money.format(result.debts)}</dd>
          </div>
          <div className="flex items-baseline justify-between gap-3">
            <dt className="text-white/70">Net wealth</dt>
            <dd className="font-semibold">{money.format(result.netWealth)}</dd>
          </div>
          <div className="flex items-baseline justify-between gap-3">
            <dt className="text-white/70">Nisab ({basis})</dt>
            <dd className="font-semibold">
              {result.hasNisab ? money.format(result.nisab) : "Add price"}
            </dd>
          </div>
        </dl>

        <button
          type="button"
          onClick={() => setValues(EMPTY)}
          className="
            mt-5 flex w-full items-center justify-center gap-2
            rounded-xl border border-white/30 px-3.5 py-2.5
            text-xs font-semibold text-white
            transition-colors duration-300 hover:bg-white/10
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60
          "
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          Reset calculator
        </button>

        <p className="mt-4 text-[11px] leading-relaxed text-white/60">
          Zakat is due once your wealth has stayed above the nisab for one
          full lunar year. This is a guide only, so please confirm with a
          qualified scholar.
        </p>
      </aside>
    </div>
  )
}