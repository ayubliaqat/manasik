import { BookOpen } from "lucide-react";
import PageHero from "@/components/pages/PageHero";
import PageTools, { type PageTool } from "@/components/pages/PageTools";
import PageContent, {
  type ArticleSection,
} from "@/components/pages/PageContent";
import PageFaq, { type FaqItem } from "@/components/pages/PageFaq";
import PageRelatedPosts from "@/components/pages/PageRelatedPosts";
import { Metadata } from "next";

// Refresh the related posts every 5 minutes, same as the blog pages.
export const revalidate = 300;
export const metadata: Metadata = {
  title: "Duas in Islam: Authentic Islamic Duas with Arabic and Meaning",
  description:
    "Explore authentic Islamic duas from the Quran and Sunnah with Arabic text, transliteration, meanings and references for everyday life, worship and guidance.",
  keywords: [
    "Duas in Islam",
    "Authentic Islamic Duas",
    "Quranic Duas",
    "Sunnah Duas",
    "Daily Duas",
    "Dua with Arabic and meaning",
    "Islamic supplications",
    "How to make dua",
  ],
  alternates: {
    canonical: "https://www.islam-religion.com/duas",
  },
  openGraph: {
    title: "Duas in Islam: Authentic Islamic Duas with Arabic and Meaning",
    description:
      "Explore authentic Islamic duas from the Quran and Sunnah with Arabic text, transliteration, meanings and references for everyday life, worship and guidance.",
    url: "https://www.islam-religion.com/duas",
    siteName: "Islam Religion",
    type: "website",
  },
};
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
];

const duaSections: ArticleSection[] = [
  {
    heading: "What Is the Concept of Dua in Islam?",
    paragraphs: [
      "Sometimes you tell a friend what’s weighing on you, hoping for comfort or advice. But some things only Allah can fix. Dua is how you bring them to Him.",
      "In Islam, dua means calling on Allah asking Him for something or seeking His mercy. It’s an act of worship. And it shows how much you depend on your Creator.",
      "You can make dua to:",
    ],
    bullets: [
      "Ask for forgiveness and guidance.",
      "Seek help in hard times.",
      "Pray for your family and loved ones.",
      "Ask for protection and well-being.",
      "Thank Allah for His blessings.",
    ],
    closing: [
      "A dua can be a supplication from the Quran and Sunnah or simply your own words.",
    ],
  },
  {
    heading: "Why Is Dua Important in Islam?",
    paragraphs: [
      "Think about the moments you feel grateful, unsure or stuck. Islam asks us to turn to Allah in all of them, not only when life falls apart. That’s why dua sits so close to the center of a Muslim’s life.",
      "Allah says:",
      "Arabic:",
      "وَقَالَ رَبُّكُمُ ادْعُونِي أَسْتَجِبْ لَكُمْ",
      "Meaning:",
      "“And your Lord says, ‘Call upon Me; I will respond to you.’”",
      "Reference: Surah Ghafir (40:60).",
      "Allah invites us to call on Him, and He promises to respond.",
      "Through dua, you can seek forgiveness, ask for guidance, say thank you and grow your trust in Allah. It also reminds you that however hard things get, His mercy is still within reach.",
    ],
  },
  {
    heading: "What Does the Quran and Sunnah Teach About Dua?",
    paragraphs: [
      "Want to learn how to make dua? Start where the best teaching is: the Quran and the example of the Messenger ﷺ. Both give us words to ask with and a way to ask.",
      "Allah says:",
      "Arabic:",
      "وَإِذَا سَأَلَكَ عِبَادِي عَنِّي فَإِنِّي قَرِيبٌ ۖ أُجِيبُ دَعْوَةَ الدَّاعِ إِذَا دَعَانِ",
      "Meaning:",
      "“And when My servants ask you about Me, indeed I am near. I respond to the invocation of the supplicant when he calls upon Me.”",
      "Reference: Surah Al-Baqarah (2:186).",
      "The Prophet Muhammad ﷺ also said:",
      "Arabic:",
      "الدُّعَاءُ هُوَ الْعِبَادَةُ",
      "Meaning:",
      "“Dua is worship.”",
      "Reference: Jami’ at-Tirmidhi 2969; Sunan Abi Dawud 1479.",
      "The Quran records the duas of prophets like Adam, Ibrahim and Musa (peace be upon them). The Sunnah gives us duas for daily routines, for worship and for specific situations. Learn them and you’ll know what to ask for and how to keep Allah in mind all day.",
    ],
  },
  {
    heading: "How to Make Dua in Islam",
    paragraphs: [
      "You don’t need fancy sentences or memorised lines. What matters is that the dua comes from your heart. Still, a few manners help you ask with sincerity and humility.",
    ],
    bullets: [
      "Start by praising Allah.",
      "Send blessings on the Prophet ﷺ.",
      "Ask humbly and sincerely.",
      "Admit your shortcomings and seek forgiveness.",
      "Ask for good in this life and the next.",
      "Keep hoping in His mercy.",
      "Keep asking, and be patient.",
    ],
    closing: [
      "You can also make dua in your own language. Tell Allah what you need. He already knows what’s in your heart.",
    ],
  },
  {
    heading: "What Are the Etiquettes of Making Dua?",
    paragraphs: [
      "Is there a right way to ask? Personal dua doesn’t need a set routine, but Islam does teach manners that show respect and sincerity.",
    ],
    bullets: [
      "Mean every word.",
      "Ask with humility.",
      "Expect good from Allah.",
      "Ask only for what is permissible.",
      "Wait patiently for the answer.",
      "Keep remembering Allah consistently.",
    ],
    closing: [
      "Raising your hands, facing the Qibla and being in a state of purity are recommended in the right circumstances. None of them is a condition for every personal dua.",
    ],
  },
  {
    heading: "Understanding Authentic Duas and Their References",
    paragraphs: [
      "You’ve probably seen beautiful duas in books, videos or social media posts. But how do you know whether one actually comes from the Quran or Sunnah? You check its source. That’s a core part of learning duas.",
      "Established duas come from two sources.",
    ],
    subsections: [
      {
        heading: "Duas from the Quran",
        paragraphs: [
          "These are the supplications in the verses of the Quran, including the duas of prophets and righteous people. You can check their wording and references against the verses themselves.",
        ],
      },
      {
        heading: "Duas from the Sunnah",
        paragraphs: [
          "These are the supplications the Prophet Muhammad ﷺ taught or recited. Check their sources and authenticity in reliable Hadith collections and scholarly explanations.",
          "check these before you learn or share a dua:",
        ],
        bullets: [
          "The original Arabic wording.",
          "The Quran verse or Hadith reference.",
          "The accuracy of the transliteration and meaning.",
          "The authenticity of the narration, where it applies.",
        ],
        closing: [
          "Not every popular dua online has a real source. Check the reference and you won’t end up attributing words to the Prophet ﷺ without evidence.",
        ],
      },
    ],
  },
  {
    heading: "Popular Duas from the Quran and Sunnah",
    paragraphs: [
      "Many Quranic duas are short and easy to learn, yet they cover what we need most: forgiveness, knowledge and patience. Here are a few to start with.",
    ],
    subsections: [
      {
        heading: "Dua for Good in This Life and the Hereafter",
        paragraphs: [
          "Arabic:",
          "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
          "Transliteration:",
          "Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina adhaban-nar.",
          "Meaning:",
          "“Our Lord, give us good in this world and good in the Hereafter and protect us from the punishment of the Fire.”",
          "Reference: Surah Al-Baqarah (2:201).",
          "You ask Allah for goodness in both lives and protection from the Fire.",
        ],
      },
      {
        heading: "Dua for Increase in Knowledge",
        paragraphs: [
          "Arabic:",
          "رَّبِّ زِدْنِي عِلْمًا",
          "Transliteration:",
          "Rabbi zidni ilma.",
          "Meaning:",
          "“My Lord, increase me in knowledge.”",
          "Reference: Surah Taha (20:114).",
          "Three words, and it’s perfect for anyone chasing beneficial knowledge.",
        ],
      },
      {
        heading: "Dua for Parents",
        paragraphs: [
          "Arabic:",
          "رَّبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا",
          "Transliteration:",
          "Rabbir hamhuma kama rabbayani sagheera.",
          "Meaning:",
          "“My Lord, have mercy upon them as they brought me up when I was small.”",
          "Reference: Surah Al-Isra (17:24).",
          "It teaches us to ask Allah to show our parents the mercy they showed us when we were small.",
        ],
      },
      {
        heading: "Dua for Forgiveness and Mercy",
        paragraphs: [
          "Arabic:",
          "رَبَّنَا ظَلَمْنَا أَنْفُسَنَا وَإِن لَّمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ",
          "Transliteration:",
          "Rabbana zalamna anfusana wa illam taghfir lana wa tarhamna lanakunanna minal-khasireen.",
          "Meaning:",
          "“Our Lord, we have wronged ourselves and if You do not forgive us and have mercy upon us, we will surely be among the losers.”",
          "Reference: Surah Al-A’raf (7:23).",
          "Adam and his wife made this dua right after they admitted their mistake. When you slip, it shows you where to go: back to Allah, in repentance.",
        ],
      },
      {
        heading: "Dua for Patience and Steadfastness",
        paragraphs: [
          "Arabic:",
          "رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا وَثَبِّتْ أَقْدَامَنَا",
          "Transliteration:",
          "Rabbana afrigh alayna sabran wa thabbit aqdamana.",
          "Meaning:",
          "“Our Lord, pour upon us patience and make our feet firm.”",
          "Reference: Surah Al-Baqarah (2:250).",
          "Say it when life tests you and you need Allah to keep you standing.",
        ],
      },
    ],
  },
  {
    heading: "Duas for Different Situations in Daily Life",
    paragraphs: [
      "From waking up to setting off on a journey every day gives you reasons to remember Allah. The Quran and Sunnah have a dua for each of them, so remembrance fits naturally into your routine.",
      "Pick a category to find the right dua:",
    ],
    bullets: [
      "Daily Duas: everyday moments and common activities.",
      "Morning and Evening Duas: remembering Allah from sunrise to sunset.",
      "Sleeping and Waking Duas: how to end and start the day.",
      "Eating and Drinking Duas: before and after meals.",
      "Travelling Duas: Allah’s protection on the road. Our Islamic Travel Tips can help too.",
      "Duas for Difficulties: patience, relief and help.",
      "Duas for Health and Healing: well-being and relief.",
      "Duas for Family and Children: parents, children and loved ones.",
      "Hajj and Umrah Duas: supplications for the pilgrimage. See our Hajj Guide and Umrah Guide.",
    ],
    closing: [
      "Each category takes you straight to what you need, with nothing unrelated in the way.",
    ],
  },
  {
    heading: "When Is the Best Time to Make Dua?",
    paragraphs: [
      "You can make dua anytime. Still, some moments carry extra weight in the teachings of Islam. Knowing them helps you set aside more time to ask.",
    ],
    bullets: [
      "In Sujood, when a servant is closest to their Lord. (Sahih Muslim 482)",
      "In the last third of the night, when asking and seeking forgiveness are especially encouraged. (Sahih al-Bukhari 1145)",
      "Between Adhan and Iqamah, when dua is encouraged. (Sunan Abi Dawud 521)",
      "While fasting, since the dua of a fasting person is among those not rejected. (Jami’ at-Tirmidhi 3598)",
    ],
    closing: [
      "These moments are gifts, but you never have to wait for one. Make dua whenever you need Allah or want to thank Him.",
    ],
  },
  {
    heading: "Why Does Allah Respond to Dua in Different Ways?",
    paragraphs: [
      "You may have made the same dua a hundred times and still be waiting. It’s hard when what you asked for hasn’t come. Islam asks us to stay patient and trust His wisdom.",
      "The Prophet Muhammad ﷺ warned us not to get impatient and drop dua just because no answer has shown up yet. (Sahih al-Bukhari 6340; Sahih Muslim 2735)",
      "Keep asking, stay away from sinful requests and keep your hope in Allah. We can’t always see what’s best for us, or the wisdom behind the timing.",
    ],
  },
  {
    heading: "What Is the Difference Between Dua and Dhikr?",
    paragraphs: [
      "People often say dua and dhikr in the same breath, especially when talking about daily worship. They’re close, but they aren’t the same.",
      "Dua is calling on Allah and asking Him for something: forgiveness, guidance, protection or help.",
      "Dhikr is remembering Allah through words of praise, such as:",
    ],
    bullets: ["SubhanAllah", "Alhamdulillah", "Allahu Akbar", "Astaghfirullah"],
    closing: [
      "Both belong in your worship. To keep count of your daily dhikr, try our Islamic Tools and Tasbih Counter.",
    ],
  },
  {
    heading: "How to Learn and Memorise Islamic Duas",
    paragraphs: [
      "If you’re new to duas, don’t try to memorise a dozen at once. Start with a few short ones you’ll actually use, then build from there.",
    ],
    bullets: [
      "Pick one short dua for everyday use.",
      "Read the Arabic slowly.",
      "Learn the pronunciation from the transliteration.",
      "Understand the meaning.",
      "Check the Quran or Hadith reference.",
      "Recite it daily.",
    ],
    closing: [
      "When you know what you’re asking for, the words stick better. Teach your children the simple ones and learn new duas together as a family.",
    ],
  },
  {
    heading: "Continue Learning About Islamic Worship",
    paragraphs: [
      "Dua opens the door to the rest of your worship. To strengthen your daily practice or get ready for a pilgrimage, these Religion Islam resources are a good next step:",
    ],
    bullets: ["Islamic Tools", "Hajj Guide", "Umrah Guide", "Travel Tips"],
  },
  {
    heading: "Turn to Allah Through Dua",
    paragraphs: [
      "You don’t have to wait for something to go wrong before you turn to Allah. Make dua when you wake up, when good news arrives, when you need direction and when you just want to say thank you.",
      "Learn the duas from the Quran and authentic Sunnah. Understand what they mean, check their references and bring them into your day.",
      "May Allah accept our duas, forgive our shortcomings, guide us to what is good and give us good in this life and the Hereafter. Ameen.",
    ],
  },
];

const faqs: FaqItem[] = [
  {
    question: "Is Wudu Required Before Making Dua?",
    answer:
      "No. Wudu isn’t a condition for personal dua. Being in a state of purity is recommended in the right circumstances, but you can call on Allah without Wudu.",
  },
  {
    question: "Should I Face the Qibla When Making Dua?",
    answer:
      "It’s recommended in some circumstances, but it isn’t compulsory. You can make dua in any direction.",
  },
  {
    question: "Can I Make Dua Silently Without Speaking?",
    answer:
      "Yes. You can make dua quietly, without raising your voice. Allah knows what’s in your heart whether you say it aloud or not.",
  },
  {
    question: "Is It Permissible to Repeat the Same Dua Many Times?",
    answer:
      "Yes. Repeat it as often as you like. Keep asking with sincerity and patience, and don’t feel you have to stop at a certain number.",
  },
  {
    question: "Can I Make Dua While Performing Everyday Activities?",
    answer:
      "Yes. You can remember Allah and make personal dua while you go about your day, as long as you respect the manners and requirements of what you’re doing.",
  },
  {
    question: "Can I Make Dua for Someone Who Has Passed Away?",
    answer:
      "Yes. Muslims ask Allah to forgive those who have died and show them mercy and give them a good place in the Hereafter. Making dua for the deceased is an established part of Islamic practice.",
  },
  {
    question: "Is Raising Both Hands Necessary When Making Dua?",
    answer:
      "No. Raising your hands is an established manner in many situations, but it isn’t required for every dua. In some acts of worship, the Prophet ﷺ did not raise his hands in the same way.",
  },
  {
    question: "Can I Ask Allah for Small Things in My Daily Life?",
    answer:
      "Yes. Ask Him for big matters and everyday needs alike. No permissible request is too small to bring to Him.",
  },
];
const PAGE_URL = "https://www.islam-religion.com/duas"

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${PAGE_URL}#webpage`,
  url: PAGE_URL,
  name: "Duas in Islam: Authentic Islamic Duas with Arabic and Meaning",
  description:
    "Explore authentic Islamic duas from the Quran and Sunnah with Arabic text, transliteration, meanings and references for everyday life, worship and guidance.",
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
    <>
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: jsonLd(webPageSchema) }}
  />
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema) }}
  />
  {/* rest of your page JSX */}
</>
      <PageHero
        title="Islamic Duas:"
        highlight="from the Quran and Sunnah"
        image="/images/duas-image.png"
        description={
          <>
            Explore authentic Islamic duas from the Quran and Sunnah with{" "}
            <PageHero.Mark>Arabic text, transliteration,</PageHero.Mark>{" "}
            meanings and references for everyday life, worship and guidance.
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
        title="Islamic Duas:"
        highlight="Authentic Supplications from the Quran and Sunnah"
        intro={`Some days you want to ask Allah for something and the words won’t come. Maybe you’re worried about your family, waiting on a big decision, begging forgiveness or just hoping tomorrow goes better than today. Whatever it is, you can always take it to Allah through dua.\n\nDua is more than asking. It shows your faith, your trust and how much you need Allah. The Quran and Sunnah teach us what to say in every moment of life, from ordinary routines to the hardest days.\n\nOn this page you’ll find duas with Arabic text, transliteration, meanings and references. You’ll also learn how to make dua and which moments the Prophet ﷺ pointed us to.`}
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
        faqs={faqs}
      />
    </>
  );
}
