const base =
  "inline-flex items-center justify-center gap-2 font-extrabold transition " +
  "focus:outline-none focus-visible:ring-4 " +
  "active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none";

const shape = {
  pill: "rounded-full",
  card: "rounded-2xl",
};

const size = {
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-sm",
  block: "w-full px-5 py-3 text-sm",
};

export const btn = {
  // Primary filled (default: orange)
  primary: (tone = "orange", s = "lg", sh = "pill") =>
    [
      base,
      shape[sh],
      size[s],
      "text-white shadow-md hover:shadow-xl hover:-translate-y-0.5 hover:scale-[1.02]",
      tone === "blue"
        ? "bg-[var(--honey-blue)]"
        : tone === "green"
        ? "bg-[var(--honey-green)]"
        : tone === "yellow"
        ? "bg-[var(--honey-yellow)] text-[var(--honey-blue)]"
        : "bg-[var(--honey-orange)]",
    ].join(" "),

  // Outline (default: blue)
  outline: (tone = "blue", s = "lg", sh = "pill") =>
    [
      base,
      shape[sh],
      size[s],
      "border-2 bg-white shadow-sm hover:shadow-xl hover:-translate-y-0.5 hover:scale-[1.02]",
      tone === "orange"
        ? "border-[var(--honey-orange)] text-[var(--honey-orange)] hover:bg-[var(--honey-orange)] hover:text-white"
        : tone === "green"
        ? "border-[var(--honey-green)] text-[var(--honey-green)] hover:bg-[var(--honey-green)] hover:text-white"
        : tone === "yellow"
        ? "border-[var(--honey-yellow)] text-[var(--honey-blue)] hover:bg-[var(--honey-yellow)]"
        : "border-[var(--honey-blue)] text-[var(--honey-blue)] hover:bg-[var(--honey-blue)] hover:text-white",
    ].join(" "),

  // Soft (subtle background)
  soft: (tone = "blue", s = "md", sh = "pill") =>
    [
      base,
      shape[sh],
      size[s],
      "border border-[var(--honey-border)] shadow-sm hover:shadow-lg hover:-translate-y-0.5",
      tone === "orange"
        ? "bg-[color-mix(in_srgb,var(--honey-orange)_12%,white)] text-[var(--honey-orange)]"
        : tone === "green"
        ? "bg-[color-mix(in_srgb,var(--honey-green)_12%,white)] text-[var(--honey-green)]"
        : tone === "yellow"
        ? "bg-[color-mix(in_srgb,var(--honey-yellow)_28%,white)] text-[var(--honey-blue)]"
        : "bg-[color-mix(in_srgb,var(--honey-blue)_10%,white)] text-[var(--honey-blue)]",
    ].join(" "),
};