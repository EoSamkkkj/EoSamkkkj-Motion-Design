"use client";

import { useState } from "react";
import { createWhatsAppLinkDefault, whatsappMessages } from "@/lib/whatsapp";
import type { PortfolioVideo } from "@/data/portfolio";
import VideoCard from "./VideoCard";
import VideoModal from "./VideoModal";

interface PortfolioGridProps {
  items: PortfolioVideo[];
}

export default function PortfolioGrid({ items }: PortfolioGridProps) {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [selected, setSelected] = useState<PortfolioVideo | null>(null);

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
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((video) => (
          <VideoCard
            key={video.id}
            video={video}
            isActive={activeId === video.id}
            onHoverStart={() => setActiveId(video.id)}
            onHoverEnd={() => setActiveId((cur) => (cur === video.id ? null : cur))}
            onOpen={() => setSelected(video)}
          />
        ))}
      </div>
      <VideoModal video={selected} onClose={() => setSelected(null)} />
    </>
  );
}
