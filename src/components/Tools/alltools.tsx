
import Link from "next/link"
import type { ReactElement, ReactNode } from "react"
import { ArrowRight } from "lucide-react"

type Accent = "emerald" | "gold"

type IconProps = { className?: string }

type Tool = {
  title: string
  description: string
  href: string
  icon: (props: IconProps) => ReactElement
  accent: Accent
}

function IconBase({
  className,
  children,
}: IconProps & { children: ReactNode }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {children}
    </svg>
  )
}

/* Hajj Checklist */
function ClipboardIcon({ className }: IconProps) {
  const rows = [
    { y: 10.5, delay: "0s" },
    { y: 14.5, delay: "0.6s" },
    { y: 18.5, delay: "1.2s" },
  ]

  return (
    <IconBase className={className}>
      <rect x="5" y="4" width="14" height="17" rx="2.2" fill="currentColor" fillOpacity="0.12" />
      <rect x="9" y="2.5" width="6" height="3.2" rx="1" />
      {rows.map(({ y, delay }) => (
        <g key={y}>
          <path
            className="pt-draw text-gold"
            pathLength={1}
            style={{ animationDelay: delay }}
            d={`M7.6 ${y} L8.7 ${y + 1.1} L10.4 ${y - 1.1}`}
            strokeWidth="1.8"
          />
          <path d={`M12.5 ${y} H16.5`} opacity="0.55" />
        </g>
      ))}
    </IconBase>
  )
}

/* Umrah Packing List */
function SuitcaseIcon({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <rect x="4" y="9" width="16" height="11.5" rx="2.2" fill="currentColor" fillOpacity="0.12" />
      <g className="pt-bob">
        <path d="M9 9V7.2A1.2 1.2 0 0 1 10.2 6h3.6A1.2 1.2 0 0 1 15 7.2V9" />
      </g>
      <path d="M9 9v11.5M15 9v11.5M4 14h16" />
      <g className="text-gold">
        <path
          className="pt-twinkle"
          d="M19 1.8 L19.6 3.1 L20.9 3.7 L19.6 4.3 L19 5.6 L18.4 4.3 L17.1 3.7 L18.4 3.1 Z"
          fill="currentColor"
          strokeWidth="0.6"
        />
      </g>
    </IconBase>
  )
}

/* Cost Estimator */
function CalculatorIcon({ className }: IconProps) {
  const cols = [9, 12, 15]
  const rows = [12.4, 15.6, 18.8]

  return (
    <IconBase className={className}>
      <rect x="5" y="2.5" width="14" height="19" rx="2.2" fill="currentColor" fillOpacity="0.12" />
      <rect x="7.5" y="5" width="9" height="3.8" rx="0.9" />
      <rect
        className="pt-digits text-gold"
        x="8.6"
        y="6.2"
        width="5.2"
        height="1.4"
        rx="0.6"
        fill="currentColor"
        stroke="none"
      />
      {rows.map((y, r) =>
        cols.map((x, c) => (
          <circle
            key={`${r}-${c}`}
            className={`pt-key ${c === 2 ? "text-gold" : ""}`}
            style={{ animationDelay: `${(r * 3 + c) * 0.25}s` }}
            cx={x}
            cy={y}
            r="1"
            fill="currentColor"
            stroke="none"
          />
        )),
      )}
    </IconBase>
  )
}

/* Zakat Calculator */
function CoinsIcon({ className }: IconProps) {
  const coins = [18.2, 14.8]

  return (
    <IconBase className={className}>
      {coins.map((y) => (
        <g key={y}>
          <path
            d={`M6 ${y} v2.2 a6 2.3 0 0 0 12 0 v-2.2`}
            fill="currentColor"
            fillOpacity="0.12"
          />
          <ellipse cx="12" cy={y} rx="6" ry="2.3" fill="currentColor" fillOpacity="0.12" />
        </g>
      ))}
      <g className="text-gold">
        <g className="pt-drop">
          <path d="M6 11.4 v2.2 a6 2.3 0 0 0 12 0 v-2.2" fill="currentColor" fillOpacity="0.2" />
          <ellipse cx="12" cy="11.4" rx="6" ry="2.3" fill="currentColor" fillOpacity="0.2" />
          <path d="M10.6 11.4 H13.4" strokeWidth="1.3" />
        </g>
      </g>
    </IconBase>
  )
}

/* 99 Names of Allah */
function NamesOfAllahIcon({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path
        d="M16.9 3.7a8.2 8.2 0 1 0 3.4 13.7A8.8 8.8 0 0 1 16.9 3.7Z"
        fill="currentColor"
        fillOpacity="0.12"
      />
      <path d="M16.9 3.7a8.2 8.2 0 1 0 3.4 13.7A8.8 8.8 0 0 1 16.9 3.7Z" />
      <path
        d="m8 5.3.7 1.5 1.6.7-1.6.7L8 9.8l-.7-1.6-1.6-.7 1.6-.7L8 5.3Z"
        fill="currentColor"
        strokeWidth="0.7"
      />
      <path
        d="m5.1 12 .4.9.9.4-.9.4-.4.9-.4-.9-.9-.4.9-.4.4-.9Z"
        fill="currentColor"
        strokeWidth="0.6"
      />
    </IconBase>
  )
}

/* Tasbih Counter */
function TasbihIcon({ className }: IconProps) {
  const beads = Array.from({ length: 10 }, (_, i) => {
    const angle = (i * Math.PI * 2) / 10 - Math.PI / 2
    return {
      x: 12 + Math.cos(angle) * 7,
      y: 12 + Math.sin(angle) * 7,
    }
  })

  return (
    <IconBase className={className}>
      <circle cx="12" cy="12" r="7.8" strokeDasharray="2 2.5" opacity="0.45" />
      {beads.map((bead, index) => (
        <circle
          key={index}
          className={index === 0 ? "pt-bead" : undefined}
          cx={bead.x}
          cy={bead.y}
          r="1.35"
          fill={index % 3 === 0 ? "currentColor" : "white"}
          stroke="currentColor"
          strokeWidth="1.1"
        />
      ))}
      <circle cx="12" cy="12" r="2.1" fill="currentColor" fillOpacity="0.13" />
      <path d="M12 14.2v2.3m-1.3 0h2.6" />
    </IconBase>
  )
}

/* Qibla Finder */
function QiblaIcon({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <circle cx="12" cy="12" r="9" fill="currentColor" fillOpacity="0.06" />
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3v2m9 7h-2M12 21v-2M3 12h2" opacity="0.55" />
      <g className="pt-needle">
        <path
          d="m15.9 8.1-2.8 6.2-5 1.6 2.7-6.2 5.1-1.6Z"
          fill="currentColor"
          fillOpacity="0.16"
        />
        <path d="m15.9 8.1-2.8 6.2-5 1.6 2.7-6.2 5.1-1.6Z" />
      </g>
      <circle cx="12" cy="12" r="1.1" fill="currentColor" />
    </IconBase>
  )
}

/* Noorani Qaida */
function QaidaIcon({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path
        d="M3.5 6.3c3.2-.9 5.9-.2 8.5 1.8v12c-2.6-2-5.3-2.7-8.5-1.8v-12Z"
        fill="currentColor"
        fillOpacity="0.12"
      />
      <path
        d="M20.5 6.3c-3.2-.9-5.9-.2-8.5 1.8v12c2.6-2 5.3-2.7 8.5-1.8v-12Z"
        fill="currentColor"
        fillOpacity="0.12"
      />
      <path d="M3.5 6.3c3.2-.9 5.9-.2 8.5 1.8v12c-2.6-2-5.3-2.7-8.5-1.8v-12Z" />
      <path d="M20.5 6.3c-3.2-.9-5.9-.2-8.5 1.8v12c2.6-2 5.9-.7 8.5-.8v-13Z" />
      <path d="M6 9.5c1.5-.2 2.9.1 4.2.9M6 12.4c1.5-.2 2.9.1 4.2.9M18 9.5c-1.5-.2-2.9.1-4.2.9M18 12.4c-1.5-.2-2.9.1-4.2.9" strokeWidth="1.2" />
    </IconBase>
  )
}

const tools: Tool[] = [
  {
    title: "Hajj Checklist",
    description: "Tick off documents, rituals and preparations step by step.",
    href: "/tools/hajj-checklist",
    icon: ClipboardIcon,
    accent: "emerald",
  },
  {
    title: "Umrah Packing List",
    description: "Everything to pack for men, women and families.",
    href: "/tools/packing-list",
    icon: SuitcaseIcon,
    accent: "gold",
  },
  {
    title: "Cost Estimator",
    description: "Plan your flights, stay and daily spending in one place.",
    href: "/tools/cost-estimator",
    icon: CalculatorIcon,
    accent: "emerald",
  },
  {
    title: "Zakat Calculator",
    description: "Work out your zakat on savings, gold, silver and more.",
    href: "/tools/zakat-calculator",
    icon: CoinsIcon,
    accent: "gold",
  },
  {
    title: "99 Names of Allah",
    description: "Explore the beautiful names of Allah and their meanings.",
    href: "/tools/99-names-of-allah",
    icon: NamesOfAllahIcon,
    accent: "emerald",
  },
  {
    title: "Tasbih Counter",
    description: "Keep track of your dhikr with a simple digital counter.",
    href: "/tools/tasbih-counter",
    icon: TasbihIcon,
    accent: "gold",
  },
  {
    title: "Qibla Finder",
    description: "Find the direction of the Kaaba for your prayers.",
    href: "/tools/qibla-finder",
    icon: QiblaIcon,
    accent: "emerald",
  },
  {
    title: "Noorani Qaida",
    description: "Build your Quran reading foundations step by step.",
    href: "/tools/noorani-qaida",
    icon: QaidaIcon,
    accent: "gold",
  },
]

const ACCENT_STYLES: Record<
  Accent,
  {
    border: string
    bar: string
    glow: string
    iconBox: string
    icon: string
    number: string
    button: string
  }
> = {
  emerald: {
    border: "border-emerald/30 hover:border-emerald/65",
    bar: "from-emerald via-emerald/60 to-gold/70",
    glow: "from-emerald/[0.09]",
    iconBox:
      "bg-emerald/10 ring-emerald/25 group-hover:bg-emerald/15 group-hover:ring-emerald/45",
    icon: "text-emerald",
    number: "text-emerald/45",
    button:
      "border-emerald/30 bg-emerald/10 text-emerald group-hover:border-emerald/55 group-hover:bg-emerald/15",
  },
  gold: {
    border: "border-gold/35 hover:border-gold/70",
    bar: "from-gold via-gold/60 to-emerald/70",
    glow: "from-gold/[0.10]",
    iconBox:
      "bg-gold/10 ring-gold/30 group-hover:bg-gold/15 group-hover:ring-gold/50",
    icon: "text-gold",
    number: "text-gold/60",
    button:
      "border-gold/40 bg-gold/10 text-deep-teal group-hover:border-gold/65 group-hover:bg-gold/20",
  },
}

const motionCss = `
@keyframes pt-rise {
  from { opacity: 0; transform: translateY(24px) scale(.97); }
  to { opacity: 1; transform: none; }
}
@keyframes pt-draw {
  0% { stroke-dashoffset: 1; }
  18%, 78% { stroke-dashoffset: 0; }
  92%, 100% { stroke-dashoffset: 1; }
}
@keyframes pt-bob {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-1.4px); }
}
@keyframes pt-twinkle {
  0%, 100% { transform: scale(.6); opacity: .5; }
  50% { transform: scale(1.15); opacity: 1; }
}
@keyframes pt-digits {
  0%, 100% { transform: scaleX(.35); }
  50% { transform: scaleX(1); }
}
@keyframes pt-key {
  0%, 40%, 100% { opacity: .4; transform: scale(1); }
  8%, 18% { opacity: 1; transform: scale(1.6); }
}
@keyframes pt-bead-pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.35); opacity: .75; }
}
@keyframes pt-needle-turn {
  0%, 100% { transform: rotate(0deg); }
  50% { transform: rotate(12deg); }
}
@keyframes pt-drop {
  0% { transform: translateY(-9px); opacity: 0; }
  22% { opacity: 1; }
  45%, 82% { transform: translateY(0); opacity: 1; }
  100% { transform: translateY(0); opacity: 0; }
}
.pt-draw { stroke-dasharray: 1; stroke-dashoffset: 0; animation: pt-draw 4.5s ease-in-out infinite; }
.pt-bob { animation: pt-bob 2.4s ease-in-out infinite; }
.pt-twinkle, .pt-digits, .pt-key, .pt-drop, .pt-bead, .pt-needle { transform-box: fill-box; }
.pt-twinkle { transform-origin: center; animation: pt-twinkle 2.6s ease-in-out infinite; }
.pt-digits { transform-origin: 0 50%; animation: pt-digits 3s ease-in-out infinite; }
.pt-key { transform-origin: center; animation: pt-key 3.2s ease-in-out infinite; }
.pt-drop { transform-origin: center; animation: pt-drop 3.4s ease-in infinite; }
.pt-bead { transform-origin: center; animation: pt-bead-pulse 2.2s ease-in-out infinite; }
.pt-needle { transform-origin: 12px 12px; animation: pt-needle-turn 4.5s ease-in-out infinite; }
@supports (animation-timeline: view()) {
  .pt-card {
    animation: pt-rise linear both;
    animation-timeline: view();
    animation-range: entry 5% entry 45%;
  }
}
@media (prefers-reduced-motion: reduce) {
  .pt-card, .pt-draw, .pt-bob, .pt-twinkle, .pt-digits, .pt-key, .pt-drop, .pt-bead, .pt-needle {
    animation: none !important;
  }
}
`

export default function PlanningTools() {
  return (
    <section className="relative overflow-hidden border-y border-emerald/20 bg-white py-10 sm:py-12 lg:py-14">
      <style>{motionCss}</style>

      {/* Soft bottom curve */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-190px] left-1/2 h-[340px] w-[130%] -translate-x-1/2 rounded-[50%_50%_0_0] bg-gradient-to-t from-emerald/[0.08] via-emerald/[0.03] to-transparent"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* All Tools heading */}
        <div className="relative mb-5 pb-6 sm:mb-6 sm:pb-8">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-1/2 -z-10 h-[340px] w-[200vw] -translate-x-1/2 rounded-[0_0_50%_50%] bg-gradient-to-br from-emerald/[0.09] via-emerald/[0.04] to-gold/[0.07] sm:w-[150vw] lg:w-[130vw]"
          />

          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance font-serif text-[24px] font-medium leading-[1.15] tracking-[-0.015em] text-deep-teal sm:text-[28px] md:text-[32px] lg:text-[38px]">
              All{" "}
              <span className="relative inline-block whitespace-nowrap text-emerald">
                Tools
                <svg
                  aria-hidden="true"
                  viewBox="0 0 120 10"
                  preserveAspectRatio="none"
                  fill="none"
                  className="pointer-events-none absolute left-1/2 top-full mt-[0.05em] h-[0.2em] w-[70%] -translate-x-1/2 text-gold"
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

            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-muted-teal sm:text-[15px]">
              Explore practical tools for pilgrimage planning, daily worship and Quran learning.
            </p>
          </div>
        </div>

        {/* All eight tool cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map((tool, index) => {
            const Icon = tool.icon
            const styles = ACCENT_STYLES[tool.accent]

            return (
              <div key={tool.title} className="pt-card relative h-full">
                <Link
                  href={tool.href}
                  className={`
                    group relative flex h-full min-w-0 flex-col overflow-hidden
                    rounded-none rounded-tl-[32px] rounded-br-[32px] border bg-white
                    px-4 pb-4 pt-5 sm:px-5 sm:pb-5
                    shadow-[0_10px_28px_rgba(6,63,58,0.08)]
                    transition-all duration-300 ease-out
                    hover:-translate-y-1
                    hover:shadow-[0_18px_38px_rgba(6,63,58,0.14)]
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald/60 focus-visible:ring-offset-2
                    ${styles.border}
                  `}
                >
                  {/* Top accent bar */}
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${styles.bar}`}
                  />

                  {/* Soft tinted glow */}
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b ${styles.glow} to-transparent`}
                  />

                  {/* Card number */}
                  <span
                    aria-hidden="true"
                    className={`absolute right-4 top-4 text-[10px] font-bold tracking-[0.2em] ${styles.number}`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* Icon */}
                  <span
                    className={`
                      relative mb-3 flex h-12 w-12 shrink-0 items-center justify-center
                      rounded-2xl ring-1 transition-all duration-300
                      group-hover:scale-105 ${styles.iconBox}
                    `}
                  >
                    <Icon className={`h-7 w-7 ${styles.icon}`} />
                  </span>

                  <h3 className="relative font-heading text-[15px] font-semibold leading-[1.35] text-deep-teal">
                    {tool.title}
                  </h3>

                  <p className="relative mb-4 mt-1.5 text-xs leading-[1.6] text-muted-teal">
                    {tool.description}
                  </p>

                  {/* Action pinned to the card bottom */}
                  <span
                    className={`
                      relative mt-auto flex items-center justify-center gap-1.5
                      rounded-xl border px-4 py-2 text-xs font-semibold tracking-wide
                      transition-all duration-300 ${styles.button}
                    `}
                  >
                    Open tool
                    <ArrowRight
                      className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
