"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { MouseEvent, ReactNode, useRef } from "react";
import { brand } from "@/lib/content";
import clsx from "clsx";

/**
 * Magnetic button — when cursor is within range, the button drifts
 * toward the cursor with spring damping. On leave, it springs back to 0.
 */
export function MagneticButton({
  children,
  href = brand.whatsapp,
  className,
  strength = 0.35,
  radius = 110,
}: {
  children: ReactNode;
  href?: string;
  className?: string;
  strength?: number;
  radius?: number;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduced = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 18, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 250, damping: 18, mass: 0.5 });

  function onMove(e: MouseEvent) {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.hypot(dx, dy);
    if (dist < radius) {
      x.set(dx * strength);
      y.set(dy * strength);
    } else {
      x.set(0);
      y.set(0);
    }
  }
  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.94 }}
      className={clsx(
        "group relative inline-flex items-center gap-3 rounded-pill bg-cta-green px-7 py-4 font-semibold text-white text-base sm:text-[1.05rem] shadow-brand-md transition-colors hover:bg-cta-green-dark",
        className,
      )}
    >
      <svg
        width={22}
        height={22}
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M20.5 3.5A11 11 0 0 0 3.5 17l-1 5 5.2-1.4A11 11 0 1 0 20.5 3.5Zm-8.5 17a8.9 8.9 0 0 1-4.6-1.3l-.3-.2-3.1.8.8-3-.2-.3a9 9 0 1 1 7.4 4Zm5.1-6.7c-.3-.1-1.6-.8-1.9-.9s-.4-.1-.6.1-.7.9-.8 1.1-.3.2-.5.1a7.3 7.3 0 0 1-2.2-1.4 8.3 8.3 0 0 1-1.5-1.9c-.2-.3 0-.4.1-.6l.4-.4.2-.4a.5.5 0 0 0 0-.4l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 2.9 2.9 0 0 0-.9 2.1 5 5 0 0 0 1 2.7 11.4 11.4 0 0 0 4.4 3.9c.6.3 1.1.4 1.4.5a3.4 3.4 0 0 0 1.6.1 2.6 2.6 0 0 0 1.7-1.2 2.1 2.1 0 0 0 .2-1.2c-.1-.1-.3-.2-.5-.2Z" />
      </svg>
      <span className="relative z-10">{children}</span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-pill ring-2 ring-cta-green opacity-0 transition-opacity duration-500 group-hover:opacity-50"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-1 rounded-pill bg-cta-green/30 blur-lg opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
    </motion.a>
  );
}
