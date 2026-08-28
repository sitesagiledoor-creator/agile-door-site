import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { CountUp } from "@/components/ui/CountUp";
import { asset } from "@/lib/asset";
import { Reveal } from "./Reveal";

/**
 * Prova social logo abaixo do hero: volume instalado + marcas atendidas.
 *
 * O histórico é da EQUIPE, acumulado antes da Agile Door — e o texto diz isso.
 * A marca é nova, e a página /sobre afirma justamente que não inventamos
 * números de mercado; atribuir esse volume à empresa contradiria o próprio site.
 *
 * Os logotipos foram padronizados a partir dos arquivos enviados por cada
 * marca: fundo removido, tinta única no navy e tela de tamanho igual, para
 * nenhuma pesar mais que a outra. Para acrescentar uma marca, basta o arquivo
 * em /public/clientes no mesmo formato (400×140, transparente).
 */
const BRANDS = [
  { name: "Rede D'Or", file: "rede-dor.png" },
  { name: "Magalu", file: "magalu.png" },
  { name: "Iguatemi", file: "iguatemi.png" },
  { name: "Atacadão", file: "atacadao.png" },
  { name: "Assaí", file: "assai.png" },
  { name: "Panobianco", file: "panobianco.png" },
  { name: "Bradesco", file: "bradesco.png" },
  { name: "Santander", file: "santander.png" },
];

export function TrackRecord() {
  return (
    <section className="border-b border-brand-navy/10 bg-white py-14 sm:py-16">
      <Container>
        <Reveal>
          <p className="max-w-3xl font-display text-3xl font-bold leading-[1.15] tracking-tight text-brand-navy text-balance sm:text-4xl lg:text-5xl">
            {/* A contagem é decorativa; o texto completo vai para o leitor de tela */}
            <span className="sr-only">
              Mais de 15 mil portas automáticas instaladas
            </span>
            <span aria-hidden="true">
              +<CountUp to={15} /> mil portas automáticas instaladas
            </span>
          </p>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-neutral-muted">
            pela nossa equipe, em todo o território nacional — de loja de rua a
            hospital, shopping e agência bancária.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-10 text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange-dark">
            Marcas atendidas pela nossa equipe
          </p>
          <ul className="mt-6 grid grid-cols-2 items-center gap-x-8 gap-y-9 border-t border-brand-navy/10 pt-8 sm:grid-cols-4">
            {BRANDS.map((brand) => (
              <li key={brand.name} className="flex justify-center">
                <Image
                  src={asset(`/clientes/${brand.file}`)}
                  alt={brand.name}
                  width={400}
                  height={140}
                  sizes="176px"
                  className="h-auto w-full max-w-[176px] opacity-55 transition-opacity duration-200 hover:opacity-100"
                />
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
