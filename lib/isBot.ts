export function isBot(userAgent: string | null): boolean {
  if (!userAgent) return false;
  return /Googlebot|Bingbot|Slurp|DuckDuckBot|Baiduspider|YandexBot/i.test(userAgent);
}