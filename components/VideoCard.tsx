"use client";

import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import { motion } from "motion/react";
import { parseVideo, videoPreviewEmbed, videoThumbnail } from "@/lib/video";
import type { PortfolioVideo } from "@/lib/content-types";
import { cn } from "@/lib/utils";
import Tilt from "./Tilt";

interface VideoCardProps {
  video: PortfolioVideo;
  levelLabel: string;
  isActive: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onOpen: () => void;
  /** sem animação de entrada nem tilt (usado na faixa do início) */
  plain?: boolean;
  className?: string;
}

/** Formato padrão quando o Vimeo/YouTube não informa: vertical, como os Reels. */
export const DEFAULT_RATIO = 9 / 16;

export default function VideoCard({
  video,
  levelLabel,
  isActive,
  onHoverStart,
  onHoverEnd,
  onOpen,
  plain = false,
  className,
}: VideoCardProps) {
  const [thumbLoaded, setThumbLoaded] = useState(false);
  // a capa só sai de cena quando o preview já está tocando — sem flash preto
  const [previewReady, setPreviewReady] = useState(false);
  const src = parseVideo(video.videoUrl);
  const thumb = video.meta?.thumbnail ?? videoThumbnail(src);
  const preview = videoPreviewEmbed(src);
  const ratio = video.meta?.ratio ?? DEFAULT_RATIO;
  const duration = video.duration ?? video.meta?.duration;

  const frameRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!isActive) {
      setPreviewReady(false);
      return;
    }
    // o player do Vimeo avisa quando o vídeo realmente começou a andar
    const onMessage = (e: MessageEvent) => {
      if (e.source !== frameRef.current?.contentWindow) return;
      try {
        const data = typeof e.data === "string" ? JSON.parse(e.data) : e.data;
        if (data?.event === "playProgress" || data?.event === "play") setPreviewReady(true);
      } catch {}
    };
    window.addEventListener("message", onMessage);
    // garantia para players que não avisam (YouTube)
    const fallback = window.setTimeout(() => setPreviewReady(true), src.kind === "vimeo" ? 4000 : 1500);
    return () => {
      window.removeEventListener("message", onMessage);
      window.clearTimeout(fallback);
    };
  }, [isActive, src.kind]);

  function listenToPlayer() {
    const win = frameRef.current?.contentWindow;
    if (!win || src.kind !== "vimeo") return;
    for (const value of ["play", "playProgress"]) {
      win.postMessage(JSON.stringify({ method: "addEventListener", value }), "https://player.vimeo.com");
    }
  }

  const card = (
    <button
      type="button"
      onClick={onOpen}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      onFocus={onHoverStart}
      onBlur={onHoverEnd}
      data-cursor="Play"
      style={{ aspectRatio: ratio }}
      className="group relative block w-full overflow-hidden rounded-2xl bg-ink text-left shadow-soft ring-1 ring-ink/5 transition-shadow duration-500 hover:shadow-glow"
      aria-label={`Assistir projeto de ${levelLabel} — ${video.category}`}
    >
      {/* preview silencioso, só monta quando ativo (hover no desktop) */}
      {isActive &&
        (preview ? (
          <iframe
            src={preview}
            title=""
            tabIndex={-1}
            allow="autoplay"
            ref={frameRef}
            onLoad={listenToPlayer}
            className="pointer-events-none absolute inset-0 h-full w-full scale-[1.03]"
          />
        ) : src.kind === "file" ? (
          <video
            src={src.url}
            autoPlay
            muted
            loop
            playsInline
            onPlaying={() => setPreviewReady(true)}
            className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          />
        ) : null)}

      {/* capa */}
      {thumb ? (
        <img
          src={thumb}
          alt=""
          loading="lazy"
          // capa que veio do cache pode terminar antes do React assumir a página
          ref={(el) => {
            if (el?.complete && el.naturalWidth) setThumbLoaded(true);
          }}
          onLoad={() => setThumbLoaded(true)}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-700 ease-premium",
            !thumbLoaded && "opacity-0",
            isActive && previewReady ? "scale-105 opacity-0" : "group-hover:scale-105"
          )}
        />
      ) : src.kind === "file" && !isActive ? (
        <video
          src={`${src.url}#t=0.5`}
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : null}

      {/* brilho enquanto a capa carrega */}
      {thumb && !thumbLoaded && <span className="shimmer absolute inset-0" />}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/0 via-45% to-ink/25" />

      <span className="absolute left-3 top-3 rounded-full bg-black/35 px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest text-white backdrop-blur-md sm:left-4 sm:top-4 sm:text-[10px]">
        {video.category}
      </span>

      {/* play central, some quando o preview começa */}
      <span
        className={cn(
          "absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white backdrop-blur-md transition-all duration-500 ease-premium sm:h-14 sm:w-14",
          "group-hover:scale-110 group-hover:border-green group-hover:bg-green",
          isActive && previewReady && "scale-75 opacity-0"
        )}
      >
        <Play size={18} className="ml-0.5 fill-white" />
      </span>

      <div className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-2 text-white sm:inset-x-4 sm:bottom-4">
        <span className="text-xs font-medium sm:text-sm">{levelLabel}</span>
        {duration && (
          <span className="rounded-md bg-black/40 px-1.5 py-0.5 font-mono text-[10px] text-white/90 backdrop-blur-md sm:text-xs">
            {duration}
          </span>
        )}
      </div>
    </button>
  );

  if (plain) return <div className={className}>{card}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ type: "spring", stiffness: 240, damping: 17, mass: 0.7 }}
    >
      <Tilt className="rounded-2xl">{card}</Tilt>
    </motion.div>
  );
}
