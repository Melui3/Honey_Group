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
          title="Bienvenue dans l’univers de Honey Group"
          subtitle="Des voyages sur mesure à Madagascar, pensés pour révéler la beauté de l’île, la richesse de sa culture et l’intensité de ses paysages."
          primaryCta={{ href: "/contact", label: "Demander un devis" }}
          secondaryCta={{ href: "/circuits-destinations", label: "Voir nos offres" }}
        />

        {/* ================= QUI SOMMES-NOUS ================= */}
        <section className="py-14 md:py-16">
          <Container>
            <div className="grid gap-10 md:grid-cols-2 md:items-center">
              <div>
                <div className="inline-flex rounded-full bg-[color-mix(in_srgb,var(--honey-yellow)_35%,white)] px-4 py-1 text-xs font-black text-[var(--honey-blue)]">
                  Qui sommes-nous ?
                </div>

                <h1 className="mt-4 text-3xl font-black tracking-tight text-[var(--honey-blue)] md:text-4xl">
                  Bien plus qu’un tour opérateur
                </h1>

                <div className="mt-8 space-y-4 text-sm font-semibold text-[var(--honey-blue)]/80 leading-relaxed">
                  <p>
                    Honey Group est bien plus qu’un simple tour opérateur : nous sommes
                    des compagnons de voyage dédiés à la création de souvenirs
                    inoubliables à Madagascar.
                  </p>
                  <p>
                    Portés par notre passion pour la Grande Île, nous concevons des
                    circuits sur mesure qui révèlent des paysages époustouflants, une
                    faune unique et une richesse culturelle incomparable.
                  </p>
                  <p>
                    Notre ambition est simple : vous faire découvrir Madagascar de façon
                    sincère, fluide et mémorable.
                  </p>
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

        {/* ================= NOTRE EXPERTISE ================= */}
        <section className="py-16">
          <Container>
            <div className="inline-flex rounded-full bg-[color-mix(in_srgb,var(--honey-yellow)_35%,white)] px-4 py-1 text-xs font-black text-[var(--honey-blue)]">
              Notre expertise
            </div>
            <h2 className="mt-4 text-2xl font-black tracking-tight text-[var(--honey-blue)] md:text-3xl">
              Une connaissance fine de Madagascar
            </h2>
            <p className="mt-3 max-w-3xl text-sm font-semibold leading-relaxed text-[var(--honey-blue)]/80 md:text-base">
              Avec des années d’expérience, nous connaissons Madagascar dans ses moindres détails
              et partageons avec vous ses secrets les mieux gardés.
            </p>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {[
                {
                  title: "Circuits sur mesure",
                  text: "Chaque voyage est conçu en fonction de vos envies, de votre rythme et de votre façon de découvrir l’île.",
                  tone: "green",
                },
                {
                  title: "Expérience terrain",
                  text: "Nous construisons des itinéraires ancrés dans la réalité locale, avec une vraie connaissance des lieux et des acteurs.",
                  tone: "blue",
                },
                {
                  title: "Voyages individuels & groupes",
                  text: "Que ce soit pour une aventure personnelle, familiale ou collective, chaque programme est pensé avec précision.",
                  tone: "yellow",
                },
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

        {/* ================= NOS ENGAGEMENTS ================= */}
        <section className="py-16">
          <Container>
            <div className="inline-flex rounded-full bg-[color-mix(in_srgb,var(--honey-yellow)_35%,white)] px-4 py-1 text-xs font-black text-[var(--honey-blue)]">
              Nos engagements
            </div>
            <h2 className="mt-4 text-2xl font-black tracking-tight text-[var(--honey-blue)] md:text-3xl">
              Ce qui guide notre manière de voyager
            </h2>
            <p className="mt-3 max-w-3xl text-sm font-semibold leading-relaxed text-[var(--honey-blue)]/80 md:text-base">
              Nous voulons proposer des expériences fortes, humaines et durables.
            </p>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {[
                {
                  title: "Immersion authentique",
                  text: "Nous croyons à une découverte complète, au plus près des communautés locales et de la vie quotidienne malgache.",
                  tone: "green",
                },
                {
                  title: "Responsabilité",
                  text: "Nous encourageons un tourisme durable, respectueux de l’environnement et du patrimoine culturel de Madagascar.",
                  tone: "orange",
                },
                {
                  title: "Innovation",
                  text: "Grâce à notre pôle IT et à nos services digitaux, nous développons une expérience moderne, fluide et rassurante pour nos partenaires.",
                  tone: "blue",
                },
              ].map((b) => (
                <Card key={b.title} tone={b.tone}>
                  <div className="p-7">
                    <h3 className="text-lg font-black text-[var(--honey-blue)]">
                      {b.title}
                    </h3>
                    <p className="mt-2 text-sm font-semibold text-[var(--honey-blue)]/80 leading-relaxed">
                      {b.text}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        {/* ================= EDUCTOURS ================= */}
        <section className="py-16">
          <Container>
            <div className="rounded-3xl border border-[var(--honey-border)] bg-white p-8 md:p-10 shadow-sm">
              <div className="inline-flex rounded-full bg-[color-mix(in_srgb,var(--honey-yellow)_35%,white)] px-4 py-1 text-xs font-black text-[var(--honey-blue)]">
                Concept Eductours
              </div>

              <h2 className="mt-4 text-2xl md:text-3xl font-black tracking-tight text-[var(--honey-blue)]">
                Explorer, comprendre, grandir
              </h2>

              <div className="mt-6 space-y-4 text-sm font-semibold leading-relaxed text-[var(--honey-blue)]/80 md:text-base">
                <p>
                  Au cœur de notre vision, les <strong>Eductours</strong> allient
                  exploration et apprentissage.
                </p>
                <p>
                  Nos guides experts vous accompagnent dans des aventures éducatives
                  au cœur de la biodiversité et de la culture malgache, pour faire de
                  chaque voyage une expérience aussi enrichissante qu’inoubliable.
                </p>
                <p>
                  Ici, le voyage ne se limite pas au déplacement : il devient une
                  véritable opportunité de découverte, de transmission et de croissance.
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* ================= CTA FINAL ================= */}
        <section className="py-16">
          <Container>
            <div className="rounded-3xl border border-[var(--honey-border)] bg-white p-10 text-center shadow-sm overflow-hidden">
              <div className="h-1 w-full bg-[var(--honey-green)]" />
              <div className="pt-8">
                <h3 className="text-2xl md:text-3xl font-black text-[var(--honey-blue)]">
                  On construit votre voyage ?
                </h3>
                <p className="mx-auto mt-3 max-w-2xl text-sm font-semibold text-[var(--honey-blue)]/70">
                  Parlez-nous de vos envies, de votre rythme et de votre idée de Madagascar.
                  On s’occupe du reste, proprement.
                </p>

                <div className="mt-8 flex flex-wrap justify-center gap-4">
                  <a href="/contact" className={btn.primary("orange", "md", "pill")}>
                    Demander un devis
                  </a>
                  <a href="/" className={btn.outline("blue", "md", "pill")}>
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