// app/tools/zakat-calculator/page.tsx
import type { Metadata } from "next"
import ToolHero from "@/components/Tools/tool-hero"
import ZakatCalculator from "@/components/Tools/ZakatCalculator"
import ToolArticle, { type ArticleSection } from "@/components/Tools/tool-article"
import ToolGuide, { type GuideSection } from "@/components/Tools/tool-guide"
import RelatedTools from "@/components/Tools/related-tools"
import ToolsFaq, { type FaqItem } from "@/components/Tools/tools-faq"

export const metadata: Metadata = {
  title: "Zakat Calculator | Manasik",
  description:
    "Work out your zakat with live gold and silver prices. Enter your assets and debts, choose gold or silver nisab, and see what is due in your own currency.",
}

const articleSections: ArticleSection[] = [
  {
    heading: "What is zakat?",
    paragraphs: [
      "Zakat is one of the five pillars of Islam. It is a fixed share of your wealth, given each year to those in need, and it purifies both your wealth and your heart.",
      "It is due on wealth that stays above a minimum level, called the nisab, for one full lunar year. The standard rate is 2.5 percent of your net wealth.",
    ],
  },
  {
    heading: "What counts towards your zakat",
    bullets: [
      "Cash in hand and money in bank accounts.",
      "Gold and silver you own, valued at today's price.",
      "Investments and shares.",
      "Business stock held for sale.",
      "Money owed to you that you expect to get back.",
      "Debts that are due now are deducted from your total.",
    ],
  },
  {
    heading: "Understanding the nisab",
    paragraphs: [
      "The nisab is the minimum amount of wealth before zakat becomes due. It is based on either 87.48 grams of gold or 612.36 grams of silver. The silver nisab is lower, so more people qualify when it is used, while the gold nisab is higher.",
      "Scholars differ on which to follow, so this calculator lets you choose. If you are unsure, ask a scholar you trust.",
    ],
  },
  {
    heading: "Why live prices matter",
    paragraphs: [
      "The nisab changes with the price of gold and silver, so a fixed figure goes out of date quickly. This calculator loads current prices in your chosen currency and lets you edit them if you prefer to use a different figure.",
    ],
  },
]

const guideSections: GuideSection[] = [
  {
    heading: "How to use the calculator",
    variant: "steps",
    items: [
      "Choose your currency and whether to base the nisab on silver or gold.",
      "Check today's gold and silver prices, and edit them if needed.",
      "Enter your cash, savings, gold, silver, investments and other assets.",
      "Enter any debts that are due now.",
      "Read your zakat due and the nisab on the summary.",
    ],
  },
  {
    heading: "How it helps you",
    variant: "highlight",
    items: [
      "Uses live gold and silver prices in your own currency.",
      "Shows clearly whether your wealth is above the nisab.",
      "Breaks down assets, debts and net wealth in one place.",
      "Free to use, with no sign-up.",
    ],
  },
  {
    heading: "Tips for best results",
    variant: "tips",
    items: [
      "Gather your bank balances and asset values before you start.",
      "Count only wealth you have held for a full lunar year.",
      "Ask a scholar if your situation is complex, such as business or pension assets.",
    ],
  },
  {
    heading: "Good to know",
    variant: "note",
    text: "This calculator is a guide only and does not replace the advice of a qualified scholar. Nothing you enter is saved or shared. Live prices may be unavailable at times, in which case you can type in today's prices yourself.",
  },
]

const faqs: FaqItem[] = [
  {
    question: "What is zakat and how much is due?",
    answer:
      "Zakat is one of the five pillars of Islam. It is a fixed share of your wealth, given each year to those in need. The standard rate is 2.5 percent of your net wealth, once your wealth has stayed above the nisab for one full lunar year.",
  },
  {
    question: "What is the nisab?",
    answer:
      "The nisab is the minimum amount of wealth before zakat becomes due. It is based on either 87.48 grams of gold or 612.36 grams of silver.",
  },
  {
    question: "Should I use the gold or silver nisab?",
    answer:
      "Scholars differ on this. The silver nisab is lower, so more people qualify when it is used, while the gold nisab is higher. The calculator lets you choose, and if you are unsure, ask a scholar you trust.",
  },
  {
    question: "What counts towards my zakat?",
    answer:
      "Cash and bank balances, gold and silver, investments and shares, business stock held for sale, and money owed to you that you expect to get back all count. Debts that are due now are deducted from your total.",
  },
  {
    question: "Does the calculator use live prices?",
    answer:
      "Yes. It loads current gold and silver prices in your chosen currency, and you can edit them. If live prices are unavailable, you can type in today's prices yourself.",
  },
  {
    question: "Is my data saved, and can I rely on the result?",
    answer:
      "Nothing you enter is saved or shared. The result is a guide only and does not replace the advice of a qualified scholar, especially for complex situations such as business or pension assets.",
  },
]

export default function ZakatCalculatorPage() {
  return (
    <div>
      <ToolHero
        title="Zakat"
        highlight="Calculator"
        description="Work out your zakat in minutes, using live gold and silver prices in your own currency."
      />

      <div className="bg-warm-white">
        <section className="mx-auto max-w-5xl px-4 pb-10 sm:px-6 lg:px-8">
          <ZakatCalculator />
        </section>

        <ToolArticle
          title="Calculate Your Zakat with Confidence"
          intro="A simple explanation of how zakat works, what counts towards it, and how to calculate what you owe."
          sections={articleSections}
        />

        <ToolGuide title="How to Use the Zakat Calculator" sections={guideSections} />
      </div>

      <RelatedTools
        keys={["inheritance-calculator", "ramadan-counter", "hijri-converter", "cost-estimator"]}
      />

      <ToolsFaq faqs={faqs} title="Zakat Calculator" highlight="FAQs" />
    </div>
  )
}