/** Fonte única de dados de contato e identidade da Agile Door. */

export const SITE = {
  name: "Agile Door",
  tagline: "Soluções em Portas Automáticas",
  description:
    "Portas automáticas com certificações internacionalmente reconhecidas (CE, TÜV, ISO 9001) e atendimento técnico ágil e direto.",
  // Definido por NEXT_PUBLIC_SITE_URL no ambiente de deploy
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.agiledoor.com.br",
} as const;

// Número comercial oficial (55 + DDD + número, só dígitos — formato wa.me)
export const WHATSAPP_NUMBER = "551932178282";

export const CONTACT = {
  /** CNPJ formatado para exibição no rodapé */
  cnpj: "67.704.292/0001-14",
  email: "contato@agiledoor.com.br",
  emailHref: "mailto:contato@agiledoor.com.br",
  /** Telefone formatado para leitura */
  phone: "+55 (19) 3217-8282",
  /** Telefone em formato de link clique-para-ligar */
  phoneHref: "tel:+551932178282",
  address:
    "R. Reinaldo Laubenstein, 415 - Jardim Quarto Centenário, Campinas - SP, 13070-174",
  hours: "Segunda a sexta, 8h às 18h",
} as const;

export const WHATSAPP_MESSAGES = {
  default:
    "Olá! Gostaria de saber mais sobre as portas automáticas da Agile Door.",
  /**
   * `productType` acompanha a categoria do produto ("porta telescópica" na
   * linha telescópica), para a mensagem já chegar com o tipo certo.
   */
  product: (productName: string, productType = "porta automática") =>
    `Olá! Tenho interesse na ${[productType, productName]
      .filter(Boolean)
      .join(" ")} e gostaria de solicitar um orçamento.`,
} as const;

/**
 * URL canônica de uma rota. No build estático o Next usa `trailingSlash`, então
 * a forma canônica termina em barra; no modo servidor, não. Sitemap e dados
 * estruturados precisam declarar a mesma forma que o servidor entrega, senão
 * apontam para um endereço que só existe depois de um redirecionamento.
 */
export function canonicalUrl(path: string = ""): string {
  const barraFinal = process.env.NEXT_PUBLIC_STATIC_EXPORT === "1" ? "/" : "";
  return `${SITE.url}${path}${barraFinal}`;
}

/** Gera um link wa.me com a mensagem corretamente codificada. */
export function whatsappLink(
  message: string = WHATSAPP_MESSAGES.default
): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Páginas do menu principal. O contato não tem página no menu — o item
 * "Fale Conosco" do header abre o WhatsApp diretamente.
 */
export const NAV_LINKS = [
  { href: "/", label: "Início" },
  { href: "/sobre", label: "Sobre" },
  { href: "/produtos", label: "Produtos" },
  { href: "/blog", label: "Blog" },
] as const;
