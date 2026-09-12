import Link from "next/link"
import { BookOpen, ShieldCheck, HeartHandshake, ArrowRight, Compass, Backpack, HelpCircle, Map } from "lucide-react"

function HajjandUmrah() {
  return (
    <svg
      viewBox="0 0 140 340"
      className="absolute left-0 top-0 h-full w-24 pointer-events-none"
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

const features = [
  { icon: BookOpen, label: "Authentic Guides" },
  { icon: ShieldCheck, label: "Trusted Information" },
  { icon: HeartHandshake, label: "Spiritual Support" },
]

export function AyahHighlightSection() {
  return (
    <section className="relative overflow-hidden bg-card border border-soft-beige rounded-3xl mx-4 sm:mx-6 my-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center px-6 sm:px-10 py-10 lg:py-14">
        {/* Left - text */}
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald/10 text-emerald text-xs font-medium px-3 py-1.5 mb-5">
            <BookOpen className="h-3.5 w-3.5" />
            Hajj &amp; Umrah
          </span>

          <h2 className="text-3xl sm:text-4xl font-semibold text-charcoal leading-tight mb-4">
            Your Journey to{" "}
            <span className="text-emerald">Hajj &amp; Umrah</span>
          </h2>

          <p className="text-muted-teal text-base leading-relaxed mb-7 max-w-md">
            Ready with trusted guides, authentic knowledge, and everything you
            need for a blessed journey.
          </p>

          <div className="flex flex-wrap items-center gap-5 mb-8">
            {features.map((f) => {
              const Icon = f.icon
              return (
                <div key={f.label} className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-emerald/10 flex items-center justify-center shrink-0">
                    <Icon className="h-4 w-4 text-emerald" />
                  </div>
                  <span className="text-xs font-medium text-charcoal">{f.label}</span>
                </div>
              )
            })}
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-full bg-deep-teal hover:bg-dark-teal text-warm-white font-medium px-6 py-3 text-sm transition shadow-sm"
          >
            Explore Guides
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Right - card with wavy flourish */}
        <div className="relative rounded-2xl bg-warm-white border border-soft-beige overflow-hidden">
          <HajjandUmrah />

          <div className="relative pl-16 pr-6 py-7 sm:pl-20 sm:pr-8">
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

            <h3 className="text-lg font-semibold text-charcoal mb-4">
              Learn Everything Before You Leave
            </h3>

            <div className="grid grid-cols-2 gap-2.5">
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
        </div>
      </div>
    </section>
  )
}