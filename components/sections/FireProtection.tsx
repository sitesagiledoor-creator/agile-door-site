import { Container } from "@/components/ui/Container";
import { ProductIcon } from "@/components/ui/ProductIcons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { FireProtection as FireProtectionData } from "@/data/products";
import { Reveal } from "./Reveal";

/**
 * Bloco da função de proteção contra incêndio — seção inteira, com o mesmo
 * peso visual da seção do sistema antipânico, porque é argumento central de
 * venda e não ressalva de rodapé.
 *
 * O texto afirma o que o produto FAZ. A classe de produto regulada (com
 * classificação de resistência ao fogo) depende de laudo de laboratório
 * acreditado e sai de `certifications.fireRating` quando existir — não é
 * escrita aqui.
 */
export function FireProtection({ data }: { data: FireProtectionData }) {
  return (
    <section className="bg-white py-16 sm:py-20">
      <Container>
        <Reveal>
          <SectionHeading eyebrow="Segurança contra incêndio" title={data.title} />
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-neutral-muted">
            {data.lead}
          </p>
        </Reveal>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.points.map((point, index) => (
            <Reveal key={point.title} delay={index * 0.08}>
              <li className="h-full border-t-4 border-brand-orange bg-neutral-bg p-6 chamfer-sm">
                <span className="flex h-12 w-12 items-center justify-center bg-brand-orange text-brand-navy-dark chamfer-sm">
                  <ProductIcon name={point.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-brand-navy">
                  {point.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-muted">
                  {point.text}
                </p>
              </li>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
