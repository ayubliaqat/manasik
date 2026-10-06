"use client"

import Link from "next/link"
import { useState } from "react"

type BlogPost = {
  id: string | number
  title: string
  slug: string
  excerpt: string | null
  featuredImage: string | null
  categoryName: string | null
  categorySlug: string | null
}

type BlogCategory = {
  id: string | number
  name: string
  slug: string
}

export default function BlogList({
  posts,
  categories,
}: {
  posts: BlogPost[]
  categories: BlogCategory[]
}) {
  const [active, setActive] = useState<string>("all")

  const visiblePosts =
    active === "all" ? posts : posts.filter((p) => p.categorySlug === active)

  const filterItems = [{ id: "all", name: "All", slug: "all" }, ...categories]

  return (
    <section className="bg-warm-white pb-20 pt-8 sm:pb-24 sm:pt-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Category filter */}
        <nav
          aria-label="Filter articles by category"
          className="mb-8 flex flex-wrap justify-center gap-2 sm:mb-10 sm:gap-2.5"
        >
          {filterItems.map((item) => {
            const isActive = active === item.slug

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActive(item.slug)}
                aria-pressed={isActive}
                className={[
                  "min-h-9 rounded-full border px-4 py-2 font-heading text-xs font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald/50 focus-visible:ring-offset-2 focus-visible:ring-offset-warm-white",
                  isActive
                    ? "border-emerald bg-emerald text-white shadow-[0_3px_0_rgba(6,63,58,0.35)]"
                    : "border-soft-beige bg-white text-charcoal hover:border-emerald/50 hover:text-emerald",
                ].join(" ")}
              >
                {item.name}
              </button>
            )
          })}
        </nav>

        {/* Posts grid */}
        {visiblePosts.length === 0 ? (
          <p className="text-center text-sm text-muted-teal">
            {active === "all"
              ? "No articles published yet. Check back soon."
              : "No articles in this category yet. Check back soon."}
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {visiblePosts.map((post) => (
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
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={post.featuredImage}
                      alt=""
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs text-muted-teal">
                      No image
                    </div>
                  )}

                  <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-black/[0.06]" />

                  {post.categoryName && (
                    <span className="absolute left-2.5 top-2.5 rounded-full bg-white/95 px-2.5 py-1 text-[9px] font-bold tracking-[0.16em] text-emerald shadow-sm backdrop-blur-sm">
                      {post.categoryName.toUpperCase()}
                    </span>
                  )}
                </Link>

                {/* Content */}
                <div className="flex flex-1 flex-col pt-3">
                  <h2
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
                  </h2>

                  {post.excerpt && (
                    <p className="mt-1.5 line-clamp-3 text-xs leading-[1.6] text-muted-teal">
                      {post.excerpt}
                    </p>
                  )}

                  {/* Button: pinned to the card bottom */}
                  <div className="mt-auto pt-4">
                    <Link
                      href={`/blog/${post.slug}`}
                      aria-label={`Read more: ${post.title}`}
                      className="inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-emerald/20 bg-emerald/5 px-3 py-2 text-xs font-semibold text-emerald transition-all duration-300 hover:border-emerald/40 hover:bg-emerald hover:text-white"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}