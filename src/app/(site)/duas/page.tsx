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

const duaTools: PageTool[] = [
  {
    title: "Tasbih Counter",
    description: "Keep track of your dhikr with a simple digital counter.",
    href: "/tools/tasbih-counter",
    icon: "tasbih",
    accent: "emerald",
  },
  {
    title: "99 Names of Allah",
    description: "Explore the beautiful names of Allah and their meanings.",
    href: "/tools/99-names-of-allah",
    icon: "names",
    accent: "gold",
  },
  {
    title: "Qibla Finder",
    description: "Find the direction of the Kaaba from anywhere in the world.",
    href: "/tools/qibla-finder",
    icon: "qibla",
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

const duaSections: ArticleSection[] = [
  {
    heading: "Why Make Dua During Umrah?",
    paragraphs: [
      "Dua is the heart of worship. Umrah gives you many blessed moments and places to turn to Allah, including while travelling in ihram, during tawaf, at Safa and Marwa, and when drinking Zamzam.",
      "There is no single dua you must recite for every circuit of tawaf or sa'i. You may supplicate in your own language, ask for what is in your heart, and use the authentic duas below as a foundation.",
    ],
  },
  {
    heading: "Duas for Key Moments of Umrah",
    bullets: [
      "Travel: Begin your journey by mentioning Allah's name, saying Bismillah, then Allahu Akbar, and reciting the dua for travel taught by the Prophet ﷺ.",
      "Talbiyah (after entering ihram): لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ، لَا شَرِيكَ لَكَ.",
      "Entering Masjid al-Haram: Enter with your right foot, send blessings upon the Prophet ﷺ and ask Allah to open the doors of His mercy.",
      "Between the Yemeni corner and the Black Stone during tawaf: رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ.",
      "Upon approaching Safa: Recite the verse beginning إِنَّ الصَّفَا وَالْمَرْوَةَ مِن شَعَائِرِ اللَّهِ, then say أَبْدَأُ بِمَا بَدَأَ اللَّهُ بِهِ, face the Kaaba, praise Allah and make dua.",
      "Drinking Zamzam: Face the qiblah, say Bismillah, drink in three sips and make dua for what you need in this world and the next.",
    ],
  },
  {
    heading: "Tips for Making Dua with Presence",
    paragraphs: [
      "Authentic duas are best learned from reliable sources. Review the wording in advance, and consult a trusted scholar or your group guide if you are unsure about a specific dua or ruling.",
    ],
    bullets: [
      "Prepare a short list of personal needs, family members and loved ones you want to pray for.",
      "Start with praise of Allah and blessings upon the Prophet ﷺ, then ask with humility and certainty.",
      "Use your own language. Allah understands every tongue and every need.",
      "Keep a small, lightweight dua booklet or notes app handy, but try not to let reading distract from your focus.",
      "Be patient and persistent, and make dua during moments of difficulty as well as ease.",
      "Remember that the rites of Umrah are acts of worship themselves, so focus on doing them correctly and sincerely.",
    ],
  },
]

const duaFaqs: FaqItem[] = [
  {
    question: "Do I have to recite a specific dua for each circuit of tawaf?",
    answer:
      "No. There is no fixed dua required for each of the seven circuits. You may remember Allah, recite Quran or make any dua you like. Many pilgrims recite the dua between the Yemeni corner and the Black Stone.",
  },
  {
    question: "Can I make dua in my own language?",
    answer:
      "Yes. You can make dua in any language you speak. Using authentic Arabic duas is recommended where you know them, but heartfelt supplication in your own words is welcome.",
  },
  {
    question: "What is the talbiyah and when do I say it?",
    answer:
      "The talbiyah is the response to Allah's call that pilgrims recite after entering ihram. For Umrah, it is generally recited until you begin tawaf. Learn the wording and its meaning before you travel.",
  },
  {
    question: "Is it necessary to memorise duas before going for Umrah?",
    answer:
      "It is not necessary to memorise everything. Learning the talbiyah and a few key duas is helpful, and you can carry a reliable booklet or notes for others. Understanding the meaning will help you connect with your worship.",
  },
  {
    question: "When are duas most likely to be answered?",
    answer:
      "Authentic sources mention times such as prostration, the last third of the night, between the adhan and iqamah, and while travelling. Make dua often with sincerity, and trust that Allah responds in the way that is best for you.",
  },
  {
    question: "Where can I find authentic duas for Umrah?",
    answer:
      "Look for guidance based on the Quran and authentic Sunnah, from reputable scholars and trusted publications. Check the references of any dua before you memorise or share it.",
  },
]

export default function Page() {
  return (
    <>
      <PageHero
        title="Your Complete Guide to"
        highlight="Duas"
        image="/images/duas-image.png" 
        description={
          <>
            Discover authentic duas for every stage of your journey, from
            travelling and entering ihram to tawaf, sai and Zamzam, with{" "}
            <PageHero.Mark>clear guidance,</PageHero.Mark> practical tips and
            free tools to help you pray with presence and sincerity.
          </>
        }
        primaryCta={{
          label: "Umrah Checklist",
          href: "/tools/umrah-checklist",
        }}
        secondaryCta={{
          label: "Read Dua Blogs",
          href: "/blog",
          Icon: BookOpen,
        }}
      />

      <PageTools
        titleGold="Free Tools for"
        titleEmerald="Your Journey"
        description="Prepare for your pilgrimage with practical tools to organise your essentials, plan your budget and keep track of important steps."
        tools={duaTools}
      />

      <PageContent
        titleGold="Duas Explained"
        titleEmerald="Moment by Moment"
        intro="Learn the key duas of Umrah, when to recite them and how to make heartfelt supplication throughout your pilgrimage."
        sections={duaSections}
      />

      <PageRelatedPosts
        categorySlug="duas"
        titleGold="Related"
        titleEmerald="Dua Articles"
      />

      <PageFaq
        titleGold="Dua Frequently Asked"
        titleEmerald="Questions"
        faqs={duaFaqs}
      />
    </>
  )
}