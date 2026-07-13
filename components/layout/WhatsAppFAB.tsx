import { WHATSAPP_MESSAGES, whatsappLink } from "@/lib/constants";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

/**
 * Botão flutuante de WhatsApp, visível em todas as páginas.
 * Verde escuro oficial (#1DA851) para garantir contraste ≥3:1 do ícone branco.
 * O anel pulsante (whatsapp-pulse) fica atrás do botão — o ícone não pisca —
 * e é desativado automaticamente com prefers-reduced-motion.
 */
export function WhatsAppFAB() {
  return (
    <a
      href={whatsappLink(WHATSAPP_MESSAGES.default)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar com a Agile Door no WhatsApp"
      className="whatsapp-pulse fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp-dark text-white shadow-lg shadow-black/25 transition-transform duration-200 hover:scale-105 hover:bg-whatsapp motion-reduce:transition-none motion-reduce:hover:scale-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
