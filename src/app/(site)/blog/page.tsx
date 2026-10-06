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
          <nav aria-label="Breadcrumb" className="mb-3 flex items-center justify-center gap-2 text-sm text-white/70 sm:mb-4">
            <Link href="/" className="transition-colors hover:text-gold">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="text-gold">Blog</span>
          </nav>

          <h1 className="font-heading text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Explore Our Blog
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-white/75 sm:mt-4 sm:text-base">
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
            className="block h-10 w-full sm:h-14"
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

      {/* Category filter + posts grid */}
      <BlogList posts={allPosts} categories={allCategories} />
    </div>
  )
}