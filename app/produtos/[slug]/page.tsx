import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Fan, FileText } from "lucide-react";
import { FinalCta } from "@/components/sections/FinalCta";
import { ProductCard } from "@/components/sections/ProductCard";
import { ProductGallery } from "@/components/sections/ProductGallery";
import { Reveal } from "@/components/sections/Reveal";
import { SpecTable } from "@/components/sections/SpecTable";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ProductIcon } from "@/components/ui/ProductIcons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { getProduct, products } from "@/data/products";
import { SITE, WHATSAPP_MESSAGES, whatsappLink } from "@/lib/constants";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};

  return {
    title: `${product.name} — ${product.category}`,
    description: product.shortDescription,
    openGraph: {
      title: `${product.name} — ${product.category} | ${SITE.name}`,
      description: product.shortDescription,
      images: [{ url: product.images[0].src }],
    },
  };
}

export default async function ProdutoPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    image: `${SITE.url}${product.images[0].src}`,
    url: `${SITE.url}/produtos/${product.slug}`,
    category: product.category,
    brand: { "@type": "Brand", name: SITE.name },
    additionalProperty: product.specGroups.flatMap((group) =>
      group.rows.map((row) => ({
        "@type": "PropertyValue",
        name: row.label,
        value: row.value,
      }))
    ),
  };

  const relatedProducts = products.filter((p) => p.slug !== product.slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      {/* Hero do produto */}
      <section className="bg-white py-12 sm:py-16">
        <Container className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <ProductGallery
              images={product.images}
              productName={product.name}
            />
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange-dark">
              {product.variantLabel
                ? `${product.category} — ${product.variantLabel}`
                : product.category}
            </p>
            <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-brand-navy sm:text-5xl">
              {product.name}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-neutral-muted">
              {product.shortDescription}
            </p>

            <ul className="mt-6 flex flex-wrap gap-2">
              {product.badges.map((badge) => (
                <li
                  key={badge}
                  className="border border-brand-navy/15 bg-neutral-bg px-3 py-1.5 text-xs font-semibold text-brand-navy"
                >
                  {badge}
                </li>
              ))}
            </ul>

            <dl className="mt-8 grid grid-cols-3 gap-4 border-y border-brand-navy/10 py-5">
              {product.keySpecs.map((spec) => (
                <div key={spec.label}>
                  <dd className="font-mono text-lg font-semibold text-brand-navy sm:text-xl">
                    {spec.value}
                  </dd>
                  <dt className="mt-1 text-xs text-neutral-muted">
                    {spec.label}
                  </dt>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {/* Anel pulsante no wrapper: o clip-path chanfrado do botão
                  cortaria o ::before do efeito. Mesma classe do FAB. */}
              <span className="whatsapp-pulse inline-flex rounded-lg">
                <Button
                  href={whatsappLink(WHATSAPP_MESSAGES.product(product.name))}
                  external
                  variant="whatsapp"
                  size="lg"
                  className="w-full"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  Solicitar Orçamento do {product.name} via WhatsApp
                </Button>
              </span>
              {product.datasheetUrl ? (
                <Button
                  href={product.datasheetUrl}
                  external
                  variant="outline"
                  size="lg"
                >
                  <FileText className="h-5 w-5" aria-hidden="true" />
                  Baixar Ficha Técnica (PDF)
                </Button>
              ) : (
                <Button href="#ficha-tecnica" variant="outline" size="lg">
                  <FileText className="h-5 w-5" aria-hidden="true" />
                  Ver Ficha Técnica completa
                </Button>
              )}
            </div>
            <p className="mt-4 text-xs text-neutral-muted">
              Sem preço fechado no site: cada instalação é orçada conforme vão,
              tipo de porta e acessórios. O orçamento é gratuito e sem
              compromisso.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Visão geral */}
      <section className="bg-neutral-bg py-16 sm:py-20">
        <Container className="max-w-4xl">
          <Reveal>
            <SectionHeading
              eyebrow={`Onde instalar ${product.name}!`}
              title={`Por que especificar o ${product.name}`}
            />
            <div className="mt-6 space-y-4 text-base leading-relaxed text-neutral-muted">
              {product.overview.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
          </Reveal>

          {/* Destaque do motor brushless — callout próprio, não diluído
              na grade de diferenciais */}
          <Reveal delay={0.1}>
            <aside className="mt-10 border-l-4 border-brand-orange bg-brand-navy-dark p-6 chamfer sm:p-8">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center bg-brand-orange text-brand-navy-dark chamfer-sm">
                  <Fan className="h-7 w-7" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-display text-xl font-bold text-white">
                    {product.motorHighlight.title}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-white/80">
                    {product.motorHighlight.text}
                  </p>
                  <p className="mt-3 font-mono text-lg font-semibold text-brand-orange-light">
                    {product.motorHighlight.specs}
                  </p>
                </div>
              </div>
            </aside>
          </Reveal>
        </Container>
      </section>

      {/* Diferenciais */}
      <section className="bg-white py-16 sm:py-20">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Diferenciais"
              title="Motor e controlador garantem:"
            />
          </Reveal>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {product.features.map((feature, index) => (
              <Reveal key={feature.title} delay={index * 0.06}>
                <li className="h-full border border-brand-navy/10 bg-neutral-bg p-6 transition-colors duration-200 hover:border-brand-orange/60 chamfer">
                  <ProductIcon
                    name={feature.icon}
                    className="h-7 w-7 text-brand-orange-dark"
                  />
                  <h3 className="mt-4 font-display text-lg font-bold text-brand-navy">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-muted">
                    {feature.text}
                  </p>
                </li>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* Ficha técnica */}
      <section
        id="ficha-tecnica"
        className="scroll-mt-24 bg-neutral-bg py-16 sm:py-20"
      >
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Ficha técnica"
              title="Especificações técnicas:"
            />
          </Reveal>
          <Reveal delay={0.1} className="mt-12">
            <SpecTable groups={product.specGroups} />
          </Reveal>
        </Container>
      </section>

      {/* Aplicações recomendadas — só renderiza quando o produto tem itens
          (removida do AG200 por decisão do cliente, mantida no AG400) */}
      {product.applications.length > 0 && (
        <section className="bg-white py-16 sm:py-20">
          <Container>
            <Reveal>
              <SectionHeading
                eyebrow="Aplicações"
                title={`Onde o ${product.name} se encaixa bem`}
              />
            </Reveal>
            <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {product.applications.map((application, index) => (
                <Reveal key={application.title} delay={index * 0.06}>
                  <li className="h-full border-t-2 border-brand-orange bg-neutral-bg p-5">
                    <ProductIcon
                      name={application.icon}
                      className="h-7 w-7 text-brand-navy"
                    />
                    <h3 className="mt-3 font-display text-base font-bold text-brand-navy">
                      {application.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-neutral-muted">
                      {application.text}
                    </p>
                  </li>
                </Reveal>
              ))}
            </ul>
          </Container>
        </section>
      )}

      {/* Link interno entre produtos (SEO + descoberta) */}
      {relatedProducts.length > 0 && (
        <section className="bg-white py-16 sm:py-20">
          <Container>
            <Reveal>
              <SectionHeading
                eyebrow="Conheça também"
                title="Outros produtos da Agile Door"
              />
            </Reveal>
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((related, index) => (
                <Reveal key={related.slug} delay={index * 0.08}>
                  <ProductCard product={related} />
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      <FinalCta
        title={`Pronto para instalar o ${product.name}?`}
        text="Envie as medidas do vão e uma foto da entrada pelo WhatsApp: retornamos com compatibilidade confirmada e orçamento."
        whatsappMessage={WHATSAPP_MESSAGES.product(product.name)}
      />
    </>
  );
}
