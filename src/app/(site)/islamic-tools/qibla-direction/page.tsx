import type { Metadata } from "next"
import ToolHero from "@/components/Tools/tool-hero"
import QiblaFinder from "@/components/Tools/QiblaFinder"
import ToolArticle, { type ArticleSection } from "@/components/Tools/tool-article"
import ToolGuide, { type GuideSection } from "@/components/Tools/tool-guide"
import ToolsFaq, { type FaqItem } from "@/components/Tools/tools-faq"
import RelatedTools from "@/components/Tools/related-tools"

export const metadata: Metadata = {
  title: "Free Qibla Finder Online – Find Qibla Direction",
  description:
    "Use our free Qibla Finder online to find your Qibla direction. Check your Qibla bearing, Kaaba direction, live Qibla compass and distance to Makkah.",
  keywords: [
    "Qibla Finder Online",
    "Qibla Finder",
    "Qibla direction",
    "Find Qibla direction",
    "Qibla direction finder",
    "Qibla compass",
    "Live Qibla compass",
    "Kaaba direction",
    "Qibla direction by location",
    "Qibla direction from UK",
    "Qibla direction from Pakistan",
    "Qibla bearing",
    "Distance to Makkah",
  ],
  alternates: {
    canonical: "https://www.islam-religion.com/islamic-tools/qibla-finder",
  },
  openGraph: {
    title: "Free Qibla Finder Online – Find Qibla Direction",
    description:
      "Use our free Qibla Finder online to find your Qibla direction. Check your Qibla bearing, Kaaba direction, live Qibla compass and distance to Makkah.",
    url: "https://www.islam-religion.com/islamic-tools/qibla-finder",
    siteName: "Islam Religion",
    type: "website",
  },
}

const articleSections: ArticleSection[] = [
  {
    heading: "How to Use the Qibla Finder Online",
    paragraphs: [
      "Follow these steps to find your direction and use the compass.",
    ],
  },
  {
    heading: "1. Open the Qibla Finder",
    paragraphs: [
      "Visit the Qibla Finder page on Islam Religion. Make sure you have an internet connection to open the tool. It won't load without one.",
    ],
  },
  {
    heading: "2. Set Your Location",
    paragraphs: [
      "Choose automatic location detection. Your browser will ask for permission to access your location. Select Allow to continue.",
      "If you don't want to share your location, you can enter your latitude and longitude manually.",
    ],
  },
  {
    heading: "3. View Your Qibla Bearing",
    paragraphs: [
      "Once your coordinates are available, the tool calculates the direction towards the Kaaba.",
      "Your result shows the Qibla bearing in degrees and the geographical distance from your location to Makkah.",
    ],
  },
  {
    heading: "4. Use the Live Qibla Compass",
    paragraphs: [
      "Select the live compass option to use your phone's direction sensors. Your browser may ask for permission to access motion and orientation data.",
      "Hold your phone flat and turn slowly. The green pointer indicates when your phone is aligned with the calculated Qibla direction.",
      "If the compass doesn't respond, check your browser permissions and device compatibility.",
    ],
  },
  {
    heading: "How Does the Qibla Finder Calculate the Direction?",
    paragraphs: [
      "The calculator uses your current location to find the Qibla direction by location. It calculates the direction from your position to the Kaaba in Makkah, so you know which way to face when offering prayers. Make sure your device location is enabled for accurate results.",
      "It needs two details:",
    ],
    bullets: [
      "Latitude: Your position north or south of the Equator.",
      "Longitude: Your position east or west of the Prime Meridian.",
    ],
  },
  {
    heading: "How the Bearing Is Worked Out",
    paragraphs: [
      "Using these coordinates, the calculator finds the initial bearing along the Earth's surface from your location to the Kaaba. This is your Qibla direction.",
    ],
  },
  {
    heading: "What Is a Qibla Bearing?",
    paragraphs: [
      "A Qibla bearing tells you which direction to face. It is measured in degrees clockwise from true north. Here are the main compass bearings:",
    ],
    bullets: [
      "0° or 360°: North",
      "45°: Northeast",
      "90°: East",
      "135°: Southeast",
      "180°: South",
      "225°: Southwest",
      "270°: West",
      "315°: Northwest",
    ],
  },
  {
    heading: "Your Bearing Depends on Where You Are",
    paragraphs: [
      "For example, the Qibla direction from London is different from the direction in Lahore or New York.",
    ],
  },
  {
    heading: "What Does the Qibla Finder Show?",
    paragraphs: [
      "You can check several details after entering your location.",
    ],
    bullets: [
      "Qibla Direction: The calculated direction towards the Kaaba, displayed as a compass bearing in degrees.",
      "Distance to the Kaaba: The geographical distance between your location and the Kaaba in Makkah.",
      "Latitude and Longitude: Your geographical coordinates, which the calculator uses to determine your position.",
      "Magnetic Declination: The difference between true north and magnetic north. This helps account for the difference between the geographical bearing and your phone's magnetic compass reading.",
      "Phone Heading: When the live compass is active, this shows the direction your phone is pointing. You can compare it with the Qibla bearing to align your phone.",
    ],
  },
  {
    heading: "How to Find Qibla Direction Without Location Access",
    paragraphs: [
      "You can still use the calculator if you don't want your browser to detect your current location. Simply enter your coordinates yourself:",
    ],
    bullets: [
      "Find the latitude and longitude of your location.",
      "Open the Islam Religion Qibla Finder.",
      "Enter your latitude.",
      "Enter your longitude.",
      "Select Show Qibla for these coordinates.",
    ],
  },
  {
    heading: "Using Your Own Coordinates",
    paragraphs: [
      "The calculator will use the coordinates you provide to work out the direction.",
    ],
  },
  {
    heading: "Where Can You Find Your Coordinates?",
    paragraphs: [
      "A map service that displays geographical coordinates can help you find them. For example, London's approximate coordinates are:",
    ],
    bullets: [
      "Latitude: 51.5074",
      "Longitude: -0.1278",
    ],
  },
  {
    heading: "Use Your Own Location",
    paragraphs: [
      "These coordinates are only an example. Enter the details for your actual location to get the correct result.",
    ],
  },
  {
    heading: "What Is Magnetic Declination?",
    paragraphs: [
      "Your phone's compass and the geographical Qibla calculation use different north references:",
    ],
    bullets: [
      "True north refers to the geographical North Pole.",
      "Magnetic north is the direction indicated by a magnetic compass.",
    ],
  },
  {
    heading: "Why Declination Matters for the Live Compass",
    paragraphs: [
      "The difference between these two directions is called magnetic declination. It varies depending on your location.",
      "This matters when using the live Qibla compass. The calculator works out your Qibla bearing using geographical coordinates, while your phone uses magnetic sensors to determine its heading.",
      "The tool accounts for magnetic declination when correcting the compass reading, helping the pointer align with the calculated Qibla direction.",
    ],
  },
  {
    heading: "Why Is My Qibla Compass Showing the Wrong Direction?",
    paragraphs: [
      "Your Qibla bearing may be correct even when your phone's compass gives an unusual reading. Before using it, check these common issues.",
    ],
  },
  {
    heading: "1. Incorrect Location",
    paragraphs: [
      "If your phone detects the wrong position, the calculated direction may also be incorrect. Check your location settings or enter your coordinates manually.",
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
      "Keep your phone away from magnets, speakers and metal objects, because they can interfere with its compass. If the reading seems inaccurate, move away from them and check again.",
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
      "For another check, compare your result with the Qibla direction at your local mosque. You can also use our Mosque Finder to find a nearby mosque.",
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
      "The Qibla is the direction Muslims face when offering Salah. It points towards the Kaaba, located inside Masjid al-Haram in Makkah. This Kaaba direction is the same sacred destination for every Muslim, wherever they pray.",
      "Muslims around the world face towards the same sacred place during their five daily prayers. The compass direction changes according to your geographical position, but the destination remains the Kaaba.",
    ],
  },
  {
    heading: "Why Do Muslims Face the Qibla During Salah?",
    paragraphs: [
      "Facing the Qibla is an important requirement of Salah for Muslims.",
      "Allah gives this instruction in Surah Al-Baqarah (2:144). Allah commands Prophet Muhammad ﷺ and the believers to turn towards Masjid al-Haram when praying.",
      "This establishes the Kaaba as the direction of prayer for Muslims. It also brings Muslims together in worship, wherever they may be.",
      "After finding your Qibla direction, you can also check accurate daily Prayer Times to keep track of your five daily prayers.",
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
      "The result depends on the accuracy of your location details and compass readings. Check your coordinates before calculating the direction, and keep your phone away from magnets and metal objects when using the live compass. If you're unsure about the reading, compare it with the Qibla direction at your local mosque.",
      "If you have questions about using our tool, feel free to contact us.",
    ],
  },
]

const guideSections: GuideSection[] = [
  {
    heading: "How to use the Qibla Finder",
    variant: "steps",
    items: [
      "Tap Use my location, or enter your coordinates.",
      "Read the Qibla bearing and distance on the summary.",
      "On a phone, tap Turn on the live compass and allow motion access if asked.",
      "Hold your phone flat and turn until the pointer turns green.",
      "Confirm with a compass or local mosque if you can.",
    ],
  },
  {
    heading: "How it helps you",
    variant: "highlight",
    items: [
      "Gives the Qibla direction from anywhere in the world.",
      "Shows the bearing in degrees and your distance to the Kaaba.",
      "Works with a live compass on your phone.",
      "Free to use, with no sign-up.",
    ],
  },
  {
    heading: "Tips for best results",
    variant: "tips",
    items: [
      "Keep your phone flat and away from magnets and metal.",
      "Move your phone in a figure of 8 if the compass feels off.",
      "Use it outdoors or near a window for a better location fix.",
    ],
  },
  {
    heading: "Good to know",
    variant: "note",
    text: "Your location stays on your device and is never sent anywhere. Location and compass access need a secure (HTTPS) connection and your permission. Phone compasses can be a few degrees off, so this is a guide only. Please confirm with a local mosque where you can.",
  },
]

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
      "The calculator needs your geographical coordinates but not necessarily GPS. Your device may use GPS, Wi-Fi or other location services to identify your position. You can also enter your coordinates manually.",
  },
  {
    question: "Do I need to install a Qibla finder app?",
    answer:
      "No. Open the Qibla Finder online in your browser on a phone, tablet or computer. No app or account is needed.",
  },
  {
    question: "Can I find Qibla without sharing my location?",
    answer:
      "Yes. Enter your latitude and longitude manually if you don't want your browser to detect your position.",
  },
  {
    question: "Why does my Qibla compass show a different direction?",
    answer:
      "Magnetic interference, incorrect location details, poor calibration or unsupported phone sensors can affect the reading. Check these before relying on the live compass.",
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
      "An internet connection is needed to open the online tool. Some features may continue working after the page loads, depending on your browser and device, but offline use is not guaranteed.",
  },
]

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://www.islam-religion.com/islamic-tools/qibla-finder#webpage",
  url: "https://www.islam-religion.com/islamic-tools/qibla-finder",
  name: "Free Qibla Finder Online – Find Qibla Direction",
  description:
    "Use our free Qibla Finder online to find your Qibla direction. Check your Qibla bearing, Kaaba direction, live Qibla compass and distance to Makkah.",
  isPartOf: {
    "@type": "WebSite",
    name: "Islam Religion",
    url: "https://www.islam-religion.com/",
  },
  inLanguage: "en",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    ratingCount: "164",
    bestRating: "5",
    worstRating: "1",
  },
}

export default function QiblaFinderPage() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <ToolHero
        title="Qibla"
        highlight="Finder Online"
        description="Find the direction of the Kaaba from wherever you are. Use your location or enter coordinates to see your Qibla bearing, the distance to Makkah and a live compass."
      />

      <div className="bg-warm-white">
        <section className="mx-auto max-w-5xl px-4 pb-10 sm:px-6 lg:px-8">
          <QiblaFinder />
        </section>
        <ToolGuide title="How to Use the Qibla Finder" sections={guideSections} />
        <ToolArticle
          title="Free Qibla Finder Online – Find the Direction of the Kaaba"
          intro="Not sure which direction to face during Salah? Our free Qibla Finder online helps you find the direction of the Kaaba in Makkah, wherever you are. Open Islam Religion's Qibla Finder online and allow location access. The tool uses your geographical coordinates to calculate the Qibla direction and display your bearing. You can also enter your latitude and longitude manually if you don't want to use automatic location detection. Along with the direction, you can check the distance to the Kaaba, view a live compass and see magnetic declination details. The tool works on mobile phones, tablets and computers without requiring an account."
          sections={articleSections}
        />
      </div>

      <RelatedTools
        keys={["prayer-times", "mosque-finder", "hijri-converter", "hajj-checklist"]}
      />

      <ToolsFaq faqs={faqs} title="Qibla Finder Online" highlight="FAQs" />
    </div>
  )
}