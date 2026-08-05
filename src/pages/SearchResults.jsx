import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { globalSearch } from '../services/searchService';
import { Skeleton } from '../components/UI/Skeleton';
import { useDebounce } from '../hooks';
import DataTable from '../components/Table/DataTable';
import { useToast } from '../components/Toast/ToastProvider';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function SearchResults() {
  const q = useQuery().get('q') || '';
  const debouncedQ = useDebounce(q, 250);
  const [loading, setLoading] = useState(Boolean(debouncedQ));
  const [results, setResults] = useState(null);
  const { push } = useToast();

  useEffect(() => {
    let mounted = true;
    if (!debouncedQ) {
      setResults(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    globalSearch(debouncedQ)
      .then((r) => {
        if (!mounted) return;
        setResults(r.results || r || []);
      })
      .catch((err) => {
        push({ title: 'Search error', message: err.message || 'Failed to search' });
        if (mounted) setResults([]);
      })
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, [debouncedQ]);

  if (loading) return <Skeleton className="h-40" />;

  if (!results || results.length === 0) {
    return (
      <div className="card">
        <h3 className="font-semibold mb-2">Search results</h3>
        <div className="text-muted">No results found for &quot;{q}&quot;</div>
      </div>
    );
  }

  // Generic table mapping - expects items with type/title/summary/id/path
  const columns = [
    { key: 'type', title: 'Type', render: (r) => r.type || r.kind || '-' },
    { key: 'title', title: 'Title', render: (r) => (r.path ? <Link to={r.path}>{r.title}</Link> : r.title) },
    { key: 'summary', title: 'Summary', render: (r) => r.summary || r.subtitle || '' },
    { key: 'meta', title: 'Meta', render: (r) => r.meta ? JSON.stringify(r.meta) : '' }
  ];

  return (
    <div>
      <h3 className="text-xl font-semibold mb-3">Results for "{q}"</h3>
      <DataTable columns={columns} rows={results} />
    </div>
  );
}
