import { type ReactNode } from "react";
import MagneticButton from "./MagneticButton";
import { cn } from "@/lib/utils";

interface WhatsAppCTAProps {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline" | "ghost-light";
  className?: string;
  cursorLabel?: string;
}

const variantStyles: Record<NonNullable<WhatsAppCTAProps["variant"]>, string> = {
  solid:
    "bg-green text-white shadow-glow hover:bg-green-dark",
  outline:
    "border border-ink/15 text-ink hover:border-green hover:text-green-dark",
  "ghost-light":
    "border border-white/25 text-white hover:border-green hover:bg-white/5",
};

export default function WhatsAppCTA({
  href,
  children,
  variant = "solid",
  className,
  cursorLabel = "Abrir",
}: WhatsAppCTAProps) {
  return (
    <MagneticButton className={cn("inline-block", className?.includes("w-full") && "w-full")}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor={cursorLabel}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-colors duration-300",
          variantStyles[variant],
          className
        )}
      >
        {children}
      </a>
    </MagneticButton>
  );
}
