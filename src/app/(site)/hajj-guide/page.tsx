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

const hajjTools: PageTool[] = [
  {
    title: "Hajj Checklist",
    description: "Tick off documents, rituals and preparations step by step.",
    href: "/tools/hajj-checklist",
    icon: "clipboard",
    accent: "emerald",
  },
  {
    title: "Hajj Packing List",
    description: "Everything to pack for men, women and families.",
    href: "/tools/packing-list",
    icon: "suitcase",
    accent: "gold",
  },
  {
    title: "Cost Estimator",
    description: "Plan your flights, stay and daily spending in one place.",
    href: "/tools/cost-estimator",
    icon: "calculator",
    accent: "emerald",
  },
  {
    title: "Zakat Calculator",
    description: "Work out your zakat on savings, gold, silver and more.",
    href: "/tools/zakat-calculator",
    icon: "coins",
    accent: "gold",
  },
]

const hajjSections: ArticleSection[] = [
  {
    heading: "What is Hajj?",
    paragraphs: [
      "Hajj is the annual pilgrimage to Makkah and the fifth pillar of Islam. It is obligatory once in a lifetime for every Muslim who is physically and financially able to make the journey.",
      "The rites of Hajj take place on fixed days in the month of Dhul Hijjah, mostly in Makkah, Mina, Arafat and Muzdalifah.",
    ],
  },
  {
    heading: "The Main Steps of Hajj",
    bullets: [
      "Entering ihram and making the intention at the miqat.",
      "Tawaf around the Kaaba and sa'i between Safa and Marwa.",
      "Staying at Mina and standing at Arafat on the 9th of Dhul Hijjah.",
      "Spending the night at Muzdalifah and collecting pebbles.",
      "Stoning the jamarat, offering the sacrifice and shaving or trimming the hair.",
      "Tawaf al-Ifadah and the farewell tawaf before leaving Makkah.",
    ],
  },
  {
    heading: "How to Prepare",
    paragraphs: [
      "Start early with your documents, health, budget and travel plans, and learn the rites well before you leave so you can focus on worship.",
    ],
    bullets: [
      "Choose a trusted, licensed Hajj package or group.",
      "Learn the steps, duas and rulings of each ritual.",
      "Pack light, comfortable and practical essentials.",
      "Settle debts and seek forgiveness from others before travelling.",
    ],
  },
]

const hajjFaqs: FaqItem[] = [
  {
    question: "Who must perform Hajj?",
    answer:
      "Hajj is obligatory once in a lifetime for every Muslim who is physically and financially able to make the journey.",
  },
  {
    question: "When does Hajj take place?",
    answer:
      "Hajj takes place in the month of Dhul Hijjah, the twelfth month of the Islamic calendar, with the main rites between the 8th and the 12th or 13th. Because the Islamic calendar is lunar, the dates move earlier each year in the Gregorian calendar.",
  },
  {
    question: "What is the difference between Hajj and Umrah?",
    answer:
      "Hajj is obligatory and can only be performed on set days each year. Umrah is a shorter pilgrimage that can be performed at any time of the year, and it does not replace Hajj.",
  },
  {
    question: "What is ihram?",
    answer:
      "Ihram is the state of consecration a pilgrim enters at the miqat by making the intention for Hajj. Men wear two simple unstitched white cloths, and women wear modest everyday clothing. Certain actions are not allowed while in ihram.",
  },
  {
    question: "How early should I start preparing for Hajj?",
    answer:
      "As early as you can, ideally several months ahead. This gives you time to choose a trusted package, arrange your documents, plan your budget and learn the rites and duas.",
  },
]

export default function Page() {
  return (
    <>
      <PageHero
        title="Your Complete Guide to"
        highlight="Hajj"
        description={
          <>
            Learn every step of Hajj, from preparation to the final ritual, with{" "}
            <PageHero.Mark>clear guidance,</PageHero.Mark> authentic duas and
            free tools to help you worship with confidence.
          </>
        }
        primaryCta={{ label: "Hajj Checklist", href: "/tools/hajj-checklist" }}
        secondaryCta={{ label: "Read Hajj Blogs", href: "/blog", Icon: BookOpen }}
      />

      <PageTools
        titleGold="Free Tools for"
        titleEmerald="Your Hajj"
        description="Use simple, helpful tools to prepare for Hajj, manage your budget and keep track of every step."
        tools={hajjTools}
      />

      <PageContent
        titleGold="Hajj Explained"
        titleEmerald="Step by Step"
        intro="A clear overview of what Hajj is, the rites you will perform and how to prepare, so you can approach the journey with confidence."
        sections={hajjSections}
      />

      <PageRelatedPosts
        categorySlug="hajj-guide"
        titleGold="Related"
        titleEmerald="Hajj Articles"
      />

      <PageFaq
        titleGold="Hajj Frequently Asked"
        titleEmerald="Questions"
        faqs={hajjFaqs}
      />
    </>
  )
}