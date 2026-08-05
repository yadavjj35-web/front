import React, { useEffect, useState } from 'react';
import { FiBell } from 'react-icons/fi';
import api from '../../services/api';
import { ENDPOINTS } from '../../constants/config';
import { useToast } from '../Toast/ToastProvider';

export default function NotificationBell() {
  const [count, setCount] = useState(0);
  const { push } = useToast();

  useEffect(() => {
    let mounted = true;
    api.get(ENDPOINTS.logs, { params: { level: 'error', limit: 1 } })
      .then((r) => mounted && setCount((r.data?.total || 0)))
      .catch(() => {});
    const iv = setInterval(() => {
      api.get(ENDPOINTS.logs, { params: { level: 'error', limit: 1 } })
        .then((r) => mounted && setCount((r.data?.total || 0)))
        .catch(() => {});
    }, 30000);
    return () => { mounted = false; clearInterval(iv); };
  }, []);

  return (
    <button className="relative p-2" aria-label="Notifications">
      <FiBell />
      {count > 0 && <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-1 rounded-full">{count}</span>}
    </button>
  );
}
