// app/tools/noorani-qaida/page.tsx
import type { Metadata } from "next"
import ToolHero from "@/components/Tools/tool-hero"
import NooraniQaida from "@/components/Tools/NooraniQaida"
import ToolArticle, { type ArticleSection } from "@/components/Tools/tool-article"
import ToolGuide, { type GuideSection } from "@/components/Tools/tool-guide"
import RelatedTools from "@/components/Tools/related-tools"
import ToolsFaq, { type FaqItem } from "@/components/Tools/tools-faq"

export const metadata: Metadata = {
  title: "Noorani Qaida | Manasik",
  description:
    "Practise the Noorani Qaida online. Learn the Arabic letters, harakat, tanween, sukoon, shaddah and madd with simple flashcards, and keep your progress saved on your device.",
}

const articleSections: ArticleSection[] = [
  {
    heading: "What is the Noorani Qaida?",
    paragraphs: [
      "The Noorani Qaida is a beginner's primer for learning to read the Arabic of the Quran. It is used in many homes, madrasas and mosques, especially across South Asia, and it takes a learner step by step from single letters to reading full words.",
      "Learning to read the Quran correctly starts with knowing each letter and its sound. This tool gives you a simple way to practise those first foundations on your phone or computer.",
    ],
  },
  {
    heading: "What this tool covers",
    bullets: [
      "Letters: the 28 Arabic letters, with the sound of each one.",
      "Harakat: the short vowels fatha, kasra and damma.",
      "Tanween: the doubled vowel marks that add an “n” sound.",
      "Sukoon: the mark that closes a letter so it has no vowel.",
      "Shaddah: the mark that doubles a letter.",
      "Madd: the long vowels made with alif, ya and waw.",
    ],
  },
  {
    heading: "How to practise",
    paragraphs: [
      "Look at the card, say the sound out loud, and only then tap Show sound to check. Saying it first is what builds your memory, so try not to peek.",
      "Arabic is read from right to left. When a card shows several forms, start from the one on the right.",
      "Mark an item as learned when you can say it correctly without help. Come back to the ones you have not marked, and use Random to test yourself.",
    ],
  },
  {
    heading: "Learn with a teacher",
    paragraphs: [
      "Some Arabic sounds, such as the heavy letters and the throat letters, do not exist in English, and they are hard to learn from text alone. A qualified teacher can listen to you and correct your pronunciation.",
      "The full Noorani Qaida also goes further than the lessons here. Use this tool to revise and practise alongside your teacher or your Qaida book.",
    ],
  },
]

const guideSections: GuideSection[] = [
  {
    heading: "How to use the Noorani Qaida practice",
    variant: "steps",
    items: [
      "Choose a lesson: Letters, Harakat, Tanween, Sukoon, Shaddah or Madd.",
      "Look at the card and say the sound out loud.",
      "Tap Show sound to check your answer.",
      "Tap Mark as learned when you are confident, then tap Next.",
      "Use the grid to jump to any item, or Random to test yourself.",
    ],
  },
  {
    heading: "How it helps you",
    variant: "highlight",
    items: [
      "Short, focused practice for the first steps of Quran reading.",
      "Tracks what you have learned in each lesson and overall.",
      "Remembers your progress on your device.",
      "Free to use, with no sign-up.",
    ],
  },
  {
    heading: "Tips for best results",
    variant: "tips",
    items: [
      "Practise a little every day. Ten minutes beats one long session.",
      "Always say the sound before you reveal it.",
      "Revisit the letters you have not marked as learned.",
    ],
  },
  {
    heading: "Good to know",
    variant: "note",
    text: "Your progress is stored only in your browser on this device. Clearing your browser data, or using private browsing, will remove it. This tool is a practice aid and does not replace a qualified teacher.",
  },
]

const faqs: FaqItem[] = [
  {
    question: "What is the Noorani Qaida?",
    answer:
      "The Noorani Qaida is a beginner's primer for learning to read the Arabic of the Quran. It takes a learner step by step from single letters to reading full words, and it is used in many homes, madrasas and mosques.",
  },
  {
    question: "What does this tool teach?",
    answer:
      "It covers the 28 Arabic letters, the short vowels (harakat), tanween, sukoon, shaddah and madd. Each lesson uses simple flashcards so you can practise one item at a time.",
  },
  {
    question: "How should I practise with the flashcards?",
    answer:
      "Look at the card, say the sound out loud, and only then tap Show sound to check. Mark an item as learned when you can say it correctly without help, and use Random to test yourself.",
  },
  {
    question: "Which direction do I read Arabic?",
    answer:
      "Arabic is read from right to left. When a card shows several forms, start from the one on the right.",
  },
  {
    question: "Do I still need a teacher?",
    answer:
      "Yes. Some Arabic sounds, such as the heavy letters and the throat letters, are hard to learn from text alone. A qualified teacher can correct your pronunciation, and this tool is best used to revise alongside your teacher or Qaida book.",
  },
  {
    question: "Is my progress saved?",
    answer:
      "Yes, but only in your browser on this device. Clearing your browser data, or using private browsing, will remove it.",
  },
]

export default function NooraniQaidaPage() {
  return (
    <div>
      <ToolHero
        title="Noorani"
        highlight="Qaida"
        description="Practise the Arabic letters and the basic reading marks with simple flashcards, and track what you have learned."
      />

      <div className="bg-warm-white">
        <section className="mx-auto max-w-5xl px-4 pb-10 sm:px-6 lg:px-8">
          <NooraniQaida />
        </section>

        <ToolArticle
          title="Learn to Read the Quran, Step by Step"
          intro="A simple introduction to the Noorani Qaida, what the first lessons cover, and how to practise well."
          sections={articleSections}
        />

        <ToolGuide title="How to Use the Noorani Qaida Practice" sections={guideSections} />
      </div>

      <RelatedTools
        keys={["prayer-times", "mosque-finder", "hijri-converter", "hajj-checklist"]}
      />

      <ToolsFaq faqs={faqs} title="Noorani Qaida" highlight="FAQs" />
    </div>
  )
}