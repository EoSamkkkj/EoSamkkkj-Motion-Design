"use client";

import { useState } from "react";
import { ArrowUpRight, Play } from "lucide-react";
import { motion } from "motion/react";
import {
  getVimeoId,
  vimeoPreviewSrc,
  vimeoThumbnailSrc,
} from "@/lib/vimeo";
import { levelLabels, type PortfolioVideo } from "@/data/portfolio";
import { cn } from "@/lib/utils";

interface VideoCardProps {
  video: PortfolioVideo;
  isActive: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onOpen: () => void;
}

export default function VideoCard({
  video,
  isActive,
  onHoverStart,
  onHoverEnd,
  onOpen,
}: VideoCardProps) {
  const [thumbLoaded, setThumbLoaded] = useState(false);
  const id = getVimeoId(video.videoUrl);

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      data-cursor="Play"
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ type: "spring", stiffness: 240, damping: 17, mass: 0.7 }}
      className="group relative block aspect-[4/5] w-full overflow-hidden rounded-2xl bg-ink text-left shadow-soft"
      aria-label={`Assistir projeto de ${levelLabels[video.level]} — ${video.category}`}
    >
      {/* thumbnail */}
      <img
        src={vimeoThumbnailSrc(id)}
        alt=""
        loading="lazy"
        onLoad={() => setThumbLoaded(true)}
        className={cn(
          "absolute inset-0 h-full w-full object-cover transition-all duration-700",
          thumbLoaded ? "opacity-100" : "opacity-0",
          isActive ? "scale-105 opacity-0" : "scale-100 opacity-100 group-hover:scale-105"
        )}
      />

      {/* preview silencioso, só monta quando ativo (hover no desktop) */}
      {isActive && (
        <iframe
          src={vimeoPreviewSrc(id)}
          title=""
          tabIndex={-1}
          allow="autoplay"
          className="video-fade-in pointer-events-none absolute inset-0 h-full w-full scale-[1.02] object-cover"
        />
      )}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />

      <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/40 text-white transition-transform duration-300 group-hover:scale-110">
        <Play size={14} className="ml-0.5 fill-white" />
      </span>

      <div className="absolute inset-x-4 bottom-4 flex items-center justify-between text-white">
        <span className="text-sm font-medium">
          Assistir projeto
        </span>
        <span className="flex items-center gap-1 text-sm font-medium">
          {video.duration && (
            <span className="font-mono text-xs text-white/70">{video.duration}</span>
          )}
          <ArrowUpRight size={16} />
        </span>
      </div>
    </motion.button>
  );
}
