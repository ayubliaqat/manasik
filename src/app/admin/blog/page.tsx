import Link from "next/link"
import Image from "next/image"
import { redirect } from "next/navigation"
import { db } from "@/db"
import { posts, categories, users } from "@/db/schema"
import { desc, eq } from "drizzle-orm"
import { Plus, FileText, Star } from "lucide-react"
import { auth } from "@/auth"
import { can, canEditPost, canDeletePost } from "@/lib//supabase/permissions"
import { PostRowActions } from "@/components/admin/PostRowActions"
import type { Metadata } from "next"

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default async function AdminPostsPage() {
  const session = await auth()
  const callerId = session?.user?.id

  if (!callerId) {
    redirect("/login")
  }

  const [caller] = await db
    .select({ id: users.id, role: users.role })
    .from(users)
    .where(eq(users.id, callerId))
    .limit(1)

  if (!caller) {
    redirect("/login")
  }

  // Editors and admins see every post. Authors see only their own.
  const seeAll = can(caller.role, "posts:edit:any")
  const canCreate = can(caller.role, "posts:create")

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
      authorId: posts.authorId,
      authorName: users.name,
      categoryName: categories.name,
    })
    .from(posts)
    .leftJoin(categories, eq(posts.categoryId, categories.id))
    .leftJoin(users, eq(posts.authorId, users.id))
    .where(seeAll ? undefined : eq(posts.authorId, caller.id))
    .orderBy(desc(posts.createdAt))
    .limit(100)

  return (
    <div className="relative">
      <div className="pointer-events-none absolute -top-10 -left-10 h-56 w-56 rounded-full bg-emerald/5 blur-3xl" />
      <div className="pointer-events-none absolute top-32 right-0 h-64 w-64 rounded-full bg-gold/5 blur-3xl" />

      <div className="relative">
        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
          <div>
            <h1 className="text-lg font-medium text-charcoal">All Posts</h1>
            <p className="text-xs text-muted-teal mt-0.5">
              {allPosts.length} {allPosts.length === 1 ? "post" : "posts"}
            </p>
          </div>

          {canCreate && (
            <Link
              href="/admin/blog/new"
              className="inline-flex items-center gap-1.5 rounded-full bg-emerald hover:opacity-90 text-warm-white text-xs font-medium px-3.5 py-1.5 transition"
            >
              <Plus className="h-3.5 w-3.5" aria-hidden="true" />
              Add Post
            </Link>
          )}
        </div>

        {allPosts.length === 0 ? (
          <div className="rounded-xl bg-card border border-soft-beige p-8 text-center">
            <div className="h-10 w-10 rounded-lg bg-emerald/10 flex items-center justify-center mx-auto mb-2.5">
              <FileText className="h-4 w-4 text-emerald" />
            </div>
            <p className="text-[13px] font-medium text-charcoal">No posts yet</p>
            <p className="text-xs text-muted-teal mt-0.5">
              Create your first Hajj/Umrah guide.
            </p>
          </div>
        ) : (
          <div className="rounded-xl bg-card border border-soft-beige overflow-hidden">
            <div>
              <table className="w-full text-[13px]">
                <caption className="sr-only">
                  List of blog posts with status, category, and date
                </caption>
                <thead>
                  <tr className="border-b border-soft-beige bg-soft-beige/30">
                    <th className="text-left text-xs font-medium text-muted-teal pl-4 pr-3 py-2">Post</th>
                    {seeAll && (
                      <th className="hidden md:table-cell text-left text-xs font-medium text-muted-teal px-3 py-2">
                        Author
                      </th>
                    )}
                    <th className="hidden sm:table-cell text-left text-xs font-medium text-muted-teal px-3 py-2">
                      Category
                    </th>
                    <th className="text-left text-xs font-medium text-muted-teal px-3 py-2">Status</th>
                    <th className="hidden sm:table-cell text-left text-xs font-medium text-muted-teal px-3 py-2">
                      Date
                    </th>
                    <th className="text-right text-xs font-medium text-muted-teal pl-3 pr-4 py-2">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {allPosts.map((post) => (
                    <tr
                      key={post.id}
                      className="border-b border-soft-beige/70 last:border-0 hover:bg-soft-beige/20 transition-colors"
                    >
                      <td className="pl-4 pr-3 py-1.5">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="relative h-7 w-7 rounded-md bg-soft-beige/50 overflow-hidden shrink-0 flex items-center justify-center">
                            {post.featuredImage ? (
                              <Image
                                src={post.featuredImage}
                                alt=""
                                fill
                                sizes="28px"
                                className="object-cover"
                              />
                            ) : (
                              <FileText className="h-3 w-3 text-muted-teal" aria-hidden="true" />
                            )}
                          </div>

                          <div className="flex items-center gap-1 min-w-0">
                            <span
                              title={post.title}
                              className="block truncate max-w-[120px] min-[400px]:max-w-[150px] sm:max-w-[170px] lg:max-w-[220px] font-medium text-charcoal"
                            >
                              {post.title}
                            </span>
                            {post.isFeatured && (
                              <Star
                                className="h-3 w-3 shrink-0 fill-gold text-gold"
                                aria-label="Featured post"
                              />
                            )}
                          </div>
                        </div>
                      </td>

                      {seeAll && (
                        <td className="hidden md:table-cell px-3 py-1.5 text-muted-teal whitespace-nowrap">
                          {post.authorName ?? "—"}
                        </td>
                      )}

                      <td className="hidden sm:table-cell px-3 py-1.5 text-muted-teal whitespace-nowrap">
                        {post.categoryName ?? "—"}
                      </td>

                      <td className="px-3 py-1.5 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium capitalize ${
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

                      <td className="hidden sm:table-cell px-3 py-1.5 text-xs text-muted-teal whitespace-nowrap">
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

                      <td className="pl-3 pr-4 py-1.5 whitespace-nowrap">
                        <div className="flex justify-end">
                          <PostRowActions
                            postId={post.id}
                            slug={post.slug}
                            canEdit={canEditPost(caller.role, caller.id, post)}
                            canDelete={canDeletePost(caller.role, caller.id, post)}
                          />
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