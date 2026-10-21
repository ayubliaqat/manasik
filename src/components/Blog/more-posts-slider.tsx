"use client"

// src/components/Blog/more-posts-slider.tsx
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"

export type MorePost = {
  id: string | number
  title: string
  slug: string
  featuredImage: string | null
}

// How many cards are visible at once.
const PAGE_SIZE = 4

export default function MorePostsSlider({ posts }: { posts: MorePost[] }) {
  const [page, setPage] = useState(0)

  if (posts.length === 0) {
    return null
  }

  const totalPages = Math.ceil(posts.length / PAGE_SIZE)
  const start = page * PAGE_SIZE
  const visible = posts.slice(start, start + PAGE_SIZE)

  return (
    <section aria-labelledby="more-posts-heading" className="mt-10">
      <h2
        id="more-posts-heading"
        className="mb-4 font-heading text-xl font-medium tracking-tight text-charcoal sm:text-2xl"
      >
        You May Also Like
      </h2>

      <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {visible.map((post) => (
          <li key={post.id}>
            <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-soft-beige bg-white shadow-[0_6px_18px_rgba(6,63,58,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_26px_rgba(6,63,58,0.14)]">
              <Link
                href={`/blog/${post.slug}`}
                tabIndex={-1}
                aria-hidden="true"
                className="relative block aspect-[16/10] w-full overflow-hidden bg-soft-beige"
              >
                {post.featuredImage ? (
                  <Image
                    src={post.featuredImage}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 215px, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <span className="absolute inset-0 bg-gradient-to-br from-deep-teal to-emerald" />
                )}
              </Link>

              <div className="flex flex-1 flex-col gap-2.5 p-3">
                <h3 className="line-clamp-2 min-h-[2.5rem] text-[13px] font-semibold leading-5 text-charcoal sm:text-sm">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="transition-colors hover:text-emerald"
                  >
                    {post.title}
                  </Link>
                </h3>

                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-auto inline-flex items-center justify-center gap-1 rounded-full bg-emerald px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-rich-emerald focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
                >
                  Read more
                  <ArrowRight
                    size={12}
                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </article>
          </li>
        ))}
      </ul>

      {totalPages > 1 && (
        <div className="mt-5 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-deep-teal/30 bg-white px-4 py-2 text-sm font-medium text-deep-teal transition-colors hover:bg-deep-teal hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-deep-teal"
          >
            <ChevronLeft size={16} aria-hidden="true" />
            Previous
          </button>

          <span
            aria-live="polite"
            className="min-w-[64px] text-center text-xs text-muted-teal"
          >
            {page + 1} / {totalPages}
          </span>

          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page === totalPages - 1}
            className="inline-flex min-h-10 items-center gap-1.5 rounded-full bg-deep-teal px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-deep-teal"
          >
            Next
            <ChevronRight size={16} aria-hidden="true" />
          </button>
        </div>
      )}
    </section>
  )
}