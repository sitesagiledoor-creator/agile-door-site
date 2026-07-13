import { ChevronDown } from "lucide-react";
import type { Faq as FaqItem } from "@/data/products";

/**
 * Perguntas frequentes com <details>/<summary> nativos:
 * acessível por teclado e leitores de tela sem JavaScript.
 */
export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-brand-navy/10 border border-brand-navy/10 bg-white chamfer">
      {items.map((item) => (
        <details key={item.question} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-medium text-brand-navy transition-colors hover:bg-neutral-bg focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-orange [&::-webkit-details-marker]:hidden">
            {item.question}
            <ChevronDown
              className="h-5 w-5 shrink-0 text-brand-orange-dark transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none"
              aria-hidden="true"
            />
          </summary>
          <p className="px-5 pb-5 text-sm leading-relaxed text-neutral-muted">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
