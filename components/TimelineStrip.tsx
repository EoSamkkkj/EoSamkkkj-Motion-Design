"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimate } from "motion/react";

// Uma "timeline do After Effects" decorativa: camadas com keyframes e um
// playhead que corre sem parar. Tocar num keyframe faz ele girar.

const LAYERS = [
  { name: "Logo", color: "bg-green", keys: [6, 22, 48, 71] },
  { name: "Texto", color: "bg-green-dark", keys: [14, 36, 58, 88] },
  { name: "Forma", color: "bg-[#6FE3A0]", keys: [4, 30, 64, 80] },
];

const DURATION = 8; // segundos para o playhead atravessar

function Keyframe({ left, color }: { left: number; color: string }) {
  const [scope, animate] = useAnimate();
  return (
    <motion.button
      ref={scope}
      type="button"
      tabIndex={-1}
      initial={{ rotate: 45 }}
      whileHover={{ scale: 1.5 }}
      onClick={() => animate(scope.current, { rotate: [45, 405], scale: [1, 1.7, 1] }, { duration: 0.6, ease: [0.16, 1, 0.3, 1] })}
      className={`kf-key absolute top-[calc(50%-6px)] -ml-1.5 h-3 w-3 rounded-[2px] ${color}`}
      style={{ left: `${left}%`, animationDelay: `${(left / 100) * DURATION}s` }}
    />
  );
}

export default function TimelineStrip() {
  const timecode = useRef<HTMLSpanElement>(null);

  // timecode acompanhando o playhead (mesmo ciclo da animação CSS)
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const start = performance.now();
    let raf = 0;
    const pad = (n: number) => String(n).padStart(2, "0");
    const tick = (now: number) => {
      const t = ((now - start) / 1000) % DURATION;
      const frames = Math.floor((t % 1) * 30);
      if (timecode.current) timecode.current.textContent = `00:00:${pad(Math.floor(t))}:${pad(frames)}`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="relative z-10 mx-auto mt-14 max-w-content px-6 sm:px-8 lg:px-12" aria-hidden="true">
      <div className="overflow-hidden rounded-2xl border border-ink/10 bg-white/70 shadow-soft backdrop-blur">
        <div className="flex items-center justify-between border-b border-ink/10 px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-steel">
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" /> Comp 1 · 30 fps
          </span>
          <span ref={timecode} className="tabular-nums text-green-dark">00:00:00:00</span>
        </div>
        <div className="relative">
          {LAYERS.map((layer) => (
            <div key={layer.name} className="flex h-9 items-center border-b border-ink/5 last:border-0">
              <span className="w-16 shrink-0 border-r border-ink/5 px-3 font-mono text-[10px] text-graphite sm:w-24">
                {layer.name}
              </span>
              <div className="relative h-full flex-1">
                <div className={`absolute inset-y-2.5 left-[3%] right-[6%] rounded-full opacity-15 ${layer.color}`} />
                {layer.keys.map((k) => (
                  <Keyframe key={k} left={k} color={layer.color} />
                ))}
              </div>
            </div>
          ))}
          {/* playhead */}
          <div className="pointer-events-none absolute inset-y-0 left-16 right-0 sm:left-24">
            <div className="playhead absolute inset-y-0 w-px bg-red-500" style={{ animationDuration: `${DURATION}s` }}>
              <span className="absolute -left-[5px] -top-1 h-2.5 w-2.5 rotate-45 bg-red-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
