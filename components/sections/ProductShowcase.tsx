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
            title="Duas linhas, cada uma no seu lugar"
            lead="AG200 para vãos estreitos, com tela digital de ajuste e cinco modos de função; AG400 para uso intenso, com folhas de até 200 kg. Compare as fichas e especifique com segurança."
          />
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <ProductCarousel products={products} />
        </Reveal>
      </Container>
    </section>
  );
}
