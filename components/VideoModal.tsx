"use client";

import { useEffect, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { parseVideo, videoPlayerEmbed } from "@/lib/video";
import type { PortfolioVideo } from "@/lib/content-types";
import { DEFAULT_RATIO } from "./VideoCard";

interface VideoModalProps {
  video: PortfolioVideo | null;
  levelLabel: string;
  /** posição na lista atual, para "3 / 9" e as setas */
  index?: number;
  total?: number;
  onPrev?: () => void;
  onNext?: () => void;
  onClose: () => void;
  /** texto embaixo do vídeo (ex.: "Esse é o tipo de resultado…") */
  footer?: ReactNode;
}

export default function VideoModal({
  video,
  levelLabel,
  index = 0,
  total = 1,
  onPrev,
  onNext,
  onClose,
  footer,
}: VideoModalProps) {
  useEffect(() => {
    if (!video) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev?.();
      if (e.key === "ArrowRight") onNext?.();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [video, onClose, onPrev, onNext]);

  const src = video ? parseVideo(video.videoUrl) : null;
  const embed = src ? videoPlayerEmbed(src) : null;
  const ratio = video?.meta?.ratio ?? DEFAULT_RATIO;
  const many = total > 1;

  return (
    <AnimatePresence>
      {video && src && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`Projeto — ${video.category}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[95] flex items-center justify-center overflow-hidden bg-ink/95 p-4 backdrop-blur-md sm:p-8"
          onClick={onClose}
        >
          {/* a própria capa, desfocada, vira o fundo */}
          {video.meta?.thumbnail && (
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-25">
              <img
                key={video.id}
                src={video.meta.thumbnail}
                alt=""
                className="video-fade-in h-full w-full scale-125 object-cover blur-3xl"
              />
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex flex-col"
            style={{
              // ocupa o máximo da tela mantendo o formato do vídeo: sem bordas pretas
              width: `min(calc((100dvh - ${footer ? 12 : 9}rem) * ${ratio}), calc(100vw - 2rem), 64rem)`,
            }}
          >
            <div className="mb-3 flex items-center justify-between gap-3 text-white/80">
              <span className="min-w-0 truncate font-mono text-[11px] uppercase tracking-widest">
                {levelLabel} · {video.category}
                {many && (
                  <span className="ml-2 text-white/45">
                    {index + 1} / {total}
                  </span>
                )}
              </span>
              <motion.button
                type="button"
                onClick={onClose}
                aria-label="Fechar vídeo"
                data-cursor="Fechar"
                whileHover={{ rotate: 90, scale: 1.1 }}
                whileTap={{ scale: 0.85 }}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-green hover:text-green"
              >
                <X size={18} />
              </motion.button>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={video.id}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.2 }}
                style={{ aspectRatio: ratio }}
                className="w-full overflow-hidden rounded-2xl bg-black shadow-2xl ring-1 ring-white/10"
              >
                {embed ? (
                  <iframe
                    src={embed}
                    title={`Projeto ${video.category}`}
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full"
                  />
                ) : src.kind === "file" ? (
                  <video src={src.url} controls autoPlay playsInline className="h-full w-full bg-black object-cover" />
                ) : null}
              </motion.div>
            </AnimatePresence>

            {footer && (
              <p className="mt-4 text-balance text-center text-sm leading-relaxed text-white/80">{footer}</p>
            )}

            {many && (
              <>
                {/* setas ao lado do vídeo no PC, embaixo no celular */}
                <div className="mt-4 flex justify-center gap-3 sm:hidden">
                  <NavButton dir="prev" onClick={onPrev} />
                  <NavButton dir="next" onClick={onNext} />
                </div>
                <div className="pointer-events-none absolute inset-y-0 -left-20 -right-20 hidden items-center justify-between pt-12 sm:flex">
                  <NavButton dir="prev" onClick={onPrev} />
                  <NavButton dir="next" onClick={onNext} />
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function NavButton({ dir, onClick }: { dir: "prev" | "next"; onClick?: () => void }) {
  const Icon = dir === "prev" ? ChevronLeft : ChevronRight;
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={dir === "prev" ? "Vídeo anterior" : "Próximo vídeo"}
      data-cursor={dir === "prev" ? "Anterior" : "Próximo"}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.88 }}
      className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white backdrop-blur-md transition-colors hover:border-green hover:bg-green"
    >
      <Icon size={22} />
    </motion.button>
  );
}
