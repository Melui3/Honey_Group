import React, { useEffect, useState } from "react";

const IconX = ({ className = "h-5 w-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M18 6 6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const IconChevron = ({ className = "h-5 w-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M15 6 9 12l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Lightbox({ open, title, images = [], initialIndex = 0, onClose }) {
  const safeImages = images?.length ? images : ["/media/placeholder.jpg"];
  const [index, setIndex] = useState(initialIndex);

  useEffect(() => {
    if (!open) return;
    setIndex(initialIndex || 0);
  }, [open, initialIndex]);

  useEffect(() => {
    if (!open) return;

    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + safeImages.length) % safeImages.length);
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % safeImages.length);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, safeImages.length, onClose]);

  if (!open) return null;

  const prev = () => setIndex((i) => (i - 1 + safeImages.length) % safeImages.length);
  const next = () => setIndex((i) => (i + 1) % safeImages.length);

  return (
    <div className="fixed inset-0 z-[100]">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="absolute inset-0 grid place-items-center p-4">
        <div className="w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl">
          <div className="flex items-center justify-between gap-3 border-b border-[var(--honey-border)] px-5 py-4">
            <div className="min-w-0">
              <div className="text-xs font-black text-[var(--honey-blue)]/70">Galerie</div>
              <div className="truncate text-sm font-black text-[var(--honey-blue)]">{title}</div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-2xl border border-[var(--honey-border)] bg-white p-2 text-[var(--honey-blue)] hover:bg-slate-50"
              aria-label="Fermer"
            >
              <IconX />
            </button>
          </div>

          <div className="relative bg-slate-950">
            <img
              src={safeImages[index]}
              alt={`${title} ${index + 1}`}
              className="h-[55vh] w-full object-contain"
              onError={(e) => (e.currentTarget.src = "/media/placeholder.jpg")}
            />

            {safeImages.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={prev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 text-[var(--honey-blue)] shadow-lg hover:bg-white"
                  aria-label="Précédent"
                >
                  <IconChevron className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 text-[var(--honey-blue)] shadow-lg hover:bg-white"
                  aria-label="Suivant"
                >
                  <IconChevron className="h-6 w-6 rotate-180" />
                </button>
              </>
            ) : null}

            <div className="absolute bottom-4 right-4 rounded-full bg-black/55 px-4 py-2 text-xs font-black text-white">
              {index + 1} / {safeImages.length}
            </div>
          </div>

          {safeImages.length > 1 ? (
            <div className="flex gap-3 overflow-x-auto border-t border-[var(--honey-border)] bg-white px-5 py-4">
              {safeImages.map((src, i) => (
                <button
                  key={`${src}-${i}`}
                  type="button"
                  onClick={() => setIndex(i)}
                  className={`h-16 w-24 flex-shrink-0 overflow-hidden rounded-2xl border transition ${
                    i === index
                      ? "border-[var(--honey-orange)]"
                      : "border-[var(--honey-border)] hover:border-[color-mix(in_srgb,var(--honey-blue)_35%,transparent)]"
                  }`}
                >
                  <img
                    src={src}
                    alt={`thumb ${i + 1}`}
                    className="h-full w-full object-cover"
                    onError={(e) => (e.currentTarget.src = "/media/placeholder.jpg")}
                  />
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}