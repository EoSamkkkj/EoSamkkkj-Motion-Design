"use client";

import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TiltProps {
  children: ReactNode;
  className?: string;
  /** inclinação máxima em graus */
  max?: number;
}

/**
 * Inclina o conteúdo em 3D seguindo o mouse ou o dedo, com um brilho
 * verde que acompanha o ponteiro. Volta ao lugar quando o ponteiro sai.
 */
export default function Tilt({ children, className, max = 10 }: TiltProps) {
  const ref = useRef<HTMLDivElement>(null);

  const move = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--rx", `${(0.5 - py) * max}deg`);
    el.style.setProperty("--ry", `${(px - 0.5) * max}deg`);
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
    el.dataset.tilting = "true";
  };

  const reset = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    delete el.dataset.tilting;
  };

  return (
    <div
      ref={ref}
      onPointerMove={move}
      onPointerLeave={reset}
      onPointerCancel={reset}
      className={cn("tilt", className)}
    >
      {children}
      <span aria-hidden="true" className="tilt-glare" />
    </div>
  );
}
