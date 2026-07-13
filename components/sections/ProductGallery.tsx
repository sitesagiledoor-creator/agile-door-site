"use client";

import { useState } from "react";
import Image from "next/image";
import { Expand } from "lucide-react";
import type { ProductImage } from "@/data/products";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/cn";
import { Lightbox } from "@/components/ui/Lightbox";

/**
 * Galeria com imagem principal + miniaturas, navegável por teclado.
 * As fotos têm proporções variadas (banners, fotos de estúdio, diagramas):
 * object-contain garante a imagem INTEIRA, com fundo branco preenchendo as
 * sobras. Clique na imagem principal abre o lightbox com navegação.
 */
export function ProductGallery({
  images,
  productName,
}: {
  images: ProductImage[];
  productName: string;
}) {
  const [current, setCurrent] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const image = images[current];

  return (
    <div>
      <button
        type="button"
        onClick={() => setLightboxOpen(true)}
        aria-label={`Ampliar imagem: ${image.alt}`}
        className="group relative block aspect-[4/3] w-full cursor-zoom-in overflow-hidden border border-brand-navy/10 bg-white chamfer focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-orange"
      >
        <Image
          key={image.src}
          src={asset(image.src)}
          alt={image.alt}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-contain p-2"
        />
        <span className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-brand-navy-dark/70 text-white opacity-80 transition-opacity group-hover:opacity-100">
          <Expand className="h-4 w-4" aria-hidden="true" />
        </span>
      </button>

      {images.length > 1 && (
        <ul
          className="mt-3 grid gap-3"
          style={{
            gridTemplateColumns: `repeat(${images.length}, minmax(0, 1fr))`,
          }}
          aria-label={`Imagens do ${productName}`}
        >
          {images.map((img, index) => (
            <li key={img.src}>
              <button
                type="button"
                onClick={() => setCurrent(index)}
                aria-label={`Ver imagem ${index + 1} de ${images.length}: ${img.alt}`}
                aria-current={index === current ? "true" : undefined}
                className={cn(
                  "relative block aspect-[4/3] w-full overflow-hidden border-2 bg-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange",
                  index === current
                    ? "border-brand-orange"
                    : "border-brand-navy/10 hover:border-brand-navy/40"
                )}
              >
                <Image
                  src={asset(img.src)}
                  alt=""
                  fill
                  sizes="120px"
                  className="object-contain p-1"
                />
              </button>
            </li>
          ))}
        </ul>
      )}

      {lightboxOpen && (
        <Lightbox
          images={images}
          index={current}
          onClose={() => setLightboxOpen(false)}
          onNavigate={setCurrent}
        />
      )}
    </div>
  );
}
