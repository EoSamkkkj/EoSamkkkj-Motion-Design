"use client";

import { motion } from "motion/react";
import type { PortfolioLevel } from "@/lib/content-types";
import { cn } from "@/lib/utils";

export type FilterValue = "todos" | string;

interface PortfolioFiltersProps {
  levels: PortfolioLevel[];
  value: FilterValue;
  onChange: (value: FilterValue) => void;
}

export default function PortfolioFilters({ levels, value, onChange }: PortfolioFiltersProps) {
  const options = [{ value: "todos", label: "Todos" }, ...levels.map((l) => ({ value: l.id, label: l.label }))];

  return (
    <div
      className="flex flex-wrap gap-2"
      role="group"
      aria-label="Filtrar projetos por nível"
    >
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <motion.button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            aria-pressed={active}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.92 }}
            className={cn(
              "relative rounded-full px-5 py-2.5 text-sm font-medium transition-colors",
              active ? "text-white" : "text-graphite hover:text-ink"
            )}
          >
            {active && (
              <motion.span
                layoutId="filter-pill"
                className="absolute inset-0 rounded-full bg-ink"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            <span className="relative z-10">{opt.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
