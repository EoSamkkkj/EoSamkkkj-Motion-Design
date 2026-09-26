export type PortfolioLevel = "basico" | "intermediario" | "exclusivo";

export interface PortfolioVideo {
  id: number;
  level: PortfolioLevel;
  category: string;
  videoUrl: string;
  duration?: string;
}

export const levelLabels: Record<PortfolioLevel, string> = {
  basico: "Básico",
  intermediario: "Intermediário",
  exclusivo: "Exclusivo",
};

// Para adicionar um novo trabalho: copie um objeto, troque o id (único),
// o level e a videoUrl. Nada mais é obrigatório.
export const portfolio: PortfolioVideo[] = [
  {
    id: 1,
    level: "exclusivo",
    category: "Motion Design",
    videoUrl: "https://vimeo.com/1228911101?share=copy&fl=sv&fe=ci",
  },
  {
    id: 2,
    level: "exclusivo",
    category: "Animação",
    videoUrl: "https://vimeo.com/1228913340?share=copy&fl=sv&fe=ci",
  },
  {
    id: 3,
    level: "exclusivo",
    category: "Criativo",
    videoUrl: "https://vimeo.com/1228914134?share=copy&fl=sv&fe=ci",
  },
  {
    id: 4,
    level: "intermediario",
    category: "Motion Design",
    videoUrl: "https://vimeo.com/1228906212?share=copy&fl=sv&fe=ci",
  },
  {
    id: 5,
    level: "intermediario",
    category: "Projeto Visual",
    videoUrl: "https://vimeo.com/1228909757?share=copy&fl=sv&fe=ci",
  },
  {
    id: 6,
    level: "intermediario",
    category: "Animação",
    videoUrl: "https://vimeo.com/1228910038?share=copy&fl=sv&fe=ci",
  },
  {
    id: 7,
    level: "basico",
    category: "Motion Design",
    videoUrl: "https://vimeo.com/1229563896?share=copy&fl=sv&fe=ci",
  },
  {
    id: 8,
    level: "basico",
    category: "Animação",
    videoUrl: "https://vimeo.com/1229564190?share=copy&fl=sv&fe=ci",
  },
  {
    id: 9,
    level: "intermediario",
    category: "Motion Design",
    videoUrl: "https://vimeo.com/1230378323?share=copy&fl=sv&fe=ci",
  },
];

// Usados na Home, na seção "Meus trabalhos" (entre 3 e 6 vídeos).
export const featuredPortfolio = portfolio.slice(0, 6);
