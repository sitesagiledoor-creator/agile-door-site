/**
 * Prefixa caminhos de assets estáticos com o basePath do deploy.
 *
 * Necessário porque, com `images.unoptimized` (build estático), o next/image
 * NÃO aplica o basePath em `src` do tipo string — sem isso, logo e fotos
 * quebram quando o site é hospedado em subpasta (ex.: dominio.com/subpasta).
 * No modo servidor (basePath vazio) é um no-op.
 */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string): string {
  return `${BASE_PATH}${path}`;
}
