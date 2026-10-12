function Squiggle({ className }: { className: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 120 10"
      preserveAspectRatio="none"
      fill="none"
      className={`pointer-events-none absolute left-1/2 top-full -translate-x-1/2 text-gold ${className}`}
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
}: {
  title: string
  highlight: string
  description: string
}) {
  return (
    <section className="relative overflow-hidden bg-deep-teal pb-14 pt-10 sm:pb-16 sm:pt-12">
      <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h1 className="font-heading text-2xl font-medium text-white sm:text-3xl lg:text-4xl">
          {title}{" "}
          <span className="relative inline-block text-[#2BB589]">
            {highlight}
            <Squiggle className="mt-[0.05em] h-[0.18em] w-[70%]" />
          </span>
        </h1>

        <p className="mx-auto mt-3 max-w-xl text-sm font-normal leading-6 text-white/70 sm:text-base">
          {description}
        </p>
      </div>

      {/* Wavy bottom */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="pointer-events-none absolute bottom-[-1px] left-0 z-10 block h-[28px] w-full text-warm-white sm:h-[40px] lg:h-[52px]"
      >
        <path
          fill="currentColor"
          d="M0 40 C120 80 240 80 360 50 C480 20 600 20 720 45 C840 70 960 70 1080 45 C1200 20 1320 20 1440 50 L1440 80 L0 80 Z"
        />
      </svg>
    </section>
  )
}