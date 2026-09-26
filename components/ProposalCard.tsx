"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { buildProposalMessage, createWhatsAppLinkDefault } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import MagneticButton from "./MagneticButton";

export default function ProposalCard({ delay = 0 }: { delay?: number }) {
  const [valor, setValor] = useState("");
  const [mensagem, setMensagem] = useState("");

  const isComplete = valor.trim().length > 0 && mensagem.trim().length > 0;

  function handleSubmit() {
    if (!isComplete) return;
    const message = buildProposalMessage({ valor, mensagem });
    window.open(createWhatsAppLinkDefault(message), "_blank", "noopener,noreferrer");
  }

  return (
    // Animação dispara uma única vez, ao montar — não usa "whileInView"
    // (baseado em rolagem/observador), que é a causa clássica do campo
    // "sumir e voltar": qualquer re-renderização ao digitar podia fazer o
    // observador reavaliar a visibilidade do card no meio da digitação.
    <motion.div
      initial={{ opacity: 0, y: 32, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 130, damping: 18, mass: 0.8, delay }}
      className="relative flex h-full flex-col gap-6 rounded-3xl border border-green/30 bg-green-mist/40 p-8"
    >
      <span className="absolute -top-3 left-8 flex items-center gap-1.5 rounded-full bg-green px-4 py-1 font-mono text-[10px] uppercase tracking-widest text-white shadow-soft">
        <Sparkles size={11} className="shrink-0" />
        Sua proposta
      </span>

      <div>
        <h3 className="font-display text-2xl font-semibold tracking-tight text-ink">
          Personalizado
        </h3>
        <p className="mt-2 shine font-display text-2xl font-semibold">
          Você define o valor
        </p>
      </div>

      <p className="text-sm leading-relaxed text-graphite">
        Tem um valor em mente para o seu projeto? Me conte quanto você
        gostaria de investir e o que precisa — eu avalio a viabilidade e a
        gente conversa a partir da sua proposta.
      </p>

      <div className="flex flex-col gap-4 border-t border-green/20 pt-5">
        <div>
          <label htmlFor="proposta-valor" className="mb-2 block font-mono text-xs uppercase tracking-widest text-steel">
            Valor que você gostaria de investir
          </label>
          <input
            id="proposta-valor"
            type="text"
            inputMode="numeric"
            placeholder="Ex.: R$ 300"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            className="w-full rounded-xl border border-ink/12 bg-white px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-green"
          />
        </div>
        <div>
          <label htmlFor="proposta-mensagem" className="mb-2 block font-mono text-xs uppercase tracking-widest text-steel">
            Conte sua proposta
          </label>
          <textarea
            id="proposta-mensagem"
            rows={3}
            placeholder="O que você precisa, duração aproximada, referências..."
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            className="w-full resize-none rounded-xl border border-ink/12 bg-white px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-green"
          />
        </div>
      </div>

      <div className="mt-auto flex flex-col gap-2 pt-2">
        <MagneticButton>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!isComplete}
            data-cursor="Enviar"
            className={cn(
              "inline-flex w-full items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-colors",
              isComplete
                ? "bg-green text-white shadow-glow hover:bg-green-dark"
                : "cursor-not-allowed bg-ink/10 text-steel"
            )}
          >
            Enviar proposta
            <ArrowRight size={16} />
          </button>
        </MagneticButton>
        {!isComplete && (
          <p className="font-mono text-xs text-steel">
            Preencha o valor e a mensagem para enviar.
          </p>
        )}
      </div>
    </motion.div>
  );
}
