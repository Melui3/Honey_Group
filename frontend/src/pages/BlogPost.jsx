import React, { useMemo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import PageHero from "../components/PageHero";
import { btn } from "../ui/buttons";
import { apiList} from "../lib/api";

/* -------------------------------------------- */
/* Layout helpers */
/* -------------------------------------------- */

const Container = ({ children }) => (
  <div className="mx-auto w-full max-w-3xl px-5">{children}</div>
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

const Pill = ({ children }) => (
  <span className="inline-flex rounded-full bg-[color-mix(in_srgb,var(--honey-yellow)_35%,white)] px-3 py-1 text-xs font-black text-[var(--honey-blue)]">
    {children}
  </span>
);

const MetaDot = () => <span className="text-[var(--honey-blue)]/25">•</span>;

/* -------------------------------------------- */
/* Content renderer (string | array | blocks) */
/* Supports: p, h2, h3, quote, ul/list */
/* -------------------------------------------- */

function renderContent(content) {
  if (!content) return null;

  if (typeof content === "string") {
    return <p className="text-base font-semibold leading-relaxed">{content}</p>;
  }

  if (Array.isArray(content)) {
    return content.map((block, i) => {
      if (typeof block === "string") {
        return (
          <p key={i} className="text-base font-semibold leading-relaxed">
            {block}
          </p>
        );
      }

      if (block && typeof block === "object") {
        const type = block.type || "p";
        const text = block.text ?? "";

        if (type === "h2") {
          return (
            <h2
              key={i}
              className="mt-10 text-2xl font-black tracking-tight text-[var(--honey-blue)]"
            >
              {text}
            </h2>
          );
        }

        if (type === "h3") {
          return (
            <h3 key={i} className="mt-7 text-xl font-black text-[var(--honey-blue)]">
              {text}
            </h3>
          );
        }

        if (type === "quote") {
          return (
            <blockquote
              key={i}
              className="rounded-3xl border border-[var(--honey-border)] bg-[color-mix(in_srgb,var(--honey-blue)_3%,white)] p-6 text-[var(--honey-blue)]/85 shadow-sm"
            >
              <p className="text-base font-semibold leading-relaxed">“{text}”</p>
            </blockquote>
          );
        }

        if ((type === "ul" || type === "list") && Array.isArray(block.items)) {
          return (
            <ul key={i} className="ml-5 list-disc space-y-2 text-[var(--honey-blue)]/85">
              {block.items.map((it, idx) => (
                <li key={idx} className="text-base font-semibold leading-relaxed">
                  {it}
                </li>
              ))}
            </ul>
          );
        }

        return (
          <p key={i} className="text-base font-semibold leading-relaxed">
            {text}
          </p>
        );
      }

      return null;
    });
  }

  if (typeof content === "object") {
    const text = content.text ?? "";
    return <p className="text-base font-semibold leading-relaxed">{text}</p>;
  }

  return null;
}

/* -------------------------------------------- */
/* Page */
/* -------------------------------------------- */

export default function BlogPost() {
  const { slug } = useParams();
const [posts, setPosts] = useState([]);

useEffect(() => {
  apiList("/api/blog-posts/").then(setPosts);
}, []);

const post = useMemo(() => posts.find((p) => p.slug === slug) || null, [posts, slug]);

const index = useMemo(() => {
  if (!post) return -1;
  return posts.findIndex((p) => p.slug === post.slug);
}, [posts, post]);

  const prevPost = useMemo(() => (index > 0 ? posts[index - 1] : null), [posts, index]);
  const nextPost = useMemo(
    () => (index >= 0 && index < posts.length - 1 ? posts[index + 1] : null),
    [posts, index]
  );

  const related = useMemo(() => {
    if (!post) return [];
    const sameCategory = posts
      .filter((p) => p.slug !== post.slug)
      .filter((p) => (post.category ? p.category === post.category : true));

    const fallback = posts.filter((p) => p.slug !== post.slug);
    return (sameCategory.length ? sameCategory : fallback).slice(0, 3);
  }, [posts, post]);

  if (!post) {
    return (
      <div className="min-h-screen bg-white">
        <Layout>
          <PageHero
            title="Article introuvable"
            subtitle="Ce lien ne correspond à aucun article."
            primaryCta={{ href: "/blog", label: "Retour au blog" }}
            secondaryCta={{ href: "/", label: "Retour accueil" }}
          />
        </Layout>
      </div>
    );
  }

  const gallery = Array.isArray(post.images) ? post.images.filter(Boolean) : [];

  return (
    <div className="min-h-screen bg-white">
      <Layout>
        <PageHero
          title={post.title}
          subtitle={post.excerpt}
          primaryCta={{ href: "/contact", label: "Demander un devis" }}
          secondaryCta={{ href: "/blog", label: "Retour blog" }}
        />

        {/* Article */}
        <section className="py-14">
          <Container>
            <article className="overflow-hidden rounded-3xl border border-[var(--honey-border)] bg-white shadow-sm">
              {/* Cover */}
              <div className="relative aspect-[16/9] bg-slate-50">
                <Img src={post.cover} alt={post.title} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

                <div className="absolute left-6 top-6 flex flex-wrap items-center gap-2">
                  <Pill>{post.category || "Blog"}</Pill>
                  {post.readTime ? <span className="rounded-full bg-white/85 px-3 py-1 text-xs font-black text-[var(--honey-blue)]">{post.readTime}</span> : null}
                </div>
              </div>

              {/* Body */}
              <div className="p-8">
                {/* Meta */}
                <div className="flex flex-wrap items-center gap-2 text-xs font-black text-[var(--honey-blue)]/70">
                  {post.date ? <span>{post.date}</span> : null}
                  {post.date && post.author ? <MetaDot /> : null}
                  {post.author ? <span>{post.author}</span> : null}
                </div>

                <h1 className="mt-3 text-3xl font-black tracking-tight text-[var(--honey-blue)]">
                  {post.title}
                </h1>

                {/* Gallery */}
                {gallery.length ? (
                  <div className="mt-7">
                    <div className="mb-3 text-xs font-black text-[var(--honey-blue)]/70">
                      En images
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {gallery.slice(0, 9).map((src, i) => (
                        <div
                          key={`${src}-${i}`}
                          className="group overflow-hidden rounded-2xl border border-[var(--honey-border)] bg-slate-50"
                        >
                          <Img
                            src={src}
                            alt={`${post.title} - image ${i + 1}`}
                            className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}

                {/* Content */}
                <div className="mt-8 space-y-4 text-[var(--honey-blue)]/80">
                  {post.content ? (
                    renderContent(post.content)
                  ) : (
                    <>
                      <p className="text-base font-semibold leading-relaxed">
                        Contenu à venir : ici on mettra le vrai texte (guide, conseils, itinéraire, saisons, etc).
                      </p>
                      <p className="text-base font-semibold leading-relaxed">
                        Tu gardes la structure, tu colles les textes PDF / fiches.
                      </p>
                    </>
                  )}
                </div>

                {/* CTA */}
                <div className="mt-10 grid gap-3 sm:grid-cols-2">
                  <a href="/contact" className={btn.primary("orange", "block", "pill")}>
                    Parler à un conseiller
                  </a>
                  <a
                    href="/circuits-destinations?tab=circuits"
                    className={btn.outline("blue", "block", "pill")}
                  >
                    Voir les circuits
                  </a>
                </div>

                {/* Prev / Next */}
                <div className="mt-10 grid gap-3 sm:grid-cols-2">
                  {prevPost ? (
                    <a
                      href={`/blog/${prevPost.slug}`}
                      className="rounded-3xl border border-[var(--honey-border)] bg-white p-5 shadow-sm transition hover:bg-slate-50 hover:-translate-y-0.5"
                    >
                      <div className="text-xs font-black text-[var(--honey-blue)]/70">
                        Article précédent
                      </div>
                      <div className="mt-1 text-sm font-black text-[var(--honey-blue)] line-clamp-2">
                        {prevPost.title}
                      </div>
                    </a>
                  ) : (
                    <div className="rounded-3xl border border-[var(--honey-border)] bg-white p-5 text-xs font-black text-[var(--honey-blue)]/60">
                      Pas d’article précédent
                    </div>
                  )}

                  {nextPost ? (
                    <a
                      href={`/blog/${nextPost.slug}`}
                      className="rounded-3xl border border-[var(--honey-border)] bg-white p-5 shadow-sm transition hover:bg-slate-50 hover:-translate-y-0.5"
                    >
                      <div className="text-xs font-black text-[var(--honey-blue)]/70">
                        Article suivant
                      </div>
                      <div className="mt-1 text-sm font-black text-[var(--honey-blue)] line-clamp-2">
                        {nextPost.title}
                      </div>
                    </a>
                  ) : (
                    <div className="rounded-3xl border border-[var(--honey-border)] bg-white p-5 text-xs font-black text-[var(--honey-blue)]/60">
                      Pas d’article suivant
                    </div>
                  )}
                </div>

            
              </div>
            </article>
          </Container>
        </section>
      </Layout>
    </div>
  );
}