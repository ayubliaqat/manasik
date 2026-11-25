// app/tools/packing-list/page.tsx
import type { Metadata } from "next"
import ToolHero from "@/components/Tools/tool-hero"
import UmrahPackingList from "@/components/Tools/UmrahPackingList"
import ToolArticle, { type ArticleSection } from "@/components/Tools/tool-article"
import ToolGuide, { type GuideSection } from "@/components/Tools/tool-guide"
import RelatedTools from "@/components/Tools/related-tools"
import ToolsFaq, { type FaqItem } from "@/components/Tools/tools-faq"

export const metadata: Metadata = {
  title: "Umrah Packing Checklist – Free Custom Packing List",
  description:
    "Use our free Umrah packing checklist to prepare for short or long trips. Track your packing progress and organise essentials for your journey.",
  keywords: [
    "Umrah Packing Checklist",
    "Umrah packing list",
    "Umrah checklist",
    "Umrah packing list for men",
    "Umrah packing list for women",
    "Umrah packing list for children",
    "What to pack for Umrah",
    "Umrah travel essentials",
  ],
  alternates: {
    canonical: "https://www.islam-religion.com/islamic-tools/umrah-packing-checklist",
  },
  openGraph: {
    title: "Umrah Packing Checklist – Free Custom Packing List",
    description:
      "Use our free Umrah packing checklist to prepare for short or long trips. Track your packing progress and organise essentials for your journey.",
    url: "https://www.islam-religion.com/islamic-tools/umrah-packing-checklist",
    siteName: "Islam Religion",
    type: "website",
  },
}

const articleSections: ArticleSection[] = [
  {
    heading: "What Is the Umrah Packing Checklist Tool?",
    paragraphs: [
      "The tool is a free online packing list for Umrah. You tell it how long you plan to stay and whether you will add a holiday. It then shows the items that fit your trip.",
      "You tap each item when it goes into your bag. A progress bar shows how much you have packed and how much is left. You can use it on your phone while you stand next to your suitcase, so you never have to guess what is still missing.",
    ],
  },
  {
    heading: "Why Use a Tool Instead of a Normal Packing List?",
    paragraphs: [
      "A normal list gives everyone the same items. A three-day traveller and a three-week traveller get the same advice, so one packs too much and the other packs too little.",
      "This tool fixes that problem. It changes the list when your plans change. You also tick items as you go, so you always see what is left. You do not need to scroll through a long article or keep notes on paper. Everything you need sits on one screen. Here is what you get:",
    ],
    bullets: [
      "A list built for your trip",
      "One place for every item",
      "A clear view of what you still need to pack",
      "Less stress before you fly",
    ],
  },
  {
    heading: "How Do I Use the Umrah Packing Checklist?",
    paragraphs: [
      "You choose your trip, then pack from the list. Setup takes about a minute, and you can change your answers whenever your plans change. You do not need to read a manual or watch a video.",
    ],
    bullets: [
      "Choose a short trip or a long trip.",
      "Choose whether you are adding a holiday.",
      "Read the list that appears.",
      "Tap each item when you pack it.",
      "Watch the progress bar fill up.",
      "Come back any time to tick more items.",
      "Press Reset list if you want to start again.",
    ],
  },
  {
    heading: "Changing Your Answers",
    paragraphs: [
      "If your plans change, change your answers. The list updates to match.",
    ],
  },
  {
    heading: "Does the List Change for a Short or Long Trip?",
    paragraphs: [
      "Yes. Your trip length decides how many clothes and supplies you need, and the tool changes your list when you switch. You see the new list right away, so you can compare both and pick the one that fits.",
      "On a short trip, the list stays small. You need fewer outfits, a small supply of toiletries and enough medicine for a few days. You can wash a few items and wear them again.",
      "On a long trip, the list grows. You need more outfits, more medicine and items for washing clothes during your stay.",
      "Some items stay on every list. These are your ihram, your documents and your comfortable shoes. Everything else grows or shrinks with your plan.",
    ],
  },
  {
    heading: "What Happens When I Add a Holiday?",
    paragraphs: [
      "The tool adds items for your extra days. Many people add a holiday before or after Umrah to visit family, rest or see new places, and those days need different things from a pilgrimage.",
      "A holiday may call for casual clothes and sun protection. The tool keeps these items apart from your Umrah items. This helps you pack two separate groups of things, so you can find your ihram and prayer items fast when it is time for worship. You can also pack them in two bags and keep your worship items easy to reach.",
      "If you change your mind about the holiday, switch the option off. The extra items disappear from your list.",
      "If you plan to visit important Islamic sites during your stay, read our Ziyaraat Guide to learn more about places you can visit in Makkah and Madinah.",
    ],
  },
  {
    heading: "What Is Inside the Checklist?",
    paragraphs: [
      "The tool groups your items into six areas. Your trip choices decide which items show up in each one, so two people can see two different lists.",
      "Each area has its own items to tick. This makes it easy to check your bag one part at a time, instead of reading one long list from top to bottom.",
    ],
    bullets: [
      "Documents",
      "Ihram and clothing",
      "Toiletries",
      "Health and medicine",
      "Electronics and chargers",
      "Other essentials",
    ],
  },
  {
    heading: "Finding Open Items",
    paragraphs: [
      "If an area still has open items, you know where to look.",
    ],
  },
  {
    heading: "Does the Tool Cover Ihram, Toiletries and Medicine?",
    paragraphs: [
      "Yes. These are the areas people worry about most, and the tool lists them clearly. You see them as their own items, so you can check each one off.",
      "Ihram sits in its own area, so you can check that you have enough sets. Toiletries show you what to bring, and you can choose unscented items because scented products are not allowed in ihram. The health area helps you remember your regular medicine and a letter from your doctor.",
      "The tool lists the items. Your travel agent and the official authorities decide the rules. Check with them for anything you are unsure about.",
      "Before you travel, read our Umrah Guide to understand the steps of Umrah and what to expect during the pilgrimage.",
    ],
  },
  {
    heading: "Is There a Different List for Men, Women and Children?",
    paragraphs: [
      "Yes. This page gives you the main checklist for everyone, and we also have separate checklists for men, women and children. Each group packs different items.",
      "Men and women wear different clothes for ihram and daily worship. Children need extra care, like their own documents, snacks and comfort items. A separate list for each group makes sure nobody in your family is forgotten. Pick the list that fits you:",
    ],
    bullets: [
      "Umrah checklist for men",
      "Umrah checklist for women",
      "Umrah checklist for children",
    ],
  },
  {
    heading: "Start With the Main List",
    paragraphs: [
      "Start with the main list on this page. Then open the list for each person who travels with you.",
    ],
  },
  {
    heading: "Who Is the Umrah Packing Checklist For?",
    paragraphs: [
      "Anyone packing for Umrah can use it. You do not need computer skills. You open the page, answer two questions and tap your items. If you can use a phone, you can use this tool.",
      "It helps people who have never packed for Umrah, and it helps people who want a quick check before they fly. It also suits families who want one clear plan for everyone.",
      "It works well if you are:",
    ],
    bullets: [
      "Going for the first time",
      "Going again and want a quick check",
      "Planning a short trip",
      "Planning a long stay",
      "Adding a holiday",
      "Packing for a family",
    ],
  },
  {
    heading: "Is the Umrah Packing Checklist Free?",
    paragraphs: [
      "Yes. The tool is completely free. You do not pay, you do not create an account and you do not download an app. You open the page in your browser and start.",
      "You can use it for as many trips as you plan. Nothing is locked behind a sign-up or a payment, and you can come back as often as you like.",
    ],
  },
  {
    heading: "Does It Save My Progress?",
    paragraphs: [
      "Yes. The tool saves your ticks in your browser, on your device. When you return on the same phone or computer, your ticks are waiting. You can pack a little today and finish tomorrow.",
      "Nobody else can see your progress. We do not store it on an account. This keeps your plans private, but it means your list does not move to a new device. Your ticks will disappear if:",
    ],
    bullets: [
      "You clear your browser data",
      "You open the page on a different device",
    ],
  },
  {
    heading: "Keeping Your Ticks",
    paragraphs: [
      "Use the same phone and the same browser each time.",
    ],
  },
  {
    heading: "Can I Use It on My Phone?",
    paragraphs: [
      "Yes. The tool works in the browser on your phone, tablet or computer. Most people use it on their phone, because they can tick off items while they pack.",
      "You do not need to install anything. Open the page, and the tool is ready. A bookmark on your home screen helps you find it again fast.",
    ],
  },
  {
    heading: "Does the Checklist Include Everything I Need?",
    paragraphs: [
      "It covers the main items for most pilgrims, but no list fits every person. It gives you a strong base to build on.",
      "Your needs also depend on your health, the season and your travel group. A person with a medical condition may need extra items. Keep a short note on your phone for anything personal, like a special medicine. Compare the list with your travel agent’s advice before you finish packing.",
    ],
  },
  {
    heading: "When Should I Start Using It?",
    paragraphs: [
      "Start about a week before you fly, and sort your paperwork even earlier. Your passport, visa and bookings take time, so check them first. Then use the tool to pack in small steps, not in one night.",
      "Here is an easy plan:",
    ],
    bullets: [
      "One week before, tick off the items you already own",
      "Five days before, buy anything that is missing",
      "Two days before, pack your carry-on bag",
      "The night before, do a final check",
    ],
  },
  {
    heading: "Is This an Official List?",
    paragraphs: [
      "No. The checklist is a practical guide, not an official list. Airlines set their own baggage limits, and visa rules change.",
      "Check your airline’s allowance and your travel agent’s advice before you pack. Use the tool to stay organised, and use your agent to stay correct.",
      "If you are planning your travel budget alongside your packing, use our Hajj and Umrah Cost Estimator to estimate your pilgrimage expenses.",
    ],
  },
]

const guideSections: GuideSection[] = [
  {
    heading: "How to use this packing list",
    variant: "steps",
    items: [
      "Choose who you are packing for: Men, Women or With children.",
      "Go through each section and gather the items.",
      "Tap an item once it is in your bag.",
      "Watch the progress bar fill as you pack.",
      "Come back any time. Your ticks are saved on this device.",
    ],
  },
  {
    heading: "How it helps you",
    variant: "highlight",
    items: [
      "Shows only the items that apply to you or your family.",
      "Helps you avoid forgetting small but important things.",
      "Keeps your packing organised by category.",
      "Free to use, with no sign-up.",
    ],
  },
  {
    heading: "Tips for best results",
    variant: "tips",
    items: [
      "Start packing at least a week before you travel.",
      "Pack your hand luggage first, with documents and medicines.",
      "Break in your sandals and shoes before the trip.",
    ],
  },
  {
    heading: "Good to know",
    variant: "note",
    text: "Your ticks are saved only in this browser and are not shared with anyone. Clearing browser data or switching devices will remove them. Airline baggage rules vary, so check your allowance and what is allowed in hand luggage before you travel.",
  },
]

const faqs: FaqItem[] = [
  {
    question: "Does the tool tell me my airline’s baggage limit?",
    answer:
      "No. Every airline sets its own limit. Check it before you pack, then use the checklist to stay under it.",
  },
  {
    question: "Do I have to pack everything on the list?",
    answer:
      "No. Pack what fits your plans. Skip items you do not need, and keep your ihram, documents and shoes on every trip.",
  },
  {
    question: "What if my plans change after I start?",
    answer:
      "Change your trip length or holiday choice. The list updates, and your ticks stay where they are.",
  },
  {
    question: "Can I add my own items?",
    answer:
      "Keep a short note on your phone for personal items, like a special medicine or a gift you want to bring.",
  },
  {
    question: "Why did my ticks disappear?",
    answer:
      "The tool saves ticks only in the browser you used. Clearing your browser data or switching devices removes them.",
  },
  {
    question: "Can I use this checklist for Hajj?",
    answer:
      "Some items match, but Hajj needs more preparation. Use our Hajj Checklist instead.",
  },
]

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Umrah Packing Checklist – Free Custom Packing List",
  url: "https://www.islam-religion.com/islamic-tools/umrah-packing-checklist",
  description:
    "Use our free Umrah packing checklist to prepare for short or long trips. Track your packing progress and organise essentials for your journey.",
  inLanguage: "en",
  isPartOf: {
    "@type": "WebSite",
    name: "Islam Religion",
    url: "https://www.islam-religion.com/",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "543",
    bestRating: "5",
    worstRating: "1",
  },
}
export default function PackingListPage() {
  return (
    <div>
           <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <ToolHero
        title="Free Umrah Packing"
        highlight="List Checker"
        description="Not sure what to pack for Umrah? Use Manasik's Umrah Packing List to organise your essentials, track your packing progress and prepare for your journey. Choose your needs, tick off packed items and leave home feeling more organised and ready."
      />

      <div className="bg-warm-white">
        <section className="mx-auto max-w-5xl px-4 pb-10 sm:px-6 lg:px-8">
          <UmrahPackingList />
        </section>
         <ToolGuide
          title="How to Use the Packing List"
          sections={guideSections}
        />
                <ToolArticle
          title="Umrah Packing Checklist: Get a Packing List Made for Your Trip"
          intro="What do you need to pack for Umrah? The answer changes with your trip. A three-day stay needs a small bag. A three-week stay with a holiday needs much more. Our free Umrah packing checklist gives you a list that matches your plans, so you pack what you need and nothing extra. This page shows you what the tool does and how to use it. Read it once, then open the tool and start packing."
          sections={articleSections}
        />
      </div>

      <RelatedTools
        keys={["hajj-checklist", "cost-estimator", "prayer-times", "mosque-finder"]}
      />

      <ToolsFaq faqs={faqs} title="Packing List" highlight="FAQs" />
    </div>
  )
}