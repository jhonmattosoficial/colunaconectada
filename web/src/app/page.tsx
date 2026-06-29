import { Hero } from "@/components/sections/Hero";
import { Identification } from "@/components/sections/Identification";
import { TextZoomReveal } from "@/components/sections/TextZoomReveal";
import { IntegratedSystem } from "@/components/sections/IntegratedSystem";
import { ForWhom } from "@/components/sections/ForWhom";
import { WhyIntegrated } from "@/components/sections/WhyIntegrated";
import { SpineDraw } from "@/components/sections/SpineDraw";
import { Benefits } from "@/components/sections/Benefits";
import { About } from "@/components/sections/About";
import { Testimonials } from "@/components/sections/Testimonials";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { Marquee } from "@/components/ui/Marquee";

export default function Home() {
  return (
    <main className="relative overflow-x-hidden">
      <Navbar />
      <Hero />
      <Identification />
      <TextZoomReveal />
      <IntegratedSystem />
      <Marquee />
      <ForWhom />
      <WhyIntegrated />
      <SpineDraw />
      <Benefits />
      <About />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </main>
  );
}
