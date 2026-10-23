import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowRight, Compass, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

type HeroCta = {
  label: string;
  href: string;
  Icon?: LucideIcon;
};

type PageHeroProps = {
  /** First part of the h1 (white) */
  title: string;
  /** Second line of the h1 (gold) */
  highlight: string;
  /** Short description. Use <PageHero.Mark> to underline a phrase in gold */
  description: ReactNode;
  primaryCta: HeroCta;
  secondaryCta: HeroCta;
  /** Background image. Defaults to the home banner */
  image?: string | StaticImageData;
  imageAlt?: string;
};

function Mark({ children }: { children: ReactNode }) {
  return (
    <span className="font-medium text-white underline decoration-gold-light decoration-2 underline-offset-4">
      {children}
    </span>
  );
}

export default function PageHero({
  title,
  highlight,
  description,
  primaryCta,
  secondaryCta,
  image = "/images/home-banner-image.png",
  imageAlt = "The Kaaba and Masjid al-Haram at sunset",
}: PageHeroProps) {
  const PrimaryIcon = primaryCta.Icon ?? ArrowRight;
  const SecondaryIcon = secondaryCta.Icon ?? Compass;

  return (
    <section className="relative isolate overflow-hidden bg-dark-teal">
      {/* Background image */}
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-[78%_center] lg:object-center"
      />

      {/* Light overlay: just enough for text readability, image stays visible */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10
        bg-[linear-gradient(180deg,rgba(2,51,47,0.6)_0%,rgba(2,51,47,0.4)_50%,rgba(2,51,47,0.7)_100%)]
        lg:bg-[linear-gradient(90deg,rgba(2,51,47,0.5)_0%,rgba(2,51,47,0.15)_40%,rgba(2,51,47,0)_65%)]"
      />

      {/* Content */}
      <div className="relative z-10 flex items-center">
        <div className="mx-auto w-full max-w-[1400px] px-5 pb-16 pt-12 sm:px-8 sm:pb-[4.5rem] sm:pt-14 lg:px-16 lg:pb-16 lg:pt-14 xl:px-20">
          <div className="flex flex-col items-center gap-9 sm:gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
            {/* LEFT */}
            <div className="max-w-[570px] text-center lg:text-left">
              {/* Heading */}
              <h1
                className="hero-from-left font-serif text-[28px] font-semibold
              leading-[1.08] tracking-[-0.02em] text-white
              drop-shadow-[0_3px_2px_rgba(0,0,0,0.3)]
              sm:text-[36px]
              lg:text-[48px]"
              >
                {title}
                <span
                  className="mt-1 block text-gold-light
                drop-shadow-[0_3px_3px_rgba(0,0,0,0.3)]"
                >
                  {highlight}
                </span>
              </h1>

              {/* Gold accent */}
              <div
                className="hero-from-left my-3 flex items-center justify-center gap-2 sm:my-4 lg:justify-start"
                style={{ animationDelay: "0.25s" }}
              >
                <span className="h-[2px] w-11 rounded-full bg-gold-light sm:w-14" />
                <span className="h-1.5 w-1.5 rounded-full bg-gold-light" />
              </div>

              {/* Description */}
              <p
                className="hero-from-right mx-auto max-w-[510px] text-[14px]
              leading-6 text-white/90
              sm:text-[15px] sm:leading-6 lg:mx-0"
                style={{ animationDelay: "0.45s" }}
              >
                {description}
              </p>

              {/* CTA buttons */}
              <div
                className="hero-from-left mt-5 flex flex-col items-stretch gap-2.5 sm:mt-6 sm:flex-row sm:items-center sm:justify-center sm:gap-4 lg:justify-start"
                style={{ animationDelay: "0.65s" }}
              >
                {/* Primary — dark teal */}
                <Link
                  href={primaryCta.href}
                  className="group inline-flex min-h-11 w-full items-center justify-center
  gap-2 rounded-full
  border border-gold/60
  bg-dark-teal
  px-5 py-2.5
  text-[13px] font-semibold text-white
  shadow-[0_3px_0_#011f1c,0_8px_18px_rgba(2,51,47,0.35)]
  transition-all duration-300
  hover:-translate-y-1
  hover:border-gold-light
  hover:bg-deep-teal
  hover:shadow-[0_4px_0_#011f1c,0_13px_25px_rgba(2,51,47,0.4)]
  active:translate-y-[1px]
  active:shadow-[0_2px_0_#011f1c,0_4px_10px_rgba(2,51,47,0.3)]
  focus:outline-none
  focus:ring-2 focus:ring-gold-light
  focus:ring-offset-2 focus:ring-offset-deep-teal
  sm:w-auto sm:px-6 sm:text-sm"
                >
                  {primaryCta.label}
                  <PrimaryIcon
                    size={16}
                    className="text-gold-light transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>

                {/* Secondary — gold */}
                <Link
                  href={secondaryCta.href}
                  className="group inline-flex min-h-11 w-full items-center justify-center
gap-2 rounded-full
border border-gold-light/70
bg-gold-light
px-5 py-2.5
text-[13px] font-semibold text-dark-teal
shadow-[0_3px_0_#8a6f16,0_8px_18px_rgba(2,51,47,0.3)]
transition-all duration-300
hover:-translate-y-1
hover:bg-gold
hover:shadow-[0_4px_0_#8a6f16,0_13px_25px_rgba(2,51,47,0.35)]
active:translate-y-[1px]
active:shadow-[0_2px_0_#8a6f16,0_4px_10px_rgba(2,51,47,0.25)]
focus:outline-none
focus:ring-2 focus:ring-white
focus:ring-offset-2
focus:ring-offset-deep-teal
sm:w-auto sm:px-6 sm:text-sm"
                >
                  <SecondaryIcon
                    size={16}
                    className="text-dark-teal transition-transform duration-300 group-hover:rotate-6"
                  />
                  {secondaryCta.label}
                </Link>
              </div>
            </div>

            {/* RIGHT — empty, the background image shows here */}
          </div>
        </div>
      </div>
    </section>
  );
}

PageHero.Mark = Mark;