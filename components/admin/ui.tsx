"use client";

import { type ReactNode } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export const uid = (prefix: string) =>
  `${prefix}${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;

export const slugify = (text: string) =>
  text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40);

/** Move o item i uma posição para cima (-1) ou para baixo (+1). */
export function moveItem<T>(list: T[], i: number, dir: -1 | 1): T[] {
  const j = i + dir;
  if (j < 0 || j >= list.length) return list;
  const next = [...list];
  [next[i], next[j]] = [next[j], next[i]];
  return next;
}

export function Card({ title, subtitle, actions, children, className }: {
  title?: ReactNode;
  subtitle?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.section
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      className={cn("rounded-3xl border border-ink/10 bg-white p-5 shadow-soft sm:p-7", className)}
    >
      {(title || actions) && (
        <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
          <div>
            {title && <h2 className="font-display text-xl font-semibold tracking-tight text-ink">{title}</h2>}
            {subtitle && <p className="mt-1 text-sm text-steel">{subtitle}</p>}
          </div>
          {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
        </div>
      )}
      {children}
    </motion.section>
  );
}

export function Field({ label, hint, children, className }: {
  label: string;
  hint?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("flex flex-col gap-1.5", className)}>
      <span className="text-xs font-medium uppercase tracking-wider text-steel">{label}</span>
      {children}
      {hint && <span className="text-xs text-steel/80">{hint}</span>}
    </label>
  );
}

export const inputClass =
  "w-full rounded-xl border border-ink/10 bg-cloud/60 px-3.5 py-2.5 text-sm text-ink outline-none transition placeholder:text-steel/60 focus:border-green focus:bg-white focus:ring-4 focus:ring-green/10";

export function IconButton({ label, onClick, children, tone = "default", disabled }: {
  label: string;
  onClick: () => void;
  children: ReactNode;
  tone?: "default" | "danger" | "active";
  disabled?: boolean;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      whileHover={{ scale: disabled ? 1 : 1.1 }}
      whileTap={{ scale: disabled ? 1 : 0.85 }}
      className={cn(
        "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors disabled:opacity-30",
        tone === "danger" && "border-red-200 text-red-500 hover:bg-red-50",
        tone === "active" && "border-green bg-green text-white",
        tone === "default" && "border-ink/10 text-graphite hover:border-green hover:text-green-dark"
      )}
    >
      {children}
    </motion.button>
  );
}

export function Button({ children, onClick, variant = "dark", disabled, type = "button", className }: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "dark" | "green" | "outline";
  disabled?: boolean;
  type?: "button" | "submit";
  className?: string;
}) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.03 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40",
        variant === "dark" && "bg-ink text-white hover:bg-graphite",
        variant === "green" && "bg-green text-white shadow-glow hover:bg-green-dark",
        variant === "outline" && "border border-ink/15 text-ink hover:border-green hover:text-green-dark",
        className
      )}
    >
      {children}
    </motion.button>
  );
}
