import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";

// Necessário para o build estático (output: "export")
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/api/",
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
