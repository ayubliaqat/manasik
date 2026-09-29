import {
  Backpack,
  BookOpenCheck,
  HeartHandshake,
  MapPinned,
  Sparkles,
} from "lucide-react";

const journeySteps = [
  {
    title: "Prepare",
    description: "Begin with the right foundation.",
    icon: Backpack,
    accent: "emerald",
  },
  {
    title: "Learn",
    description: "Understand the essential rituals.",
    icon: BookOpenCheck,
    accent: "gold",
  },
  {
    title: "Plan",
    description: "Organise the practical details.",
    icon: MapPinned,
    accent: "emerald",
  },
  {
    title: "Travel",
    description: "Know what to expect along the way.",
    icon: HeartHandshake,
    accent: "gold",
  },
  {
    title: "Worship",
    description: "Journey with clarity and purpose.",
    icon: Sparkles,
    accent: "emerald",
  },
];

export default function PilgrimagePath() {
  return (
    <section className="relative overflow-hidden bg-gray-200 py-14 sm:py-16 lg:py-20">
      {/* =========================================================
          BACKGROUND DECORATION
         ========================================================= */}

      <div
        className="pointer-events-none absolute -left-40 top-10 h-80 w-80 rounded-full bg-emerald/[0.07] blur-[100px]"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-gold/[0.08] blur-[110px]"
        aria-hidden="true"
      />

      {/* Organic corner curves */}
      <div
        className="pointer-events-none absolute -left-16 top-1/3 h-40 w-40 rounded-full border border-emerald/[0.08]"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute -right-20 top-1/4 h-52 w-52 rounded-full border border-gold/[0.10]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* =========================================================
            HEADING
           ========================================================= */}

        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-9 bg-gold/70" />

            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/35 bg-white/60 text-gold shadow-sm">
              <MapPinned
                className="h-[15px] w-[15px]"
                strokeWidth={1.7}
              />
            </span>

            <span className="h-px w-9 bg-gold/70" />
          </div>

          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.24em] text-gold">
            The Pilgrimage Path
          </p>

          <h2 className="font-heading text-3xl font-bold leading-[1.12] tracking-tight text-deep-teal sm:text-4xl lg:text-[42px]">
            Your journey,
            <span className="ml-2 text-emerald">step by step.</span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-muted-teal sm:text-[15px]">
            From preparation to worship, follow a clear path designed to help
            you understand what comes next.
          </p>
        </div>

        {/* =========================================================
            DESKTOP JOURNEY
         ========================================================= */}

        <div className="relative mx-auto mt-12 hidden max-w-6xl lg:block">
          {/* Rope */}
          <div
            className="pointer-events-none absolute inset-x-[4%] top-1/2 h-[110px] -translate-y-1/2"
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 1000 120"
              preserveAspectRatio="none"
              className="h-full w-full overflow-visible"
            >
              {/* Soft rope shadow */}
              <path
                d="
                  M0 60
                  C70 60 80 24 160 24
                  C240 24 250 96 330 96
                  C410 96 420 24 500 24
                  C580 24 590 96 670 96
                  C750 96 760 24 840 24
                  C920 24 930 60 1000 60
                "
                fill="none"
                stroke="#063F3A"
                strokeWidth="8"
                strokeLinecap="round"
                opacity="0.08"
              />

              {/* Main rope */}
              <path
                d="
                  M0 60
                  C70 60 80 24 160 24
                  C240 24 250 96 330 96
                  C410 96 420 24 500 24
                  C580 24 590 96 670 96
                  C750 96 760 24 840 24
                  C920 24 930 60 1000 60
                "
                fill="none"
                stroke="#C9A227"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="2 8"
              />

              {/* Emerald thread */}
              <path
                d="
                  M0 60
                  C70 60 80 24 160 24
                  C240 24 250 96 330 96
                  C410 96 420 24 500 24
                  C580 24 590 96 670 96
                  C750 96 760 24 840 24
                  C920 24 930 60 1000 60
                "
                fill="none"
                stroke="#2B6861"
                strokeWidth="1"
                strokeLinecap="round"
                opacity="0.65"
              />
            </svg>
          </div>

          {/* Journey items */}
          <div className="relative grid grid-cols-5">
            {journeySteps.map((step, index) => {
              const Icon = step.icon;
              const isGold = step.accent === "gold";
              const isAbove = index % 2 === 0;

              return (
                <div
                  key={step.title}
                  className="relative flex h-[300px] items-center justify-center"
                >
                  {/* Content */}
                  <div
                    className={[
                      "absolute left-1/2 w-[175px] -translate-x-1/2 text-center",
                      isAbove ? "bottom-[calc(50%+48px)]" : "top-[calc(50%+48px)]",
                    ].join(" ")}
                  >
                    <p
                      className={[
                        "mb-1 text-[9px] font-bold uppercase tracking-[0.22em]",
                        isGold ? "text-gold" : "text-emerald",
                      ].join(" ")}
                    >
                      {isAbove ? "Begin" : "Continue"}
                    </p>

                    <h3 className="font-heading text-[19px] font-bold leading-tight text-deep-teal">
                      {step.title}
                    </h3>

                    <p className="mt-1.5 text-[11px] leading-[1.5] text-muted-teal">
                      {step.description}
                    </p>
                  </div>

                  {/* Connector */}
                  <span
                    className={[
                      "absolute left-1/2 w-px -translate-x-1/2",
                      isAbove
                        ? "bottom-1/2 h-[43px]"
                        : "top-1/2 h-[43px]",
                      isGold ? "bg-gold/45" : "bg-emerald/40",
                    ].join(" ")}
                    aria-hidden="true"
                  />

                  {/* Icon directly ON the rope */}
                  <div
                    className={[
                      "relative z-20 flex h-[62px] w-[62px] items-center justify-center rounded-full",
                      "border-[3px] border-[#FAF8F3]",
                      "shadow-[0_6px_20px_rgba(6,63,58,0.16)]",
                      "transition-all duration-300 hover:scale-110",
                      isGold
                        ? "bg-gold text-white"
                        : "bg-emerald text-white",
                    ].join(" ")}
                  >
                    <Icon
                      className="h-[24px] w-[24px]"
                      strokeWidth={1.6}
                    />

                    {/* Small decorative dot */}
                    <span
                      className={[
                        "absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-[#FAF8F3]",
                        isGold ? "bg-emerald" : "bg-gold",
                      ].join(" ")}
                      aria-hidden="true"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* =========================================================
            MOBILE JOURNEY
         ========================================================= */}

        <div className="relative mt-10 lg:hidden">
          {/* Vertical rope */}
          <div
            className="pointer-events-none absolute bottom-8 left-[31px] top-8 w-[2px]"
            aria-hidden="true"
          >
            <div className="h-full rounded-full bg-gradient-to-b from-gold via-emerald to-gold" />

            <div className="absolute inset-0 bg-gold/20 blur-sm" />
          </div>

          <div className="space-y-7">
            {journeySteps.map((step) => {
              const Icon = step.icon;
              const isGold = step.accent === "gold";

              return (
                <div
                  key={step.title}
                  className="relative flex items-center gap-5"
                >
                  {/* Icon on rope */}
                  <div
                    className={[
                      "relative z-10 flex h-[62px] w-[62px] shrink-0 items-center justify-center rounded-full",
                      "border-[3px] border-[#FAF8F3]",
                      "shadow-[0_5px_18px_rgba(6,63,58,0.15)]",
                      isGold
                        ? "bg-gold text-white"
                        : "bg-emerald text-white",
                    ].join(" ")}
                  >
                    <Icon
                      className="h-[23px] w-[23px]"
                      strokeWidth={1.6}
                    />

                    <span
                      className={[
                        "absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-[#FAF8F3]",
                        isGold ? "bg-emerald" : "bg-gold",
                      ].join(" ")}
                      aria-hidden="true"
                    />
                  </div>

                  {/* Text */}
                  <div className="rounded-xl border border-deep-teal/[0.07] bg-white/55 px-4 py-3 shadow-[0_4px_15px_rgba(6,63,58,0.04)] backdrop-blur-sm">
                    <p
                      className={[
                        "text-[9px] font-bold uppercase tracking-[0.2em]",
                        isGold ? "text-gold" : "text-emerald",
                      ].join(" ")}
                    >
                      The journey
                    </p>

                    <h3 className="mt-0.5 font-heading text-lg font-bold text-deep-teal">
                      {step.title}
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-muted-teal">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* =========================================================
            BOTTOM MESSAGE
         ========================================================= */}

        <div className="mt-10 flex justify-center sm:mt-12">
          <div className="flex items-center gap-2 text-center text-[11px] font-medium text-muted-teal">
            <span className="h-px w-6 bg-gold/50" />
            <span>One journey. Five meaningful steps.</span>
            <span className="h-px w-6 bg-gold/50" />
          </div>
        </div>
      </div>
    </section>
  );
}
