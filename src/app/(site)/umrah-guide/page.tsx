
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
  title: "Umrah Guide: How to Perform Umrah Step by Step",
  description:
    "Learn how to perform Umrah step by step, including Ihram, Miqat, Tawaf, Sa’i, authentic duas, essential rules and practical travel guidance.",
  keywords: [
    "Umrah Guide",
    "How to perform Umrah",
    "Umrah step by step",
    "Umrah rituals",
    "Ihram rules",
    "Miqat for Umrah",
    "Tawaf and Sa'i",
    "Umrah duas",
    "Umrah preparation",
  ],
  alternates: {
    canonical: "https://www.islam-religion.com/umrah-guide",
  },
  openGraph: {
    title: "Umrah Guide: How to Perform Umrah Step by Step",
    description:
      "Learn how to perform Umrah step by step, including Ihram, Miqat, Tawaf, Sa’i, authentic duas, essential rules and practical travel guidance.",
    url: "https://www.islam-religion.com/umrah-guide",
    siteName: "Islam Religion",
    type: "website",
  },
}

const umrahTools: PageTool[] = [
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
    title: "Zakat Calculator",
    description: "Calculate your zakat on eligible savings, gold and silver.",
    href: "/tools/zakat-calculator",
    icon: "coins",
    accent: "gold",
  },
]

const umrahSections: ArticleSection[] = [
  {
    heading: "What Is Umrah in Islam?",
    paragraphs: [
      "Umrah is an act of worship performed at the Sacred Mosque in Makkah. It brings together intention, remembrance of Allah and physical acts of worship. Muslims travel from different parts of the world to perform these rites and seek Allah's forgiveness and reward.",
      "Unlike Hajj, Umrah does not have a fixed set of pilgrimage days. It can generally be performed at different times of the year, although access and arrangements may change during the Hajj season.",
      "The main rites of Umrah are:",
    ],
    bullets: [
      "Entering the state of Ihram with the intention of Umrah.",
      "Performing seven circuits of Tawaf around the Kaaba.",
      "Completing seven passages between Safa and Marwa.",
      "Shaving or trimming the hair to complete the pilgrimage.",
    ],
    closing: [
      "Umrah is sometimes called the lesser pilgrimage, but that does not make it an unimportant act of worship. It has its own rites and rulings, and it does not replace the obligation of Hajj.",
    ],
  },
  {
    heading: "What Does the Quran Say About Umrah?",
    paragraphs: [
      "Allah mentions Hajj and Umrah together in the Quran and instructs Muslims to complete them sincerely for His sake.",
      "Allah says:",
      "وَأَتِمُّوا الْحَجَّ وَالْعُمْرَةَ لِلَّهِ",
      "Meaning: “And complete the Hajj and Umrah for Allah.”",
      "Reference: Surah Al-Baqarah (2:196).",
      "This verse reminds Muslims that these acts of worship should be performed for Allah alone. The purpose is not to travel for recognition or to collect photographs, but to fulfil the rites with sincerity and follow the guidance of the Prophet Muhammad ﷺ.",
    ],
  },
  {
    heading: "Why Is Umrah Important for Muslims?",
    paragraphs: [
      "A journey to Makkah gives Muslims time to step away from everyday responsibilities and focus on worship. The value of Umrah is not only in reaching the Sacred Mosque. It is also in the intention, effort and obedience involved in performing its rites.",
      "The Prophet Muhammad ﷺ explained the virtue of performing Umrah in an authentic hadith. The Prophet ﷺ said:",
      "الْعُمْرَةُ إِلَى الْعُمْرَةِ كَفَّارَةٌ لِمَا بَيْنَهُمَا",
      "Meaning: “One Umrah to the next is an expiation for the sins committed between them.”",
      "Reference: Sahih al-Bukhari 1773; Sahih Muslim 1349.",
      "This hadith describes the great virtue of Umrah. It gives Muslims a reason to value the opportunity and approach the pilgrimage with sincere repentance and good intentions.",
      "Umrah also teaches important lessons:",
    ],
    bullets: [
      "Sincerity: Worship is performed for Allah alone.",
      "Patience: Crowds, travel and physical effort require patience.",
      "Equality: Muslims from different backgrounds stand together in worship.",
      "Remembrance: The rites provide many opportunities to remember Allah and make dua.",
    ],
    closing: [
      "The experience should also encourage a person to carry the lessons of worship into everyday life after returning home.",
    ],
  },
  {
    heading: "Who Can Perform Umrah?",
    paragraphs: [
      "Muslims who meet the applicable travel and entry requirements can perform Umrah. There are also religious and practical matters to consider before making the journey.",
      "A person should be able to understand the basic rites, arrange suitable travel and manage the physical demands of the pilgrimage. People with health or mobility concerns may need additional support and should plan accordingly.",
      "Before travelling, consider these points:",
    ],
    bullets: [
      "Confirm that your passport and travel documents are valid.",
      "Check the current Saudi visa and Umrah requirements.",
      "Arrange accommodation and transport before departure.",
      "Consider your health and any medicines you may need.",
      "Learn the main rites and the restrictions of Ihram.",
    ],
  },
  {
    heading: "Is Umrah Obligatory in Islam?",
    paragraphs: [
      "Scholars have different views on whether Umrah is obligatory once in a lifetime for a Muslim who meets its conditions. Some schools consider it obligatory, while others regard it as a confirmed Sunnah.",
      "Hajj, on the other hand, is one of the Five Pillars of Islam and is obligatory once in a lifetime for Muslims who are able to perform it. Umrah does not take the place of Hajj.",
      "If you need a ruling based on your school of Islamic law or personal circumstances, ask a qualified scholar.",
    ],
  },
  {
    heading: "What Is the Difference Between Hajj and Umrah?",
    paragraphs: [
      "Hajj and Umrah are both pilgrimages to Makkah, but they have different requirements and rituals. Hajj takes place on specific days in Dhul Hijjah, while Umrah can generally be performed throughout the year.",
    ],
    table: {
      head: ["Hajj", "Umrah"],
      rows: [
        ["One of the Five Pillars of Islam", "A separate act of pilgrimage"],
        ["Obligatory once for those who are able", "Scholars differ on its ruling"],
        ["Performed on specific days in Dhul Hijjah", "Generally performed throughout the year"],
        ["Includes standing at Arafat", "Does not include standing at Arafat"],
        ["Includes rites in Mina and Muzdalifah", "Its main rites take place in Masjid al-Haram"],
        ["Includes additional Hajj rituals", "Includes Ihram, Tawaf, Sa'i and hair cutting"],
      ],
      after: [
        "Both acts of worship require sincerity and obedience to Allah. If you are also learning about the major pilgrimage, read our complete [Hajj guide](/hajj-guide) for its dates, conditions and step-by-step rituals.",
      ],
    },
  },
  {
    heading: "When Can You Perform Umrah?",
    paragraphs: [
      "Umrah can generally be performed throughout the Islamic year. Unlike Hajj, it is not limited to a particular group of days.",
      "Many Muslims choose to travel during Ramadan because of the special virtue of worship in that month. However, travel arrangements, crowd levels and official access rules should always be considered.",
      "The Prophet ﷺ said to a woman who had missed Hajj with him:",
      "“Perform Umrah in Ramadan, for Umrah in Ramadan is equivalent to Hajj.”",
      "Reference: Sahih al-Bukhari 1863; Sahih Muslim 1256.",
      "This describes the great reward of Umrah in Ramadan. It does not mean that performing Umrah in Ramadan replaces the obligation of Hajj.",
      "Before choosing your travel dates, check the latest Saudi arrangements, visa conditions and any restrictions that may apply during the Hajj season.",
    ],
  },
  {
    heading: "How to Prepare for Umrah",
    paragraphs: [
      "A little preparation can make the journey easier, especially if this is your first visit to Makkah. Learn the rituals before travelling so that you are not trying to understand every step while dealing with crowds and unfamiliar surroundings.",
    ],
    subsections: [
      {
        heading: "Prepare Your Travel Documents",
        paragraphs: [
          "Keep your important documents together and make sure you can access them during the journey.",
        ],
        bullets: [
          "Check your passport's validity.",
          "Confirm your visa and entry requirements.",
          "Keep flight and hotel details available.",
          "Save copies of important documents.",
          "Check any current health or vaccination requirements.",
        ],
        closing: [
          "Travel rules can change, so use official Saudi sources for the latest information rather than relying on old travel advice.",
        ],
      },
      {
        heading: "Prepare Your Ihram Clothing",
        paragraphs: [
          "Men should prepare two clean, simple Ihram cloths. Women do not have a special two-piece Ihram uniform and can wear their normal modest clothing that meets Islamic requirements.",
          "It is helpful to prepare your clothes before reaching the Miqat, particularly if you are travelling by air.",
        ],
      },
      {
        heading: "Prepare Your Body for the Journey",
        paragraphs: [
          "Umrah involves walking and standing, sometimes for several hours. Comfortable footwear, suitable clothing and enough rest can make a difference.",
        ],
        bullets: [
          "Walk regularly before travelling.",
          "Carry any prescribed medicines you need.",
          "Keep a water bottle available where permitted.",
          "Choose comfortable footwear for walking outside Ihram.",
          "Avoid carrying unnecessary items into the Haram.",
        ],
      },
      {
        heading: "Learn the Rituals Before Departure",
        paragraphs: [
          "Try to understand the sequence of Ihram, Tawaf, Sa'i and Tahallul before leaving home. You should also learn the Talbiyah and a few important duas.",
          "You can use our Umrah and travel resources to help organise your preparation. For a more detailed list of clothing, toiletries and travel essentials, read our Islamic travel tips.",
        ],
      },
    ],
  },
  {
    heading: "What Is Miqat for Umrah?",
    paragraphs: [
      "Miqat is the designated boundary that a person intending to perform Hajj or Umrah must not pass without entering Ihram, according to the relevant rulings.",
      "The correct Miqat depends on the direction from which a traveller approaches Makkah. People travelling by air must prepare to enter Ihram before crossing the Miqat or its corresponding line. They should not wait until landing in Jeddah if their route has already passed the Miqat.",
      "The main Miqat locations include:",
    ],
    bullets: [
      "Dhul-Hulayfah: The Miqat for people travelling from Madinah and those passing through its route.",
      "Al-Juhfah: The Miqat for people coming from the direction of Syria, Egypt and North Africa. Many travellers use the area near Rabigh.",
      "Qarn al-Manazil: The Miqat for people coming from the direction of Najd.",
      "Yalamlam: The Miqat for people coming from Yemen and those passing through that route.",
      "Dhat Irq: The Miqat for people coming from the direction of Iraq.",
    ],
    closing: [
      "These locations are based on the directions from which people approach Makkah, not simply their nationality. A traveller should follow the Miqat that applies to their actual route.",
      "If you are flying directly towards Jeddah, ask your airline or travel group when the aircraft is expected to pass the Miqat. Prepare your Ihram clothing in advance so that you can enter the state of Ihram at the correct time.",
    ],
  },
  {
    heading: "How to Perform Umrah Step by Step",
    paragraphs: [
      "Umrah follows a clear sequence. You begin by entering Ihram before crossing the applicable Miqat, then perform Tawaf, complete Sa'i and finish by shaving or trimming the hair.",
      "The following steps explain the main rites in order.",
    ],
    subsections: [
      {
        heading: "Step 1: Take Ghusl and Prepare for Ihram",
        paragraphs: [
          "Before entering Ihram, it is Sunnah to perform Ghusl and prepare yourself for worship. Men may apply perfume to the body before making the intention for Ihram, but not to the Ihram garments.",
          "Men wear two pieces of plain cloth:",
        ],
        bullets: [
          "Izar: The cloth wrapped around the lower body.",
          "Rida: The cloth used to cover the upper body.",
        ],
        closing: [
          "Women wear modest clothing that meets Islamic requirements. There is no special colour or uniform that they must wear for Ihram.",
          "Prepare everything before reaching the Miqat. Once you enter Ihram, its restrictions begin to apply.",
        ],
      },
      {
        heading: "Step 2: Make the Intention for Umrah",
        paragraphs: [
          "When you reach the applicable Miqat, make the intention in your heart to perform Umrah and begin reciting the Talbiyah.",
          "You may say:",
          "لَبَّيْكَ اللَّهُمَّ عُمْرَةً",
          "Transliteration: Labbayka Allahumma Umrah.",
          "Meaning: Here I am, O Allah, to perform Umrah.",
          "The intention is an act of the heart. Saying the words helps express what you intend, but the important matter is that you sincerely intend to perform Umrah.",
        ],
      },
      {
        heading: "Step 3: Recite the Talbiyah",
        paragraphs: [
          "After entering Ihram, recite the Talbiyah regularly on your journey towards Makkah.",
          "لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ، لَا شَرِيكَ لَكَ",
          "Transliteration: Labbayka Allahumma labbayk, labbayka la shareeka laka labbayk. Innal-hamda wan-ni'mata laka wal-mulk, la shareeka lak.",
          "Meaning: Here I am, O Allah, here I am. Here I am, You have no partner, here I am. Surely all praise, blessings and dominion belong to You. You have no partner.",
          "Men generally recite the Talbiyah aloud without disturbing others, while women recite it quietly. Continue remembering Allah and reciting the Talbiyah until you begin Tawaf.",
        ],
      },
      {
        heading: "Step 4: Enter Masjid al-Haram",
        paragraphs: [
          "When you arrive at Masjid al-Haram, enter calmly and follow the instructions of the mosque staff.",
          "Enter with your right foot and recite the dua for entering a mosque. Keep your belongings secure and avoid pushing through the crowd.",
          "When you see the Kaaba, take a moment to remember Allah and make dua. There is no single authenticated dua that must be recited specifically upon seeing the Kaaba.",
        ],
      },
      {
        heading: "Step 5: Perform Tawaf Around the Kaaba",
        paragraphs: [
          "Tawaf is the act of walking around the Kaaba seven times in an anti-clockwise direction. Each complete circuit begins and ends at the Black Stone.",
          "Before starting, make sure you understand the direction and follow the designated movement of the crowd. Follow these steps:",
        ],
        bullets: [
          "Begin at the Black Stone.",
          "Keep the Kaaba on your left.",
          "Start the first circuit from the Black Stone's line.",
          "Complete seven full circuits.",
          "Remember Allah and make dua throughout Tawaf.",
        ],
        closing: [
          "If you can reach the Black Stone without pushing or harming anyone, you may touch or kiss it. If the crowd is too dense, simply point towards it with your right hand and say “Allahu Akbar” as you begin the circuit. Do not struggle to reach it.",
          "Men may practise Idtiba, which means placing the upper Ihram cloth under the right arm and over the left shoulder, leaving the right shoulder uncovered. This is done during Tawaf and should not be continued after it.",
          "Men may also walk briskly during the first three circuits when it is safe and possible. These practices are Sunnah and should never lead to pushing or disturbing other pilgrims.",
        ],
      },
      {
        heading: "Step 6: Make Dua During Tawaf",
        paragraphs: [
          "You can remember Allah, recite Quran and make personal dua during all seven circuits. There is no fixed dua that must be read for each round.",
          "One well-known dua is recited between the Yemeni Corner and the Black Stone.",
          "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
          "Transliteration: Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina adhaban-nar.",
          "Meaning: “Our Lord, give us good in this world and good in the Hereafter, and protect us from the punishment of the Fire.”",
          "Reference: Surah Al-Baqarah (2:201).",
          "You can also make dua in your own language. Ask Allah for forgiveness, guidance, good health and what you need for this life and the Hereafter.",
        ],
      },
      {
        heading: "Step 7: Pray Two Rak'ahs After Tawaf",
        paragraphs: [
          "After completing seven circuits, cover your right shoulder if you practised Idtiba. Then pray two rak'ahs if possible.",
          "It is recommended to pray behind Maqam Ibrahim when there is room. However, do not block people or interrupt the movement of pilgrims. If the area is crowded, you can pray elsewhere in Masjid al-Haram.",
          "There is no need to force your way towards Maqam Ibrahim. The safety and comfort of other worshippers matter.",
        ],
      },
      {
        heading: "Step 8: Drink Zamzam Water",
        paragraphs: [
          "After Tawaf, you may drink Zamzam water from the available facilities in the mosque.",
          "Say Bismillah before drinking and make dua to Allah. You may ask for forgiveness, beneficial knowledge, good health and whatever is good for you in this life and the next.",
          "Zamzam is a blessed water, and drinking it is a recommended part of the visit. Follow the mosque's instructions and avoid leaving cups or bottles in walking areas.",
        ],
      },
      {
        heading: "Step 9: Perform Sa'i Between Safa and Marwa",
        paragraphs: [
          "Sa'i is the act of walking between the hills of Safa and Marwa seven times. It remembers the struggle of Hajar (peace be upon her), who searched for water for her son Ismail (peace be upon him).",
          "Sa'i begins at Safa and ends at Marwa. Follow these steps:",
        ],
        bullets: [
          "Begin at Safa.",
          "Face the direction of the Kaaba and make dua.",
          "Walk towards Marwa.",
          "Men jog between the two marked green lights when it is safe.",
          "Reach Marwa to complete one passage.",
          "Return to Safa for the next passage.",
          "Continue until you complete seven passages, ending at Marwa.",
        ],
        closing: [
          "One passage from Safa to Marwa counts as one, and the return journey counts as another. Therefore, the seventh passage ends at Marwa.",
          "Allah says:",
          "إِنَّ الصَّفَا وَالْمَرْوَةَ مِن شَعَائِرِ اللَّهِ",
          "Meaning: “Indeed, Safa and Marwa are among the symbols of Allah.”",
          "Reference: Surah Al-Baqarah (2:158).",
          "You can make dua and remember Allah throughout Sa'i. There is no fixed supplication required for every passage.",
        ],
      },
      {
        heading: "Step 10: Shave or Trim Your Hair",
        paragraphs: [
          "After completing Sa'i, the final rite is to shave or trim the hair. This completes Umrah and allows you to leave the state of Ihram. The guidance for men and women is different:",
        ],
        bullets: [
          "Men: May shave the entire head or shorten the hair. Shaving is generally considered more virtuous.",
          "Women: Trim a small portion from the ends of their hair. They do not shave their heads.",
        ],
        closing: [
          "After completing this step, your Umrah is finished and you leave the state of Ihram. Its restrictions no longer apply.",
          "Use a clean, safe and suitable place for hair cutting. Avoid sharing unclean shaving equipment.",
        ],
      },
    ],
  },
  {
    heading: "What Are the Rules and Restrictions of Ihram?",
    paragraphs: [
      "Ihram is not only the clothing worn during Umrah. It is a sacred state that begins with the intention to perform the pilgrimage and requires a person to observe certain restrictions.",
      "Some restrictions apply to both men and women, while others are specific to men or women.",
    ],
    subsections: [
      {
        heading: "Restrictions for Men and Women",
        paragraphs: ["While in Ihram, pilgrims must avoid:"],
        bullets: [
          "Applying perfume or fragrance to the body or clothing after entering Ihram.",
          "Cutting or removing hair.",
          "Clipping nails.",
          "Engaging in marital relations or acts that lead towards them.",
          "Hunting land animals.",
          "Entering into a marriage contract.",
        ],
      },
      {
        heading: "Additional Restrictions for Men",
        paragraphs: ["Men in Ihram must also avoid:"],
        bullets: [
          "Wearing clothing tailored to fit the body in the usual manner, such as shirts and trousers.",
          "Covering the head with something that rests on it.",
        ],
      },
      {
        heading: "Additional Restrictions for Women",
        paragraphs: [
          "Women may wear their normal modest clothing during Ihram. They should avoid wearing gloves and a fitted niqab while in Ihram. Questions about covering the face in the presence of unrelated men have further scholarly details, so follow the guidance of a trusted scholar.",
          "These are general guidelines. Some rulings depend on the circumstances and the school of Islamic law a person follows. If you make a mistake or face a situation you are unsure about, ask a qualified scholar rather than assuming that your Umrah is invalid.",
        ],
      },
    ],
  },
  {
    heading: "What Should You Do After Completing Umrah?",
    paragraphs: [
      "Once you have completed Sa'i and shaved or trimmed your hair, your Umrah is finished. You are no longer in the state of Ihram and can return to your normal permitted activities.",
      "There is no special ceremony required after completing Umrah. Take time to rest, thank Allah and continue your worship. You may:",
    ],
    bullets: [
      "Pray in Masjid al-Haram.",
      "Read the Quran and remember Allah.",
      "Make dua for yourself and your family.",
      "Drink Zamzam water.",
      "Rest before continuing your journey.",
      "Visit Madinah if it is part of your travel plans.",
    ],
    closing: [
      "If you plan to visit the Prophet's Mosque and other historical places, our Ziyaaraat guide explains the places pilgrims commonly visit and the manners to observe.",
    ],
  },
  {
    heading: "Important Travel Tips for Umrah",
    paragraphs: [
      "A pilgrimage can involve long flights, unfamiliar surroundings and large crowds. Practical preparation helps you spend less time worrying about small arrangements and more time focusing on worship.",
      "Keep these points in mind:",
    ],
    bullets: [
      "Keep your passport and travel documents in a safe place.",
      "Save your hotel address and group contact details.",
      "Carry comfortable footwear for walking outside Ihram.",
      "Keep essential medicines and personal supplies with you.",
      "Drink enough water and take breaks when needed.",
      "Follow the signs and instructions inside Masjid al-Haram.",
      "Agree on a meeting point with your family or group.",
      "Avoid pushing or rushing during Tawaf and Sa'i.",
      "Keep your belongings secure in crowded areas.",
      "Check official travel and entry updates before departure.",
    ],
    closing: [
      "If you are travelling with older family members or children, plan your movement around their needs. Allow extra time for walking, resting and reaching the mosque.",
    ],
  },
  {
    heading: "Visiting Madinah After Umrah",
    paragraphs: [
      "Many Muslims choose to visit Madinah as part of their journey to Saudi Arabia. It is home to Masjid an-Nabawi, where the Prophet Muhammad ﷺ is buried, and it holds a special place in the hearts of Muslims.",
      "However, visiting Madinah is not a required part of Umrah. A person completes Umrah in Makkah after performing its prescribed rites.",
      "If you visit Madinah, you can:",
    ],
    bullets: [
      "Pray in Masjid an-Nabawi.",
      "Send blessings and salutations upon the Prophet ﷺ.",
      "Visit the Rawdah if you obtain the required access arrangement.",
      "Visit Masjid Quba.",
      "Learn about the history of the Prophet ﷺ and the early Muslim community.",
    ],
    closing: [
      "Observe the rules and visiting arrangements at each location. You can read our Ziyaaraat guide to learn more about these places before your visit.",
    ],
  },
  {
    heading: "Why Learn with Islam Religion?",
    paragraphs: [
      "Preparing for Umrah means learning more than the names of its rituals. You need to understand when Ihram begins, how Tawaf and Sa'i are performed, which duas are established in the Sunnah and what to avoid during the pilgrimage.",
      "Islam Religion brings these details together in clear guides that help readers learn at their own pace.",
    ],
    bullets: [
      "Learn the main rites of Umrah in their correct order.",
      "Understand the purpose of Ihram and its restrictions.",
      "Read Quranic verses and duas with their references.",
      "Find practical guidance for preparing before travel.",
      "Explore related Hajj, travel and Islamic learning guides.",
    ],
    closing: [
      "Our aim is to make useful Islamic information easier to understand while keeping religious guidance connected to the Quran and authentic Sunnah. For a specific ruling, especially one involving a mistake during Ihram or a personal circumstance, consult a qualified scholar.",
    ],
  },
  {
    heading: "Complete Your Preparation Before You Travel",
    paragraphs: [
      "Umrah is a journey of worship that deserves preparation and understanding. Learn the rites before departure, know where to enter Ihram, and give yourself enough time to perform each step without rushing.",
      "Once you reach Makkah, focus on the worship itself. Follow the guidance of the Prophet Muhammad ﷺ, respect other pilgrims and make the most of your time in the Sacred Mosque.",
      "May Allah make the journey easy for every Muslim who hopes to visit His Sacred House, accept their Umrah and grant them forgiveness. Ameen.",
    ],
  },
]

const faqs: FaqItem[] = [
  {
    question: "How many days are required to perform Umrah?",
    answer:
      "The main rites of Umrah can often be completed within a few hours. The actual time depends on crowd levels, walking speed, mobility and waiting times. Your full trip will usually take longer because of travel, accommodation and rest.",
  },
  {
    question: "Can Umrah be performed at any time of the year?",
    answer:
      "Umrah can generally be performed throughout the year. However, Saudi authorities may introduce restrictions or special arrangements during the Hajj season and other busy periods. Always check the current rules before booking.",
  },
  {
    question: "Can I perform Umrah without a travel group?",
    answer:
      "Yes. You can arrange your journey independently if you meet the applicable visa, entry and pilgrimage requirements. Make sure you understand the Miqat, Ihram and rituals before travelling.",
  },
  {
    question: "Can women perform Umrah?",
    answer:
      "Yes. Women can perform Umrah and follow the same main rites of Ihram, Tawaf, Sa'i and hair trimming. They wear modest clothing rather than the two-piece Ihram garments worn by men. Women should also check current travel requirements and seek scholarly guidance about any personal circumstances.",
  },
  {
    question: "Can I perform Umrah on behalf of someone else?",
    answer:
      "Umrah on behalf of another person is permitted in certain circumstances, such as for someone who has died or someone who is permanently unable to perform it due to old age or an ongoing condition. The details matter, including whether the person performing it has completed their own obligatory pilgrimage. Ask a qualified scholar before making the intention.",
  },
  {
    question: "Is it necessary to visit Madinah after Umrah?",
    answer:
      "No. Visiting Madinah is not one of the rites of Umrah. Your Umrah is complete after you finish Tawaf, Sa'i and shave or trim your hair. Many pilgrims visit Madinah separately to pray in Masjid an-Nabawi and learn about the life of the Prophet ﷺ.",
  },
  {
    question: "Do I need to memorise duas for every round of Tawaf?",
    answer:
      "No. There is no authentic fixed dua that must be recited for each circuit. You can remember Allah, recite Quran and make personal supplications in any language. The dua between the Yemeni Corner and the Black Stone is one well-known supplication from the Sunnah.",
  },
  {
    question: "What happens if I forget a step during Umrah?",
    answer:
      "The answer depends on which step was missed and the circumstances. Some acts are essential, while others are Sunnah. Do not assume that your Umrah is invalid or complete without checking. Ask a qualified scholar or a knowledgeable Umrah guide for advice as soon as possible.",
  },
  {
    question: "Can I perform another Umrah during the same trip?",
    answer:
      "A person may perform another Umrah during the same trip, subject to current Saudi arrangements and the relevant Islamic rulings. Someone already in Makkah who intends to begin another Umrah generally needs to go outside the Haram boundary to enter Ihram. Ask a scholar or your group guide about the correct procedure for your situation.",
  },
  {
    question: "Is Umrah in Ramadan equal to Hajj?",
    answer:
      "The Prophet ﷺ taught that Umrah in Ramadan carries a reward equivalent to Hajj. This refers to its reward and virtue. It does not replace the obligatory Hajj for a Muslim who is required and able to perform it.",
  },
  {
    question: "What should I do if I pass the Miqat without entering Ihram?",
    answer:
      "If you intended to perform Umrah and passed your applicable Miqat without entering Ihram, seek guidance from a qualified scholar immediately. The ruling can depend on your intention, route and whether you can return to the Miqat. Do not rely on a general online answer for a situation that may require a specific ruling.",
  },
]
const PAGE_URL = "https://www.islam-religion.com/umrah-guide"

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${PAGE_URL}#webpage`,
  url: PAGE_URL,
  name: "Umrah Guide: How to Perform Umrah Step by Step",
  description:
    "Learn how to perform Umrah step by step, including Ihram, Miqat, Tawaf, Sa’i, authentic duas, essential rules and practical travel guidance.",
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
        title="Your Complete"
        highlight="Umrah Guide"
        image="/images/umrah-guide-image.png"
        description={
          <>
            Learn how to perform Umrah step by step, from Ihram and Miqat to
            Tawaf, Sa&apos;i and the final ritual, with{" "}
            <PageHero.Mark>clear guidance,</PageHero.Mark> authentic duas and
            practical tips to help you worship with confidence.
          </>
        }
        primaryCta={{
          label: "Umrah Checklist",
          href: "/tools/umrah-checklist",
        }}
        secondaryCta={{
          label: "Read Umrah Blogs",
          href: "/blog",
          Icon: BookOpen,
        }}
      />

      <PageTools
        titleGold="Free Tools for"
        titleEmerald="Your Umrah"
        description="Prepare for your Umrah journey with practical tools to organise your essentials, plan your budget and keep track of important steps."
        tools={umrahTools}
      />

           <PageContent
        title="Umrah Guide: A Complete Step-by-Step"
        highlight="Guide for Muslims"
        intro={`Standing before the Kaaba is a moment many Muslims hope to experience. For some, it is a journey they have planned for years. Others may be preparing for their first Umrah and wondering where to begin, what to say and how to perform each ritual correctly. Umrah is a pilgrimage to Makkah that can generally be performed throughout the year, subject to Saudi regulations and Hajj-season arrangements. Its main rites are entering Ihram, performing Tawaf around the Kaaba, walking between Safa and Marwa, and completing the pilgrimage by shaving or trimming the hair.

This guide explains each stage in a clear order, from preparing at home to completing Umrah. You will also find Quranic guidance, authentic duas, important rules and practical advice to help you prepare for the journey.`}
        sections={umrahSections}
      />

      <PageRelatedPosts
        categorySlug="umrah-guide"
        titleGold="Related"
        titleEmerald="Umrah Articles"
      />

      <PageFaq
        titleGold="Umrah Frequently Asked"
        titleEmerald="Questions"
        faqs={faqs}
      />
    </>
  )
}
