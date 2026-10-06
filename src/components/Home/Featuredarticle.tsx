import Link from "next/link"
import Image from "next/image"
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
        py-10 sm:py-12 lg:py-14
      "
    >
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
        {/* Heading: the top curves are anchored to this block so the
            h2 and description always sit inside them */}
        <div className="relative mb-5 pb-6 sm:mb-6 sm:pb-8">
          {/* Large sweeping top curve */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none absolute
              bottom-0 left-1/2 -z-10
              h-[430px] w-[240vw] sm:w-[170vw] lg:w-[145vw]
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
              bottom-2 left-1/2 -z-10
              h-[270px] w-[200vw] sm:w-[140vw] lg:w-[115vw]
              -translate-x-1/2
              rounded-[0_0_50%_50%]
              border-b border-white/40
              bg-white/[0.18]
            "
          />

          <div className="mx-auto max-w-2xl text-center">
            <h2
              className="
                text-balance
                font-serif
                text-[24px] font-medium
                leading-[1.15]
                tracking-[-0.015em]
                text-deep-teal
                sm:text-[28px]
                md:text-[32px]
                lg:text-[38px]
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

            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-muted-teal sm:text-[15px]">
              Thoughtful guides and practical insights to help you prepare
              with confidence and make your journey more meaningful.
            </p>
          </div>
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
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {featuredPosts.map((post) => (
              <article
                key={post.id}
                className="
                  group relative flex h-full min-w-0 flex-col
                  rounded-2xl
                  border-[1.5px] border-deep-teal/60
                  bg-card p-2.5
                  shadow-[inset_0_0_14px_rgba(6,63,58,0.22),0_3px_0_rgba(6,63,58,0.6),0_14px_30px_rgba(6,63,58,0.24)]
                  transition-all duration-300 ease-out
                  hover:-translate-y-1
                  hover:border-emerald
                  hover:shadow-[inset_0_0_16px_rgba(6,63,58,0.26),0_5px_0_rgba(6,63,58,0.7),0_20px_38px_rgba(6,63,58,0.3)]
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
                <div className="flex flex-1 flex-col pt-3">
                  <h3
                    className="
                      line-clamp-2 min-h-[2.7em]
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
                    <p className="mt-1.5 line-clamp-3 text-xs leading-[1.6] text-muted-teal">
                      {post.metaDescription}
                    </p>
                  )}

                  {/* Button: pinned to the card bottom so all cards line up */}
                  <div className="mt-auto pt-4">
                    <Link
                      href={`/blog/${post.slug}`}
                      aria-label={`Read guide: ${post.title}`}
                      className="
                        block
                        rounded-xl border border-emerald bg-emerald
                        px-4 py-2
                        text-center text-xs font-semibold tracking-wide text-white
                        shadow-[0_3px_0_rgba(6,63,58,0.85)]
                        transition-all duration-200
                        hover:border-dark-teal hover:bg-dark-teal
                        active:translate-y-[2px] active:shadow-[0_1px_0_rgba(6,63,58,0.85)]
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald/50 focus-visible:ring-offset-2
                      "
                    >
                      Read Guide
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Explore all */}
        {featuredPosts.length > 0 && (
          <div className="mt-8 flex justify-center sm:mt-10">
            <Link
              href="/blog"
              className="
                inline-flex items-center justify-center
                rounded-xl
                border border-emerald
                bg-emerald
                px-6 py-2.5
                text-sm font-semibold tracking-wide
                text-white
                shadow-[0_3px_0_rgba(6,63,58,0.85)]
                transition-all duration-200
                hover:border-dark-teal hover:bg-dark-teal
                active:translate-y-[2px] active:shadow-[0_1px_0_rgba(6,63,58,0.85)]
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald/50 focus-visible:ring-offset-2
              "
            >
              Explore All Articles
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}