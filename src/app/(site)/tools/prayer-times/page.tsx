import type { Metadata } from "next"
import ToolHero from "@/components/Tools/tool-hero"
import PrayerTimes from "@/components/Tools/PrayerTimes"
import ToolArticle, { type ArticleSection } from "@/components/Tools/tool-article"
import ToolGuide, { type GuideSection } from "@/components/Tools/tool-guide"

export const metadata: Metadata = {
  title: "Prayer Times | Manasik",
  description:
    "Free daily prayer times for the UK and other regions. See Fajr, Sunrise, Dhuhr, Asr, Maghrib and Isha for your city, with a live countdown to the next prayer.",
}

const articleSections: ArticleSection[] = [
  {
    heading: "How prayer times are worked out",
    paragraphs: [
      "The five daily prayers are tied to the position of the sun. Fajr begins at dawn, Dhuhr after the sun passes its highest point, Asr in the afternoon, Maghrib at sunset and Isha once the evening twilight has gone.",
      "Because the sun rises and sets at different times through the year, prayer times change every day and are different in every city.",
    ],
  },
  {
    heading: "Why times can differ between sources",
    paragraphs: [
      "Scholars and organisations use different calculation methods, mainly for the sun angles used for Fajr and Isha. Asr also has two common calculations: the standard method, and the Hanafi method, which gives a later Asr.",
      "In the UK, summer nights are very short, so Fajr and Isha can be hard to define. Mosques often follow their own published timetable, so check with your local mosque if you want to match it.",
    ],
  },
  {
    heading: "Features of this tool",
    bullets: [
      "Region and city selector, with the United Kingdom chosen by default.",
      "Fajr, Sunrise, Dhuhr, Asr, Maghrib and Isha for today.",
      "Live countdown to the next prayer, in the time zone of the city you choose.",
      "Choice of standard or Hanafi Asr.",
      "Both the Gregorian and Hijri date.",
    ],
  },
  {
    heading: "Using it while travelling",
    paragraphs: [
      "When you travel for Hajj or Umrah, switch the region to Saudi Arabia and pick Makkah or Madinah to see the local times. The countdown always follows the city you have selected, not your phone's time zone.",
    ],
  },
]

const guideSections: GuideSection[] = [
  {
    heading: "How to use Prayer Times",
    variant: "steps",
    items: [
      "Choose your region. The United Kingdom is selected by default.",
      "Pick your city from the list.",
      "Choose Standard or Hanafi for the Asr time.",
      "Check today's times and the countdown to the next prayer.",
    ],
  },
  {
    heading: "How it helps you",
    variant: "highlight",
    items: [
      "Shows all five prayers and sunrise in one place.",
      "Counts down to the next prayer in your chosen city.",
      "Works for the UK and several other regions.",
      "Free to use, with no sign-up.",
    ],
  },
  {
    heading: "Tips for best results",
    variant: "tips",
    items: [
      "Choose the nearest city to you in the list.",
      "Pick Hanafi if you follow the Hanafi school for Asr.",
      "Compare with your local mosque timetable for jamaat times.",
    ],
  },
  {
    heading: "Good to know",
    variant: "note",
    text: "Times are calculated and may differ by a few minutes from your local mosque. Please follow your local mosque's timetable where it differs. An internet connection is needed to load the times.",
  },
]

export default function PrayerTimesPage() {
  return (
    <div>
      <ToolHero
        title="Prayer"
        highlight="Times"
        description="Daily prayer times for your city, with a live countdown to the next prayer. UK by default."
      />

      <div className="bg-warm-white">
        <section className="mx-auto max-w-5xl px-4 pb-10 sm:px-6 lg:px-8">
          <PrayerTimes />
        </section>

        <ToolArticle
          title="Know Your Prayer Times"
          intro="A simple guide to how prayer times are calculated, and why they can differ between sources."
          sections={articleSections}
        />

        <ToolGuide title="How to Use Prayer Times" sections={guideSections} />
      </div>
    </div>
  )
}