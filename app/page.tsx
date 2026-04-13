import { Suspense } from "react";
import Hero from "@/components/Hero";
import LatestArticles from "@/components/LatestArticles";
import Search from "@/components/search";

export default async function HomePage({
  searchParams,
}: {
  searchParams?: Promise<{ query?: string }>;
}) {
  return (
    <main className="min-h-screen py-12 px-12 bg-void-eclipse">
      <Hero />
      <Suspense
        fallback={<p className="text-zinc-500 mt-8">Cargando búsqueda...</p>}
      >
        <Search placeholder="Buscar artículos..." />
      </Suspense>
      <LatestArticles searchParams={searchParams} />
    </main>
  );
}
