"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export type RelatedPost = {
  id: string | number
  title: string
  slug: string
  excerpt: string | null
  featuredImage: string | null
  categoryName: string | null
  categorySlug: string | null
}

const PAGE_SIZE = 8

export default function PageRelatedPostsList({
  posts,
}: {
  posts: RelatedPost[]
}) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  const visiblePosts = posts.slice(0, visibleCount)
  const hasMore = posts.length > visibleCount

  return (
    <>
      {/* Posts grid */}
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
                <Image
                  src={post.featuredImage}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  quality={70}
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
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

      {/* Load more */}
      {hasMore && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
            className="rounded-full border border-emerald/30 bg-white px-6 py-2.5 font-heading text-xs font-semibold text-emerald transition-all duration-200 hover:border-emerald hover:bg-emerald hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          >
            Load more articles
          </button>
        </div>
      )}
    </>
  )
}