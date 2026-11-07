import ToolArticle, { ArticleSection } from "@/components/Tools/tool-article"
import ToolHero from "@/components/Tools/tool-hero"
import type { Metadata } from "next"


export const metadata: Metadata = {
  title: "Terms and Conditions | Islam Religion",
  description:
    "The terms for using Islam Religion: our Islamic tools, Hajj and Umrah guides, and what you can and can't rely on them for.",
  alternates: { canonical: "/terms-&-conditions" },
}

const sections: ArticleSection[] = [
  {
    heading: "Who we are",
    paragraphs: [
      "Islam Religion (islam-religion.com) is a free website of Islamic tools and guides, written mainly with people in the UK in mind. You'll find things like a Qibla finder, prayer times, a Zakat calculator and practical Hajj and Umrah guides.",
      "In these terms, \"we\", \"us\" and \"our\" mean Islam Religion. \"You\" means anyone using the site.",
    ],
  },
  {
    heading: "Agreeing to these terms",
    paragraphs: [
      "By using this site you agree to these terms. If you don't agree with any part of them, please don't use the site. We'll never ask you to sign up or pay to use the tools, so leaving is always easy.",
      "You should also read our [Privacy Policy](/privacy-policy), which explains how we handle your information.",
    ],
  },
  {
    heading: "What the site is, and what it isn't",
    paragraphs: [
      "Everything here is general information and self-help tools. We're a small team sharing what we've learned and built, not a scholarly body, a mosque, a travel agent or a financial adviser.",
    ],
    subsections: [
      {
        heading: "Religious guidance",
        paragraphs: [
          "Our guides explain common practice, but they are not a fatwa and they don't replace a qualified scholar. Schools of thought differ on some details of Hajj, Umrah, Zakat and prayer. If your situation is unusual, or you aren't sure what applies to you, please ask a trusted scholar or your local imam.",
        ],
      },
      {
        heading: "Travel information",
        paragraphs: [
          "We don't sell, book or organise Hajj or Umrah trips, and we don't hold any travel licence. Visa rules, entry requirements, permits, health requirements and prices change often. Always check the latest position with the official Saudi Hajj and Umrah channels, the UK government's travel advice on GOV.UK, and your own travel provider before you book or travel.",
        ],
      },
      {
        heading: "Money matters",
        paragraphs: [
          "Our Zakat calculator and cost estimator give rough figures from what you enter. They aren't financial, tax or legal advice. If you have complicated assets or a large amount at stake, speak to a qualified adviser or scholar.",
        ],
      },
    ],
  },
  {
    heading: "How accurate are the tools?",
    paragraphs: [
      "We try hard to keep the tools correct, but none of them is perfect.",
    ],
    bullets: [
      "Prayer times depend on the calculation method and your location. Your local mosque's timetable is the one to follow if it differs.",
      "The Qibla direction relies on your device's location and compass. Phone compasses can be off, so double-check if the result looks wrong.",
      "Hijri dates can differ by a day depending on moon sighting and the authority you follow.",
      "Mosque details may be out of date. Please confirm opening times and facilities before you travel.",
      "Where we use a computer-generated voice for Noorani Qaida, it is only a guide. Learn correct pronunciation from a qualified teacher.",
    ],
    closing: [
      "If you spot a mistake, tell us through the [contact page](/contact-us) and we'll look into it.",
    ],
  },
  {
    heading: "Using the site fairly",
    paragraphs: ["Please use the site respectfully and lawfully. In particular, you agree not to:"],
    bullets: [
      "try to break, overload or gain unauthorised access to the site or its systems",
      "copy the site at scale with bots or scrapers without asking us first",
      "use the site to spread harmful, abusive or misleading content",
      "pretend to be us, or suggest we endorse you, when we haven't",
    ],
  },
  {
    heading: "Our content and your rights to it",
    paragraphs: [
      "The text, design, tools, code and images on this site belong to us or are used with permission, and they're protected by copyright. You're welcome to read, share links to and print pages for your own personal use.",
      "Please don't republish our content or sell it without written permission. If you'd like to quote us, a short extract with a clear link back to the page is fine.",
    ],
  },
  {
    heading: "Links to other websites",
    paragraphs: [
      "Some pages link to outside websites, such as official government pages or other resources. We don't control those sites and can't promise their content is accurate or safe. Using them is at your own risk, and they have their own terms and privacy policies.",
    ],
  },
  {
    heading: "Our responsibility to you",
    paragraphs: [
      "The site is provided free and \"as is\". We do our best, but we can't promise it will always be available, error-free or suitable for what you need.",
      "To the extent the law allows, we aren't liable for losses that come from relying on the information or tools on this site, for example a missed prayer time, a wrong estimate or a travel plan that changed. Please use your own judgement and check important details.",
      "Nothing in these terms limits liability that can't legally be limited, including liability for death or personal injury caused by negligence, for fraud, or for anything else the law of England and Wales doesn't allow us to exclude. Your statutory rights as a consumer are not affected.",
    ],
  },
  {
    heading: "Changes to the site and these terms",
    paragraphs: [
      "We may update, add or remove tools and pages at any time. We may also change these terms from time to time. When we do, we'll update the date at the top of this page. If you keep using the site after a change, that means you accept the updated terms.",
    ],
  },
  {
    heading: "Which law applies",
    paragraphs: [
      "These terms are governed by the law of England and Wales, and the courts of England and Wales can deal with any dispute. If you live in Scotland or Northern Ireland, you may also be able to bring a claim in your local courts.",
    ],
  },
  {
    heading: "Get in touch",
    paragraphs: [
      "Questions about these terms? Send us a message through our [contact page](/contact-us) and we'll get back to you. You can also read more [about us](/about-us).",
    ],
  },
]

export default function TermsAndConditionsPage() {
  return (
    <>
      <ToolHero
        title="Terms and"
        highlight="Conditions"
        description="Please take a minute to read how Islam Religion works, what our tools and guides can help with, and where you should check with a scholar or official source."
      />

      <div className="pt-8 sm:pt-10">
        <ToolArticle
          title="Terms of Use"
          highlight="Use"
          badge="Updated 7 November 2026"
          intro="These terms explain the rules for using Islam Religion. We've kept them as plain as we can, so you know what to expect from us and what we expect from you."
          sections={sections}
        />
      </div>
    </>
  )
}