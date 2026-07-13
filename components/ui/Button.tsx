import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant =
  "primary" | "secondary" | "outline" | "outline-light" | "whatsapp";
type Size = "md" | "lg";

/*
 * O chanfro usa clip-path, que corta outlines externos — por isso o foco
 * de teclado é desenhado por dentro (-outline-offset), com cor por variante.
 */
const base =
  "inline-flex items-center justify-center gap-2 font-semibold transition-colors duration-200 chamfer-sm focus-visible:outline-2 focus-visible:-outline-offset-2";

const variants: Record<Variant, string> = {
  // Laranja da marca com texto navy profundo: contraste AA (≈4,9:1)
  primary:
    "bg-brand-orange text-brand-navy-dark hover:bg-brand-orange-light active:bg-brand-orange-dark active:text-white focus-visible:outline-brand-navy-dark",
  secondary:
    "bg-brand-navy text-white hover:bg-brand-blue focus-visible:outline-white",
  outline:
    "border-2 border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white focus-visible:outline-brand-orange-dark",
  "outline-light":
    "border-2 border-white/70 text-white hover:bg-white hover:text-brand-navy focus-visible:outline-white",
  // Verde WhatsApp com texto navy profundo: contraste AA (≈8,4:1),
  // no mesmo padrão do botão primário (laranja + navy)
  whatsapp:
    "bg-whatsapp text-brand-navy-dark font-bold hover:bg-whatsapp-dark hover:text-white focus-visible:outline-brand-navy-dark",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsLink = CommonProps & {
  href: string;
  external?: boolean;
};

type ButtonAsButton = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
    external?: undefined;
  };

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const classes = cn(
    base,
    variants[props.variant ?? "primary"],
    sizes[props.size ?? "md"],
    props.className
  );

  if (props.href !== undefined) {
    if (props.external) {
      return (
        <a
          href={props.href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
        >
          {props.children}
        </a>
      );
    }
    return (
      <Link href={props.href} className={classes}>
        {props.children}
      </Link>
    );
  }

  const { variant, size, className, children, href, external, ...rest } = props;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
