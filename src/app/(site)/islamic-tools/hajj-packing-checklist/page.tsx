// app/tools/hajj-checklist/page.tsx
import type { Metadata } from "next"
import ToolHero from "@/components/Tools/tool-hero"
import HajjChecklist from "@/components/Tools/HajjChecklist"
import ToolArticle, { type ArticleSection } from "@/components/Tools/tool-article"
import ToolGuide, { type GuideSection } from "@/components/Tools/tool-guide"
import RelatedTools from "@/components/Tools/related-tools"
import ToolsFaq, { type FaqItem } from "@/components/Tools/tools-faq"

export const metadata: Metadata = {
  title: "Hajj Checklist | Manasik",
  description:
    "Track your Hajj preparation step by step, from documents to spiritual readiness. Your progress is saved on your device.",
}

const articleSections: ArticleSection[] = [
  {
    heading: "Why a Hajj checklist matters",
    paragraphs: [
      "Hajj is a once-in-a-lifetime journey for many Muslims, and it involves far more than the rituals themselves. Visas, vaccinations, flights, accommodation, health, money and family arrangements all need attention before you leave.",
      "A checklist turns that long list into small steps you can finish one at a time. It also lowers the chance of missing something important, like a vaccination certificate or an unpaid debt.",
    ],
  },
  {
    heading: "What to prepare before Hajj",
    bullets: [
      "Documents: passport, Hajj visa and permit, insurance, tickets and copies of everything.",
      "Spiritual preparation: a sincere intention, learning the rituals and duas, seeking forgiveness and settling debts.",
      "Health and fitness: a medical check-up, regular medication and walking stamina.",
      "Ihram and essentials: ihram clothing, comfortable footwear and unscented toiletries.",
      "Money and family: your budget, Saudi riyals, zakat and sharing your itinerary.",
    ],
  },
  {
    heading: "When to start preparing",
    paragraphs: [
      "Start as early as you can, ideally several months before departure. Paperwork and bookings take the longest, so handle those first. Leave the final week for packing, confirming meeting points with your group and asking family and friends for their duas.",
    ],
  },
  {
    heading: "Hajj preparation for first-time pilgrims",
    paragraphs: [
      "If this is your first Hajj, begin with the basics: learn the rituals step by step, practise the talbiyah and key duas, and ask your Hajj operator what to expect. Experienced pilgrims in your family or community are also a great source of advice.",
    ],
  },
]

const guideSections: GuideSection[] = [
  {
    heading: "How to use this checklist",
    variant: "steps",
    items: [
      "Open any section and start with what feels most urgent.",
      "Tap an item once you have completed it.",
      "Watch the progress bar fill as you go.",
      "Come back any time. Your ticks are saved on this device.",
      "Press Reset list to start again.",
    ],
  },
  {
    heading: "How it helps you",
    variant: "highlight",
    items: [
      "Keeps every task in one place instead of scattered notes.",
      "Shows your progress at a glance.",
      "Covers both the spiritual and practical sides of Hajj.",
      "Free to use, with no sign-up.",
    ],
  },
  {
    heading: "Tips for best results",
    variant: "tips",
    items: [
      "Start early and do a few items each week.",
      "Finish paperwork first, as visas and bookings take time.",
      "Share the list with your family or travel partner.",
    ],
  },
  {
    heading: "Good to know",
    variant: "note",
    text: "Your progress is saved only in this browser and is not shared with anyone. Clearing browser data or switching devices will remove it. This list is a practical guide, so always confirm visa and health requirements with your Hajj operator or the official authorities.",
  },
]

const faqs: FaqItem[] = [
  {
    question: "What should I prepare before Hajj?",
    answer:
      "Prepare your documents, your spiritual readiness, your health and fitness, your ihram and essentials, and your money and family arrangements. The checklist groups all of these into sections so you can work through them one at a time.",
  },
  {
    question: "When should I start preparing for Hajj?",
    answer:
      "Start several months before departure if you can. Visas, vaccinations and bookings take the longest, so do those first. Keep the final week for packing, confirming meeting points with your group and asking family and friends for their duas.",
  },
  {
    question: "What documents do I need for Hajj?",
    answer:
      "Commonly needed documents include your passport, Hajj visa and permit, insurance, tickets and copies of everything. Requirements can differ by country and operator, so confirm the exact list with your Hajj operator or the official authorities.",
  },
  {
    question: "How do I prepare for my first Hajj?",
    answer:
      "Learn the rituals step by step, practise the talbiyah and key duas, and ask your Hajj operator what to expect. Experienced pilgrims in your family or community are also a great source of advice.",
  },
  {
    question: "Is my checklist progress saved?",
    answer:
      "Yes, your ticks are saved on this device only and are not shared with anyone. Clearing your browser data or switching devices will remove them, and you can press Reset list at any time to start again.",
  },
]

export default function HajjChecklistPage() {
  return (
    <div>
      <ToolHero
        title="Hajj"
        highlight="Checklist"
        description="Track your Hajj preparation step by step. Tick items off as you go and your progress is saved on this device."
      />

      <div className="bg-warm-white">
        <section className="mx-auto max-w-5xl px-4 pb-10 sm:px-6 lg:px-8">
          <HajjChecklist />
        </section>

        <ToolArticle
          title="Your Complete Hajj Preparation Checklist"
          intro="Everything you need to get ready for Hajj, from documents and health to spiritual readiness, organised so you can prepare calmly and with confidence."
          sections={articleSections}
        />

        <ToolGuide
          title="How to Use the Hajj Checklist"
          sections={guideSections}
        />
      </div>

      <RelatedTools
        keys={["packing-list", "cost-estimator", "zakat-calculator", "prayer-times"]}
      />

      <ToolsFaq faqs={faqs} title="Hajj Checklist" highlight="FAQs" />
    </div>
  )
}