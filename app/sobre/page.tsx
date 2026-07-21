import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { FinalCta } from "@/components/sections/FinalCta";
import { Reveal } from "@/components/sections/Reveal";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Sobre a Agile Door",
  description:
    "Conheça a Agile Door: portas automáticas certificadas, com suporte técnico direto e ágil, da especificação ao pós-venda.",
};

const commitments = [
  "Qualidade extrema no produto e no atendimento — é o padrão da casa, não slogan.",
  "Somente equipamentos com certificação internacional reconhecida (CE, TÜV, ISO 9001, RoHS).",
  "Especificações publicadas exatamente como saem de fábrica — sem números inflados.",
  "Resposta direta pelo WhatsApp, com orientação técnica antes, durante e depois da venda.",
  "Recomendação honesta: se o nosso produto não atender ao seu projeto, dizemos isso.",
];

export default function SobrePage() {
  return (
    <>
      <section className="bg-brand-navy-dark py-16 sm:py-20">
        <Container>
          <Reveal>
            <SectionHeading
              as="h1"
              dark
              eyebrow="Sobre nós"
              title="Marca nova, feita por gente que vive de porta automática"
              lead="A Agile Door é a marca própria de profissionais que reúnem mais de 30 anos de experiência combinada no setor — criada para fornecer tecnologia certificada com o atendimento que instaladores e especificadores merecem."
            />
          </Reveal>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              eyebrow="O que fazemos"
              title="Tecnologia certificada, atendida por quem conhece a obra"
            />
            <div className="mt-6 space-y-4 text-base leading-relaxed text-neutral-muted">
              <p>
                A Agile Door fornece portas automáticas certificadas, com
                suporte técnico direto e ágil — da especificação ao pós-venda.
                Nossos operadores AG200 e AG400 carregam certificações
                internacionalmente reconhecidas: marcação CE, aprovação TÜV,
                certificação ISO 9001 e conformidade RoHS.
              </p>
              <p>
                Nosso cliente é profissional: serralherias e empresas de
                esquadria, vidraçarias, construtoras, arquitetos e
                integradores de automação. Por isso o atendimento é técnico
                desde a primeira mensagem — quem responde no WhatsApp reúne,
                junto com o restante da equipe, mais de 30 anos de experiência
                no setor, e fala a língua de quem está com a obra andando:
                medida de vão, peso de folha, prazo.
              </p>
              <p>
                A marca é nova, e preferimos dizer isso com clareza a inventar
                números de mercado. O que não é novo é a bagagem de quem está
                por trás dela. Nosso catálogo reúne os operadores AG200 e
                AG400 — e vai crescer conforme validamos cada novo produto com
                o mesmo critério de qualidade extrema no produto e no
                atendimento.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="border border-brand-navy/10 bg-neutral-bg p-8 chamfer">
              <h2 className="font-display text-xl font-bold text-brand-navy">
                Nossos compromissos
              </h2>
              <ul className="mt-6 space-y-4">
                {commitments.map((commitment) => (
                  <li key={commitment} className="flex items-start gap-3">
                    <CheckCircle2
                      className="mt-0.5 h-5 w-5 shrink-0 text-brand-orange-dark"
                      aria-hidden="true"
                    />
                    <span className="text-sm leading-relaxed text-neutral-text">
                      {commitment}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 border-t border-brand-navy/10 pt-6">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-muted">
                  Certificações dos mecanismos
                </p>
                <p className="mt-2 font-mono text-lg font-semibold text-brand-navy">
                  CE · TÜV · ISO 9001 · RoHS
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <FinalCta
        title="Quer conversar com a gente?"
        text="Chame no WhatsApp ou envie uma mensagem pela página de contato — respondemos rápido e sem script de telemarketing."
      />
    </>
  );
}
