"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { parseVideo, videoPlayerEmbed } from "@/lib/video";
import type { PortfolioVideo } from "@/lib/content-types";

interface VideoModalProps {
  video: PortfolioVideo | null;
  levelLabel: string;
  onClose: () => void;
}

export default function VideoModal({ video, levelLabel, onClose }: VideoModalProps) {
  useEffect(() => {
    if (!video) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [video, onClose]);

  const src = video ? parseVideo(video.videoUrl) : null;
  const embed = src ? videoPlayerEmbed(src) : null;

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
          className="fixed inset-0 z-[95] flex items-center justify-center bg-ink/95 p-4 sm:p-8"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30, rotateX: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl"
          >
            <div className="mb-3 flex items-center justify-between text-white/80">
              <span className="font-mono text-xs uppercase tracking-widest">
                {levelLabel} · {video.category}
              </span>
              <motion.button
                type="button"
                onClick={onClose}
                aria-label="Fechar vídeo"
                data-cursor="Fechar"
                whileHover={{ rotate: 90, scale: 1.1 }}
                whileTap={{ scale: 0.85 }}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-green hover:text-green"
              >
                <X size={18} />
              </motion.button>
            </div>
            <div className="aspect-video w-full overflow-hidden rounded-xl bg-black shadow-2xl">
              {embed ? (
                <iframe
                  src={embed}
                  title={`Projeto ${video.category}`}
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full"
                />
              ) : src.kind === "file" ? (
                <video src={src.url} controls autoPlay playsInline className="h-full w-full bg-black object-contain" />
              ) : null}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
