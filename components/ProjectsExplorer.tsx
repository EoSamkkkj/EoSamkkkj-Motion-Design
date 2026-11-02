"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowDown } from "lucide-react";
import type { PortfolioLevel, PortfolioVideo } from "@/lib/content-types";
import PortfolioFilters, { type FilterValue } from "./PortfolioFilters";
import PortfolioGrid from "./PortfolioGrid";
import MagneticButton from "./MagneticButton";

interface ProjectsExplorerProps {
  levels: PortfolioLevel[];
  videos: PortfolioVideo[];
  /** aparece junto com a grade, quando aberta */
  children?: ReactNode;
}

const isProjectsLink = (el: EventTarget | null) =>
  el instanceof Element && !!el.closest('a[href="#projetos"], a[href="/#projetos"]');

/**
 * A grade completa começa fechada, para quem rola até os preços não passar
 * por todos os vídeos. Abre no botão "Ver meus trabalhos", em qualquer link
 * para #projetos (menu, "Ver projetos", "Ver portfólio completo") e quando
 * o site já é aberto direto em /#projetos.
 */
export default function ProjectsExplorer({ levels, videos, children }: ProjectsExplorerProps) {
  const [filter, setFilter] = useState<FilterValue>("todos");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (window.location.hash === "#projetos") setOpen(true);
    const onClick = (e: MouseEvent) => isProjectsLink(e.target) && setOpen(true);
    // captura: abre antes do menu rolar até a seção
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  const items = useMemo(
    () => (filter === "todos" ? videos : videos.filter((v) => v.level === filter)),
    [filter, videos]
  );

  return (
    <AnimatePresence initial={false} mode="wait">
      {open ? (
        <motion.div
          key="grade"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 240, damping: 24 }}
        >
          <div className="flex flex-col gap-10">
            <PortfolioFilters levels={levels} value={filter} onChange={setFilter} />
            <PortfolioGrid items={items} levels={levels} />
          </div>
          {children}
        </motion.div>
      ) : (
        <motion.div key="botao" exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
          <MagneticButton>
            <button
              type="button"
              onClick={() => setOpen(true)}
              data-cursor="Ver"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-graphite"
            >
              Ver meus trabalhos
              <ArrowDown size={16} />
            </button>
          </MagneticButton>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
