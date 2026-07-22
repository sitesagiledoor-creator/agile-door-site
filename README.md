# Agile Door — Site institucional

Site institucional e de vendas da **Agile Door**, distribuidora brasileira de
portas automáticas. Construído com Next.js 16 (App Router, Turbopack),
TypeScript estrito, Tailwind CSS v4, React Hook Form + Zod e Framer Motion.

## Rodando o projeto

```bash
npm install
npm run dev        # desenvolvimento em http://localhost:3000
npm run build      # build de produção
npm run start      # servir o build
npm run lint       # ESLint
npm run format     # Prettier
```

## Estrutura

```
app/                     páginas (App Router) + sitemap/robots
components/ui/           componentes reutilizáveis (Button, Container, …)
components/layout/       Header, Footer, WhatsAppFAB, CookieBanner
components/sections/     seções de página (Hero, SpecTable, ProductGallery, …)
data/products.ts         fonte única dos produtos — adicionar produto = 1 objeto
lib/constants.ts         WhatsApp, contatos, navegação (fonte única)
public/logo/             logos oficiais · public/produtos/ fotos dos produtos
```

## Design system

Tokens centralizados em `app/globals.css` (`@theme` do Tailwind v4 — o
equivalente moderno do `tailwind.config.ts`). Cores extraídas por color picker
das logos oficiais:

| Token                | Hex                   | Uso                                   |
| -------------------- | --------------------- | ------------------------------------- |
| `brand-orange`       | `#F0560A`             | CTAs, destaques (laranja da logo)     |
| `brand-orange-light` | `#F87808`             | Gradiente da logo, acentos sobre navy |
| `brand-orange-dark`  | `#C64A05`             | Texto laranja sobre fundo claro (AA)  |
| `brand-blue`         | `#104890`             | Azul principal da logo, hovers        |
| `brand-navy`         | `#082868`             | Títulos, seções institucionais        |
| `brand-navy-dark`    | `#051B47`             | Fundos escuros (header bar, footer)   |
| `whatsapp` / `-dark` | `#25D366` / `#1DA851` | Somente elementos de WhatsApp         |

Tipografia: **Space Grotesk** (títulos) · **Inter** (corpo) · **IBM Plex Mono**
(números técnicos — assinatura visual). Cantos chanfrados (`chamfer`) ecoam o
símbolo hexagonal da logo.

## Contato

O site **não tem formulário de contato**: o atendimento é centralizado no
WhatsApp (+55 19 3217-8282), com telefone e e-mail como alternativas. O item
"Fale Conosco" do menu abre o WhatsApp direto; a página `/contato` é um hub
de canais (sem campos).

## Variáveis de ambiente

Copie `.env.example` para `.env.local` e preencha (só nomes aqui, nunca
valores reais):

| Variável               | Uso                                            |
| ---------------------- | ---------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | URL pública do site (metadata, sitemap, JSON-LD) |

Nenhuma variável é obrigatória para rodar localmente — sem `.env.local`, o
site usa a URL padrão definida em `lib/constants.ts`.

## Imagens de produto

Fotos oficiais em `public/produtos/` com nomes semânticos
(`ag200-hero.png`, `ag200-galeria-2.png`, `ag200-detalhes-tecnicos.png`,
`ag200-embalagem.png`, equivalentes `ag400-*` e `home-hero.png`). Para trocar
uma foto, substitua o arquivo de mesmo nome — nenhum código muda. As fichas
técnicas nunca entram como imagem: os dados ficam em `data/products.ts` e
renderizam como tabela HTML responsiva.

## Segurança

- Cabeçalhos HTTP (CSP, HSTS, nosniff, Referrer-Policy, Permissions-Policy)
  em `next.config.ts`. O CSP usa `'unsafe-inline'` em `script-src` por
  exigência dos scripts de bootstrap do Next; para política com nonce seria
  necessário um `proxy.ts` dinâmico.
- Sem formulários nem rotas de API: superfície de ataque mínima (site
  estático-friendly; contato via wa.me/tel/mailto).
- Nenhum segredo no client; variáveis sensíveis via `.env.local` (ignorado
  pelo git).

## Deploy

O projeto é **agnóstico de hospedagem**, sem lock-in de provedor.

**Caminho padrão (recomendado):** qualquer plataforma que rode
`next build && next start` (Node 20.9+), ex.: Vercel, Railway, VPS.

**Alternativa para hospedagem apenas-estática:** `npm run build:static` gera
o site 100% estático em `out/` (sem Node.js no servidor) — como o contato é
todo via WhatsApp/tel/mailto, não há perda de funcionalidade. Para servir em
subpasta do domínio, use `STATIC_BASE_PATH=/subpasta`. Dica ao empacotar no
Windows: use um compactador que grave caminhos com `/` (o `Compress-Archive`
do PowerShell 5.1 usa `\` e quebra a extração em servidores Linux).
