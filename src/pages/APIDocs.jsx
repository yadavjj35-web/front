import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { ENDPOINTS } from '../constants/config';
import { Skeleton } from '../components/UI/Skeleton';

/**
 * Lightweight API docs viewer - expects backend to expose an OpenAPI or docs endpoint.
 * If not available, shows a useful placeholder pointing to ENDPOINTS.
 */

export default function APIDocs() {
  const [spec, setSpec] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    api.get('/api/openapi.json').then((r) => {
      if (!mounted) return;
      setSpec(r.data);
    }).catch(() => {
      api.get('/api/docs').then((r) => mounted && setSpec(r.data)).catch((err) => mounted && setError(err));
    });
    return () => (mounted = false);
  }, []);

  if (error) {
    return (
      <div className="card">
        <h3 className="font-semibold">API Documentation</h3>
        <div className="mt-2 text-sm text-muted">No API docs endpoint found. Ensure backend exposes /api/openapi.json or /api/docs. Current ENDPOINTS base: {ENDPOINTS.auth.login}</div>
      </div>
    );
  }

  if (!spec) return <Skeleton className="h-64" />;

  return (
    <div className="card">
      <h3 className="font-semibold">API Documentation (Preview)</h3>
      <pre className="mt-3 text-sm text-muted max-h-[60vh] overflow-auto">{JSON.stringify(spec, null, 2)}</pre>
    </div>
  );
}
