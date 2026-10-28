import { ChevronDown } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import PriceCard from "@/components/PriceCard";
import ProposalCard from "@/components/ProposalCard";
import CustomProjectBuilder from "@/components/CustomProjectBuilder";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import RevealText from "@/components/RevealText";
import SectionReveal from "@/components/SectionReveal";
import BackgroundLoop from "@/components/BackgroundLoop";
import MovingBackdrop from "@/components/MovingBackdrop";
import type { FaqItem, PricePlan } from "@/lib/content-types";
import { createWhatsAppLinkDefault, whatsappMessages } from "@/lib/whatsapp";

interface PrecosSectionProps {
  plans: PricePlan[];
  faq: FaqItem[];
}

export default function PrecosSection({ plans, faq }: PrecosSectionProps) {
  return (
    <SectionReveal id="precos">
      <div className="relative px-6 pb-12 pt-20 sm:px-8 sm:pt-28 lg:px-12">
        <BackgroundLoop src="/backgrounds/bg-precos.gif" />
        <div className="relative z-10 mx-auto max-w-content">
          <SectionHeading
            eyebrow="Investimento"
            headline={
              <>
                Escolha o nível
                <br />
                ideal para sua ideia.
              </>
            }
            text="Do Motion Design essencial ao projeto mais completo."
          />
        </div>
      </div>

      <div className="mx-auto max-w-content px-6 pb-20 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4 xl:gap-5">
          {plans.map((plan, i) => (
            <PriceCard key={plan.id} plan={plan} delay={i * 0.08} />
          ))}
          <ProposalCard delay={plans.length * 0.08} />
        </div>
      </div>

      <div className="relative overflow-hidden border-t border-ink/10 bg-cloud">
        <MovingBackdrop variant="grid" />
        <div className="relative mx-auto max-w-content px-6 py-20 sm:px-8 sm:py-28 lg:px-12">
          <SectionHeading
            eyebrow="Personalizado"
            headline={
              <>
                Monte seu
                <br />
                projeto.
              </>
            }
            text="Nem todo projeto se encaixa em um pacote. Personalize sua necessidade e envie os detalhes para receber um orçamento."
          />
          <div className="mt-12 max-w-3xl">
            <CustomProjectBuilder />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-content px-6 py-20 sm:px-8 sm:py-28 lg:px-12">
        <SectionHeading eyebrow="Dúvidas" headline="Perguntas frequentes." />
        <div className="mt-12 flex max-w-2xl flex-col divide-y divide-ink/10 border-y border-ink/10">
          {faq.map((item, i) => (
            <RevealText key={item.question} delay={i * 0.04} as="details" className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base font-medium tracking-tight text-ink sm:text-lg">
                {item.question}
                <ChevronDown
                  size={18}
                  className="shrink-0 text-steel transition-transform duration-300 group-open:rotate-180"
                />
              </summary>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-graphite sm:text-base">
                {item.answer}
              </p>
            </RevealText>
          ))}
        </div>
      </div>

      <div className="relative overflow-hidden bg-ink">
        <MovingBackdrop variant="aurora" />
        <div className="relative mx-auto flex max-w-content flex-col items-center gap-7 px-6 py-20 text-center sm:px-8 sm:py-28 lg:px-12">
          <SectionHeading
            align="center"
            tone="light"
            headline={
              <>
                Sua ideia pode
                <br />
                ser a próxima.
              </>
            }
            text="Vamos transformar seu projeto em movimento."
          />
          <WhatsAppCTA
            href={createWhatsAppLinkDefault(whatsappMessages.geral)}
            cursorLabel="WhatsApp"
          >
            Falar comigo ↗
          </WhatsAppCTA>
        </div>
      </div>
    </SectionReveal>
  );
}
