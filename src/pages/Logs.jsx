import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { ENDPOINTS } from '../constants/config';
import { Skeleton } from '../components/UI/Skeleton';

export default function Logs() {
  const [logs, setLogs] = useState(null);
  const [q, setQ] = useState('');

  useEffect(() => {
    api.get(ENDPOINTS.logs).then((r) => setLogs(r.data.logs)).catch(() => setLogs([]));
  }, []);

  if (!logs) return <Skeleton className="h-96" />;

  return (
    <div>
      <h2 className="text-xl font-semibold">System Logs</h2>
      <div className="mt-3">
        <input className="px-3 py-2 border rounded w-full mb-3" placeholder="Search logs" value={q} onChange={(e) => setQ(e.target.value)} />
        <div className="bg-white dark:bg-slate-800 rounded border overflow-auto max-h-[60vh]">
          <ul className="p-3 space-y-2">
            {logs
              .filter((l) => l.message.toLowerCase().includes(q.toLowerCase()))
              .map((l) => (
                <li key={l._id} className="text-sm">
                  <div className="font-medium">{l.action}</div>
                  <div className="text-xs text-slate-500">{new Date(l.createdAt).toLocaleString()}</div>
                  <div className="mt-1">{JSON.stringify(l.details)}</div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
