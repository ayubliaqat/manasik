import Link from "next/link"

const footerLinks = {
  guides: [
    { label: "Hajj Guide", href: "/hajj-guide" },
    { label: "Umrah Guide", href: "/umrah-guide" },
    { label: "Visa Guide", href: "/visa" },
    { label: "Duas", href: "/duas" },
    { label: "Ziyarat", href: "/ziyarat" },
  ],
  explore: [
    { label: "Tools", href: "/tools" },
    { label: "Blog", href: "/blog" },
    { label: "Preparation", href: "/preparation" },
    { label: "Travel Tips", href: "/travel-tips" },
    { label: "Plan Your Journey", href: "/planning/estimate-cost" },
  ],
}

const bottomLinks = [
  { label: "About Us", href: "/about-us" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
]

/* Gold line appears below a link on hover, keyboard focus and tap */
const lineClass =
  "underline decoration-transparent decoration-1 underline-offset-[6px] transition-colors duration-200 hover:text-gold-light hover:decoration-gold-light focus-visible:text-gold-light focus-visible:decoration-gold-light active:decoration-gold-light"

const linkClass = `text-sm text-soft-beige/80 ${lineClass}`

function SectionHeading({
  children,
  centerOnMobile = false,
}: {
  children: React.ReactNode
  centerOnMobile?: boolean
}) {
  return (
    <div
      className={`mb-4 flex flex-col ${
        centerOnMobile ? "items-center lg:items-start" : "items-start"
      }`}
    >
      <h2 className="text-sm font-semibold tracking-wide text-white drop-shadow-[0_2px_8px_rgba(201,162,39,0.35)]">
        {children}
      </h2>
      <span className="mt-2 block h-[2px] w-7 rounded-full bg-gold shadow-[0_0_8px_rgba(201,162,39,0.45)]" />
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="relative bg-deep-teal text-white">
      {/* Decorative flowing wave (overlaps the footer by 1px so no hairline can show) */}
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

      <div className="mx-auto max-w-7xl px-5 pb-9 pt-4 sm:px-6 sm:pt-5 lg:px-8 lg:pb-11 lg:pt-6">
        {/* Main Footer: phone/tablet = brand, 2 equal columns, contact. Desktop = 4 columns */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 px-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-12 lg:gap-y-10 lg:px-0">
          {/* Brand */}
          <div className="col-span-2 flex flex-col items-center text-center lg:col-span-1 lg:items-start lg:text-left">
            <Link
              href="/"
              className="flex w-full flex-col items-center justify-center text-center leading-none lg:items-start lg:text-left"
            >
              <span className="font-heading text-xl font-semibold tracking-tight">
                Islam Religion
              </span>

              <span className="mt-1.5 text-[9px] font-medium tracking-[0.25em] text-gold">
                HAJJ &amp; UMRAH <span className="text-white/50">|</span> GUIDES
              </span>
            </Link>

            <p className="mt-4 max-w-sm text-center text-sm leading-6 text-soft-beige/85 lg:text-left">
              Islamic tools and step-by-step guides for Hajj, Umrah and daily
              worship, with authentic rituals, duas with references and
              practical planning help.
            </p>
          </div>

          {/* Hajj & Umrah */}
          <div className="w-fit justify-self-start text-left md:justify-self-center lg:w-auto lg:justify-self-stretch">
            <SectionHeading>Hajj &amp; Umrah</SectionHeading>

            <ul className="flex flex-col items-start gap-2.5">
              {footerLinks.guides.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore */}
          <div className="w-fit justify-self-start text-left md:justify-self-center lg:w-auto lg:justify-self-stretch">
            <SectionHeading>Explore</SectionHeading>

            <ul className="flex flex-col items-start gap-2.5">
              {footerLinks.explore.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 text-center lg:col-span-1 lg:text-left">
            <SectionHeading centerOnMobile>Get in Touch</SectionHeading>

            <div className="flex flex-col items-center gap-2.5 text-sm text-soft-beige/80 lg:items-start">
              <p>United Kingdom</p>

              <a href="tel:02012345678" className={lineClass}>
                020 1234 5678
              </a>

              <a
                href="mailto:info@islam-religion.com"
                className={`break-all ${lineClass}`}
              >
                info@islam-religion.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 border-t border-white/10 pt-5 text-center lg:mt-9">
          <nav
            aria-label="Footer navigation"
            className="mx-auto grid max-w-sm grid-cols-2 gap-x-4 gap-y-3 sm:flex sm:max-w-none sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-6 sm:gap-y-2"
          >
            {bottomLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs text-soft-beige/70 ${lineClass}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <p className="mt-4 text-xs leading-5 text-soft-beige/70">
            © {new Date().getFullYear()} Islam Religion. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}