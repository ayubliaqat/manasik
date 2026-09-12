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
    ring: "group-hover:ring-emerald/20",
  },
  gold: {
    bg: "bg-gold/10",
    icon: "text-gold",
    ring: "group-hover:ring-gold/20",
  },
};

export function TrustBadges() {
  return (
    <section className="bg-warm-white py-4 sm:py-6 lg:py-8">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 px-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4">
        {badges.map(({ icon: Icon, title, description, accent }) => {
          const styles = ACCENT_STYLES[accent];

          return (
            <div
              key={title}
              className={`group flex min-h-[128px] flex-col items-center justify-center
                rounded-2xl
                border border-soft-beige
                bg-card
                px-3 py-4
                text-center
                shadow-[0_5px_0_rgba(6,63,58,0.08),0_12px_28px_rgba(6,63,58,0.10)]
                ring-1 ring-transparent
                transition-all duration-300
                hover:-translate-y-1.5
                hover:shadow-[0_6px_0_rgba(6,63,58,0.10),0_18px_36px_rgba(6,63,58,0.15)]
                ${styles.ring}`}
            >
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center
                  rounded-full
                  ${styles.bg}
                  shadow-[0_2px_6px_rgba(0,0,0,0.05)]
                  transition-transform duration-300
                  group-hover:scale-110`}
              >
                <Icon className={`h-4 w-4 ${styles.icon}`} />
              </div>

              <p className="mt-2 font-heading text-xs font-semibold leading-tight text-charcoal">
                {title}
              </p>

              <p className="mt-1 max-w-[175px] text-[10px] leading-[1.35] text-muted-teal">
                {description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
