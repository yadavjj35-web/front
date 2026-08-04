import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { ENDPOINTS } from '../constants/config';
import { Skeleton } from '../components/UI/Skeleton';
import { useToast } from '../components/Toast/ToastProvider';

export default function NotificationsPage() {
  const [items, setItems] = useState(null);
  const { push } = useToast();

  useEffect(() => {
    api.get(ENDPOINTS.logs).then((r) => setItems(r.data.logs || [])).catch((err) => {
      push({ title: 'Load error', message: err.message });
      setItems([]);
    });
  }, []);

  if (!items) return <Skeleton className="h-64" />;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Notifications</h2>
      <div className="card">
        <ul className="space-y-3">
          {items.map((it) => (
            <li key={it._id}>
              <div className="flex justify-between">
                <div>
                  <div className="font-medium">{it.action}</div>
                  <div className="text-sm text-muted">{new Date(it.createdAt).toLocaleString()}</div>
                </div>
                <div className="text-sm text-muted">{it.level}</div>
              </div>
              <div className="mt-1 text-sm">{JSON.stringify(it.details)}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
