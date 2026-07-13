import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { FinalCta } from "@/components/sections/FinalCta";
import { Reveal } from "@/components/sections/Reveal";
import { Container } from "@/components/ui/Container";
import { blogPosts, formatPostDate, getBlogPost } from "@/data/blog";
import { SITE } from "@/lib/constants";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      type: "article",
      title: `${post.title} | ${SITE.name}`,
      description: post.description,
      publishedTime: post.publishedAt,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    inLanguage: "pt-BR",
    url: `${SITE.url}/blog/${post.slug}`,
    author: { "@type": "Organization", name: SITE.name },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: {
        "@type": "ImageObject",
        url: `${SITE.url}/logo/logo-simbolo.png`,
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <article className="bg-white py-16 sm:py-20">
        <Container className="max-w-3xl">
          <Reveal>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-orange-dark hover:text-brand-navy focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Voltar para o blog
            </Link>

            <p className="mt-8 text-xs font-medium uppercase tracking-[0.18em] text-neutral-muted">
              <time dateTime={post.publishedAt}>
                {formatPostDate(post.publishedAt)}
              </time>
            </p>
            <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-brand-navy text-balance sm:text-4xl">
              {post.title}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-neutral-muted">
              {post.description}
            </p>

            <div className="mt-10 space-y-10 border-t border-brand-navy/10 pt-10">
              {post.sections.map((section, index) => (
                <section key={section.heading ?? `secao-${index}`}>
                  {section.heading && (
                    <h2 className="font-display text-xl font-bold text-brand-navy sm:text-2xl">
                      {section.heading}
                    </h2>
                  )}
                  <div className="mt-4 space-y-4">
                    {section.paragraphs.map((paragraph) => (
                      <p
                        key={paragraph.slice(0, 40)}
                        className="text-base leading-relaxed text-neutral-text"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </Reveal>
        </Container>
      </article>

      <FinalCta
        title="Quer ajuda para especificar a sua porta?"
        text="Envie as medidas do vão e uma foto da entrada pelo WhatsApp: recomendamos a configuração adequada, sem compromisso."
      />
    </>
  );
}
