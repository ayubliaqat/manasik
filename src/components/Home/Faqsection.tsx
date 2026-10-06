"use client"

import { useId, useState } from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "What is the difference between Hajj and Umrah?",
    answer:
      "Hajj is one of the five pillars of Islam. It is obligatory once in a lifetime for those who are able, and it is performed on fixed days in the month of Dhul Hijjah. Umrah is the lesser pilgrimage. It can be performed at any time of the year, and it does not replace the obligation of Hajj.",
  },
  {
    question: "Who is Hajj obligatory for?",
    answer:
      "Hajj is obligatory for every adult Muslim of sound mind who is physically and financially able to make the journey, including providing for the family left behind. It is required once in a lifetime, and any Hajj after that is voluntary.",
  },
  {
    question: "What do I need to prepare before I travel?",
    answer:
      "You will need a valid passport, a Hajj or Umrah visa arranged through authorised channels, the required vaccinations, travel insurance and your booked flights and accommodation. Requirements change from year to year, so always check the latest official guidance for your country before you book.",
  },
  {
    question: "What is Ihram and when do I enter it?",
    answer:
      "Ihram is the sacred state a pilgrim enters before starting Hajj or Umrah. You make the intention and begin saying the Talbiyah at or before the miqat, the boundary you must not pass without it. Men wear two simple unstitched white cloths, women wear modest everyday clothing, and certain actions become prohibited until you leave the state of Ihram.",
  },
  {
    question: "Are the guides on Manasik based on authentic sources?",
    answer:
      "Yes. Our guides are based on the Qur'an, the authentic Sunnah and trusted Islamic references. They are written to give you clear, practical help, but for a personal ruling on your own situation please ask a qualified scholar.",
  },
]

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const baseId = useId()

  return (
    <section
      aria-labelledby="faq-heading"
      className="bg-white py-10 sm:py-12 lg:py-14"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-8 text-center sm:mb-10 lg:mb-12">
          <h2
            id="faq-heading"
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
            Frequently Asked{" "}
            <span className="relative inline-block whitespace-nowrap text-emerald">
              Questions
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

        {/* Accordion */}
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
                        "font-heading text-sm font-semibold leading-snug transition-colors duration-200 sm:text-[15px]",
                        isOpen ? "text-white" : "text-charcoal group-hover:text-emerald",
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
                    <p className="px-4 pb-5 pt-4 text-sm leading-6.5 text-muted-teal sm:px-5 sm:text-[15px]">
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