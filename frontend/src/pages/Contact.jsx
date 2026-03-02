import React, { useState } from "react";
import Layout from "../components/Layout";
import PageHero from "../components/PageHero";
import { btn } from "../ui/buttons";
import { useEffect } from "react";
import {
  Mail,
  Phone,
  Clock,
  ShieldCheck,
  MapPin,
  ArrowRight,
  MessageCircle,
} from "lucide-react";

const Container = ({ children }) => (
  <div className="mx-auto w-full max-w-7xl px-5">{children}</div>
);

const Field = ({ label, children, hint }) => (
  <div>
    <div className="flex items-end justify-between gap-3">
      <label className="text-sm font-extrabold text-[var(--honey-blue)]">
        {label}
      </label>
      {hint ? (
        <span className="text-xs font-bold text-[var(--honey-blue)]/60">
          {hint}
        </span>
      ) : null}
    </div>
    <div className="mt-2">{children}</div>
  </div>
);

const InfoCard = ({ Icon, title, text, action }) => (
  <div className="rounded-3xl border border-[var(--honey-border)] bg-white p-6 shadow-sm">
    <div className="flex items-start gap-4">
      <div className="grid h-12 w-12 place-items-center rounded-2xl border border-[var(--honey-border)] bg-white shadow-sm">
        <Icon className="h-6 w-6 text-[var(--honey-green)]" />
      </div>
      <div className="min-w-0">
        <div className="text-sm font-black text-[var(--honey-blue)]">{title}</div>
        <div className="mt-1 text-sm font-semibold text-[var(--honey-blue)]/75 leading-relaxed">
          {text}
        </div>
        {action ? <div className="mt-4">{action}</div> : null}
      </div>
    </div>
  </div>
);

export default function Contact() {
  const [status, setStatus] = useState("idle");

  const onSubmit = (e) => {
    e.preventDefault();
    setStatus("sent");
  };

  const [travelType, setTravelType] = useState("sur-mesure");

useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const type = params.get("type");
  if (type) {
    setTravelType(type);
  }
}, []);

  return (
    <div className="min-h-screen bg-white">
      <Layout>

      <PageHero
        title="Contact & devis"
        subtitle="Explique-nous ce que tu veux : on te répond avec un plan clair, sur mesure, et réaliste."
        
      />

      {/* Quick trust / steps */}
      <section className="relative overflow-hidden bg-[color-mix(in_srgb,black_2%,white)] py-10">
        <div className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full bg-[var(--honey-yellow)] opacity-[0.10]" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-[var(--honey-green)] opacity-[0.08]" />

        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "1. Tu décris ton voyage",
                text: "Dates, durée, budget, style. Simple et direct.",
                Icon: MessageCircle,
              },
              {
                title: "2. On te répond vite",
                text: "On clarifie 2-3 points et on te propose une première base.",
                Icon: Clock,
              },
              {
                title: "3. On ajuste ensemble",
                text: "Itinéraire, confort, rythme, activités : tout se module.",
                Icon: ShieldCheck,
              },
            ].map(({ title, text, Icon }) => (
              <div
                key={title}
                className="rounded-3xl border border-[var(--honey-border)] bg-white p-6 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl border border-[var(--honey-border)] bg-white shadow-sm">
                    <Icon className="h-6 w-6 text-[var(--honey-orange)]" />
                  </div>
                  <div>
                    <div className="text-sm font-black text-[var(--honey-blue)]">{title}</div>
                    <div className="mt-1 text-sm font-semibold text-[var(--honey-blue)]/75">
                      {text}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Main */}
      <section className="py-14" id="form">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-start">
            {/* FORM */}
            <div className="rounded-3xl border border-[var(--honey-border)] bg-white p-8 shadow-sm">
              <div className="text-xs font-black text-[var(--honey-blue)]/70">Demande</div>
              <h2 className="mt-2 text-2xl font-black text-[var(--honey-blue)]">
                Demander un devis
              </h2>
              <p className="mt-2 text-sm font-semibold text-[var(--honey-blue)]/75">
                Plus tu es précis, plus on te fait un itinéraire propre. (Front-only pour l’instant.)
              </p>

              <form onSubmit={onSubmit} className="mt-8 grid gap-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="Nom" hint="Obligatoire">
                    <input
                      required
                      className="w-full rounded-2xl border border-[var(--honey-border)] bg-white px-4 py-3 text-sm font-semibold outline-none focus:ring-4 focus:ring-[color-mix(in_srgb,var(--honey-blue)_12%,transparent)]"
                      placeholder="Votre nom"
                    />
                  </Field>

                  <Field label="Email" hint="Obligatoire">
                    <input
                      required
                      type="email"
                      className="w-full rounded-2xl border border-[var(--honey-border)] bg-white px-4 py-3 text-sm font-semibold outline-none focus:ring-4 focus:ring-[color-mix(in_srgb,var(--honey-blue)_12%,transparent)]"
                      placeholder="vous@email.com"
                    />
                  </Field>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="Téléphone" hint="Optionnel">
                    <input
                      className="w-full rounded-2xl border border-[var(--honey-border)] bg-white px-4 py-3 text-sm font-semibold outline-none focus:ring-4 focus:ring-[color-mix(in_srgb,var(--honey-blue)_12%,transparent)]"
                      placeholder="+33 …"
                    />
                  </Field>

                  <Field label="Type de voyage">
                    <select
                      className="w-full rounded-2xl border border-[var(--honey-border)] bg-white px-4 py-3 text-sm font-semibold outline-none focus:ring-4 focus:ring-[color-mix(in_srgb,var(--honey-blue)_12%,transparent)]"
                      value={travelType}
                      onChange={(e) => setTravelType(e.target.value)}
                    >
                      <option value="sur-mesure">Sur mesure</option>
                      <option value="circuit">Circuit organisé</option>
                      <option value="excursion">Excursion</option>
                      <option value="signature">Expérience Signature</option>
                    </select>
                  </Field>
                </div>

                <div className="grid gap-5 md:grid-cols-3">
                  <Field label="Dates" hint="Ex: août 2026">
                    <input
                      className="w-full rounded-2xl border border-[var(--honey-border)] bg-white px-4 py-3 text-sm font-semibold outline-none focus:ring-4 focus:ring-[color-mix(in_srgb,var(--honey-blue)_12%,transparent)]"
                      placeholder="Quand ?"
                    />
                  </Field>
                  <Field label="Durée" hint="Ex: 10 jours">
                    <input
                      className="w-full rounded-2xl border border-[var(--honey-border)] bg-white px-4 py-3 text-sm font-semibold outline-none focus:ring-4 focus:ring-[color-mix(in_srgb,var(--honey-blue)_12%,transparent)]"
                      placeholder="Combien de temps ?"
                    />
                  </Field>
                  <Field label="Budget" hint="Ex: 1200€/pers">
                    <input
                      className="w-full rounded-2xl border border-[var(--honey-border)] bg-white px-4 py-3 text-sm font-semibold outline-none focus:ring-4 focus:ring-[color-mix(in_srgb,var(--honey-blue)_12%,transparent)]"
                      placeholder="Budget approx."
                    />
                  </Field>
                </div>

                <Field
                  label="Message"
                  hint="Obligatoire"
                >
                  <textarea
                    required
                    rows={7}
                    className="w-full rounded-2xl border border-[var(--honey-border)] bg-white px-4 py-3 text-sm font-semibold outline-none focus:ring-4 focus:ring-[color-mix(in_srgb,var(--honey-blue)_12%,transparent)]"
                    placeholder="Envies, confort, rythme, régions, activités… Dis-nous ce que tu veux vraiment."
                  />
                </Field>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="submit"
                    className={[btn.primary("orange", "md", "pill"), "inline-flex items-center gap-2"].join(" ")}
                  >
                    Envoyer la demande <ArrowRight className="h-5 w-5" />
                  </button>

                  <div className="text-xs font-semibold text-[var(--honey-blue)]/60">
                    Envoi réel plus tard (Django).
                  </div>
                </div>

                {status === "sent" ? (
                  <div className="rounded-2xl bg-[color-mix(in_srgb,var(--honey-green)_12%,white)] px-5 py-4 text-sm font-extrabold text-[var(--honey-green)]">
                    Demande envoyée (placeholder). On branchera Django ensuite.
                  </div>
                ) : null}
              </form>
            </div>

            {/* SIDE */}
            <div className="grid gap-6">
              <InfoCard
                Icon={Mail}
                title="Email"
                text="Réponse rapide et claire."
                action={
                  <a
                    href="mailto:honeygroup.mg17@gmail.com"
                    className={[btn.outline("blue", "md", "pill"), "inline-flex items-center gap-2"].join(" ")}
                  >
                    honeygroup.mg17@gmail.com <ArrowRight className="h-5 w-5" />
                  </a>
                }
              />

              <InfoCard
                Icon={Phone}
                title="Téléphone"
                text="Si tu veux aller vite, laisse ton numéro dans le formulaire."
              />

              <InfoCard
                Icon={Clock}
                title="Délais"
                text="On te renvoie une première base d’itinéraire + questions utiles."
              />

              <InfoCard
                Icon={MapPin}
                title="Voyages à Madagascar"
                text="Circuits, destinations, excursions et signatures — tout est modulable."
                action={
                  <a
                    href="/circuits-destinations"
                    className={[btn.primary("blue", "md", "pill"), "inline-flex items-center gap-2"].join(" ")}
                  >
                    Voir les offres <ArrowRight className="h-5 w-5" />
                  </a>
                }
              />

              {/* Big reassurance block */}
              <div className="rounded-3xl bg-[var(--honey-blue)] p-8 text-white shadow-sm">
                <div className="text-xs font-black text-white/80">Promesse</div>
                <div className="mt-2 text-2xl font-black">Pas de blabla.</div>
                <div className="mt-3 text-sm font-semibold text-white/90 leading-relaxed">
                  Un plan clair, un itinéraire logique, et des ajustements selon ton budget.
                  Tu sais où tu vas, et pourquoi.
                </div>

                <a
                  href="#form"
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-[var(--honey-orange)] px-7 py-3 text-sm font-extrabold text-white hover:opacity-95"
                >
                  Je demande mon devis <ArrowRight className="h-5 w-5" />
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