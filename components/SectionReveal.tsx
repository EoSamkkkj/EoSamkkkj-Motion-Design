"use client";

import { type ReactNode } from "react";
import { motion } from "motion/react";

export default function SectionReveal({
  id,
  children,
  className = "",
  immediate = false,
}: {
  id: string;
  children: ReactNode;
  className?: string;
  /** primeira dobra: aparece já no carregamento, sem esperar o JavaScript */
  immediate?: boolean;
}) {
  if (immediate) {
    return (
      <section id={id} className={`scroll-mt-[76px] ${className}`}>
        {children}
      </section>
    );
  }

  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 44, scale: 0.975 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ type: "spring", stiffness: 130, damping: 16, mass: 0.8 }}
      className={`scroll-mt-[76px] ${className}`}
    >
      {children}
    </motion.section>
  );
}
