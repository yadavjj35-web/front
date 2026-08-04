import React from 'react';

export default function StatusPill({ status }) {
  const cls =
    status === 'running' ? 'bg-blue-100 text-blue-700' :
    status === 'succeeded' ? 'bg-green-100 text-green-700' :
    status === 'failed' ? 'bg-red-100 text-red-700' :
    'bg-slate-100 text-slate-700';
  return <span className={`px-2 py-1 rounded text-xs ${cls}`}>{status}</span>;
}
