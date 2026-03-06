import Layout from "../components/Layout";
import PageHero from "../components/PageHero";

export default function MentionsLegales() {
  return (
    <div className="min-h-screen bg-white">
      <Layout>
        <PageHero
          title="Mentions légales"
          subtitle="Informations légales concernant le site Honey Group."
        />

        <section className="py-14">
          <div className="mx-auto max-w-3xl px-5 space-y-6 text-[var(--honey-blue)]/90 font-semibold">

            <h2 className="text-xl font-black text-[var(--honey-blue)]">
              Éditeur du site
            </h2>

            <p>
              Honey Group<br/>
              Tour opérateur spécialisé dans l'organisation de circuits et
              expériences à Madagascar.
            </p>

            <h2 className="text-xl font-black text-[var(--honey-blue)]">
              Hébergement
            </h2>

            <p>
              Le site est hébergé par un prestataire cloud sécurisé.
              Les infrastructures peuvent évoluer selon les besoins techniques
              et la mise en production du projet.
            </p>

            <h2 className="text-xl font-black text-[var(--honey-blue)]">
              Propriété intellectuelle
            </h2>

            <p>
              Les contenus du site (textes, images, éléments graphiques)
              sont protégés par le droit d'auteur. Toute reproduction ou
              utilisation sans autorisation est interdite.
            </p>

            <h2 className="text-xl font-black text-[var(--honey-blue)]">
              Contact
            </h2>

            <p>
              Pour toute question relative au site ou aux services proposés,
              vous pouvez utiliser la page <a href="/contact" className="text-[var(--honey-blue)] underline">contact</a>.
            </p>

          </div>
        </section>
      </Layout>
    </div>
  );
}