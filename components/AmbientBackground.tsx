"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

const blobs = [
  {
    className: "left-[-10%] top-[-8%] h-[520px] w-[520px] bg-green",
    duration: 22,
    move: { x: [0, 40, -20, 0], y: [0, 30, 10, 0], scale: [1, 1.08, 0.96, 1] },
  },
  {
    className: "right-[-14%] top-[18%] h-[620px] w-[620px] bg-green-dark",
    duration: 28,
    move: { x: [0, -35, 15, 0], y: [0, 20, -25, 0], scale: [1, 0.95, 1.06, 1] },
  },
  {
    className: "bottom-[-16%] left-[18%] h-[560px] w-[560px] bg-green-light",
    duration: 25,
    move: { x: [0, 25, -30, 0], y: [0, -20, 15, 0], scale: [1, 1.05, 0.98, 1] },
  },
];

export default function AmbientBackground() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          animate={reduceMotion ? undefined : blob.move}
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          className={`absolute rounded-full opacity-[0.09] blur-3xl ${blob.className}`}
        />
      ))}
    </div>
  );
}
