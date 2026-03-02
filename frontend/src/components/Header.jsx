import React from "react";
import { btn } from "../ui/buttons";

const NavLink = ({ href, children }) => (
  <a
    href={href}
    className="
      relative text-sm font-extrabold tracking-tight
      text-[var(--honey-blue)]
      transition
      hover:text-[var(--honey-orange)]
      after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0
      after:bg-[var(--honey-orange)]
      after:transition-all after:duration-300
      hover:after:w-full
    "
  >
    {children}
  </a>
);

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--honey-border)] bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-4">

       <a href="/" className="flex items-center gap-3 group">
      <div className="overflow-hidden rounded-2xl shadow-sm transition group-hover:scale-105 group-hover:shadow-md">
        <img
          src="/media/logo.jpg"
          alt="Honey Group"
          className="h-11 w-11 object-cover"
        />
      </div>

          <div className="leading-tight">
            <div className="text-sm font-black text-[var(--honey-blue)]">
              Honey Group
            </div>
            <div className="text-xs font-semibold text-slate-500">
              Your destination, our Expertise.
            </div>
          </div>
        </a>

        {/* Nav */}
        <nav className="hidden items-center gap-6 md:flex">
          <NavLink href="/a-propos">À propos</NavLink>
          <NavLink href="/circuits-destinations">Circuits & Destinations</NavLink>
          <NavLink href="/excursions">Excursions</NavLink>
          <NavLink href="/signatures">Signatures</NavLink>
          <NavLink href="/blog">Blog</NavLink>
          
        </nav>

        {/* CTA Buttons */}
        <div className="flex items-center gap-3">
          <a href="/contact" className={btn.primary("orange","md","pill")}>
            Demander un devis
          </a>
        </div>
      </div>
    </header>
  );
}