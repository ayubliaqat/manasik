import Link from "next/link"
import { Briefcase, Calculator, ClipboardCheck, Coins } from "lucide-react"

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
        py-10 sm:py-12 lg:py-14
      "
    >
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
        {/* Heading: the soft top curve is anchored to this block so the
            h2 and description always sit inside it */}
        <div className="relative mb-5 pb-6 sm:mb-6 sm:pb-8">
          {/* Soft top curve */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none absolute
              bottom-0 left-1/2 -z-10
              h-[340px] w-[200vw] sm:w-[150vw] lg:w-[130vw]
              -translate-x-1/2
              rounded-[0_0_50%_50%]
              bg-gradient-to-br
              from-emerald/[0.09]
              via-emerald/[0.04]
              to-gold/[0.07]
            "
          />

          <div className="mx-auto max-w-2xl text-center">
            <h2
              className="
                text-balance
                font-serif
                text-[24px] font-medium
                leading-[1.15]
                tracking-[-0.015em]
                text-deep-teal
                sm:text-[28px]
                md:text-[32px]
                lg:text-[38px]
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

            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-muted-teal sm:text-[15px]">
              Simple, practical tools to help you prepare, pack and budget
              for your journey with confidence.
            </p>
          </div>
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
                  bg-white p-4 sm:p-5
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
                    mb-3 flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center
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

                <p className="mb-4 mt-1.5 text-xs leading-[1.6] text-muted-teal">
                  {tool.description}
                </p>

                {/* Button: pinned to the card bottom so all four line up */}
                <span
                  className="
                    mt-auto block
                    rounded-xl border border-emerald bg-emerald
                    px-4 py-2
                    text-center text-xs font-semibold tracking-wide text-white
                    shadow-[0_3px_0_rgba(6,63,58,0.85)]
                    transition-all duration-200
                    group-hover:border-dark-teal group-hover:bg-dark-teal
                    group-active:translate-y-[2px] group-active:shadow-[0_1px_0_rgba(6,63,58,0.85)]
                  "
                >
                  Open tool
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}