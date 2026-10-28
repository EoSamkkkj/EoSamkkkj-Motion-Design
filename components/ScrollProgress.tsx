"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** Barra verde no topo que enche conforme a página rola — como uma timeline. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26 });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[120] h-[3px] origin-left bg-gradient-to-r from-green-light via-green to-green-dark"
    />
  );
}
