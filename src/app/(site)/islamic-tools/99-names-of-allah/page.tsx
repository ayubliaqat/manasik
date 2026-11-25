// app/tools/99-names-of-allah/page.tsx
import type { Metadata } from "next";
import ToolHero from "@/components/Tools/tool-hero";
import AsmaUlHusna from "@/components/Tools/AsmaUlHusna";
import ToolArticle, {
  type ArticleSection,
} from "@/components/Tools/tool-article";
import ToolGuide, { type GuideSection } from "@/components/Tools/tool-guide";
import RelatedTools from "@/components/Tools/related-tools";
import ToolsFaq, { type FaqItem } from "@/components/Tools/tools-faq";

export const metadata: Metadata = {
  title: "99 Names of Allah in Arabic with Meanings | Asma ul Husna",
  description:
    "Explore the 99 Names of Allah in Arabic with English meanings and transliteration. Search names, save favourites and track your memorisation progress.",
  keywords: [
    "99 Names of Allah",
    "Asma ul Husna",
    "99 Names of Allah in Arabic",
    "99 Names of Allah with meanings",
    "Names of Allah",
    "Asmaul Husna",
    "99 Names of Allah English",
  ],
  alternates: {
    canonical: "https://www.islam-religion.com/islamic-tools/99-names-of-allah",
  },
  openGraph: {
    title: "99 Names of Allah in Arabic with Meanings | Asma ul Husna",
    description:
      "Explore the 99 Names of Allah in Arabic with English meanings and transliteration. Search names, save favourites and track your memorisation progress.",
    url: "https://www.islam-religion.com/islamic-tools/99-names-of-allah",
    siteName: "Islam Religion",
    type: "website",
  },
}

const articleSections: ArticleSection[] = [
  {
    heading: "What Are the 99 Names of Allah (Asma ul Husna)?",
    paragraphs: [
      "Asma ul Husna means The Most Beautiful Names. These are the names of Allah, each describing an attribute of His perfection, such as mercy, forgiveness, knowledge, wisdom and power.",
      "The names help Muslims learn about Allah and the attributes described in the Quran and Sunnah. They are also used in worship and Dua, helping you call upon Allah by His beautiful names.",
      "In Surah Al-A'raf (7:180), Allah instructs believers to call upon Him through His beautiful names. This gives Muslims a clear reason to learn what the names mean rather than simply memorising their Arabic wording.",
    ],
  },
  {
    heading: "Explore the 99 Names of Allah in Arabic",
    paragraphs: [
      "The tool above lets you explore the names in Arabic, along with their English transliterations and meanings. Each name also has a short explanation to help you understand it.",
    ],
    table: {
      intro: "Here are the first ten names from the displayed list:",
      head: ["No.", "Arabic Name", "English Transliteration", "Meaning"],
      rows: [
        ["1", "الرَّحْمَٰنُ", "Ar-Rahman", "The Most Compassionate"],
        ["2", "الرَّحِيمُ", "Ar-Raheem", "The Especially Merciful"],
        ["3", "الْمَلِكُ", "Al-Malik", "The King"],
        ["4", "الْقُدُّوسُ", "Al-Quddus", "The Most Holy"],
        ["5", "السَّلَامُ", "As-Salam", "The Source of Peace"],
        ["6", "الْمُؤْمِنُ", "Al-Mu'min", "The Giver of Security"],
        ["7", "الْمُهَيْمِنُ", "Al-Muhaymin", "The Guardian"],
        ["8", "الْعَزِيزُ", "Al-Aziz", "The Almighty"],
        ["9", "الْجَبَّارُ", "Al-Jabbar", "The Compeller"],
        ["10", "الْمُتَكَبِّرُ", "Al-Mutakabbir", "The Supreme"],
      ],
      after: [
        "These are the first ten names in a widely circulated traditional list. Open the tool above to explore all 99 names and read their individual explanations.",
        "English meanings are short translations to help with learning. A single English word may not express the full meaning of an Arabic name, and translations can differ between scholarly sources.",
      ],
    },
  },
  {
    heading: "How to Use the 99 Names of Allah Tool",
    paragraphs: [
      "You can use the tool to read the names, look for specific meanings and keep track of the ones you have learned. Here is how its main features work.",
    ],
    subsections: [
      {
        heading: "Browse the Names One by One",
        paragraphs: [
          "The tool opens with the first name, Ar-Rahman. Use the Previous and Next buttons to move through the list in order.",
          "You can also use the jump-to-name option to select a particular name instead of moving through every entry.",
        ],
      },
      {
        heading: "Search for a Name or Meaning",
        paragraphs: [
          "Looking for a name you have heard before? Use the search field to find it. You can search by:",
        ],
        bullets: [
          "Arabic name",
          "English transliteration",
          "Meaning",
          "Name number",
        ],
        closing: [
          "This is useful when you remember the meaning but cannot recall the Arabic spelling or English name.",
        ],
      },
      {
        heading: "Read the Full Explanation",
        paragraphs: [
          "Each name includes a short meaning and an explanation. Select a name to open its larger detail panel. You can also expand the meaning and reflection section on a name card to read more.",
          "Take a moment to read the explanation before moving on. It gives you more context than the English translation alone.",
        ],
      },
      {
        heading: "Save Names to Your Favourites",
        paragraphs: [
          "Use the heart icon or Add to Favorites option to save names you want to revisit.",
          "Your favourites make it easier to find particular names when you return for revision. You can also use the Favorites filter to view your saved names.",
        ],
      },
      {
        heading: "Mark Names as Memorised",
        paragraphs: [
          "Once you have learned a name, select Mark as Memorized.",
          "The tool records your selection and updates your memorisation progress. You can use the Memorized filter to see the names you have marked as learned.",
        ],
      },
      {
        heading: "Check Your Learning Progress",
        paragraphs: [
          "The progress area shows how many names you have marked as memorised out of 99. It also displays your current name and the number of favourites you have saved.",
          "This gives you a simple way to see where you are in your learning without keeping a separate record.",
        ],
      },
      {
        heading: "View All, Favourite or Memorised Names",
        paragraphs: [
          "The filters let you switch between three views:",
        ],
        bullets: [
          "All Names: Browse the complete list.",
          "Favorites: See the names you have saved.",
          "Memorized: Review the names you have marked as learned.",
        ],
      },
    ],
  },
  {
    heading: "Does the Tool Save Your Progress?",
    paragraphs: [
      "Yes. Your favourites and memorisation progress are saved in your browser on your current device.",
      "You can return later using the same browser and device to continue from where you left off. However, clearing your browser data or using private browsing may remove your saved progress. It does not automatically transfer when you switch devices.",
    ],
  },
  {
    heading: "Why Learn the 99 Names of Allah?",
    paragraphs: [
      "Learning the names of Allah helps you understand who He is and the attributes that belong to Him. As you learn what each name means, you also gain a better understanding of how to call upon Him in Dua.",
    ],
    subsections: [
      {
        heading: "Understand Allah's Attributes",
        paragraphs: [
          "Each name has its own meaning. Ar-Rahman and Ar-Raheem describe Allah's mercy, while Al-Aleem refers to His complete knowledge.",
          "Take time to learn what these names mean. It helps you understand the attributes they describe.",
        ],
      },
      {
        heading: "Remember Allah Through Dhikr",
        paragraphs: [
          "You can read the names of Allah as part of your daily remembrance. Start with a few names, learn their meanings and return to them regularly. This gives you time to reflect on what you have learned.",
        ],
      },
      {
        heading: "Use His Names When Making Dua",
        paragraphs: [
          "The Quran encourages Muslims to call upon Allah through His beautiful names. Understanding those names helps you make supplications with greater awareness.",
          "You may call upon Allah by His name Al-Ghafoor when seeking forgiveness or Ar-Rahman when asking for mercy.",
        ],
      },
      {
        heading: "Reflect on Good Character",
        paragraphs: [
          "Some names remind believers of qualities such as mercy, forgiveness and justice. Reflecting on these meanings encourages good conduct towards others.",
          "However, Allah's attributes are perfect and cannot be compared with human qualities. Muslims should understand and practise good character in a way that is appropriate for human beings.",
        ],
      },
    ],
  },
  {
    heading: "The 99 Names of Allah in the Quran",
    paragraphs: [
      "The Quran mentions many of Allah's names and attributes. It also teaches believers to call upon Him using His beautiful names.",
      "Three passages are particularly useful when learning about Asma ul Husna.",
    ],
    subsections: [
      {
        heading: "Surah Al-A'raf (7:180)",
        paragraphs: [
          "Allah says:",
          "وَلِلَّهِ الْأَسْمَاءُ الْحُسْنَىٰ فَادْعُوهُ بِهَا",
          "Meaning: “And to Allah belong the best names, so invoke Him by them.”",
          "It tells believers to call upon Allah using His beautiful names.",
          "[Read Surah Al-A'raf, Verse 180](https://quran.com/7/180)",
        ],
      },
      {
        heading: "Surah Al-Isra (17:110)",
        paragraphs: [
          "Allah says:",
          "قُلِ ادْعُوا اللَّهَ أَوِ ادْعُوا الرَّحْمَٰنَ",
          "Meaning: “Say, ‘Call upon Allah or call upon the Most Merciful. Whichever [name] you call – to Him belong the best names.’”",
          "This verse shows that Allah may be called by His different beautiful names, including Allah and Ar-Rahman. All these names belong to Him.",
          "[Read Surah Al-Isra, Verse 110](https://quran.com/17/110)",
        ],
      },
      {
        heading: "Surah Al-Hashr (59:22–24)",
        paragraphs: [
          "The final three verses of Surah Al-Hashr mention several names and attributes of Allah, including:",
        ],
        bullets: [
          "Ar-Rahman – The Most Merciful.",
          "Ar-Raheem – The Especially Merciful.",
          "Al-Malik – The Sovereign.",
          "Al-Quddus – The Most Holy.",
          "As-Salam – The Source of Peace.",
          "Al-Aziz – The Almighty.",
          "Al-Khaliq – The Creator.",
          "Al-Bari – The Originator.",
          "Al-Musawwir – The Fashioner.",
        ],
        closing: [
          "You can read these verses together to see how the Quran describes Allah through His names and attributes.",
          "[Read Surah Al-Hashr, Verses 22–24](https://quran.com/59/22-24)",
        ],
      },
    ],
  },
  {
    heading: "The 99 Names of Allah in Hadith",
    paragraphs: [
      "The virtue of learning Allah's names is also mentioned in Hadith. One well-known narration appears in Sahih al-Bukhari.",
    ],
    subsections: [
      {
        heading: "Sahih al-Bukhari 7392",
        paragraphs: [
          "Abu Hurairah (RA) narrated that the Messenger of Allah ﷺ said:",
          "“Allah has ninety-nine Names, one hundred less one; and he who memorized them all by heart will enter Paradise.”",
          "The Hadith explains the special virtue of learning and preserving Allah's ninety-nine names.",
          "The Arabic term Ihsa is important when discussing this narration. Scholars understand its meaning as more than simply counting the names. It includes learning them, understanding them and reflecting on them.",
          "[Read Sahih al-Bukhari 7392](https://sunnah.com/bukhari:7392)",
        ],
      },
      {
        heading: "Jami at-Tirmidhi 3507",
        paragraphs: [
          "Jami at-Tirmidhi 3507 contains a narration with a specific list of ninety-nine names. However, scholars have discussed the strength of the chain behind this enumeration and whether the complete list can be attributed to the Prophet Muhammad ﷺ.",
          "It is useful to understand this distinction: the authentic Hadith establishes the virtue of Allah's ninety-nine names, but the specific list commonly shared in Islamic resources has been the subject of scholarly discussion.",
          "[Read Jami at-Tirmidhi 3507](https://sunnah.com/tirmidhi:3507)",
        ],
      },
    ],
  },
  {
    heading: "How to Learn and Memorise the 99 Names of Allah",
    paragraphs: [
      "Trying to learn all 99 names at once can feel difficult. A better approach is to study a few at a time and return to them regularly. These steps can help you build a learning routine.",
    ],
    subsections: [
      {
        heading: "1. Start with Three to Five Names",
        paragraphs: [
          "Choose a small number of names each day. Read the Arabic spelling, English transliteration and meaning before moving on.",
        ],
      },
      {
        heading: "2. Understand the Meaning",
        paragraphs: [
          "Do not focus only on how a name is pronounced. Learn what it means and the attribute it describes. For example:",
        ],
        bullets: [
          "Ar-Rahman – Reflect on Allah's mercy.",
          "Al-Ghafoor – Learn about His forgiveness.",
          "Al-Aleem – Remember that Allah has complete knowledge.",
          "As-Samee – Learn about His attribute of hearing.",
        ],
      },
      {
        heading: "3. Practise the Pronunciation",
        paragraphs: [
          "Read each Arabic name aloud and practise its pronunciation. The English transliteration can help, but it is not a replacement for learning the Arabic.",
          "Where possible, listen to a reliable recitation to help with pronunciation.",
        ],
      },
      {
        heading: "4. Revise What You Have Learned",
        paragraphs: [
          "Return to earlier names instead of moving forward every day without revision. Use the Favorites filter to revisit names you want to study again.",
        ],
      },
      {
        heading: "5. Track Your Memorisation",
        paragraphs: [
          "When you have learned a name, mark it as memorised in the tool. Your progress count will update, allowing you to see how many names you have marked out of 99.",
          "Remember that marking a name as memorised is a personal learning record. It does not assess your pronunciation or understanding.",
        ],
      },
    ],
  },
  {
    heading: "How to Use the Names of Allah in Dua",
    paragraphs: [
      "Surah Al-A'raf (7:180) teaches Muslims to call upon Allah through His beautiful names. Understanding their meanings can help you choose a relevant name when making Dua. For example:",
    ],
    bullets: [
      "When seeking forgiveness: Call upon Allah by the name Al-Ghafoor (The All-Forgiving).",
      "When asking for mercy: Call upon Allah by the name Ar-Rahman (The Most Compassionate).",
      "When seeking knowledge: Call upon Allah by the name Al-Aleem (The All-Knowing).",
      "When asking for guidance: Call upon Allah by the name Al-Hadi (The Guide).",
      "When seeking protection: Call upon Allah by the name Al-Hafiz (The Preserver).",
    ],
    closing: [
      "These are examples of using Allah's names in supplication. Make your Dua sincerely and remember that His names and attributes belong to Him in their perfection.",
    ],
  },
  {
    heading: "Does Allah Have More Than 99 Names?",
    paragraphs: [
      "Yes. The Hadith about the ninety-nine names does not mean that Allah has only ninety-nine names.",
      "In a supplication reported in Sahih Muslim, the Prophet Muhammad ﷺ refers to Allah by names that He has kept in the knowledge of the unseen.",
      "This is why the commonly circulated list of ninety-nine names should not be treated as a complete list of every name of Allah.",
      "Scholars have also discussed the enumeration of particular names. Some lists differ, so it is worth referring to the Quran, authentic Hadith and reliable scholarly explanations when studying them.",
    ],
  },
  {
    heading: "Learn the Names of Allah at Your Own Pace",
    paragraphs: [
      "You do not need to memorise all 99 names in one sitting. Begin with a few, read their meanings and return to them for revision.",
      "Use the tool above to search for names, save the ones you want to revisit and mark your learning progress. As you continue, take time to understand each name rather than focusing only on completing the list.",
      "May Allah grant us beneficial knowledge, sincere worship and a deeper understanding of His beautiful names. Ameen.",
    ],
  },
  {
    heading: "Important Note",
    paragraphs: [
      "This resource is intended for general Islamic education. Arabic spellings, English transliterations and meanings are provided as learning aids. English translations may vary, and scholars differ on the enumeration of some names. For detailed religious study, refer to the Quran, authentic Hadith and qualified Islamic scholarship.",
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
];

const faqs: FaqItem[] = [
  {
    question: "What does Asma ul Husna mean?",
    answer:
      "Asma ul Husna is an Arabic expression meaning “The Most Beautiful Names”. It refers to the beautiful names of Allah and the perfect attributes they describe.",
  },
  {
    question: "Can I search for a particular name in the tool?",
    answer:
      "Yes. You can search by Arabic text, English transliteration, meaning or name number. You can also use the jump-to-name option to select an entry directly.",
  },
  {
    question: "Can I save my favourite names?",
    answer:
      "Yes. Select the heart icon or Add to Favorites option on a name. You can then use the Favorites filter to find your saved names.",
  },
  {
    question: "Does the 99 Names of Allah tool remember my progress?",
    answer:
      "Yes. Your favourites and memorisation progress are saved in your browser on the device you are using. Clearing browser data or using private browsing may remove this information. Your progress does not automatically transfer to another device.",
  },
  {
    question: "Why do some lists of the 99 Names of Allah differ?",
    answer:
      "Scholars have discussed the exact enumeration of the names. As a result, some commonly circulated lists contain differences in the names included or their order. English translations can also vary.",
  },
]
const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "99 Names of Allah in Arabic with Meanings | Asma ul Husna",
  url: "https://www.islam-religion.com/islamic-tools/99-names-of-allah",
  description:
    "Explore the 99 Names of Allah in Arabic with English meanings and transliteration. Search names, save favourites and track your memorisation progress.",
  inLanguage: "en",
  isPartOf: {
    "@type": "WebSite",
    name: "Islam Religion",
    url: "https://www.islam-religion.com/",
  },
}
export default function AsmaUlHusnaPage() {
  return (
    <div>
            <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
           <ToolHero
        title="99 Names of"
        highlight="Allah"
        description="Learn Asma ul Husna in Arabic with English transliteration and meanings. Search names, save your favourites and track your memorisation progress."
      />

      <div className="bg-warm-white">
        <section className="mx-auto max-w-6xl px-4 pb-10 sm:px-6 lg:px-8">
          <AsmaUlHusna />
        </section>
        <ToolGuide
          title="How to Use the 99 Names of Allah Tool"
          sections={guideSections}
        />
                <ToolArticle
          title="99 Names of Allah in Arabic with Meanings and English Transliteration"
          intro="Want to learn the 99 Names of Allah but find it difficult to remember them all? Start with one name at a time. Read its Arabic spelling, learn the English meaning and return to it whenever you need to revise. Our 99 Names of Allah tool brings all 99 names together with their Arabic script, English transliteration, short meanings and explanations. You can search for a particular name, save your favourites and mark the names you have memorised. You can also check your learning progress as you work through the list. There is no need to rush. Take your time with each name and understand what it teaches about Allah."
          sections={articleSections}
        />
      </div>

      <RelatedTools
        keys={[
          "tasbih-counter",
          "qibla-finder",
          "prayer-times",
          "noorani-qaida",
        ]}
      />

      <ToolsFaq
        faqs={faqs}
        title="Frequently Asked Questions"
        highlight="FAQs"
      />
    </div>
  );
}
