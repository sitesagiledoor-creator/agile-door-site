import { cn } from "@/lib/cn";

/**
 * Cabeçalho de seção padrão: eyebrow em mono (assinatura técnica da marca),
 * título em Space Grotesk e lead opcional.
 */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  dark = false,
  as: Tag = "h2",
  className,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
  dark?: boolean;
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "text-xs font-semibold uppercase tracking-[0.2em]",
            dark ? "text-brand-orange-light" : "text-brand-orange-dark"
          )}
        >
          {eyebrow}
        </p>
      )}
      <Tag
        className={cn(
          "mt-3 font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl",
          dark ? "text-white" : "text-brand-navy"
        )}
      >
        {title}
      </Tag>
      {lead && (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed sm:text-lg",
            dark ? "text-white/80" : "text-neutral-muted"
          )}
        >
          {lead}
        </p>
      )}
    </div>
  );
}
