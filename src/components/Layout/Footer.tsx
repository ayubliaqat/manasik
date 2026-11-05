import Link from "next/link"

const footerLinks = {
  knowledge: [
    { label: "Hajj Guide", href: "/hajj-guide" },
    { label: "Umrah Guide", href: "/umrah-guide" },
    { label: "Duas Insights", href: "/duas" },
    { label: "Ziyaraat Guide", href: "/ziyarat-guide" },
    { label: "Islamic Travel Tips", href: "/islamic-travel-tips" },
  ],
  tools: [
    { label: "99 Names of Allah", href: "/islamic-tools/99-names-of-allah" },
    { label: "Hajj Checklist", href: "/islamic-tools/hajj-packing-checklist" },
    { label: "Umrah Packing List", href: "/islamic-tools/umrah-packing-checklist" },
    { label: "Hijri Converter", href: "/islamic-tools/hijri-date-converter" },
    { label: "Zakat Calculator", href: "/islamic-tools/zakat-calculator" },
    { label: "Inheritance Calculator", href: "/islamic-tools/islamic-inheritance-calculator" },
  ],
  company: [
    { label: "About Us", href: "/about-us" },
    { label: "Contact", href: "/contact-us" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-&-conditions" },
  ],
}

/* Gold underline on hover, keyboard focus and tap */
const lineClass =
  "underline decoration-transparent decoration-1 underline-offset-[5px] transition-colors duration-200 hover:text-gold-light hover:decoration-gold-light focus-visible:text-gold-light focus-visible:decoration-gold-light active:decoration-gold-light"

/* Small gold dot before each link */
const linkClass = `block pl-3 -indent-3 text-[13px] leading-snug text-soft-beige/80 before:mr-2 before:inline-block before:h-1 before:w-1 before:rounded-full before:bg-gold/70 before:align-middle before:transition-colors before:duration-200 before:content-[''] hover:before:bg-gold-light ${lineClass}`

type FooterLink = {
  label: string
  href: string
}

function SectionHeading({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="mb-3.5 flex flex-col items-start">
      <h2 className="text-[13px] font-semibold tracking-wide text-white drop-shadow-[0_2px_8px_rgba(201,162,39,0.35)]">
        {children}
      </h2>

      <span className="mt-2 block h-[2px] w-7 rounded-full bg-gold shadow-[0_0_8px_rgba(201,162,39,0.45)]" />
    </div>
  )
}

function LinkColumn({
  title,
  links,
}: {
  title: string
  links: FooterLink[]
}) {
  return (
    <nav aria-label={title} className="min-w-0">
      <SectionHeading>{title}</SectionHeading>

      <ul className="flex flex-col gap-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className={linkClass}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default function Footer() {
  return (
    <footer className="relative bg-deep-teal text-white">
      {/* Decorative flowing wave */}
      <div className="absolute inset-x-0 top-0 -translate-y-[calc(100%-1px)] overflow-hidden leading-[0]">
        <svg
          viewBox="0 0 1440 150"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="block h-16 w-full sm:h-20 md:h-24"
        >
          <path
            d="
              M0 88
              C90 35, 180 35, 270 78
              C360 121, 450 126, 540 82
              C630 38, 720 32, 810 76
              C900 120, 990 126, 1080 82
              C1170 38, 1260 34, 1350 68
              C1390 82, 1420 82, 1440 72
              L1440 150
              L0 150
              Z
            "
            fill="var(--color-deep-teal)"
          />
        </svg>
      </div>

      {/* Footer content */}
      <div className="mx-auto w-full max-w-7xl px-4 pb-8 pt-4 sm:px-6 sm:pt-5 lg:px-8 lg:pb-10 lg:pt-6">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-10 lg:gap-y-9">

          {/* Brand */}
          <div className="col-span-2 flex flex-col items-center text-center sm:col-span-3 lg:col-span-1 lg:items-start lg:text-left">
            <Link
              href="/"
              className="flex w-full flex-col items-center justify-center leading-none lg:items-start"
            >
              <span className="font-heading text-2xl font-bold tracking-tight text-white">
                Islam Religion
              </span>

              <span className="mt-2 text-[9px] font-semibold tracking-[0.25em] text-gold">
                ISLAMIC TOOLS <span className="text-white/50">|</span> GUIDES
              </span>
            </Link>

            <p className="mt-3.5 max-w-sm text-center text-[13px] leading-6 text-soft-beige/85 lg:text-left">
              Islamic tools and step-by-step guides for Hajj, Umrah and daily
              worship, with authentic rituals, duas with references and
              practical planning help.
            </p>
          </div>

          {/* Knowledge */}
          <LinkColumn
            title="Knowledge"
            links={footerLinks.knowledge}
          />

          {/* Free Islamic Tools */}
          <LinkColumn
            title="Free Islamic Tools"
            links={footerLinks.tools}
          />

          {/* Company */}
          <LinkColumn
            title="Company"
            links={footerLinks.company}
          />
        </div>

        {/* Bottom */}
        <div className="mt-7 border-t border-white/10 pt-4 text-center lg:mt-8">
          <p className="text-xs leading-5 text-soft-beige/70">
            © {new Date().getFullYear()} Islam Religion. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}