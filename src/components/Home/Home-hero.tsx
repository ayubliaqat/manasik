import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[450px] overflow-hidden sm:min-h-[480px] lg:min-h-[500px]">
      {/* Background image */}
      <Image
        src="/images/home-banner-image.png"
        alt="Masjid al-Haram in Makkah"
        fill
        priority
        className="object-cover object-[65%_center] sm:object-center"
        sizes="100vw"
      />

      {/* Brand overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-deep-teal/80 via-deep-teal/50 to-deep-teal/10" />

      <div className="absolute inset-0 bg-gradient-to-t from-deep-teal/25 via-transparent to-transparent" />

      {/* Bismillah — centered at top */}
      <div className="absolute left-0 right-0 top-5 z-20 flex flex-col items-center sm:top-6 lg:top-7">
        <p
          dir="rtl"
          lang="ar"
          className="font-serif text-[19px] font-medium leading-tight text-gold drop-shadow-[0_2px_2px_rgba(0,0,0,0.4)] sm:text-[22px]"
        >
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
        </p>

        {/* Wavy line */}
        <svg
          aria-hidden="true"
          viewBox="0 0 180 12"
          preserveAspectRatio="none"
          fill="none"
          className="mt-1 h-1.5 w-28 text-gold sm:w-32"
        >
          <path
            d="M2 6 Q12 1 22 6 T42 6 T62 6 T82 6 T102 6 T122 6 T142 6 T162 6 T178 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-[450px] items-center sm:min-h-[480px] lg:min-h-[500px]">
        <div className="mx-auto w-full max-w-[1400px] px-5 py-20 sm:px-8 sm:py-24 lg:px-16 lg:py-20 xl:px-20">
          <div className="max-w-[570px] text-center lg:text-left">
            {/* Heading */}
            <h1
              className="hero-from-left font-serif text-[32px] font-semibold
              leading-[1.08] tracking-[-0.02em] text-white
              drop-shadow-[0_3px_2px_rgba(0,0,0,0.35)]
              sm:text-[44px]
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
              className="hero-from-left my-3 flex items-center justify-center gap-2 sm:my-4 lg:justify-start"
              style={{ animationDelay: "0.25s" }}
            >
              <span className="h-[2px] w-11 rounded-full bg-gold sm:w-14" />
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            </div>

            {/* Description */}
            <p
              className="hero-from-right mx-auto max-w-[510px] text-[14px]
              leading-6 text-white/90
              sm:text-[15px] sm:leading-6 lg:mx-0"
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
              className="hero-from-left mt-5 flex flex-col items-stretch gap-2.5 sm:mt-6 sm:flex-row sm:items-center sm:gap-4"
              style={{ animationDelay: "0.65s" }}
            >
              {/* Primary */}
              <Link
                href="/blog"
                className="group inline-flex min-h-11 w-full items-center justify-center
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
                sm:w-auto sm:px-6 sm:text-sm"
              >
                Explore Blogs
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              {/* Secondary */}
              <Link
                href="/tools"
                className="group inline-flex min-h-11 w-full items-center justify-center
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
                focus:ring-offset-2
                focus:ring-offset-deep-teal
                sm:w-auto sm:px-6 sm:text-sm"
              >
                <Compass
                  size={16}
                  className="text-gold transition-transform duration-300 group-hover:rotate-6"
                />
                Calculate Your Costs
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
