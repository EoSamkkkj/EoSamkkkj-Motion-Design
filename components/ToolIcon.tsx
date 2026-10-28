"use client";

import Image from "next/image";
import { motion, useAnimate } from "motion/react";

interface ToolIconProps {
  id: string;
}

const logos: Record<string, { src: string; alt: string }> = {
  figma: { src: "/logos/figma.png", alt: "Figma" },
  "after-effects": { src: "/logos/after-effects.png", alt: "Adobe After Effects" },
  "premiere-pro": { src: "/logos/premiere-pro.png", alt: "Adobe Premiere Pro" },
};

/** Logo da ferramenta: balança no hover e dá um giro com pulo ao clicar/tocar. */
export default function ToolIcon({ id }: ToolIconProps) {
  const [scope, animate] = useAnimate();
  const logo = logos[id];
  if (!logo) return null;

  const play = () =>
    animate(
      scope.current,
      { rotate: [0, -20, 360], y: [0, -18, 0], scale: [1, 1.25, 1] },
      { duration: 0.75, ease: [0.16, 1, 0.3, 1] }
    );

  return (
    <motion.button
      ref={scope}
      type="button"
      onClick={play}
      whileHover={{ rotate: -8, scale: 1.12 }}
      whileTap={{ scale: 0.9 }}
      data-cursor="Clique"
      aria-label={`Animar ícone do ${logo.alt}`}
      className="relative h-11 w-11 overflow-hidden rounded-xl shadow-soft"
    >
      <Image src={logo.src} alt={logo.alt} fill sizes="44px" className="object-cover" />
    </motion.button>
  );
}
