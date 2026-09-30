"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Coins, RotateCcw } from "lucide-react"

const CURRENCIES = ["GBP", "USD", "EUR", "SAR", "AED", "PKR"] as const
type Currency = (typeof CURRENCIES)[number]
type Basis = "silver" | "gold"

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

const TABS: {
  id: string
  label: string
  fields: { key: Key; label: string; unit: "money" | "g" }[]
}[] = [
  {
    id: "savings",
    label: "Savings",
    fields: [
      { key: "cash", label: "Cash in hand", unit: "money" },
      { key: "bank", label: "Bank savings", unit: "money" },
    ],
  },
  {
    id: "metals",
    label: "Gold & silver",
    fields: [
      { key: "goldGrams", label: "Gold owned", unit: "g" },
      { key: "silverGrams", label: "Silver owned", unit: "g" },
    ],
  },
  {
    id: "business",
    label: "Business",
    fields: [
      { key: "investments", label: "Investments and shares", unit: "money" },
      { key: "business", label: "Business stock", unit: "money" },
      { key: "receivables", label: "Money owed to you", unit: "money" },
    ],
  },
  {
    id: "debts",
    label: "Debts",
    fields: [{ key: "debts", label: "Debts due now", unit: "money" }],
  },
]

const toNumber = (value: string) => {
  const n = parseFloat(value)
  return Number.isFinite(n) && n > 0 ? n : 0
}

function useAnimatedNumber(target: number) {
  const [value, setValue] = useState(target)
  const current = useRef(target)

  useEffect(() => {
    const from = current.current
    const start = performance.now()
    const duration = 500
    let raf = 0

    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      const next = from + (target - from) * eased
      current.current = next
      setValue(next)
      if (p < 1) raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target])

  return value
}

function Field({
  id,
  label,
  unit,
  value,
  onChange,
}: {
  id: string
  label: string
  unit: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div className="min-w-0">
      <label htmlFor={id} className="block text-[11px] font-semibold text-charcoal">
        {label}
      </label>
      <div className="relative mt-1">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min="0"
          step="any"
          placeholder="0"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="
            w-full rounded-xl
            border border-deep-teal/30 bg-white
            py-2 pl-3 pr-12
            text-sm text-charcoal
            shadow-[inset_0_1px_3px_rgba(6,63,58,0.08)]
            transition-colors duration-200
            placeholder:text-muted-teal/60
            focus:border-emerald focus:outline-none focus:ring-2 focus:ring-emerald/30
          "
        />
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-medium text-muted-teal">
          {unit}
        </span>
      </div>
    </div>
  )
}

export default function ZakatCalculator() {
  const [currency, setCurrency] = useState<Currency>("GBP")
  const [basis, setBasis] = useState<Basis>("silver")
  const [tab, setTab] = useState(TABS[0].id)
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
    const progress = hasNisab ? Math.min(netWealth / nisab, 1) : 0

    return { totalAssets, debts, netWealth, nisab, hasNisab, eligible, zakat, progress }
  }, [values, basis])

  const animatedZakat = useAnimatedNumber(result.zakat)
  const activeTab = TABS.find((t) => t.id === tab) ?? TABS[0]

  const status = !result.hasNisab
    ? { text: "Add prices", style: "bg-white/10 text-white/80" }
    : result.eligible
      ? { text: "Zakat is due", style: "bg-gold text-deep-teal" }
      : { text: "Below nisab", style: "bg-white/15 text-white" }

  const message = !result.hasNisab
    ? `Enter today's ${basis} price to check the nisab.`
    : result.eligible
      ? "Your wealth is above the nisab. You give 2.5% of your net wealth."
      : "Your net wealth is below the nisab, so zakat is not due."

  const tabHasValue = (fields: { key: Key }[]) =>
    fields.some((f) => toNumber(values[f.key]) > 0)

  return (
    <section
      id="zakat"
      className="
        relative scroll-mt-24 overflow-hidden
        border-y border-emerald/20
        bg-gradient-to-br from-[#e8f2ed] via-[#f8f4ea] to-warm-white
        py-12 sm:py-14 lg:py-16
      "
    >
      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto mb-8 max-w-xl text-center sm:mb-10">
          <h2
            className="
              text-balance
              font-serif
              text-[26px] font-medium
              leading-[1.15]
              tracking-[-0.015em]
              text-deep-teal
              sm:text-[32px]
              lg:text-[38px]
            "
          >
            Zakat{" "}
            <span className="relative inline-block whitespace-nowrap text-emerald">
              Calculator
              <svg
                aria-hidden="true"
                viewBox="0 0 120 10"
                preserveAspectRatio="none"
                fill="none"
                className="
                  pointer-events-none absolute
                  left-1/2 top-full
                  mt-[0.05em]
                  h-[0.2em] w-[70%]
                  -translate-x-1/2
                  text-gold
                "
              >
                <path
                  d="M2 5 Q12 0 22 5 T42 5 T62 5 T82 5 T102 5 T118 5"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-md text-sm leading-6 text-muted-teal sm:text-[15px]">
            Find out in seconds if zakat is due and how much to give.
          </p>
        </div>

        {/* Calculator card */}
        <div
          className="
            grid grid-cols-1 overflow-hidden
            rounded-2xl
            border-[1.5px] border-deep-teal/60
            bg-card
            shadow-[0_2px_4px_rgba(6,63,58,0.1),0_14px_30px_rgba(6,63,58,0.2)]
            md:grid-cols-[minmax(0,1fr)_280px]
          "
        >
          {/* Inputs */}
          <div className="min-w-0 p-4 sm:p-5">
            {/* Settings row */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div>
                <label htmlFor="z-currency" className="block text-[11px] font-semibold text-charcoal">
                  Currency
                </label>
                <select
                  id="z-currency"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as Currency)}
                  className="mt-1 w-full rounded-xl border border-deep-teal/30 bg-white px-2.5 py-2 text-sm text-charcoal focus:border-emerald focus:outline-none focus:ring-2 focus:ring-emerald/30"
                >
                  {CURRENCIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-span-1 sm:order-last">
                <span className="block text-[11px] font-semibold text-charcoal">Nisab</span>
                <div className="mt-1 grid grid-cols-2 rounded-xl border border-deep-teal/30 bg-white p-0.5">
                  {(["silver", "gold"] as Basis[]).map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setBasis(b)}
                      aria-pressed={basis === b}
                      className={`rounded-[10px] py-1.5 text-xs font-semibold capitalize transition-colors duration-200 ${
                        basis === b ? "bg-emerald text-white" : "text-muted-teal hover:text-deep-teal"
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              <Field id="z-gold-price" label="Gold per gram" unit={currency} value={values.goldPrice} onChange={set("goldPrice")} />
              <Field id="z-silver-price" label="Silver per gram" unit={currency} value={values.silverPrice} onChange={set("silverPrice")} />
            </div>

            {/* Tabs */}
            <div
              role="tablist"
              aria-label="Wealth categories"
              className="mt-5 flex gap-1 overflow-x-auto rounded-xl bg-emerald/10 p-1"
            >
              {TABS.map((t) => {
                const active = t.id === tab
                return (
                  <button
                    key={t.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setTab(t.id)}
                    className={`
                      relative flex-1 whitespace-nowrap rounded-lg px-3 py-2
                      text-xs font-semibold transition-all duration-200
                      ${active ? "bg-white text-deep-teal shadow-[0_1px_4px_rgba(6,63,58,0.2)]" : "text-muted-teal hover:text-deep-teal"}
                    `}
                  >
                    {t.label}
                    {tabHasValue(t.fields) && (
                      <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />
                    )}
                  </button>
                )
              })}
            </div>

            {/* Active fields */}
            <div role="tabpanel" className="mt-4 grid min-h-[76px] grid-cols-1 gap-3 sm:grid-cols-2">
              {activeTab.fields.map((f) => (
                <Field
                  key={f.key}
                  id={`z-${f.key}`}
                  label={f.label}
                  unit={f.unit === "g" ? "g" : currency}
                  value={values[f.key]}
                  onChange={set(f.key)}
                />
              ))}
            </div>
          </div>

          {/* Result */}
          <aside
            aria-live="polite"
            className="flex flex-col bg-deep-teal p-5 text-white"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-white/70">
                <Coins className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
                Zakat due
              </span>
              <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${status.style}`}>
                {status.text}
              </span>
            </div>

            <p className="mt-2 font-serif text-[34px] font-medium leading-none text-gold">
              {money.format(animatedZakat)}
            </p>

            {/* Nisab meter */}
            <div className="mt-5">
              <div className="flex items-center justify-between text-[11px] text-white/70">
                <span>Net wealth</span>
                <span>{result.hasNisab ? `${Math.round(result.progress * 100)}% of nisab` : "Nisab not set"}</span>
              </div>
              <div
                className="mt-1.5 h-2 overflow-hidden rounded-full bg-white/15"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(result.progress * 100)}
                aria-label="Net wealth compared with nisab"
              >
                <div
                  className={`h-full rounded-full transition-all duration-500 ease-out ${result.eligible ? "bg-gold" : "bg-emerald"}`}
                  style={{ width: `${result.progress * 100}%` }}
                />
              </div>
              <div className="mt-1.5 flex items-center justify-between text-[11px] font-semibold">
                <span>{money.format(result.netWealth)}</span>
                <span className="text-white/70">
                  {result.hasNisab ? money.format(result.nisab) : "--"}
                </span>
              </div>
            </div>

            <p className="mt-4 text-xs leading-relaxed text-white/80">{message}</p>

            <div className="mt-auto pt-5">
              <button
                type="button"
                onClick={() => {
                  setValues(EMPTY)
                  setTab(TABS[0].id)
                }}
                className="
                  flex w-full items-center justify-center gap-2
                  rounded-xl border border-white/30
                  px-3.5 py-2
                  text-xs font-semibold text-white
                  transition-colors duration-300
                  hover:bg-white/10
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60
                "
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                Reset
              </button>
              <p className="mt-3 text-[10px] leading-relaxed text-white/55">
                Due once wealth stays above the nisab for a full lunar year.
                A guide only, so confirm with a qualified scholar.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}