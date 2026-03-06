import React, { useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { card, bar, media, layer } from "../ui/cards";
import { btn } from "../ui/buttons";
import {CIRCUITS, DESTINATIONS, SIGNATURES, EXCURSIONS, BLOG_POSTS, VIDEO_CARDS, HERO_MEDIA } from "../data";
import { loadWithFallback } from "../lib/dataSource";
import {
  Youtube,
  Facebook,
  IconTikTok,
  IconInstagram,
  Play,
  Leaf,
  Users,
  Shield,
  Route as RouteIcon,
  Clock,
  Mountain,
  Compass,
  Map,
  ArrowRight,
  Ruler,
  MapPinned,
  Handshake,
  Sparkles,
  Star,
  Moon,
} from "lucide-react";

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

const SectionTitle = ({ badge, title, subtitle, align = "center" }) => (
  <div className={align === "left" ? "text-left" : "text-center"}>
    {badge ? (
      <div
        className={`inline-flex rounded-full bg-[color-mix(in_srgb,var(--honey-yellow)_35%,white)] px-4 py-1 text-xs font-black text-[var(--honey-blue)] ${
          align === "center" ? "mx-auto" : ""
        }`}
      >
        {badge}
      </div>
    ) : null}
    <h2 className="mt-4 text-2xl font-black tracking-tight text-[var(--honey-blue)] md:text-3xl">
      {title}
    </h2>
    {subtitle ? (
      <p
        className={`mt-3 max-w-3xl text-sm font-semibold leading-relaxed text-[var(--honey-blue)]/80 md:text-base ${
          align === "center" ? "mx-auto" : ""
        }`}
      >
        {subtitle}
      </p>
    ) : null}
  </div>
);

/* -------------------------------------------- */
/* Decorative helpers (purely visual) */
/* -------------------------------------------- */

const SoftWave = ({ className = "" }) => (
  <svg
    className={className}
    viewBox="0 0 1440 320"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      fill="rgb(var(--dummy, 0 0 0))"
      className="fill-[color-mix(in_srgb,var(--honey-green)_18%,transparent)]"
      d="M0,96L48,112C96,128,192,160,288,165.3C384,171,480,149,576,128C672,107,768,85,864,96C960,107,1056,149,1152,149.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
    />
  </svg>
);

const DecorativeDots = () => (
  <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:radial-gradient(circle_at_1px_1px,black_1px,transparent_0)] [background-size:18px_18px]" />
);

/* -------------------------------------------- */
/* Home */
/* -------------------------------------------- */

export default function Home() {
  const [destinations, setDestinations] = useState(DESTINATIONS);
  const [circuits, setCircuits] = useState(CIRCUITS);
  const [excursions, setExcursions] = useState(EXCURSIONS);
  const [signatures, setSignatures] = useState(SIGNATURES);
  const [blogPosts, setBlogPosts] = useState(BLOG_POSTS);

  const [heroMedia, setHeroMedia] = useState(HERO_MEDIA || { mode: "poster", poster: "/media/hero/hero.jpg" });
  const [videoCards, setVideoCards] = useState(VIDEO_CARDS);

  useEffect(() => {
    // Si l’API existe, elle remplace les seeds. Sinon seeds restent.
    loadWithFallback("/api/destinations/", DESTINATIONS).then(setDestinations);
    loadWithFallback("/api/circuits/", CIRCUITS).then(setCircuits);
    loadWithFallback("/api/excursions/", EXCURSIONS).then(setExcursions);
    loadWithFallback("/api/signatures/", SIGNATURES).then(setSignatures);
    loadWithFallback("/api/blog-posts/", BLOG_POSTS).then(setBlogPosts);

    // optionnel selon ton backend
    // loadWithFallback("/api/hero-media/", HERO_MEDIA).then(setHeroMedia);
    // loadWithFallback("/api/video-cards/", VIDEO_CARDS).then(setVideoCards);
  }, []);

  const featuredDestinations = useMemo(
    () => (destinations || []).filter((d) => d.featured).slice(0, 4),
    [destinations]
  );

  const featuredCircuits = useMemo(
    () => (circuits || []).filter((c) => c.featured).slice(0, 4),
    [circuits]
  );

  const featuredExcursions = useMemo(
    () => (excursions || []).filter((e) => e.featured).slice(0, 4),
    [excursions]
  );

  const featuredSignatures = useMemo(
    () => (signatures || []).filter((s) => Boolean(s.featured)).slice(0, 4),
    [signatures]
  );

  const picked = featuredSignatures;

  const featuredVideo = useMemo(
    () => (videoCards || []).find((v) => v.featured) || (videoCards || [])[0],
    [videoCards]
  );

  const otherVideos = useMemo(
    () => (videoCards || []).filter((v) => v.id !== featuredVideo?.id).slice(0, 2),
    [videoCards, featuredVideo]
  );

const heroPoster = heroMedia?.poster || "/media/hero/hero.jpg";
const aboutImg = "/media/about/about-team.png";

  const circuitIcons = [RouteIcon, Mountain, Compass, Map];

  return (
    <div className="min-h-screen bg-[var(--honey-bg)] text-slate-900" id="home">
      <Header />

      {/* ================= HERO ================= */}
      <section className="relative h-[620px] md:h-[720px] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroPoster})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/35" />
          <div className="absolute inset-0 bg-black/15" />
          <div className="absolute inset-0 [background:radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.10),transparent_45%)]" />
        </div>

        {/* decor blobs */}
        <div className="pointer-events-none absolute top-20 left-10 w-20 h-20 rounded-full opacity-20 bg-[var(--honey-yellow)]" />
        <div className="pointer-events-none absolute bottom-32 right-20 w-32 h-32 rounded-full opacity-10 bg-[var(--honey-green)]" />
        <div className="pointer-events-none absolute top-40 right-32 w-16 h-16 rotate-45 opacity-15 bg-[var(--honey-orange)]" />

        <Container>
          <div className="relative z-10 text-center text-white">
            <div className="inline-flex items-center gap-2 rounded-full bg-[var(--honey-green)] px-4 py-2 text-sm font-extrabold shadow-sm">
              Tourisme Éco-Responsable
              <span className="h-2 w-2 rounded-full bg-[var(--honey-yellow)]" />
            </div>

            <h1 className="mt-6 text-4xl md:text-6xl lg:text-7xl font-black leading-tight">
              Votre destination, notre{" "}
              <span className="text-[var(--honey-yellow)]">expertise</span>.
            </h1>

            <p className="mt-6 mx-auto max-w-2xl text-lg md:text-xl font-semibold text-white/95">
              Voyages sur mesure à Madagascar, conçus par des experts locaux.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="/circuits-destinations?tab=destinations"
                className={btn.primary("orange", "lg", "pill")}
              >
                Nos Destinations
              </a>

              <a
                href="/circuits-destinations?tab=circuits"
                className={[
                  btn.outline("blue", "lg", "pill"),
                  
                ].join(" ")}
              >
                Voir les Circuits
              </a>
            </div>

            {/* Social pills */}
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              {[
                { label: "YouTube", href: "https://www.youtube.com/@SamRob-l1z", Icon: Youtube },
                { label: "Facebook", href: "https://www.google.com/search?q=https://web.facebook.com/profile.php%3Fid%3D61554781021481", Icon: Facebook },
                  { label: "TikTok", href: "https://www.tiktok.com/@honeygr7?lang=fr", Icon: IconTikTok },
                  { label: "Instagram", href: "https://www.instagram.com/honey_group_mada/", Icon: IconInstagram },
              ].map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-2 text-xs font-black text-white ring-1 ring-white/25 backdrop-blur transition hover:bg-white/20 hover:-translate-y-0.5 hover:shadow-2xl"
                >
                  <Icon className="h-5 w-5" />
                  <span>{label}</span>
                </a>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ================= DESTINATIONS ================= */}
      <section id="destinations" className="relative overflow-hidden py-20 bg-white">
        <DecorativeDots />
        <div className="pointer-events-none absolute top-10 right-0 w-72 h-72 opacity-[0.08]">
          <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-[var(--honey-orange)]" />
          <div className="absolute top-20 right-20 w-32 h-32 rounded-full bg-[var(--honey-blue)]" />
          <div className="absolute bottom-0 right-10 w-20 h-20 rounded-full bg-[var(--honey-green)]" />
        </div>

        <Container>
          <div className="relative z-10">
            <div className="mb-16 relative">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-12 h-0.5 bg-[var(--honey-orange)]/80" />
                <div className="shrink-0">
                  <div className="inline-flex rounded-full bg-[color-mix(in_srgb,var(--honey-yellow)_35%,white)] px-4 py-1 text-xs font-black text-[var(--honey-blue)] mx-auto">
                    Explorez
                  </div>
                </div>
                <div className="w-12 h-0.5 bg-[var(--honey-orange)]/80" />
              </div>

              <h2 className="text-center text-3xl md:text-4xl font-black mb-4 text-[var(--honey-blue)]">
                Destinations phares
              </h2>
              <p className="text-center text-lg max-w-2xl mx-auto text-[var(--honey-blue)]/80 font-semibold">
                Des lieux emblématiques sélectionnés pour leur richesse naturelle, culturelle et leur potentiel d’évasion.
              </p>
            </div>

            {/* 4 cards only */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredDestinations.map((d) => (
                <a
                  key={d.id}
                  href="/circuits-destinations?tab=destinations"
                  className={card.elevated}
                >
                  <div className="aspect-[4/3] overflow-hidden bg-slate-50">
                    <Img
                      src={d.cover}
                      alt={d.title}
                      className={media.img}
                    />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent flex flex-col justify-end p-6 text-white">
                    <div className="text-xs font-black text-white/85">{d.zone}</div>
                    <h3 className="mt-2 text-2xl font-black">{d.title}</h3>
                    <p className="mt-2 text-sm font-semibold text-white/85 line-clamp-3">
                      {d.teaser}
                    </p>

                    <div className="mt-4 inline-flex items-center gap-2 font-extrabold text-sm text-[var(--honey-yellow)] transition-all group-hover:gap-3">
                      <span>En savoir plus</span>
                      <span className="text-[var(--honey-yellow)]">→</span>
                    </div>
                  </div>

                  <div className={bar.top("green")} />

                  <div className="pointer-events-none absolute top-0 right-0 w-16 h-16 overflow-hidden">
                    <div className="absolute -top-8 -right-8 w-16 h-16 rounded-full opacity-25 bg-[var(--honey-yellow)]" />
                  </div>
                </a>
              ))}
            </div>

            {/* CTA clickable */}
            <div className={`mt-12 text-center ${layer.safeTop}`}>
              <a
                href="/circuits-destinations?tab=destinations"
                className={btn.primary("blue", "lg", "pill")}
              >
                Voir toutes les destinations
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* ================= ENGAGEMENT ================= */}
      <section
        id="eco"
        className="relative overflow-hidden py-20 bg-gradient-to-b from-white to-[color-mix(in_srgb,var(--honey-green)_10%,white)]"
      >
        <div className="pointer-events-none absolute top-0 right-0 w-96 h-96 rounded-full opacity-[0.06] bg-[var(--honey-green)]" />
        <div className="pointer-events-none absolute bottom-20 left-0 w-64 h-64 rounded-full opacity-[0.06] bg-[var(--honey-orange)]" />

        <svg
          className="pointer-events-none absolute top-40 left-0 w-full h-32 opacity-10"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M0,50 Q250,20 500,50 T1000,50 T1500,50"
            stroke="rgb(0 166 81)"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M0,80 Q250,50 500,80 T1000,80 T1500,80"
            stroke="rgb(255 210 0)"
            strokeWidth="2"
            fill="none"
          />
        </svg>

        <Container>
          <div className="relative z-10">
            <div className="text-center mb-16">
              <div className="inline-block relative">
                <div className="inline-flex rounded-full bg-[color-mix(in_srgb,var(--honey-yellow)_35%,white)] px-4 py-1 text-xs font-black text-[var(--honey-blue)]">
                  Notre engagement
                </div>
                <div className="pointer-events-none absolute -left-2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[var(--honey-green)]" />
                <div className="pointer-events-none absolute -right-2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[var(--honey-green)]" />
              </div>

              <h2 className="mt-5 text-3xl md:text-4xl font-black text-[var(--honey-blue)]">
                Voyager autrement, en respectant Madagascar
              </h2>
              <p className="mt-4 text-lg max-w-2xl mx-auto text-[var(--honey-blue)]/80 font-semibold">
                Un tourisme responsable, respectueux de l’environnement et des communautés locales.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Tourisme responsable",
                  text: "Des choix concrets pour limiter l’impact et encourager des pratiques durables.",
                  Icon: Leaf,
                  tone: "green",
                },
                {
                  title: "Communautés locales",
                  text: "Partenariats avec des acteurs du terrain pour une expérience plus juste et plus vraie.",
                  Icon: Users,
                  tone: "blue",
                },
                {
                  title: "Sécurité & encadrement",
                  text: "Une organisation carrée, des partenaires fiables et un accompagnement clair.",
                  Icon: Shield,
                  tone: "orange",
                },
              ].map(({ title, text, Icon, tone }) => (
                <div key={title} className={card.base}>
                  <div className={bar.top(tone)} />
                  <div className="p-7">
                    <div className="grid h-14 w-14 place-items-center rounded-2xl border border-[var(--honey-border)] bg-white shadow-sm">
                      <Icon className="h-7 w-7" style={{ color: `var(--honey-${tone})` }} />
                    </div>

                    <h3 className="mt-5 font-black mb-2 text-[var(--honey-blue)]">
                      {title}
                    </h3>
                    <p className="text-sm font-semibold text-[var(--honey-blue)]/75 leading-relaxed">
                      {text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <a
                href="/a-propos"
                className={btn.outline("blue", "lg", "pill")}
              >
                Découvrir Honey Group
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* ================= CIRCUITS ================= */}
      <section
        id="circuits"
        className="relative overflow-hidden py-20 bg-[color-mix(in_srgb,black_2%,white)]"
      >
        <div className="pointer-events-none absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-[0.06] bg-[var(--honey-blue)]" />
        <div className="pointer-events-none absolute top-20 right-20 w-40 h-40 rotate-12 opacity-[0.06] bg-[var(--honey-orange)]" />
        <SoftWave className="pointer-events-none absolute bottom-0 left-0 w-full opacity-[0.22]" />

        <Container>
          <div className="relative z-10">
            <div className="text-center mb-16">
              <div className="inline-block px-0 py-0 rounded-full mb-4 relative">
                <div className="inline-flex rounded-full bg-[color-mix(in_srgb,var(--honey-yellow)_35%,white)] px-4 py-1 text-xs font-black text-[var(--honey-blue)]">
                  Voyages
                </div>
                <div className="pointer-events-none absolute -top-2 -left-2 w-6 h-6 border-2 rounded-full border-[var(--honey-orange)] opacity-30" />
                <div className="pointer-events-none absolute -bottom-2 -right-2 w-4 h-4 rounded-full bg-[var(--honey-green)] opacity-40" />
              </div>

              <h2 className="text-3xl md:text-4xl font-black mb-4 text-[var(--honey-blue)]">
                Nos circuits à travers Madagascar
              </h2>
              <p className="text-lg max-w-2xl mx-auto text-[var(--honey-blue)]/80 font-semibold">
                Les 4 grands circuits — personnalisables selon vos envies.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredCircuits.map((c, idx) => {
                const tone = idx % 3 === 0 ? "green" : idx % 3 === 1 ? "orange" : "blue";
                const Icon = circuitIcons[idx % circuitIcons.length];

                return (
                  <div key={c.id} className={card.base}>
                    <div className={bar.top(tone)} />

                    <div className="p-8">
                      <div className="grid h-14 w-14 place-items-center rounded-2xl border border-[var(--honey-border)] bg-white shadow-sm">
                        <Icon className="h-7 w-7" style={{ color: `var(--honey-${tone})` }} />
                      </div>

                      <h3 className="mt-5 text-xl font-black mb-4 text-[var(--honey-blue)]">
                        {c.title}
                      </h3>

                      <div className="space-y-2 mb-6">
                        <div className="flex items-center gap-2 text-sm font-semibold text-[var(--honey-blue)]/80">
                          <Clock className="h-5 w-5" style={{ color: `var(--honey-${tone})` }} />
                          <span>{c.durationLabel}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm font-semibold text-[var(--honey-blue)]/80">
                          <RouteIcon className="h-5 w-5" style={{ color: `var(--honey-${tone})` }} />
                          <span>{c.routeLabel}</span>
                        </div>
                      </div>

                      <div className="space-y-2 mb-6">
                        {(c.highlights || []).slice(0, 4).map((h) => (
                          <div key={h} className="flex items-start gap-2">
                            <div
                              className="mt-1.5 h-2 w-2 rounded-full"
                              style={{ backgroundColor: `var(--honey-${tone})` }}
                            />
                            <span className="text-sm font-semibold text-[var(--honey-blue)]/80">
                              {h}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* One button only (same tone) */}
                      <a
                        href="/circuits-destinations?tab=circuits"
                        className={btn.primary(tone, "block", "card")}
                        
                      >
                        Découvrir le circuit <ArrowRight className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* KEEP “Circuit sur mesure ?” */}
            <div className="mt-16 text-center">
              <div className="inline-block bg-white rounded-3xl border border-[var(--honey-border)] shadow-sm p-8 md:p-12 max-w-3xl relative overflow-hidden">
                <div className="pointer-events-none absolute top-4 right-4 w-20 h-20 rounded-full opacity-5 bg-[var(--honey-yellow)]" />
                <div className="pointer-events-none absolute bottom-4 left-4 w-16 h-16 rounded-full opacity-5 bg-[var(--honey-green)]" />

                <div className="mx-auto h-1 w-24 rounded-full bg-[var(--honey-green)]" />
                <h3 className="mt-6 text-2xl md:text-3xl font-black mb-4 text-[var(--honey-blue)]">
                  Circuit sur mesure ?
                </h3>
                <p className="mb-6 text-[var(--honey-blue)]/80 font-semibold">
                  On construit votre voyage idéal à Madagascar, adapté à vos envies et respectueux de l’environnement.
                </p>
                <a
                  href="/contact?type=circuit"
                  className={btn.primary("orange", "lg", "pill")}
                >
                  Contactez-nous
                </a>
              </div>
            </div>

            {/* CTA clickable */}
            <div className={`mt-12 text-center ${layer.safeTop}`}>
              <a
                href="/circuits-destinations?tab=circuits"
                className={btn.primary("blue", "lg", "pill")}
              >
                Voir tous les circuits
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* ================= À PROPOS ================= */}
      <section id="about" className="relative overflow-hidden py-20 bg-white">
        <DecorativeDots />
        <div className="pointer-events-none absolute -top-16 -left-16 w-64 h-64 rounded-full bg-[var(--honey-yellow)] opacity-[0.08]" />
        <div className="pointer-events-none absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-[var(--honey-blue)] opacity-[0.06]" />

        <Container>
          <div className="relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <div className="pointer-events-none absolute -top-4 -left-4 w-24 h-24 border-l-4 border-t-4 rounded-tl-3xl border-[var(--honey-green)]" />
                <div className="pointer-events-none absolute -bottom-4 -right-4 w-24 h-24 border-r-4 border-b-4 rounded-br-3xl border-[var(--honey-orange)]" />

                <div className="rounded-3xl overflow-hidden border border-[var(--honey-border)] shadow-sm relative z-10 bg-slate-50">
                  <Img
                    src={aboutImg}
                    alt="Notre équipe"
                    className="w-full h-[600px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
                </div>
              </div>

              <div>
                <div className="inline-flex rounded-full bg-[color-mix(in_srgb,var(--honey-yellow)_35%,white)] px-4 py-1 text-xs font-black text-[var(--honey-blue)]">
                  À propos
                </div>

                <h2 className="mt-4 text-3xl md:text-4xl font-black text-[var(--honey-blue)]">
                  Honey Group, créateur de voyages à Madagascar
                </h2>

                <p className="mt-5 font-semibold text-[var(--honey-blue)]/80 leading-relaxed">
                  Honey Group conçoit des voyages authentiques à Madagascar, en mettant l’humain, la nature
                  et la découverte au cœur de chaque itinéraire.
                </p>
                <p className="mt-4 font-semibold text-[var(--honey-blue)]/80 leading-relaxed">
                  Chaque projet est pensé sur mesure, en fonction de vos envies, de votre rythme et de votre façon
                  de voyager.
                </p>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
                  {[
                    { title: "Sur mesure", text: "Un itinéraire adapté à vos envies et à votre budget.", Icon: Ruler },
                    { title: "Expertise locale", text: "Guides et partenaires fiables sur le terrain.", Icon: MapPinned },
                    { title: "Tourisme responsable", text: "Limiter l’impact, favoriser le local, préserver.", Icon: Sparkles },
                    { title: "Expériences vraies", text: "Rencontres, culture, paysages : du concret.", Icon: Handshake },
                  ].map((v) => (
                    <div key={v.title} className="flex gap-3">
                      <div className="grid h-12 w-12 place-items-center rounded-2xl border border-[var(--honey-border)] bg-white shadow-sm">
                        <v.Icon className="h-6 w-6 text-[var(--honey-green)]" />
                      </div>
                      <div>
                        <div className="font-black text-[var(--honey-blue)]">{v.title}</div>
                        <div className="text-sm font-semibold text-[var(--honey-blue)]/70">
                          {v.text}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-10 flex flex-wrap gap-3">
                  <a
                    href="/a-propos"
                    className={btn.outline("blue", "md", "pill")}
                  >
                    En savoir plus
                  </a>
                  <a
                    href="/contact"
                    className={btn.primary("orange", "md", "pill")}
                  >
                    Demander un devis
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ================= PARTENAIRES ================= */}
      <section
        id="partners"
        className="relative overflow-hidden py-20 bg-[color-mix(in_srgb,black_2%,white)]"
      >
        <div className="pointer-events-none absolute top-0 right-0 w-72 h-72 rounded-full opacity-[0.06] bg-[var(--honey-green)]" />
        <div className="pointer-events-none absolute bottom-0 left-0 w-72 h-72 rounded-full opacity-[0.06] bg-[var(--honey-orange)]" />

        <Container>
          <div className="relative z-10">
            <SectionTitle
              badge="Nos partenaires"
              title="Hôtels & Lodges partenaires"
              subtitle="Nous collaborons avec des établissements de confiance pour garantir confort, accueil et qualité."
            />

            <div className="mt-12 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
  {Array.from({ length: 10 }).map((_, i) => (
    <div
      key={i}
      className={[
        card.base,
        "relative flex items-center justify-center p-4", // padding interne
      ].join(" ")}
    >
      {/* Top bar */}
      <div className={bar.top(i % 2 === 0 ? "green" : "orange")} />

      {/* Logo zone */}
      <div className="relative flex h-20 w-full items-center justify-center rounded-2xl border border-[var(--honey-border)] bg-white shadow-sm transition hover:shadow-md">
        {/* Décor soft (optionnel) */}
        <div className="pointer-events-none absolute -top-10 -right-10 h-24 w-24 rounded-full bg-[var(--honey-yellow)] opacity-10 transition group-hover:opacity-20" />

       <img
  src={`/media/partners/logo-${String(i + 1).padStart(2, "0")}.png`}
  alt={`Partenaire ${i + 1}`}
  className="max-h-12 max-w-[140px] object-contain opacity-85 transition group-hover:opacity-100"
  onError={(e) => {
    const base = `/media/partners/logo-${String(i + 1).padStart(2, "0")}`;
    
    if (e.currentTarget.src.endsWith(".png")) {
      e.currentTarget.src = base + ".jpg";
    } else if (e.currentTarget.src.endsWith(".jpg")) {
      e.currentTarget.src = base + ".webp";
    } else {
      e.currentTarget.style.display = "none";
    }
  }}
/>
      </div>
    </div>
  ))}
</div>

            <div className="mt-12 text-center">
              <a href="/contact" className={btn.primary("orange", "lg", "pill")}>
                Travailler avec nous
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* ================= SIGNATURES teaser ================= */}
<section
  id="signatures"
  className="relative overflow-hidden py-20 bg-[var(--honey-blue)] text-white"
>
  <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[var(--honey-yellow)] opacity-10" />
  <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[var(--honey-green)] opacity-10" />

  <Container>
    <div className="relative z-10">
      {/* Header */}
      <div className="mb-14 text-center">
        <div className="flex items-center justify-center gap-3">
          <Sparkles className="h-9 w-9 text-[var(--honey-yellow)]" />
          <h2 className="text-3xl font-black md:text-4xl">Expériences Signature</h2>
          <Sparkles className="h-9 w-9 text-[var(--honey-yellow)]" />
        </div>

        <p className="mx-auto mt-4 max-w-3xl text-sm font-semibold text-white/90 md:text-base">
          Des expériences premium, encadrées, et personnalisables — pour vivre Madagascar proprement.
        </p>

        <div className="mt-6 flex items-center justify-center gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-5 w-5 text-[var(--honey-yellow)]" fill="currentColor" />
          ))}
        </div>
      </div>

      {/* Cards */}
      <div className="grid gap-8 lg:grid-cols-2">
        {picked.map((s, idx) => {
          const tone = idx % 2 === 0 ? "bg-[var(--honey-green)] text-white" : "bg-[var(--honey-yellow)] text-[var(--honey-blue)]";

          return (
            <div
              key={s.id}
              className="group relative overflow-hidden rounded-3xl border border-white/15 bg-white text-slate-900 shadow-2xl transition hover:-translate-y-2 hover:shadow-[0_30px_80px_rgba(0,0,0,0.35)]"
            >
              {/* Image */}
              <div className="relative h-80 overflow-hidden">
                <Img
                  src={s.cover}
                  alt={s.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                {/* Badge */}
                <div className="absolute left-6 top-6 rounded-full bg-[var(--honey-yellow)] px-4 py-2 text-sm font-black text-[var(--honey-blue)]">
                  ⭐ Signature
                </div>

                {/* Duration chip */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className={["inline-flex rounded-full px-4 py-1 text-sm font-black", tone].join(" ")}>
                    {s.duration || "Signature"}
                  </div>

                  <h3 className="mt-3 text-3xl font-black text-white">{s.title}</h3>

                  <p className="mt-1 text-lg font-semibold text-white/90 italic">
                    {s.description
                      ? s.description.length > 90
                        ? s.description.slice(0, 90) + "…"
                        : s.description
                      : "Expérience signature premium"}
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <p className="text-sm font-semibold text-[var(--honey-blue)]/90 md:text-base">
                  {s.description || "Une expérience signature personnalisable selon vos envies."}
                </p>

                {Array.isArray(s.bullets) && s.bullets.length ? (
                  <div className="mt-6">
                    <h4 className="flex items-center gap-2 text-sm font-black text-[var(--honey-blue)]">
                      <Compass className="h-5 w-5 text-[var(--honey-green)]" />
                      Points forts
                    </h4>

                    <ul className="mt-3 space-y-2">
                      {s.bullets.slice(0, 4).map((t) => (
                        <li key={t} className="flex items-start gap-3">
                          <span className="mt-2 h-2 w-2 rounded-full bg-[var(--honey-green)]" />
                          <span className="text-sm font-semibold text-[var(--honey-blue)]/90">
                            {t}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {/* CTAs */}
                <div className="mt-7 grid gap-4 sm:grid-cols-2">
                  <a href="/signatures" className={btn.outline("blue", "block", "card")}>
                    Voir plus
                  </a>

                  <a
                    href={`/contact?type=signature&item=${encodeURIComponent(s.slug || s.id)}`}
                    className={btn.primary("orange", "block", "card")}
                  >
                    Réserver / Devis <ArrowRight className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="mt-12 text-center">
        <a href="/signatures" className={btn.outline("blue", "block", "card")}>
          Découvrir toutes les signatures
        </a>
      </div>
    </div>
  </Container>
</section>

      {/* ================= EXCURSIONS teaser ================= */}
<section id="excursions" className="relative overflow-hidden py-20 bg-white">
  <div className="pointer-events-none absolute top-12 left-0 w-72 h-72 rounded-full opacity-[0.06] bg-[var(--honey-blue)]" />
  <div className="pointer-events-none absolute bottom-12 right-0 w-72 h-72 rounded-full opacity-[0.06] bg-[var(--honey-orange)]" />

  <Container>
    <div className="relative z-10">
      <SectionTitle
        badge="Excursions"
        title="Excursions & Activités"
        subtitle="Des expériences courtes et immersives pour compléter votre itinéraire."
      />

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredExcursions.map((e) => (
          <a
            key={e.id}
            href="/circuits-destinations?tab=excursions"
            className="group relative overflow-hidden rounded-3xl border border-[var(--honey-border)] bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
          >
            {/* Image */}
            <div className="relative h-64 overflow-hidden bg-slate-50">
              <Img
                src={e.cover}
                alt={e.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Badge populaire */}
              {e.featured ? (
                <div className="absolute top-4 right-4 rounded-full bg-[var(--honey-yellow)] px-3 py-1 text-xs font-black text-[var(--honey-blue)] shadow-sm">
                  Populaire
                </div>
              ) : null}

              {/* Overlay soft */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="text-xs font-black text-[var(--honey-blue)]/70">
                
              </div>

              <h3 className="mt-2 text-xl font-black text-[var(--honey-blue)]">
                {e.title}
              </h3>

              <p className="mt-2 text-sm font-semibold text-[var(--honey-blue)]/75 line-clamp-2">
                {e.highlights?.length
                  ? e.highlights.slice(0, 3).join(" • ")
                  : "Une expérience idéale pour compléter votre itinéraire."}
              </p>

              {/* Infos */}
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm font-semibold text-[var(--honey-blue)]/85">
                  <Clock className="h-4 w-4 text-[var(--honey-green)]" />
                  <span>{e.durationLabel || "Durée variable"}</span>
                </div>

                <div className="flex items-center gap-2 text-sm font-semibold text-[var(--honey-blue)]/85">
                  <MapPinned className="h-4 w-4 text-[var(--honey-green)]" />
                  <span>{e.area || "Madagascar"}</span>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-5">
                <div className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[var(--honey-orange)] px-5 py-3 text-sm font-extrabold text-white transition-all duration-300 group-hover:gap-4">
                  Réserver <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>

      <div className="mt-12 text-center">
        <a
          href="/circuits-destinations?tab=excursions"
          className={btn.primary("blue", "lg", "pill")}
        >
          Voir toutes les excursions
        </a>
      </div>
    </div>
  </Container>
</section>

      {/* ================= BLOG teaser ================= */}
<section
  id="blog"
  className="relative overflow-hidden py-20 bg-[color-mix(in_srgb,black_2%,white)]"
>
  <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-[var(--honey-yellow)] opacity-[0.10]" />

  <Container>
    <div className="relative z-10">
      <SectionTitle
        badge="Blog"
        title="Blog & Actualités"
        subtitle="Conseils, guides et histoires pour un tourisme responsable à Madagascar."
      />

      {(() => {
        const posts = (blogPosts || []).slice(0, 3);
        const featured = posts[0];
        const others = posts.slice(1);

        if (!featured) return null;

        return (
          <>
            {/* Featured post */}
            <a
              href={`/blog/${featured.slug}`}
              className={[
                card.base,
                "group mb-10 overflow-hidden grid gap-0 lg:grid-cols-2",
              ].join(" ")}
            >
              {/* Image */}
              <div className="relative h-72 lg:h-auto overflow-hidden bg-slate-50">
                <Img
                  src={featured.cover}
                  alt={featured.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/15" />

                <div className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full bg-[var(--honey-yellow)] px-4 py-2 text-xs font-black text-[var(--honey-blue)] shadow-sm">
                  Article phare
                </div>
              </div>

              {/* Content */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex flex-wrap items-center gap-2 text-xs font-black text-[var(--honey-blue)]/70">
                  <span className="inline-flex rounded-full bg-[color-mix(in_srgb,var(--honey-green)_14%,white)] px-3 py-1 text-[var(--honey-green)]">
                    {featured.category || "Blog"}
                  </span>
                  {featured.date ? <span>• {featured.date}</span> : null}
                  {featured.readTime ? <span>• {featured.readTime} de lecture</span> : null}
                  {featured.author ? <span>• {featured.author}</span> : null}
                </div>

                <h3 className="mt-4 text-3xl font-black text-[var(--honey-blue)]">
                  {featured.title}
                </h3>

                <p className="mt-4 text-sm md:text-base font-semibold text-[var(--honey-blue)]/80 leading-relaxed line-clamp-4">
                  {featured.excerpt}
                </p>

                <div className="mt-7">
                  <span
                    className={[
                      btn.primary("orange", "md", "pill"),
                      "inline-flex w-fit items-center gap-2 transition-all group-hover:gap-3",
                    ].join(" ")}
                  >
                    Lire l’article <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>

              {/* top bar (optionnel) */}
              <div className={bar.top("green")} />
            </a>

            {/* Other posts */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {others.map((p, idx) => (
                <a
                  key={p.id}
                  href={`/blog/${p.slug}`}
                  className={[card.base, "group overflow-hidden"].join(" ")}
                >
                  <div className={bar.top(idx % 2 === 0 ? "orange" : "blue")} />

                  <div className="aspect-[16/10] overflow-hidden bg-slate-50">
                    <Img
                      src={p.cover}
                      alt={p.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between gap-3 text-xs font-black text-[var(--honey-blue)]/70">
                      <span>{p.category || "Blog"}</span>
                      {p.date ? <span>{p.date}</span> : null}
                    </div>

                    <div className="mt-2 text-lg font-black text-[var(--honey-blue)] line-clamp-2">
                      {p.title}
                    </div>

                    <p className="mt-2 text-sm font-semibold text-[var(--honey-blue)]/75 line-clamp-3">
                      {p.excerpt}
                    </p>

                    <div className="mt-4 text-sm font-extrabold text-[var(--honey-orange)] inline-flex items-center gap-2 transition-all group-hover:gap-3">
                      Lire la suite <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-12 text-center">
              <a href="/blog" className={btn.primary("blue", "lg", "pill")}>
                Voir tous les articles
              </a>
            </div>
          </>
        );
      })()}
    </div>
  </Container>
</section>

      {/* ================= VIDEOS teaser ================= */}
      <section id="videos" className="relative overflow-hidden py-20 bg-white">
        <div className="pointer-events-none absolute top-10 left-0 w-72 h-72 rounded-full opacity-[0.06] bg-[var(--honey-green)]" />

        <Container>
          <div className="relative z-10">
           <SectionTitle
              badge="Vidéos"
              title="Madagascar en images"
              subtitle="Immersion réelle : nature, culture et expériences signature à travers nos vidéos."
            />

            <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
              {featuredVideo ? (
                <div className="lg:col-span-2 relative overflow-hidden rounded-3xl border border-[var(--honey-border)] bg-slate-950 shadow-2xl">
                  <div className="relative h-full min-h-[420px] overflow-hidden">
                    <Img
                      src={featuredVideo.thumbnail || "/media/placeholder.jpg"}
                      alt={featuredVideo.title}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute inset-0 grid place-items-center">
                      <a
                        href={featuredVideo.url || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="grid h-16 w-16 place-items-center rounded-full bg-[var(--honey-orange)] text-white shadow-2xl transition hover:opacity-95 hover:scale-110"
                        aria-label="Lire la vidéo"
                      >
                        <Play className="h-8 w-8 translate-x-[1px]" />
                      </a>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <div className="text-xs font-black text-white/80">À la une</div>
                      <div className="mt-1 text-2xl font-black">{featuredVideo.title}</div>
                      <div className="mt-2 text-sm font-semibold text-white/85 line-clamp-2">
                        {featuredVideo.description || "Plongez dans l’ambiance Honey Group."}
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}

              <div className="grid gap-6">
                {otherVideos.map((v, idx) => (
                  <div key={v.id} className={card.base}>
                    <div className={bar.top(idx % 2 === 0 ? "green" : "orange")} />
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Img
                        src={v.thumbnail || "/media/placeholder.jpg"}
                        alt={v.title}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                      <div className="absolute inset-0 grid place-items-center">
                        <a
                          href={v.url || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="grid h-12 w-12 place-items-center rounded-full bg-[var(--honey-orange)] text-white shadow-xl transition hover:opacity-95 hover:scale-110"
                          aria-label="Lire la vidéo"
                        >
                          <Play className="h-6 w-6 translate-x-[1px]" />
                        </a>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="text-sm font-black text-[var(--honey-blue)]">{v.title}</div>
                      <div className="mt-1 text-xs font-semibold text-[var(--honey-blue)]/70">
                        {v.platform || "Réseaux"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

      </div>
        </Container>
      </section>

      {/* ================= CTA FINAL ================= */}
      <section id="contact" className="relative overflow-hidden py-20 bg-white">
        <div className="pointer-events-none absolute -top-20 -left-20 w-72 h-72 rounded-full bg-[var(--honey-orange)] opacity-[0.06]" />

        <Container>
          <div className="relative z-10">
            <div className="rounded-3xl border border-[var(--honey-border)] bg-white p-10 text-center shadow-sm relative overflow-hidden">
              <div className="pointer-events-none absolute top-6 right-6 w-24 h-24 rounded-full bg-[var(--honey-yellow)] opacity-10" />
              <div className="pointer-events-none absolute bottom-6 left-6 w-20 h-20 rounded-full bg-[var(--honey-green)] opacity-10" />

              <h3 className="text-3xl font-black text-[var(--honey-blue)]">
                Prêt à créer votre voyage idéal ?
              </h3>
              <p className="mx-auto mt-3 max-w-2xl text-sm font-semibold text-[var(--honey-blue)]/70">
                Détente, aventure, culture — on construit un itinéraire sur mesure, simple et clair.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <a href="/contact" className={btn.primary("orange", "lg", "pill")}>
                  Demander un devis
                </a>
                <a
                  href="/circuits-destinations"
                  className={btn.outline("blue", "lg", "pill")}
                >
                  Voir les offres
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </div>
  );
}