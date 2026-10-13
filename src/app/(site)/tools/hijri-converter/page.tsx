import type { Metadata } from "next"
import ToolHero from "@/components/Tools/tool-hero"
import HijriConverter from "@/components/Tools/HijriConverter"
import ToolArticle, { type ArticleSection } from "@/components/Tools/tool-article"
import ToolGuide, { type GuideSection } from "@/components/Tools/tool-guide"

export const metadata: Metadata = {
  title: "Hijri Date Converter | Manasik",
  description:
    "A free Hijri date converter. Change any Gregorian date to the Islamic date, or a Hijri date to Gregorian, with the month name in English and Arabic and a full month view.",
}

const articleSections: ArticleSection[] = [
  {
    heading: "What is the Hijri calendar?",
    paragraphs: [
      "The Hijri calendar is the Islamic lunar calendar. It has twelve months, and each month begins with the sighting of the new crescent moon, so a month lasts 29 or 30 days.",
      "Years are counted from the Hijra, the Prophet's migration from Makkah to Madinah, and are written with AH, which stands for Anno Hegirae.",
    ],
  },
  {
    heading: "Why the dates move",
    paragraphs: [
      "A Hijri year is about ten or eleven days shorter than a Gregorian year. Because of this, Islamic dates such as Ramadan and Eid fall about ten or eleven days earlier in the Gregorian calendar each year.",
      "The start of a month also depends on the moon sighting, so the date can differ by a day between countries and communities.",
    ],
  },
  {
    heading: "The twelve Islamic months",
    bullets: [
      "Muharram, Safar, Rabi' al-Awwal and Rabi' al-Thani.",
      "Jumada al-Ula, Jumada al-Thani, Rajab and Sha'ban.",
      "Ramadan, the month of fasting, and Shawwal, which begins with Eid al-Fitr.",
      "Dhul Qa'dah and Dhul Hijjah, the month of Hajj and Eid al-Adha.",
    ],
  },
  {
    heading: "Features of this converter",
    bullets: [
      "Converts Gregorian to Hijri, and Hijri to Gregorian.",
      "Shows today's Gregorian and Hijri date.",
      "Month names in English and Arabic, with the weekday.",
      "A month view with the Gregorian date under every Hijri day.",
      "A one-day adjustment either way to match your local moon sighting.",
      "Copy the result in one tap.",
    ],
  },
]

const guideSections: GuideSection[] = [
  {
    heading: "How to use the Hijri Date Converter",
    variant: "steps",
    items: [
      "Choose Gregorian to Hijri or Hijri to Gregorian.",
      "Enter the date you want to convert.",
      "Read the result, including the weekday and the Arabic month name.",
      "Use the month view to see the whole Hijri month with its Gregorian dates.",
      "Tap Copy to keep the result.",
    ],
  },
  {
    heading: "How it helps you",
    variant: "highlight",
    items: [
      "Converts in both directions on one page.",
      "Shows the Hijri and Gregorian dates side by side.",
      "Helps you plan around Ramadan, Hajj and Eid.",
      "Free to use, with no sign-up.",
    ],
  },
  {
    heading: "Tips for best results",
    variant: "tips",
    items: [
      "Tap Use today to jump back to today's date.",
      "Use the date adjustment if your country starts a month a day earlier or later.",
      "Check with your local mosque for the confirmed date of Ramadan and Eid.",
    ],
  },
  {
    heading: "Good to know",
    variant: "note",
    text: "This converter uses the Umm al-Qura calendar, the calendar used in Saudi Arabia. Dates are calculated in advance and may differ by a day from the date announced in your country. It supports Gregorian dates from 1900 to 2070 and Hijri years 1320 to 1490.",
  },
]

export default function HijriConverterPage() {
  return (
    <div>
      <ToolHero
        title="Hijri Date"
        highlight="Converter"
        description="Convert Gregorian dates to Hijri and back, with the month in English and Arabic and a full month view."
      />

      <div className="bg-warm-white">
        <section className="mx-auto max-w-5xl px-4 pb-10 sm:px-6 lg:px-8">
          <HijriConverter />
        </section>

        <ToolArticle
          title="Convert Islamic and Gregorian Dates"
          intro="A simple guide to the Hijri calendar, why Islamic dates move, and how to use this converter."
          sections={articleSections}
        />

        <ToolGuide title="How to Use the Hijri Date Converter" sections={guideSections} />
      </div>
    </div>
  )
}