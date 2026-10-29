import Link from "next/link"
import type { ReactNode } from "react"

export type ArticleSubsection = {
  heading: string
  paragraphs?: string[]
  bullets?: string[]
}

export type ArticleSection = {
  heading: string
  paragraphs?: string[]
  numbered?: string[]
  bullets?: string[]
  subsections?: ArticleSubsection[]
}

function Squiggle({ className }: { className: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 120 10"
      preserveAspectRatio="none"
      fill="none"
      className={`pointer-events-none absolute left-1/2 top-full -translate-x-1/2 text-gold ${className}`}
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
  )
}

// Turns [text](/internal-path) into a Next.js link. Plain text is left as is.
function renderText(text: string): ReactNode[] {
  const pattern = /\[([^\]]+)\]\((\/[^)\s]*)\)/g
  const nodes: ReactNode[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index))
    }
    nodes.push(
      <Link
        key={`${match[2]}-${match.index}`}
        href={match[2]}
        className="font-semibold text-emerald underline decoration-gold decoration-2 underline-offset-4 transition-colors hover:text-deep-teal"
      >
        {match[1]}
      </Link>
    )
    lastIndex = match.index + match[0].length
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex))
  }

  return nodes
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
  // First half of the title in gold, second half in emerald
  const words = title.trim().split(/\s+/)
  const splitAt = Math.ceil(words.length / 2)
  const firstHalf = words.slice(0, splitAt).join(" ")
  const secondHalf = words.slice(splitAt).join(" ")

  return (
    <section className="mx-auto -mt-4 max-w-5xl px-4 pb-10 sm:-mt-6 sm:px-6 lg:px-8">
      {/* h2 — above the card */}
      <h2 className="mb-8 text-center font-serif text-xl font-bold leading-tight sm:mb-10 sm:text-2xl lg:text-3xl">
        <span className="text-gold">{firstHalf}</span>
        {secondHalf && (
          <>
            {" "}
            <span className="relative inline-block text-emerald">
              {secondHalf}
              <Squiggle className="mt-[0.05em] h-[0.18em] w-[70%]" />
            </span>
          </>
        )}
      </h2>

      <article
        className="
          rounded-2xl border-[1.5px] border-deep-teal/60 bg-card p-5 sm:p-8 lg:p-10
          shadow-[inset_0_0_14px_rgba(6,63,58,0.2),0_2px_4px_rgba(6,63,58,0.1),0_12px_26px_rgba(6,63,58,0.18)]
        "
      >
        <p className="text-sm leading-6 text-black/85">{renderText(intro)}</p>

        {sections.map((section) => (
          <section key={section.heading} className="mt-5 sm:mt-6">
            {/* h3 */}
            <h3 className="mb-3.5 font-heading text-base font-semibold leading-snug text-black sm:text-lg">
              {section.heading}
            </h3>

            <div className="space-y-3">
              {section.paragraphs?.map((p) => (
                <p key={p} className="text-sm leading-6 text-black/85">
                  {renderText(p)}
                </p>
              ))}
            </div>

            {section.numbered && (
              <ol className="mt-3 space-y-2">
                {section.numbered.map((item, index) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm leading-6 text-black/85"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald text-xs font-semibold text-white"
                    >
                      {index + 1}
                    </span>
                    <span>{renderText(item)}</span>
                  </li>
                ))}
              </ol>
            )}

            {section.bullets && (
              <ul className="mt-3 space-y-0.5">
                {section.bullets.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm leading-6 text-black/85"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full bg-emerald"
                    />
                    <span>{renderText(item)}</span>
                  </li>
                ))}
              </ul>
            )}

            {section.subsections?.map((sub) => (
              <div key={sub.heading} className="mt-4">
                {/* h4 */}
                <h4 className="mb-2.5 font-heading text-[0.9375rem] font-semibold leading-snug text-black">
                  {sub.heading}
                </h4>

                <div className="space-y-3">
                  {sub.paragraphs?.map((p) => (
                    <p key={p} className="text-sm leading-6 text-black/85">
                      {renderText(p)}
                    </p>
                  ))}
                </div>

                {sub.bullets && (
                  <ul className="mt-3 space-y-0.5">
                    {sub.bullets.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-sm leading-6 text-black/85"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full bg-emerald"
                        />
                        <span>{renderText(item)}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
        ))}
      </article>
    </section>
  )
}