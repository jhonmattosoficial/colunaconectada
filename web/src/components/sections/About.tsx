"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { about } from "@/lib/content";
import { FadeUp } from "@/components/ui/FadeUp";

type Photo = {
  src: string;
  alt: string;
  caption: string;
  area: string;
};

const photos: Photo[] = [
  {
    src: "/img/clinica/clinica-3.jpg",
    alt: "Modelo anatômico da coluna nas mãos do profissional",
    caption: "Entenda sua coluna",
    area: "aspect-[4/5] lg:aspect-auto lg:col-span-2 lg:row-span-3",
  },
  {
    src: "/img/clinica/clinica-2.jpg",
    alt: "Sessão de quiropraxia na maca",
    caption: "Quiropraxia em ação",
    area: "aspect-[3/2] lg:aspect-auto lg:col-span-2 lg:row-span-1",
  },
  {
    src: "/img/clinica/clinica-1.jpg",
    alt: "Avaliação dos pés do paciente",
    caption: "Avaliação postural",
    area: "aspect-[3/2] lg:aspect-auto lg:col-span-1 lg:row-span-1",
  },
  {
    src: "/img/clinica/clinica-5.jpg",
    alt: "Massoterapia nas costas",
    caption: "Massoterapia",
    area: "aspect-[3/2] lg:aspect-auto lg:col-span-1 lg:row-span-1",
  },
  {
    src: "/img/clinica/clinica-4.jpg",
    alt: "Close do modelo anatômico com disco intervertebral",
    caption: "Cada vértebra importa",
    area: "aspect-[3/2] lg:aspect-auto lg:col-span-2 lg:row-span-1",
  },
];

export function About() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const prev = useCallback(
    () => setOpenIndex((i) => (i === null ? null : (i - 1 + photos.length) % photos.length)),
    [],
  );
  const next = useCallback(
    () => setOpenIndex((i) => (i === null ? null : (i + 1) % photos.length)),
    [],
  );

  useEffect(() => {
    if (openIndex === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [openIndex, close, prev, next]);

  return (
    <section
      id="quem-somos"
      className="relative py-24 sm:py-32 bg-surface-base overflow-hidden"
      aria-label="Quem somos — Coluna Conectada"
    >
      <div className="container-x">
        {/* Text block — left-aligned narrative */}
        <FadeUp className="max-w-3xl mb-14 sm:mb-20">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.18em] text-brand-blue bg-brand-blue-50 px-3 py-1.5 rounded-pill mb-5">
            {about.eyebrow}
          </span>
          <h2 className="font-display font-extrabold text-[clamp(1.9rem,3vw+1rem,3.1rem)] leading-[1.05] tracking-[-0.025em] mb-8 text-balance text-brand-blue">
            {about.headline}
          </h2>
          <div className="space-y-5 text-ink-secondary text-lg leading-relaxed">
            {about.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <p className="mt-8 font-display font-bold text-ink-primary text-xl sm:text-2xl leading-snug">
            {about.closing}
          </p>
        </FadeUp>

        {/* Photo gallery — bento grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.09 } },
          }}
          className="grid gap-3 sm:gap-4 lg:grid-cols-4 lg:grid-rows-3 lg:auto-rows-fr lg:h-[80vh] lg:max-h-[760px]"
        >
          {photos.map((photo, i) => (
            <Tile key={photo.src} photo={photo} index={i} onOpen={setOpenIndex} />
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {openIndex !== null && (
          <Lightbox
            photos={photos}
            index={openIndex}
            onClose={close}
            onPrev={prev}
            onNext={next}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function Tile({
  photo,
  index,
  onOpen,
}: {
  photo: Photo;
  index: number;
  onOpen: (i: number) => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={() => onOpen(index)}
      variants={{
        hidden: { opacity: 0, y: 32, scale: 0.96 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
        },
      }}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      className={`group relative ${photo.area} rounded-2xl sm:rounded-3xl overflow-hidden bg-surface-muted shadow-brand-sm hover:shadow-brand-lg transition-shadow text-left`}
      aria-label={`Abrir foto: ${photo.alt}`}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        quality={75}
        className="object-cover transition-transform duration-700 ease-out-soft group-hover:scale-[1.06]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/65 via-black/15 to-transparent"
      />
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 flex items-end justify-between gap-4">
        <div className="text-white">
          <div className="text-[0.65rem] uppercase tracking-[0.2em] text-brand-lime opacity-80 mb-1">
            {String(index + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
          </div>
          <div className="font-display font-semibold text-lg sm:text-xl leading-tight tracking-[-0.01em]">
            {photo.caption}
          </div>
        </div>
        <span className="grid place-items-center w-10 h-10 rounded-full bg-white/15 backdrop-blur-md text-white border border-white/25 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <svg
            width={16}
            height={16}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M15 3h6v6" />
            <path d="M9 21H3v-6" />
            <path d="M21 3l-7 7" />
            <path d="M3 21l7-7" />
          </svg>
        </span>
      </div>
    </motion.button>
  );
}

function Lightbox({
  photos,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  photos: Photo[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const photo = photos[index];
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] grid place-items-center bg-black/85 backdrop-blur-xl p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={photo.alt}
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Fechar"
        className="absolute top-4 right-4 sm:top-6 sm:right-6 grid place-items-center w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-colors z-10"
      >
        <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        aria-label="Foto anterior"
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 grid place-items-center w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-colors z-10"
      >
        <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>

      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        aria-label="Próxima foto"
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 grid place-items-center w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-colors z-10"
      >
        <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>

      <motion.div
        key={photo.src}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-5xl aspect-[3/2] sm:aspect-[16/10]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="(max-width: 1024px) 100vw, 1024px"
          quality={90}
          className="object-contain"
          priority
        />
      </motion.div>

      <div className="absolute bottom-5 sm:bottom-8 left-1/2 -translate-x-1/2 text-center text-white max-w-xl px-4">
        <div className="text-[0.7rem] uppercase tracking-[0.22em] text-brand-lime mb-1">
          {String(index + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
        </div>
        <div className="font-display font-semibold text-lg sm:text-xl">
          {photo.caption}
        </div>
      </div>
    </motion.div>
  );
}
