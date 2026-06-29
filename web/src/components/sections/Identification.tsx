"use client";

import { motion } from "framer-motion";
import { identification } from "@/lib/content";
import { FadeUp, staggerContainer, staggerItem } from "@/components/ui/FadeUp";

export function Identification() {
  return (
    <section
      id="identificacao"
      className="relative py-24 sm:py-32 bg-surface-base"
    >
      <div className="container-x">
        <FadeUp className="max-w-3xl mb-14 sm:mb-20">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.18em] text-brand-blue bg-brand-blue-50 px-3 py-1.5 rounded-pill mb-5">
            Identificação
          </span>
          <h2 className="font-display font-semibold text-[clamp(1.8rem,2.6vw+1rem,2.85rem)] leading-[1.15] tracking-[-0.01em] text-balance">
            {identification.headline}
          </h2>
        </FadeUp>

        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid gap-4 sm:gap-5 max-w-4xl"
        >
          {identification.items.map((item, i) => (
            <motion.li
              key={i}
              variants={staggerItem}
              whileHover={{ x: 6 }}
              transition={{ type: "spring", stiffness: 360, damping: 24 }}
              className="group relative bg-white rounded-2xl p-6 sm:p-7 shadow-brand-sm hover:shadow-brand-md border border-line-subtle transition-shadow"
            >
              <div className="flex gap-5 items-start">
                <div className="flex-shrink-0 grid place-items-center w-11 h-11 rounded-xl bg-brand-blue-50 text-brand-blue font-display font-bold text-lg">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <p className="font-display font-medium text-ink-primary text-[1.05rem] sm:text-[1.12rem] leading-snug mb-1.5">
                    {item.top}
                  </p>
                  <p className="text-ink-secondary text-[0.95rem] leading-relaxed">
                    {item.bottom}
                  </p>
                </div>
              </div>
              <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1/2 w-1 rounded-r-full bg-gradient-to-b from-brand-lime to-brand-blue-light opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.li>
          ))}
        </motion.ul>

        <FadeUp delay={0.2} className="mt-14 max-w-3xl">
          <div className="relative bg-brand-blue-50/70 rounded-2xl p-7 sm:p-9 border-l-4 border-brand-lime">
            {identification.closing.map((line, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? "font-display font-semibold text-brand-blue-dark text-xl sm:text-2xl leading-tight mb-1"
                    : "text-ink-secondary text-base sm:text-lg leading-relaxed"
                }
              >
                {line}
              </p>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
