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
    <section className="relative border-y border-emerald/20 bg-warm-white py-12 sm:py-14 lg:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="mx-auto mb-9 max-w-2xl text-center sm:mb-10">
          <span
            className="
              inline-flex items-center rounded-full
              border border-gold/30
              bg-gold/10
              px-3 py-1
              text-[10px] font-semibold uppercase
              tracking-[0.18em] text-gold
            "
          >
            Featured Reading
          </span>

          <h2
            className="
              mt-3
              font-serif
              text-[28px] font-semibold
              leading-[1.12]
              tracking-[-0.02em]
              text-deep-teal
              drop-shadow-[0_2px_1px_rgba(6,63,58,0.12)]
              sm:text-[34px]
              lg:text-[40px]
            "
          >
            Guidance worth{" "}
            <span
              className="
                text-emerald
                drop-shadow-[0_2px_2px_rgba(6,63,58,0.14)]
              "
            >
              keeping close
            </span>
          </h2>

          <p
            className="
              mx-auto mt-3 max-w-xl
              text-sm font-normal
              leading-6 text-muted-teal
              sm:text-[15px]
            "
          >
            Thoughtful guides and practical insights to help you prepare
            with confidence and make your journey more meaningful.
          </p>
        </div>

        {/* Featured cards */}
        {featuredPosts.length === 0 ? (
          <div
            className="
              rounded-2xl
              border border-emerald/20
              bg-card
              px-5 py-9
              text-center text-sm text-muted-teal
              shadow-[0_3px_0_rgba(6,63,58,0.06),0_10px_24px_rgba(6,63,58,0.07)]
            "
          >
            No articles published yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredPosts.map((post, index) => (
              <article
                key={post.id}
                className="
                  group relative flex h-full min-w-0 flex-col
                  overflow-hidden rounded-2xl
                  border border-emerald/20
                  bg-card
                  shadow-[0_2px_0_rgba(6,63,58,0.08),0_7px_18px_rgba(6,63,58,0.08)]
                  transition-all duration-300 ease-out
                  hover:-translate-y-1
                  hover:border-emerald/35
                  hover:shadow-[0_3px_0_rgba(6,63,58,0.10),0_14px_28px_rgba(6,63,58,0.14)]
                "
              >
                {/* Branded top edge */}
                <div
                  className={`
                    absolute inset-x-0 top-0 z-10 h-[2px]
                    ${index % 2 === 0 ? "bg-emerald" : "bg-gold"}
                  `}
                />

                {/* Image */}
                <Link
                  href={`/blog/${post.slug}`}
                  className="
                    relative block aspect-[16/10]
                    overflow-hidden bg-soft-beige
                  "
                >
                  {post.featuredImage ? (
                    <Image
                      src={post.featuredImage}
                      alt={post.title}
                      fill
                      className="
                        object-cover
                        transition-transform duration-500 ease-out
                        group-hover:scale-[1.04]
                      "
                      sizes="
                        (max-width: 639px) 100vw,
                        (max-width: 1023px) 50vw,
                        25vw
                      "
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs text-muted-teal">
                      No image
                    </div>
                  )}

                  <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/[0.04]" />
                </Link>

                {/* Card content */}
                <div className="flex flex-1 flex-col p-4">
                  <h3
                    className="
                      font-heading
                      text-[15px]
                      font-semibold
                      leading-[1.4]
                      text-charcoal
                      transition-colors duration-200
                      group-hover:text-emerald
                    "
                  >
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>

                  {post.excerpt && (
                    <p
                      className="
                        mt-2
                        line-clamp-3
                        text-xs
                        font-normal
                        leading-[1.6]
                        text-muted-teal
                      "
                    >
                      {post.excerpt}
                    </p>
                  )}

                  {/* Full-width card action */}
                  <div className="mt-auto pt-4">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="
                        group/read
                        flex w-full items-center justify-center
                        gap-2
                        rounded-xl
                        border border-emerald/25
                        bg-emerald/[0.06]
                        px-3 py-2.5
                        text-xs font-medium
                        text-emerald

                        shadow-[0_2px_5px_rgba(6,63,58,0.05)]

                        transition-all duration-300

                        hover:border-emerald
                        hover:bg-emerald
                        hover:text-white
                        hover:shadow-[0_4px_10px_rgba(6,63,58,0.14)]
                      "
                    >
                      Read Guide

                      <ArrowRight
                        className="
                          h-3.5 w-3.5
                          transition-transform duration-200
                          group-hover/read:translate-x-0.5
                        "
                      />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Explore all */}
        {featuredPosts.length > 0 && (
          <div className="mt-8 flex justify-center sm:mt-9">
            <Link
              href="/blog"
              className="
                inline-flex items-center justify-center
                gap-2
                rounded-full
                border border-emerald/30
                bg-card
                px-5 py-2.5
                text-xs font-medium
                text-emerald
                shadow-[0_2px_0_rgba(6,63,58,0.07),0_5px_12px_rgba(6,63,58,0.06)]
                transition-all duration-300
                hover:-translate-y-0.5
                hover:border-emerald
                hover:bg-emerald
                hover:text-white
                hover:shadow-[0_3px_0_rgba(6,63,58,0.10),0_8px_18px_rgba(6,63,58,0.12)]
              "
            >
              Explore All Articles
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
