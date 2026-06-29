"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { whyIntegrated } from "@/lib/content";
import { FadeUp } from "@/components/ui/FadeUp";
import { CursorSpotlight } from "@/components/ui/CursorSpotlight";

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
