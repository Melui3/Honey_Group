import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const Home = lazy(() => import("./pages/Home.jsx"));
const CircuitsDestinations = lazy(() => import("./pages/CircuitsDestinations.jsx"));
const Excursions = lazy(() => import("./pages/Excursions.jsx"));
const Signatures = lazy(() => import("./pages/Signatures.jsx"));
const Blog = lazy(() => import("./pages/Blog.jsx"));
const BlogPost = lazy(() => import("./pages/BlogPost.jsx"));
const Contact = lazy(() => import("./pages/Contact.jsx"));
const About = lazy(() => import("./pages/About.jsx"));
const MentionsLegales = lazy(() => import("./pages/MentionsLegales"));
const Confidentialite = lazy(() => import("./pages/Confidentialite"));

function PageLoader() {
  return (
    <div className="min-h-screen grid place-items-center bg-white">
      <div className="h-8 w-8 rounded-full border-4 border-[var(--honey-blue)] border-t-transparent animate-spin" />
    </div>
  );
}

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
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/circuits-destinations" element={<CircuitsDestinations />} />
        <Route path="/excursions" element={<Excursions />} />
        <Route path="/signatures" element={<Signatures />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/a-propos" element={<About />} />
        <Route path="/mentions-legales" element={<MentionsLegales />} />
        <Route path="/confidentialite" element={<Confidentialite />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}