/**
 * retry.js
 * Lightweight retry helper with exponential backoff.
 *
 * Usage:
 *   const result = await retry(() => fetchSomething(), { attempts: 3, baseDelayMs: 200 });
 */

export default async function retry(fn, { attempts = 3, baseDelayMs = 200, onRetry } = {}) {
  let lastErr;
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;
      if (onRetry) {
        try {
          onRetry(i + 1, err);
        } catch {}
      }
      if (i === attempts - 1) break;
      const delay = Math.round(baseDelayMs * Math.pow(2, i));
      await new Promise((res) => setTimeout(res, delay));
    }
  }
  throw lastErr;
}
