import { ScrollText } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { RegulatoryContext as RegulatoryContextData } from "@/data/products";
import { Reveal } from "./Reveal";

/**
 * Contexto normativo: explica a exigência que faz o cliente precisar do
 * produto e devolve o enquadramento a quem é responsável por ele.
 *
 * A conformidade é do projeto e da execução, não do equipamento isolado — por
 * isso a nota final aparece destacada, e não diluída no meio do texto.
 */
export function RegulatoryContext({ data }: { data: RegulatoryContextData }) {
  return (
    <section className="bg-neutral-bg py-16 sm:py-20">
      <Container className="max-w-4xl">
        <Reveal>
          <SectionHeading eyebrow="Contexto normativo" title={data.title} />
          <div className="mt-6 space-y-4 text-base leading-relaxed text-neutral-muted">
            {data.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <aside className="mt-8 flex gap-4 border-l-4 border-brand-navy bg-white p-5 chamfer-sm sm:p-6">
            <ScrollText
              className="h-6 w-6 shrink-0 text-brand-navy"
              aria-hidden="true"
            />
            <p className="text-sm leading-relaxed text-brand-navy">
              {data.note}
            </p>
          </aside>
        </Reveal>
      </Container>
    </section>
  );
}
