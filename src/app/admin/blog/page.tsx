import Link from "next/link"
import Image from "next/image"
import { db } from "@/db"
import { posts, categories } from "@/db/schema"
import { desc, eq } from "drizzle-orm"
import { Plus, FileText, Star } from "lucide-react"
import { PostRowActions } from "@/components/admin/PostRowActions"
import type { Metadata } from "next"

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default async function AdminPostsPage() {
  const allPosts = await db
    .select({
      id: posts.id,
      title: posts.title,
      slug: posts.slug,
      status: posts.status,
      featuredImage: posts.featuredImage,
      isFeatured: posts.isFeatured,
      createdAt: posts.createdAt,
      publishedAt: posts.publishedAt,
      categoryName: categories.name,
    })
    .from(posts)
    .leftJoin(categories, eq(posts.categoryId, categories.id))
    .orderBy(desc(posts.createdAt))
    .limit(100)

  return (
    <div className="relative">
      <div className="pointer-events-none absolute -top-10 -left-10 h-72 w-72 rounded-full bg-emerald/10 blur-3xl" />
      <div className="pointer-events-none absolute top-40 right-0 h-80 w-80 rounded-full bg-gold/10 blur-3xl" />

      <div className="relative">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-charcoal">All Posts</h1>
            <p className="text-sm text-muted-teal mt-1">
              {allPosts.length} {allPosts.length === 1 ? "post" : "posts"}
            </p>
          </div>

          <Link
            href="/admin/posts/new"
            className="flex items-center gap-2 rounded-full bg-emerald hover:opacity-90 text-warm-white text-sm font-medium px-5 py-2.5 transition shadow-sm"
          >
            <Plus className="h-4 w-4" />
            Add Post
          </Link>
        </div>

        {allPosts.length === 0 ? (
          <div className="rounded-2xl bg-card border border-soft-beige shadow-sm p-12 text-center">
            <div className="h-12 w-12 rounded-xl bg-emerald/10 flex items-center justify-center mx-auto mb-3">
              <FileText className="h-5 w-5 text-emerald" />
            </div>
            <p className="text-sm font-medium text-charcoal">No posts yet</p>
            <p className="text-sm text-muted-teal mt-1">
              Create your first Hajj/Umrah guide.
            </p>
          </div>
        ) : (
          <div className="rounded-2xl bg-card border border-soft-beige shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <caption className="sr-only">
                  List of all blog posts with status, category, and date
                </caption>
                <thead>
                  <tr className="border-b border-soft-beige bg-soft-beige/40">
                    <th className="text-left font-medium text-muted-teal px-6 py-2.5">Post</th>
                    <th className="text-left font-medium text-muted-teal px-6 py-2.5">Category</th>
                    <th className="text-left font-medium text-muted-teal px-6 py-2.5">Status</th>
                    <th className="text-left font-medium text-muted-teal px-6 py-2.5">Date</th>
                    <th className="text-right font-medium text-muted-teal px-6 py-2.5">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {allPosts.map((post) => (
                    <tr
                      key={post.id}
                      className="border-b border-soft-beige last:border-0 hover:bg-soft-beige/30 transition-colors"
                    >
                      <td className="px-6 py-2.5">
                        <div className="flex items-center gap-3">
                          <div className="relative h-8 w-8 rounded-lg bg-soft-beige/60 overflow-hidden shrink-0 flex items-center justify-center">
                            {post.featuredImage ? (
                              <Image
                                src={post.featuredImage}
                                alt=""
                                fill
                                sizes="32px"
                                className="object-cover"
                              />
                            ) : (
                              <FileText className="h-3.5 w-3.5 text-muted-teal" aria-hidden="true" />
                            )}
                          </div>

                          <span className="font-medium text-charcoal line-clamp-1 flex items-center gap-1.5">
                            {post.title}
                            {post.isFeatured && (
                              <Star
                                className="h-3.5 w-3.5 shrink-0 fill-gold text-gold"
                                aria-label="Featured post"
                              />
                            )}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-2.5 text-muted-teal">
                        {post.categoryName ?? "—"}
                      </td>

                      <td className="px-6 py-2.5">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
                            post.status === "published"
                              ? "bg-emerald/10 text-emerald"
                              : post.status === "scheduled"
                                ? "bg-gold/15 text-gold"
                                : "bg-muted-teal/10 text-muted-teal"
                          }`}
                        >
                          {post.status}
                        </span>
                      </td>

                      <td className="px-6 py-2.5 text-muted-teal">
                        {(post.publishedAt ?? post.createdAt) ? (
                          <time
                            dateTime={new Date(post.publishedAt ?? post.createdAt!).toISOString()}
                          >
                            {new Date(post.publishedAt ?? post.createdAt!).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </time>
                        ) : (
                          "—"
                        )}
                      </td>

                      <td className="px-6 py-2.5">
                        <div className="flex justify-end">
                          <PostRowActions postId={post.id} slug={post.slug} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}