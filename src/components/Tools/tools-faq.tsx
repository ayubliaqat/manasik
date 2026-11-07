// components/Tools/tools-faq.tsx
"use client"

import { useId, useState } from "react"
import { ChevronDown } from "lucide-react"

export type FaqItem = {
  question: string
  answer: string
}

type ToolsFaqProps = {
  faqs: FaqItem[]
  title?: string
  highlight?: string
  description?: string
  includeSchema?: boolean
}

export default function ToolsFaq({
  faqs,
  title = "Frequently Asked",
  highlight = "Questions",
  description = "Here are quick answers to the things people ask most. Can't find what you need? Send us a message and we'll help.",
  includeSchema = true,
}: ToolsFaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const baseId = useId()
  const headingId = `${baseId}-heading`

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }

  return (
    <section
      aria-labelledby={headingId}
      className="bg-white py-10 sm:py-12 lg:py-14"
    >
      {includeSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 xl:px-12">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-14">
          {/* Heading: left side */}
          <div className="text-center lg:sticky lg:top-28 lg:text-left">
            <h2
              id={headingId}
              className="
                text-balance
                font-heading
                text-[28px] font-bold
                leading-[1.2]
                tracking-[-0.02em]
                text-deep-teal
                sm:text-[34px]
                lg:text-[40px]
              "
            >
              <span className="text-gold-light">{title}</span>{" "}
              <span className="relative inline-block whitespace-nowrap text-emerald">
                {highlight}
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

            {description && (
              <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-muted-teal lg:mx-0">
                {description}
              </p>
            )}
          </div>

          {/* Accordion: right side */}
          <div className="flex flex-col gap-3 sm:gap-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index
              const buttonId = `${baseId}-q-${index}`
              const panelId = `${baseId}-a-${index}`

              return (
                <div
                  key={faq.question}
                  className={[
                    "overflow-hidden rounded-2xl border bg-card transition-all duration-300",
                    "shadow-[0_4px_0_rgba(6,63,58,0.10),0_10px_25px_rgba(6,63,58,0.10)]",
                    isOpen
                      ? "border-deep-teal"
                      : "border-emerald/35 hover:border-emerald/60",
                  ].join(" ")}
                >
                  <h3>
                    <button
                      type="button"
                      id={buttonId}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className={[
                        "group flex w-full items-center justify-between gap-4 px-4 py-4 text-left transition-colors duration-300 sm:px-5",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold/60",
                        isOpen ? "bg-deep-teal" : "bg-transparent",
                      ].join(" ")}
                    >
                      <span
                        className={[
                          "font-heading text-base font-semibold leading-snug transition-colors duration-200",
                          isOpen
                            ? "text-white"
                            : "text-charcoal group-hover:text-emerald",
                        ].join(" ")}
                      >
                        {faq.question}
                      </span>

                      <span
                        aria-hidden="true"
                        className={[
                          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full ring-1 transition-all duration-300",
                          isOpen
                            ? "bg-white/10 text-gold ring-gold/50"
                            : "bg-emerald/10 text-emerald ring-emerald/20",
                        ].join(" ")}
                      >
                        <ChevronDown
                          className={[
                            "h-4 w-4 transition-transform duration-300",
                            isOpen ? "rotate-180" : "",
                          ].join(" ")}
                        />
                      </span>
                    </button>
                  </h3>

                  {/* Smooth open and close */}
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    aria-hidden={!isOpen}
                    className={[
                      "grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none",
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                    ].join(" ")}
                  >
                    <div className="overflow-hidden">
                      <p className="px-4 pb-5 pt-4 text-[15px] leading-relaxed text-muted-teal sm:px-5">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}