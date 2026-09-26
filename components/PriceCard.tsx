import { Check } from "lucide-react";
import { createWhatsAppLinkDefault } from "@/lib/whatsapp";
import type { PricePlan } from "@/data/prices";
import { cn } from "@/lib/utils";
import WhatsAppCTA from "./WhatsAppCTA";
import RevealText from "./RevealText";

export default function PriceCard({ plan, delay = 0 }: { plan: PricePlan; delay?: number }) {
  const rows = [
    { label: "Duração", value: plan.duration, shine: true },
    { label: "Prazo", value: plan.deadline, shine: true },
    { label: "Alterações", value: plan.revisions, shine: false },
  ];

  return (
    <RevealText
      delay={delay}
      className={cn(
        "relative flex h-full flex-col gap-6 rounded-3xl p-8",
        plan.highlight
          ? "bg-ink text-white shadow-glow xl:-translate-y-3"
          : "border border-ink/10 bg-white text-ink"
      )}
    >
      {plan.badge && (
        <span className="absolute -top-3 left-8 rounded-full bg-green px-4 py-1 font-mono text-[10px] uppercase tracking-widest text-white shadow-soft">
          {plan.badge}
        </span>
      )}

      <div>
        <h3 className="font-display text-2xl font-semibold tracking-tight">{plan.name}</h3>
        <p className="mt-2 font-display text-4xl font-semibold tracking-tight">
          {plan.price}
        </p>
      </div>

      <p className={cn("shine text-sm font-medium leading-relaxed")}>
        {plan.description}
      </p>

      <div className={cn("flex flex-col gap-2.5 border-t pt-5", plan.highlight ? "border-white/15" : "border-ink/10")}>
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between text-sm">
            <span className={plan.highlight ? "text-white/60" : "text-steel"}>{row.label}</span>
            <span className={cn("font-semibold", row.shine && "shine")}>{row.value}</span>
          </div>
        ))}
      </div>

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

      <div className="mt-auto pt-2">
        <WhatsAppCTA
          href={createWhatsAppLinkDefault(plan.message)}
          variant={plan.highlight ? "solid" : "outline"}
          className="w-full"
        >
          {plan.ctaLabel}
        </WhatsAppCTA>
      </div>
    </RevealText>
  );
}
