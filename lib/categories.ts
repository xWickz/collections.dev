// Cuenta artículos por categoría, de mayor a menor.
export function countByCategory(
  articles: readonly { category: string }[],
): [string, number][] {
  const counts = new Map<string, number>();
  for (const { category } of articles) {
    counts.set(category, (counts.get(category) ?? 0) + 1);
  }
  return [...counts].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
}
