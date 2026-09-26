"use client";

import { motion } from "motion/react";
import { useMemo, type ElementType, type ReactNode } from "react";

interface RevealTextProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  once?: boolean;
}

/**
 * Revela um bloco de texto com fade + translateY suave quando entra na
 * viewport. Usado para headlines e parágrafos importantes — não em todo
 * elemento da página, para manter o efeito como um gesto raro.
 *
 * IMPORTANTE: motion.create(Tag) precisa ser memoizado. Chamá-lo direto no
 * corpo do componente cria um tipo de componente novo a cada render — e
 * quando o pai re-renderiza (por exemplo, alguém digitando em um campo ao
 * lado), o React desmonta e remonta o elemento inteiro, fazendo o texto
 * "sumir e voltar" no meio da digitação.
 */
export default function RevealText({
  children,
  as: Tag = "div",
  className,
  delay = 0,
  once = true,
}: RevealTextProps) {
  const MotionTag = useMemo(
    () => motion.create(Tag as ElementType) as ElementType,
    [Tag]
  );

  return (
    <MotionTag
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-10% 0px" }}
      transition={{ type: "spring", stiffness: 300, damping: 17, mass: 0.6, delay }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
