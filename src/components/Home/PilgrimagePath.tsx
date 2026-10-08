type IconProps = {
  className?: string;
  strokeWidth?: number;
};

function IconBase({
  className,
  strokeWidth = 1.6,
  children,
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {children}
    </svg>
  );
}

/* Prepare: suitcase with straps */
function SuitcaseIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="4" y="8" width="16" height="12" rx="2.2" />
      <path d="M9 8V6.2A1.2 1.2 0 0 1 10.2 5h3.6A1.2 1.2 0 0 1 15 6.2V8" />
      <path d="M9 8v12" />
      <path d="M15 8v12" />
      <path d="M4 13.5h16" />
    </IconBase>
  );
}

/* Learn: open Quran on a folding stand (rehal) */
function QuranStandIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 7C10 5.8 7 5.5 4.5 6v9c2.5-.5 5.5-.2 7.5 1 2-1.2 5-1.5 7.5-1V6C17 5.5 14 5.8 12 7Z" />
      <path d="M12 7v9" />
      <path d="M8 21l4-5 4 5" />
    </IconBase>
  );
}

/* Plan: passport with a globe */
function PassportIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="5" y="3" width="14" height="18" rx="2.2" />
      <circle cx="12" cy="10" r="3.2" />
      <ellipse cx="12" cy="10" rx="1.4" ry="3.2" />
      <path d="M8.8 10h6.4" />
      <path d="M8.5 17h7" />
    </IconBase>
  );
}

/* Travel: airplane */
function AirplaneIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
    </IconBase>
  );
}

/* Worship: the Kaaba (cube with band and door) */
function KaabaIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 3l8 4-8 4-8-4 8-4Z" />
      <path d="M4 7v9.5L12 21V11" />
      <path d="M20 7v9.5L12 21" />
      <path d="M4 10.5l8 4 8-4" />
      <path d="M15.5 15v3.8" />
    </IconBase>
  );
}

const journeySteps = [
  {
    title: "Prepare",
    description: "Begin with the right foundation.",
    icon: SuitcaseIcon,
    accent: "emerald",
  },
  {
    title: "Learn",
    description: "Understand the essential rituals.",
    icon: QuranStandIcon,
    accent: "gold",
  },
  {
    title: "Plan",
    description: "Organise the practical details.",
    icon: PassportIcon,
    accent: "emerald",
  },
  {
    title: "Travel",
    description: "Know what to expect along the way.",
    icon: AirplaneIcon,
    accent: "gold",
  },
  {
    title: "Worship",
    description: "Journey with clarity and purpose.",
    icon: KaabaIcon,
    accent: "emerald",
  },
];

/**
 * Seconds into the 7s loop when the moving glow reaches each step.
 * Desktop: the comet follows the rope. Mobile: the dot slides down.
 */
const desktopDelays = [0.45, 1.98, 3.5, 5.02, 6.55];
const mobileDelays = [0, 1.75, 3.5, 5.25, 6.6];

const motionCss = `
@keyframes journey-comet {
  from { stroke-dashoffset: 0.07; }
  to { stroke-dashoffset: -1; }
}
@keyframes journey-drop {
  0% { top: 0%; opacity: 0; }
  6% { opacity: 1; }
  94% { opacity: 1; }
  100% { top: 100%; opacity: 0; }
}
@keyframes journey-ring {
  0% { transform: scale(1); opacity: 0.55; }
  14% { transform: scale(1.8); opacity: 0; }
  100% { transform: scale(1.8); opacity: 0; }
}
@keyframes journey-pop {
  0% { transform: scale(1); }
  7% { transform: scale(1.13); }
  16% { transform: scale(1); }
  100% { transform: scale(1); }
}
.journey-comet { animation: journey-comet 7s linear infinite; }
.journey-drop { animation: journey-drop 7s linear infinite; }
.journey-ring { animation: journey-ring 7s ease-out infinite; }
.journey-pop { animation: journey-pop 7s ease-in-out infinite; }
`;

export default function PilgrimagePath() {
  return (
    <section className="relative overflow-hidden border-y border-emerald/15 bg-white py-10 sm:py-12 lg:py-14">
      <style>{motionCss}</style>

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

              {/* Moving glow: travels from Step 1 to Step 5 */}
              <path
                className="journey-comet motion-reduce:hidden"
                d="
                  M0 60
                  C70 60 80 24 160 24
                  C240 24 250 96 330 96
                  C410 96 420 24 500 24
                  C580 24 590 96 670 96
                  C750 96 760 24 840 24
                  C920 24 930 60 1000 60
                "
                pathLength={1}
                fill="none"
                stroke="#E8C65A"
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray="0.07 2"
                style={{
                  filter: "drop-shadow(0 0 5px rgba(201,162,39,0.9))",
                }}
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
                      "journey-pop motion-reduce:animate-none",
                      "relative z-20 flex h-[58px] w-[58px] items-center justify-center rounded-full",
                      "border-[3px] border-[#FAF8F3]",
                      "shadow-[0_6px_20px_rgba(6,63,58,0.15)]",
                      "transition-transform duration-300 hover:scale-105",
                      isGold
                        ? "bg-gold text-white"
                        : "bg-emerald text-white",
                    ].join(" ")}
                    style={{ animationDelay: `${desktopDelays[index]}s` }}
                  >
                    {/* Pulse ring */}
                    <span
                      aria-hidden="true"
                      className={[
                        "journey-ring motion-reduce:hidden",
                        "pointer-events-none absolute inset-0 rounded-full border-2 opacity-0",
                        isGold ? "border-gold" : "border-emerald",
                      ].join(" ")}
                      style={{ animationDelay: `${desktopDelays[index]}s` }}
                    />

                    <Icon
                      className="h-[26px] w-[26px]"
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

            {/* Moving glow: slides from Step 1 to Step 5 */}
            <span className="journey-drop motion-reduce:hidden absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold opacity-0 shadow-[0_0_10px_3px_rgba(201,162,39,0.7)]" />
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
                      "journey-pop motion-reduce:animate-none",
                      "relative z-10 flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-full",
                      "border-[3px] border-[#FAF8F3]",
                      "shadow-[0_5px_18px_rgba(6,63,58,0.15)]",
                      isGold
                        ? "bg-gold text-white"
                        : "bg-emerald text-white",
                    ].join(" ")}
                    style={{ animationDelay: `${mobileDelays[index]}s` }}
                  >
                    {/* Pulse ring */}
                    <span
                      aria-hidden="true"
                      className={[
                        "journey-ring motion-reduce:hidden",
                        "pointer-events-none absolute inset-0 rounded-full border-2 opacity-0",
                        isGold ? "border-gold" : "border-emerald",
                      ].join(" ")}
                      style={{ animationDelay: `${mobileDelays[index]}s` }}
                    />

                    <Icon
                      className="h-[25px] w-[25px]"
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