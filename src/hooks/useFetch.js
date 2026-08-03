import { useEffect, useState } from 'react';
import api from '../services/api';

export default function useFetch(url, options = {}) {
  const [data, setData] = useState(options.initial || null);
  const [loading, setLoading] = useState(Boolean(url));
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    if (!url) {
      setLoading(false);
      return;
    }
    setLoading(true);
    api
      .get(url)
      .then((res) => {
        if (!cancelled) {
          setData(res.data);
          setError(null);
        }
      })
      .catch((err) => {
        if (!cancelled) setError(err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [url]);

  return { data, loading, error, setData };
}
