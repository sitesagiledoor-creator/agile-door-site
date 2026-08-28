"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import {
  marcarAvisoVisto,
  readAviso,
  readAvisoOnServer,
  subscribeAviso,
} from "@/lib/consent";

/**
 * Aviso de cookies (LGPD — dever de informação).
 *
 * ⚠️ Deixou de ser um banner de consentimento em 28/08/2026: por decisão
 * comercial o pixel do Meta Ads passou a carregar em toda visita, então os
 * botões "Aceitar" e "Recusar" saíram. Manter um "Recusar" que não recusa nada
 * seria prometer uma escolha que o site não cumpre.
 *
 * O que ficou é o dever de informar: o aviso diz o que é coletado e leva à
 * Política de Cookies, onde estão a finalidade e como bloquear pelo navegador.
 */
export function CookieBanner() {
  const estado = useSyncExternalStore(
    subscribeAviso,
    readAviso,
    readAvisoOnServer
  );

  if (estado !== null) return null;

  return (
    <div
      role="region"
      aria-label="Aviso de cookies"
      className="fixed inset-x-0 bottom-0 z-50 border-t-2 border-brand-orange bg-brand-navy-dark p-4 sm:p-5"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-3xl text-sm leading-relaxed text-white/85">
          Usamos armazenamento necessário para o site funcionar e o pixel do
          Meta Ads, que mede o resultado dos nossos anúncios. O que é coletado e
          como bloquear pelo navegador estão na nossa{" "}
          <Link
            href="/politica-de-cookies"
            className="font-semibold text-brand-orange-light underline underline-offset-2 hover:text-white"
          >
            Política de Cookies
          </Link>
          .
        </p>
        <div className="flex shrink-0">
          <button
            type="button"
            onClick={marcarAvisoVisto}
            className="bg-brand-orange px-5 py-2 text-sm font-semibold text-brand-navy-dark transition-colors hover:bg-brand-orange-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Entendi
          </button>
        </div>
      </div>
    </div>
  );
}
