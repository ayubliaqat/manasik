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
      {/* Hero banner with breadcrumb + title + meta */}
  {/* Hero banner with breadcrumb + title + meta */}
{/* Hero banner with breadcrumb + title + meta */}
<section className="relative overflow-hidden bg-warm-white bg-gradient-to-br from-emerald/35 via-emerald/20 to-gold/20 pb-9 pt-4 sm:pb-11 sm:pt-5">
  {/* Soft glows */}
  <div
    aria-hidden="true"
    className="pointer-events-none absolute -top-24 left-1/4 h-56 w-56 rounded-full bg-emerald/25 blur-3xl sm:h-64 sm:w-64"
  />
  <div
    aria-hidden="true"
    className="pointer-events-none absolute -top-20 right-1/4 h-52 w-52 rounded-full bg-gold/25 blur-3xl sm:h-60 sm:w-60"
  />

  {/* Faint crescent + star background */}
  <svg
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 h-full w-full text-deep-teal opacity-[0.12]"
    style={{
      maskImage: "linear-gradient(to bottom, black 0%, transparent 95%)",
      WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 95%)",
    }}
  >
    <defs>
      <pattern
        id="hero-islamic-bg"
        width="140"
        height="140"
        patternUnits="userSpaceOnUse"
      >
        {/* tiny crescent */}
        <g transform="translate(18 16) scale(0.16)">
          <path
            d="M60 10 A40 40 0 0 0 60 90 A50 50 0 0 1 60 10 Z"
            fill="currentColor"
          />
        </g>
        {/* stars */}
        <g transform="translate(98 40) scale(0.45)">
          <path
            d="M0 -11 Q0 0 11 0 Q0 0 0 11 Q0 0 -11 0 Q0 0 0 -11Z"
            fill="currentColor"
          />
        </g>
        <g transform="translate(62 96) scale(0.3)">
          <path
            d="M0 -11 Q0 0 11 0 Q0 0 0 11 Q0 0 -11 0 Q0 0 0 -11Z"
            fill="currentColor"
          />
        </g>
        <g transform="translate(120 120) scale(0.2)">
          <path
            d="M0 -11 Q0 0 11 0 Q0 0 0 11 Q0 0 -11 0 Q0 0 0 -11Z"
            fill="currentColor"
          />
        </g>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#hero-islamic-bg)" />
  </svg>

  <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    {/* Breadcrumb: top left, above title */}
    <nav
      aria-label="Breadcrumb"
      className="mb-3 flex items-center justify-start gap-1 text-[11px] text-deep-teal/70 sm:mb-4 sm:text-xs"
    >
      <Link
        href="/"
        className="shrink-0 transition-colors hover:text-emerald"
      >
        Home
      </Link>

      <ChevronRight
        className="h-3 w-3 shrink-0 text-deep-teal/50"
        aria-hidden="true"
      />

      <Link
        href="/blog"
        className="shrink-0 transition-colors hover:text-emerald"
      >
        Blog
      </Link>

      <ChevronRight
        className="h-3 w-3 shrink-0 text-deep-teal/50"
        aria-hidden="true"
      />
    </nav>

    <div className="mx-auto max-w-3xl text-center">
      <h1 className="text-xl font-medium leading-snug tracking-tight text-charcoal sm:text-2xl lg:text-3xl">
        {post.title}
      </h1>

      <div className="mt-2 flex flex-wrap items-center justify-center gap-2 text-xs text-deep-teal/80">
        <span>By {post.authorName || "Admin"}</span>

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
    </div>
  </div>

  {/* Wavy bottom */}
  <svg
    aria-hidden="true"
    viewBox="0 0 1440 80"
    preserveAspectRatio="none"
    className="pointer-events-none absolute bottom-[-1px] left-0 z-10 block h-[20px] w-full text-warm-white sm:h-[28px] lg:h-[36px]"
  >
    <path
      fill="currentColor"
      d="M0 40 C120 80 240 80 360 50 C480 20 600 20 720 45 C840 70 960 70 1080 45 C1200 20 1320 20 1440 50 L1440 80 L0 80 Z"
    />
  </svg>
</section>

      {/* Blog view */}
      <div className="bg-warm-white">
        <article className="mx-auto max-w-5xl px-4 pb-10 pt-5 sm:px-6 sm:pb-14 sm:pt-6 lg:px-8">
          {/* JSON-LD */}
          {/* eslint-disable-next-line react/no-danger */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(jsonLd),
            }}
          />

          <div className="mx-auto max-w-4xl">
            {post.featuredImage && (
              <div className="relative mb-6 aspect-[16/9] w-full overflow-hidden rounded-2xl bg-soft-beige">
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

                prose-p:my-3
                prose-p:leading-7
                sm:prose-p:leading-7

                prose-headings:font-medium
                prose-headings:tracking-tight
                prose-headings:text-charcoal

                prose-h2:mb-3
                prose-h2:mt-7
                prose-h2:text-xl
                sm:prose-h2:text-2xl

                prose-h3:mb-2
                prose-h3:mt-5
                prose-h3:text-lg
                sm:prose-h3:text-xl

                prose-h4:mb-2
                prose-h4:mt-4

                prose-a:font-normal
                prose-a:text-emerald
                prose-a:no-underline
                hover:prose-a:text-rich-emerald
                hover:prose-a:underline

                prose-strong:font-medium
                prose-strong:text-charcoal

                prose-li:my-0.5
                prose-li:leading-7
                prose-li:marker:text-emerald

                [&_ul]:my-3
                [&_ul]:list-disc
                [&_ul]:pl-6

                [&_ol]:my-3
                [&_ol]:list-decimal
                [&_ol]:pl-6

                [&_li>ul]:my-1
                [&_li>ol]:my-1

                [&_blockquote]:my-4
                [&_blockquote]:border-l-4
                [&_blockquote]:border-emerald
                [&_blockquote]:bg-soft-beige/40
                [&_blockquote]:px-4
                [&_blockquote]:py-2
                [&_blockquote]:text-muted-teal

                [&_hr]:my-6
                [&_hr]:border-soft-beige

                [&_table]:my-5
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
                [&_th]:py-2.5
                [&_th]:text-left
                [&_th]:text-xs
                [&_th]:font-medium
                [&_th]:uppercase
                [&_th]:tracking-wider
                [&_th]:text-warm-white
                [&_th:not(:last-child)]:border-r
                [&_th_p]:m-0

                [&_td]:border-b
                [&_td]:border-emerald/20
                [&_td]:px-4
                [&_td]:py-2.5
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

                [&_pre]:my-4
                [&_pre]:overflow-x-auto
                [&_pre]:rounded-xl
                [&_pre]:bg-deep-teal
                [&_pre]:p-4

                [&_img]:my-5
                [&_img]:rounded-xl

                [&_figure]:my-5

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

            <div className="mt-8 border-t border-soft-beige pt-4">
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald transition-colors hover:text-rich-emerald"
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