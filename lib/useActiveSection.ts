"use client";

import { useEffect, useState } from "react";

export function useActiveSection(ids: string[], defaultId: string) {
  const [active, setActive] = useState(defaultId);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        // Considera "ativa" a seção que ocupa a faixa central da tela,
        // logo abaixo do header fixo.
        rootMargin: "-88px 0px -60% 0px",
        threshold: 0,
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return active;
}
