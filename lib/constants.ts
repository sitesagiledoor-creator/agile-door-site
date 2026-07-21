/**
 * Fonte única de dados de contato e identidade da Agile Door.
 * Pendências restantes antes de publicar (ver README):
 * - horário de atendimento (confirmar)
 * - domínio definitivo (NEXT_PUBLIC_SITE_URL)
 */

export const SITE = {
  name: "Agile Door",
  tagline: "Soluções em Portas Automáticas",
  description:
    "Portas automáticas com certificações internacionalmente reconhecidas (CE, TÜV, ISO 9001) e atendimento técnico ágil e direto.",
  // [CONFIRMAR DOMÍNIO DEFINITIVO]
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.agiledoor.com.br",
} as const;

// Número comercial oficial (55 + DDD + número, só dígitos — formato wa.me)
export const WHATSAPP_NUMBER = "551932178282";

export const CONTACT = {
  email: "contato@agiledoor.com.br",
  emailHref: "mailto:contato@agiledoor.com.br",
  /** Telefone formatado para leitura */
  phone: "+55 (19) 3217-8282",
  /** Telefone em formato de link clique-para-ligar */
  phoneHref: "tel:+551932178282",
  address:
    "R. Reinaldo Laubenstein, 415 - Jardim Quarto Centenário, Campinas - SP, 13070-174",
  hours: "Segunda a sexta, 8h às 18h", // [HORÁRIO A CONFIRMAR]
} as const;

export const WHATSAPP_MESSAGES = {
  default:
    "Olá! Gostaria de saber mais sobre as portas automáticas da Agile Door.",
  product: (productName: string) =>
    `Olá! Tenho interesse na porta automática ${productName} e gostaria de solicitar um orçamento.`,
} as const;

/** Gera um link wa.me com a mensagem corretamente codificada. */
export function whatsappLink(
  message: string = WHATSAPP_MESSAGES.default
): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Páginas do menu principal. O contato não tem página no menu — o item
 * "Fale Conosco" do header abre o WhatsApp diretamente (decisão comercial:
 * todo o atendimento é centralizado no WhatsApp).
 */
export const NAV_LINKS = [
  { href: "/", label: "Início" },
  { href: "/sobre", label: "Sobre" },
  { href: "/produtos", label: "Produtos" },
  { href: "/blog", label: "Blog" },
] as const;
