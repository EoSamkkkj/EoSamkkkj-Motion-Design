import { whatsappMessages } from "@/lib/whatsapp";

export interface PricePlan {
  id: "basico" | "intermediario" | "exclusivo";
  name: string;
  price: string;
  duration: string;
  description: string;
  narration?: string;
  deadline: string;
  revisions: string;
  ctaLabel: string;
  message: string;
  highlight?: boolean;
  badge?: string;
}

export const pricePlans: PricePlan[] = [
  {
    id: "basico",
    name: "Básico",
    price: "R$250",
    duration: "Até 30 segundos",
    description: "Motion simples, animações e transições básicas.",
    narration: "Narração IA Essencial: + R$60–80",
    deadline: "Até 3 dias",
    revisions: "1 alteração",
    ctaLabel: "Escolher Básico",
    message: whatsappMessages.basico,
  },
  {
    id: "intermediario",
    name: "Intermediário",
    price: "R$350–450",
    duration: "Até 30 segundos",
    description:
      "Motion mais elaborado, cenas personalizadas e animações mais trabalhadas.",
    narration:
      "Narração IA Profissional: + R$120–150 — voz humanizada, com maior realismo, ênfase e tratamento de áudio.",
    deadline: "Conforme o projeto",
    revisions: "1 alteração",
    ctaLabel: "Escolher Intermediário",
    message: whatsappMessages.intermediario,
    highlight: true,
    badge: "Mais escolhido",
  },
  {
    id: "exclusivo",
    name: "Exclusivo",
    price: "R$750",
    duration: "Até 1 minuto",
    description:
      "Motion Design completo, maior personalização e acabamento premium.",
    narration:
      "IA Profissional inclusa — voz humanizada, com maior realismo, ênfase e tratamento de áudio.",
    deadline: "Conforme o projeto",
    revisions: "2 alterações",
    ctaLabel: "Escolher Exclusivo",
    message: whatsappMessages.exclusivo,
  },
];

export const durationOptions = [
  "Até 15 segundos",
  "Até 30 segundos",
  "Até 45 segundos",
  "Até 1 minuto",
  "Mais de 1 minuto",
];

export const motionLevelOptions = [
  "Básico",
  "Intermediário",
  "Avançado",
  "Ainda não sei",
];

export const narrationOptions = [
  "Não preciso",
  "IA Essencial",
  "IA Profissional",
  "Quero conversar sobre isso",
];

export const sfxOptions = ["Sim", "Não"];

export const faqItems = [
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
];
