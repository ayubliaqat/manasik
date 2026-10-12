"use client"

import { useMemo, useSyncExternalStore } from "react"
import { RotateCcw, Undo2 } from "lucide-react"
import ToolField from "./ToolField"

type Dhikr = { id: string; arabic: string; latin: string; meaning: string }
type TargetMode = "33" | "99" | "100" | "custom"

const DHIKR: Dhikr[] = [
  { id: "subhanallah", arabic: "سُبْحَانَ ٱللَّٰه", latin: "SubhanAllah", meaning: "Glory be to Allah" },
  { id: "alhamdulillah", arabic: "ٱلْحَمْدُ لِلَّٰه", latin: "Alhamdulillah", meaning: "All praise is for Allah" },
  { id: "allahuakbar", arabic: "ٱللَّٰهُ أَكْبَر", latin: "Allahu Akbar", meaning: "Allah is the Greatest" },
  { id: "lailaha", arabic: "لَا إِلَٰهَ إِلَّا ٱللَّٰه", latin: "La ilaha illallah", meaning: "There is no god but Allah" },
  { id: "astaghfirullah", arabic: "أَسْتَغْفِرُ ٱللَّٰه", latin: "Astaghfirullah", meaning: "I seek forgiveness from Allah" },
]

const TARGET_MODES: { id: TargetMode; label: string }[] = [
  { id: "33", label: "33" },
  { id: "99", label: "99" },
  { id: "100", label: "100" },
  { id: "custom", label: "Custom" },
]

const STORAGE_KEY = "manasik-tasbih-v1"
const MAX_COUNT = 999999
const MAX_TARGET = 10000

type Saved = {
  dhikrId: string
  targetMode: TargetMode
  customTarget: string
  counts: Record<string, number>
  haptics: boolean
}

const DEFAULTS: Saved = {
  dhikrId: DHIKR[0].id,
  targetMode: "33",
  customTarget: "",
  counts: {},
  haptics: true,
}

/* ---------- localStorage as an external store ---------- */

const listeners = new Set<() => void>()
let memoryRaw: string | null = null // fallback when storage is blocked, and keeps writes instant

function subscribe(cb: () => void) {
  listeners.add(cb)
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY || e.key === null) {
      memoryRaw = null // another tab changed it: read from storage again
      cb()
    }
  }
  window.addEventListener("storage", onStorage)
  return () => {
    listeners.delete(cb)
    window.removeEventListener("storage", onStorage)
  }
}

function getSnapshot(): string | null {
  if (memoryRaw !== null) return memoryRaw
  try {
    return window.localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

const getServerSnapshot = (): string | null => null

function parse(raw: string | null): Saved {
  if (!raw) return DEFAULTS
  try {
    const s = JSON.parse(raw) as Partial<Saved>
    const counts: Record<string, number> = {}
    if (s.counts && typeof s.counts === "object") {
      for (const d of DHIKR) {
        const v = Number((s.counts as Record<string, unknown>)[d.id])
        if (Number.isFinite(v) && v > 0) counts[d.id] = Math.min(Math.floor(v), MAX_COUNT)
      }
    }
    return {
      dhikrId: s.dhikrId && DHIKR.some((d) => d.id === s.dhikrId) ? s.dhikrId : DEFAULTS.dhikrId,
      targetMode:
        s.targetMode && ["33", "99", "100", "custom"].includes(s.targetMode) ? s.targetMode : DEFAULTS.targetMode,
      customTarget: typeof s.customTarget === "string" ? s.customTarget : DEFAULTS.customTarget,
      haptics: typeof s.haptics === "boolean" ? s.haptics : DEFAULTS.haptics,
      counts,
    }
  } catch {
    return DEFAULTS
  }
}

// Always applies the change to the freshest saved state, so fast taps are never lost
function update(updater: (s: Saved) => Partial<Saved>) {
  const current = parse(getSnapshot())
  const next: Saved = { ...current, ...updater(current) }
  const raw = JSON.stringify(next)
  memoryRaw = raw
  try {
    window.localStorage.setItem(STORAGE_KEY, raw)
  } catch {
    // private mode or quota: the in-memory copy keeps it working for this session
  }
  listeners.forEach((l) => l())
}

/* ---------- UI helpers ---------- */

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

const RING_RADIUS = 92
const RING_LENGTH = 2 * Math.PI * RING_RADIUS

export default function TasbihCounter() {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const saved = useMemo(() => parse(raw), [raw])
  const { dhikrId, targetMode, customTarget, counts, haptics } = saved

  const dhikr = DHIKR.find((d) => d.id === dhikrId) ?? DHIKR[0]

  const parsedCustom = parseInt(customTarget, 10)
  const customValid = /^\d+$/.test(customTarget.trim()) && parsedCustom >= 1 && parsedCustom <= MAX_TARGET
  const customInvalid = targetMode === "custom" && customTarget.trim() !== "" && !customValid
  const target = targetMode === "custom" ? (customValid ? parsedCustom : 33) : Number(targetMode)

  const count = counts[dhikrId] ?? 0
  const cycle = count % target
  const rounds = Math.floor(count / target)
  const atTarget = count > 0 && cycle === 0
  const shown = atTarget ? target : cycle
  const progress = shown / target
  const total = Object.values(counts).reduce((a, b) => a + b, 0)

  const buzz = (pattern: number | number[]) => {
    if (haptics && typeof navigator !== "undefined" && "vibrate" in navigator) navigator.vibrate(pattern)
  }

  const tap = () => {
    if (count >= MAX_COUNT) return
    const next = count + 1
    update((s) => ({ counts: { ...s.counts, [dhikrId]: Math.min((s.counts[dhikrId] ?? 0) + 1, MAX_COUNT) } }))
    buzz(next % target === 0 ? [60, 40, 60] : 15)
  }

  const undo = () => {
    if (count === 0) return
    update((s) => ({ counts: { ...s.counts, [dhikrId]: Math.max((s.counts[dhikrId] ?? 0) - 1, 0) } }))
  }

  const resetCurrent = () => update((s) => ({ counts: { ...s.counts, [dhikrId]: 0 } }))

  const resetAll = () => update(() => ({ counts: {}, targetMode: "33", customTarget: "" }))

  const hint = atTarget
    ? "Target reached. Tap to start the next round."
    : count === 0
      ? "Tap the circle to begin counting."
      : `${target - shown} to go in this round.`

  const secondaryBtn = `
    flex flex-1 items-center justify-center gap-2 rounded-xl border border-deep-teal/40 px-4 py-2.5
    text-xs font-semibold text-deep-teal transition-colors duration-300
    hover:border-emerald hover:bg-emerald hover:text-white
    disabled:pointer-events-none disabled:opacity-50
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald/50
  `

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
      {/* Counter (hero) */}
      <section className={`rounded-2xl border-[1.5px] border-deep-teal/60 bg-card px-4 py-6 sm:px-6 sm:py-8 ${cardShadow}`}>
        <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Choose dhikr">
          {DHIKR.map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => update(() => ({ dhikrId: d.id }))}
              aria-pressed={d.id === dhikrId}
              className={chipClass(d.id === dhikrId)}
            >
              {d.latin}
            </button>
          ))}
        </div>

        <div className="mt-6 text-center">
          <p lang="ar" dir="rtl" className="font-serif text-3xl leading-relaxed text-deep-teal sm:text-4xl">
            {dhikr.arabic}
          </p>
          <p className="mt-1 text-xs text-muted-teal">{dhikr.meaning}</p>
        </div>

        <p
          aria-live="polite"
          className={`
            mx-auto mb-6 mt-5 w-fit max-w-full rounded-full border px-4 py-2 text-center text-xs leading-relaxed
            transition-colors duration-300
            ${atTarget ? "border-emerald bg-emerald/10 font-semibold text-emerald" : "border-deep-teal/20 bg-deep-teal/5 text-muted-teal"}
          `}
        >
          {hint}
        </p>

        <div className="mx-auto w-full max-w-[340px] sm:max-w-[440px] xl:max-w-[500px]">
          <div className="relative aspect-square">
            {/* Progress ring */}
            <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full" aria-hidden="true">
              <circle cx="100" cy="100" r={RING_RADIUS} fill="none" className="text-deep-teal" stroke="currentColor" strokeOpacity="0.15" strokeWidth="6" />
              <circle
                cx="100"
                cy="100"
                r={RING_RADIUS}
                fill="none"
                className={`${atTarget ? "text-emerald" : "text-gold"} transition-[stroke-dashoffset,color] duration-200 ease-out motion-reduce:transition-none`}
                stroke="currentColor"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={RING_LENGTH}
                strokeDashoffset={RING_LENGTH * (1 - progress)}
                transform="rotate(-90 100 100)"
              />
            </svg>

            {/* Tap button */}
            <button
              type="button"
              onClick={tap}
              aria-label={`${dhikr.latin}: ${shown} of ${target}. Tap to add one.`}
              className="
                absolute inset-[7%] flex select-none touch-manipulation flex-col items-center justify-center
                rounded-full bg-deep-teal text-white [-webkit-tap-highlight-color:transparent]
                shadow-[0_4px_8px_rgba(6,63,58,0.2),0_18px_34px_rgba(6,63,58,0.28)]
                transition-transform duration-150 active:scale-[0.97] motion-reduce:transition-none
                focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald/50
              "
            >
              <span className="font-serif text-[56px] font-medium leading-none tabular-nums text-gold sm:text-[72px] xl:text-[84px]">
                {shown}
              </span>
              <span className="mt-2 text-xs text-white/70">of {target}</span>
            </button>
          </div>
        </div>

        <span className="sr-only" aria-live="polite">
          {atTarget ? "Target reached" : ""}
        </span>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button type="button" onClick={undo} disabled={count === 0} className={secondaryBtn}>
            <Undo2 className="h-4 w-4" aria-hidden="true" />
            Undo last
          </button>
          <button type="button" onClick={resetCurrent} disabled={count === 0} className={secondaryBtn}>
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Reset this dhikr
          </button>
        </div>

        <Heading>Target per round</Heading>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Target per round">
          {TARGET_MODES.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => update(() => ({ targetMode: t.id }))}
              aria-pressed={t.id === targetMode}
              className={chipClass(t.id === targetMode)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {targetMode === "custom" && (
          <div className="mt-4 max-w-xs">
            <ToolField
              id="t-target"
              label="Custom target"
              hint={`A whole number from 1 to ${MAX_TARGET.toLocaleString("en-GB")}`}
              unit="times"
              value={customTarget}
              onChange={(v: string) => update(() => ({ customTarget: v }))}
            />
            {customInvalid && (
              <p role="alert" className="mt-2 text-xs leading-relaxed text-muted-teal">
                Enter a whole number from 1 to {MAX_TARGET.toLocaleString("en-GB")}. Using 33 for now.
              </p>
            )}
          </div>
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
        <p className="text-[11px] font-semibold uppercase tracking-wide text-white/70">{dhikr.latin}</p>
        <p className="mt-1 font-serif text-[34px] font-medium leading-tight text-gold sm:text-[38px]">
          {count.toLocaleString("en-GB")}
        </p>
        <p className="mt-1 text-xs text-white/80">Total count for this dhikr</p>

        <dl className="mt-5 space-y-2.5 border-t border-white/15 pt-4 text-xs">
          <div className="flex items-baseline justify-between gap-3">
            <dt className="text-white/70">This round</dt>
            <dd className="font-semibold">
              {shown} / {target}
            </dd>
          </div>
          <div className="flex items-baseline justify-between gap-3">
            <dt className="text-white/70">Rounds completed</dt>
            <dd className="font-semibold">{rounds.toLocaleString("en-GB")}</dd>
          </div>
          <div className="flex items-baseline justify-between gap-3">
            <dt className="text-white/70">All dhikr combined</dt>
            <dd className="font-semibold">{total.toLocaleString("en-GB")}</dd>
          </div>
        </dl>

        <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/15 pt-4 text-xs">
          <span id="haptics-label" className="text-white/80">
            Vibrate on tap
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={haptics}
            aria-labelledby="haptics-label"
            onClick={() => update((s) => ({ haptics: !s.haptics }))}
            className={`
              relative h-6 w-11 rounded-full transition-colors duration-300
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60
              ${haptics ? "bg-emerald" : "bg-white/25"}
            `}
          >
            <span
              aria-hidden="true"
              className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all duration-300 ${haptics ? "left-[22px]" : "left-0.5"}`}
            />
          </button>
        </div>

        <button
          type="button"
          onClick={resetAll}
          className="
            mt-5 flex w-full items-center justify-center gap-2
            rounded-xl border border-white/30 px-3.5 py-2.5
            text-xs font-semibold text-white
            transition-colors duration-300 hover:bg-white/10
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60
          "
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          Reset everything
        </button>

        <p className="mt-4 text-[11px] leading-relaxed text-white/60">
          Your counts are saved on this device only and are never sent anywhere. Vibration works on most Android
          phones; iPhones do not support it in the browser.
        </p>
      </aside>
    </div>
  )
}