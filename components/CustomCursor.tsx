"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [isPointer, setIsPointer] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springConfig = { damping: 26, stiffness: 260, mass: 0.4 };
  const ringX = useSpring(x, springConfig);
  const ringY = useSpring(y, springConfig);

  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canHover || reduceMotion) return;
    setEnabled(true);

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);

      const target = e.target as HTMLElement | null;
      const interactive = target?.closest<HTMLElement>(
        "[data-cursor]"
      );
      setIsPointer(!!target?.closest("a, button"));
      setLabel(interactive?.dataset.cursor ?? null);
    };

    const leave = () => setVisible(false);

    window.addEventListener("pointermove", move);
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[100] hidden md:block"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 0.2s" }}
      aria-hidden="true"
    >
      <motion.div
        className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-green"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      />
      <motion.div
        className="fixed left-0 top-0 flex items-center justify-center rounded-full border border-green/50 bg-green/5 backdrop-blur-[1px]"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          width: label ? 64 : isPointer ? 44 : 28,
          height: label ? 64 : isPointer ? 44 : 28,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
      >
        {label && (
          <span className="font-mono text-[10px] uppercase tracking-widest text-green-dark">
            {label}
          </span>
        )}
      </motion.div>
    </div>
  );
}
