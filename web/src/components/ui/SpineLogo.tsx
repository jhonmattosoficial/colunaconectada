"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Stylized "spine" logo mark — 13 vertebrae bars, ascending arc.
 * Animates on mount: each bar grows from baseline with a stagger.
 */
export function SpineLogo({
  className,
  variant = "dark",
  size = 32,
}: {
  className?: string;
  variant?: "dark" | "light";
  size?: number;
}) {
  const reduced = useReducedMotion();
  const blue = variant === "dark" ? "#1F4F9C" : "#FFFFFF";
  const lime = "#AFCA0B";

  const bars = Array.from({ length: 13 }).map((_, i) => {
    const x = i * 6 + 4;
    const height = 8 + Math.sin((i / 12) * Math.PI) * 26;
    const y = 36 - height;
    const isLime = i === 3 || i === 8 || i === 11;
    return { x, y, height, isLime };
  });

  return (
    <svg
      width={size * 2.5}
      height={size}
      viewBox="0 0 90 38"
      className={className}
      aria-label="Coluna Conectada"
    >
      {bars.map((b, i) => (
        <motion.rect
          key={i}
          x={b.x}
          y={b.y}
          width={3.4}
          rx={1.7}
          fill={b.isLime ? lime : blue}
          initial={reduced ? { height: b.height } : { height: 0, y: 36 }}
          animate={{ height: b.height, y: b.y }}
          transition={{
            delay: reduced ? 0 : 0.08 * i,
            duration: 0.55,
            ease: [0.16, 1, 0.3, 1],
          }}
        />
      ))}
    </svg>
  );
}
