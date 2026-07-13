import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/sections/Reveal";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { blogPosts, formatPostDate } from "@/data/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Guias práticos sobre portas automáticas: como especificar, normas de segurança, instalação e manutenção — pela equipe da Agile Door.",
};

export default function BlogPage() {
  return (
    <>
      <section className="bg-brand-navy-dark py-16 sm:py-20">
        <Container>
          <Reveal>
            <SectionHeading
              as="h1"
              dark
              eyebrow="Blog"
              title="Guias práticos sobre portas automáticas"
              lead="Conteúdo técnico em linguagem direta, para quem precisa especificar, comprar ou manter uma porta automática — sem jargão de vendas."
            />
          </Reveal>
        </Container>
      </section>

      <section className="bg-neutral-bg py-16 sm:py-20">
        <Container className="max-w-4xl">
          <ul className="space-y-8">
            {blogPosts.map((post, index) => (
              <Reveal key={post.slug} delay={index * 0.08}>
                <li className="list-none">
                  <article className="group border border-brand-navy/10 bg-white p-8 transition-colors hover:border-brand-orange/60 chamfer">
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-muted">
                      <time dateTime={post.publishedAt}>
                        {formatPostDate(post.publishedAt)}
                      </time>
                    </p>
                    <h2 className="mt-3 font-display text-2xl font-bold text-brand-navy">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="hover:text-brand-orange-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange"
                      >
                        {post.title}
                      </Link>
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-neutral-muted">
                      {post.description}
                    </p>
                    <p className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-orange-dark">
                      Ler o artigo completo
                      <ArrowRight
                        className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                        aria-hidden="true"
                      />
                    </p>
                  </article>
                </li>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.15}>
            <p className="mt-10 text-sm leading-relaxed text-neutral-muted">
              Novos guias são publicados conforme as dúvidas mais comuns dos
              nossos clientes. Tem um tema que gostaria de ver aqui? Sugira
              pelo WhatsApp.
            </p>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
