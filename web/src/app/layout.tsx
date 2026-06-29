import type { Metadata, Viewport } from "next";
import { Roboto, Raleway } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { WhatsAppFloating } from "@/components/ui/WhatsAppFloating";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-raleway",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Coluna Conectada — Saúde e Alta Performance",
  description:
    "Clínica de cuidado integrado: Quiropraxia, Pilates, Massoterapia e Nutrição. Tratamos a causa, não só o sintoma.",
  openGraph: {
    title: "Coluna Conectada — Saúde e Alta Performance",
    description:
      "Quiropraxia • Pilates • Massoterapia • Nutrição. Atendimento integrado para sair do ciclo de dor.",
    locale: "pt_BR",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#1F4F9C",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${roboto.variable} ${raleway.variable}`}>
      <body>
        <SmoothScroll>
          {children}
          <WhatsAppFloating />
        </SmoothScroll>
      </body>
    </html>
  );
}
