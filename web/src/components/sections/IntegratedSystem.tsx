"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { MouseEvent, ReactNode, useRef } from "react";
import { integratedSystem } from "@/lib/content";
import { FadeUp, staggerContainer, staggerItem } from "@/components/ui/FadeUp";

const pillarIcons: Record<string, ReactNode> = {
  Quiropraxia: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 4h6" />
      <path d="M9 20h6" />
      <path d="M9 4c0 3 6 3 6 0" />
      <path d="M9 9c0 3 6 3 6 0" />
      <path d="M9 14c0 3 6 3 6 0" />
      <path d="M9 19c0 3 6 3 6 0" />
    </svg>
  ),
  Pilates: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="5" r="2" />
      <path d="M12 7v4" />
      <path d="M8 11h8" />
      <path d="M9 11l-2 8" />
      <path d="M15 11l2 8" />
      <path d="M6 15h12" />
    </svg>
  ),
  Massoterapia: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 14a4 4 0 0 1 8 0" />
      <path d="M8 14v3a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-3" />
      <path d="M5 10c2-2 4-2 4-2" />
      <path d="M19 10c-2-2-4-2-4-2" />
      <circle cx="12" cy="6" r="2" />
    </svg>
  ),
  Nutrição: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C8 6 8 11 12 14c4-3 4-8 0-12Z" />
      <path d="M6 14a6 6 0 0 0 12 0" />
      <path d="M12 14v8" />
    </svg>
  ),
};

function PillarCard({
  name,
  description,
  index,
}: {
  name: string;
  description: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 250, damping: 20 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 250, damping: 20 });

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function handleLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.div
      variants={staggerItem}
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      className="group relative"
    >
      <div className="relative h-full bg-white rounded-3xl p-7 sm:p-8 shadow-brand-md border border-line-subtle overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-brand-lime/15 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative">
          <div className="flex items-center justify-between mb-6">
            <div className="grid place-items-center w-14 h-14 rounded-2xl bg-brand-blue text-white shadow-brand-sm group-hover:bg-brand-blue-dark transition-colors">
              <div className="w-7 h-7">{pillarIcons[name]}</div>
            </div>
            <span className="font-display font-bold text-3xl text-brand-blue-50 group-hover:text-brand-lime/40 transition-colors">
              0{index + 1}
            </span>
          </div>

          <h3 className="font-display font-semibold text-2xl text-ink-primary mb-3">
            {name}
          </h3>
          <p className="text-ink-secondary text-[0.97rem] leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function IntegratedSystem() {
  return (
    <section
      id="sistema"
      className="relative py-24 sm:py-32 bg-gradient-to-b from-surface-base to-surface-muted overflow-hidden"
    >
      <div className="container-x">
        <FadeUp className="max-w-3xl mb-16 sm:mb-20">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.18em] text-brand-blue bg-brand-blue-50 px-3 py-1.5 rounded-pill mb-5">
            {integratedSystem.eyebrow}
          </span>
          <h2 className="font-display font-semibold text-[clamp(1.9rem,3vw+1rem,3.1rem)] leading-[1.1] tracking-[-0.015em] text-balance mb-6">
            {integratedSystem.headline}
          </h2>
          <p className="text-ink-secondary text-lg leading-relaxed mb-3">
            {integratedSystem.intro}
          </p>
          <p className="text-ink-primary font-medium">
            {integratedSystem.bridge}
          </p>
        </FadeUp>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {integratedSystem.pillars.map((p, i) => (
            <PillarCard key={p.name} {...p} index={i} />
          ))}
        </motion.div>

        <FadeUp delay={0.3} className="mt-16 max-w-3xl mx-auto text-center">
          <div className="space-y-2">
            <p className="font-display font-semibold text-brand-blue-dark text-2xl sm:text-3xl leading-tight">
              {integratedSystem.closing[0]}
            </p>
            <p className="font-display font-bold text-brand-blue text-2xl sm:text-3xl leading-tight">
              {integratedSystem.closing[1]}
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
