import { type ReactNode } from "react";
import RevealText from "./RevealText";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  headline: ReactNode;
  text?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  headline,
  text,
  align = "left",
  tone = "dark",
  className,
}: SectionHeadingProps) {
  const isCenter = align === "center";
  const isLight = tone === "light";

  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        isCenter && "items-center text-center",
        className
      )}
    >
      {eyebrow && (
        <RevealText
          as="span"
          className={cn(
            "font-mono text-xs uppercase tracking-[0.2em]",
            isLight ? "text-green-light" : "text-green-dark"
          )}
        >
          {eyebrow}
        </RevealText>
      )}
      <RevealText
        as="h2"
        delay={0.05}
        className={cn(
          "font-display text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl",
          isLight ? "text-white" : "text-ink",
          isCenter && "max-w-3xl"
        )}
      >
        {headline}
      </RevealText>
      {text && (
        <RevealText
          as="p"
          delay={0.1}
          className={cn(
            "max-w-xl text-balance text-base leading-relaxed sm:text-lg",
            isLight ? "text-white/70" : "text-graphite",
            isCenter && "max-w-2xl"
          )}
        >
          {text}
        </RevealText>
      )}
    </div>
  );
}
