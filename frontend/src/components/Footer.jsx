import React, { useMemo } from "react";
import { btn } from "../ui/buttons";

/* -------------------------------------------- */
/* Helpers */
/* -------------------------------------------- */

function isHomePath(pathname) {
  // adapte si tu as une base différente
  return pathname === "/" || pathname === "/home";
}

function makeHomeAnchor(pathname, anchor) {
  // Si on est déjà sur Home => ancre simple
  // Sinon => retour Home + ancre
  return isHomePath(pathname) ? `#${anchor}` : `/#${anchor}`;
}

const FooterNavLink = ({ href, children }) => (
  <a
    href={href}
    className="text-sm font-semibold text-slate-600 hover:text-[var(--honey-blue)] transition"
  >
    {children}
  </a>
);

const SocialIconButton = ({ href = "#", label, children }) => (
  <a
    href={href}
    aria-label={label}
    title={label}
    className="inline-flex items-center justify-center rounded-full border border-[var(--honey-border)] bg-white p-2 text-slate-700 shadow-sm hover:bg-slate-50"
  >
    {children}
  </a>
);

/* -------------------------------------------- */
/* Inline SVG icons (no lucide) */
/* -------------------------------------------- */

const IconInstagram = ({ className = "h-5 w-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Z"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M17.5 6.5h.01"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

const IconYouTube = ({ className = "h-5 w-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M21 12s0-3.4-.4-5a3 3 0 0 0-2.1-2.1C16.9 4.5 12 4.5 12 4.5s-4.9 0-6.5.4A3 3 0 0 0 3.4 7C3 8.6 3 12 3 12s0 3.4.4 5a3 3 0 0 0 2.1 2.1c1.6.4 6.5.4 6.5.4s4.9 0 6.5-.4a3 3 0 0 0 2.1-2.1c.4-1.6.4-5 .4-5Z"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path d="M10 9.5v5l5-2.5-5-2.5Z" fill="currentColor" />
  </svg>
);

const IconFacebook = ({ className = "h-5 w-5" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M14 8h2V5h-2c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h2.1l.9-3H13V9c0-.6.4-1 1-1Z" />
  </svg>
);

const IconTikTok = ({ className = "h-5 w-5" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M16 3c.6 2.8 2.3 4.8 5 5.1v3.2c-1.9.1-3.6-.5-5-1.6v6.8c0 3.6-2.6 6.4-6.5 6.5A6.5 6.5 0 0 1 3 15.5C3 11.9 5.6 9 9.5 9c.6 0 1.2.1 1.7.2v3.6c-.5-.2-1.1-.3-1.7-.3-1.9 0-3.2 1.3-3.2 3.1 0 1.9 1.3 3.2 3.1 3.2 1.7 0 3.1-1.2 3.1-3.6V3h3.5Z" />
  </svg>
);

const NavLink = ({ href, children }) => (
  <a
    href={href}
    className="
      text-sm font-semibold
      text-slate-600
      transition
      hover:text-[var(--honey-blue)]
    "
  >
    {children}
  </a>
);
/* -------------------------------------------- */
/* Footer */
/* -------------------------------------------- */

export default function Footer() {
  const pathname = typeof window !== "undefined" ? window.location.pathname : "/";

  

  
  const socials = useMemo(
    () => [
      
      { label: "YouTube", href: "https://www.youtube.com/@SamRob-l1z", Icon: IconYouTube },
      { label: "Facebook", href: "https://www.google.com/search?q=https://web.facebook.com/profile.php%3Fid%3D61554781021481", Icon: IconFacebook },
      { label: "TikTok", href: "https://www.tiktok.com/@honeygr7?lang=fr", Icon: IconTikTok },
      { label: "Instagram", href: "https://www.instagram.com/honey_group_mada/", Icon: IconInstagram },
    
    ],
    []
  );

  return (
    <footer id="footer" className="border-t border-[var(--honey-border)] bg-white">
      <div className="mx-auto w-full max-w-6xl px-5 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
             <a href="/" className="flex items-center gap-3 group">
      <div className="overflow-hidden rounded-2xl shadow-sm transition group-hover:scale-105 group-hover:shadow-md">
        <img
          src="/media/logo.jpg"
          alt="Honey Group"
          className="h-20 w-20 object-cover"      
        />
      </div>
              <div>
                <div className="text-base font-black text-slate-900">Honey Group</div>
                <div className="text-sm font-semibold text-slate-500">
                  Voyages sur mesure à Madagascar.
                </div>
              </div>
            </a>

            <p className="mt-4 max-w-xl text-sm font-medium leading-relaxed text-slate-600">
              Des voyages authentiques, conçus par des experts locaux, avec une approche responsable et humaine.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full bg-[color-mix(in_srgb,var(--honey-green)_14%,white)] px-3 py-1 text-xs font-extrabold text-[var(--honey-green)]">
                Tourisme responsable
              </span>
              <span className="rounded-full bg-[color-mix(in_srgb,var(--honey-blue)_12%,white)] px-3 py-1 text-xs font-extrabold text-[var(--honey-blue)]">
                Expertise locale
              </span>
              <span className="rounded-full bg-[color-mix(in_srgb,var(--honey-yellow)_30%,white)] px-3 py-1 text-xs font-extrabold text-slate-800">
                Expériences uniques
              </span>
            </div>
          </div>

          {/* Menu (pages) */}
          <div className="space-y-3">
            <div className="text-sm font-black text-slate-900">Pages</div>
            <div className="flex flex-col gap-2">
              {/* Nav */}
      <nav className="grid gap-x-8 gap-y-3">
        <NavLink href="/a-propos">À propos</NavLink>
        <NavLink href="/circuits-destinations">Circuits & Destinations</NavLink>
        <NavLink href="/excursions">Excursions</NavLink>
        <NavLink href="/signatures">Signatures</NavLink>
        <NavLink href="/blog">Blog</NavLink>
        
      </nav>
            </div>

           
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <div className="text-sm font-black text-slate-900">Contact</div>

            <div className="text-sm font-semibold text-slate-600">
              Email :{" "}
              <a
                className="font-black text-slate-900 hover:underline"
                href="mailto:honeygroup.mg17@gmail.com"
              >
                honeygroup.mg17@gmail.com
              </a>
            </div>

            {/* Socials: icons now, href later */}
            <div className="pt-2">
              <div className="text-xs font-black text-slate-500">Réseaux</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {socials.map(({ label, href, Icon }) => (
                  <SocialIconButton key={label} href={href} label={label}>
                    <Icon className="h-5 w-5" />
                  </SocialIconButton>
                ))}
              </div>

              {/* Optional: keep labels for accessibility / when you want */}
              <div className="mt-3 flex flex-wrap gap-2">
                {socials.map(({ label, href }) => (
                  <a
                    key={`${label}-txt`}
                    href={href}
                    className="text-xs font-extrabold text-slate-500 hover:text-[var(--honey-blue)]"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>

            <a
              href="/contact"
              className={["hidden md:inline-flex", btn.outline("blue","md","pill")].join(" ")}
            >
              Demander un devis
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-[var(--honey-border)] pt-6 text-xs font-semibold text-slate-500 md:flex-row md:items-center md:justify-between">
          <div>© {new Date().getFullYear()} Honey Group — Tous droits réservés.</div>
        <div className="flex gap-4">
          <NavLink
            to="/mentions-legales"
            className="hover:text-slate-800"
          >
            Mentions légales
          </NavLink>

          <NavLink
            to="/confidentialite"
            className="hover:text-slate-800"
          >
            Confidentialité
          </NavLink>
        </div>
        </div>
      </div>
    </footer>
  );
}