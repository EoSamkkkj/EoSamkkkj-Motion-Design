import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import AmbientBackground from "@/components/AmbientBackground";
import MotionProvider from "@/components/MotionProvider";
import PointerFx from "@/components/PointerFx";
import ScrollProgress from "@/components/ScrollProgress";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="cursor-none-desktop">
      <a
        href="#conteudo"
        className="fixed left-2 top-2 z-[200] -translate-y-24 rounded-md bg-ink px-4 py-2 text-sm text-white transition-transform focus-visible:translate-y-0"
      >
        Pular para o conteúdo
      </a>
      <MotionProvider>
        <ScrollProgress />
        <CustomCursor />
        <PointerFx />
        <AmbientBackground />
        <Header />
        <main id="conteudo" className="relative">
          {children}
        </main>
        <Footer />
      </MotionProvider>
    </div>
  );
}
