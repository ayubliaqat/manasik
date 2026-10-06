import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  Backpack,
  BookOpenCheck,
  HeartHandshake,
  MapPinned,
  UserRound,
  UsersRound,
} from "lucide-react"

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
]

export default function WhoIsItFor() {
  return (
    <section className="relative overflow-hidden bg-[#faf8f3] py-10 sm:py-12 lg:py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Image left, content right. items-stretch: both columns share the same height on lg */}
        <div className="grid gap-8 sm:gap-10 lg:grid-cols-[0.9fr_1fr] lg:items-stretch lg:gap-14">
          {/* Organic Image (second on mobile, first on lg) */}
          <div className="relative order-2 mx-auto w-full max-w-[500px] lg:order-1 lg:mx-0 lg:mr-auto lg:h-full">
            {/* Soft decorative shape behind image */}
            <div
              aria-hidden="true"
              className="
                absolute
                -left-5
                -top-5
                h-[82%]
                w-[78%]
                rounded-[42%_58%_48%_52%/55%_42%_58%_45%]
                bg-gold/[0.10]
              "
            />

            {/* Emerald curved accent */}
            <div
              aria-hidden="true"
              className="
                absolute
                -bottom-5
                -right-5
                h-[65%]
                w-[48%]
                rounded-[52%_48%_55%_45%/42%_55%_45%_58%]
                bg-emerald/[0.10]
              "
            />

            {/* Main organic image: fixed ratio on mobile, matches content height on lg */}
            <div
              className="
                relative
                aspect-[0.9]
                w-full
                overflow-hidden
                rounded-[52%_48%_56%_44%/56%_43%_57%_44%]
                bg-white
                shadow-[0_20px_50px_rgba(6,63,58,0.16)]
                lg:aspect-auto
                lg:h-full
                lg:min-h-[440px]
              "
            >
              <Image
                src="/images/home-banner-image.png"
                alt="Pilgrims at Masjid al-Haram in Makkah"
                fill
                className="object-cover"
                sizes="(max-width: 1023px) 92vw, 500px"
              />
            </div>

            {/* Small moon-like decorative shape */}
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -bottom-2
                left-8
                h-12
                w-12
                -scale-x-100
                rotate-[-28deg]
                rounded-full
                border-[7px]
                border-gold/30
                border-b-transparent
                border-l-transparent
              "
            />
          </div>

          {/* Content (first on mobile, second on lg) */}
          <div className="order-1 flex w-full max-w-xl flex-col lg:order-2 lg:ml-auto lg:h-full lg:justify-center">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-gold sm:text-xs">
              Who It&apos;s For
            </p>

            <h2
              className="
                text-balance
                font-serif
                text-[24px]
                font-medium
                leading-[1.15]
                tracking-[-0.015em]
                text-deep-teal
                sm:text-[28px]
                md:text-[32px]
                lg:text-[38px]
              "
            >
              Who Is{" "}
              <span className="relative inline-block whitespace-nowrap text-emerald">
                This For?
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

            <p className="mt-5 max-w-xl text-sm leading-[26px] text-muted-teal sm:text-[15px]">
              Manasik is for anyone preparing for Hajj or Umrah — whether
              you&apos;re going for the first time, travelling with family, or
              simply looking for clear and reliable guidance.
            </p>

            {/* Audience list: single column, each bullet keeps its own icon */}
            <ul className="mt-5 flex flex-col gap-3">
              {audiences.map(({ icon: Icon, title }) => (
                <li
                  key={title}
                  className="flex items-center gap-3 text-sm font-medium text-deep-teal"
                >
                  <span
                    aria-hidden="true"
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald/10 text-emerald ring-1 ring-emerald/20"
                  >
                    <Icon size={12} strokeWidth={2} />
                  </span>

                  {title}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="mt-6">
              <Link
                href="/guides"
                className="group relative inline-flex min-h-11 items-center gap-2.5 overflow-hidden rounded-full bg-deep-teal px-6 py-3 text-[12px] font-semibold text-white shadow-[0_4px_0_rgba(2,51,47,0.65),0_10px_22px_rgba(6,63,58,0.16)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-[#faf8f3]"
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
        </div>
      </div>
    </section>
  )
}