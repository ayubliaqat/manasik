// app/tools/hajj-checklist/page.tsx
import type { Metadata } from "next"
import ToolHero from "@/components/Tools/tool-hero"
import HajjChecklist from "@/components/Tools/HajjChecklist"
import ToolArticle, { type ArticleSection } from "@/components/Tools/tool-article"
import ToolGuide, { type GuideSection } from "@/components/Tools/tool-guide"
import RelatedTools from "@/components/Tools/related-tools"
import ToolsFaq, { type FaqItem } from "@/components/Tools/tools-faq"

export const metadata: Metadata = {
  title: "Hajj Checklist – Free Hajj Preparation Tool",
  description:
    "Prepare for Hajj with our free checklist. Track 29 tasks covering documents, health, ihram, money and spiritual preparation in one place.",
  keywords: [
    "Hajj Checklist",
    "Hajj preparation checklist",
    "Hajj packing checklist",
    "Hajj checklist for men",
    "Hajj checklist for women",
    "Hajj checklist for children",
    "Hajj preparation list",
  ],
  alternates: {
    canonical: "https://www.islam-religion.com/islamic-tools/hajj-packing-checklist",
  },
  openGraph: {
    title: "Hajj Checklist – Free Hajj Preparation Tool",
    description:
      "Prepare for Hajj with our free checklist. Track 29 tasks covering documents, health, ihram, money and spiritual preparation in one place.",
    url: "https://www.islam-religion.com/islamic-tools/hajj-packing-checklist",
    siteName: "Islam Religion",
    type: "website",
  },
}

const articleSections: ArticleSection[] = [
  {
    heading: "What Is the Hajj Checklist?",
    paragraphs: [
      "The Hajj checklist is a free online tool that helps you plan and track your Hajj preparation. It gives you 29 tasks in six sections. You tap each task when you finish it, and a progress bar shows how much you have done.",
      "The tool covers the practical side of Hajj, like your passport and luggage. It also covers the spiritual side, like your intention and your debts. You see both sides on one screen, so you never forget one while you focus on the other.",
    ],
  },
  {
    heading: "Why Should You Use a Hajj Checklist?",
    paragraphs: [
      "A checklist turns a huge job into small steps you can finish one at a time. Hajj involves paperwork, health, money, packing and worship, and it is easy to forget one part when you juggle all of them.",
      "Most people plan on scraps of paper or in different phone notes. Then they lose a note or miss a task. One checklist fixes that problem. Here is what the tool gives you:",
    ],
    bullets: [
      "One place for every task",
      "A clear view of your progress",
      "Small steps instead of one big job",
      "A quick way to spot what you still need to do",
    ],
  },
  {
    heading: "Who Is the Hajj Checklist For?",
    paragraphs: [
      "Anyone getting ready for Hajj can use it. You do not need computer skills. You open the page, read a task and tap a box.",
      "The tool suits first-time pilgrims best, because they have the most to learn. It also helps people who have gone before and want a quick check, and adult children who help their parents get ready. Families and groups can use it too, because it gives everyone the same plan to follow.",
      "If you are also planning Umrah, use our Umrah Packing Checklist to organise your clothes, documents and other travel essentials.",
      "You can use it if you are:",
    ],
    bullets: [
      "Going to Hajj for the first time",
      "Going again and want a quick check",
      "Helping a parent or grandparent prepare",
      "Travelling with a family or group",
      "Feeling overwhelmed and unsure where to start",
    ],
  },
  {
    heading: "Are There Separate Checklists for Men, Women and Children?",
    paragraphs: [
      "Yes. This page gives you the main Hajj checklist for everyone. We also have separate checklists for men, women and children, because each group needs different things.",
      "Men and women pack different clothes and essentials for ihram. Children need extra care, such as their own documents, snacks and comfort items. A separate list for each group helps you pack the right things for every person in your family. Pick the list that fits you:",
    ],
    bullets: [
      "Hajj checklist for men",
      "Hajj checklist for women",
      "Hajj checklist for children",
    ],
  },
  {
    heading: "Start With the Main List",
    paragraphs: [
      "Use the main checklist on this page first. Then open the list for each person who is travelling, and tick off their items too.",
    ],
  },
  {
    heading: "How Do You Use the Hajj Checklist?",
    paragraphs: [
      "You open the tool, pick a section and tap each task when you finish it. That is all it takes. You can begin in a few seconds and work in any order.",
      "The tool also shows a count for each section. If you see “3/6”, you have finished three of the six tasks in that section. The main bar at the top shows your total out of 29 and your percentage.",
      "Follow these steps:",
    ],
    bullets: [
      "Open any section. Pick the one that feels most urgent.",
      "Read each task.",
      "Tap a task when you finish it.",
      "Watch the progress bar fill up.",
      "Come back any time to tick more tasks.",
      "Press Reset list if you want to start again.",
    ],
  },
  {
    heading: "Checking Prayer Times",
    paragraphs: [
      "As you prepare for your journey, you can also use our Prayer Times tool to check daily salah timings for your location.",
    ],
  },
  {
    heading: "What Does the Hajj Checklist Cover?",
    paragraphs: [
      "The tool covers six areas of Hajj preparation. You can work on them in any order, and each area has its own progress count.",
      "Together, the six sections cover your paperwork, your worship, your body, your clothing, your money and your last week at home. You can see all six at once, so you know which areas need more attention.",
    ],
    bullets: [
      "Documents",
      "Spiritual preparation",
      "Health and fitness",
      "Ihram and essentials",
      "Money and family",
      "Final week",
    ],
  },
  {
    heading: "Is the Hajj Checklist Free?",
    paragraphs: [
      "Yes, the tool is completely free. You do not pay anything, you do not create an account and you do not download an app.",
      "You open the page in your browser and start. You can use it as often as you like, on as many days as you need. Nothing is locked behind a sign-up or a payment.",
    ],
  },
  {
    heading: "Does the Checklist Include Everything I Need?",
    paragraphs: [
      "This checklist covers the main parts of Hajj preparation for every pilgrim. For personal items, use our separate lists for men, women and children.",
      "Your needs also depend on your country, your Hajj operator, your health and your family. A person with a medical condition may need extra items. The tool has a fixed list, so you cannot add your own tasks. Keep a short note on your phone for anything personal.",
      "For the best result:",
    ],
    bullets: [
      "Start with the main checklist on this page",
      "Add the checklist for each traveller in your family",
      "Compare everything with your operator’s list",
      "Write down anything personal in a separate note",
    ],
  },
  {
    heading: "Does the Tool Save My Progress?",
    paragraphs: [
      "Yes, the tool saves your ticks in your browser, on your device. When you come back on the same phone or computer, your ticks are still there.",
      "Nobody else can see your progress. We do not store it on an account or send it anywhere. That keeps your plans private, but it also means the tool cannot move your list to another device. Your ticks will disappear if:",
    ],
    bullets: [
      "You clear your browser data",
      "You open the page on a different device",
    ],
  },
  {
    heading: "Can I Use the Checklist on My Phone?",
    paragraphs: [
      "Yes, the tool works in the browser on your phone, tablet or computer. Most people use it on their phone, because they can tick off tasks wherever they are, at home, at the shops or at the airport.",
      "Open the page on the same phone and the same browser each time. That way your ticks stay with you.",
    ],
  },
  {
    heading: "When Should I Start Using the Checklist?",
    paragraphs: [
      "Start as soon as you decide to go. The tool works best when you have time to finish tasks slowly, and some tasks, like visas and bookings, cannot be rushed.",
      "Open the Documents section first, because paperwork takes the longest. Then come back every week. Tick off what you finished and pick two or three new tasks for the week ahead. In your last week before you fly, open the Final week section and finish your last tasks.",
      "You can also use our Hijri Date Converter to check Islamic dates and keep track of important dates in the Hijri calendar.",
    ],
  },
  {
    heading: "Can I Share the Checklist With My Family?",
    paragraphs: [
      "You can share the page link, but not your ticks. Each device saves its own list, so you and your travel partner each keep a separate record.",
      "This works well if you split the work. One person can take the paperwork, and the other can take the packing. Then compare your lists once a week so nothing gets missed. A parent who travels with an adult child can ask the child to keep the list on their phone and read it out loud.",
    ],
  },
  {
    heading: "What Is the Best Way to Use the Tool?",
    paragraphs: [
      "The best way is to use it often, in small bursts. A few minutes every week works better than one long session before you travel. Use these habits to stay on track:",
    ],
    bullets: [
      "Open the tool once a week",
      "Finish your paperwork before anything else",
      "Share the page link with your travel partner",
      "Check each section again before you leave home",
      "Keep your operator’s list next to this one",
    ],
  },
  {
    heading: "Is the Checklist an Official List?",
    paragraphs: [
      "No, the checklist is a practical guide, not an official list. Rules for visas, vaccines and permits change, and they differ from country to country.",
      "Always confirm the exact requirements with your Hajj operator or the official authorities before you travel. Use the tool to stay organised, and use your operator to stay correct.",
    ],
  },
]

const guideSections: GuideSection[] = [
  {
    heading: "How to use this checklist",
    variant: "steps",
    items: [
      "Open any section and start with what feels most urgent.",
      "Tap an item once you have completed it.",
      "Watch the progress bar fill as you go.",
      "Come back any time. Your ticks are saved on this device.",
      "Press Reset list to start again.",
    ],
  },
  {
    heading: "How it helps you",
    variant: "highlight",
    items: [
      "Keeps every task in one place instead of scattered notes.",
      "Shows your progress at a glance.",
      "Covers both the spiritual and practical sides of Hajj.",
      "Free to use, with no sign-up.",
    ],
  },
  {
    heading: "Tips for best results",
    variant: "tips",
    items: [
      "Start early and do a few items each week.",
      "Finish paperwork first, as visas and bookings take time.",
      "Share the list with your family or travel partner.",
    ],
  },
  {
    heading: "Good to know",
    variant: "note",
    text: "Your progress is saved only in this browser and is not shared with anyone. Clearing browser data or switching devices will remove it. This list is a practical guide, so always confirm visa and health requirements with your Hajj operator or the official authorities.",
  },
]

const faqs: FaqItem[] = [
  {
    question: "Can I use this checklist for Umrah?",
    answer:
      "Some tasks match, like documents, health and ihram. But Umrah is shorter and has no Hajj permit. Use our Umrah Packing Checklist instead.",
  },
  {
    question: "Does the checklist replace my operator’s advice?",
    answer:
      "No. It helps you stay organised. Always follow your operator’s instructions and the rules from the official authorities.",
  },
  {
    question: "Can I add my own tasks?",
    answer:
      "No. The tool has a fixed list of 29 tasks. Keep a short note on your phone for anything personal, like a special medicine or a gift you want to bring.",
  },
  {
    question: "Why did my ticks disappear?",
    answer:
      "The tool saves ticks only in the browser you used. If you clear your browser data or switch devices, they go away. Use the same device and browser each time.",
  },
  {
    question: "How do I start over?",
    answer:
      "Press Reset list. The tool clears all your ticks and sets your progress back to zero.",
  },
  {
    question: "Who can I ask if I have a question?",
    answer:
      "Send us a message on our Contact page. We will help you as soon as we can.",
  },
]
const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Hajj Checklist – Free Hajj Preparation Tool",
  url: "https://www.islam-religion.com/islamic-tools/hajj-packing-checklist",
  description:
    "Prepare for Hajj with our free checklist. Track 29 tasks covering documents, health, ihram, money and spiritual preparation in one place.",
  inLanguage: "en",
  isPartOf: {
    "@type": "WebSite",
    name: "Islam Religion",
    url: "https://www.islam-religion.com/",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "345",
    bestRating: "5",
    worstRating: "1",
  },
}

export default function HajjChecklistPage() {
  return (
    <div>
            <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ToolHero
        title="Hajj"
        highlight="Checklist"
        description="Track your Hajj preparation step by step. Tick items off as you go and your progress is saved on this device."
      />

      <div className="bg-warm-white">
        <section className="mx-auto max-w-5xl px-4 pb-10 sm:px-6 lg:px-8">
          <HajjChecklist />
        </section>
          <ToolGuide
          title="How to Use the Hajj Checklist"
          sections={guideSections}
        />
                <ToolArticle
          title="Hajj Checklist: Free Tool to Prepare and Pack"
          intro="Getting ready for Hajj means handling many things at once. You have visas, vaccines, bookings, money, health and your own heart to prepare. Our free Hajj checklist keeps all of it in one place, so you can finish one small task at a time. This page explains what the tool does, who it helps and how to use it. Read it once, then open the tool and start ticking."
          sections={articleSections}
        />
      </div>

      <RelatedTools
        keys={["packing-list", "cost-estimator", "zakat-calculator", "prayer-times"]}
      />

      <ToolsFaq faqs={faqs} title="Hajj Checklist" highlight="FAQs" />
    </div>
  )
}