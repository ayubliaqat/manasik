import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[430px] overflow-hidden sm:min-h-[470px] lg:min-h-[500px]">
      {/* Background image */}
      <Image
        src="/images/home-banner-image.png"
        alt="Masjid al-Haram in Makkah"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Brand overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-deep-teal/80 via-deep-teal/50 to-deep-teal/10" />

      <div className="absolute inset-0 bg-gradient-to-t from-deep-teal/25 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex min-h-[430px] items-center -translate-y-4 sm:min-h-[470px] sm:-translate-y-5 lg:min-h-[500px] lg:-translate-y-6">
        <div className="mx-auto w-full max-w-[1400px] px-5 py-10 sm:px-8 sm:py-12 lg:px-16 xl:px-20">
          <div className="max-w-[570px]">
            {/* Heading */}
            <h1
              className="hero-from-left font-serif text-[34px] font-semibold
             leading-[1.08] tracking-[-0.02em] text-white
             drop-shadow-[0_3px_2px_rgba(0,0,0,0.35)]
             sm:text-[46px]
             lg:text-[56px]"
            >
              Guidance for
              <span
                className="mt-1 block text-emerald
               drop-shadow-[0_3px_3px_rgba(0,0,0,0.32)]"
              >
                Your Spiritual Journey
              </span>
            </h1>

            {/* Gold accent */}
            <div
              className="hero-from-left my-4 flex items-center gap-2 sm:my-5"
              style={{ animationDelay: "0.25s" }}
            >
              <span className="h-[2px] w-12 rounded-full bg-gold sm:w-14" />
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            </div>

            {/* Description */}
            <p
              className="hero-from-right max-w-[510px] text-[14px]
                         leading-6 text-white/90
                         sm:text-[16px] sm:leading-7"
              style={{ animationDelay: "0.45s" }}
            >
              Practical guides, tips and inspiring stories to help you prepare
              for{" "}
              <span className="font-medium text-white underline decoration-gold decoration-2 underline-offset-4">
                Hajj and Umrah
              </span>{" "}
              with confidence.
            </p>

            {/* CTA buttons */}
            <div
              className="hero-from-left mt-6 flex flex-wrap items-center gap-3 sm:mt-7 sm:gap-4"
              style={{ animationDelay: "0.65s" }}
            >
              {/* Primary */}
              {/* Primary — Emerald */}
              <Link
                href="/blog"
                className="group inline-flex min-h-11 items-center justify-center
             gap-2 rounded-full
             border border-emerald/80
             bg-emerald
             px-5 py-2.5
             text-[13px] font-semibold text-white
             shadow-[0_3px_0_#056b4d,0_8px_18px_rgba(6,63,58,0.28)]
             transition-all duration-300
             hover:-translate-y-1
             hover:bg-rich-emerald
             hover:shadow-[0_4px_0_#047852,0_13px_25px_rgba(6,63,58,0.32)]
             active:translate-y-[1px]
             active:shadow-[0_2px_0_#056b4d,0_4px_10px_rgba(6,63,58,0.22)]
             focus:outline-none
             focus:ring-2 focus:ring-gold
             focus:ring-offset-2 focus:ring-offset-deep-teal
             sm:px-6 sm:text-sm"
              >
                Explore Guides
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              {/* Secondary — Glass with Gold Accent */}
            <Link
  href="/hajj-guide"
  className="group inline-flex min-h-11 items-center justify-center
             gap-2 rounded-full
             border border-gold/70
             bg-white/10
             px-5 py-2.5
             text-[13px] font-semibold text-white
             shadow-[0_3px_0_rgba(150,115,25,0.55),0_8px_18px_rgba(0,0,0,0.20)]
             backdrop-blur-md
             transition-all duration-300
             hover:-translate-y-1
             hover:border-gold
             hover:bg-deep-teal/85
             hover:text-white
             hover:shadow-[0_4px_0_rgba(150,115,25,0.7),0_13px_25px_rgba(201,162,39,0.20)]
             active:translate-y-[1px]
             active:shadow-[0_2px_0_rgba(150,115,25,0.55),0_4px_10px_rgba(0,0,0,0.18)]
             focus:outline-none
             focus:ring-2 focus:ring-gold
             focus:ring-offset-2 focus:ring-offset-deep-teal
             sm:px-6 sm:text-sm"
>
  <Compass
    size={16}
    className="text-gold transition-transform duration-300 group-hover:rotate-6"
  />
  View Hajj Guide
</Link>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
