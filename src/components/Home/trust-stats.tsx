"use client"

import { useEffect, useRef, useState } from "react"
import { BookOpen, ShieldCheck, Wrench } from "lucide-react"

function CountUp({
  to,
  suffix = "",
  duration = 1400,
}: {
  to: number
  suffix?: string
  duration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const [value, setValue] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches

    let frame = 0
    const run = () => {
      // Only called from the observer callback, never synchronously in the effect body
      if (reduceMotion) {
        setValue(to)
        return
      }
      const start = performance.now()
      const step = (now: number) => {
        const p = Math.min((now - start) / duration, 1)
        setValue(Math.round(to * (1 - Math.pow(1 - p, 3))))
        if (p < 1) frame = requestAnimationFrame(step)
      }
      frame = requestAnimationFrame(step)
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          run()
          io.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    io.observe(el)

    return () => {
      io.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [to, duration])

  return (
    <span ref={ref} className="tabular-nums">
      {value}
      {suffix && <span className="ml-0.5 text-gold">{suffix}</span>}
    </span>
  )
}

const line = "border-gold/50"
const col =
  "group relative flex flex-col items-center gap-2 bg-gradient-to-b from-white/85 to-white/55 p-5 text-center transition-colors duration-300 hover:from-white hover:to-white/80 sm:items-stretch sm:text-left lg:p-6"
const chip =
  "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald/10 text-emerald ring-1 ring-emerald/20 transition-transform duration-300 group-hover:scale-105"
const labelCls =
  "text-[11px] font-bold uppercase tracking-[0.16em] text-gold"
const numCls =
  "flex h-10 items-center justify-center font-heading text-[40px] font-bold leading-none tracking-tight sm:justify-start"
const descCls = "text-[12px] leading-[1.55] text-muted-teal"
const headRow =
  "flex h-9 items-center justify-center gap-2.5 sm:justify-start"

export default function TrustStats({ toolsCount }: { toolsCount: number }) {
  return (
    <section className="relative overflow-hidden px-4 py-6 sm:px-5 sm:py-8 lg:py-10">
      {/* Soft glows so the glass has something to blur */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-gold/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 -right-20 h-80 w-80 rounded-full bg-emerald/15 blur-3xl"
      />

      {/* One raised glass panel, gold dividers between columns */}
      <div className="relative mx-auto grid max-w-[1080px] grid-cols-1 overflow-hidden rounded-[24px] border border-soft-beige shadow-[0_18px_40px_-14px_rgba(6,63,58,0.35),inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur-xl sm:grid-cols-2 lg:grid-cols-[1.15fr_1fr_1fr_1fr]">
        {/* Gloss sheen */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-br from-white/[0.16] via-transparent to-transparent"
        />

        {/* Intro */}
        <div className="relative flex flex-col items-center gap-2 overflow-hidden bg-gradient-to-br from-deep-teal to-dark-teal p-5 text-center sm:items-stretch sm:text-left lg:p-6">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-gold-light/25 blur-2xl"
          />
          <span className="relative flex h-9 items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-white/65 sm:justify-start">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-light" />
            Our tools &amp; guides
          </span>
          <h3 className="relative flex h-10 items-center justify-center font-heading text-[24px] font-bold leading-none tracking-tight text-white sm:justify-start">
            <span>
              Worth <span className="text-gold-light">Trusting</span>
            </span>
          </h3>
          <p className="relative text-[12px] leading-[1.55] text-white/70">
            Simple, reliable Hajj and Umrah tools and guides, built to help you
            worship with confidence and ease.
          </p>
        </div>

        {/* Tools (live count) */}
        <div className={`${col} border-t ${line} sm:border-l sm:border-t-0`}>
          <div className={headRow}>
            <span className={chip}>
              <Wrench className="h-[18px] w-[18px]" aria-hidden="true" />
            </span>
            <span className={labelCls}>Tools</span>
          </div>
          <div className={`${numCls} text-deep-teal`}>
            <CountUp to={toolsCount} suffix="+" />
          </div>
          <p className={descCls}>
            Free Hajj, Umrah and Islamic tools: checklist, zakat, qibla, prayer
            times, and more.
          </p>
        </div>

        {/* Accuracy */}
        <div className={`${col} border-t ${line} lg:border-l lg:border-t-0`}>
          <div className={headRow}>
            <span className={chip}>
              <ShieldCheck className="h-[18px] w-[18px]" aria-hidden="true" />
            </span>
            <span className={labelCls}>Accuracy</span>
          </div>
          <div className={`${numCls} text-emerald`}>
            <CountUp to={100} suffix="%" />
          </div>
          <p className={descCls}>Accurate results from every tool, every time.</p>
        </div>

        {/* References */}
        <div className={`${col} border-t ${line} sm:border-l lg:border-t-0`}>
          <div className={headRow}>
            <span className={chip}>
              <BookOpen className="h-[18px] w-[18px]" aria-hidden="true" />
            </span>
            <span className={labelCls}>References</span>
          </div>
          <div className="flex h-10 items-center justify-center font-heading text-[24px] font-bold leading-none tracking-tight text-deep-teal sm:justify-start">
            Quran <span className="ml-1.5 text-gold">&amp;</span>
            <span className="ml-1.5">Hadith</span>
          </div>
          <p className={descCls}>
            Authentic sources, clearly referenced for every step.
          </p>
        </div>
      </div>
    </section>
  )
}