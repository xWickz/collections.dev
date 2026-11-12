export default function SkeletonArticleCard() {
  return (
    <article
      aria-hidden="true"
      className="flex h-full flex-col rounded-md border border-foreground/20 bg-background p-5 font-pixel"
    >
      <div className="animate-pulse">
        <div className="mb-3 h-6 w-4/5 rounded bg-foreground/15" />

        <div className="mb-5 space-y-2">
          <div className="h-4 w-full rounded bg-foreground/10" />
          <div className="h-4 w-11/12 rounded bg-foreground/10" />
          <div className="h-4 w-2/3 rounded bg-foreground/10" />
        </div>

        <div className="mt-auto flex flex-wrap gap-2 pt-1">
          <div className="h-6 w-14 rounded-full bg-foreground/15" />
          <div className="h-6 w-20 rounded-full bg-foreground/15" />
          <div className="h-6 w-16 rounded-full bg-foreground/15" />
          <div className="h-6 w-12 rounded-full bg-foreground/15" />
        </div>
      </div>
    </article>
  );
}
