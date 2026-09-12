import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { db } from "@/db"
import { posts } from "@/db/schema"
import { eq, desc } from "drizzle-orm"

export const revalidate = 300

async function getFeaturedPosts() {
  return db
    .select({
      id: posts.id,
      title: posts.title,
      slug: posts.slug,
      excerpt: posts.excerpt,
      featuredImage: posts.featuredImage,
    })
    .from(posts)
    .where(eq(posts.status, "published"))
    .orderBy(desc(posts.publishedAt))
    .limit(4)
}

export default async function FeaturedBlog() {
  const featuredPosts = await getFeaturedPosts()

  return (
    <section className="relative overflow-hidden bg-warm-white py-16 sm:py-20 lg:py-24">
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
            fill="var(--color-warm-white)"
          />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
          <span className="inline-flex items-center rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-[10px] font-bold tracking-[0.2em] text-gold">
            FEATURED READING
          </span>

          <h2 className="mt-4 font-heading text-2xl font-semibold leading-tight text-deep-teal sm:text-3xl lg:text-4xl">
            Guidance worth{" "}
            <span className="text-emerald underline decoration-gold decoration-2 underline-offset-8">
              keeping close
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-muted-teal sm:text-base">
            Thoughtful guides and practical insights to help you prepare with
            confidence, worship with clarity, and make every part of your
            journey more meaningful.
          </p>
        </div>

        {/* Cards */}
        {featuredPosts.length === 0 ? (
          <p className="text-center text-sm text-muted-teal">
            No articles published yet. Check back soon.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredPosts.map((post) => (
              <article
                key={post.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-soft-beige bg-card shadow-[0_6px_18px_rgba(6,63,58,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/30 hover:shadow-[0_14px_30px_rgba(6,63,58,0.12)]"
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="relative block aspect-[16/10] overflow-hidden bg-soft-beige"
                >
                  {post.featuredImage ? (
                    <Image
                      src={post.featuredImage}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs text-muted-teal">
                      No image
                    </div>
                  )}
                </Link>

                <div className="flex flex-1 flex-col p-4">
                  <h3 className="font-heading text-base font-semibold leading-snug text-charcoal transition-colors duration-300 group-hover:text-emerald">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>

                  <p className="mt-2 flex-1 text-xs leading-5 text-muted-teal line-clamp-3">
                    {post.excerpt}
                  </p>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-emerald/20 bg-emerald/5 px-3 py-2 text-xs font-medium text-emerald transition-all duration-300 hover:border-emerald/40 hover:bg-emerald hover:text-white"
                  >
                    Read More
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Explore all button */}
        {featuredPosts.length > 0 && (
          <div className="mt-10 flex justify-center sm:mt-12">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-full border border-emerald/30 bg-card px-6 py-3 text-sm font-medium text-emerald shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald hover:bg-emerald hover:text-white hover:shadow-md"
            >
              Explore All Articles
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}