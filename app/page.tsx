import Hero from "@/components/Hero";
import LatestArticles from "@/components/LatestArticles";

export default async function HomePage({
  searchParams,
}: {
  searchParams?: Promise<{ query?: string }>;
}) {
  return (
    <main className=" bg-void-eclipse flex flex-col justify-center">
      <div className="mx-auto w-full max-w-5xl px-4 py-12">
        <Hero />
        <LatestArticles searchParams={searchParams} />
      </div>
    </main>
  );
}
