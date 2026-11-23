"use client"

import { useEffect, useState } from "react"
import type { ReactNode } from "react"

export function H3({ children }: { children: ReactNode }) {
  return (
    <h3 className="mt-7 text-lg font-semibold leading-snug text-deep-teal sm:text-xl">
      {children}
    </h3>
  )
}

export function P({ children }: { children: ReactNode }) {
  return (
    <p className="mt-4 text-[15px] leading-7 text-charcoal/90 sm:text-base sm:leading-8">
      {children}
    </p>
  )
}

export function UL({ items }: { items: ReactNode[] }) {
  return (
    <ul className="mt-4 space-y-2.5">
      {items.map((item, i) => (
        <li
          key={i}
          className="flex gap-3 text-[15px] leading-7 text-charcoal/90 sm:text-base"
        >
          <span
            aria-hidden="true"
            className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-gold"
          />
          <span className="min-w-0">{item}</span>
        </li>
      ))}
    </ul>
  )
}

export function DataTable({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <div className="mt-5 overflow-x-auto rounded-2xl border border-deep-teal/20 bg-white shadow-[0_2px_10px_rgba(6,63,58,0.08)]">
      <table className="w-full min-w-[320px] border-collapse text-left text-sm">
        <thead>
          <tr className="bg-deep-teal text-white">
            {head.map((h) => (
              <th key={h} scope="col" className="px-4 py-3 font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={i % 2 ? "bg-emerald/5" : "bg-white"}>
              {row.map((cell, j) => (
                <td
                  key={j}
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
  )
}

export function Formula({ lines }: { lines: string[] }) {
  return (
    <div className="mt-5 rounded-2xl border border-emerald/30 bg-emerald/10 px-4 py-4 sm:px-6">
      {lines.map((l) => (
        <p
          key={l}
          className="break-words font-serif text-[15px] font-medium text-deep-teal sm:text-lg"
        >
          {l}
        </p>
      ))}
    </div>
  )
}

export function Callout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mt-8 rounded-2xl border-l-4 border-gold bg-white px-4 py-4 shadow-[0_2px_10px_rgba(6,63,58,0.08)] sm:px-6">
      <p className="text-sm font-semibold text-deep-teal">{title}</p>
      <div className="mt-1.5 space-y-2 text-sm leading-7 text-charcoal/85">
        {children}
      </div>
    </div>
  )
}

export function RefCard({
  title,
  text,
  href,
  cta,
}: {
  title: string
  text: string
  href: string
  cta: string
}) {
  return (
    <div className="flex min-w-0 flex-col rounded-2xl border border-deep-teal/20 bg-white p-4 shadow-[0_2px_10px_rgba(6,63,58,0.08)]">
      <h3 className="text-[15px] font-semibold text-deep-teal">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-6 text-charcoal/85">{text}</p>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 text-sm font-semibold text-emerald underline-offset-4 hover:underline"
      >
        {cta}
      </a>
    </div>
  )
}

/* Collapsible section. All text stays in the HTML (crawlable); opens on TOC click. */
export function Section({
  id,
  title,
  defaultOpen = false,
  children,
}: {
  id: string
  title: string
  defaultOpen?: boolean
  children: ReactNode
}) {
  const [open, setOpen] = useState(defaultOpen)

  useEffect(() => {
    const check = () => {
      if (window.location.hash === `#${id}`) setOpen(true)
    }
    check()
    window.addEventListener("hashchange", check)
    return () => window.removeEventListener("hashchange", check)
  }, [id])

  return (
    <section id={id} className="mt-4 scroll-mt-24">
      <details
        open={open}
        onToggle={(e) => setOpen(e.currentTarget.open)}
        className="group rounded-2xl border border-deep-teal/20 bg-white/60 shadow-[0_2px_10px_rgba(6,63,58,0.06)] open:border-emerald/50 open:bg-transparent open:shadow-none"
      >
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-4 py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald/40 sm:px-6 [&::-webkit-details-marker]:hidden">
          <h2 className="min-w-0 text-balance font-serif text-[20px] font-medium leading-[1.25] tracking-[-0.01em] text-deep-teal sm:text-[24px] lg:text-[26px]">
            {title}
          </h2>
          <span
            aria-hidden="true"
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald/10 text-xl leading-none text-emerald transition-transform duration-200 group-open:rotate-45"
          >
            +
          </span>
        </summary>
        <div className="px-4 pb-6 sm:px-6">{children}</div>
      </details>
    </section>
  )
}

export function TableOfContents({ items }: { items: { id: string; label: string }[] }) {
  return (
    <nav
      aria-label="On this page"
      className="rounded-2xl border border-deep-teal/20 bg-white p-4 shadow-[0_2px_10px_rgba(6,63,58,0.08)] sm:p-5"
    >
      <p className="text-sm font-semibold text-deep-teal">On this page</p>
      <ol className="mt-3 grid grid-cols-1 gap-x-6 gap-y-1.5 sm:grid-cols-2">
        {items.map((item, i) => (
          <li key={item.id} className="min-w-0">
            <a
              href={`#${item.id}`}
              className="flex gap-2 py-1 text-sm leading-6 text-charcoal/90 hover:text-emerald"
            >
              <span className="w-5 shrink-0 font-semibold text-gold">{i + 1}.</span>
              <span className="min-w-0">{item.label}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}