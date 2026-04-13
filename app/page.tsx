import Hero from "@/components/Hero";
import LatestArticles from "@/components/LatestArticles";
import Search from "@/components/Search";

export default async function HomePage({
  searchParams,
}: {
  searchParams?: Promise<{ query?: string }>;
}) {
  return (
    <main className="min-h-screen py-12 px-12 bg-void-eclipse">
      <Hero />
      <Search placeholder="Buscar artículos..." />
      <LatestArticles searchParams={searchParams} />
    </main>
  );
}
