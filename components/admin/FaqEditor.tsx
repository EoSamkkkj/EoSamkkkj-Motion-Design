"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import type { FaqItem, SiteContent } from "@/lib/content-types";
import { Button, Card, IconButton, inputClass, moveItem } from "./ui";

interface Props {
  content: SiteContent;
  onChange: (next: SiteContent) => void;
}

export default function FaqEditor({ content, onChange }: Props) {
  const faq = content.faq;
  const set = (next: FaqItem[]) => onChange({ ...content, faq: next });
  const update = (i: number, patch: Partial<FaqItem>) =>
    set(faq.map((f, j) => (j === i ? { ...f, ...patch } : f)));

  return (
    <Card
      title="Perguntas frequentes"
      subtitle="Aparecem no fim da seção Preços."
      actions={
        <Button variant="green" onClick={() => set([...faq, { question: "", answer: "" }])}>
          <Plus size={16} /> Nova pergunta
        </Button>
      }
    >
      <div className="flex flex-col gap-3">
        <AnimatePresence initial={false}>
          {faq.map((item, i) => (
            <motion.div
              key={i}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className="flex flex-col gap-2 rounded-2xl border border-ink/10 p-3 sm:flex-row"
            >
              <div className="flex flex-1 flex-col gap-2">
                <input value={item.question} onChange={(e) => update(i, { question: e.target.value })} placeholder="Pergunta" className={`${inputClass} font-medium`} />
                <textarea rows={2} value={item.answer} onChange={(e) => update(i, { answer: e.target.value })} placeholder="Resposta" className={inputClass} />
              </div>
              <div className="flex justify-end gap-2 sm:flex-col">
                <IconButton label="Subir" disabled={i === 0} onClick={() => set(moveItem(faq, i, -1))}>
                  <ArrowUp size={15} />
                </IconButton>
                <IconButton label="Descer" disabled={i === faq.length - 1} onClick={() => set(moveItem(faq, i, 1))}>
                  <ArrowDown size={15} />
                </IconButton>
                <IconButton label="Apagar pergunta" tone="danger" onClick={() => set(faq.filter((_, j) => j !== i))}>
                  <Trash2 size={15} />
                </IconButton>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </Card>
  );
}
