"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import ProcessStep from "./ProcessStep";
import { processSteps } from "@/data/tools";

export default function ProcessTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 55%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <div ref={ref} className="relative">
      {/* linha horizontal — desktop */}
      <div className="pointer-events-none absolute left-0 right-0 top-6 hidden h-px bg-ink/10 lg:block" />
      <motion.div
        style={{ scaleX: progress }}
        className="pointer-events-none absolute left-0 right-0 top-6 hidden h-px origin-left bg-green lg:block"
      />

      {/* linha vertical — mobile/tablet */}
      <div className="pointer-events-none absolute bottom-0 left-6 top-0 w-px bg-ink/10 lg:hidden" />
      <motion.div
        style={{ scaleY: progress }}
        className="pointer-events-none absolute bottom-0 left-6 top-0 w-px origin-top bg-green lg:hidden"
      />

      <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-5 lg:gap-6">
        {processSteps.map((step, i) => (
          <ProcessStep
            key={step.number}
            number={step.number}
            title={step.title}
            description={step.description}
            delay={i * 0.08}
          />
        ))}
      </div>
    </div>
  );
}
