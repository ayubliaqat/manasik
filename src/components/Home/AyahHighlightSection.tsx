import Link from "next/link"
import { Compass, Backpack, HelpCircle, Map } from "lucide-react"

function WavyFlourish() {
  return (
    <svg
      viewBox="0 0 140 340"
      className="absolute left-0 top-0 h-full w-28 pointer-events-none"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="wavyGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--color-deep-teal)" />
          <stop offset="100%" stopColor="var(--color-emerald)" />
        </linearGradient>
      </defs>
      <path
        d="M0,0 L60,0 C90,60 30,110 70,170 C100,220 40,280 60,340 L0,340 Z"
        fill="url(#wavyGrad)"
      />
      <path
        d="M0,0 L60,0 C90,60 30,110 70,170 C100,220 40,280 60,340 L0,340 Z"
        fill="none"
        stroke="var(--color-gold)"
        strokeWidth="1.5"
        opacity="0.5"
      />
    </svg>
  )
}

const quickLinks = [
  { icon: Compass, label: "Umrah Guide", href: "/blog?category=umrah" },
  { icon: Map, label: "Hajj Guide", href: "/blog?category=hajj" },
  { icon: Backpack, label: "Packing Checklist", href: "/blog?tag=packing" },
  { icon: HelpCircle, label: "FAQs", href: "/blog?tag=faq" },
]

export function AyahHighlightSection() {
  return (
    <section className="relative rounded-3xl bg-warm-white border border-soft-beige overflow-hidden mx-4 sm:mx-6 my-6">
      <WavyFlourish />

      <div className="relative pl-20 pr-6 py-8 sm:pl-28 sm:pr-10 sm:py-10">
        <p
          dir="rtl"
          lang="ar"
          className="text-charcoal text-xl sm:text-2xl leading-relaxed mb-2"
          style={{ fontFamily: "'Traditional Arabic', 'Scheherazade New', serif" }}
        >
          وَأَتِمُّوا الْحَجَّ وَالْعُمْرَةَ لِلَّهِ
        </p>
        <p className="text-muted-teal text-sm leading-relaxed mb-1">
          &quot;And complete the Hajj and Umrah for Allah.&quot;
        </p>
        <p className="text-gold text-xs font-medium tracking-wide mb-6">
          Surah Al-Baqarah, 2:196
        </p>

        <h3 className="text-lg sm:text-xl font-semibold text-charcoal mb-4">
          Learn Everything Before You Leave
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {quickLinks.map((link) => {
            const Icon = link.icon
            return (
              <Link
                key={link.label}
                href={link.href}
                className="flex items-center gap-2 rounded-xl bg-card border border-soft-beige hover:border-emerald/40 px-3 py-2.5 transition"
              >
                <div className="h-7 w-7 rounded-lg bg-emerald/10 flex items-center justify-center shrink-0">
                  <Icon className="h-3.5 w-3.5 text-emerald" />
                </div>
                <span className="text-xs font-medium text-charcoal">{link.label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}