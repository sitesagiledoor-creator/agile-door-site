import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { products } from "@/data/products";
import { ProductCarousel } from "./ProductCarousel";
import { Reveal } from "./Reveal";

/** Vitrine da Home: carrossel com todos os produtos do catálogo. */
export function ProductShowcase() {
  return (
    <section className="bg-neutral-bg py-16 sm:py-20">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Nossos produtos"
            title="Cada entrada tem um operador certo"
            lead="Portas de correr automáticas — AG200 para vãos estreitos, AG400 para uso intenso — e portas telescópicas automáticas, AG-T200 e AG-T400, para entradas largas com pouco espaço lateral. Compare as fichas e especifique com segurança."
          />
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <ProductCarousel products={products} />
        </Reveal>
      </Container>
    </section>
  );
}
