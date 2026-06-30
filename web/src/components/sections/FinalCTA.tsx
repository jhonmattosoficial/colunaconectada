"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { finalCta, ctaText } from "@/lib/content";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function FinalCTA() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const orbY1 = useTransform(scrollYProgress, [0, 1], [60, reduced ? 60 : -100]);
  const orbY2 = useTransform(scrollYProgress, [0, 1], [-60, reduced ? -60 : 80]);

  return (
    <section
      ref={ref}
      id="agendar"
      className="relative isolate overflow-hidden py-28 sm:py-36 gradient-radial-brand text-white noise"
    >
      {/* Background photo — ambiente da clínica em opacidade baixa */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <Image
          src="/img/hero/hero-desktop.jpg"
          alt=""
          fill
          sizes="100vw"
          quality={70}
          className="object-cover opacity-[0.18] mix-blend-luminosity"
          priority={false}
        />
        {/* Brand-tinted overlay to keep mood consistent */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-blue-dark/55 via-brand-blue/40 to-brand-blue-dark/70" />
      </div>

      <motion.div
        style={{ y: orbY1 }}
        className="absolute -top-32 -left-20 w-[500px] h-[500px] rounded-full bg-brand-lime/15 blur-3xl pointer-events-none"
      />
      <motion.div
        style={{ y: orbY2 }}
        className="absolute -bottom-40 -right-32 w-[600px] h-[600px] rounded-full bg-brand-blue-light/30 blur-3xl pointer-events-none"
      />

      <div className="container-x relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 rounded-pill border border-brand-lime/40 bg-brand-lime/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-lime mb-8"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand-lime animate-pulse" />
            Comece agora
          </motion.div>

          <h2 className="font-display font-semibold text-[clamp(2rem,3.5vw+1rem,3.5rem)] leading-[1.1] tracking-[-0.02em] mb-4 text-balance">
            {finalCta.lines.map((line, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={
                  "block " +
                  (i === finalCta.lines.length - 1
                    ? "text-white/85 text-[0.6em] leading-relaxed mt-6 font-body font-normal max-w-2xl mx-auto"
                    : i === 1
                    ? "text-brand-lime"
                    : "")
                }
              >
                {line}
              </motion.span>
            ))}
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-col items-center gap-4"
          >
            <MagneticButton>{ctaText}</MagneticButton>
            <p className="text-white/60 text-sm">
              Resposta em até 1 dia útil pelo WhatsApp
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
