import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Inter, Space_Grotesk } from "next/font/google";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { WhatsAppFAB } from "@/components/layout/WhatsAppFAB";
import { CONTACT, SITE } from "@/lib/constants";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Portas Automáticas com Certificação Internacional`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#051b47",
};

// LocalBusiness (subtipo de Organization) com o endereço físico confirmado.
// [SEO] Quando o horário de atendimento for confirmado, adicionar
// openingHoursSpecification; geo (lat/long) é opcional.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: SITE.name,
  description: SITE.description,
  url: SITE.url,
  logo: `${SITE.url}/logo/logo-simbolo.png`,
  image: `${SITE.url}/og-image.png`,
  email: CONTACT.email,
  telephone: "+55-19-3217-8282",
  address: {
    "@type": "PostalAddress",
    streetAddress: "R. José de França Camargo, 74 - Jardim Quarto Centenário",
    addressLocality: "Campinas",
    addressRegion: "SP",
    postalCode: "13070-199",
    addressCountry: "BR",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+55-19-3217-8282",
    email: CONTACT.email,
    contactType: "sales",
    availableLanguage: "Portuguese",
    areaServed: "BR",
  },
  slogan: SITE.tagline,
  areaServed: "BR",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${spaceGrotesk.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFAB />
        <CookieBanner />
      </body>
    </html>
  );
}
