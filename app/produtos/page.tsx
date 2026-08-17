import type { Metadata } from "next";
import { FinalCta } from "@/components/sections/FinalCta";
import { ProductCard } from "@/components/sections/ProductCard";
import { Reveal } from "@/components/sections/Reveal";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { productsByCategory } from "@/data/products";

export const metadata: Metadata = {
  title: "Produtos",
  description:
    "Catálogo de portas automáticas da Agile Door: operadores de porta de correr e de porta telescópica automática, com certificação internacional CE, TÜV e ISO 9001.",
};

export default function ProdutosPage() {
  return (
    <>
      <section className="bg-brand-navy-dark py-16 sm:py-20">
        <Container>
          <Reveal>
            <SectionHeading
              as="h1"
              dark
              eyebrow="Catálogo"
              title="Nossos produtos"
              lead="Duas famílias de operador: portas de correr automáticas, para entradas com parede lateral disponível, e portas telescópicas automáticas, que abrem o mesmo vão usando cerca de metade desse espaço."
            />
          </Reveal>
        </Container>
      </section>

      <section className="bg-neutral-bg py-16 sm:py-20">
        <Container>
          <div className="space-y-16 sm:space-y-20">
            {productsByCategory.map((group) => (
              <div key={group.category} id={group.id} className="scroll-mt-24">
                <Reveal>
                  <SectionHeading title={group.label} lead={group.lead} />
                </Reveal>

                <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {group.items.map((product, index) => (
                    <Reveal key={product.slug} delay={index * 0.08}>
                      <li className="h-full list-none">
                        <ProductCard product={product} />
                      </li>
                    </Reveal>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <Reveal delay={0.15}>
            <p className="mt-16 max-w-2xl text-sm leading-relaxed text-neutral-muted">
              Não encontrou o que precisa? Novos operadores e acessórios estão
              em processo de homologação. Fale com a gente — se já estiver a
              caminho, avisamos o prazo.
            </p>
          </Reveal>
        </Container>
      </section>

      <FinalCta />
    </>
  );
}
