import { and, desc, eq } from "drizzle-orm"
import { db } from "@/db"
import { posts, categories } from "@/db/schema"
import PageRelatedPostsList from "@/components/pages/PageRelatedPostsList"

type PageRelatedPostsProps = {
  /** Category slug from the blog, e.g. "hajj-guide" */
  categorySlug: string
  /** First part of the h2 (gold). Leave out to hide the heading */
  titleGold?: string
  /** Second part of the h2 (emerald, with the wavy gold underline) */
  titleEmerald?: string
  /** Max posts fetched for the category */
  limit?: number
}

async function getCategoryPosts(categorySlug: string, limit: number) {
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
    .innerJoin(categories, eq(posts.categoryId, categories.id))
    .where(and(eq(posts.status, "published"), eq(categories.slug, categorySlug)))
    .orderBy(desc(posts.publishedAt))
    .limit(limit)
}

export default async function PageRelatedPosts({
  categorySlug,
  titleGold,
  titleEmerald,
  limit = 48,
}: PageRelatedPostsProps) {
  const categoryPosts = await getCategoryPosts(categorySlug, limit)

  if (categoryPosts.length === 0) {
    return null
  }

  return (
    <section className="bg-white py-10 sm:py-12 lg:py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {titleGold && titleEmerald && (
          <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-10">
            <h2
              className="
                text-balance
                font-serif
                text-[28px] font-bold
                leading-[1.1]
                tracking-[-0.02em]
                text-deep-teal
                sm:text-[34px]
                md:text-[38px]
                lg:text-[46px]
              "
            >
              <span className="text-gold">{titleGold}</span>{" "}
              <span className="relative inline-block whitespace-nowrap text-emerald">
                {titleEmerald}
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
          </div>
        )}

        <PageRelatedPostsList posts={categoryPosts} />
      </div>
    </section>
  )
}