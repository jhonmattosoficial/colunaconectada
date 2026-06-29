"use client";

import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { WhatsAppButton } from "./WhatsAppButton";
import { brand } from "@/lib/content";

export function Navbar() {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 80], [0, 0.96]);
  const blur = useTransform(scrollY, [0, 80], [0, 12]);
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 1]);
  const padding = useTransform(scrollY, [0, 80], [18, 12]);
  // Logo crossfade
  const whiteLogoOpacity = useTransform(scrollY, [0, 60, 100], [1, 1, 0]);
  const blueLogoOpacity = useTransform(scrollY, [0, 60, 100], [0, 0, 1]);
  // Nav link color (white → blue-dark)
  const linkColor = useTransform(
    scrollY,
    [0, 80],
    ["rgba(255, 255, 255, 0.92)", "rgba(90, 103, 118, 1)"], // white/92 → ink-secondary
  );
  const linkHoverColor = useTransform(scrollY, [0, 80], ["#AFCA0B", "#1F4F9C"]);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-40"
      style={{
        paddingTop: padding,
        paddingBottom: padding,
        backgroundColor: useTransform(
          bgOpacity,
          (v) => `rgba(250, 251, 252, ${v})`,
        ),
        backdropFilter: useTransform(blur, (v) => `blur(${v}px)`),
        borderBottom: useTransform(
          borderOpacity,
          (v) => `1px solid rgba(229, 233, 239, ${v})`,
        ),
      }}
    >
      <div className="container-x flex items-center justify-between gap-6">
        {/* Logo with crossfade between white (hero) and color (scrolled) */}
        <a
          href="#hero"
          className="relative flex items-center gap-3 group"
          aria-label={brand.name}
        >
          <div className="relative w-32 sm:w-44 lg:w-52 aspect-[240/79]">
            {/* White logo — visible at top of page */}
            <motion.div
              className="absolute inset-0"
              style={{ opacity: whiteLogoOpacity }}
            >
              <Image
                src="/logo-branca.png"
                alt={brand.name}
                width={240}
                height={79}
                className="w-full h-auto"
                priority
              />
            </motion.div>
            {/* Color logo — visible after scroll */}
            <motion.div
              className="absolute inset-0"
              style={{ opacity: blueLogoOpacity }}
            >
              <Image
                src="/logo-coluna-conectada-site.png"
                alt=""
                width={240}
                height={79}
                className="w-full h-auto"
                aria-hidden="true"
              />
            </motion.div>
          </div>
        </a>

        {/* Nav links — color crossfades from white to ink */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          <NavLink href="#sistema" color={linkColor} hoverColor={linkHoverColor}>
            Tratamentos
          </NavLink>
          <NavLink href="#para-quem" color={linkColor} hoverColor={linkHoverColor}>
            Para quem
          </NavLink>
          <NavLink href="#beneficios" color={linkColor} hoverColor={linkHoverColor}>
            Benefícios
          </NavLink>
          <NavLink href="#quem-somos" color={linkColor} hoverColor={linkHoverColor}>
            Quem somos
          </NavLink>
        </nav>

        {/* Desktop CTA */}
        <WhatsAppButton label="Agendar" size="md" className="hidden sm:inline-flex" />

        {/* Mobile CTA — icon-only */}
        <a
          href={brand.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Agendar pelo WhatsApp"
          className="sm:hidden grid place-items-center h-11 w-11 rounded-full bg-cta-green text-white shadow-brand-sm hover:bg-cta-green-dark transition-colors"
        >
          <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M20.5 3.5A11 11 0 0 0 3.5 17l-1 5 5.2-1.4A11 11 0 1 0 20.5 3.5Zm-8.5 17a8.9 8.9 0 0 1-4.6-1.3l-.3-.2-3.1.8.8-3-.2-.3a9 9 0 1 1 7.4 4Zm5.1-6.7c-.3-.1-1.6-.8-1.9-.9s-.4-.1-.6.1-.7.9-.8 1.1-.3.2-.5.1a7.3 7.3 0 0 1-2.2-1.4 8.3 8.3 0 0 1-1.5-1.9c-.2-.3 0-.4.1-.6l.4-.4.2-.4a.5.5 0 0 0 0-.4l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 2.9 2.9 0 0 0-.9 2.1 5 5 0 0 0 1 2.7 11.4 11.4 0 0 0 4.4 3.9c.6.3 1.1.4 1.4.5a3.4 3.4 0 0 0 1.6.1 2.6 2.6 0 0 0 1.7-1.2 2.1 2.1 0 0 0 .2-1.2c-.1-.1-.3-.2-.5-.2Z" />
          </svg>
        </a>
      </div>
    </motion.header>
  );
}

function NavLink({
  href,
  color,
  children,
}: {
  href: string;
  color: MotionValue<string>;
  hoverColor?: MotionValue<string>;
  children: React.ReactNode;
}) {
  return (
    <motion.a
      href={href}
      style={{ color }}
      className="hover:opacity-70 transition-opacity"
    >
      {children}
    </motion.a>
  );
}
