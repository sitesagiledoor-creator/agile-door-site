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
  | "headphones";

export type Feature = {
  icon: IconName;
  title: string;
  text: string;
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
    { label: "Capacidade de carga", value: "até 150 kg" },
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
  specGroups: [
    {
      title: "Motor e desempenho",
      rows: [
        {
          label: "Tipo",
          value:
            "Operador de porta de correr automática, linha compacta (motor de desenho quadrado para vãos estreitos)",
        },
        { label: "Motor", value: "Brushless DC 24V, 80W, 2800 rpm", mono: true },
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
    {
      title: "Certificações",
      rows: [
        {
          label: "Certificações do mecanismo",
          value: "CE, TÜV, ISO 9001, RoHS",
        },
        {
          label: "Ciclo de vida",
          value: "2 milhões de operações (aprovado pelo TÜV)",
          mono: true,
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
  // PDF da ficha técnica: substituir quando a arte final estiver pronta.
  datasheetUrl: undefined,
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
    {
      title: "Certificações",
      rows: [
        {
          label: "Certificações do mecanismo",
          value: "CE, TÜV, ISO 9001, RoHS",
        },
        {
          label: "Ciclo de vida",
          value: "2 milhões de operações (aprovado pelo TÜV)",
          mono: true,
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
  // PDF da ficha técnica: substituir quando a arte final estiver pronta.
  datasheetUrl: undefined,
};

export const products: Product[] = [ag200, ag400];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
