import {
  Backpack,
  BookOpenCheck,
  ClipboardList,
  HeartHandshake,
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
    icon: ClipboardList,
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
    <section className="relative overflow-hidden border-y border-emerald/15 bg-white py-10 sm:py-12 lg:py-14">
      {/* =========================================================
          BACKGROUND
         ========================================================= */}

      {/* Bottom curved area */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-190px] left-1/2 h-[330px] w-[125%] -translate-x-1/2 rounded-[50%_50%_0_0] bg-gradient-to-t from-emerald/[0.06] via-emerald/[0.02] to-transparent"
      />

      {/* Subtle decorative circles */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-28 top-[38%] h-56 w-56 rounded-full border border-emerald/[0.06]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 top-[25%] h-64 w-64 rounded-full border border-gold/[0.07]"
      />

      {/* =========================================================
          CONTENT
         ========================================================= */}

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* =======================================================
            HEADING
            The top curve is anchored to this block so the h2 and
            description always sit inside it.
           ======================================================= */}

        <div className="relative mx-auto max-w-2xl pb-6 text-center sm:pb-8">
          {/* Top curved area */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-1/2 -z-10 h-[350px] w-[220vw] -translate-x-1/2 rounded-[0_0_50%_50%] bg-gradient-to-br from-emerald/[0.08] via-emerald/[0.035] to-gold/[0.07] sm:w-[160vw] lg:w-[125vw]"
          />

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
            Your journey,{" "}
            <span className="relative inline-block whitespace-nowrap text-emerald">
              step by step.
              {/* Gold hand-drawn underline */}
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
            From preparation to worship, follow a clear path designed to help
            you understand what comes next.
          </p>
        </div>

        {/* =======================================================
            DESKTOP JOURNEY
           ======================================================= */}

        <div className="relative mx-auto mt-4 hidden max-w-6xl lg:block">
          {/* Rope */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-[4%] top-1/2 h-[88px] -translate-y-1/2"
          >
            <svg
              viewBox="0 0 1000 120"
              preserveAspectRatio="none"
              className="h-full w-full overflow-visible"
            >
              {/* Rope shadow */}
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
                opacity="0.07"
              />

              {/* Gold rope */}
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
                  className="relative flex h-[245px] items-center justify-center"
                >
                  {/* Step text */}
                  <div
                    className={[
                      "absolute left-1/2 w-[175px] -translate-x-1/2 text-center",
                      isAbove
                        ? "bottom-[calc(50%+37px)]"
                        : "top-[calc(50%+37px)]",
                    ].join(" ")}
                  >
                    <p
                      className={[
                        "mb-1 text-[9px] font-bold uppercase tracking-[0.22em]",
                        isGold ? "text-gold" : "text-emerald",
                      ].join(" ")}
                    >
                      Step {index + 1}
                    </p>

                    <h3 className="font-heading text-[17px] font-semibold leading-tight text-deep-teal">
                      {step.title}
                    </h3>

                    <p className="mt-1.5 text-[11px] leading-[1.45] text-muted-teal">
                      {step.description}
                    </p>
                  </div>

                  {/* Connector */}
                  <span
                    aria-hidden="true"
                    className={[
                      "absolute left-1/2 w-px -translate-x-1/2",
                      isAbove
                        ? "bottom-1/2 h-[32px]"
                        : "top-1/2 h-[32px]",
                      isGold ? "bg-gold/45" : "bg-emerald/40",
                    ].join(" ")}
                  />

                  {/* Icon */}
                  <div
                    className={[
                      "relative z-20 flex h-[58px] w-[58px] items-center justify-center rounded-full",
                      "border-[3px] border-[#FAF8F3]",
                      "shadow-[0_6px_20px_rgba(6,63,58,0.15)]",
                      "transition-transform duration-300 hover:scale-105",
                      isGold
                        ? "bg-gold text-white"
                        : "bg-emerald text-white",
                    ].join(" ")}
                  >
                    <Icon
                      className="h-[23px] w-[23px]"
                      strokeWidth={1.6}
                    />

                    {/* Small accent dot */}
                    <span
                      aria-hidden="true"
                      className={[
                        "absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-[#FAF8F3]",
                        isGold ? "bg-emerald" : "bg-gold",
                      ].join(" ")}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* =======================================================
            MOBILE JOURNEY
           ======================================================= */}

        <div className="relative mt-5 lg:hidden">
          {/* Vertical rope */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-7 left-[28px] top-7 w-[2px]"
          >
            <div className="h-full rounded-full bg-gradient-to-b from-gold via-emerald to-gold" />
            <div className="absolute inset-0 bg-gold/20 blur-sm" />
          </div>

          <div className="space-y-4">
            {journeySteps.map((step, index) => {
              const Icon = step.icon;
              const isGold = step.accent === "gold";

              return (
                <div
                  key={step.title}
                  className="relative flex items-center gap-4"
                >
                  {/* Icon */}
                  <div
                    className={[
                      "relative z-10 flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-full",
                      "border-[3px] border-[#FAF8F3]",
                      "shadow-[0_5px_18px_rgba(6,63,58,0.15)]",
                      isGold
                        ? "bg-gold text-white"
                        : "bg-emerald text-white",
                    ].join(" ")}
                  >
                    <Icon
                      className="h-[22px] w-[22px]"
                      strokeWidth={1.6}
                    />

                    <span
                      aria-hidden="true"
                      className={[
                        "absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-[#FAF8F3]",
                        isGold ? "bg-emerald" : "bg-gold",
                      ].join(" ")}
                    />
                  </div>

                  {/* Text */}
                  <div className="min-w-0 flex-1 rounded-xl border border-deep-teal/[0.07] bg-white/65 px-4 py-2.5 shadow-[0_4px_15px_rgba(6,63,58,0.04)] backdrop-blur-sm">
                    <p
                      className={[
                        "text-[9px] font-bold uppercase tracking-[0.2em]",
                        isGold ? "text-gold" : "text-emerald",
                      ].join(" ")}
                    >
                      Step {index + 1}
                    </p>

                    <h3 className="mt-0.5 font-heading text-base font-semibold leading-tight text-deep-teal">
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

        {/* =======================================================
            BOTTOM MESSAGE
           ======================================================= */}

        <div className="mt-5 flex justify-center sm:mt-6">
          <div className="flex items-center gap-2 text-center text-[11px] font-medium text-muted-teal">
          
          </div>
        </div>
      </div>
    </section>
  );
}