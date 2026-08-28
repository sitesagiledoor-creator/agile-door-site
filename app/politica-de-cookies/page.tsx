import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/sections/Reveal";
import { Container } from "@/components/ui/Container";
import { CONTACT, SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Política de Cookies",
  description:
    "Quais cookies e tecnologias de armazenamento o site da Agile Door utiliza e como gerenciar suas preferências.",
};

export default function PoliticaDeCookiesPage() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <Container className="max-w-3xl">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange-dark">
            Documento legal
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold text-brand-navy sm:text-4xl">
            Política de Cookies
          </h1>
          <p className="mt-2 text-sm text-neutral-muted">
            Última atualização: julho de 2026
          </p>

          <div className="mt-10 space-y-8 text-base leading-relaxed text-neutral-text">
            <section>
              <h2 className="font-display text-xl font-bold text-brand-navy">
                1. O que são cookies
              </h2>
              <p className="mt-3">
                Cookies são pequenos arquivos armazenados no seu navegador
                quando você visita um site. Tecnologias semelhantes, como o
                armazenamento local (localStorage), cumprem papel parecido e são
                tratadas em conjunto nesta política.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-brand-navy">
                2. O que o site da {SITE.name} utiliza
              </h2>
              <p className="mt-3">
                Este site utiliza armazenamento necessário ao funcionamento e o
                pixel de marketing descrito abaixo:
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full border border-brand-navy/10 text-sm">
                  <thead>
                    <tr className="bg-neutral-bg text-left">
                      <th className="border-b border-brand-navy/10 px-4 py-2.5 font-semibold text-brand-navy">
                        Identificador
                      </th>
                      <th className="border-b border-brand-navy/10 px-4 py-2.5 font-semibold text-brand-navy">
                        Tipo
                      </th>
                      <th className="border-b border-brand-navy/10 px-4 py-2.5 font-semibold text-brand-navy">
                        Finalidade
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-4 py-2.5 font-mono text-xs">
                        agiledoor-aviso-cookies
                      </td>
                      <td className="px-4 py-2.5">localStorage</td>
                      <td className="px-4 py-2.5">
                        Registrar que você já viu o aviso de cookies, para não
                        exibi-lo em todas as visitas.
                      </td>
                    </tr>
                    <tr>
                      <td className="border-t border-brand-navy/10 px-4 py-2.5 font-mono text-xs">
                        _fbp
                      </td>
                      <td className="border-t border-brand-navy/10 px-4 py-2.5">
                        Cookie do Meta (Facebook/Instagram)
                      </td>
                      <td className="border-t border-brand-navy/10 px-4 py-2.5">
                        Medir o resultado dos nossos anúncios: identifica de qual
                        anúncio a visita veio.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-4">
                Nenhum outro rastreador de terceiros é utilizado, e não fazemos
                análise de comportamento além dessa medição de anúncios.
              </p>
              <p className="mt-4">
                <strong>Como recusar:</strong> o pixel pode ser bloqueado no
                próprio navegador, pelas configurações de cookies e rastreamento
                de terceiros, ou por extensões de bloqueio. O site continua
                funcionando normalmente com ele bloqueado. Você também pode
                ajustar o que o Meta usa para anúncios nas preferências da sua
                conta do Facebook ou Instagram.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-brand-navy">
                3. Serviços de terceiros
              </h2>
              <p className="mt-3">
                Os botões de WhatsApp direcionam para o serviço wa.me, do
                WhatsApp/Meta, que pode utilizar cookies próprios em seus
                domínios. O mapa de localização, quando ativado, é fornecido
                pelo Google Maps, sujeito às políticas do Google.
              </p>
              <p className="mt-3">
                O <strong>pixel do Meta Ads</strong> é carregado a partir de{" "}
                <span className="font-mono text-xs">connect.facebook.net</span> e
                envia ao Meta a informação de que houve uma visita, para medir os
                anúncios da Agile Door. O tratamento desses dados pelo Meta segue
                as políticas da própria plataforma.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-brand-navy">
                4. Como gerenciar cookies
              </h2>
              <p className="mt-3">
                Você pode limpar o armazenamento local e bloquear cookies nas
                configurações do seu navegador. Como este site usa apenas
                armazenamento essencial, o bloqueio não impede a navegação —
                apenas fará o aviso de cookies reaparecer.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-brand-navy">
                5. Mais informações
              </h2>
              <p className="mt-3">
                O tratamento de dados pessoais é detalhado na nossa{" "}
                <Link
                  href="/politica-de-privacidade"
                  className="font-medium text-brand-navy underline underline-offset-2 hover:text-brand-orange-dark"
                >
                  Política de Privacidade
                </Link>
                . Dúvidas podem ser enviadas para {CONTACT.email}.
              </p>
            </section>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
