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
 * Fichas técnicas: transcritas das tabelas oficiais para linhas de dados,
 * renderizadas como tabela HTML responsiva (nunca como imagem).
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
  | "headphones"
  | "move-horizontal"
  | "ruler"
  | "cpu"
  | "thermometer"
  | "link"
  | "lock"
  | "plane"
  | "flask"
  | "shopping-bag"
  | "door-open"
  | "flame"
  | "zap-off"
  | "hand"
  | "users"
  | "siren"
  | "school"
  | "theater";

export type Feature = {
  icon: IconName;
  title: string;
  text: string;
};

export type ProductImage = {
  src: string;
  alt: string;
};

/**
 * Categorias do catálogo. O rótulo é exibido como está (card, eyebrow da
 * página de produto) e também agrupa a listagem em /produtos — por isso é um
 * tipo fechado, e não uma string livre.
 */
export const CATEGORIES = [
  "Porta de Correr Automática",
  "Porta Telescópica Automática",
  "Porta Antipânico / Rota de Fuga",
] as const;

export type Category = (typeof CATEGORIES)[number];

/**
 * Âncora e subtítulo de cada seção da listagem /produtos. `whatsappTerm` é o
 * termo usado na mensagem pré-preenchida do WhatsApp.
 */
export const CATEGORY_SECTIONS: Record<
  Category,
  { id: string; label: string; lead: string; whatsappTerm: string }
> = {
  "Porta de Correr Automática": {
    id: "correr",
    label: "Portas de correr automáticas",
    lead: "A folha desliza para o lado e se recolhe sobre o painel fixo. A escolha padrão quando existe parede lateral disponível para o recolhimento.",
    whatsappTerm: "porta automática",
  },
  "Porta Telescópica Automática": {
    id: "telescopicas",
    label: "Portas telescópicas automáticas",
    lead: "Duas folhas por lado deslizam sobrepostas e sincronizadas. Abrem o mesmo vão usando cerca de metade do espaço lateral de uma porta de correr comum.",
    whatsappTerm: "porta telescópica",
  },
  "Porta Antipânico / Rota de Fuga": {
    id: "antipanico",
    label: "Portas antipânico para rota de fuga",
    lead: "Entrada automática no dia a dia que, sob pressão manual no sentido da saída, gira para fora e libera o vão inteiro — sem depender de energia. Para quem precisa que a entrada também sirva de saída de emergência.",
    whatsappTerm: "",
  },
};

/**
 * Explicação do sistema telescópico, exibida com o diagrama 2:1 na página de
 * produto. Só a linha telescópica tem esta seção.
 */
export type TelescopicSystem = {
  title: string;
  paragraphs: string[];
};

/**
 * Certificações e classificações do produto, centralizadas aqui de propósito:
 * a ficha técnica é gerada a partir deste campo (ver `complianceGroup`), então
 * publicar uma classificação nova é editar dado, não reescrever página.
 *
 * `fireRating` fica vazio enquanto não houver laudo de ensaio de resistência
 * ao fogo emitido por laboratório acreditado. Sem laudo, a classificação é
 * classe de produto regulada e não pode ser afirmada.
 */
export type Certifications = {
  /** Selos do mecanismo, exibidos na ficha e no badge do hero. */
  seals: string[];
  /** Ciclo de vida declarado pelo fabricante. */
  lifecycle?: string;
  /** Classificação de resistência ao fogo — só com laudo em mãos. */
  fireRating?: string;
};

/** Política de garantia do produto, exibida na ficha técnica. */
export type Warranty = {
  term: string;
  /** Complemento opcional, ex.: prazo de suporte pós-venda. */
  support?: string;
};

/**
 * Seção "Como funciona o antipânico": os dois modos de operação da mesma
 * porta, com o diagrama em planta. Só a linha antipânico tem esta seção.
 */
export type EmergencySystem = {
  title: string;
  paragraphs: string[];
  modes: { icon: IconName; title: string; text: string }[];
};

/** Bloco de destaque da função de proteção contra incêndio. */
export type FireProtection = {
  title: string;
  lead: string;
  points: { icon: IconName; title: string; text: string }[];
};

/**
 * Contexto normativo. Descreve a exigência que existe no projeto e encaminha
 * o enquadramento ao responsável técnico — a conformidade é do projeto e da
 * instalação, nunca do equipamento isolado.
 */
export type RegulatoryContext = {
  title: string;
  paragraphs: string[];
  note: string;
};

export type Product = {
  slug: string;
  name: string;
  /**
   * Nome curto para títulos de seção e rótulos de botão, quando o nome
   * comercial é longo demais para caber na frase. O nome completo
   * continua no h1, na metadata e na mensagem do WhatsApp.
   */
  shortName?: string;
  category: Category;
  /** Complemento curto da categoria, ex.: "Heavy Duty" (usado no carrossel). */
  variantLabel: string;
  shortDescription: string;
  /** Parágrafos da visão geral na página de produto. */
  overview: string[];
  badges: string[];
  /** Specs de destaque exibidas em cards/vitrines (valor em fonte mono). */
  keySpecs: { label: string; value: string }[];
  /**
   * Callout de destaque do motor (renderizado após a visão geral).
   * Omitido quando o fabricante não publica os dados do motor do modelo.
   */
  motorHighlight?: {
    title: string;
    text: string;
    specs: string;
  };
  features: Feature[];
  /** Seção "Como funciona o sistema telescópico" — só na linha telescópica. */
  telescopicSystem?: TelescopicSystem;
  /** Seção "Como funciona o antipânico" — só na linha antipânico. */
  emergencySystem?: EmergencySystem;
  /** Bloco de proteção contra incêndio — só na linha antipânico. */
  fireProtection?: FireProtection;
  /** Bloco de contexto normativo — só na linha antipânico. */
  regulatoryContext?: RegulatoryContext;
  certifications: Certifications;
  warranty: Warranty;
  specGroups: SpecGroup[];
  applications: Feature[];
  images: ProductImage[];
  datasheetUrl?: string;
};

// Frase calibrada do brushless: motores sempre geram algum calor — a vantagem
// real é gerar/acumular MENOS calor que motores com escova. Nada de "nunca
// esquenta".
const brushlessText =
  "Maior eficiência energética e menor atrito mecânico: o motor brushless gera e acumula menos calor que motores com escova, favorecendo o funcionamento contínuo sem superaquecimento, mesmo em uso intenso.";

// AG200 — linha compacta para vãos estreitos (ficha oficial de 21/07/2026)
const ag200: Product = {
  slug: "ag200",
  name: "AG200",
  category: "Porta de Correr Automática",
  // Vazio: a categoria é exibida sem complemento
  variantLabel: "",
  shortDescription:
    "Operador compacto para vãos estreitos: folhas de até 150 kg (ou 2×140 kg em porta dupla), tela digital de ajuste, proteção anti-esmagamento e operação com bateria durante queda de energia.",
  overview: [
    "AG200: o operador para entradas onde o espaço é curto. O motor de desenho quadrado e compacto foi projetado justamente para vãos estreitos, em que um cabeçote convencional não se acomoda — sem abrir mão de mover folhas de até 150 kg (ou 2×140 kg em porta dupla), com largura de folha de 500 a 2000 mm.",
    "Na instalação, o ajuste é feito por tela digital, com autoaprendizagem dos limites da porta: o equipamento reconhece o curso e você calibra velocidade (10–55 cm/s) e tempo de abertura (0–20 segundos) direto no painel. São cinco modos de função — sempre aberto, meio-aberto, somente saída, travado e normal — e a proteção anti-esmagamento atua tanto na abertura quanto no fechamento.",
    "Para integração, aceita fechadura eletrônica, teclado de acesso, leitor biométrico, controle remoto, botoeira, sensor de segurança e alarme de incêndio. Com bateria, a porta segue operando durante queda de energia. Alimentação AC 90–240V e mecanismo certificado CE, TÜV, ISO 9001 e RoHS.",
  ],
  badges: [
    "Linha Compacta — até 150 kg",
    "Tela Digital de Ajuste",
    "Proteção Anti-esmagamento",
  ],
  keySpecs: [
    { label: "Capacidade de carga", value: "até 200 kg" },
    { label: "Velocidade ajustável", value: "10–55 cm/s" },
    { label: "Modos de função", value: "5 modos" },
  ],
  motorHighlight: {
    title: "Motor brushless compacto",
    text: brushlessText,
    specs: "24V · 80W · 2800 rpm",
  },
  features: [
    {
      icon: "layout-panel-top",
      title: "Feito para vãos estreitos",
      text: "Motor de desenho quadrado e compacto: entra onde o cabeçote convencional não cabe, movendo folhas de até 150 kg (ou 2×140 kg em porta dupla).",
    },
    {
      icon: "shield-check",
      title: "Proteção anti-esmagamento",
      text: "O sistema detecta obstrução e atua tanto na abertura quanto no fechamento — segurança do pedestre nos dois sentidos do movimento.",
    },
    {
      icon: "sliders",
      title: "Tela digital de ajuste",
      text: "Parâmetros calibrados direto no painel, com autoaprendizagem dos limites da porta: o equipamento reconhece sozinho o curso da folha.",
    },
    {
      icon: "radio",
      title: "5 modos de função",
      text: "Sempre aberto, meio-aberto, somente saída, travado e normal — a porta acompanha a rotina do estabelecimento sem ser desligada.",
    },
    {
      icon: "plug-zap",
      title: "Bivolt com backup por bateria",
      text: "Alimentação AC 90–240V, 50/60Hz e operação por bateria: a porta continua funcionando durante queda de energia.",
    },
    {
      icon: "scan-line",
      title: "Integra com controle de acesso",
      text: "Compatível com fechadura eletrônica, teclado de acesso, leitor biométrico, controle remoto, botoeira, sensor de segurança e alarme de incêndio.",
    },
  ],
  certifications: {
    seals: ["CE", "TÜV", "ISO 9001", "RoHS"],
    lifecycle: "2 milhões de ciclos garantidos (aprovado pelo TÜV)",
  },
  warranty: { term: "12 meses" },
  specGroups: [
    {
      title: "Motor e desempenho",
      rows: [
        {
          label: "Tipo",
          value:
            "Operador de porta de correr automática, linha compacta (motor de desenho quadrado para vãos estreitos)",
        },
        {
          label: "Motor",
          value: "Brushless DC 24V, 80W, 2800 rpm",
          mono: true,
        },
        {
          label: "Modo de folha da porta",
          value: "Abertura simples / Abertura dupla",
        },
        {
          label: "Peso da folha da porta",
          value: "Máx. 150 kg (simples) / Máx. 2×140 kg (dupla)",
          mono: true,
        },
        {
          label: "Largura da folha da porta",
          value: "500–2000 mm",
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
          value: "<40 N (simples) / <50 N (dupla)",
          mono: true,
        },
        {
          label: "Tensão",
          value: "AC 90–240V, 50/60Hz",
          mono: true,
        },
        {
          label: "Temperatura de operação",
          value: "-10°C a +70°C",
          mono: true,
        },
        { label: "Material do gabinete", value: "Alumínio" },
      ],
    },
    {
      title: "Controle e segurança",
      rows: [
        {
          label: "Controle",
          value:
            "Tela digital para ajuste dos parâmetros, com autoaprendizagem dos limites da porta",
        },
        {
          label: "Modos de função",
          value:
            "Sempre aberto / Meio-aberto / Somente saída / Travado / Normal",
        },
        {
          label: "Segurança",
          value: "Anti-esmagamento na abertura e no fechamento",
        },
        {
          label: "Compatibilidade de acessórios",
          value:
            "Fechadura eletrônica, teclado de acesso, leitor biométrico, controle remoto, botoeira, sensor de segurança, alarme de incêndio",
        },
        {
          label: "Backup",
          value:
            "Operação por bateria — mantém a porta funcionando durante queda de energia",
        },
      ],
    },
  ],
  // A seção de aplicações só é renderizada quando o array tem itens.
  applications: [],
  images: [
    {
      src: "/produtos/ag200-hero.png",
      alt: "Operador de porta de correr automática AG200 instalado sobre entrada de vidro com múltiplos painéis",
    },
    {
      src: "/produtos/ag200-galeria-2.png",
      alt: "AG200 com selos de certificação CE, ciclo de vida de 2 milhões aprovado pelo TÜV e motor de 80W",
    },
    {
      src: "/produtos/ag200-detalhes-tecnicos.png",
      alt: "Vista detalhada do mecanismo AG200 com componentes identificados: motor, controlador, correia, trilho, carrinhos, limitadores e polia",
    },
    {
      src: "/produtos/ag200-embalagem.png",
      alt: "Itens da embalagem padrão do AG200: trilho com cobertura, controlador, motor, sensor de micro-ondas, fotocélula, controles remotos, correia, polia, suportes com design antiqueda, limitadores e parafusos",
    },
  ],
  datasheetUrl: "/panfletos/AG200-Panfleto.pdf",
};

// AG400 — linha heavy duty (ficha oficial de 21/07/2026)
const ag400: Product = {
  slug: "ag400",
  name: "AG400",
  category: "Porta de Correr Automática",
  variantLabel: "Linha Heavy Duty",
  shortDescription:
    "Operador heavy duty: folhas de até 200 kg (ou 2×180 kg em porta dupla), motor brushless abaixo de 50 dBA e velocidade ajustável — para entradas de uso intenso.",
  overview: [
    "AG400: o operador que resolve a maioria das especificações — entradas de uso intenso em comércio, condomínios, escritórios e clínicas, com folhas de até 200 kg (ou 2×180 kg em porta dupla). O motor brushless DC de 24V e 100W (2300 rpm) trabalha abaixo de 50 dBA, com ciclo de vida de 2 milhões de operações — números que dão segurança para quem assina o projeto e instala com o próprio nome.",
    "Na instalação, o ajuste é todo seu: velocidade de abertura e fechamento reguláveis de 10 a 55 cm/s e tempo de permanência aberta de 0 a 20 segundos, calibrados para o fluxo real do ambiente. O acionamento auxiliar é por controle remoto de função, e a alimentação bivolt automática (AC 100–240V) elimina erro de especificação elétrica em qualquer região do país.",
    "O kit padrão completo: trilho com tampa e tampa lateral, controlador, motor, sensores, fotocélula, correia, polia, roldanas reforçadas, limitadores, conectores e parafusos.",
  ],
  badges: [
    "Linha Heavy Duty — até 200 kg",
    "Motor Brushless Silencioso",
    "Bivolt Automático",
  ],
  keySpecs: [
    { label: "Capacidade de carga", value: "até 400 kg" },
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
      title: "Silencioso",
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
      text: "Mecanismo com marcação CE, aprovação TÜV, ISO 9001 e RoHS, com ciclo de vida de 2 milhões de operações.",
    },
  ],
  certifications: {
    seals: ["CE", "TÜV", "ISO 9001", "RoHS"],
    lifecycle: "2 milhões de ciclos garantidos (aprovado pelo TÜV)",
  },
  warranty: { term: "12 meses" },
  specGroups: [
    {
      title: "Motor e desempenho",
      rows: [
        {
          label: "Tipo",
          value:
            "Operador de porta de correr automática, linha heavy duty (mecanismo motorizado)",
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
      title: "Instalação e compatibilidade",
      rows: [
        {
          label: "Largura da folha da porta",
          value: "500–2000 mm",
          mono: true,
        },
        {
          label: "Tensão",
          value: "AC 100–240V, 50/60Hz (bivolt automático)",
          mono: true,
        },
        {
          label: "Compatibilidade",
          value: "Portas com moldura e sem moldura, vidro temperado",
        },
        { label: "Material do gabinete", value: "Alumínio, acabamento prata" },
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
            "Sensores, fotocélula e controle remoto de função (inclusos no kit)",
        },
        {
          label: "Controlador",
          value: "Mantém a configuração após queda de energia",
        },
      ],
    },
  ],
  applications: [
    {
      icon: "store",
      title: "Comércio",
      text: "Lojas, farmácias e supermercados com alto fluxo de entrada e saída.",
    },
    {
      icon: "building",
      title: "Condomínios",
      text: "Portarias e halls sociais com controle de acesso e conforto para moradores.",
    },
    {
      icon: "briefcase",
      title: "Escritórios",
      text: "Recepções corporativas que pedem silêncio e uma entrada de boa impressão.",
    },
    {
      icon: "stethoscope",
      title: "Clínicas e hospitais",
      text: "Acesso sem toque, higiene e baixo ruído para ambientes de saúde.",
    },
  ],
  images: [
    {
      src: "/produtos/ag400-hero.png",
      alt: "Operador de porta de correr automática AG400 instalado sobre porta de vidro dupla com moldura escura",
    },
    {
      src: "/produtos/ag400-galeria-2.png",
      alt: "AG400 com selos de certificação CE, ciclo de vida de 2 milhões aprovado pelo TÜV e motor de 100W",
    },
    {
      src: "/produtos/ag400-detalhes-tecnicos.png",
      alt: "Vista detalhada do mecanismo AG400 com componentes identificados: motor, controlador, correia, trilho, roldanas, limitadores e polia",
    },
    {
      src: "/produtos/ag400-embalagem.png",
      alt: "Itens da embalagem padrão do AG400: trilho com tampa lateral, controlador, motor, sensores, fotocélula, controles remotos, correia, polia, roldanas reforçadas, limitadores e parafusos",
    },
  ],
  datasheetUrl: "/panfletos/AG400-Panfleto.pdf",
};

/**
 * Explicação do sistema telescópico — a mesma física nos dois modelos, com o
 * fechamento citando a faixa de folha de cada um.
 */
function telescopicSystem(dwRange: string): TelescopicSystem {
  return {
    title: "Como funciona o sistema telescópico",
    paragraphs: [
      "Numa porta de correr comum, a folha precisa de um espaço lateral do mesmo tamanho do vão para se recolher: para abrir 2 metros livres, é preciso reservar 2 metros de painel fixo ao lado. Em fachada estreita, isso simplesmente não cabe.",
      "Na telescópica, cada lado tem duas folhas que deslizam sobrepostas e sincronizadas. A folha de fora percorre o dobro do caminho da folha de dentro no mesmo tempo — é o sincronismo 2:1 — e as duas terminam empilhadas uma sobre a outra. Na prática, o mesmo vão livre é aberto usando cerca de metade do espaço lateral que a porta de correr comum exigiria.",
      `São dois os cenários em que ela é a solução: entradas largas com pouca parede lateral, e vãos muito largos, em que uma folha única ficaria pesada e lenta demais. Com folhas de ${dwRange}, a composição é fechada a partir da medida real do vão — em abertura simples (as folhas correm todas para um lado) ou dupla (as folhas se abrem do centro para os dois lados).`,
    ],
  };
}

// AG-T200 — linha telescópica padrão. Ficha e recursos conferidos no manual
// de instalação do fabricante (tabela "Telescopic door") em 17/08/2026.
const agT200: Product = {
  slug: "ag-t200",
  name: "AG-T200",
  category: "Porta Telescópica Automática",
  variantLabel: "Linha Padrão",
  shortDescription:
    "Operador telescópico com a maior capacidade em folha dupla da linha: até 2×150 kg em abertura simples e 4×130 kg em dupla, folhas de 600 a 1500 mm, motor brushless de 100W abaixo de 40 dB e sincronismo 2:1.",
  overview: [
    "AG-T200: o operador telescópico para a fachada que não tem parede lateral sobrando. Duas folhas por lado deslizam sobrepostas e sincronizadas no sistema 2:1, abrindo o vão livre com cerca de metade do espaço de recolhimento que uma porta de correr comum exigiria — a saída para entradas largas em vidro, onde não há painel fixo suficiente para uma folha inteira se recolher.",
    "É o modelo com a maior capacidade em folha dupla do catálogo telescópico: até 2×150 kg em abertura simples e até 4×130 kg em abertura dupla, com folhas de 600 a 1500 mm nas duas configurações. O motor é brushless DC de 24V e 100W (2300 rpm), com operação abaixo de 40 dB.",
    "Na obra, velocidade de abertura e de fechamento são reguláveis de 15 a 50 cm/s e o tempo de porta aberta vai de 0 a 20 segundos. O controle é por microprocessador com autoaprendizagem na energização, ativável pelo usuário, e o ajuste dos parâmetros é manual, sem software proprietário. O conjunto reverte ao encontrar resistência na abertura e no fechamento, aceita intertravamento (inter-lock) com múltiplos sistemas de controle de acesso e tem controle dedicado para fechadura eletrônica. Alimentação AC 90–250V, 50/60 Hz, e faixa de operação de -10 °C a +70 °C.",
  ],
  badges: [
    "Linha Padrão — até 4×130 kg em folha dupla",
    "Sincronismo 2:1",
    "Abaixo de 40 dB",
  ],
  keySpecs: [
    { label: "Carga (abertura dupla)", value: "4×130 kg" },
    { label: "Largura da folha", value: "600–1500 mm" },
    { label: "Velocidade ajustável", value: "15–50 cm/s" },
  ],
  motorHighlight: {
    title: "Motor brushless: potência sem superaquecimento",
    text: brushlessText,
    specs: "24V · 100W · 2300 rpm",
  },
  features: [
    {
      icon: "move-horizontal",
      title: "Sincronismo 2:1",
      text: "A folha de fora percorre o dobro do caminho da folha de dentro no mesmo tempo: as duas chegam juntas ao fim do curso, sem desalinhar.",
    },
    {
      icon: "ruler",
      title: "Metade do espaço lateral",
      text: "Abre o mesmo vão livre com cerca de metade do recolhimento de uma porta de correr comum — resolve a fachada larga sem painel fixo disponível.",
    },
    {
      icon: "layout-panel-top",
      title: "A maior capacidade em folha dupla",
      text: "Até 4×130 kg em abertura dupla e 2×150 kg em simples, com folhas de 600 a 1500 mm nas duas configurações.",
    },
    {
      icon: "volume-off",
      title: "Abaixo de 40 dB",
      text: "Motor brushless DC de 24V, 100W e 2300 rpm, com abertura e fechamento suaves e operação abaixo de 40 dB.",
    },
    {
      icon: "cpu",
      title: "Autoaprendizagem na energização",
      text: "O controle por microprocessador reconhece o curso da porta ao ser energizado — recurso ativável pelo usuário —, e os parâmetros são ajustados manualmente, sem software proprietário.",
    },
    {
      icon: "link",
      title: "Intertravamento e reversão",
      text: "Aceita intertravamento (inter-lock) com múltiplos sistemas de controle de acesso, tem controle para fechadura eletrônica e reverte o movimento ao encontrar resistência.",
    },
  ],
  telescopicSystem: telescopicSystem("600 a 1500 mm"),
  certifications: { seals: [] },
  warranty: { term: "12 meses" },
  specGroups: [
    {
      title: "Mecanismo e desempenho",
      rows: [
        { label: "Tipo", value: "Operador de porta telescópica automática" },
        {
          label: "Modo de folha da porta",
          value:
            "Telescópica de abertura simples / Telescópica de abertura dupla",
        },
        {
          label: "Capacidade de carga",
          value:
            "Máx. 2×150 kg (abertura simples) / máx. 4×130 kg (abertura dupla)",
          mono: true,
        },
        { label: "Largura da folha (DW)", value: "600–1500 mm", mono: true },
        {
          label: "Motor",
          value: "Brushless DC 24V, 100W, 2300 rpm",
          mono: true,
        },
        {
          label: "Velocidade de abertura",
          value: "15–50 cm/s (ajustável)",
          mono: true,
        },
        {
          label: "Velocidade de fechamento",
          value: "15–50 cm/s (ajustável)",
          mono: true,
        },
        {
          label: "Tempo de permanência aberta",
          value: "0–20 segundos (ajustável)",
          mono: true,
        },
        {
          label: "Força de abertura manual",
          value: "<40 N (simples) / <50 N (dupla)",
          mono: true,
        },
      ],
    },
    {
      title: "Controle e integração",
      rows: [
        {
          label: "Controle",
          value:
            "Microprocessador com autoaprendizagem na energização (ativável pelo usuário) e ajuste manual dos parâmetros",
        },
        {
          label: "Segurança",
          value:
            "Reversão ao encontrar resistência, na abertura e no fechamento",
        },
        {
          label: "Integração",
          value:
            "Intertravamento (inter-lock) com múltiplos sistemas de controle de acesso; controle dedicado para fechadura eletrônica",
        },
        { label: "Sincronismo das folhas", value: "2:1", mono: true },
      ],
    },
    {
      title: "Instalação e ambiente",
      rows: [
        { label: "Alimentação", value: "AC 90–250V, 50/60 Hz", mono: true },
        { label: "Nível de ruído", value: "Abaixo de 40 dB", mono: true },
        {
          label: "Temperatura de operação",
          value: "-10 °C a +70 °C",
          mono: true,
        },
      ],
    },
  ],
  applications: [
    {
      icon: "stethoscope",
      title: "Hospitais e clínicas",
      text: "Circulações largas, com passagem de maca e equipamento, em fachadas sem parede lateral sobrando.",
    },
    {
      icon: "hotel",
      title: "Hotéis",
      text: "Entradas principais amplas em fachada de vidro, onde não há painel fixo para recolher uma folha inteira.",
    },
    {
      icon: "shopping-bag",
      title: "Shoppings e varejo",
      text: "Acessos largos e convidativos em lojas âncora e galerias com pouco espaço lateral.",
    },
    {
      icon: "building",
      title: "Prédios corporativos",
      text: "Halls e recepções com vão amplo, mantendo a fachada limpa sem alargar o painel lateral.",
    },
  ],
  images: [
    {
      src: "/produtos/ag-t200-hero.png",
      alt: "Operador de porta telescópica automática AG-T200 em abertura dupla, com quatro folhas de vidro recolhidas em cada lado sob o cabeçote",
    },
    {
      src: "/produtos/ag-t200-detalhes-tecnicos.png",
      alt: "Vista interna do cabeçote do AG-T200 com os componentes identificados: motor, controladora, polia interna, polia externa, polia livre, correia e conectores, suportes interno e externo, placa de fixação da correia e batente",
    },
    {
      src: "/produtos/ag-t200-especificacoes.png",
      alt: "Tabela de especificações do AG-T200: modo de folha, peso e largura da folha, tensão, velocidades, tempo de abertura, força de abertura manual e temperatura de operação",
    },
  ],
  datasheetUrl: "/panfletos/AG-T200-Panfleto.pdf",
};

// AG-T400 — linha telescópica premium. Ficha e recursos conferidos no manual
// de instalação do fabricante (tabela "Telescopic door") em 17/08/2026. A
// tabela da página de produto do fabricante traz outros números e foi
// descartada por conflitar com o manual do mesmo modelo.
const agT400: Product = {
  slug: "ag-t400",
  name: "AG-T400",
  category: "Porta Telescópica Automática",
  variantLabel: "Linha Premium",
  shortDescription:
    "Operador telescópico premium: faixa de velocidade de 10 a 55 cm/s, permanência aberta de até 60 segundos e operação a partir de -20 °C, com motor brushless de 100W abaixo de 40 dB.",
  overview: [
    "AG-T400: o operador telescópico para a entrada que precisa de regulagem fina. Mesmo princípio 2:1 da linha — duas folhas por lado deslizando sobrepostas, vão largo com cerca de metade do espaço lateral —, com a faixa de ajuste mais ampla do catálogo telescópico.",
    "A velocidade vai de 10 a 55 cm/s na abertura e no fechamento, e a porta pode ficar aberta de 0 a 60 segundos — três vezes o tempo máximo do AG-T200, o que resolve carga e descarga, passagem de maca e fluxo de pico sem precisar reacionar a porta. A faixa térmica começa em -20 °C, 10 °C abaixo do restante do catálogo.",
    "O motor é brushless DC de 24V e 100W (2300 rpm) e a operação fica abaixo de 40 dB. O controle é por microprocessador com autoaprendizagem na energização, ativável pelo usuário, e o ajuste é manual, sem software proprietário. O conjunto reverte ao encontrar resistência na abertura e no fechamento, aceita intertravamento (inter-lock) com múltiplos sistemas de controle de acesso e tem controle dedicado para fechadura eletrônica. Alimentação AC 90–240V, 50/60 Hz, e folhas de 600 a 1500 mm com até 2×150 kg em abertura simples e 4×120 kg em dupla.",
  ],
  badges: [
    "Linha Premium — permanência de até 60 s",
    "Velocidade de 10 a 55 cm/s",
    "Opera a partir de -20 °C",
  ],
  keySpecs: [
    { label: "Velocidade ajustável", value: "10–55 cm/s" },
    { label: "Permanência aberta", value: "0–60 s" },
    { label: "Temperatura mínima", value: "-20 °C" },
  ],
  motorHighlight: {
    title: "Motor brushless: potência sem superaquecimento",
    text: brushlessText,
    specs: "24V · 100W · 2300 rpm",
  },
  features: [
    {
      icon: "move-horizontal",
      title: "Sincronismo 2:1",
      text: "A folha de fora percorre o dobro do caminho da folha de dentro no mesmo tempo: as duas chegam juntas ao fim do curso, sem desalinhar.",
    },
    {
      icon: "gauge",
      title: "A faixa de ajuste mais ampla da linha",
      text: "Abertura e fechamento de 10 a 55 cm/s: regula tanto para o movimento lento de um acesso controlado quanto para o fluxo rápido de uma entrada cheia.",
    },
    {
      icon: "sliders",
      title: "Permanência aberta de até 60 segundos",
      text: "Três vezes o tempo máximo do AG-T200 — resolve carga e descarga, passagem de maca e horário de pico sem reacionar a porta.",
    },
    {
      icon: "thermometer",
      title: "Opera a partir de -20 °C",
      text: "Faixa de -20 °C a +50 °C, 10 °C abaixo do restante do catálogo no piso da escala.",
    },
    {
      icon: "cpu",
      title: "Autoaprendizagem na energização",
      text: "O controle por microprocessador reconhece o curso da porta ao ser energizado — recurso ativável pelo usuário —, e os parâmetros são ajustados manualmente, sem software proprietário.",
    },
    {
      icon: "link",
      title: "Intertravamento e reversão",
      text: "Aceita intertravamento (inter-lock) com múltiplos sistemas de controle de acesso, tem controle para fechadura eletrônica e reverte o movimento ao encontrar resistência.",
    },
  ],
  telescopicSystem: telescopicSystem("600 a 1500 mm"),
  certifications: { seals: [] },
  warranty: { term: "12 meses" },
  specGroups: [
    {
      title: "Mecanismo e desempenho",
      rows: [
        {
          label: "Tipo",
          value: "Operador de porta telescópica automática, linha premium",
        },
        {
          label: "Modo de folha da porta",
          value:
            "Telescópica de abertura simples / Telescópica de abertura dupla",
        },
        {
          label: "Capacidade de carga",
          value:
            "Máx. 2×150 kg (abertura simples) / máx. 4×120 kg (abertura dupla)",
          mono: true,
        },
        { label: "Largura da folha (DW)", value: "600–1500 mm", mono: true },
        {
          label: "Motor",
          value: "Brushless DC 24V, 100W, 2300 rpm",
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
          label: "Tempo de permanência aberta",
          value: "0–60 segundos (ajustável)",
          mono: true,
        },
        {
          label: "Força de abertura manual",
          value: "<40 N (simples) / <50 N (dupla)",
          mono: true,
        },
      ],
    },
    {
      title: "Controle e integração",
      rows: [
        {
          label: "Controle",
          value:
            "Microprocessador com autoaprendizagem na energização (ativável pelo usuário) e ajuste manual dos parâmetros",
        },
        {
          label: "Segurança",
          value:
            "Reversão ao encontrar resistência, na abertura e no fechamento",
        },
        {
          label: "Integração",
          value:
            "Intertravamento (inter-lock) com múltiplos sistemas de controle de acesso; controle dedicado para fechadura eletrônica",
        },
        { label: "Sincronismo das folhas", value: "2:1", mono: true },
      ],
    },
    {
      title: "Instalação e ambiente",
      rows: [
        { label: "Alimentação", value: "AC 90–240V, 50/60 Hz", mono: true },
        { label: "Nível de ruído", value: "Abaixo de 40 dB", mono: true },
        {
          label: "Temperatura de operação",
          value: "-20 °C a +50 °C",
          mono: true,
        },
        {
          label: "Vão livre de referência",
          value:
            "2666 mm em 4000 mm de largura total (contra 2000 mm em porta de correr de duas folhas)",
          mono: true,
        },
      ],
    },
  ],
  applications: [
    {
      icon: "flask",
      title: "Laboratórios e salas limpas",
      text: "Ambientes controlados com vão largo, intertravamento entre portas e pouca parede lateral disponível.",
    },
    {
      icon: "stethoscope",
      title: "Hospitais e clínicas",
      text: "Circulações que precisam de passagem larga e de porta aberta por mais tempo na passagem de maca.",
    },
    {
      icon: "plane",
      title: "Aeroportos e terminais",
      text: "Acessos de alto fluxo integrados ao sistema de controle de acesso do terminal.",
    },
    {
      icon: "building",
      title: "Prédios corporativos",
      text: "Recepções com credenciamento, em que a porta conversa com catraca e leitor de acesso.",
    },
  ],
  images: [
    {
      src: "/produtos/ag-t400-hero.png",
      alt: "Operador de porta telescópica automática AG-T400 em abertura dupla, com quatro folhas de vidro recolhidas em cada lado sob o cabeçote",
    },
    {
      src: "/produtos/ag-t400-dimensoes.png",
      alt: "Comparativo dimensional do AG-T400: em 4000 mm de largura total, a porta de correr de duas folhas abre 2000 mm de vão livre e a telescópica abre 2666 mm",
    },
    {
      src: "/produtos/ag-t400-especificacoes.png",
      alt: "Tabela de especificações do AG-T400: tipo e peso da folha, largura da folha, tensão, velocidades de abertura e fechamento, tempo de abertura, força de abertura manual e temperatura de operação",
    },
  ],
  datasheetUrl: "/panfletos/AG-T400-Panfleto.pdf",
};

// Porta de Correr Antipânico Total — categoria própria: o critério de escolha
// do cliente é exigência de projeto (rota de fuga), não conveniência de fluxo.
// Ficha oficial do fabricante de 27/08/2026. Nível de ruído e força de
// acionamento do antipânico não são publicados para este modelo: ficam fora
// da tabela em vez de herdarem número de outro produto.
const antipanicoTotal: Product = {
  slug: "antipanico-total",
  name: "Porta de Correr Antipânico Total",
  shortName: "Antipânico Total",
  category: "Porta Antipânico / Rota de Fuga",
  variantLabel: "",
  shortDescription:
    "Entrada automática que também é rota de fuga: sob pressão manual no sentido da saída, as folhas giram para fora como portas de abrir e liberam o vão inteiro — sem depender de energia elétrica.",
  overview: [
    "Numa rota de fuga, a porta de correr comum é um risco conhecido: se falta energia ou o sistema trava, ela deixa de abrir e vira parede. A Porta de Correr Antipânico Total resolve isso por mecânica, não por eletrônica — as folhas móveis e os painéis fixos laterais são montados sobre eixos com travamento que se libera sob pressão manual no sentido da saída. Empurrou, abriu.",
    "No dia a dia ela é uma entrada automática como qualquer outra: sensor de presença, integração com controle de acesso, folhas de até 200 kg (ou 2×180 kg em abertura dupla) e largura de folha de 500 a 2000 mm. Em emergência, muda de comportamento sem depender de comando eletrônico, de chave ou de alguém treinado por perto.",
    "As velocidades de abertura e de fechamento vão de 20 a 60 cm/s e a permanência aberta chega a 60 segundos, ajustáveis conforme o fluxo de pessoas previsto no projeto — em evacuação, é o que define quantas pessoas atravessam o vão por minuto. O dimensionamento é sob medida, a partir do vão real. Mecanismo com marcação CE, ISO 9001 e RoHS.",
  ],
  badges: ["Rota de fuga", "Abertura sem energia", "Vão total liberado"],
  keySpecs: [
    { label: "Capacidade de carga", value: "até 200 kg" },
    { label: "Velocidade ajustável", value: "20–60 cm/s" },
    { label: "Permanência aberta", value: "0–60 s" },
  ],
  motorHighlight: {
    title: "Motor brushless DC de 24V",
    text: brushlessText,
    specs: "24V · 100W · 3600 rpm",
  },
  emergencySystem: {
    title: "Uma porta, dois modos de operação",
    paragraphs: [
      "A mesma folha que desliza o dia inteiro como porta automática é a folha que gira para fora na emergência. Não são dois equipamentos, nem uma porta de correr com uma porta de emergência ao lado: é uma entrada só, que muda de comportamento quando alguém empurra no sentido da saída.",
      "O travamento que segura a folha no eixo cede sob pressão manual. Como o acionamento é mecânico, ele não depende da rede elétrica, do controlador nem de qualquer comando — funciona com a instalação desenergizada. Os painéis fixos laterais giram junto, e é isso que libera a largura total do vão, e não apenas a passagem das folhas móveis.",
      "Terminada a emergência, as folhas voltam à posição e a porta retoma a operação automática normal.",
    ],
    modes: [
      {
        icon: "move-horizontal",
        title: "Modo normal — entrada automática",
        text: "As folhas deslizam sobre o trilho, comandadas por sensor de presença. Aceita integração com controle de acesso, e as velocidades e o tempo de permanência aberta são ajustáveis conforme o fluxo.",
      },
      {
        icon: "door-open",
        title: "Modo emergência — abertura manual",
        text: "Pressão manual no sentido da saída libera o travamento e as folhas giram para fora, junto com os painéis fixos. O vão fica inteiramente livre, sem energia e sem comando eletrônico.",
      },
    ],
  },
  fireProtection: {
    title: "Função de proteção contra incêndio",
    lead: "É para o pior cenário que este produto existe: prédio às escuras, sistema sem energia, muita gente se deslocando ao mesmo tempo para a saída. A abertura antipânico foi projetada exatamente para esse momento.",
    points: [
      {
        icon: "zap-off",
        title: "Abre sem energia elétrica",
        text: "O acionamento é mecânico. Queda de energia, controlador desligado ou instalação desenergizada não impedem a abertura no sentido da fuga.",
      },
      {
        icon: "layout-panel-top",
        title: "Libera o vão total",
        text: "As folhas móveis e os painéis fixos laterais giram para fora. A largura útil de fuga passa a ser a do vão inteiro, não só a das folhas.",
      },
      {
        icon: "siren",
        title: "Projetada para rota de fuga",
        text: "Concebida para saídas de emergência e rotas de evacuação, com velocidades de 20 a 60 cm/s e permanência aberta de até 60 segundos ajustáveis ao fluxo de pessoas do projeto.",
      },
    ],
  },
  regulatoryContext: {
    title: "Quando o projeto exige abertura antipânico",
    paragraphs: [
      "Em rotas de fuga com público acima de 200 pessoas, a legislação de segurança contra incêndio exige que portas de correr permitam abertura antipânico ou automática no sentido da saída. A exigência específica varia conforme a ocupação e a Instrução Técnica do Corpo de Bombeiros de cada estado — o responsável técnico do projeto define o enquadramento.",
      "Na prática, é a pendência que aparece na análise do projeto ou na vistoria: a entrada principal já existe, é de correr, e precisa passar a funcionar também como saída de emergência. Trocar o operador por um conjunto antipânico resolve isso sem abrir uma segunda porta na fachada.",
    ],
    note: "A Agile Door fornece o equipamento. O enquadramento normativo e a execução em obra são do responsável técnico do projeto e de quem instala.",
  },
  features: [
    {
      icon: "door-open",
      title: "Empurrou, abriu",
      text: "Sob pressão manual no sentido da saída, o travamento libera e a folha gira para fora como uma porta de abrir.",
    },
    {
      icon: "zap-off",
      title: "Independente de energia",
      text: "O acionamento do antipânico é mecânico: não depende da rede elétrica, do controlador nem de ninguém achar uma chave.",
    },
    {
      icon: "layout-panel-top",
      title: "Vão inteiro liberado",
      text: "Os painéis fixos laterais também giram, ampliando a largura útil de fuga além da passagem das folhas móveis.",
    },
    {
      icon: "gauge",
      title: "Ajuste para o fluxo do projeto",
      text: "Velocidades de 20 a 60 cm/s e permanência aberta de 0 a 60 segundos: em evacuação, é o que define quantas pessoas passam por minuto.",
    },
    {
      icon: "hand",
      title: "Entrada automática no dia a dia",
      text: "Fora da emergência é uma porta de correr automática comum, com sensor de presença e integração a controle de acesso.",
    },
    {
      icon: "shield-check",
      title: "Certificação e ciclo de vida",
      text: "Mecanismo com marcação CE, ISO 9001 e RoHS, com 2 milhões de ciclos garantidos.",
    },
  ],
  certifications: {
    seals: ["CE", "ISO 9001", "RoHS"],
    lifecycle: "2 milhões de ciclos garantidos",
    // fireRating: preencher SOMENTE com laudo de ensaio de resistência ao fogo
    // emitido por laboratório acreditado. Sem laudo, a classificação não pode
    // ser afirmada — a linha da ficha sai deste campo, sem mexer na página.
  },
  warranty: { term: "12 meses" },
  specGroups: [
    {
      title: "Operação e capacidade",
      rows: [
        {
          label: "Tipo",
          value: "Porta de correr automática com sistema antipânico",
        },
        {
          label: "Modo de operação",
          value: "Correr automático + abertura manual de emergência",
        },
        { label: "Modo de folha", value: "Abertura simples / abertura dupla" },
        {
          label: "Capacidade de carga",
          value: "Até 200 kg (folha simples) / até 2×180 kg (folha dupla)",
          mono: true,
        },
        { label: "Largura da folha (DW)", value: "500–2000 mm", mono: true },
        {
          label: "Dimensionamento",
          value: "Sob medida, conforme o vão do projeto",
        },
      ],
    },
    {
      title: "Motor e desempenho",
      rows: [
        {
          label: "Motor",
          value: "Brushless DC 24V, 100W, 3600 rpm",
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
          label: "Tempo de permanência aberta",
          value: "0–60 segundos (ajustável)",
          mono: true,
        },
        {
          label: "Alimentação",
          value: "AC 100–240V, 50/60 Hz (bivolt automático)",
          mono: true,
        },
      ],
    },
    {
      title: "Instalação e ambiente",
      rows: [
        {
          label: "Temperatura de operação",
          value: "-10 °C a +70 °C",
          mono: true,
        },
        { label: "Material do gabinete", value: "Alumínio, acabamento prata" },
        { label: "Função de proteção contra incêndio", value: "Sim" },
      ],
    },
  ],
  applications: [
    {
      icon: "shopping-bag",
      title: "Shoppings e lojas de rua",
      text: "Entradas de público alto, em que a rota de fuga passa pela porta principal.",
    },
    {
      icon: "stethoscope",
      title: "Hospitais e clínicas",
      text: "Circulação contínua e evacuação de pessoas com mobilidade reduzida.",
    },
    {
      icon: "hotel",
      title: "Hotéis",
      text: "Recepção e acessos de uso permanente que integram o plano de evacuação.",
    },
    {
      icon: "school",
      title: "Escolas e universidades",
      text: "Saída simultânea de muita gente em pouco tempo, com público jovem.",
    },
    {
      icon: "theater",
      title: "Casas de espetáculo e locais de reunião",
      text: "Ocupação concentrada, com exigência de saída de emergência dimensionada.",
    },
    {
      icon: "plane",
      title: "Aeroportos e terminais",
      text: "Fluxo intenso e ininterrupto, com rotas de evacuação sinalizadas.",
    },
    {
      icon: "store",
      title: "Supermercados",
      text: "Entradas largas, carrinhos e pico de público em horários concentrados.",
    },
    {
      icon: "building",
      title: "Edifícios corporativos",
      text: "Controle de acesso no dia a dia e saída desimpedida na emergência.",
    },
  ],
  images: [
    {
      src: "/produtos/antipanico-total-hero.png",
      alt: "Porta de correr automática com sistema antipânico em operação normal: quatro folhas de vidro sob o cabeçote de alumínio, com o mecanismo de trilho, correia e motor à vista",
    },
    {
      src: "/produtos/antipanico-total-abertura-emergencia.png",
      alt: "A mesma porta em abertura de emergência: as folhas móveis e os painéis fixos laterais girados para fora sobre os eixos, deixando o vão inteiro livre no sentido da saída",
    },
    {
      src: "/produtos/antipanico-total-especificacoes.png",
      alt: "Tabela de especificações: modo de operação, modo de folha, capacidade de carga, largura da folha, alimentação, velocidades, tempo de permanência aberta, motor, temperatura e proteção contra incêndio",
    },
  ],
  datasheetUrl: "/panfletos/Antipanico-Total-Panfleto.pdf",
};


/**
 * Grupo final da ficha, gerado a partir dos campos centralizados de
 * certificação e garantia. É o que torna a inclusão futura de uma
 * classificação de resistência ao fogo uma edição de dado: basta preencher
 * `certifications.fireRating` e a linha passa a aparecer na página, na
 * apresentação e no panfleto, sem tocar em componente nenhum.
 */
function complianceGroup(product: Product): SpecGroup {
  const rows: SpecRow[] = [];
  if (product.certifications.seals.length > 0) {
    rows.push({
      label: "Certificações do mecanismo",
      value: product.certifications.seals.join(", "),
    });
  }
  if (product.certifications.fireRating) {
    rows.push({
      label: "Classificação de resistência ao fogo",
      value: product.certifications.fireRating,
    });
  }
  if (product.certifications.lifecycle) {
    rows.push({
      label: "Ciclo de vida",
      value: product.certifications.lifecycle,
      mono: true,
    });
  }
  rows.push({
    label: "Garantia",
    value: product.warranty.support
      ? product.warranty.term + " \u00b7 " + product.warranty.support
      : product.warranty.term,
  });
  return { title: "Certificações e garantia", rows };
}

const catalogo: Product[] = [ag200, ag400, agT200, agT400, antipanicoTotal];

export const products: Product[] = catalogo.map((product) => ({
  ...product,
  specGroups: [...product.specGroups, complianceGroup(product)],
}));

/** Produtos agrupados por categoria, na ordem de CATEGORIES. */
export const productsByCategory = CATEGORIES.map((category) => ({
  category,
  ...CATEGORY_SECTIONS[category],
  items: products.filter((product) => product.category === category),
})).filter((group) => group.items.length > 0);

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
