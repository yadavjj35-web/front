import React, { useState } from 'react';
import api from '../../services/api';
import { ENDPOINTS } from '../../constants/config';
import Button from '../../components/UI/Button';
import { Skeleton } from '../../components/UI/Skeleton';
import { useToast } from '../../components/Toast/ToastProvider';

export default function Tracking() {
  const [trackingId, setTrackingId] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { push } = useToast();

  async function search() {
    if (!trackingId.trim()) return;
    setLoading(true);
    try {
      const r = await api.get(`${ENDPOINTS.orders}/track/${encodeURIComponent(trackingId)}`);
      setData(r.data);
    } catch (err) {
      push({ title: 'Tracking error', message: err.response?.data?.message || err.message });
      setData({ error: true });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Shipment Tracking</h2>
      <div className="flex gap-2 mb-4">
        <input value={trackingId} onChange={(e) => setTrackingId(e.target.value)} placeholder="Enter tracking number" className="px-3 py-2 border rounded flex-1" />
        <Button onClick={search}>Track</Button>
      </div>

      {loading ? (
        <Skeleton className="h-36" />
      ) : data ? (
        data.error ? (
          <div className="card">No tracking information.</div>
        ) : (
          <div className="card">
            <div className="font-semibold">Status: {data.status}</div>
            <div className="text-sm text-muted">Courier: {data.courier}</div>
            <div className="mt-3">
              <h4 className="font-semibold">Events</h4>
              <ul className="mt-2 space-y-2">
                {data.events?.map((e, i) => (
                  <li key={i} className="text-sm">
                    <div className="font-medium">{e.status}</div>
                    <div className="text-xs text-muted">{new Date(e.ts).toLocaleString()}</div>
                    <div className="text-sm mt-1">{e.location}</div>
                  </li>
                )) || <div className="text-muted">No events</div>}
              </ul>
            </div>
          </div>
        )
      ) : (
        <div className="text-muted">Enter a tracking number to see status.</div>
      )}
    </div>
  );
}
