import type { Metadata } from "next"
import ToolHero from "@/components/Tools/tool-hero"
import CostEstimator from "@/components/Tools/CostEstimator"
import ToolArticle, { type ArticleSection } from "@/components/Tools/tool-article"
import ToolGuide, { type GuideSection } from "@/components/Tools/tool-guide"

export const metadata: Metadata = {
  title: "Hajj and Umrah Cost Estimator | Manasik",
  description:
    "Estimate the total cost of your Hajj or Umrah trip, including flights, visa, hotels, food, transport and extras, in your own currency.",
}

const articleSections: ArticleSection[] = [
  {
    heading: "Why estimate your costs first",
    paragraphs: [
      "Hajj and Umrah cost more than a flight and a hotel. Visas, local transport, food, ziyarah and gifts all add up, and many pilgrims are surprised by the final figure.",
      "Working out a realistic budget before you book helps you choose the right package, save with a clear target, and avoid stress during the trip.",
    ],
  },
  {
    heading: "What the estimate includes",
    bullets: [
      "Flights: a return ticket for each traveller.",
      "Visa and permits: the cost per person.",
      "Hotels: nightly rates for Makkah and Madinah, multiplied by your nights and rooms.",
      "Food: a daily amount per person for the whole stay.",
      "Local transport, ziyarah and tours, gifts and other costs.",
      "A safety buffer, so unexpected costs don't catch you out.",
    ],
  },
  {
    heading: "Budgeting in your own currency",
    paragraphs: [
      "Choose from 20 currencies, and your amounts convert automatically using live exchange rates when you switch. Prices in Saudi Arabia are usually in riyals, so it helps to see the total in the currency you will actually be saving in.",
    ],
  },
  {
    heading: "Tips for a realistic budget",
    paragraphs: [
      "Use real quotes from your operator or booking sites instead of guesses. Prices change by season, and hotels close to the Haram cost more, especially during Ramadan and the Hajj period. Keep a buffer of at least 10 percent.",
    ],
  },
]

const guideSections: GuideSection[] = [
  {
    heading: "How to use the estimator",
    variant: "steps",
    items: [
      "Pick your currency and enter travellers and nights in Makkah and Madinah.",
      "Add flight and visa costs per person.",
      "Enter hotel rates per room per night, and the rooms you need.",
      "Fill in food, transport and extras.",
      "Check your total and per-person cost on the summary.",
    ],
  },
  {
    heading: "How it helps you",
    variant: "highlight",
    items: [
      "Shows your total and per-person cost in one place.",
      "Breaks the cost down so you see where the money goes.",
      "Converts between currencies using live rates.",
      "Free to use, with no sign-up.",
    ],
  },
  {
    heading: "Tips for best results",
    variant: "tips",
    items: [
      "Use real quotes, not guesses.",
      "Try different hotel options to compare totals.",
      "Keep the safety buffer at 10 percent or more.",
    ],
  },
  {
    heading: "Good to know",
    variant: "note",
    text: "This is an estimate only. Prices change by season and package, so confirm current rates before you book. Live exchange rates may be unavailable at times, in which case amounts are not converted when you change currency. Nothing you enter is saved or shared.",
  },
]

export default function CostEstimatorPage() {
  return (
    <div>
      <ToolHero
        title="Cost"
        highlight="Estimator"
        description="Estimate the full cost of your Hajj or Umrah trip, from flights and hotels to food and extras, in your own currency."
      />

      <div className="bg-warm-white">
        <section className="mx-auto max-w-5xl px-4 pb-10 sm:px-6 lg:px-8">
          <CostEstimator />
        </section>

        <ToolArticle
          title="Plan Your Hajj and Umrah Budget"
          intro="A clear, realistic budget makes the journey calmer. Here is what to include and how to estimate it."
          sections={articleSections}
        />

        <ToolGuide title="How to Use the Cost Estimator" sections={guideSections} />
      </div>
    </div>
  )
}