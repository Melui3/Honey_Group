import React, { useEffect, useMemo, useState } from "react";
import PageHero from "../components/PageHero";
import Layout from "../components/Layout";
import { card, bar, media } from "../ui/cards";
import { btn } from "../ui/buttons";
import { apiList } from "../lib/api";

import { X, ChevronLeft, ChevronRight } from "lucide-react";

/* -------------------------------------------- */
/* Helpers */
/* -------------------------------------------- */

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
    dark: "bg-slate-900/80 text-white",
  };
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-black ${
        tones[tone] || tones.blue
      }`}
    >
      {children}
    </span>
  );
};

const TabButton = ({ active, onClick, children }) => (
  <button
    type="button"
    onClick={onClick}
    className={`relative px-2 py-4 text-sm font-extrabold tracking-tight transition md:px-6 ${
      active
        ? "text-[var(--honey-blue)]"
        : "text-[color-mix(in_srgb,var(--honey-blue)_60%,transparent)] hover:text-[var(--honey-blue)]"
    }`}
  >
    {children}
    {active ? (
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-[var(--honey-orange)]" />
    ) : null}
  </button>
);

/* -------------------------------------------- */
/* Lightbox (gallery) */
/* -------------------------------------------- */

function Lightbox({ open, title, images = [], initialIndex = 0, onClose }) {
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
      if (e.key === "ArrowLeft")
        setIndex((i) => (i - 1 + safeImages.length) % safeImages.length);
      if (e.key === "ArrowRight")
        setIndex((i) => (i + 1) % safeImages.length);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, safeImages.length, onClose]);

  if (!open) return null;

  const prev = () =>
    setIndex((i) => (i - 1 + safeImages.length) % safeImages.length);
  const next = () => setIndex((i) => (i + 1) % safeImages.length);

  return (
    <div className="fixed inset-0 z-[100]">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="absolute inset-0 grid place-items-center p-4">
        <div className="w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl">
          <div className="flex items-center justify-between gap-3 border-b border-[var(--honey-border)] px-5 py-4">
            <div className="min-w-0">
              <div className="text-xs font-black text-[var(--honey-blue)]/70">
                Galerie
              </div>
              <div className="truncate text-sm font-black text-[var(--honey-blue)]">
                {title}
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-2xl border border-[var(--honey-border)] bg-white p-2 text-[var(--honey-blue)] transition hover:bg-slate-50 hover:shadow-lg"
              aria-label="Fermer"
            >
              <X className="h-5 w-5" />
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
                  className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 text-[var(--honey-blue)] shadow-lg transition hover:bg-white hover:scale-105"
                  aria-label="Précédent"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 text-[var(--honey-blue)] shadow-lg transition hover:bg-white hover:scale-105"
                  aria-label="Suivant"
                >
                  <ChevronRight className="h-6 w-6" />
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

/* -------------------------------------------- */
/* Page */
/* -------------------------------------------- */

export default function CircuitsDestinations() {
  const [tab, setTab] = useState("destinations");

  const [lbOpen, setLbOpen] = useState(false);
  const [lbTitle, setLbTitle] = useState("");
  const [lbImages, setLbImages] = useState([]);
  const [lbIndex, setLbIndex] = useState(0);

  const [query, setQuery] = useState("");
  const [zone, setZone] = useState("Toutes");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const wanted = params.get("tab");
    if (
      wanted === "destinations" ||
      wanted === "circuits" ||
      wanted === "signatures" ||
      wanted === "excursions"
    ) {
      setTab(wanted);
    }
  }, []);

const [allDestinations, setAllDestinations] = useState([]);
const [allCircuits, setAllCircuits] = useState([]);
const [allSignatures, setAllSignatures] = useState([]);
const [allExcursions, setAllExcursions] = useState([]);

useEffect(() => {
  // en parallèle, rapide
  Promise.all([
    apiList("/api/destinations/"),
    apiList("/api/circuits/"),
    apiList("/api/signatures/"),
    apiList("/api/excursions/"),
  ]).then(([dests, circuits, sigs, excs]) => {
    setAllDestinations(dests);
    setAllCircuits(circuits);
    setAllSignatures(sigs);
    setAllExcursions(excs);
  });
}, []);

  const zones = useMemo(() => {
    const set = new Set(allDestinations.map((d) => d.zone).filter(Boolean));
    return ["Toutes", ...Array.from(set)];
  }, [allDestinations]);

  const filteredDestinations = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allDestinations.filter((d) => {
      const okZone = zone === "Toutes" ? true : d.zone === zone;
      const blob = `${d.title || ""} ${d.teaser || ""} ${d.zone || ""}`.toLowerCase();
      const okQ = !q || blob.includes(q);
      return okZone && okQ;
    });
  }, [allDestinations, zone, query]);

  const openGallery = (item) => {
    const images = (item.gallery && item.gallery.length ? item.gallery : [item.cover]).filter(Boolean);
    setLbTitle(item.title || item.name || "Galerie");
    setLbImages(images.length ? images : ["/media/placeholder.jpg"]);
    setLbIndex(0);
    setLbOpen(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <Layout>

      <PageHero
        title="Circuits & Destinations"
        subtitle="Tout ce que Honey Group propose : destinations, circuits organisés, expériences signature, et excursions."
        primaryCta={{ href: "/contact", label: "Demander un devis" }}
        secondaryCta={{ href: "/", label: "Retour accueil" }}
      />

      <section className="border-b border-[color-mix(in_srgb,var(--honey-blue)_20%,transparent)] bg-white">
        <Container>
          <div className="flex flex-wrap gap-2 md:gap-6">
            <TabButton active={tab === "destinations"} onClick={() => setTab("destinations")}>
              Destinations
            </TabButton>
            <TabButton active={tab === "circuits"} onClick={() => setTab("circuits")}>
              Circuits organisés
            </TabButton>
            <TabButton active={tab === "signatures"} onClick={() => setTab("signatures")}>
              Signatures
            </TabButton>
            <TabButton active={tab === "excursions"} onClick={() => setTab("excursions")}>
              Excursions
            </TabButton>
          </div>
        </Container>
      </section>

      {/* DESTINATIONS */}
      {tab === "destinations" ? (
        <section className="py-14 md:py-16">
          <Container>
            <div className="mb-10 grid gap-4 md:grid-cols-[1fr_360px] md:items-end">
              <div>
                <div className="text-xs font-black text-[var(--honey-blue)]/70">Explorer</div>
                <h2 className="mt-2 text-2xl font-black text-[var(--honey-blue)] md:text-3xl">
                  Toutes nos destinations
                </h2>
                <p className="mt-2 max-w-2xl text-sm font-semibold text-[var(--honey-blue)]/75">
                  Filtre par zone, tape un mot-clé, puis ouvre la galerie “Voir plus”.
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {zones.map((z) => {
                    const active = z === zone;
                    return (
                      <button
                        key={z}
                        type="button"
                        onClick={() => setZone(z)}
                        className={`rounded-full px-4 py-2 text-xs font-black border transition hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.98] ${
                          active
                            ? "border-transparent bg-[var(--honey-orange)] text-white shadow-sm"
                            : "border-[color-mix(in_srgb,var(--honey-blue)_20%,transparent)] bg-white text-[var(--honey-blue)] hover:bg-slate-50"
                        }`}
                      >
                        {z}
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
                  placeholder="Ex : Nosy Be, Makay, Ranomafana…"
                  className="mt-2 w-full rounded-2xl border border-[var(--honey-border)] bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none focus:ring-4 focus:ring-[color-mix(in_srgb,var(--honey-blue)_12%,transparent)]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
              {filteredDestinations.map((d, idx) => (
  <div key={d.id} className={[card.base, "flex flex-col"].join(" ")}>
    <div className={bar.top(idx % 2 === 0 ? "green" : "orange")} />

    <div className="relative aspect-[4/3] overflow-hidden bg-slate-50">
      <Img src={d.cover} alt={d.title} className={media.img} />
      <div className="absolute left-4 top-4 flex flex-wrap gap-2">
        <Pill tone="green">{d.zone}</Pill>
        {d.label ? (
          <Pill tone="yellow">{d.label}</Pill>
        ) : (
          <Pill tone="yellow">Madagascar</Pill>
        )}
      </div>
    </div>

    <div className="p-6 flex flex-col flex-1">
      <h3 className="text-xl font-black text-[var(--honey-blue)]">{d.title}</h3>
      <p className="mt-2 text-sm font-semibold text-[var(--honey-blue)]/75 leading-relaxed line-clamp-3">
        {d.teaser}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {(d.tags || ["Nature", "Découverte", "Authentique"]).slice(0, 3).map((t) => (
          <Pill key={t} tone="orange">{t}</Pill>
        ))}
      </div>

      
      <div className="flex-1" />

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => openGallery(d)}
          className={btn.outline("blue", "block", "pill")}
        >
          Voir plus
        </button>
        <a
          href={`/contact?type=destination&item=${encodeURIComponent(d.slug || d.id)}`}
          className={btn.primary("orange","block","pill") + " whitespace-nowrap"}
        >
          Demander un devis
        </a>
      </div>
    </div>
  </div>
))}
            </div>

            {filteredDestinations.length === 0 ? (
              <div className="mt-10 rounded-3xl border border-[var(--honey-border)] bg-white p-8 text-center shadow-sm">
                <div className="text-lg font-black text-[var(--honey-blue)]">Aucun résultat</div>
                <div className="mt-2 text-sm font-semibold text-[var(--honey-blue)]/70">
                  Change la zone ou le mot-clé.
                </div>
              </div>
            ) : null}
          </Container>
        </section>
      ) : null}

      {/* CIRCUITS */}
      {tab === "circuits" ? (
        <section className="py-14 md:py-16 bg-[color-mix(in_srgb,black_2%,white)]">
          <Container>
            <div className="text-center">
              <div className="mx-auto inline-flex rounded-full bg-[color-mix(in_srgb,var(--honey-yellow)_35%,white)] px-4 py-1 text-xs font-black text-[var(--honey-blue)]">
                Voyages
              </div>
              <h2 className="mt-4 text-2xl font-black text-[var(--honey-blue)] md:text-3xl">
                Tous nos circuits
              </h2>
              <p className="mx-auto mt-3 max-w-3xl text-sm font-semibold text-[var(--honey-blue)]/75">
                Chaque fiche peut ouvrir une galerie. Et tout peut être ajusté sur mesure.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {allCircuits.map((c, idx) => (
                <div key={c.id} className={card.base}>
                  <div className={bar.top(idx % 2 === 0 ? "green" : "orange")} />

                  <div className="relative h-44 overflow-hidden bg-slate-50">
                    <Img src={c.cover} alt={c.title} className="h-44 w-full object-cover" />
                    <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                      <Pill tone="yellow">Circuit</Pill>
                      {c.durationLabel ? <Pill tone="green">{c.durationLabel}</Pill> : null}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-black text-[var(--honey-blue)]">{c.title}</h3>
                    <p className="mt-2 text-sm font-semibold text-[var(--honey-blue)]/75">
                      {c.routeLabel}
                    </p>

                    <ul className="mt-4 space-y-2">
                      {(c.highlights || []).slice(0, 4).map((h) => (
                        <li key={h} className="flex gap-3 text-sm font-semibold text-[var(--honey-blue)]/75">
                          <span className="mt-2 h-2 w-2 rounded-full bg-[var(--honey-green)] flex-shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      <button
                        type="button"
                        onClick={() => openGallery(c)}
                        className={btn.outline("blue","block","pill")}
                      >
                        Voir plus
                      </button>
                      <a
                        href="/contact?type=circuit"
                        className={btn.primary("orange","block","pill")}
                      >
                        Demander un devis
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 rounded-3xl border border-[var(--honey-border)] bg-white p-10 text-center shadow-sm">
              <h3 className="text-2xl font-black text-[var(--honey-blue)]">Circuit sur mesure ?</h3>
              <p className="mx-auto mt-3 max-w-2xl text-sm font-semibold text-[var(--honey-blue)]/70">
                Étapes, durée, confort, budget : on adapte.
              </p>
              <a href="/contact" className={[btn.primary("orange","lg","pill"), "mt-7"].join(" ")}>
                Nous contacter
              </a>
            </div>
          </Container>
        </section>
      ) : null}

      {/* SIGNATURES */}
{tab === "signatures" ? (
  <section className="py-14 md:py-16 bg-[var(--honey-blue)]">
    <Container>
      <div className="text-center">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs font-black text-white">
          <span className="h-2 w-2 rounded-full bg-[var(--honey-yellow)]" />
          Identité Honey Group
        </div>

        <h2 className="mt-4 text-3xl font-black tracking-tight text-white md:text-4xl">
          Expériences Signature
        </h2>

        <p className="mx-auto mt-3 max-w-3xl text-sm font-semibold text-white/85 md:text-base">
          Du premium, du concret. Pas du générique.
        </p>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {allSignatures.map((s, idx) => {
          const Icon = s.icon;
          const tone = idx % 2 === 0 ? "yellow" : "green";

          return (
            <div
              key={s.id}
              className="group relative overflow-hidden rounded-3xl border border-white/15 bg-white shadow-2xl transition hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(0,0,0,0.35)]"
            >
              <div className={bar.top(tone)} />

              {/* image */}
              <div className="relative h-72 overflow-hidden bg-slate-50">
                <Img
                  src={s.cover}
                  alt={s.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />

                {/* badges */}
                <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                  <Pill tone="yellow">Signature</Pill>
                  {s.duration ? <Pill tone="dark">{s.duration}</Pill> : null}
                  {s.featured ? <Pill tone="green">Populaire</Pill> : null}
                </div>

                {/* icon */}
                {Icon ? (
                  <div className="absolute right-5 top-5 grid h-14 w-14 place-items-center rounded-full bg-[var(--honey-yellow)] text-[var(--honey-blue)] shadow-lg">
                    <Icon className="h-7 w-7" />
                  </div>
                ) : null}

                {/* title */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-3xl font-black">{s.title}</h3>
                </div>
              </div>

              {/* content */}
              <div className="p-7">
                {s.description ? (
                  <p className="text-sm font-semibold text-[var(--honey-blue)]/85 leading-relaxed">
                    {s.description}
                  </p>
                ) : null}

                {Array.isArray(s.bullets) && s.bullets.length ? (
                  <ul className="mt-5 space-y-2">
                    {s.bullets.slice(0, 6).map((t) => (
                      <li key={t} className="flex items-start gap-3">
                        <span className="mt-2 h-2 w-2 rounded-full bg-[var(--honey-green)]" />
                        <span className="text-sm font-semibold text-[var(--honey-blue)]/85">
                          {t}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : null}

                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => openGallery(s)}
                    className={btn.outline("blue", "block", "pill")}
                  >
                    Voir plus
                  </button>
                  <a href="/contact?type=signature" className={btn.primary("orange", "block", "pill")}>
                    Demander un devis
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </Container>
  </section>
) : null}

      {/* EXCURSIONS */}
{tab === "excursions" ? (
  <section className="py-14 md:py-16 bg-white">
    <Container>
      <div className="text-center">
        <div className="mx-auto inline-flex rounded-full bg-[color-mix(in_srgb,var(--honey-yellow)_35%,white)] px-4 py-1 text-xs font-black text-[var(--honey-blue)]">
          Excursions
        </div>
        <h2 className="mt-4 text-2xl font-black text-[var(--honey-blue)] md:text-3xl">
          Excursions & Activités
        </h2>
        <p className="mx-auto mt-3 max-w-3xl text-sm font-semibold text-[var(--honey-blue)]/75">
          Courtes, immersives, efficaces. Clique “Voir plus” pour la galerie.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {allExcursions.map((e, idx) => (
          <div key={e.id} className={[card.base, "group"].join(" ")}>
            <div className={bar.top(idx % 2 === 0 ? "green" : "orange")} />

            <div className="relative aspect-[4/3] overflow-hidden bg-slate-50">
              <Img
                src={e.cover}
                alt={e.title}
                className={[media.img, "transition-transform duration-500 group-hover:scale-110"].join(" ")}
              />

              <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                {e.featured ? <Pill tone="yellow">Populaire</Pill> : <Pill tone="green">Excursion</Pill>}
                {e.area ? <Pill tone="green">{e.area}</Pill> : null}
                {e.durationLabel ? <Pill tone="yellow">{e.durationLabel}</Pill> : null}
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-black text-[var(--honey-blue)]">{e.title}</h3>

              <div className="mt-4 flex flex-wrap gap-2">
                {(e.highlights || []).slice(0, 6).map((h) => (
                  <Pill key={h} tone="orange">{h}</Pill>
                ))}
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => openGallery(e)}
                  className={btn.outline("blue","block","pill")}
                >
                  Voir plus
                </button>
                <a href="/contact?type=excursion" className={btn.primary("orange","block","pill")}>
                  Réserver
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {allExcursions.length === 0 ? (
        <div className="mt-10 rounded-3xl border border-[var(--honey-border)] bg-white p-8 text-center shadow-sm">
          <div className="text-lg font-black text-[var(--honey-blue)]">Aucune excursion</div>
          <div className="mt-2 text-sm font-semibold text-[var(--honey-blue)]/70">
            Ajoute des items dans excursions.seed
          </div>
        </div>
      ) : null}
    </Container>
  </section>
) : null}

      <Lightbox
        open={lbOpen}
        title={lbTitle}
        images={lbImages}
        initialIndex={lbIndex}
        onClose={() => setLbOpen(false)}
      />

      </Layout>
    </div>
  );
}