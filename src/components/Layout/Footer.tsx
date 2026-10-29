
import Link from "next/link"

const footerLinks = {
  guides: [
    { label: "Hajj", href: "/hajj-guide" },
    { label: "Umrah", href: "/umrah-guide" },
    { label: "Duas", href: "/duas" },
    { label: "Ziyarat", href: "/ziyarat" },
  ],
  explore: [
    { label: "Blog", href: "/blog" },
    { label: "Preparation", href: "/preparation" },
    { label: "Travel Tips", href: "/travel-tips" },
    { label: "Visa", href: "/visa" },
    { label: "Plan Your Journey", href: "/planning/estimate-cost" },
  ],
}

const bottomLinks = [
  { label: "About Us", href: "/about-us" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
]

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <h3 className="text-sm font-semibold tracking-wide text-white drop-shadow-[0_2px_8px_rgba(201,162,39,0.35)]">
        {children}
      </h3>
      <span className="mt-2 block h-[2px] w-7 rounded-full bg-gold shadow-[0_0_8px_rgba(201,162,39,0.45)]" />
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="relative bg-deep-teal text-white">
      {/* Decorative flowing wave */}
      <div className="absolute inset-x-0 top-0 -translate-y-[99%] overflow-hidden leading-[0]">
        <svg
          viewBox="0 0 1440 150"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="h-24 w-full sm:h-28 md:h-32"
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

      <div className="mx-auto max-w-7xl px-5 py-9 sm:px-6 lg:px-8 lg:py-11">

        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-y-9 lg:grid-cols-4 lg:gap-x-12 lg:gap-y-10">

          {/* Brand */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <Link
              href="/"
              className="flex w-full flex-col items-center justify-center text-center leading-none lg:items-start lg:text-left"
            >
              <span className="text-xl font-semibold tracking-tight">
                Manasik
              </span>

              <span className="mt-1.5 text-[9px] font-medium tracking-[0.25em] text-gold">
                HAJJ &amp; UMRAH <span className="text-white/50">|</span> BLOG
              </span>
            </Link>

            <p className="mt-4 max-w-sm text-center text-sm leading-6 text-white/65 lg:text-left">
              Your trusted companion for every step of your Hajj and Umrah
              journey, with authentic rituals, verified duas, and practical
              guidance.
            </p>
          </div>

          {/* Hajj & Umrah */}
          <div>
            <SectionHeading>Hajj &amp; Umrah</SectionHeading>

            <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 lg:grid-cols-1">
              {footerLinks.guides.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/65 transition-colors duration-200 hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore */}
          <div>
            <SectionHeading>Explore</SectionHeading>

            <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 lg:grid-cols-1">
              {footerLinks.explore.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/65 transition-colors duration-200 hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <SectionHeading>Get in Touch</SectionHeading>

            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm text-white/65 lg:grid-cols-1">
              <p>United Kingdom</p>

              <a
                href="tel:02012345678"
                className="transition-colors duration-200 hover:text-gold"
              >
                020 1234 5678
              </a>

              <a
                href="mailto:info@manasik.com"
                className="col-span-2 break-all transition-colors duration-200 hover:text-gold lg:col-span-1"
              >
                info@manasik.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-9 border-t border-white/10 pt-5 text-center">
          <nav className="mx-auto grid max-w-sm grid-cols-2 gap-x-4 gap-y-3 sm:flex sm:max-w-none sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-6 sm:gap-y-2">
            {bottomLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-white/55 transition-colors duration-200 hover:text-gold"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <p className="mt-4 text-xs leading-5 text-white/40">
            © {new Date().getFullYear()} Manasik. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
