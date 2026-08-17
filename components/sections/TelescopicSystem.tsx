import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { TelescopicSystem as TelescopicSystemData } from "@/data/products";
import { Reveal } from "./Reveal";

/**
 * Seção exclusiva da linha telescópica: explica o sincronismo 2:1 e a
 * economia de espaço lateral. O diagrama é um SVG autoral (não é placeholder
 * de foto) — compara o recolhimento das duas soluções para o MESMO vão livre.
 */

// Geometria compartilhada pelas duas faixas do diagrama: o vão livre é
// desenhado no mesmo lugar nas duas, para o olho comparar só o recolhimento.
const OPENING_LEFT = 258;
const OPENING_RIGHT = 442;
const SLIDING_POCKET_LEFT = 74; // recolhimento = largura do vão
const TELESCOPIC_POCKET_LEFT = 166; // recolhimento ≈ metade

/** Linha de cota com ticks nas pontas e rótulo centralizado abaixo. */
function Dimension({
  x1,
  x2,
  y,
  label,
  accent = false,
}: {
  x1: number;
  x2: number;
  y: number;
  label: string;
  accent?: boolean;
}) {
  const stroke = accent ? "stroke-brand-orange" : "stroke-brand-navy/45";
  const fill = accent ? "fill-brand-orange-dark" : "fill-neutral-muted";
  return (
    <g>
      <line
        x1={x1}
        y1={y}
        x2={x2}
        y2={y}
        className={stroke}
        strokeWidth="1.5"
      />
      <line
        x1={x1}
        y1={y - 5}
        x2={x1}
        y2={y + 5}
        className={stroke}
        strokeWidth="1.5"
      />
      <line
        x1={x2}
        y1={y - 5}
        x2={x2}
        y2={y + 5}
        className={stroke}
        strokeWidth="1.5"
      />
      <text
        x={(x1 + x2) / 2}
        y={y + 20}
        textAnchor="middle"
        fontSize="17"
        className={fill}
      >
        {label}
      </text>
    </g>
  );
}

function TelescopicDiagram() {
  return (
    <svg
      viewBox="0 0 480 496"
      role="img"
      aria-labelledby="diagrama-telescopico-titulo diagrama-telescopico-desc"
      className="h-auto w-full"
    >
      <title id="diagrama-telescopico-titulo">
        Comparação entre porta de correr e porta telescópica
      </title>
      <desc id="diagrama-telescopico-desc">
        Para abrir o mesmo vão livre, a porta de correr comum precisa de um
        espaço lateral de recolhimento do mesmo tamanho do vão, ocupado por uma
        folha. A porta telescópica recolhe duas folhas sobrepostas no mesmo
        espaço e precisa de cerca de metade dessa largura. A folha externa
        percorre o dobro do caminho da folha interna — o sincronismo 2:1.
      </desc>

      <defs>
        <marker
          id="seta-telescopica"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 1 L 10 5 L 0 9 z" fill="currentColor" />
        </marker>
      </defs>

      {/* ---------- Faixa 1: porta de correr automática ---------- */}
      <text
        x="38"
        y="22"
        fontSize="20"
        fontWeight="700"
        className="fill-brand-navy"
      >
        Porta de correr automática
      </text>

      {/* Operador (trilho + cabeçote) */}
      <rect
        x={SLIDING_POCKET_LEFT}
        y="34"
        width={OPENING_RIGHT - SLIDING_POCKET_LEFT}
        height="13"
        rx="2"
        className="fill-brand-navy"
      />

      {/* Folha única recolhida sobre o painel lateral */}
      <rect
        x={SLIDING_POCKET_LEFT + 2}
        y="53"
        width={OPENING_LEFT - SLIDING_POCKET_LEFT - 4}
        height="86"
        rx="2"
        className="fill-brand-blue/15 stroke-brand-navy/70"
        strokeWidth="1.5"
      />
      <text
        x={(SLIDING_POCKET_LEFT + OPENING_LEFT) / 2}
        y="101"
        textAnchor="middle"
        fontSize="17"
        className="fill-brand-navy"
      >
        1 folha
      </text>

      {/* Vão livre */}
      <line
        x1={OPENING_LEFT}
        y1="53"
        x2={OPENING_LEFT}
        y2="139"
        className="stroke-brand-navy/30"
        strokeWidth="1.5"
        strokeDasharray="4 4"
      />
      <line
        x1={OPENING_RIGHT}
        y1="53"
        x2={OPENING_RIGHT}
        y2="139"
        className="stroke-brand-navy/30"
        strokeWidth="1.5"
        strokeDasharray="4 4"
      />

      {/* Piso */}
      <line
        x1="52"
        y1="143"
        x2="456"
        y2="143"
        className="stroke-brand-navy/35"
        strokeWidth="2"
      />

      <Dimension
        x1={SLIDING_POCKET_LEFT}
        x2={OPENING_LEFT}
        y={163}
        label="recolhimento = vão"
      />
      <Dimension
        x1={OPENING_LEFT}
        x2={OPENING_RIGHT}
        y={163}
        label="vão livre"
        accent
      />

      {/* ---------- Faixa 2: porta telescópica automática ---------- */}
      <text
        x="38"
        y="222"
        fontSize="20"
        fontWeight="700"
        className="fill-brand-navy"
      >
        Porta telescópica automática
      </text>

      <rect
        x={TELESCOPIC_POCKET_LEFT}
        y="234"
        width={OPENING_RIGHT - TELESCOPIC_POCKET_LEFT}
        height="13"
        rx="2"
        className="fill-brand-navy"
      />

      {/* Duas folhas sobrepostas no mesmo espaço de recolhimento:
          a de trás (interna) aparece deslocada para cima e para a esquerda. */}
      <rect
        x={TELESCOPIC_POCKET_LEFT}
        y="251"
        width="84"
        height="82"
        rx="2"
        className="fill-brand-blue/10 stroke-brand-navy/45"
        strokeWidth="1.5"
      />
      <rect
        x={TELESCOPIC_POCKET_LEFT + 6}
        y="257"
        width="84"
        height="82"
        rx="2"
        className="fill-brand-blue/20 stroke-brand-navy/70"
        strokeWidth="1.5"
      />
      <text
        x={TELESCOPIC_POCKET_LEFT + 48}
        y="303"
        textAnchor="middle"
        fontSize="17"
        className="fill-brand-navy"
      >
        2 folhas
      </text>

      <line
        x1={OPENING_LEFT}
        y1="251"
        x2={OPENING_LEFT}
        y2="339"
        className="stroke-brand-navy/30"
        strokeWidth="1.5"
        strokeDasharray="4 4"
      />
      <line
        x1={OPENING_RIGHT}
        y1="251"
        x2={OPENING_RIGHT}
        y2="339"
        className="stroke-brand-navy/30"
        strokeWidth="1.5"
        strokeDasharray="4 4"
      />

      <line
        x1="52"
        y1="343"
        x2="456"
        y2="343"
        className="stroke-brand-navy/35"
        strokeWidth="2"
      />

      <Dimension
        x1={TELESCOPIC_POCKET_LEFT}
        x2={OPENING_LEFT}
        y={363}
        label="≈ metade"
      />
      <Dimension
        x1={OPENING_LEFT}
        x2={OPENING_RIGHT}
        y={363}
        label="mesmo vão livre"
        accent
      />

      {/* ---------- Faixa 3: sincronismo 2:1 ---------- */}
      <line
        x1="38"
        y1="400"
        x2="442"
        y2="400"
        className="stroke-brand-navy/15"
        strokeWidth="1"
      />
      <text
        x="38"
        y="428"
        fontSize="20"
        fontWeight="700"
        className="fill-brand-navy"
      >
        Sincronismo 2:1
      </text>

      <g className="text-brand-orange">
        <line
          x1="38"
          y1="452"
          x2="128"
          y2="452"
          stroke="currentColor"
          strokeWidth="3"
          markerEnd="url(#seta-telescopica)"
        />
      </g>
      <text x="140" y="457" fontSize="17" className="fill-neutral-muted">
        folha externa · 2×
      </text>

      <g className="text-brand-blue">
        <line
          x1="38"
          y1="478"
          x2="83"
          y2="478"
          stroke="currentColor"
          strokeWidth="3"
          markerEnd="url(#seta-telescopica)"
        />
      </g>
      <text x="140" y="483" fontSize="17" className="fill-neutral-muted">
        folha interna · 1×
      </text>
    </svg>
  );
}

export function TelescopicSystem({
  data,
  productName,
}: {
  data: TelescopicSystemData;
  productName: string;
}) {
  return (
    <section className="bg-brand-navy-dark py-16 sm:py-20">
      <Container>
        <Reveal>
          <SectionHeading
            dark
            eyebrow="Sistema telescópico"
            title={data.title}
          />
        </Reveal>

        <div className="mt-10 grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <div className="space-y-4 text-base leading-relaxed text-white/80">
              {data.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <figure className="bg-white p-5 chamfer sm:p-7">
              <TelescopicDiagram />
              <figcaption className="mt-4 border-t border-brand-navy/10 pt-4 text-sm leading-relaxed text-neutral-muted">
                Esquema comparativo do recolhimento das folhas — as proporções
                são ilustrativas. A composição do {productName} é definida a
                partir da medida real do vão.
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
