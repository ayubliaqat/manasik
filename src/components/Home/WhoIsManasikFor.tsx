import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Backpack,
  BookOpenCheck,
  Compass,
  HeartHandshake,
  MapPinned,
  ShieldCheck,
  UserRound,
  UsersRound,
} from "lucide-react";

const audiences = [
  {
    icon: UserRound,
    title: "First-Time Pilgrims",
  },
  {
    icon: BookOpenCheck,
    title: "Those Seeking Guidance",
  },
  {
    icon: Backpack,
    title: "Preparing for Hajj or Umrah",
  },
  {
    icon: UsersRound,
    title: "Families & Groups",
  },
  {
    icon: MapPinned,
    title: "Planning Ahead",
  },
  {
    icon: HeartHandshake,
    title: "Seeking Clarity",
  },
];

export default function WhoIsItFor() {
  return (
    <section className="relative bg-warm-white px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      {/* Scoped animations (no extra dependencies) */}
      <style>{`
        @keyframes wif-spin { to { transform: rotate(360deg); } }
        @keyframes wif-spin-rev { to { transform: rotate(-360deg); } }
        @keyframes wif-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-9px); }
        }
        @keyframes wif-pulse {
          0%, 100% { opacity: .55; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.08); }
        }
        .wif-spin { animation: wif-spin 70s linear infinite; }
        .wif-spin-rev { animation: wif-spin-rev 90s linear infinite; }
        .wif-orbit { animation: wif-spin 24s linear infinite; }
        .wif-float { animation: wif-float 6s ease-in-out infinite; }
        .wif-float-delay { animation: wif-float 7s ease-in-out -3s infinite; }
        .wif-pulse { animation: wif-pulse 3.5s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .wif-spin, .wif-spin-rev, .wif-orbit,
          .wif-float, .wif-float-delay, .wif-pulse { animation: none !important; }
        }
      `}</style>

      {/* Inset rounded panel: gives spacing from the left and right edges */}
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[1.75rem] border border-soft-beige bg-gradient-to-br from-white via-warm-white to-[#f3efe2] shadow-[0_20px_60px_rgba(6,63,58,0.08)] sm:rounded-[2.25rem]">
        {/* Dot-grid texture, fading toward the edges */}
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-[0.16] [background-image:radial-gradient(circle,#2B6861_1px,transparent_1.2px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_78%)]"
          aria-hidden="true"
        />

        {/* Background glow */}
        <div
          className="pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-emerald/[0.08] blur-[100px]"
          aria-hidden="true"
        />

        <div
          className="pointer-events-none absolute -right-24 bottom-1/4 h-80 w-80 rounded-full bg-gold/[0.10] blur-[110px]"
          aria-hidden="true"
        />

        {/* Main content */}
        <div className="relative z-10 px-5 py-12 sm:px-8 sm:py-14 lg:px-12 lg:py-16">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
            {/* LEFT */}
            <div className="max-w-xl">
              <div className="mb-4 inline-flex items-center gap-3 rounded-full border border-gold/30 bg-gold/[0.08] py-1.5 pl-2 pr-4">
                <span className="wif-pulse h-2 w-2 rounded-full bg-gold" />

                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold">
                  Who It&apos;s For
                </span>
              </div>

              <h2 className="font-heading text-3xl font-bold leading-[1.1] tracking-tight text-deep-teal sm:text-4xl lg:text-[46px]">
                What is{" "}
                <span className="relative inline-block bg-gradient-to-r from-emerald via-deep-teal to-emerald bg-clip-text text-transparent">
                  this for?
                  {/* Hand-drawn underline */}
                  <svg
                    viewBox="0 0 200 14"
                    preserveAspectRatio="none"
                    className="absolute -bottom-2 left-0 h-2.5 w-full"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M2 9 C30 2 55 13 90 7 C125 2 160 12 198 5"
                      stroke="#C9A227"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h2>

              <p className="mt-6 max-w-lg text-sm leading-6.5 text-muted-teal sm:text-[15px]">
                Manasik is for anyone preparing for Hajj or Umrah — whether
                you&apos;re going for the first time, travelling with family, or
                simply looking for clear and reliable guidance.
              </p>

              {/* Audience cards */}
              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {audiences.map(({ icon: Icon, title }, index) => {
                  const gold = index % 2 !== 0;

                  return (
                    <div
                      key={title}
                      className="group relative flex items-center gap-3 overflow-hidden rounded-2xl border border-soft-beige bg-gradient-to-br from-white to-warm-white px-3.5 py-3.5 shadow-[0_4px_18px_rgba(6,63,58,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-[0_12px_28px_rgba(6,63,58,0.12)]"
                    >
                      {/* Shine sweep */}
                      <span
                        className="pointer-events-none absolute inset-y-0 -left-full w-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-gold/[0.14] to-transparent transition-transform duration-700 group-hover:translate-x-[220%]"
                        aria-hidden="true"
                      />

                      {/* Left accent bar */}
                      <span
                        className={[
                          "absolute inset-y-3 left-0 w-[3px] rounded-r-full transition-all duration-300 group-hover:inset-y-2",
                          gold ? "bg-gold" : "bg-emerald",
                        ].join(" ")}
                        aria-hidden="true"
                      />

                      <span
                        className={[
                          "relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-all duration-300 group-hover:rotate-[-6deg] group-hover:scale-110",
                          gold
                            ? "border-gold/25 bg-gold/[0.10] text-gold"
                            : "border-emerald/20 bg-emerald/[0.08] text-emerald",
                        ].join(" ")}
                      >
                        <Icon size={18} strokeWidth={1.7} />
                      </span>

                      <span className="relative flex-1 text-[12px] font-semibold leading-4.5 text-deep-teal sm:text-[13px]">
                        {title}
                      </span>

                      <span
                        className="relative text-[10px] font-bold tracking-widest text-deep-teal/25 transition-colors duration-300 group-hover:text-gold"
                        aria-hidden="true"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* CTA */}
              <div className="mt-8">
                <Link
                  href="/guides"
                  className="group relative inline-flex min-h-11 items-center gap-2.5 overflow-hidden rounded-full bg-deep-teal px-6 py-3 text-[12px] font-semibold text-white shadow-[0_4px_0_rgba(2,51,47,0.65),0_10px_22px_rgba(6,63,58,0.16)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-white"
                >
                  <span
                    className="pointer-events-none absolute inset-y-0 -left-full w-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-[220%]"
                    aria-hidden="true"
                  />

                  <span className="relative">Start Exploring</span>

                  <span className="relative flex h-6 w-6 items-center justify-center rounded-full bg-white/15 transition-colors duration-300 group-hover:bg-gold">
                    <ArrowRight
                      size={13}
                      strokeWidth={2}
                      className="transition-transform duration-300 group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="relative mx-auto aspect-square w-full max-w-[340px] sm:max-w-[420px] lg:ml-auto lg:max-w-[480px]">
              {/* Soft glow behind the circle */}
              <div
                className="absolute inset-[4%] z-0 rounded-full bg-gradient-to-br from-gold/30 via-emerald/15 to-transparent blur-2xl"
                aria-hidden="true"
              />

              {/* Slowly rotating dashed gold ring */}
              <svg
                viewBox="0 0 500 500"
                className="wif-spin pointer-events-none absolute inset-0 z-0 h-full w-full"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M250 10 C386 8 492 114 490 252 C488 388 386 492 250 490 C114 488 10 386 12 250 C14 116 116 12 250 10Z"
                  stroke="#C9A227"
                  strokeWidth="1.6"
                  strokeDasharray="5 6"
                  strokeLinecap="round"
                  opacity="0.75"
                />
              </svg>

              {/* Counter-rotating sketch rings */}
              <svg
                viewBox="0 0 500 500"
                className="wif-spin-rev pointer-events-none absolute inset-0 z-0 h-full w-full"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M264 20 C394 30 480 132 475 260 C470 392 372 478 240 476 C110 474 26 372 30 244 C34 120 132 28 264 20Z"
                  stroke="#2B6861"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  opacity="0.35"
                />
                <path
                  d="M236 26 C350 14 466 96 480 218"
                  stroke="#073F3A"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  opacity="0.3"
                />
                <path
                  d="M120 470 C60 430 24 370 20 300"
                  stroke="#073F3A"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  opacity="0.25"
                />
              </svg>

              {/* Static gold scribble accent */}
              <svg
                viewBox="0 0 500 500"
                className="pointer-events-none absolute inset-0 z-0 h-full w-full"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M402 56 C436 82 460 118 472 162"
                  stroke="#C9A227"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  d="M382 70 C416 94 440 128 452 170"
                  stroke="#C9A227"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  opacity="0.55"
                />
              </svg>

              {/* Orbiting gold dot */}
              <div
                className="wif-orbit pointer-events-none absolute inset-0 z-20"
                aria-hidden="true"
              >
                <span className="absolute left-1/2 top-[1%] h-3.5 w-3.5 -translate-x-1/2 rounded-full bg-gold shadow-[0_0_0_6px_rgba(201,162,39,0.15),0_0_18px_rgba(201,162,39,0.6)]" />
              </div>

              {/* Small decorative dots */}
              <span
                className="wif-pulse absolute bottom-[16%] left-[2%] z-20 h-2.5 w-2.5 rounded-full bg-emerald shadow-[0_0_0_4px_rgba(43,104,97,0.12)]"
                aria-hidden="true"
              />
              <span
                className="wif-pulse absolute right-[5%] top-[26%] z-20 h-2 w-2 rounded-full bg-gold"
                aria-hidden="true"
              />

              {/* Circular image */}
              <div className="group/img absolute inset-[7%] z-10 overflow-hidden rounded-full border-[5px] border-white bg-deep-teal shadow-[0_24px_60px_rgba(6,63,58,0.22)]">
                <Image
                  src="/images/home-banner-image.png"
                  alt="Pilgrims at Masjid al-Haram in Makkah"
                  fill
                  className="object-cover transition-transform duration-[900ms] ease-out group-hover/img:scale-[1.07]"
                  sizes="(max-width: 640px) 80vw, (max-width: 1024px) 420px, 480px"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-deep-teal/50 via-transparent to-transparent" />

                {/* Glossy highlight */}
                <div
                  className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 via-transparent to-transparent"
                  aria-hidden="true"
                />
              </div>

              {/* Floating glass chip: top-left */}
              <div className="absolute left-[-1%] top-[14%] z-30 sm:left-[-4%]">
                <div className="wif-float flex items-center gap-2 rounded-2xl border border-white/70 bg-white/80 px-3 py-2 shadow-[0_10px_28px_rgba(6,63,58,0.14)] backdrop-blur-md">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald/10 text-emerald">
                    <Compass size={15} strokeWidth={1.8} />
                  </span>
                  <span className="text-[10px] font-bold leading-3.5 text-deep-teal">
                    Step-by-Step
                    <br />
                    Guides
                  </span>
                </div>
              </div>

              {/* Floating glass chip: right */}
              <div className="absolute bottom-[24%] right-[-1%] z-30 sm:right-[-4%]">
                <div className="wif-float-delay flex items-center gap-2 rounded-2xl border border-white/70 bg-white/80 px-3 py-2 shadow-[0_10px_28px_rgba(6,63,58,0.14)] backdrop-blur-md">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gold/15 text-gold">
                    <ShieldCheck size={15} strokeWidth={1.8} />
                  </span>
                  <span className="text-[10px] font-bold leading-3.5 text-deep-teal">
                    Clear &amp;
                    <br />
                    Reliable
                  </span>
                </div>
              </div>

              {/* Badge overlapping the circle edge */}
              <div className="absolute bottom-[4%] left-1/2 z-30 -translate-x-1/2">
                <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-white/20 bg-deep-teal/90 px-4 py-2 text-[9px] font-bold uppercase tracking-[0.18em] text-white shadow-lg backdrop-blur-md">
                  <span className="wif-pulse h-1.5 w-1.5 rounded-full bg-gold" />
                  Your Journey Starts Here
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}