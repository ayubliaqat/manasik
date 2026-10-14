// src/components/Blog/more-reads.tsx
import Link from "next/link"

type MoreReadsPost = {
  id: string | number
  title: string
  slug: string
}

export default function MoreReads({
  posts,
  title = "You May Also Like",
}: {
  posts: MoreReadsPost[]
  title?: string
}) {
  if (posts.length === 0) return null

  return (
    <aside
      aria-labelledby="more-reads-heading"
      className="mt-12 border-t border-soft-beige pt-8"
    >
      <h2
        id="more-reads-heading"
        className="mb-4 text-center font-heading text-lg font-semibold text-charcoal sm:text-xl"
      >
        {title}
      </h2>

      <ul className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
        {posts.map((post) => (
          <li key={post.id} className="min-w-0">
            <Link
              href={`/blog/${post.slug}`}
              className="group flex h-full flex-col justify-between gap-2 rounded-lg border border-emerald/20 bg-white p-3 transition-colors duration-200 hover:border-emerald focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald/50"
            >
              <span className="line-clamp-2 font-heading text-xs font-semibold leading-snug text-charcoal transition-colors group-hover:text-emerald">
                {post.title}
              </span>
              <span className="inline-flex w-fit items-center rounded-full border border-emerald/20 bg-emerald/5 px-2.5 py-1 text-[10px] font-semibold text-emerald transition-colors group-hover:border-emerald group-hover:bg-emerald group-hover:text-white">
                Read
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  )
}