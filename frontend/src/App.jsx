import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MentionsLegales from "./pages/MentionsLegales";
import Confidentialite from "./pages/Confidentialite";
import Home from "./pages/Home.jsx";
import CircuitsDestinations from "./pages/CircuitsDestinations.jsx";
import Excursions from "./pages/Excursions.jsx";
import Signatures from "./pages/Signatures.jsx";
import Blog from "./pages/Blog.jsx";
import BlogPost from "./pages/BlogPost.jsx";
import Contact from "./pages/Contact.jsx";
import About from "./pages/About.jsx"; 

function NotFound() {
  return (
    <div className="min-h-screen grid place-items-center bg-white px-6">
      <div className="text-center">
        <div className="text-5xl font-black text-[var(--honey-blue)]">404</div>
        <div className="mt-2 text-sm font-semibold text-[var(--honey-blue)]/80">
          Page introuvable.
        </div>
        <a
          href="/"
          className="mt-6 inline-flex rounded-full bg-[var(--honey-orange)] px-7 py-3 text-sm font-extrabold text-white hover:opacity-95"
        >
          Retour accueil
        </a>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/circuits-destinations" element={<CircuitsDestinations />} />
      <Route path="/excursions" element={<Excursions />} />
      <Route path="/signatures" element={<Signatures />} />

      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogPost />} />

      <Route path="/contact" element={<Contact />} />
      <Route path="/a-propos" element={<About />} />

      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route path="*" element={<NotFound />} />

      <Route path="/mentions-legales" element={<MentionsLegales />} />
<Route path="/confidentialite" element={<Confidentialite />} />
    </Routes>
  );
}