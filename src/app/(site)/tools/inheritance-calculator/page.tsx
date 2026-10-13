import type { Metadata } from "next"
import ToolHero from "@/components/Tools/tool-hero"
import InheritanceCalculator from "@/components/Tools/InheritanceCalculator"
import ToolArticle, { type ArticleSection } from "@/components/Tools/tool-article"
import ToolGuide, { type GuideSection } from "@/components/Tools/tool-guide"

export const metadata: Metadata = {
  title: "Islamic Inheritance Calculator (Faraid) | Manasik",
  description:
    "A free Islamic inheritance calculator. Enter the estate and the surviving family to see each heir's fixed share, with funeral costs, debts and the one-third bequest taken into account.",
}

const articleSections: ArticleSection[] = [
  {
    heading: "What is Islamic inheritance?",
    paragraphs: [
      "Islamic inheritance law, known as faraid or mirath, sets out who inherits from a Muslim and how much each heir receives. The main shares are given in Surah An-Nisa, and scholars have worked out how they apply when different relatives survive together.",
      "Before anything is shared, the estate pays for the funeral, then any debts. Up to one third of what remains can be given as a bequest (wasiyyah) to people who are not heirs. The rest is divided between the heirs.",
    ],
  },
  {
    heading: "How the shares work",
    paragraphs: [
      "Some relatives, such as a spouse, parents and daughters, receive a fixed fraction. Others, such as sons, take whatever remains after the fixed shares are paid. A daughter's share is half of a son's share when they inherit together.",
      "A closer relative can block a more distant one. For example, a son blocks brothers and sisters, and a father blocks his own father. When the fixed shares add up to more than the whole estate, each share is reduced in proportion. When they add up to less and there is no residuary heir, the remainder is returned to the heirs.",
    ],
  },
  {
    heading: "What this calculator covers",
    bullets: [
      "Husband or wives, sons and daughters, and the children of a son.",
      "Father, mother and grandparents.",
      "Full brothers and sisters, and half-siblings from the same father or the same mother.",
      "Funeral costs, debts and a bequest of up to one third.",
      "Exact fractions, percentages and amounts in pounds, dollars, euros or rupees.",
    ],
  },
  {
    heading: "Inheritance and the law in the UK",
    paragraphs: [
      "In the UK, a Muslim's estate is shared under the law of the country unless there is a valid will. To have your estate follow Islamic shares, you need a will that sets this out. A solicitor can help you write one, and a qualified scholar can confirm the shares for your family.",
    ],
  },
]

const guideSections: GuideSection[] = [
  {
    heading: "How to use the Inheritance Calculator",
    variant: "steps",
    items: [
      "Choose whether the person who passed away was male or female.",
      "Enter the total estate, and any funeral costs, debts and bequest.",
      "Tick each surviving relative, or use the plus and minus buttons where there can be more than one, such as sons or sisters.",
      "Confirm that everyone is Muslim and that no relative caused the death.",
      "Read the shares. Each heir shows a fraction, a percentage and an amount.",
      "Check the notes for any heirs who are blocked or any adjustments made.",
    ],
  },
  {
    heading: "How it helps you",
    variant: "highlight",
    items: [
      "Applies blocking, reductions and adjustments automatically.",
      "Shows exact fractions, so nothing is lost to rounding.",
      "Explains why a relative does not inherit.",
      "Free to use, with no sign-up.",
    ],
  },
  {
    heading: "Tips for best results",
    variant: "tips",
    items: [
      "Only add relatives who are alive when the person passes away.",
      "Count half-siblings under the right parent: same father or same mother.",
      "Check your figures for debts and funeral costs before you enter them.",
    ],
  },
  {
    heading: "Good to know",
    variant: "note",
    text: "This calculator gives general guidance and follows the Hanafi view where schools of thought differ. It does not cover relatives such as uncles or nephews, relatives of a different religion, a missing person, an unborn child, or other special situations in a family. It is not legal or religious advice, so please confirm the result with a qualified scholar and a solicitor. Nothing you enter is saved.",
  },
]

export default function InheritanceCalculatorPage() {
  return (
    <div>
      <ToolHero
        title="Inheritance"
        highlight="Calculator"
        description="Work out each heir's share under Islamic inheritance law, with funeral costs, debts and bequests taken into account."
      />

      <div className="bg-warm-white">
        <section className="mx-auto max-w-5xl px-4 pb-10 sm:px-6 lg:px-8">
          <InheritanceCalculator />
        </section>

        <ToolArticle
          title="Understand Your Family's Shares"
          intro="A simple guide to faraid, how the shares are worked out, and what this calculator covers."
          sections={articleSections}
        />

        <ToolGuide title="How to Use the Inheritance Calculator" sections={guideSections} />
      </div>
    </div>
  )
}