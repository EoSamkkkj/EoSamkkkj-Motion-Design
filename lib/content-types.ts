// Tipos do conteúdo editável pelo painel (/admin).
// Tudo que o Sam muda com frequência — seções do portfólio, vídeos,
// pacotes de preço e perguntas frequentes — vive num único objeto
// SiteContent, salvo no Vercel Blob e lido pelo site.

export interface PortfolioLevel {
  /** identificador curto, sem espaços (ex.: "basico") */
  id: string;
  /** nome exibido no filtro e no painel (ex.: "Básico") */
  label: string;
}

export interface PortfolioVideo {
  id: string;
  /** id de uma PortfolioLevel */
  level: string;
  category: string;
  /** link do Vimeo, do YouTube ou de um arquivo enviado pelo painel */
  videoUrl: string;
  duration?: string;
  /** aparece na seção "Meus trabalhos" do início */
  featured?: boolean;
  /** lido do Vimeo/YouTube na hora de montar o site; não é salvo */
  meta?: VideoMeta;
}

export interface VideoMeta {
  title?: string;
  thumbnail?: string;
  /** largura ÷ altura (9:16 = 0.5625) */
  ratio?: number;
  duration?: string;
}

export interface PricePlan {
  id: string;
  name: string;
  price: string;
  duration: string;
  description: string;
  narration?: string;
  deadline: string;
  revisions: string;
  ctaLabel: string;
  /** mensagem do WhatsApp; vazia = gerada a partir do nome e do preço */
  message: string;
  highlight?: boolean;
  badge?: string;
  /** observação em letra pequena no fim do card (condições, o que não inclui) */
  note?: string;
  /** id de uma PortfolioLevel cujos vídeos aparecem em "Ver exemplos" */
  examplesLevel?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface SiteContent {
  version: 2;
  levels: PortfolioLevel[];
  videos: PortfolioVideo[];
  plans: PricePlan[];
  faq: FaqItem[];
  updatedAt?: string;
}
