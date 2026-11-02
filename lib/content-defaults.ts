import type { PortfolioVideo, PricePlan, SiteContent } from "./content-types";

// Conteúdo inicial do site. É usado enquanto nada foi publicado pelo
// painel (ou se o armazenamento estiver indisponível). Depois da primeira
// publicação, o que vale é o que está salvo no Vercel Blob.

const vimeo = (id: string) => `https://vimeo.com/${id}`;

// Motion Express — também usado por lib/content.ts para atualizar um
// conteúdo já publicado pelo painel antes deste pacote existir.
export const expressVideos: PortfolioVideo[] = [
  { id: "x1", level: "express", category: "Motion Design", videoUrl: vimeo("1242439097") },
  { id: "x2", level: "express", category: "Motion Design", videoUrl: vimeo("1242439095") },
  { id: "x3", level: "express", category: "Motion Design", videoUrl: vimeo("1242439096") },
  { id: "x4", level: "express", category: "Motion Design", videoUrl: vimeo("1242479016") },
];

export const expressPlan: PricePlan = {
  id: "express",
  name: "Motion Express",
  price: "A partir de R$120",
  duration: "Até 20 segundos",
  description:
    "Motion design dinâmico, transições suaves, efeitos sonoros, edição e finalização.",
  narration:
    "R$120 com a sua narração pronta · R$150 com narração digital feita por mim a partir do roteiro aprovado.",
  deadline: "Até 3 horas",
  revisions: "1 alteração pontual",
  ctaLabel: "Escolher Express",
  message:
    "Olá, Sam! Vi seu portfólio e tenho interesse no Motion Express, a partir de R$120. Gostaria de conversar sobre meu projeto.",
  note:
    "Entrega conforme disponibilidade. O prazo começa após o recebimento dos materiais, a aprovação do roteiro e a confirmação da disponibilidade. Criação de roteiro do zero não inclusa (orçada à parte).",
  examplesLevel: "express",
};

export const defaultContent: SiteContent = {
  version: 2,
  levels: [
    { id: "express", label: "Express" },
    { id: "basico", label: "Básico" },
    { id: "intermediario", label: "Intermediário" },
    { id: "exclusivo", label: "Exclusivo" },
  ],
  videos: [
    { id: "v1", level: "exclusivo", category: "Motion Design", videoUrl: vimeo("1228911101"), featured: true },
    { id: "v2", level: "exclusivo", category: "Animação", videoUrl: vimeo("1228913340"), featured: true },
    { id: "v3", level: "exclusivo", category: "Criativo", videoUrl: vimeo("1228914134"), featured: true },
    { id: "v4", level: "intermediario", category: "Motion Design", videoUrl: vimeo("1228906212"), featured: true },
    { id: "v5", level: "intermediario", category: "Projeto Visual", videoUrl: vimeo("1228909757"), featured: true },
    { id: "v6", level: "intermediario", category: "Animação", videoUrl: vimeo("1228910038"), featured: true },
    { id: "v7", level: "basico", category: "Motion Design", videoUrl: vimeo("1229563896") },
    { id: "v8", level: "basico", category: "Animação", videoUrl: vimeo("1229564190") },
    { id: "v9", level: "intermediario", category: "Motion Design", videoUrl: vimeo("1230378323") },
    ...expressVideos,
  ],
  plans: [
    expressPlan,
    {
      id: "basico",
      examplesLevel: "basico",
      name: "Motion Essencial",
      price: "R$250",
      duration: "Até 30 segundos",
      description: "Motion simples, animações e transições básicas.",
      narration: "Narração IA Essencial: + R$60–80",
      deadline: "Até 3 dias",
      revisions: "1 alteração",
      ctaLabel: "Escolher Essencial",
      message:
        "Olá, Sam! Vi seu portfólio e tenho interesse no pacote Motion Essencial de R$250. Gostaria de conversar sobre meu projeto.",
    },
    {
      id: "intermediario",
      examplesLevel: "intermediario",
      name: "Motion Intermediário",
      price: "A partir de R$350",
      duration: "Até 30 segundos",
      description:
        "Motion mais elaborado, cenas personalizadas e animações mais trabalhadas.",
      narration:
        "Narração IA Profissional: + R$120–150 — voz humanizada, com maior realismo, ênfase e tratamento de áudio.",
      deadline: "Conforme o projeto",
      revisions: "1 alteração",
      ctaLabel: "Escolher Intermediário",
      message:
        "Olá, Sam! Vi seu portfólio e tenho interesse no pacote Motion Intermediário, a partir de R$350. Gostaria de conversar sobre meu projeto.",
      highlight: true,
      badge: "Mais escolhido",
    },
    {
      id: "exclusivo",
      examplesLevel: "exclusivo",
      name: "Motion Exclusivo",
      price: "A partir de R$750",
      duration: "Até 1 minuto",
      description:
        "Motion Design completo, maior personalização e acabamento premium.",
      narration:
        "IA Profissional inclusa — voz humanizada, com maior realismo, ênfase e tratamento de áudio.",
      deadline: "Conforme o projeto",
      revisions: "2 alterações",
      ctaLabel: "Escolher Exclusivo",
      message:
        "Olá, Sam! Vi seu portfólio e tenho interesse no pacote Motion Exclusivo, a partir de R$750. Gostaria de conversar sobre meu projeto.",
    },
  ],
  faq: [
    {
      question: "O valor pode mudar?",
      answer:
        "Sim. O valor pode variar de acordo com duração, complexidade, quantidade de cenas e necessidades específicas do projeto.",
    },
    {
      question: "A narração está inclusa?",
      answer:
        "O pacote Exclusivo inclui IA Profissional. Nos demais projetos, a narração pode ser adicionada de acordo com a necessidade.",
    },
    {
      question: "Posso solicitar alterações?",
      answer: "Sim. A quantidade de alterações depende do pacote escolhido.",
    },
    {
      question: "Não sei qual pacote escolher. O que faço?",
      answer:
        "Você pode utilizar a opção de projeto personalizado ou entrar em contato diretamente para explicar sua ideia.",
    },
    {
      question: "Como começamos?",
      answer:
        "Envie sua ideia, roteiro ou referências pelo WhatsApp para que o projeto possa ser analisado.",
    },
  ],
};
