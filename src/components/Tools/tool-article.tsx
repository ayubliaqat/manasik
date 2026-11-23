import Link from "next/link"
import type { ReactNode } from "react"

export type ArticleTable = {
  intro?: string
  head: string[]
  rows: string[][]
  after?: string[]
}

export type ArticleSubsection = {
  heading: string
  paragraphs?: string[]
  bullets?: string[]
  table?: ArticleTable
  closing?: string[]
}

export type ArticleSection = {
  heading: string
  paragraphs?: string[]
  numbered?: string[]
  bullets?: string[]
  table?: ArticleTable
  subsections?: ArticleSubsection[]
  closing?: string[]
}

function Squiggle({ className }: { className: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 120 10"
      preserveAspectRatio="none"
      fill="none"
      className={`pointer-events-none absolute left-1/2 top-full -translate-x-1/2 ${className}`}
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

const linkClass =
  "font-semibold text-emerald underline decoration-gold decoration-2 underline-offset-4 transition-colors hover:text-deep-teal"

// Turns [text](/internal-path) into a Next.js link and [text](https://...) into an external link.
// Plain text is left as is.
function renderText(text: string): ReactNode[] {
  const pattern = /\[([^\]]+)\]\(((?:\/|https?:\/\/)[^)\s]*)\)/g
  const nodes: ReactNode[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index))
    }

    const href = match[2]
    nodes.push(
      href.startsWith("/") ? (
        <Link key={`${href}-${match.index}`} href={href} className={linkClass}>
          {match[1]}
        </Link>
      ) : (
        <a
          key={`${href}-${match.index}`}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          {match[1]}
        </a>
      )
    )
    lastIndex = match.index + match[0].length
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex))
  }

  return nodes
}

const bodyText = "text-[15px] leading-relaxed text-charcoal"

function Paragraphs({ items, className }: { items?: string[]; className?: string }) {
  if (!items?.length) return null
  return (
    <div className={className ?? "space-y-3"}>
      {items.map((p) => (
        <p key={p} className={bodyText}>
          {renderText(p)}
        </p>
      ))}
    </div>
  )
}

function Bullets({ items }: { items?: string[] }) {
  if (!items?.length) return null
  return (
    <ul className="mt-3 space-y-1">
      {items.map((item) => (
        <li key={item} className={`flex items-start gap-3 ${bodyText}`}>
          <span
            aria-hidden="true"
            className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-emerald"
          />
          <span>{renderText(item)}</span>
        </li>
      ))}
    </ul>
  )
}

function Table({ table }: { table?: ArticleTable }) {
  if (!table) return null
  return (
    <div className="mt-4">
      <Paragraphs items={table.intro ? [table.intro] : undefined} />
      <div className="mt-3 overflow-x-auto rounded-xl border border-deep-teal/20 bg-white shadow-[0_2px_10px_rgba(6,63,58,0.08)]">
        <table className="w-full min-w-[280px] border-collapse text-left text-sm">
          <thead>
            <tr className="bg-deep-teal text-white">
              {table.head.map((h) => (
                <th key={h} scope="col" className="px-4 py-3 font-semibold">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, i) => (
              <tr key={row.join("|")} className={i % 2 ? "bg-emerald/5" : "bg-white"}>
                {row.map((cell, j) => (
                  <td
                    key={`${cell}-${j}`}
                    className={`px-4 py-3 text-charcoal ${j === 0 ? "font-medium" : ""}`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Paragraphs items={table.after} className="mt-3 space-y-3" />
    </div>
  )
}

export default function ToolArticle({
  title,
  highlight,
  badge,
  intro,
  sections,
}: {
  title: string
  highlight?: string
  badge?: string
  intro?: string
  sections: ArticleSection[]
}) {
  // Gold lead + white highlight. If no highlight is passed, split the title in half.
  let lead = title.trim()
  let accent = highlight?.trim() ?? ""
  if (!accent) {
    const words = lead.split(/\s+/)
    const splitAt = Math.ceil(words.length / 2)
    lead = words.slice(0, splitAt).join(" ")
    accent = words.slice(splitAt).join(" ")
  }

  return (
    <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
      <article
        className="
          overflow-hidden rounded-2xl border-[1.5px] border-deep-teal/60 bg-card
          shadow-[inset_0_0_14px_rgba(6,63,58,0.2),0_2px_4px_rgba(6,63,58,0.1),0_12px_26px_rgba(6,63,58,0.18)]
        "
      >
        {/* h2: header attached to the card */}
        <header className="bg-deep-teal px-5 py-8 text-center sm:px-8 sm:py-10 lg:px-12">
          {badge && (
            <span className="inline-block rounded-full border border-gold/50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-gold-light">
              {badge}
            </span>
          )}
          <h2
            className={`${
              badge ? "mt-4 " : ""
            }text-balance font-heading text-[28px] font-bold leading-[1.2] tracking-[-0.02em] sm:text-[34px] lg:text-[40px]`}
          >
            <span className="text-gold-light">{lead}</span>
            {accent && (
              <>
                {lead && " "}
                <span className="relative inline-block whitespace-nowrap text-white">
                  {accent}
                  <Squiggle className="mt-[0.05em] h-[0.2em] w-[70%] text-white" />
                </span>
              </>
            )}
          </h2>
        </header>

        <div className="p-5 sm:p-8 lg:p-10">
          {intro && <p className={bodyText}>{renderText(intro)}</p>}

          {sections.map((section) => (
            <section
              key={section.heading}
              className="mt-6 first:mt-0 sm:mt-8 sm:first:mt-0"
            >
              {/* h3 */}
              <h3 className="mb-3.5 font-heading text-lg font-semibold leading-snug text-deep-teal sm:text-xl">
                {section.heading}
              </h3>

              <Paragraphs items={section.paragraphs} />

              {section.numbered && (
                <ol className="mt-3 space-y-2">
                  {section.numbered.map((item, index) => (
                    <li key={item} className={`flex items-start gap-3 ${bodyText}`}>
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

              <Bullets items={section.bullets} />
              <Table table={section.table} />

              {section.subsections?.map((sub) => (
                <div key={sub.heading} className="mt-5">
                  {/* h4 */}
                  <h4 className="mb-2.5 font-heading text-base font-semibold leading-snug text-deep-teal">
                    {sub.heading}
                  </h4>

                  <Paragraphs items={sub.paragraphs} />
                  <Bullets items={sub.bullets} />
                  <Table table={sub.table} />
                  <Paragraphs items={sub.closing} className="mt-3 space-y-3" />
                </div>
              ))}

              <Paragraphs items={section.closing} className="mt-3 space-y-3" />
            </section>
          ))}
        </div>
      </article>
    </section>
  )
}