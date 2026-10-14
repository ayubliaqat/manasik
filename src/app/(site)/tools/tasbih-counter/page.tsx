// app/tools/tasbih-counter/page.tsx
import type { Metadata } from "next"
import ToolHero from "@/components/Tools/tool-hero"
import TasbihCounter from "@/components/Tools/TasbihCounter"
import ToolArticle, { type ArticleSection } from "@/components/Tools/tool-article"
import ToolGuide, { type GuideSection } from "@/components/Tools/tool-guide"
import RelatedTools from "@/components/Tools/related-tools"
import ToolsFaq, { type FaqItem } from "@/components/Tools/tools-faq"

export const metadata: Metadata = {
  title: "Tasbih Counter | Manasik",
  description:
    "A free online tasbih counter for dhikr. Tap to count SubhanAllah, Alhamdulillah, Allahu Akbar and more, set a target of 33, 99, 100 or your own, and keep your count saved on your device.",
}

const articleSections: ArticleSection[] = [
  {
    heading: "What is a tasbih?",
    paragraphs: [
      "A tasbih is a string of beads used to keep count while remembering Allah (dhikr). The word also refers to saying SubhanAllah, \"Glory be to Allah\". Many Muslims count their dhikr so they can keep a steady habit and not lose track.",
      "This counter does the same job on your phone or computer. Tap once for each recitation and the ring fills as you get closer to your target.",
    ],
  },
  {
    heading: "Common dhikr and counts",
    paragraphs: [
      "A widely practised routine after the obligatory prayers is 33 times SubhanAllah, 33 times Alhamdulillah and 34 times Allahu Akbar. Many people also recite La ilaha illallah and Astaghfirullah throughout the day.",
      "There is no single required number for every dhikr, so you can choose a target that suits you, or set your own.",
    ],
  },
  {
    heading: "Features of this counter",
    bullets: [
      "Five common dhikr, each with Arabic, transliteration and meaning, and each with its own count.",
      "Targets of 33, 99, 100 or a custom number, with a progress ring and a count of completed rounds.",
      "Undo your last tap if you tapped by mistake, or reset one dhikr or everything.",
      "Short vibration on each tap and a longer one when you finish a round, on supported phones.",
      "Your counts stay saved on your device, so you can come back to them later.",
    ],
  },
  {
    heading: "Using it during Hajj and Umrah",
    paragraphs: [
      "During Tawaf, Sa'i and long waits between rituals, a phone counter is easy to carry and use with one thumb. Keep your screen brightness low to save battery, and keep your phone secure in a crowded place.",
    ],
  },
]

const guideSections: GuideSection[] = [
  {
    heading: "How to use the Tasbih Counter",
    variant: "steps",
    items: [
      "Choose the dhikr you want to recite.",
      "Pick a target per round: 33, 99, 100 or a custom number.",
      "Tap the large circle once for each recitation.",
      "When the ring turns green, your round is complete. Keep tapping to start the next one.",
      "Use Undo last if you tap by mistake.",
    ],
  },
  {
    heading: "How it helps you",
    variant: "highlight",
    items: [
      "Keeps your count accurate so you can focus on the words.",
      "Remembers your progress on your device.",
      "Tracks rounds and totals across all your dhikr.",
      "Free to use, with no sign-up.",
    ],
  },
  {
    heading: "Tips for best results",
    variant: "tips",
    items: [
      "Hold your phone in one hand and tap with your thumb for easy one-handed counting.",
      "Turn on vibration so you can count without looking at the screen.",
      "Use a custom target if your routine is different from 33, 99 or 100.",
    ],
  },
  {
    heading: "Good to know",
    variant: "note",
    text: "Your counts are stored only in your browser on this device. Clearing your browser data, or using private browsing, will remove them. Vibration is supported on most Android phones but not on iPhones.",
  },
]

const faqs: FaqItem[] = [
  {
    question: "What is a tasbih counter?",
    answer:
      "A tasbih counter is a digital version of a string of prayer beads. You tap once for each recitation of your dhikr, and the ring fills as you get closer to your target.",
  },
  {
    question: "What is the common dhikr routine after prayer?",
    answer:
      "A widely practised routine after the obligatory prayers is 33 times SubhanAllah, 33 times Alhamdulillah and 34 times Allahu Akbar. There is no single required number for every dhikr, so you can choose a target that suits you.",
  },
  {
    question: "Can I set my own target?",
    answer:
      "Yes. You can choose 33, 99, 100 or a custom number, and the counter tracks your completed rounds.",
  },
  {
    question: "What if I tap by mistake?",
    answer:
      "Use Undo last to remove your most recent tap. You can also reset a single dhikr or everything.",
  },
  {
    question: "Does it vibrate when I tap?",
    answer:
      "Yes, on supported phones there is a short vibration on each tap and a longer one when you finish a round. Vibration works on most Android phones but not on iPhones.",
  },
  {
    question: "Are my counts saved?",
    answer:
      "Yes, but only in your browser on this device. Clearing your browser data, or using private browsing, will remove them.",
  },
]

export default function TasbihCounterPage() {
  return (
    <div>
      <ToolHero
        title="Tasbih"
        highlight="Counter"
        description="Count your dhikr with a single tap, track your rounds, and keep your progress saved on your device."
      />

      <div className="bg-warm-white">
        <section className="mx-auto max-w-5xl px-4 pb-10 sm:px-6 lg:px-8">
          <TasbihCounter />
        </section>

        <ToolArticle
          title="Count Your Dhikr with Ease"
          intro="A simple guide to the tasbih, common dhikr counts, and how to get the most from this counter."
          sections={articleSections}
        />

        <ToolGuide title="How to Use the Tasbih Counter" sections={guideSections} />
      </div>

      <RelatedTools
        keys={["prayer-times", "noorani-qaida", "hajj-checklist", "ramadan-counter"]}
      />

      <ToolsFaq faqs={faqs} title="Tasbih Counter" highlight="FAQs" />
    </div>
  )
}