import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { ENDPOINTS } from '../constants/config';
import { Skeleton } from '../components/UI/Skeleton';
import Button from '../components/UI/Button';
import { useToast } from '../components/Toast/ToastProvider';

export default function BroadcastReports() {
  const [reports, setReports] = useState(null);
  const [loading, setLoading] = useState(true);
  const { push } = useToast();

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    api
      .get(`${ENDPOINTS.whatsapp}/broadcasts`)
      .then((r) => mounted && setReports(r.data.broadcasts || r.data || []))
      .catch((err) => {
        push({ title: 'Broadcasts error', message: err.message || 'Failed to load broadcasts' });
        mounted && setReports([]);
      })
      .finally(() => mounted && setLoading(false));
    return () => (mounted = false);
  }, []);

  async function fetchReport(id) {
    try {
      const r = await api.get(`${ENDPOINTS.whatsapp}/broadcasts/${encodeURIComponent(id)}/report`);
      push({ title: 'Report loaded', message: `Report for ${id}` });
      return r.data;
    } catch (err) {
      push({ title: 'Report failed', message: err.message || 'Failed to load' });
    }
  }

  if (loading) return <Skeleton className="h-40" />;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Broadcast Reports</h2>
      {reports.length === 0 ? (
        <div className="card">No broadcasts yet.</div>
      ) : (
        <div className="space-y-3">
          {reports.map((b) => (
            <div key={b.id} className="card flex items-center justify-between">
              <div>
                <div className="font-semibold">{b.title || b.id}</div>
                <div className="text-sm text-muted">{b.summary || b.status}</div>
                <div className="text-xs text-muted">{b.createdAt ? new Date(b.createdAt).toLocaleString() : ''}</div>
              </div>
              <div className="flex gap-2">
                <Button onClick={() => fetchReport(b.id)}>View Report</Button>
                <Button onClick={() => window.open(`${ENDPOINTS.whatsapp}/broadcasts/${b.id}/download`, '_blank')}>Download</Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
