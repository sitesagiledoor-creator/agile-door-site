/**
 * Fonte única dos artigos do blog. Para publicar um artigo novo, basta
 * acrescentar um objeto ao array `blogPosts` — listagem, página do post,
 * sitemap e JSON-LD são gerados automaticamente.
 *
 * Conteúdo útil e honesto constrói autoridade de busca a médio prazo;
 * manter o tom técnico-acessível do site e nunca inventar números.
 */

export type BlogSection = {
  heading?: string;
  paragraphs: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  /** Data ISO (YYYY-MM-DD) */
  publishedAt: string;
  sections: BlogSection[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "como-escolher-porta-automatica-para-comercio",
    title: "Como escolher a porta de correr automática certa para o seu comércio",
    description:
      "Vão, peso da folha, fluxo de pessoas, normas de segurança e instalação elétrica: um roteiro prático para especificar a porta automática do seu estabelecimento sem erro.",
    publishedAt: "2026-07-08",
    sections: [
      {
        paragraphs: [
          "Uma porta de correr automática bem especificada passa despercebida: abre no ritmo do movimento, fecha sem sustos e não vira dor de cabeça de manutenção. Uma porta mal especificada, por outro lado, aparece todos os dias — na fila que se forma na entrada, no motor que força além da conta, na assistência recorrente. Este roteiro reúne os pontos que avaliamos antes de recomendar um operador a qualquer cliente.",
        ],
      },
      {
        heading: "1. Comece pelo vão: largura e altura livres",
        paragraphs: [
          "A primeira medida é a largura livre do vão onde a porta vai trabalhar — dela deriva a largura de cada folha. Operadores de porta de correr têm uma faixa de largura de folha suportada: o AG200 e o AG400, por exemplo, trabalham com folhas de 500 a 2000 mm. Meça também a altura disponível acima do vão: o trilho motorizado (o \"operador\" propriamente dito) é instalado ali e precisa de espaço para o gabinete.",
          "Vale fotografar a entrada e anotar as medidas antes de pedir orçamento: com vão, altura e uma foto, um fornecedor sério já consegue dizer se o equipamento atende — e você evita surpresas na instalação.",
        ],
      },
      {
        heading: "2. Peso e material da folha",
        paragraphs: [
          "Cada operador tem uma capacidade máxima de carga por folha. Portas de vidro temperado — as mais comuns em comércio — pesam na faixa de 25 a 30 kg por metro quadrado em vidros de 10 a 12 mm; uma folha de 1 m de largura por 2,2 m de altura fica facilmente acima dos 60 kg. Somando estrutura e perfis, o número sobe.",
          "A regra prática: escolha um operador com folga de capacidade em relação ao peso real da folha. Trabalhar no limite encurta a vida útil do motor e das roldanas. Operadores robustos, como os da linha heavy duty (até 200 kg por folha no caso do AG400), dão essa margem com sobra na maioria das entradas comerciais.",
        ],
      },
      {
        heading: "3. Fluxo de pessoas: velocidade e tempo de abertura",
        paragraphs: [
          "Uma farmácia de bairro e um supermercado em horário de pico têm fluxos completamente diferentes — e a porta precisa acompanhar. Prefira operadores com velocidade de abertura e fechamento ajustáveis e tempo de permanência aberta configurável: assim o comportamento da porta é calibrado no local, para o movimento real, em vez de sair de fábrica com um ajuste genérico.",
          "Em entradas de alto fluxo, uma abertura mais rápida reduz fila e perda de climatização. Em ambientes de menor movimento, uma abertura mais suave reduz ruído e desgaste.",
        ],
      },
      {
        heading: "4. Segurança: sensores, fotocélulas e certificações",
        paragraphs: [
          "Porta automática movimenta peso considerável perto de gente — segurança não é acessório. Verifique quais dispositivos o operador aceita: sensores de presença, fotocélulas (que impedem o fechamento com alguém no vão), chave de segurança e painel de funções.",
          "Se o seu projeto exige comprovação formal de segurança e qualidade — comum em hotéis, redes e edifícios corporativos — dê preferência a equipamentos com certificações reconhecidas (CE, TÜV, ISO 9001) e que aceitem o conjunto completo de dispositivos de proteção: sensores, fotocélulas e chave de segurança. No nosso catálogo, o AG200 soma a isso a proteção anti-esmagamento na abertura e no fechamento.",
        ],
      },
      {
        heading: "5. Instalação elétrica: bivolt evita dor de cabeça",
        paragraphs: [
          "No Brasil convivem redes de 127V e 220V — às vezes no mesmo bairro. Um operador com alimentação bivolt automática (100–240V AC) elimina o risco de erro de especificação e dispensa transformador externo. Também vale conferir o que acontece em queda de energia: controladores que mantêm a configuração após o restabelecimento evitam reprogramação a cada oscilação da rede.",
        ],
      },
      {
        heading: "6. Manutenção e suporte: pergunte antes de comprar",
        paragraphs: [
          "Motores brushless (sem escovas) têm menos desgaste mecânico que motores convencionais — menos manutenção corretiva ao longo da vida útil. Ainda assim, roldanas, correia e sensores merecem revisão preventiva periódica, com frequência proporcional à intensidade de uso.",
          "Antes de fechar negócio, pergunte: existe suporte técnico depois da venda? Quem atende quando algo sai do lugar? Há peças de reposição disponíveis? Um fornecedor que responde rápido no WhatsApp na venda tende a responder rápido depois dela também — e é esse o padrão de atendimento que defendemos aqui na Agile Door.",
        ],
      },
      {
        heading: "Resumo prático",
        paragraphs: [
          "Meça o vão e fotografe a entrada; estime o peso real da folha e escolha operador com folga de capacidade; exija velocidade e tempo de abertura ajustáveis; confira sensores e certificações reconhecidas; prefira alimentação bivolt automática; e confirme como funciona o suporte técnico antes de assinar. Com essas respostas em mãos, o orçamento certo quase se escolhe sozinho.",
          "Ficou com dúvida sobre o seu caso específico? Envie as medidas do seu vão pelo WhatsApp — analisamos e recomendamos a configuração adequada, sem compromisso.",
        ],
      },
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function formatPostDate(isoDate: string): string {
  return new Date(`${isoDate}T12:00:00-03:00`).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
