import {
  ShieldCheck,
  BookOpenCheck,
  ListChecks,
  UserCheck,
  RefreshCcw,
} from "lucide-react";

type Accent = "emerald" | "gold";

type Badge = {
  icon: typeof ShieldCheck;
  title: string;
  description: string;
  accent: Accent;
};

const badges: Badge[] = [
  {
    icon: ShieldCheck,
    title: "Authentic Sources",
    description: "Carefully researched from trusted Islamic references",
    accent: "emerald",
  },
  {
    icon: BookOpenCheck,
    title: "Qur'an & Sunnah",
    description: "Guidance based on the Qur'an and authentic Sunnah",
    accent: "gold",
  },
  {
    icon: ListChecks,
    title: "Practical Guidance",
    description: "Clear, step-by-step help for every stage",
    accent: "emerald",
  },
  {
    icon: UserCheck,
    title: "Reviewed by Experts",
    description: "Content reviewed for accuracy and clarity",
    accent: "gold",
  },
  {
    icon: RefreshCcw,
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

export function TrustBadges() {
  return (
    <section
      aria-labelledby="trust-heading"
      className="bg-white py-6 sm:py-8 lg:py-10"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-6 text-center sm:mb-7 lg:mb-8">
          <h2
            id="trust-heading"
            className="
              text-balance
              font-heading
              text-[26px]
              font-semibold
              leading-[1.15]
              tracking-[-0.015em]
              text-deep-teal
              sm:text-3xl
              lg:text-4xl
            "
          >
            Why{" "}
            <span className="relative inline-block whitespace-nowrap text-emerald">
              Trust Manasik?
              <svg
                aria-hidden="true"
                viewBox="0 0 120 10"
                preserveAspectRatio="none"
                fill="none"
                className="
                  pointer-events-none absolute
                  left-1/2 top-full
                  mt-[0.05em]
                  h-[0.2em] w-[78%]
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
        </div>

        {/* Badges: flex-wrap + justify-center keeps a lone last card centered at every breakpoint */}
        <div className="flex flex-wrap justify-center gap-3 lg:gap-4">
          {badges.map(({ icon: Icon, title, description, accent }) => {
            const styles = ACCENT_STYLES[accent];

            return (
              <div
                key={title}
                className={`
                  group relative flex min-h-[128px] flex-col items-center justify-center
                  basis-[calc(50%-0.375rem)]
                  sm:basis-[calc(33.333%-0.5rem)]
                  lg:basis-[calc(20%-0.8rem)]
                  overflow-hidden rounded-2xl
                  border border-emerald/35
                  bg-card
                  px-3 py-4
                  text-center

                  shadow-[0_4px_0_rgba(6,63,58,0.10),0_10px_25px_rgba(6,63,58,0.10)]

                  ring-1 ring-transparent

                  transition-all duration-300
                  hover:-translate-y-1.5
                  hover:border-emerald/60
                  hover:shadow-[0_5px_0_rgba(6,63,58,0.14),0_18px_35px_rgba(6,63,58,0.16)]
                  ${styles.ring}
                `}
              >
                {/* Soft green glow */}
                <div
                  className="
                    pointer-events-none absolute inset-x-0 top-0 h-20
                    bg-gradient-to-b from-emerald/[0.07] to-transparent
                    opacity-80
                  "
                />

                {/* Icon */}
                <div
                  className={`
                    relative z-10
                    flex h-9 w-9 shrink-0 items-center justify-center
                    rounded-full
                    ${styles.bg}
                    shadow-[0_2px_8px_rgba(6,63,58,0.08)]
                    transition-all duration-300
                    group-hover:scale-110
                    group-hover:shadow-[0_4px_12px_rgba(6,63,58,0.14)]
                  `}
                >
                  <Icon className={`h-4 w-4 ${styles.icon}`} />
                </div>

                {/* Title */}
                <p className="relative z-10 mt-2 font-heading text-xs font-semibold leading-tight text-charcoal">
                  {title}
                </p>

                {/* Description */}
                <p className="relative z-10 mt-1 max-w-[175px] text-[10px] leading-[1.35] text-muted-teal">
                  {description}
                </p>

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
            );
          })}
        </div>
      </div>
    </section>
  );
}