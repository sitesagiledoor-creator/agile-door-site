import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { asset } from "@/lib/asset";
import { WHATSAPP_MESSAGES, whatsappLink } from "@/lib/constants";
import { Reveal } from "./Reveal";

const heroSpecs = [
  { value: "até 200 kg", label: "Capacidade por folha" },
  { value: "10–60 cm/s", label: "Velocidade ajustável" },
  { value: "100–240V", label: "Bivolt automático" },
];

export function Hero() {
  return (
    <section className="bg-brand-navy-dark">
      <Container className="grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:py-24">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange-light">
            Distribuidora de operadores de portas automáticas
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-white text-balance sm:text-5xl">
            O fornecedor técnico de portas automáticas para o seu próximo
            projeto
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/80">
            Operadores certificados CE, TÜV e ISO 9001, com orçamento e
            suporte direto no WhatsApp. Por trás da marca, uma equipe que
            reúne mais de 30 anos de experiência no setor — atendendo de
            profissional para profissional.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/produtos" variant="primary" size="lg">
              Conheça nossos produtos
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Button>
            <Button
              href={whatsappLink(WHATSAPP_MESSAGES.default)}
              external
              variant="outline-light"
              size="lg"
            >
              <WhatsAppIcon className="h-5 w-5 text-whatsapp" />
              Fale no WhatsApp
            </Button>
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

      {/* Régua técnica: specs reais dos produtos, não estatísticas inventadas */}
      <div className="border-t border-white/10 bg-brand-navy">
        <Container>
          <dl className="grid grid-cols-1 divide-y divide-white/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {heroSpecs.map((spec) => (
              <div key={spec.label} className="px-2 py-5 text-center">
                <dt className="order-2 mt-1 block text-xs uppercase tracking-wide text-white/60">
                  {spec.label}
                </dt>
                <dd className="font-mono text-2xl font-semibold text-brand-orange-light">
                  {spec.value}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </div>
    </section>
  );
}
