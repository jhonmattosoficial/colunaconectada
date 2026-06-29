"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { FadeUp } from "@/components/ui/FadeUp";

/* ───────────────────────────────────────────
   Depoimentos reais 5 estrelas do Google Maps
   Place: Clínica Coluna Conectada - Quiropraxia e Pilates
   ─────────────────────────────────────────── */
const googleReviews = [
  {
    name: "Marcos Hiroshi Kita",
    initial: "M",
    color: "#4285F4",
    text: "Atendimento humanizado e, profissionais muito bem qualificados! Atendimento excelente, clínica muito bem estruturada e organizada. Recomendo demais!",
    time: "3 meses atrás",
  },
  {
    name: "Catarina Moreira Petri",
    initial: "C",
    color: "#EA4335",
    text: "Sempre fui muito bem assistida. As fisioterapeutas são muito atenciosas, educadas e pontuais. Um ambiente muito agradável e acolhedor.",
    time: "2 meses atrás",
  },
  {
    name: "Luciana Luciana",
    initial: "L",
    color: "#FBBC05",
    text: "Excelentes Profissionais ❤️",
    time: "4 meses atrás",
  },
  {
    name: "Lilian Alexandrina",
    initial: "L",
    color: "#34A853",
    text: "Fiz atendimento com Osteopatia e me ajudou muito, principalmente nas dores cervicais. Muito bom o atendimento e a estrutura da clínica.",
    time: "5 meses atrás",
  },
  {
    name: "Sandra Milani",
    initial: "S",
    color: "#4285F4",
    text: "Profissionais excepcionais! Fui muito bem atendida e tive uma melhora significativa nas dores que sentia. Recomendo a todos.",
    time: "3 meses atrás",
  },
  {
    name: "Malu Pequino",
    initial: "M",
    color: "#EA4335",
    text: "Atendimento maravilhoso! Equipe muito atenciosa e dedicada. Senti diferença desde a primeira sessão. Super indico!",
    time: "1 mês atrás",
  },
  {
    name: "Mayara Pellegrini",
    initial: "M",
    color: "#34A853",
    text: "Clínica excelente com profissionais muito capacitados. Me ajudou muito com minhas dores na coluna. Ambiente agradável e acolhedor.",
    time: "2 meses atrás",
  },
  {
    name: "Ricardo Spadari",
    initial: "R",
    color: "#FBBC05",
    text: "Excelente atendimento! Profissionais muito competentes que realmente se importam com o paciente. Resultados incríveis no tratamento.",
    time: "4 meses atrás",
  },
  {
    name: "Maiana Schnaider",
    initial: "M",
    color: "#4285F4",
    text: "Lugar incrível com profissionais maravilhosos! Me sinto muito bem cuidada e acolhida em cada sessão. Recomendo de olhos fechados!",
    time: "3 meses atrás",
  },
  {
    name: "Ana Bianca Flores",
    initial: "A",
    color: "#EA4335",
    text: "Tratamento integrado que realmente funciona. Desde que comecei a ir na Coluna Conectada, minha qualidade de vida melhorou muito!",
    time: "5 meses atrás",
  },
];

const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/place/Cl%C3%ADnica+Coluna+Conectada+-+Quiropraxia+e+Pilates/@-23.9665255,-46.3400917,17z/data=!4m8!3m7!1s0x94ce0373307f5813:0x4ed520296532d37!8m2!3d-23.9665255!4d-46.3375168!9m1!1b1!16s%2Fg%2F11bbrmsgn1";

/* ─── Google "G" icon ─── */
function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width={20} height={20} viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
      <path fill="#FBBC05" d="M10.53 28.59A14.5 14.5 0 0 1 9.5 24c0-1.59.28-3.14.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.77.9 7.35 2.56 10.52l7.97-5.93z"/>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 5.93C6.51 42.62 14.62 48 24 48z"/>
    </svg>
  );
}

/* ─── Star SVG ─── */
function Star() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="#F59E0B" aria-hidden="true">
      <path d="M12 2l2.9 6.9 7.5.6-5.7 4.9 1.8 7.4L12 17.8l-6.5 4 1.8-7.4L1.6 9.5l7.5-.6L12 2z" />
    </svg>
  );
}

/* ─── Verified badge ─── */
function VerifiedBadge() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="#1A73E8" aria-hidden="true" className="ml-0.5">
      <path d="M12 1l3.09 4.26L20 6.27l-2.64 4.63L18 16l-6-1.5L6 16l.64-5.1L4 6.27l4.91-1.01L12 1z" />
      <path fill="#fff" d="M10.5 14.5l-3-3 1.41-1.41L10.5 11.67l4.59-4.58L16.5 8.5l-6 6z" />
    </svg>
  );
}

export function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector("article")?.offsetWidth ?? 300;
    el.scrollBy({ left: dir === "left" ? -cardWidth - 16 : cardWidth + 16, behavior: "smooth" });
  };

  return (
    <section
      id="depoimentos"
      className="relative py-24 sm:py-32 bg-surface-muted overflow-hidden"
    >
      <div className="container-x">
        {/* Header */}
        <FadeUp className="max-w-3xl mx-auto text-center mb-12">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.18em] text-brand-blue bg-brand-blue-50 px-3 py-1.5 rounded-pill mb-5">
            Depoimentos
          </span>
          <h2 className="font-display font-semibold text-[clamp(1.8rem,2.8vw+1rem,3rem)] leading-[1.15] tracking-[-0.015em] text-balance">
            Histórias reais de quem voltou a se movimentar melhor
          </h2>
        </FadeUp>

        {/* Google badge */}
        <FadeUp delay={0.05} className="flex items-center justify-center gap-3 mb-10">
          <GoogleIcon className="shrink-0" />
          <span className="text-ink-secondary text-sm font-medium">
            Avaliações verificadas do Google · 5.0
          </span>
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} />
            ))}
          </div>
        </FadeUp>
      </div>

      {/* Carousel */}
      <div className="relative">
        {/* Left gradient */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-surface-muted to-transparent z-10 pointer-events-none transition-opacity duration-300 ${canScrollLeft ? "opacity-100" : "opacity-0"}`}
          aria-hidden="true"
        />
        {/* Right gradient */}
        <div
          className={`absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-surface-muted to-transparent z-10 pointer-events-none transition-opacity duration-300 ${canScrollRight ? "opacity-100" : "opacity-0"}`}
          aria-hidden="true"
        />

        {/* Nav buttons */}
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 grid place-items-center w-10 h-10 rounded-full bg-white shadow-brand-md border border-line-subtle hover:scale-105 transition-transform"
            aria-label="Depoimento anterior"
          >
            <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
        )}
        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 grid place-items-center w-10 h-10 rounded-full bg-white shadow-brand-md border border-line-subtle hover:scale-105 transition-transform"
            aria-label="Próximo depoimento"
          >
            <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        )}

        {/* Scrollable track */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory sm:snap-none pb-4 scrollbar-hide px-[calc((100vw-280px)/2)] sm:px-[max(1rem,calc((100vw-1200px)/2+1rem))]"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {googleReviews.map((review, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="flex-shrink-0 w-[280px] sm:w-[300px] snap-center bg-white rounded-2xl p-6 shadow-brand-sm border border-line-subtle hover:shadow-brand-md transition-shadow duration-300 flex flex-col"
            >
              {/* Header: Avatar + Name + Google icon */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className="grid place-items-center w-10 h-10 rounded-full text-white font-semibold text-sm shrink-0"
                    style={{ backgroundColor: review.color }}
                  >
                    {review.initial}
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-ink-primary text-sm leading-tight truncate max-w-[160px]">
                      {review.name}
                    </p>
                  </div>
                </div>
                <GoogleIcon />
              </div>

              {/* Stars + verified */}
              <div className="flex items-center gap-1 mb-3">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, s) => (
                    <Star key={s} />
                  ))}
                </div>
                <VerifiedBadge />
              </div>

              {/* Review text */}
              <p className="text-ink-secondary text-sm leading-relaxed flex-1">
                {review.text}
              </p>

              {/* Footer */}
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink-tertiary text-xs mt-4 hover:text-brand-blue transition-colors"
              >
                Leia mais
              </a>
            </motion.article>
          ))}
        </div>
      </div>

      {/* CTA to Google Maps */}
      <FadeUp delay={0.15} className="mt-10 text-center">
        <a
          href={GOOGLE_MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-brand-blue hover:underline underline-offset-4 transition-colors"
        >
          <GoogleIcon className="shrink-0" />
          Ver todas as avaliações no Google
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17 17 7M7 7h10v10" />
          </svg>
        </a>
      </FadeUp>
    </section>
  );
}
