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

const ziyaratTools: PageTool[] = [
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
    title: "Prayer Times",
    description: "See today's prayer times for your location.",
    href: "/tools/prayer-times",
    icon: "clock",
    accent: "gold",
  },
]

const ziyaratSections: ArticleSection[] = [
  {
    heading: "What Is Ziyarat?",
    paragraphs: [
      "Ziyarat means visiting. In the context of pilgrimage, it refers to visiting the blessed places connected to the life of the Prophet ﷺ and the early Muslim community, mainly in Madinah and Makkah.",
      "Ziyarat is not one of the rites of Umrah or Hajj, and your pilgrimage is complete without it. Many pilgrims choose to visit these places to reflect on the history of Islam, strengthen their faith and learn from the lives of those who came before us.",
    ],
  },
  {
    heading: "Key Places to Visit",
    bullets: [
      "Masjid an-Nabawi in Madinah, including the Rawdah, where you can pray and send salawat upon the Prophet ﷺ.",
      "The Prophet's ﷺ grave and the graves of Abu Bakr and Umar (may Allah be pleased with them), where visitors offer salam in a respectful, quiet manner.",
      "Jannat al-Baqi, the cemetery in Madinah where many Companions and members of the Prophet's family are buried.",
      "Masjid Quba, the first mosque built in Islam, where many pilgrims pray two rakats after making wudu at their accommodation.",
      "Mount Uhud and the martyrs' cemetery, a reminder of the Battle of Uhud and the sacrifice of the Companions.",
      "Places in Makkah such as Jabal al-Nour and the Cave of Hira, Jabal Thawr, and the area of Mina, Arafat and Muzdalifah, visited for learning and reflection.",
    ],
  },
  {
    heading: "How to Prepare for Ziyarat",
    paragraphs: [
      "Learn about each place before you visit, so you understand its history and the correct manners of visiting. Ziyarat is an opportunity to remember Allah, send blessings upon the Prophet ﷺ and learn from the Seerah.",
    ],
    bullets: [
      "Learn the history and significance of each site from reliable sources before you go.",
      "Remember that supplication is made to Allah alone, and that no place or object has power to benefit or harm.",
      "Follow the etiquette of each site, including lowering your voice and respecting the guidelines of the authorities.",
      "Check opening hours, access rules and visiting times for the Rawdah and other sites, as these can change.",
      "Dress modestly, wear comfortable footwear and carry water, especially during hot weather.",
      "Allow time for rest, and consider joining a reputable guide or group to avoid unreliable information.",
    ],
  },
]

const ziyaratFaqs: FaqItem[] = [
  {
    question: "Is Ziyarat part of Umrah?",
    answer:
      "No. Ziyarat is separate from the rites of Umrah and Hajj. Your Umrah is complete once you finish tawaf, sai and the hair-cutting or shaving, whether or not you visit other places.",
  },
  {
    question: "Which places do pilgrims usually visit in Madinah?",
    answer:
      "Common places include Masjid an-Nabawi, the Rawdah, Jannat al-Baqi, Masjid Quba, Mount Uhud and its martyrs' cemetery, and Masjid al-Qiblatayn. Access and visiting arrangements may change, so check current guidance on arrival.",
  },
  {
    question: "Which places do pilgrims usually visit in Makkah?",
    answer:
      "Pilgrims often visit Jabal al-Nour and the Cave of Hira, Jabal Thawr, and the areas of Mina, Arafat and Muzdalifah. These visits are optional and are made for learning and reflection, not as acts of worship in themselves.",
  },
  {
    question: "How should I behave when visiting the Prophet's grave?",
    answer:
      "Approach with calm and respect, lower your voice and offer salam to the Prophet ﷺ and to Abu Bakr and Umar (may Allah be pleased with them). Do not wipe, kiss or circle the grave, and direct all your supplication to Allah alone. If you have questions, ask a trusted scholar.",
  },
  {
    question: "Is it necessary to visit Madinah during my trip?",
    answer:
      "It is not a requirement of Umrah or Hajj. Many pilgrims include Madinah because of the virtue of praying in Masjid an-Nabawi and the opportunity to visit the places connected to the Prophet's ﷺ life.",
  },
  {
    question: "Should I climb mountains such as Jabal al-Nour?",
    answer:
      "Climbing is not a rite of Umrah or Hajj and is not required. If you choose to visit for historical reflection, consider the heat, your health and the crowds, and avoid acts that are not established in the Sunnah. Safety comes first.",
  },
]

export default function Page() {
  return (
    <>
      <PageHero
        title="Your Complete Guide to"
        highlight="Ziyarat"
        image="/images/ziyaraat-image.png" 
        description={
          <>
            Discover the blessed places to visit in Madinah and Makkah, from
            Masjid an-Nabawi and Quba to Uhud and Hira, with{" "}
            <PageHero.Mark>clear guidance,</PageHero.Mark> proper etiquette and
            free tools to help you plan your visits with understanding and
            respect.
          </>
        }
        primaryCta={{
          label: "Umrah Checklist",
          href: "/tools/umrah-checklist",
        }}
        secondaryCta={{
          label: "Read Ziyarat Blogs",
          href: "/blog",
          Icon: BookOpen,
        }}
      />

      <PageTools
        titleGold="Free Tools for"
        titleEmerald="Your Ziyarat"
        description="Prepare for your visits with practical tools to organise your essentials, plan your budget and keep track of prayer times and important steps."
        tools={ziyaratTools}
      />

      <PageContent
        titleGold="Ziyarat Explained"
        titleEmerald="Place by Place"
        intro="Understand the blessed places to visit, how to prepare before you go and how to visit them with the right etiquette and intention."
        sections={ziyaratSections}
      />

      <PageRelatedPosts
        categorySlug="ziyarat"
        titleGold="Related"
        titleEmerald="Ziyarat Articles"
      />

      <PageFaq
        titleGold="Ziyarat Frequently Asked"
        titleEmerald="Questions"
        faqs={ziyaratFaqs}
      />
    </>
  )
}