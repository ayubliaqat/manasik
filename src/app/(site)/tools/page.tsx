import type { Metadata } from "next"
import ToolsTabs from "@/components/Tools/ToolsTabs"

export const metadata: Metadata = {
  title: "Free Hajj and Umrah Planning Tools | Manasik",
  description:
    "Free Hajj checklist, Umrah packing list, cost estimator and zakat calculator to help you prepare for your journey.",
}

export default async function ToolsPage({
  searchParams,
}: {
  searchParams: Promise<{ tool?: string }>
}) {
  const { tool } = await searchParams

  return (
    <main className="w-full overflow-x-hidden">
      {/* Hero */}
      <section className="relative overflow-hidden bg-deep-teal pb-14 pt-9 text-center sm:pb-16 sm:pt-11 lg:pb-20 lg:pt-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[-220px] h-[430px] w-[140%] -translate-x-1/2 rounded-[0_0_50%_50%] bg-white/[0.04]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[-240px] left-1/2 h-[400px] w-[130%] -translate-x-1/2 rounded-[50%_50%_0_0] bg-gold/[0.06]"
        />

        <div className="relative z-10 mx-auto w-full max-w-2xl px-4 sm:px-6 lg:px-8">
          <span className="inline-block rounded-full border border-gold/50 px-3 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-gold">
            Free tools
          </span>

          <h1
            className="
              mt-3 text-balance
              font-serif
              text-[24px] font-medium
              leading-[1.15] tracking-[-0.015em]
              text-white
              sm:text-[30px]
              lg:text-[34px]
            "
          >
            Plan Your Journey with{" "}
            <span className="relative inline-block text-[#2BB589]">
              Confidence
              <svg
                aria-hidden="true"
                viewBox="0 0 120 10"
                preserveAspectRatio="none"
                fill="none"
                className="pointer-events-none absolute left-1/2 top-full mt-[0.05em] h-[0.18em] w-[70%] -translate-x-1/2 text-gold"
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
          </h1>

          <p className="mx-auto mt-4 max-w-lg text-[13px] leading-6 text-white/75 sm:text-sm">
            Tick off your checklist, pack smart, budget your trip and
            calculate your zakat, all in one place.
          </p>
        </div>

        {/* Wavy bottom */}
        <svg
          aria-hidden="true"
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="pointer-events-none absolute bottom-[-1px] left-0 z-10 block h-[36px] w-full text-white sm:h-[48px] lg:h-[64px]"
        >
          <path
            fill="currentColor"
            d="M0 40 C120 80 240 80 360 50 C480 20 600 20 720 45 C840 70 960 70 1080 45 C1200 20 1320 20 1440 50 L1440 80 L0 80 Z"
          />
        </svg>
      </section>

      {/* Planning Tools */}
      <section className="w-full min-w-0 overflow-hidden">
        <ToolsTabs initialTool={tool} />
      </section>
    </main>
  )
}