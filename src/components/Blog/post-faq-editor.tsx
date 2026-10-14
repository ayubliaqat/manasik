// src/components/Blog/post-faq-editor.tsx
"use client"

import { Plus, Trash2 } from "lucide-react"
import type { PostFaq } from "@/db/schema"

type Props = {
  value: PostFaq[]
  onChange: (faqs: PostFaq[]) => void
  /** If set, a hidden input with this name carries the FAQs as JSON, for form actions. */
  name?: string
}

const inputClass =
  "w-full rounded-lg border border-soft-beige bg-white px-3 py-2 text-sm text-charcoal placeholder:text-muted-teal focus:border-emerald focus:outline-none focus:ring-2 focus:ring-emerald/30"

export default function PostFaqEditor({ value, onChange, name }: Props) {
  function addFaq() {
    onChange([...value, { question: "", answer: "" }])
  }

  function updateFaq(index: number, field: keyof PostFaq, text: string) {
    onChange(
      value.map((faq, i) => (i === index ? { ...faq, [field]: text } : faq))
    )
  }

  function removeFaq(index: number) {
    onChange(value.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-charcoal">FAQs</h3>
          <p className="text-xs text-muted-teal">
            Shown under the post and added to the page as FAQ schema. Empty
            items are ignored when you save.
          </p>
        </div>

        <button
          type="button"
          onClick={addFaq}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-emerald/30 bg-emerald/5 px-3.5 py-1.5 text-xs font-semibold text-emerald transition-colors hover:border-emerald hover:bg-emerald hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald/50"
        >
          <Plus className="h-3.5 w-3.5" aria-hidden="true" />
          Add FAQ
        </button>
      </div>

      {value.length === 0 ? (
        <p className="rounded-lg border border-dashed border-soft-beige px-4 py-6 text-center text-xs text-muted-teal">
          No FAQs yet. Click &quot;Add FAQ&quot; to add the first one.
        </p>
      ) : (
        <ul className="space-y-3">
          {value.map((faq, index) => (
            <li
              key={index}
              className="rounded-xl border border-soft-beige bg-white p-3"
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-semibold text-emerald">
                  FAQ {index + 1}
                </span>

                <button
                  type="button"
                  onClick={() => removeFaq(index)}
                  aria-label={`Remove FAQ ${index + 1}`}
                  className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-red-600 transition-colors hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300"
                >
                  <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                  Remove
                </button>
              </div>

              <div className="space-y-2">
                <input
                  type="text"
                  value={faq.question}
                  onChange={(e) => updateFaq(index, "question", e.target.value)}
                  placeholder="Question"
                  aria-label={`FAQ ${index + 1} question`}
                  className={inputClass}
                />
                <textarea
                  value={faq.answer}
                  onChange={(e) => updateFaq(index, "answer", e.target.value)}
                  placeholder="Answer"
                  aria-label={`FAQ ${index + 1} answer`}
                  rows={3}
                  className={inputClass}
                />
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Add another one after the last item */}
      {value.length > 0 && (
        <button
          type="button"
          onClick={addFaq}
          className="inline-flex items-center gap-1.5 rounded-full border border-emerald/30 bg-emerald/5 px-3.5 py-1.5 text-xs font-semibold text-emerald transition-colors hover:border-emerald hover:bg-emerald hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald/50"
        >
          <Plus className="h-3.5 w-3.5" aria-hidden="true" />
          Add another FAQ
        </button>
      )}

      {name && <input type="hidden" name={name} value={JSON.stringify(value)} />}
    </div>
  )
}