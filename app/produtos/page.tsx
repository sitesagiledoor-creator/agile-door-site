import type { Metadata } from "next";
import { FinalCta } from "@/components/sections/FinalCta";
import { ProductCard } from "@/components/sections/ProductCard";
import { Reveal } from "@/components/sections/Reveal";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Produtos",
  description:
    "Catálogo de portas automáticas da Agile Door: operadores de porta de correr com certificação internacional CE, TÜV e ISO 9001.",
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
              lead="Dois operadores de porta de correr automática: o AG200, linha robusta para uso geral intenso, e o AG400, linha avançada com seletor digital e velocidade superior para entradas comerciais e hoteleiras."
            />
          </Reveal>
        </Container>
      </section>

      <section className="bg-neutral-bg py-16 sm:py-20">
        <Container>
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, index) => (
              <Reveal key={product.slug} delay={index * 0.08}>
                <li className="h-full list-none">
                  <ProductCard product={product} />
                </li>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.15}>
            <p className="mt-10 max-w-2xl text-sm leading-relaxed text-neutral-muted">
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
