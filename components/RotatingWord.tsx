"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

interface RotatingWordProps {
  words: string[];
  interval?: number;
  className?: string;
}

/** Troca a palavra em loop, cada letra entrando com mola — como um texto animado no AE. */
export default function RotatingWord({ words, interval = 2400, className }: RotatingWordProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words.length, interval]);

  const word = words[index];

  return (
    <span className={`relative inline-flex ${className ?? ""}`} aria-live="polite">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span key={word} className="inline-flex whitespace-nowrap" aria-label={word}>
          {word.split("").map((ch, i) => (
            <motion.span
              key={i}
              aria-hidden="true"
              initial={{ y: "0.6em", opacity: 0, rotate: 8, filter: "blur(6px)" }}
              animate={{ y: 0, opacity: 1, rotate: 0, filter: "blur(0px)" }}
              exit={{ y: "-0.5em", opacity: 0, filter: "blur(6px)", transition: { duration: 0.18, delay: i * 0.015 } }}
              transition={{ type: "spring", stiffness: 420, damping: 22, delay: i * 0.035 }}
              className="inline-block"
            >
              {ch === " " ? " " : ch}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
