// app/islamic-tools/qibla-finder/page.tsx
import type { Metadata } from "next";
import ToolHero from "@/components/Tools/tool-hero";
import QiblaFinder from "@/components/Tools/QiblaFinder";
import ToolArticle, {
  type ArticleSection,
} from "@/components/Tools/tool-article";
import ToolGuide, { type GuideSection } from "@/components/Tools/tool-guide";
import RelatedTools from "@/components/Tools/related-tools";
import ToolsFaq, { type FaqItem } from "@/components/Tools/tools-faq";

const SITE_URL = "https://www.islam-religion.com";
const TOOLS_BASE_PATH = "/islamic-tools";
const PAGE_PATH = `${TOOLS_BASE_PATH}/qibla-finder`;
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const TITLE = "Free Qibla Finder Online – Find Qibla Direction";
const DESCRIPTION =
  "Find your Qibla direction online with our free Qibla Finder. Use your location or enter coordinates to check the Kaaba bearing and distance to Makkah.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: ["Qibla Finder"],
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    title: TITLE,
    description: DESCRIPTION,
    siteName: "Islam Religion",
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
    heading: "Four simple steps",
    variant: "steps",
    items: [
      "Tap Use my location, or type your coordinates.",
      "Read your Qibla direction and the distance to the Kaaba.",
      "Turn on the live compass on your phone.",
      "Turn slowly until the pointer turns green.",
    ],
  },
  {
    heading: "What this tool does",
    variant: "highlight",
    items: [
      "Finds the Qibla direction from anywhere in the world.",
      "Shows how far you are from the Kaaba in kilometres.",
      "Gives you a live compass on your phone.",
      "Corrects the compass for magnetic declination.",
      "Has a dial you can turn by hand if your device has no compass.",
      "Keeps your location on your device.",
    ],
  },
  {
    heading: "Handy tips",
    variant: "tips",
    items: [
      "Hold your phone flat.",
      "Keep it away from magnets and metal.",
      "Move it in a figure of 8 if the pointer looks wrong.",
      "No location? Type your latitude and longitude.",
      "Not sure? Check with your local mosque.",
    ],
  },
  {
    heading: "Please note",
    variant: "note",
    text: "The result depends on your location and your phone's compass. If you are unsure, compare it with the Qibla direction at your local mosque.",
  },
];

const articleSections: ArticleSection[] = [
  {
    heading: "How to Use the Qibla Finder",
    paragraphs: ["Follow these steps to find your direction and use the compass."],
    subsections: [
      {
        heading: "1. Open the Qibla Finder",
        paragraphs: [
          "Visit the Qibla Finder page on Islam Religion's tool page. Make sure you have an internet connection to open the tool. It won't work offline.",
        ],
      },
      {
        heading: "2. Set Your Location",
        paragraphs: [
          "Choose automatic location detection. Your browser will ask for permission to access your location. Select Allow to continue.",
          "If you don't want to share your location you can enter your latitude and longitude manually.",
        ],
      },
      {
        heading: "3. View Your Qibla Bearing",
        paragraphs: [
          "Once your coordinates are available the tool calculates the direction towards the Kaaba.",
          "Your result shows the Qibla bearing in degrees and the geographical distance from your location to Makkah.",
        ],
      },
      {
        heading: "4. Use the Live Compass",
        paragraphs: [
          "Select the live compass option to use your phone's direction sensors. Your browser may ask for permission to access motion and orientation data.",
          "Hold your phone flat and turn slowly. The green pointer indicates when your phone is aligned with the calculated Qibla direction.",
          "Check your browser permissions and device compatibility as well if the compass doesn't respond.",
        ],
      },
    ],
  },
  {
    heading: "How Does the Qibla Finder Calculate the Direction?",
    paragraphs: [
      "The calculator uses your current location to find the Qibla direction. It calculates the direction from your position to the Kaaba in Makkah. It helps you know which direction to face when offering prayers. Make sure your device location is enabled for accurate results.",
      "It needs two details:",
    ],
    bullets: [
      "Latitude: Your position north or south of the Equator.",
      "Longitude: Your position east or west of the Prime Meridian.",
    ],
    closing: [
      "Using these coordinates the calculator finds the initial bearing along the Earth's surface from your location to the Kaaba. This is your Qibla direction.",
    ],
  },
  {
    heading: "What Is a Qibla Bearing?",
    paragraphs: [
      "A Qibla bearing tells you which direction to face. It is measured in degrees clockwise from true north.",
      "Here are the main compass bearings:",
    ],
    table: {
      head: ["Bearing", "Direction"],
      rows: [
        ["0° or 360°", "North"],
        ["45°", "Northeast"],
        ["90°", "East"],
        ["135°", "Southeast"],
        ["180°", "South"],
        ["225°", "Southwest"],
        ["270°", "West"],
        ["315°", "Northwest"],
      ],
      after: [
        "Your bearing depends on where you are. For example, the Qibla direction from London is different from the direction in Lahore or New York.",
      ],
    },
  },
  {
    heading: "What Does the Qibla Finder Show?",
    paragraphs: ["You can check several details after entering your location."],
    subsections: [
      {
        heading: "Qibla Direction",
        paragraphs: [
          "The calculated direction towards the Kaaba displayed as a compass bearing in degrees.",
        ],
      },
      {
        heading: "Distance to the Kaaba",
        paragraphs: [
          "The geographical distance between your location and the Kaaba in Makkah.",
        ],
      },
      {
        heading: "Latitude and Longitude",
        paragraphs: [
          "Your geographical coordinates which the calculator uses to determine your position.",
        ],
      },
      {
        heading: "Magnetic Declination",
        paragraphs: [
          "The difference between true north and magnetic north. This information helps account for the difference between the geographical bearing and your phone's magnetic compass reading.",
        ],
      },
      {
        heading: "Phone Heading",
        paragraphs: [
          "When the live compass is active, this shows the direction your phone is pointing. You can compare it with the Qibla bearing to align your phone.",
        ],
      },
    ],
  },
  {
    heading: "How to Find Qibla Without Location Access",
    paragraphs: [
      "You can still use the calculator if you don't want your browser to detect your current location. Simply enter your coordinates yourself.",
    ],
    numbered: [
      "Find the latitude and longitude of your location.",
      "Open the Islam Religion Qibla Finder.",
      "Enter your latitude.",
      "Enter your longitude.",
      "Select Show Qibla for these coordinates.",
    ],
    closing: [
      "The calculator will use the coordinates you provide to work out the direction.",
    ],
  },
  {
    heading: "Where Can You Find Your Coordinates?",
    paragraphs: [
      "A map service that displays geographical coordinates can help you find them.",
    ],
    table: {
      intro: "For example London's approximate coordinates are:",
      head: ["Coordinate", "Value"],
      rows: [
        ["Latitude", "51.5074"],
        ["Longitude", "-0.1278"],
      ],
      after: [
        "These coordinates are only an example. Enter the details for your actual location to get the correct result.",
      ],
    },
  },
  {
    heading: "What Is Magnetic Declination?",
    paragraphs: [
      "Your phone's compass and the geographical Qibla calculation use different north references.",
    ],
    bullets: [
      "True north refers to the geographical North Pole.",
      "Magnetic north is the direction indicated by a magnetic compass.",
    ],
    closing: [
      "The difference between these two directions is called magnetic declination. It changes varying on your location.",
      "This matters when using the live Qibla compass. The calculator works out your Qibla bearing using geographical coordinates while your phone uses magnetic sensors to determine its heading.",
      "The tool accounts for magnetic declination when correcting the compass reading helping the pointer align with the calculated Qibla direction.",
    ],
  },
  {
    heading: "Why Is My Qibla Compass Showing the Wrong Direction?",
    paragraphs: [
      "Your Qibla bearing may be correct even when your phone's compass gives an unusual reading. Before using it, check these common issues.",
    ],
    subsections: [
      {
        heading: "1. Incorrect Location",
        paragraphs: [
          "If your phone detects the wrong position the calculated direction may also be incorrect.",
          "Check your location settings or enter your coordinates manually.",
        ],
      },
      {
        heading: "2. Poor Compass Calibration",
        paragraphs: [
          "Your phone's compass may need calibration. Try moving it in a figure-of-eight motion and check the reading again.",
        ],
      },
      {
        heading: "3. Magnetic Interference",
        paragraphs: [
          "Keep your phone away from magnets, speakers and metal objects. They can interfere with its compass. If the reading seems inaccurate move away from them and check again.",
        ],
      },
      {
        heading: "4. Phone Position",
        paragraphs: [
          "Holding your phone at an unusual angle can affect the reading. Keep it flat and turn slowly while watching the pointer.",
        ],
      },
      {
        heading: "5. Unsupported Phone Sensors",
        paragraphs: [
          "Some devices and browsers don't support the sensors required for a live compass. Check your browser permissions and device compatibility if the pointer doesn't move.",
          "For another check, compare your result with the Qibla direction at your local mosque. You can also use our [Mosque Finder](/islamic-tools/mosque-finder) to find a nearby mosque.",
        ],
      },
    ],
  },
  {
    heading: "Is My Location Safe When Using the Qibla Finder?",
    paragraphs: [
      "You may prefer not to share your location with an online tool. That's why the manual coordinate option is available.",
      "Our Qibla Finder is designed to perform location calculations on your device without sending your location elsewhere. You can enter your coordinates yourself if you don't want to allow automatic detection.",
      "Your browser also lets you control location and sensor permissions.",
    ],
  },
  {
    heading: "What Is the Qibla Direction in Islam?",
    paragraphs: [
      "The Qibla is the direction Muslims face when offering Salah. It points towards the Kaaba located inside Masjid al-Haram in Makkah.",
      "Muslims around the world face towards the same sacred place during their five daily prayers. The compass direction changes according to your geographical position but the destination remains the Kaaba.",
    ],
  },
  {
    heading: "Why Do Muslims Face the Qibla During Salah?",
    paragraphs: [
      "Facing the Qibla is an important requirement of Salah for Muslims.",
      "Allah gives this instruction in Surah Al-Baqarah (2:144). Allah commands Prophet Muhammad ﷺ and the believers to turn towards Masjid al-Haram when praying.",
      "It establishes the Kaaba as the direction of prayer for Muslims. It also brings Muslims together in worship, wherever they may be.",
      "After finding your Qibla direction, you can also check accurate daily [Prayer Times](/islamic-tools/prayer-times) to keep track of your five daily prayers.",
    ],
  },
  {
    heading: "Find Your Qibla Direction with Islam Religion",
    paragraphs: [
      "You don't need to guess which way to face during Salah. Use our free Qibla Finder to check the direction of the Kaaba from your location.",
      "Allow automatic location detection or enter your coordinates manually. You can then view your bearing, check the distance to Makkah and use the live compass on a compatible phone.",
      "Open Islam Religion's Qibla Finder and check your direction before Salah.",
    ],
  },
  {
    heading: "A Note About Accuracy",
    paragraphs: [
      "The result depends on the accuracy of your location details and compass readings. Check your coordinates before calculating the direction, and keep your phone away from magnets and metal objects when using the live compass. If you're unsure about the reading compare it with the Qibla direction at your local mosque.",
      "If you have questions about using our tool, feel free to [contact us](/contact).",
    ],
  },
];

const faqs: FaqItem[] = [
  {
    question: "How can I find my Qibla direction online?",
    answer:
      "Open our Qibla Finder and allow your browser to detect your location. The calculator will show your Qibla bearing. You can also enter your coordinates manually.",
  },
  {
    question: "Is the Qibla Finder free?",
    answer:
      "Yes. Islam Religion's online Qibla Finder is free to use. No account or registration is required.",
  },
  {
    question: "Does the Qibla Finder work on mobile phones?",
    answer:
      "Yes. You can open it on a mobile phone, tablet or computer. The live compass requires a compatible device with the necessary sensors.",
  },
  {
    question: "Does the Qibla Finder need GPS?",
    answer:
      "The calculator needs your geographical coordinates but not necessarily GPS. Your device may use GPS, Wi-Fi or other location services to identify your position. You can also enter the manual coordinates.",
  },
  {
    question: "Can I find Qibla without sharing my location?",
    answer:
      "Yes. Enter your latitude and longitude manually if you don't want your browser to detect your position.",
  },
  {
    question: "Why does my Qibla compass show a different direction?",
    answer:
      "Magnetic interference, incorrect location details, poor calibration and unsupported phone sensors can affect the reading. Check these before relying on the live compass.",
  },
  {
    question: "What is the Qibla direction from the UK?",
    answer:
      "There is no single bearing for the whole UK. The direction varies between cities such as London, Manchester, Birmingham and Glasgow. Enter your location to calculate your own bearing.",
  },
  {
    question: "What is the Qibla direction from Pakistan?",
    answer:
      "It depends on your city. Lahore, Karachi, Islamabad and other locations have different bearings. Use your current coordinates to get your result.",
  },
  {
    question: "Can I use the Qibla Finder while travelling?",
    answer:
      "Yes. Open the tool at your new destination and update your location. It will calculate the Qibla direction for your new position.",
  },
  {
    question: "Can I use the Qibla Finder without the internet?",
    answer:
      "An internet connection is needed to open the online tool. Some features may continue working after the page loads depending on your browser and device, but offline use is not guaranteed.",
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
  name: "Qibla Finder",
  url: PAGE_URL,
  applicationCategory: "UtilitiesApplication",
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

export default function QiblaFinderPage() {
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
        title="Free Qibla"
        highlight="Finder"
        description="Find out which direction to face during Salah. Use your location or enter your coordinates to check the Kaaba bearing, distance to Makkah, and live compass."
      />

      <div className="bg-warm-white">
        <section className="mx-auto max-w-5xl px-4 pb-10 sm:px-6 lg:px-8">
          <QiblaFinder />
        </section>
        <ToolGuide
          title="How to Use the"
          highlight="Qibla Finder"
          sections={guideSections}
        />
        <ToolArticle
          title="Free Qibla Finder – Find the Direction of the Kaaba"
          intro="Not sure which direction to face during Salah? Our free Qibla Finder helps you find the direction of the Kaaba in Makkah, wherever you are. Open Islam Religion's online Qibla Finder and allow location access. The tool uses your geographical coordinates to calculate the Qibla direction and display your bearing. You can also enter your latitude and longitude manually if you don't want to use automatic location detection. Along with the direction, you can check the distance to the Kaaba, view a live compass and see magnetic declination details. The tool works on mobile phones, tablets and computers without requiring an account."
          sections={articleSections}
        />
      </div>

      <RelatedTools
        keys={[
          "prayer-times",
          "mosque-finder",
          "hijri-converter",
          "zakat-calculator",
        ]}
      />

      <ToolsFaq faqs={faqs} title="Qibla Finder" highlight="FAQs" />
    </div>
  );
}