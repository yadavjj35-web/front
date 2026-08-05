import React, { useEffect, useState } from 'react';
import socketService from '../services/socketService';
import { Skeleton } from '../components/UI/Skeleton';

export default function Realtime() {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const url = (import.meta.env.VITE_API_BASE_URL || '').replace(/^http/, 'ws') + '/ws';
    socketService.connect(url);
    const offMsg = socketService.on('_message', (m) => {
      setEvents((s) => [m, ...s].slice(0, 200));
    });
    const offOpen = socketService.on('_open', () => setEvents((s) => [{ type: 'connected', ts: Date.now() }, ...s]));
    return () => {
      offMsg(); offOpen();
      socketService.disconnect();
    };
  }, []);

  if (!events) return <Skeleton className="h-40" />;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Realtime Events</h2>
      <div className="card max-h-[60vh] overflow-auto">
        <ul className="space-y-2">
          {events.map((e, i) => (
            <li key={i} className="text-sm">
              <div className="font-medium">{e.type || 'message'}</div>
              <div className="text-xs text-muted">{new Date(e.ts || Date.now()).toLocaleString()}</div>
              <pre className="text-xs mt-1">{JSON.stringify(e, null, 2)}</pre>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
