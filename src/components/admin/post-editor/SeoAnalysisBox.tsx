"use client"

import { CheckCircle2, XCircle, MinusCircle } from "lucide-react"
import type { PostFormData } from "./PostEditor"

type CheckResult = "good" | "bad" | "neutral"

function getTextFromHtml(html: string) {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()
}

function runChecks(data: PostFormData) {
  const keyphrase = data.focusKeyphrase.trim().toLowerCase()
  const plainContent = getTextFromHtml(data.content).toLowerCase()
  const wordCount = plainContent.split(/\s+/).filter(Boolean).length
  const title = (data.seoTitle || data.title).toLowerCase()
  const metaDesc = data.metaDescription.toLowerCase()
  const slug = data.slug.toLowerCase()

  const checks: { label: string; result: CheckResult }[] = []

  if (!keyphrase) {
    checks.push({ label: "Set a focus keyphrase to see analysis", result: "neutral" })
    return checks
  }

  checks.push({
    label: "Keyphrase in SEO title",
    result: title.includes(keyphrase) ? "good" : "bad",
  })

  checks.push({
    label: "Keyphrase in slug",
    result: slug.includes(keyphrase.replace(/\s+/g, "-")) ? "good" : "bad",
  })

  checks.push({
    label: "Keyphrase in meta description",
    result: metaDesc.includes(keyphrase) ? "good" : "bad",
  })

  const introText = plainContent.slice(0, 300)
  checks.push({
    label: "Keyphrase in introduction",
    result: introText.includes(keyphrase) ? "good" : "bad",
  })

  const occurrences = plainContent.split(keyphrase).length - 1
  const density = wordCount > 0 ? (occurrences / wordCount) * 100 : 0
  checks.push({
    label: `Keyphrase density (${density.toFixed(1)}%)`,
    result: density >= 0.5 && density <= 2.5 ? "good" : occurrences === 0 ? "bad" : "neutral",
  })

  checks.push({
    label: `Content length (${wordCount} words)`,
    result: wordCount >= 600 ? "good" : wordCount >= 300 ? "neutral" : "bad",
  })

  checks.push({
    label: "SEO title length",
    result:
      data.seoTitle.length >= 40 && data.seoTitle.length <= 60 ? "good" : "neutral",
  })

  checks.push({
    label: "Meta description length",
    result:
      data.metaDescription.length >= 120 && data.metaDescription.length <= 160
        ? "good"
        : "neutral",
  })

  checks.push({
    label: "Has featured image",
    result: data.featuredImage ? "good" : "bad",
  })

  return checks
}

export function SeoAnalysisBox({ data }: { data: PostFormData }) {
  const checks = runChecks(data)
  const goodCount = checks.filter((c) => c.result === "good").length
  const scorable = checks.filter((c) => c.result !== "neutral" || checks.length === 1)
  const score =
    data.focusKeyphrase.trim() === ""
      ? null
      : Math.round((goodCount / checks.length) * 100)

  const scoreColor =
    score === null
      ? "text-muted-teal"
      : score >= 70
      ? "text-emerald"
      : score >= 40
      ? "text-gold"
      : "text-red-500"

  const Icon = { good: CheckCircle2, bad: XCircle, neutral: MinusCircle }
  const iconColor = { good: "text-emerald", bad: "text-red-500", neutral: "text-muted-teal" }

  return (
    <div className="rounded-2xl bg-card border border-soft-beige shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-charcoal">SEO Analysis</h3>
        {score !== null && (
          <span className={`text-sm font-bold ${scoreColor}`}>{score}/100</span>
        )}
      </div>

      <div className="space-y-2.5">
        {checks.map((check, i) => {
          const CheckIcon = Icon[check.result]
          return (
            <div key={i} className="flex items-start gap-2">
              <CheckIcon className={`h-4 w-4 shrink-0 mt-0.5 ${iconColor[check.result]}`} />
              <span className="text-xs text-charcoal leading-relaxed">{check.label}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
