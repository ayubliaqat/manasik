export default function ToolField({
  id,
  label,
  hint,
  unit,
  value,
  onChange,
}: {
  id: string
  label: string
  hint?: string
  unit: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div className="min-w-0">
      <label htmlFor={id} className="block text-xs font-semibold text-charcoal">
        {label}
      </label>
      {hint && (
        <p className="mt-0.5 text-[11px] leading-snug text-muted-teal">{hint}</p>
      )}
      <div className="relative mt-1.5">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min="0"
          step="any"
          placeholder="0"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="
            w-full rounded-xl
            border border-deep-teal/30 bg-white
            py-2.5 pl-3 pr-14
            text-sm text-charcoal
            shadow-[inset_0_1px_3px_rgba(6,63,58,0.08)]
            transition-colors duration-200
            placeholder:text-muted-teal/60
            focus:border-emerald focus:outline-none focus:ring-2 focus:ring-emerald/30
          "
        />
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-medium text-muted-teal">
          {unit}
        </span>
      </div>
    </div>
  )
}