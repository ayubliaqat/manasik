import type { Metadata } from "next"
import Link from "next/link"
import ToolHero from "@/components/Tools/tool-hero"
import ContactForm from "@/components/Contact/contact-form"

export const metadata: Metadata = {
  title: "Contact Us | Islam Religion",
  description:
    "Get in touch with Islam Religion. Ask a question, report a mistake in a tool or guide, or share an idea to make the site better.",
  alternates: { canonical: "/contact-us" },
}

// Change this to your real address
const CONTACT_EMAIL = "hello@islam-religion.com"

const cardClass =
  "rounded-2xl border-[1.5px] border-deep-teal/60 bg-card shadow-[inset_0_0_14px_rgba(6,63,58,0.2),0_2px_4px_rgba(6,63,58,0.1),0_12px_26px_rgba(6,63,58,0.18)]"

export default function ContactUsPage() {
  return (
    <>
      <ToolHero
        title="Contact"
        highlight="Us"
        description="Got a question, spotted a mistake or have an idea for a new tool? Send us a message and we'll get back to you as soon as we can."
      />

      <section className="mx-auto max-w-7xl px-5 pb-10 pt-8 sm:px-8 sm:pt-10 lg:px-10 xl:px-12">
        <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
          {/* Form */}
          <div className={`${cardClass} overflow-hidden lg:col-span-2`}>
            <header className="bg-deep-teal px-5 py-6 text-center sm:px-8">
              <h2 className="font-heading text-[22px] font-bold leading-[1.2] tracking-[-0.02em] sm:text-[26px]">
                <span className="text-gold-light">Send us a</span>{" "}
                <span className="text-white">message</span>
              </h2>
            </header>
            <div className="p-5 sm:p-8">
              <ContactForm />
            </div>
          </div>

          {/* Side cards */}
          <aside className="space-y-6">
            <div className={`${cardClass} p-5 sm:p-6`}>
              <h3 className="mb-2 font-heading text-lg font-semibold leading-snug text-deep-teal">
                Prefer email?
              </h3>
              <p className="text-[15px] leading-relaxed text-charcoal">
                You can write to us directly at{" "}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="font-semibold text-emerald underline decoration-gold decoration-2 underline-offset-4 transition-colors hover:text-deep-teal"
                >
                  {CONTACT_EMAIL}
                </a>
                .
              </p>
            </div>

            <div className={`${cardClass} p-5 sm:p-6`}>
              <h3 className="mb-2 font-heading text-lg font-semibold leading-snug text-deep-teal">
                Found a mistake?
              </h3>
              <p className="text-[15px] leading-relaxed text-charcoal">
                If a prayer time, date or guide looks wrong, tell us which page
                it was on and what you saw. It helps us fix it quickly.
              </p>
            </div>

            <div className={`${cardClass} p-5 sm:p-6`}>
              <h3 className="mb-2 font-heading text-lg font-semibold leading-snug text-deep-teal">
                Looking for something?
              </h3>
              <ul className="space-y-1.5 text-[15px] leading-relaxed text-charcoal">
                {[
                  { href: "/islamic-tools", label: "Islamic Tools" },
                  { href: "/hajj-guide", label: "Hajj Guide" },
                  { href: "/umrah-guide", label: "Umrah Guide" },
                  { href: "/about-us", label: "About Us" },
                ].map((link) => (
                  <li key={link.href} className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-emerald"
                    />
                    <Link
                      href={link.href}
                      className="font-semibold text-emerald underline decoration-gold decoration-2 underline-offset-4 transition-colors hover:text-deep-teal"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}