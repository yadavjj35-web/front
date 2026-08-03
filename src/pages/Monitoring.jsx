import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { ENDPOINTS } from '../constants/config';
import { Skeleton } from '../components/UI/Skeleton';

export default function Monitoring() {
  const [health, setHealth] = useState(null);

  useEffect(() => {
    api.get(ENDPOINTS.monitoring).then((r) => setHealth(r.data)).catch(() => setHealth(null));
  }, []);

  if (!health) return <Skeleton className="h-96" />;

  return (
    <div>
      <h2 className="text-xl font-semibold">Monitoring</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="p-3 bg-white dark:bg-slate-800 rounded border">CPU: {health.cpu}</div>
        <div className="p-3 bg-white dark:bg-slate-800 rounded border">RAM: {health.ram}</div>
        <div className="p-3 bg-white dark:bg-slate-800 rounded border">DB: {health.db}</div>
        <div className="p-3 bg-white dark:bg-slate-800 rounded border">Redis: {health.redis}</div>
      </div>
    </div>
  );
}
