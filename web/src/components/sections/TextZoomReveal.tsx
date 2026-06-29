"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Sticky scroll-driven text zoom with mask reveal.
 * Two-phase timeline:
 *   Phase A (0 → 0.55) — text grows from 0.4x to 1x, lime highlight floods up
 *   Phase B (0.55 → 1) — text scales to 9x and fades, gradient background reveals
 */
export function TextZoomReveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);
  const limeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !textRef.current) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      if (reduced) return;

      gsap.set(textRef.current, { scale: 0.4, opacity: 0.6, force3D: true });
      gsap.set(limeRef.current, { backgroundSize: "100% 0%" });
      gsap.set(fadeRef.current, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=160%",
          pin: true,
          pinSpacing: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(
        textRef.current,
        { scale: 1, opacity: 1, ease: "none", duration: 0.55 },
        0,
      )
        .to(
          limeRef.current,
          { backgroundSize: "100% 100%", ease: "power1.out", duration: 0.35 },
          0.2,
        )
        .to(
          textRef.current,
          { scale: 9, opacity: 0, ease: "power2.in", duration: 0.45 },
          0.55,
        )
        .to(
          fadeRef.current,
          { opacity: 1, ease: "power2.out", duration: 0.3 },
          0.7,
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-surface-base"
      aria-label="Mensagem central"
    >
      {/* Decorative gradient that emerges after zoom */}
      <div
        ref={fadeRef}
        className="absolute inset-0 opacity-0 pointer-events-none gradient-radial-brand noise"
      />

      <div className="absolute inset-0 grid place-items-center px-6">
        <div
          ref={textRef}
          className="font-display font-extrabold text-ink-primary text-center leading-[1.02] tracking-[-0.03em] text-[clamp(2.2rem,6.5vw,5.5rem)] max-w-[28ch] mx-auto select-none"
          style={{
            willChange: "transform, opacity",
            transformOrigin: "center center",
          }}
        >
          O corpo não funciona em partes.{" "}
          <span
            ref={limeRef}
            className="relative inline-block text-brand-blue-dark"
            style={{
              backgroundImage:
                "linear-gradient(to top, rgba(175,202,11,0.55), rgba(175,202,11,0.55))",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "0 100%",
              backgroundSize: "100% 0%",
              transition: "background-size 0.2s linear",
              padding: "0 0.08em",
            }}
          >
            Tratamos como sistema.
          </span>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-ink-tertiary pointer-events-none">
        <span className="text-[0.65rem] uppercase tracking-[0.25em]">
          Continue rolando
        </span>
        <div className="h-9 w-[1.5px] bg-gradient-to-b from-brand-blue/30 to-transparent" />
      </div>
    </section>
  );
}
