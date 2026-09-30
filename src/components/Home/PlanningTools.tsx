import Link from "next/link"
import { ArrowRight, Briefcase, Calculator, ClipboardCheck, Coins } from "lucide-react"

const tools = [
  {
    title: "Hajj Checklist",
    description: "Tick off documents, rituals and preparations step by step.",
    href: "/tools?tool=hajj-checklist",
    icon: ClipboardCheck,
  },
  {
    title: "Umrah Packing List",
    description: "Everything to pack for men, women and families.",
    href: "/tools?tool=packing-list",
    icon: Briefcase,
  },
  {
    title: "Cost Estimator",
    description: "Plan your flights, stay and daily spending in one place.",
    href: "/tools?tool=cost-estimator",
    icon: Calculator,
  },
  {
    title: "Zakat Calculator",
    description: "Work out your zakat on savings, gold, silver and more.",
    href: "/tools?tool=zakat",
    icon: Coins,
  },
]

export default function PlanningTools() {
  return (
    <section
      className="
        relative overflow-hidden
        border-y border-emerald/20
        bg-white
        py-14 sm:py-16 lg:py-20
      "
    >
      {/* Soft top curve */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          left-1/2 top-[-190px]
          h-[340px] w-[130%]
          -translate-x-1/2
          rounded-[0_0_50%_50%]
          bg-gradient-to-br
          from-emerald/[0.09]
          via-emerald/[0.04]
          to-gold/[0.07]
        "
      />

      {/* Soft bottom curve */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          bottom-[-190px] left-1/2
          h-[340px] w-[130%]
          -translate-x-1/2
          rounded-[50%_50%_0_0]
          bg-gradient-to-t
          from-emerald/[0.08]
          via-emerald/[0.03]
          to-transparent
        "
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
          <h2
            className="
              text-balance
              font-serif
              text-[26px] font-medium
              leading-[1.15]
              tracking-[-0.015em]
              text-deep-teal
              sm:text-[32px]
              md:text-[36px]
              lg:text-[42px]
            "
          >
            Free{" "}
            <span className="relative inline-block whitespace-nowrap text-emerald">
              Planning Tools
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

          <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-muted-teal sm:text-[15px]">
            Simple, practical tools to help you prepare, pack and budget
            for your journey with confidence.
          </p>
        </div>

        {/* Tool cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map((tool) => {
            const Icon = tool.icon
            return (
              <Link
                key={tool.title}
                href={tool.href}
                className="
                  group relative flex h-full min-w-0 flex-col
                  rounded-2xl
                  border-[1.5px] border-deep-teal/50
                  bg-white p-5
                  shadow-[0_4px_0_rgba(6,63,58,0.85),0_12px_22px_rgba(6,63,58,0.14)]
                  transition-all duration-200 ease-out
                  hover:-translate-y-0.5
                  hover:border-deep-teal
                  hover:shadow-[0_6px_0_rgba(6,63,58,0.85),0_16px_26px_rgba(6,63,58,0.18)]
                  active:translate-y-[2px]
                  active:shadow-[0_2px_0_rgba(6,63,58,0.85),0_6px_12px_rgba(6,63,58,0.14)]
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald/60 focus-visible:ring-offset-2
                "
              >
                <span
                  className="
                    mb-4 flex h-11 w-11 shrink-0 items-center justify-center
                    rounded-full bg-emerald/10 text-emerald
                    ring-1 ring-emerald/25
                    transition-colors duration-300
                    group-hover:bg-emerald group-hover:text-white
                  "
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>

                <h3 className="font-heading text-[15px] font-semibold leading-[1.35] text-deep-teal">
                  {tool.title}
                </h3>

                <p className="mt-2 text-xs leading-[1.6] text-muted-teal">
                  {tool.description}
                </p>

                <span
                  className="
                    mt-5 flex items-center justify-between gap-2
                    rounded-xl border border-emerald bg-emerald
                    px-3.5 py-2.5
                    text-xs font-semibold text-white
                    transition-colors duration-300
                    group-hover:border-dark-teal group-hover:bg-dark-teal
                  "
                >
                  Open tool
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold text-deep-teal transition-transform duration-200 group-hover:translate-x-0.5">
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}