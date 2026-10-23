import { BookOpen } from "lucide-react"
import PageHero from "@/components/pages/PageHero"
import PageTools, { type PageTool } from "@/components/pages/PageTools"
import PageContent, {
  type ArticleSection,
} from "@/components/pages/PageContent"
import PageFaq, { type FaqItem } from "@/components/pages/PageFaq"
import PageRelatedPosts from "@/components/pages/PageRelatedPosts"

// Refresh the related posts every 5 minutes, same as the blog pages.
export const revalidate = 300

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

const travelSections: ArticleSection[] = [
  {
    heading: "Why Travel Tips Matter",
    paragraphs: [
      "Umrah is a physically demanding journey, often involving long flights, large crowds, hot weather and unfamiliar surroundings. A little planning can make your trip safer, smoother and more peaceful.",
      "These tips focus on practical matters such as documents, comfort, health and getting around, so you can spend your energy on worship rather than avoidable stress.",
    ],
  },
  {
    heading: "Essential Travel Tips",
    bullets: [
      "Keep your passport, visa or permit, tickets and bookings together, and carry copies in a separate bag or saved on your phone.",
      "Wear comfortable, broken-in footwear that is easy to remove, and bring a small bag to carry your shoes into the mosque.",
      "Pack medicines, essential toiletries and a change of clothes in your hand luggage in case your checked bag is delayed.",
      "Drink water regularly and rest when you need to, as heat and long walks can cause exhaustion quickly.",
      "Arrange mobile data or a local SIM so you can use maps, translation and prayer-time tools when needed.",
      "Save your hotel name, address and contact number, and take a printed card with you for easy directions.",
    ],
  },
  {
    heading: "Tips for Your Stay",
    paragraphs: [
      "Once you arrive, take time to rest and settle in before beginning your rites. Staying patient and flexible will help you handle crowds, waiting times and changes to your plans.",
    ],
    bullets: [
      "Choose accommodation and transport that match your needs, especially if you are travelling with elders or children.",
      "Visit the mosques at quieter times where possible, and allow extra time to reach them before prayer.",
      "Agree on a meeting point with your group in case you get separated in the crowds.",
      "Keep valuables secure, carry only what you need and be cautious about unofficial offers or services.",
      "Eat simple, hygienic meals and avoid overeating, particularly before tawaf and sai.",
      "Be kind and patient with others, remembering that everyone around you is there to worship.",
    ],
  },
]

const travelFaqs: FaqItem[] = [
  {
    question: "What is the best time to travel for Umrah?",
    answer:
      "Umrah can generally be performed throughout the year, but crowds and weather vary by season. Cooler months and times outside school holidays and Ramadan are often quieter. Always check current Saudi regulations and season dates before booking.",
  },
  {
    question: "How early should I book flights and accommodation?",
    answer:
      "Booking early often gives you more choice and better prices, especially for busy periods such as Ramadan. Make sure your plans match the dates and conditions of your visa and permit before you pay.",
  },
  {
    question: "What should I carry in my hand luggage?",
    answer:
      "Carry your travel documents, essential medicines, a phone charger, a change of clothes and basic toiletries. Keep an ihram set accessible if you plan to enter ihram at the miqat or before you land.",
  },
  {
    question: "How can I stay healthy during Umrah?",
    answer:
      "Drink plenty of water, rest regularly, wash your hands often and wear comfortable footwear. If you have a medical condition, speak to your doctor before travelling and carry your prescriptions with you.",
  },
  {
    question: "How do I get around Makkah and Madinah?",
    answer:
      "Many pilgrims walk, use taxis or ride-hailing services, or take organised transport and trains between cities. Choose official or well-reviewed options and confirm fares or routes in advance where possible.",
  },
  {
    question: "What should I do if I get lost in the crowds?",
    answer:
      "Stay calm and move to a safe, visible spot. Contact your group using the meeting point you agreed in advance, ask uniformed staff or security for help, and keep your hotel details with you so you can return safely.",
  },
]

export default function Page() {
  return (
    <>
      <PageHero
        title="Your Complete Guide to Umrah"
        highlight="Travel Tips"
        image="/images/travel-tips-image.png" 
        description={
          <>
            Learn how to travel comfortably and safely, from packing and health
            to getting around Makkah and Madinah, with{" "}
            <PageHero.Mark>clear guidance,</PageHero.Mark> practical advice and
            free tools to help you make the most of your journey.
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
        titleGold="Travel Tips Explained"
        titleEmerald="Step by Step"
        intro="Understand how to prepare for the journey, look after your health and travel with ease, so you can focus on your worship."
        sections={travelSections}
      />

      <PageRelatedPosts
        categorySlug="travel-tips"
        titleGold="Related"
        titleEmerald="Travel Articles"
      />

      <PageFaq
        titleGold="Travel Frequently Asked"
        titleEmerald="Questions"
        faqs={travelFaqs}
      />
    </>
  )
}