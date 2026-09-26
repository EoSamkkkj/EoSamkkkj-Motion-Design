import { ArrowRight, ArrowUpRight } from "lucide-react";
import FloatingShape from "@/components/FloatingShape";
import RevealText from "@/components/RevealText";
import SectionHeading from "@/components/SectionHeading";
import PortfolioGrid from "@/components/PortfolioGrid";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import MagneticButton from "@/components/MagneticButton";
import SectionReveal from "@/components/SectionReveal";
import BackgroundLoop from "@/components/BackgroundLoop";
import { featuredPortfolio } from "@/data/portfolio";
import { createWhatsAppLinkDefault, whatsappMessages } from "@/lib/whatsapp";

const marqueeItems = ["IDEIA", "STORYBOARD", "DESIGN", "MOTION", "RESULTADO"];

export default function HomeSection() {
  return (
    <SectionReveal id="inicio">
      {/* HERO */}
      <div className="relative overflow-hidden pb-16 pt-[calc(76px+2.5rem)] sm:pb-24 sm:pt-[calc(76px+4rem)]">
        <BackgroundLoop src="/backgrounds/bg-inicio.gif" eager />
        <div className="relative z-10 mx-auto grid max-w-content items-center gap-12 px-6 sm:px-8 lg:grid-cols-[1.1fr_1fr] lg:gap-10 lg:px-12">
          <div className="flex flex-col items-start gap-6 sm:gap-7">
            <RevealText
              as="span"
              className="font-mono text-xs uppercase tracking-[0.2em] text-green-dark"
            >
              Motion Design • Edição • Criativos
            </RevealText>
            <RevealText
              as="h1"
              delay={0.05}
              className="font-display text-balance text-[2.75rem] font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-7xl"
            >
              Transformo ideias
              <br />
              em <span className="text-green">movimento.</span>
            </RevealText>
            <RevealText
              as="p"
              delay={0.12}
              className="max-w-md text-balance text-base leading-relaxed text-graphite sm:text-lg"
            >
              Transformo roteiros, produtos e ideias em experiências visuais
              pensadas para prender atenção e comunicar com clareza.
            </RevealText>
            <RevealText
              delay={0.18}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <MagneticButton>
                <a
                  href="#projetos"
                  data-cursor="Ver"
                  className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-7 py-3.5 text-sm font-medium text-ink transition-colors hover:border-green hover:text-green-dark"
                >
                  Ver projetos
                  <ArrowRight size={16} />
                </a>
              </MagneticButton>
              <WhatsAppCTA
                href={createWhatsAppLinkDefault(whatsappMessages.geral)}
                cursorLabel="WhatsApp"
              >
                Falar comigo
              </WhatsAppCTA>
            </RevealText>
          </div>

          <RevealText delay={0.1} className="relative">
            <FloatingShape />
          </RevealText>
        </div>
      </div>

      {/* MARQUEE */}
      <div aria-hidden="true" className="overflow-hidden border-y border-ink/10 bg-green-mist py-5">
        <div className="flex w-max animate-marquee">
          {[0, 1].map((set) => (
            <div key={set} className="flex shrink-0 items-center">
              {marqueeItems.map((item) => (
                <span
                  key={`${set}-${item}`}
                  className="mx-6 flex items-center gap-6 font-display text-lg font-medium tracking-tight text-green-dark sm:text-xl"
                >
                  {item}
                  <span className="h-1.5 w-1.5 rounded-full bg-green" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* MEUS TRABALHOS */}
      <div className="mx-auto max-w-content px-6 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Meus trabalhos"
            headline={
              <>
                Movimento é melhor
                <br />
                quando você vê.
              </>
            }
            text="Uma seleção de projetos, animações e experimentos desenvolvidos ao longo do meu trabalho com Motion Design."
          />
        </div>

        <div className="mt-12">
          <PortfolioGrid items={featuredPortfolio} />
        </div>

        <RevealText className="mt-12 flex justify-center">
          <MagneticButton>
            <a
              href="#projetos"
              data-cursor="Ver tudo"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-graphite"
            >
              Ver portfólio completo
              <ArrowUpRight size={16} />
            </a>
          </MagneticButton>
        </RevealText>
      </div>
    </SectionReveal>
  );
}
