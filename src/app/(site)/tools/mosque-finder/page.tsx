import type { Metadata } from "next"
import ToolHero from "@/components/Tools/tool-hero"
import MosqueFinder from "@/components/Tools/MosqueFinder"
import ToolArticle, { type ArticleSection } from "@/components/Tools/tool-article"
import ToolGuide, { type GuideSection } from "@/components/Tools/tool-guide"

export const metadata: Metadata = {
  title: "Mosque Finder UK | Manasik",
  description:
    "Find mosques near you in the UK and around the world. Use your location or a postcode to see nearby mosques on a live map, with distances and directions.",
}

const articleSections: ArticleSection[] = [
  {
    heading: "Find a mosque near you",
    paragraphs: [
      "Whether you are at home, at work, travelling across the UK or on Hajj and Umrah, knowing where the nearest mosque is makes it easier to pray on time and in congregation.",
      "This tool uses your location, a UK postcode or a city to search for mosques around you on a live map. Results are sorted by distance, with a link to directions for each one.",
    ],
  },
  {
    heading: "What you get",
    bullets: [
      "Live results for your area, using your device location, a UK postcode or a popular UK city.",
      "A map with every mosque marked, and a list sorted from nearest to furthest.",
      "Search distances of 1, 3, 5 or 10 km.",
      "Address, opening hours and website where the mosque has shared them.",
      "Directions in Google Maps with one tap.",
    ],
  },
  {
    heading: "Where the information comes from",
    paragraphs: [
      "Mosque locations come from OpenStreetMap, a map built by contributors worldwide. Some mosques have full details and others only a name and a pin, and a few may be missing or out of date. Please confirm opening and prayer times with the mosque before you travel.",
    ],
  },
]

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
]

export default function MosqueFinderPage() {
  return (
    <div>
      <ToolHero
        title="Mosque"
        highlight="Finder"
        description="Find mosques near you in the UK and worldwide, with a live map, distances and directions."
      />

      <div className="bg-warm-white">
        <section className="mx-auto max-w-5xl px-4 pb-10 sm:px-6 lg:px-8">
          <MosqueFinder />
        </section>

        <ToolArticle
          title="Find a Mosque Wherever You Are"
          intro="How the mosque finder works, what it shows, and how to get the most from it."
          sections={articleSections}
        />

        <ToolGuide title="How to Use the Mosque Finder" sections={guideSections} />
      </div>
    </div>
  )
}