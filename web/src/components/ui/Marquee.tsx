"use client";

import { motion, useReducedMotion } from "framer-motion";

const items = [
  "Mobilidade",
  "Alinhamento",
  "Equilíbrio",
  "Postura",
  "Vitalidade",
  "Movimento",
  "Consciência corporal",
  "Cuidado integrado",
];

const separator = (
  <svg
    width={20}
    height={20}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className="text-brand-lime"
  >
    <path d="M12 2v6m0 8v6M2 12h6m8 0h6M5 5l4 4m6 6l4 4M5 19l4-4m6-6l4-4" />
  </svg>
);

/**
 * Infinite horizontal marquee with brand keywords.
 * Used as a divider section that adds rhythm between content blocks.
 */
export function Marquee({
  speed = 32,
  inverted = false,
}: {
  speed?: number;
  inverted?: boolean;
}) {
  const reduced = useReducedMotion();
  const loop = [...items, ...items, ...items];

  return (
    <section
      className={`relative overflow-hidden py-6 sm:py-8 ${
        inverted ? "bg-brand-blue text-white" : "bg-white text-brand-blue"
      } border-y border-line-subtle`}
      aria-hidden="true"
    >
      <motion.div
        className="flex gap-10 sm:gap-14 whitespace-nowrap will-change-transform"
        animate={
          reduced
            ? { x: 0 }
            : { x: ["0%", "-33.333%"] }
        }
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {loop.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-10 sm:gap-14 font-display font-semibold text-2xl sm:text-4xl tracking-tight"
          >
            {item}
            <span className="opacity-50">{separator}</span>
          </span>
        ))}
      </motion.div>

      {/* Edge fades */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-40 z-10"
        style={{
          background: `linear-gradient(to right, ${
            inverted ? "#1F4F9C" : "#FFFFFF"
          }, transparent)`,
        }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-40 z-10"
        style={{
          background: `linear-gradient(to left, ${
            inverted ? "#1F4F9C" : "#FFFFFF"
          }, transparent)`,
        }}
      />
    </section>
  );
}
