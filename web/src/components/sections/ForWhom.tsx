"use client";

import { motion } from "framer-motion";
import { forWhom } from "@/lib/content";
import { FadeUp, staggerContainer, staggerItem } from "@/components/ui/FadeUp";

export function ForWhom() {
  return (
    <section
      id="para-quem"
      className="relative py-24 sm:py-32 bg-surface-base overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none opacity-50">
        <div className="absolute top-20 left-1/3 w-72 h-72 rounded-full bg-brand-lime-50 blur-3xl" />
      </div>

      <div className="container-x relative">
        <FadeUp className="max-w-3xl mb-12">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.18em] text-brand-blue bg-brand-blue-50 px-3 py-1.5 rounded-pill mb-5">
            Para quem
          </span>
          <h2 className="font-display font-semibold text-[clamp(1.8rem,2.6vw+1rem,2.85rem)] leading-[1.15] tracking-[-0.01em] mb-5 text-balance">
            {forWhom.headline}
          </h2>
          <p className="text-ink-secondary text-lg">{forWhom.intro}</p>
        </FadeUp>

        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid sm:grid-cols-2 gap-3 sm:gap-4 max-w-4xl mb-12"
        >
          {forWhom.items.map((item, i) => (
            <motion.li
              key={i}
              variants={staggerItem}
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 360, damping: 22 }}
              className="flex items-start gap-4 bg-white rounded-xl p-5 shadow-brand-xs border border-line-subtle"
            >
              <span className="grid place-items-center flex-shrink-0 w-8 h-8 rounded-full bg-brand-blue text-white">
                <svg
                  width={14}
                  height={14}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={3}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="m5 12 5 5 9-11" />
                </svg>
              </span>
              <span className="text-ink-primary font-medium leading-snug pt-1">
                {item}
              </span>
            </motion.li>
          ))}
        </motion.ul>

        <FadeUp delay={0.15} className="max-w-3xl">
          <p className="text-lg sm:text-xl text-ink-primary leading-relaxed border-l-4 border-brand-blue pl-6 italic">
            {forWhom.closing}
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
