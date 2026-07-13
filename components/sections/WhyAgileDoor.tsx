import { Award, Handshake, ShieldCheck, Zap } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "./Reveal";

const reasons = [
  {
    icon: Award,
    title: "Mais de 30 anos de setor na equipe",
    text: "Os profissionais por trás da Agile Door reúnem mais de 30 anos de experiência combinada em portas automáticas. Quem atende você já especificou, instalou e resolveu — não lê script.",
  },
  {
    icon: ShieldCheck,
    title: "Produto que sustenta a especificação",
    text: "Operadores com marcação CE, aprovação TÜV e certificação ISO 9001 — a documentação que o seu projeto e o seu cliente exigem.",
  },
  {
    icon: Zap,
    title: "Resposta no ritmo da obra",
    text: "Orçamento e suporte técnico direto no WhatsApp, sem fila de call center nem burocracia de multinacional. Obra tem prazo; a resposta acompanha.",
  },
  {
    icon: Handshake,
    title: "Parceria com quem instala",
    text: "Recomendação honesta de modelo, orientação técnica na instalação e pós-venda acessível — o suporte que instaladores, vidraçarias e construtoras esperam de um fornecedor.",
  },
];

export function WhyAgileDoor() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Por que a Agile Door"
            title="O fornecedor que instaladores e especificadores esperavam"
            lead="Quem compra porta automática para instalar ou especificar precisa de três coisas: produto certificado, resposta rápida e alguém do outro lado que conheça o equipamento por dentro. É exatamente isso que entregamos."
          />
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason, index) => (
            <Reveal key={reason.title} delay={index * 0.08}>
              <div className="group h-full border border-brand-navy/10 bg-neutral-bg p-6 transition-colors duration-200 hover:border-brand-orange/60 chamfer">
                <reason.icon
                  className="h-8 w-8 text-brand-orange-dark"
                  aria-hidden="true"
                />
                <h3 className="mt-4 font-display text-lg font-bold text-brand-navy">
                  {reason.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-muted">
                  {reason.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
