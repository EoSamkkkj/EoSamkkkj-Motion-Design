"use client";

import { useCallback, useState } from "react";
import { createWhatsAppLinkDefault, whatsappMessages } from "@/lib/whatsapp";
import type { PortfolioLevel, PortfolioVideo } from "@/lib/content-types";
import VideoCard from "./VideoCard";
import VideoModal from "./VideoModal";

interface PortfolioGridProps {
  items: PortfolioVideo[];
  levels: PortfolioLevel[];
}

export default function PortfolioGrid({ items, levels }: PortfolioGridProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
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

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-ink/15 px-8 py-16 text-center">
        <p className="text-graphite">
          Ainda não há exemplos deste nível no portfólio.
        </p>
        <a
          href={createWhatsAppLinkDefault(whatsappMessages.geral)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block text-sm font-medium text-green-dark underline underline-offset-4"
        >
          Fale comigo para ver mais opções
        </a>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
        {items.map((video, i) => (
          <VideoCard
            key={video.id}
            video={video}
            levelLabel={labelOf(video.level)}
            isActive={activeId === video.id}
            onHoverStart={() => setActiveId(video.id)}
            onHoverEnd={() => setActiveId((cur) => (cur === video.id ? null : cur))}
            onOpen={() => setSelectedIndex(i)}
          />
        ))}
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
