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
components/sections/     seções de página (Hero, SpecTable, Faq, …)
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

## Contato — decisão comercial

O site **não tem formulário de contato**: todo o atendimento é centralizado
no WhatsApp (+55 19 3217-8282), com telefone e e-mail como alternativas. O
item "Fale Conosco" do menu abre o WhatsApp direto; a página `/contato`
existe apenas como hub simples de canais (sem campos).

## Variáveis de ambiente

Copie `.env.example` para `.env.local` e preencha (só nomes aqui, nunca
valores reais):

| Variável               | Uso                                            |
| ---------------------- | ---------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | URL pública do site (metadata, sitemap, JSON-LD) |

Nenhuma variável é obrigatória para rodar localmente — sem `.env.local`, o
site usa o domínio provisório definido em `lib/constants.ts`.

## ⚠️ Pendências antes de publicar

1. **Horário de atendimento** — confirmar e ajustar `CONTACT.hours` em
   `lib/constants.ts` (e adicionar `openingHoursSpecification` ao JSON-LD).
2. **Domínio definitivo** — `NEXT_PUBLIC_SITE_URL` no `.env` (ver
   `.env.example`) ou `SITE.url` em `lib/constants.ts`.
3. **Ficha técnica em PDF** — preencher `datasheetUrl` em `data/products.ts`.
4. **Textos marcados** — revisar todos os `[REVISAR COM O CLIENTE]` /
   `[CONFIRMAR …]` (prazos, condições de instalação).
5. **Garantia** — TODAS as menções de garantia/suporte do fabricante foram
   removidas do site em 16/07/2026 (decisão comercial, para evitar
   desacertos com clientes). Reintroduzir nas fichas e textos quando a
   política de garantia da Agile Door estiver definida.
6. **Políticas** — revisão jurídica das páginas de privacidade e cookies.

## Imagens de produto

Fotos oficiais em `public/produtos/` com nomes semânticos
(`ag200-hero.png`, `ag200-galeria-2.png`, `ag200-detalhes-tecnicos.png`,
`ag200-embalagem.png`, equivalentes `ag400-*` e `home-hero.png`). Para trocar
uma foto, substitua o arquivo de mesmo nome — nenhum código muda. Os
screenshots de tabela do fabricante NÃO viram imagem: os dados foram
transcritos para `data/products.ts` e renderizam como tabela HTML responsiva.

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

O projeto é **agnóstico de hospedagem** — o provedor definitivo ainda será
confirmado pelo time da Agile Door.

**Caminho padrão (recomendado):** qualquer plataforma que rode
`next build && next start` (Node 20.9+), ex.: Vercel, Railway, VPS.

**Alternativa para hospedagem apenas-estática:** `npm run build:static` gera
o site 100% estático em `out/` (sem Node.js no servidor) — como o contato é
todo via WhatsApp/tel/mailto, não há perda de funcionalidade. Para servir em
subpasta do domínio, use `STATIC_BASE_PATH=/subpasta`. Dica ao empacotar no
Windows: use um compactador que grave caminhos com `/` (o `Compress-Archive`
do PowerShell 5.1 usa `\` e quebra a extração em servidores Linux).
