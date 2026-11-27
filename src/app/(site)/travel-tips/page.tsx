import { BookOpen } from "lucide-react"
import PageHero from "@/components/pages/PageHero"
import PageTools, { type PageTool } from "@/components/pages/PageTools"
import PageContent, {
  type ArticleSection,
} from "@/components/pages/PageContent"
import PageFaq, { type FaqItem } from "@/components/pages/PageFaq"
import PageRelatedPosts from "@/components/pages/PageRelatedPosts"
import { Metadata } from "next"

// Refresh the related posts every 5 minutes, same as the blog pages.
export const revalidate = 300
export const metadata: Metadata = {
  title: "Makkah and Madinah Travel Tips for Hajj and Umrah",
  description:
    "Discover practical Makkah and Madinah travel tips covering accommodation, transport, packing, documents, health and pilgrimage preparation.",
  keywords: [
    "Makkah and Madinah Travel Tips",
    "Travel tips for Saudi Arabia",
    "Makkah travel guide",
    "Madinah travel guide",
    "Umrah travel tips",
    "Hajj travel tips",
    "Travelling to Makkah and Madinah",
    "What to pack for Umrah",
    "Makkah and Madinah travel guide",
    "Saudi Arabia travel tips",
    "Tips for first-time Umrah travellers",
  ].join(", "),
  alternates: {
    canonical: "https://www.islam-religion.com/travel-tips",
  },
  openGraph: {
    title: "Makkah and Madinah Travel Tips for Hajj and Umrah",
    description:
      "Discover practical Makkah and Madinah travel tips covering accommodation, transport, packing, documents, health and pilgrimage preparation.",
    url: "https://www.islam-religion.com/travel-tips",
    siteName: "Islam Religion",
    type: "website",
  },
};
const travelTools: PageTool[] = [
  {
    title: "Umrah Packing List",
    description: "Prepare clothing, toiletries and essentials for your journey.",
    href: "/tools/packing-list",
    icon: "suitcase",
    accent: "emerald",
  },
  {
    title: "Cost Estimator",
    description: "Estimate your flights, accommodation and daily expenses.",
    href: "/tools/cost-estimator",
    icon: "calculator",
    accent: "gold",
  },
  {
    title: "Prayer Times",
    description: "See today's prayer times for your location.",
    href: "/tools/prayer-times",
    icon: "clock",
    accent: "emerald",
  },
  {
    title: "Qibla Finder",
    description: "Find the direction of the Kaaba from anywhere in the world.",
    href: "/tools/qibla-finder",
    icon: "qibla",
    accent: "gold",
  },
]

const travelTipsSections: ArticleSection[] = [
  {
    heading: "Planning Your First Trip to Saudi Arabia? Start Here",
    paragraphs: [
      "A first visit to Saudi Arabia brings plenty of questions. How long should you stay? Which city comes first? What do you need to arrange before you book a flight?",
      "Start with the purpose and timing of your trip. Hajj runs on fixed dates and official arrangements. Umrah can generally be performed at other times of the year, subject to current regulations.",
      "Going for Hajj? Make sure your arrangements follow the official Hajj programme and requirements. A regular tourist or Umrah visa doesn't let you perform Hajj.",
      "Going for Umrah? Check which visa route applies to your nationality and situation, and confirm any permit requirements before you leave.",
      "Before you book, settle a few basics:",
    ],
    bullets: [
      "Your travel dates.",
      "How long you'll stay.",
      "Your flights and accommodation.",
      "Your daily budget.",
      "What your companions need.",
    ],
    closing: [
      "Still working out the money side? Our [Hajj and Umrah Cost Estimator](/islamic-tools/hajj-umrah-cost-estimator) can help you plan your expenses.",
      "For the religious side, our [Hajj Guide](/hajj-guide) and [Umrah Guide](/umrah-guide) explain the steps of each pilgrimage.",
    ],
  },
  {
    heading: "What Should You Arrange Before Leaving Home?",
    paragraphs: [
      "Once your dates are fixed, turn to the arrangements that have to be done before departure.",
      "A missing document or a vague booking can turn the airport into a stressful place. It's far easier to check everything at home than to fix a problem mid-journey.",
    ],
    bullets: [
      "Start with your passport and visa. Your passport has to meet the validity requirements for your visa and the details on both must match. Entry conditions depend on your nationality, visa category and purpose of travel.",
      "Next, confirm your flights. Check your departure and arrival airports, baggage allowance and any connections. Keep your booking confirmation within reach.",
      "Save your accommodation details too. Write down the hotel names, addresses and phone numbers for Makkah and Madinah, and keep copies offline in case your mobile data drops.",
      "Before you go, review the latest Saudi entry, visa and health requirements. They can change with the season and the type of travel.",
      "For official updates, check the Saudi Ministry of Foreign Affairs and the Ministry of Hajj and Umrah.",
      "For Hajj, use the authorised Hajj arrangements for your country. A tourist or Umrah visa is not a substitute for a Hajj visa and permit.",
    ],
  },
  {
    heading: "What Should You Pack for Makkah and Madinah?",
    paragraphs: [
      "Packing for a pilgrimage doesn't mean filling every inch of your suitcase. Bring what makes daily travel, worship and personal care easier.",
      "The weather, your length of stay and your accommodation will shape the list. Check your airline's baggage rules before you pack.",
    ],
    subsections: [
      {
        heading: "Clothing and Ihram",
        paragraphs: [],
        bullets: [
          "Comfortable everyday clothes.",
          "Ihram garments for men.",
          "Modest clothing for women.",
          "Extra undergarments.",
          "A light layer for cold indoor spaces.",
        ],
      },
      {
        heading: "Footwear and personal items",
        paragraphs: [],
        bullets: [
          "Comfortable walking shoes.",
          "Easy slip-on sandals.",
          "Toiletries.",
          "A reusable water bottle.",
          "A small personal bag.",
        ],
      },
      {
        heading: "Documents and electronics",
        paragraphs: [],
        bullets: [
          "Passport and visa.",
          "Flight and hotel confirmations.",
          "Phone and charger.",
          "Travel adapter.",
          "Airline-approved power bank.",
        ],
      },
      {
        heading: "Health and personal care",
        paragraphs: [],
        bullets: [
          "Prescription medicines.",
          "Basic first-aid supplies.",
          "Sunscreen and lip balm.",
          "Personal medical equipment.",
          "Tissues and hand sanitiser.",
        ],
        closing: [
          "Keep your documents, medication and valuables in your hand luggage. Never put everything you need in the checked suitcase.",
          "What you pack also depends on which pilgrimage you're performing. Rather than trying to remember it all, use our [Hajj Packing Checklist](/islamic-tools/hajj-packing-checklist) or [Umrah Packing Checklist](/islamic-tools/umrah-packing-checklist).",
        ],
      },
    ],
  },
  {
    heading: "How Can You Make Long Flights and Airport Transfers Easier?",
    paragraphs: [
      "Long flights are tiring, especially with family or elderly relatives. Add a connection, a long wait or a transfer to the hotel after landing, and the day gets longer still.",
      "A few simple steps help.",
      "Before the flight, check your baggage allowance and get to the airport early enough for check-in and security. Keep your passport and boarding pass where you can grab them.",
      "On the flight, drink water often and move your legs when it's safe. If you need special assistance tell your airline before you travel.",
      "After landing, follow the airport signs and your transfer instructions. If someone is picking you up confirm the meeting point beforehand.",
      "Keep these details handy:",
    ],
    bullets: [
      "Hotel name and address.",
      "Driver's phone number.",
      "Travel group details.",
      "Emergency contacts.",
    ],
    closing: [
      "One small tip: photograph your suitcase before you check it in. If the bag goes missing, the picture makes it much easier to describe to airport staff.",
    ],
  },
  {
    heading: "Where Should You Stay in Makkah and Madinah?",
    paragraphs: [
      "Where you sleep shapes your whole day. A hotel near the mosque saves walking time. A farther one may suit your budget better.",
      "Before you book, think about how often you'll visit the Haram and who's travelling with you.",
      "In Makkah, look at the real distance between the hotel and Masjid al-Haram. A hotel can look close on the map and still mean a long walk because of entrances, roads, slopes or pedestrian routes.",
      "In Madinah, check the walking distance to Al-Masjid an-Nabawi and which route you'd take.",
      "Look past the advertised distance and check:",
    ],
    bullets: [
      "Walking distance to the mosque.",
      "Shuttle services.",
      "Lifts and accessibility.",
      "Included meals and services.",
      "Room size and occupancy.",
      "Cancellation terms.",
    ],
    closing: [
      "Travelling with elderly family? A shorter, easier route is often worth more than a cheaper room.",
      "Read recent guest reviews and confirm the exact location before you pay. It saves you surprises when you arrive.",
    ],
  },
  {
    heading: "How Do You Get Around the Holy Cities?",
    paragraphs: [
      "Makkah and Madinah offer different transport options. The best choice depends on where you stay, how far you're going and how busy the city is.",
    ],
    subsections: [
      {
        heading: "Getting around Makkah",
        paragraphs: [
          "Taxis, ride-hailing and public buses cover many trips in Makkah. During busy pilgrimage periods, traffic and road closures can slow everything down.",
          "If your hotel isn't within easy walking distance of Masjid al-Haram, ask whether it runs a shuttle. Confirm the pickup and drop-off points before you rely on it.",
        ],
      },
      {
        heading: "Getting around Madinah",
        paragraphs: [
          "Taxis and local transport are available in Madinah. If you're staying near Al-Masjid an-Nabawi, you can walk to the mosque for most of your daily trips.",
          "For historical sites, book your transport ahead and leave extra time in busy periods.",
        ],
      },
      {
        heading: "Travelling between Makkah and Madinah",
        paragraphs: [
          "The Haramain High-Speed Railway is one way to travel between the two cities. It links Makkah and Madinah through stations in Jeddah and King Abdullah Economic City.",
          "Check schedules and tickets on the official Haramain Railway website. Book ahead when you can, especially in busy periods.",
          "The station may not be next to your hotel, so count the trip to and from each station in your travel time.",
        ],
      },
    ],
  },
  {
    heading: "How Can You Stay Comfortable in the Saudi Climate?",
    paragraphs: [
      "The Saudi climate changes a lot with the season and the hour. Heat, direct sun and long walks wear you out, especially in big crowds.",
      "You don't need a complicated routine. A few sensible habits will do.",
    ],
    bullets: [
      "Drink water regularly.",
      "Use sunscreen.",
      "Wear breathable clothing.",
      "Choose comfortable shoes.",
      "Rest when you're tired.",
      "Stay out of the sun in the hottest hours.",
      "Keep prescribed medicines with you.",
    ],
    closing: [
      "Walking is a big part of the pilgrimage. If you can, build your stamina before you travel. Start with short distances and add more at a comfortable pace.",
      "Older travellers and anyone with health concerns should talk to a doctor before departure.",
      "Check the latest vaccination and health requirements too. Saudi Arabia's Ministry of Health publishes separate guidance for Hajj and Umrah, and the requirements can change from one season to the next.",
      "You'll find the current details on the Saudi Ministry of Health's Pilgrim Health page.",
    ],
  },
  {
    heading: "What Should You Keep in Mind During Your Stay?",
    paragraphs: [
      "Once you arrive, it's easy to get caught up in the day's plans. Keeping a few practical details in order makes your stay smoother.",
      "Save your hotel's address and phone number on your phone and carry a written copy as well, especially if you're with a group.",
      "In busy areas with family or friends agree on a meeting point in case someone gets separated. Keep your belongings secure and carry only what you need.",
      "Prayer times will shape your day. Leave enough time to reach the mosque, find an entrance and get back to your hotel. Crowds can stretch your usual travel time.",
      "Check daily prayer times with our [Prayer Times](/prayer-times) tool. Need a mosque nearby? Our [Mosque Finder](/islamic-tools/mosque-finder) can help.",
      "A few other daily habits:",
    ],
    bullets: [
      "Carry some Saudi Riyals.",
      "Keep your phone charged.",
      "Save key details offline.",
      "Protect your travel documents.",
      "Stay in touch with your group.",
    ],
    closing: [
      "Save our [Qibla Direction](/islamic-tools/qibla-finder) tool too, for when you need the direction of prayer away from your hotel.",
    ],
  },
  {
    heading: "Travelling with Family or Elderly Pilgrims? Here Are Some Things to Consider",
    paragraphs: [
      "Travelling with family can make the journey special, but it takes a little more planning. Children, older relatives and people with mobility needs all need different things.",
      "Aim for a plan that's comfortable for everyone not a schedule that wears people out.",
    ],
    bullets: [
      "Choose convenient accommodation.",
      "Allow extra time for every journey.",
      "Keep emergency contacts handy.",
      "Carry essential medicines.",
      "Plan regular rest breaks.",
      "Arrange mobility assistance.",
      "Keep children close in crowds.",
    ],
    closing: [
      "If an elderly relative uses a wheelchair or walking aid, confirm what your hotel and the places you plan to visit can offer.",
      "Agree on a simple meeting point, and make sure everyone knows the hotel name and phone number.",
      "Most of all, don't feel that every visit has to fit into one day. A comfortable pace is usually better for the whole family.",
    ],
  },
  {
    heading: "What Travel Mistakes Should You Avoid?",
    paragraphs: [
      "Even well-planned trips get stressful when small details slip. Most problems are easy to prevent if you think about them before you leave.",
      "Watch out for these common mistakes:",
    ],
    bullets: [
      "Leaving document checks until the last minute.",
      "Packing things you don't need.",
      "Ignoring walking distances.",
      "Underestimating the heat.",
      "Relying only on mobile data.",
      "Planning a schedule that's too tight.",
      "Missing official travel updates.",
    ],
    closing: [
      "Another mistake is treating every historical visit as part of the pilgrimage. [Ziyaraat](/ziyaraat-guide) sites are worth exploring, but optional visits should never come before the prescribed rites of Hajj or Umrah.",
      "Our [Ziyaraat Guide](/ziyaraat-guide) covers the historical places in Makkah and Madinah and what visitors should know about them.",
    ],
  },
  {
    heading: "Conclusion",
    paragraphs: [
      "A trip to Makkah and Madinah deserves real preparation. Check your documents, pack sensibly, sort your accommodation and learn how to get around, and you'll avoid most common travel problems.",
      "You don't have to plan every minute. Leave room for rest, prayer and the unexpected. Above all, keep your focus on why you're going.",
      "May Allah make your travels easy, protect you throughout your journey and accept your Hajj, Umrah and prayers. Ameen.",
    ],
  },
];

const faqs: FaqItem[] = [
  {
    question: "What is the best time to travel for Umrah?",
    answer:
      "It depends on your budget, schedule and preferences. Some travellers like quieter periods, while others pick dates that fit work or family. Ramadan and school holidays are especially busy, so book your accommodation and travel early.",
  },
  {
    question: "How much Saudi Riyal should I carry?",
    answer:
      "There's no fixed amount. It depends on how long you stay, your package, meals, transport and shopping. Carry enough cash for small expenses and use a bank card where it's accepted. Check your bank's international transaction fees before you go.",
  },
  {
    question: "Can I use my mobile SIM card in Saudi Arabia?",
    answer:
      "Possibly, through international roaming depending on your provider. You can also look at local SIM and eSIM options. Compare coverage, data allowances and prices before you choose.",
  },
  {
    question: "What should I do if I get separated from my travel group?",
    answer:
      "Stay calm and call your group leader or a family member on the numbers you saved. If you can't reach them, ask authorised staff or security for help. Agreeing on a meeting point before you enter crowded areas helps a lot.",
  },
  {
    question: "Do I need travel insurance for Hajj or Umrah?",
    answer:
      "Travel insurance can cover things like medical treatment, delays or lost luggage depending on the policy. Check what your visa or package already includes and whether you need extra cover. Read the exclusions and limits before you buy.",
  },
  {
    question: "Can I bring prescription medicines into Saudi Arabia?",
    answer:
      "Check Saudi Arabia's current rules first especially if you take controlled or restricted medication. Keep medicines in their original packaging and carry your prescription or a doctor's letter. Confirm any required approvals through official Saudi guidance before you travel.",
  },
]
const PAGE_URL = "https://www.islam-religion.com/travel-tips"

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${PAGE_URL}#webpage`,
  url: PAGE_URL,
  name: "Makkah and Madinah Travel Tips for Hajj and Umrah",
  description:
    "Discover practical Makkah and Madinah travel tips covering accommodation, transport, packing, documents, health and pilgrimage preparation.",
  inLanguage: "en",
  isPartOf: {
    "@type": "WebSite",
    name: "Islam Religion",
    url: "https://www.islam-religion.com/",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    ratingCount: "693",
    bestRating: "5",
    worstRating: "1",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${PAGE_URL}#faq`,
  url: PAGE_URL,
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
}

const jsonLd = (data: object) => JSON.stringify(data).replace(/</g, "\\u003c")
export default function Page() {
  return (
    <>
    <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: jsonLd(webPageSchema) }}
/>
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema) }}
/>
      <PageHero
  title="Makkah and Madinah Travel Tips for a"
  highlight="Smooth Pilgrimage"
  image="/images/travel-tips-imge.png"
  description={
    <>
      Planning a trip to Makkah and Madinah for Hajj or Umrah? Explore{" "}
      <PageHero.Mark>practical travel tips</PageHero.Mark> to prepare for your
      journey, including packing essentials, travel documents, accommodation,
      transport, health and local guidance. Get ready for a more comfortable and
      organised pilgrimage with helpful advice for every stage of your trip.
    </>
  }
        primaryCta={{
          label: "Umrah Checklist",
          href: "/tools/umrah-checklist",
        }}
        secondaryCta={{
          label: "Read Travel Blogs",
          href: "/blog",
          Icon: BookOpen,
        }}
      />

      <PageTools
        titleGold="Free Tools for"
        titleEmerald="Your Travel"
        description="Plan your trip with practical tools to organise your essentials, estimate your budget and stay on top of prayer times and direction."
        tools={travelTools}
      />

     <PageContent
        title="Travel Tips for a Comfortable Journey to"
        highlight="Makkah and Madinah"
        intro={`Getting ready for your first trip to Makkah and Madinah? Not sure what to pack, which documents to sort out or how to get between the two cities?\n\nThere's a lot to handle before you leave home. Documents, the Saudi heat, what to carry and how you'll get around once you land.\n\nA bit of preparation goes a long way. You'll spend less time worrying about logistics and more time on the reason you're going.\n\nThis guide gives you practical tips for Makkah and Madinah, whether you're going for Hajj, planning Umrah or visiting the holy cities for the first time. It runs from packing your bag to choosing a hotel.`}
        sections={travelTipsSections}
      />

      <PageRelatedPosts
        categorySlug="travel-tips"
        titleGold="Related"
        titleEmerald="Travel Articles"
      />

      <PageFaq
        titleGold="Travel Frequently Asked"
        titleEmerald="Questions"
        faqs={faqs}
      />
    </>
  )
}