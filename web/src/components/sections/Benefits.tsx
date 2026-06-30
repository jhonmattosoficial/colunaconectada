"use client";

import { motion } from "framer-motion";
import { benefits } from "@/lib/content";
import { HorizontalScroll } from "@/components/ui/HorizontalScroll";
import { ReactNode } from "react";

const benefitIcons: ReactNode[] = [
  <svg key="0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h3l3-9 6 18 3-9h3" /></svg>,
  <svg key="1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><path d="M9 9h.01M15 9h.01" /></svg>,
  <svg key="2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"><path d="M13 2 4.5 12.5h6L11 22l8.5-10.5h-6L13 2Z" /></svg>,
  <svg key="3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>,
  <svg key="4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z" /></svg>,
  <svg key="5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"><path d="M3 17V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10" /><path d="M3 17h18" /><path d="M8 21h8" /><path d="M12 17v4" /><path d="m9 11 2 2 4-4" /></svg>,
];

// Visual stack per benefit. Layered CSS backgrounds give automatic fallback:
//   PNG (Higgsfield, if exists) → SVG (always present) → Tailwind gradient (always)
// To enhance with real photography: run scripts/generate-benefit-images.mjs
const benefitVisuals = [
  {
    gradient: "from-brand-blue/70 via-brand-blue-light/40 to-brand-lime/30",
    basePath: "/img/benefit-1",
    alt: "Pessoa em movimento fluido",
  },
  {
    gradient: "from-brand-blue-dark via-brand-blue/60 to-brand-blue-light/40",
    basePath: "/img/benefit-2",
    alt: "Sensação de leveza nos ombros",
  },
  {
    gradient: "from-brand-lime/40 via-brand-blue-light/50 to-brand-blue/70",
    basePath: "/img/benefit-3",
    alt: "Energia ao acordar",
  },
  {
    gradient: "from-brand-blue/70 via-brand-blue-dark to-brand-lime/30",
    basePath: "/img/benefit-4",
    alt: "Consciência corporal",
  },
  {
    gradient: "from-brand-blue-light/50 via-brand-lime/30 to-brand-blue/60",
    basePath: "/img/benefit-5",
    alt: "Alívio de dores",
  },
  {
    gradient: "from-brand-lime/40 via-brand-blue-light/60 to-brand-blue-dark",
    basePath: "/img/benefit-6",
    alt: "Qualidade de vida",
  },
];

export function Benefits() {
  return (
    <>
      {/* MOBILE/TABLET HEADER — normal block flow, no sticky, no blur */}
      <section className="lg:hidden bg-surface-muted pt-16 sm:pt-20 pb-2 sm:pb-4">
        <div className="container-x">
          <div className="max-w-md">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.18em] text-brand-blue bg-brand-blue-50 px-3 py-1.5 rounded-pill mb-5">
              Benefícios
            </span>
            <h2 className="font-display font-extrabold text-[clamp(1.9rem,2.4vw+1rem,2.85rem)] leading-[1.08] tracking-[-0.02em] mb-5 text-balance">
              {benefits.headline}
            </h2>
            <p className="text-ink-secondary text-base sm:text-lg leading-relaxed">
              {benefits.intro}
            </p>
          </div>
        </div>
      </section>

      <HorizontalScroll
        className="bg-surface-muted"
        ariaLabel="Benefícios do cuidado integrado"
        sticky={
          /* DESKTOP-ONLY sticky header (mobile uses the block above) */
          <div className="hidden lg:grid container-x h-full grid-cols-[1fr_2fr] items-center">
            <div className="pointer-events-auto relative max-w-md py-12 pr-10">
              {/* Solid panel — no blur, clean contained look */}
              <div
                aria-hidden="true"
                className="absolute -inset-x-10 -inset-y-8 bg-surface-muted rounded-3xl border border-line-subtle shadow-brand-md"
              />
              {/* Fade on right edge — visual cue that cards pass behind */}
              <div
                aria-hidden="true"
                className="absolute top-0 bottom-0 -right-10 w-24 bg-gradient-to-r from-surface-muted/60 to-transparent"
              />

              <div className="relative">
                <span className="inline-block text-xs font-bold uppercase tracking-[0.18em] text-brand-blue bg-brand-blue-50 px-3 py-1.5 rounded-pill mb-5">
                  Benefícios
                </span>
                <h2 className="font-display font-extrabold text-[clamp(1.9rem,2.4vw+1rem,2.85rem)] leading-[1.08] tracking-[-0.02em] mb-5 text-balance">
                  {benefits.headline}
                </h2>
                <p className="text-ink-secondary text-base sm:text-lg leading-relaxed max-w-[40ch]">
                  {benefits.intro}
                </p>
                <div className="flex items-center gap-3 mt-8 text-ink-tertiary text-xs uppercase tracking-[0.18em]">
                  <svg
                    width={16}
                    height={16}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="text-brand-lime animate-pulse"
                  >
                    <path d="M5 12h14" />
                    <path d="m13 6 6 6-6 6" />
                  </svg>
                  Role para descobrir
                </div>
              </div>
            </div>
            <div />
          </div>
        }
      >
        {/* Start spacer — pushes cards to start under the right column on desktop */}
        <div
          className="flex-shrink-0 hidden lg:block"
          style={{
            width:
              "calc((100vw - min(1200px, 90vw)) / 2 + min(1200px, 90vw) / 3)",
          }}
          aria-hidden="true"
        />

        {benefits.items.map((item, i) => (
          <BenefitCard
            key={i}
            index={i}
            text={item}
            icon={benefitIcons[i]}
            visual={benefitVisuals[i]}
          />
        ))}

        {/* End spacer — gives breathing room before pin releases */}
        <div className="flex-shrink-0 w-[12vw]" aria-hidden="true" />
      </HorizontalScroll>

      {/* Closing italic — outside pinned area, naturally vertical */}
      <section className="bg-surface-muted">
        <div className="container-x pb-24 sm:pb-32 max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg sm:text-xl text-ink-primary leading-relaxed font-display italic border-l-4 border-brand-lime pl-6"
          >
            {benefits.closing}
          </motion.p>
        </div>
      </section>
    </>
  );
}

function BenefitCard({
  index,
  text,
  icon,
  visual,
}: {
  index: number;
  text: string;
  icon: ReactNode;
  visual: { gradient: string; basePath: string; alt: string };
}) {
  return (
    <article
      className="relative flex-shrink-0 mx-3 sm:mx-4 w-[78vw] sm:w-[52vw] md:w-[40vw] lg:w-[28vw] max-w-[420px] h-[64vh] sm:h-[68vh] bg-white rounded-3xl shadow-brand-md border border-line-subtle overflow-hidden group"
      aria-label={visual.alt}
    >
      {/* Image area — top 45% of the card */}
      <div className="relative h-[45%] w-full overflow-hidden">
        {/* Gradient — bottom-most fallback */}
        <div
          aria-hidden="true"
          className={`absolute inset-0 bg-gradient-to-br ${visual.gradient}`}
        />
        {/* Camadas: JPG (Antigravity geradas) por cima → fallback SVG embaixo se faltar.
            Browser pula o JPG silenciosamente se 404 e mostra o SVG. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{
            backgroundImage: `url("${visual.basePath}.jpg"), url("${visual.basePath}.svg")`,
          }}
        />
        {/* Subtle grain */}
        <div
          aria-hidden="true"
          className="absolute inset-0 noise opacity-25 mix-blend-overlay pointer-events-none"
        />
        {/* Bottom gradient for legibility of badges */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/30 to-transparent"
        />

        {/* Number badge */}
        <span className="absolute top-4 right-4 font-display font-extrabold text-4xl text-white/90 drop-shadow-md">
          {String(index + 1).padStart(2, "0")}
        </span>
        {/* Icon badge */}
        <div className="absolute top-4 left-4 grid place-items-center w-12 h-12 rounded-2xl bg-white/95 text-brand-blue shadow-brand-sm backdrop-blur-sm">
          <div className="w-6 h-6">{icon}</div>
        </div>
      </div>

      {/* Text area — bottom 55% */}
      <div className="relative h-[55%] flex flex-col justify-between p-6 sm:p-7">
        <p className="font-display font-bold text-ink-primary text-2xl sm:text-[1.7rem] leading-[1.15] tracking-[-0.01em]">
          {text}
        </p>

        <div className="flex items-center gap-3 text-ink-tertiary text-xs uppercase tracking-[0.15em] pt-5 border-t border-line-subtle">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-lime" />
          Benefício {String(index + 1).padStart(2, "0")} / 06
        </div>
      </div>
    </article>
  );
}
