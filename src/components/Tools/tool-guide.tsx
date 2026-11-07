import { Check, Info, Lightbulb, ListChecks, Sparkles } from "lucide-react";

export type GuideSection = {
  heading: string;
  text?: string;
  items?: string[];
  variant?: "steps" | "highlight" | "tips" | "note";
};

function Squiggle({ className }: { className: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 120 10"
      preserveAspectRatio="none"
      fill="none"
      className={`pointer-events-none absolute left-1/2 top-full -translate-x-1/2 ${className}`}
    >
      <path
        d="M2 5 Q12 0 22 5 T42 5 T62 5 T82 5 T102 5 T118 5"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export default function ToolGuide({
  title,
  highlight,
  sections,
}: {
  title: string;
  highlight?: string;
  sections: GuideSection[];
}) {
  // Gold-light lead + emerald highlight. If no highlight is passed, split the title in half.
  let lead = title.trim();
  let accent = highlight?.trim() ?? "";
  if (!accent) {
    const words = lead.split(/\s+/);
    const splitAt = Math.ceil(words.length / 2);
    lead = words.slice(0, splitAt).join(" ");
    accent = words.slice(splitAt).join(" ");
  }

  const steps = sections.find((s) => s.variant === "steps");
  const highlightSection = sections.find((s) => s.variant === "highlight");
  const tips = sections.find((s) => s.variant === "tips");
  const note = sections.find((s) => s.variant === "note");

  const stepCols =
    steps?.items?.length === 3
      ? "lg:grid-cols-3"
      : steps?.items?.length === 4
        ? "lg:grid-cols-4"
        : "lg:grid-cols-5";

  return (
    <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 sm:pb-10 lg:px-8">
      <div className="mb-8 text-center">
        <h2 className="text-balance font-heading text-[28px] font-bold leading-[1.2] tracking-[-0.02em] sm:text-[34px] lg:text-[40px]">
          <span className="text-gold-light">{lead}</span>
          {accent && (
            <>
              {lead && " "}
              <span className="relative inline-block whitespace-nowrap text-emerald">
                {accent}
                <Squiggle className="mt-[0.05em] h-[0.2em] w-[70%] text-gold" />
              </span>
            </>
          )}
        </h2>
      </div>

      {/* Steps timeline */}
      {steps?.items && (
        <div
          className="
            rounded-2xl border-[1.5px] border-deep-teal/60 bg-card p-5 sm:p-7
            shadow-[inset_0_0_14px_rgba(6,63,58,0.2),0_2px_4px_rgba(6,63,58,0.1),0_12px_26px_rgba(6,63,58,0.18)]
          "
        >
          <div className="mb-6 flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald/10 text-emerald">
              <ListChecks className="h-5 w-5" aria-hidden="true" />
            </span>
            <h3 className="font-heading text-base font-medium text-deep-teal sm:text-lg">
              {steps.heading}
            </h3>
          </div>

          <ol
            className={`grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-4 ${stepCols}`}
          >
            {steps.items.map((item, i) => (
              <li
                key={item}
                className="
                  relative flex items-start gap-4 lg:flex-col lg:items-center lg:text-center
                  lg:before:absolute lg:before:left-1/2 lg:before:top-5 lg:before:h-px lg:before:w-full
                  lg:before:border-t lg:before:border-dashed lg:before:border-emerald/40
                  lg:last:before:hidden
                "
              >
                <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald text-sm font-medium text-white ring-4 ring-card">
                  {i + 1}
                </span>
                <p className="text-sm leading-6 text-charcoal/80 lg:px-1">
                  {item}
                </p>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Highlight + tips */}
      {(highlightSection || tips) && (
        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-5">
          {highlightSection?.items && (
            <div className="relative overflow-hidden rounded-2xl bg-deep-teal p-5 shadow-[0_12px_26px_rgba(6,63,58,0.25)] sm:p-7 md:col-span-3">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-12 right-10 h-32 w-32 rounded-full bg-emerald/20 blur-2xl"
              />

              <div className="relative flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-gold">
                  <Sparkles className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="font-heading text-base font-medium text-white sm:text-lg">
                  {highlightSection.heading}
                </h3>
              </div>

              <ul className="relative mt-5 space-y-3">
                {highlightSection.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm leading-6 text-white/80"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold text-deep-teal">
                      <Check className="h-3 w-3" aria-hidden="true" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {tips?.items && (
            <div className="relative overflow-hidden rounded-2xl border border-gold/50 bg-gradient-to-br from-gold/15 via-soft-beige/60 to-card p-5 sm:p-7 md:col-span-2">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold/20 text-deep-teal">
                  <Lightbulb className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="font-heading text-base font-medium text-deep-teal sm:text-lg">
                  {tips.heading}
                </h3>
              </div>

              <ul className="mt-5 space-y-3">
                {tips.items.map((item, i) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="font-heading text-lg leading-6 text-gold">
                      0{i + 1}
                    </span>
                    <span className="text-sm leading-6 text-charcoal/80">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Note banner */}
      {note?.text && (
        <div className="mt-5 flex items-start gap-4 rounded-2xl border-l-4 border-gold bg-emerald/5 p-5 sm:p-6">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald/10 text-emerald">
            <Info className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <h3 className="font-heading text-base font-medium text-deep-teal">
              {note.heading}
            </h3>
            <p className="mt-1.5 text-sm leading-7 text-charcoal/80">
              {note.text}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}