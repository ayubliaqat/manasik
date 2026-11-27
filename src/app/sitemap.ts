import type { MetadataRoute } from "next"
import { desc, eq } from "drizzle-orm"
import { db } from "@/db"
import { posts } from "@/db/schema"

const BASE_URL = "https://www.islam-religion.com"

export const revalidate = 300

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/blog",
    "/hajj-guide",
    "/umrah-guide",
    "/travel-tips",
    "/ziyaraat-guide",
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: now,
    changeFrequency:
      route === "" || route === "/blog" ? ("daily" as const) : ("weekly" as const),
    priority: route === "" ? 1.0 : route === "/blog" ? 0.9 : 0.8,
  }))

  try {
    const publishedPosts = await db
      .select({
        slug: posts.slug,
        updatedAt: posts.updatedAt,
        publishedAt: posts.publishedAt,
      })
      .from(posts)
      .where(eq(posts.status, "published"))
      .orderBy(desc(posts.publishedAt))

    const postRoutes: MetadataRoute.Sitemap = publishedPosts
      .filter((post) => Boolean(post.slug && post.slug.trim()))
      .map((post) => {
        const dateSource = post.updatedAt || post.publishedAt
        const parsedDate = dateSource ? new Date(dateSource) : now
        const lastModified = Number.isNaN(parsedDate.getTime())
          ? now
          : parsedDate

        return {
          url: `${BASE_URL}/blog/${post.slug.trim()}`,
          lastModified,
          changeFrequency: "weekly",
          priority: 0.7,
        }
      })

    return [...staticRoutes, ...postRoutes]
  } catch {
    return staticRoutes
  }
}