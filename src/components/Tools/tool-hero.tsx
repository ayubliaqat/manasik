function Squiggle({ className }: { className: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 120 10"
      preserveAspectRatio="none"
      fill="none"
      className={`pointer-events-none absolute left-1/2 top-full -translate-x-1/2 ${className}`}
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
  )
}

export default function ToolHero({
  title,
  highlight,
  description,
  badge,
}: {
  title: string
  highlight: string
  description: string
  badge?: string
}) {
  return (
    <section className="relative overflow-hidden bg-deep-teal pb-14 pt-9 text-center sm:pb-16 sm:pt-11 lg:pb-20 lg:pt-12">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-220px] h-[430px] w-[140%] -translate-x-1/2 rounded-[0_0_50%_50%] bg-white/[0.04]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-240px] left-1/2 h-[400px] w-[130%] -translate-x-1/2 rounded-[50%_50%_0_0] bg-gold/[0.06]"
      />

      <div className="relative z-10 mx-auto w-full max-w-4xl px-5 sm:px-8 lg:px-10 xl:px-12">
        {badge && (
          <span className="inline-block rounded-full border border-gold/50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-gold-light">
            {badge}
          </span>
        )}

        <h1
          className={`${
            badge ? "mt-4 " : ""
          }text-balance font-heading text-[32px] font-bold leading-[1.15] tracking-[-0.02em] sm:text-[40px] lg:text-[48px]`}
        >
          <span className="text-gold-light">{title}</span>{" "}
          <span className="relative inline-block whitespace-nowrap text-white">
            {highlight}
            <Squiggle className="mt-[0.05em] h-[0.2em] w-[70%] text-white" />
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-relaxed text-white/80 sm:text-base">
          {description}
        </p>
      </div>

      {/* Wavy bottom */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="pointer-events-none absolute bottom-0 left-0 h-[32px] w-full text-warm-white sm:h-[48px] lg:h-[64px]"
      >
        <path
          fill="currentColor"
          d="M0 40 C120 80 240 80 360 50 C480 20 600 20 720 45 C840 70 960 70 1080 45 C1200 20 1320 20 1440 50 L1440 80 L0 80 Z"
        />
      </svg>
    </section>
  )
}