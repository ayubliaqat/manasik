import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { db } from "@/db"
import { posts } from "@/db/schema"
import { eq, desc } from "drizzle-orm"

export const revalidate = 300

async function getFeaturedPosts() {
  try {
    return await db
      .select({
        id: posts.id,
        title: posts.title,
        slug: posts.slug,
        metaDescription: posts.metaDescription,
        featuredImage: posts.featuredImage,
      })
      .from(posts)
      .where(eq(posts.status, "published"))
      .orderBy(desc(posts.publishedAt))
      .limit(4)
  } catch (error) {
    console.error(
      "FeaturedBlog query failed:",
      (error as { cause?: unknown }).cause ?? error
    )
    throw error
  }
}

export default async function FeaturedBlog() {
  const featuredPosts = await getFeaturedPosts()

  return (
    <section
      className="
        relative overflow-hidden
        border-y border-emerald/20
        bg-gradient-to-br
        from-warm-white
        via-[#f8f4ea]
        to-[#e8f2ed]
        py-14 sm:py-16 lg:py-20
      "
    >
      {/* Large sweeping top curve */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          left-1/2 top-[-190px]
          h-[430px] w-[145%]
          -translate-x-1/2
          rounded-[0_0_50%_50%]
          bg-gradient-to-br
          from-emerald/[0.12]
          via-emerald/[0.055]
          to-gold/[0.10]
          blur-[1px]
        "
      />

      {/* Soft inner curve */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          left-1/2 top-[-125px]
          h-[270px] w-[115%]
          -translate-x-1/2
          rounded-[0_0_50%_50%]
          border-b border-white/40
          bg-white/[0.18]
        "
      />

      {/* Large sweeping bottom curve */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          bottom-[-230px] left-1/2
          h-[430px] w-[135%]
          -translate-x-1/2
          rounded-[50%_50%_0_0]
          bg-gradient-to-t
          from-emerald/[0.08]
          via-emerald/[0.035]
          to-transparent
        "
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
          <h2
            className="
              text-balance
              font-serif
              text-[26px] font-medium
              leading-[1.15]
              tracking-[-0.015em]
              text-deep-teal
              sm:text-[32px]
              md:text-[36px]
              lg:text-[42px]
            "
          >
            Explore Our{" "}
            <span className="relative inline-block whitespace-nowrap text-emerald">
              Featured Blog
              <svg
                aria-hidden="true"
                viewBox="0 0 120 10"
                preserveAspectRatio="none"
                fill="none"
                className="
                  pointer-events-none absolute
                  left-1/2 top-full
                  mt-[0.05em]
                  h-[0.2em] w-[70%]
                  -translate-x-1/2
                  text-gold
                "
              >
                <path
                  d="M2 5 Q12 0 22 5 T42 5 T62 5 T82 5 T102 5 T118 5"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-muted-teal sm:text-[15px]">
            Thoughtful guides and practical insights to help you prepare
            with confidence and make your journey more meaningful.
          </p>
        </div>

        {/* Featured cards */}
        {featuredPosts.length === 0 ? (
          <div
            className="
              rounded-2xl
              border-[1.5px] border-deep-teal/50
              bg-card
              px-5 py-10
              text-center text-sm text-muted-teal
              shadow-[inset_0_0_14px_rgba(6,63,58,0.16),0_10px_24px_rgba(6,63,58,0.14)]
            "
          >
            No articles published yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featuredPosts.map((post) => (
              <article
                key={post.id}
                className="
                  group relative flex h-full min-w-0 flex-col
                  rounded-2xl
                  border-[1.5px] border-deep-teal/60
                  bg-card p-2.5
                  shadow-[inset_0_0_14px_rgba(6,63,58,0.2),0_2px_4px_rgba(6,63,58,0.1),0_12px_26px_rgba(6,63,58,0.18)]
                  transition-all duration-300 ease-out
                  hover:-translate-y-1
                  hover:border-emerald
                  hover:shadow-[inset_0_0_16px_rgba(6,63,58,0.24),0_4px_8px_rgba(6,63,58,0.12),0_18px_34px_rgba(6,63,58,0.24)]
                "
              >
                {/* Image */}
                <Link
                  href={`/blog/${post.slug}`}
                  tabIndex={-1}
                  aria-hidden="true"
                  className="relative block aspect-[16/10] overflow-hidden rounded-xl bg-soft-beige shadow-[0_2px_6px_rgba(6,63,58,0.15)]"
                >
                  {post.featuredImage ? (
                    <Image
                      src={post.featuredImage}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                      sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs text-muted-teal">
                      No image
                    </div>
                  )}
                  <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-black/[0.06]" />
                </Link>

                {/* Content */}
                <div className="flex flex-1 flex-col px-1 pb-0.5 pt-3.5">
                  <h3
                    className="
                      line-clamp-2
                      font-heading text-[15px] font-semibold
                      leading-[1.35] text-charcoal
                      transition-colors duration-200
                      group-hover:text-emerald
                    "
                  >
                    <Link
                      href={`/blog/${post.slug}`}
                      className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald/50"
                    >
                      {post.title}
                    </Link>
                  </h3>

                  {post.metaDescription && (
                    <p className="mt-2 line-clamp-3 text-xs leading-[1.6] text-muted-teal">
                      {post.metaDescription}
                    </p>
                  )}

                  {/* Emerald action button */}
                  <Link
                    href={`/blog/${post.slug}`}
                    aria-label={`Read guide: ${post.title}`}
                    className="
                      group/read mt-4
                      flex items-center justify-between gap-2
                      rounded-xl
                      border border-emerald
                      bg-emerald
                      px-3.5 py-2.5
                      text-xs font-semibold text-white
                      shadow-[0_3px_8px_rgba(6,63,58,0.22)]
                      transition-all duration-300
                      hover:border-dark-teal hover:bg-dark-teal
                      hover:shadow-[0_5px_12px_rgba(6,63,58,0.3)]
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald/50 focus-visible:ring-offset-2
                    "
                  >
                    <span>Read Guide</span>
                    <span
                      className="
                        flex h-6 w-6 shrink-0 items-center justify-center
                        rounded-full bg-gold text-deep-teal
                        transition-transform duration-200
                        group-hover/read:translate-x-0.5
                      "
                    >
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Explore all */}
        {featuredPosts.length > 0 && (
          <div className="mt-10 flex justify-center sm:mt-12">
            <Link
              href="/blog"
              className="
                inline-flex items-center justify-center gap-2
                rounded-full
                border border-emerald
                bg-emerald
                px-6 py-3
                text-sm font-semibold
                text-white
                shadow-[0_4px_12px_rgba(6,63,58,0.25)]
                transition-all duration-300
                hover:-translate-y-0.5
                hover:border-dark-teal hover:bg-dark-teal
                hover:shadow-[0_8px_18px_rgba(6,63,58,0.3)]
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald/50 focus-visible:ring-offset-2
              "
            >
              Explore All Articles
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}