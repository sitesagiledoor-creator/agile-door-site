import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { asset } from "@/lib/asset";
import {
  CONTACT,
  NAV_LINKS,
  SITE,
  WHATSAPP_MESSAGES,
  whatsappLink,
} from "@/lib/constants";
import { products } from "@/data/products";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

export function Footer() {
  return (
    // font-sans explícito: mesma família (Inter) do header, sem herança
    <footer className="bg-brand-navy-dark font-sans text-white">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Marca — símbolo em destaque; a escrita fica em texto branco
              porque o PNG da escrita tem letras navy (ilegível sobre navy) */}
          <div>
            <div className="flex items-center gap-3">
              <Image
                src={asset("/logo/logo-simbolo.png")}
                alt=""
                width={348}
                height={213}
                className="h-14 w-auto"
              />
              <div>
                <p className="font-display text-2xl font-bold tracking-tight">
                  AGILE <span className="text-brand-orange-light">DOOR</span>
                </p>
                <p className="mt-0.5 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-white/60">
                  {SITE.tagline}
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              Distribuidora brasileira de portas automáticas com tecnologia
              importada, certificação internacional e atendimento direto, sem
              burocracia.
            </p>
          </div>

          {/* Navegação */}
          <nav aria-label="Navegação do rodapé">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange-light">
              Navegação
            </p>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Produtos */}
          <nav aria-label="Produtos">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange-light">
              Produtos
            </p>
            <ul className="mt-4 space-y-2.5">
              {products.map((product) => (
                <li key={product.slug}>
                  <Link
                    href={`/produtos/${product.slug}`}
                    className="text-sm text-white/80 transition-colors hover:text-white"
                  >
                    {product.name} — {product.category}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contato */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange-light">
              Contato
            </p>
            <ul className="mt-4 space-y-3 text-sm text-white/80">
              <li>
                <a
                  href={whatsappLink(WHATSAPP_MESSAGES.default)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition-colors hover:text-white"
                >
                  <WhatsAppIcon className="h-4 w-4 shrink-0 text-whatsapp" />
                  Fale no WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.emailHref}
                  className="inline-flex items-center gap-2 transition-colors hover:text-white"
                >
                  <Mail
                    className="h-4 w-4 shrink-0 text-brand-orange-light"
                    aria-hidden="true"
                  />
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.phoneHref}
                  className="inline-flex items-center gap-2 transition-colors hover:text-white"
                >
                  <Phone
                    className="h-4 w-4 shrink-0 text-brand-orange-light"
                    aria-hidden="true"
                  />
                  {CONTACT.phone}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin
                  className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange-light"
                  aria-hidden="true"
                />
                {CONTACT.address}
              </li>
              <li>
                <Link
                  href="/contato"
                  className="text-white/60 underline underline-offset-2 transition-colors hover:text-white"
                >
                  Todos os canais de contato
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-white/60">
            © {new Date().getFullYear()} {SITE.name}. Todos os direitos
            reservados.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <Link
                href="/politica-de-privacidade"
                className="text-xs text-white/60 transition-colors hover:text-white"
              >
                Política de Privacidade
              </Link>
            </li>
            <li>
              <Link
                href="/politica-de-cookies"
                className="text-xs text-white/60 transition-colors hover:text-white"
              >
                Política de Cookies
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
