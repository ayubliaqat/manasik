// app/tools/mosque-finder/page.tsx
import type { Metadata } from "next";
import ToolHero from "@/components/Tools/tool-hero";
import MosqueFinder from "@/components/Tools/MosqueFinder";
import ToolArticle, {
  type ArticleSection,
} from "@/components/Tools/tool-article";
import ToolGuide, { type GuideSection } from "@/components/Tools/tool-guide";
import RelatedTools from "@/components/Tools/related-tools";
import ToolsFaq, { type FaqItem } from "@/components/Tools/tools-faq";

export const metadata: Metadata = {
  title: "Mosque Finder – Find Mosques Near You",
  description:
    "Find mosques near you in the UK and worldwide. Search by location, postcode or city, view nearby results on a map and get directions.",
  keywords: ["Mosque Finder"],
  alternates: {
    canonical: "https://www.islam-religion.com/islamic-tools/mosque-finder",
  },
  openGraph: {
    title: "Mosque Finder – Find Mosques Near You",
    description:
      "Find mosques near you in the UK and worldwide. Search by location, postcode or city, view nearby results on a map and get directions.",
    url: "https://www.islam-religion.com/islamic-tools/mosque-finder",
    siteName: "Islam Religion",
    type: "website",
  },
}

const articleSections: ArticleSection[] = [
  {
    heading: "What Is the Mosque Finder?",
    paragraphs: [
      "The Mosque Finder is a free online tool that helps you find mosques around a location. You can search from your current position or enter another place if you are planning a visit.",
      "It brings together mosque locations recorded in OpenStreetMap and displays the available results on an interactive map. With the tool, you can:",
    ],
    bullets: [
      "Find mosques near your current location.",
      "Search using a postcode, city, area or address.",
      "Look for mosques in another country.",
      "Choose a search distance of 1, 3, 5 or 10 km.",
      "View mosque locations on a map and in a distance-sorted list.",
      "Check available addresses, opening hours and websites.",
      "Open a mosque's location in Google Maps for directions.",
    ],
  },
  {
    heading: "How Do I Find the Nearest Mosque?",
    paragraphs: [
      "It is simple. The quickest way is to let the tool use your current location. It will search the available map data around you and show the mosques found within your selected distance. Follow these steps:",
    ],
    bullets: [
      "Open the Mosque Finder.",
      "Select Use my location.",
      "Allow your browser to access your location when asked.",
      "Choose how far you want to search.",
      "Check the mosque locations on the map and in the results list.",
    ],
  },
  {
    heading: "Searching Without Your Location",
    paragraphs: [
      "The list sorts the available mosques by distance, with the closest results first. Select a mosque to check its address and any other details provided.",
      "If you do not want to share your current location, you can search manually instead. Enter a postcode, city, area or address in the search box. This is also useful when you want to find a mosque near your hotel, workplace or another place you plan to visit.",
    ],
  },
  {
    heading: "Can I Find a Mosque in Another City or Country?",
    paragraphs: [
      "Yes. You do not have to search from where you are. Enter the name of the place you want to visit, and the tool will look for available mosque locations around it.",
      "For example, you could search for mosques in Birmingham while sitting at home in London. If you are travelling abroad you can enter a city such as Dubai or Istanbul to see the available results.",
      "This can help you plan where to pray before you leave your hotel or accommodation. However, the amount of information depends on the area. Some cities have many recorded mosque locations while other places may have fewer results.",
    ],
  },
  {
    heading: "How Far Away Can I Search for a Mosque?",
    paragraphs: [
      "You can choose from four search distances: 1 km, 3 km, 5 km and 10 km. The selected distance controls how far the tool searches around your chosen location. Here is how to choose:",
    ],
    bullets: [
      "1 km: Check for mosques very close to your location.",
      "3 km: Search a wider nearby area.",
      "5 km: Include more of the surrounding neighbourhoods.",
      "10 km: Look across a larger area for additional results.",
    ],
  },
  {
    heading: "Straight-Line Distance",
    paragraphs: [
      "If you find only one or two mosques, increase the distance and search again. You may find more options a little further away.",
      "Remember that the distance shown is measured in a straight line. It does not show the actual road or walking distance. A mosque listed as 1 km away may take longer to reach because of roads, rivers, buildings or other obstacles. Check the route in Google Maps before setting off.",
    ],
  },
  {
    heading: "How Do I Read the Mosque Finder Results and Get Directions?",
    paragraphs: [
      "The tool shows results in two ways. The map gives you a clear view of where the mosques are, while the list makes it easier to compare them by distance. Depending on the information available for each mosque, a result may include:",
    ],
    bullets: [
      "Mosque name: The name recorded in the map data.",
      "Address: The available location or street details.",
      "Distance: How far the mosque is from your search point in a straight line.",
      "Opening hours: Listed hours, where available.",
      "Website: A link to the mosque's website, if one has been added.",
    ],
  },
  {
    heading: "Getting Directions",
    paragraphs: [
      "Not every mosque has all these details. Some listings may only show a name and location.",
      "When you find a mosque you want to visit, use the directions option to open its location in Google Maps. You can then check the route and choose how to travel. If the address or location looks unclear, confirm it before making the journey.",
    ],
  },
  {
    heading: "Is the Mosque Finder Real and Accurate?",
    paragraphs: [
      "The Mosque Finder searches real mosque locations recorded in OpenStreetMap. It does not simply display sample places. However, a real location on a map does not mean every detail in its listing is correct or up to date.",
      "The tool uses information maintained by OpenStreetMap contributors. People can add new places and update existing records, but the Mosque Finder does not independently verify every mosque or its details. For this reason, you may find that:",
    ],
    bullets: [
      "A mosque has moved but its old location is still listed.",
      "An address or website is missing.",
      "Opening hours have changed.",
      "A mosque is not included in the search results.",
      "Two map services show slightly different locations.",
    ],
  },
  {
    heading: "Check Before You Visit",
    paragraphs: [
      "You can use the tool to discover mosques around an area, but check important details before visiting. If you plan to travel a long distance, contact the mosque or check its official website to confirm the address and opening arrangements.",
    ],
  },
  {
    heading: "Where Does the Mosque Finder Get Its Information?",
    paragraphs: [
      "The mosque locations come from OpenStreetMap. It is a map service built and maintained by contributors around the world. Its map data includes roads, buildings, businesses and places of interest, including mosques.",
      "People can add locations and update details when information changes. This helps make local map information available across many countries, but the amount of detail varies from place to place.",
      "For example, one mosque listing may include its full address, website and opening hours. Another may only have its name and location. The tool can only show the information available in the map data.",
      "If you notice an incorrect or missing location, you can visit OpenStreetMap and check its editing options. Only suggest changes you can confirm. Do not guess a mosque's opening hours or prayer timetable.",
    ],
  },
  {
    heading: "Why Is a Nearby Mosque Missing From the Results?",
    paragraphs: [
      "There are several reasons why a mosque you know may not appear. It might not have been added to OpenStreetMap, its listing may be incomplete, or it could fall outside your chosen search distance.",
      "You might know a mosque is close by, but the search shows nothing. This does not always mean the mosque is missing. It may not have been added to the map data.",
      "Try a nearby street, postcode or area name instead. You can also increase the search distance to 5 or 10 km. If the mosque still does not appear, check Google Maps or ask someone nearby. It may not be listed in our finder.",
    ],
  },
  {
    heading: "Are Mosque Opening Hours and Prayer Times Available?",
    paragraphs: [
      "Some mosque listings include opening hours or a website, but this information is not available for every location. Even when hours are shown, they may not reflect recent changes.",
      "The Mosque Finder does not provide a confirmed live prayer timetable for each mosque. A mosque may also have its own congregation times, which can differ from general prayer times.",
      "If you plan to attend Fajr, Jumu'ah or another congregational prayer, check the mosque's own timetable. You should also contact the mosque if you need to confirm:",
    ],
    bullets: [
      "Whether it will be open at your planned arrival time.",
      "Its current prayer and congregation times.",
      "Whether it has a separate prayer area for women.",
      "Whether any facilities you need are available.",
    ],
  },
  {
    heading: "Before You Go",
    paragraphs: [
      "A quick check beforehand can save you an unnecessary journey.",
      "You can also use our Prayer Times tool to check daily prayer timings for your location. For mosque congregation times, always follow the mosque's own timetable.",
    ],
  },
  {
    heading: "Can I Use the Mosque Finder When Travelling?",
    paragraphs: [
      "Yes. You can search for mosques in your destination before or during your trip. Enter the city, neighbourhood or address where you will be staying, then choose a search distance.",
      "For example, if you are staying in Dubai, search around your hotel to see which mosques are recorded nearby. You can do the same in other cities and countries.",
      "This is useful when you are travelling for work, going on holiday or visiting Makkah and Madinah for Hajj or Umrah. You can check possible mosque locations before leaving your accommodation.",
      "If you are preparing for Umrah, use our Umrah Packing List to organise the essentials you may need during your journey.",
      "Map information is not equally complete everywhere, so do not assume every mosque will appear. Check the address and directions before travelling, and confirm opening details if you plan to attend a particular prayer.",
    ],
  },
  {
    heading: "Does the Mosque Finder Store My Location?",
    paragraphs: [
      "The tool's privacy information states that your location is used to find nearby mosques and is not stored. Your browser may still ask for permission before sharing your location with the page.",
      "If you prefer not to allow location access, use the manual search option. Enter a postcode, city, area or address instead. You can still find mosques around that place without using your current position.",
      "You can also manage location permissions through your browser. You can do this with your device settings too if you want to change which websites can access your location.",
    ],
  },
  {
    heading: "Is the Mosque Finder Free to Use?",
    paragraphs: [
      "Yes. The Mosque Finder is free to use. You do not need to pay or create an account to search for mosques.",
      "You can use the available search options, change the distance, view results on the map and open directions. You only need an internet connection to load the tool and its map results.",
    ],
  },
];

const guideSections: GuideSection[] = [
  {
    heading: "How to use the Mosque Finder",
    variant: "steps",
    items: [
      "Tap Use my location and allow access, or pick a UK city, or enter your postcode.",
      "Choose how far to search: 1, 3, 5 or 10 km.",
      "Look at the map and the list. The closest mosque is at the top.",
      "Tap Directions to open the route in Google Maps, or Show on map to zoom in.",
    ],
  },
  {
    heading: "How it helps you",
    variant: "highlight",
    items: [
      "Shows real mosques around you, not a fixed list.",
      "Works across the UK and in other countries too.",
      "Free to use, with no sign-up.",
    ],
  },
  {
    heading: "Tips for best results",
    variant: "tips",
    items: [
      "Allow location access for the most accurate results.",
      "If nothing appears, try a larger distance such as 10 km.",
      "Use your postcode if your device cannot find your location.",
    ],
  },
  {
    heading: "Good to know",
    variant: "note",
    text: "Your location is used only to find nearby mosques and is not stored. Mosque data may be incomplete, and distances are measured in a straight line, so your journey will be a little longer.",
  },
];

const faqs: FaqItem[] = [
  {
    question: "Does the Mosque Finder work on mobile phones?",
    answer:
      "Yes. Open the tool in your phone's browser and allow location access if you want to search around your current position. You can also enter a postcode or place name manually.",
  },
  {
    question: "Can I search for a mosque using a UK postcode?",
    answer:
      "Yes. Enter the postcode in the search box and choose your preferred distance. The tool will show the mosque locations recorded around that area.",
  },
  {
    question: "Does the Mosque Finder show women's prayer facilities?",
    answer:
      "It does not guarantee this information. Some mosque listings may include additional details, but you should contact the mosque to confirm whether it has a separate prayer area for women.",
  },
  {
    question: "Can I find a mosque that is open for Fajr or Isha?",
    answer:
      "You may see opening hours for some mosques, but the tool does not confirm live prayer or congregation times. Check the mosque's own timetable before visiting.",
  },
  {
    question: "Why does the Mosque Finder show fewer mosques than Google Maps?",
    answer:
      "The two services may use different map data and listings. A mosque recorded on Google Maps may not yet be included in OpenStreetMap, which supplies the location data for this tool.",
  },
  {
    question: "Can I use the Mosque Finder without GPS?",
    answer:
      "Yes. Enter a postcode, city, area or address in the search box. You do not need to share your current location.",
  },
  {
    question: "Does the Mosque Finder show every mosque in the world?",
    answer:
      "No. The results depend on mosque locations recorded in OpenStreetMap. Some mosques may be missing and others may have incomplete details.",
  },
];
const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Mosque Finder – Find Mosques Near You",
  url: "https://www.islam-religion.com/islamic-tools/mosque-finder",
  description:
    "Find mosques near you in the UK and worldwide. Search by location, postcode or city, view nearby results on a map and get directions.",
  inLanguage: "en",
  isPartOf: {
    "@type": "WebSite",
    name: "Islam Religion",
    url: "https://www.islam-religion.com/",
  },
};
export default function MosqueFinderPage() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ToolHero
        title="Find Mosques"
        highlight="Near You"
        description="Find mosques near you in the UK and worldwide, with a live map, distances and directions."
      />

      <div className="bg-warm-white">
        <section className="mx-auto max-w-5xl px-4 pb-10 sm:px-6 lg:px-8">
          <MosqueFinder />
        </section>
        <ToolGuide
          title="How to Use the Mosque Finder"
          sections={guideSections}
        />
        <ToolArticle
          title="Find a Mosque Wherever You Are"
          intro="You may be in an unfamiliar area and need to find a mosque for your next prayer. Perhaps you are travelling, visiting family or looking for a mosque closer to home. You can search online, but checking different maps and websites takes time.
Our free Mosque Finder brings available mosque locations together on one map. You can use your current location or enter a postcode, city, area or address. The tool shows nearby results in a list and on the map, making it easier to see which mosques are closest.
You can also choose how far to search, check the details available for each mosque and open directions in Google Maps. Here is how to use the tool and what you should know before relying on its results.
"
          sections={articleSections}
        />
      </div>

      <RelatedTools
        keys={[
          "prayer-times",
          "qibla-finder",
          "hijri-converter",
          "hajj-checklist",
        ]}
      />

      <ToolsFaq faqs={faqs} title="Mosque Finder" highlight="FAQs" />
    </div>
  );
}
