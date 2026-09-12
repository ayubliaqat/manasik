"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { EditorTabs, type TabId } from "./EditorTabs"
import { ContentPanel } from "./ContentPanel"
import { SeoPanel } from "./SeoPanel"
import { SocialPanel } from "./SocialPanel"
import { SchemaPanel } from "./SchemaPanel"
import { PublishBox } from "./PublishBox"
import { SeoAnalysisBox } from "./SeoAnalysisBox"
import { createPost, updatePost } from "@/app/admin/blog/actions"

export type Category = { id: string; name: string }
export type TagOption = { id: string; name: string }
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
  tagIds: string[]
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
  ogTitle: string
  ogDescription: string
  ogImage: string
  twitterTitle: string
  twitterDescription: string
  twitterImage: string
  schemaType: string
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
  tagIds: [],
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

export function PostEditor({
  postId,
  initialData,
  categories,
  tags,
}: {
  postId?: string
  initialData?: Partial<PostFormData>
  categories: Category[]
  tags: TagOption[]
}) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<TabId>("content")
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<PostFormData>({
    ...emptyPost,
    ...initialData,
  })

  function update<K extends keyof PostFormData>(key: K, value: PostFormData[K]) {
    setData((prev) => ({ ...prev, [key]: value }))
  }

  async function handleSave(status: PostStatus) {
    setIsSaving(true)
    setError(null)

    const payload = {
      ...data,
      status,
      categoryId: data.categoryId || null,
    }

    try {
      if (postId) {
        await updatePost(postId, payload)
      } else {
        await createPost(payload)
      }
    } catch (err) {
      if (isRedirectError(err)) {
        throw err
      }
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.")
      setIsSaving(false)
    }
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-5 items-start">
      {/* Main editor column */}
      <div className="rounded-2xl bg-card border border-soft-beige shadow-sm overflow-hidden">
        <EditorTabs activeTab={activeTab} onChange={setActiveTab} />

        <div className="p-6">
          {error && (
            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {activeTab === "content" && (
            <ContentPanel data={data} update={update} categories={categories} tags={tags} />
          )}
          {activeTab === "seo" && <SeoPanel data={data} update={update} />}
          {activeTab === "social" && <SocialPanel data={data} update={update} />}
          {activeTab === "schema" && <SchemaPanel data={data} update={update} />}
        </div>
      </div>

      {/* Sticky sidebar */}
      <div className="space-y-5 xl:sticky xl:top-6">
        <PublishBox
          status={data.status}
          isSaving={isSaving}
          isEditing={!!postId}
          onSave={handleSave}
          onCancel={() => router.push("/admin/posts")}
        />
        <SeoAnalysisBox data={data} />
      </div>
    </div>
  )
}