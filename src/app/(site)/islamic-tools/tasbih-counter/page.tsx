// app/tools/tasbih-counter/page.tsx
import type { Metadata } from "next";
import ToolHero from "@/components/Tools/tool-hero";
import TasbihCounter from "@/components/Tools/TasbihCounter";
import ToolArticle, {
  type ArticleSection,
} from "@/components/Tools/tool-article";
import ToolGuide, { type GuideSection } from "@/components/Tools/tool-guide";
import RelatedTools from "@/components/Tools/related-tools";
import ToolsFaq, { type FaqItem } from "@/components/Tools/tools-faq";

export const metadata: Metadata = {
  title: "Free Online Tasbih Counter – Count Dhikr with Ease | Islam Religion",
  description:
    "Use our free online Tasbih counter to count SubhanAllah, Alhamdulillah and other dhikr. Set your target, track rounds and save your count on your device.",
  keywords: [
    "tasbih counter",
    "digital tasbih counter",
    "online tasbih counter",
    "dhikr counter",
    "tasbeeh counter",
    "zikr counter",
    "SubhanAllah Alhamdulillah Allahu Akbar counter",
    "33 tasbih counter",
    "99 tasbih counter",
  ],
  alternates: {
    canonical: "https://www.islam-religion.com/islamic-tools/tasbih-counter",
  },
  openGraph: {
    title: "Tasbih Counter Online: Free Digital Dhikr Counter",
    description:
      "Lost count mid-dhikr? Our free tasbih counter tracks every tap, round and target (33, 99, 100 or your own) and saves it on your device.",
    url: "https://www.islam-religion.com/islamic-tools/tasbih-counter",
    siteName: "Islam Religion",
    type: "website",
  },
};

const articleSections: ArticleSection[] = [
  {
    heading: "What Is a Tasbih Counter?",
    paragraphs: [
      "A tasbih counter keeps count while you remember Allah. Muslims use tasbih, also called dhikr counting, to track how many times they say words of praise and remembrance.",
      "Some people use prayer beads. Some count on their fingers. Others use a tasbih counter on their phone.",
      "Our online tasbih counter keeps it simple. Pick the words you want to recite, set a target and tap the circle after each recitation.",
      "Use it at home, at work, on the road, or any time you want to remember Allah.",
    ],
  },
  {
    heading: "What Is Dhikr in Islam?",
    paragraphs: [
      "Dhikr means remembering Allah. That covers praising Him, thanking Him, asking for His forgiveness and recalling His greatness.",
      "You don't need a special place or hours of free time. You can do it after Salah, in the morning, in the evening, or in any quiet moment during your day.",
      "Allah says in the Quran:",
      "\u201cSurely in the remembrance of Allah do hearts find comfort.\u201d",
      "Surah Ar-Ra'd (13:28)",
      "Dhikr gives you a moment to stop, remember your Creator and turn towards Him.",
    ],
  },
  {
    heading: "Common Dhikr You Can Recite",
    paragraphs: [
      "Muslims remember Allah with different words, called adhkar. Some praise His greatness, some thank Him for His blessings, and some ask for His forgiveness.",
      "You can say them after Salah, in the morning and evening, or whenever you have a quiet minute. When you know what each phrase means, you understand what you are saying, and it is easier to focus.",
      "Our online tasbih counter has five common phrases to choose from:",
    ],
    bullets: [
      "SubhanAllah (سُبْحَانَ اللَّهِ), meaning Glory be to Allah: It means Allah is free from every fault and imperfection. When you say it, you praise Him and acknowledge His greatness. Say it when you look at the beauty of His creation, think about the blessings in your life, or notice His power. It is an easy way to praise Allah all day long.",
      "Alhamdulillah (الْحَمْدُ لِلَّهِ), meaning All praise belongs to Allah: It is how you praise Allah and thank Him for everything He has given you. Say it when you get good news, enjoy a blessing, or feel grateful for something. It works in hard times too. The words remind you to notice what Allah has given you and to stay thankful.",
      "Allahu Akbar (اللَّهُ أَكْبَرُ), meaning Allah is the Greatest: It reminds you that Allah is greater than everything in this world. The words express His greatness, power and majesty. Muslims say them in Salah, in the call to prayer and in many other acts of worship. Say them whenever you want to praise Allah and remember that nothing is greater than Him.",
      "La ilaha illallah (لَا إِلَٰهَ إِلَّا اللَّهُ), meaning There is no god worthy of worship except Allah: It is the declaration of Tawheed, which means believing that Allah alone deserves worship. It is the foundation of Islamic faith and a reminder to worship no one but Allah. When you recite it, you remember why you believe and strengthen your faith in His oneness.",
      "Astaghfirullah (أَسْتَغْفِرُ اللَّهَ), meaning I ask Allah for forgiveness: It means asking Allah to forgive your sins and mistakes. Everyone makes mistakes, but Islam teaches us never to lose hope in Allah's mercy. Say it when you realise you've slipped, when you want to turn back to Allah, or just to ask for His forgiveness during the day. Make it a regular part of your dhikr and ask for His mercy sincerely.",
    ],
  },
  {
    heading: "How to Use This Online Tasbih Counter",
    paragraphs: [
      "Our free online tasbih counter lets you count your daily dhikr without carrying prayer beads. Open it in your browser on your phone, tablet or computer. You don't need to download an app, make an account or register.",
      "Maybe you want to say SubhanAllah after Salah, count Astaghfirullah through the day, or follow a routine of your own. The tool keeps track of every recitation.",
      "Choose from five common dhikr, set a target that fits your routine and watch your progress as you count. Tapped by mistake? Undo your last tap. You can also reset a count or check your completed rounds whenever you like.",
      "Follow these steps to start:",
    ],
    bullets: [
      "Step 1: Choose your preferred dhikr.",
      "Step 2: Select 33, 99, 100 or a custom target.",
      "Step 3: Recite your dhikr and tap the counting circle.",
      "Step 4: Complete your target and continue with another round.",
      "Step 5: Undo your last tap or reset your current count.",
      "Step 6: View your individual totals, completed rounds and combined count.",
    ],
  },
  {
    heading: "How Many Times Should You Say Tasbih?",
    paragraphs: [
      "It depends on the dhikr and the practice you follow. The Sunnah gives specific counts for some dhikr. Others have no fixed daily number.",
      "For example, the Prophet Muhammad ﷺ taught specific words of remembrance after the obligatory prayers.",
      "On our digital tasbih counter you can also set a personal target of 33, 99 or 100. Those are just counting options. They are not a rule for every type of dhikr.",
      "If you follow a particular Sunnah practice, use the count and wording taught for it.",
    ],
  },
  {
    heading: "Dhikr After Salah: The Sunnah Counts",
    paragraphs: [
      "Many Muslims recite SubhanAllah, Alhamdulillah and Allahu Akbar after the obligatory prayers.",
      "Sahih Muslim has authentic narrations that describe two well-known ways to count these words:",
    ],
    bullets: [
      "The 33-33-34 method: After each obligatory prayer, recite SubhanAllah 33 times, Alhamdulillah 33 times and Allahu Akbar 34 times. Sahih Muslim 596a reports this practice.",
      "The 33-33-33 method: Another authentic narration gives this sequence. Recite SubhanAllah 33 times, Alhamdulillah 33 times and Allahu Akbar 33 times, then say \"La ilaha illallahu wahdahu la sharika lah, lahul-mulku wa lahul-hamdu wa huwa 'ala kulli shay'in qadir\" once. That last phrase brings the total to 100. Sahih Muslim 597a reports this practice, and the narration also mentions forgiveness for the person who follows this remembrance.",
    ],
    closing: [
      "You can follow either one. For the 33-33-34 method on our counter, set a custom target of 34 for Allahu Akbar.",
      "Hadith references: [Sahih Muslim 596a](https://sunnah.com/muslim:596a) and [Sahih Muslim 597a](https://sunnah.com/muslim:597a)",
    ],
  },
  {
    heading: "Benefits of Remembering Allah",
    paragraphs: [
      "Dhikr is a big part of a Muslim's daily life. It keeps Allah in your mind in easy times and hard ones. Whether you are thanking Him for a blessing, asking forgiveness or praising His greatness, every sincere remembrance brings you closer to your faith.",
      "The Quran also stresses how important dhikr is. In Surah Ar-Ra'd (13:28), Allah says hearts find comfort in remembering Him. Let that push you to make dhikr a regular part of your life.",
      "Some of the benefits of remembering Allah:",
    ],
    bullets: [
      "Remember Allah throughout the day",
      "Find comfort through His remembrance",
      "Show gratitude for His blessings",
      "Seek forgiveness for your sins",
      "Strengthen your faith and belief",
      "Keep your heart connected to Allah",
      "Build a regular habit of worship",
    ],
    closing: [
      "Dhikr isn't about hitting a number. Take your time, understand the words, and remember Allah sincerely.",
    ],
  },
  {
    heading: "Digital Tasbih vs. Physical Prayer Beads",
    paragraphs: [
      "There's more than one way to count your dhikr. Some Muslims prefer prayer beads, some use their fingers, and some use a digital counter. Each one can help you keep track.",
      "Physical beads are easy to carry and need no battery. A digital counter adds custom targets, round tracking and an undo option.",
      "Our online tasbih counter helps when you'd rather count on your phone or computer than carry something extra.",
      "Choose whichever method helps you focus and remember Allah with ease.",
    ],
  },
  {
    heading: "Tips to Build a Daily Dhikr Habit",
    paragraphs: [
      "Dhikr becomes part of your day when you do it often. You don't need a long list or hours of counting. Begin with a few phrases you already know, at a time when nobody is rushing you.",
      "Try it in your morning routine, after the obligatory prayers, or during a break. What matters is that you understand what you say and keep it regular.",
      "Simple ways to build the habit:",
    ],
    bullets: [
      "Start after Salah",
      "Choose familiar words",
      "Set a realistic target",
      "Understand what you recite",
      "Make time for morning and evening dhikr",
      "Stay consistent with your routine",
      "Recite with focus and sincerity",
      "Learn new adhkar gradually",
    ],
  },
  {
    heading: "Using a Tasbih Counter During Hajj and Umrah",
    paragraphs: [
      "Hajj and Umrah mean travel, walking and a lot of time at the holy sites. You'll also have quiet moments while you wait or rest.",
      "A digital tasbih counter lets you track your dhikr without carrying beads.",
      "Use it for the adhkar you choose, on the journey and in your free time. Keep your phone secure, especially in crowds, and don't use it when your attention belongs on the rituals.",
      "Remember, a tasbih counter only helps you count. It doesn't replace the duas and acts of worship taught for Hajj and Umrah.",
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
];

const faqs: FaqItem[] = [
  {
    question: "What is a tasbih counter?",
    answer:
      "A tasbih counter is a digital version of a string of prayer beads. You tap once for each recitation, and the ring fills as you move towards your target.",
  },
  {
    question: "What is the common dhikr routine after prayer?",
    answer:
      "Many Muslims say SubhanAllah 33 times, Alhamdulillah 33 times and Allahu Akbar 34 times after the obligatory prayers. No single number applies to every dhikr, so you can pick a target that suits you.",
  },
  {
    question: "Which dhikr can I count with this tool?",
    answer:
      "You can count SubhanAllah, Alhamdulillah, Allahu Akbar, La ilaha illallah and Astaghfirullah. Each one shows its Arabic, transliteration and meaning, and each keeps its own count.",
  },
  {
    question: "Can I set my own target?",
    answer:
      "Yes. Choose 33, 99 or 100, or type in a number of your own. The counter tracks every round you complete.",
  },
  {
    question: "What if I tap by mistake?",
    answer:
      "Press Undo last and the counter removes your most recent tap. You can also reset a single dhikr, or reset everything.",
  },
  {
    question: "Does it vibrate when I tap?",
    answer:
      "On supported phones, it buzzes briefly on each tap and for longer when you finish a round. Most Android phones support this, but iPhones do not in the browser. Switch Vibrate on tap off if you prefer silence.",
  },
  {
    question: "Does the counter save my counts?",
    answer:
      "Yes, in your browser on the device you use. If you clear your browser data or use private browsing, the counts disappear. They do not move to another device on their own.",
  },
  {
    question: "Is the Tasbih Counter free?",
    answer: "Yes. You do not need to sign up or create an account.",
  },
];
const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Tasbih Counter Online: Free Digital Dhikr Counter",
  url: "https://www.islam-religion.com/islamic-tools/tasbih-counter",
  description:
    "Lost count mid-dhikr? Our free tasbih counter tracks every tap, round and target (33, 99, 100 or your own) and saves it on your device.",
  inLanguage: "en",
  isPartOf: {
    "@type": "WebSite",
    name: "Islam Religion",
    url: "https://www.islam-religion.com/",
  },
};
export default function TasbihCounterPage() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ToolHero
        title="Free Tasbih"
        highlight="Counter"
        description="Count your dhikr with a single tap, track your rounds, and keep your progress saved on your device."
      />

      <div className="bg-warm-white">
        <section className="mx-auto max-w-5xl px-4 pb-10 sm:px-6 lg:px-8">
          <TasbihCounter />
        </section>
        <ToolGuide
          title="How to Use the Tasbih Counter"
          sections={guideSections}
        />
        <ToolArticle
          title="Tasbih Counter: Count Your Dhikr Without Losing Your Place"
          intro="You are halfway through SubhanAllah, your mind drifts for a second, and now you cannot remember whether you were on 27 or 29. Everyone who counts dhikr has been there. Our free Tasbih Counter takes that worry away. Tap once for each recitation, watch the ring fill towards your target of 33, 99, 100 or your own number, and let the counter track your rounds while you focus on the words. Mis-tapped? Undo it. Finished for the day? Your counts stay saved on your device, ready for tomorrow."
          sections={articleSections}
        />
      </div>

      <RelatedTools
        keys={[
          "prayer-times",
          "noorani-qaida",
          "hajj-checklist",
          "ramadan-counter",
        ]}
      />

      <ToolsFaq faqs={faqs} title="Tasbih Counter" highlight="FAQs" />
    </div>
  );
}
