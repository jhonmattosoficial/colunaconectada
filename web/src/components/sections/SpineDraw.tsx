"use client";

import {
  motion,
  MotionValue,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useRef } from "react";

type Label = {
  y: number;
  side: "left" | "right";
  title: string;
  text: string;
};

const LABELS: Label[] = [
  { y: 0.12, side: "left", title: "Cervical", text: "Mobilidade do pescoço e ombros" },
  { y: 0.27, side: "right", title: "Torácica", text: "Postura e respiração" },
  { y: 0.42, side: "left", title: "Lombar", text: "Sustentação e carga do dia a dia" },
  { y: 0.57, side: "right", title: "Sacro", text: "Base do movimento" },
  { y: 0.72, side: "left", title: "Cadeia integrada", text: "Cada parte conversa com a outra" },
];

// Sample 22 points along the spine bezier
const DOTS = Array.from({ length: 22 }).map((_, i) => {
  const t = i / 21;
  const x =
    Math.pow(1 - t, 3) * 550 +
    3 * Math.pow(1 - t, 2) * t * 480 +
    3 * (1 - t) * t * t * 600 +
    t * t * t * 560;
  const y =
    Math.pow(1 - t, 3) * 30 +
    3 * Math.pow(1 - t, 2) * t * 140 +
    3 * (1 - t) * t * t * 540 +
    t * t * t * 660;
  return { x, y, t };
});

function VertebraDot({
  cx,
  cy,
  scrollYProgress,
  start,
  reduced,
}: {
  cx: number;
  cy: number;
  scrollYProgress: MotionValue<number>;
  start: number;
  reduced: boolean;
}) {
  const reveal = useTransform(scrollYProgress, [start, start + 0.05], [0, 1]);
  return (
    <motion.circle
      cx={cx}
      cy={cy}
      r={7}
      fill="#1F4F9C"
      style={
        reduced ? { opacity: 1, scale: 1 } : { opacity: reveal, scale: reveal }
      }
    />
  );
}

function CalloutLabel({
  label,
  index,
  scrollYProgress,
  reduced,
}: {
  label: Label;
  index: number;
  scrollYProgress: MotionValue<number>;
  reduced: boolean;
}) {
  const start = 0.18 + index * 0.12;
  const reveal = useTransform(scrollYProgress, [start, start + 0.08], [0, 1]);
  const dx = useTransform(reveal, [0, 1], [label.side === "left" ? -36 : 36, 0]);

  return (
    <motion.div
      style={{
        top: `${label.y * 100}%`,
        opacity: reduced ? 1 : reveal,
        x: reduced ? 0 : dx,
      }}
      className={`absolute ${
        label.side === "left"
          ? "left-0 sm:left-4 lg:left-8 text-left"
          : "right-0 sm:right-4 lg:right-8 text-right"
      } w-[44vw] sm:w-[260px] lg:w-[360px] max-w-[220px] sm:max-w-none -translate-y-1/2`}
    >
      <div className="relative bg-white shadow-brand-lg border border-line-subtle rounded-xl sm:rounded-2xl px-3.5 sm:px-7 py-3 sm:py-6">
        {/* Accent dot */}
        <div
          className={`absolute top-1/2 -translate-y-1/2 w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-brand-lime ${
            label.side === "left" ? "-right-1" : "-left-1"
          } ring-2 sm:ring-4 ring-white`}
        />
        <div className="font-display font-bold text-brand-blue text-base sm:text-2xl lg:text-[1.65rem] leading-tight tracking-[-0.01em] mb-1 sm:mb-1.5">
          {label.title}
        </div>
        <div className="text-ink-secondary text-[0.72rem] sm:text-base lg:text-[1.05rem] leading-snug">
          {label.text}
        </div>
      </div>
      {/* Connecting line to spine (hidden on mobile to save space) */}
      <div
        className={`hidden sm:block absolute top-1/2 w-10 sm:w-16 lg:w-20 h-[2px] bg-gradient-to-r ${
          label.side === "left"
            ? "left-full from-brand-lime to-brand-blue/40"
            : "right-full from-brand-blue/40 to-brand-lime"
        }`}
      />
    </motion.div>
  );
}

export function SpineDraw() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const pathLength = useTransform(scrollYProgress, [0.1, 0.7], [0, 1]);

  return (
    <section
      ref={ref}
      className="relative bg-surface-base overflow-hidden py-16 sm:py-28 lg:py-32"
      aria-label="A coluna como sistema"
    >
      <div className="container-x mb-12 sm:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-[0.18em] text-brand-blue bg-brand-blue-50 px-3 py-1.5 rounded-pill mb-5">
            A coluna como sistema
          </span>
          <h2 className="font-display font-extrabold text-[clamp(2rem,3vw+1rem,3.25rem)] leading-[1.05] tracking-[-0.02em] text-balance">
            Cada região do corpo conversa com as outras.
          </h2>
        </motion.div>
      </div>

      <div className="relative mx-auto max-w-[1280px] px-2 sm:px-6">
        <div className="relative aspect-[4/5] sm:aspect-[5/4] lg:aspect-[6/5]">
          {/* SVG com viewBox apertado em volta do spine — preenche bem mais */}
          <svg
            viewBox="380 0 340 700"
            className="absolute inset-0 h-full w-full"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="spineStroke" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="#1F4F9C" />
                <stop offset="50%" stopColor="#3A6FB8" />
                <stop offset="100%" stopColor="#AFCA0B" />
              </linearGradient>
              <filter id="spineGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="5" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Backdrop spine (faint) */}
            <path
              d="M 550 30 C 480 140, 620 220, 540 340 S 470 540, 560 660"
              stroke="rgba(31, 79, 156, 0.10)"
              strokeWidth={32}
              fill="none"
              strokeLinecap="round"
            />

            {/* Active drawing spine */}
            <motion.path
              d="M 550 30 C 480 140, 620 220, 540 340 S 470 540, 560 660"
              stroke="url(#spineStroke)"
              strokeWidth={22}
              fill="none"
              strokeLinecap="round"
              filter="url(#spineGlow)"
              style={{ pathLength: reduced ? 1 : pathLength }}
            />

            {DOTS.map((d, i) => (
              <VertebraDot
                key={i}
                cx={d.x}
                cy={d.y}
                scrollYProgress={scrollYProgress}
                start={0.1 + d.t * 0.55}
                reduced={reduced}
              />
            ))}
          </svg>

          {LABELS.map((l, i) => (
            <CalloutLabel
              key={l.title}
              label={l}
              index={i}
              scrollYProgress={scrollYProgress}
              reduced={reduced}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
