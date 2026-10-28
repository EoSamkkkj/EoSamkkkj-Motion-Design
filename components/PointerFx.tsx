"use client";

import { useEffect } from "react";

// Rastro de "keyframes" (os losangos do After Effects) que segue o mouse
// ou o dedo, e uma explosão de keyframes + anel a cada clique/toque.
// Tudo em DOM puro com animações CSS (classes .kf e .kf-ring no
// globals.css), com limite de elementos vivos para não pesar.

const COLORS = ["#00A651", "#6FE3A0", "#007A3E", "#D1F0D7"];
const MAX_ALIVE = 45;

export default function PointerFx() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let alive = 0;
    let last = 0;

    const spawn = (x: number, y: number, burst: boolean) => {
      if (alive >= MAX_ALIVE) return;
      const el = document.createElement("span");
      el.className = "kf";
      const size = burst ? 8 + Math.random() * 10 : 5 + Math.random() * 7;
      const angle = Math.random() * Math.PI * 2;
      const dist = burst ? 50 + Math.random() * 80 : 10 + Math.random() * 30;
      el.style.cssText = [
        `--s:${size}px`,
        `--c:${COLORS[Math.floor(Math.random() * COLORS.length)]}`,
        `--x:${x}px`,
        `--y:${y}px`,
        `--dx:${Math.cos(angle) * dist}px`,
        `--dy:${Math.sin(angle) * dist + (burst ? 0 : 18)}px`,
        `--d:${burst ? 0.8 : 0.7}s`,
      ].join(";");
      document.body.appendChild(el);
      alive++;
      el.addEventListener("animationend", () => {
        el.remove();
        alive--;
      });
    };

    const ring = (x: number, y: number) => {
      const el = document.createElement("span");
      el.className = "kf-ring";
      el.style.cssText = `--x:${x}px;--y:${y}px`;
      document.body.appendChild(el);
      el.addEventListener("animationend", () => el.remove());
    };

    const onMove = (e: PointerEvent) => {
      const now = performance.now();
      if (now - last < (e.pointerType === "touch" ? 28 : 40)) return;
      last = now;
      spawn(e.clientX, e.clientY, false);
    };

    const onDown = (e: PointerEvent) => {
      ring(e.clientX, e.clientY);
      for (let i = 0; i < 8; i++) spawn(e.clientX, e.clientY, true);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
    };
  }, []);

  return null;
}
