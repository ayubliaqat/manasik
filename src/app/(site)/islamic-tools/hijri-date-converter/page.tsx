// app/tools/hijri-converter/page.tsx
import type { Metadata } from "next";
import ToolHero from "@/components/Tools/tool-hero";
import HijriConverter from "@/components/Tools/HijriConverter";
import ToolArticle, {
  type ArticleSection,
} from "@/components/Tools/tool-article";
import ToolGuide, { type GuideSection } from "@/components/Tools/tool-guide";
import RelatedTools from "@/components/Tools/related-tools";
import ToolsFaq, { type FaqItem } from "@/components/Tools/tools-faq";

export const metadata: Metadata = {
  title: "Hijri Date Converter – Islamic to Gregorian Dates",
  description:
    "Convert Hijri dates to Gregorian and Gregorian dates to Hijri with our free Islamic calendar converter. Check today's Islamic date and view Hijri months.",
  keywords: ["Hijri Date Converter"],
  alternates: {
    canonical: "https://www.islam-religion.com/islamic-tools/hijri-date-converter",
  },
  openGraph: {
    title: "Hijri Date Converter – Islamic to Gregorian Dates",
    description:
      "Convert Hijri dates to Gregorian and Gregorian dates to Hijri with our free Islamic calendar converter. Check today's Islamic date and view Hijri months.",
    url: "https://www.islam-religion.com/islamic-tools/hijri-date-converter",
    siteName: "Islam Religion",
    type: "website",
  },
}

const articleSections: ArticleSection[] = [
  {
    heading: "What Is the Hijri Date Converter?",
    paragraphs: [
      "The Hijri Date Converter changes dates between two calendars: the Islamic lunar calendar and the Gregorian solar calendar.",
      "You may need it for different reasons. Perhaps you want to check the Hijri date of a wedding anniversary, find the Gregorian date of an Islamic occasion or look up an old date from a family record. Instead of checking a calendar by hand, enter the date and let the tool show its equivalent.",
      "The result includes the weekday and the name of the Islamic month in English and Arabic. You can also copy the result if you need to save or share it.",
    ],
  },
  {
    heading: "How Do I Convert a Gregorian Date to Hijri?",
    paragraphs: [
      "If you have a date from the Gregorian calendar, you can find its Islamic equivalent in a few steps.",
    ],
    bullets: [
      "Select Gregorian to Hijri.",
      "Enter the day, month and year.",
      "Wait for the converter to show the result.",
      "Check the Hijri date and weekday.",
      "Copy the result if you need it later.",
    ],
  },
  {
    heading: "Converting a Birthday or the Current Date",
    paragraphs: [
      "You might have a birthday written as 15 March 2000 and want to know its Hijri date. Enter that date and the converter will show the corresponding day in the Islamic calendar.",
      "You can also use the Use today option if you want to convert the current date.",
    ],
  },
  {
    heading: "How Do I Convert a Hijri Date to Gregorian?",
    paragraphs: [
      "The reverse option is useful when you know the Islamic date but need its Gregorian equivalent.",
      "Select Hijri to Gregorian, enter the Hijri day, month and year, and read the result. The converter will show the matching Gregorian date and weekday.",
      "You might need this when an old document records a date in Hijri, or when someone gives you the date of an Islamic event and you want to add it to your calendar.",
      "Check the year before submitting it. The tool supports Hijri years from 1320 AH to 1490 AH.",
    ],
  },
  {
    heading: "How Can I Check Today's Islamic Date?",
    paragraphs: [
      "You don't need to enter today's date yourself. The converter has a Today section that shows the current Gregorian and Hijri dates.",
      "You can also press Use today to put the current date into the conversion field. This saves you from entering the day, month and year manually.",
      "One thing to keep in mind: the date shown follows the Saudi Umm al-Qura calendar. If your local mosque follows a different moon-sighting announcement, the Islamic date in your area may be one day ahead or behind.",
    ],
  },
  {
    heading: "What Is the Hijri Calendar?",
    paragraphs: [
      "The Hijri calendar is the Islamic calendar used to mark dates and months in the Muslim year. It follows the lunar cycle rather than the sun.",
      "Its year count begins with the Hijrah, the migration of Prophet Muhammad ﷺ from Makkah to Madinah. You will often see Islamic years written with AH, which refers to the Hijri calendar.",
      "The calendar has twelve months. Each month lasts 29 or 30 days depending on the lunar cycle and the method used to determine its beginning.",
      "Muslims use this calendar to mark important occasions, including Ramadan, Eid al-Fitr, Hajj and Eid al-Adha. It also helps you keep track of other dates connected with Islamic worship.",
    ],
  },
  {
    heading: "What Are the 12 Islamic Months?",
    paragraphs: [
      "The Hijri year has twelve months in a fixed order. If you are learning the Islamic calendar, it helps to know their names:",
    ],
    bullets: [
      "Muharram",
      "Safar",
      "Rabi al-Awwal",
      "Rabi al-Thani",
      "Jumada al-Ula",
      "Jumada al-Thani",
      "Rajab",
      "Sha'ban",
      "Ramadan",
      "Shawwal",
      "Dhul Qa'dah",
      "Dhul Hijjah",
    ],
  },
  {
    heading: "Key Months and the Month View",
    paragraphs: [
      "Ramadan is the month of fasting, and Shawwal begins with Eid al-Fitr. Dhul Hijjah is the month in which Muslims perform Hajj, and Eid al-Adha falls on its tenth day.",
      "You can use the month view in the converter to see the Hijri dates alongside their Gregorian equivalents.",
    ],
  },
  {
    heading: "Why Does Ramadan Fall on Different Gregorian Dates?",
    paragraphs: [
      "Ramadan does not begin on the same Gregorian date every year. This is because the two calendars measure time differently.",
      "The Gregorian calendar follows the solar year, while the Hijri calendar follows the lunar year. A Hijri year has around 354 or 355 days, making it about 10 or 11 days shorter than a Gregorian year.",
      "As a result, Ramadan moves earlier by around 10 or 11 days on the Gregorian calendar each year. The same applies to Eid al-Fitr, Hajj and Eid al-Adha.",
      "For example, Ramadan may fall during summer in one period and during winter some years later. Its place in the Hijri calendar stays the same, but its Gregorian dates keep changing.",
    ],
  },
  {
    heading: "Why Do Islamic Dates Differ Between Countries?",
    paragraphs: [
      "Have you ever seen Pakistan announce the start of Ramadan on a different day from Saudi Arabia? This can happen because Islamic authorities may follow different methods when deciding the start of a new month.",
      "Some countries rely on local moon sighting. Others follow a recognised calendar or the sighting decision of another authority. The result can be a difference of one day between countries and communities.",
      "Our converter uses the Saudi Umm al-Qura calendar. It does not automatically follow the moon-sighting announcement in your country.",
      "If you live in Pakistan, the UK or another country, check your local mosque or recognised Islamic authority when you need the confirmed date for Ramadan or Eid.",
    ],
  },
  {
    heading: "Which Calendar Does the Converter Follow?",
    paragraphs: [
      "The converter follows the Saudi Umm al-Qura calendar, which is used in Saudi Arabia.",
      "This is a calculated calendar. Its dates are set in advance so you can use it to convert dates without waiting for the start of each Islamic month to be announced.",
      "However, not every country follows the same calendar. A local Islamic authority may confirm the beginning of a month through moon sighting, which can result in a different date.",
      "This is why the tool includes a one-day adjustment option.",
    ],
  },
  {
    heading: "Can I Change the Date by One Day?",
    paragraphs: [
      "Yes. The converter lets you move the displayed date one day earlier or later. It is helpful when the Umm al-Qura date does not match the calendar followed in your area.",
      "You will see three options:",
    ],
    bullets: [
      "1 day earlier: Moves the displayed date back by one day.",
      "Saudi calendar: Returns to the standard Umm al-Qura setting.",
      "1 day later: Moves the displayed date forward by one day.",
    ],
  },
  {
    heading: "Using the One-Day Adjustment",
    paragraphs: [
      "For example, if your local Islamic authority announces that a month begins one day after the Saudi calendar date, select 1 day later to compare the result.",
      "This adjustment helps you match a local calendar. It does not confirm that the moon has been sighted in your area, so follow your local announcement for important religious dates.",
    ],
  },
  {
    heading: "Can I View a Full Hijri Month?",
    paragraphs: [
      "Yes. You can use the month view to see the Hijri dates and their Gregorian equivalents together.",
      "This is helpful when you need to check more than one date. For example, you may want to see the Gregorian dates for the first ten days of Dhul Hijjah or check how Ramadan falls across a particular month.",
      "You do not have to convert each day separately. Open the month view and check the dates in one place.",
    ],
  },
  {
    heading: "Can I Use It to Check Ramadan, Eid and Hajj Dates?",
    paragraphs: [
      "Yes. You can convert dates from Ramadan, Shawwal and Dhul Hijjah to find their Gregorian equivalents. You can also enter a Gregorian date to see which Hijri day it falls on.",
      "It helps you when you are planning your fasting, family gatherings or pilgrimage. You can check the expected date of 1 Shawwal for Eid al-Fitr or 10 Dhul Hijjah for Eid al-Adha.",
      "But remember that the converter uses calculated Umm al-Qura dates. It cannot confirm the official start of Ramadan, Eid or Hajj in your country. Before making final arrangements, wait for the announcement from your recognised Islamic authority.",
      "If you are preparing for pilgrimage, our Hajj Checklist can help you organise your documents, clothing and other essentials. You can also use the Umrah Packing Checklist if you are travelling for Umrah.",
    ],
  },
  {
    heading: "What Years Does the Converter Support?",
    paragraphs: ["You can convert dates within these ranges:"],
    bullets: [
      "Gregorian dates: 1900 to 2070",
      "Hijri years: 1320 AH to 1490 AH",
    ],
  },
  {
    heading: "Date Limits",
    paragraphs: [
      "It gives you a wide range of past and future dates to check. You can use it for older family records, birthdays and general planning.",
      "If you enter a date outside these limits, the converter may not return a result. Check the year before trying again.",
    ],
  },
  {
    heading: "Is the Converted Date Always the Official Date?",
    paragraphs: [
      "No. The converter gives you a date based on the Umm al-Qura calendar. It does not issue official announcements for the start of Islamic months.",
      "This matters most when you are checking Ramadan, Eid or Hajj. The date may differ from the one announced by your local Islamic authority because of its moon-sighting method.",
      "For everyday date conversion, the tool gives you a consistent result. For religious occasions, follow the announcement recognised in your country.",
    ],
  },
];

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
];

const faqs: FaqItem[] = [
  {
    question: "Does the Islamic date change at sunset?",
    answer:
      "Yes. The Islamic day begins at sunset, so the Hijri date changes in the evening rather than at midnight. This is why the Islamic date may already have moved to the next day while the Gregorian date is still the same.",
  },
  {
    question: "How many days are in a Hijri year?",
    answer:
      "A Hijri year has 354 or 355 days. It is around 10 or 11 days shorter than a Gregorian year, which is why Islamic months move through different seasons over time.",
  },
  {
    question: "Can UK and Saudi Arabia have different Ramadan dates?",
    answer:
      "Yes. Their Islamic authorities may follow different moon sighting decisions. This can lead to a one-day difference in the announced start of Ramadan.",
  },
  {
    question: "Is the Umm al-Qura calendar based on local moon sighting?",
    answer:
      "Umm al-Qura is a calculated calendar used in Saudi Arabia. Its dates are set in advance and may not match the date announced through local moon sighting in another country.",
  },
  {
    question: "Can I convert an old Hijri date?",
    answer:
      "Yes. The converter supports Hijri years from 1320 AH to 1490 AH. You can enter a date within this range to find its Gregorian equivalent.",
  },
  {
    question: "Why is my converted date one day ahead?",
    answer:
      "The converter follows the Saudi Umm al-Qura calendar. Your local mosque or Islamic authority may follow a different method to determine the start of the month. You can also use the one-day adjustment to compare the dates.",
  },
  {
    question: "Can I use the converter to confirm Eid?",
    answer:
      "No. The converter shows the expected Gregorian date for Eid according to the Umm al-Qura calendar, but the actual date depends on the moon-sighting announcement in your country. Check with your local Islamic authority before making plans.",
  },
  {
    question: "Is the Hijri Date Converter free?",
    answer:
      "Yes. You can use the converter without paying or creating an account. Enter your date, check the result and copy it if you need to keep it.",
  },
];
const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Hijri Date Converter – Islamic to Gregorian Dates",
  url: "https://www.islam-religion.com/islamic-tools/hijri-date-converter",
  description:
    "Convert Hijri dates to Gregorian and Gregorian dates to Hijri with our free Islamic calendar converter. Check today's Islamic date and view Hijri months.",
  inLanguage: "en",
  isPartOf: {
    "@type": "WebSite",
    name: "Islam Religion",
    url: "https://www.islam-religion.com/",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    bestRating: "5",
    ratingCount: "587",
  },
};
export default function HijriConverterPage() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ToolHero
        title="Hijri Date"
        highlight="Converter"
        description="Convert Gregorian dates to Hijri and back, with the month in English and Arabic and a full month view."
      />

      <div className="bg-warm-white">
        <section className="mx-auto max-w-5xl px-4 pb-10 sm:px-6 lg:px-8">
          <HijriConverter />
        </section>
        <ToolGuide
          title="How to Use the Hijri Date Converter"
          sections={guideSections}
        />
        <ToolArticle
          title="Hijri Date Converter: Convert Gregorian and Islamic Dates"
          intro="Do you know an important date in the Islamic calendar but need to find it in the Gregorian calendar? Or perhaps you want to know which Hijri date falls on your birthday?
Our free Hijri Date Converter helps you check both. Enter a Gregorian date to find its Islamic equivalent, or enter a Hijri date to see the Gregorian date. You can also check today's Islamic date and view an entire Hijri month on the same page.
The tool follows the Saudi Umm al-Qura calendar. You can move the result one day forward or back if your local calendar follows a different date.
"
          sections={articleSections}
        />
      </div>

      <RelatedTools
        keys={[
          "prayer-times",
          "hajj-checklist",
          "zakat-calculator",
          "cost-estimator",
        ]}
      />

      <ToolsFaq faqs={faqs} title="Hijri Date Converter" highlight="FAQs" />
    </div>
  );
}
