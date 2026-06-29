"use client";

import { motion } from "framer-motion";
import { testimonials } from "@/lib/content";
import { FadeUp, staggerContainer, staggerItem } from "@/components/ui/FadeUp";

export function Testimonials() {
  return (
    <section
      id="depoimentos"
      className="relative py-24 sm:py-32 bg-surface-muted overflow-hidden"
    >
      <div className="container-x">
        <FadeUp className="max-w-3xl mx-auto text-center mb-14">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.18em] text-brand-blue bg-brand-blue-50 px-3 py-1.5 rounded-pill mb-5">
            Depoimentos
          </span>
          <h2 className="font-display font-semibold text-[clamp(1.8rem,2.8vw+1rem,3rem)] leading-[1.15] tracking-[-0.015em] text-balance">
            {testimonials.headline}
          </h2>
        </FadeUp>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid sm:grid-cols-2 gap-5 max-w-4xl mx-auto"
        >
          {testimonials.items.map((item, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 380, damping: 22 }}
              className="bg-white rounded-2xl p-7 shadow-brand-sm border border-line-subtle relative"
            >
              <svg
                className="absolute -top-3 left-7 text-brand-lime"
                width={36}
                height={36}
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M6.5 10a3.5 3.5 0 1 1 3.5 3.5h-1V14a3.5 3.5 0 0 1-3.5 3.5H4V16a3 3 0 0 1 3-3v-1a2 2 0 0 1-2-2v-.5h1.5Zm9 0a3.5 3.5 0 1 1 3.5 3.5h-1V14a3.5 3.5 0 0 1-3.5 3.5H13V16a3 3 0 0 1 3-3v-1a2 2 0 0 1-2-2v-.5h1.5Z" />
              </svg>
              <p className="font-display text-ink-primary text-lg leading-snug pt-3">
                {item}
              </p>
              <div className="flex gap-1 mt-5">
                {[...Array(5)].map((_, s) => (
                  <svg
                    key={s}
                    width={18}
                    height={18}
                    viewBox="0 0 24 24"
                    fill="#F59E0B"
                    aria-hidden="true"
                  >
                    <path d="M12 2l2.9 6.9 7.5.6-5.7 4.9 1.8 7.4L12 17.8l-6.5 4 1.8-7.4L1.6 9.5l7.5-.6L12 2z" />
                  </svg>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <FadeUp delay={0.2} className="mt-10 text-center">
          <p className="text-ink-tertiary text-sm italic">
            {testimonials.note}
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
