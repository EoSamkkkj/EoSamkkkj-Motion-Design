import Image from "next/image";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import RevealText from "@/components/RevealText";
import ProcessTimeline from "@/components/ProcessTimeline";
import ToolCard from "@/components/ToolCard";
import SectionReveal from "@/components/SectionReveal";
import BackgroundLoop from "@/components/BackgroundLoop";
import { tools } from "@/data/tools";
import { siteConfig } from "@/config/site";
import fs from "node:fs";
import path from "node:path";

const flow = ["Ideia", "Figma", "After Effects", "Áudio", "Entrega"];

function hasPhoto() {
  try {
    return fs.existsSync(path.join(process.cwd(), "public/images/sam.webp"));
  } catch {
    return false;
  }
}

export default function SobreSection() {
  const photoExists = hasPhoto();

  return (
    <SectionReveal id="sobre">
      <div className="relative px-6 pb-12 pt-20 sm:px-8 sm:pt-28 lg:px-12">
        <BackgroundLoop src="/backgrounds/bg-sobre.gif" />
        <div className="relative z-10 mx-auto grid max-w-content gap-12 lg:grid-cols-[1fr_0.85fr] lg:items-center lg:gap-16">
          <div className="flex flex-col gap-7">
            <SectionHeading
              eyebrow="Sobre mim"
              headline={
                <>
                  Por trás
                  <br />
                  dos frames.
                </>
              }
            />
            <RevealText
              as="p"
              delay={0.08}
              className="max-w-xl text-balance text-base leading-relaxed text-graphite sm:text-lg"
            >
              Sou Sam, Motion Designer com mais de 4 anos de experiência no
              mercado, transformando ideias em experiências visuais através
              de animação, design e edição.
            </RevealText>
            <RevealText
              as="p"
              delay={0.14}
              className="max-w-xl text-balance text-base leading-relaxed text-graphite sm:text-lg"
            >
              Ao longo desses anos, desenvolvi meu estilo buscando unir
              movimento, estética e propósito, criando vídeos que não apenas
              sejam bonitos, mas que comuniquem bem e mantenham a atenção de
              quem está assistindo.
            </RevealText>
          </div>

          <RevealText delay={0.1} className="relative aspect-[4/5] w-full max-w-sm justify-self-center lg:justify-self-end">
            {photoExists ? (
              <Image
                src="/images/sam.webp"
                alt="Foto de Sam, Motion Designer"
                fill
                className="rounded-3xl object-cover"
              />
            ) : (
              <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-green to-green-dark p-[14%] shadow-glow">
                <div className="bg-grid-light absolute inset-0 opacity-30 [mask-image:radial-gradient(closest-side,black,transparent)]" />
                <div className="relative h-full w-full">
                  <Image
                    src="/logo/logo-white.png"
                    alt={siteConfig.name}
                    fill
                    className="object-contain drop-shadow-[0_10px_28px_rgba(0,0,0,0.25)]"
                  />
                </div>
              </div>
            )}
          </RevealText>
        </div>
      </div>

      <div className="border-y border-ink/10 bg-ink py-16 sm:py-24">
        <RevealText
          as="p"
          className="mx-auto max-w-4xl px-6 text-balance text-center font-display text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl"
        >
          Do primeiro frame ao último,
          <br />
          cada detalhe importa.
        </RevealText>
      </div>

      <div className="mx-auto max-w-content px-6 py-20 sm:px-8 sm:py-28 lg:px-12">
        <SectionHeading
          eyebrow="Meu processo"
          headline={
            <>
              Do roteiro
              <br />
              ao resultado.
            </>
          }
        />
        <div className="mt-16">
          <ProcessTimeline />
        </div>
      </div>

      <div className="border-t border-ink/10 bg-cloud">
        <div className="mx-auto max-w-content px-6 py-20 sm:px-8 sm:py-28 lg:px-12">
          <SectionHeading eyebrow="Ferramentas" headline="Como eu trabalho." />

          <div className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-3">
            {flow.map((step, i) => (
              <span key={step} className="flex items-center gap-2">
                <span className="rounded-full bg-white px-4 py-2 font-mono text-xs uppercase tracking-widest text-graphite shadow-soft">
                  {step}
                </span>
                {i < flow.length - 1 && (
                  <ArrowRight size={16} className="text-green-dark/60" />
                )}
              </span>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {tools.map((tool, i) => (
              <ToolCard key={tool.id} tool={tool} delay={i * 0.06} />
            ))}
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}
