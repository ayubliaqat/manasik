// app/tools/packing-list/page.tsx
import type { Metadata } from "next"
import ToolHero from "@/components/Tools/tool-hero"
import UmrahPackingList from "@/components/Tools/UmrahPackingList"
import ToolArticle, { type ArticleSection } from "@/components/Tools/tool-article"
import ToolGuide, { type GuideSection } from "@/components/Tools/tool-guide"
import RelatedTools from "@/components/Tools/related-tools"
import ToolsFaq, { type FaqItem } from "@/components/Tools/tools-faq"

// Change this one line to your real domain, or set NEXT_PUBLIC_SITE_URL in .env
const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.manasik.com"
).replace(/\/$/, "")

const PAGE_PATH = "/tools/packing-list"
const PAGE_TITLE = "Free Umrah Packing List for Men, Women & Kids | Manasik"
const PAGE_DESCRIPTION =
  "Free Umrah packing list checker. Choose men, women or children, tick off what you pack and track your progress. Your ticks are saved on your device."

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    "Umrah packing list",
    "what to pack for Umrah",
    "Umrah checklist",
    "Umrah checklist for women",
    "Umrah packing list for men",
    "Umrah packing list for kids",
    "Ihram packing list",
    "Umrah essentials",
  ],
  alternates: {
    canonical: PAGE_PATH,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: PAGE_PATH,
    siteName: "Manasik",
    locale: "en_GB",
    title: PAGE_TITLE,
    description:
      "Organise your Umrah essentials, tick off packed items and track your progress with Manasik's free packing list checker.",
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description:
      "Choose men, women or children, tick off what you pack and track your progress.",
  },
}

const articleSections: ArticleSection[] = [
  {
    heading: "No more handwritten lists",
    paragraphs: [
      "You do not need to keep checking a handwritten list or remember everything at once. Use the checklist above to prepare at your own pace. Whether you are travelling alone, preparing for your first Umrah or taking your children with you, you can choose the list that suits your needs.",
      "The aim is simple: help you feel ready before you leave home, so you can give more attention to your journey and the worship ahead.",
    ],
  },
  {
    heading: "How to Use the Umrah Packing List",
    paragraphs: [
      "Not sure what to pack for Umrah? Worried you might forget something important before leaving home? Manasik’s Umrah Packing List helps you organise your belongings, keep track of what you have packed and prepare for your journey one step at a time.",
    ],
    numbered: [
      "Choose who you are packing for",
      "Work through each section",
      "Tick items as you pack them",
      "Return to your list whenever you need to",
      "Reset the list when you need a fresh start",
    ],
  },
  {
    heading: "Why Is Manasik’s Umrah Packing List a Better Choice?",
    paragraphs: [
      "Want to prepare for Umrah without worrying about forgotten essentials? Do you need a checklist that works for men, women and children? Manasik makes packing easier by bringing everything into one organised tool, helping you prepare at your own pace and see what still needs attention.",
    ],
    bullets: [
      "Made for different needs",
      "Easy to follow",
      "Progress at a glance",
      "Saves your progress",
      "Flexible preparation",
      "Simple to restart",
    ],
  },
  {
    heading: "Umrah Checklist for Men: What Should You Pack?",
    paragraphs: [
      "What do men need to prepare before leaving for Umrah? Your packing list should cover Ihram clothing, personal care, health needs and travel documents, so you can focus on your journey instead of rushing to find forgotten essentials.",
      "The Saudi Ministry of Hajj and Umrah’s official guide recommends preparing early and lists an additional Ihram set, medicines, health supplies, comfortable footwear and personal care items among the things to take. Read the official Umrah guide.",
    ],
    bullets: [
      "Two sets of Ihram",
      "Ihram belt",
      "Light cotton clothes",
      "Comfortable socks",
      "Easy-to-remove sandals",
      "Light jacket for cold air conditioning",
      "Unscented soap and shampoo",
      "Unscented sun cream",
      "Lip balm and moisturiser",
      "Regular medication and a doctor's letter, if needed",
      "Pain relief and rehydration salts",
      "Blister plasters and foot cream",
      "Face masks and hand sanitiser",
      "Passport and visa",
      "Flight and hotel confirmations",
      "Vaccination certificates",
      "Travel insurance details",
      "Some Saudi riyals in cash",
      "Digital copies of travel documents",
      "Phone and charger",
      "Power bank",
      "Travel plug adaptor, if needed",
      "Small backpack or sling bag",
      "Lightweight prayer mat",
      "Dua book or Quran",
      "Reusable water bottle",
      "Umbrella or sun hat",
      "Tasbih or counter",
    ],
  },
  {
    heading: "Ihram garments and fragrance-free products",
    paragraphs: [
      "Before travelling, keep your Ihram garments accessible if you need to change before reaching the Miqat. The official guidance also stresses choosing personal care products that are fragrance-free and suitable for Ihram. Once you enter Ihram, applying fragrance is prohibited, so check product labels and follow reliable religious guidance. Requirements can vary with your itinerary, health needs and airline rules, so confirm the details before departure.",
    ],
  },
  {
    heading: "Umrah Checklist for Women for a Comfortable Journey",
    paragraphs: [
      "What should women pack for Umrah?",
      "Choose clothes that are comfortable for walking. And also, they must be suitable for the weather in Makkah and Madinah. You do not need to take your entire wardrobe. Pack enough for your stay, along with a few essentials you may need each day.",
    ],
    bullets: [
      "Abayas or loose, modest dresses",
      "Headscarves and undergarments",
      "Comfortable walking shoes or sandals",
      "Unscented soap and shampoo",
      "Sanitary products",
      "Regular medicines",
      "A small bag for daily use",
    ],
  },
  {
    heading: "Women and Ihram clothing",
    paragraphs: [
      "Women do not need the two-piece Ihram garment worn by men. They can enter Ihram in suitable, modest clothing while following the rules of Ihram. There are also specific rulings about face coverings and gloves so check with a trusted scholar if you are unsure what applies to you.",
      "Keep your packed items checked off in the list, and add any personal essentials you know you will need.",
    ],
  },
  {
    heading: "Umrah checklist for kids: Make family packing easier",
    paragraphs: [
      "Travelling with children means preparing for more than your own needs. You may need spare outfits, nappies, snacks, familiar comfort items and medicines suitable for your child.",
      "Select With Children to show the additional items in Manasik's checklist. You can then tick off the essentials as you pack them.",
      "Keep the things your child may need quickly in an accessible bag. Spare clothes, wipes and essential medicines are often more useful when you can reach them without opening your main suitcase.",
      "An identification wristband with a contact number can also help you prepare for busy public places. Make sure children stay with a responsible adult and agree on a simple plan for what to do if you become separated.",
      "Every child has different needs, so use the checklist as a starting point. Add any personal items that help your family travel safely and comfortably.",
    ],
  },
  {
    heading: "Keep your travel plans and budget organised",
    paragraphs: [
      "Packing is one part of preparing for Umrah. It helps to organise your travel costs and make sure your plans are realistic before departure.",
      "If you are still working out the cost of your trip use Manasik's [Umrah Cost Estimator](/tools/cost-estimator) to help plan your budget. Consider the costs of flights, accommodation, transport, food and other expenses that may apply to your journey.",
      "Once you have a budget, you can make more informed decisions about what to buy before travelling and what you may be able to purchase in Saudi Arabia.",
      "If you are also planning for Hajj, Manasik's [Hajj checklist](/tools/hajj-checklist) can help you organise the different preparations for that pilgrimage. Hajj and Umrah have different rites and requirements, so use the relevant checklist for the journey you intend to perform.",
      "You may also need to review your Zakaat obligations as part of your wider financial planning. Manasik's [Zakaat Calculator](/tools/zakat-calculator) can help you work through the information needed to estimate your Zakaat. Keep this separate from your travel budget, as Zakaat depends on the relevant rules and your financial circumstances.",
    ],
  },
  {
    heading: "A Few Things to Check Before You Leave",
    paragraphs: [
      "Is your suitcase ready, and are you sure you have covered the essentials beyond packing? Before travelling for Umrah, check these final details to avoid preventable delays, baggage problems or difficulties during your journey.",
    ],
    bullets: [
      "Passport, visa, flight and hotel confirmations, and required travel documents",
      "Regular medicines, prescriptions and Saudi entry requirements for medication",
      "Ihram garments ready for when you reach the Miqat",
      "Airline baggage allowance and restrictions on liquids, batteries and other items",
      "All remaining items on your Umrah Packing List",
      "Essential documents, medication and travel necessities kept within easy reach",
    ],
  },
  {
    heading: "Check the latest travel requirements",
    paragraphs: [
      "Travel and health requirements may change, so check the latest guidance from the Saudi Ministry of Hajj and Umrah, your airline and relevant health authorities before departure. Manasik helps you track your packing, but always confirm official entry and travel requirements separately.",
    ],
  },
  {
    heading: "Start your Umrah packing today",
    paragraphs: [
      "You do not need to pack everything at once. Choose the right audience, work through one category at a time and use your progress indicator to see what remains.",
      "Manasik's Umrah Packing List gives you a simple way to organise your preparations and keep track of the essentials. Start with the items that matter most, return to the list as you pack and review everything before you leave.",
      "May Allah make your journey easy and accept your Umrah.",
    ],
  },
]

const guideSections: GuideSection[] = [
  {
    heading: "How to use this packing list",
    variant: "steps",
    items: [
      "Choose who you are packing for: Men, Women or With children.",
      "Go through each section and gather the items.",
      "Tap an item once it is in your bag.",
      "Watch the progress bar fill as you pack.",
      "Come back any time. Your ticks are saved on this device.",
    ],
  },
  {
    heading: "How it helps you",
    variant: "highlight",
    items: [
      "Shows only the items that apply to you or your family.",
      "Helps you avoid forgetting small but important things.",
      "Keeps your packing organised by category.",
      "Free to use, with no sign-up.",
    ],
  },
  {
    heading: "Tips for best results",
    variant: "tips",
    items: [
      "Start packing at least a week before you travel.",
      "Pack your hand luggage first, with documents and medicines.",
      "Break in your sandals and shoes before the trip.",
    ],
  },
  {
    heading: "Good to know",
    variant: "note",
    text: "Your ticks are saved only in this browser and are not shared with anyone. Clearing browser data or switching devices will remove them. Airline baggage rules vary, so check your allowance and what is allowed in hand luggage before you travel.",
  },
]

const faqs: FaqItem[] = [
  {
    question: "What should I pack for Hajj or Umrah?",
    answer:
      "Pack clothing, unscented toiletries, health items, documents and money, electronics, and worship and comfort items such as a prayer mat, dua book and water bottle. The list groups everything by category so you can pack one section at a time.",
  },
  {
    question: "What should men and women pack differently?",
    answer:
      "Choose Men, Women or With children above the list and it shows the items that apply to you. For example, ihram sets for men, modest loose clothing and sanitary supplies for women, and snacks and spare clothes for children.",
  },
  {
    question: "Why should I pack unscented toiletries?",
    answer:
      "Scented products are avoided while in ihram, so unscented soap, shampoo and sun cream are the safer choice.",
  },
  {
    question: "What should go in my hand luggage?",
    answer:
      "Keep your documents, medicines and a change of clothes in your hand luggage. Airline baggage rules vary, so check your allowance and what is allowed in hand luggage before you travel.",
  },
  {
    question: "How can I pack light?",
    answer:
      "Take fewer items that are easy to wash and dry, and leave some space in your bag for gifts and Zamzam on the way back.",
  },
  {
    question: "Is my packing progress saved?",
    answer:
      "Yes, your ticks are saved on this device only and are not shared with anyone. Clearing your browser data or switching devices will remove them.",
  },
]

// Structured data (JSON-LD): WebApplication + BreadcrumbList + FAQPage
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": `${SITE_URL}${PAGE_PATH}#tool`,
      name: "Umrah Packing List Checker",
      url: `${SITE_URL}${PAGE_PATH}`,
      description: PAGE_DESCRIPTION,
      applicationCategory: "TravelApplication",
      operatingSystem: "Any",
      browserRequirements: "Requires JavaScript",
      inLanguage: "en-GB",
      isAccessibleForFree: true,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "GBP",
      },
      publisher: {
        "@type": "Organization",
        name: "Manasik",
        url: SITE_URL,
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Tools",
          item: `${SITE_URL}/tools`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Umrah Packing List",
          item: `${SITE_URL}${PAGE_PATH}`,
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ],
}

export default function PackingListPage() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />

      <ToolHero
        title="Free Umrah Packing"
        highlight="List Checker"
        description="Not sure what to pack for Umrah? Use Manasik's Umrah Packing List to organise your essentials, track your packing progress and prepare for your journey. Choose your needs, tick off packed items and leave home feeling more organised and ready."
      />

      <div className="bg-warm-white">
        <section className="mx-auto max-w-5xl px-4 pb-10 sm:px-6 lg:px-8">
          <UmrahPackingList />
        </section>

        <ToolGuide
          title="How to Use the Packing List"
          sections={guideSections}
        />

        <ToolArticle
          title="Get your Umrah packing sorted before you travel"
          intro="What do you need to pack for Umrah, and how can you make sure nothing important gets left behind? Manasik’s Umrah Packing List helps you organise your belongings, work through your essentials and see how much you have packed."
          sections={articleSections}
        />
      </div>

      <RelatedTools
        keys={["hajj-checklist", "cost-estimator", "prayer-times", "mosque-finder"]}
      />

      <ToolsFaq faqs={faqs} title="Packing List" highlight="FAQs" />
    </div>
  )
}