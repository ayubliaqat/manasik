// app/tools/page.tsx
import type { Metadata } from "next";
import AllTools from "@/components/Tools/alltools";
import ToolArticle, {
  type ArticleSection,
} from "@/components/Tools/tool-article";
import ToolsFaq, { type FaqItem } from "@/components/Tools/tools-faq";

export const metadata: Metadata = {
  title: "Islamic Tools: Free Online Tools for Muslims | Religion Islam",

  description:
    "Explore free Islamic tools online for daily worship, Hajj and Umrah planning, Quran learning and Islamic calculations. Find useful Muslim resources in one place.",

  applicationName: "Religion Islam",

  alternates: {
    canonical: "https://www.islam-religion.com/islamic-tools",
  },

  keywords: [
    "Islamic tools",
    "free Islamic tools",
    "online Islamic tools",
    "Islamic tools for Muslims",
    "Islamic resources",
    "Islamic tools online",
    "Islamic utilities",
    "Muslim tools online",
    "free Islamic resources",
    "Islamic tools for daily life",
    "Islamic tools for worship",
    "Islamic calculation tools",
    "online Islamic calculators",
    "reliable Islamic information",
  ],

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.islam-religion.com/islamic-tools",
    siteName: "Religion Islam",
    title: "Islamic Tools: Free Online Tools for Muslims | Religion Islam",
    description:
      "Find free Islamic tools for daily worship, Hajj and Umrah preparation, Quran learning and Islamic calculations. Explore practical resources in one place.",
  },

  twitter: {
    card: "summary_large_image",
    title: "Islamic Tools: Free Online Tools for Muslims",
    description:
      "Explore free online Islamic tools for worship, pilgrimage preparation, Quran learning and everyday Muslim needs.",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  category: "Islamic Resources",
};
const guideSections: ArticleSection[] = [
  {
    heading: "Explore Our Collection of Islamic Tools",
    paragraphs: [
      "There is no single reason to visit an Islamic tools page. You might need something for an upcoming journey, or you may simply be looking for a resource to use today. We have brought together different options so you can find what you need without searching through unrelated websites.",
      "Our collection currently includes 13 online Islamic tools above:",
      "Choose a card to open the resource and find out how it works. Each tool has its own purpose so you can use the ones relevant to your needs without going through the entire collection.",
    ],
  },
  {
    heading: "Are Our Islamic Tools Accurate and Reliable?",
    paragraphs: [
      "When you use a tool for something important, you want to know where its result comes from. That is a fair question, particularly when the information relates to prayer, Islamic dates, financial calculations or religious responsibilities.",
      "We take this seriously. Accuracy isn't the same for every type of tool. A prayer time depends on location and calculation settings. A financial calculator depends on the figures entered and the rules applied. An educational resource needs reliable references and clear explanations.",
      "A few things are worth checking before you use a result:",
    ],
    bullets: [
      "Whether the information you entered is correct.",
      "Which calculation method or settings are selected.",
      "Whether the information changes with time.",
      "Whether your circumstances require additional guidance.",
    ],
    closing: [
      "We want our Islamic tools to be useful starting points, not something you have to accept without question. If a result affects an important religious or financial decision, take the time to verify it.",
    ],
  },
  {
    heading: "Where Does the Information and Data Come From?",
    paragraphs: [
      "Have you ever notced that two websites can show different prayer times or Islamic dates? This doesn't necessarily mean one is broken. They may be using different calculation methods, calendar conventions or regional information.",
      "The same principle applies to other Islamic resources. The information behind a result depends on the type of tool and the details it uses.",
      "Different resources may rely on:",
    ],
    bullets: [
      "Geographical information: Used when a result depends on your location.",
      "Calculation methods: Applied to prayer schedules and financial estimates.",
      "Calendar conventions: Used when working with Hijri and Gregorian dates.",
      "Information you provide: Used to calculate or organise a result.",
      "Religious references: Needed when presenting Islamic knowledge and learning material.",
    ],
    closing: [
      "There is no single data source behind every tool. Where a calculation method or external provider is relevant, it should be identified on the corresponding tool page so you can understand how the result is produced.",
      "We also recommend checking the references behind religious information, especially when it concerns matters of worship or Islamic obligations.",
    ],
  },
  {
    heading: "How Do Our Islamic Tools Work?",
    paragraphs: [
      "You don't need to understand how the technology works behind a tool to use it. What matters is knowing what information it needs and what to do with the result.",
      "Some of our Islamic digital resources work with information you enter yourself. Others use your selected location or provide an interactive feature directly on the page.",
      "The process is generally straightforward:",
    ],
    numbered: [
      "Open the tool you want to use.",
      "Read the instructions provided.",
      "Enter the required information or choose your settings.",
      "Review the result or available features.",
      "Check the information before relying on it.",
    ],
    closing: [
      "If something doesn't look right, go back to your entries and settings first. A location, date or incorrect figure can make a difference to the result.",
    ],
  },
  {
    heading: "Do Our Islamic Tools Provide Real-Time and Updated Information?",
    paragraphs: [
      "Some information changes throughout the day, some changes with the Islamic calendar, and some stays the same. This is why it would be misleading to describe every online resource as a real-time service.",
      "For example, prayer schedules are tied to the date, geographical location and selected calculation method. [Mosque Finder](/tools/mosque-finder) offers a live map with distances, depending on the available location information. A Hijri date conversion, on the other hand, follows the calendar convention used by the converter and may not match every local moon-sighting announcement.",
      "It helps to understand three different types of information:",
    ],
    bullets: [
      "Location-based information: Depends on your geographical position and relevant settings.",
      "Calculated information: Produced from the figures and methods used by a tool.",
      "Reference information: Provided for learning and planning or everyday use.",
    ],
    closing: [
      "When information depends on an external source, its freshness also depends on that source. For important prayer schedules, Islamic dates and other changing details, check the relevant information before making plans.",
    ],
  },
  {
    heading: "Can You Use Our Islamic Tools from Anywhere in the World?",
    paragraphs: [
      "Living in Lahore, travelling to Makkah or staying somewhere else entirely shouldn't stop you from accessing useful Islamic tools online. You can open our website through an internet-connected device wherever the service is available.",
      "There is one thing to keep in mind: access and accuracy are not quite the same.",
      "A tool may be available in your country, but its results can depend on your location and local settings. This is particularly important when checking prayer schedules or finding the direction of the Kaaba.",
      "If you are using a location-based resource:",
    ],
    bullets: [
      "Select your current city.",
      "Check the local time zone.",
      "Review the available calculation settings.",
      "Update your location when travelling.",
      "Follow local announcements where applicable.",
    ],
    closing: [
      "A little attention to these details can prevent you from relying on information intended for a different location.",
    ],
  },
  {
    heading: "How to Get the Best Results from Our Islamic Tools",
    paragraphs: [
      "Before using a tool, take a moment to understand what it is asking you to do. It might seem like a small step but entering the right information can make a real difference.",
      "For example, when working out an estimated Zakat amount you need to consider the wealth and financial details relevant to your circumstances. When checking prayer times the selected location and calculation method matter.",
      "Here are a few habits worth following:",
    ],
    bullets: [
      "Read the instructions before starting.",
      "Check your entries and selected settings.",
      "Use current information where required.",
      "Review the result rather than assuming it is correct.",
      "Ask for guidance when a matter needs personal attention.",
    ],
    closing: [
      "If you are unsure about a particular result, don't simply change numbers until you get an answer that looks right. Find out which information or method applies to your situation.",
    ],
  },
  {
    heading: "Are Our Islamic Tools Free and Easy to Access?",
    paragraphs: [
      "You shouldn't have to install a different application every time you need a useful Islamic resource. Our collection is available through the website, making it easier to move between different resources from one place.",
      "We aim to make our free Islamic resources straightforward to discover and access. You can browse the collection, open a tool and follow its instructions without having to learn a complicated system first.",
      "Whether you are looking for an everyday worship resource or planning something further ahead, you can return to the collection whenever you need it.",
      "Check the individual tool page for any specific access requirements or limitations.",
    ],
  },
  {
    heading: "Designed for Your Privacy and Convenience",
    paragraphs: [
      "Some tools need information to do their job. A location-based feature may ask where you are while a calculator needs figures relevant to the calculation. That doesn't mean you should share information without understanding why it is needed.",
      "Before granting a permission or entering details consider what the tool is requesting.",
      "A few sensible precautions can help:",
    ],
    bullets: [
      "Check why location access is requested.",
      "Review your browser permissions.",
      "Avoid entering unnecessary personal information.",
      "Read the website's [Privacy Policy](/privacy-policy).",
      "Check how individual tools handle saved information.",
    ],
    closing: [
      "For example, location access may help a tool determine information relevant to your current position. If you prefer not to share your location, check whether the tool offers manual entry instead.",
      "You can read our [Privacy Policy](/privacy-policy) for further information about the website's approach to handling information.",
    ],
  },
  {
    heading: "Our Approach to Authentic Islamic Information",
    paragraphs: [
      "A digital resource can make information easier to find, but it should never make Islamic knowledge more confusing. When a subject involves worship, religious obligations or rulings, the information behind it matters.",
      "We want Religion Islam to be a useful place to explore Islamic information online with a clear distinction between practical assistance and religious guidance.",
      "The Quran and authentic Sunnah remain the foundations of Islamic knowledge. Scholarly explanations are also important when a matter requires interpretation or when different circumstances can affect a ruling.",
      "This is particularly relevant to Zakat and inheritance. A calculator can help organise information and produce an estimate but personal circumstances and the applicable Islamic rulings need to be considered before acting on the result.",
      "We encourage you to:",
    ],
    bullets: [
      "Check Quranic and Hadith references.",
      "Consider the scholarly context.",
      "Ask qualified scholars about personal rulings.",
      "Verify important religious information.",
    ],
    closing: [
      "You can continue exploring through our [Duas](/duas), [Hajj Guide](/hajj-guide) and [Umrah Guide](/umrah-guide) where you can find further guidance on different aspects of Islamic practice.",
    ],
  },
  {
    heading: "Understanding the Limitations of Online Islamic Tools",
    paragraphs: [
      "An online tool can make a task easier but it cannot know every detail of your personal circumstances. That's something worth remembering, especially when a result concerns an important religious responsibility.",
      "A calculator works with the information and rules available to it. A location-based result depends on the accuracy of your location information. Even Islamic dates can differ between communities because of local moon-sighting decisions.",
      "Keep these limitations in mind:",
    ],
    bullets: [
      "A calculated result may not cover every circumstance.",
      "Location information can be imprecise.",
      "External information can become outdated.",
      "Calendar dates may differ between regions.",
      "Religious rulings can require individual assessment.",
    ],
    closing: [
      "For instance, Zakat calculations may involve different assets, debts and financial circumstances. Islamic inheritance can be more complicated when several heirs and debts or bequests are involved.",
      "Use these Islamic tools for Muslims as practical assistance but don't treat their results as a replacement for qualified religious or professional advice.",
    ],
  },
  {
    heading: "Explore More Islamic Guidance and Resources",
    paragraphs: [
      "Perhaps you have found the tool you needed but there is something else you want to understand. Maybe you are preparing for pilgrimage, looking for a particular dua or planning your visit to important Islamic historical places.",
      "You can continue exploring through our other resources.",
      "If Hajj is on your mind, start with our [Hajj Guide](/hajj-guide). For those planning Umrah our [Umrah Guide](/umrah-guide) provides further guidance for the journey. You can also browse our [Duas](/duas) collection for supplications from the Quran and Sunnah.",
      "Planning visits to Makkah and Madinah? Our [Ziyaaraat Guide](/ziyaaraat-guide) introduces important historical places while our [Travel Tips](/travel-tips) page covers practical considerations for travelling.",
      "Each resource covers a different part of the journey so you can explore what is relevant without having to read everything at once.",
    ],
  },
  {
    heading: "What Do Our Islamic Tools Offer You?",
    paragraphs: [
      "You might have arrived here looking for one particular resource. Someone else might be exploring the collection for the first time. Either way, the idea is to give you a useful place to start.",
      "Our Islamic tools for daily life bring several kinds of online assistance together:",
    ],
    bullets: [
      "Worship: Resources for everyday Islamic practices.",
      "Pilgrimage: Practical help with Hajj and Umrah preparation.",
      "Calculations: Assistance with selected Islamic financial calculations.",
      "Learning: Resources for Quran reading and Islamic knowledge.",
      "Dates and location: Tools for relevant calendar and geographical information.",
    ],
    closing: [
      "You don't need to use every resource or follow a particular order. Start with the one that answers your current question, then explore the rest whenever you need them.",
      "We hope this collection makes finding useful Islamic utilities and free Islamic resources a little easier, wherever you are.",
    ],
  },
];

const toolsFaqs: FaqItem[] = [
  {
    question: "Can I use more than one Islamic tool on Religion Islam?",
    answer:
      "Absolutely! You can explore and use different tools whenever you need them. For example, you might check a prayer time, use the Qibla Finder and then visit another tool. You can move between them freely.",
  },
  {
    question: "What should I do if an Islamic tool does not work properly?",
    answer:
      "First, refresh the page and try again. Check your internet connection and make sure you entered the right details. Still having trouble? Contact us and tell us what happened.",
  },
  {
    question: "Can I share an Islamic tool with my family?",
    answer:
      "Yes, and you don't need to explain how to find it. Just copy the tool's page link and send it to your family or friends. They can open the link and use the same tool themselves.",
  },
  {
    question: "Are these resources suitable for beginners?",
    answer:
      "Of course. You don't need to be an expert to get started. Each tool serves a different purpose so choose the one you need and follow the instructions on its page.",
  },
  {
    question: "Can I bookmark a tool I use regularly?",
    answer:
      "Yes! Save its page in your browser's bookmarks. The next time you need it you can open it directly instead of searching for it again.",
  },
  {
    question: "Do the tools work without an internet connection?",
    answer:
      "You'll need internet access to open our website and use its tools. Some features may behave differently once a page has loaded, depending on how that particular tool works.",
  },
  {
    question: "Can I suggest another Islamic tool for the website?",
    answer:
      "We welcome useful suggestions. If there's an Islamic tool you'd like us to add, send us your idea. Your suggestion could help us decide what to build next.",
  },
  {
    question:
      "What should I do if I find incorrect information on a tool page?",
    answer:
      "Please let us know. Share the page link through our Contact Us page and point out the information you believe is incorrect. We'll review your feedback.",
  },
];

const toolsFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://www.islam-religion.com/islamic-tools#faqs",
  mainEntity: toolsFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function ToolsPage() {
  return (
    <main className="w-full overflow-x-clip">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(toolsFaqSchema).replace(/</g, "\\u003c"),
        }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-deep-teal pb-14 pt-9 text-center sm:pb-16 sm:pt-11 lg:pb-20 lg:pt-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[-220px] h-[430px] w-[140%] -translate-x-1/2 rounded-[0_0_50%_50%] bg-white/[0.04]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[-240px] left-1/2 h-[400px] w-[130%] -translate-x-1/2 rounded-[50%_50%_0_0] bg-gold/[0.06]"
        />
        {/* h1 + paragraphs */}
        <div className="relative z-10 mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
          <span className="inline-block rounded-full border border-gold/50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-gold-light">
            Free tools
          </span>

          <h1 className="mt-4 text-balance font-heading text-[32px] font-bold leading-[1.15] tracking-[-0.02em] sm:text-[40px] lg:text-[48px]">
            <span className="text-gold-light">Free Islamic Tools</span>{" "}
            <span className="relative inline-block whitespace-nowrap text-white">
              - 100% Correct
              <svg
                aria-hidden="true"
                viewBox="0 0 120 10"
                preserveAspectRatio="none"
                fill="none"
                className="pointer-events-none absolute left-1/2 top-full mt-[0.05em] h-[0.2em] w-[70%] -translate-x-1/2 text-white"
              >
                <path
                  d="M2 5 Q12 0 22 5 T42 5 T62 5 T82 5 T102 5 T118 5"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-relaxed text-white/80 sm:text-base">
            Planning Hajj or Umrah? Need prayer times, or help learning to read
            the Quran? Manasik puts free Islamic tools in one place.
          </p>
        </div>

        <svg
          aria-hidden="true"
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="absolute bottom-0 left-0 h-[32px] w-full text-white sm:h-[48px] lg:h-[64px]"
        >
          <path
            fill="currentColor"
            d="M0 40 C120 80 240 80 360 50 C480 20 600 20 720 45 C840 70 960 70 1080 45 C1200 20 1320 20 1440 50 L1440 80 L0 80 Z"
          />
        </svg>
      </section>

      {/* All Tools */}
      <section className="w-full min-w-0 overflow-hidden">
        <AllTools />
      </section>

      {/* Guide */}
      <div className="w-full min-w-0 bg-white">
        <ToolArticle
          badge="Guide"
          title="Islamic Tools to Support Your"
          highlight="Everyday Muslim Life"
          intro={`Looking for something to help with your daily worship? Perhaps you are preparing for Hajj or Umrah, checking an Islamic date, learning to read the Quran or trying to work out your Zakat. Whatever brings you here, you shouldn't have to visit several websites just to find a useful resource.

At Religion Islam, we have brought together a collection of Islamic tools for different needs. You can find resources for pilgrimage preparation, worship, learning and Islamic calculations, all through one website.

Some help you work with information, others make everyday tasks easier, and some give you a place to begin learning. Have a look through the collection and see what might be useful for you.`}
          sections={guideSections}
        />
      </div>

      {/* FAQ */}
      <ToolsFaq faqs={toolsFaqs} />
    </main>
  );
}
