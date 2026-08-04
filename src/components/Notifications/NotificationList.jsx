import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { ENDPOINTS } from '../../constants/config';
import { Skeleton } from '../UI/Skeleton';

export default function NotificationList() {
  const [items, setItems] = useState(null);

  useEffect(() => {
    api.get(ENDPOINTS.logs).then((r) => setItems(r.data.logs || [])).catch(() => setItems([]));
  }, []);

  if (!items) return <Skeleton className="h-32" />;

  return (
    <div className="card">
      <h4 className="font-semibold mb-2">Notifications</h4>
      <ul className="space-y-2">
        {items.slice(0, 8).map((it) => (
          <li key={it._id} className="text-sm">
            <div className="font-medium">{it.action}</div>
            <div className="text-xs text-muted">{new Date(it.createdAt).toLocaleString()}</div>
            <div className="text-xs">{it.message}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
