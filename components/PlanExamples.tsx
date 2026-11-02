"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { PortfolioVideo } from "@/lib/content-types";
import { cn } from "@/lib/utils";
import VideoModal from "./VideoModal";

interface PlanExamplesProps {
  planName: string;
  price: string;
  videos: PortfolioVideo[];
  /** card escuro (pacote em destaque) */
  dark?: boolean;
}

/** "A partir de R$120" → "a partir de R$120"; "R$250" → "por R$250". */
function priceSentence(price: string) {
  const p = price.trim();
  return /^a partir de/i.test(p) ? p.charAt(0).toLowerCase() + p.slice(1) : `por ${p}`;
}

/**
 * Link "Ver exemplos" do card de preço: abre os vídeos do pacote no mesmo
 * player do portfólio, sem sair da seção. O player só carrega ao abrir.
 */
export default function PlanExamples({ planName, price, videos, dark = false }: PlanExamplesProps) {
  const [index, setIndex] = useState<number | null>(null);
  const step = useCallback(
    (by: number) => setIndex((i) => (i === null ? i : (i + by + videos.length) % videos.length)),
    [videos.length],
  );
  const prev = useCallback(() => step(-1), [step]);
  const next = useCallback(() => step(1), [step]);
  const close = useCallback(() => setIndex(null), []);
  // o card tem tilt (transform), que prenderia o player "fixed" dentro dele
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (videos.length === 0) return null;
  const video = index === null ? null : (videos[index] ?? null);

  return (
    <>
      <button
        type="button"
        onClick={() => setIndex(0)}
        data-cursor="Play"
        className={cn(
          "self-center text-sm font-medium underline underline-offset-4",
          dark ? "text-green" : "text-green-dark",
        )}
      >
        Ver exemplos
      </button>
      {mounted &&
        createPortal(
          <VideoModal
            video={video}
            levelLabel={planName}
            index={index ?? 0}
            total={videos.length}
            onPrev={prev}
            onNext={next}
            onClose={close}
            footer={
              price
                ? `Esse é o tipo de resultado que você recebe ${priceSentence(price)}.`
                : undefined
            }
          />,
          document.body,
        )}
    </>
  );
}
