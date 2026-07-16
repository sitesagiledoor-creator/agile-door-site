/**
 * Fonte única de dados dos produtos da Agile Door.
 * Para adicionar um produto novo, basta acrescentar um objeto ao array
 * `products` — listagem, página de detalhe, carrossel, sitemap e JSON-LD são
 * gerados automaticamente a partir daqui.
 *
 * Ícones: os campos `icon` usam nomes de ícones do lucide-react, resolvidos
 * em `components/ui/ProductIcons.tsx`. Assim os dados permanecem serializáveis.
 *
 * Imagens: fotos oficiais em /public/produtos/ com nomes semânticos
 * (<slug>-hero.png, <slug>-galeria-2.png, …). Para trocar uma foto, basta
 * substituir o arquivo de mesmo nome — nenhum código precisa mudar.
 *
 * Fichas técnicas: transcritas das tabelas oficiais do fabricante fornecidas
 * pela Agile Door (jul/2026) — os screenshots das tabelas não entram na
 * galeria; viram estas linhas de dados (HTML de verdade, responsivo).
 */

export type SpecRow = {
  label: string;
  value: string;
  /** Quando true, o valor é numérico/técnico e renderiza em fonte monoespaçada. */
  mono?: boolean;
};

export type SpecGroup = {
  title: string;
  rows: SpecRow[];
};

export type IconName =
  | "volume-off"
  | "gauge"
  | "plug-zap"
  | "layout-panel-top"
  | "shield-check"
  | "radio"
  | "store"
  | "building"
  | "briefcase"
  | "stethoscope"
  | "factory"
  | "hotel"
  | "sliders"
  | "scan-line"
  | "headphones";

export type Feature = {
  icon: IconName;
  title: string;
  text: string;
};

export type Faq = {
  question: string;
  answer: string;
};

export type ProductImage = {
  src: string;
  alt: string;
};

export type Product = {
  slug: string;
  name: string;
  category: string;
  /** Complemento curto da categoria, ex.: "Heavy Duty" (usado no carrossel). */
  variantLabel: string;
  shortDescription: string;
  /** Parágrafos da visão geral na página de produto. */
  overview: string[];
  badges: string[];
  /** Specs de destaque exibidas em cards/vitrines (valor em fonte mono). */
  keySpecs: { label: string; value: string }[];
  /** Callout de destaque do motor (renderizado após a visão geral). */
  motorHighlight: {
    title: string;
    text: string;
    specs: string;
  };
  features: Feature[];
  specGroups: SpecGroup[];
  applications: Feature[];
  faqs: Faq[];
  images: ProductImage[];
  datasheetUrl?: string;
};

// Frase calibrada do brushless: motores sempre geram algum calor — a vantagem
// real é gerar/acumular MENOS calor que motores com escova. Nada de "nunca
// esquenta".
const brushlessText =
  "Maior eficiência energética e menor atrito mecânico: o motor brushless gera e acumula menos calor que motores com escova, favorecendo o funcionamento contínuo sem superaquecimento, mesmo em uso intenso.";

const ag200: Product = {
  slug: "ag200",
  name: "AG200",
  category: "Porta de Correr Automática",
  // Vazio por decisão do cliente (update 8): exibir só a categoria
  variantLabel: "",
  shortDescription:
    "O workhorse da linha: operador de porta de correr automática robusto, com motor brushless silencioso, folhas de até 200 kg e acionamento por controles remotos — custo-benefício para comércio, condomínios e uso geral intenso.",
  overview: [
    "AG200: o operador que resolve a maioria das especificações: entradas de uso intenso em comércio, condomínios, escritórios e clínicas, com folhas de até 200 kg (ou 2×180 kg em porta dupla). O motor brushless DC de 24V e 100W (2300 rpm) trabalha abaixo de 50 dBA, com ciclo de vida de 2 milhões de operações — números que dão segurança para quem assina o projeto e instala com o próprio nome.",
    "Na instalação, o ajuste é todo seu: velocidade de abertura e fechamento reguláveis de 10 a 55 cm/s e tempo de permanência aberta de 0 a 20 segundos, calibrados para o fluxo real do ambiente. O acionamento auxiliar é por controles remotos de função, e a alimentação bivolt automática (100–240V AC) elimina erro de especificação elétrica em qualquer região do Brasil.",
    "O kit padrão completo: trilho com tampa, controlador, motor, sensores, fotocélula, correia, polia, roldanas reforçadas, limitadores, conectores e parafusos.",
  ],
  badges: [
    "Linha Heavy Duty — até 200 kg",
    "Motor Brushless Silencioso",
    "2 Milhões de Ciclos (TÜV)",
  ],
  keySpecs: [
    { label: "Capacidade de carga", value: "até 200 kg" },
    { label: "Velocidade ajustável", value: "10–55 cm/s" },
    { label: "Motor", value: "2300 rpm" },
  ],
  motorHighlight: {
    title: "Motor brushless: potência sem superaquecimento",
    text: brushlessText,
    specs: "24V · 100W · 2300 rpm",
  },
  features: [
    {
      icon: "volume-off",
      title: "Silencioso:",
      text: "Motor brushless DC 24V com nível de ruído inferior a 50 dBA — adequado até para clínicas e recepções que exigem silêncio.",
    },
    {
      icon: "gauge",
      title: "Velocidade ajustável",
      text: "Abertura e fechamento reguláveis de 10 a 55 cm/s, com tempo de permanência aberta configurável de 0 a 20 segundos.",
    },
    {
      icon: "plug-zap",
      title: "Bivolt automático",
      text: "Alimentação 100–240V AC, 50/60Hz: funciona em qualquer instalação elétrica, sem transformador.",
    },
    {
      icon: "radio",
      title: "Controle remoto de função",
      text: "Acionamento e troca de função por controle remoto; o controlador mantém sua configuração mesmo após queda de energia.",
    },
    {
      icon: "layout-panel-top",
      title: "Compatibilidade ampla",
      text: "Instala em portas com moldura, sem moldura e de vidro temperado, com folhas de 500 a 2000 mm de largura.",
    },
    {
      icon: "shield-check",
      title: "Certificação internacional",
      text: "Mecanismo com marcação CE e ciclo de vida de 2 milhões de operações aprovado pelo TÜV.",
    },
  ],
  specGroups: [
    {
      title: "Motor e desempenho",
      rows: [
        {
          label: "Tipo",
          value: "Operador de porta de correr automática (mecanismo motorizado)",
        },
        {
          label: "Motor",
          value: "Brushless DC 24V, 100W, 2300 rpm",
          mono: true,
        },
        {
          label: "Modo de folha da porta",
          value: "Abertura única / Abertura dupla",
        },
        {
          label: "Peso da folha da porta",
          value: "Máx. 200 kg (única) / Máx. 2×180 kg (dupla)",
          mono: true,
        },
        {
          label: "Velocidade de abertura",
          value: "10–55 cm/s (ajustável)",
          mono: true,
        },
        {
          label: "Velocidade de fechamento",
          value: "10–55 cm/s (ajustável)",
          mono: true,
        },
        {
          label: "Tempo de abertura",
          value: "0–20 segundos (ajustável)",
          mono: true,
        },
        {
          label: "Força de abertura manual",
          value: "99,5 N",
          mono: true,
        },
      ],
    },
    {
      title: "Operação",
      rows: [
        { label: "Nível de ruído", value: "Inferior a 50 dBA", mono: true },
        {
          label: "Temperatura de operação",
          value: "-10°C a +70°C",
          mono: true,
        },
        {
          label: "Acionamento",
          value:
            "Sensor de micro-ondas, fotocélula e controles remotos de função (inclusos no kit)",
        },
        {
          label: "Controlador",
          value: "Mantém a configuração após queda de energia",
        },
      ],
    },
    {
      // Menções de garantia removidas do site em 16/07/2026 (decisão
      // comercial: reintroduzir só quando a política estiver definida)
      title: "Certificações",
      rows: [
        {
          label: "Certificações do mecanismo",
          value: "CE; ciclo de vida de 2 milhões de operações aprovado pelo TÜV",
        },
      ],
    },
  ],
  // Seção "Aplicações" removida do AG200 por decisão do cliente (update 8);
  // o template só renderiza a seção quando o array não está vazio.
  applications: [],
  faqs: [
    {
      question: "A instalação está inclusa na compra?",
      answer:
        "A Agile Door orienta tecnicamente a instalação e pode indicar instaladores parceiros na sua região. As condições de instalação são combinadas junto com o orçamento. [REVISAR COM O CLIENTE]",
    },
    {
      question: "O AG200 funciona na rede elétrica da minha cidade?",
      answer:
        "Sim. A alimentação é bivolt automática (AC 100–240V, 50–60Hz): o equipamento se adapta sozinho à tensão da instalação, em qualquer região do Brasil, sem chave seletora nem transformador externo.",
    },
    {
      question: "Serve para a porta que já existe no meu estabelecimento?",
      answer:
        "Na maioria dos casos, sim. O AG200 é compatível com portas com moldura, sem moldura e de vidro temperado, com folhas de 500 a 2000 mm de largura e até 200 kg (ou 2×180 kg em porta dupla). Envie as medidas pelo WhatsApp e confirmamos a compatibilidade sem compromisso.",
    },
    {
      question: "O que vem no kit padrão?",
      answer:
        "Trilho com tampa (comprimento opcional), controlador, motor, interruptor de energia, sensor de micro-ondas, fotocélula, controles remotos de função, correia, polia, roldanas reforçadas, limitadores, conector de correia e parafusos.",
    },
    {
      question: "Que manutenção o equipamento exige?",
      answer:
        "Como o motor é brushless (sem escovas), o desgaste mecânico é menor do que em motores convencionais. Recomenda-se uma revisão preventiva periódica de roldanas, correia e sensores, conforme a intensidade de uso. [REVISAR COM O CLIENTE — periodicidade e plano de manutenção oferecido]",
    },
    {
      question: "Qual o prazo de entrega?",
      answer:
        "O prazo de entrega depende da disponibilidade em estoque e da sua região. Solicite um orçamento pelo WhatsApp que informamos as condições atuais junto com a proposta. [REVISAR COM O CLIENTE]",
    },
  ],
  images: [
    {
      src: "/produtos/ag200-hero.png",
      alt: "Operador de porta deslizante automática AG200 instalado sobre entrada de vidro com múltiplos painéis",
    },
    {
      src: "/produtos/ag200-galeria-2.png",
      alt: "AG200 com selos de certificação CE, ciclo de vida de 2 milhões aprovado pelo TÜV e motor de 100W",
    },
    {
      src: "/produtos/ag200-detalhes-tecnicos.png",
      alt: "Vista detalhada do mecanismo AG200 com componentes identificados: motor, controlador, correia, trilho, roldanas, limitadores e polia",
    },
    {
      src: "/produtos/ag200-embalagem.png",
      alt: "Itens da embalagem padrão do AG200: trilho com tampa, controlador, motor, sensor de micro-ondas, fotocélula, controles remotos, correia, polia, roldanas, limitadores e parafusos",
    },
  ],
  // PDF da ficha técnica: substituir quando a arte final estiver pronta.
  datasheetUrl: undefined,
};

const ag400: Product = {
  slug: "ag400",
  name: "AG400",
  category: "Porta de Correr Automática",
  variantLabel: "Linha Avançada",
  shortDescription:
    "A linha avançada: motor de 3300 rpm, velocidade superior de 20–60 cm/s, seletor digital de funções e roldanas com trava antiqueda — para entradas comerciais e hoteleiras de fluxo intenso.",
  overview: [
    "O AG400 é a linha avançada do catálogo, com projeto voltado à segurança do pedestre — sensores de presença, fotocélulas, chave de segurança e roldanas com trava antiqueda — e certificações CE, TÜV, ISO 9001 e RoHS. Se o seu projeto é hotel, rede comercial ou edifício corporativo com padrão internacional de especificação, é por aqui que ele passa.",
    "Na prática, é o irmão mais rápido do AG200: motor de 24V e 100W com rotação mais alta (3300 rpm), velocidade de abertura e fechamento de 20 a 60 cm/s e tempo de permanência aberta ajustável de 0 a 60 segundos — margem de calibração extra para entradas de fluxo intenso. As roldanas têm novo design antiqueda, e a capacidade é a mesma: folhas de até 200 kg (ou 2×180 kg em porta dupla).",
    "O controle é feito por um seletor digital de funções com cinco modos de operação — aberto, fechado, travado, via única e automático — em vez de apenas controle remoto: o gestor do prédio opera a porta sem chamar o instalador. Compatível com sensores de presença, fotocélulas, chave de segurança e teclado de função; mecanismo certificado CE, TÜV, ISO 9001 e RoHS.",
  ],
  badges: [
    "Seletor Digital de 5 Funções",
    "Velocidade 20–60 cm/s",
    "Certificações CE · TÜV · ISO 9001",
  ],
  keySpecs: [
    { label: "Velocidade ajustável", value: "20–60 cm/s" },
    { label: "Motor", value: "3300 rpm" },
    { label: "Seletor digital", value: "5 funções" },
  ],
  motorHighlight: {
    title: "Motor brushless de alta rotação",
    text: brushlessText,
    specs: "24V · 100W · 3300 rpm",
  },
  features: [
    {
      icon: "gauge",
      title: "O mais rápido da linha",
      text: "Motor de 3300 rpm com velocidade de abertura e fechamento de 20 a 60 cm/s — fluxo intenso sem fila na porta.",
    },
    {
      icon: "sliders",
      title: "Seletor digital de funções",
      text: "Painel digital com 5 modos: aberto, fechado, travado, via única e automático — sem depender só de controle remoto.",
    },
    {
      icon: "shield-check",
      title: "Segurança certificada",
      text: "Marcação CE, aprovação TÜV e certificação ISO 9001, com projeto voltado à proteção do pedestre — o padrão que redes hoteleiras e corporativas exigem.",
    },
    {
      icon: "layout-panel-top",
      title: "Roldanas antiqueda",
      text: "Novo design de roldanas com trava antiqueda, para operação segura mesmo com folhas pesadas de até 200 kg.",
    },
    {
      icon: "scan-line",
      title: "Ecossistema de segurança",
      text: "Compatível com sensores de presença, fotocélulas, chave de segurança e teclado de função.",
    },
    {
      icon: "headphones",
      title: "Suporte direto",
      text: "Atendimento técnico direto da Agile Door pelo WhatsApp — antes, durante e depois da instalação.",
    },
  ],
  specGroups: [
    {
      title: "Motor e desempenho",
      rows: [
        {
          label: "Tipo",
          value: "Operador de porta de correr automática (mecanismo motorizado)",
        },
        { label: "Motor", value: "24V, 100W, 3300 rpm", mono: true },
        {
          label: "Modo de folha da porta",
          value: "Abertura única / Abertura dupla",
        },
        {
          label: "Peso da folha da porta",
          value: "Máx. 200 kg (única) / Máx. 2×180 kg (dupla)",
          mono: true,
        },
        {
          label: "Velocidade de abertura",
          value: "20–60 cm/s (ajustável)",
          mono: true,
        },
        {
          label: "Velocidade de fechamento",
          value: "20–60 cm/s (ajustável)",
          mono: true,
        },
        {
          label: "Tempo de abertura",
          value: "0–60 segundos (ajustável)",
          mono: true,
        },
        {
          label: "Força de abertura manual",
          value: "95–100 N",
          mono: true,
        },
      ],
    },
    {
      title: "Instalação e compatibilidade",
      rows: [
        {
          label: "Largura da folha da porta",
          value: "500–2000 mm",
          mono: true,
        },
        {
          label: "Tensão",
          value: "AC 100–240V, 50–60Hz (bivolt automático)",
          mono: true,
        },
        { label: "Material do gabinete", value: "Alumínio, acabamento prata" },
        {
          label: "Roldanas",
          value: "Novo design com trava antiqueda",
        },
      ],
    },
    {
      title: "Operação",
      rows: [
        {
          label: "Seletor de funções",
          value:
            "Painel digital: Aberto / Fechado / Travado / Via Única / Automático",
        },
        {
          label: "Compatibilidade de acessórios",
          value:
            "Sensores de presença, fotocélulas, chave de segurança, teclado de função",
        },
        {
          label: "Temperatura de operação",
          value: "-10°C a +70°C",
          mono: true,
        },
      ],
    },
    {
      // Menções de garantia/suporte do fabricante removidas do site em
      // 16/07/2026 (decisão comercial: reintroduzir quando definidas)
      title: "Certificações",
      rows: [
        {
          label: "Certificações do mecanismo",
          value: "CE, TÜV, ISO 9001, RoHS",
        },
      ],
    },
  ],
  applications: [
    {
      icon: "hotel",
      title: "Hotéis",
      text: "Entradas com fluxo constante de hóspedes e bagagens, no padrão de segurança exigido por redes internacionais.",
    },
    {
      icon: "store",
      title: "Redes comerciais",
      text: "Lojas e franquias que padronizam suas unidades com equipamentos certificados.",
    },
    {
      icon: "briefcase",
      title: "Edifícios corporativos",
      text: "Recepções que combinam controle de acesso, estética e conformidade normativa.",
    },
    {
      icon: "building",
      title: "Condomínios de padrão",
      text: "Empreendimentos que especificam equipamentos certificados em projeto.",
    },
  ],
  faqs: [
    {
      question: "Quais certificações e dispositivos de segurança o AG400 oferece?",
      answer:
        "O mecanismo carrega marcação CE, aprovação TÜV, certificação ISO 9001 e conformidade RoHS. Na instalação, a proteção do pedestre é composta por sensores de presença, fotocélulas, chave de segurança e teclado de função — além das roldanas com trava antiqueda, que seguram a folha mesmo em uso intenso.",
    },
    {
      question: "Qual a diferença entre o AG200 e o AG400?",
      answer:
        "Os dois movimentam folhas de até 200 kg. O AG400 é a linha avançada: motor de rotação mais alta (3300 rpm contra 2300 rpm), velocidade superior (20–60 cm/s contra 10–55 cm/s), tempo de abertura ajustável até 60 segundos (contra 20), seletor digital de funções em vez de só controle remoto e roldanas com design antiqueda. O AG200 é o custo-benefício robusto para uso geral; o AG400, a escolha para fluxo intenso e projetos com padrão internacional de especificação.",
    },
    {
      question: "Como funciona o seletor digital de funções?",
      answer:
        "Pelo painel digital você escolhe entre 5 modos: automático (abre e fecha pelos sensores), aberto (porta fixa aberta), fechado (opera só por acionamento), via única (só entrada ou só saída) e travado (bloqueio total). É útil para adequar a porta ao horário de funcionamento sem desligar o equipamento.",
    },
    {
      question: "A instalação está inclusa na compra?",
      answer:
        "A Agile Door orienta tecnicamente a instalação e pode indicar instaladores parceiros na sua região. As condições de instalação são combinadas junto com o orçamento. [REVISAR COM O CLIENTE]",
    },
    {
      question: "Qual o prazo de entrega?",
      answer:
        "O prazo depende da disponibilidade em estoque e da sua região. Solicite um orçamento pelo WhatsApp que informamos o prazo atual junto com a proposta. [REVISAR COM O CLIENTE]",
    },
  ],
  images: [
    {
      src: "/produtos/ag400-hero.png",
      alt: "Automatizador de porta deslizante automática AG400 em foto de estúdio, instalado sobre porta de vidro dupla",
    },
    {
      src: "/produtos/ag400-galeria-2.png",
      alt: "AG400 com selos de certificação CE, ciclo de vida de 2 milhões aprovado pelo TÜV e motor de 100W para portas de até 200 kg",
    },
    {
      src: "/produtos/ag400-embalagem.png",
      alt: "Itens da embalagem padrão do AG400: trilho, controlador, motor, sensores, seletor de funções, correia, polia, roldanas antiqueda e acessórios de fixação",
    },
  ],
  // PDF da ficha técnica: substituir quando a arte final estiver pronta.
  datasheetUrl: undefined,
};

export const products: Product[] = [ag200, ag400];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
