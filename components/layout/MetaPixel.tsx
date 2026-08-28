"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Pixel do Meta Ads.
 *
 * Carrega em toda visita, sem depender de escolha do visitante — decisão
 * comercial de 28/08/2026. O aviso de cookies informa que o pixel existe e
 * aponta para a Política de Cookies, mas não oferece recusa.
 *
 * O `fbq` precisa existir antes do script externo chegar: a função de fila do
 * Meta guarda as chamadas e as reenvia quando o `fbevents.js` carrega. Por isso
 * a fila é montada aqui, e não copiada como bloco inline.
 *
 * ⚠️ Depende da CSP liberar connect.facebook.net (script) e www.facebook.com
 * (imagem e conexão), em next.config.ts E em public/.htaccess. Sem isso o
 * navegador bloqueia o pixel em silêncio: não dá erro, apenas não mede.
 */

const PIXEL_ID = "918190761341070";
const SRC = "https://connect.facebook.net/en_US/fbevents.js";

type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[];
  loaded?: boolean;
  version?: string;
  push?: unknown;
};

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

/** Monta a fila do fbq e injeta o script uma única vez. */
function carregarPixel() {
  if (window.fbq) return;

  const fbq = function (...args: unknown[]) {
    if (fbq.callMethod) fbq.callMethod(...args);
    else fbq.queue.push(args);
  } as Fbq;
  fbq.queue = [];
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.push = fbq;

  window.fbq = fbq;
  window._fbq ??= fbq;

  const script = document.createElement("script");
  script.async = true;
  script.src = SRC;
  document.head.appendChild(script);

  fbq("init", PIXEL_ID);
}

export function MetaPixel() {
  const pathname = usePathname();

  useEffect(() => {
    carregarPixel();
    // O site navega sem recarregar a página: sem isto, só a primeira tela
    // contaria como visita.
    window.fbq?.("track", "PageView");
  }, [pathname]);

  // Clique no WhatsApp = Lead. É a única conversão que este site tem: não há
  // carrinho nem formulário, todo orçamento começa numa conversa.
  //
  // Um ouvinte só, no documento, em vez de um por botão: pega o FAB, o header,
  // os botões de produto e o CTA final — e os que vierem depois, sem ninguém
  // precisar lembrar de instrumentar.
  useEffect(() => {
    function aoClicar(evento: MouseEvent) {
      const alvo = evento.target as Element | null;
      const link = alvo?.closest?.<HTMLAnchorElement>('a[href*="wa.me"]');
      if (!link) return;
      window.fbq?.("track", "Lead", {
        // De onde saiu o contato: é o que separa "veio da página do AG400" de
        // "veio da home" no gerenciador de anúncios.
        content_name: pathname,
        content_category: "whatsapp",
      });
    }

    document.addEventListener("click", aoClicar);
    return () => document.removeEventListener("click", aoClicar);
  }, [pathname]);

  return null;
}
