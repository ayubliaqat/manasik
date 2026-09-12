import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  Plane,
  HandHeart,
  Landmark,
} from "lucide-react";

const categories = [
  {
    title: "Hajj Guide",
    description:
      "Complete guidance from preparation and intention to the final rituals.",
    href: "/hajj",
    icon: Landmark,
    label: "Begin Here",
    featured: true,
  },
  {
    title: "Umrah Guide",
    description:
      "Clear, practical guidance to help you perform Umrah with confidence.",
    href: "/umrah",
    icon: Landmark,
    label: "Begin Here",
    featured: true,
  },
  {
    title: "Practical Guidance",
    description:
      "Useful advice for preparation, planning, travel, and every stage between.",
    href: "/guides",
    icon: BookOpen,
    label: "Guidance",
  },
  {
    title: "Duas",
    description:
      "Essential supplications and authentic duas to keep close throughout your journey.",
    href: "/duas",
    icon: HandHeart,
    label: "Supplications",
  },
  {
    title: "Travel & Visa",
    description:
      "Important travel requirements, visa information, and preparation tips.",
    href: "/travel",
    icon: Plane,
    label: "Travel",
  },
];

export default function ExploreJourney() {
  return (
    <section className="relative overflow-hidden bg-deep-teal py-20 sm:py-24 lg:py-28">
      {/* =========================================================
          TOP WAVE
         ========================================================= */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-16 sm:h-20"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          className="h-full w-full"
        >
          <path
            d="
              M0 0
              H1440
              V42
              C1260 82 1140 82 960 46
              C790 12 650 12 480 46
              C300 82 180 82 0 40
              Z
            "
            fill="#FAF8F3"
          />

          <path
            d="
              M0 40
              C180 82 300 82 480 46
              C650 12 790 12 960 46
              C1140 82 1260 82 1440 42
            "
            fill="none"
            stroke="#C9A227"
            strokeWidth="1.5"
            opacity="0.55"
          />
        </svg>
      </div>

      {/* =========================================================
          SOFT BACKGROUND GLOW
         ========================================================= */}
      <div
        className="pointer-events-none absolute -left-32 top-1/4 h-72 w-72 rounded-full bg-emerald/20 blur-[100px]"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute -right-32 bottom-1/4 h-80 w-80 rounded-full bg-gold/10 blur-[110px]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* =========================================================
            HEADING
           ========================================================= */}
        <div className="mx-auto mb-11 max-w-2xl text-center sm:mb-14">
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-gold/70" />

            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/40 bg-white/10 text-gold backdrop-blur-sm">
              <Landmark size={15} strokeWidth={1.5} />
            </span>

            <span className="h-px w-10 bg-gold/70" />
          </div>

          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em] text-gold">
            Explore Manasik
          </p>

          <h2 className="font-heading text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-[46px]">
            Everything you need,
            <span className="relative ml-2 inline-block text-gold">
              one journey at a time.
              <span className="absolute -bottom-2 left-0 h-[2px] w-full rounded-full bg-gold/80" />
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/70 sm:text-[15px]">
            From the first steps of preparation to the moments that matter
            most, explore guidance designed to bring{" "}
            <span className="font-semibold text-white">
              clarity, confidence, and peace
            </span>{" "}
            to your pilgrimage.
          </p>
        </div>

        {/* =========================================================
            CATEGORY GRID
           ========================================================= */}
        <div className="mx-auto max-w-6xl">
          {/* First row */}
          <div className="grid gap-5 md:grid-cols-2">
            {categories.slice(0, 2).map((category, index) => {
              const Icon = category.icon;

              return (
                <CategoryCard
                  key={category.title}
                  category={category}
                  Icon={Icon}
                  featured
                  stagger={index === 1}
                />
              );
            })}
          </div>

          {/* Second row */}
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.slice(2).map((category, index) => {
              const Icon = category.icon;

              return (
                <CategoryCard
                  key={category.title}
                  category={category}
                  Icon={Icon}
                  stagger={index === 1}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* =========================================================
          BOTTOM WAVE
          This stays entirely inside this section.
         ========================================================= */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-14 sm:h-18"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          className="h-full w-full"
        >
          <path
            d="
              M0 100
              H1440
              V60
              C1260 20 1140 20 960 55
              C790 88 650 88 480 55
              C300 20 180 20 0 58
              Z
            "
            fill="#FAF8F3"
          />

          <path
            d="
              M0 58
              C180 20 300 20 480 55
              C650 88 790 88 960 55
              C1140 20 1260 20 1440 60
            "
            fill="none"
            stroke="#C9A227"
            strokeWidth="1.5"
            opacity="0.45"
          />
        </svg>
      </div>
    </section>
  );
}

function CategoryCard({
  category,
  Icon,
  featured = false,
  stagger = false,
}: {
  category: (typeof categories)[number];
  Icon: typeof Landmark;
  featured?: boolean;
  stagger?: boolean;
}) {
  return (
    <Link
      href={category.href}
      className={[
        "group relative flex overflow-hidden rounded-2xl",
        "border border-white/10 bg-white",
        "p-5 sm:p-6",
        "shadow-[0_12px_35px_rgba(0,0,0,0.16)]",
        "transition-all duration-300",
        "hover:-translate-y-1.5",
        "hover:border-gold/50",
        "hover:shadow-[0_22px_45px_rgba(0,0,0,0.24)]",
        "focus:outline-none focus:ring-2 focus:ring-gold/70",
        "focus:ring-offset-2 focus:ring-offset-deep-teal",
        featured ? "min-h-[225px]" : "min-h-[205px]",
        stagger ? "lg:translate-y-4" : "",
      ].join(" ")}
    >
      {/* Soft emerald glow */}
      <span
        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-emerald/[0.055] blur-3xl transition-transform duration-500 group-hover:scale-125"
        aria-hidden="true"
      />

      {/* Gold corner detail */}
      <span
        className="pointer-events-none absolute right-0 top-0 h-16 w-16 rounded-bl-[42px] border-b border-l border-gold/20 transition-all duration-300 group-hover:h-20 group-hover:w-20 group-hover:border-gold/45"
        aria-hidden="true"
      />

      <div className="relative flex w-full flex-col">
        {/* Icon row */}
        <div className="flex items-start justify-between">
          <div
            className={[
              "relative flex items-center justify-center rounded-xl",
              "border border-gold/30 bg-deep-teal text-gold",
              "shadow-[0_6px_15px_rgba(6,63,58,0.20)]",
              "transition-all duration-300",
              "group-hover:scale-105 group-hover:bg-emerald",
              featured ? "h-12 w-12" : "h-11 w-11",
            ].join(" ")}
          >
            <Icon
              size={featured ? 22 : 20}
              strokeWidth={1.5}
            />

            <span
              className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-gold"
              aria-hidden="true"
            />
          </div>

          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-soft-beige text-emerald transition-all duration-300 group-hover:border-gold/50 group-hover:bg-warm-white">
            <ArrowUpRight
              size={15}
              strokeWidth={1.6}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
        </div>

        {/* Content */}
        <div className="mt-auto pt-6">
          <p className="mb-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-gold">
            {category.label}
          </p>

          <h3
            className={[
              "font-heading font-bold leading-tight text-deep-teal",
              "transition-colors duration-300 group-hover:text-emerald",
              featured ? "text-2xl" : "text-xl",
            ].join(" ")}
          >
            {category.title}
          </h3>

          <p className="mt-2 max-w-md text-[13px] leading-5.5 text-muted-teal">
            {category.description}
          </p>

          <div className="mt-4 flex items-center gap-2 text-[11px] font-semibold text-emerald">
            Explore

            <span className="h-px w-6 bg-gold transition-all duration-300 group-hover:w-10" />

            <ArrowUpRight
              size={12}
              className="opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
