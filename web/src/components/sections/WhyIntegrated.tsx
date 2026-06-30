"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { whyIntegrated } from "@/lib/content";
import { FadeUp } from "@/components/ui/FadeUp";
import { CursorSpotlight } from "@/components/ui/CursorSpotlight";

/**
 * Animated visual for the right column on desktop — represents the body's
 * "compensation cycle": a central spine with pulsing tension nodes that
 * map to the 5 effects listed in the cascade.
 */
function CompensationVisual() {
  const reduced = useReducedMotion();

  // Tension nodes along the spine — y position on the SVG + label
  const nodes = [
    { y: 90, label: "Sobrecarga", side: "right" as const },
    { y: 175, label: "Rigidez", side: "left" as const },
    { y: 260, label: "Inflamação", side: "right" as const },
    { y: 345, label: "Limitação", side: "left" as const },
    { y: 430, label: "Dor recorrente", side: "right" as const },
  ];

  return (
    <div className="relative aspect-[3/4] max-w-[420px] mx-auto">
      {/* Outer glow halo */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-[10%] rounded-full bg-gradient-to-br from-brand-lime/25 to-brand-blue-light/30 blur-3xl"
        animate={reduced ? {} : { scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Frame */}
      <div className="relative h-full rounded-[2rem] border border-white/10 bg-white/[0.03] backdrop-blur-sm overflow-hidden">
        <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-brand-lime/15 blur-3xl" />
        <div className="absolute -bottom-12 -right-8 w-44 h-44 rounded-full bg-brand-blue-light/30 blur-3xl" />

        {/* Eyebrow inside frame */}
        <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-[0.65rem] uppercase tracking-[0.22em]">
          <span className="text-brand-lime font-bold">Cadeia de compensação</span>
          <span className="text-white/40 font-mono">05</span>
        </div>

        {/* Anatomical SVG */}
        <svg
          viewBox="0 0 360 520"
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="ciSpine" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#3A6FB8" />
              <stop offset="60%" stopColor="#1F4F9C" />
              <stop offset="100%" stopColor="#AFCA0B" />
            </linearGradient>
            <filter id="ciGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" />
            </filter>
          </defs>

          {/* Backdrop spine (faint S-curve) */}
          <path
            d="M 180 40 C 150 110, 220 180, 175 260 S 140 410, 185 490"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth={28}
            fill="none"
            strokeLinecap="round"
          />
          {/* Active spine with gradient */}
          <motion.path
            d="M 180 40 C 150 110, 220 180, 175 260 S 140 410, 185 490"
            stroke="url(#ciSpine)"
            strokeWidth={16}
            fill="none"
            strokeLinecap="round"
            initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Vertebra micro-dots (decorative) */}
          {Array.from({ length: 16 }).map((_, i) => {
            const t = i / 15;
            const x = 180 + Math.sin(t * Math.PI * 1.4) * 22;
            const y = 50 + t * 440;
            return <circle key={i} cx={x} cy={y} r={2.5} fill="rgba(255,255,255,0.35)" />;
          })}

          {/* Tension nodes — labeled, pulsing */}
          {nodes.map((n, i) => {
            const t = (n.y - 40) / 450;
            const x = 180 + Math.sin(t * Math.PI * 1.4) * 22;
            return (
              <motion.g
                key={n.label}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: `${x}px ${n.y}px` }}
              >
                {/* Pulsing ring */}
                {!reduced && (
                  <motion.circle
                    cx={x}
                    cy={n.y}
                    r={14}
                    stroke="#AFCA0B"
                    strokeWidth={1.5}
                    fill="none"
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: [0.6, 0, 0.6], scale: [1, 2.2, 1] }}
                    transition={{
                      duration: 2.8,
                      repeat: Infinity,
                      delay: i * 0.45,
                      ease: "easeOut",
                    }}
                  />
                )}
                {/* Glow halo */}
                <circle cx={x} cy={n.y} r={11} fill="#AFCA0B" opacity="0.25" filter="url(#ciGlow)" />
                {/* Solid node */}
                <circle cx={x} cy={n.y} r={6} fill="#AFCA0B" stroke="#15396E" strokeWidth={2} />

                {/* Connector line */}
                <line
                  x1={n.side === "right" ? x + 10 : x - 10}
                  y1={n.y}
                  x2={n.side === "right" ? 308 : 52}
                  y2={n.y}
                  stroke="rgba(175, 202, 11, 0.45)"
                  strokeWidth={1}
                  strokeDasharray="3 3"
                />

                {/* Label */}
                <text
                  x={n.side === "right" ? 312 : 48}
                  y={n.y + 4}
                  fill="#FFFFFF"
                  fontSize={11}
                  fontWeight={600}
                  textAnchor={n.side === "right" ? "start" : "end"}
                  className="font-display"
                  style={{ fontFamily: "var(--font-raleway), sans-serif", letterSpacing: "0.02em" }}
                >
                  {n.label}
                </text>
              </motion.g>
            );
          })}
        </svg>

        {/* Footer label inside frame */}
        <div className="absolute bottom-6 left-6 right-6 text-center">
          <p className="text-white/70 text-xs leading-relaxed">
            Cada nó representa um ponto onde o corpo compensa.
            <br />
            <span className="text-brand-lime font-semibold">Tratamos a cadeia inteira.</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export function WhyIntegrated() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const chainHeight = useTransform(scrollYProgress, [0.25, 0.65], ["0%", "100%"]);

  return (
    <section
      ref={ref}
      id="por-que"
      className="relative isolate py-20 sm:py-28 lg:py-24 bg-brand-blue text-white overflow-hidden"
    >
      {/* Background image full-bleed */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <Image
          src="/img/clinica/clinica-4.jpg"
          alt=""
          fill
          sizes="100vw"
          quality={70}
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-blue-dark via-brand-blue/85 via-65% to-brand-blue/30" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-brand-blue-dark/60 to-transparent" />
      </div>

      <CursorSpotlight className="container-x relative z-10">
        {/* Top: Headline + Subhead — centrado no desktop */}
        <div className="max-w-3xl lg:max-w-4xl mx-auto lg:text-center mb-12 sm:mb-16 lg:mb-14">
          <FadeUp>
            <span className="inline-block text-xs font-bold uppercase tracking-[0.18em] text-brand-lime bg-brand-lime/15 px-3 py-1.5 rounded-pill border border-brand-lime/30 mb-6">
              A causa
            </span>
          </FadeUp>

          <FadeUp delay={0.05}>
            <h2 className="font-display font-extrabold text-[clamp(1.9rem,3vw+1rem,3.25rem)] leading-[1.05] tracking-[-0.02em] mb-5 text-balance">
              {whyIntegrated.headline}
            </h2>
          </FadeUp>

          <FadeUp delay={0.1}>
            <p className="text-white/80 text-lg sm:text-xl leading-relaxed max-w-2xl lg:mx-auto">
              {whyIntegrated.subhead}
            </p>
          </FadeUp>
        </div>

        {/* Middle: 2-col grid on desktop — Insight left, Effects right */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left: Insight statement */}
          <div>
            <FadeUp delay={0.15}>
              <div className="border-l-4 border-brand-lime pl-6 sm:pl-7 py-1 mb-10 lg:mb-0">
                <p className="font-display font-extrabold text-brand-lime text-[clamp(2rem,3vw+0.5rem,3rem)] leading-[1] tracking-[-0.025em] mb-4">
                  {whyIntegrated.emphasis}
                </p>
                <p className="text-white/85 text-base sm:text-lg leading-relaxed max-w-lg">
                  {whyIntegrated.context}
                </p>
              </div>
            </FadeUp>

            {/* Closing — on desktop appears below the insight */}
            <FadeUp delay={0.1}>
              <div className="hidden lg:block border-t border-white/15 pt-8 mt-10">
                <p className="text-white/75 text-base sm:text-lg leading-relaxed mb-4 max-w-xl">
                  {whyIntegrated.closing[0]}
                </p>
                <p className="font-display font-extrabold text-white text-[clamp(1.5rem,2vw+0.5rem,2.25rem)] leading-[1.1] tracking-[-0.02em]">
                  {whyIntegrated.closing[1]}
                </p>
              </div>
            </FadeUp>
          </div>

          {/* Right: Effects cascade */}
          <div>
            <FadeUp delay={0.1}>
              <p className="text-brand-lime text-xs font-bold uppercase tracking-[0.18em] mb-6 sm:mb-8">
                {whyIntegrated.effectsIntro}
              </p>
            </FadeUp>

            <div className="relative pl-10 sm:pl-14">
              {/* Linha base */}
              <div
                aria-hidden="true"
                className="absolute left-[16px] sm:left-[22px] top-3 bottom-3 w-[2px] bg-white/12"
              />
              {/* Linha scroll-driven */}
              <motion.div
                aria-hidden="true"
                style={{ height: reduced ? "100%" : chainHeight }}
                className="absolute left-[16px] sm:left-[22px] top-3 w-[2px] bg-gradient-to-b from-brand-lime via-brand-lime to-brand-lime/40 origin-top"
              />

              {whyIntegrated.effects.map((effect, i) => (
                <motion.div
                  key={effect}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="relative flex items-center gap-4 sm:gap-5 py-3 sm:py-4"
                >
                  <span className="absolute -left-10 sm:-left-14 grid place-items-center w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-brand-blue-dark border-2 border-brand-lime text-brand-lime font-display font-bold text-[0.65rem] sm:text-xs shadow-[0_0_0_3px_rgba(31,79,156,1)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display font-semibold text-xl sm:text-2xl lg:text-[1.65rem] text-white tracking-[-0.01em] leading-tight">
                    {effect}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Closing — mobile only (desktop version is inside the left col) */}
        <FadeUp delay={0.1}>
          <div className="lg:hidden border-t border-white/15 pt-8 sm:pt-10 mt-12">
            <p className="text-white/75 text-base sm:text-lg leading-relaxed mb-4 sm:mb-5 max-w-xl">
              {whyIntegrated.closing[0]}
            </p>
            <p className="font-display font-extrabold text-white text-[clamp(1.5rem,2vw+0.5rem,2.25rem)] leading-[1.1] tracking-[-0.02em]">
              {whyIntegrated.closing[1]}
            </p>
          </div>
        </FadeUp>
      </CursorSpotlight>
    </section>
  );
}
