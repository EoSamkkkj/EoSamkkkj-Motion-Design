"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowDown, ArrowUp, Copy, Plus, Sparkles, Trash2 } from "lucide-react";
import type { PricePlan, SiteContent } from "@/lib/content-types";
import { planMessage } from "@/lib/whatsapp";
import { Button, Card, Field, IconButton, inputClass, moveItem, uid } from "./ui";

interface Props {
  content: SiteContent;
  onChange: (next: SiteContent) => void;
}

const blankPlan = (): PricePlan => ({
  id: uid("p"),
  name: "Novo estilo",
  price: "R$",
  duration: "Até 30 segundos",
  description: "",
  narration: "",
  deadline: "Conforme o projeto",
  revisions: "1 alteração",
  ctaLabel: "",
  message: "",
});

export default function PricesEditor({ content, onChange }: Props) {
  const plans = content.plans;
  const set = (next: PricePlan[]) => onChange({ ...content, plans: next });
  const update = (id: string, patch: Partial<PricePlan>) =>
    set(plans.map((p) => (p.id === id ? { ...p, ...patch } : p)));

  return (
    <div className="flex flex-col gap-6">
      <Card
        title="Pacotes de preço"
        subtitle="Cada card aparece na seção Preços, na mesma ordem daqui. O card “Personalizado” continua sempre no final."
        actions={
          <Button variant="green" onClick={() => set([...plans, blankPlan()])}>
            <Plus size={16} /> Novo pacote
          </Button>
        }
      >
        {plans.length === 0 && (
          <p className="rounded-2xl border border-dashed border-ink/15 px-5 py-8 text-center text-sm text-steel">
            Nenhum pacote. Clique em “Novo pacote”.
          </p>
        )}
      </Card>

      <AnimatePresence initial={false}>
        {plans.map((plan, i) => (
          <motion.div
            key={plan.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
          >
            <Card
              title={
                <span className="flex items-center gap-2">
                  {plan.name || "Sem nome"}
                  <span className="font-display text-base font-medium text-green-dark">{plan.price}</span>
                  {plan.highlight && <Sparkles size={16} className="text-green" />}
                </span>
              }
              actions={
                <>
                  <IconButton label="Subir" disabled={i === 0} onClick={() => set(moveItem(plans, i, -1))}>
                    <ArrowUp size={15} />
                  </IconButton>
                  <IconButton label="Descer" disabled={i === plans.length - 1} onClick={() => set(moveItem(plans, i, 1))}>
                    <ArrowDown size={15} />
                  </IconButton>
                  <IconButton label="Duplicar" onClick={() => set([...plans.slice(0, i + 1), { ...plan, id: uid("p"), name: `${plan.name} (cópia)` }, ...plans.slice(i + 1)])}>
                    <Copy size={15} />
                  </IconButton>
                  <IconButton
                    label="Apagar pacote"
                    tone="danger"
                    onClick={() => confirm(`Apagar o pacote “${plan.name}”?`) && set(plans.filter((p) => p.id !== plan.id))}
                  >
                    <Trash2 size={15} />
                  </IconButton>
                </>
              }
              className={plan.highlight ? "border-green/40 ring-4 ring-green/10" : undefined}
            >
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Field label="Nome do pacote">
                  <input value={plan.name} onChange={(e) => update(plan.id, { name: e.target.value })} className={inputClass} />
                </Field>
                <Field label="Preço">
                  <input value={plan.price} onChange={(e) => update(plan.id, { price: e.target.value })} placeholder="R$350" className={inputClass} />
                </Field>
                <Field label="Duração do vídeo">
                  <input value={plan.duration} onChange={(e) => update(plan.id, { duration: e.target.value })} className={inputClass} />
                </Field>
                <Field label="Prazo">
                  <input value={plan.deadline} onChange={(e) => update(plan.id, { deadline: e.target.value })} className={inputClass} />
                </Field>
                <Field label="Alterações">
                  <input value={plan.revisions} onChange={(e) => update(plan.id, { revisions: e.target.value })} className={inputClass} />
                </Field>
                <Field label="Selo (opcional)" hint="Ex.: Mais escolhido, Novo, Promoção">
                  <input value={plan.badge ?? ""} onChange={(e) => update(plan.id, { badge: e.target.value })} className={inputClass} />
                </Field>
                <Field label="O que inclui / descrição" className="sm:col-span-2 lg:col-span-3">
                  <textarea rows={2} value={plan.description} onChange={(e) => update(plan.id, { description: e.target.value })} className={inputClass} />
                </Field>
                <Field label="Narração / extra (opcional)" className="sm:col-span-2 lg:col-span-3">
                  <textarea rows={2} value={plan.narration ?? ""} onChange={(e) => update(plan.id, { narration: e.target.value })} className={inputClass} />
                </Field>
                <Field label="Texto do botão">
                  <input value={plan.ctaLabel} onChange={(e) => update(plan.id, { ctaLabel: e.target.value })} placeholder={`Escolher ${plan.name}`} className={inputClass} />
                </Field>
                <Field label="Mensagem do WhatsApp" className="sm:col-span-2" hint="Deixe vazio para gerar automaticamente com o nome e o preço.">
                  <textarea rows={2} value={plan.message} onChange={(e) => update(plan.id, { message: e.target.value })} placeholder={planMessage(plan.name, plan.price)} className={inputClass} />
                </Field>
                <label className="flex items-center gap-3 rounded-xl border border-ink/10 px-4 py-2.5 text-sm text-graphite sm:col-span-2 lg:col-span-3">
                  <input type="checkbox" checked={!!plan.highlight} onChange={(e) => update(plan.id, { highlight: e.target.checked })} className="h-4 w-4 accent-green" />
                  Destacar este pacote (card escuro, com brilho)
                </label>
              </div>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
