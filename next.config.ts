import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

/**
 * Content-Security-Policy:
 * - 'unsafe-inline' em script-src é exigido pelos scripts de bootstrap do
 *   Next.js e pelo JSON-LD inline. Para uma política com nonce, seria preciso
 *   um proxy dinâmico — desnecessário para um site institucional estático.
 * - 'unsafe-eval' e ws: somente em desenvolvimento (Fast Refresh/HMR).
 * - frame-src libera apenas o embed do Google Maps.
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  `connect-src 'self'${isDev ? " ws:" : ""}`,
  "frame-src https://www.google.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

/**
 * STATIC_EXPORT=1 gera o site como HTML/CSS/JS estáticos (pasta out/),
 * para hospedagens sem Node.js (qualquer provedor de arquivos estáticos).
 * Nesse modo: imagens sem otimização server-side e cabeçalhos de segurança
 * aplicados na configuração do servidor web em vez de headers().
 * Use `npm run build:static`.
 */
const isStaticExport = process.env.STATIC_EXPORT === "1";

// Para hospedar o site em uma subpasta do domínio (ex.: site.com/minha-pasta),
// defina STATIC_BASE_PATH=/minha-pasta ao rodar npm run build:static.
const staticBasePath = process.env.STATIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  ...(isStaticExport
    ? {
        output: "export" as const,
        trailingSlash: true,
        images: { unoptimized: true },
        ...(staticBasePath ? { basePath: staticBasePath } : {}),
        env: {
          NEXT_PUBLIC_STATIC_EXPORT: "1",
          NEXT_PUBLIC_BASE_PATH: staticBasePath,
        },
      }
    : {
        async headers() {
          return [
            {
              source: "/(.*)",
              headers: securityHeaders,
            },
          ];
        },
        // Produto renomeado AG-200 → AG200 (redirects não são suportados no
        // build estático; lá a rota antiga simplesmente não existe).
        async redirects() {
          return [
            {
              source: "/produtos/ag-200",
              destination: "/produtos/ag200",
              permanent: true,
            },
          ];
        },
      }),
};

export default nextConfig;
