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

// timeZone UTC: "2026-11-12" se interpreta en UTC y en zonas con offset negativo mostraría el día anterior.
export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("es", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}
