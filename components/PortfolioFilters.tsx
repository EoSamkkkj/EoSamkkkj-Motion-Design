"use client";

import { motion } from "motion/react";
import { levelLabels, type PortfolioLevel } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export type FilterValue = "todos" | PortfolioLevel;

const options: { value: FilterValue; label: string }[] = [
  { value: "todos", label: "Todos" },
  { value: "basico", label: levelLabels.basico },
  { value: "intermediario", label: levelLabels.intermediario },
  { value: "exclusivo", label: levelLabels.exclusivo },
];

interface PortfolioFiltersProps {
  value: FilterValue;
  onChange: (value: FilterValue) => void;
}

export default function PortfolioFilters({ value, onChange }: PortfolioFiltersProps) {
  return (
    <div
      className="flex flex-wrap gap-2"
      role="group"
      aria-label="Filtrar projetos por nível"
    >
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            aria-pressed={active}
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
          </button>
        );
      })}
    </div>
  );
}
