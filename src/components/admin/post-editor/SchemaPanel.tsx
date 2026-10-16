"use client"

import { useMemo } from "react"
import { Braces, CheckCircle2, AlertCircle, Wand2, Trash2 } from "lucide-react"
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

const STARTER_TEMPLATE = `{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Your question here?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Your answer here."
      }
    }
  ]
}`

type ValidationResult =
  | { status: "empty" }
  | { status: "valid" }
  | { status: "invalid"; message: string }

function validateCustomSchema(value: string): ValidationResult {
  const trimmed = value.trim()

  if (!trimmed) {
    return { status: "empty" }
  }

  if (/<\/?script/i.test(trimmed)) {
    return {
      status: "invalid",
      message: "Paste only the JSON. Remove the <script> tags.",
    }
  }

  try {
    const parsed: unknown = JSON.parse(trimmed)

    if (typeof parsed !== "object" || parsed === null) {
      return {
        status: "invalid",
        message: "Schema must be a JSON object or an array of objects.",
      }
    }

    return { status: "valid" }
  } catch (error) {
    return {
      status: "invalid",
      message:
        error instanceof Error ? error.message : "Invalid JSON.",
    }
  }
}

export function SchemaPanel({
  data,
  update,
}: {
  data: PostFormData
  update: <K extends keyof PostFormData>(key: K, value: PostFormData[K]) => void
}) {
  const customSchema = data.customSchema ?? ""

  const validation = useMemo(
    () => validateCustomSchema(customSchema),
    [customSchema]
  )

  function handleFormat() {
    try {
      const parsed: unknown = JSON.parse(customSchema)
      update("customSchema", JSON.stringify(parsed, null, 2))
    } catch {
      // Invalid JSON: the error message is already shown.
    }
  }

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

      <div>
        <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
          <h3 className="text-sm font-semibold text-charcoal">
            Custom Schema (JSON-LD)
          </h3>

          <div className="flex items-center gap-2">
            {validation.status === "empty" && (
              <button
                type="button"
                onClick={() => update("customSchema", STARTER_TEMPLATE)}
                className="inline-flex items-center gap-1.5 rounded-full border border-emerald/25 px-3 py-1 text-xs text-charcoal hover:bg-soft-beige/70 transition"
              >
                <Wand2 className="h-3.5 w-3.5" aria-hidden="true" />
                Insert template
              </button>
            )}

            {validation.status === "valid" && (
              <button
                type="button"
                onClick={handleFormat}
                className="inline-flex items-center gap-1.5 rounded-full border border-emerald/25 px-3 py-1 text-xs text-charcoal hover:bg-soft-beige/70 transition"
              >
                <Wand2 className="h-3.5 w-3.5" aria-hidden="true" />
                Format
              </button>
            )}

            {validation.status !== "empty" && (
              <button
                type="button"
                onClick={() => update("customSchema", "")}
                className="inline-flex items-center gap-1.5 rounded-full border border-red-200 px-3 py-1 text-xs text-red-600 hover:bg-red-50 transition"
              >
                <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                Clear
              </button>
            )}
          </div>
        </div>

        <p className="text-xs text-muted-teal mb-3">
          Optional. Paste your own JSON-LD (FAQPage, HowTo, Event, etc.). It is added
          to the post alongside the schema type above. Paste only the JSON, without
          &lt;script&gt; tags.
        </p>

        <textarea
          value={customSchema}
          onChange={(e) => update("customSchema", e.target.value)}
          spellCheck={false}
          rows={12}
          placeholder={`{\n  "@context": "https://schema.org",\n  "@type": "FAQPage"\n}`}
          aria-label="Custom JSON-LD schema"
          aria-invalid={validation.status === "invalid"}
          className={`w-full rounded-xl border bg-warm-white p-3 font-mono text-[12px] leading-relaxed text-charcoal focus-visible:outline-none focus-visible:ring-2 ${
            validation.status === "invalid"
              ? "border-red-400 focus-visible:ring-red-300"
              : "border-soft-beige focus-visible:ring-emerald/40"
          }`}
        />

        {validation.status === "valid" && (
          <p className="mt-2 flex items-center gap-1.5 text-xs text-emerald">
            <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
            Valid JSON
          </p>
        )}

        {validation.status === "invalid" && (
          <p
            role="alert"
            className="mt-2 flex items-start gap-1.5 text-xs text-red-600"
          >
            <AlertCircle
              className="h-3.5 w-3.5 mt-0.5 shrink-0"
              aria-hidden="true"
            />
            {validation.message}
          </p>
        )}
      </div>
    </div>
  )
}