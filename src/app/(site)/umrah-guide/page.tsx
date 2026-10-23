
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

const umrahTools: PageTool[] = [
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
    title: "Zakat Calculator",
    description: "Calculate your zakat on eligible savings, gold and silver.",
    href: "/tools/zakat-calculator",
    icon: "coins",
    accent: "gold",
  },
]

const umrahSections: ArticleSection[] = [
  {
    heading: "What Is Umrah?",
    paragraphs: [
      "Umrah is the Islamic pilgrimage to Makkah that Muslims can perform throughout the year, subject to applicable Hajj-season regulations. It is an act of worship that includes entering ihram, performing tawaf around the Kaaba and completing sa'i between Safa and Marwa.",
      "Unlike Hajj, Umrah does not have a fixed set of pilgrimage days. Learning its requirements before travelling can help you perform each rite correctly and focus on your worship.",
    ],
  },
  {
    heading: "The Main Steps of Umrah",
    bullets: [
      "Prepare for ihram, make the intention for Umrah and enter ihram before crossing the applicable miqat.",
      "Recite the talbiyah and observe the restrictions of ihram on the journey to Makkah.",
      "Perform tawaf by completing seven circuits around the Kaaba.",
      "Perform sa'i by walking seven passages between Safa and Marwa, beginning at Safa and ending at Marwa.",
      "Men shave their heads or trim their hair, while women trim a small portion of their hair according to the applicable rulings.",
      "Complete the rites and leave the state of ihram once the required hair-cutting or shaving has been performed.",
    ],
  },
  {
    heading: "How to Prepare for Umrah",
    paragraphs: [
      "Prepare your travel documents, accommodation, budget and essential supplies before departure. Learn the rites and relevant rulings in advance so you can approach your pilgrimage with understanding and peace of mind.",
    ],
    bullets: [
      "Check your passport, visa requirements and current Saudi travel regulations.",
      "Identify the correct miqat for your route and learn when to enter ihram.",
      "Learn the steps of tawaf and sa'i, along with relevant duas and rulings.",
      "Pack comfortable footwear, suitable clothing, unscented toiletries for ihram and essential medicines.",
      "Plan your accommodation and transport, allowing time for rest and worship.",
      "Learn the restrictions of ihram and seek reliable guidance if you have questions about specific circumstances.",
    ],
  },
]

const umrahFaqs: FaqItem[] = [
  {
    question: "Who can perform Umrah?",
    answer:
      "Muslims who meet the applicable entry and pilgrimage requirements can perform Umrah. Travellers should check current Saudi visa, permit and health requirements before departure.",
  },
  {
    question: "When can Umrah be performed?",
    answer:
      "Umrah can generally be performed throughout the year, although access may be restricted during certain periods, particularly around Hajj. Check current Saudi regulations before booking your trip.",
  },
  {
    question: "What is the difference between Hajj and Umrah?",
    answer:
      "Hajj is an obligatory pilgrimage for Muslims who meet its conditions and takes place on specific days in Dhul Hijjah. Umrah is a shorter pilgrimage that can generally be performed throughout the year. Umrah does not replace the obligation of Hajj.",
  },
  {
    question: "What is ihram for Umrah?",
    answer:
      "Ihram is the sacred state entered with the intention of performing Umrah at the appropriate point before crossing the miqat. Men generally wear two unstitched cloths, while women wear modest clothing that meets the relevant requirements. Specific restrictions apply to everyone in ihram.",
  },
  {
    question: "How long does Umrah take?",
    answer:
      "The rites of Umrah may take a few hours, depending on crowd levels, mobility and waiting times. Your overall visit will usually be longer because you may also need time for travel, rest and worship in Makkah and Madinah.",
  },
  {
    question: "What should I do before reaching the miqat?",
    answer:
      "Prepare for ihram before reaching the applicable miqat, including washing if desired, putting on appropriate clothing and learning the intention and talbiyah. You must enter ihram before crossing the miqat when intending to perform Umrah, subject to the rulings that apply to your circumstances.",
  },
]

export default function Page() {
  return (
    <>
      <PageHero
        title="Your Complete Guide to"
        highlight="Umrah"
        description={
          <>
            Learn how to perform Umrah step by step, from preparing for ihram
            to completing tawaf and sai, with{" "}
            <PageHero.Mark>clear guidance,</PageHero.Mark> authentic duas and
            free tools to help you prepare for your sacred journey.
          </>
        }
        primaryCta={{
          label: "Umrah Checklist",
          href: "/tools/umrah-checklist",
        }}
        secondaryCta={{
          label: "Read Umrah Blogs",
          href: "/blog",
          Icon: BookOpen,
        }}
      />

      <PageTools
        titleGold="Free Tools for"
        titleEmerald="Your Umrah"
        description="Prepare for your Umrah journey with practical tools to organise your essentials, plan your budget and keep track of important steps."
        tools={umrahTools}
      />

      <PageContent
        titleGold="Umrah Explained"
        titleEmerald="Step by Step"
        intro="Understand the essential rites of Umrah, what to prepare before travelling and how to complete your pilgrimage with confidence."
        sections={umrahSections}
      />

      <PageRelatedPosts
        categorySlug="umrah-guide"
        titleGold="Related"
        titleEmerald="Umrah Articles"
      />

      <PageFaq
        titleGold="Umrah Frequently Asked"
        titleEmerald="Questions"
        faqs={umrahFaqs}
      />
    </>
  )
}
