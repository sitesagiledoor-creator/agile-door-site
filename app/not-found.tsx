import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="bg-neutral-bg py-24 sm:py-32">
      <Container className="max-w-xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-orange-dark">
          Erro 404
        </p>
        <h1 className="mt-4 font-display text-3xl font-bold text-brand-navy sm:text-4xl">
          Esta página não existe (ou mudou de endereço)
        </h1>
        <p className="mt-4 text-base leading-relaxed text-neutral-muted">
          Verifique se o link foi digitado corretamente — ou volte para o início
          e navegue a partir de lá.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href="/" variant="primary" size="lg">
            Voltar para o início
          </Button>
          <Button href="/produtos" variant="outline" size="lg">
            Ver produtos
          </Button>
        </div>
      </Container>
    </section>
  );
}
