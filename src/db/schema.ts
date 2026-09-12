import {
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  primaryKey,
  integer,
  index,
  boolean,
  real,
} from "drizzle-orm/pg-core"
import type { AdapterAccountType } from "next-auth/adapters"

export const userRoleEnum = pgEnum("user_role", ["user", "admin", "Editor"])

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name"),
  email: text("email").unique().notNull(),
  password: text("password").notNull(),
  role: userRoleEnum("role").default("user").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow(),
})

export const accounts = pgTable(
  "account",
  {
    userId: uuid("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => [
    primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    index("account_user_id_idx").on(account.userId),
  ]
)

export const sessions = pgTable(
  "session",
  {
    sessionToken: text("sessionToken").primaryKey(),
    userId: uuid("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (session) => [index("session_user_id_idx").on(session.userId)]
)

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => [
    primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  ]
)

export const categories = pgTable("categories", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").unique().notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
})

export const tags = pgTable("tags", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").unique().notNull(),
  createdAt: timestamp("created_at").defaultNow(),
})

export const posts = pgTable(
  "posts",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    // Content
    title: text("title").notNull(),
    slug: text("slug").unique().notNull(),
    excerpt: text("excerpt"),
    content: text("content").notNull(),
    featuredImage: text("featured_image"),
    isFeatured: boolean("is_featured").default(false).notNull(),
    status: text("status").default("draft").notNull(),
    categoryId: uuid("category_id").references(() => categories.id, { onDelete: "set null" }),
    authorId: uuid("author_id").references(() => users.id, { onDelete: "set null" }),

    // SEO
    seoTitle: text("seo_title"),
    metaDescription: text("meta_description"),
    focusKeyphrase: text("focus_keyphrase"),
    keyphraseDensity: real("keyphrase_density").default(0),
    canonicalUrl: text("canonical_url"),
    robotsIndex: text("robots_index").default("index").notNull(),
    robotsFollow: text("robots_follow").default("follow").notNull(),
    breadcrumbTitle: text("breadcrumb_title"),
    seoScore: integer("seo_score").default(0),
    readabilityScore: integer("readability_score").default(0),

    // Social
    ogTitle: text("og_title"),
    ogDescription: text("og_description"),
    ogImage: text("og_image"),
    twitterTitle: text("twitter_title"),
    twitterDescription: text("twitter_description"),
    twitterImage: text("twitter_image"),

    // Schema
    schemaType: text("schema_type").default("BlogPosting").notNull(),

    // Timestamps
    publishedAt: timestamp("published_at"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => [
    index("posts_status_published_at_idx").on(table.status, table.publishedAt),
    index("posts_category_id_idx").on(table.categoryId),
    index("posts_author_id_idx").on(table.authorId),
    index("posts_is_featured_idx").on(table.isFeatured),
  ]
)

export const postTags = pgTable(
  "post_tags",
  {
    postId: uuid("post_id")
      .notNull()
      .references(() => posts.id, { onDelete: "cascade" }),
    tagId: uuid("tag_id")
      .notNull()
      .references(() => tags.id, { onDelete: "cascade" }),
  },
  (t) => [
    primaryKey({ columns: [t.postId, t.tagId] }),
    index("post_tags_tag_id_idx").on(t.tagId),
  ]
)

export const postSlugHistory = pgTable(
  "post_slug_history",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    postId: uuid("post_id")
      .notNull()
      .references(() => posts.id, { onDelete: "cascade" }),
    oldSlug: text("old_slug").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => [
    index("post_slug_history_old_slug_idx").on(table.oldSlug),
    index("post_slug_history_post_id_idx").on(table.postId),
  ]
)