import { Briefcase, Building2, Factory, Hospital, Store } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "./Reveal";

const segments = [
  {
    icon: Building2,
    title: "Condomínios",
    text: "Portarias com acesso fluido e seguro para moradores e visitantes.",
  },
  {
    icon: Store,
    title: "Comércio",
    text: "Entrada convidativa que aumenta a circulação de clientes na loja.",
  },
  {
    icon: Hospital,
    title: "Hospitais e clínicas",
    text: "Acesso sem toque, mais higiene e silêncio para o ambiente de saúde.",
  },
  {
    icon: Briefcase,
    title: "Escritórios",
    text: "Recepções corporativas com controle de acesso e boa primeira impressão.",
  },
  {
    icon: Factory,
    title: "Indústria",
    text: "Passagens de pedestres integradas ao controle de acesso da planta.",
  },
];

export function Segments() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Onde aplicar"
            title="Os contextos onde nossos operadores são especificados"
            lead="Do hall do condomínio à entrada do hospital: os segmentos onde instaladores, arquitetos e construtoras mais aplicam o AG200 e o AG400."
          />
        </Reveal>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {segments.map((segment, index) => (
            <Reveal key={segment.title} delay={index * 0.06}>
              <li className="h-full border-t-2 border-brand-orange bg-neutral-bg p-5">
                <segment.icon
                  className="h-7 w-7 text-brand-navy"
                  aria-hidden="true"
                />
                <h3 className="mt-3 font-display text-base font-bold text-brand-navy">
                  {segment.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-neutral-muted">
                  {segment.text}
                </p>
              </li>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
