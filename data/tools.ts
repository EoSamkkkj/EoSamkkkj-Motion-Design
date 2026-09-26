export interface Tool {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
}

export const tools: Tool[] = [
  {
    id: "figma",
    title: "Figma",
    category: "Storyboard & ideias",
    description:
      "Uso para desenvolver storyboards, organizar ideias e planejar visualmente cada projeto antes da animação.",
    tags: ["Storyboard", "Ideias", "Planejamento"],
  },
  {
    id: "after-effects",
    title: "After Effects",
    category: "Motion design",
    description:
      "Utilizado para animação, Motion Design, composição e desenvolvimento visual dos projetos.",
    tags: ["Motion", "Animação", "Composição"],
  },
  {
    id: "premiere-pro",
    title: "Premiere Pro",
    category: "Áudio",
    description:
      "Utilizado para trabalhar narração, efeitos sonoros e finalizar a parte sonora dos projetos.",
    tags: ["Áudio", "Narração", "SFX"],
  },
];

export const processSteps = [
  {
    number: "01",
    title: "Ideia",
    description: "Entendimento da proposta e direção inicial.",
  },
  {
    number: "02",
    title: "Storyboard",
    description: "Planejamento visual das cenas e ideias.",
  },
  {
    number: "03",
    title: "Motion",
    description: "Construção das animações e movimentos.",
  },
  {
    number: "04",
    title: "Áudio",
    description: "Narração, efeitos sonoros e acabamento sonoro.",
  },
  {
    number: "05",
    title: "Entrega",
    description: "Finalização e entrega do projeto.",
  },
];
