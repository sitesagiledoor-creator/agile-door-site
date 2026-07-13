"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "@/data/products";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";

/**
 * Carrossel de produtos da Home. Lê qualquer quantidade de produtos de
 * data/products.ts — adicionar um produto novo não exige mudanças aqui.
 *
 * Acessibilidade/UX: setas, indicadores, arraste nativo por toque
 * (scroll-snap), setas do teclado quando a trilha está focada e
 * prefers-reduced-motion respeitado (rolagem sem animação).
 *
 * autoPlay: desligado por padrão — com só 2 produtos a alternância fica
 * repetitiva. Quando o catálogo tiver 3+, basta passar autoPlay na Home;
 * ele pausa em hover/foco/toque e não roda com prefers-reduced-motion.
 */
export function ProductCarousel({
  products,
  autoPlay = false,
  autoPlayIntervalMs = 6000,
}: {
  products: Product[];
  autoPlay?: boolean;
  autoPlayIntervalMs?: number;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback(
    (target: number) => {
      const track = trackRef.current;
      if (!track) return;
      const count = products.length;
      const clamped = ((target % count) + count) % count;
      const slide = track.children[clamped] as HTMLElement | undefined;
      if (!slide) return;
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      track.scrollTo({
        left: slide.offsetLeft,
        behavior: reduceMotion ? "auto" : "smooth",
      });
    },
    [products.length]
  );

  // Mantém o indicador sincronizado com o arraste manual.
  function handleScroll() {
    const track = trackRef.current;
    if (!track || track.clientWidth === 0) return;
    setIndex(
      Math.max(
        0,
        Math.min(
          products.length - 1,
          Math.round(track.scrollLeft / track.clientWidth)
        )
      )
    );
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(index - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(index + 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      goTo(0);
    } else if (event.key === "End") {
      event.preventDefault();
      goTo(products.length - 1);
    }
  }

  useEffect(() => {
    if (!autoPlay || paused || products.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      const track = trackRef.current;
      if (!track || track.clientWidth === 0) return;
      const current = Math.round(track.scrollLeft / track.clientWidth);
      goTo(current + 1);
    }, autoPlayIntervalMs);
    return () => clearInterval(id);
  }, [autoPlay, paused, products.length, autoPlayIntervalMs, goTo]);

  return (
    <div
      role="region"
      aria-roledescription="carrossel"
      aria-label="Produtos da Agile Door"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
    >
      <div
        ref={trackRef}
        tabIndex={0}
        onScroll={handleScroll}
        onKeyDown={handleKeyDown}
        aria-label="Lista de produtos — use as setas do teclado para navegar"
        className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange"
      >
        {products.map((product, slideIndex) => (
          <article
            key={product.slug}
            role="group"
            aria-roledescription="slide"
            aria-label={`${slideIndex + 1} de ${products.length}: ${product.name}`}
            className="w-full shrink-0 snap-center px-0.5"
          >
            <div className="grid h-full overflow-hidden border border-brand-navy/10 bg-white chamfer lg:grid-cols-2">
              {/* object-contain: proporções variam entre as fotos — a imagem
                  aparece inteira e o neutral-bg preenche as sobras */}
              <div className="relative min-h-64 bg-neutral-bg lg:min-h-full">
                <Image
                  src={asset(product.images[0].src)}
                  alt={product.images[0].alt}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-contain p-3"
                />
              </div>
              <div className="flex flex-col p-8 sm:p-10">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-orange-dark">
                  {product.category} — {product.variantLabel}
                </p>
                <h3 className="mt-2 font-display text-3xl font-bold text-brand-navy">
                  {product.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-muted">
                  {product.shortDescription}
                </p>

                <dl className="mt-6 space-y-3">
                  {product.keySpecs.map((spec) => (
                    <div
                      key={spec.label}
                      className="flex items-baseline justify-between gap-4 border-b border-brand-navy/10 pb-2.5"
                    >
                      <dt className="text-sm text-neutral-muted">
                        {spec.label}
                      </dt>
                      <dd className="font-mono text-base font-semibold text-brand-navy">
                        {spec.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-8 flex-1" />
                <div>
                  <Button
                    href={`/produtos/${product.slug}`}
                    variant="secondary"
                    size="lg"
                  >
                    Ver detalhes do {product.name}
                    <ArrowRight className="h-5 w-5" aria-hidden="true" />
                  </Button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Controles: setas + indicadores */}
      <div className="mt-6 flex items-center justify-center gap-6">
        <button
          type="button"
          onClick={() => goTo(index - 1)}
          aria-label="Produto anterior"
          className="flex h-11 w-11 items-center justify-center border-2 border-brand-navy/20 text-brand-navy transition-colors hover:border-brand-orange hover:text-brand-orange-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>

        <div className="flex items-center gap-2.5" role="tablist" aria-label="Escolher produto exibido">
          {products.map((product, dotIndex) => (
            <button
              key={product.slug}
              type="button"
              role="tab"
              aria-selected={dotIndex === index}
              aria-label={`Exibir ${product.name}`}
              onClick={() => goTo(dotIndex)}
              className={cn(
                "h-2.5 rounded-full transition-all duration-300 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange",
                dotIndex === index
                  ? "w-8 bg-brand-orange"
                  : "w-2.5 bg-brand-navy/25 hover:bg-brand-navy/50"
              )}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => goTo(index + 1)}
          aria-label="Próximo produto"
          className="flex h-11 w-11 items-center justify-center border-2 border-brand-navy/20 text-brand-navy transition-colors hover:border-brand-orange hover:text-brand-orange-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
