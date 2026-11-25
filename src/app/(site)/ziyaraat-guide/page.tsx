import { BookOpen } from "lucide-react"
import PageHero from "@/components/pages/PageHero"
import PageTools, { type PageTool } from "@/components/pages/PageTools"
import PageContent, {
  type ArticleSection,
} from "@/components/pages/PageContent"
import PageFaq, { type FaqItem } from "@/components/pages/PageFaq"
import PageRelatedPosts from "@/components/pages/PageRelatedPosts"
import { Metadata } from "next"

// Refresh the related posts every 5 minutes, same as the blog pages.
export const revalidate = 300
export const metadata: Metadata = {
  title: "Ziyaaraat Guide: Explore the Historic Places of Makkah and Madinah",
  description:
    "Explore our Ziyarat guide for important Islamic historical places in Makkah and Madinah, their stories, significance and practical guidance for visiting.",
  keywords: [
    "Ziyaaraat Guide",
    "Ziyarat guide",
    "Historic places of Makkah and Madinah",
    "Makkah historical sites",
    "Madinah historical sites",
    "Cave of Hira",
    "Cave of Thawr",
    "Mount Uhud",
    "Quba Mosque",
  ],
  alternates: {
    canonical: "https://www.islam-religion.com/ziyaaraat-guide",
  },
  openGraph: {
    title: "Ziyaaraat Guide: Explore the Historic Places of Makkah and Madinah",
    description:
      "Explore our Ziyarat guide for important Islamic historical places in Makkah and Madinah, their stories, significance and practical guidance for visiting.",
    url: "https://www.islam-religion.com/ziyaaraat-guide",
    siteName: "Islam Religion",
    type: "website",
  },
}
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

const ziyaaraatSections: ArticleSection[] = [
  {
    heading: "What Is Ziyaarat in Islam?",
    paragraphs: [
      'Ziyaarat means "a visit." For Muslim travellers it usually means visiting places tied to Islamic history and heritage.',
      "That includes mosques, old cemeteries, mountains and sites linked to the Prophet ﷺ and his Companions. People go to learn about the events that shaped the early Muslim community.",
      "But not every historical visit is an act of worship. Ziyaarat isn't a pillar of Islam, and no Hajj or Umrah is incomplete without visiting any of these sites.",
      "It helps to sort places into three groups:",
    ],
    bullets: [
      "Religious sites: places with established significance in worship.",
      "Historical locations: places tied to events in the Seerah.",
      "Cemeteries: places to remember death and pray for the deceased.",
    ],
    closing: [
      "Keep these apart and you'll visit each place with the right understanding. You'll also avoid mistaking tradition for obligation.",
    ],
  },
  {
    heading: "A Journey Through the History of Islam",
    paragraphs: [
      "Picture the events that changed history. The first revelation in Makkah. The hard road to Madinah. The first Muslim community taking shape. You can still stand in the places where these things happened.",
      "Makkah holds the story of how the Prophet's ﷺ mission began. Madinah tells the story of the Hijrah and a community that grew. To understand the Seerah, you need both cities.",
      "As you walk through these places, you'll meet stories of patience, faith, sacrifice and trust in Allah. Learn them before you go and every site will mean more.",
    ],
  },
  {
    heading: "The Places and Events Behind the Hajj Journey",
    paragraphs: [
      "Hajj takes you beyond Makkah itself. Specific rites happen at specific places and times.",
      "Mina, Arafat and Muzdalifah matter most. They matter because Hajj requires them, not because they're sights to see.",
    ],
    subsections: [
      {
        heading: "Mina",
        paragraphs: [
          "Mina is a valley east of Makkah. During Hajj, pilgrims stay here on set days and stone the Jamarat.",
          "It's famous for its huge tent city, and it gets packed during the pilgrimage as people move between the sites.",
          "Mina is a required part of Hajj. Our Hajj Guide explains its rites and timings.",
        ],
      },
      {
        heading: "Arafat",
        paragraphs: [
          "For many pilgrims, Arafat is the moment Hajj becomes real. On the ninth of Dhul Hijjah, everyone gathers on the plain for Wuquf.",
          "You spend the day in prayer, dhikr and dua. After sunset, you head to Muzdalifah.",
          'The Prophet ﷺ said, "Hajj is Arafah" (Sunan Abi Dawud 1949).',
        ],
      },
      {
        heading: "Muzdalifah",
        paragraphs: [
          "After Arafat, pilgrims travel to Muzdalifah and spend part of the night there, as Hajj instructs.",
          "You also collect pebbles for stoning the Jamarat, then prepare for the next stage.",
          "The stay at Muzdalifah is a prescribed part of Hajj. It's not an optional visit.",
        ],
      },
    ],
  },
  {
    heading: "What Makes These Places Meaningful to Muslims?",
    paragraphs: [
      "To a stranger, a mosque, a mountain or an old site can look ordinary. Once you know what happened there, it changes.",
      "The Cave of Hira is tied to the first revelation. Mount Uhud recalls the sacrifices of the Companions. The Prophet's Mosque stands for the community he built in Madinah.",
      "These links help you read Islamic history. They also mean you need to separate what Islam establishes as virtuous from what is simply of historical interest.",
      "For example:",
    ],
    bullets: [
      "The Kaaba: the direction of prayer and the centre of Tawaf.",
      "The Prophet's Mosque: the mosque the Prophet Muhammad ﷺ established in Madinah.",
      "Historic cemeteries: places to remember the Hereafter and pray for the deceased.",
      "Historical landmarks: sites tied to events in the Seerah and early Islam.",
    ],
    closing: [
      "The Prophet ﷺ taught us how to greet the people of the graves and pray for them (Sahih Muslim 975).",
      "Direct your dua to Allah alone, and don't treat unverified practices as established teachings.",
    ],
  },
  {
    heading: "Visiting Makkah and Madinah During Hajj and Umrah",
    paragraphs: [
      "Your Hajj or Umrah trip may leave room to explore the history of the two cities. Many pilgrims do their Ziyaaraat before or after the main rites.",
      "How much time you have depends on your schedule. Hajj runs on fixed dates and rites. An Umrah trip is usually more flexible.",
      "Keep these in mind:",
    ],
    bullets: [
      "During Hajj: the rites and their timings come first.",
      "During Umrah: fit historical visits around your pilgrimage and prayers.",
      "In Madinah: leave time to pray at Al-Masjid an-Nabawi.",
      "For a separate visit: check entry requirements and local access.",
    ],
    closing: [
      "Preparing for Umrah? Our Umrah Guide walks you from Ihram to the end. Our Duas page has supplications from the Quran and Sunnah.",
    ],
  },
  {
    heading: "What to Know Before Your Ziyaaraat Visits",
    paragraphs: [
      "A bit of planning saves time and keeps you comfortable. Some sites sit right beside the main mosques. Others mean a longer drive or a walk over rough ground.",
      "Before you head out:",
    ],
    bullets: [
      "Check the location and travel time.",
      "Confirm opening hours and access rules.",
      "Follow instructions from local authorities.",
      "Wear comfortable clothes and proper shoes.",
      "Carry water, especially in the heat.",
      "Allow extra time for traffic and crowds.",
      "Think about mobility before choosing mountain sites.",
      "Keep the place clean and respect other visitors.",
    ],
    closing: [
      "Be careful with the mountain visits. Jabal al-Noor and Jabal Thawr are steep climbs, and reaching the caves takes real effort. Neither climb is part of Hajj or Umrah, so be honest about your fitness before you try.",
      "Need help preparing for the trip? See our Travel Tips.",
    ],
  },
  {
    heading: "Exploring the Sacred City of Makkah",
    paragraphs: [
      "Makkah is home to the Kaaba, and it's where revelation began. The landmarks around it are linked to different chapters of the Prophet's ﷺ life and early Islam.",
      "Here are the places worth knowing before you explore.",
    ],
    subsections: [
      {
        heading: "The Kaaba and Masjid al-Haram",
        paragraphs: [
          "The Kaaba stands at the heart of Makkah, inside Al-Masjid al-Haram. Muslims everywhere face it in their daily prayers.",
          "It's also where Tawaf happens during Hajj and Umrah. For anyone visiting Makkah, the Grand Mosque is where the journey centres.",
          "It isn't just a landmark. It's the centre of Islamic worship, and Muslims visit it all year.",
        ],
      },
      {
        heading: "The Cave of Hira",
        paragraphs: [
          "The Cave of Hira sits high on Jabal al-Noor. Here the Prophet Muhammad ﷺ received the first revelation through Angel Jibreel (peace be upon him).",
          "The opening verses of Surah Al-Alaq came down here. That moment began the Quranic revelation and the Prophet's mission.",
          "You reach the cave by climbing the mountain, and it can be hard going. Visiting it isn't part of Hajj or Umrah.",
        ],
      },
      {
        heading: "The Cave of Thawr",
        paragraphs: [
          "The Cave of Thawr belongs to one of the biggest events in the Seerah: the Hijrah from Makkah to Madinah.",
          'On the migration, the Prophet Muhammad ﷺ and Abu Bakr al-Siddiq (may Allah be pleased with him) hid in this cave while the Quraysh searched for them.',
          'Surah At-Tawbah (9:40) mentions the event and recalls the Prophet\'s words to his companion: "Do not grieve; indeed Allah is with us."',
          "The cave is on Jabal Thawr, south of Makkah. The climb is steep, so weigh the effort before you plan a visit.",
        ],
      },
      {
        heading: "Jannat al-Mu'alla",
        paragraphs: [
          "Jannat al-Mu'alla is a historic cemetery in Makkah, also called Al-Ma'la Cemetery. Members of the Prophet's family and early Muslims are connected to it.",
          "It holds an important place in Makkah's history. Visiting a graveyard also reminds you of the Hereafter and gives you a chance to pray for the deceased.",
          "Access can change, so check local guidance before you go.",
        ],
      },
      {
        heading: "Hudaybiyyah",
        paragraphs: [
          "Hudaybiyyah is where the Prophet Muhammad ﷺ and the Quraysh signed their treaty in 6 AH.",
          "The Muslims had left Madinah to perform Umrah, but the Quraysh stopped them from entering Makkah. The talks ended in a treaty that looked like a setback at the time and later turned out to be a turning point.",
          "Surah Al-Fath refers to it as a clear victory from Allah. Learn the story of Hudaybiyyah and you'll understand the patience and wisdom shown that day.",
        ],
      },
      {
        heading: "Masjid al-Jinn",
        paragraphs: [
          "Masjid al-Jinn is a historic mosque in Makkah. It's linked to the account of a group of jinn who listened to the Quran.",
          "Surah Al-Jinn tells how they heard the Quran and responded to its message.",
          "You can learn about the mosque's place in history. Just don't claim a special reward for any act there without reliable evidence.",
        ],
      },
      {
        heading: "Masjid Aisha (Masjid al-Tan'eem)",
        paragraphs: [
          "Masjid Aisha, usually called Masjid al-Tan'eem, sits outside the boundary of the Haram in Makkah. People already in Makkah go there to enter Ihram for another Umrah.",
          "It takes its name from Aisha (may Allah be pleased with her). During the Farewell Hajj, the Prophet ﷺ told her brother Abdur-Rahman ibn Abi Bakr to take her to Tan'eem so she could perform Umrah.",
          "That's why it matters to Umrah visitors. Still, not every pilgrim needs to go. Where you enter Ihram depends on your own situation.",
        ],
      },
    ],
  },
  {
    heading: "Discovering the History of Madinah",
    paragraphs: [
      "After the Hijrah, Madinah became the home of the Muslim community. The Prophet Muhammad ﷺ built his mosque here and led the early Muslims through major events.",
      "The city's historic places keep the memory of that time alive. They also introduce you to the people and events that shaped the growth of Islam.",
    ],
    subsections: [
      {
        heading: "The Prophet's Mosque",
        paragraphs: [
          "Al-Masjid an-Nabawi, the Prophet's Mosque, was built by the Prophet Muhammad ﷺ after he arrived in Madinah.",
          "It became the centre of worship and daily life for the early Muslims. The Prophet ﷺ is buried in the chamber beside the mosque next to Abu Bakr al-Siddiq and Umar ibn al-Khattab (may Allah be pleased with them).",
          "The mosque holds a special status in Islam. The Prophet ﷺ spoke of its virtue in authentic Hadith which makes it one of the most important places to visit in Madinah.",
          "Follow the mosque's arrangements, keep your conduct respectful and don't disturb others.",
        ],
      },
      {
        heading: "Al-Rawdah al-Sharifah",
        paragraphs: [
          "Inside Al-Masjid an-Nabawi is the area called Al-Rawdah al-Sharifah. It lies between the Prophet's house and his pulpit.",
          "The Prophet ﷺ called it a garden from the gardens of Paradise (Sahih al-Bukhari 1195). That's why so many visitors hope to pray there.",
          "Entry runs through official arrangements. Check the latest permit rules and visiting instructions before you go.",
        ],
      },
      {
        heading: "Jannat al-Baqi",
        paragraphs: [
          "Jannat al-Baqi, also called Al-Baqi al-Gharqad, is the historic cemetery next to the Prophet's Mosque.",
          "Many of the Prophet's family, his Companions and other early Muslims are buried here. It's closely tied to the history of Madinah.",
          "When you visit a graveyard, remember the Hereafter, greet the people buried there and ask Allah to have mercy on them. Follow local instructions on access.",
        ],
      },
      {
        heading: "Quba Mosque",
        paragraphs: [
          "Masjid Quba is in the Quba area of Madinah. It's widely recognised as the first mosque the Prophet Muhammad ﷺ built after he arrived on the Hijrah.",
          "It's tied to the migration and to the very beginnings of the Muslim community in Madinah.",
          "Authentic Hadith also mention its virtue. The Prophet ﷺ used to visit Quba Mosque and pray there (Sahih al-Bukhari 1194).",
          "You can explore its history and pray there, following the mosque's current arrangements.",
        ],
      },
      {
        heading: "Mount Uhud",
        paragraphs: [
          "Mount Uhud stands north of Madinah. It's the site of the Battle of Uhud in 3 AH.",
          "The battle was a major moment for the early Muslim community. Several Companions were martyred, including Hamzah ibn Abdul Muttalib (may Allah be pleased with him), the Prophet's uncle.",
          "The Prophet ﷺ spoke warmly of Uhud, saying it is a mountain that loves us and we love it (Sahih al-Bukhari 4083).",
          "Visitors usually learn about the battle, the archers' position and the nearby martyrs' cemetery. Know the story first and the site will make far more sense.",
        ],
      },
      {
        heading: "The Mosque of Two Qiblas",
        paragraphs: [
          'Masjid al-Qiblatayn means "the Mosque of the Two Qiblas." It\'s linked to the moment Muslims changed their prayer direction from Jerusalem to the Kaaba in Makkah.',
          "Surah Al-Baqarah (2:142–150) mentions the event. It was a major step in the development of the Muslim community.",
          "The mosque is still a recognised landmark in Madinah, and its name carries the memory of that event.",
        ],
      },
      {
        heading: "The Battle of the Trench and the Seven Mosques",
        paragraphs: [
          "The Battle of the Trench, or Battle of Al-Ahzab, began when a coalition of forces marched on Madinah.",
          "Salman al-Farsi (may Allah be pleased with him) suggested a plan, and the Muslims dug a trench around the exposed parts of the city to hold the attackers back.",
          "People now visit the area for its history. Nearby stands a cluster of small mosques known as the Seven Mosques.",
          "The name is misleading. The historic group usually called by that name is made up of six small mosques, though accounts of the grouping vary.",
          "The area gives you a glimpse of what the early Muslims faced. It also recalls how much preparation, consultation and patience mattered in hard times.",
        ],
      },
    ],
  },
  {
    heading: "Continue Exploring Our Islamic Travel Guides",
    paragraphs: [
      "Getting ready for the holy cities takes more than picking places to visit. You'll also want to understand the rites, prepare for the trip and learn the duas that go with your worship.",
      "These guides cover the rest of your journey:",
    ],
    bullets: [
      "Hajj Guide: the stages and rites of Hajj.",
      "Umrah Guide: Umrah explained step by step.",
      "Duas: authentic supplications from the Quran and Sunnah.",
      "Travel Tips: practical preparation before you leave.",
      "Islamic Tools: resources to support your worship and planning.",
    ],
  },
  {
    heading: "Conclusion",
    paragraphs: [
      "Every mountain, mosque and historic site in Makkah and Madinah holds a piece of Islamic history. From the first revelation at Hira to the Hijrah and the Battle of Uhud, these places bring the stories of the early Muslims into focus.",
      "Before you go, learn what happened at each place. Follow Islam's guidance, respect local arrangements and keep your pilgrimage rites separate from optional historical visits.",
      "May Allah make your journey safe, accept your worship and let you visit His sacred places. Ameen.",
    ],
  },
]

const faqs: FaqItem[] = [
  {
    question: "Can I arrange Ziyaaraat independently or should I join a group?",
    answer:
      "You can do either. Going on your own gives you control over your schedule. Organised tours may include transport and a guide who explains the history of each place. Choose based on your time, budget and mobility.",
  },
  {
    question:
      "Are historical sites accessible for elderly visitors and people with disabilities?",
    answer:
      "It depends on the place. Major mosques generally have facilities for visitors with mobility needs, but mountain sites like Jabal al-Noor and Jabal Thawr involve steep climbs. Check access before you add them to your plans.",
  },
  {
    question:
      "Are there restrictions on photography at religious and historical sites?",
    answer:
      "The rules differ from place to place. Follow the signs and the staff's instructions. Don't photograph people without permission and don't disturb anyone who is praying.",
  },
  {
    question:
      "Can non-Muslims visit Islamic historical sites in Makkah and Madinah?",
    answer:
      "It depends on the location and current Saudi regulations. Non-Muslims can't enter Makkah and the rules in Madinah vary by area. Check official guidance before you make plans.",
  },
  {
    question: "Are all Ziyaaraat locations open to visitors throughout the year?",
    answer:
      "No. Access can change with maintenance, crowd control, local regulations and opening hours. Some places have restricted access. Check current information before you travel.",
  },
]
const PAGE_URL = "https://www.islam-religion.com/ziyaaraat-guide"

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${PAGE_URL}#webpage`,
  url: PAGE_URL,
  name: "Ziyaaraat Guide: Explore the Historic Places of Makkah and Madinah",
  description:
    "Explore our Ziyarat guide for important Islamic historical places in Makkah and Madinah, their stories, significance and practical guidance for visiting.",
  inLanguage: "en",
  isPartOf: {
    "@type": "WebSite",
    name: "Islam Religion",
    url: "https://www.islam-religion.com/",
  },
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${PAGE_URL}#faq`,
  url: PAGE_URL,
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
}

const jsonLd = (data: object) => JSON.stringify(data).replace(/</g, "\\u003c")
export default function Page() {
  return (
    <>
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: jsonLd(webPageSchema) }}
  />
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema) }}
  />
      <PageHero
        title="Discover the Historic Places of"
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
        title="Discover the Historic Places of"
        highlight="Makkah and Madinah"
        intro={`Ever wondered where the first verses of the Quran came down? Or where Prophet Muhammad ﷺ and Abu Bakr (may Allah be pleased with him) hid on the way to Madinah?\n\nThese places are more than names in a history book. Each one has a story. Some take you back to the very start of revelation. Others carry the memory of the Hijrah, the sacrifices of the Companions and the first Muslim community.\n\nVisiting them is known as Ziyaaraat. Many Muslims add these visits to their trip to Makkah and Madinah. They want to see the places, hear the stories and understand what happened there.\n\nThis guide covers the key historical places in both cities. You'll learn why they matter, what took place there and what to know before you go. Preparing for Hajj, planning Umrah or simply visiting the holy cities, start here.`}
        sections={ziyaaraatSections}
      />

      <PageRelatedPosts
        categorySlug="ziyarat"
        titleGold="Related"
        titleEmerald="Ziyarat Articles"
      />

      <PageFaq
        titleGold="Ziyarat Frequently Asked"
        titleEmerald="Questions"
        faqs={faqs}
      />
    </>
  )
}