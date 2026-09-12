"use client"

import { useState } from "react"
import { TiptapEditor } from "./TiptapEditor"
import { ImageUploader } from "./ImageUploader"
import type { PostFormData, Category, TagOption } from "./PostEditor"

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export function ContentPanel({
  data,
  update,
  categories,
  tags,
}: {
  data: PostFormData
  update: <K extends keyof PostFormData>(key: K, value: PostFormData[K]) => void
  categories: Category[]
  tags: TagOption[]
}) {
  const [slugTouched, setSlugTouched] = useState(!!data.slug)

  function handleTitleChange(value: string) {
    update("title", value)
    if (!slugTouched) {
      update("slug", slugify(value))
    }
  }

  function toggleTag(tagId: string) {
    const exists = data.tagIds.includes(tagId)
    update(
      "tagIds",
      exists ? data.tagIds.filter((id) => id !== tagId) : [...data.tagIds, tagId]
    )
  }

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <input
          type="text"
          value={data.title}
          onChange={(e) => handleTitleChange(e.target.value)}
          placeholder="Enter post title..."
          className="w-full text-xl font-semibold text-charcoal placeholder:text-muted-teal/60 border-0 border-b-2 border-soft-beige focus:border-emerald focus:outline-none pb-2 bg-transparent transition"
        />
      </div>

      {/* Slug */}
      <div>
        <label className="block text-xs font-medium text-charcoal mb-1.5">
          Slug (URL)
        </label>
        <div className="flex items-center rounded-lg border border-soft-beige bg-warm-white px-3.5 py-2 text-sm">
          <span className="text-muted-teal">/posts/</span>
          <input
            type="text"
            value={data.slug}
            onChange={(e) => {
              setSlugTouched(true)
              update("slug", slugify(e.target.value))
            }}
            className="flex-1 bg-transparent text-charcoal focus:outline-none ml-0.5"
          />
        </div>
      </div>

      {/* Featured image */}
      <div>
        <label className="block text-xs font-medium text-charcoal mb-1.5">
          Featured Image
        </label>
        <ImageUploader
          value={data.featuredImage}
          onChange={(url) => update("featuredImage", url)}
        />
      </div>

      {/* Category + Tags */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-charcoal mb-1.5">
            Category
          </label>
          <select
            value={data.categoryId}
            onChange={(e) => update("categoryId", e.target.value)}
            className="w-full rounded-lg border border-soft-beige bg-warm-white px-3.5 py-2.5 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-emerald focus:border-emerald transition"
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-charcoal mb-1.5">
            Tags
          </label>
          <div className="flex flex-wrap gap-1.5 rounded-lg border border-soft-beige bg-warm-white px-2.5 py-2 min-h-[42px]">
            {tags.length === 0 && (
              <span className="text-xs text-muted-teal py-0.5">No tags yet</span>
            )}
            {tags.map((tag) => {
              const isSelected = data.tagIds.includes(tag.id)
              return (
                <button
                  key={tag.id}
                  type="button"
                  onClick={() => toggleTag(tag.id)}
                  className={`text-xs px-2.5 py-1 rounded-full font-medium transition ${
                    isSelected
                      ? "bg-gold/20 text-gold"
                      : "bg-soft-beige/60 text-muted-teal hover:bg-soft-beige"
                  }`}
                >
                  {tag.name}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Excerpt */}
      <div>
        <label className="block text-xs font-medium text-charcoal mb-1.5">
          Excerpt
        </label>
        <textarea
          value={data.excerpt}
          onChange={(e) => update("excerpt", e.target.value)}
          rows={2}
          placeholder="A short summary shown in post listings..."
          className="w-full rounded-lg border border-soft-beige bg-warm-white px-3.5 py-2.5 text-sm text-charcoal placeholder:text-muted-teal focus:outline-none focus:ring-2 focus:ring-emerald focus:border-emerald transition resize-none"
        />
      </div>

      {/* Editor */}
      <div>
        <label className="block text-xs font-medium text-charcoal mb-1.5">
          Content
        </label>
        <TiptapEditor
          content={data.content}
          onChange={(html) => update("content", html)}
        />
      </div>
    </div>
  )
}
