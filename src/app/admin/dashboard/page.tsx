import { db } from "@/db"
import { posts, users, categories, postTags } from "@/db/schema"
import { sql, eq } from "drizzle-orm"
import {
  FileText,
  CheckCircle2,
  Clock,
  FileClock,
  Users,
  MessageSquare,
} from "lucide-react"
import { CategoryDonut } from "@/components/admin/CategoryDonut"

async function getDashboardData() {
  const [postCounts] = await db
    .select({
      total: sql<number>`count(*)`,
      published: sql<number>`count(*) filter (where ${posts.status} = 'published')`,
      draft: sql<number>`count(*) filter (where ${posts.status} = 'draft')`,
      scheduled: sql<number>`count(*) filter (where ${posts.status} = 'scheduled')`,
    })
    .from(posts)

  const [userCount] = await db
    .select({ count: sql<number>`count(*)` })
    .from(users)

  const categoryBreakdown = await db
    .select({
      name: categories.name,
      count: sql<number>`count(${posts.id})`,
    })
    .from(categories)
    .leftJoin(posts, eq(posts.categoryId, categories.id))
    .groupBy(categories.id, categories.name)
    .orderBy(categories.name)

  const recentUsers = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      createdAt: users.createdAt,
    })
    .from(users)
    .orderBy(sql`${users.createdAt} desc`)
    .limit(5)

  return {
    postStats: {
      total: Number(postCounts?.total ?? 0),
      published: Number(postCounts?.published ?? 0),
      draft: Number(postCounts?.draft ?? 0),
      scheduled: Number(postCounts?.scheduled ?? 0),
    },
    userTotal: Number(userCount?.count ?? 0),
    categoryTotal: categoryBreakdown.length,
    categoryBreakdown: categoryBreakdown.map((c) => ({
      name: c.name,
      count: Number(c.count),
    })),
    recentUsers,
  }
}

function PostDonut({
  postStats,
}: {
  postStats: {
    total: number
    published: number
    draft: number
    scheduled: number
  }
}) {
  const { total, published, draft, scheduled } = postStats

  if (total === 0) {
    return (
      <div className="relative mx-auto flex h-44 w-44 items-center justify-center">
        <div className="absolute inset-0 rounded-full border-[12px] border-soft-beige" />
        <div className="text-center">
          <p className="text-xl font-medium text-charcoal">0</p>
          <p className="text-xs text-muted-teal">No posts yet</p>
        </div>
      </div>
    )
  }

  const pubPct = (published / total) * 100
  const draftPct = (draft / total) * 100
  const schedPct = (scheduled / total) * 100

  const gradient = `conic-gradient(
    var(--color-emerald) 0% ${pubPct}%,
    var(--color-muted-teal) ${pubPct}% ${pubPct + draftPct}%,
    var(--color-gold) ${pubPct + draftPct}% ${pubPct + draftPct + schedPct}%
  )`

  return (
    <div className="relative mx-auto flex h-44 w-44 items-center justify-center">
      <div
        className="absolute inset-0 rounded-full"
        style={{ background: gradient }}
      />

      <div className="absolute inset-[12px] flex flex-col items-center justify-center rounded-full bg-card">
        <p className="text-xl font-medium text-charcoal">{total}</p>
        <p className="text-xs text-muted-teal">Total posts</p>
      </div>
    </div>
  )
}

export default async function AdminDashboardPage() {
  const {
    postStats,
    userTotal,
    categoryTotal,
    categoryBreakdown,
    recentUsers,
  } = await getDashboardData()

  const quickStats = [
    {
      label: "All Posts",
      value: postStats.total,
      icon: FileText,
      color: "text-deep-teal",
      bg: "bg-deep-teal/10",
    },
    {
      label: "Published",
      value: postStats.published,
      icon: CheckCircle2,
      color: "text-emerald",
      bg: "bg-emerald/10",
    },
    {
      label: "Drafts",
      value: postStats.draft,
      icon: FileClock,
      color: "text-muted-teal",
      bg: "bg-muted-teal/10",
    },
    {
      label: "Total Users",
      value: userTotal,
      icon: Users,
      color: "text-gold",
      bg: "bg-gold/15",
    },
  ]

  return (
    <div className="relative">
      <div className="pointer-events-none absolute -left-10 -top-10 h-72 w-72 rounded-full bg-emerald/10 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-40 h-80 w-80 rounded-full bg-gold/10 blur-3xl" />

      <div className="relative">
        <div className="mb-6">
          <h1 className="text-xl font-medium text-charcoal sm:text-2xl">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-muted-teal">
            Overview of your Manasik content
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <div className="rounded-2xl border border-soft-beige bg-card p-5 shadow-sm">
            <h2 className="mb-4 text-sm font-medium text-charcoal">
              Post Status
            </h2>

            <PostDonut postStats={postStats} />

            <div className="mt-5 flex items-center justify-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald" />
                <span className="text-xs text-muted-teal">Published</span>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-muted-teal" />
                <span className="text-xs text-muted-teal">Draft</span>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-gold" />
                <span className="text-xs text-muted-teal">Scheduled</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-2">
            {quickStats.map((stat) => {
              const Icon = stat.icon

              return (
                <div
                  key={stat.label}
                  className="flex items-center gap-4 rounded-2xl border border-soft-beige bg-card p-5 shadow-sm"
                >
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${stat.bg}`}
                  >
                    <Icon className={`h-5 w-5 ${stat.color}`} />
                  </div>

                  <div>
                    <p className="text-xl font-medium text-charcoal">
                      {stat.value}
                    </p>
                    <p className="text-xs text-muted-teal">{stat.label}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className="rounded-2xl border border-soft-beige bg-card p-5 shadow-sm">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-deep-teal/10">
                <Users className="h-4 w-4 text-deep-teal" />
              </div>

              <h2 className="text-sm font-medium text-charcoal">
                Recent Users
              </h2>
            </div>

            {recentUsers.length === 0 ? (
              <p className="mt-2 text-sm text-muted-teal">
                No users yet.
              </p>
            ) : (
              <div className="mt-2 space-y-3">
                {recentUsers.map((u) => (
                  <div key={u.id} className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-deep-teal/10 text-xs font-medium text-deep-teal">
                      {(u.name ?? u.email)?.charAt(0).toUpperCase()}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm text-charcoal">
                        {u.name ?? u.email}
                      </p>
                      <p className="truncate text-xs text-muted-teal">
                        {u.email}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-soft-beige bg-card p-5 shadow-sm">
            <div className="mb-1 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold/15">
                <MessageSquare className="h-4 w-4 text-gold" />
              </div>

              <h2 className="text-sm font-medium text-charcoal">
                Recent Messages
              </h2>
            </div>

            <p className="mt-3 text-sm text-muted-teal">
              Messages feature coming soon.
            </p>
          </div>
        </div>

        <div className="mt-5">
          <CategoryDonut categories={categoryBreakdown} />
        </div>
      </div>
    </div>
  )
}
