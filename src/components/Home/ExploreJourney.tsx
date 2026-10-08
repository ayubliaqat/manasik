import Link from "next/link";
import type { ComponentType } from "react";
import {
  ArrowUpRight,
  BookOpen,
  Compass,
  HandHeart,
  Landmark,
  Plane,
  type LucideIcon,
} from "lucide-react";

type Category = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  label: string;
  Art: ComponentType;
  featured?: boolean;
};

/* ---------------------------------------------------------------
   Mini illustrations. Each one tells its card's story in motion:
   Tawaf circuits, the Sa'i between Safa and Marwa, a checklist
   ticking itself, a dua rising, a plane crossing its route.
   Pure SVG + CSS, no JS. Motion is off for reduced-motion users.
---------------------------------------------------------------- */

const ART =
  "h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.05]";

function TawafArt() {
  return (
    <svg viewBox="0 0 200 100" className={ART} aria-hidden="true">
      <g className="text-emerald" fill="none" stroke="currentColor">
        <circle cx="100" cy="50" r="42" strokeWidth="0.8" strokeDasharray="2 4" opacity="0.5" />
        <circle cx="100" cy="50" r="30" strokeWidth="0.8" opacity="0.3" />
      </g>

      {/* The Kaaba */}
      <g className="text-deep-teal">
        <rect x="93" y="43" width="14" height="14" rx="1" fill="currentColor" />
      </g>
      <g className="text-gold">
        <rect x="93" y="46.5" width="14" height="2.2" fill="currentColor" />
      </g>

      {/* Pilgrims circling, counter-clockwise */}
      <g className="ej-orbit-a text-gold">
        <circle cx="142" cy="50" r="6" fill="currentColor" opacity="0.2" />
        <circle cx="142" cy="50" r="3.4" fill="currentColor" />
      </g>
      <g className="ej-orbit-b text-emerald">
        <circle cx="130" cy="50" r="2.6" fill="currentColor" />
      </g>
    </svg>
  );
}

function SaiArt() {
  return (
    <svg viewBox="0 0 200 100" className={ART} aria-hidden="true">
      <g className="text-emerald">
        <path d="M18 80 L34 50 L50 80 Z" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
        <path d="M150 80 L166 50 L182 80 Z" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
        <text x="34" y="93" textAnchor="middle" fontSize="8" fontWeight="600" fill="currentColor">
          Safa
        </text>
        <text x="166" y="93" textAnchor="middle" fontSize="8" fontWeight="600" fill="currentColor">
          Marwa
        </text>
        <text x="100" y="40" textAnchor="middle" fontSize="7.5" fontWeight="600" fill="currentColor" opacity="0.7">
          {"Sa'i · 7 trips"}
        </text>
      </g>

      <line x1="54" y1="76" x2="146" y2="76" stroke="#C9A227" strokeWidth="1.4" strokeLinecap="round" strokeDasharray="2 4" />

      <g className="text-gold">
        <circle className="ej-sai" cx="54" cy="69" r="3.6" fill="currentColor" />
      </g>
    </svg>
  );
}

function GuidanceArt() {
  const rows = [
    { y: 22, w: 92, gold: false, delay: "0s" },
    { y: 50, w: 70, gold: true, delay: "0.7s" },
    { y: 78, w: 82, gold: false, delay: "1.4s" },
  ];

  return (
    <svg viewBox="0 0 200 100" className={ART} aria-hidden="true">
      {rows.map(({ y, w, gold, delay }) => (
        <g key={y} className={gold ? "text-gold" : "text-emerald"}>
          <circle cx="44" cy={y} r="7" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="1" />
          <path
            className="ej-draw"
            style={{ animationDelay: delay }}
            d={`M40.8 ${y + 0.2} L43.2 ${y + 2.8} L47.4 ${y - 2.4}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect x="60" y={y - 3} width={w} height="6" rx="3" fill="currentColor" opacity="0.18" />
        </g>
      ))}
    </svg>
  );
}

function DuaArt() {
  const particles = [
    { cx: 72, cy: 44, r: 2, gold: true, delay: "0s" },
    { cx: 128, cy: 46, r: 1.6, gold: false, delay: "1.3s" },
    { cx: 100, cy: 32, r: 2.2, gold: true, delay: "0.7s" },
    { cx: 86, cy: 30, r: 1.4, gold: false, delay: "2s" },
    { cx: 116, cy: 34, r: 1.8, gold: true, delay: "2.6s" },
  ];

  return (
    <svg viewBox="0 0 200 100" className={ART} aria-hidden="true">
      <g className="text-emerald">
        <circle cx="100" cy="54" r="32" fill="currentColor" opacity="0.07" />
      </g>
      <g className="text-gold">
        <circle cx="100" cy="54" r="21" fill="currentColor" opacity="0.1" />
      </g>

      <HandHeart
        x={82}
        y={36}
        width={36}
        height={36}
        strokeWidth={1.4}
        className="text-emerald"
      />

      {particles.map(({ cx, cy, r, gold, delay }) => (
        <g key={`${cx}-${cy}`} className={gold ? "text-gold" : "text-emerald"}>
          <circle
            className="ej-up"
            style={{ animationDelay: delay }}
            cx={cx}
            cy={cy}
            r={r}
            fill="currentColor"
            opacity="0.5"
          />
        </g>
      ))}
    </svg>
  );
}

function TravelArt() {
  return (
    <svg viewBox="0 0 200 100" className={ART} aria-hidden="true">
      {/* Route */}
      <path
        d="M14 67 A150 150 0 0 1 186 67"
        fill="none"
        stroke="#C9A227"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeDasharray="2 5"
      />

      {/* Departure: home (drawn over the start of the route) */}
      <g>
        <circle
          cx="14"
          cy="66"
          r="12"
          fill="#2B6861"
          fillOpacity="0.1"
          stroke="#2B6861"
          strokeWidth="0.8"
        />
        <path
          d="M5.5 65.5 L14 57.5 L22.5 65.5 Z"
          fill="#2B6861"
          stroke="#2B6861"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        <rect x="7.5" y="65.5" width="13" height="9.5" rx="0.8" fill="#063F3A" />
        <rect x="12" y="68.8" width="4" height="6.2" rx="0.6" fill="#C9A227" />
      </g>

      {/* Destination: the Kaaba (drawn before the plane, so the plane lands over it) */}
      <g>
        <circle
          className="ej-arrive"
          cx="186"
          cy="65"
          r="12"
          fill="#2B6861"
          fillOpacity="0.1"
          stroke="#2B6861"
          strokeWidth="0.8"
        />
        <rect x="178" y="57" width="16" height="16" rx="1" fill="#063F3A" />
        <rect x="178" y="60.6" width="16" height="2.6" fill="#C9A227" />
        <rect x="188.6" y="65.5" width="3.4" height="7.5" rx="0.6" fill="#C9A227" />
      </g>

      {/* The plane rides a long radius, so it follows the arc exactly */}
      <g className="ej-fly">
        <g transform="rotate(45 100 40)">
          <Plane
            x={88}
            y={28}
            width={24}
            height={24}
            strokeWidth={1.6}
            fill="currentColor"
            fillOpacity={0.15}
            className="text-emerald"
          />
        </g>
      </g>
    </svg>
  );
}

const categories: Category[] = [
  {
    title: "Hajj Guide",
    description:
      "Complete guidance from preparation and intention to the final rituals.",
    href: "/hajj",
    icon: Landmark,
    label: "Begin Here",
    Art: TawafArt,
    featured: true,
  },
  {
    title: "Umrah Guide",
    description:
      "Clear, practical guidance to help you perform Umrah with confidence.",
    href: "/umrah",
    icon: Compass,
    label: "Begin Here",
    Art: SaiArt,
    featured: true,
  },
  {
    title: "Practical Guidance",
    description:
      "Useful advice for preparation, planning, travel, and every stage between.",
    href: "/guides",
    icon: BookOpen,
    label: "Guidance",
    Art: GuidanceArt,
  },
  {
    title: "Duas",
    description:
      "Essential supplications and authentic duas to keep close throughout your journey.",
    href: "/duas",
    icon: HandHeart,
    label: "Supplications",
    Art: DuaArt,
  },
  {
    title: "Travel & Visa",
    description:
      "Important travel requirements, visa information, and preparation tips.",
    href: "/travel",
    icon: Plane,
    label: "Travel",
    Art: TravelArt,
  },
];

/** Eight-point star: two squares, one rotated 45deg. */
function StarOutline({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      className={className}
      aria-hidden="true"
    >
      <rect x="18" y="18" width="64" height="64" />
      <rect
        x="18"
        y="18"
        width="64"
        height="64"
        transform="rotate(45 50 50)"
      />
      <circle cx="50" cy="50" r="12" />
    </svg>
  );
}

export default function ExploreJourney() {
  return (
    <section className="relative overflow-hidden bg-deep-teal pb-16 pt-20 sm:pb-20 sm:pt-24 lg:pb-24">
      {/* Scoped animations. Cards stay fully visible where scroll-driven
          animation is unsupported, and all motion stops for reduced-motion. */}
      <style>{`
        @keyframes ej-rise {
          from { opacity: 0; transform: translateY(28px) scale(.97); }
          to { opacity: 1; transform: none; }
        }
        @keyframes ej-spin { to { transform: rotate(360deg); } }
        @keyframes ej-sai {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(92px); }
        }
        @keyframes ej-draw {
          0% { stroke-dashoffset: 12; }
          12%, 80% { stroke-dashoffset: 0; }
          92%, 100% { stroke-dashoffset: 12; }
        }
        @keyframes ej-up {
          0% { transform: translateY(0); opacity: 0; }
          20% { opacity: .9; }
          100% { transform: translateY(-30px); opacity: 0; }
        }
        @keyframes ej-fly {
          0% { transform: rotate(-35deg); opacity: 0; }
          10%, 94% { opacity: 1; }
          100% { transform: rotate(35deg); opacity: 0; }
        }
        @keyframes ej-arrive {
          0%, 78% { transform: scale(1); opacity: 0.45; }
          92% { transform: scale(1.18); opacity: 1; }
          100% { transform: scale(1); opacity: 0.45; }
        }
        .ej-spin { animation: ej-spin 90s linear infinite; }
        .ej-orbit-a { transform-origin: 100px 50px; animation: ej-spin 14s linear infinite reverse; }
        .ej-orbit-b { transform-origin: 100px 50px; animation: ej-spin 9s linear infinite reverse; }
        .ej-sai { animation: ej-sai 4.5s ease-in-out infinite; }
        .ej-draw { stroke-dasharray: 12; stroke-dashoffset: 0; animation: ej-draw 5s ease-in-out infinite; }
        .ej-up { animation: ej-up 4s ease-in infinite; }
        .ej-fly { transform-origin: 100px 190px; animation: ej-fly 6s linear infinite; }
        .ej-arrive { transform-origin: 186px 65px; animation: ej-arrive 6s ease-in-out infinite; }
        @supports (animation-timeline: view()) {
          .ej-card {
            animation: ej-rise linear both;
            animation-timeline: view();
            animation-range: entry 5% entry 45%;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .ej-card, .ej-spin, .ej-orbit-a, .ej-orbit-b, .ej-sai,
          .ej-draw, .ej-up, .ej-fly, .ej-arrive { animation: none !important; }
        }
      `}</style>

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
          BACKGROUND: soft glows + slowly turning star
         ========================================================= */}
      <div
        className="pointer-events-none absolute -left-32 top-1/4 h-72 w-72 rounded-full bg-emerald/20 blur-[100px]"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute -right-32 bottom-1/4 h-80 w-80 rounded-full bg-gold/10 blur-[110px]"
        aria-hidden="true"
      />

      <StarOutline className="ej-spin pointer-events-none absolute -right-28 top-28 h-72 w-72 text-gold opacity-[0.08] sm:-right-16 sm:h-96 sm:w-96" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* =========================================================
            HEADING
           ========================================================= */}
        <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-10">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-gold/70" />

            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/40 bg-white/10 text-gold backdrop-blur-sm">
              <Landmark size={15} strokeWidth={1.5} />
            </span>

            <span className="h-px w-10 bg-gold/70" />
          </div>

          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em] text-gold">
            Explore Manasik
          </p>

          <h2 className="font-heading text-[24px] font-semibold leading-[1.2] tracking-tight text-white sm:text-[28px] md:text-[32px] lg:text-[38px]">
            Everything you need,
            <span className="relative mx-auto mt-1 block w-fit text-gold">
              one journey at a time.
              <svg
                aria-hidden="true"
                viewBox="0 0 120 10"
                preserveAspectRatio="none"
                fill="none"
                className="pointer-events-none absolute left-1/2 top-full mt-[0.05em] h-[0.2em] w-[70%] -translate-x-1/2 text-gold"
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

          <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-white/70 sm:text-[15px] sm:leading-7">
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
          <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
            {categories.slice(0, 2).map((category, index) => (
              <div
                key={category.title}
                className={[
                  "ej-card relative",
                  index === 1 ? "lg:top-4" : "",
                ].join(" ")}
              >
                <CategoryCard category={category} />
              </div>
            ))}
          </div>

          {/* Second row: the odd card spans both columns on sm so it never sits orphaned */}
          <div className="mt-4 grid gap-4 sm:mt-5 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {categories.slice(2).map((category, index) => (
              <div
                key={category.title}
                className={[
                  "ej-card relative",
                  index === 2 ? "sm:col-span-2 lg:col-span-1" : "",
                  index === 1 ? "lg:top-4" : "",
                ].join(" ")}
              >
                <CategoryCard category={category} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* =========================================================
          BOTTOM WAVE
          This stays entirely inside this section.
         ========================================================= */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-14 sm:h-[72px]"
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

function CategoryCard({ category }: { category: Category }) {
  const { Art, icon: Icon } = category;
  const featured = Boolean(category.featured);

  return (
    <Link
      href={category.href}
      className={[
        "group relative flex h-full flex-col overflow-hidden rounded-2xl",
        "border border-white/10 bg-white",
        "shadow-[0_14px_36px_rgba(0,0,0,0.2)]",
        "transition-all duration-300",
        "hover:-translate-y-1.5",
        "hover:border-gold/50",
        "hover:shadow-[0_24px_48px_rgba(0,0,0,0.3)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70",
        "focus-visible:ring-offset-2 focus-visible:ring-offset-deep-teal",
      ].join(" ")}
    >
      {/* Illustration stage */}
      <div
        className={[
          "relative m-2.5 mb-0 overflow-hidden rounded-xl",
          "bg-gradient-to-br from-warm-white via-white to-emerald/[0.08]",
          "ring-1 ring-soft-beige",
          featured ? "h-32 sm:h-40" : "h-28 sm:h-32",
        ].join(" ")}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.13] [background-image:radial-gradient(circle,#2B6861_1px,transparent_1.2px)] [background-size:14px_14px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_85%)]"
          aria-hidden="true"
        />

        <Art />

        {/* Label chip */}
        <span
          className={[
            "absolute left-2.5 top-2.5 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1",
            "text-[9px] font-bold uppercase tracking-[0.16em]",
            featured
              ? "bg-gold text-deep-teal"
              : "bg-white/90 text-emerald ring-1 ring-soft-beige",
          ].join(" ")}
        >
          <Icon size={11} strokeWidth={2.2} aria-hidden="true" />
          {category.label}
        </span>

        {/* Arrow chip: fills gold and points forward on hover */}
        <span
          className="absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-emerald ring-1 ring-soft-beige transition-all duration-300 group-hover:bg-gold group-hover:text-deep-teal group-hover:ring-gold"
          aria-hidden="true"
        >
          <ArrowUpRight
            size={15}
            strokeWidth={1.8}
            className="transition-transform duration-300 group-hover:rotate-45"
          />
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col px-4 pb-4 pt-3.5 sm:px-5 sm:pb-5">
        <h3
          className={[
            "font-heading font-semibold leading-tight text-deep-teal",
            "transition-colors duration-300 group-hover:text-emerald",
            featured ? "text-[22px] sm:text-2xl" : "text-xl",
          ].join(" ")}
        >
          {category.title}
        </h3>

        <p className="mt-2 max-w-md text-[13px] leading-[22px] text-muted-teal">
          {category.description}
        </p>

        <div className="mt-auto flex items-center gap-2 pt-4 text-[11px] font-semibold text-emerald">
          Explore
          <span className="h-px w-6 bg-gold transition-all duration-300 group-hover:w-12" />
        </div>
      </div>

      {/* Gold-to-emerald bar that draws across the bottom on hover */}
      <span
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-gold via-emerald to-gold transition-transform duration-500 ease-out group-hover:scale-x-100"
        aria-hidden="true"
      />
    </Link>
  );
}