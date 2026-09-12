"use client"

import type { PostFormData } from "./PostEditor"

function CharCount({ value, ideal }: { value: string; ideal: [number, number] }) {
  const len = value.length
  const inRange = len >= ideal[0] && len <= ideal[1]
  const color = len === 0 ? "text-muted-teal" : inRange ? "text-emerald" : "text-gold"
  return (
    <span className={`text-[11px] font-medium ${color}`}>
      {len} chars {len > 0 && !inRange && `(ideal: ${ideal[0]}–${ideal[1]})`}
    </span>
  )
}

export function SeoPanel({
  data,
  update,
}: {
  data: PostFormData
  update: <K extends keyof PostFormData>(key: K, value: PostFormData[K]) => void
}) {
  return (
    <div className="space-y-6">
      {/* Google preview */}
      <div className="rounded-xl border border-soft-beige bg-warm-white p-4">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-teal mb-3">
          Search Preview
        </p>
        <p className="text-[13px] text-emerald mb-0.5 truncate">
          manasik.com › posts › {data.slug || "your-post-slug"}
        </p>
        <p className="text-lg text-[#1a0dab] leading-snug mb-0.5 truncate">
          {data.seoTitle || data.title || "Your SEO title will appear here"}
        </p>
        <p className="text-sm text-charcoal/70 line-clamp-2">
          {data.metaDescription ||
            "Your meta description will appear here. Write a compelling summary to improve click-through rate."}
        </p>
      </div>

      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-xs font-medium text-charcoal">SEO Title</label>
          <CharCount value={data.seoTitle} ideal={[50, 60]} />
        </div>
        <input
          type="text"
          value={data.seoTitle}
          onChange={(e) => update("seoTitle", e.target.value)}
          placeholder={data.title || "Enter SEO title..."}
          className="w-full rounded-lg border border-soft-beige bg-warm-white px-3.5 py-2.5 text-sm text-charcoal placeholder:text-muted-teal focus:outline-none focus:ring-2 focus:ring-emerald focus:border-emerald transition"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-xs font-medium text-charcoal">Meta Description</label>
          <CharCount value={data.metaDescription} ideal={[140, 160]} />
        </div>
        <textarea
          value={data.metaDescription}
          onChange={(e) => update("metaDescription", e.target.value)}
          rows={3}
          placeholder="Write a compelling summary for search results..."
          className="w-full rounded-lg border border-soft-beige bg-warm-white px-3.5 py-2.5 text-sm text-charcoal placeholder:text-muted-teal focus:outline-none focus:ring-2 focus:ring-emerald focus:border-emerald transition resize-none"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-charcoal mb-1.5">
          Focus Keyphrase
        </label>
        <input
          type="text"
          value={data.focusKeyphrase}
          onChange={(e) => update("focusKeyphrase", e.target.value)}
          placeholder="e.g. hajj packing guide"
          className="w-full rounded-lg border border-soft-beige bg-warm-white px-3.5 py-2.5 text-sm text-charcoal placeholder:text-muted-teal focus:outline-none focus:ring-2 focus:ring-emerald focus:border-emerald transition"
        />
        <p className="text-[11px] text-muted-teal mt-1.5">
          The main phrase you want this post to rank for.
        </p>
      </div>

      <div>
        <label className="block text-xs font-medium text-charcoal mb-1.5">
          Canonical URL
        </label>
        <input
          type="text"
          value={data.canonicalUrl}
          onChange={(e) => update("canonicalUrl", e.target.value)}
          placeholder="Leave blank to use default URL"
          className="w-full rounded-lg border border-soft-beige bg-warm-white px-3.5 py-2.5 text-sm text-charcoal placeholder:text-muted-teal focus:outline-none focus:ring-2 focus:ring-emerald focus:border-emerald transition"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-charcoal mb-1.5">
          Breadcrumb Title
        </label>
        <input
          type="text"
          value={data.breadcrumbTitle}
          onChange={(e) => update("breadcrumbTitle", e.target.value)}
          placeholder={data.title || "Short title for breadcrumb navigation"}
          className="w-full rounded-lg border border-soft-beige bg-warm-white px-3.5 py-2.5 text-sm text-charcoal placeholder:text-muted-teal focus:outline-none focus:ring-2 focus:ring-emerald focus:border-emerald transition"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-charcoal mb-1.5">
            Robots — Indexing
          </label>
          <select
            value={data.robotsIndex}
            onChange={(e) => update("robotsIndex", e.target.value)}
            className="w-full rounded-lg border border-soft-beige bg-warm-white px-3.5 py-2.5 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-emerald focus:border-emerald transition"
          >
            <option value="index">Index</option>
            <option value="noindex">Noindex</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-charcoal mb-1.5">
            Robots — Following
          </label>
          <select
            value={data.robotsFollow}
            onChange={(e) => update("robotsFollow", e.target.value)}
            className="w-full rounded-lg border border-soft-beige bg-warm-white px-3.5 py-2.5 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-emerald focus:border-emerald transition"
          >
            <option value="follow">Follow</option>
            <option value="nofollow">Nofollow</option>
          </select>
        </div>
      </div>
    </div>
  )
}
