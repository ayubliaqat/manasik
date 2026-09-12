import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const featuredPosts = [
  {
    category: "HAJJ",
    title: "A Complete Guide to Preparing for Hajj",
    description:
      "Everything you need to know before your sacred journey, from preparation to the essential rites.",
    image: "/images/hajj-featured.jpg",
    href: "/hajj-guide",
  },
  {
    category: "UMRAH",
    title: "Your Step-by-Step Umrah Guide",
    description:
      "Understand each stage of Umrah with clear, practical guidance designed for pilgrims.",
    image: "/images/umrah-featured.jpg",
    href: "/umrah-guide",
  },
  {
    category: "GUIDES",
    title: "Practical Guidance for Every Pilgrim",
    description:
      "Helpful preparation, travel and pilgrimage guidance to help you journey with confidence.",
    image: "/images/preparation-featured.jpg",
    href: "/preparation",
  },
  {
    category: "DUAS",
    title: "Essential Duas for Your Journey",
    description:
      "A carefully organised collection of duas to keep close throughout your sacred journey.",
    image: "/images/duas-featured.jpg",
    href: "/duas",
  },
];

export default function FeaturedBlog() {
  return (
    <section className="relative overflow-hidden bg-[#f4f1e9] py-16 sm:py-20 lg:py-24">
      {/* Elegant top wave */}
      <div className="absolute inset-x-0 top-0 h-16 overflow-hidden sm:h-20">
        <svg
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          className="h-full w-full"
          aria-hidden="true"
        >
          <path
            d="M0 42 C180 82 300 82 480 45 C650 10 790 10 960 45 C1140 82 1260 76 1440 35 L1440 0 L0 0 Z"
            fill="#faf8f3"
          />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
          <span className="inline-flex items-center rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-[10px] font-bold tracking-[0.2em] text-gold">
            FEATURED READING
          </span>

          <h2 className="mt-4 font-heading text-3xl font-bold leading-tight text-deep-teal drop-shadow-[0_2px_1px_rgba(6,63,58,0.08)] sm:text-4xl lg:text-5xl">
            Guidance worth{" "}
            <span className="text-emerald underline decoration-gold decoration-2 underline-offset-8">
              keeping close
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-muted-teal sm:text-base">
            Thoughtful guides and practical insights to help you prepare
            <span className="font-semibold text-deep-teal"> with confidence</span>
            , worship with clarity, and make every part of your journey more
            meaningful.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featuredPosts.map((post) => (
            <article
              key={post.href}
              className="group flex overflow-hidden rounded-2xl border border-soft-beige/90 bg-card shadow-[0_8px_25px_rgba(6,63,58,0.07)] transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/30 hover:shadow-[0_16px_35px_rgba(6,63,58,0.13)]"
            >
              <div className="flex w-full flex-col">
                {/* Image */}
                <Link href={post.href} className="relative block aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-deep-teal/45 via-transparent to-transparent opacity-70" />

                  <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[9px] font-bold tracking-[0.16em] text-emerald shadow-sm backdrop-blur-sm">
                    {post.category}
                  </span>
                </Link>

                {/* Content */}
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="font-heading text-lg font-bold leading-snug text-emerald transition-colors duration-300 group-hover:text-rich-emerald">
                    <Link href={post.href}>{post.title}</Link>
                  </h3>

                  <p className="mt-2 flex-1 text-xs leading-5 text-muted-teal">
                    {post.description}
                  </p>

                  <Link
                    href={post.href}
                    className="mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-emerald/20 bg-emerald/5 px-3 py-2 text-xs font-semibold text-emerald transition-all duration-300 hover:border-emerald/40 hover:bg-emerald hover:text-white"
                  >
                    Explore Guide
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
