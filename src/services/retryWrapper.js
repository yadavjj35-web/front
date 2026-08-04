import retry from '../utils/retry';

/**
 * retryWrapper - helper that wraps an async function with retry and returns result or throws.
 * Usage:
 *  const res = await retryWrapper(() => api.get('/x'), { attempts: 3 });
 */
export default function retryWrapper(fn, opts = {}) {
  return retry(fn, opts);
}
