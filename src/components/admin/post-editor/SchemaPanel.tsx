"use client"

import { Braces, CheckCircle2 } from "lucide-react"
import type { PostFormData } from "./PostEditor"

const schemaTypes = [
  {
    value: "BlogPosting",
    label: "Blog Posting",
    description: "Standard blog article — most common choice.",
  },
  {
    value: "Article",
    label: "Article",
    description: "General news or editorial content.",
  },
  {
    value: "NewsArticle",
    label: "News Article",
    description: "Time-sensitive news or announcements.",
  },
  {
    value: "HowTo",
    label: "How-To Guide",
    description: "Step-by-step guides — great for Hajj/Umrah rites.",
  },
]

export function SchemaPanel({
  data,
  update,
}: {
  data: PostFormData
  update: <K extends keyof PostFormData>(key: K, value: PostFormData[K]) => void
}) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-sm font-semibold text-charcoal mb-1">Schema Type</h3>
        <p className="text-xs text-muted-teal mb-4">
          Tells search engines what kind of content this is, enabling rich results.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {schemaTypes.map((type) => {
            const isSelected = data.schemaType === type.value
            return (
              <button
                key={type.value}
                type="button"
                onClick={() => update("schemaType", type.value)}
                className={`text-left rounded-xl border p-4 transition ${
                  isSelected
                    ? "border-emerald bg-emerald/5"
                    : "border-soft-beige bg-warm-white hover:border-muted-teal/40"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="h-8 w-8 rounded-lg bg-emerald/10 flex items-center justify-center">
                    <Braces className="h-4 w-4 text-emerald" />
                  </div>
                  {isSelected && <CheckCircle2 className="h-4 w-4 text-emerald" />}
                </div>
                <p className="text-sm font-medium text-charcoal">{type.label}</p>
                <p className="text-xs text-muted-teal mt-0.5">{type.description}</p>
              </button>
            )
          })}
        </div>
      </div>

      <div className="rounded-xl bg-soft-beige/50 p-4">
        <p className="text-xs font-medium text-charcoal mb-1">JSON-LD Preview</p>
        <pre className="text-[11px] text-muted-teal overflow-x-auto">
{`{
  "@context": "https://schema.org",
  "@type": "${data.schemaType}",
  "headline": "${data.title || "Post title"}",
  "image": "${data.featuredImage || "..."}",
  "datePublished": "..."
}`}
        </pre>
      </div>
    </div>
  )
}
