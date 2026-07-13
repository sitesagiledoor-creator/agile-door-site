import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Reveal } from "@/components/sections/Reveal";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { CONTACT, WHATSAPP_MESSAGES, whatsappLink } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Fale com a Agile Door pelo WhatsApp, telefone ou e-mail: orçamentos, dúvidas técnicas e suporte para portas automáticas.",
};

/**
 * Página de contato sem formulário — decisão comercial: todo o atendimento
 * é centralizado no WhatsApp (com telefone e e-mail como alternativas).
 */
export default function ContatoPage() {
  return (
    <>
      <section className="bg-brand-navy-dark py-16 sm:py-20">
        <Container>
          <Reveal>
            <SectionHeading
              as="h1"
              dark
              eyebrow="Contato"
              title="Fale direto com a gente"
              lead="Sem formulário, sem fila de e-mail: chame no WhatsApp e converse com quem entende do produto. Se preferir, ligue ou escreva."
            />
          </Reveal>
        </Container>
      </section>

      <section className="bg-neutral-bg py-16 sm:py-20">
        <Container className="max-w-3xl">
          <Reveal>
            <div className="space-y-5">
              <a
                href={whatsappLink(WHATSAPP_MESSAGES.default)}
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-pulse flex items-center gap-5 rounded-lg border-2 border-whatsapp-dark bg-white p-6 transition-colors hover:bg-whatsapp/10"
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-whatsapp-dark text-white">
                  <WhatsAppIcon className="h-7 w-7" />
                </span>
                <span>
                  <span className="block font-display text-xl font-bold text-brand-navy">
                    WhatsApp — resposta mais rápida
                  </span>
                  <span className="mt-1 block font-mono text-sm text-neutral-muted">
                    {CONTACT.phone}
                  </span>
                </span>
              </a>

              <div className="grid gap-5 sm:grid-cols-2">
                <a
                  href={CONTACT.phoneHref}
                  className="flex items-center gap-4 border border-brand-navy/10 bg-white p-5 transition-colors hover:border-brand-orange/60 chamfer"
                >
                  <Phone
                    className="h-7 w-7 shrink-0 text-brand-orange-dark"
                    aria-hidden="true"
                  />
                  <span>
                    <span className="block text-sm font-semibold text-brand-navy">
                      Telefone
                    </span>
                    <span className="block font-mono text-sm text-neutral-muted">
                      {CONTACT.phone}
                    </span>
                  </span>
                </a>

                <a
                  href={CONTACT.emailHref}
                  className="flex items-center gap-4 border border-brand-navy/10 bg-white p-5 transition-colors hover:border-brand-orange/60 chamfer"
                >
                  <Mail
                    className="h-7 w-7 shrink-0 text-brand-orange-dark"
                    aria-hidden="true"
                  />
                  <span>
                    <span className="block text-sm font-semibold text-brand-navy">
                      E-mail
                    </span>
                    <span className="block font-mono text-sm text-neutral-muted">
                      {CONTACT.email}
                    </span>
                  </span>
                </a>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex items-start gap-3 border border-brand-navy/10 bg-white p-5 chamfer">
                  <Clock
                    className="mt-0.5 h-5 w-5 shrink-0 text-brand-orange-dark"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-sm font-semibold text-brand-navy">
                      Horário de atendimento
                    </p>
                    <p className="text-sm text-neutral-muted">
                      {CONTACT.hours}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 border border-brand-navy/10 bg-white p-5 chamfer">
                  <MapPin
                    className="mt-0.5 h-5 w-5 shrink-0 text-brand-orange-dark"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-sm font-semibold text-brand-navy">
                      Endereço
                    </p>
                    <p className="text-sm text-neutral-muted">
                      {CONTACT.address}
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-sm leading-relaxed text-neutral-muted">
                Para agilizar o orçamento, envie junto com a mensagem: as
                medidas do vão, o tipo de porta (vidro, com ou sem moldura) e,
                se possível, uma foto da entrada.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
