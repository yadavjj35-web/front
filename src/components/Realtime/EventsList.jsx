import React from 'react';

export default function EventsList({ events = [] }) {
  if (!events.length) return <div className="text-muted">No realtime events</div>;
  return (
    <ul className="space-y-2">
      {events.map((e, i) => (
        <li key={i} className="card">
          <div className="flex items-center justify-between">
            <div className="font-medium">{e.type}</div>
            <div className="text-xs text-muted">{new Date(e.ts || Date.now()).toLocaleTimeString()}</div>
          </div>
          <pre className="text-sm mt-2 text-muted">{JSON.stringify(e.payload || e, null, 2)}</pre>
        </li>
      ))}
    </ul>
  );
}
