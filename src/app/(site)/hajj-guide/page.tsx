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
  title: "Hajj in Islam – Rituals, Steps and Important Duas",
  description:
    "Learn about Hajj in Islam, its importance, types, rituals and step-by-step process. Explore essential duas and practical preparation tips with Islam Religion.",
  keywords: [
    "Hajj in Islam",
    "How to perform Hajj",
    "Hajj step by step",
    "Hajj rituals",
    "Hajj guide for beginners",
    "Types of Hajj",
    "Hajj preparation",
    "Hajj duas",
    "Hajj days and dates",
    "What happens during Hajj",
  ].join(", "),
  alternates: {
    canonical: "https://www.islam-religion.com/hajj-guide",
  },
  openGraph: {
    title: "Hajj in Islam – Rituals, Steps and Important Duas",
    description:
      "Learn about Hajj in Islam, its importance, types, rituals and step-by-step process. Explore essential duas and practical preparation tips with Islam Religion.",
    url: "https://www.islam-religion.com/hajj-guide",
    siteName: "Islam Religion",
    type: "website",
  },
};

const hajjTools: PageTool[] = [
  {
    title: "Hajj Checklist",
    description: "Tick off documents, rituals and preparations step by step.",
    href: "/tools/hajj-checklist",
    icon: "clipboard",
    accent: "emerald",
  },
  {
    title: "Hajj Packing List",
    description: "Everything to pack for men, women and families.",
    href: "/tools/packing-list",
    icon: "suitcase",
    accent: "gold",
  },
  {
    title: "Cost Estimator",
    description: "Plan your flights, stay and daily spending in one place.",
    href: "/tools/cost-estimator",
    icon: "calculator",
    accent: "emerald",
  },
  {
    title: "Zakat Calculator",
    description: "Work out your zakat on savings, gold, silver and more.",
    href: "/tools/zakat-calculator",
    icon: "coins",
    accent: "gold",
  },
];

const hajjSections: ArticleSection[] = [
  {
    heading: "When Is Hajj 2027?",
    paragraphs: [
      "Thinking about performing Hajj in 2027? Expect it in May, during Dhul Hijjah 1448 AH.",
    ],
    table: {
      intro: "These dates come from the calculated Islamic calendar:",
      head: ["Hajj event", "Islamic date", "Expected Gregorian date"],
      rows: [
        [
          "First day of Hajj rituals",
          "8 Dhul Hijjah 1448",
          "Friday, 14 May 2027",
        ],
        ["Day of Arafah", "9 Dhul Hijjah 1448", "Saturday, 15 May 2027"],
        ["Eid al-Adha", "10 Dhul Hijjah 1448", "Sunday, 16 May 2027"],
        ["First day of Tashreeq", "11 Dhul Hijjah 1448", "Monday, 17 May 2027"],
        [
          "Last day of Tashreeq",
          "13 Dhul Hijjah 1448",
          "Wednesday, 19 May 2027",
        ],
      ],
      after: [
        "Keep in mind that these dates are expected, not confirmed. Saudi Arabia’s official moon sighting announcement sets the final dates, and they can shift by a day.",
        "If you hope to go in 2027, start early. Check your passport, travel documents, health requirements and authorised Hajj arrangements. Use our [Hajj Checklist](/islamic-tools/hajj-packing-checklist) to track important tasks and prepare for your pilgrimage.",
      ],
    },
  },
  {
    heading: "What Does the Quran Say About Hajj?",
    paragraphs: [
      "Why is Hajj an obligation? Surah Ali ‘Imran answers this directly. Allah commands everyone who is able to make the journey to perform pilgrimage to His House.",
      "Allah says:",
      "Arabic:",
      "فِيهِ ءَايَٰتٌۢ بَيِّنَٰتٌ مَّقَامُ إِبْرَٰهِيمَ ۖ وَمَن دَخَلَهُۥ كَانَ ءَامِنًا ۗ وَلِلَّهِ عَلَى ٱلنَّاسِ حِجُّ ٱلْبَيْتِ مَنِ ٱسْتَطَاعَ إِلَيْهِ سَبِيلًا ۚ وَمَن كَفَرَ فَإِنَّ ٱللَّهَ غَنِيٌّ عَنِ ٱلْعَٰلَمِينَ",
      "English translation:",
      "“In it are clear signs and the standing-place of Abraham. Whoever enters it should be safe. Pilgrimage to this House is an obligation by Allah upon whoever is able among the people. And whoever disbelieves, then surely Allah is not in need of His creation.”",
      "Reference: Surah Ali ‘Imran (3:97).",
      "The Prophet Muhammad (ﷺ) also told us what an accepted pilgrimage earns:",
      "Arabic:",
      "الْحَجُّ الْمَبْرُورُ لَيْسَ لَهُ جَزَاءٌ إِلَّا الْجَنَّةُ",
      "English translation:",
      "“An accepted Hajj has no reward except Paradise.”",
      "Reference: Sahih al-Bukhari 1773; Sahih Muslim 1349.",
      "That’s why Hajj holds such a central place in Islam. It deserves a sincere intention and real preparation.",
    ],
  },
  {
    heading: "What Is Hajj in Islam?",
    paragraphs: [
      "Hajj is the pilgrimage to the Kaaba in Makkah. You perform it on set days of Dhul Hijjah, the last month of the Islamic calendar. It’s the fifth pillar of Islam, and it’s obligatory once in a lifetime for every Muslim who meets its conditions.",
      "Over the course of Hajj, you perform a series of acts of worship in Makkah and at other sacred sites. You enter Ihram, perform Tawaf around the Kaaba, stand at Arafat and complete the remaining rituals.",
      "If you want to understand how Umrah differs from Hajj, read our [Umrah Guide](/umrah-guide) for an explanation of its rituals and requirements.",
      "The pilgrimage also recalls the devotion and obedience of Prophet Ibrahim (AS) and his family. Several Hajj practices still trace back to their story.",
    ],
  },
  {
    heading: "What Are the Pillars of Hajj?",
    paragraphs: [
      "Miss one pillar and your Hajj isn’t valid. Nothing can replace it, not even a sacrifice. That’s why every pilgrim should know these by heart.",
    ],
    bullets: [
      "Ihram: the intention to start Hajj.",
      "Standing at Arafat on the 9th of Dhul Hijjah.",
      "Tawaf al-Ifadah: circling the Kaaba after Arafat.",
      "Sa’i: walking between Safa and Marwa.",
    ],
    closing: [
      "Scholars differ slightly on how they count the pillars. Some schools list fewer, and the Shafi’i school also counts shaving or trimming the hair. Ask a qualified scholar which view your group follows.",
    ],
  },
  {
    heading: "Why Is Hajj Important for Muslims?",
    paragraphs: [
      "Hajj is more than a trip to a sacred place. It takes you out of your everyday routine and leaves you with nothing but worship and Allah.",
      "It also leaves you with lessons you carry home:",
    ],
    bullets: [
      "Hajj is obedience in practice. You do what Allah has commanded, exactly as He commanded it.",
      "Rich or poor, everyone stands in the same two white sheets. Nobody outranks anyone.",
      "The crowds, the heat and the long walks test your patience every single day.",
      "Pride has nowhere to go when you’re one face among millions.",
      "You’ll sit and pray beside people from countries you may never visit again, and you’ll feel like family.",
    ],
    closing: [
      "When you get home, don’t let it fade. Let it change how you pray, how you treat the people around you and how you live from one day to the next.",
    ],
  },
  {
    heading: "Who Must Perform Hajj?",
    paragraphs: [
      "Does every Muslim have to perform Hajj? It’s a once-in-a-lifetime obligation, but only for those who are able to make the journey.",
      "Allah says:",
      "Arabic:",
      "وَلِلَّهِ عَلَى النَّاسِ حِجُّ الْبَيْتِ مَنِ اسْتَطَاعَ إِلَيْهِ سَبِيلًا",
      "English meaning:",
      "“And [due] to Allah from the people is a pilgrimage to the House for whoever is able to find a way.”",
      "Reference: Surah Ali ‘Imran (3:97).",
      "In general, the conditions are:",
    ],
    bullets: [
      "You are Muslim.",
      "You have reached adulthood.",
      "You are of sound mind.",
      "You have enough money for the journey and your essential expenses.",
      "You are physically able to perform Hajj, or your situation falls under an Islamic ruling that covers it.",
      "You have a reasonably safe way to travel.",
    ],
    closing: [
      "Children can perform Hajj with their guardians, but it doesn’t replace the obligatory Hajj once they reach adulthood. If you have an illness, a disability or another special circumstance, ask a qualified scholar which ruling applies to you.",
    ],
  },
  {
    heading: "What Are the Three Types of Hajj?",
    paragraphs: [
      "There are three recognised ways to perform Hajj: Tamattu, Ifrad and Qiran. They differ in how Umrah fits into the pilgrimage and when you leave Ihram.",
    ],
    subsections: [
      {
        heading: "1. Hajj Tamattu",
        paragraphs: [
          "With Tamattu you perform Umrah first during the Hajj season then enter Ihram again for Hajj.",
          "The main steps:",
        ],
        bullets: [
          "Enter Ihram with the intention of Umrah.",
          "Perform Tawaf and Sa’i.",
          "Cut or shorten your hair and leave Ihram.",
          "Enter Ihram again for Hajj on the 8th of Dhul Hijjah.",
          "Complete the Hajj rituals.",
        ],
        closing: [
          "Tamattu generally requires a Hady, or sacrificial offering under the applicable Islamic rules.",
        ],
      },
      {
        heading: "2. Hajj Ifrad",
        paragraphs: [
          "With Ifrad, you perform Hajj on its own without combining it with Umrah.",
          "The main steps:",
        ],
        bullets: [
          "Enter Ihram with the intention of Hajj.",
          "Travel to the Hajj sites.",
          "Complete the required Hajj rituals.",
          "Leave Ihram at the prescribed stage.",
        ],
        closing: ["Ifrad on its own doesn’t require a Hady."],
      },
      {
        heading: "3. Hajj Qiran",
        paragraphs: [
          "With Qiran, you combine Umrah and Hajj under a single Ihram.",
          "The main steps:",
        ],
        bullets: [
          "Enter Ihram with the intention of both Umrah and Hajj.",
          "Perform the prescribed Tawaf and Sa’i.",
          "Stay in Ihram until the prescribed time to leave it.",
          "Complete the remaining Hajj rituals.",
        ],
        closing: [
          "Qiran generally requires a Hady under the applicable rules.",
        ],
      },
    ],
  },
  {
    heading: "What Is the Difference Between the Three Types?",
    table: {
      head: ["Type", "Main difference"],
      rows: [
        ["Tamattu", "Umrah first, then Hajj after you leave Ihram"],
        ["Ifrad", "Hajj without combining Umrah"],
        ["Qiran", "Umrah and Hajj combined under one Ihram"],
      ],
      after: [
        "The right choice depends on your circumstances and travel arrangements. If you’re unsure, talk it through with a qualified scholar or an authorised Hajj guide before you enter Ihram.",
      ],
    },
  },
  {
    heading: "How to Prepare for Hajj",
    paragraphs: [
      "Preparing for Hajj takes more than booking a flight. Have you learned the rituals? Are your travel documents ready? Have you thought about how physically demanding the journey is?",
      "Sort these out before you leave and you’ll save yourself time and worry later.",
    ],
    bullets: [
      "Learn the main Hajj rituals and their correct order.",
      "Attend a Hajj training session or study a reliable guide.",
      "Check your passport, visa and travel arrangements.",
      "Work out what the trip will cost and put money aside for it.",
      "Walk a little every day now. Hajj means hours on your feet.",
      "Book a doctor’s visit and ask which vaccinations you need.",
      "Break in your shoes before you go, and pack light clothes and your regular medicines.",
      "Make copies of your passport and visa, and keep emergency numbers on you.",
      "Make time for extra prayer, and ask Allah for forgiveness before you leave.",
      "Follow the latest instructions from the Saudi authorities.",
    ],
    closing: [
      "Our [Islamic Tools](/islamic-tools) include practical resources for your planning. Before you depart, confirm the latest requirements with your Hajj provider too. To plan your travel budget, try our [Hajj and Umrah cost estimator](/islamic-tools/hajj-umrah-cost-estimator) to estimate expenses such as flights, hotels, visas and transport.",
    ],
  },
  {
    heading: "How to Perform Hajj Step by Step",
    paragraphs: [
      "The main Hajj rituals run from the 8th to the 13th of Dhul Hijjah. Over those days, you’ll move between Makkah, Mina, Arafat and Muzdalifah to complete the prescribed acts of worship.",
      "Here’s how the journey generally unfolds. Some details change depending on your type of Hajj and the school of Islamic law you follow.",
    ],
    subsections: [
      {
        heading: "Before the 8th of Dhul Hijjah: Entering Ihram",
        paragraphs: [
          "Before Hajj begins, you enter Ihram at the correct Miqat for your route. Ihram is a sacred state of worship, not just a set of clothes and it comes with rules you need to follow.",
          "Men generally wear two plain, unstitched pieces of white cloth. Women wear their usual modest Islamic clothing and don’t have to wear white.",
          "Once you’ve made the intention, start reciting the Talbiyah:",
          "Arabic:",
          "لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ، لَا شَرِيكَ لَكَ",
          "Transliteration:",
          "Labbaik Allahumma Labbaik, Labbaik La Shareeka Laka Labbaik, Innal-Hamda Wan-Ni’mata Laka Wal-Mulk, La Shareeka Lak.",
          "Meaning:",
          "Here I am, O Allah, here I am. Here I am, You have no partner, here I am. Surely all praise, blessings and sovereignty belong to You. You have no partner.",
          "Keep reciting the Talbiyah at the appropriate points along your journey.",
        ],
      },
      {
        heading: "8th of Dhul Hijjah: Going to Mina",
        paragraphs: [
          "The 8th of Dhul Hijjah is known as Yawm al-Tarwiyah. You travel to Mina and spend the day and night there praying your prescribed prayers and remembering Allah.",
          "Use the time to rest and get ready for the Day of Arafat.",
        ],
      },
      {
        heading: "9th of Dhul Hijjah: Standing at Arafat",
        paragraphs: [
          "The Day of Arafat is the heart of Hajj. After sunrise you leave Mina for Arafat and from there to sunset you stay on the plain: praying, remembering Allah, and asking Him for everything you need.",
          "The Prophet Muhammad (ﷺ) said:",
          "Arabic:",
          "الْحَجُّ الْحَجُّ يَوْمُ عَرَفَةَ",
          "English meaning:",
          "“Hajj is Arafah.”",
          "Reference: Sunan Abi Dawud 1949 graded Sahih by Al-Albani.",
          "Standing at Arafat is an essential pillar of Hajj. Ask Allah for forgiveness, guidance and mercy in your own words. You don’t have to stick to one fixed supplication.",
          "After sunset, you leave Arafat and head to Muzdalifah.",
        ],
      },
      {
        heading: "Night of the 9th of Dhul Hijjah: Staying at Muzdalifah",
        paragraphs: [
          "What happens after the day at Arafat? You leave after sunset and travel to Muzdalifah where you spend part of the night before returning to Mina for the next day’s rituals.",
          "While you’re there, you:",
        ],
        bullets: [
          "Combine Maghrib and Isha prayers as prescribed.",
          "Remember Allah and make dua.",
          "Rest after the long day at Arafat.",
          "Collect small pebbles for Rami.",
          "Get ready for the return to Mina.",
        ],
        closing: [
          "The exact arrangements for staying and leaving can vary especially for pilgrims with valid exemptions. Follow your Hajj group’s instructions.",
        ],
      },
      {
        heading: "10th of Dhul Hijjah: Eid al-Adha",
        paragraphs: [
          "The 10th of Dhul Hijjah is Yawm al-Nahr, the start of Eid al-Adha. It’s a busy day with several important rites to complete.",
          "After you leave Muzdalifah return to Mina and perform these rituals:",
        ],
        bullets: [
          "Throw seven pebbles at Jamrat al-Aqabah.",
          "Offer the required sacrifice if you’re performing Hajj Tamattu or Qiran.",
          "Shave or shorten your hair (men) or cut a small portion (women).",
          "Perform Tawaf al-Ifadah at the Kaaba.",
          "Complete Sa’i if it’s still required.",
        ],
        closing: [
          "The order and details of some rites depend on your Hajj type and the scholarly opinion you follow. Get reliable guidance for your own situation.",
        ],
      },
      {
        heading: "11th of Dhul Hijjah: First Day of Tashreeq",
        paragraphs: [
          "The 11th of Dhul Hijjah is the first Day of Tashreeq. You stay in Mina and perform Rami at the three Jamarat.",
          "You throw seven pebbles at each:",
        ],
        bullets: ["Jamrat al-Sughra.", "Jamrat al-Wusta.", "Jamrat al-Aqabah."],
        closing: [
          "Throw them in this order, within the permitted time. Follow the crowd-management instructions and don’t rush.",
        ],
      },
      {
        heading: "12th of Dhul Hijjah: Second Day of Tashreeq",
        paragraphs: [
          "On the 12th, you perform Rami at all three Jamarat again. If you meet the conditions, you can leave Mina early once you’ve completed the required rituals.",
          "Allah says:",
          "Arabic:",
          "وَاذْكُرُوا اللَّهَ فِي أَيَّامٍ مَّعْدُودَاتٍ ۚ فَمَن تَعَجَّلَ فِي يَوْمَيْنِ فَلَا إِثْمَ عَلَيْهِ وَمَن تَأَخَّرَ فَلَا إِثْمَ عَلَيْهِ لِمَنِ اتَّقَىٰ",
          "English meaning:",
          "“And remember Allah during the appointed days. Whoever hastens to leave in two days, there is no blame on them; and whoever stays on, there is no blame on them, provided they are mindful of Allah.”",
          "Reference: Surah Al-Baqarah (2:203).",
          "If you leave on this day, follow the prescribed timing and conditions.",
        ],
      },
      {
        heading: "13th of Dhul Hijjah: Third Day of Tashreeq",
        paragraphs: [
          "Some pilgrims stay in Mina for the 13th of Dhul Hijjah. If you stay, you complete Rami at all three Jamarat:",
        ],
        bullets: [
          "Seven pebbles at Jamrat al-Sughra.",
          "Seven pebbles at Jamrat al-Wusta.",
          "Seven pebbles at Jamrat al-Aqabah.",
        ],
        closing: [
          "Once you’ve finished, you can leave Mina according to your Hajj arrangements.",
        ],
      },
      {
        heading: "Before Leaving Makkah: Farewell Tawaf",
        paragraphs: [
          "Before you leave Makkah, you generally perform Tawaf al-Wada, the Farewell Tawaf. It’s your last circumambulation of the Kaaba before you leave the holy city.",
          "Menstruating women are exempt from this Tawaf. If your departure plans affect when you can perform it, follow the relevant guidance.",
          "After the Farewell Tawaf, you’re ready to leave Makkah and head home.",
        ],
      },
    ],
  },
  {
    heading: "What Should You Avoid During Hajj?",
    paragraphs: [
      "Hajj asks for more than completing the rituals. How you treat the people around you matters just as much as the rituals. In Surah Al-Baqarah, Allah tells pilgrims exactly what to stay away from during Hajj.",
      "Allah says:",
      "Arabic:",
      "الْحَجُّ أَشْهُرٌ مَّعْلُومَٰتٌ ۚ فَمَن فَرَضَ فِيهِنَّ الْحَجَّ فَلَا رَفَثَ وَلَا فُسُوقَ وَلَا جِدَالَ فِي الْحَجِّ ۗ وَمَا تَفْعَلُوا مِنْ خَيْرٍ يَعْلَمْهُ اللَّهُ ۗ وَتَزَوَّدُوا فَإِنَّ خَيْرَ الزَّادِ التَّقْوَىٰ ۚ وَاتَّقُونِ يَٰٓأُولِي الْأَلْبَٰبِ",
      "English meaning:",
      "“Hajj is during well-known months. Whoever commits to performing Hajj, let them stay away from intimate relations, sin and arguments during Hajj. Whatever good you do, Allah knows it. Take provisions for the journey, but the best provision is righteousness. And be mindful of Me, O people of understanding.”",
      "Reference: Surah Al-Baqarah (2:197).",
      "During Ihram and Hajj:",
    ],
    bullets: [
      "Avoid arguments and angry behaviour.",
      "Don’t insult or hurt anyone.",
      "Don’t wear perfume while in Ihram.",
      "Don’t cut your hair or nails while in Ihram.",
      "Follow the clothing rules of Ihram.",
      "Avoid marital intimacy while in Ihram.",
      "Respect other pilgrims and follow safety instructions.",
    ],
    closing: [
      "Some rules differ for men and women, and certain mistakes carry specific rulings. If something goes wrong, ask a qualified scholar. Don’t assume your Hajj is invalid.",
    ],
  },
  {
    heading: "Important Duas to Learn Before Hajj",
    paragraphs: [
      "Which duas should you learn before you travel? You can make personal supplications throughout Hajj, but memorising a few Quranic duas and well-known Prophetic words gives you something to reach for when the words don’t come.",
    ],
    subsections: [
      {
        heading: "Dua for Goodness in This Life and the Hereafter",
        paragraphs: [
          "Arabic:",
          "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
          "Transliteration:",
          "Rabbana Atina Fid-Dunya Hasanatan Wa Fil-Akhirati Hasanatan Wa Qina Adhaban-Nar.",
          "Meaning:",
          "Our Lord, give us good in this world and good in the Hereafter and protect us from the punishment of the Fire.",
          "Reference: Surah Al-Baqarah (2:201).",
        ],
      },
      {
        heading: "Dua for Forgiveness",
        paragraphs: [
          "Arabic:",
          "رَبَّنَا ظَلَمْنَا أَنْفُسَنَا وَإِن لَّمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ",
          "Transliteration:",
          "Rabbana Zalamna Anfusana Wa Illam Taghfir Lana Wa Tarhamna Lanakoonanna Minal-Khasireen.",
          "Meaning:",
          "Our Lord, we have wronged ourselves. If You do not forgive us and have mercy upon us we will surely be among the losers.",
          "Reference: Surah Al-A’raf (7:23).",
        ],
      },
      {
        heading: "The Best Dhikr on the Day of Arafat",
        paragraphs: [
          "The Prophet Muhammad (ﷺ) called the supplication of the Day of Arafat the best supplication. He also mentioned these words:",
          "Arabic:",
          "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
          "Transliteration:",
          "La ilaha illallah Wahdahu La Shareeka Lahu, Lahul-Mulku Wa Lahul-Hamdu Wa Huwa Ala Kulli Shay’in Qadeer.",
          "Meaning:",
          "There is no god but Allah alone, with no partner. To Him belongs all dominion and all praise, and He has power over everything.",
          "Reference: Jami’ at-Tirmidhi 3585.",
        ],
      },
    ],
    closing: [
      "You’ll find more supplications, their meanings and when to recite them in our [Duas](/duas) collection.",
    ],
  },
  {
    heading: "Practical Travel Tips for Hajj",
    paragraphs: [
      "Millions of people. Blazing heat. Miles on foot every single day. Nobody tells you how much Hajj asks of your body until you’re standing in it. The good news? A few smart habits make it far easier.",
    ],
    bullets: [
      "Break in your shoes before you go.",
      "Sip water all day, even when you’re not thirsty.",
      "Carry an umbrella for shade.",
      "Keep medicines and documents in a small bag on you.",
      "Keep a card with your hotel address and group leader’s number.",
      "Agree on a meeting point every time you head out.",
      "Follow the guides when they direct the crowd.",
      "Stay calm when it’s packed. Never push.",
      "Give elderly pilgrims space.",
      "Keep your valuables zipped and close.",
      "Sleep whenever you can.",
    ],
    closing: [
      "Here’s the secret most pilgrims learn too late: Hajj is won in the small things. The pilgrim who rests, drinks and stays patient reaches Arafat with strength left to pour into dua. The one who skips all that arrives drained, with a heart too tired to ask.",
      "Visiting Makkah and Madinah as well? Our [Travel Tips](/travel-tips) cover that part of the trip.",
    ],
  },
  {
    heading: "Visiting Madinah After Hajj",
    paragraphs: [
      "Many pilgrims also visit Madinah, before or after Hajj. Would you like to visit Al-Masjid an-Nabawi? Muslims go to the Prophet’s Mosque to pray and send salutations upon Prophet Muhammad (ﷺ).",
      "Visiting Madinah isn’t a required part of Hajj. You can complete Hajj without going there.",
      "If Madinah is on your itinerary, our [Ziyaraat Guide](/ziyaraat-guide) covers the important Islamic places in Makkah and Madinah.",
    ],
  },
  {
    heading: "What Should You Do After Completing Hajj?",
    paragraphs: [
      "Getting home isn’t the end of what Hajj can teach you. The habits you built during the pilgrimage can keep shaping your life.",
      "Try to carry these into your daily routine:",
    ],
    bullets: [
      "Keep your five daily prayers. You can use our [Prayer Times](/prayer-times) tool to check daily prayer timings and maintain your Salah routine after returning home.",
      "Remember Allah regularly.",
      "Treat your family and others with kindness.",
      "Stay away from arguments and harmful behaviour.",
      "Keep learning about Islam.",
      "Thank Allah for the chance to perform Hajj.",
    ],
    closing: [
      "An accepted Hajj is a great blessing. Ask Allah to accept your worship and help you stay sincere after you return.",
      "You can keep learning through our [Islamic blog](/blog), which covers more topics on Islamic beliefs and daily practice.",
    ],
  },
  {
    heading: "Why Learn with Religion Islam?",
    paragraphs: [
      "Looking for guidance on Hajj, Umrah, duas or everyday Islamic practice? Religion Islam brings guides and resources together so you can find what you need in one place.",
      "On the website, you can:",
    ],
    bullets: [
      "Read simple Islamic guides.",
      "Explore Quran and Hadith references.",
      "Find practical Islamic tools.",
      "Prepare for Hajj and Umrah.",
      "Learn about important Islamic places.",
      "Find duas for daily life.",
      "Explore more Islamic topics.",
    ],
    closing: [
      "We want to make useful Islamic information easier to find and understand. For detailed rulings or personal questions, always go to qualified scholars and reliable Islamic sources.",
    ],
  },
  {
    heading: "May Allah Accept Your Hajj",
    paragraphs: [
      "Hajj takes preparation, patience and sincere effort. Learn the rituals beforehand and you’ll know what to do and get more out of your time in the holy places.",
      "May Allah make the journey easy for every pilgrim, accept their worship, forgive their sins and grant them an accepted Hajj. Ameen.",
    ],
  },
];
const faqs: FaqItem[] = [
  {
    question: "How many days does Hajj take?",
    answer:
      "The main Hajj rituals run from the 8th to the 13th of Dhul Hijjah. Some pilgrims leave Mina on the 12th, while others stay until the 13th.",
  },
  {
    question: "How many times must a Muslim perform Hajj?",
    answer:
      "Hajj is obligatory once in a lifetime for a Muslim who meets its conditions. Any Hajj after that is voluntary.",
  },
  {
    question: "What is the most important day of Hajj?",
    answer:
      "The 9th of Dhul Hijjah, the Day of Arafat. Standing at Arafat is an essential pillar of Hajj.",
  },
  {
    question: "What is the difference between Hajj and Umrah?",
    answer:
      "Hajj takes place on specific days of Dhul Hijjah and is obligatory once in a lifetime for Muslims who meet its conditions. You can generally perform Umrah at any time of year. Some rituals look similar, but they are separate acts of worship.",
  },
  {
    question: "Can children perform Hajj?",
    answer:
      "Yes. Children can perform Hajj with their guardians and receive the reward for it. It doesn't replace the obligatory Hajj once they reach adulthood.",
  },
  {
    question: "Can a person perform Hajj on behalf of someone else?",
    answer:
      "Yes, in some cases. You can go on behalf of someone who has passed away, or someone who can never make the journey themselves because of illness or old age. Most scholars also say you should have completed your own Hajj first. The conditions are specific, so speak to a qualified scholar before you make any arrangements.",
  },
  {
    question: "Is visiting Madinah compulsory during Hajj?",
    answer:
      "No. Visiting Madinah is separate from Hajj, and it isn't a condition for completing the pilgrimage.",
  },
  {
    question: "What happens if someone misses standing at Arafat?",
    answer:
      "Standing at Arafat is an essential pillar of Hajj. If you miss it, you haven't completed a valid Hajj for that year. Seek guidance from a qualified scholar straight away about what to do next.",
  },
  {
    question: "Which type of Hajj is suitable for first-time pilgrims?",
    answer:
      "Tamattu is the most common choice for pilgrims travelling from outside Makkah. The right type still depends on your circumstances and travel arrangements, so ask a qualified scholar or an authorised Hajj guide before you enter Ihram.",
  },
];

const PAGE_URL = "https://www.islam-religion.com/hajj-guide";

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${PAGE_URL}#webpage`,
  name: "Hajj in Islam – Rituals, Steps and Important Duas",
  url: PAGE_URL,
  description:
    "Learn about Hajj in Islam, its importance, types, rituals and step-by-step process. Explore essential duas and practical preparation tips with Islam Religion.",
  inLanguage: "en",
  isPartOf: {
    "@type": "WebSite",
    name: "Islam Religion",
    url: "https://www.islam-religion.com/",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    ratingCount: "647",
    bestRating: "5",
    worstRating: "1",
  },
};

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
};

const jsonLd = (data: object) => JSON.stringify(data).replace(/</g, "\\u003c");
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
        title="Your Complete Guide to"
        highlight="Hajj in Islam"
        image="/images/hajj-guide-image.png"
        description={
          <>
            Discover what Hajj is, why it matters in Islam and how to perform it
            step by step. Explore the 7 steps of Hajj, learn important duas and
            prepare for your pilgrimage with{" "}
            <PageHero.Mark>practical guidance</PageHero.Mark> you can trust.
          </>
        }
        primaryCta={{ label: "Hajj Checklist", href: "/tools/hajj-checklist" }}
        secondaryCta={{
          label: "Read Hajj Blogs",
          href: "/blog",
          Icon: BookOpen,
        }}
      />

      <PageTools
        titleGold="Free Tools for"
        titleEmerald="Your Hajj"
        description="Use simple, helpful tools to prepare for Hajj, manage your budget and keep track of every step."
        tools={hajjTools}
      />

      <PageContent
        title="Hajj Guide: Everything You Need to Know"
        highlight="Before Your Journey"
        intro={`Planning your first Hajj? Unsure where to start? Perhaps you want to understand the rituals before arriving in Makkah. Hajj is a journey every Muslim hopes to make. It brings together people from different countries, backgrounds and walks of life, all standing before Allah with the same purpose.

But there’s a lot to learn before you set out. When should you enter Ihram? What happens at Mina and Arafat? Which rituals do you need to finish before you leave Makkah?

This guide walks you through the main stages of Hajj, explains who has to perform it and covers the preparation that will help you feel ready.`}
        sections={hajjSections}
      />

      <PageRelatedPosts
        categorySlug="hajj-guide"
        titleGold="Related"
        titleEmerald="Hajj Articles"
      />

      <PageFaq
        titleGold="Hajj Frequently Asked"
        titleEmerald="Questions"
        faqs={faqs}
      />
    </>
  );
}
