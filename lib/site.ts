export const SITE_URL = "https://collections.wickz.dev";

// timeZone UTC: "2026-11-12" se interpreta en UTC y en zonas con offset negativo mostraría el día anterior.
export function formatDate(date: string, month: "short" | "long" = "short") {
  return new Date(date).toLocaleDateString("es", {
    day: "numeric",
    month,
    year: "numeric",
    timeZone: "UTC",
  });
}
