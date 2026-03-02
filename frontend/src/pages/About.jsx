import React from "react";
import Layout from "../components/Layout";
import PageHero from "../components/PageHero";
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
    onError={(e) => {
      e.currentTarget.src = "/media/placeholder.jpg";
    }}
  />
);

const Card = ({ tone = "green", children }) => {
  const bar =
    tone === "orange"
      ? "bg-[var(--honey-orange)]"
      : tone === "blue"
      ? "bg-[var(--honey-blue)]"
      : tone === "yellow"
      ? "bg-[var(--honey-yellow)]"
      : "bg-[var(--honey-green)]";

  return (
    <div className="overflow-hidden rounded-3xl border border-[var(--honey-border)] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className={`h-1 w-full ${bar}`} />
      {children}
    </div>
  );
};

export default function About() {
  return (
    <div className="min-h-screen bg-[var(--honey-bg)] text-slate-900">
      <Layout>

      <PageHero
        title="À propos"
        subtitle="Honey Group, créateur de voyages à Madagascar — sur mesure, expertise locale, tourisme responsable."
        primaryCta={{ href: "/contact", label: "Demander un devis" }}
        secondaryCta={{ href: "/circuits-destinations", label: "Voir nos offres" }}
      />

      <section className="py-14 md:py-16">
        <Container>
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <div className="inline-flex rounded-full bg-[color-mix(in_srgb,var(--honey-yellow)_35%,white)] px-4 py-1 text-xs font-black text-[var(--honey-blue)]">
                À propos
              </div>

              <h1 className="mt-4 text-3xl font-black tracking-tight text-[var(--honey-blue)] md:text-4xl">
                Honey Group, créateur de voyages à Madagascar
              </h1>

              <div className="mt-8 space-y-4 text-sm font-semibold text-[var(--honey-blue)]/80 leading-relaxed">
                <p>
                  Honey Group conçoit des voyages sur mesure à Madagascar, en combinant expertise locale,
                  partenaires de confiance et respect des écosystèmes.
                </p>
                <p>
                  Chaque itinéraire est construit autour de vos envies : nature, culture, détente, aventure —
                  sans format figé.
                </p>
                <p>Objectif : vous faire vivre Madagascar, pas juste le visiter.</p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -top-4 -left-4 h-24 w-24 rounded-tl-3xl border-l-4 border-t-4 border-[var(--honey-green)]" />
              <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-br-3xl border-r-4 border-b-4 border-[var(--honey-orange)]" />

              <div className="overflow-hidden rounded-3xl border border-[var(--honey-border)] bg-slate-50 shadow-sm">
                <Img
                  src="/media/about/about-hero.jpg"
                  alt="Honey Group — Madagascar"
                  className="h-[420px] w-full object-cover md:h-[520px]"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="inline-flex rounded-full bg-[color-mix(in_srgb,var(--honey-yellow)_35%,white)] px-4 py-1 text-xs font-black text-[var(--honey-blue)]">
            Notre approche
          </div>
          <h2 className="mt-4 text-2xl font-black tracking-tight text-[var(--honey-blue)] md:text-3xl">
            Ce qui guide nos voyages
          </h2>
          <p className="mt-3 max-w-3xl text-sm font-semibold leading-relaxed text-[var(--honey-blue)]/80 md:text-base">
            Sur mesure, expertise terrain, tourisme responsable.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              { title: "Sur mesure", text: "Votre rythme, vos envies, votre budget. On adapte.", tone: "green" },
              { title: "Expertise locale", text: "Une connaissance fine du terrain et des prestataires fiables.", tone: "blue" },
              { title: "Tourisme responsable", text: "Limiter l’impact, valoriser les acteurs locaux, préserver la biodiversité.", tone: "yellow" },
            ].map((v) => (
              <Card key={v.title} tone={v.tone}>
                <div className="p-7">
                  <div className="inline-flex rounded-full bg-[color-mix(in_srgb,var(--honey-blue)_10%,white)] px-4 py-2 text-xs font-black text-[var(--honey-blue)]">
                    {v.title}
                  </div>
                  <p className="mt-4 text-sm font-semibold leading-relaxed text-[var(--honey-blue)]/80">
                    {v.text}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="inline-flex rounded-full bg-[color-mix(in_srgb,var(--honey-yellow)_35%,white)] px-4 py-1 text-xs font-black text-[var(--honey-blue)]">
            Concrètement
          </div>
          <h2 className="mt-4 text-2xl font-black tracking-tight text-[var(--honey-blue)] md:text-3xl">
            Pourquoi Honey Group ?
          </h2>
          <p className="mt-3 max-w-3xl text-sm font-semibold leading-relaxed text-[var(--honey-blue)]/80 md:text-base">
            Parce qu’on veut que ce soit simple pour vous, et solide sur le terrain.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {[
              { title: "Organisation claire", text: "Un parcours lisible, des choix expliqués, une logistique maîtrisée." },
              { title: "Itinéraires personnalisables", text: "Durée, étapes, confort : on ajuste." },
              { title: "Partenaires de confiance", text: "Hébergements et prestataires sélectionnés." },
              { title: "Expériences vraies", text: "Nature, culture, rencontres — l’essentiel." },
            ].map((b, idx) => (
              <Card key={b.title} tone={idx % 2 === 0 ? "green" : "orange"}>
                <div className="p-7">
                  <h3 className="text-lg font-black text-[var(--honey-blue)]">{b.title}</h3>
                  <p className="mt-2 text-sm font-semibold text-[var(--honey-blue)]/80 leading-relaxed">
                    {b.text}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="rounded-3xl border border-[var(--honey-border)] bg-white p-10 text-center shadow-sm overflow-hidden">
            <div className="h-1 w-full bg-[var(--honey-green)]" />
            <div className="pt-8">
              <h3 className="text-2xl md:text-3xl font-black text-[var(--honey-blue)]">
                On construit votre voyage ?
              </h3>
              <p className="mx-auto mt-3 max-w-2xl text-sm font-semibold text-[var(--honey-blue)]/70">
                Dites-nous ce que vous aimez. On s’occupe du reste.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <a
                  href="/contact"
                  className={btn.primary("orange","md","pill")}
                >
                  Demander un devis
                </a>
                <a
                  href="/"
                  className={btn.outline("blue","md","pill")}
                >
                  Retour à l’accueil
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      </Layout>
    </div>
  );
}