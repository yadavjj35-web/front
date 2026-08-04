import { useEffect, useRef, useState } from 'react';

export default function useInfiniteScroll(fetchMore) {
  const ref = useRef();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !loading) {
            setLoading(true);
            Promise.resolve(fetchMore()).finally(() => setLoading(false));
          }
        });
      },
      { root: null, rootMargin: '0px', threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref.current, loading]);

  return { ref, loading };
}
