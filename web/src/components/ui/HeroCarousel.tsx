"use client";

import Image from "next/image";

/**
 * Hero background — imagem fixa, responsiva (mobile/desktop).
 * O nome do arquivo continua "HeroCarousel" pra não quebrar o import
 * existente em Hero.tsx, mas agora renderiza apenas duas imagens estáticas
 * com swap por breakpoint via classes hidden/block.
 */
export function HeroCarousel() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* Mobile (< md) — object-top anchors the people to the top, leaving the bottom blue gradient for text */}
      <Image
        src="/img/hero/hero-mobile.png"
        alt=""
        fill
        sizes="(max-width: 767px) 100vw, 0px"
        quality={85}
        priority
        className="object-cover object-top md:hidden"
      />
      {/* Desktop (>= md) */}
      <Image
        src="/img/hero/hero-desktop.png"
        alt=""
        fill
        sizes="(min-width: 768px) 100vw, 0px"
        quality={85}
        priority
        className="object-cover hidden md:block"
      />

      {/* Overlay sutil — só pra reforçar contraste do texto sem competir com o gradient já presente na arte */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-blue-dark/55 via-brand-blue-dark/20 to-transparent md:from-brand-blue-dark/65 md:via-brand-blue-dark/15 md:to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-dark/60 via-transparent to-transparent md:from-brand-blue-dark/35" />
    </div>
  );
}

/**
 * Mantido como noop por compatibilidade com o import antigo em Hero.tsx.
 * Sem indicador porque não há mais slides.
 */
export function HeroCarouselIndicator() {
  return null;
}
