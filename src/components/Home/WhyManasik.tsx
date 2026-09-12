import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  HeartHandshake,
  ShieldCheck,
} from "lucide-react";

const highlights = [
  {
    icon: ShieldCheck,
    title: "Guidance you can trust",
    description:
      "Built around authentic Islamic sources and carefully considered practical guidance.",
    accent: "emerald",
  },
  {
    icon: BookOpenCheck,
    title: "Clarity before complexity",
    description:
      "Clear explanations that help you understand what to do, when to do it, and why it matters.",
    accent: "gold",
  },
  {
    icon: HeartHandshake,
    title: "Made for real pilgrims",
    description:
      "Practical preparation for the questions, decisions, and moments that arise along the journey.",
    accent: "emerald",
  },
];

export default function WhyManasik() {
  return (
    <section className="relative overflow-hidden bg-warm-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          {/* Image */}
          <div className="relative">
            <div
              className="absolute -left-3 top-8 h-28 w-[2px] rounded-full bg-gold sm:-left-5 sm:h-36"
              aria-hidden="true"
            />

            <div
              className="absolute -bottom-4 -right-4 h-28 w-28 rounded-br-[3rem] border-b-2 border-r-2 border-gold/50 sm:-bottom-5 sm:-right-5 sm:h-36 sm:w-36"
              aria-hidden="true"
            />

            <div className="relative overflow-hidden rounded-[2rem] border border-soft-beige bg-card p-2.5 shadow-[0_20px_55px_rgba(6,63,58,0.14)] sm:p-3">
              <div className="relative aspect-[4/4.3] overflow-hidden rounded-[1.5rem]">
                <Image
                  src="/images/home-banner-image.png"
                  alt="Pilgrims at Masjid al-Haram in Makkah"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-deep-teal/45 via-transparent to-transparent" />

                <div className="absolute bottom-5 left-5">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-deep-teal/75 px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white shadow-lg backdrop-blur-md">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                    Your Journey Matters
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="max-w-2xl">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-9 bg-gold" />

              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold">
                Why Manasik
              </span>
            </div>

            <h2 className="font-heading text-3xl font-bold leading-[1.12] tracking-tight text-deep-teal sm:text-4xl lg:text-[46px]">
              Prepare with knowledge.
              <span className="mt-1 block text-emerald">
                Worship with confidence.
              </span>
            </h2>

            <p className="mt-5 max-w-xl text-base leading-7 text-muted-teal sm:text-[17px]">
              A sacred journey deserves more than scattered information.
              Manasik brings together{" "}
              <span className="font-semibold text-deep-teal underline decoration-gold decoration-2 underline-offset-4">
                authentic guidance
              </span>
              , practical preparation, and thoughtful explanations — so you
              can spend less time wondering what comes next and more time
              focused on your worship.
            </p>

            {/* Simple highlights */}
            <div className="mt-8 space-y-5">
              {highlights.map(
                ({ icon: Icon, title, description, accent }) => {
                  const isGold = accent === "gold";

                  return (
                    <div
                      key={title}
                      className="group flex gap-4 transition-transform duration-300 hover:translate-x-1"
                    >
                      <div
                        className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                          isGold
                            ? "bg-gold/10 text-gold"
                            : "bg-emerald/10 text-emerald"
                        }`}
                      >
                        <Icon
                          className="h-[17px] w-[17px]"
                          strokeWidth={1.8}
                        />
                      </div>

                      <div>
                        <h3 className="text-sm font-bold text-deep-teal sm:text-[15px]">
                          {title}
                        </h3>

                        <p className="mt-1 max-w-lg text-xs leading-5 text-muted-teal sm:text-[13px]">
                          {description}
                        </p>
                      </div>
                    </div>
                  );
                }
              )}
            </div>

            {/* CTA */}
            <div className="mt-8">
              <Link
                href="/about-us"
                className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-emerald/20 bg-deep-teal px-5 py-2.5 text-[13px] font-semibold text-white shadow-[0_4px_0_rgba(2,51,47,0.7),0_10px_22px_rgba(6,63,58,0.16)] transition-all duration-300 hover:-translate-y-1 hover:bg-emerald hover:shadow-[0_5px_0_rgba(5,118,82,0.8),0_14px_28px_rgba(8,127,91,0.22)] active:translate-y-[1px] focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-warm-white"
              >
                Discover Our Approach
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
