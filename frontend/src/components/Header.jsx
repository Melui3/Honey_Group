import React, { useState } from "react";
import { btn } from "../ui/buttons";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "/a-propos", label: "À propos" },
  { href: "/circuits-destinations", label: "Circuits & Destinations" },
  { href: "/excursions", label: "Excursions" },
  { href: "/signatures", label: "Signatures" },
  { href: "/blog", label: "Blog" },
];

const NavLink = ({ href, children, onClick }) => (
  <a
    href={href}
    onClick={onClick}
    className="
      relative text-sm font-extrabold tracking-tight
      text-[var(--honey-blue)]
      transition
      hover:text-[var(--honey-orange)]
      after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0
      after:bg-[var(--honey-orange)]
      after:transition-all after:duration-300
      hover:after:w-full
      focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--honey-orange)]
    "
  >
    {children}
  </a>
);

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--honey-border)] bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-4">

        <a href="/" className="flex items-center gap-3 group">
          <div className="overflow-hidden rounded-2xl shadow-sm transition group-hover:scale-105 group-hover:shadow-md">
            <img
              src="/media/logo.webp"
              alt="Honey Group"
              className="h-11 w-11 object-cover"
            />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-black text-[var(--honey-blue)]">
              Honey Group
            </div>
            <div className="text-xs font-semibold text-slate-500">
              Voyages sur mesure à Madagascar
            </div>
          </div>
        </a>

        {/* Nav desktop */}
        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map(({ href, label }) => (
            <NavLink key={href} href={href}>{label}</NavLink>
          ))}
        </nav>

        {/* CTA + burger */}
        <div className="flex items-center gap-3">
          <a href="/contact" className={["hidden sm:inline-flex", btn.primary("orange","md","pill")].join(" ")}>
            Demander un devis
          </a>
          <button
            type="button"
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="inline-flex items-center justify-center rounded-xl border border-[var(--honey-border)] p-2 text-[var(--honey-blue)] transition hover:bg-slate-50 md:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-[var(--honey-border)] bg-white px-5 pb-5 pt-4 md:hidden">
          <nav className="flex flex-col gap-4">
            {NAV_LINKS.map(({ href, label }) => (
              <NavLink key={href} href={href} onClick={() => setMenuOpen(false)}>
                {label}
              </NavLink>
            ))}
            <a
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className={["mt-2 w-full justify-center", btn.primary("orange","md","pill")].join(" ")}
            >
              Demander un devis
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}