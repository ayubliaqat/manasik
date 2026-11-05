// app/tools/ramadan-counter/page.tsx
import type { Metadata } from "next"
import ToolHero from "@/components/Tools/tool-hero"
import RamadanCounter from "@/components/Tools/RamadanCounter"
import ToolArticle, { type ArticleSection } from "@/components/Tools/tool-article"
import ToolGuide, { type GuideSection } from "@/components/Tools/tool-guide"
import RelatedTools from "@/components/Tools/related-tools"
import ToolsFaq, { type FaqItem } from "@/components/Tools/tools-faq"

export const metadata: Metadata = {
  title: "Ramadan Counter & Islamic Dates | Manasik",
  description:
    "A free Ramadan countdown with today's Islamic date, a Ramadan calendar, a fasting tracker, upcoming Islamic dates such as Eid and Arafah, and a Gregorian to Hijri date converter.",
}

const articleSections: ArticleSection[] = [
  {
    heading: "What is Ramadan?",
    paragraphs: [
      "Ramadan is the ninth month of the Islamic calendar. Muslims fast from dawn until sunset, and spend more time in prayer, reciting the Quran and giving charity.",
      "The Islamic calendar follows the moon, so Ramadan moves about ten or eleven days earlier in the Gregorian calendar each year.",
    ],
  },
  {
    heading: "The Islamic (Hijri) calendar",
    paragraphs: [
      "The Hijri calendar has twelve lunar months, each lasting 29 or 30 days, so its year is about eleven days shorter than the Gregorian year. Years are counted from the Hijri, the Prophet's migration to Madinah, and written with AH.",
      "This page shows today's Hijri date, and the Hijri date of every key day, so you can follow both calendars together.",
    ],
  },
  {
    heading: "When does Ramadan start?",
    paragraphs: [
      "A new month begins with the sighting of the new crescent moon, so the start of Ramadan can differ by a day between countries and communities.",
      "This counter uses the Umm al-Qura calendar, which is the calendar used in Saudi Arabia. Use the date adjustment if your country or local mosque starts a day earlier or later.",
    ],
  },
  {
    heading: "Features of this tool",
    bullets: [
      "A live countdown to the next Ramadan, then to Eid al-Fitr once Ramadan has begun.",
      "Today's Gregorian and Hijri date.",
      "A Ramadan calendar with the Hijri day and Gregorian date of every day, with the last ten days marked.",
      "A fasting tracker to tick off each day, saved on your device.",
      "Upcoming Islamic dates, including Eid al-Fitr, Hajj, the Day of Arafah and Eid al-Adha, each with a countdown.",
      "A date converter between Gregorian and Hijri dates.",
      "A one-day adjustment either way to match your local moon sighting.",
    ],
  },
  {
    heading: "Eid al-Fitr",
    paragraphs: [
      "Ramadan ends with Eid al-Fitr, the festival of breaking the fast, which begins on the first day of Shawwal. Like the start of Ramadan, the day of Eid depends on the moon sighting.",
    ],
  },
]

const guideSections: GuideSection[] = [
  {
    heading: "How to use the Ramadan Counter",
    variant: "steps",
    items: [
      "Check today's Hijri date and the countdown to the next Ramadan.",
      "If your country starts a day earlier or later, change the date adjustment.",
      "Open the Ramadan calendar and tap each day you fast to mark it.",
      "Use Islamic dates to see how long until Eid, Hajj and other key days.",
      "Use the converter to change any date between Gregorian and Hijri.",
    ],
  },
  {
    heading: "How it helps you",
    variant: "highlight",
    items: [
      "Shows exactly how long is left until Ramadan.",
      "Tracks which day of Ramadan you are on and how many days you have fasted.",
      "Lists upcoming Islamic dates with the Hijri and Gregorian date together.",
      "Free to use, with no sign-up.",
    ],
  },
  {
    heading: "Tips for best results",
    variant: "tips",
    items: [
      "Check with your local mosque for the confirmed start date.",
      "Use the adjustment to match the date your community follows.",
      "Mark each day after you finish your fast so your count stays accurate.",
    ],
  },
  {
    heading: "Good to know",
    variant: "note",
    text: "The dates are calculated in advance and may differ by a day from the date announced in your country, because each month begins with the sighting of the moon. Your fasting ticks are stored only in your browser on this device. Clearing your browser data, or using private browsing, will remove them.",
  },
]

const faqs: FaqItem[] = [
  {
    question: "When does Ramadan start?",
    answer:
      "A new month begins with the sighting of the new crescent moon, so the start of Ramadan can differ by a day between countries and communities. The counter shows the calculated date, and you should check with your local mosque for the confirmed start.",
  },
  {
    question: "Why does Ramadan move earlier each year?",
    answer:
      "The Islamic calendar follows the moon, and its year is about ten or eleven days shorter than the Gregorian year. Because of this, Ramadan falls about ten or eleven days earlier in the Gregorian calendar each year.",
  },
  {
    question: "Which calendar does the counter use?",
    answer:
      "It uses the Umm al-Qura calendar, which is the calendar used in Saudi Arabia. If your country or local mosque starts a day earlier or later, use the one-day date adjustment to match it.",
  },
  {
    question: "How does the fasting tracker work?",
    answer:
      "Open the Ramadan calendar and tap each day you fast to mark it. The tracker shows which day of Ramadan you are on and how many days you have fasted.",
  },
  {
    question: "Which Islamic dates does it show?",
    answer:
      "It lists upcoming dates including Eid al-Fitr, Hajj, the Day of Arafah and Eid al-Adha, each with a countdown and the Hijri and Gregorian date together. You can also convert any date between Gregorian and Hijri.",
  },
  {
    question: "Are my fasting ticks saved?",
    answer:
      "Yes, but only in your browser on this device. Clearing your browser data, or using private browsing, will remove them.",
  },
]

export default function RamadanCounterPage() {
  return (
    <div>
      <ToolHero
        title="Ramadan"
        highlight="Counter"
        description="Count down to Ramadan, follow each day, track your fasts, and see today's Islamic date and upcoming key dates."
      />

      <div className="bg-warm-white">
        <section className="mx-auto max-w-5xl px-4 pb-10 sm:px-6 lg:px-8">
          <RamadanCounter />
        </section>

        <ToolArticle
          title="Count Down to Ramadan"
          intro="A simple guide to when Ramadan starts, how the Islamic calendar works, and how to use this tool."
          sections={articleSections}
        />

        <ToolGuide title="How to Use the Ramadan Counter" sections={guideSections} />
      </div>

      <RelatedTools
        keys={["hijri-converter", "prayer-times", "zakat-calculator", "mosque-finder"]}
      />

      <ToolsFaq faqs={faqs} title="Ramadan Counter" highlight="FAQs" />
    </div>
  )
}