"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { asset } from "@/lib/asset";
import { NAV_LINKS, whatsappLink, WHATSAPP_MESSAGES } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { cn } from "@/lib/cn";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-brand-navy/10 bg-white/95 backdrop-blur">
      {/* Barra de contato superior — font-sans explícito (Inter via
          next/font), sem depender de herança */}
      <div className="hidden bg-brand-navy-dark font-sans md:block">
        <div className="mx-auto flex max-w-6xl items-center justify-end gap-6 px-4 py-1.5 sm:px-6 lg:px-8">
          <a
            href={whatsappLink(WHATSAPP_MESSAGES.default)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-sans text-xs font-medium text-white/80 transition-colors hover:text-white"
          >
            <WhatsAppIcon className="h-3.5 w-3.5 text-whatsapp" />
            WhatsApp comercial
          </a>
          <span className="font-sans text-xs font-medium text-white/50" aria-hidden="true">
            |
          </span>
          <p className="font-sans text-xs font-medium text-white/80">
            Atendimento em todo o Brasil
          </p>
        </div>
      </div>

      {/* Barra principal */}
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange"
          aria-label="Agile Door — página inicial"
        >
          {/* Símbolo sempre visível; escrita entra a partir de sm (mobile compacto = só símbolo) */}
          <Image
            src={asset("/logo/logo-simbolo.png")}
            alt=""
            width={348}
            height={213}
            priority
            className="h-10 w-auto lg:h-12"
          />
          <Image
            src={asset("/logo/logo-escrita.png")}
            alt=""
            width={307}
            height={70}
            priority
            className="hidden h-9 w-auto sm:block lg:h-11"
          />
        </Link>

        <nav aria-label="Navegação principal" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-brand-orange-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange",
                      active ? "text-brand-orange-dark" : "text-brand-navy"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden lg:block">
          <Button
            href={whatsappLink(WHATSAPP_MESSAGES.default)}
            external
            variant="whatsapp"
            size="md"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Fale Conosco
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="menu-mobile"
          className="inline-flex items-center justify-center p-2 text-brand-navy focus-visible:outline-2 focus-visible:outline-brand-orange lg:hidden"
        >
          <span className="sr-only">{open ? "Fechar menu" : "Abrir menu"}</span>
          {open ? (
            <X className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Menu mobile */}
      {open && (
        <nav
          id="menu-mobile"
          aria-label="Navegação principal (menu móvel)"
          className="border-t border-brand-navy/10 bg-white lg:hidden"
        >
          <ul className="space-y-1 px-4 py-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block px-2 py-2.5 text-base font-medium text-brand-navy hover:text-brand-orange-dark"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-3">
              <Button
                href={whatsappLink(WHATSAPP_MESSAGES.default)}
                external
                variant="whatsapp"
                size="md"
                className="w-full"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Fale Conosco
              </Button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
