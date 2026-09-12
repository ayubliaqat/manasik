"use client"

import { ImageUploader } from "./ImageUploader"
import type { PostFormData } from "./PostEditor"

export function SocialPanel({
  data,
  update,
}: {
  data: PostFormData
  update: <K extends keyof PostFormData>(key: K, value: PostFormData[K]) => void
}) {
  return (
    <div className="space-y-8">
      {/* Open Graph section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="h-7 w-7 rounded-lg bg-deep-teal/10 flex items-center justify-center">
            <span className="text-[11px] font-bold text-deep-teal">f</span>
          </div>
          <h3 className="text-sm font-semibold text-charcoal">Facebook / Open Graph</h3>
        </div>

        <div className="rounded-xl border border-soft-beige overflow-hidden mb-4">
          {(data.ogImage || data.featuredImage) && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={data.ogImage || data.featuredImage}
              alt="OG preview"
              className="w-full h-40 object-cover"
            />
          )}
          <div className="bg-warm-white px-4 py-3">
            <p className="text-[11px] uppercase text-muted-teal tracking-wide">manasik.com</p>
            <p className="text-sm font-semibold text-charcoal truncate">
              {data.ogTitle || data.title || "Open Graph title"}
            </p>
            <p className="text-xs text-muted-teal line-clamp-1">
              {data.ogDescription || data.metaDescription || "Open Graph description"}
            </p>
          </div>
        </div>

        <div className="space-y-3.5">
          <div>
            <label className="block text-xs font-medium text-charcoal mb-1.5">OG Title</label>
            <input
              type="text"
              value={data.ogTitle}
              onChange={(e) => update("ogTitle", e.target.value)}
              placeholder={data.title || "Same as post title by default"}
              className="w-full rounded-lg border border-soft-beige bg-warm-white px-3.5 py-2.5 text-sm text-charcoal placeholder:text-muted-teal focus:outline-none focus:ring-2 focus:ring-emerald focus:border-emerald transition"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-charcoal mb-1.5">OG Description</label>
            <textarea
              value={data.ogDescription}
              onChange={(e) => update("ogDescription", e.target.value)}
              rows={2}
              placeholder={data.metaDescription || "Same as meta description by default"}
              className="w-full rounded-lg border border-soft-beige bg-warm-white px-3.5 py-2.5 text-sm text-charcoal placeholder:text-muted-teal focus:outline-none focus:ring-2 focus:ring-emerald focus:border-emerald transition resize-none"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-charcoal mb-1.5">OG Image</label>
            <ImageUploader value={data.ogImage} onChange={(url) => update("ogImage", url)} />
          </div>
        </div>
      </div>

      <div className="h-px bg-soft-beige" />

      {/* Twitter section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="h-7 w-7 rounded-lg bg-charcoal/10 flex items-center justify-center">
            <span className="text-[11px] font-bold text-charcoal">𝕏</span>
          </div>
          <h3 className="text-sm font-semibold text-charcoal">Twitter / X</h3>
        </div>

        <div className="rounded-xl border border-soft-beige overflow-hidden mb-4">
          {(data.twitterImage || data.featuredImage) && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={data.twitterImage || data.featuredImage}
              alt="Twitter preview"
              className="w-full h-40 object-cover"
            />
          )}
          <div className="bg-warm-white px-4 py-3">
            <p className="text-sm font-semibold text-charcoal truncate">
              {data.twitterTitle || data.title || "Twitter card title"}
            </p>
            <p className="text-xs text-muted-teal line-clamp-1">
              {data.twitterDescription || data.metaDescription || "Twitter card description"}
            </p>
            <p className="text-[11px] uppercase text-muted-teal tracking-wide mt-1">
              manasik.com
            </p>
          </div>
        </div>

        <div className="space-y-3.5">
          <div>
            <label className="block text-xs font-medium text-charcoal mb-1.5">Twitter Title</label>
            <input
              type="text"
              value={data.twitterTitle}
              onChange={(e) => update("twitterTitle", e.target.value)}
              placeholder={data.title || "Same as post title by default"}
              className="w-full rounded-lg border border-soft-beige bg-warm-white px-3.5 py-2.5 text-sm text-charcoal placeholder:text-muted-teal focus:outline-none focus:ring-2 focus:ring-emerald focus:border-emerald transition"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-charcoal mb-1.5">Twitter Description</label>
            <textarea
              value={data.twitterDescription}
              onChange={(e) => update("twitterDescription", e.target.value)}
              rows={2}
              placeholder={data.metaDescription || "Same as meta description by default"}
              className="w-full rounded-lg border border-soft-beige bg-warm-white px-3.5 py-2.5 text-sm text-charcoal placeholder:text-muted-teal focus:outline-none focus:ring-2 focus:ring-emerald focus:border-emerald transition resize-none"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-charcoal mb-1.5">Twitter Image</label>
            <ImageUploader value={data.twitterImage} onChange={(url) => update("twitterImage", url)} />
          </div>
        </div>
      </div>
    </div>
  )
}
