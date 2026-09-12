import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { eq } from "drizzle-orm"
import { db } from "@/db"
import { posts, categories, users } from "@/db/schema"

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

      // SEO
      seoTitle: posts.seoTitle,
      metaDescription: posts.metaDescription,
      canonicalUrl: posts.canonicalUrl,
      robotsIndex: posts.robotsIndex,
      robotsFollow: posts.robotsFollow,
      breadcrumbTitle: posts.breadcrumbTitle,

      // Social
      ogTitle: posts.ogTitle,
      ogDescription: posts.ogDescription,
      ogImage: posts.ogImage,
      twitterTitle: posts.twitterTitle,
      twitterDescription: posts.twitterDescription,
      twitterImage: posts.twitterImage,

      // Schema
      schemaType: posts.schemaType,

      // Publishing
      publishedAt: posts.publishedAt,

      // Relations
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

  const canonicalUrl =
    post.canonicalUrl || `/blog/${post.slug}`

  return {
    title: post.seoTitle || post.title,

    description:
      post.metaDescription ||
      post.excerpt ||
      undefined,

    alternates: {
      canonical: canonicalUrl,
    },

    robots: {
      index: post.robotsIndex !== "noindex",
      follow: post.robotsFollow !== "nofollow",
    },

    openGraph: {
      title:
        post.ogTitle ||
        post.seoTitle ||
        post.title,

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
        post.twitterImage ||
        post.ogImage ||
        post.featuredImage
          ? [
              post.twitterImage ||
                post.ogImage ||
                post.featuredImage!,
            ]
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

  return (
    <article className="max-w-3xl mx-auto px-6 py-12">
      {post.categoryName && (
        <p className="text-xs font-medium text-emerald uppercase tracking-wide mb-3">
          {post.categoryName}
        </p>
      )}

      <h1 className="text-3xl sm:text-4xl font-semibold text-charcoal leading-tight mb-4">
        {post.title}
      </h1>

      <div className="flex items-center gap-3 text-sm text-muted-teal mb-8">
        {post.authorName && (
          <span>By {post.authorName}</span>
        )}

        {post.publishedAt && (
          <>
            <span>&middot;</span>

            <time
              dateTime={new Date(
                post.publishedAt
              ).toISOString()}
            >
              {new Date(
                post.publishedAt
              ).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </time>
          </>
        )}
      </div>

      {post.featuredImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.featuredImage}
          alt={post.title}
          className="w-full h-auto rounded-2xl mb-8"
        />
      )}

      <div
        className="prose prose-lg max-w-none text-charcoal prose-headings:text-charcoal prose-a:text-emerald"
        dangerouslySetInnerHTML={{
          __html: post.content,
        }}
      />
    </article>
  )
}
