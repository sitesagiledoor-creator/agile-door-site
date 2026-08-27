import { Container } from "@/components/ui/Container";
import { ProductIcon } from "@/components/ui/ProductIcons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { EmergencySystem as EmergencySystemData } from "@/data/products";
import { Reveal } from "./Reveal";

/**
 * Seção exclusiva da linha antipânico: mostra que a MESMA porta tem dois
 * comportamentos. O diagrama é um SVG autoral (não é placeholder de foto),
 * desenhado em planta — é a vista em que dá para ver a folha girando para
 * fora e o vão liberado crescendo.
 */

// Geometria compartilhada pelas duas plantas: os montantes ficam no mesmo x
// nas duas, para o olho comparar só a largura que sobra livre.
const JAMB_LEFT = 44;
const JAMB_RIGHT = 436;
const LEAF_LEFT = 142; // encontro do painel fixo com a folha móvel, à esquerda
const LEAF_RIGHT = 338; // idem, à direita
const THICKNESS = 13; // espessura da folha vista em planta
const SWING = 92; // quanto a folha avança para fora ao girar

/** Cota com ticks nas pontas e rótulo centralizado acima da linha. */
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
  const stroke = accent ? "stroke-brand-orange" : "stroke-brand-navy/40";
  const fill = accent ? "fill-brand-orange-dark" : "fill-neutral-muted";
  return (
    <g>
      <line x1={x1} y1={y} x2={x2} y2={y} className={stroke} strokeWidth={2} />
      <line
        x1={x1}
        y1={y - 6}
        x2={x1}
        y2={y + 6}
        className={stroke}
        strokeWidth={2}
      />
      <line
        x1={x2}
        y1={y - 6}
        x2={x2}
        y2={y + 6}
        className={stroke}
        strokeWidth={2}
      />
      <text
        x={(x1 + x2) / 2}
        y={y - 11}
        textAnchor="middle"
        className={`${fill} text-[13px] font-medium`}
      >
        {label}
      </text>
    </g>
  );
}

/** Montante do batente, desenhado como um pequeno bloco cheio. */
function Jamb({ x, y }: { x: number; y: number }) {
  return (
    <rect
      x={x - 5}
      y={y - 13}
      width={10}
      height={26}
      className="fill-brand-navy/70"
    />
  );
}

/** Folha em planta. `vertical` desenha a folha já girada para fora. */
function Panel({
  x,
  y,
  length,
  vertical = false,
  fixed = false,
}: {
  x: number;
  y: number;
  length: number;
  vertical?: boolean;
  fixed?: boolean;
}) {
  const common = fixed
    ? "fill-brand-navy/12 stroke-brand-navy/45"
    : "fill-brand-navy/25 stroke-brand-navy";
  return vertical ? (
    <rect
      x={x}
      y={y - THICKNESS / 2}
      width={THICKNESS}
      height={length}
      rx={2}
      className={common}
      strokeWidth={2}
    />
  ) : (
    <rect
      x={x}
      y={y - THICKNESS / 2}
      width={length}
      height={THICKNESS}
      rx={2}
      className={common}
      strokeWidth={2}
    />
  );
}

/** Seta de deslizamento (horizontal, discreta). */
function SlideArrow({
  x1,
  x2,
  y,
}: {
  x1: number;
  x2: number;
  y: number;
}) {
  const dir = x2 > x1 ? 1 : -1;
  return (
    <g className="stroke-brand-navy/55 fill-brand-navy/55">
      <line x1={x1} y1={y} x2={x2 - 7 * dir} y2={y} strokeWidth={2} />
      <polygon
        points={`${x2},${y} ${x2 - 8 * dir},${y - 4.5} ${x2 - 8 * dir},${y + 4.5}`}
        strokeWidth={0}
      />
    </g>
  );
}

function DiagramaDosModos() {
  const TOP = 108; // linha do piso, planta de cima
  const BOTTOM = 360; // linha do piso, planta de baixo

  return (
    <svg
      viewBox="0 0 480 470"
      role="img"
      aria-labelledby="diagrama-antipanico"
      className="h-auto w-full"
    >
      <title id="diagrama-antipanico">
        Duas plantas comparadas. Em cima, o modo normal: as duas folhas móveis
        deslizam para os lados e sobrepõem os painéis fixos, liberando o vão
        central. Embaixo, o modo emergência: as folhas móveis e também os dois
        painéis fixos giram para fora, perpendiculares ao batente, liberando a
        largura total do vão no sentido da saída.
      </title>

      {/* ---------------- MODO NORMAL ---------------- */}
      <text
        x={JAMB_LEFT}
        y={44}
        className="fill-brand-navy text-[15px] font-bold"
      >
        Modo normal
      </text>
      <text x={JAMB_LEFT} y={64} className="fill-neutral-muted text-[12.5px]">
        as folhas deslizam e se recolhem sobre os fixos
      </text>

      <g>
        {/* painéis fixos, sob as folhas recolhidas */}
        <Panel x={JAMB_LEFT} y={TOP} length={LEAF_LEFT - JAMB_LEFT} fixed />
        <Panel x={LEAF_RIGHT} y={TOP} length={JAMB_RIGHT - LEAF_RIGHT} fixed />
        {/* folhas móveis, recolhidas sobre os fixos */}
        <Panel x={JAMB_LEFT + 4} y={TOP - 15} length={LEAF_LEFT - JAMB_LEFT} />
        <Panel
          x={LEAF_RIGHT - 4}
          y={TOP - 15}
          length={JAMB_RIGHT - LEAF_RIGHT}
        />
        <SlideArrow x1={LEAF_LEFT + 24} x2={LEAF_LEFT - 22} y={TOP + 30} />
        <SlideArrow x1={LEAF_RIGHT - 24} x2={LEAF_RIGHT + 22} y={TOP + 30} />
        <Jamb x={JAMB_LEFT} y={TOP} />
        <Jamb x={JAMB_RIGHT} y={TOP} />
        <Dimension
          x1={LEAF_LEFT}
          x2={LEAF_RIGHT}
          y={TOP + 62}
          label="vão livre de passagem"
        />
      </g>

      {/* separador entre as duas plantas */}
      <line
        x1={JAMB_LEFT}
        y1={218}
        x2={JAMB_RIGHT}
        y2={218}
        className="stroke-brand-navy/15"
        strokeWidth={1}
        strokeDasharray="5 5"
      />

      {/* ---------------- MODO EMERGÊNCIA ---------------- */}
      <text
        x={JAMB_LEFT}
        y={264}
        className="fill-brand-orange-dark text-[15px] font-bold"
      >
        Modo emergência
      </text>
      <text x={JAMB_LEFT} y={284} className="fill-neutral-muted text-[12.5px]">
        folhas e painéis fixos giram para fora, sem energia
      </text>

      <g>
        {/* as quatro folhas giradas 90°, perpendiculares ao batente */}
        <Panel x={JAMB_LEFT} y={BOTTOM} length={SWING} vertical fixed />
        <Panel x={LEAF_LEFT} y={BOTTOM} length={SWING} vertical />
        <Panel x={LEAF_RIGHT - THICKNESS} y={BOTTOM} length={SWING} vertical />
        <Panel
          x={JAMB_RIGHT - THICKNESS}
          y={BOTTOM}
          length={SWING}
          vertical
          fixed
        />

        {/* arcos do giro, para ler o movimento */}
        <path
          d={`M ${LEAF_LEFT} ${BOTTOM - 26} A 26 26 0 0 1 ${LEAF_LEFT + 26} ${BOTTOM}`}
          className="fill-none stroke-brand-orange/45"
          strokeWidth={1.5}
          strokeDasharray="4 4"
        />
        <path
          d={`M ${LEAF_RIGHT} ${BOTTOM - 26} A 26 26 0 0 0 ${LEAF_RIGHT - 26} ${BOTTOM}`}
          className="fill-none stroke-brand-orange/45"
          strokeWidth={1.5}
          strokeDasharray="4 4"
        />

        <Jamb x={JAMB_LEFT} y={BOTTOM} />
        <Jamb x={JAMB_RIGHT} y={BOTTOM} />

        {/* sentido da fuga */}
        <g className="stroke-brand-orange fill-brand-orange">
          <line
            x1={240}
            y1={BOTTOM + 12}
            x2={240}
            y2={BOTTOM + 52}
            strokeWidth={3}
          />
          <polygon
            points={`240,${BOTTOM + 64} 231,${BOTTOM + 47} 249,${BOTTOM + 47}`}
            strokeWidth={0}
          />
        </g>
        <text
          x={258}
          y={BOTTOM + 46}
          className="fill-brand-orange-dark text-[13px] font-semibold"
        >
          sentido da fuga
        </text>

        <Dimension
          x1={JAMB_LEFT}
          x2={JAMB_RIGHT}
          y={BOTTOM - 42}
          label="vão total liberado"
          accent
        />
      </g>
    </svg>
  );
}

export function EmergencySystem({
  data,
  productName,
}: {
  data: EmergencySystemData;
  productName: string;
}) {
  return (
    <section className="bg-brand-navy-dark py-16 sm:py-20">
      <Container>
        <Reveal>
          <SectionHeading dark eyebrow="Sistema antipânico" title={data.title} />
        </Reveal>

        <div className="mt-10 grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <div className="space-y-4 text-base leading-relaxed text-white/80">
              {data.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>

            <ul className="mt-8 grid gap-4">
              {data.modes.map((mode) => (
                <li
                  key={mode.title}
                  className="border-l-4 border-brand-orange bg-white/5 p-5 chamfer-sm"
                >
                  <div className="flex items-center gap-3">
                    <ProductIcon
                      name={mode.icon}
                      className="h-6 w-6 shrink-0 text-brand-orange-light"
                    />
                    <h3 className="font-display text-base font-bold text-white">
                      {mode.title}
                    </h3>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-white/75">
                    {mode.text}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <figure className="bg-white p-5 chamfer sm:p-7">
              <DiagramaDosModos />
              <figcaption className="mt-4 border-t border-brand-navy/10 pt-4 text-sm leading-relaxed text-neutral-muted">
                Vista em planta, com as proporções em escala ilustrativa. A
                composição do {productName} — número de folhas, painéis fixos e
                largura de cada um — é definida a partir da medida real do vão.
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
