export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function scrollToId(id: string) {
  if (typeof window === "undefined") return;

  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

export function normalizePhone(value: string) {
  return value.replace(/\D/g, "");
}

export function buildCalEmbedUrl(rawUrl?: string | null) {
  const fallback = "https://cal.com/tu-usuario/harutravel-intro";
  const baseUrl = rawUrl?.trim() || fallback;

  try {
    const url = new URL(baseUrl);
    url.searchParams.set("embed", "true");
    url.searchParams.set("theme", "light");
    return url.toString();
  } catch {
    return `${fallback}?embed=true&theme=light`;
  }
}

export function absoluteUrl(path: string) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  try {
    return new URL(path, siteUrl).toString();
  } catch {
    return path;
  }
}
