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
      description: post.ogDescription || post.metaDescription || post.excerpt || undefined,
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
      title: post.twitterTitle || post.ogTitle || post.seoTitle || post.title,
      description:
        post.twitterDescription || post.ogDescription || post.metaDescription || post.excerpt || undefined,
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
    datePublished: post.publishedAt ? new Date(post.publishedAt).toISOString() : undefined,
    author: post.authorName ? { "@type": "Person", name: post.authorName } : undefined,
  }

  return (
    <article className="mx-auto max-w-5xl px-16 py-10 sm:px-6 sm:py-14">
      {/* eslint-disable-next-line react/no-danger */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center gap-2 text-xs text-muted-teal sm:text-sm">
        <Link href="/" className="transition-colors hover:text-emerald">
          Home
        </Link>
        <ChevronRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        <Link href="/blog" className="transition-colors hover:text-emerald">
          Blog
        </Link>
        <ChevronRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        <span className="line-clamp-1 text-charcoal">{post.breadcrumbTitle || post.title}</span>
      </nav>

      {post.categoryName && (
        <p className="mb-3 text-xs font-medium uppercase tracking-wide text-emerald">
          {post.categoryName}
        </p>
      )}

      <h1 className="mb-4 text-2xl font-semibold leading-tight text-charcoal sm:text-3xl lg:text-4xl">
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
        <div className="relative mb-8 aspect-[16/9] w-full overflow-hidden rounded-2xl bg-soft-beige">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.featuredImage}
            alt={post.title}
            className="h-full w-full object-cover"
          />
        </div>
      )}

      <div
        className="prose prose-sm sm:prose-base lg:prose-lg max-w-none text-charcoal prose-headings:text-charcoal prose-a:text-emerald"
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
    </article>
  )
}