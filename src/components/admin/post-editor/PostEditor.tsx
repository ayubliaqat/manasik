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
import { createPost, updatePost } from "@/app/admin/posts/actions"

export type Category = { id: string; name: string }
export type TagOption = { id: string; name: string }

export type PostFormData = {
  title: string
  slug: string
  excerpt: string
  content: string
  featuredImage: string
  status: string
  categoryId: string
  tagIds: string[]
  seoTitle: string
  metaDescription: string
  focusKeyphrase: string
  canonicalUrl: string
  robotsIndex: string
  robotsFollow: string
  breadcrumbTitle: string
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
  status: "draft",
  categoryId: "",
  tagIds: [],
  seoTitle: "",
  metaDescription: "",
  focusKeyphrase: "",
  canonicalUrl: "",
  robotsIndex: "index",
  robotsFollow: "follow",
  breadcrumbTitle: "",
  ogTitle: "",
  ogDescription: "",
  ogImage: "",
  twitterTitle: "",
  twitterDescription: "",
  twitterImage: "",
  schemaType: "BlogPosting",
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
  const [data, setData] = useState<PostFormData>({
    ...emptyPost,
    ...initialData,
  })

  function update<K extends keyof PostFormData>(key: K, value: PostFormData[K]) {
    setData((prev) => ({ ...prev, [key]: value }))
  }

  async function handleSave(status: string) {
    setIsSaving(true)
    const payload = {
      ...data,
      status,
      categoryId: data.categoryId || null,
      publishedAt: null,
    }

    if (postId) {
      await updatePost(postId, payload)
    } else {
      await createPost(payload)
    }
    setIsSaving(false)
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-5 items-start">
      {/* Main editor column */}
      <div className="rounded-2xl bg-card border border-soft-beige shadow-sm overflow-hidden">
        <EditorTabs activeTab={activeTab} onChange={setActiveTab} />

        <div className="p-6">
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
