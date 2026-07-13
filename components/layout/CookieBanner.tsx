"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";

const STORAGE_KEY = "agiledoor-cookie-consent";
const CONSENT_EVENT = "agiledoor-consent-change";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(CONSENT_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CONSENT_EVENT, callback);
  };
}

function getSnapshot(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    // localStorage indisponível (ex.: modo privado restrito): não exibe.
    return "unavailable";
  }
}

function getServerSnapshot(): string | null {
  // No servidor ainda não há como saber a escolha: renderiza oculto.
  return "pending";
}

/**
 * Banner de consentimento de cookies (LGPD).
 * O site usa apenas armazenamento estritamente necessário; se um dia forem
 * adicionados analytics/marketing, condicionar o carregamento à escolha
 * registrada aqui ("accepted" | "rejected").
 */
export function CookieBanner() {
  const consent = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  function decide(choice: "accepted" | "rejected") {
    try {
      localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      // sem armazenamento, a escolha vale só para esta visita
    }
    window.dispatchEvent(new Event(CONSENT_EVENT));
  }

  if (consent !== null) return null;

  return (
    <div
      role="region"
      aria-label="Aviso de cookies"
      className="fixed inset-x-0 bottom-0 z-50 border-t-2 border-brand-orange bg-brand-navy-dark p-4 sm:p-5"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-3xl text-sm leading-relaxed text-white/85">
          Usamos apenas cookies e armazenamento estritamente necessários para o
          funcionamento do site — nada de rastreamento de publicidade. Saiba
          mais na nossa{" "}
          <Link
            href="/politica-de-cookies"
            className="font-semibold text-brand-orange-light underline underline-offset-2 hover:text-white"
          >
            Política de Cookies
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => decide("rejected")}
            className="border-2 border-white/60 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Recusar
          </button>
          <button
            type="button"
            onClick={() => decide("accepted")}
            className="bg-brand-orange px-4 py-2 text-sm font-semibold text-brand-navy-dark transition-colors hover:bg-brand-orange-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Aceitar
          </button>
        </div>
      </div>
    </div>
  );
}
