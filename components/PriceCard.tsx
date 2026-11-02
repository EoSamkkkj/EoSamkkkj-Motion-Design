import { Check } from "lucide-react";
import { createWhatsAppLinkDefault, planMessage } from "@/lib/whatsapp";
import type { PortfolioVideo, PricePlan } from "@/lib/content-types";
import { cn } from "@/lib/utils";
import WhatsAppCTA from "./WhatsAppCTA";
import PlanReveal from "./PlanReveal";
import PlanExamples from "./PlanExamples";
import Tilt from "./Tilt";

export default function PriceCard({
  plan,
  index = 0,
  examples = [],
}: {
  plan: PricePlan;
  index?: number;
  /** vídeos de "Ver exemplos" (seção do portfólio escolhida no painel) */
  examples?: PortfolioVideo[];
}) {
  // "A partir de R$350": o "a partir de" fica pequeno, na mesma linha do valor
  const from = plan.price.match(/^(a partir de)\s+(.*)$/i);

  const rows = [
    { label: "Duração", value: plan.duration, shine: true },
    { label: "Prazo", value: plan.deadline, shine: true },
    { label: "Alterações", value: plan.revisions, shine: false },
  ].filter((row) => row.value);

  return (
    <PlanReveal index={index} className={cn("h-full", plan.highlight && "xl:-translate-y-3")}>
      <Tilt max={7} className="h-full rounded-3xl">
        <div
          className={cn(
            "relative flex h-full flex-col gap-6 rounded-3xl p-8",
            plan.highlight
              ? "price-glow bg-ink text-white shadow-glow"
              : "border border-ink/10 bg-white text-ink"
          )}
        >
          {plan.badge && (
            <span className="badge-bob absolute -top-3 left-8 rounded-full bg-green px-4 py-1 font-mono text-[10px] uppercase tracking-widest text-white shadow-soft">
              {plan.badge}
            </span>
          )}

          <div>
            <h3 className="font-display text-2xl font-semibold tracking-tight">{plan.name}</h3>
            <p className="mt-2 font-display text-4xl font-semibold tracking-tight">
              {from ? (
                <>
                  <span
                    className={cn(
                      "mr-1.5 font-sans text-sm font-medium tracking-normal",
                      plan.highlight ? "text-white/60" : "text-steel"
                    )}
                  >
                    {from[1]}
                  </span>
                  {from[2]}
                </>
              ) : (
                plan.price
              )}
            </p>
          </div>

          {plan.description && (
            <p className="shine text-sm font-medium leading-relaxed">{plan.description}</p>
          )}

          {rows.length > 0 && (
            <div className={cn("flex flex-col gap-2.5 border-t pt-5", plan.highlight ? "border-white/15" : "border-ink/10")}>
              {rows.map((row) => (
                <div key={row.label} className="flex items-center justify-between gap-4 text-sm">
                  <span className={plan.highlight ? "text-white/60" : "text-steel"}>{row.label}</span>
                  <span className={cn("text-right font-semibold", row.shine && "shine")}>{row.value}</span>
                </div>
              ))}
            </div>
          )}

          {plan.narration && (
            <div
              className={cn(
                "flex items-start gap-2.5 rounded-xl px-4 py-3 text-sm leading-relaxed",
                plan.highlight ? "bg-white/10" : "bg-green-mist"
              )}
            >
              <Check size={16} className="mt-0.5 shrink-0 text-green" />
              <span className="shine font-medium">{plan.narration}</span>
            </div>
          )}

          {plan.note && (
            <p className={cn("text-xs leading-relaxed", plan.highlight ? "text-white/60" : "text-steel")}>
              {plan.note}
            </p>
          )}

          <div className="mt-auto flex flex-col gap-4 pt-2">
            <PlanExamples planName={plan.name} price={plan.price} videos={examples} dark={plan.highlight} />
            <WhatsAppCTA
              href={createWhatsAppLinkDefault(plan.message || planMessage(plan.name, plan.price))}
              variant={plan.highlight ? "solid" : "outline"}
              className="w-full"
            >
              {plan.ctaLabel || `Escolher ${plan.name}`}
            </WhatsAppCTA>
          </div>
        </div>
      </Tilt>
    </PlanReveal>
  );
}
