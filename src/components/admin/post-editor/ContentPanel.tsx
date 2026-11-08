"use client"

import { useState, type KeyboardEvent } from "react"
import { X } from "lucide-react"
import { TiptapEditor } from "./TiptapEditor"
import { ImageUploader } from "./ImageUploader"
import type { PostFormData, Category } from "./PostEditor"

const MAX_TAGS = 15
const MAX_TAG_LENGTH = 40

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
}: {
  data: PostFormData
  update: <K extends keyof PostFormData>(key: K, value: PostFormData[K]) => void
  categories: Category[]
}) {
  const [slugTouched, setSlugTouched] = useState(!!data.slug)
  const [tagInput, setTagInput] = useState("")

  function handleTitleChange(value: string) {
    update("title", value)
    if (!slugTouched) {
      update("slug", slugify(value))
    }
  }

  function addTags(raw: string) {
    const parts = raw
      .split(",")
      .map((t) => t.trim().replace(/\s+/g, " ").slice(0, MAX_TAG_LENGTH))
      .filter(Boolean)

    if (parts.length === 0) return

    const next = [...data.tags]
    for (const part of parts) {
      if (next.length >= MAX_TAGS) break
      const exists = next.some((t) => t.toLowerCase() === part.toLowerCase())
      if (!exists) next.push(part)
    }

    update("tags", next)
    setTagInput("")
  }

  function removeTag(tag: string) {
    update(
      "tags",
      data.tags.filter((t) => t !== tag)
    )
  }

  function handleTagKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      addTags(tagInput)
    } else if (e.key === "Backspace" && tagInput === "" && data.tags.length > 0) {
      removeTag(data.tags[data.tags.length - 1])
    }
  }

  const tagLimitReached = data.tags.length >= MAX_TAGS

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
          <label
            htmlFor="post-tags"
            className="block text-xs font-medium text-charcoal mb-1.5"
          >
            Tags
          </label>
          <div className="flex flex-wrap items-center gap-1.5 rounded-lg border border-soft-beige bg-warm-white px-2.5 py-2 min-h-[42px] focus-within:ring-2 focus-within:ring-emerald focus-within:border-emerald transition">
            {data.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 text-xs pl-2.5 pr-1.5 py-1 rounded-full font-medium bg-gold/20 text-gold"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  aria-label={`Remove tag ${tag}`}
                  className="rounded-full p-0.5 hover:bg-gold/30 transition"
                >
                  <X className="h-3 w-3" aria-hidden="true" />
                </button>
              </span>
            ))}
            <input
              id="post-tags"
              type="text"
              value={tagInput}
              onChange={(e) => {
                const v = e.target.value
                if (v.includes(",")) addTags(v)
                else setTagInput(v)
              }}
              onKeyDown={handleTagKeyDown}
              onBlur={() => addTags(tagInput)}
              disabled={tagLimitReached}
              placeholder={
                tagLimitReached
                  ? "Tag limit reached"
                  : data.tags.length === 0
                    ? "Type a tag and press Enter"
                    : "Add another..."
              }
              className="flex-1 min-w-[120px] bg-transparent text-sm text-charcoal placeholder:text-muted-teal focus:outline-none disabled:cursor-not-allowed"
            />
          </div>
          <p className="mt-1.5 text-[11px] text-muted-teal">
            Press Enter or comma to add. Up to {MAX_TAGS} tags per post.
          </p>
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
    </div>
  )
}