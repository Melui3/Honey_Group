import { Helmet } from "react-helmet-async";

const SITE_URL = import.meta.env.VITE_SITE_URL || "https://honey-group.mg";
const DEFAULT_IMAGE = `${SITE_URL}/media/og-image.jpg`;

const JSONLD_ORGANIZATION = {
  "@context": "https://schema.org",
  "@type": "TouristInformationCenter",
  name: "Honey Group",
  description:
    "Agence de tourisme à Madagascar. Circuits, excursions et expériences signatures sur mesure, conçus par des experts locaux.",
  url: SITE_URL,
  logo: `${SITE_URL}/media/logo.jpg`,
  email: "honeygroup.mg17@gmail.com",
  telephone: "+261322271493",
  address: {
    "@type": "PostalAddress",
    addressCountry: "MG",
  },
  sameAs: [
    "https://www.youtube.com/@SamRob-l1z",
    "https://web.facebook.com/profile.php?id=61554781021481",
    "https://www.tiktok.com/@honeygr7",
    "https://www.instagram.com/honey_group_mada/",
  ],
};

/**
 * Composant SEO — à placer en tête de chaque page.
 *
 * @param {string}  title       Titre de la page (sans " — Honey Group")
 * @param {string}  description Meta description (~155 caractères)
 * @param {string}  path        Chemin URL ("/a-propos", "/blog/mon-article"…)
 * @param {string}  ogImage     URL absolue de l'image Open Graph (optionnel)
 * @param {boolean} noindex     Passer true pour noindex (ex: pages légales)
 * @param {object}  jsonLd      Données structurées JSON-LD custom (optionnel)
 */
export default function Seo({
  title,
  description,
  path = "",
  ogImage,
  noindex = false,
  jsonLd,
}) {
  const fullTitle = title
    ? `${title} — Honey Group`
    : "Honey Group — Voyages sur mesure à Madagascar";

  const metaDesc =
    description ||
    "Honey Group, agence de tourisme à Madagascar. Circuits, excursions, destinations et expériences signatures conçus par des experts locaux. Voyages authentiques et responsables.";

  const canonical = `${SITE_URL}${path}`;
  const image = ogImage || DEFAULT_IMAGE;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDesc} />
      <link rel="canonical" href={canonical} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Honey Group" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDesc} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="fr_FR" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDesc} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLd || JSONLD_ORGANIZATION)}
      </script>
    </Helmet>
  );
}
