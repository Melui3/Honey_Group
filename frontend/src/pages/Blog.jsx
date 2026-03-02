import React, { useMemo, useState, useEffect } from "react";
import Layout from "../components/Layout";
import PageHero from "../components/PageHero";
import { apiList } from "../lib/api";
import { btn } from "../ui/buttons";

const Container = ({ children }) => (
  <div className="mx-auto w-full max-w-7xl px-5">{children}</div>
);

const Img = ({ src, alt, className }) => (
  <img
    src={src}
    alt={alt}
    className={className}
    loading="lazy"
    onError={(e) => (e.currentTarget.src = "/media/placeholder.jpg")}
  />
);

const Pill = ({ children, tone = "green" }) => {
  const tones = {
    green: "bg-[color-mix(in_srgb,var(--honey-green)_14%,white)] text-[var(--honey-green)]",
    blue: "bg-[color-mix(in_srgb,var(--honey-blue)_12%,white)] text-[var(--honey-blue)]",
    yellow: "bg-[color-mix(in_srgb,var(--honey-yellow)_35%,white)] text-[var(--honey-blue)]",
    orange: "bg-[color-mix(in_srgb,var(--honey-orange)_14%,white)] text-[var(--honey-orange)]",
  };
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-black ${tones[tone] || tones.green}`}>
      {children}
    </span>
  );
};

export default function Blog() {
  const [query, setQuery] = useState("");
  const [posts, setPosts] = useState([]);
  const featured = posts[0];

  useEffect(() => {
    apiList("/api/blog-posts/").then(setPosts);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      const blob = `${p.title || ""} ${p.excerpt || ""} ${p.category || ""}`.toLowerCase();
      return !q || blob.includes(q);
    });
  }, [posts, query]);

  return (
    <div className="min-h-screen bg-white">
      <Layout>

      <PageHero
        title="Blog & Actualités"
        subtitle="Conseils, guides et inspirations pour préparer votre voyage à Madagascar — version claire, image-first, efficace."
        primaryCta={{ href: "/contact", label: "Demander un devis" }}
        secondaryCta={{ href: "/", label: "Retour accueil" }}
      />

      <section className="py-14">
        <Container>
          <div className="grid gap-4 md:grid-cols-[1fr_360px] md:items-end">
            <div>
              <div className="text-xs font-black text-[var(--honey-blue)]/70">Explorer</div>
              <h2 className="mt-2 text-2xl font-black text-[var(--honey-blue)] md:text-3xl">
                Nos articles
              </h2>
              <p className="mt-2 max-w-2xl text-sm font-semibold text-[var(--honey-blue)]/75">
                Recherche rapide, catégories, puis lecture en page dédiée.
              </p>
            </div>

            <div className="rounded-3xl border border-[var(--honey-border)] bg-white p-5 shadow-sm">
              <div className="text-xs font-black text-[var(--honey-blue)]">Recherche</div>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ex : saison, randonnée, lémuriens…"
                className="mt-2 w-full rounded-2xl border border-[var(--honey-border)] bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none focus:ring-4 focus:ring-[color-mix(in_srgb,var(--honey-blue)_12%,transparent)]"
              />
            </div>
          </div>

          {/* Featured */}
          {featured ? (
            <div className="mt-12 overflow-hidden rounded-3xl border border-[var(--honey-border)] bg-white shadow-lg">
              <div className="grid lg:grid-cols-2">
                <div className="relative aspect-[16/10] lg:aspect-auto lg:h-full">
                  <Img src={featured.cover} alt={featured.title} className="h-full w-full object-cover" />
                </div>

                <div className="p-8 lg:p-12">
                  <div className="flex flex-wrap items-center gap-2">
                    <Pill tone="yellow">Article phare</Pill>
                    {featured.category ? <Pill tone="green">{featured.category}</Pill> : null}
                  </div>

                  <h3 className="mt-4 text-3xl font-black text-[var(--honey-blue)]">
                    {featured.title}
                  </h3>

                  <p className="mt-4 text-base font-semibold text-[var(--honey-blue)]/80 leading-relaxed">
                    {featured.excerpt}
                  </p>

                  <div className="mt-7 flex flex-wrap gap-3">
                    <a
                      href={`/blog/${featured.slug}`}
                      className={btn.primary("orange","block","pill")}
                    >
                      Lire l’article
                    </a>
                    
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {/* Grid */}
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.slice(0, 12).map((p) => (
              <article
                key={p.id}
                className="group overflow-hidden rounded-3xl border border-[var(--honey-border)] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-50">
                  <Img
                    src={p.cover}
                    alt={p.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute left-4 top-4">
                    {p.category ? <Pill tone="green">{p.category}</Pill> : null}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-black text-[var(--honey-blue)] line-clamp-2">
                    {p.title}
                  </h3>

                  <p className="mt-2 text-sm font-semibold text-[var(--honey-blue)]/75 leading-relaxed line-clamp-3">
                    {p.excerpt}
                  </p>

                  <div className="mt-6">
                    <a
                      href={`/blog/${p.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-extrabold text-[var(--honey-orange)] transition group-hover:gap-3"
                    >
                      Lire la suite <span>→</span>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-14 rounded-3xl bg-[var(--honey-blue)] p-10 text-center text-white">
            <div className="text-2xl font-black">Besoin d’un conseil sur votre itinéraire ?</div>
            <div className="mx-auto mt-3 max-w-2xl text-sm font-semibold text-white/90">
              On vous aide à construire un voyage sur mesure, clair, réaliste, et aligné avec vos envies.
            </div>
           <div className="mt-8">
              <a
                href="/contact"
                className={btn.primary("orange","md","pill")}
              >
                Contacter Honey Group
              </a>
            </div>
          </div>
        </Container>
      </section>

      </ Layout>
    </div>
  );
}