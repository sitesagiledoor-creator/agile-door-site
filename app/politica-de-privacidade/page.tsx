import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/sections/Reveal";
import { Container } from "@/components/ui/Container";
import { CONTACT, SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Como a Agile Door coleta, usa e protege os seus dados pessoais, em conformidade com a LGPD (Lei nº 13.709/2018).",
};

export default function PoliticaDePrivacidadePage() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <Container className="max-w-3xl">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange-dark">
            Documento legal
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold text-brand-navy sm:text-4xl">
            Política de Privacidade
          </h1>
          <p className="mt-2 text-sm text-neutral-muted">
            Última atualização: julho de 2026
          </p>

          <div className="mt-6 border-l-4 border-brand-orange bg-neutral-bg p-4 text-sm leading-relaxed text-neutral-muted">
            <strong className="text-brand-navy">Aviso interno:</strong> este é
            um modelo inicial de política de privacidade, elaborado com base em
            práticas de mercado. Recomenda-se revisão por assessoria jurídica
            especializada em LGPD antes da publicação definitiva do site.
          </div>

          <div className="prose-agile mt-10 space-y-8 text-base leading-relaxed text-neutral-text">
            <section>
              <h2 className="font-display text-xl font-bold text-brand-navy">
                1. Quem somos
              </h2>
              <p className="mt-3">
                A {SITE.name} (&ldquo;nós&rdquo;) é uma distribuidora brasileira
                de portas automáticas. Esta política descreve como tratamos
                dados pessoais coletados através do site {SITE.url}, em
                conformidade com a Lei Geral de Proteção de Dados — LGPD (Lei nº
                13.709/2018).
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-brand-navy">
                2. Quais dados coletamos
              </h2>
              <p className="mt-3">
                Este site não possui formulários de coleta de dados. O contato
                acontece pelos canais que você mesmo aciona: ao clicar nos
                botões de WhatsApp, você é direcionado ao aplicativo
                WhatsApp/Meta (que possui política de privacidade própria); ao
                usar os links de telefone ou e-mail, a comunicação ocorre pelo
                seu próprio aplicativo. Tratamos os dados que você nos envia
                por esses canais (nome, telefone, conteúdo da conversa) apenas
                para responder à sua solicitação.
              </p>
              <p className="mt-3">
                Não utilizamos cookies de publicidade nem rastreadores de
                terceiros. Detalhes sobre o armazenamento local estritamente
                necessário estão na nossa{" "}
                <Link
                  href="/politica-de-cookies"
                  className="font-medium text-brand-navy underline underline-offset-2 hover:text-brand-orange-dark"
                >
                  Política de Cookies
                </Link>
                .
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-brand-navy">
                3. Para que usamos os seus dados
              </h2>
              <ul className="mt-3 list-disc space-y-2 pl-6">
                <li>
                  Responder às solicitações enviadas por WhatsApp, telefone ou
                  e-mail;
                </li>
                <li>Elaborar orçamentos e propostas comerciais solicitados;</li>
                <li>
                  Prestar suporte técnico relacionado aos nossos produtos.
                </li>
              </ul>
              <p className="mt-3">
                A base legal do tratamento é a execução de procedimentos
                preliminares a contrato a pedido do titular (art. 7º, V, da
                LGPD), já que é você quem inicia o contato para solicitar
                orçamento ou suporte.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-brand-navy">
                4. Compartilhamento de dados
              </h2>
              <p className="mt-3">
                Não vendemos nem alugamos seus dados pessoais. Os dados podem
                ser processados por fornecedores de infraestrutura (hospedagem,
                e-mail) estritamente para viabilizar o atendimento, sempre com
                salvaguardas contratuais adequadas.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-brand-navy">
                5. Retenção e segurança
              </h2>
              <p className="mt-3">
                Mantemos os dados apenas pelo tempo necessário para atender à
                finalidade da coleta ou cumprir obrigações legais. Adotamos
                medidas técnicas e organizacionais razoáveis para proteger os
                dados contra acesso não autorizado, perda ou alteração.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-brand-navy">
                6. Seus direitos
              </h2>
              <p className="mt-3">
                Nos termos da LGPD, você pode solicitar a qualquer momento:
                confirmação de tratamento, acesso, correção, anonimização,
                portabilidade, eliminação dos dados e revogação do
                consentimento. Para exercer esses direitos, escreva para{" "}
                {CONTACT.email}.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-brand-navy">
                7. Contato do responsável
              </h2>
              <p className="mt-3">
                Dúvidas sobre esta política ou sobre o tratamento dos seus dados
                podem ser enviadas para {CONTACT.email}. [DEFINIR
                ENCARREGADO/DPO SE APLICÁVEL]
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-brand-navy">
                8. Alterações desta política
              </h2>
              <p className="mt-3">
                Esta política pode ser atualizada para refletir mudanças no site
                ou na legislação. A data da última atualização aparece no topo
                da página.
              </p>
            </section>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
