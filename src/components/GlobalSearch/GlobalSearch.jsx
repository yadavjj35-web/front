import React, { useState } from 'react';
import api from '../../services/api';
import { ENDPOINTS } from '../../constants/config';
import { useDebounce } from '../../hooks';

export default function GlobalSearch({ onSelect }) {
  const [q, setQ] = useState('');
  const [results, setResults] = useState([]);
  const debounced = useDebounce(q, 300);

  React.useEffect(() => {
    if (!debounced) {
      setResults([]);
      return;
    }
    let cancelled = false;
    api
      .get(`${ENDPOINTS.search || '/api/search'}`, { params: { q: debounced } })
      .then((r) => {
        if (!cancelled) setResults(r.data.results || []);
      })
      .catch(() => setResults([]));
    return () => (cancelled = true);
  }, [debounced]);

  return (
    <div className="card">
      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search..." className="w-full px-3 py-2 border rounded mb-2" />
      <div className="space-y-2">
        {results.map((r) => (
          <div key={r.id} className="p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer" onClick={() => onSelect && onSelect(r)}>
            <div className="font-medium">{r.title}</div>
            <div className="text-sm text-muted">{r.subtitle}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
