"use client";

import { usePathname } from "next/navigation";
import { useEffect, useSyncExternalStore } from "react";
import {
  readConsent,
  readConsentOnServer,
  subscribeConsent,
} from "@/lib/consent";

/**
 * Pixel do Meta Ads.
 *
 * ⚠️ Só carrega depois que o visitante ACEITA os cookies no banner. É
 * rastreamento de publicidade: sob a LGPD depende de consentimento, e o banner
 * do site oferece "Recusar" — disparar assim mesmo tornaria o botão decorativo.
 * Quem recusa, ou ainda não escolheu, não tem nada carregado.
 *
 * O `fbq` precisa existir antes do script externo chegar: a função de fila do
 * Meta guarda as chamadas e as reenvia quando o `fbevents.js` carrega. Por isso
 * a fila é montada aqui, e não copiada como bloco inline.
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
  const consent = useSyncExternalStore(
    subscribeConsent,
    readConsent,
    readConsentOnServer
  );
  const pathname = usePathname();

  useEffect(() => {
    if (consent !== "accepted") return;
    carregarPixel();
    // O site navega sem recarregar a página: sem isto, só a primeira tela
    // contaria como visita.
    window.fbq?.("track", "PageView");
  }, [consent, pathname]);

  return null;
}
