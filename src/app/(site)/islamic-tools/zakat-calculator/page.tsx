// app/islamic-tools/zakat-calculator/page.tsx
import type { Metadata } from "next";
import ToolHero from "@/components/Tools/tool-hero";
import ZakatCalculator from "@/components/Tools/ZakatCalculator";
import ToolArticle, {
  type ArticleSection,
} from "@/components/Tools/tool-article";
import ToolGuide, { type GuideSection } from "@/components/Tools/tool-guide";
import RelatedTools from "@/components/Tools/related-tools";
import ToolsFaq, { type FaqItem } from "@/components/Tools/tools-faq";

const SITE_URL = "https://www.islam-religion.com";
const TOOLS_BASE_PATH = "/islamic-tools";
const PAGE_PATH = `${TOOLS_BASE_PATH}/zakat-calculator`;
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const TITLE = "Zakat Calculator | Islam Religion";
const DESCRIPTION =
  "Work out your zakat with live gold and silver prices. Enter your assets and debts, choose gold or silver nisab, and see what is due in your own currency.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PAGE_URL,
    siteName: "Islam Religion",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

const guideSections: GuideSection[] = [
  {
    heading: "Five simple steps",
    variant: "steps",
    items: [
      "Pick your currency and nisab.",
      "Check the gold and silver prices.",
      "Add your cash, gold, silver and other assets.",
      "Add any debts you have to pay now.",
      "Read your zakat in the result box.",
    ],
  },
  {
    heading: "What this calculator does",
    variant: "highlight",
    items: [
      "Fills in today's gold and silver price per gram.",
      "Works in 20 currencies, from GBP and USD to PKR and SAR.",
      "Turns your gold and silver grams into money.",
      "Takes your debts off your total assets.",
      "Shows your zakat at 2.5% if your wealth reaches the nisab.",
      "Lets you clear everything with one tap on Reset.",
    ],
  },
  {
    heading: "Handy tips",
    variant: "tips",
    items: [
      "Enter gold and silver in grams.",
      "Count each amount only once.",
      "Only add debts due now.",
      "You can change the gold and silver prices.",
      "Not sure which nisab to pick? Ask a scholar you trust.",
    ],
  },
  {
    heading: "Please note",
    variant: "note",
    text: "This calculator gives you an estimate only. It is not a religious ruling. If your money matters are tricky, ask a qualified scholar.",
  },
];

const articleSections: ArticleSection[] = [
  {
    heading: "Step-by-Step: Calculate Your Zakat Online",
    paragraphs: [
      "You can calculate your Zakat in a few simple steps. Make sure you have your account balances, gold and silver weights and other financial details ready.",
    ],
    subsections: [
      {
        heading: "1. Select Your Currency and Nisab Method",
        paragraphs: [
          "Choose the currency you want to use, such as GBP or USD. Then choose whether to calculate your Nisab using gold or silver.",
          "The calculator uses the selected metal's price to work out the Nisab value.",
        ],
      },
      {
        heading: "2. Check the Gold and Silver Prices",
        paragraphs: [
          "The calculator displays the latest available gold and silver prices per gram in your selected currency.",
          "Check the prices and their update time before continuing. You can edit the rates if you have a different verified market price you want to use.",
        ],
      },
      {
        heading: "3. Enter Your Assets",
        paragraphs: ["Add the value or weight of the assets you own:"],
        bullets: [
          "Cash held at home.",
          "Money in current and savings accounts.",
          "Gold, entered in grams.",
          "Silver, entered in grams.",
          "Eligible investments and shares.",
          "Business stock and goods held for sale.",
          "Money owed to you that you reasonably expect to receive.",
        ],
        closing: [
          "Enter the correct values and avoid counting the same money or asset twice.",
        ],
      },
      {
        heading: "4. Add Your Debts",
        paragraphs: [
          "Enter eligible debts that are currently due, such as outstanding bills and short-term repayments.",
          "The calculator deducts the amount you enter from your assets. Not every debt can be deducted in full. Mortgages, long-term loans and instalments may need a separate assessment under the Islamic guidance you follow.",
        ],
      },
      {
        heading: "5. Calculate Your Zakat",
        paragraphs: ["After entering your details, the calculator shows:"],
        bullets: [
          "Total assets.",
          "Debts deducted.",
          "Net wealth.",
          "Selected Nisab value.",
          "Estimated Zakat due.",
        ],
        closing: [
          "If your wealth meets the selected Nisab and the other conditions for Zakat are fulfilled, the calculator estimates 2.5% of your qualifying wealth.",
          "Remember that this is an estimate. Your actual Zakat may depend on your circumstances and the scholarly guidance you follow.",
        ],
      },
    ],
  },
  {
    heading: "How Does the Zakat Calculator Work?",
    paragraphs: [
      "Calculating Zakat doesn't have to be complicated. Our Zakat calculator helps you estimate how much Zakat you need to pay based on your wealth and eligible debts.",
      "Simply enter the value of your Zakatable assets and subtract any debts that can be deducted according to Islamic guidelines. The calculator will work out your net wealth and calculate 2.5% of the amount.",
      "The calculation follows this simple formula:",
      "Net Wealth = Total Eligible Assets − Eligible Liabilities",
      "Estimated Zakat = Net Zakatable Wealth × 2.5%",
    ],
    subsections: [
      {
        heading: "Zakat Calculation Example",
        paragraphs: ["Let's understand how this works with a simple example."],
        table: {
          intro:
            "Suppose you have £15,000 in eligible assets and £1,000 in deductible debts. Your Zakat calculation would look like this:",
          head: ["Description", "Amount"],
          rows: [
            ["Total eligible assets", "£15,000"],
            ["Eligible debts", "£1,000"],
            ["Net wealth", "£14,000"],
            ["Zakat rate", "2.5%"],
            ["Estimated Zakat", "£350"],
          ],
          after: [
            "In this example, subtracting £1,000 in eligible debts from £15,000 leaves you with £14,000 in net wealth. Applying the 2.5% Zakat rate gives a total of £350.",
            "Keep in mind that this is only an example. Zakat becomes obligatory when your qualifying wealth reaches the Nisab threshold and the other required conditions are met. The assets and liabilities included in your calculation should follow the Islamic rules applicable to your circumstances.",
          ],
        },
      },
    ],
  },
  {
    heading: "What Is Zakat in Islam?",
    paragraphs: [
      "Zakat is one of the five pillars of Islam and an important responsibility for Muslims who meet its conditions. It requires eligible Muslims to give a portion of their qualifying wealth to people who are entitled to receive it.",
      "The word Zakat carries the meaning of purification and growth. Through Zakat, Muslims fulfil an important religious duty while helping people who are struggling financially.",
      "It is also important to understand the difference between Zakat and Sadaqah. Zakat is an obligatory form of charity for those who meet the required conditions, whereas Sadaqah is voluntary and can be given at any time. Both are valuable acts of generosity, but they have different rules and purposes.",
      "Islam also provides guidance on how wealth is distributed among family members after a person's death. You can use our [Inheritance Calculator](/islamic-tools/inheritance-calculator) to explore Islamic inheritance shares. Since Zakat is based on the Islamic lunar year, our [Hijri Date Converter](/islamic-tools/hijri-date-converter) can also help you check Islamic dates.",
    ],
    subsections: [
      {
        heading: "Why Is Zakat Important?",
        paragraphs: [
          "Zakat is more than simply giving money to someone in need. It is an important part of Islamic faith that teaches generosity, compassion, and responsibility towards others.",
          "By giving Zakat, Muslims help people experiencing poverty, support families facing financial difficulties, and contribute to the well-being of their communities.",
          "Zakat also reminds us that wealth is a blessing from Allah and comes with responsibilities. It encourages Muslims to share what they have rather than focus only on their personal needs.",
          "The importance of Zakat is highlighted throughout the Quran, where it is mentioned alongside Salah (prayer) in several verses. This shows how closely Zakat is connected to a Muslim's faith, worship, and everyday responsibilities.",
        ],
      },
    ],
  },
  {
    heading: "Understanding the Nisab Threshold",
    paragraphs: [
      "Nisab is the minimum amount of qualifying wealth a Muslim must own before becoming liable for Zakat.",
      "The two commonly used reference amounts are:",
    ],
    table: {
      head: ["Nisab Method", "Reference Weight"],
      rows: [
        ["Gold", "87.48 grams"],
        ["Silver", "612.36 grams"],
      ],
      after: [
        "Their monetary values change with the market prices of gold and silver.",
      ],
    },
    subsections: [
      {
        heading: "Gold Nisab vs Silver Nisab",
        paragraphs: [
          "Gold and silver Nisab can give different results. This is because the market value of each metal is different.",
        ],
        bullets: [
          "Gold Nisab: Based on the value of 87.48 grams of gold.",
          "Silver Nisab: Based on the value of 612.36 grams of silver.",
        ],
        closing: [
          "The silver threshold is usually lower in monetary terms. This means more people may become eligible to pay Zakat when using the silver method.",
          "Scholars differ on which method should be used in some circumstances. The Hanafi school traditionally uses silver, while many scholars from other schools use gold for certain personal wealth calculations.",
          "Our calculator lets you select either method. Choose the approach that follows the Islamic guidance you trust.",
        ],
      },
    ],
  },
  {
    heading: "How to Calculate Zakat on Gold",
    paragraphs: [
      "If you own gold jewellery, coins or bars, you may need to include their value in your Zakat calculation.",
      "To work out its value, you need to know:",
    ],
    bullets: [
      "Its total weight.",
      "Its purity or karat.",
      "The current gold price.",
      "Whether it is subject to Zakat under your chosen scholarly opinion.",
    ],
    closing: [
      "The basic calculation is:",
      "Gold Value = Gold Weight × Gold Price per Gram",
      "Gold Zakat = Qualifying Gold Value × 2.5%",
      "For example, if your qualifying gold is worth £4,000, 2.5% of that amount is £100.",
      "This is only the standalone calculation for that gold. Your final Zakat must take account of your other eligible assets and liabilities.",
    ],
    subsections: [
      {
        heading: "Does Gold Purity Affect Zakat?",
        paragraphs: [
          "Yes. Gold jewellery is available in different purities such as 9K, 18K, 22K and 24K.",
          "Pure 24K gold contains more gold than lower-karat jewellery. This affects its value.",
          "If you enter your gold weight into the calculator, make sure the price per gram matches its purity. If the calculator only accepts one gold price, you may need to adjust the weight or value before entering it.",
        ],
      },
      {
        heading: "Is Zakat Due on Gold Jewellery?",
        paragraphs: [
          "Scholars differ on whether personal-use gold jewellery is subject to Zakat.",
          "The Hanafi school generally requires Zakat on qualifying gold and silver jewellery, including jewellery worn for personal use. Other schools may exempt jewellery that is worn for personal use, subject to certain conditions.",
          "Gold kept as an investment or for savings may be treated differently.",
          "If you own jewellery and are unsure whether it is Zakatable, ask a qualified scholar who understands the school of thought you follow.",
        ],
      },
      {
        heading: "How Much Zakat on 1 Tola Gold in the UK?",
        paragraphs: [
          "The amount of Zakat on one tola of gold depends on its weight, purity and current gold price.",
          "The term tola can refer to different weights:",
        ],
        bullets: [
          "Indian tola: approximately 11.66 grams.",
          "Pakistani tola: 12.5 grams.",
        ],
        table: {
          intro:
            "For example, using an illustrative gold price of £100 per gram:",
          head: ["Gold Weight", "Gold Value", "2.5% Calculation"],
          rows: [
            ["11.66g", "£1,166", "£29.15"],
            ["12.5g", "£1,250", "£31.25"],
          ],
          after: [
            "These are examples, not live UK gold prices.",
            "Owning one tola of gold does not automatically mean you owe Zakat. Your other eligible assets, the Nisab method you follow and your personal circumstances must also be considered.",
          ],
        },
      },
    ],
  },
  {
    heading: "What Assets Are Included in Zakat?",
    paragraphs: [
      "Knowing which assets count is important when working out your Zakat. The following explains the main asset types included in our calculator.",
    ],
    subsections: [
      {
        heading: "Cash and Bank Savings",
        paragraphs: [
          "Cash held at home and eligible money in current or savings accounts generally count towards Zakatable wealth.",
          "Include your relevant account balances, even if you keep the money for different purposes.",
        ],
      },
      {
        heading: "Gold and Silver",
        paragraphs: [
          "Qualifying gold and silver are valued using their applicable market prices.",
          "Remember to consider the purity of your gold and the scholarly ruling on personal jewellery.",
        ],
      },
      {
        heading: "Investments and Shares",
        paragraphs: [
          "Some investments and shares are subject to Zakat. Their treatment can depend on why you bought them and how you hold them.",
          "Shares purchased for trading may be assessed differently from long-term investments held for income or growth. The simple investment field in this calculator may not cover every investment method.",
        ],
      },
      {
        heading: "Business Stock and Goods Held for Sale",
        paragraphs: [
          "Goods held for sale as part of a business generally count towards business Zakat.",
          "This does not mean that every business asset is included. Equipment, buildings and other fixed assets may have different rules.",
        ],
      },
      {
        heading: "Money Owed to You",
        paragraphs: [
          "Money that someone owes you may count if you reasonably expect to receive it.",
          "Disputed debts or money that is unlikely to be recovered may need a different assessment.",
        ],
      },
    ],
  },
  {
    heading: "Which Debts Can Be Deducted From Zakat?",
    paragraphs: [
      "Certain debts and bills may be deducted when calculating your net Zakatable wealth.",
      "These may include:",
    ],
    bullets: [
      "Outstanding bills that are currently due.",
      "Immediate debt repayments.",
      "Eligible short-term financial obligations.",
    ],
    closing: [
      "Long-term loans, mortgages and future instalments may be treated differently by scholars. You should not automatically deduct the full outstanding balance of every loan.",
      "Our calculator has a field for debts due now. Use it for liabilities that qualify under the Islamic guidance you follow.",
    ],
  },
  {
    heading: "When Is Zakat Due? Understanding the Lunar Year",
    paragraphs: [
      "Zakat is generally due when a Muslim owns qualifying wealth at or above Nisab and fulfils the relevant conditions.",
      "For many types of wealth, the passing of one lunar year (Hawl) is an important condition. A lunar year is approximately 354 days, which is shorter than the Gregorian calendar year.",
      "The rules for the start and end of the Zakat year, increases in wealth and different asset types can vary between scholarly approaches.",
      "Keep a record of your annual Zakat date. This makes it easier to review your wealth and work out what you owe each year.",
    ],
  },
  {
    heading: "Zakat in the Quran",
    paragraphs: [
      "The Quran explains the importance of Zakat and identifies those who are entitled to receive it.",
      "Here are three important references.",
    ],
    subsections: [
      {
        heading: "Surah Al-Baqarah (2:43)",
        paragraphs: [
          "وَأَقِيمُوا الصَّلَاةَ وَآتُوا الزَّكَاةَ وَارْكَعُوا مَعَ الرَّاكِعِينَ",
          "Meaning: Establish the prayer, give Zakat, and bow down with those who bow down.",
          "Allah commands believers to establish prayer and give Zakat.",
          "This verse shows the importance of Zakat alongside Salah.",
          "[Read Surah Al-Baqarah, Verse 43](https://quran.com/2/43)",
        ],
      },
      {
        heading: "Surah At-Tawbah (9:60)",
        paragraphs: [
          "إِنَّمَا الصَّدَقَاتُ لِلْفُقَرَاءِ وَالْمَسَاكِينِ وَالْعَامِلِينَ عَلَيْهَا وَالْمُؤَلَّفَةِ قُلُوبُهُمْ وَفِي الرِّقَابِ وَالْغَارِمِينَ وَفِي سَبِيلِ اللَّهِ وَابْنِ السَّبِيلِ ۖ فَرِيضَةً مِنَ اللَّهِ ۗ وَاللَّهُ عَلِيمٌ حَكِيمٌ",
          "Meaning: Charity is only for the poor and the needy, those who collect it, those whose hearts are to be reconciled, freeing people from bondage, those in debt, the cause of Allah, and the stranded traveller. This is a duty from Allah, and Allah is All-Knowing, All-Wise.",
          "This verse identifies eight categories of people who may receive Zakat including the poor, the needy, people in debt and stranded travellers.",
          "[Read Surah At-Tawbah, Verse 60](https://quran.com/9/60)",
        ],
      },
      {
        heading: "Surah At-Tawbah (9:103)",
        paragraphs: [
          "خُذْ مِنْ أَمْوَالِهِمْ صَدَقَةً تُطَهِّرُهُمْ وَتُزَكِّيهِم بِهَا وَصَلِّ عَلَيْهِمْ ۖ إِنَّ صَلَاتَكَ سَكَنٌ لَّهُمْ ۗ وَاللَّهُ سَمِيعٌ عَلِيمٌ",
          "Meaning: Take charity from their wealth to cleanse and purify them, and pray for them. Your prayer brings them comfort. Allah is All-Hearing, All-Knowing.",
          "This verse explains the role of charity in purifying wealth and the person giving it.",
          "[Read Surah At-Tawbah, Verse 103](https://quran.com/9/103)",
        ],
      },
    ],
  },
  {
    heading: "Zakat in Hadith",
    paragraphs: [
      "The Hadith of Prophet Muhammad ﷺ provides more guidance about Zakat and its importance.",
    ],
    subsections: [
      {
        heading: "Sahih al-Bukhari 1447",
        paragraphs: [
          "This Hadith discusses the minimum silver amount below which Zakat is not due referring to five awaq of silver.",
          "[Read Sahih al-Bukhari 1447](https://sunnah.com/bukhari:1447)",
        ],
      },
      {
        heading: "Sahih Muslim 987a",
        paragraphs: [
          "This Hadith warns against withholding the Zakat due on gold and silver.",
          "[Read Sahih Muslim 987a](https://sunnah.com/muslim:987a)",
        ],
      },
    ],
  },
  {
    heading: "Who Can Receive Zakat?",
    paragraphs: [
      "Surah At-Tawbah (9:60) identifies eight categories of eligible Zakat recipients:",
    ],
    bullets: [
      "Al-Fuqara: The poor.",
      "Al-Masakin: The needy.",
      "Al-Amilina Alayha: Those appointed to collect and distribute Zakat.",
      "Al-Mu'allafati Qulubuhum: Those whose hearts are to be reconciled.",
      "Fir-Riqab: Those in bondage.",
      "Al-Gharimin: People burdened by eligible debts.",
      "Fi Sabilillah: In the cause of Allah.",
      "Ibn Al-Sabil: Stranded travellers.",
    ],
    closing: [
      "The application of some categories can differ between scholars. Zakat should be distributed according to sound Islamic guidance.",
    ],
  },
  {
    heading: "What Is the Difference Between Zakat and Zakat al-Fitr?",
    paragraphs: [
      "Annual Zakat and Zakat al-Fitr are two separate Islamic obligations.",
      "Annual Zakat is based on qualifying wealth. It is generally calculated at 2.5% when the relevant conditions are met.",
      "Zakat al-Fitr is linked to Ramadan and Eid al-Fitr. It is generally paid on behalf of eligible individuals before the Eid prayer according to the applicable rules.",
      "Annual Zakat is based on wealth and Nisab while Zakat al-Fitr is based on a prescribed amount of food or its accepted monetary equivalent.",
      "This calculator is designed for annual Zakat, not Zakat al-Fitr.",
    ],
  },
  {
    heading: "Important Note About Zakat Calculations",
    paragraphs: [
      "This Zakat Calculator provides an estimate based on the information you enter and the calculation method you select. It is an educational tool, not a religious ruling.",
      "Islamic rulings can differ depending on your school of thought, the type of wealth you own, personal jewellery, investments and debts.",
      "For complicated financial situations, speak to a qualified Islamic scholar before making your Zakat payment.",
    ],
  },
];

const faqs: FaqItem[] = [
  {
    question: "How much Zakat do I have to pay?",
    answer:
      "Zakat is usually 2.5% of your net wealth. You only pay it if your wealth reaches the nisab and you have held it for one lunar year.",
  },
  {
    question: "What is the Nisab threshold in the UK?",
    answer:
      "The nisab is 87.48 grams of gold or 612.36 grams of silver. Its value in pounds changes with the gold and silver price. The calculator works it out for you.",
  },
  {
    question: "Should I choose gold or silver Nisab?",
    answer:
      "Scholars differ. The Hanafi school usually uses silver, and some other scholars use gold. Silver gives a lower nisab, so more people reach it. Choose the one your scholar follows.",
  },
  {
    question: "Do I pay Zakat on money in my bank account?",
    answer:
      "Yes, in most cases. Money in your current and savings accounts counts towards your wealth.",
  },
  {
    question: "Do I pay Zakat on gold jewellery?",
    answer:
      "Scholars differ. The Hanafi school says zakat is due on gold jewellery, even if you wear it. Other schools do not count jewellery you wear, with some conditions. Ask a scholar you trust.",
  },
  {
    question: "Can I deduct my mortgage before calculating Zakat?",
    answer:
      "Scholars differ. Do not take off your whole mortgage without checking. Some scholars only allow the part that is due now. Ask a scholar if you are not sure.",
  },
  {
    question: "Do I have to pay Zakat every lunar year?",
    answer:
      "Yes. Zakat is paid once every lunar year on wealth above the nisab. A lunar year is about 354 days. Pick a date each year and check your wealth then.",
  },
  {
    question: "Does this calculator use live gold and silver prices?",
    answer:
      "Yes. The calculator fills in today's gold and silver prices for you and shows when they were updated. They are spot prices, so a shop may charge a little more. You can change them if you trust another price.",
  },
  {
    question: "Does the calculator save my financial information?",
    answer:
      "No. The numbers you type stay in your browser, and the calculator does not send them anywhere. Please read our Privacy Policy for more details.",
  },
  {
    question: "Can I use this calculator for Zakat al-Fitr?",
    answer:
      "No. This calculator is for yearly zakat on your wealth. Zakat al-Fitr is a different payment given at the end of Ramadan, and it has its own rules.",
  },
];

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${PAGE_URL}#webpage`,
  url: PAGE_URL,
  name: TITLE,
  description: DESCRIPTION,
  isPartOf: {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: "Islam Religion",
    url: `${SITE_URL}/`,
  },
  about: {
    "@id": `${PAGE_URL}#app`,
  },
  mainEntity: {
    "@id": `${PAGE_URL}#app`,
  },
  inLanguage: "en",
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "@id": `${PAGE_URL}#app`,
  name: "Zakat Calculator",
  url: PAGE_URL,
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  browserRequirements: "Requires JavaScript. Requires HTML5.",
  isAccessibleForFree: true,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "GBP",
  },
  provider: {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "Islam Religion",
    url: `${SITE_URL}/`,
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

export default function ZakatCalculatorPage() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(webApplicationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema) }}
      />

      <ToolHero
        title="Free Zakat"
        highlight="Calculator"
        description="Find out how much zakat you may need to pay. Add your savings, gold, silver and other things you own, and the calculator does the sums for you. It takes just a few minutes."
      />

      <div className="bg-warm-white">
        <section className="mx-auto max-w-5xl px-4 pb-10 sm:px-6 lg:px-8">
          <ZakatCalculator />
        </section>
        <ToolGuide
          title="How to Use the"
          highlight="Zakat Calculator"
          sections={guideSections}
        />
        <ToolArticle
          title="Zakat Calculator – Calculate Your Zakat Online"
          intro="Use our Zakat Calculator to estimate how much Zakat you may need to pay. Enter your cash, bank savings, gold, silver, investments, business stock and money owed to you. The calculator uses gold and silver prices to estimate your wealth and compare it with your chosen Nisab threshold. Calculate your zakat now!"
          sections={articleSections}
        />
      </div>

      <RelatedTools
        keys={[
          "inheritance-calculator",
          "ramadan-counter",
          "hijri-converter",
          "cost-estimator",
        ]}
      />

      <ToolsFaq faqs={faqs} title="Zakat Calculator" highlight="FAQs" />
    </div>
  );
}