"use client"

import { useState } from "react"
import { FileText, Search, Share2, Braces } from "lucide-react"

export type TabId = "content" | "seo" | "social" | "schema"

const tabs: { id: TabId; label: string; icon: typeof FileText }[] = [
  { id: "content", label: "Content", icon: FileText },
  { id: "seo", label: "SEO", icon: Search },
  { id: "social", label: "Social", icon: Share2 },
  { id: "schema", label: "Schema", icon: Braces },
]

export function EditorTabs({
  activeTab,
  onChange,
}: {
  activeTab: TabId
  onChange: (tab: TabId) => void
}) {
  return (
    <div className="flex items-center gap-1.5 border-b border-soft-beige px-2">
      {tabs.map((tab) => {
        const Icon = tab.icon
        const isActive = activeTab === tab.id
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 -mb-px transition-colors ${
              isActive
                ? "border-emerald text-emerald"
                : "border-transparent text-muted-teal hover:text-charcoal"
            }`}
          >
            <Icon className="h-4 w-4" />
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}
