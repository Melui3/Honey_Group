import React from "react";
import {btn} from "../ui/buttons";

const Container = ({ children }) => (
  <div className="mx-auto w-full max-w-7xl px-5">{children}</div>
);

export default function PageHero({
  title,
  subtitle,
  primaryCta, // { href, label }
  secondaryCta, // { href, label }
}) {
  return (
    <section className="relative overflow-hidden py-20 md:py-24 bg-[linear-gradient(135deg,var(--honey-blue)_0%,var(--honey-green)_100%)]">
      <div className="absolute top-10 left-10 h-32 w-32 rounded-full bg-[var(--honey-yellow)] opacity-10" />
      <div className="absolute bottom-10 right-10 h-40 w-40 rounded-full bg-[var(--honey-orange)] opacity-10" />

      <Container>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl font-black tracking-tight md:text-5xl">{title}</h1>
          {subtitle ? (
            <p className="mx-auto mt-5 max-w-3xl text-lg font-semibold text-white/90 md:text-xl">
              {subtitle}
            </p>
          ) : null}

          {(primaryCta || secondaryCta) ? (
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {primaryCta ? (
                <a
                  href={primaryCta.href}
                  className={btn.primary("orange","md","pill")}
                >
                  {primaryCta.label}
                </a>
              ) : null}

              {secondaryCta ? (
                <a
                  href={secondaryCta.href}
                  className={btn.outline("blue","md","pill")}
                >
                  {secondaryCta.label}
                </a>
              ) : null}
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}