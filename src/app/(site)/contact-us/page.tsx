import type { Metadata } from "next"
import { Bug, Lightbulb, LifeBuoy, Mail } from "lucide-react"
import ToolHero from "@/components/Tools/tool-hero"
import ContactForm from "@/components/Contact/contact-form"

export const metadata: Metadata = {
  title: "Contact Us | Islam Religion",
  description:
    "Get in touch with Islam Religion. Ask for help, report a mistake in a tool or guide, or share an idea to make the site better.",
  alternates: { canonical: "/contact-us" },
}

// Change this to your real address
const CONTACT_EMAIL = "hello@islam-religion.com"

const linkClass =
  "font-semibold text-emerald underline decoration-gold decoration-2 underline-offset-4 transition-colors hover:text-deep-teal"

const items = [
  {
    Icon: LifeBuoy,
    title: "Need help?",
    text: "Stuck with a tool or can't find a guide? Tell us what you were trying to do.",
    tone: "bg-emerald/10 text-emerald",
  },
  {
    Icon: Lightbulb,
    title: "Have a suggestion?",
    text: "Got an idea for a new tool or a topic you'd like us to cover? We'd love to hear it.",
    tone: "bg-gold/20 text-deep-teal",
  },
  {
    Icon: Bug,
    title: "Found a mistake?",
    text: "Tell us which page it was on and what you saw, and we'll fix it.",
    tone: "bg-emerald/10 text-emerald",
  },
]

export default function ContactUsPage() {
  return (
    <>
      <ToolHero
        title="Contact"
        highlight="Us"
        description="Got a question, spotted a mistake or have an idea for a new tool? Send us a message and we'll get back to you."
      />

      <section className="mx-auto max-w-7xl px-5 pb-10 pt-6 sm:px-8 lg:px-10 xl:px-12">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Text: left */}
          <div className="space-y-5 text-sm leading-relaxed text-charcoal">
            <h2 className="font-heading text-lg font-semibold leading-snug text-deep-teal sm:text-xl">
              We&apos;re happy to help
            </h2>

            {items.map(({ Icon, title, text, tone }) => (
              <div key={title} className="flex items-start gap-3">
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${tone}`}
                >
                  <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-heading text-base font-semibold text-deep-teal">
                    {title}
                  </h3>
                  <p className="mt-0.5">{text}</p>
                </div>
              </div>
            ))}

            <div className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold/20 text-deep-teal">
                <Mail className="h-[18px] w-[18px]" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-heading text-base font-semibold text-deep-teal">
                  Prefer email?
                </h3>
                <p className="mt-0.5">
                  Write to us at{" "}
                  <a href={`mailto:${CONTACT_EMAIL}`} className={linkClass}>
                    {CONTACT_EMAIL}
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Form: right */}
          <div>
            <h2 className="mb-4 font-heading text-lg font-semibold leading-snug text-deep-teal sm:text-xl">
              Send us a message
            </h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  )
}