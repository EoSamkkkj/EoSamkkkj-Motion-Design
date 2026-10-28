"use client";

import { motion, useAnimate } from "motion/react";
import RevealText from "./RevealText";

interface ProcessStepProps {
  number: string;
  title: string;
  description: string;
  delay?: number;
}

export default function ProcessStep({ number, title, description, delay = 0 }: ProcessStepProps) {
  const [scope, animate] = useAnimate();

  const play = () =>
    animate(scope.current, { scale: [1, 1.35, 0.9, 1], rotate: [0, 12, -8, 0] }, { duration: 0.6 });

  return (
    <RevealText delay={delay} className="group relative flex flex-row items-start gap-4 lg:flex-col">
      <motion.button
        ref={scope}
        type="button"
        onClick={play}
        whileHover={{ scale: 1.12 }}
        data-cursor={title}
        aria-label={`Etapa ${number}: ${title}`}
        className="step-dot relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-green bg-white font-mono text-sm font-medium text-green-dark transition-colors group-hover:bg-green group-hover:text-white"
        style={{ ["--dl" as string]: `${delay * 6}s` }}
      >
        {number}
      </motion.button>
      <div className="pt-1 lg:pt-0">
        <h3 className="font-display text-lg font-semibold tracking-tight text-ink">
          {title}
        </h3>
        <p className="mt-1.5 max-w-[220px] text-sm leading-relaxed text-graphite">
          {description}
        </p>
      </div>
    </RevealText>
  );
}
