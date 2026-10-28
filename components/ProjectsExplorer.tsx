"use client";

import { useMemo, useState } from "react";
import type { PortfolioLevel, PortfolioVideo } from "@/lib/content-types";
import PortfolioFilters, { type FilterValue } from "./PortfolioFilters";
import PortfolioGrid from "./PortfolioGrid";

interface ProjectsExplorerProps {
  levels: PortfolioLevel[];
  videos: PortfolioVideo[];
}

export default function ProjectsExplorer({ levels, videos }: ProjectsExplorerProps) {
  const [filter, setFilter] = useState<FilterValue>("todos");

  const items = useMemo(
    () => (filter === "todos" ? videos : videos.filter((v) => v.level === filter)),
    [filter, videos]
  );

  return (
    <div className="flex flex-col gap-10">
      <PortfolioFilters levels={levels} value={filter} onChange={setFilter} />
      <PortfolioGrid items={items} levels={levels} />
    </div>
  );
}
