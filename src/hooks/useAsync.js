import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * useAsync - manage async calls with loading/error/data
 *
 * const { run, loading, error, data } = useAsync(fn, { immediate: true, deps: [dep] });
 *
 * run(args) -> executes fn(args)
 */
export default function useAsync(fn, { immediate = false, deps = [] } = {}) {
  const mounted = useRef(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const run = useCallback(
    async (...args) => {
      setLoading(true);
      setError(null);
      try {
        const res = await fn(...args);
        if (mounted.current) setData(res);
        return res;
      } catch (err) {
        if (mounted.current) setError(err);
        throw err;
      } finally {
        if (mounted.current) setLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps
  );

  useEffect(() => {
    if (immediate) {
      run();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [run]);

  return { run, loading, error, data, setData };
}
