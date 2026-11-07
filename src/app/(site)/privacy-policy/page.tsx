import type { Metadata } from "next"
import ToolArticle, { type ArticleSection } from "@/components/Tools/tool-article"
import ToolHero from "@/components/Tools/tool-hero"

export const metadata: Metadata = {
  title: "Privacy Policy | Islam Religion",
  description:
    "How Islam Religion collects, uses and protects your information, and the rights you have under UK data protection law.",
  alternates: { canonical: "/privacy-policy" },
}

const sections: ArticleSection[] = [
  {
    heading: "The short version",
    bullets: [
      "You don't need an account to use our tools.",
      "We don't sell your personal information. Ever.",
      "We only ask for what we need to run the site and answer your messages.",
      "You can ask us what we hold about you, and ask us to delete it, at any time.",
    ],
  },
  {
    heading: "Who is responsible for your data",
    paragraphs: [
      "Islam Religion (islam-religion.com) is responsible for the personal information collected through this site. We follow the UK GDPR and the Data Protection Act 2018. If you have any question about your data, use our [contact page](/contact-us).",
    ],
  },
  {
    heading: "What we collect",
    subsections: [
      {
        heading: "Things you send us",
        paragraphs: [
          "If you contact us, we receive your name, email address and whatever you write in your message. We use it to reply to you, and nothing else.",
        ],
      },
      {
        heading: "Your location, only if you allow it",
        paragraphs: [
          "Some tools, such as the Qibla finder, prayer times and mosque finder, work better with your location. Your browser always asks your permission first. You can say no and enter a place by hand instead, or change your mind at any time in your browser settings.",
        ],
      },
      {
        heading: "Things saved on your device",
        paragraphs: [
          "Some tools remember your choices, such as your chosen region or your Tasbih count, so you don't have to start again. This is kept in your own browser, and you can clear it whenever you like from your browser settings.",
        ],
      },
      {
        heading: "Basic visit information",
        paragraphs: [
          "Like most websites, our servers and hosting providers record technical details when you visit, such as your IP address, browser type, device, the pages you open and when. We use this to keep the site secure and working, and to see which pages and tools people find useful.",
        ],
      },
    ],
  },
  {
    heading: "Why we use your information",
    paragraphs: [
      "UK law asks us to have a lawful reason for using personal data. Ours are:",
    ],
    bullets: [
      "Answering your messages, because you asked us to (taking steps at your request).",
      "Running, securing and improving the site, because it's in our legitimate interest to keep a safe and useful service.",
      "Using your location in a tool, because you gave your consent when your browser asked.",
      "Meeting legal duties, if the law ever requires it.",
    ],
  },
  {
    heading: "Cookies",
    paragraphs: [
      "Cookies are small files a website stores on your device. We use the ones the site needs to work properly. Where we use anything beyond that, such as analytics, we'll ask for your consent first where the law requires it, and you can switch it off again.",
      "You can also block or delete cookies in your browser settings. Some parts of the site may not work as well if you do.",
    ],
  },
  {
    heading: "Who else sees your information",
    paragraphs: [
      "We don't sell or rent your data. We only share it with the companies that help us run the site, such as our hosting and infrastructure providers and any analytics service we use. They can only use it to provide their service to us, and we ask them to protect it.",
      "Some of these providers are based outside the UK. When that happens, we make sure appropriate safeguards are in place, such as approved contract terms, so your data stays protected.",
      "We may also share information if the law or a court requires it.",
    ],
  },
  {
    heading: "How long we keep it",
    paragraphs: [
      "We keep messages only as long as we need them to deal with your question and for a reasonable time afterwards in case you follow up. Technical logs are kept for a short period for security and are then removed or anonymised. If you ask us to delete something sooner, we will, unless the law says we must keep it.",
    ],
  },
  {
    heading: "Your rights",
    paragraphs: ["Under UK data protection law, you can ask us to:"],
    bullets: [
      "tell you what personal data we hold about you and give you a copy",
      "correct anything that's wrong or out of date",
      "delete your data",
      "limit or stop how we use it",
      "move your data to another service in a usable format",
      "stop using it for something we do because of our legitimate interest",
      "withdraw your consent whenever our use of your data is based on it",
    ],
    closing: [
      "To use any of these rights, just [contact us](/contact-us). We'll normally reply within one month.",
      "If you aren't happy with how we've handled your data, you can complain to the Information Commissioner's Office (ICO) at ico.org.uk or on 0303 123 1113. We'd appreciate the chance to put things right first, but you don't have to go through us.",
    ],
  },
  {
    heading: "Keeping your data safe",
    paragraphs: [
      "We use sensible technical and organisational measures to protect your information, including secure connections (HTTPS) and limited access. No website can promise perfect security, but we take it seriously and we'll act quickly if something goes wrong.",
    ],
  },
  {
    heading: "Children",
    paragraphs: [
      "The site is open to everyone and our tools are useful for families, but we don't knowingly collect personal information from children under 13. If you think a child has sent us their details, let us know and we'll delete them.",
    ],
  },
  {
    heading: "Changes to this policy",
    paragraphs: [
      "If we change how we handle your data, we'll update this page and the date at the top. Please look back now and then. For anything important, we'll make the change clear on the site.",
    ],
  },
  {
    heading: "Questions?",
    paragraphs: [
      "We're happy to explain anything here in plain words. Reach us through the [contact page](/contact-us), or read our [Terms and Conditions](/terms-&-conditions) for the rules of using the site.",
    ],
  },
]

export default function PrivacyPolicyPage() {
  return (
    <>
      <ToolHero
        title="Privacy"
        highlight="Policy"
        description="Here's what information Islam Religion collects, why we need it, and the control you have over it, explained in plain English."
      />

      <div className="pt-8 sm:pt-10">
        <ToolArticle
          title="How We Handle Your Data"
          highlight="Your Data"
          badge="Updated 7 November 2026"
          intro="We built this site to help people with their worship and travel plans, not to collect data. This page explains exactly what we do with the little information we do receive."
          sections={sections}
        />
      </div>
    </>
  )
}