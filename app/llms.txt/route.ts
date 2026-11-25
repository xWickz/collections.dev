import { getAllArticles } from "@/lib/mdx";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

// Resumen del sitio para asistentes de IA (https://llmstxt.org)
export async function GET() {
  const articles = await getAllArticles();

  const body = [
    "# collections.dev",
    "",
    "> Artículos, recursos y herramientas de desarrollo web en español: guías prácticas de React, Next.js, TypeScript, CSS, Git y más. Creado por Santiago Griman (wickz, https://wickz.dev).",
    "",
    "## Artículos",
    ...articles.map(
      (a) => `- [${a.title}](${SITE_URL}/articles/${a.slug}): ${a.description}`,
    ),
    "",
    "## Páginas clave",
    `- Inicio: ${SITE_URL}/`,
    `- Todos los artículos: ${SITE_URL}/articles`,
    "- Autor: https://wickz.dev/",
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
