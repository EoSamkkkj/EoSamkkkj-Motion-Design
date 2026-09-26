"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

function useParallax(range: number) {
  const raw = useMotionValue(0);
  const spring = useSpring(raw, { stiffness: 60, damping: 18, mass: 0.6 });
  const output = useTransform(spring, [-1, 1], [-range, range]);
  return { raw, output };
}

export default function FloatingShape() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const px = useParallax(18);
  const py = useParallax(18);
  const tiltX = useSpring(useMotionValue(0), { stiffness: 50, damping: 16 });
  const tiltY = useSpring(useMotionValue(0), { stiffness: 50, damping: 16 });

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(hover: none)").matches;
    if (reduceMotion || isTouch || !wrapRef.current) return;

    const el = wrapRef.current;
    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      px.raw.set(nx * 2);
      py.raw.set(ny * 2);
      tiltX.set(ny * -8);
      tiltY.set(nx * 8);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [px.raw, py.raw, tiltX, tiltY]);

  return (
    <div
      ref={wrapRef}
      className="relative mx-auto aspect-square w-full max-w-[440px]"
      aria-hidden="true"
    >
      {/* grid de fundo */}
      <div className="bg-grid absolute inset-[-10%] rounded-[3rem] opacity-60 [mask-image:radial-gradient(closest-side,black,transparent)]" />

      {/* glow verde suave atrás do painel */}
      <motion.div
        style={{ x: px.output, y: py.output }}
        className="absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-green/25 blur-[70px]"
      />

      {/* cubo pequeno, plano de profundidade distante */}
      <motion.div
        style={{
          x: useTransform(px.output, (v) => v * -1.4),
          y: useTransform(py.output, (v) => v * -1.4),
        }}
        className="glass absolute right-[6%] top-[10%] h-14 w-14 rotate-12 rounded-xl shadow-soft sm:h-16 sm:w-16"
      >
        <div className="h-full w-full rounded-xl bg-gradient-to-br from-green/70 to-green-dark/40" />
      </motion.div>

      {/* cubo pequeno, segundo plano */}
      <motion.div
        style={{
          x: useTransform(px.output, (v) => v * 1.1),
          y: useTransform(py.output, (v) => v * 1.1),
        }}
        className="glass absolute bottom-[14%] left-[4%] h-10 w-10 -rotate-6 rounded-lg shadow-soft"
      >
        <div className="h-full w-full rounded-lg bg-gradient-to-br from-green-light to-white/40" />
      </motion.div>

      {/* painel de vidro central com a logo */}
      <motion.div
        style={{
          x: px.output,
          y: py.output,
          rotateX: tiltX,
          rotateY: tiltY,
          transformPerspective: 800,
        }}
        className="glass absolute left-1/2 top-1/2 flex h-[62%] w-[62%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[2rem] p-[10%] shadow-glow"
      >
        <div className="relative flex h-full w-full items-center justify-center rounded-[1.4rem] bg-gradient-to-br from-green to-green-dark p-[16%] shadow-inner">
          <div className="relative h-full w-full">
            <Image
              src="/logo/logo-white.png"
              alt=""
              fill
              className="object-contain drop-shadow-[0_6px_18px_rgba(0,0,0,0.2)]"
            />
          </div>
        </div>
      </motion.div>

      {/* crosshair, ancorado ao canto */}
      <svg
        className="absolute right-[2%] bottom-[8%] h-9 w-9 text-green-dark/70"
        viewBox="0 0 32 32"
        fill="none"
      >
        <circle cx="16" cy="16" r="9" stroke="currentColor" strokeWidth="1.2" />
        <path d="M16 2v8M16 22v8M2 16h8M22 16h8" stroke="currentColor" strokeWidth="1.2" />
      </svg>

      {/* linha de timeline com marcadores de keyframe */}
      <div className="absolute inset-x-[10%] bottom-[-2%] flex items-center gap-0">
        <div className="h-px flex-1 bg-ink/15" />
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="mx-2 h-2.5 w-2.5 shrink-0 rotate-45 bg-green"
            style={{ opacity: i === 1 ? 1 : 0.35 }}
          />
        ))}
        <div className="h-px flex-1 bg-ink/15" />
      </div>
    </div>
  );
}
