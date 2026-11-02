"use client";

import { useEffect, useState, type ReactNode } from "react";
import { motion } from "motion/react";

/**
 * Entrada dos cards de preço, um depois do outro, com o bounce suave do
 * After Effects: sobe ~30px com fade, passa um pouquinho do ponto e assenta.
 * O atraso segue a posição na linha (4 colunas no PC, 2 no tablet, 1 no
 * celular), para cada card entrar quando aparece — sem esperar os de cima.
 */
export default function PlanReveal({
  index,
  className,
  children,
}: {
  index: number;
  className?: string;
  children: ReactNode;
}) {
  const [columns, setColumns] = useState(1);

  useEffect(() => {
    const xl = window.matchMedia("(min-width: 1280px)");
    const sm = window.matchMedia("(min-width: 640px)");
    const update = () => setColumns(xl.matches ? 4 : sm.matches ? 2 : 1);
    update();
    xl.addEventListener("change", update);
    sm.addEventListener("change", update);
    return () => {
      xl.removeEventListener("change", update);
      sm.removeEventListener("change", update);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{
        type: "spring",
        visualDuration: 0.65,
        bounce: 0.28,
        delay: (index % columns) * 0.09,
        opacity: { duration: 0.4, delay: (index % columns) * 0.09 },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
