export type ArticleSection = {
  heading: string
  paragraphs?: string[]
  bullets?: string[]
}

type PageContentProps = {
  /** First part of the h2 (gold) */
  titleGold: string
  /** Second part of the h2 (emerald, with the wavy gold underline) */
  titleEmerald: string
  intro: string
  sections: ArticleSection[]
}

export default function PageContent({
  titleGold,
  titleEmerald,
  intro,
  sections,
}: PageContentProps) {
  return (
    <section className="bg-white py-10 sm:py-12 lg:py-14">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Heading above the card */}
        <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-10">
          <h2
            className="
              text-balance
              font-serif
              text-[28px] font-bold
              leading-[1.1]
              tracking-[-0.02em]
              text-deep-teal
              sm:text-[34px]
              md:text-[38px]
              lg:text-[46px]
            "
          >
            <span className="text-gold">{titleGold}</span>{" "}
            <span className="relative inline-block whitespace-nowrap text-emerald">
              {titleEmerald}
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
        </div>

        {/* Card */}
        <article
          className="
            rounded-2xl border-[1.5px] border-deep-teal/60 bg-card p-5 sm:p-8
            shadow-[inset_0_0_14px_rgba(6,63,58,0.2),0_2px_4px_rgba(6,63,58,0.1),0_12px_26px_rgba(6,63,58,0.18)]
          "
        >
          <p className="text-sm leading-7 text-charcoal/80 sm:text-base">
            {intro}
          </p>

          {sections.map((section) => (
            <section key={section.heading} className="mt-8">
              <h3 className="flex items-center gap-3 font-serif text-[19px] font-bold leading-snug tracking-[-0.01em] text-deep-teal sm:text-[22px]">
                <span
                  aria-hidden="true"
                  className="h-5 w-[3px] shrink-0 rounded-full bg-gold sm:h-6"
                />
                {section.heading}
              </h3>

              {section.paragraphs?.map((p) => (
                <p
                  key={p}
                  className="mt-2.5 text-sm leading-7 text-charcoal/80 sm:text-base"
                >
                  {p}
                </p>
              ))}

              {section.bullets && (
                <ul className="mt-3 space-y-2">
                  {section.bullets.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm leading-7 text-charcoal/80 sm:text-base"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-emerald"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </article>
      </div>
    </section>
  )
}