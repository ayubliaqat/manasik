"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import type { PostFaq } from "@/db/schema"
import PostFaqEditor from "@/components/Blog/post-faq-editor"
import { EditorTabs, type TabId } from "./EditorTabs"
import { ContentPanel } from "./ContentPanel"
import { SeoPanel } from "./SeoPanel"
import { SocialPanel } from "./SocialPanel"
import { SchemaPanel } from "./SchemaPanel"
import { PublishBox } from "./PublishBox"
import { SeoAnalysisBox } from "./SeoAnalysisBox"
import { createPost, updatePost } from "@/app/admin/blog/actions"

export type Category = {
  id: string
  name: string
}

export type PostStatus = "draft" | "published" | "scheduled"

export type PostFormData = {
  title: string
  slug: string
  excerpt: string
  content: string
  featuredImage: string
  isFeatured: boolean
  status: PostStatus
  categoryId: string
  // Tags typed by the user for this post (names, not ids)
  tags: string[]

  // Scheduling: local date and time from the picker, e.g. "2026-11-20T09:30".
  // The edit page passes an ISO string, which is converted below.
  scheduledAt: string

  // FAQs
  faqs: PostFaq[]

  // SEO
  seoTitle: string
  metaDescription: string
  focusKeyphrase: string
  keyphraseDensity: number
  canonicalUrl: string
  robotsIndex: string
  robotsFollow: string
  breadcrumbTitle: string
  seoScore: number
  readabilityScore: number

  // Open Graph
  ogTitle: string
  ogDescription: string
  ogImage: string

  // Twitter
  twitterTitle: string
  twitterDescription: string
  twitterImage: string

  // Schema
  schemaType: string
  customSchema: string
}

const emptyPost: PostFormData = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  featuredImage: "",
  isFeatured: false,
  status: "draft",
  categoryId: "",
  tags: [],

  scheduledAt: "",

  faqs: [],

  seoTitle: "",
  metaDescription: "",
  focusKeyphrase: "",
  keyphraseDensity: 0,
  canonicalUrl: "",
  robotsIndex: "index",
  robotsFollow: "follow",
  breadcrumbTitle: "",
  seoScore: 0,
  readabilityScore: 0,

  ogTitle: "",
  ogDescription: "",
  ogImage: "",

  twitterTitle: "",
  twitterDescription: "",
  twitterImage: "",

  schemaType: "BlogPosting",
  customSchema: "",
}

function isRedirectError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "digest" in error &&
    typeof (error as { digest: unknown }).digest === "string" &&
    (error as { digest: string }).digest.startsWith("NEXT_REDIRECT")
  )
}

// Converts a saved ISO date into the local "YYYY-MM-DDTHH:mm" the picker needs
function toLocalInputValue(iso: string | undefined): string {
  if (!iso) return ""

  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return ""

  const pad = (n: number) => String(n).padStart(2, "0")

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`
}

export function PostEditor({
  postId,
  initialData,
  categories,
  canPublish = false,
}: {
  postId?: string
  initialData?: Partial<PostFormData>
  categories: Category[]
  canPublish?: boolean
}) {
  const router = useRouter()

  const [activeTab, setActiveTab] = useState<TabId>("content")
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [data, setData] = useState<PostFormData>({
    ...emptyPost,
    ...initialData,
    // Always an array, even if the edit page passes nothing for tags.
    tags: initialData?.tags ?? [],
    // Saved ISO date -> local picker value.
    scheduledAt: toLocalInputValue(initialData?.scheduledAt),
    // Always an array, even if the edit page passes nothing for faqs.
    faqs: initialData?.faqs ?? [],
    // Always a string, even if the edit page passes nothing for customSchema.
    customSchema: initialData?.customSchema ?? "",
  })

  function update<K extends keyof PostFormData>(
    key: K,
    value: PostFormData[K]
  ) {
    setData((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  async function handleSave(status: PostStatus) {
    setIsSaving(true)
    setError(null)

    const scheduledDate = data.scheduledAt ? new Date(data.scheduledAt) : null

    if (
      status === "scheduled" &&
      (!scheduledDate || Number.isNaN(scheduledDate.getTime()))
    ) {
      setError("Choose a date and time to schedule this post.")
      setIsSaving(false)
      return
    }

    const payload = {
      ...data,
      status,
      categoryId: data.categoryId || null,
      // Sent as an exact moment (ISO), so the server needs no timezone guessing.
      scheduledAt:
        status === "scheduled" && scheduledDate
          ? scheduledDate.toISOString()
          : null,
    }

    try {
      if (postId) {
        await updatePost(postId, payload)
      } else {
        await createPost(payload)
      }
    } catch (err) {
      // Next.js redirect() throws internally.
      // Let that redirect continue normally.
      if (isRedirectError(err)) {
        throw err
      }

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      )

      setIsSaving(false)
    }
  }

  function handleCancel() {
    router.push("/admin/blog")
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-5 items-start">
      {/* Main editor column */}
      <div className="rounded-2xl bg-card border border-soft-beige shadow-sm overflow-hidden">
        <EditorTabs
          activeTab={activeTab}
          onChange={setActiveTab}
        />

        <div className="p-6">
          {error && (
            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {activeTab === "content" && (
            <ContentPanel
              data={data}
              update={update}
              categories={categories}
            />
          )}

          {activeTab === "seo" && (
            <div className="space-y-8">
              <SeoPanel
                data={data}
                update={update}
              />

              {/* FAQs: added by the SEO team, shown on the post page */}
              <div className="border-t border-soft-beige pt-6">
                <PostFaqEditor
                  value={data.faqs}
                  onChange={(faqs) => update("faqs", faqs)}
                />
              </div>
            </div>
          )}

          {activeTab === "social" && (
            <SocialPanel
              data={data}
              update={update}
            />
          )}

          {activeTab === "schema" && (
            <SchemaPanel
              data={data}
              update={update}
            />
          )}
        </div>
      </div>

      {/* Sticky sidebar */}
      <div className="space-y-5 xl:sticky xl:top-6">
        <PublishBox
          status={data.status}
          scheduledAt={data.scheduledAt}
          onScheduledAtChange={(value) => update("scheduledAt", value)}
          isSaving={isSaving}
          isEditing={!!postId}
          canPublish={canPublish}
          onSave={handleSave}
          onCancel={handleCancel}
        />

        <SeoAnalysisBox data={data} />
      </div>
    </div>
  )
}