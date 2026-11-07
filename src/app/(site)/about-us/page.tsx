import type { Metadata } from "next"
import Link from "next/link"
import ToolArticle, { type ArticleSection } from "@/components/Tools/tool-article"
import ToolGuide, { type GuideSection } from "@/components/Tools/tool-guide"
import ToolHero from "@/components/Tools/tool-hero"

export const metadata: Metadata = {
  title: "About Us | Islam Religion",
  description:
    "Islam Religion is a free home for Islamic tools and clear Hajj and Umrah guides, built with Muslims in the UK in mind.",
  alternates: { canonical: "/about-us" },
}

const guideSections: GuideSection[] = [
  {
    heading: "How to use Islam Religion",
    variant: "steps",
    items: [
      "Pick the tool you need today, from prayer times to the Zakat calculator.",
      "Read the guide that goes with it if you want the full picture.",
      "Plan ahead for Hajj or Umrah with our checklists and travel tips.",
      "Message us if something looks wrong or you have an idea.",
    ],
  },
  {
    heading: "What we stand for",
    variant: "highlight",
    items: [
      "Free to use, with no account and no paywall.",
      "Clear, honest wording instead of jargon.",
      "Respect for your privacy, and no selling of your data.",
      "Saying so when something is an estimate or needs a scholar.",
    ],
  },
  {
    heading: "Good to know",
    variant: "tips",
    items: [
      "Everything works on your phone, so you can use it anywhere.",
      "Start the Hajj and Umrah checklists well before you travel.",
      "Spotted a mistake? Tell us and we'll fix it.",
    ],
  },
  {
    heading: "A quick note",
    variant: "note",
    text: "Islam Religion shares general information and practical tools. It isn't a source of fatwas and it doesn't replace a qualified scholar or your local imam. For rulings specific to you, and for official travel requirements, always check with a scholar and the official sources.",
  },
]

const articleSections: ArticleSection[] = [
  {
    heading: "Why we built Islam Religion",
    paragraphs: [
      "Most of us have been there. You need the prayer time for your town, the direction of the Qibla in a hotel room, or a straight answer about what to pack for Umrah. You end up with ten tabs open, half of them full of adverts, and still aren't sure which one to trust.",
      "We built Islam Religion to fix that. It's one calm, free place with the tools and guides people actually use, written in plain English and designed for Muslims living in the UK.",
    ],
  },
  {
    heading: "What you'll find here",
    paragraphs: ["Everything on the site falls into two groups."],
    subsections: [
      {
        heading: "Islamic tools",
        paragraphs: [
          "Simple, free tools for daily life and worship, such as the Qibla finder, prayer times, Tasbih counter, Hijri date converter, Zakat calculator and Hajj and Umrah checklists. You can browse them all on the [Islamic Tools](/islamic-tools) page.",
        ],
      },
      {
        heading: "Guides that explain things properly",
        paragraphs: [
          "Step-by-step help for pilgrims, from the [Hajj Guide](/hajj-guide) and [Umrah Guide](/umrah-guide) to [duas](/duas), [Ziyaraat](/ziyaraat-guide) and [travel tips](/travel-tips). Our [blog](/blog) goes deeper on the questions people ask us most.",
        ],
      },
    ],
  },
  {
    heading: "How we make things",
    paragraphs: [
      "We start with a real question people ask, not with what we think looks impressive. Then we build it as simply as we can, so it works on any phone without fuss.",
      "We check everything carefully, especially anything linked to worship or travel, and we keep improving it. Your messages help us decide what comes next.",
    ],
  },
  {
    heading: "Who it's for",
    paragraphs: [
      "First-time pilgrims who don't know where to begin. Families planning a trip for the first time. Anyone who just wants a reliable tool without signing up or paying. If that sounds like you, you're in the right place.",
    ],
  },
]

export default function AboutUsPage() {
  return (
    <>
      <ToolHero
        title="About"
        highlight="Islam Religion"
        description="Free Islamic tools and clear Hajj and Umrah guides, made to help you worship with confidence and plan with ease."
      />

      <div className="pt-8 sm:pt-10">
        <ToolGuide title="What we're about" sections={guideSections} />
      </div>

      <ToolArticle
        title="Our Story"
        highlight="Story"
        badge="Who we are"
        intro="Islam Religion is an independent project made for the everyday needs of Muslims in the UK. Here's what we do and why."
        sections={articleSections}
      />

      {/* Closing call to action */}
      <section className="mx-auto max-w-7xl px-5 pb-12 sm:px-8 lg:px-10 xl:px-12">
        <div className="relative overflow-hidden rounded-2xl bg-deep-teal px-5 py-10 text-center sm:px-8 sm:py-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[120%] -translate-x-1/2 rounded-[0_0_50%_50%] bg-white/[0.04]"
          />
          <div className="relative">
            <h2 className="font-heading text-2xl font-bold leading-tight tracking-[-0.02em] sm:text-3xl">
              <span className="text-gold-light">Ready to</span>{" "}
              <span className="text-white">get started?</span>
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/80">
              Try a tool, read a guide, or send us an idea. We&apos;re glad
              you&apos;re here.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/islamic-tools"
                className="inline-flex items-center justify-center rounded-full bg-gold px-6 py-2.5 text-sm font-semibold text-deep-teal transition-colors hover:bg-gold-light"
              >
                Explore the tools
              </Link>
              <Link
                href="/contact-us"
                className="inline-flex items-center justify-center rounded-full border border-white/40 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}