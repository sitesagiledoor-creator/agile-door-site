"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { ProductImage } from "@/data/products";
import { asset } from "@/lib/asset";

/**
 * Lightbox próprio (sem biblioteca): foto inteira em tamanho grande,
 * fecha por ESC / clique no fundo / botão, navega por setas (tela e teclado)
 * quando há mais de uma imagem.
 */
export function Lightbox({
  images,
  index,
  onClose,
  onNavigate,
}: {
  images: ProductImage[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const count = images.length;
  const image = images[index];

  const goTo = useCallback(
    (target: number) => onNavigate(((target % count) + count) % count),
    [count, onNavigate]
  );

  useEffect(() => {
    closeRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
      else if (event.key === "ArrowLeft" && count > 1) goTo(index - 1);
      else if (event.key === "ArrowRight" && count > 1) goTo(index + 1);
    }
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [count, goTo, index, onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Imagem ampliada: ${image.alt}`}
      onClick={onClose}
      className="fixed inset-0 z-[70] flex items-center justify-center bg-brand-navy-dark/90 p-4 backdrop-blur-sm sm:p-8"
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Fechar imagem ampliada"
        className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        <X className="h-6 w-6" aria-hidden="true" />
      </button>

      {count > 1 && (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            goTo(index - 1);
          }}
          aria-label="Imagem anterior"
          className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:left-6"
        >
          <ChevronLeft className="h-6 w-6" aria-hidden="true" />
        </button>
      )}

      <figure
        onClick={(event) => event.stopPropagation()}
        className="relative flex max-h-full w-full max-w-5xl flex-col items-center"
      >
        <div className="relative h-[70vh] w-full sm:h-[78vh]">
          <Image
            key={image.src}
            src={asset(image.src)}
            alt={image.alt}
            fill
            sizes="100vw"
            className="object-contain"
          />
        </div>
        <figcaption className="mt-3 max-w-2xl text-center text-sm text-white/80">
          {image.alt}
          {count > 1 && (
            <span className="ml-2 font-mono text-white/60">
              {index + 1} / {count}
            </span>
          )}
        </figcaption>
      </figure>

      {count > 1 && (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            goTo(index + 1);
          }}
          aria-label="Próxima imagem"
          className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-6"
        >
          <ChevronRight className="h-6 w-6" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
