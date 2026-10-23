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

const preparationTools: PageTool[] = [
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

const preparationSections: ArticleSection[] = [
  {
    heading: "Why Preparation Matters",
    paragraphs: [
      "Good preparation helps you focus on worship rather than worry. When your documents, health, finances and knowledge are in order, you can approach each rite with calm and presence.",
      "Preparation covers practical arrangements, such as travel and budget, as well as spiritual readiness, including sincere intention, repentance and learning what is required of you.",
    ],
  },
  {
    heading: "The Main Areas of Preparation",
    bullets: [
      "Spiritual: renew your intention for the sake of Allah, repent sincerely and seek forgiveness from those you may have wronged.",
      "Knowledge: learn the rites, restrictions of ihram and key duas before you travel, ideally from reliable teachers and sources.",
      "Documents: make sure your passport, visa or permit, tickets and bookings are valid and easy to access.",
      "Finances: plan a realistic budget, ensure your funds are lawful and settle any outstanding debts or trusts where possible.",
      "Health: visit your doctor, review required and recommended vaccinations, and prepare your regular medicines.",
      "Packing: prepare light, comfortable and practical essentials suited to the weather and the rites of Umrah.",
    ],
  },
  {
    heading: "How to Prepare Step by Step",
    paragraphs: [
      "Start well before your departure date. Spreading your preparation over several weeks gives you time to resolve any issues and approach your journey without rush.",
    ],
    bullets: [
      "Check your passport validity and current Saudi visa, permit and entry requirements through official sources.",
      "Choose a reputable travel provider and confirm the details of flights, accommodation and transport in writing.",
      "Build fitness gradually, as Umrah involves long periods of walking and standing.",
      "Make a note of important contacts, your accommodation address and emergency details, and share them with family.",
      "Write down your personal duas and the names of people you wish to pray for.",
      "Pack in advance, double-check your essentials and leave room in your luggage for what you may bring back.",
    ],
  },
]

const preparationFaqs: FaqItem[] = [
  {
    question: "How early should I start preparing for Umrah?",
    answer:
      "It is wise to start several weeks, or even months, before departure. This gives you time to arrange documents and health requirements, learn the rites and plan your budget calmly.",
  },
  {
    question: "What documents do I need?",
    answer:
      "You will generally need a valid passport, a visa or permit that meets current Saudi requirements, and confirmed travel and accommodation details. Requirements can change, so always check official sources before you travel.",
  },
  {
    question: "Do I need any vaccinations?",
    answer:
      "Health requirements can vary and may change. Check the latest Saudi health requirements and speak with your doctor or a travel clinic well before departure to review required and recommended vaccinations.",
  },
  {
    question: "How can I prepare spiritually for Umrah?",
    answer:
      "Renew your sincere intention, repent for past mistakes, seek forgiveness from others, increase your worship and learn the meaning of what you will recite. Remember that Umrah is an act of worship for the sake of Allah alone.",
  },
  {
    question: "How much money should I budget?",
    answer:
      "Costs depend on your travel dates, accommodation, transport and spending habits. Use the Cost Estimator to plan flights, accommodation and daily expenses, and keep a small reserve for unexpected needs.",
  },
  {
    question: "What should I learn before travelling?",
    answer:
      "Learn the steps of ihram, tawaf and sai, the restrictions of ihram, and the talbiyah and key duas. If you have questions about your specific circumstances, ask a trusted scholar before you travel.",
  },
]

export default function Page() {
  return (
    <>
      <PageHero
        title="Your Complete Guide to Umrah"
        highlight="Preparation"
        description={
          <>
            Learn how to get ready for your pilgrimage, from documents and
            health to budget and spiritual readiness, with{" "}
            <PageHero.Mark>clear guidance,</PageHero.Mark> practical checklists
            and free tools to help you prepare with confidence.
          </>
        }
        primaryCta={{
          label: "Umrah Checklist",
          href: "/tools/umrah-checklist",
        }}
        secondaryCta={{
          label: "Read Preparation Blogs",
          href: "/blog",
          Icon: BookOpen,
        }}
      />

      <PageTools
        titleGold="Free Tools for"
        titleEmerald="Your Preparation"
        description="Get ready for your journey with practical tools to organise your essentials, plan your budget and keep track of important steps."
        tools={preparationTools}
      />

      <PageContent
        titleGold="Preparation Explained"
        titleEmerald="Step by Step"
        intro="Understand what to arrange before you travel, from documents and health to finances and spiritual readiness, so you can begin your journey with confidence."
        sections={preparationSections}
      />

      <PageRelatedPosts
        categorySlug="preparation"
        titleGold="Related"
        titleEmerald="Preparation Articles"
      />

      <PageFaq
        titleGold="Preparation Frequently Asked"
        titleEmerald="Questions"
        faqs={preparationFaqs}
      />
    </>
  )
}