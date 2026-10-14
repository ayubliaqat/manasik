// src/components/Blog/post-faq-section.tsx
"use client"

import { useId, useState } from "react"
import { ChevronDown } from "lucide-react"
import type { PostFaq } from "@/db/schema"

export default function PostFaqSection({
  faqs,
  title = "Frequently Asked Questions",
}: {
  faqs: PostFaq[] | null | undefined
  title?: string
}) {
  const items = (faqs ?? []).filter(
    (faq) => faq.question.trim() && faq.answer.trim()
  )

  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const baseId = useId()

  if (items.length === 0) return null

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((faq) => ({
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
      aria-labelledby="post-faq-heading"
      className="bg-white py-10 sm:py-12 lg:py-14"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-8 text-center sm:mb-10 lg:mb-12">
          <h2
            id="post-faq-heading"
            className="
              text-balance
              font-serif
              text-[24px] font-medium
              leading-[1.15]
              tracking-[-0.015em]
              text-deep-teal
              sm:text-[28px]
              md:text-[32px]
              lg:text-[38px]
            "
          >
            {title}
          </h2>

          <svg
            aria-hidden="true"
            viewBox="0 0 120 10"
            preserveAspectRatio="none"
            fill="none"
            className="mx-auto mt-2 h-[6px] w-24 text-gold"
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
        </div>

        {/* Accordion */}
        <div className="flex flex-col gap-3 sm:gap-4">
          {items.map((faq, index) => {
            const isOpen = openIndex === index
            const buttonId = `${baseId}-q-${index}`
            const panelId = `${baseId}-a-${index}`

            return (
              <div
                key={`${faq.question}-${index}`}
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
                    onClick={() =>
                      setOpenIndex(isOpen ? null : index)
                    }
                    className={[
                      "group flex w-full items-center justify-between gap-4 px-4 py-4 text-left transition-colors duration-300 sm:px-5",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold/60",
                      isOpen ? "bg-deep-teal" : "bg-transparent",
                    ].join(" ")}
                  >
                    <span
                      className={[
                        "font-heading text-sm font-semibold leading-snug transition-colors duration-200 sm:text-[15px]",
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
                    <p className="whitespace-pre-line px-4 pb-5 pt-4 text-sm leading-6 text-muted-teal sm:px-5 sm:text-[15px]">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}