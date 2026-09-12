import Link from "next/link"
import Image from "next/image"
import { db } from "@/db"
import { posts, categories } from "@/db/schema"
import { eq, desc } from "drizzle-orm"
import { ChevronRight } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog | Manasik",
  description: "Guides, tips, and stories to help you prepare for Hajj and Umrah.",
}

export const revalidate = 300

async function getPublishedPosts() {
  return db
    .select({
      id: posts.id,
      title: posts.title,
      slug: posts.slug,
      excerpt: posts.excerpt,
      featuredImage: posts.featuredImage,
      categoryName: categories.name,
    })
    .from(posts)
    .leftJoin(categories, eq(posts.categoryId, categories.id))
    .where(eq(posts.status, "published"))
    .orderBy(desc(posts.publishedAt))
}

export default async function BlogPage() {
  const allPosts = await getPublishedPosts()

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-deep-teal pb-24 pt-16 sm:pb-28 sm:pt-20">
        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-4 flex items-center justify-center gap-2 text-sm text-white/70">
            <Link href="/" className="transition-colors hover:text-gold">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="text-gold">Blog</span>
          </nav>

          <h1 className="font-heading text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Explore Our Blog
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-white/75 sm:text-base">
            Practical guides, authentic reflections, and everything you need
            to prepare for Hajj and Umrah with confidence.
          </p>
        </div>

        {/* Layered wavy bottom edge */}
        <div className="absolute inset-x-0 bottom-0 z-0 overflow-hidden leading-[0]">
          <svg
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            aria-hidden="true"
            className="block h-16 w-full sm:h-24"
          >
            <path
              d="M0,60 C240,110 480,30 720,65 C960,100 1200,35 1440,70 L1440,120 L0,120 Z"
              fill="var(--color-deep-teal)"
              opacity="0.5"
            />
            <path
              d="M0,75 C240,25 480,105 720,65 C960,25 1200,95 1440,55 L1440,120 L0,120 Z"
              fill="var(--color-deep-teal)"
            />
            <path
              d="M0,75 C240,25 480,105 720,65 C960,25 1200,95 1440,55"
              fill="none"
              stroke="var(--color-gold)"
              strokeWidth="2"
              opacity="0.6"
            />
          </svg>
        </div>
      </section>

      {/* Posts grid */}
      <section className="bg-warm-white px-4 pb-20 pt-16 sm:px-6 sm:pb-24 sm:pt-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {allPosts.length === 0 ? (
            <p className="text-center text-sm text-muted-teal">
              No articles published yet. Check back soon.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {allPosts.map((post) => (
                <article
                  key={post.id}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-soft-beige bg-card shadow-[0_8px_25px_rgba(6,63,58,0.07)] transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/30 hover:shadow-[0_16px_35px_rgba(6,63,58,0.13)]"
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    className="relative block aspect-[16/10] overflow-hidden bg-soft-beige"
                  >
                    {post.featuredImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs text-muted-teal">
                        No image
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-deep-teal/45 via-transparent to-transparent opacity-70" />

                    {post.categoryName && (
                      <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[9px] font-bold tracking-[0.16em] text-emerald shadow-sm backdrop-blur-sm">
                        {post.categoryName.toUpperCase()}
                      </span>
                    )}
                  </Link>

                  <div className="flex flex-1 flex-col p-4">
                    <h2 className="font-heading text-lg font-bold leading-snug text-emerald transition-colors duration-300 group-hover:text-rich-emerald">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>

                    <p className="mt-2 flex-1 text-xs leading-5 text-muted-teal line-clamp-3">
                      {post.excerpt}
                    </p>

                    <Link
                      href={`/blog/${post.slug}`}
                      className="mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-emerald/20 bg-emerald/5 px-3 py-2 text-xs font-semibold text-emerald transition-all duration-300 hover:border-emerald/40 hover:bg-emerald hover:text-white"
                    >
                      Read More
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}