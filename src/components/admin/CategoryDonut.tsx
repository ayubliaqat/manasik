"use client"

type CategoryStat = {
  name: string
  count: number
}

const palette = ["#7c5cff", "#f5a623", "#10b981", "#ec4899", "#3b9ce8", "#f43f5e", "#8b5cf6", "#14b8a6"]

export function CategoryDonut({ categories }: { categories: CategoryStat[] }) {
  const total = categories.reduce((sum, c) => sum + c.count, 0)

  let cursor = 0
  const segments = categories.map((c, i) => {
    const pct = total === 0 ? 0 : (c.count / total) * 100
    const start = cursor
    cursor += pct
    return { ...c, start, end: cursor, color: palette[i % palette.length] }
  })

  const gradient =
    total === 0
      ? "var(--color-soft-beige)"
      : `conic-gradient(${segments.map((s) => `${s.color} ${s.start}% ${s.end}%`).join(", ")})`

  const half = Math.ceil(categories.length / 2)
  const left = segments.slice(0, half)
  const right = segments.slice(half)

  return (
    <div className="rounded-2xl bg-card border border-soft-beige p-6 shadow-sm">
      <h2 className="text-sm font-semibold text-charcoal mb-6">Posts by Category</h2>

      {categories.length === 0 ? (
        <p className="text-sm text-muted-teal text-center py-8">
          No categories yet. Create categories to see this chart.
        </p>
      ) : (
        <div className="flex items-center justify-center gap-8 flex-wrap">
          <div className="space-y-3 min-w-[130px]">
            {left.map((c) => (
              <div key={c.name} className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: c.color }} />
                  <span className="text-xs text-charcoal">{c.name}</span>
                </div>
                <span className="text-xs text-muted-teal font-medium">{c.count}</span>
              </div>
            ))}
          </div>

          <div className="relative h-44 w-44 shrink-0">
            <div className="absolute inset-0 rounded-full shadow-inner" style={{ background: gradient }} />
            <div className="absolute inset-[16px] rounded-full bg-card shadow-sm flex items-center justify-center flex-col">
              <p className="text-2xl font-semibold text-charcoal">{categories.length}</p>
              <p className="text-[10px] text-muted-teal uppercase tracking-wide">Categories</p>
            </div>
          </div>

          <div className="space-y-3 min-w-[130px]">
            {right.map((c) => (
              <div key={c.name} className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: c.color }} />
                  <span className="text-xs text-charcoal">{c.name}</span>
                </div>
                <span className="text-xs text-muted-teal font-medium">{c.count}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
