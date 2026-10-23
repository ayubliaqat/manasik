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

const visaTools: PageTool[] = [
  {
    title: "Umrah Checklist",
    description: "Track your documents, travel preparations and rituals.",
    href: "/tools/umrah-checklist",
    icon: "clipboard",
    accent: "emerald",
  },
  {
    title: "Umrah Packing List",
    description: "Prepare clothing, toiletries and essentials for your journey.",
    href: "/tools/packing-list",
    icon: "suitcase",
    accent: "gold",
  },
  {
    title: "Cost Estimator",
    description: "Estimate your flights, accommodation and daily expenses.",
    href: "/tools/cost-estimator",
    icon: "calculator",
    accent: "emerald",
  },
  {
    title: "Prayer Times",
    description: "See today's prayer times for your location.",
    href: "/tools/prayer-times",
    icon: "clock",
    accent: "gold",
  },
]

const visaSections: ArticleSection[] = [
  {
    heading: "Understanding the Umrah Visa",
    paragraphs: [
      "To perform Umrah, most travellers need permission to enter Saudi Arabia. Depending on your nationality and the rules in force at the time, this may be an Umrah visa or another eligible Saudi visa, such as a tourist eVisa.",
      "A visa allows you to enter the Kingdom, while a separate permit, usually booked through the official Nusuk platform, may be required to perform Umrah and visit certain sites. Rules change, so always confirm the current process through official Saudi sources.",
    ],
  },
  {
    heading: "Main Visa Requirements",
    bullets: [
      "A passport that is valid for the period required by Saudi authorities, with enough blank pages and accurate personal details.",
      "A recent passport-style photograph that meets the official size and quality requirements.",
      "A completed visa application submitted through an official or authorised channel.",
      "Confirmed travel details, which may include flights and accommodation bookings.",
      "Any health or vaccination certificates required for your nationality and travel dates.",
      "Payment of the applicable visa and service fees, which can vary by route and provider.",
    ],
  },
  {
    heading: "How to Apply Step by Step",
    paragraphs: [
      "Start early and use only official or well-established channels. Be careful with unofficial agents, and keep copies of every document and confirmation you receive.",
    ],
    bullets: [
      "Check the latest Saudi entry and Umrah season rules through the Ministry of Hajj and Umrah or other official sources.",
      "Confirm which visa route applies to your nationality, and whether you will apply through an authorised provider or online.",
      "Prepare your passport, photograph and supporting documents before you start the application.",
      "Submit your application carefully, checking every name, date and passport number for accuracy.",
      "Book your Umrah permit and any other required slots through the official platform once your visa is approved.",
      "Check your visa validity, entry and exit conditions and keep digital and printed copies for your journey.",
    ],
  },
]

const visaFaqs: FaqItem[] = [
  {
    question: "Do I need a visa to perform Umrah?",
    answer:
      "Most international travellers need a valid visa or other permission to enter Saudi Arabia. The type depends on your nationality and current regulations, so check with official Saudi sources before you book.",
  },
  {
    question: "Can I perform Umrah on a tourist visa?",
    answer:
      "In many cases, eligible travellers can perform Umrah on a Saudi tourist eVisa, but the rules depend on your nationality and can change. Confirm current eligibility and any permit requirements before you travel.",
  },
  {
    question: "What is the Nusuk platform?",
    answer:
      "Nusuk is the official Saudi platform used to plan Umrah and to book permits and slots for the Grand Mosque and certain sites, such as the Rawdah. Check what is required for your trip, as processes can be updated.",
  },
  {
    question: "How early should I apply for my visa?",
    answer:
      "Apply early enough to allow for processing and any corrections, but also make sure your travel dates fall within the validity and rules of your visa. Some routes have timing restrictions, so read the conditions carefully.",
  },
  {
    question: "How long can I stay in Saudi Arabia on my visa?",
    answer:
      "Visa validity and permitted length of stay are not always the same. Check your visa conditions for both, and make sure your flights and accommodation match them.",
  },
  {
    question: "Is Umrah available all year?",
    answer:
      "Umrah can generally be performed throughout the year, but Saudi authorities publish season dates and may restrict access around Hajj. Always check the current calendar and visa rules before booking your trip.",
  },
]

export default function Page() {
  return (
    <>
      <PageHero
        title="Your Complete Guide to Umrah"
        highlight="Visa"
        description={
          <>
            Learn how the Umrah visa process works, from eligibility and
            documents to permits and timing, with{" "}
            <PageHero.Mark>clear guidance,</PageHero.Mark> practical steps and
            free tools to help you plan your journey with confidence.
          </>
        }
        primaryCta={{
          label: "Umrah Checklist",
          href: "/tools/umrah-checklist",
        }}
        secondaryCta={{
          label: "Read Visa Blogs",
          href: "/blog",
          Icon: BookOpen,
        }}
      />

      <PageTools
        titleGold="Free Tools for"
        titleEmerald="Your Visa"
        description="Prepare for your application with practical tools to organise your documents, plan your budget and keep track of important steps."
        tools={visaTools}
      />

      <PageContent
        titleGold="Umrah Visa Explained"
        titleEmerald="Step by Step"
        intro="Understand the main visa routes, the documents you need and the steps to apply, so you can arrange your travel with confidence."
        sections={visaSections}
      />

      <PageRelatedPosts
        categorySlug="visa"
        titleGold="Related"
        titleEmerald="Visa Articles"
      />

      <PageFaq
        titleGold="Visa Frequently Asked"
        titleEmerald="Questions"
        faqs={visaFaqs}
      />
    </>
  )
}