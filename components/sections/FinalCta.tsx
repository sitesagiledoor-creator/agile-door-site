import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { WHATSAPP_MESSAGES, whatsappLink } from "@/lib/constants";
import { Reveal } from "./Reveal";

export function FinalCta({
  title = "Vamos falar do seu projeto?",
  text = "Envie as medidas do vão, o tipo de folha e o contexto da obra: retornamos com recomendação técnica e orçamento, sem compromisso e sem enrolação.",
  whatsappMessage = WHATSAPP_MESSAGES.default,
}: {
  title?: string;
  text?: string;
  whatsappMessage?: string;
}) {
  return (
    <section className="bg-brand-navy py-16 sm:py-20">
      <Container>
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-white text-balance sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-white/80">{text}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              href={whatsappLink(whatsappMessage)}
              external
              variant="whatsapp"
              size="lg"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Solicitar Orçamento via WhatsApp
            </Button>
            <Button href="/contato" variant="outline-light" size="lg">
              Ir para a página de contato
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
