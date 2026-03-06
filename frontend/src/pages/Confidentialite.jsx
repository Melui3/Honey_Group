import Layout from "../components/Layout";
import PageHero from "../components/PageHero";

export default function Confidentialite() {
  return (
    <div className="min-h-screen bg-white">
      <Layout>
        <PageHero
          title="Politique de confidentialité"
          subtitle="Protection et utilisation des données personnelles."
        />

        <section className="py-14">
          <div className="mx-auto max-w-3xl px-5 space-y-6 text-[var(--honey-blue)]/90 font-semibold">

            <h2 className="text-xl font-black text-[var(--honey-blue)]">
              Données collectées
            </h2>

            <p>
              Les données transmises via les formulaires de contact
              sont utilisées uniquement pour répondre aux demandes
              des utilisateurs et organiser les échanges liés aux services.
            </p>

            <h2 className="text-xl font-black text-[var(--honey-blue)]">
              Utilisation des données
            </h2>

            <p>
              Les informations ne sont ni vendues ni transmises à des tiers
              sans consentement explicite.
            </p>

            <h2 className="text-xl font-black text-[var(--honey-blue)]">
              Durée de conservation
            </h2>

            <p>
              Les données sont conservées uniquement le temps nécessaire
              au traitement des demandes et à la relation commerciale.
            </p>

            <h2 className="text-xl font-black text-[var(--honey-blue)]">
              Droits des utilisateurs
            </h2>

            <p>
              Conformément au RGPD, vous pouvez demander l’accès,
              la modification ou la suppression de vos données.
            </p>

            <p>
              Pour exercer vos droits, vous pouvez utiliser la page <a href="/contact" className="text-[var(--honey-blue)] underline">contact</a>.
            </p>

          </div>
        </section>
      </Layout>
    </div>
  );
}