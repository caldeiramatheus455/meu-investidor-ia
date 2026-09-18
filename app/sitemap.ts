import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://meuinvestidor.com.br";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/privacidade", "/termos"];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
  }));
}
