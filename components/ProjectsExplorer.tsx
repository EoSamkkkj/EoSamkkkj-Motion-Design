"use client";

import { useMemo, useState } from "react";
import { portfolio } from "@/data/portfolio";
import PortfolioFilters, { type FilterValue } from "./PortfolioFilters";
import PortfolioGrid from "./PortfolioGrid";

export default function ProjectsExplorer() {
  const [filter, setFilter] = useState<FilterValue>("todos");

  const items = useMemo(
    () => (filter === "todos" ? portfolio : portfolio.filter((v) => v.level === filter)),
    [filter]
  );

  return (
    <div className="flex flex-col gap-10">
      <PortfolioFilters value={filter} onChange={setFilter} />
      <PortfolioGrid items={items} />
    </div>
  );
}
