import React, { useMemo, useState, useEffect } from "react";
import Layout from "../components/Layout";
import PageHero from "../components/PageHero";
import Lightbox from "../components/Lightbox";
import { btn } from "../ui/buttons";
import { EXCURSIONS } from "../data";
import { loadWithFallback } from "../lib/dataSource";

const Container = ({ children }) => (
  <div className="mx-auto w-full max-w-7xl px-5">{children}</div>
);

const Img = ({ src, alt, className }) => (
  <img
    src={src}
    alt={alt}
    className={className}
    loading="lazy"
    onError={(e) => {
      e.currentTarget.src = "/media/placeholder.jpg";
    }}
  />
);

const Pill = ({ children, tone = "blue" }) => {
  const tones = {
    blue: "bg-[color-mix(in_srgb,var(--honey-blue)_12%,white)] text-[var(--honey-blue)]",
    orange: "bg-[color-mix(in_srgb,var(--honey-orange)_14%,white)] text-[var(--honey-orange)]",
    yellow: "bg-[color-mix(in_srgb,var(--honey-yellow)_35%,white)] text-[var(--honey-blue)]",
    green: "bg-[color-mix(in_srgb,var(--honey-green)_14%,white)] text-[var(--honey-green)]",
    slate: "bg-slate-100 text-slate-700",
  };
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-black ${tones[tone] || tones.blue}`}>
      {children}
    </span>
  );
};

export default function Excursions() {
  const [query, setQuery] = useState("");
  const [area, setArea] = useState("Toutes");

  const [lbOpen, setLbOpen] = useState(false);
  const [lbTitle, setLbTitle] = useState("");
  const [lbImages, setLbImages] = useState([]);
  const [remote, setRemote] = useState([]);


const all = useMemo(() => EXCURSIONS, []);
  const areas = useMemo(() => {
    const set = new Set(all.map((e) => e.area).filter(Boolean));
    return ["Toutes", ...Array.from(set)];
  }, [all]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return all.filter((e) => {
      const okArea = area === "Toutes" ? true : e.area === area;
      const blob = `${e.title || ""} ${e.teaser || ""} ${e.area || ""}`.toLowerCase();
      const okQ = !q || blob.includes(q);
      return okArea && okQ;
    });
  }, [all, area, query]);

  const openGallery = (exc) => {
    const images = (exc.gallery && exc.gallery.length ? exc.gallery : [exc.cover]).filter(Boolean);
    setLbTitle(exc.title || "Galerie");
    setLbImages(images.length ? images : ["/media/placeholder.jpg"]);
    setLbOpen(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <Layout>

      <PageHero
        title="Excursions & Activités"
        subtitle="Des expériences courtes et immersives pour enrichir votre voyage à Madagascar — nature, culture, rencontres."
        primaryCta={{ href: "/contact", label: "Demander un devis" }}
        secondaryCta={{ href: "/circuits-destinations?tab=destinations", label: "Voir destinations" }}
      />

      <section className="py-14 md:py-16">
        <Container>
          <div className="mb-10 grid gap-4 md:grid-cols-[1fr_360px] md:items-end">
            <div>
              <div className="text-xs font-black text-[var(--honey-blue)]/70">Explorer</div>
              <h2 className="mt-2 text-2xl font-black text-[var(--honey-blue)] md:text-3xl">
                Toutes nos excursions
              </h2>
              <p className="mt-2 max-w-2xl text-sm font-semibold text-[var(--honey-blue)]/75">
                Filtre par zone, cherche un mot-clé, puis ouvre la galerie “Voir plus”.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {areas.map((a) => {
                  const active = a === area;
                  return (
                    <button
                      key={a}
                      type="button"
                      onClick={() => setArea(a)}
                      className={`rounded-full px-4 py-2 text-xs font-black border transition ${
                        active
                          ? "border-transparent bg-[var(--honey-orange)] text-white shadow-sm"
                          : "border-[color-mix(in_srgb,var(--honey-blue)_20%,transparent)] bg-white text-[var(--honey-blue)] hover:bg-slate-50"
                      }`}
                    >
                      {a}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="rounded-3xl border border-[var(--honey-border)] bg-white p-5 shadow-sm">
              <div className="text-xs font-black text-[var(--honey-blue)]">Recherche</div>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ex : cascade, lémuriens, plongée…"
                className="mt-2 w-full rounded-2xl border border-[var(--honey-border)] bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none focus:ring-4 focus:ring-[color-mix(in_srgb,var(--honey-blue)_12%,transparent)]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((e) => (
              <div
                key={e.id}
                className="group overflow-hidden rounded-3xl border border-[var(--honey-border)] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-50">
                  <Img
                    src={e.cover}
                    alt={e.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                    {e.featured ? <Pill tone="yellow">Populaire</Pill> : <Pill tone="green">Excursion</Pill>}
                    {e.durationLabel ? <Pill tone="blue">{e.durationLabel}</Pill> : null}
                    {e.area ? <Pill tone="orange">{e.area}</Pill> : null}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-black text-[var(--honey-blue)]">{e.title}</h3>
                  <p className="mt-2 text-sm font-semibold text-[var(--honey-blue)]/75 leading-relaxed line-clamp-3">
                    {e.teaser || "Une expérience idéale pour compléter votre itinéraire."}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <Pill tone="green">Authentique</Pill>
                    <Pill tone="blue">Découverte</Pill>
                    <Pill tone="orange">Local</Pill>
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() => openGallery(e)}
                      className={btn.outline("blue","block","card")}
                    >
                      Voir plus
                    </button>
                    <a
                      href="/contact?type=excursion"
                      className={btn.primary("orange","block","card")}
                    >
                      Réserver
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="mt-10 rounded-3xl border border-[var(--honey-border)] bg-white p-8 text-center shadow-sm">
              <div className="text-lg font-black text-[var(--honey-blue)]">Aucun résultat</div>
              <div className="mt-2 text-sm font-semibold text-[var(--honey-blue)]/70">
                Change la zone ou le mot-clé.
              </div>
            </div>
          ) : null}
        </Container>
      </section>

      <Lightbox open={lbOpen} title={lbTitle} images={lbImages} initialIndex={0} onClose={() => setLbOpen(false)} />

      </ Layout>
    </div>
  );
}