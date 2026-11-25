// app/tools/prayer-times/page.tsx
import type { Metadata } from "next";
import ToolHero from "@/components/Tools/tool-hero";
import PrayerTimes from "@/components/Tools/PrayerTimes";
import ToolArticle, {
  type ArticleSection,
} from "@/components/Tools/tool-article";
import ToolGuide, { type GuideSection } from "@/components/Tools/tool-guide";
import RelatedTools from "@/components/Tools/related-tools";
import ToolsFaq, { type FaqItem } from "@/components/Tools/tools-faq";

export const metadata: Metadata = {
  title: "Islamic Prayer Times Today | Fajr, Dhuhr, Asr, Maghrib, Isha",
  description:
    "Check today's Islamic prayer times for your city: Fajr, Dhuhr, Asr, Maghrib and Isha. Choose Standard or Hanafi Asr and see the countdown to the next prayer.",
  keywords: [
    "Islamic prayer times",
    "prayer times today",
    "Salah times",
    "Fajr time",
    "Dhuhr time",
    "Asr time",
    "Maghrib time",
    "Isha time",
    "Hanafi Asr time",
    "prayer times calculator",
    "namaz timings",
  ],
  alternates: {
    canonical: "https://www.islam-religion.com/islamic-tools/prayer-times",
  },
  openGraph: {
    title: "Islamic Prayer Times Today | Fajr, Dhuhr, Asr, Maghrib, Isha",
    description:
      "Check today's Islamic prayer times for your city: Fajr, Dhuhr, Asr, Maghrib and Isha. Choose Standard or Hanafi Asr and see the countdown to the next prayer.",
    url: "https://www.islam-religion.com/islamic-tools/prayer-times",
    siteName: "Islam Religion",
    type: "website",
  },
};

const articleSections: ArticleSection[] = [
  {
    heading: "What You Can Do with Our Prayer Times Calculator",
    paragraphs: [
      "Our tool tries to detect your location automatically. If that does not work, you can choose your country, region and city yourself. You can also select your preferred Asr calculation method.",
      "With the Prayer Times calculator, you can:",
    ],
    bullets: [
      "Check all five daily Salah timings.",
      "View Sunrise separately.",
      "See the countdown to your next prayer.",
      "Switch between Standard and Hanafi Asr methods.",
      "View Gregorian and Hijri dates.",
      "Check prayer times for other supported cities.",
    ],
  },
  {
    heading: "How to Use Our Prayer Times Calculator",
    paragraphs: ["You can find your local Salah timings in a few steps."],
    subsections: [
      {
        heading: "1. Allow Location Access",
        paragraphs: [
          "When you open the tool, it tries to detect your location. If your browser asks for permission, select Allow.",
          "You can skip this step and choose your location manually if you prefer.",
        ],
      },
      {
        heading: "2. Select Your Country or Region",
        paragraphs: [
          "If automatic detection does not work, use the region selector to choose your country. The United Kingdom is selected by default, but you can change it.",
        ],
      },
      {
        heading: "3. Choose Your City",
        paragraphs: [
          "Select your city from the available list. For example, you can choose London, Makkah or Madinah.",
          "Make sure you pick the right city, because prayer times change from place to place.",
        ],
      },
      {
        heading: "4. Choose Your Asr Method",
        paragraphs: [
          "Select Standard or Hanafi, whichever you follow. The two use different shadow lengths to work out when Asr starts.",
        ],
      },
      {
        heading: "5. Check Your Daily Salah Times",
        paragraphs: [
          "Once you have picked your city and Asr method, the calculator shows your daily schedule:",
        ],
        bullets: ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"],
        closing: ["You can also see a countdown to the next prayer."],
      },
    ],
  },
  {
    heading: "Features of Our Islamic Prayer Times Tool",
    paragraphs: ["Here is what you can do with our calculator."],
    subsections: [
      {
        heading: "Automatic Location Detection",
        paragraphs: [
          "The tool tries to find your location through your browser. This saves you from searching for your city every time.",
          "If you prefer not to share your location, you can select your country and city manually.",
        ],
      },
      {
        heading: "Prayer Times for Other Cities",
        paragraphs: [
          "You can change your selected city whenever you need to check another location. This is useful when travelling or checking Salah timings for family members in another country.",
        ],
      },
      {
        heading: "All Five Daily Prayers",
        paragraphs: [
          "Find Fajr, Dhuhr, Asr, Maghrib and Isha in one place. Sunrise is also shown separately because it marks the end of the Fajr prayer time.",
        ],
      },
      {
        heading: "Countdown to the Next Prayer",
        paragraphs: [
          "The countdown shows how much time remains before the next prayer begins in your selected city. It helps you keep track of the daily Salah schedule.",
        ],
      },
      {
        heading: "Standard and Hanafi Asr Methods",
        paragraphs: [
          "The calculator gives you two Asr options. Choose the one that follows the method you normally observe.",
        ],
      },
      {
        heading: "Gregorian and Hijri Dates",
        paragraphs: [
          "You can view both calendar dates alongside your prayer schedule.",
        ],
      },
      {
        heading: "Free to Use",
        paragraphs: [
          "You can check prayer timings without creating an account. Select your location and view the daily schedule.",
        ],
      },
    ],
  },
  {
    heading: "What Are the Five Daily Islamic Prayers?",
    paragraphs: [
      "Muslims are required to perform five obligatory prayers each day. Each has its own time linked to the position of the sun.",
      "Here is when each prayer begins and how many obligatory Rak'ahs it contains.",
    ],
    subsections: [
      {
        heading: "1. Fajr: Morning Prayer",
        paragraphs: [
          "Fajr begins at true dawn, when the first light appears across the horizon. Its time ends at sunrise, so you must perform Fajr before the sun rises.",
          "Fajr has two obligatory Rak'ahs. There are also two Sunnah Rak'ahs that Muslims commonly pray before it.",
        ],
      },
      {
        heading: "2. Dhuhr (Zuhr): Midday Prayer",
        paragraphs: [
          "Dhuhr begins after the sun passes its highest point in the sky. It has four obligatory Rak'ahs.",
          "Its start time changes throughout the year depending on the date and your location.",
        ],
      },
      {
        heading: "3. Asr: Afternoon Prayer",
        paragraphs: [
          "Asr starts after Dhuhr, once an object's shadow reaches a certain length. Different schools measure this a little differently.",
          "The two common methods are:",
        ],
        bullets: [
          "Standard method: Asr starts when an object's shadow equals its height, plus the length of its shadow at noon.",
          "Hanafi method: Asr starts when an object's shadow is twice its height, plus the length of its shadow at noon.",
        ],
        closing: [
          "The Hanafi method gives a later start time. Asr has four obligatory Rak'ahs.",
        ],
      },
      {
        heading: "4. Maghrib: Sunset Prayer",
        paragraphs: [
          "Maghrib begins just after the sun has completely set. It has three obligatory Rak'ahs.",
          "Its timing changes throughout the year as sunset becomes earlier or later.",
        ],
      },
      {
        heading: "5. Isha: Night Prayer",
        paragraphs: [
          "Isha begins after evening twilight disappears, according to the calculation method being used.",
          "It has four obligatory Rak'ahs. Muslims may also perform additional Sunnah and Witr prayers.",
        ],
      },
    ],
  },
  {
    heading: "What Is the Difference Between Fajr and Sunrise?",
    paragraphs: [
      "Fajr and Sunrise are two different times.",
      "Fajr begins at true dawn. Sunrise is when the sun appears above the horizon. The Fajr prayer period ends at sunrise, so you should complete your prayer before then.",
      "Sunrise is not one of the five obligatory prayers. It is shown separately in the calculator to make the end of Fajr time clear.",
    ],
  },
  {
    heading: "What Is the Difference Between Standard and Hanafi Asr?",
    paragraphs: [
      "The difference is the shadow length used to determine when Asr begins.",
    ],
    table: {
      intro: "Here is how the two methods compare:",
      head: ["Method", "Asr Begins When", "Start Time", "Commonly Followed By"],
      rows: [
        [
          "Standard",
          "An object's shadow equals its height, plus its shadow at noon",
          "Earlier",
          "Shafi'i, Maliki and Hanbali schools",
        ],
        [
          "Hanafi",
          "An object's shadow is twice its height, plus its shadow at noon",
          "Later",
          "Hanafi school",
        ],
      ],
      after: [
        "As a result, Hanafi Asr usually starts later than Standard Asr.",
        "Choose the method that matches the guidance you normally follow. If you are unsure, ask your local mosque or a qualified Islamic scholar.",
      ],
    },
  },
  {
    heading: "How Are Islamic Prayer Times Calculated?",
    paragraphs: [
      "Prayer times depend on where the sun is during the day. Your location matters too, which is why Lahore and London do not have the same Salah times.",
      "A prayer time calculator uses a few simple things:",
    ],
    bullets: [
      "Your location: The city you pick changes the results.",
      "The date: Prayer times are a little different every day.",
      "Sunrise and sunset: These help set Fajr and Maghrib.",
      "Twilight: This is used to work out Fajr and Isha.",
      "Shadows: The length of an object's shadow decides when Asr starts.",
      "Time zone: This makes sure the times match your local clock.",
    ],
    closing: [
      "That is why you need to select the right city before checking your prayer times.",
    ],
  },
  {
    heading: "Why Do Prayer Times Change Every Day?",
    paragraphs: [
      "Have you noticed that Fajr gets earlier or later as the months pass? The same happens with the other prayers.",
      "It is because sunrise and sunset change during the year. In many parts of the world, days are longer in summer and shorter in winter. This affects the time of Fajr, Dhuhr, Asr, Maghrib and Isha.",
      "So the prayer times you checked yesterday may be a little different today. Check the daily schedule for your city rather than relying on yesterday's timings.",
    ],
  },
  {
    heading: "Why Are Prayer Times Different on Different Websites?",
    paragraphs: [
      "You may find that two websites or apps show slightly different timings for the same city. This does not always mean one of them is wrong.",
      "The difference can come from several settings.",
    ],
    subsections: [
      {
        heading: "Different Calculation Methods",
        paragraphs: [
          "Prayer organisations may use different angles to calculate Fajr and Isha. This results in different start times.",
        ],
      },
      {
        heading: "Different Asr Settings",
        paragraphs: [
          "The Standard and Hanafi methods use different shadow lengths. This is why their Asr timings are not usually the same.",
        ],
      },
      {
        heading: "Location Differences",
        paragraphs: [
          "Prayer times are calculated using geographical coordinates. Two nearby cities can have slightly different timings.",
        ],
      },
      {
        heading: "Time Zone Settings",
        paragraphs: [
          "The selected time zone affects how calculated prayer times appear on your local clock.",
        ],
      },
      {
        heading: "Daylight Saving Time",
        paragraphs: [
          "Some countries move their clocks forward or back during parts of the year. This changes the local clock times shown in prayer schedules.",
        ],
      },
      {
        heading: "Local Mosque Timetables",
        paragraphs: [
          "A mosque may use a particular calculation method or make local adjustments to its timetable. Its published schedule may therefore differ slightly from an online calculator.",
          "For congregational prayers, check your local mosque's Iqamah timetable.",
        ],
      },
    ],
  },
  {
    heading: "Find Prayer Times in Different Countries and Cities",
    paragraphs: [
      "Prayer timings depend on where you are. If you are checking times for another city, change your location in the calculator and select the correct destination.",
    ],
    subsections: [
      {
        heading: "Prayer Times in the United Kingdom",
        paragraphs: [
          "Choose your UK city to check Fajr, Dhuhr, Asr, Maghrib and Isha. Timings in London, Birmingham and Manchester can differ because each city has its own location.",
        ],
      },
      {
        heading: "Prayer Times in Saudi Arabia",
        paragraphs: [
          "If you are travelling for Hajj or Umrah, you can select Saudi Arabia and choose Makkah or Madinah from the available cities.",
          "The calculator will show the prayer schedule for your selected city.",
        ],
      },
      {
        heading: "Prayer Times in Pakistan",
        paragraphs: [
          "Select Pakistan and choose your city from the list. Prayer times in Lahore, Karachi, Islamabad and other cities vary according to their geographical locations.",
        ],
      },
      {
        heading: "Prayer Times in Other Countries",
        paragraphs: [
          "You can also check other supported locations using the country and city selectors. Always confirm that the selected city is correct before following the displayed timings.",
        ],
      },
    ],
  },
  {
    heading: "How to Check Prayer Times While Travelling",
    paragraphs: [
      "Your usual prayer schedule may not apply when you travel to another city or country. You should check the local timings for your destination.",
      "If you travel from London to Makkah, select Makkah in the calculator rather than continuing to use London's prayer times.",
      "Follow these steps:",
    ],
    bullets: [
      "Open the Prayer Times calculator.",
      "Select your destination country or region.",
      "Choose your destination city.",
      "Select your preferred Asr method.",
      "Check the displayed prayer schedule.",
    ],
    closing: [
      "The countdown uses the local time of the city you have selected.",
    ],
  },
  {
    heading: "What Does the Quran Say About Prayer Times?",
    paragraphs: [
      "The Quran makes it clear that Salah must be performed at its appointed times. Two verses that explain the importance and timing of prayer are Surah An-Nisa (4:103) and Surah Al-Isra (17:78).",
    ],
    subsections: [
      {
        heading: "Surah An-Nisa (4:103)",
        paragraphs: [
          "Allah says that prayer is an obligation prescribed for believers at appointed times.",
          "This verse reminds Muslims that Salah should be performed within its prescribed time.",
          "[Read Surah An-Nisa, Verse 103](https://quran.com/4/103)",
        ],
      },
      {
        heading: "Surah Al-Isra (17:78)",
        paragraphs: [
          "This verse refers to establishing prayer from the decline of the sun until the darkness of the night, as well as the recitation at dawn.",
          "It is an important Quranic reference when learning about the daily prayer periods.",
          "[Read Surah Al-Isra, Verse 78](https://quran.com/17/78)",
        ],
      },
    ],
  },
  {
    heading: "Sahih Muslim 612d: The Times of Prayer",
    paragraphs: [
      "A narration in Sahih Muslim, reported by Abdullah ibn Amr (RA), explains the time periods of the daily prayers.",
      "It describes when several prayers begin and end, including Dhuhr, Asr, Maghrib, Isha and Fajr.",
      "[Read Sahih Muslim 612d](https://sunnah.com/muslim:612d)",
    ],
  },
  {
    heading: "Prayer Times Accuracy Disclaimer",
    paragraphs: [
      "Our calculator provides estimated prayer timings based on your selected location and calculation settings. Results may differ slightly from local mosque timetables because of differences in calculation methods, coordinates and local adjustments.",
      "Check that you have selected the correct city and Asr method before using the schedule. For congregational prayers, follow your local mosque's Iqamah timetable. If you are unsure about a prayer time or calculation method, ask a qualified Islamic scholar or your local mosque.",
    ],
  },
];

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
];

const faqs: FaqItem[] = [
  {
    question: "How can I find today's prayer times?",
    answer:
      "Open the Prayer Times calculator. You can let it detect your location, or choose your country and city yourself. Today's schedule for Fajr, Dhuhr, Asr, Maghrib and Isha is shown straight away, along with Sunrise.",
  },
  {
    question: "Can I check prayer times without sharing my location?",
    answer:
      "Yes. Choose your country and city yourself. You do not need to allow location access to use the calculator.",
  },
  {
    question: "Is the Prayer Times calculator free?",
    answer:
      "Yes. It is free to use and you do not need an account to check your daily Salah times.",
  },
  {
    question: "Can I check prayer times in Makkah and Madinah?",
    answer:
      "Yes. Select Saudi Arabia, then choose Makkah or Madinah from the city list.",
  },
  {
    question: "Why is my Asr time different from someone else's?",
    answer:
      "You may be using different Asr methods. The Standard method starts Asr earlier, while the Hanafi method starts it later. Choose the one you follow.",
  },
  {
    question: "What is the difference between Fajr and Sunrise?",
    answer:
      "Fajr begins at true dawn, while Sunrise is when the sun appears above the horizon. The Fajr prayer time ends at sunrise, so Fajr should be prayed before then. Sunrise is not one of the five obligatory prayers.",
  },
  {
    question: "Why do prayer times change every day?",
    answer:
      "Prayer times follow the position of the sun, and sunrise and sunset change throughout the year. This is why Fajr, Dhuhr, Asr, Maghrib and Isha move a little from one day to the next.",
  },
  {
    question: "Should I follow online prayer times or my local mosque?",
    answer:
      "The calculator gives estimated start times. For congregational prayers, follow your local mosque's Iqamah timetable.",
  },
];
const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Islamic Prayer Times Today | Fajr, Dhuhr, Asr, Maghrib, Isha",
  url: "https://www.islam-religion.com/islamic-tools/prayer-times",
  description:
    "Check today's Islamic prayer times for your city: Fajr, Dhuhr, Asr, Maghrib and Isha. Choose Standard or Hanafi Asr and see the countdown to the next prayer.",
  inLanguage: "en",
  isPartOf: {
    "@type": "WebSite",
    name: "Islam Religion",
    url: "https://www.islam-religion.com/",
  },
};
export default function PrayerTimesPage() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ToolHero
        title="Free Islamic"
        highlight="Prayer Times"
        description="Find today's Fajr, Dhuhr, Asr, Maghrib and Isha times for your city. Check Sunrise, choose your Asr method and see how long remains until the next prayer."
      />

      <div className="bg-warm-white">
        <section className="mx-auto max-w-5xl px-4 pb-10 sm:px-6 lg:px-8">
          <PrayerTimes />
        </section>
        <ToolGuide title="How to Use Prayer Times" sections={guideSections} />
        <ToolArticle
          title="Prayer Times: Find Daily Islamic Prayer Times for Your Location"
          intro="Need to check today's Salah timings? Use our free Prayer Times Calculator to find Fajr, Dhuhr, Asr, Maghrib and Isha for your city. You can also check Sunrise and see how long remains until the next prayer. Our tool tries to detect your location automatically. If that does not work, you can choose your country, region and city yourself. You can also select your preferred Asr calculation method, Standard or Hanafi, and view the Gregorian and Hijri dates alongside your schedule."
          sections={articleSections}
        />
      </div>

      <RelatedTools
        keys={[
          "mosque-finder",
          "hijri-converter",
          "hajj-checklist",
          "packing-list",
        ]}
      />

      <ToolsFaq faqs={faqs} title="Prayer Times" highlight="FAQs" />
    </div>
  );
}
