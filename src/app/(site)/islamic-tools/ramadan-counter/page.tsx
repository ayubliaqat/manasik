// app/tools/ramadan-counter/page.tsx
import type { Metadata } from "next";
import ToolHero from "@/components/Tools/tool-hero";
import RamadanCounter from "@/components/Tools/RamadanCounter";
import ToolArticle, {
  type ArticleSection,
} from "@/components/Tools/tool-article";
import ToolGuide, { type GuideSection } from "@/components/Tools/tool-guide";
import RelatedTools from "@/components/Tools/related-tools";
import ToolsFaq, { type FaqItem } from "@/components/Tools/tools-faq";

export const metadata: Metadata = {
  title: "Ramadan Counter – Countdown, Fasting Tracker & Islamic Dates | Islam Religion",
  description:
    "Use our free Ramadan counter to see how long until Ramadan, track your fasts, check Islamic dates and convert Hijri and Gregorian dates.",
  keywords: [
    "Ramadan counter",
    "Ramadan countdown",
    "days until Ramadan",
    "how many days until Ramadan",
    "Ramadan calendar",
    "Ramadan fasting tracker",
    "Eid al-Fitr countdown",
    "Islamic dates",
    "Hijri date today",
    "Umm al-Qura calendar",
  ],
  alternates: {
    canonical: "https://www.islam-religion.com/islamic-tools/ramadan-counter",
  },
  openGraph: {
    title: "Ramadan Countdown & Fasting Tracker | Ramadan Counter",
    description:
      "How long until Ramadan? Count down the days, see today's Hijri date, tick off each fast and check Eid and Arafah dates. Free, with a date converter.",
    url: "https://www.islam-religion.com/islamic-tools/ramadan-counter",
    siteName: "Islam Religion",
    type: "website",
  },
};

const articleSections: ArticleSection[] = [
  {
    heading: "What Is the Ramadan Counter?",
    paragraphs: [
      "You can use the Ramadan counter before, during and after the holy month. Before Ramadan, watch the countdown and get ready for the expected start date. Once Ramadan begins, use the fasting tracker to record each day and see how many days are left until Eid al-Fitr.",
      "Follow these steps to get started:",
    ],
    bullets: [
      "Step 1: Check today's Hijri date and Ramadan countdown.",
      "Step 2: Adjust the date to match your local calendar.",
      "Step 3: Open the Ramadan calendar.",
      "Step 4: Mark each completed fast.",
      "Step 5: Check upcoming Islamic dates.",
      "Step 6: Convert Hijri and Gregorian dates.",
    ],
  },
  {
    heading: "What You Can Do with This Ramadan Counter",
    paragraphs: [
      "Following Ramadan dates and your daily fasts is easier when everything sits in one place. This tool puts a countdown, a calendar and a fasting tracker together, so you don't have to jump between pages.",
      "Here are the main features you can use:",
    ],
    bullets: [
      "Live Ramadan countdown",
      "Eid al-Fitr countdown",
      "Today's Hijri date",
      "Daily Ramadan calendar",
      "Personal fasting tracker",
      "Last ten nights tracker",
      "Upcoming Islamic dates",
      "Hijri date converter",
      "One-day date adjustment",
    ],
    closing: [
      "Want to check the direction of the Kaaba for Salah? Try our [Qibla Finder](/islamic-tools/qibla-direction). You can also follow the daily prayer schedule with our [Prayer Times](/islamic-tools/prayer-times) tool.",
    ],
  },
  {
    heading: "Tips for Using the Ramadan Counter",
    paragraphs: [
      "A little preparation keeps you organised all through Ramadan. Check the expected dates before the month starts, record each fast you complete and keep an eye on the occasions ahead. Do that, and the counter becomes part of your daily routine.",
      "Here are a few simple ways to use it:",
    ],
    bullets: [
      "Check the countdown regularly",
      "Confirm dates with your local mosque",
      "Adjust the calendar when needed",
      "Mark your completed fasts",
      "Check the last ten nights",
      "Follow upcoming Islamic dates",
      "Review your fasting progress",
    ],
    closing: [
      "You can also use our [Tasbih Counter](/islamic-tools/tasbih-counter) to keep count of your daily dhikr and remember Allah.",
    ],
  },
  {
    heading: "Countdown to Ramadan",
    paragraphs: [
      "Ramadan is the ninth month of the Islamic calendar, and one of the most important times of the year for Muslims. It is a month of fasting, prayer, Quran recitation, charity and asking Allah for forgiveness.",
      "The countdown shows how much time is left before the expected start of Ramadan, in days, hours, minutes and seconds, while you get ready for the holy month.",
    ],
  },
  {
    heading: "What Is Ramadan?",
    paragraphs: [
      "Ramadan is the ninth month of the Islamic calendar. Adult Muslims who are required to fast stay away from food, drink and other things that break the fast, from dawn until sunset.",
      "But Ramadan is about more than food and drink. It is also a time to worship more, recite the Quran, give charity and ask Allah for forgiveness.",
      "Allah says in the Quran:",
      "\u201cO you who believe! Fasting is prescribed for you as it was prescribed for those before you, so that you may become righteous.\u201d",
      "Surah Al-Baqarah (2:183)",
      "Muslims welcome Ramadan as a chance to strengthen their faith, improve their habits and spend more time in worship.",
    ],
  },
  {
    heading: "The Islamic (Hijri) Calendar",
    paragraphs: [
      "The Islamic calendar, also called the Hijri calendar, follows the cycles of the moon. It has twelve months, and each one lasts 29 or 30 days.",
      "It starts with Muharram and ends with Dhul Hijjah. The Gregorian calendar follows the sun, but the Islamic calendar follows the moon, so its year is about 10 to 11 days shorter.",
      "That's why Ramadan moves earlier on the Gregorian calendar every year, and why it lands in different seasons over time.",
      "The Hijri calendar also tells Muslims when to observe key religious dates, including Ramadan, Eid al-Fitr, Hajj, the Day of Arafah and Eid al-Adha.",
      "Need the Gregorian date for a Hijri date, or the other way round? Use our [Hijri Date Converter](/islamic-tools/hijri-date-converter) to switch between the two calendars.",
    ],
  },
  {
    heading: "When Does Ramadan Start?",
    paragraphs: [
      "Ramadan begins on the first day of the ninth Islamic month. Muslims decide when a month starts by looking for the new crescent moon.",
      "The expected date can differ between countries and communities. Some follow local moon sightings. Others follow announcements from recognised Islamic authorities, or use calculated calendars.",
      "Our Ramadan Counter uses the Saudi Umm al-Qura calendar to work out the expected date in advance. That gives you an estimated countdown, so you can start preparing for the holy month.",
      "Please remember: the date the counter shows is calculated in advance. It is not a final religious announcement. The confirmed start of Ramadan depends on the crescent moon sighting and the official announcement of the recognised Islamic authority in your country or community. The actual date may be a day earlier or later.",
      "Use the date adjustment buttons to move the dates on the page forward or back by one day, so they match the calendar your local community follows.",
    ],
  },
  {
    heading: "Why Does Ramadan Move Earlier Every Year?",
    paragraphs: [
      "Ever noticed that Ramadan doesn't start on the same Gregorian date each year? The Islamic calendar follows the moon, while the Gregorian calendar follows the sun.",
      "A lunar year has about 354 or 355 days. A Gregorian year has 365 or 366. That gap pushes Ramadan about 10 or 11 days earlier on the Gregorian calendar every year.",
      "Over time, Ramadan moves through all four seasons. Some years it falls in summer, and some years in winter.",
      "Our Ramadan countdown uses calculated Islamic calendar dates, so you can follow that yearly shift.",
    ],
  },
  {
    heading: "Eid al-Fitr",
    paragraphs: [
      "Eid al-Fitr marks the end of Ramadan. It falls on the first day of Shawwal, the tenth month of the Islamic calendar.",
      "Muslims mark the day with special Eid prayers, time with family, charity and gratitude to Allah. Before the Eid prayer, they give Zakat al-Fitr, which helps people in need join the celebration.",
      "The expected date of Eid al-Fitr is calculated in advance, but the confirmed date depends on sighting the new crescent moon of Shawwal. Different countries and communities may celebrate Eid on different days.",
      "Once Ramadan begins, our counter switches to an Eid al-Fitr countdown, so you can see how long is left until the celebration.",
    ],
  },
  {
    heading: "Important Islamic Dates After Ramadan",
    paragraphs: [
      "Several important occasions follow Ramadan in the Islamic calendar. These dates help Muslims prepare for worship, religious events and gatherings through the year.",
      "Our Islamic dates section lists upcoming occasions with their Hijri and Gregorian dates. Use it to follow the Islamic year and prepare for key days in advance.",
      "Some important dates include:",
    ],
    bullets: [
      "Eid al-Fitr: 1 Shawwal",
      "Hajj days: 8–13 Dhul Hijjah",
      "Day of Arafah: 9 Dhul Hijjah",
      "Eid al-Adha: 10 Dhul Hijjah",
    ],
    closing: [
      "These Hijri dates are fixed. Their Gregorian dates change every year, because the Islamic calendar follows the moon.",
      "The Gregorian dates on the counter are calculated estimates. Moon sightings and announcements from recognised local Islamic authorities may confirm different dates.",
      "Preparing for pilgrimage? Our [Hajj Guide](/hajj-guide) covers the journey and its rituals. You can also read our [Umrah Guide](/umrah-guide) to learn the steps and how to prepare for Umrah.",
    ],
  },
  {
    heading: "More Free Islamic Tools",
    paragraphs: [
      "Islam Religion offers more than a Ramadan countdown. You can explore our other free tools for daily worship, religious calculations, prayer preparation and important dates through the Islamic year.",
      "Here are some tools you may find useful:",
    ],
    bullets: [
      "[Qibla Finder](/islamic-tools/qibla-direction): Find the direction of the Kaaba from your location.",
      "[Prayer Times](/islamic-tools/prayer-times): Check the five daily prayer times.",
      "[Tasbih Counter](/islamic-tools/tasbih-counter): Count your daily dhikr and remembrance.",
      "[Zakat Calculator](/islamic-tools/zakat-calculator): Estimate the Zakat due on your eligible wealth.",
      "[Islamic Inheritance Calculator](/islamic-tools/inheritance-calculator): Explore Islamic inheritance shares.",
      "[Mosque Finder](/islamic-tools/mosque-finder): Find mosques near your location.",
      "[Hajj and Umrah Cost Estimator](/islamic-tools/hajj-umrah-cost-estimator): Estimate the costs of your pilgrimage.",
      "[Hajj Packing Checklist](/islamic-tools/hajj-packing-checklist): Prepare the items you need for Hajj.",
      "[Umrah Packing Checklist](/islamic-tools/umrah-packing-checklist): Organise your essentials before travelling.",
    ],
    closing: [
      "Use these tools whenever you need help with your daily Islamic activities and preparations.",
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
];

const faqs: FaqItem[] = [
  {
    question: "How many days are left until Ramadan?",
    answer:
      "The counter shows a live countdown in days, hours, minutes and seconds. Once Ramadan begins, it switches to a countdown to Eid al-Fitr. The date is calculated in advance, so check with your local mosque for the confirmed start.",
  },
  {
    question: "When does Ramadan start?",
    answer:
      "A new Islamic month begins with the sighting of the new crescent moon. That means Ramadan can start a day earlier or later depending on your country or community. The counter shows the calculated date, and your local mosque confirms the real one.",
  },
  {
    question: "Why does Ramadan move earlier every year?",
    answer:
      "The Islamic calendar follows the moon, and its year is about ten or eleven days shorter than the Gregorian year. So Ramadan lands about ten or eleven days earlier on the Gregorian calendar each year.",
  },
  {
    question: "Which calendar does the Ramadan counter use?",
    answer:
      "It uses the Umm al-Qura calendar, which Saudi Arabia follows. If your country or mosque starts a day earlier or later, use the date adjustment to move every date on the page by one day.",
  },
  {
    question: "How does the fasting tracker work?",
    answer:
      "Open the Ramadan calendar and tap each day you fast to mark it. The tracker shows which day of Ramadan you are on and how many days you have fasted. Days that have not arrived yet are locked, so you can only tick a day once it has come.",
  },
  {
    question: "Which Islamic dates does the tool show?",
    answer:
      "It lists upcoming dates including Eid al-Fitr, Hajj, the Day of Arafah and Eid al-Adha. Each one has a countdown and shows the Hijri and Gregorian dates together. You can also convert any date between Gregorian and Hijri.",
  },
  {
    question: "Does the counter save my fasting ticks?",
    answer:
      "Yes, in your browser on the device you use. If you clear your browser data or use private browsing, your ticks disappear. They do not move to another device on their own.",
  },
  {
    question: "Is the Ramadan counter free?",
    answer: "Yes. You do not need to sign up or create an account.",
  },
];
const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Ramadan Countdown & Fasting Tracker | Ramadan Counter",
  url: "https://www.islam-religion.com/islamic-tools/ramadan-counter",
  description:
    "How long until Ramadan? Count down the days, see today's Hijri date, tick off each fast and check Eid and Arafah dates. Free, with a date converter.",
  inLanguage: "en",
  isPartOf: {
    "@type": "WebSite",
    name: "Islam Religion",
    url: "https://www.islam-religion.com/",
  },
};
export default function RamadanCounterPage() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ToolHero
        title="Ramadan Counter - "
        highlight="Free Countdown & Fasting Tracker"
        description="See exactly how long until Ramadan, follow each day of the month, tick off your fasts and keep an eye on Eid, Arafah and other key Islamic dates."
      />

      <div className="bg-warm-white">
        <section className="mx-auto max-w-5xl px-4 pb-10 sm:px-6 lg:px-8">
          <RamadanCounter />
        </section>
        <ToolGuide
          title="How to Use the Ramadan Counter"
          sections={guideSections}
        />
        <ToolArticle
          title="Ramadan Counter – Countdown to Ramadan, Track Your Fasts & Islamic Dates"
          intro="Ramadan is a special time for Muslims around the world. As the holy month approaches, many people begin preparing for fasting, prayer and worship. Our free Ramadan Counter helps you see how long remains until Ramadan, follow the Hijri calendar and keep track of your completed fasts. You can also check important Islamic dates, follow the countdown to Eid al-Fitr and convert dates between the Hijri and Gregorian calendars."
          sections={articleSections}
        />
      </div>

      <RelatedTools
        keys={[
          "hijri-converter",
          "prayer-times",
          "zakat-calculator",
          "mosque-finder",
        ]}
      />

      <ToolsFaq faqs={faqs} title="Ramadan Counter" highlight="FAQs" />
    </div>
  );
}
