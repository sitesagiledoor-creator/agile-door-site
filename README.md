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
npm run package:static   # gera out/ e o .zip de entrega na Área de Trabalho
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
public/panfletos/        fichas técnicas em PDF (botão "Baixar Ficha Técnica")
public/clientes/         logotipos das marcas atendidas (faixa da home)
public/.htaccess         config do Apache para o build estático
public/LEIA-ME.txt       instruções de upload que acompanham o pacote
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

| Variável               | Uso                                              |
| ---------------------- | ------------------------------------------------ |
| `NEXT_PUBLIC_SITE_URL` | URL pública do site (metadata, sitemap, JSON-LD) |

Nenhuma variável é obrigatória para rodar localmente — sem `.env.local`, o
site usa a URL padrão definida em `lib/constants.ts`.

## Catálogo

Os produtos ficam em `data/products.ts`, agrupados por `category`. Acrescentar
um objeto ao array `products` já gera listagem, página de detalhe, carrossel,
sitemap, JSON-LD e o link no rodapé — nenhum outro arquivo precisa mudar. Para
uma categoria nova, acrescente o rótulo em `CATEGORIES` e a seção
correspondente em `CATEGORY_SECTIONS` (âncora, subtítulo e o termo usado na
mensagem do WhatsApp).

## Imagens de produto

Fotos oficiais em `public/produtos/` com nomes semânticos — porta de correr
(`ag200-hero.png`, `ag200-galeria-2.png`, `ag200-detalhes-tecnicos.png`,
`ag200-embalagem.png` e os equivalentes `ag400-*`), porta telescópica
(`ag-t200-hero.png`, `ag-t200-detalhes-tecnicos.png`,
`ag-t200-especificacoes.png`, `ag-t400-hero.png`, `ag-t400-dimensoes.png`) e
`home-hero.png`. Para trocar uma foto, substitua o arquivo de mesmo nome —
nenhum código muda. As fichas técnicas nunca entram como imagem: os dados ficam
em `data/products.ts` e renderizam como tabela HTML responsiva.

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

**Caminho padrão:** qualquer plataforma que rode `next build && next start`
(Node 20.9+), ex.: Vercel, Railway, VPS.

**Hospedagem de arquivos estáticos** (cPanel, Hostinger, qualquer FTP):

```bash
npm run package:static
```

Gera `out/` e um `.zip` datado na Área de Trabalho, pronto para enviar à pasta
pública do servidor. O conteúdo do zip inclui `.htaccess` e `LEIA-ME.txt`.

| Variável               | Quando usar                                                                  |
| ---------------------- | ---------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | domínio final ≠ `www.agiledoor.com.br` — afeta sitemap, robots, OG e JSON-LD |
| `STATIC_BASE_PATH`     | site em subpasta do domínio (ex.: `/agile`)                                  |

Dois detalhes do Windows que já custaram tempo:

- No Git Bash, `STATIC_BASE_PATH=/agile` é convertido para um caminho do
  Windows e o build falha com _"basePath has to start with a /"_. Use
  `MSYS_NO_PATHCONV=1` antes do comando.
- O zip precisa ter os caminhos com `/`. O `Compress-Archive` do PowerShell 5.1
  grava `\` e a extração quebra no Linux — por isso `package:static` usa o
  `tar.exe` do System32 (bsdtar), e não o `tar` do Git, que é o GNU e trata
  `C:\...` como host remoto.

### Cabeçalhos de segurança

No modo servidor vêm de `headers()` em `next.config.ts`. No build estático essa
API não existe, então a mesma política está em `public/.htaccess` (CSP, HSTS,
nosniff, Referrer-Policy, Permissions-Policy) junto de compressão, cache e
`ErrorDocument 404`. Ao mudar a política, mudar nos **dois** lugares.
