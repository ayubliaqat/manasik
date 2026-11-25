// app/tools/inheritance-calculator/page.tsx
import type { Metadata } from "next";
import ToolHero from "@/components/Tools/tool-hero";
import InheritanceCalculator from "@/components/Tools/InheritanceCalculator";
import ToolArticle, {
  type ArticleSection,
} from "@/components/Tools/tool-article";
import ToolGuide, { type GuideSection } from "@/components/Tools/tool-guide";
import RelatedTools from "@/components/Tools/related-tools";
import ToolsFaq, { type FaqItem } from "@/components/Tools/tools-faq";

export const metadata: Metadata = {
  title: "Islamic Inheritance Calculator – Faraid Shares",
  description:
    "Calculate Islamic inheritance shares with our free faraid calculator. See each heir’s fraction, percentage and amount, with guidance on Hanafi rules.",
  keywords: ["Islamic Inheritance Calculator"],
  alternates: {
    canonical: "https://www.islam-religion.com/islamic-tools/inheritance-calculator",
  },
  openGraph: {
    title: "Islamic Inheritance Calculator – Faraid Shares",
    description:
      "Calculate Islamic inheritance shares with our free faraid calculator. See each heir’s fraction, percentage and amount, with guidance on Hanafi rules.",
    url: "https://www.islam-religion.com/islamic-tools/inheritance-calculator",
    siteName: "Islam Religion",
    type: "website",
  },
}

const articleSections: ArticleSection[] = [
  {
    heading: "What Is the Islamic Inheritance Calculator?",
    paragraphs: [
      "It is a free online tool that works out each heir’s share under Islamic inheritance law, also called faraid or mirath. You tell it who passed away, how much they left and which relatives survive. The tool then applies the rules and shows who inherits and how much.",
      "It also takes funeral costs, debts and a bequest into account before it shares the estate. You do not need to know the rules yourself.",
    ],
  },
  {
    heading: "Why Use a Faraid Calculator?",
    paragraphs: [
      "Faraid has many rules. Some relatives get a fixed fraction. Others take what remains. A closer relative can block a more distant one. Shares can also shrink or grow depending on who is alive. Working all this out by hand is slow, and one small mistake changes every share.",
      "The tool handles the rules for you. It gives you a clear starting point before you speak to a scholar or a solicitor. Here is what it does for you:",
    ],
    bullets: [
      "Applies blocking, reductions and adjustments automatically",
      "Shows exact fractions, so nothing is lost to rounding",
      "Explains why a relative does not inherit",
      "Gives amounts in your own currency",
    ],
  },
  {
    heading: "Who Is the Inheritance Calculator For?",
    paragraphs: [
      "Anyone who needs to understand Islamic inheritance can use it. You do not need any special knowledge. You tick the relatives who are alive and read the result. It helps people who are:",
    ],
    bullets: [
      "Dealing with the estate of a parent, spouse or relative",
      "Planning a will and want to see how shares would fall",
      "Learning how faraid works",
      "Preparing questions for a scholar or solicitor",
    ],
  },
  {
    heading: "How Do I Use the Inheritance Calculator?",
    paragraphs: [
      "You enter four things, then read your shares. It takes a few minutes.",
    ],
    bullets: [
      "Choose whether the person who passed away was male or female.",
      "Enter the total estate, and any funeral costs, debts and bequest.",
      "Tick each surviving relative, or use the plus and minus buttons where there can be more than one.",
      "Confirm that everyone is Muslim and that no relative caused the death.",
      "Read the shares.",
      "Check the notes for any blocked heirs or adjustments.",
      "Press Start again to clear everything and try a new case.",
    ],
  },
  {
    heading: "What Do I Enter About the Estate?",
    paragraphs: [
      "You enter the money side first. The tool uses these figures to work out how much is left to share.",
      "The total estate is the only required field. The other three are optional, so you can leave them empty if they do not apply.",
    ],
    bullets: [
      "Total estate: everything the person left behind",
      "Funeral costs: what the funeral cost",
      "Debts: what the person owed",
      "Bequest (wasiyyah): a gift to people who are not heirs, up to one third",
    ],
  },
  {
    heading: "Choosing Your Currency",
    paragraphs: [
      "You can choose your currency from the list: GBP, USD, EUR or PKR. Check your figures for debts and funeral costs before you enter them, because they change every share.",
    ],
  },
  {
    heading: "Which Relatives Can I Add?",
    paragraphs: [
      "You add the relatives who were alive when the person passed away. The tool lists them in groups. Tick a relative who can only be one person, such as a father. Use the plus and minus buttons for relatives who can be more than one, such as sons.",
      "The tool covers these groups:",
    ],
    bullets: [
      "Husband or wives, up to four",
      "Sons and daughters",
      "Son’s sons and son’s daughters",
      "Father and mother",
      "Father’s father, father’s mother and mother’s mother",
      "Full brothers and full sisters",
      "Half-brothers and half-sisters from the same father",
      "Half-brothers and half-sisters from the same mother",
    ],
  },
  {
    heading: "Counting Half-Siblings",
    paragraphs: [
      "Count half-siblings under the right parent. A half-sibling from the same father is not the same as one from the same mother, and each group is treated differently.",
    ],
  },
  {
    heading: "Why Does the Tool Ask Me to Confirm Two Things?",
    paragraphs: [
      "The tool asks you to confirm two conditions before it shows any shares. Both come from Islamic inheritance law, and both can stop a relative from inheriting.",
      "You confirm that the person who passed away and every relative you added were Muslim. A relative of a different religion does not inherit from a Muslim.",
      "You also confirm that none of the relatives caused the death. A relative who unlawfully caused the death does not inherit.",
      "The shares stay hidden until you tick both boxes. If either one does not apply to your family, speak to a qualified scholar before you rely on the result.",
    ],
  },
  {
    heading: "What Will I See in the Results?",
    paragraphs: [
      "You see a clear list of heirs, with a share for each one. Each share shows three things: a fraction, a percentage and an amount in your chosen currency.",
      "The tool also shows a summary of the estate. This tells you how much is left to share after funeral costs, debts and any bequest are taken out. You can see the total estate, the funeral costs and debts, the bequest and the number of heirs who receive a share.",
      "Read the notes under the shares as well. They tell you if a relative is blocked or if the tool adjusted any share. A closer relative can block a more distant one, and the notes explain each case in plain words.",
    ],
  },
  {
    heading: "Which School of Thought Does the Tool Follow?",
    paragraphs: [
      "The tool follows the Hanafi view where schools of thought differ. Most of the shares are the same across schools, but a few cases are not.",
      "If your family follows a different school, or if you are unsure, check the result with a qualified scholar. They can tell you if your case changes under another view.",
    ],
  },
  {
    heading: "What Does the Tool Not Cover?",
    paragraphs: [
      "The tool covers the most common family situations, but not all of them. Some cases need a scholar to look at your family in full. The tool does not cover:",
    ],
    bullets: [
      "Uncles, nephews and other more distant relatives",
      "Relatives of a different religion",
      "A missing person",
      "An unborn child",
      "Other special situations in a family",
    ],
  },
  {
    heading: "If Your Case Is Not Covered",
    paragraphs: [
      "If your family fits any of these, do not rely on the result. Take your case to a qualified scholar.",
    ],
  },
  {
    heading: "Is the Inheritance Calculator Free and Private?",
    paragraphs: [
      "Yes to both. The tool is completely free. You do not pay, and you do not create an account or sign up.",
      "Your information stays with you. Nothing you enter is saved or sent anywhere. This protects your family’s private details. It also means the tool cannot save your case, so note down your result before you close the page.",
    ],
  },
  {
    heading: "Can the Tool Replace a Will or Legal Advice?",
    paragraphs: [
      "No. The tool gives general guidance, not legal or religious advice. Use it to understand your shares, then confirm the result with a qualified scholar and a solicitor.",
      "This matters in the UK. A Muslim’s estate follows the law of the country unless there is a valid will. To have your estate follow Islamic shares, you need a will that says so. A solicitor can help you write one, and a scholar can confirm the shares for your family.",
    ],
  },
  {
    heading: "What Should I Do Before and After Using the Tool?",
    paragraphs: [
      "Prepare your figures first, then act on the result. A few small steps make the tool more useful and your family’s situation clearer.",
      "Before you start, gather your estate figures, your debts and your funeral costs. Check whether any unpaid zakat is due with our Zakat Calculator, because it can affect what you owe.",
      "After you read your result, take these steps:",
    ],
    bullets: [
      "Note down each share",
      "Speak to a qualified scholar",
      "Speak to a solicitor about a valid will",
      "Tell your family where your will is kept",
    ],
  },
  {
    heading: "Hajj Preparation and Duas",
    paragraphs: [
      "Writing a will and settling debts are also part of Hajj preparation. If you plan to travel soon, our Hajj Checklist reminds you to do both before you leave. For those who have lost a loved one, our Duas page has authentic supplications with their references.",
    ],
  },
];

const guideSections: GuideSection[] = [
  {
    heading: "How to use the Inheritance Calculator",
    variant: "steps",
    items: [
      "Choose whether the person who passed away was male or female.",
      "Enter the total estate, and any funeral costs, debts and bequest.",
      "Tick each surviving relative, or use the plus and minus buttons where there can be more than one, such as sons or sisters.",
      "Confirm that everyone is Muslim and that no relative caused the death.",
      "Read the shares. Each heir shows a fraction, a percentage and an amount.",
      "Check the notes for any heirs who are blocked or any adjustments made.",
    ],
  },
  {
    heading: "How it helps you",
    variant: "highlight",
    items: [
      "Applies blocking, reductions and adjustments automatically.",
      "Shows exact fractions, so nothing is lost to rounding.",
      "Explains why a relative does not inherit.",
      "Free to use, with no sign-up.",
    ],
  },
  {
    heading: "Tips for best results",
    variant: "tips",
    items: [
      "Only add relatives who are alive when the person passes away.",
      "Count half-siblings under the right parent: same father or same mother.",
      "Check your figures for debts and funeral costs before you enter them.",
    ],
  },
  {
    heading: "Good to know",
    variant: "note",
    text: "This calculator gives general guidance and follows the Hanafi view where schools of thought differ. It does not cover relatives such as uncles or nephews, relatives of a different religion, a missing person, an unborn child, or other special situations in a family. It is not legal or religious advice, so please confirm the result with a qualified scholar and a solicitor. Nothing you enter is saved.",
  },
];

const faqs: FaqItem[] = [
  {
    question: "What is faraid?",
    answer:
      "Faraid is Islamic inheritance law. It sets out who inherits from a Muslim and how much each heir receives. The main shares come from Surah An-Nisa, and scholars have worked out how they apply when different relatives survive together.",
  },
  {
    question: "What is paid before the estate is shared?",
    answer:
      "The estate pays for the funeral first, then any debts. Up to one third of what remains can go to people who are not heirs as a bequest. The heirs share the rest.",
  },
  {
    question: "Does a daughter get the same share as a son?",
    answer:
      "When a daughter and a son inherit together, the daughter receives half of the son’s share. A daughter can also receive a fixed share when there are no sons. The tool works this out from the relatives you tick.",
  },
  {
    question: "Can I use the tool for someone who is still alive?",
    answer:
      "You can try it to see how shares would fall today. But shares are fixed only when a person passes away, and only relatives who are alive at that time inherit. Your family may change before then, so treat the result as a guide.",
  },
  {
    question: "Do I need to enter funeral costs and debts?",
    answer:
      "No. Both are optional. Leave them empty if they do not apply. If you are unsure of a figure, enter your best estimate and check it with your solicitor.",
  },
  {
    question: "Who can I ask if my case is not covered?",
    answer:
      "Speak to a qualified scholar for your family’s case, and a solicitor for the legal side. If you have a question about the tool itself, send us a message on our Contact page.",
  },
];
const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Islamic Inheritance Calculator – Faraid Shares",
  url: "https://www.islam-religion.com/islamic-tools/inheritance-calculator",
  description:
    "Calculate Islamic inheritance shares with our free faraid calculator. See each heir’s fraction, percentage and amount, with guidance on Hanafi rules.",
  inLanguage: "en",
  isPartOf: {
    "@type": "WebSite",
    name: "Islam Religion",
    url: "https://www.islam-religion.com/",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    bestRating: "5",
    ratingCount: "485",
  },
};

export default function InheritanceCalculatorPage() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ToolHero
        title="Islamic Inheritance"
        highlight="Calculator"
        description="Work out each heir's share under Islamic inheritance law, with funeral costs, debts and bequests taken into account."
      />

      <div className="bg-warm-white">
        <section className="mx-auto max-w-5xl px-4 pb-10 sm:px-6 lg:px-8">
          <InheritanceCalculator />
        </section>
        <ToolGuide
          title="How to Use the Inheritance Calculator"
          sections={guideSections}
        />
        <ToolArticle
          title="Islamic Inheritance Calculator (Faraid): See Each Heir’s Share"
          intro="Who inherits when a Muslim passes away, and how much does each person receive? The answer depends on who survives, and the rules are hard to work out by hand. Our free Islamic inheritance calculator does the work for you. Enter the estate and the surviving family, and the tool shows each heir’s share as a fraction, a percentage and an amount.
This page explains what the tool does, what you enter and how to read your result. Read it once, then open the tool.
"
          sections={articleSections}
        />
      </div>

      <RelatedTools
        keys={[
          "zakat-calculator",
          "hijri-converter",
          "hajj-checklist",
          "prayer-times",
        ]}
      />

      <ToolsFaq faqs={faqs} title="Inheritance Calculator" highlight="FAQs" />
    </div>
  );
}
