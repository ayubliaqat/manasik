import {
  ShieldCheck,
  BookOpenCheck,
  ListChecks,
  UserCheck,
  RefreshCcw,
} from "lucide-react";

type Accent = "emerald" | "gold";

type IconProps = { className?: string };

type Badge = {
  icon: (props: IconProps) => React.ReactElement;
  title: string;
  description: string;
  accent: Accent;
};

/* ---------------------------------------------------------------
   Animated icons. Pure SVG + CSS. Main strokes use currentColor
   (the card's accent), highlights use the opposite brand color.
---------------------------------------------------------------- */

function IconBase({
  className,
  children,
}: IconProps & { children: React.ReactNode }) {
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
  );
}

/* Authentic Sources: shield with a check that keeps drawing itself */
function ShieldIcon({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path
        d="M12 3 L19 6 V11.5 C19 16 16 19.5 12 21 C8 19.5 5 16 5 11.5 V6 Z"
        fill="currentColor"
        fillOpacity="0.12"
      />
      <g className="text-gold">
        <path
          className="tb-draw"
          pathLength={1}
          d="M8.8 12.2 L11.1 14.5 L15.4 9.8"
          strokeWidth="2"
        />
      </g>
    </IconBase>
  );
}

/* Qur'an & Sunnah: open book with a twinkling star */
function BookIcon({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path
        d="M12 8 C10 6.6 7 6.2 4 6.8 V18.5 C7 18 10 18.4 12 19.8 C14 18.4 17 18 20 18.5 V6.8 C17 6.2 14 6.6 12 8 Z"
        fill="currentColor"
        fillOpacity="0.12"
      />
      <path d="M12 8 V19.8" />
      <g className="text-emerald">
        <path
          className="tb-twinkle"
          d="M18.5 1.6 L19.1 2.9 L20.4 3.5 L19.1 4.1 L18.5 5.4 L17.9 4.1 L16.6 3.5 L17.9 2.9 Z"
          fill="currentColor"
          strokeWidth="0.6"
        />
      </g>
    </IconBase>
  );
}

/* Practical Guidance: checklist, ticks draw one after another */
function ChecklistIcon({ className }: IconProps) {
  const rows = [
    { y: 7, w: 20, delay: "0s" },
    { y: 12.2, w: 18, delay: "0.5s" },
    { y: 17.4, w: 19, delay: "1s" },
  ];

  return (
    <IconBase className={className}>
      {rows.map(({ y, w, delay }) => (
        <g key={y}>
          <g className="text-gold">
            <path
              className="tb-draw"
              pathLength={1}
              style={{ animationDelay: delay }}
              d={`M4 ${y} L5.4 ${y + 1.4} L7.6 ${y - 1.2}`}
              strokeWidth="1.9"
            />
          </g>
          <path d={`M10.5 ${y} H${w}`} opacity="0.55" />
        </g>
      ))}
    </IconBase>
  );
}

/* Reviewed by Experts: person with a pulsing verified badge */
function ExpertIcon({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <circle cx="10" cy="8" r="3.2" fill="currentColor" fillOpacity="0.12" />
      <path d="M3.8 20 C3.8 15.8 6.5 13.5 10 13.5 C11.4 13.5 12.6 13.8 13.7 14.4" />
      <g className="text-emerald">
        <g className="tb-pop">
          <circle
            cx="17.5"
            cy="16.5"
            r="4"
            fill="currentColor"
            fillOpacity="0.18"
          />
          <path d="M15.6 16.6 L17 18 L19.6 15" strokeWidth="1.8" />
        </g>
      </g>
    </IconBase>
  );
}

/* Clear & Verified: turning arrows around a check */
function VerifiedIcon({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <g className="tb-spin">
        <path d="M4.5 12 A7.5 7.5 0 0 1 17.8 7" />
        <path d="M18 3.2 V7.4 H13.8" />
        <path d="M19.5 12 A7.5 7.5 0 0 1 6.2 17" />
        <path d="M6 20.8 V16.6 H10.2" />
      </g>
      <g className="text-gold">
        <path
          className="tb-draw"
          pathLength={1}
          d="M9.2 12.2 L11.2 14.2 L15 10"
          strokeWidth="2"
        />
      </g>
    </IconBase>
  );
}

const badges: Badge[] = [
  {
    icon: ShieldIcon,
    title: "Authentic Sources",
    description: "Carefully researched from trusted Islamic references",
    accent: "emerald",
  },
  {
    icon: BookIcon,
    title: "Qur'an & Sunnah",
    description: "Guidance based on the Qur'an and authentic Sunnah",
    accent: "gold",
  },
  {
    icon: ChecklistIcon,
    title: "Practical Guidance",
    description: "Clear, step-by-step help for every stage",
    accent: "emerald",
  },
  {
    icon: ExpertIcon,
    title: "Reviewed by Experts",
    description: "Content reviewed for accuracy and clarity",
    accent: "gold",
  },
  {
    icon: VerifiedIcon,
    title: "Clear & Verified",
    description: "Important guidance is carefully checked",
    accent: "emerald",
  },
];

const ACCENT_STYLES: Record<
  Accent,
  { bg: string; icon: string; ring: string }
> = {
  emerald: {
    bg: "bg-emerald/10",
    icon: "text-emerald",
    ring: "group-hover:ring-emerald/25",
  },
  gold: {
    bg: "bg-gold/10",
    icon: "text-gold",
    ring: "group-hover:ring-gold/25",
  },
};

/** Thread length (px) above each card. Lower cards get a longer thread
 *  so every thread ends at the same line on the hero. */
const THREAD_SHORT = 14;
const THREAD_LONG = 34;

const motionCss = `
@keyframes tb-sway {
  0%, 100% { transform: rotate(-1.3deg) translateY(0); }
  50% { transform: rotate(1.3deg) translateY(-4px); }
}
@keyframes tb-draw {
  0% { stroke-dashoffset: 1; }
  18%, 78% { stroke-dashoffset: 0; }
  92%, 100% { stroke-dashoffset: 1; }
}
@keyframes tb-twinkle {
  0%, 100% { transform: scale(0.6); opacity: 0.5; }
  50% { transform: scale(1.15); opacity: 1; }
}
@keyframes tb-spin { to { transform: rotate(360deg); } }
@keyframes tb-pop {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.18); }
}
.tb-sway { animation: tb-sway 6s ease-in-out infinite; }
.tb-sway:hover { animation-play-state: paused; }
.tb-draw { stroke-dasharray: 1; stroke-dashoffset: 0; animation: tb-draw 4.5s ease-in-out infinite; }
.tb-twinkle, .tb-spin, .tb-pop { transform-box: fill-box; transform-origin: center; }
.tb-twinkle { animation: tb-twinkle 2.6s ease-in-out infinite; }
.tb-spin { animation: tb-spin 9s linear infinite; }
.tb-pop { animation: tb-pop 2.8s ease-in-out infinite; }
@media (prefers-reduced-motion: reduce) {
  .tb-sway, .tb-draw, .tb-twinkle, .tb-spin, .tb-pop { animation: none !important; }
}
`;

export function TrustBadges() {
  return (
    <section
      aria-label="Why trust Manasik"
      className="relative z-20 -mt-11 pb-8 sm:-mt-12 sm:pb-10"
    >
      <style>{motionCss}</style>

      {/* White backdrop that starts exactly at the hero's bottom edge */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 top-11 bg-white sm:top-12"
      />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* flex-wrap + justify-center keeps a lone last card centered at every breakpoint.
            items-start lets the lower cards in the zigzag keep their own height. */}
        <div className="flex flex-wrap items-start justify-center gap-3">
          {badges.map(({ icon: Icon, title, description, accent }, index) => {
            const styles = ACCENT_STYLES[accent];
            const isLower = index % 2 === 1;
            const thread = isLower ? THREAD_LONG : THREAD_SHORT;

            return (
              <div
                key={title}
                className={`
                  basis-[calc(50%-0.375rem)]
                  sm:basis-[calc(33.333%-0.5rem)]
                  lg:basis-[calc(20%-0.6rem)]
                  ${isLower ? "pt-5" : ""}
                `}
              >
                {/* Hanging wrapper: sways from the top of its thread */}
                <div
                  className="tb-sway relative"
                  style={{
                    transformOrigin: `50% -${thread}px`,
                    animationDelay: `${-index * 1.1}s`,
                    animationDuration: `${5.4 + (index % 3) * 0.6}s`,
                  }}
                >
                  {/* Thread */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-full left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-gold/50 to-gold/80"
                    style={{ height: thread }}
                  />

                  {/* Pin */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute left-1/2 top-0 z-20 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold shadow-[0_0_6px_rgba(201,162,39,0.7)]"
                  />

                  {/* Card */}
                  <div
                    className={`
                      group relative flex min-h-[92px] flex-col items-center justify-center
                      overflow-hidden rounded-2xl
                      border border-emerald/60
                      bg-card
                      px-2.5 py-2.5
                      text-center

                      shadow-[0_4px_0_rgba(6,63,58,0.10),0_10px_25px_rgba(6,63,58,0.12)]

                      ring-1 ring-emerald/10

                      transition-all duration-300
                      hover:-translate-y-1.5
                      hover:border-emerald
                      hover:shadow-[0_5px_0_rgba(6,63,58,0.14),0_18px_35px_rgba(6,63,58,0.18)]
                      ${styles.ring}
                    `}
                  >
                    {/* Soft green glow */}
                    <div
                      className="
                        pointer-events-none absolute inset-x-0 top-0 h-14
                        bg-gradient-to-b from-emerald/[0.09] to-transparent
                        opacity-80
                      "
                    />

                    {/* Icon */}
                    <div
                      className={`
                        relative z-10
                        flex h-10 w-10 shrink-0 items-center justify-center
                        rounded-full
                        ${styles.bg}
                        ring-1 ring-emerald/15
                        shadow-[0_2px_8px_rgba(6,63,58,0.08)]
                        transition-all duration-300
                        group-hover:scale-110
                        group-hover:shadow-[0_4px_12px_rgba(6,63,58,0.14)]
                      `}
                    >
                      <Icon className={`h-[22px] w-[22px] ${styles.icon}`} />
                    </div>

                    {/* Title */}
                    <p className="relative z-10 mt-2 font-heading text-xs font-semibold leading-tight text-charcoal">
                      {title}
                    </p>

                    {/* Description: hidden visually, still read by screen readers */}
                    <span className="sr-only">{description}</span>

                    {/* Bottom green accent */}
                    <div
                      className="
                        absolute bottom-0 left-1/2 h-[2px] w-0
                        -translate-x-1/2
                        rounded-full
                        bg-emerald
                        opacity-0
                        shadow-[0_0_10px_rgba(6,63,58,0.35)]
                        transition-all duration-300
                        group-hover:w-1/2
                        group-hover:opacity-100
                      "
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}