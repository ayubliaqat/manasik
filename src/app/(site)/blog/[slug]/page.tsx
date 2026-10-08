import { notFound } from "next/navigation"
import Link from "next/link"
import type { Metadata } from "next"
import { eq } from "drizzle-orm"
import { db } from "@/db"
import { posts, categories, users } from "@/db/schema"
import { ChevronRight } from "lucide-react"

async function getPost(slug: string) {
  const [post] = await db
    .select({
      id: posts.id,
      title: posts.title,
      slug: posts.slug,
      excerpt: posts.excerpt,
      content: posts.content,
      featuredImage: posts.featuredImage,
      status: posts.status,
      seoTitle: posts.seoTitle,
      metaDescription: posts.metaDescription,
      canonicalUrl: posts.canonicalUrl,
      robotsIndex: posts.robotsIndex,
      robotsFollow: posts.robotsFollow,
      breadcrumbTitle: posts.breadcrumbTitle,
      ogTitle: posts.ogTitle,
      ogDescription: posts.ogDescription,
      ogImage: posts.ogImage,
      twitterTitle: posts.twitterTitle,
      twitterDescription: posts.twitterDescription,
      twitterImage: posts.twitterImage,
      schemaType: posts.schemaType,
      publishedAt: posts.publishedAt,
      categoryName: categories.name,
      authorName: users.name,
    })
    .from(posts)
    .leftJoin(categories, eq(posts.categoryId, categories.id))
    .leftJoin(users, eq(posts.authorId, users.id))
    .where(eq(posts.slug, slug))
    .limit(1)

  return post
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    return {}
  }

  const canonicalUrl = post.canonicalUrl || `/blog/${post.slug}`

  return {
    title: post.seoTitle || post.title,
    description: post.metaDescription || post.excerpt || undefined,
    alternates: { canonical: canonicalUrl },
    robots: {
      index: post.robotsIndex !== "noindex",
      follow: post.robotsFollow !== "nofollow",
    },
    openGraph: {
      title: post.ogTitle || post.seoTitle || post.title,
      description:
        post.ogDescription ||
        post.metaDescription ||
        post.excerpt ||
        undefined,
      url: canonicalUrl,
      images: post.ogImage
        ? [{ url: post.ogImage }]
        : post.featuredImage
          ? [{ url: post.featuredImage }]
          : undefined,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title:
        post.twitterTitle ||
        post.ogTitle ||
        post.seoTitle ||
        post.title,
      description:
        post.twitterDescription ||
        post.ogDescription ||
        post.metaDescription ||
        post.excerpt ||
        undefined,
      images:
        post.twitterImage || post.ogImage || post.featuredImage
          ? [post.twitterImage || post.ogImage || post.featuredImage!]
          : undefined,
    },
  }
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post || post.status !== "published") {
    notFound()
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": post.schemaType || "BlogPosting",
    headline: post.title,
    description: post.metaDescription || post.excerpt || undefined,
    image: post.featuredImage || undefined,
    datePublished: post.publishedAt
      ? new Date(post.publishedAt).toISOString()
      : undefined,
    author: post.authorName
      ? { "@type": "Person", name: post.authorName }
      : undefined,
  }

  return (
    <div>
      {/* Compact header banner with breadcrumb */}
      <section className="relative overflow-hidden bg-deep-teal pb-14 pt-8 sm:pb-16 sm:pt-10">
        {/* Faint decorative circles */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-16 -top-20 h-44 w-44 rounded-full border border-white/10 sm:h-52 sm:w-52"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-14 -top-14 h-40 w-40 rounded-full border border-gold/20 sm:h-48 sm:w-48"
        />

        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center justify-center gap-2 text-xs text-white/70 sm:text-sm"
          >
            <Link
              href="/"
              className="shrink-0 transition-colors hover:text-gold"
            >
              Home
            </Link>

            <ChevronRight
              className="h-3.5 w-3.5 shrink-0"
              aria-hidden="true"
            />

            <Link
              href="/blog"
              className="shrink-0 transition-colors hover:text-gold"
            >
              Blog
            </Link>

            <ChevronRight
              className="h-3.5 w-3.5 shrink-0"
              aria-hidden="true"
            />
          </nav>
        </div>

        {/* Wavy bottom edge that melts into the page background */}
        <div className="absolute inset-x-0 bottom-0 z-0 overflow-hidden leading-[0]">
          <svg
            viewBox="0 0 1440 160"
            preserveAspectRatio="none"
            aria-hidden="true"
            className="block h-16 w-full sm:h-20"
          >
            <path
              d="M0,70 C280,135 620,25 960,80 C1160,112 1320,90 1440,58 L1440,160 L0,160 Z"
              fill="var(--color-warm-white)"
              opacity="0.4"
            />

            <path
              d="M0,96 C300,28 560,142 900,86 C1120,50 1300,38 1440,70 L1440,160 L0,160 Z"
              fill="var(--color-warm-white)"
            />

            <path
              d="M0,96 C300,28 560,142 900,86 C1120,50 1300,38 1440,70"
              fill="none"
              stroke="var(--color-gold)"
              strokeWidth="2"
              opacity="0.6"
            />
          </svg>
        </div>
      </section>

      {/* Blog view */}
      <div className="bg-warm-white">
        <article className="mx-auto max-w-5xl px-4 pb-16 pt-8 sm:px-6 sm:pb-20 sm:pt-10 lg:px-8">
          {/* JSON-LD */}
          {/* eslint-disable-next-line react/no-danger */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(jsonLd),
            }}
          />

          <div className="mx-auto max-w-4xl">

            <h1 className="mb-4 max-w-4xl text-2xl font-semibold leading-[1.2] tracking-tight text-charcoal sm:text-3xl lg:text-4xl">
              {post.title}
            </h1>

            <div className="mb-8 flex flex-wrap items-center gap-3 text-sm text-muted-teal">
              {post.authorName && <span>By {post.authorName}</span>}

              {post.publishedAt && (
                <>
                  <span aria-hidden="true">&middot;</span>

                  <time dateTime={new Date(post.publishedAt).toISOString()}>
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </time>
                </>
              )}
            </div>

            {post.featuredImage && (
              <div className="relative mb-10 aspect-[16/9] w-full overflow-hidden rounded-2xl bg-soft-beige">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="h-full w-full object-cover"
                />
              </div>
            )}

            <div
              className="
                prose prose-sm sm:prose-base
                max-w-none
                text-charcoal

                prose-p:my-4
                prose-p:leading-7
                sm:prose-p:leading-7

                prose-headings:font-semibold
                prose-headings:tracking-tight
                prose-headings:text-charcoal

                prose-h2:mb-4
                prose-h2:mt-9
                prose-h2:text-xl
                sm:prose-h2:text-2xl

                prose-h3:mb-3
                prose-h3:mt-7
                prose-h3:text-lg
                sm:prose-h3:text-xl

                prose-h4:mb-2
                prose-h4:mt-6

                prose-a:font-medium
                prose-a:text-emerald
                prose-a:no-underline
                hover:prose-a:text-rich-emerald
                hover:prose-a:prose-a:underline

                prose-strong:text-charcoal

                prose-li:my-1
                prose-li:leading-7
                prose-li:marker:text-emerald

                [&_ul]:my-5
                [&_ul]:list-disc
                [&_ul]:pl-6

                [&_ol]:my-5
                [&_ol]:list-decimal
                [&_ol]:pl-6

                [&_li>ul]:my-2
                [&_li>ol]:my-2

                [&_blockquote]:my-6
                [&_blockquote]:border-l-4
                [&_blockquote]:border-emerald
                [&_blockquote]:bg-soft-beige/40
                [&_blockquote]:px-5
                [&_blockquote]:py-3
                [&_blockquote]:text-muted-teal

                [&_hr]:my-8
                [&_hr]:border-soft-beige

                [&_table]:my-8
                [&_table]:w-full
                [&_table]:border-separate
                [&_table]:border-spacing-0
                [&_table]:rounded-xl
                [&_table]:border
                [&_table]:border-emerald/30
                [&_table]:shadow-[0_10px_30px_rgba(8,127,91,0.10)]

                [&_th]:border-b
                [&_th]:border-emerald/40
                [&_th]:bg-deep-teal
                [&_th]:px-4
                [&_th]:py-3.5
                [&_th]:text-left
                [&_th]:text-xs
                [&_th]:font-semibold
                [&_th]:uppercase
                [&_th]:tracking-wider
                [&_th]:text-warm-white
                [&_th:not(:last-child)]:border-r
                [&_th_p]:m-0

                [&_td]:border-b
                [&_td]:border-emerald/20
                [&_td]:px-4
                [&_td]:py-3
                [&_td]:text-sm
                [&_td]:leading-6
                [&_td:not(:last-child)]:border-r
                [&_td_p]:m-0

                [&_tbody_tr:last-child_td]:border-b-0
                [&_tbody_tr:nth-child(even)_td]:bg-emerald/5
                [&_tbody_tr:hover_td]:bg-emerald/10

                [&_tr:first-child>*:first-child]:rounded-tl-[11px]
                [&_tr:first-child>*:last-child]:rounded-tr-[11px]
                [&_tr:last-child>*:first-child]:rounded-bl-[11px]
                [&_tr:last-child>*:last-child]:rounded-br-[11px]

                [&_code]:rounded
                [&_code]:bg-soft-beige
                [&_code]:px-1.5
                [&_code]:py-0.5
                [&_code]:text-[0.9em]
                [&_code]:text-charcoal

                [&_pre]:my-6
                [&_pre]:overflow-x-auto
                [&_pre]:rounded-xl
                [&_pre]:bg-deep-teal
                [&_pre]:p-4

                [&_img]:my-7
                [&_img]:rounded-xl

                [&_figure]:my-7

                [&_figcaption]:mt-2
                [&_figcaption]:text-center
                [&_figcaption]:text-xs
                [&_figcaption]:text-muted-teal

                [&_table]:block
                [&_table]:overflow-x-auto
                [&_table]:whitespace-normal
                sm:[&_table]:table
              "
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <div className="mt-12 border-t border-soft-beige pt-6">
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald transition-colors hover:text-rich-emerald"
              >
                ← Back to all articles
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}