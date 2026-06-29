"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Large animated spine illustration for hero — 17 vertebrae,
 * S-curve, gentle continuous breathing, glowing lime accents.
 */
export function SpineHero() {
  const reduced = useReducedMotion();
  const total = 17;
  const bars = Array.from({ length: total }).map((_, i) => {
    // Generate an S-curve for the spine
    const t = i / (total - 1);
    const curve = Math.sin(t * Math.PI * 1.05) * 22;
    const x = 110 + curve;
    const y = 30 + i * 22;
    const w = 26 - Math.abs(curve) * 0.25;
    const isLime = i === 4 || i === 10 || i === 14;
    return { x, y, w, isLime, delay: i * 0.06 };
  });

  return (
    <div className="relative w-full max-w-[420px] aspect-[3/4] mx-auto">
      {/* Soft glow background */}
      <motion.div
        className="absolute inset-[12%] rounded-full bg-brand-lime/15 blur-3xl"
        animate={
          reduced
            ? {}
            : { scale: [1, 1.08, 1], opacity: [0.5, 0.85, 0.5] }
        }
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      />

      <svg viewBox="0 0 240 420" className="relative w-full h-full" aria-hidden="true">
        <defs>
          <linearGradient id="vertebraGrad" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#C9D8EE" stopOpacity="0.85" />
          </linearGradient>
          <linearGradient id="limeGrad" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#C9DE4A" />
            <stop offset="100%" stopColor="#AFCA0B" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Connecting spine curve (subtle) */}
        <motion.path
          d={`M ${bars[0].x + 13} ${bars[0].y + 6} ${bars
            .map((b) => `L ${b.x + 13} ${b.y + 6}`)
            .join(" ")}`}
          stroke="rgba(255, 255, 255, 0.18)"
          strokeWidth={1.5}
          fill="none"
          strokeLinecap="round"
          initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Vertebrae */}
        {bars.map((b, i) => (
          <motion.g key={i}>
            <motion.rect
              x={b.x}
              y={b.y}
              width={b.w}
              height={12}
              rx={6}
              fill={b.isLime ? "url(#limeGrad)" : "url(#vertebraGrad)"}
              filter={b.isLime ? "url(#glow)" : undefined}
              initial={reduced ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
              animate={
                reduced
                  ? { opacity: 1, scale: 1 }
                  : {
                      opacity: 1,
                      scale: 1,
                    }
              }
              transition={{
                delay: 0.5 + b.delay,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{ transformOrigin: `${b.x + b.w / 2}px ${b.y + 6}px` }}
            />
            {/* Breathing pulse on lime vertebrae */}
            {b.isLime && !reduced && (
              <motion.rect
                x={b.x}
                y={b.y}
                width={b.w}
                height={12}
                rx={6}
                fill="#AFCA0B"
                animate={{ opacity: [0, 0.4, 0], scale: [1, 1.8, 1] }}
                transition={{
                  duration: 2.2,
                  delay: 1.6 + i * 0.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{ transformOrigin: `${b.x + b.w / 2}px ${b.y + 6}px` }}
              />
            )}
          </motion.g>
        ))}

        {/* Floating connection dots */}
        {[
          { x: 60, y: 100, r: 3 },
          { x: 195, y: 180, r: 2 },
          { x: 45, y: 280, r: 2.5 },
          { x: 200, y: 340, r: 3 },
        ].map((d, i) => (
          <motion.circle
            key={i}
            cx={d.x}
            cy={d.y}
            r={d.r}
            fill="#AFCA0B"
            initial={{ opacity: 0 }}
            animate={
              reduced
                ? { opacity: 0.7 }
                : { opacity: [0.3, 0.9, 0.3], y: [0, -8, 0] }
            }
            transition={{
              duration: 3 + i * 0.4,
              delay: 1.5 + i * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>
    </div>
  );
}
