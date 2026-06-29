"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { brand } from "@/lib/content";

export function WhatsAppFloating() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.05, 1], [0, 1, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.05, 1], [0.6, 1, 1]);

  return (
    <motion.a
      href={brand.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Agendar pelo WhatsApp"
      style={{ opacity, scale }}
      whileHover={{ scale: 1.08, rotate: -4 }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: "spring", stiffness: 380, damping: 18 }}
      className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-cta-green text-white shadow-brand-lg sm:bottom-7 sm:right-7 sm:h-16 sm:w-16"
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-10 rounded-full bg-cta-green opacity-50 animate-ping"
      />
      <svg
        width={28}
        height={28}
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M20.5 3.5A11 11 0 0 0 3.5 17l-1 5 5.2-1.4A11 11 0 1 0 20.5 3.5Zm-8.5 17a8.9 8.9 0 0 1-4.6-1.3l-.3-.2-3.1.8.8-3-.2-.3a9 9 0 1 1 7.4 4Zm5.1-6.7c-.3-.1-1.6-.8-1.9-.9s-.4-.1-.6.1-.7.9-.8 1.1-.3.2-.5.1a7.3 7.3 0 0 1-2.2-1.4 8.3 8.3 0 0 1-1.5-1.9c-.2-.3 0-.4.1-.6l.4-.4.2-.4a.5.5 0 0 0 0-.4l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 2.9 2.9 0 0 0-.9 2.1 5 5 0 0 0 1 2.7 11.4 11.4 0 0 0 4.4 3.9c.6.3 1.1.4 1.4.5a3.4 3.4 0 0 0 1.6.1 2.6 2.6 0 0 0 1.7-1.2 2.1 2.1 0 0 0 .2-1.2c-.1-.1-.3-.2-.5-.2Z" />
      </svg>
    </motion.a>
  );
}
