// app/tools/noorani-qaida/page.tsx
import type { Metadata } from "next";
import ToolHero from "@/components/Tools/tool-hero";
import NooraniQaida from "@/components/Tools/NooraniQaida";
import ToolArticle, {
  type ArticleSection,
} from "@/components/Tools/tool-article";
import ToolGuide, { type GuideSection } from "@/components/Tools/tool-guide";
import RelatedTools from "@/components/Tools/related-tools";
import ToolsFaq, { type FaqItem } from "@/components/Tools/tools-faq";

export const metadata: Metadata = {
  title: "Free Noorani Qaida Online – Learn and Practise Arabic Letters",
  description:
    "Practise Noorani Qaida online for free. Learn Arabic letters, Harakat, Tanween, Sukoon, Shaddah and Madd with interactive flashcards and sound.",
  keywords: [
    "Noorani Qaida online",
    "Noorani Qaida",
    "learn Arabic letters",
    "Arabic alphabet for beginners",
    "learn to read Quran",
    "Harakat Fatha Kasra Damma",
    "Tanween Sukoon Shaddah Madd",
    "Noorani Qaida flashcards",
    "Noorani Qaida for kids",
  ],
  alternates: {
    canonical: "https://www.islam-religion.com/islamic-tools/noorani-qaida",
  },
  openGraph: {
    title: "Free Noorani Qaida Online – Learn and Practise Arabic Letters",
    description:
      "Practise Noorani Qaida online for free. Learn Arabic letters, Harakat, Tanween, Sukoon, Shaddah and Madd with interactive flashcards and sound.",
    url: "https://www.islam-religion.com/islamic-tools/noorani-qaida",
    siteName: "Islam Religion",
    type: "website",
  },
};

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
  {
    heading: "Practise Noorani Qaida Online for Free",
    paragraphs: [
      "You do not need to go through every lesson at once. Choose a section, open a flashcard and practise the letter or reading mark shown on the screen. You can check its sound, move to another item and return to difficult ones whenever you want.",
      "The tool includes six learning sections with 165 practice items in total:",
    ],
    bullets: [
      "Arabic Letters: Recognise the Arabic alphabet.",
      "Harakat: Practise Fatha, Kasra and Damma.",
      "Tanween: Learn the double vowel marks.",
      "Sukoon: Understand letters without a short vowel.",
      "Shaddah: Practise doubled letters.",
      "Madd: Learn basic long vowel sounds.",
    ],
    closing: [
      "Start with the first section if you are a beginner. If you already know the alphabet, you can choose another section to revise the reading marks you find difficult.",
    ],
  },
  {
    heading: "What Will You Learn in Each Noorani Qaida Lesson?",
    paragraphs: [
      "Each section focuses on a different part of Arabic reading. You can practise the items separately, which makes it easier to understand the difference between letters and their reading marks.",
    ],
    subsections: [
      {
        heading: "Arabic Letters (Huroof)",
        paragraphs: [
          "Start by learning the Arabic alphabet. This section helps you recognise the 28 basic Arabic letters and become familiar with their shapes and sounds.",
          "Look carefully at each letter, especially those that have similar shapes but different dots or pronunciations. Try saying the sound yourself before checking it with the flashcard.",
        ],
      },
      {
        heading: "Harakat (Fatha, Kasra and Damma)",
        paragraphs: [
          "Have you ever wondered why the same Arabic letter can sound different? The answer is often its vowel mark.",
          "Harakat are short vowel signs placed above or below Arabic letters. The three basic marks are:",
        ],
        bullets: [
          "Fatha (َ): Short 'a' sound.",
          "Kasra (ِ): Short 'i' sound.",
          "Damma (ُ): Short 'u' sound.",
        ],
        closing: [
          "Use the flashcards to practise each mark with Arabic letters. Pay attention to how the pronunciation changes when you switch from one vowel to another.",
        ],
      },
      {
        heading: "Tanween (Double Vowel Marks)",
        paragraphs: [
          "Tanween consists of double vowel marks that appear at the end of certain Arabic words. These marks add an 'n' sound to the ending.",
          "You will practise the three forms:",
        ],
        bullets: [
          "Fathatain (ً): Double fatha.",
          "Kasratain (ٍ): Double kasra.",
          "Dammatain (ٌ): Double damma.",
        ],
        closing: [
          "Practise recognising each form and saying its sound. This will help you become familiar with the different endings used in Arabic reading.",
        ],
      },
      {
        heading: "Sukoon (Jazm)",
        paragraphs: [
          "Sukoon (ْ) is a mark placed above a letter to show that it has no short vowel of its own.",
          "When you practise this section, notice how the letter is read without adding a separate fatha, kasra or damma sound. Take your time with each card and repeat difficult examples.",
        ],
      },
      {
        heading: "Shaddah (Tashdeed)",
        paragraphs: [
          "Shaddah (ّ) shows that an Arabic letter is doubled in pronunciation. It is important to recognise this mark because reading a doubled letter like an ordinary single letter can change the pronunciation.",
          "Use the flashcards to identify Shaddah and practise saying the sound. Your Quran teacher can help you understand the correct pronunciation and emphasis.",
        ],
      },
      {
        heading: "Madd (Long Vowel Sounds)",
        paragraphs: [
          "Madd means extending a vowel sound. In basic Arabic reading, Alif, Waw and Ya can act as letters of prolongation when the required conditions are present.",
          "This section helps you recognise basic long vowel patterns and understand how they differ from short vowel sounds. Practise listening and repeating, and ask your teacher to check the length of your pronunciation.",
        ],
      },
    ],
  },
  {
    heading: "How to Use Our Online Noorani Qaida Tool",
    paragraphs: [
      "Getting started is simple. You can choose any available section and practise directly through the flashcards. Try to answer each card yourself before revealing the sound. This gives you a chance to test your knowledge instead of simply looking at the answers.",
      "Follow these steps:",
    ],
    bullets: [
      "Choose a lesson: Select one of the six learning sections.",
      "View a flashcard: Look at the Arabic letter or mark.",
      "Try the pronunciation: Say the sound aloud.",
      "Reveal the answer: Tap Show sound.",
      "Listen: Use the available audio to hear the sound.",
      "Mark as learned: Save items you recognise confidently.",
      "Try Random: Practise with a different item.",
      "Check your progress: Review your completed items.",
    ],
    closing: [
      "You can also use the item grid to open a particular card whenever you want to revise it.",
    ],
  },
  {
    heading: "Track Your Noorani Qaida Learning Progress",
    paragraphs: [
      "Learning becomes easier when you can see what you have already practised. The progress tracker helps you keep an eye on the items you have marked as learned in each section.",
      "You do not have to finish all 165 items in one session. Work through a few cards, mark the ones you know and return to the remaining items later.",
      "A few useful ways to use the tracker:",
    ],
    bullets: [
      "Mark completed items",
      "Review unfinished cards",
      "Repeat difficult sounds",
      "Check section progress",
      "Return for regular revision",
    ],
    closing: [
      "Your progress is saved in your browser on your device. It is not stored in an online account. If you clear your browser data or use private browsing, your saved progress may be lost.",
    ],
  },
  {
    heading: "Tips for Better Noorani Qaida Practice",
    paragraphs: [
      "Are you finding some Arabic letters harder than others? That is completely normal when you are learning a new alphabet. Instead of rushing through the flashcards, spend more time on the sounds and marks you find difficult.",
      "Try these simple tips during your practice:",
    ],
    bullets: [
      "Start with Arabic letters",
      "Learn one section at a time",
      "Say every sound aloud",
      "Repeat difficult cards",
      "Use Random for revision",
      "Practise a little every day",
      "Ask a teacher to check pronunciation",
    ],
    closing: [
      "The audio in this tool is computer-generated and is intended as a practice aid. Some Arabic sounds require careful guidance, so practise with a qualified Quran teacher to learn their correct pronunciation.",
    ],
  },
  {
    heading: "Continue Your Daily Islamic Practice",
    paragraphs: [
      "Learning to read the Quran is a valuable step, and you can continue building your daily worship routine alongside it. If you want to practise remembering Allah, try our Tasbih Counter for counting your daily dhikr. You can also explore our Duas collection to find supplications for different occasions.",
    ],
  },
];

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
];

const faqs: FaqItem[] = [
  {
    question: "What is Noorani Qaida?",
    answer:
      "Noorani Qaida is a beginner's primer for learning to read the Quran. It teaches the Arabic letters, their sounds and the basic rules of reading, step by step.",
  },
  {
    question: "Is the online Noorani Qaida tool free?",
    answer:
      "Yes. You can practise for free, and you do not need to create an account.",
  },
  {
    question: "What can I learn with this tool?",
    answer:
      "It has six sections: Arabic Letters, Harakat, Tanween, Sukoon, Shaddah and Madd. Together they hold 165 practice items.",
  },
  {
    question: "Where should a beginner start?",
    answer:
      "Start with the Arabic Letters section and learn to recognise the 28 basic letters. If you already know the alphabet, jump straight to the reading marks you find difficult.",
  },
  {
    question: "How do the flashcards work?",
    answer:
      "Pick a section and look at the letter or mark on the card. Say the sound aloud, then tap Show sound to check yourself and listen to the audio. Mark items you know as learned, or tap Random to practise a different one.",
  },
  {
    question: "Is the audio recited by a teacher?",
    answer:
      "No. The audio is computer-generated and works as a practice aid. Some Arabic sounds need careful guidance, so practise with a qualified Quran teacher to learn the correct pronunciation.",
  },
  {
    question: "Does the tool save my progress?",
    answer:
      "Yes, in your browser on the device you use. It is not stored in an online account. If you clear your browser data or use private browsing, your saved progress may be lost.",
  },
  {
    question: "Can children use it?",
    answer:
      "Yes. Parents can sit with their child and practise one lesson at a time. A qualified Quran teacher can then check the pronunciation.",
  },
];
const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Free Noorani Qaida Online – Learn and Practise Arabic Letters",
  url: "https://www.islam-religion.com/islamic-tools/noorani-qaida",
  description:
    "Practise Noorani Qaida online for free. Learn Arabic letters, Harakat, Tanween, Sukoon, Shaddah and Madd with interactive flashcards and sound.",
  inLanguage: "en",
  isPartOf: {
    "@type": "WebSite",
    name: "Islam Religion",
    url: "https://www.islam-religion.com/",
  },
};
export default function NooraniQaidaPage() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ToolHero
        title="Noorani Qaida"
        highlight="for Beginners"
        description="Learn the Arabic letters and reading marks one flashcard at a time. Listen to each sound, mark what you know and track your progress across six sections."
      />

      <div className="bg-warm-white">
        <section className="mx-auto max-w-5xl px-4 pb-10 sm:px-6 lg:px-8">
          <NooraniQaida />
        </section>
        <ToolGuide
          title="How to Use the Noorani Qaida Practice"
          sections={guideSections}
        />
        <ToolArticle
          title="Free Noorani Qaida Online – Learn Arabic Letters Step by Step"
          intro="Do you want to learn how to read the Quran? Are you just starting to recognise Arabic letters? Do you sometimes find it difficult to understand Fatha, Kasra, Damma or other Arabic reading marks?

Our free online Noorani Qaida tool makes it easier to practise these basics at your own pace. You can explore Arabic letters, listen to their sounds, learn different reading marks and test yourself with interactive flashcards.

Whether you are a beginner, a parent helping a child learn, or someone who wants to revise Arabic reading, you can use this tool to practise one lesson at a time. Start with the Arabic letters, move through the other sections and keep track of the items you have learned."
          sections={articleSections}
        />
      </div>

      <RelatedTools
        keys={[
          "prayer-times",
          "mosque-finder",
          "hijri-converter",
          "hajj-checklist",
        ]}
      />

      <ToolsFaq faqs={faqs} title="Noorani Qaida" highlight="FAQs" />
    </div>
  );
}
