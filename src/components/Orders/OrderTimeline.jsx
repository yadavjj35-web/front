import React from 'react';

export default function OrderTimeline({ events = [] }) {
  if (!events || events.length === 0) return <div className="card">No timeline events</div>;
  return (
    <div className="card">
      <h4 className="font-semibold mb-2">Order Timeline</h4>
      <ul className="space-y-3">
        {events.map((e, i) => (
          <li key={i} className="flex gap-3">
            <div className="w-2 h-2 rounded-full bg-primary mt-2" />
            <div>
              <div className="font-medium">{e.title}</div>
              <div className="text-sm text-muted">{e.description}</div>
              <div className="text-xs text-muted mt-1">{new Date(e.ts).toLocaleString()}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
