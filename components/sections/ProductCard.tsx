import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/data/products";
import { asset } from "@/lib/asset";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden border border-brand-navy/10 bg-white transition-colors duration-200 hover:border-brand-orange/60 chamfer">
      <div className="relative aspect-[4/3] bg-neutral-bg">
        <Image
          src={asset(product.images[0].src)}
          alt={product.images[0].alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-contain p-2"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-orange-dark">
          {product.category}
        </p>
        <h2 className="mt-2 font-display text-2xl font-bold text-brand-navy">
          {product.name}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-neutral-muted">
          {product.shortDescription}
        </p>

        <dl className="mt-5 space-y-2 border-t border-brand-navy/10 pt-4">
          {product.keySpecs.map((spec) => (
            <div
              key={spec.label}
              className="flex items-baseline justify-between gap-3"
            >
              <dt className="text-xs text-neutral-muted">{spec.label}</dt>
              <dd className="font-mono text-sm font-semibold text-brand-navy">
                {spec.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-6 flex-1" />
        <Link
          href={`/produtos/${product.slug}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-brand-orange-dark transition-colors hover:text-brand-navy focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange"
        >
          Ver detalhes do {product.name}
          <ArrowRight
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
            aria-hidden="true"
          />
        </Link>
      </div>
    </article>
  );
}
