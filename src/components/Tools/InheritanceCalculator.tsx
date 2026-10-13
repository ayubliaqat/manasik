"use client"

import { useMemo, useState } from "react"
import { Minus, Plus, RotateCcw } from "lucide-react"
import ToolField from "./ToolField"
import {
  calculate,
  EMPTY_COUNTS,
  LIMITS,
  toNumber,
  type Counts,
  type Deceased,
  type Frac,
  type HeirKey,
} from "./inheritance-engine"

const CURRENCIES = [
  { code: "GBP", symbol: "£" },
  { code: "USD", symbol: "$" },
  { code: "EUR", symbol: "€" },
  { code: "PKR", symbol: "Rs" },
]

type Group = { title: string; items: { key: HeirKey; label: string; hint?: string }[] }

const GROUPS = (deceased: Deceased): Group[] => [
  {
    title: "Spouse",
    items: [
      deceased === "male"
        ? { key: "wives", label: "Wives", hint: "Up to 4" }
        : { key: "husband", label: "Husband" },
    ],
  },
  {
    title: "Children",
    items: [
      { key: "sons", label: "Sons" },
      { key: "daughters", label: "Daughters" },
    ],
  },
  {
    title: "Grandchildren (through a son)",
    items: [
      { key: "grandsons", label: "Son's sons" },
      { key: "granddaughters", label: "Son's daughters" },
    ],
  },
  {
    title: "Parents",
    items: [
      { key: "father", label: "Father" },
      { key: "mother", label: "Mother" },
    ],
  },
  {
    title: "Grandparents",
    items: [
      { key: "grandfather", label: "Father's father" },
      { key: "paternalGrandmother", label: "Father's mother" },
      { key: "maternalGrandmother", label: "Mother's mother" },
    ],
  },
  {
    title: "Brothers and sisters",
    items: [
      { key: "fullBrothers", label: "Full brothers" },
      { key: "fullSisters", label: "Full sisters" },
      { key: "paternalBrothers", label: "Half-brothers", hint: "Same father, different mother" },
      { key: "paternalSisters", label: "Half-sisters", hint: "Same father, different mother" },
      { key: "maternalBrothers", label: "Half-brothers", hint: "Same mother, different father" },
      { key: "maternalSisters", label: "Half-sisters", hint: "Same mother, different father" },
    ],
  },
]

// Relatives who can only be one person are tick boxes; the rest are counted
const CHECK_KEYS: HeirKey[] = ["husband", "father", "mother", "grandfather", "paternalGrandmother", "maternalGrandmother"]

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

const stepBtn = `
  flex h-9 w-9 items-center justify-center rounded-full border border-deep-teal/40 text-deep-teal
  transition-colors duration-300 hover:border-emerald hover:bg-emerald hover:text-white
  disabled:pointer-events-none disabled:opacity-40
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald/50
`

function Stepper({
  label,
  hint,
  value,
  max,
  onChange,
}: {
  label: string
  hint?: string
  value: number
  max: number
  onChange: (v: number) => void
}) {
  return (
    <div className="flex items-center justify-between gap-3 py-2">
      <div className="min-w-0">
        <p className="text-sm text-deep-teal">{label}</p>
        {hint && <p className="text-[11px] text-muted-teal">{hint}</p>}
      </div>
      <div className="flex items-center gap-3">
        <button type="button" className={stepBtn} onClick={() => onChange(value - 1)} disabled={value <= 0} aria-label={`Remove one: ${label}`}>
          <Minus className="h-4 w-4" aria-hidden="true" />
        </button>
        <span className="w-6 text-center font-serif text-lg tabular-nums text-deep-teal" aria-live="polite">
          {value}
        </span>
        <button type="button" className={stepBtn} onClick={() => onChange(value + 1)} disabled={value >= max} aria-label={`Add one: ${label}`}>
          <Plus className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}

function Check({
  id,
  label,
  hint,
  checked,
  onChange,
}: {
  id: string
  label: string
  hint?: string
  checked: boolean
  onChange: (on: boolean) => void
}) {
  return (
    <label htmlFor={id} className="flex cursor-pointer items-start gap-3 py-2.5">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded border-deep-teal/40 accent-emerald focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald/50"
      />
      <span className="min-w-0">
        <span className="block text-sm text-deep-teal">{label}</span>
        {hint && <span className="block text-[11px] leading-snug text-muted-teal">{hint}</span>}
      </span>
    </label>
  )
}

const parseMoney = (s: string) => {
  const v = parseFloat(s.replace(/,/g, ""))
  return Number.isFinite(v) && v > 0 ? v : 0
}

const fractionText = (f: Frac) => (f.d === 1 ? String(f.n) : `${f.n}/${f.d}`)
const percentText = (f: Frac) => `${(toNumber(f) * 100).toFixed(2).replace(/\.?0+$/, "")}%`

export default function InheritanceCalculator() {
  const [deceased, setDeceased] = useState<Deceased>("male")
  const [currency, setCurrency] = useState(CURRENCIES[0])
  const [estate, setEstate] = useState("")
  const [funeral, setFuneral] = useState("")
  const [debts, setDebts] = useState("")
  const [bequest, setBequest] = useState("")
  const [counts, setCounts] = useState<Counts>(EMPTY_COUNTS)
  const [confirmMuslim, setConfirmMuslim] = useState(false)
  const [confirmNoBar, setConfirmNoBar] = useState(false)

  const money = (v: number) => new Intl.NumberFormat("en-GB", { style: "currency", currency: currency.code }).format(v)

  const setCount = (key: HeirKey, v: number) =>
    setCounts((c) => ({ ...c, [key]: Math.min(Math.max(v, 0), LIMITS[key]) }))

  const chooseDeceased = (d: Deceased) => {
    setDeceased(d)
    setCounts((c) => ({ ...c, husband: d === "male" ? 0 : c.husband, wives: d === "female" ? 0 : c.wives }))
  }

  const reset = () => {
    setDeceased("male")
    setEstate("")
    setFuneral("")
    setDebts("")
    setBequest("")
    setCounts(EMPTY_COUNTS)
    setConfirmMuslim(false)
    setConfirmNoBar(false)
  }

  const result = useMemo(() => calculate(counts, deceased), [counts, deceased])

  const gross = parseMoney(estate)
  const funeralCost = parseMoney(funeral)
  const debtCost = parseMoney(debts)
  const net = Math.max(0, gross - funeralCost - debtCost)
  const requested = parseMoney(bequest)
  const bequestUsed = Math.min(requested, net / 3)
  const bequestCapped = requested > net / 3 + 0.005
  const distributable = net - bequestUsed
  const costsExceed = gross > 0 && funeralCost + debtCost > gross
  const hasAmount = gross > 0
  const confirmed = confirmMuslim && confirmNoBar

  const secondaryBtn = `
    flex items-center justify-center gap-2 rounded-xl border border-white/30 px-3.5 py-2.5
    text-xs font-semibold text-white transition-colors duration-300 hover:bg-white/10
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60
  `

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
      {/* Calculator (hero) */}
      <section className={`rounded-2xl border-[1.5px] border-deep-teal/60 bg-card px-4 py-6 sm:px-6 sm:py-8 ${cardShadow}`}>
        <Heading>The person who passed away</Heading>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Gender of the person who passed away">
          {(["male", "female"] as const).map((d) => (
            <button key={d} type="button" onClick={() => chooseDeceased(d)} aria-pressed={deceased === d} className={chipClass(deceased === d)}>
              {d === "male" ? "Male" : "Female"}
            </button>
          ))}
        </div>

        <Heading>Estate</Heading>
        <div className="mb-3 flex flex-wrap gap-2" role="group" aria-label="Currency">
          {CURRENCIES.map((c) => (
            <button key={c.code} type="button" onClick={() => setCurrency(c)} aria-pressed={currency.code === c.code} className={chipClass(currency.code === c.code)}>
              {c.code}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <ToolField id="i-estate" label="Total estate" hint="Everything left behind" unit={currency.symbol} value={estate} onChange={(v: string) => setEstate(v)} />
          <ToolField id="i-funeral" label="Funeral costs" hint="Optional" unit={currency.symbol} value={funeral} onChange={(v: string) => setFuneral(v)} />
          <ToolField id="i-debts" label="Debts" hint="Optional" unit={currency.symbol} value={debts} onChange={(v: string) => setDebts(v)} />
          <ToolField id="i-bequest" label="Bequest (wasiyyah)" hint="To non-heirs, up to one third" unit={currency.symbol} value={bequest} onChange={(v: string) => setBequest(v)} />
        </div>
        {costsExceed && (
          <p role="alert" className="mt-3 text-xs leading-relaxed text-muted-teal">
            Funeral costs and debts are more than the estate, so nothing is left to share.
          </p>
        )}
        {bequestCapped && !costsExceed && (
          <p role="alert" className="mt-3 text-xs leading-relaxed text-muted-teal">
            A bequest can be up to one third of what remains after funeral costs and debts. Using {money(bequestUsed)}. A larger bequest needs the
            heirs&apos; agreement.
          </p>
        )}

        <Heading>Surviving family</Heading>
        <p className="mb-2 text-xs text-muted-teal">Tick each relative who is alive, or count them where there can be more than one. Leave the rest empty.</p>
        {GROUPS(deceased).map((g) => (
          <div key={g.title} className="mb-3 rounded-xl border border-deep-teal/15 bg-white/50 px-4 py-2">
            <p className="pt-1 text-[11px] font-semibold uppercase tracking-wide text-muted-teal">{g.title}</p>
            <div className="divide-y divide-deep-teal/10">
              {g.items.map((it) => (
                CHECK_KEYS.includes(it.key) ? (
                  <Check
                    key={it.key}
                    id={`h-${it.key}`}
                    label={it.label}
                    hint={it.hint}
                    checked={counts[it.key] > 0}
                    onChange={(on) => setCount(it.key, on ? 1 : 0)}
                  />
                ) : (
                  <Stepper key={it.key} label={it.label} hint={it.hint} value={counts[it.key]} max={LIMITS[it.key]} onChange={(v) => setCount(it.key, v)} />
                )
              ))}
            </div>
          </div>
        ))}

        <Heading>Before you see the shares</Heading>
        <div className="divide-y divide-deep-teal/10 rounded-xl border border-deep-teal/15 bg-white/50 px-4">
          <Check
            id="c-muslim"
            label="The person who passed away and every relative I added were Muslim"
            hint="A relative of a different religion does not inherit from a Muslim."
            checked={confirmMuslim}
            onChange={setConfirmMuslim}
          />
          <Check
            id="c-bar"
            label="None of these relatives caused the death"
            hint="A relative who unlawfully caused the death does not inherit."
            checked={confirmNoBar}
            onChange={setConfirmNoBar}
          />
        </div>

        <Heading>Shares</Heading>
        {!confirmed ? (
          <p className="rounded-full border border-deep-teal/20 bg-deep-teal/5 px-4 py-2 text-center text-xs text-muted-teal" aria-live="polite">
            Tick both boxes above to see the shares.
          </p>
        ) : !result.hasHeirs ? (
          <p className="rounded-full border border-deep-teal/20 bg-deep-teal/5 px-4 py-2 text-center text-xs text-muted-teal" aria-live="polite">
            Add at least one relative to see the shares.
          </p>
        ) : (
          <ul className="space-y-3" aria-live="polite">
            {result.rows.map((r) => (
              <li key={r.key} className="flex items-start gap-3 rounded-xl border border-deep-teal/20 bg-white/60 p-3.5">
                <div className="w-[78px] shrink-0 rounded-lg bg-deep-teal py-2 text-center text-white">
                  <span className="block font-serif text-xl font-medium leading-none tabular-nums text-gold">{fractionText(r.share)}</span>
                  <span className="mt-1 block text-[11px] text-white/70">{percentText(r.share)}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-heading text-sm font-semibold text-deep-teal">
                    {r.label}
                    {r.count > 1 ? ` (${r.count})` : ""}
                  </h4>
                  <p className="mt-0.5 text-xs text-muted-teal">
                    {r.basis === "fixed" ? "Fixed share" : r.basis === "remainder" ? "Share of the remainder" : "Fixed share and the remainder"}
                  </p>
                  {hasAmount && (
                    <p className="mt-2 text-xs text-deep-teal">
                      <span className="font-semibold">{money(distributable * toNumber(r.share))}</span> in total
                      {r.count > 1 && (
                        <>
                          , <span className="font-semibold">{money(distributable * toNumber(r.each))}</span> each ({percentText(r.each)})
                        </>
                      )}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}

        {confirmed && result.blocked.length > 0 && (
          <div className="mt-5 rounded-xl border border-deep-teal/15 bg-deep-teal/5 p-4">
            <p className="text-xs font-semibold text-deep-teal">Not inheriting in this case</p>
            <ul className="mt-2 space-y-1.5 text-xs leading-relaxed text-muted-teal">
              {result.blocked.map((b) => (
                <li key={b.label}>
                  <span className="font-semibold text-deep-teal">{b.label}:</span> {b.reason}
                </li>
              ))}
            </ul>
          </div>
        )}

        {confirmed && result.notes.length > 0 && (
          <div className="mt-4 space-y-2 rounded-xl border border-gold/40 bg-gold/10 p-4 text-xs leading-relaxed text-deep-teal">
            {result.notes.map((n) => (
              <p key={n}>{n}</p>
            ))}
          </div>
        )}
      </section>

      {/* Side column: summary */}
      <aside
        aria-live="polite"
        className="
          rounded-2xl border-[1.5px] border-deep-teal bg-deep-teal p-5 text-white sm:p-6
          shadow-[0_4px_8px_rgba(6,63,58,0.2),0_18px_34px_rgba(6,63,58,0.28)]
          lg:sticky lg:top-24
        "
      >
        <p className="text-[11px] font-semibold uppercase tracking-wide text-white/70">Estate to share</p>
        <p className="mt-1 font-serif text-[34px] font-medium leading-tight text-gold sm:text-[38px]">{hasAmount ? money(distributable) : "-"}</p>
        <p className="mt-1 text-xs text-white/80">After funeral costs, debts and any bequest</p>

        <dl className="mt-5 space-y-2.5 border-t border-white/15 pt-4 text-xs">
          <div className="flex items-baseline justify-between gap-3">
            <dt className="text-white/70">Total estate</dt>
            <dd className="font-semibold">{hasAmount ? money(gross) : "-"}</dd>
          </div>
          <div className="flex items-baseline justify-between gap-3">
            <dt className="text-white/70">Funeral costs and debts</dt>
            <dd className="font-semibold">{hasAmount ? money(Math.min(gross, funeralCost + debtCost)) : "-"}</dd>
          </div>
          <div className="flex items-baseline justify-between gap-3">
            <dt className="text-white/70">Bequest (wasiyyah)</dt>
            <dd className="font-semibold">{hasAmount ? money(bequestUsed) : "-"}</dd>
          </div>
          <div className="flex items-baseline justify-between gap-3">
            <dt className="text-white/70">Heirs receiving a share</dt>
            <dd className="font-semibold">{confirmed ? result.rows.length : "-"}</dd>
          </div>
        </dl>

        <button type="button" onClick={reset} className={`mt-5 w-full ${secondaryBtn}`}>
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          Start again
        </button>

        <p className="mt-4 text-[11px] leading-relaxed text-white/60">
          This tool gives general guidance based on the Hanafi view where schools differ. It is not legal or religious advice and does not cover every
          case, such as uncles, nephews or non-Muslim relatives. In the UK, your estate follows the law unless you have a valid will, so speak to a
          solicitor and a qualified scholar. Nothing you enter is saved or sent anywhere.
        </p>
      </aside>
    </div>
  )
}