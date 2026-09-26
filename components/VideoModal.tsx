"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { getVimeoId, vimeoPlayerSrc } from "@/lib/vimeo";
import { levelLabels, type PortfolioVideo } from "@/data/portfolio";

interface VideoModalProps {
  video: PortfolioVideo | null;
  onClose: () => void;
}

export default function VideoModal({ video, onClose }: VideoModalProps) {
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

  return (
    <AnimatePresence>
      {video && (
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
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl"
          >
            <div className="mb-3 flex items-center justify-between text-white/80">
              <span className="font-mono text-xs uppercase tracking-widest">
                {levelLabels[video.level]} · {video.category}
              </span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Fechar vídeo"
                data-cursor="Fechar"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-green hover:text-green"
              >
                <X size={18} />
              </button>
            </div>
            <div className="aspect-video w-full overflow-hidden rounded-xl bg-black shadow-2xl">
              <iframe
                src={vimeoPlayerSrc(getVimeoId(video.videoUrl))}
                title={`Projeto ${video.category}`}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
