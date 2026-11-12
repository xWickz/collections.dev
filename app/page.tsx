import type { Metadata } from "next";
import { Suspense } from "react";
import Hero from "@/components/Hero";
import LatestArticles, {
  LatestArticlesSkeleton,
} from "@/components/LatestArticles";
import type { SearchParams } from "@/lib/definitions";
import { getAllArticles } from "@/lib/mdx";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default async function HomePage({
  searchParams,
}: {
  searchParams?: Promise<SearchParams>;
}) {
  return (
    <main className="bg-background flex flex-col justify-center">
      <div className="mx-auto w-full max-w-7xl px-4 py-12">
        <Hero />
        <Suspense fallback={<LatestArticlesSkeleton />}>
          <LatestArticles source={getAllArticles} searchParams={searchParams} />
        </Suspense>
      </div>
    </main>
  );
}
