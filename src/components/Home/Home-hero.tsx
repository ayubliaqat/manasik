"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  CircleDot,
  ClipboardCheck,
  Compass,
  Moon,
  type LucideIcon,
} from "lucide-react";

/* ---------- Tools: 3-column grid ---------- */
/* Row 1: tool 1 spans 2 columns, tool 2 spans 1 · Row 2: three tools, 1 column each */
type HeroTool = {
  label: string;
  hint?: string;
  href: string;
  Icon: LucideIcon;
  span: string;
  wide?: boolean;
};

const heroTools: HeroTool[] = [
  {
    label: "Qibla Finder",
    hint: "Find the direction",
    href: "/tools/qibla-finder",
    Icon: Compass,
    span: "col-span-2",
    wide: true,
  },
  {
    label: "Umrah Checklist",
    href: "/tools/umrah-checklist",
    Icon: ClipboardCheck,
    span: "col-span-1",
  },
  {
    label: "Tasbih Counter",
    href: "/tools/tasbih-counter",
    Icon: CircleDot,
    span: "col-span-1",
  },
  {
    label: "Zakat Calculator",
    href: "/tools/zakat-calculator",
    Icon: Calculator,
    span: "col-span-1",
  },
  {
    label: "Ramadan Counter",
    href: "/tools/ramadan-counter",
    Icon: Moon,
    span: "col-span-1",
  },
];

/* ---------- Prayer times (UK by default) ---------- */
const TZ = "Europe/London";
const PRAYERS = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"] as const;
type PrayerName = (typeof PRAYERS)[number];
type Timings = Record<PrayerName, number>; // minutes since midnight (London)

const PRAYER_URL =
  "https://api.aladhan.com/v1/timingsByCity?city=London&country=United%20Kingdom&method=15";

const RING_R = 40;
const RING_C = 2 * Math.PI * RING_R;

function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 15000);
  return () => clearInterval(id);
}
const getMinute = () => Math.floor(Date.now() / 60000);
const getServerMinute = () => 0;

function londonMinutes(ms: number) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: TZ,
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(new Date(ms));
  const h = Number(parts.find((p) => p.type === "hour")?.value ?? 0);
  const m = Number(parts.find((p) => p.type === "minute")?.value ?? 0);
  return (h % 24) * 60 + m;
}

function parseClock(value: string) {
  const match = value.match(/(\d{1,2}):(\d{2})/);
  return match ? Number(match[1]) * 60 + Number(match[2]) : null;
}

function formatClock(totalMinutes: number) {
  const t = ((totalMinutes % 1440) + 1440) % 1440;
  const h24 = Math.floor(t / 60);
  const m = String(t % 60).padStart(2, "0");
  const suffix = h24 >= 12 ? "pm" : "am";
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h12}:${m} ${suffix}`;
}

function formatRemaining(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

export default function Hero() {
  const minute = useSyncExternalStore(subscribe, getMinute, getServerMinute);
  const [timings, setTimings] = useState<Timings | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(PRAYER_URL)
      .then((res) => res.json())
      .then((json) => {
        const raw = json?.data?.timings;
        const parsed = {} as Timings;
        for (const name of PRAYERS) {
          const value = parseClock(String(raw?.[name] ?? ""));
          if (value === null) throw new Error("bad timings");
          parsed[name] = value;
        }
        if (!cancelled) setTimings(parsed);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  /* Dates (client only — avoids hydration mismatch) */
  const ready = minute !== 0;
  const nowDate = new Date(minute * 60000);
  const hijri = ready
    ? new Intl.DateTimeFormat("en-GB-u-ca-islamic-umalqura", {
        timeZone: TZ,
        day: "numeric",
        month: "long",
        year: "numeric",
      })
        .format(nowDate)
        .replace(/\s?AH$/i, "")
    : "";
  const gregorian = ready
    ? new Intl.DateTimeFormat("en-GB", {
        timeZone: TZ,
        weekday: "short",
        day: "numeric",
        month: "short",
      }).format(nowDate)
    : "";

  /* Next prayer + countdown */
  let nextIndex = -1;
  let remaining = 0;
  let progress = 0;
  if (ready && timings) {
    const nowMin = londonMinutes(minute * 60000);
    const mins = PRAYERS.map((p) => timings[p]);
    const ext = [mins[4] - 1440, ...mins, mins[0] + 1440];
    const idx = ext.findIndex((t) => t > nowMin);
    if (idx > 0) {
      nextIndex = (idx - 1) % 5;
      remaining = ext[idx] - nowMin;
      progress = Math.min(
        1,
        Math.max(0, (nowMin - ext[idx - 1]) / (ext[idx] - ext[idx - 1])),
      );
    }
  }
  const nextName = nextIndex >= 0 ? PRAYERS[nextIndex] : null;

  return (
    <section
      className="relative overflow-hidden bg-dark-teal
  bg-[linear-gradient(165deg,#02332f_0%,#063f3a_55%,#c9a227_115%)]
  lg:bg-[linear-gradient(115deg,#02332f_0%,#063f3a_45%,#c9a227_105%)]"
    >
      {/* Islamic geometric texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          maskImage:
            "linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0) 95%)",
          WebkitMaskImage:
            "linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0) 95%)",
        }}
      >
        <svg className="h-full w-full text-white opacity-[0.05]">
          <defs>
            <pattern
              id="hero-star"
              width="64"
              height="64"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M32 6 L38 20 L52 14 L46 28 L60 32 L46 36 L52 50 L38 44 L32 58 L26 44 L12 50 L18 36 L4 32 L18 28 L12 14 L26 20 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-star)" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center">
        <div className="mx-auto w-full max-w-[1400px] px-5 pb-16 pt-12 sm:px-8 sm:pb-[4.5rem] sm:pt-14 lg:px-16 lg:pb-16 lg:pt-14 xl:px-20">
          <div className="flex flex-col items-center gap-9 sm:gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
            {/* LEFT */}
            <div className="max-w-[570px] text-center lg:text-left">
              {/* Heading */}
              <h1
                className="hero-from-left font-serif text-[28px] font-semibold
              leading-[1.08] tracking-[-0.02em] text-white
              drop-shadow-[0_3px_2px_rgba(0,0,0,0.3)]
              sm:text-[36px]
              lg:text-[48px]"
              >
                Islamic Tools and Guides for
                <span
                  className="mt-1 block text-gold-light
                drop-shadow-[0_3px_3px_rgba(0,0,0,0.3)]"
                >
                  Hajj and Umrah
                </span>
              </h1>

              {/* Gold accent */}
              <div
                className="hero-from-left my-3 flex items-center justify-center gap-2 sm:my-4 lg:justify-start"
                style={{ animationDelay: "0.25s" }}
              >
                <span className="h-[2px] w-11 rounded-full bg-gold-light sm:w-14" />
                <span className="h-1.5 w-1.5 rounded-full bg-gold-light" />
              </div>

              {/* Description */}
              <p
                className="hero-from-right mx-auto max-w-[510px] text-[14px]
              leading-6 text-white/90
              sm:text-[15px] sm:leading-6 lg:mx-0"
                style={{ animationDelay: "0.45s" }}
              >
                Free{" "}
                <span className="font-medium text-white underline decoration-gold-light decoration-2 underline-offset-4">
                  Islamic tools,
                </span>{" "}
                Hajj and Umrah guides, Ziyarat and authentic duas, all in one
                place.
              </p>

              {/* CTA buttons */}
              <div
                className="hero-from-left mt-5 flex flex-col items-stretch gap-2.5 sm:mt-6 sm:flex-row sm:items-center sm:justify-center sm:gap-4 lg:justify-start"
                style={{ animationDelay: "0.65s" }}
              >
                {/* Primary — dark teal */}
                <Link
                  href="/blog"
                  className="group inline-flex min-h-11 w-full items-center justify-center
  gap-2 rounded-full
  border border-gold/60
  bg-dark-teal
  px-5 py-2.5
  text-[13px] font-semibold text-white
  shadow-[0_3px_0_#011f1c,0_8px_18px_rgba(2,51,47,0.35)]
  transition-all duration-300
  hover:-translate-y-1
  hover:border-gold-light
  hover:bg-deep-teal
  hover:shadow-[0_4px_0_#011f1c,0_13px_25px_rgba(2,51,47,0.4)]
  active:translate-y-[1px]
  active:shadow-[0_2px_0_#011f1c,0_4px_10px_rgba(2,51,47,0.3)]
  focus:outline-none
  focus:ring-2 focus:ring-gold-light
  focus:ring-offset-2 focus:ring-offset-deep-teal
  sm:w-auto sm:px-6 sm:text-sm"
                >
                  Read Blogs
                  <ArrowRight
                    size={16}
                    className="text-gold-light transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>

                {/* Secondary — gold */}
                <Link
                  href="/tools"
                  className="group inline-flex min-h-11 w-full items-center justify-center
gap-2 rounded-full
border border-gold-light/70
bg-gold-light
px-5 py-2.5
text-[13px] font-semibold text-dark-teal
shadow-[0_3px_0_#8a6f16,0_8px_18px_rgba(2,51,47,0.3)]
transition-all duration-300
hover:-translate-y-1
hover:bg-gold
hover:shadow-[0_4px_0_#8a6f16,0_13px_25px_rgba(2,51,47,0.35)]
active:translate-y-[1px]
active:shadow-[0_2px_0_#8a6f16,0_4px_10px_rgba(2,51,47,0.25)]
focus:outline-none
focus:ring-2 focus:ring-white
focus:ring-offset-2
focus:ring-offset-deep-teal
sm:w-auto sm:px-6 sm:text-sm"
                >
                  <Compass
                    size={16}
                    className="text-dark-teal transition-transform duration-300 group-hover:rotate-6"
                  />
                  Explore Islamic Tools
                </Link>
              </div>
            </div>

            {/* RIGHT — glass card: Islamic date, UK prayer times, tools */}
            <div
              className="hero-from-right relative w-full max-w-[460px] shrink-0 lg:max-w-[390px] xl:max-w-[460px]"
              style={{ animationDelay: "0.55s" }}
            >
              <aside
                aria-label="Islamic date, prayer times and tools"
                className="relative overflow-hidden rounded-[30px] border border-white/15 p-4
                bg-[linear-gradient(160deg,rgba(14,90,82,0.96)_0%,rgba(6,63,58,0.96)_100%)]
                shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_24px_50px_rgba(2,51,47,0.4)]
                backdrop-blur-xl
                sm:p-5 lg:p-4 xl:p-5"
              >
                <div className="relative">
                  {/* Islamic date + countdown ring */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <h2 className="min-h-[26px] text-[21px] font-semibold leading-tight text-white drop-shadow-[0_1px_1px_rgba(2,51,47,0.35)]">
                        {hijri || "\u00A0"}
                      </h2>
                      <p className="mt-0.5 min-h-5 text-[13px] leading-5 text-white/80">
                        {ready ? `London, UK · ${gregorian}` : "\u00A0"}
                      </p>
                    </div>

                    <div
                      className="relative h-[84px] w-[84px] shrink-0"
                      role="img"
                      aria-label={
                        nextName
                          ? `${formatRemaining(remaining)} until ${nextName}`
                          : "Prayer countdown"
                      }
                    >
                      <svg
                        viewBox="0 0 100 100"
                        className="h-full w-full -rotate-90"
                      >
                        <circle
                          cx="50"
                          cy="50"
                          r="32"
                          fill="rgba(6,63,58,0.35)"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r={RING_R}
                          fill="none"
                          strokeWidth="9"
                          stroke="rgba(250,248,243,0.85)"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r={RING_R}
                          fill="none"
                          strokeWidth="9"
                          strokeLinecap="round"
                          className="stroke-gold"
                          strokeDasharray={`${progress * RING_C} ${RING_C}`}
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center leading-none">
                        <span className="text-[16px] font-semibold text-white">
                          {nextName ? formatRemaining(remaining) : "—"}
                        </span>
                        <span className="mt-1 text-[10px] font-medium text-white/85">
                          {nextName
                            ? `until ${nextName}`
                            : failed
                              ? "offline"
                              : "loading"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Next prayer */}
                  <p className="mt-3 text-[13.5px] text-white/85">
                    {nextName && timings ? (
                      <>
                        Next prayer —{" "}
                        <span className="font-semibold text-white">
                          {nextName}
                        </span>{" "}
                        at{" "}
                        <span className="font-semibold text-white">
                          {formatClock(timings[nextName])}
                        </span>
                      </>
                    ) : failed ? (
                      "Prayer times are unavailable right now"
                    ) : (
                      "Loading UK prayer times…"
                    )}
                  </p>

                  {/* Prayer times row */}
                  <Link
                    href="/tools/prayer-times"
                    aria-label="Open prayer times"
                    className="mt-2 grid grid-cols-5 gap-1.5 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    {PRAYERS.map((name, i) => {
                      const active = i === nextIndex;
                      return (
                        <span
                          key={name}
                          className={`flex flex-col items-center justify-center rounded-xl border px-0.5 py-1.5 text-center transition-colors duration-300 ${
                            active
                              ? "border-warm-white bg-warm-white text-deep-teal shadow-[0_4px_12px_rgba(2,51,47,0.25)]"
                              : "border-white/25 bg-white/10 text-white hover:border-white/60 hover:bg-white/20"
                          }`}
                        >
                          <span
                            className={`text-[10.5px] leading-tight sm:text-[11px] xl:text-xs ${
                              active ? "text-muted-teal" : "text-white/80"
                            }`}
                          >
                            {name}
                          </span>
                          <span className="mt-0.5 whitespace-nowrap text-[10.5px] font-semibold leading-tight sm:text-[11px] xl:text-[12.5px]">
                            {timings ? formatClock(timings[name]) : "—"}
                          </span>
                        </span>
                      );
                    })}
                  </Link>

                  {/* Tools: 3 columns — [2 + 1] then [1 + 1 + 1] */}
                  <ul className="mt-2 grid grid-cols-3 gap-1.5">
                    {heroTools.map(
                      ({ label, hint, href, Icon, span, wide }) => (
                        <li key={href} className={span}>
                          <Link
                            href={href}
                            className={`group flex h-full rounded-xl border border-white/25 bg-white/10 p-2 text-white
                            transition-all duration-300
                            hover:-translate-y-0.5 hover:border-white hover:bg-warm-white hover:text-deep-teal
                            focus:outline-none focus-visible:ring-2 focus-visible:ring-white
                            ${wide ? "items-center gap-3" : "flex-col items-start gap-1.5"}`}
                          >
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-deep-teal/45 text-gold-light transition-colors duration-300 group-hover:bg-deep-teal/10 group-hover:text-deep-teal">
                              <Icon size={16} />
                            </span>
                            <span className="min-w-0">
                              <span className="block text-[12.5px] font-semibold leading-tight">
                                {label}
                              </span>
                              {hint && (
                                <span className="mt-0.5 block text-[11px] leading-tight text-white/75 transition-colors duration-300 group-hover:text-muted-teal">
                                  {hint}
                                </span>
                              )}
                            </span>
                          </Link>
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}