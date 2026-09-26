"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import {
  durationOptions,
  motionLevelOptions,
  narrationOptions,
  sfxOptions,
} from "@/data/prices";
import { buildCustomProjectMessage, createWhatsAppLinkDefault } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import MagneticButton from "./MagneticButton";

function PillGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <fieldset>
      <legend className="mb-3 font-mono text-xs uppercase tracking-widest text-steel">
        {label}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = value === opt;
          return (
            <button
              key={opt}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(opt)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                active
                  ? "border-green bg-green text-white"
                  : "border-ink/12 text-graphite hover:border-green/60 hover:text-ink"
              )}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export default function CustomProjectBuilder() {
  const [duracao, setDuracao] = useState("");
  const [nivel, setNivel] = useState("");
  const [narracao, setNarracao] = useState("");
  const [efeitos, setEfeitos] = useState("");
  const [quantidade, setQuantidade] = useState(1);
  const [descricao, setDescricao] = useState("");

  const isComplete = duracao && nivel && narracao && efeitos;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isComplete) return;
    const message = buildCustomProjectMessage({
      duracao,
      nivel,
      narracao,
      efeitos,
      quantidade,
      descricao,
    });
    window.open(createWhatsAppLinkDefault(message), "_blank", "noopener,noreferrer");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-9 rounded-3xl border border-ink/10 bg-white p-7 sm:p-10"
    >
      <PillGroup label="Duração" options={durationOptions} value={duracao} onChange={setDuracao} />
      <PillGroup label="Nível de Motion" options={motionLevelOptions} value={nivel} onChange={setNivel} />
      <PillGroup label="Narração" options={narrationOptions} value={narracao} onChange={setNarracao} />
      <PillGroup label="Efeitos sonoros" options={sfxOptions} value={efeitos} onChange={setEfeitos} />

      <div className="grid gap-8 sm:grid-cols-[160px_1fr]">
        <div>
          <label htmlFor="quantidade" className="mb-3 block font-mono text-xs uppercase tracking-widest text-steel">
            Quantidade de vídeos
          </label>
          <input
            id="quantidade"
            type="number"
            min={1}
            value={quantidade}
            onChange={(e) => setQuantidade(Math.max(1, Number(e.target.value) || 1))}
            className="w-full rounded-xl border border-ink/12 px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-green"
          />
        </div>
        <div>
          <label htmlFor="descricao" className="mb-3 block font-mono text-xs uppercase tracking-widest text-steel">
            Descrição do projeto
          </label>
          <textarea
            id="descricao"
            rows={3}
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Conte um pouco sobre sua ideia..."
            className="w-full resize-none rounded-xl border border-ink/12 px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-green"
          />
        </div>
      </div>

      <div className="flex flex-col items-start gap-3">
        <MagneticButton>
          <button
            type="submit"
            disabled={!isComplete}
            data-cursor="Enviar"
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-colors",
              isComplete
                ? "bg-green text-white shadow-glow hover:bg-green-dark"
                : "cursor-not-allowed bg-ink/10 text-steel"
            )}
          >
            Solicitar orçamento
            <ArrowRight size={16} />
          </button>
        </MagneticButton>
        {!isComplete && (
          <p className="font-mono text-xs text-steel">
            Escolha uma opção em cada campo acima para enviar.
          </p>
        )}
      </div>
    </form>
  );
}
