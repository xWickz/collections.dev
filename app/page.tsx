import { Suspense } from "react";
import Hero from "@/components/Hero";
import LatestArticles, {
  LatestArticlesSkeleton,
} from "@/components/LatestArticles";
export default async function HomePage({
  searchParams,
}: {
  searchParams?: Promise<{ query?: string; type?: string }>;
}) {
  return (
    <main className="bg-void-eclipse flex flex-col justify-center">
      <div className="mx-auto w-full max-w-5xl px-4 py-12">
        <Hero />
        <Suspense fallback={<LatestArticlesSkeleton />}>
          <LatestArticles searchParams={searchParams} />
        </Suspense>
      </div>
    </main>
  );
}
