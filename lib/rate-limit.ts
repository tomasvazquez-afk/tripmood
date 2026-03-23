type Entry = { count: number; resetAt: number };

const store = new Map<string, Entry>();

/**
 * Sliding-window rate limiter backed by an in-process Map.
 * Returns true if the request is allowed, false if it should be blocked.
 *
 * Note: resets across serverless cold-starts. Suitable for light abuse
 * prevention; not a substitute for edge-level rate limiting in production.
 */
export function checkRateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (entry.count >= limit) {
    return false;
  }

  entry.count++;
  return true;
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  const real = request.headers.get("x-real-ip");
  if (real) return real.trim();
  return "unknown";
}
