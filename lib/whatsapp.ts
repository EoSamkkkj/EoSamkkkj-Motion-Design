import { siteConfig } from "@/config/site";

/**
 * Monta um link wa.me válido a partir de um telefone (somente dígitos)
 * e uma mensagem em texto livre, já codificada corretamente.
 */
export function createWhatsAppLink(phone: string, message: string): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

/** Mensagem padrão de um pacote, quando o painel deixa o campo vazio. */
export function planMessage(name: string, price: string): string {
  // "A partir de R$350" → "…pacote X, a partir de R$350."
  const from = /^a partir de\s+/i.test(price);
  const suffix = !price ? "" : from ? `, ${price.charAt(0).toLowerCase()}${price.slice(1)}` : ` de ${price}`;
  return `Olá, Sam! Vi seu portfólio e tenho interesse no pacote ${name}${suffix}. Gostaria de conversar sobre meu projeto.`;
}

/**
 * Atalho usando o número oficial configurado em config/site.ts.
 */
export function createWhatsAppLinkDefault(message: string): string {
  return createWhatsAppLink(siteConfig.whatsapp.phone, message);
}

export const whatsappMessages = {
  geral:
    "Olá, Sam! Vi seu portfólio e gostaria de conversar sobre um projeto de Motion Design.",
};

export interface CustomProjectRequest {
  duracao: string;
  nivel: string;
  narracao: string;
  efeitos: string;
  quantidade: number | string;
  descricao: string;
}

export function buildCustomProjectMessage(req: CustomProjectRequest): string {
  const descricao = req.descricao.trim() || "(não informado)";
  return `Olá, Sam! Vi seu portfólio e gostaria de solicitar um orçamento personalizado.

Duração: ${req.duracao}
Nível de Motion: ${req.nivel}
Narração: ${req.narracao}
Efeitos sonoros: ${req.efeitos}
Quantidade: ${req.quantidade} vídeo(s)

Sobre o projeto:
${descricao}

Gostaria de conversar sobre os detalhes e valores.`;
}

export interface ProposalRequest {
  valor: string;
  mensagem: string;
}

/**
 * Mensagem para quando o próprio cliente sugere um valor e envia sua
 * proposta — sem calcular ou validar o valor, só encaminha o que a
 * pessoa digitou para o Sam avaliar.
 */
export function buildProposalMessage(req: ProposalRequest): string {
  const mensagem = req.mensagem.trim() || "(não informado)";
  return `Olá, Sam! Vi seu portfólio e gostaria de fazer uma proposta de orçamento.

Valor sugerido: ${req.valor}

Sobre o projeto:
${mensagem}

Gostaria de conversar sobre a viabilidade e os detalhes.`;
}
