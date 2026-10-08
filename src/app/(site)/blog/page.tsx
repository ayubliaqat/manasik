import Link from "next/link"
import { db } from "@/db"
import { posts, categories } from "@/db/schema"
import { eq, desc, asc } from "drizzle-orm"
import { ChevronRight } from "lucide-react"
import type { Metadata } from "next"
import BlogList from "./blog-list"

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
      categorySlug: categories.slug,
    })
    .from(posts)
    .leftJoin(categories, eq(posts.categoryId, categories.id))
    .where(eq(posts.status, "published"))
    .orderBy(desc(posts.publishedAt))
}

async function getCategories() {
  return db
    .select({
      id: categories.id,
      name: categories.name,
      slug: categories.slug,
    })
    .from(categories)
    .orderBy(asc(categories.name))
}

export default async function BlogPage() {
  const [allPosts, allCategories] = await Promise.all([
    getPublishedPosts(),
    getCategories(),
  ])

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-deep-teal pb-16 pt-10 sm:pb-20 sm:pt-14">
        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <nav
            aria-label="Breadcrumb"
            className="mb-3 flex items-center justify-center gap-2 text-sm text-white/70 sm:mb-4"
          >
            <Link href="/" className="transition-colors hover:text-gold">
              Home
            </Link>

            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />

            <span className="relative inline-block text-gold">
              Blog
              <svg
                aria-hidden="true"
                viewBox="0 0 120 10"
                preserveAspectRatio="none"
                fill="none"
                className="pointer-events-none absolute left-1/2 top-full mt-[0.1em] h-[0.18em] w-[90%] -translate-x-1/2 text-gold"
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
          </nav>
<h1 className="font-heading text-3xl font-medium text-white sm:text-4xl lg:text-5xl">
  Explore Our{" "}
  <span className="relative inline-block text-[#2BB589]">
    Blog
    <svg
      aria-hidden="true"
      viewBox="0 0 120 10"
      preserveAspectRatio="none"
      fill="none"
      className="pointer-events-none absolute left-1/2 top-full mt-[0.05em] h-[0.18em] w-[70%] -translate-x-1/2 text-gold"
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
</h1>



          <p className="mx-auto mt-3 max-w-xl text-sm font-normal leading-6 text-white/70 sm:mt-4 sm:text-base">
            Practical guides, authentic reflections, and everything you need
            to prepare for Hajj and Umrah with confidence.
          </p>
        </div>

        {/* Wavy bottom */}
        <svg
          aria-hidden="true"
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="pointer-events-none absolute bottom-[-1px] left-0 z-10 block h-[36px] w-full text-warm-white sm:h-[48px] lg:h-[64px]"
        >
          <path
            fill="currentColor"
            d="M0 40 C120 80 240 80 360 50 C480 20 600 20 720 45 C840 70 960 70 1080 45 C1200 20 1320 20 1440 50 L1440 80 L0 80 Z"
          />
        </svg>
      </section>

      {/* Category filter + posts grid */}
      <BlogList posts={allPosts} categories={allCategories} />
    </div>
  )
}
