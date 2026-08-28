/**
 * Aviso de cookies.
 *
 * ⚠️ Isto NÃO é mais um consentimento com escolha. Por decisão comercial de
 * 28/08/2026 o pixel de marketing passou a carregar em toda visita, então o
 * banner deixou de oferecer "Aceitar/Recusar": oferecer um botão de recusa que
 * não recusa nada seria pior do que não oferecer nenhum.
 *
 * O que ficou guardado é só se a pessoa já viu o aviso, para não repeti-lo a
 * cada visita. A chave mudou de nome de propósito: quem tinha a escolha antiga
 * gravada vê o aviso novo uma vez, porque os termos mudaram.
 */

export const AVISO_KEY = "agiledoor-aviso-cookies";
export const AVISO_EVENT = "agiledoor-aviso-change";

export type EstadoAviso = "visto" | "pendente" | "indisponivel" | null;

export function subscribeAviso(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(AVISO_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(AVISO_EVENT, callback);
  };
}

export function readAviso(): EstadoAviso {
  try {
    return localStorage.getItem(AVISO_KEY) as EstadoAviso;
  } catch {
    // localStorage indisponível (ex.: modo privado restrito): não insiste.
    return "indisponivel";
  }
}

/** No servidor ainda não há como saber: renderiza oculto. */
export function readAvisoOnServer(): EstadoAviso {
  return "pendente";
}

export function marcarAvisoVisto() {
  try {
    localStorage.setItem(AVISO_KEY, "visto");
  } catch {
    // sem armazenamento, vale só para esta visita
  }
  window.dispatchEvent(new Event(AVISO_EVENT));
}
