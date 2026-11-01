"use client";

import { useCallback, useState } from "react";
import type { PortfolioLevel, PortfolioVideo } from "@/lib/content-types";
import { cn } from "@/lib/utils";
import VideoCard from "./VideoCard";
import VideoModal from "./VideoModal";

interface ReelStripProps {
  items: PortfolioVideo[];
  levels: PortfolioLevel[];
}

/**
 * Faixa de vídeos verticais correndo de ponta a ponta da tela, como um
 * rolo de filme. Para quando o mouse entra (e o vídeo sob o mouse começa a
 * tocar); um clique abre o player com as setas para navegar.
 */
export default function ReelStrip({ items, levels }: ReelStripProps) {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const labelOf = (id: string) => levels.find((l) => l.id === id)?.label ?? id;
  const selected = selectedIndex === null ? null : items[selectedIndex] ?? null;
  const step = useCallback(
    (by: number) =>
      setSelectedIndex((i) => (i === null ? i : (i + by + items.length) % items.length)),
    [items.length]
  );
  const prev = useCallback(() => step(-1), [step]);
  const next = useCallback(() => step(1), [step]);
  const close = useCallback(() => setSelectedIndex(null), []);

  if (items.length === 0) return null;

  return (
    <>
      <div className="group/reel relative overflow-hidden py-6 [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]">
        <div
          className="flex w-max animate-marquee group-hover/reel:[animation-play-state:paused]"
          style={{ animationDuration: `${Math.max(items.length, 4) * 7}s` }}
        >
          {[0, 1].map((set) => (
            <div key={set} className="flex shrink-0 gap-4 pr-4 sm:gap-6 sm:pr-6" aria-hidden={set === 1 || undefined}>
              {items.map((video, i) => {
                const key = `${set}-${video.id}`;
                return (
                  <VideoCard
                    key={key}
                    plain
                    video={video}
                    levelLabel={labelOf(video.level)}
                    isActive={activeKey === key}
                    onHoverStart={() => setActiveKey(key)}
                    onHoverEnd={() => setActiveKey((cur) => (cur === key ? null : cur))}
                    onOpen={() => setSelectedIndex(i)}
                    className={cn(
                      "w-[42vw] max-w-[260px] shrink-0 transition-transform duration-700 ease-premium sm:w-[230px]",
                      // leve sobe-e-desce alternado, para a faixa não ficar "reta" demais
                      i % 2 ? "translate-y-4" : "-translate-y-1",
                      "hover:-translate-y-3"
                    )}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <VideoModal
        video={selected}
        levelLabel={selected ? labelOf(selected.level) : ""}
        index={selectedIndex ?? 0}
        total={items.length}
        onPrev={prev}
        onNext={next}
        onClose={close}
      />
    </>
  );
}
