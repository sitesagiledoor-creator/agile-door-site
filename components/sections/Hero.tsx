import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { asset } from "@/lib/asset";
import { Reveal } from "./Reveal";

export function Hero() {
  return (
    <section className="bg-brand-navy-dark">
      <Container className="grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:py-24">
        <Reveal>
          <h1 className="font-display text-4xl font-bold tracking-tight text-white text-balance sm:text-5xl">
            Soluções em portas automáticas para seu próximo projeto
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/80">
            Operadores certificados ISO 9001, com orçamento e suporte direto
            no WhatsApp. Por trás da marca, uma equipe que reúne mais de 30
            anos de experiência no setor — atendendo de profissional para
            profissional.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/produtos" variant="primary" size="lg">
              Conheça nossos produtos
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Button>
            {/* Atalhos diretos, empilhados — mais discretos que o CTA
                principal, com altura confortável para toque */}
            <div className="flex flex-col gap-2">
              <Button
                href="/produtos/ag200"
                variant="outline-light"
                size="md"
                className="min-h-11 flex-1"
              >
                AG200
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Button
                href="/produtos/ag400"
                variant="outline-light"
                size="md"
                className="min-h-11 flex-1"
              >
                AG400
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          {/* Imagem estática de ambientação — sem zoom (o lightbox fica só
              nas galerias de produto) */}
          <div className="relative aspect-[1496/1051] overflow-hidden border border-white/15 bg-brand-navy chamfer">
            <Image
              src={asset("/produtos/home-hero.png")}
              alt="Fachada comercial com porta de correr automática de vidro instalada pela Agile Door"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-contain"
            />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
