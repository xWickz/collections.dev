import Link from "next/link";

const chip = "rounded-full border px-3 py-1 text-sm transition-colors";
const idle =
  "border-foreground/20 text-foreground/80 hover:bg-foreground/10 hover:text-foreground";
const selected = "border-foreground bg-foreground text-background";

export default function CategoryChips({
  counts,
  total,
  active,
}: {
  counts: readonly [string, number][];
  total: number;
  active?: string;
}) {
  return (
    <nav aria-label="Categorías" className="flex flex-wrap gap-2 font-pixel">
      <Link
        href="/"
        aria-current={active ? undefined : "page"}
        className={`${chip} ${active ? idle : selected}`}
      >
        Todos · {total}
      </Link>
      {counts.map(([category, count]) => (
        <Link
          key={category}
          href={`/?type=category&query=${encodeURIComponent(category)}`}
          aria-current={active === category ? "page" : undefined}
          className={`${chip} ${active === category ? selected : idle}`}
        >
          {category} · {count}
        </Link>
      ))}
    </nav>
  );
}
