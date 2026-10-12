import type { Metadata } from "next"
import ToolHero from "@/components/Tools/tool-hero"
import QiblaFinder from "@/components/Tools/QiblaFinder"
import ToolArticle, { type ArticleSection } from "@/components/Tools/tool-article"
import ToolGuide, { type GuideSection } from "@/components/Tools/tool-guide"

export const metadata: Metadata = {
  title: "Qibla Finder | Manasik",
  description:
    "Find the Qibla direction from wherever you are. Use your location or enter coordinates, and turn on the live compass on your phone to face the Kaaba.",
}

const articleSections: ArticleSection[] = [
  {
    heading: "What is the Qibla?",
    paragraphs: [
      "The Qibla is the direction of the Kaaba in Makkah. Muslims face it in every prayer, so knowing it accurately matters wherever you are, at home, at work or on the road.",
      "When you travel for Hajj or Umrah, you will often stay in hotels or unfamiliar places where the Qibla is not marked. A quick way to find it saves time and worry before each prayer.",
    ],
  },
  {
    heading: "How the Qibla direction is worked out",
    paragraphs: [
      "The Earth is a sphere, so the shortest path to Makkah is a curve, not a straight line on a flat map. This tool calculates that shortest path from your location to the Kaaba and gives you the bearing, measured in degrees clockwise from true north.",
      "It also shows your distance to the Kaaba, so you can see how far you are from Makkah.",
    ],
  },
  {
    heading: "Ways to find your location",
    bullets: [
      "Use my location: your browser shares your position once, and the Qibla is calculated on your device.",
      "Enter coordinates: type your latitude and longitude if you prefer not to share your location, or if location is blocked.",
      "Live compass: on a phone, the dial turns as you turn, and the pointer changes colour when you are facing the Qibla.",
    ],
  },
  {
    heading: "Getting the most accurate result",
    paragraphs: [
      "Hold your phone flat and away from magnets, metal and thick cases, since these can throw the compass off. If the reading seems wrong, move your phone in a figure of 8 to recalibrate it, then try again.",
      "Compass sensors can be a few degrees out, so when you can, confirm with a local mosque or a prayer-direction marker.",
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

export default function QiblaFinderPage() {
  return (
    <div>
      <ToolHero
        title="Qibla"
        highlight="Finder"
        description="Find the direction of the Kaaba from wherever you are, with a live compass on your phone."
      />

      <div className="bg-warm-white">
        <section className="mx-auto max-w-5xl px-4 pb-10 sm:px-6 lg:px-8">
          <QiblaFinder />
        </section>

        <ToolArticle
          title="Find the Qibla Wherever You Are"
          intro="A simple explanation of the Qibla, how its direction is calculated, and how to get the most accurate result."
          sections={articleSections}
        />

        <ToolGuide title="How to Use the Qibla Finder" sections={guideSections} />
      </div>
    </div>
  )
}