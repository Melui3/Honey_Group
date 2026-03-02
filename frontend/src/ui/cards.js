// src/ui/cards.js

export const tone = {
  green: { bar: "bg-[var(--honey-green)]" },
  orange: { bar: "bg-[var(--honey-orange)]" },
  blue: { bar: "bg-[var(--honey-blue)]" },
  yellow: { bar: "bg-[var(--honey-yellow)]" },
};

export const card = {
  base:
    "group relative overflow-hidden rounded-3xl border border-[var(--honey-border)] bg-white " +
    "shadow-sm transition will-change-transform hover:-translate-y-1 hover:shadow-xl",
  elevated:
    "group relative overflow-hidden rounded-3xl border border-[var(--honey-border)] bg-white " +
    "shadow-lg transition will-change-transform hover:-translate-y-1 hover:shadow-2xl",
  dark:
    "group relative overflow-hidden rounded-3xl border border-[var(--honey-border)] bg-slate-950 " +
    "shadow-2xl transition will-change-transform hover:-translate-y-1 hover:shadow-[0_25px_60px_-25px_rgba(0,0,0,0.6)]",
};

export const bar = {
  top: (t = "green") => `absolute top-0 left-0 h-1 w-full ${(tone[t] || tone.green).bar}`,
};

export const media = {
  img:
    "h-full w-full object-cover transition-transform duration-700 " +
    "group-hover:scale-110",
  overlaySoft: "absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent",
  overlayStrong:
    "absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent",
};

export const layer = {
  safeTop: "relative z-10",
  decorNoClick: "pointer-events-none",
};