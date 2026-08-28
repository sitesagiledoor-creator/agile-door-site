/**
 * Consentimento de cookies (LGPD), compartilhado pelo banner e por quem
 * depende da escolha do visitante.
 *
 * Ficava dentro do CookieBanner. Saiu para cá quando entrou o pixel de
 * marketing: quem dispara rastreamento precisa ler a MESMA escolha que o
 * banner grava, e duas cópias da chave acabariam divergindo.
 */

export const CONSENT_KEY = "agiledoor-cookie-consent";
export const CONSENT_EVENT = "agiledoor-consent-change";

export type Consent = "accepted" | "rejected" | "pending" | "unavailable" | null;

export function subscribeConsent(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(CONSENT_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CONSENT_EVENT, callback);
  };
}

export function readConsent(): Consent {
  try {
    return localStorage.getItem(CONSENT_KEY) as Consent;
  } catch {
    // localStorage indisponível (ex.: modo privado restrito).
    return "unavailable";
  }
}

/** No servidor ainda não há como saber a escolha. */
export function readConsentOnServer(): Consent {
  return "pending";
}

export function saveConsent(choice: "accepted" | "rejected") {
  try {
    localStorage.setItem(CONSENT_KEY, choice);
  } catch {
    // sem armazenamento, a escolha vale só para esta visita
  }
  window.dispatchEvent(new Event(CONSENT_EVENT));
}
