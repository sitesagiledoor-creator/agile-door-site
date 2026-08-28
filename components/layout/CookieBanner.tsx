"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import {
  readConsent,
  readConsentOnServer,
  saveConsent,
  subscribeConsent,
} from "@/lib/consent";

/**
 * Banner de consentimento de cookies (LGPD).
 *
 * A escolha registrada aqui é o que libera o pixel de marketing
 * (`MetaPixel.tsx`): quem recusa, ou ainda não escolheu, não tem rastreamento
 * carregado. O estado vive em `lib/consent.ts`, compartilhado pelos dois.
 */
export function CookieBanner() {
  const consent = useSyncExternalStore(
    subscribeConsent,
    readConsent,
    readConsentOnServer
  );

  if (consent !== null) return null;

  return (
    <div
      role="region"
      aria-label="Aviso de cookies"
      className="fixed inset-x-0 bottom-0 z-50 border-t-2 border-brand-orange bg-brand-navy-dark p-4 sm:p-5"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-3xl text-sm leading-relaxed text-white/85">
          Usamos armazenamento estritamente necessário para o site funcionar e,
          se você aceitar, o pixel do Meta Ads para medir os resultados dos
          nossos anúncios. Recusando, nada de publicidade é carregado. Saiba
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
            onClick={() => saveConsent("rejected")}
            className="border-2 border-white/60 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Recusar
          </button>
          <button
            type="button"
            onClick={() => saveConsent("accepted")}
            className="bg-brand-orange px-4 py-2 text-sm font-semibold text-brand-navy-dark transition-colors hover:bg-brand-orange-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Aceitar
          </button>
        </div>
      </div>
    </div>
  );
}
