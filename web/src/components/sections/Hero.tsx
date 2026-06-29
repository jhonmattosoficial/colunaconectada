"use client";

import React from "react";
import { 
  ArrowRight, 
  Play, 
  Target, 
  Crown, 
  Star,
  Activity,
  HeartPulse,
  Leaf,
  Stethoscope,
  Dumbbell,
  Apple
} from "lucide-react";
import { brand } from "@/lib/content";
import { HeroCarousel } from "@/components/ui/HeroCarousel";

// --- MOCK BRANDS ---
const SERVICES = [
  { name: "Quiropraxia", icon: Activity },
  { name: "Pilates", icon: Dumbbell },
  { name: "Fisioterapia", icon: Stethoscope },
  { name: "Massoterapia", icon: HeartPulse },
  { name: "Nutrição", icon: Apple },
  { name: "Bem-estar", icon: Leaf },
];

// --- SUB-COMPONENTS ---
const StatItem = ({ value, label }: { value: string; label: string }) => (
  <div className="flex flex-col items-center justify-center transition-transform hover:-translate-y-1 cursor-default">
    <span className="text-xl font-bold text-white sm:text-2xl">{value}</span>
    <span className="text-[10px] uppercase tracking-wider text-brand-lime font-medium sm:text-xs">{label}</span>
  </div>
);

// --- MAIN COMPONENT ---
export function Hero() {
  return (
    <div id="hero" className="relative w-full bg-brand-blue-dark text-white overflow-hidden font-body">
      {/* Full-bleed fixed hero background (responsive mobile/desktop) */}
      <HeroCarousel />
      {/*
        SCOPED ANIMATIONS
      */}
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-fade-in {
          animation: fadeSlideIn 0.8s ease-out forwards;
          opacity: 0;
        }
        .animate-marquee {
          animation: marquee 40s linear infinite; /* Slower for readability */
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
      `}</style>



      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-[55vh] pb-12 sm:pt-[45vh] sm:px-6 md:pt-40 md:pb-20 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-8 items-stretch lg:min-h-[calc(100vh-12rem)]">

          {/* --- LEFT COLUMN --- */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-8 pt-8">
            
            {/* Badge */}
            <div className="animate-fade-in delay-100">
              <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-md transition-colors hover:bg-white/10">
                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-brand-lime leading-snug">
                  <span className="hidden sm:inline">Seu corpo não está quebrado, ele está sobrecarregado</span>
                  <span className="sm:hidden">Seu corpo está sobrecarregado</span>
                </span>
              </div>
            </div>

            {/* Heading */}
            <h1 className="animate-fade-in delay-200 font-display font-semibold tracking-tight leading-[1.05] text-[clamp(2rem,4.5vw+0.5rem,3.5rem)]">
              Você sente dor, tensão, cansaço ou perda de mobilidade com <span className="text-brand-lime">frequência?</span>
            </h1>

            {/* Description */}
            <div className="animate-fade-in delay-300 max-w-xl text-base sm:text-lg text-surface-muted leading-relaxed font-light space-y-4">
              <p>Talvez o problema não seja uma única causa… mas um conjunto de hábitos, compensações e sobrecargas que o seu corpo vem sustentando há anos.</p>
              <p>Na <strong>Coluna Conectada</strong>, unimos Quiropraxia, Pilates, Massoterapia e Nutrição para olhar o seu corpo como um sistema completo — e não apenas o sintoma isolado.</p>
            </div>

            {/* CTA Buttons */}
            <div className="animate-fade-in delay-400 flex flex-col sm:flex-row gap-4">
              <a
                href={brand.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-cta-green px-6 sm:px-8 py-3.5 sm:py-4 text-sm font-semibold text-white text-center transition-all hover:scale-[1.02] hover:bg-cta-green-dark active:scale-[0.98]"
              >
                <span className="hidden sm:inline">Quero agendar minha avaliação na Coluna Conectada</span>
                <span className="sm:hidden">Agendar minha avaliação</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* --- RIGHT COLUMN --- */}
          <div className="lg:col-span-6 flex flex-col justify-end">

            {/* Marquee Card — bottom-anchored */}
            <div className="animate-fade-in delay-500 relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 py-8 backdrop-blur-xl">
              <h3 className="mb-6 px-8 text-sm font-medium text-surface-muted">Nossas Especialidades</h3>

              <div
                className="relative flex overflow-hidden"
                style={{
                  maskImage: "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
                  WebkitMaskImage: "linear-gradient(to right, transparent, black 20%, black 80%, transparent)"
                }}
              >
                <div className="animate-marquee flex gap-12 whitespace-nowrap px-4">
                  {[...SERVICES, ...SERVICES, ...SERVICES].map((service, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 opacity-70 transition-all hover:opacity-100 hover:scale-105 cursor-default hover:text-brand-lime"
                    >
                      <service.icon className="h-6 w-6 opacity-20" />
                      <span className="text-lg font-semibold tracking-tight">
                        {service.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
