// app/tools/page.tsx
import type { Metadata } from "next"
import AllTools from "@/components/Tools/alltools"
import ToolsFaq, { type FaqItem } from "@/components/Tools/tools-faq"

export const metadata: Metadata = {
  title: "Free Islamic Tools for Hajj, Umrah & Daily Life | Manasik",
  description:
    "Free Islamic tools in one place: prayer times, Qibla, Zakat and inheritance calculators, Hajj and Umrah planning, dhikr counter and more. Try them on Manasik.",
  alternates: {
    canonical: "/tools",
  },
  openGraph: {
    title: "Free Islamic Tools for Hajj, Umrah & Daily Life | Manasik",
    description:
      "Free Islamic tools in one place: prayer times, Qibla, Zakat and inheritance calculators, Hajj and Umrah planning, dhikr counter and more.",
    url: "/tools",
    siteName: "Manasik",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Islamic Tools for Hajj, Umrah & Daily Life | Manasik",
    description:
      "Free Islamic tools in one place: prayer times, Qibla, Zakat and inheritance calculators, Hajj and Umrah planning, dhikr counter and more.",
  },
}

const useCases = [
  "Plan your Hajj or Umrah preparations",
  "Make a packing list and estimate travel costs",
  "Check prayer times and find the Qibla",
  "Count your dhikr and explore the 99 Names of Allah",
  "Learn Quran reading basics with Noorani Qaida",
  "Work out an estimated Zakat amount or explore inheritance shares",
  "Convert Hijri dates and count down to Ramadan",
]

const accuracyTips = [
  "Enter the correct details.",
  "Follow the instructions on the tool.",
  "Check dates, rates and other information that may change.",
  "Ask a qualified expert when a calculation affects an important decision.",
]

const inheritanceFactors = [
  "Which relatives are still alive",
  "Any debts the person left behind",
  "Valid bequests",
  "The Islamic inheritance rules that apply",
]

const whoCanUse = [
  "Preparing for your first Hajj or Umrah",
  "Planning a trip with family",
  "Learning to read the Quran",
  "Checking prayer times or the Qibla",
  "Keeping track of dhikr",
  "Looking for help with Zakat or inheritance calculations",
]

const toolsFaqs: FaqItem[] = [
  {
    question: "Which tool should I start with for Hajj or Umrah?",
    answer:
      "Start with the Hajj or Umrah checklist so you know what needs doing, then move on to the packing list and the cost estimator. Once your plans take shape, the prayer times, Qibla and dhikr tools can support your worship along the way.",
  },
  {
    question: "How does the Qibla finder work?",
    answer:
      "It uses your location to work out the direction of the Kaaba from where you are. Allow location access, hold your phone flat and away from metal or magnets, and move it slowly until the direction settles.",
  },
  {
    question: "Why do prayer times differ between websites and apps?",
    answer:
      "Prayer times depend on your location and the calculation method used, especially for Fajr and Isha. If your local mosque follows a particular method, check that the settings match it.",
  },
  {
    question: "What is Nisab and why does it matter for Zakat?",
    answer:
      "Nisab is the minimum amount of wealth you must hold before Zakat becomes due. It is based on the value of gold or silver, so it changes with the market. Always check the current figure before you work out your Zakat.",
  },
  {
    question: "What is Noorani Qaida?",
    answer:
      "Noorani Qaida is a beginner's primer for learning to read the Quran. It teaches the Arabic letters, their sounds and the basic rules of recitation, step by step. It is a good starting point for children and adults who are new to reading Arabic.",
  },
  {
    question: "Why convert dates between Hijri and Gregorian?",
    answer:
      "The Islamic calendar follows the moon, so its months fall on different Gregorian dates each year. Converting helps you plan for Ramadan, Hajj and other occasions. Actual start dates can vary by a day depending on moon sighting.",
  },
]

const bodyClass = "mt-3 text-[14px] leading-7 text-muted-teal sm:text-[15px]"
const bodyClassTight = "mt-4 text-[14px] leading-7 text-muted-teal sm:text-[15px]"

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 space-y-2.5">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-3 text-[14px] leading-7 text-muted-teal sm:text-[15px]"
        >
          <span
            aria-hidden="true"
            className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-emerald"
          />
          <span className="min-w-0">{item}</span>
        </li>
      ))}
    </ul>
  )
}

function GuideHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-serif text-[18px] font-medium leading-snug text-deep-teal sm:text-[20px]">
      {children}
    </h3>
  )
}

export default function ToolsPage() {
  return (
    <main className="w-full overflow-x-hidden">
      {/* Hero */}
      <section className="relative overflow-hidden bg-deep-teal pb-14 pt-9 text-center sm:pb-16 sm:pt-11 lg:pb-20 lg:pt-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[-220px] h-[430px] w-[140%] -translate-x-1/2 rounded-[0_0_50%_50%] bg-white/[0.04]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[-240px] left-1/2 h-[400px] w-[130%] -translate-x-1/2 rounded-[50%_50%_0_0] bg-gold/[0.06]"
        />

        <div className="relative z-10 mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
          <span className="inline-block rounded-full border border-gold/50 px-3 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-gold">
            Free tools
          </span>

         <h1 className="mt-3 text-balance font-serif text-[34px] font-bold leading-[1.1] tracking-[-0.02em] sm:text-[44px] md:text-[48px] lg:text-[56px]">
  <span className="text-gold">Free Islamic</span>{" "}
  <span className="relative inline-block whitespace-nowrap text-[#2BB589]">
    Tools
    <svg
      aria-hidden="true"
      viewBox="0 0 120 10"
      preserveAspectRatio="none"
      fill="none"
      className="pointer-events-none absolute left-1/2 top-full mt-[0.05em] h-[0.2em] w-[70%] -translate-x-1/2 text-gold"
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
</h1>

          <p className="mx-auto mt-4 max-w-lg text-[13px] leading-6 text-white/75 sm:text-sm">
            Planning Hajj or Umrah? Need prayer times, or help learning to read
            the Quran? Manasik puts free Islamic tools in one place.
          </p>
        </div>

        <svg
          aria-hidden="true"
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="absolute bottom-0 left-0 h-[32px] w-full text-white sm:h-[48px] lg:h-[64px]"
        >
          <path
            fill="currentColor"
            d="M0 40 C120 80 240 80 360 50 C480 20 600 20 720 45 C840 70 960 70 1080 45 C1200 20 1320 20 1440 50 L1440 80 L0 80 Z"
          />
        </svg>
      </section>

      {/* All Tools */}
      <section className="w-full min-w-0 overflow-hidden">
        <AllTools />
      </section>

      {/* Guide */}
      <section
        aria-labelledby="tools-guide-heading"
        className="w-full min-w-0 bg-white px-4 pb-12 sm:px-6 sm:pb-14 lg:px-8 lg:pb-20"
      >
        <div className="mx-auto w-full max-w-4xl overflow-hidden rounded-2xl border border-emerald/35 bg-card shadow-[0_4px_0_rgba(6,63,58,0.10),0_10px_25px_rgba(6,63,58,0.10)]">
          <header className="bg-deep-teal px-5 py-8 text-center sm:px-8 sm:py-10 lg:px-12">
            <span className="inline-block rounded-full border border-gold/50 px-3 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-gold">
              Guide
            </span>
            <h2
              id="tools-guide-heading"
              className="mt-3 text-balance font-serif text-[22px] font-medium leading-[1.2] tracking-[-0.01em] text-white sm:text-[26px] lg:text-[30px]"
            >
              A Simple Guide to{" "}
              <span className="relative inline-block whitespace-nowrap text-[#2BB589]">
                Manasik Tools
                <svg
                  aria-hidden="true"
                  viewBox="0 0 120 10"
                  preserveAspectRatio="none"
                  fill="none"
                  className="pointer-events-none absolute left-1/2 top-full mt-[0.05em] h-[0.2em] w-[70%] -translate-x-1/2 text-gold"
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
          </header>

          <div className="px-5 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-14">
            <div className="mx-auto max-w-5xl space-y-10 sm:space-y-12">
              <article>
                <GuideHeading>What Can You Do With Manasik Tools?</GuideHeading>
                <p className={bodyClass}>
                  Everyone has different needs. You may be getting ready for
                  Umrah, learning the Quran or looking for help with an Islamic
                  calculation. Manasik offers tools for these tasks and more.
                </p>
                <p className={bodyClass}>You can use them to:</p>
                <BulletList items={useCases} />
                <p className={bodyClassTight}>
                  Choose the tool you need from the list above and follow its
                  instructions.
                </p>
              </article>

              <article>
                <GuideHeading>Are Manasik Tools Free to Use?</GuideHeading>
                <p className={bodyClass}>
                  We want useful Islamic resources to be easy to access. You can
                  explore the tools on this page and check each tool for any
                  costs or access requirements. Our aim is to help you find
                  practical support for pilgrimage planning and daily Islamic
                  practice in one place.
                </p>
              </article>

              <article>
                <GuideHeading>How Accurate Are Manasik Tools?</GuideHeading>
                <p className={bodyClass}>
                  A tool is only as useful as the information behind it and the
                  details you enter. We aim to make our tools clear and helpful,
                  but you should check important results before acting on them.
                </p>
                <p className={bodyClass}>For the best results:</p>
                <BulletList items={accuracyTips} />
                <p className={bodyClassTight}>
                  This is especially important for Zakat and inheritance where
                  personal circumstances and Islamic rulings can affect the
                  result.
                </p>
              </article>

              <article>
                <GuideHeading>Can You Calculate Zakat With Manasik?</GuideHeading>
                <p className={bodyClass}>
                  Manasik&apos;s Zakat Calculator is intended to help you work
                  out an estimate based on the information you enter. The result
                  may depend on your eligible wealth, debts, the Nisab value and
                  the calculation method used.
                </p>
                <p className={bodyClass}>
                  Before using the result, check whether the calculator covers
                  the assets and deductions that apply to you. If you own
                  different types of assets or are unsure about a ruling, speak
                  to a qualified scholar.
                </p>
              </article>

              <article>
                <GuideHeading>
                  Can You Calculate Inheritance Shares With Manasik?
                </GuideHeading>
                <p className={bodyClass}>
                  Not sure how an estate gets divided under Islamic law? Our
                  Inheritance Calculator shows you a rough split based on the
                  relatives you enter. It helps most when several family members
                  are involved and the shares get confusing.
                </p>
                <h4 className="mt-5 text-[15px] font-semibold text-emerald sm:text-[16px]">
                  What changes the final shares?
                </h4>
                <BulletList items={inheritanceFactors} />
                <p className={bodyClassTight}>
                  Use the result as a guide, not the final answer. Before you
                  share out any assets, ask a qualified Islamic inheritance
                  scholar to check the figures.
                </p>
              </article>

              <article>
                <GuideHeading>Who Can Use Manasik Tools?</GuideHeading>
                <p className={bodyClass}>
                  Manasik is for anyone looking for practical Islamic
                  resources. You do not need to use every tool. Start with the
                  one that meets your needs.
                </p>
                <p className={bodyClass}>Our tools may help if you are:</p>
                <BulletList items={whoCanUse} />
                <p className={bodyClassTight}>
                  Choose what works for you and use the guidance provided with
                  each tool.
                </p>
              </article>

              <article>
                <GuideHeading>Why Did We Create Manasik Tools?</GuideHeading>
                <p className={bodyClass}>
                  Finding a useful Islamic resource can take time when you have
                  to search across different websites. We created Manasik to
                  bring practical tools for pilgrimage planning, daily worship,
                  Quran learning and Islamic calculations together.
                </p>
                <p className={bodyClass}>
                  We want you to spend less time looking for resources and more
                  time using them. Each tool has a clear purpose whether you are
                  preparing for a journey or dealing with an everyday task.
                </p>
              </article>

              <article className="border-t border-emerald/20 pt-10 text-center sm:pt-12">
                <GuideHeading>Find the Tool You Need</GuideHeading>
                <p className="mx-auto mt-3 max-w-xl text-[14px] leading-7 text-muted-teal sm:text-[15px]">
                  Ready to get started? Browse the tools listed above and choose
                  the one that fits your needs. Whether you are planning your
                  pilgrimage, learning something new or working through a
                  calculation, Manasik is here to help you find a useful place
                  to start.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <ToolsFaq faqs={toolsFaqs} title="Tools" highlight="FAQs" />
    </main>
  )
}