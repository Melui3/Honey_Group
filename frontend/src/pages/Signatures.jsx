import React, { useMemo, useState, useEffect } from "react";
import { SIGNATURES } from "../data";
import { loadWithFallback } from "../lib/dataSource";
import Layout from "../components/Layout";
import PageHero from "../components/PageHero";
import Lightbox from "../components/Lightbox";
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

export default function Signatures() {
 
  const all = useMemo(() => SIGNATURES, []);
  const [lbOpen, setLbOpen] = useState(false);
  const [lbTitle, setLbTitle] = useState("");
  const [lbImages, setLbImages] = useState([]);

  

  const openGallery = (s) => {
    const images = (s.gallery && s.gallery.length ? s.gallery : [s.cover]).filter(Boolean);
    setLbTitle(s.title || "Galerie");
    setLbImages(images.length ? images : ["/media/placeholder.jpg"]);
    setLbOpen(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <Layout>

      <PageHero
        title="Expériences Signature"
        subtitle="Des expériences fortes, premium et personnalisables pour découvrir Madagascar autrement."
        primaryCta={{ href: "/contact", label: "Demander un devis" }}
        secondaryCta={{ href: "/circuits-destinations?tab=signatures", label: "Voir dans l’onglet" }}
      />

      <section className="py-14">
        <Container>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {all.map((s) => {
  const Icon = s.icon;

  return (
    <div
      key={s.id}
      className="group overflow-hidden rounded-3xl border border-[var(--honey-border)] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative aspect-[16/9] bg-slate-50 overflow-hidden">
        <Img
          src={s.cover}
          alt={s.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

        <div className="absolute left-5 top-5 rounded-full bg-[var(--honey-yellow)] px-4 py-2 text-xs font-black text-[var(--honey-blue)]">
          ⭐ Signature
        </div>

        {Icon ? (
          <div className="absolute right-5 top-5 grid h-12 w-12 place-items-center rounded-full bg-white/90 text-[var(--honey-blue)] shadow-sm">
            <Icon className="h-6 w-6" />
          </div>
        ) : null}

        <div className="absolute bottom-5 left-5 inline-flex rounded-full bg-[var(--honey-blue)] px-4 py-2 text-xs font-black text-white shadow-sm">
          {s.duration || "Signature"}
        </div>
      </div>

      <div className="p-7">
        <h3 className="text-2xl font-black text-[var(--honey-blue)]">{s.title}</h3>

        <p className="mt-3 text-sm font-semibold text-[var(--honey-blue)]/75 leading-relaxed">
          {s.description}
        </p>

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
            className={btn.outline("blue", "block", "card")}
          >
            Voir la galerie
          </button>

          <a href="/contact?type=signature" className={btn.primary("orange", "block", "card")}>
            Réserver / Devis
          </a>
        </div>
      </div>
    </div>
  );
})}
          </div>

          <div className="mt-14 rounded-3xl bg-[var(--honey-blue)] p-10 text-center text-white">
            <div className="text-2xl font-black">Une signature, mais à ton goût.</div>
            <div className="mx-auto m-3 max-w-2xl text-sm font-semibold text-white/90">
              On personnalise l’expérience selon tes envies, ton rythme, et ton budget.
            </div>
            <a
              href="/contact?type=signature"
              className={btn.primary("orange","md","pill")}
            >
              Créer mon voyage signature
            </a>
          </div>
        </Container>
      </section>

      <Lightbox open={lbOpen} title={lbTitle} images={lbImages} initialIndex={0} onClose={() => setLbOpen(false)} />

      </Layout>
    </div>
  );
}