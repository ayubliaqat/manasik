import Image from "next/image"

const audience = [
  "First-time Hajj pilgrims",
  "Those preparing for Umrah",
  "Families travelling together",
  "New Muslims learning the rites",
  "Pilgrims seeking authentic guidance",
]

export default function WhoIsManasikFor() {
  return (
    <section className="relative overflow-hidden bg-[#faf8f3] py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* items-stretch: both columns share the same height on lg */}
        <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-stretch lg:gap-16">
          {/* Content */}
          <div className="flex max-w-xl flex-col lg:h-full">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-gold sm:text-xs">
              Hajj & Umrah Guides
            </p>

            <h2
              className="
                text-balance
                font-serif
                text-[28px]
                font-medium
                leading-[1.15]
                tracking-[-0.015em]
                text-deep-teal
                sm:text-[34px]
                md:text-[38px]
                lg:text-[44px]
              "
            >
              Who Is{" "}
              <span className="relative inline-block whitespace-nowrap text-emerald">
                Manasik For?
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

            <p className="mt-6 max-w-xl text-sm leading-7 text-muted-teal sm:text-[15px]">
              Manasik is for anyone who wants to approach Hajj or Umrah with
              greater understanding, preparation and confidence. Whether this
              is your first journey or you simply want to refresh your
              knowledge, our guides bring the essential information together
              in one clear place.
            </p>

            {/* Bullet list: single column, fixed gap */}
            <ul className="mt-7 flex flex-col gap-4">
              {audience.map((item) => (
                <li
                  key={item}
                  className="
                    flex items-center gap-3
                    text-sm font-medium
                    text-deep-teal
                  "
                >
                  <span
                    aria-hidden="true"
                    className="
                      flex h-5 w-5 shrink-0
                      items-center justify-center
                      rounded-full
                      bg-emerald/10
                      text-emerald
                      ring-1 ring-emerald/20
                    "
                  >
                    <svg
                      viewBox="0 0 12 12"
                      fill="none"
                      className="h-3 w-3"
                    >
                      <path
                        d="M2.25 6.1 4.8 8.5 9.75 3.5"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>

                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Organic Image */}
          <div className="relative mx-auto w-full max-w-[500px] lg:ml-auto lg:h-full">
            {/* Soft decorative shape behind image */}
            <div
              aria-hidden="true"
              className="
                absolute
                -right-5
                -top-5
                h-[82%]
                w-[78%]
                rounded-[58%_42%_52%_48%/42%_55%_45%_58%]
                bg-gold/[0.10]
              "
            />

            {/* Emerald curved accent */}
            <div
              aria-hidden="true"
              className="
                absolute
                -bottom-5
                -left-5
                h-[65%]
                w-[48%]
                rounded-[48%_52%_45%_55%/55%_42%_58%_45%]
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
                rounded-[48%_52%_44%_56%/56%_43%_57%_44%]
                bg-white
                shadow-[0_20px_50px_rgba(6,63,58,0.16)]
                lg:aspect-auto
                lg:h-full
                lg:min-h-[440px]
              "
            >
              <Image
                src="/images/whoisthisfor.jpg"
                alt="Muslim pilgrims preparing for Hajj and Umrah"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 90vw, 42vw"
              />
            </div>

            {/* Small moon-like decorative shape */}
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -bottom-2
                right-8
                h-12
                w-12
                rounded-full
                border-[7px]
                border-gold/30
                border-l-transparent
                border-b-transparent
                rotate-[-28deg]
              "
            />
          </div>
        </div>
      </div>
    </section>
  )
}