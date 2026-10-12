export type ArticleSection = {
  heading: string
  paragraphs?: string[]
  bullets?: string[]
}

export default function ToolArticle({
  title,
  intro,
  sections,
}: {
  title: string
  intro: string
  sections: ArticleSection[]
}) {
  return (
    <section className="mx-auto max-w-5xl px-4 pb-10 sm:px-6 lg:px-8">
      <article
        className="
          rounded-2xl border-[1.5px] border-deep-teal/60 bg-card p-5 sm:p-8
          shadow-[inset_0_0_14px_rgba(6,63,58,0.2),0_2px_4px_rgba(6,63,58,0.1),0_12px_26px_rgba(6,63,58,0.18)]
        "
      >
        <header>
          <h2 className="font-heading text-xl font-medium text-deep-teal sm:text-2xl">
            {title}
          </h2>
          <span className="mt-2 block h-[3px] w-10 rounded-full bg-gold" />
          <p className="mt-4 text-sm leading-7 text-charcoal/80 sm:text-base">
            {intro}
          </p>
        </header>

        {sections.map((section) => (
          <section key={section.heading} className="mt-7">
            <h3 className="font-heading text-base font-medium text-deep-teal sm:text-lg">
              {section.heading}
            </h3>

            {section.paragraphs?.map((p) => (
              <p
                key={p}
                className="mt-2 text-sm leading-7 text-charcoal/80 sm:text-base"
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
    </section>
  )
}