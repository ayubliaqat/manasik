
import type { Metadata } from "next"
import ToolHero from "@/components/Tools/tool-hero"
import AsmaUlHusna from "@/components/Tools/AsmaUlHusna"
import ToolArticle, { type ArticleSection } from "@/components/Tools/tool-article"
import ToolGuide, { type GuideSection } from "@/components/Tools/tool-guide"

export const metadata: Metadata = {
  title: "99 Names of Allah with Meanings | Manasik",
  description:
    "Explore the 99 Names of Allah (Asma ul Husna) with Arabic text, English transliteration, meanings, and reflections. Search, save favorites, and track your memorization progress.",
}

const articleSections: ArticleSection[] = [
  {
    heading: "What are the 99 Names of Allah?",
    paragraphs: [
      "The 99 Names of Allah are known as Asma ul Husna, meaning the Most Beautiful Names. Each name conveys an aspect of Allah's perfection, majesty, mercy, knowledge, power, or care for His creation.",
      "The Quran teaches: 'And to Allah belong the best names, so invoke Him by them.' (Surah Al-A'raf 7:180). Muslims learn these names, reflect on their meanings, and call upon Allah through them in supplication.",
    ],
  },
  {
    heading: "Why learn the Names of Allah?",
    paragraphs: [
      "Learning the Names helps Muslims deepen their understanding of Allah and reflect on His attributes. Names such as Ar-Rahman (The Most Compassionate), Al-Ghafur (The All-Forgiving), and Ar-Razzaq (The Provider) remind believers of Allah's mercy, forgiveness, and provision.",
      "The Prophet Muhammad ﷺ taught the virtue of enumerating Allah's ninety-nine names. Learning them can involve memorising their wording, understanding their meanings, and reflecting on what they teach.",
    ],
  },
  {
    heading: "What you can do with this tool",
    bullets: [
      "Explore all 99 names with Arabic script and English transliteration.",
      "Read a concise English meaning and a short explanation for every name.",
      "Search by Arabic, transliteration, meaning, or name number.",
      "Save your favourite names for convenient access.",
      "Mark names as memorized and keep track of your progress.",
      "Review your saved progress on the same browser and device.",
    ],
  },
  {
    heading: "The Names of Allah in everyday worship",
    paragraphs: [
      "The Names can enrich dua and personal reflection. A Muslim may call upon Allah using a relevant name, asking for forgiveness through His mercy, guidance through His wisdom, or provision from Him.",
      "The aim is not simply to finish a list. Take time to understand each name, reflect on its meaning, and learn how it informs your relationship with Allah.",
    ],
  },
]

const guideSections: GuideSection[] = [
  {
    heading: "How to use the 99 Names tool",
    variant: "steps",
    items: [
      "Browse the names in order, beginning with Ar-Rahman.",
      "Use the search field to find a name by Arabic text, English spelling, meaning, or number.",
      "Expand Meaning and reflection on any card to read its explanation.",
      "Select a name to open its larger detail panel.",
      "Use the heart icon to save a favourite name.",
      "Mark names as memorized to track your learning progress.",
    ],
  },
  {
    heading: "Build your memorization habit",
    variant: "highlight",
    items: [
      "Learn a small number of names each day rather than rushing through the entire list.",
      "Practise the Arabic pronunciation alongside the English transliteration.",
      "Review previously learned names regularly.",
      "Reflect on the meaning of each name as you learn it.",
    ],
  },
  {
    heading: "Tips for learning the names",
    variant: "tips",
    items: [
      "Read each Arabic name aloud and listen to a reliable recitation when available.",
      "Connect each name with its meaning to make it easier to remember.",
      "Use Favorites to collect names you want to revise.",
      "Revisit your memorization list regularly to reinforce what you have learned.",
    ],
  },
  {
    heading: "Good to know",
    variant: "note",
    text: "Your favourites and memorization progress are saved in your browser on this device. Clearing browser data or using private browsing may remove saved progress. English translations are concise explanations, and some names have different transliterations or meanings across scholarly sources. The displayed sequence follows a widely circulated traditional list.",
  },
]

export default function AsmaUlHusnaPage() {
  return (
    <div>
      <ToolHero
        title="99 Names"
        highlight="of Allah"
        description="Explore the Beautiful Names of Allah, understand their meanings, and build your memorization habit one name at a time."
      />

      <div className="bg-warm-white">
        <section className="mx-auto max-w-6xl px-4 pb-10 sm:px-6 lg:px-8">
          <AsmaUlHusna />
        </section>

        <ToolArticle
          title="Discover the 99 Beautiful Names of Allah"
          intro="Learn about Asma ul Husna, explore the meanings behind the names, and develop a meaningful habit of reflection and memorization."
          sections={articleSections}
        />

        <ToolGuide
          title="How to Use the 99 Names of Allah Tool"
          sections={guideSections}
        />
      </div>
    </div>
  )
}
