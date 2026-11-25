// app/tools/cost-estimator/page.tsx
import type { Metadata } from "next";
import ToolHero from "@/components/Tools/tool-hero";
import CostEstimator from "@/components/Tools/CostEstimator";
import ToolArticle, {
  type ArticleSection,
} from "@/components/Tools/tool-article";
import ToolGuide, { type GuideSection } from "@/components/Tools/tool-guide";
import RelatedTools from "@/components/Tools/related-tools";
import ToolsFaq, { type FaqItem } from "@/components/Tools/tools-faq";

export const metadata: Metadata = {
  title: "Hajj and Umrah Cost Estimator – Free Budget Calculator",
  description:
    "Estimate your Hajj or Umrah costs with our free calculator. Add flights, hotels, visas, food and transport to plan your travel budget.",
  keywords: [
    "Hajj and Umrah Cost Estimator",
    "Hajj cost calculator",
    "Umrah cost calculator",
    "Hajj budget calculator",
    "Umrah budget calculator",
    "Hajj and Umrah expenses",
    "Umrah travel budget",
    "Hajj travel costs",
    "Cost of Umrah",
  ],
  alternates: {
    canonical:
      "https://www.islam-religion.com/islamic-tools/hajj-umrah-cost-estimator",
  },
  openGraph: {
    title: "Hajj and Umrah Cost Estimator – Free Budget Calculator",
    description:
      "Estimate your Hajj or Umrah costs with our free calculator. Add flights, hotels, visas, food and transport to plan your travel budget.",
    url: "https://www.islam-religion.com/islamic-tools/hajj-umrah-cost-estimator",
    siteName: "Islam Religion",
    type: "website",
  },
};

const articleSections: ArticleSection[] = [
  {
    heading: "Is This Tool Free to Use?",
    paragraphs: [
      "Yes, it is completely free. You do not need to pay. You do not need to make an account or sign up. Open the page, type in your costs and see your budget straight away. You can use it as often as you want.",
    ],
  },
  {
    heading: "How to Make a Realistic Hajj or Umrah Budget",
    paragraphs: [
      "Start with your biggest costs. Flights and hotels usually take the largest share, but food, transport and personal spending add up fast. Keep these points in mind:",
    ],
    bullets: [
      "Start early so you have time to save and compare prices.",
      "Check the hotel location, because a cheaper room far from the Haram can mean higher transport costs.",
      "Read the package details to see exactly what's already included.",
      "Plan your daily spending for meals, drinks and everyday costs.",
      "Keep a buffer for extra money you may need during your stay.",
      "Check prices before you book, because flight and hotel rates change.",
    ],
  },
  {
    heading: "What You Can Do With the Estimator",
    paragraphs: [],
    bullets: [
      "Add your flights, visas, hotels, food, transport, Ziyarah and other costs, and the calculator gives you your total budget.",
      "Enter the number of travellers to see the cost per person.",
      "Pick any of the 20 currencies in the list. The calculator uses live exchange rates when they're available. If they aren't, your amounts may not convert when you switch currency. Your bank or travel provider may charge a different rate, so treat the converted amount as a guide.",
      "Enter the nights, rooms and price per room per night for Makkah and Madinah separately.",
      "Add food, local transport, Ziyarah, gifts and anything else you plan to spend on. You can also add an amount for unexpected costs.",
      "See your costs by category, not just one total, so you know which part of your trip costs the most.",
      "Use it free. You don't need to sign up or create an account.",
    ],
  },
  {
    heading: "Does This Calculator Work Out Costs Correctly?",
    paragraphs: [
      "Yes. The calculator adds up the numbers you type in. That means your answer is only as good as your numbers. If you type in the wrong price, you will get the wrong total. Before you trust your result, check these things:",
    ],
    bullets: [
      "The number of people",
      "The number of rooms",
      "The number of nights",
      "Your daily costs",
    ],
  },
  {
    heading: "What the Calculator Does Not Do",
    paragraphs: [
      "The calculator does not look up real flight prices, hotel prices or package prices. You need to find those yourself and type them in.",
      "When you change your currency, the tool uses live exchange rates if it can find them. If it cannot, your numbers may not change. Your bank may also use a different rate. So think of your result as a guide, not a final price. Always check the real price with your travel company before you book.",
    ],
  },
  {
    heading: "Who Is This Estimator For?",
    paragraphs: [
      "It is for anyone planning Hajj or Umrah. You can use it if you are travelling alone, with your family or with a group. It helps if you want to:",
    ],
    bullets: [
      "Compare different hotels",
      "Choose how many days to stay",
      "Find out how much money you need to save",
    ],
  },
  {
    heading: "What to Include in Your Budget",
    paragraphs: [
      "Some costs are easy to remember. Others are easy to miss. Go through this list before you calculate your total.",
    ],
  },
  {
    heading: "1. Flights",
    paragraphs: [
      "Your flight is likely to be one of your biggest costs. The price depends on your departure airport, travel dates, airline, ticket type, baggage allowance and how early you book. Enter the return fare for each traveller.",
    ],
  },
  {
    heading: "2. Visa and Permits",
    paragraphs: [
      "Include any visa, permit or related service you need. Fees depend on your nationality, visa type and travel arrangements. Saudi rules can change, so check the latest requirements before you book. Enter the cost per person.",
    ],
  },
  {
    heading: "3. Hotels in Makkah",
    paragraphs: [
      "Your hotel choice can change your budget a lot. The price depends on the distance from Masjid al-Haram, the hotel’s category, room size, how many people share, the number of nights and the time of year. Hotels close to the Haram usually cost more. Enter the nightly room price and the number of rooms.",
    ],
  },
  {
    heading: "4. Hotels in Madinah",
    paragraphs: [
      "Add Madinah separately if you’re visiting. Hotels near Al-Masjid an-Nabawi usually cost more than those further away. Enter the nights, rooms and nightly rate.",
    ],
  },
  {
    heading: "5. Food",
    paragraphs: [
      "Count breakfast, lunch, dinner, snacks and drinks. What you spend depends on where you eat. Enter your daily food cost per person.",
    ],
  },
  {
    heading: "6. Local Transport",
    paragraphs: [
      "Include airport transfers, travel between Makkah and Madinah, taxis, buses, private transport and any other trips. Enter your total transport cost for the whole trip.",
    ],
  },
  {
    heading: "7. Ziyarah and Tours",
    paragraphs: [
      "Only add these if you plan to go. Include guided tours and transport to the sites you want to visit.",
    ],
  },
  {
    heading: "8. Gifts and Shopping",
    paragraphs: [
      "Many people buy dates, prayer items, clothes and gifts. Decide on an amount before you travel and keep it separate from your essential costs.",
    ],
  },
  {
    heading: "9. Other Expenses",
    paragraphs: [
      "Think about laundry, mobile data, medicines, personal items and travel insurance. Add extra money for anything unexpected.",
    ],
  },
  {
    heading: "Hajj and Umrah: What's Different",
    paragraphs: [
      "For Hajj, your budget may cover return flights, the Hajj visa and required permits, accommodation, food, transport during Hajj, package services, shopping and unexpected costs. Hajj packages differ. Some include flights, hotels, meals and transport, and others include only a few of these.",
      "For Umrah, your costs depend on when you travel, where you fly from, how long you stay and which hotels you choose. Ramadan and other busy periods cost more because flights and hotels are in higher demand.",
      "In both cases, don't count the same cost twice. If your package already includes flights, hotels or transport, don't enter them again. Try different hotel rates, trip lengths and daily spending in the calculator to see how each change affects your total.",
    ],
  },
  {
    heading: "Budgeting Mistakes to Avoid",
    paragraphs: [
      "Flights and hotels aren't the whole budget. These mistakes can push your total higher than you planned:",
    ],
    bullets: [
      "Leaving out small expenses like laundry, data and snacks, which add up.",
      "Choosing a hotel on price alone, when a cheap room far away can cost more in transport and time.",
      "Missing what's in the package, so you pay twice for something already included.",
      "Using old prices instead of checking current rates.",
      "Forgetting exchange rates, which can change what you actually pay.",
      "Having no emergency money, so always keep a safety buffer.",
      "Entering costs wrongly, so check your travellers, rooms, nights and daily costs before you trust the result.",
    ],
  },
  {
    heading: "Estimator Disclaimer",
    paragraphs: [
      "This calculator works out an estimate from the amounts you enter. It doesn't give you confirmed package prices, live flight quotes or guaranteed hotel rates.",
      "Your real costs may differ depending on your dates, departure country, airline, hotel, visa requirements, exchange rates and service providers. Check current prices and travel requirements before you book, and read your package details so you know what's not included. Use the calculator to organise your budget. Your final costs depend on the arrangements you make.",
    ],
  },
];

const guideSections: GuideSection[] = [
  {
    heading: "How to use the estimator",
    variant: "steps",
    items: [
      "Pick your currency and enter travellers and nights in Makkah and Madinah.",
      "Add flight and visa costs per person.",
      "Enter hotel rates per room per night, and the rooms you need.",
      "Fill in food, transport and extras.",
      "Check your total and per-person cost on the summary.",
    ],
  },
  {
    heading: "How it helps you",
    variant: "highlight",
    items: [
      "Shows your total and per-person cost in one place.",
      "Breaks the cost down so you see where the money goes.",
      "Converts between currencies using live rates.",
      "Free to use, with no sign-up.",
    ],
  },
  {
    heading: "Tips for best results",
    variant: "tips",
    items: [
      "Use real quotes, not guesses.",
      "Try different hotel options to compare totals.",
      "Keep the safety buffer at 10 percent or more.",
    ],
  },
  {
    heading: "Good to know",
    variant: "note",
    text: "This is an estimate only. Prices change by season and package, so confirm current rates before you book. Live exchange rates may be unavailable at times, in which case amounts are not converted when you change currency. Nothing you enter is saved or shared.",
  },
];

const faqs: FaqItem[] = [
  {
    question: "How do I work out my hotel cost?",
    answer:
      "Multiply the price of one room for one night by the number of rooms and the number of nights. For example, if one room costs £100 a night and you need two rooms for five nights, that is £100 × 2 × 5 = £1,000. Do this for Makkah and Madinah separately, then add the two together.",
  },
  {
    question: "Do I enter costs for one person or for everyone?",
    answer:
      "It depends on the cost. Flights and visas are per person, so type in the price for one traveller. Hotels are per room, so type in the room price and how many rooms you need. The calculator then shows the total for everyone and the cost for each person.",
  },
  {
    question: "Does sharing a room lower my cost per person?",
    answer:
      "Yes. A hotel charges for the room, not for each person. If four people share one room, they split one room price. If they take two rooms, they pay for two. Try both in the calculator and see which suits your budget.",
  },
  {
    question: "What is a safety buffer, and how much should I add?",
    answer:
      "A safety buffer is extra money you keep aside for costs you did not plan for, like a taxi fare that is higher than you thought or medicine you need to buy. There is no fixed amount. Many people add around 10% of their total, but you can add more or less, depending on how sure you are about your costs.",
  },
  {
    question: "Why do Hajj and Umrah prices change?",
    answer:
      "Prices go up when more people want to travel. Your dates, the airline, the hotel and how early you book all change the price. Exchange rates and visa rules can also change your final cost. Ramadan and the Hajj season are the busiest times, so flights and hotels usually cost the most then.",
  },
];

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Hajj and Umrah Cost Estimator – Free Budget Calculator",
  url: "https://www.islam-religion.com/islamic-tools/hajj-umrah-cost-estimator",
  description:
    "Estimate your Hajj or Umrah costs with our free calculator. Add flights, hotels, visas, food and transport to plan your travel budget.",
  inLanguage: "en",
  isPartOf: {
    "@type": "WebSite",
    name: "Islam Religion",
    url: "https://www.islam-religion.com/",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "865",
    bestRating: "5",
    worstRating: "1",
  },
};

export default function CostEstimatorPage() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ToolHero
        title="Hajj and Umrah"
        highlight="Cost Estimator"
        description="Add up your flights, hotels, visa, food and transport to build a Hajj or Umrah budget. See your total cost and the cost per person in 20 currencies."
      />

      <div className="bg-warm-white">
        <section className="mx-auto max-w-5xl px-4 pb-10 sm:px-6 lg:px-8">
          <CostEstimator />
        </section>
        <ToolGuide
          title="How to Use the Cost Estimator"
          sections={guideSections}
        />
        <ToolArticle
          title="Hajj and Umrah Cost Estimator: Work Out Your Travel Budget"
          intro="Planning Hajj or Umrah? Know what it could cost before you book. Our free Hajj and Umrah Cost Estimator helps you add up your expected costs and build a budget. Enter your flight, visa, hotel, food and transport costs. Add Ziyarah, shopping and personal spending too. Travelling with family or a group? Enter the number of people and you'll see the total cost and the cost per person. Pick from 20 currencies and see a breakdown of where your money goes. Then change your plans before you book."
          sections={articleSections}
        />
      </div>

      <RelatedTools
        keys={[
          "hajj-checklist",
          "packing-list",
          "zakat-calculator",
          "prayer-times",
        ]}
      />

      <ToolsFaq faqs={faqs} title="Cost Estimator" highlight="FAQs" />
    </div>
  );
}
