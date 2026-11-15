import type { MetadataRoute } from "next";

const BASE_URL = "https://collections.wickz.dev";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Buscadores y asistentes de IA (GPTBot, ClaudeBot, PerplexityBot...)
      // tienen acceso completo para que los artículos puedan ser citados
      { userAgent: "*", allow: "/" },
      // Scrapers sin valor de visibilidad
      {
        userAgent: [
          "Bytespider",
          "Diffbot",
          "ImagesiftBot",
          "Omgilibot",
          "Omgili",
          "Timpibot",
        ],
        disallow: "/",
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
