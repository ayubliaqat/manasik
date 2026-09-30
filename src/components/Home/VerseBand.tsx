"use client"

import { useRef, useState, useSyncExternalStore } from "react"
import Link from "next/link"
import { ArrowRight, Check, Copy, Pause, Play } from "lucide-react"

export type DayVerse = {
  label: string
  date: number
  arabic: string
  translation: string
  reference: string
  context: string
  audioUrl?: string
}

const noopSubscribe = () => () => {}
const localDayIndex = () => (new Date().getDay() + 6) % 7

export default function VerseBand({
  days,
  serverToday,
}: {
  days: DayVerse[]
  serverToday: number
}) {
  const today = useSyncExternalStore(noopSubscribe, localDayIndex, () => serverToday)
  const [picked, setPicked] = useState<number | null>(null)
  const [copied, setCopied] = useState(false)
  const [playingIdx, setPlayingIdx] = useState<number | null>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  const selected = picked ?? today
  const verse = days[selected] ?? days[0]
  const playing = playingIdx === selected

  const select = (i: number) => {
    audioRef.current?.pause()
    setPicked(i)
    setCopied(false)
  }

  const toggleAudio = () => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      audio.play().catch(() => setPlayingIdx(null))
    } else {
      audio.pause()
    }
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(
        `${verse.arabic}\n\n${verse.translation}\n(${verse.reference})`
      )
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {}
  }

  return (
    <section
      className="
        relative overflow-hidden
        bg-gradient-to-br from-deep-teal via-[#0A5443] to-emerald
        py-10 sm:py-12 lg:py-14
      "
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-200px] h-[320px] w-[130%] -translate-x-1/2 rounded-[0_0_50%_50%] bg-white/[0.05]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-200px] left-1/2 h-[320px] w-[130%] -translate-x-1/2 rounded-[50%_50%_0_0] bg-gold/[0.07]"
      />

      <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto mb-6 max-w-xl text-center sm:mb-7">
          <h2
            className="
              text-balance font-serif
              text-[22px] font-medium leading-[1.15] tracking-[-0.015em]
              text-white
              sm:text-[26px] lg:text-[30px]
            "
          >
            Verse of the{" "}
            <span className="relative inline-block whitespace-nowrap text-gold">
              Day
              <svg
                aria-hidden="true"
                viewBox="0 0 120 10"
                preserveAspectRatio="none"
                fill="none"
                className="pointer-events-none absolute left-1/2 top-full mt-[0.05em] h-[0.2em] w-[70%] -translate-x-1/2 text-white/70"
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
          <p className="mt-3 text-[13px] leading-6 text-white/75 sm:text-sm">
            A verse about Hajj and Umrah, refreshed every day.
          </p>
        </div>

        {/* Week strip */}
        <div className="mb-4 grid grid-cols-7 gap-1.5 sm:gap-2" role="group" aria-label="Choose a day">
          {days.map((d, i) => {
            const isSelected = i === selected
            const isToday = i === today
            return (
              <button
                key={d.label}
                type="button"
                onClick={() => select(i)}
                aria-pressed={isSelected}
                aria-label={`${d.label} ${d.date}${isToday ? ", today" : ""}`}
                className={`
                  relative flex min-w-0 flex-col items-center
                  rounded-xl py-2
                  transition-colors duration-200
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60
                  ${
                    isSelected
                      ? "bg-gold text-deep-teal"
                      : "bg-white/10 text-white/80 hover:bg-white/20"
                  }
                `}
              >
                <span className="text-[10px] font-semibold uppercase tracking-wide">
                  {d.label}
                </span>
                <span className="text-sm font-semibold leading-tight">{d.date}</span>
                {isToday && (
                  <span
                    className={`absolute bottom-1 h-1 w-1 rounded-full ${
                      isSelected ? "bg-deep-teal" : "bg-gold"
                    }`}
                    aria-hidden="true"
                  />
                )}
              </button>
            )
          })}
        </div>

        {/* Verse card */}
        <div
          className="
            rounded-2xl border border-gold/40 bg-white/[0.06]
            px-4 py-6 text-center
            shadow-[0_10px_26px_rgba(0,0,0,0.18)]
            sm:px-8 sm:py-7
          "
        >
          <div aria-live="polite">
            <p
              dir="rtl"
              lang="ar"
              className="text-balance font-serif text-[22px] leading-[1.9] text-white sm:text-[26px] lg:text-[30px]"
            >
              {verse.arabic}
            </p>

            <div className="mx-auto my-4 flex items-center justify-center gap-2" aria-hidden="true">
              <span className="h-px w-8 bg-gold/60" />
              <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
              <span className="h-px w-8 bg-gold/60" />
            </div>

            <p className="mx-auto max-w-xl text-balance text-[13px] leading-6 text-white/90 sm:text-sm sm:leading-7">
              {verse.translation}
            </p>

            <p className="mt-3 text-xs font-semibold text-gold">{verse.reference}</p>
            <p className="mt-0.5 text-[11px] text-white/60">{verse.context}</p>
          </div>

          {/* Actions */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
            {verse.audioUrl && (
              <>
                <audio
                  key={selected}
                  ref={audioRef}
                  src={verse.audioUrl}
                  preload="none"
                  onPlay={() => setPlayingIdx(selected)}
                  onPause={() => setPlayingIdx(null)}
                  onEnded={() => setPlayingIdx(null)}
                />
                <button
                  type="button"
                  onClick={toggleAudio}
                  className="
                    flex items-center justify-center gap-2
                    rounded-full bg-gold px-4 py-2
                    text-xs font-semibold text-deep-teal
                    transition-colors duration-300 hover:bg-white
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60
                  "
                >
                  {playing ? (
                    <Pause className="h-3.5 w-3.5" aria-hidden="true" />
                  ) : (
                    <Play className="h-3.5 w-3.5" aria-hidden="true" />
                  )}
                  {playing ? "Pause" : "Listen"}
                </button>
              </>
            )}

            <button
              type="button"
              onClick={copy}
              className="
                flex items-center justify-center gap-2
                rounded-full border border-gold/60 px-4 py-2
                text-xs font-semibold text-gold
                transition-colors duration-300 hover:bg-gold hover:text-deep-teal
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60
              "
            >
              {copied ? (
                <Check className="h-3.5 w-3.5" aria-hidden="true" />
              ) : (
                <Copy className="h-3.5 w-3.5" aria-hidden="true" />
              )}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>

        {/* Link */}
        <div className="mt-5 flex justify-center">
          <Link
            href="/duas"
            className="
              inline-flex items-center gap-1.5
              text-xs font-semibold text-white/85
              transition-colors duration-300 hover:text-gold
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60
            "
          >
            Explore all duas
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}