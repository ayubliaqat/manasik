"use client"

import { useState, type ComponentType } from "react"
import {
  Briefcase,
  Calculator,
  ClipboardCheck,
  Coins,
  type LucideIcon,
} from "lucide-react"
import HajjChecklist from "./HajjChecklist"
import UmrahPackingList from "./UmrahPackingList"
import CostEstimator from "./CostEstimator"
import ZakatCalculator from "./ZakatCalculator"

type Tool = {
  id: string
  label: string
  title: string
  description: string
  icon: LucideIcon
  Component: ComponentType
}

const TOOLS: Tool[] = [
  {
    id: "hajj-checklist",
    label: "Hajj Checklist",
    title: "Hajj checklist",
    description:
      "Tick off documents, health, spiritual and money preparations. Your progress is saved on this device.",
    icon: ClipboardCheck,
    Component: HajjChecklist,
  },
  {
    id: "packing-list",
    label: "Packing List",
    title: "Umrah packing list",
    description:
      "Choose who you are packing for and check items off as you pack. Your progress is saved on this device.",
    icon: Briefcase,
    Component: UmrahPackingList,
  },
  {
    id: "cost-estimator",
    label: "Cost Estimator",
    title: "Trip cost estimator",
    description:
      "Enter your flights, stay and daily spending to see the total and the cost per person.",
    icon: Calculator,
    Component: CostEstimator,
  },
  {
    id: "zakat",
    label: "Zakat Calculator",
    title: "Zakat calculator",
    description:
      "Check whether zakat is due on your wealth and how much to give. Enter today's gold and silver prices for an accurate nisab.",
    icon: Coins,
    Component: ZakatCalculator,
  },
]

export default function ToolsTabs({ initialTool }: { initialTool?: string }) {
  const [active, setActive] = useState(
    TOOLS.some((t) => t.id === initialTool)
      ? (initialTool as string)
      : TOOLS[0].id
  )

  const select = (id: string) => {
    setActive(id)
    window.history.replaceState(null, "", `?tool=${id}`)
  }

  const current = TOOLS.find((t) => t.id === active) ?? TOOLS[0]

  return (
    <section className="w-full overflow-hidden bg-warm-white py-8 sm:py-10 lg:py-12">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Tabs */}
        <div
          role="tablist"
          aria-label="Planning tools"
          className="
            grid w-full grid-cols-2 gap-2
            sm:flex sm:flex-wrap sm:justify-center sm:gap-2
          "
        >
          {TOOLS.map((tool) => {
            const Icon = tool.icon
            const isActive = tool.id === active

            return (
              <button
                key={tool.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`tool-${tool.id}`}
                onClick={() => select(tool.id)}
                className={`
                  flex min-h-11 w-full min-w-0
                  items-center justify-center gap-1.5
                  rounded-full border
                  px-2.5 py-2
                  text-[11px] font-semibold
                  leading-tight
                  transition-colors duration-200
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-emerald/50
                  focus-visible:ring-offset-2
                  sm:w-auto sm:min-h-10
                  sm:shrink-0
                  sm:gap-2
                  sm:px-4
                  sm:text-[13px]
                  ${
                    isActive
                      ? "border-emerald bg-emerald text-white"
                      : "border-deep-teal/25 bg-white text-deep-teal hover:border-emerald hover:text-emerald"
                  }
                `}
              >
                <Icon
                  className="h-4 w-4 shrink-0"
                  aria-hidden="true"
                />
                <span className="truncate">{tool.label}</span>
              </button>
            )
          })}
        </div>

        {/* Active tool header */}
        <div className="mx-auto mb-6 mt-6 max-w-2xl px-1 text-center sm:mb-7 sm:mt-7">
          <h2 className="font-serif text-[21px] font-medium leading-[1.15] tracking-[-0.015em] text-deep-teal sm:text-[26px]">
            {current.title}
          </h2>

          <p className="mx-auto mt-2 max-w-lg text-[13px] leading-5 text-muted-teal sm:text-sm sm:leading-6">
            {current.description}
          </p>
        </div>

        {/* Panels */}
        <div className="w-full min-w-0">
          {TOOLS.map(({ id, Component }) => (
            <div
              key={id}
              id={`tool-${id}`}
              role="tabpanel"
              hidden={id !== active}
              className="w-full min-w-0"
            >
              <Component />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}