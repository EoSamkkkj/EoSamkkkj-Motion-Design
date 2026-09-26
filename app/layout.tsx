import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import AmbientBackground from "@/components/AmbientBackground";
import MotionProvider from "@/components/MotionProvider";

// Inter: fonte gratuita (licença OFL) com métricas e personalidade muito
// próximas da SF Pro da Apple — a substituta mais usada do mercado para
// quem não pode distribuir a SF Pro (que não tem licença para uso web).
// Usada tanto para títulos quanto para texto corrido, como a própria SF
// Pro faz (Display e Text são a mesma família, só tamanhos ópticos).
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Motion Designer",
    "Motion Design",
    "animação",
    "edição de vídeo",
    "portfólio",
    "EoSamKkkj",
  ],
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "pt_BR",
    type: "website",
    images: [{ url: "/logo/logo.png", width: 962, height: 962, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/logo/logo.png"],
  },
  icons: {
    icon: "/logo/logo.png",
    shortcut: "/logo/logo.png",
    apple: "/logo/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${mono.variable}`}>
      <body className="cursor-none-desktop">
        <a
          href="#conteudo"
          className="fixed left-2 top-2 z-[200] -translate-y-24 rounded-md bg-ink px-4 py-2 text-sm text-white transition-transform focus-visible:translate-y-0"
        >
          Pular para o conteúdo
        </a>
        <MotionProvider>
          <CustomCursor />
          <AmbientBackground />
          <Header />
          <main id="conteudo" className="relative">
            {children}
          </main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
