// app/tools/packing-list/page.tsx
import type { Metadata } from "next"
import ToolHero from "@/components/Tools/tool-hero"
import UmrahPackingList from "@/components/Tools/UmrahPackingList"
import ToolArticle, { type ArticleSection } from "@/components/Tools/tool-article"
import ToolGuide, { type GuideSection } from "@/components/Tools/tool-guide"
import RelatedTools from "@/components/Tools/related-tools"
import ToolsFaq, { type FaqItem } from "@/components/Tools/tools-faq"

export const metadata: Metadata = {
  title: "Packing List for Hajj and Umrah | Manasik",
  description:
    "A simple packing list for Hajj and Umrah for men, women and families with children. Tick items off as you pack, and your progress is saved on your device.",
}

const articleSections: ArticleSection[] = [
  {
    heading: "Why a packing list matters",
    paragraphs: [
      "Packing for Hajj or Umrah is different from packing for a normal trip. You will walk long distances, stay in ihram for part of the journey, and carry your own bag through airports, hotels and transfers.",
      "A good list helps you take what you really need and leave the rest at home. It also saves money, since forgotten items cost more to replace on the way.",
    ],
  },
  {
    heading: "What to pack",
    bullets: [
      "Clothing: ihram sets for men, modest loose clothing for women, comfortable sandals and a light jacket for cold air conditioning.",
      "Toiletries: unscented soap, shampoo and sun cream, since scented products are avoided while in ihram.",
      "Health: regular medication with a doctor's letter, pain relief, rehydration salts and blister plasters.",
      "Documents and money: passport, visa, bookings, vaccination certificates and some Saudi riyals.",
      "Electronics: phone, charger, power bank and a plug adaptor if needed.",
      "Worship and comfort: a foldable prayer mat, dua book, water bottle, tasbih and a small bag for daily use.",
    ],
  },
  {
    heading: "Packing for men, women and children",
    paragraphs: [
      "Needs differ a little from person to person. Choose Men, Women or With children above the list and it will show the items that apply to you, such as ihram for men, sanitary supplies for women, or snacks and spare clothes for children.",
    ],
  },
  {
    heading: "Packing light",
    paragraphs: [
      "Take fewer items that are easy to wash and dry. Keep your documents, medicines and a change of clothes in your hand luggage, and leave some space in your bag for gifts and Zamzam on the way back.",
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

export default function PackingListPage() {
  return (
    <div>
      <ToolHero
        title="Packing"
        highlight="List"
        description="Everything to pack for Hajj and Umrah, for men, women and families. Tick items off as you go and your progress is saved on this device."
      />

      <div className="bg-warm-white">
        <section className="mx-auto max-w-5xl px-4 pb-10 sm:px-6 lg:px-8">
          <UmrahPackingList />
        </section>

        <ToolArticle
          title="Your Complete Packing List for Hajj and Umrah"
          intro="A simple, practical list of what to take, so you can pack calmly, travel light and focus on your worship."
          sections={articleSections}
        />

        <ToolGuide
          title="How to Use the Packing List"
          sections={guideSections}
        />
      </div>

      <RelatedTools
        keys={["hajj-checklist", "cost-estimator", "prayer-times", "mosque-finder"]}
      />

      <ToolsFaq faqs={faqs} title="Packing List" highlight="FAQs" />
    </div>
  )
}