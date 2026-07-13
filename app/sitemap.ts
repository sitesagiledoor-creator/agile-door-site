import type { MetadataRoute } from "next";
import { blogPosts } from "@/data/blog";
import { products } from "@/data/products";
import { SITE } from "@/lib/constants";

// Necessário para o build estático (output: "export")
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE.url, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE.url}/sobre`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${SITE.url}/produtos`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE.url}/contato`, changeFrequency: "yearly", priority: 0.7 },
    {
      url: `${SITE.url}/politica-de-privacidade`,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${SITE.url}/politica-de-cookies`,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${SITE.url}/produtos/${product.slug}`,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const blogRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE.url}/blog`, changeFrequency: "weekly", priority: 0.6 },
    ...blogPosts.map((post) => ({
      url: `${SITE.url}/blog/${post.slug}`,
      lastModified: new Date(`${post.publishedAt}T12:00:00-03:00`),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];

  return [...staticRoutes, ...productRoutes, ...blogRoutes];
}
