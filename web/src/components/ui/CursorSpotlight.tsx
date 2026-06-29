"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { MouseEvent, ReactNode, useRef } from "react";

/**
 * Cursor spotlight — a soft radial light follows the mouse over a dark area.
 * Used in WhyIntegrated to add depth without heavy 3D.
 */
export function CursorSpotlight({
  children,
  className = "",
  color = "rgba(175, 202, 11, 0.18)",
  size = 520,
}: {
  children: ReactNode;
  className?: string;
  color?: string;
  size?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const x = useMotionValue(-9999);
  const y = useMotionValue(-9999);
  const sx = useSpring(x, { stiffness: 200, damping: 22, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 22, mass: 0.4 });

  function onMove(e: MouseEvent) {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  }
  function onLeave() {
    x.set(-9999);
    y.set(-9999);
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`relative ${className}`}
    >
      {!reduced && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute z-0 rounded-full blur-3xl"
          style={{
            width: size,
            height: size,
            x: sx,
            y: sy,
            translateX: "-50%",
            translateY: "-50%",
            background: `radial-gradient(circle at center, ${color} 0%, transparent 65%)`,
            mixBlendMode: "screen",
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
