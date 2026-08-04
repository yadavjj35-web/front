import React from 'react';

export default function Badge({ children, tone = 'default' }) {
  const toneClass =
    tone === 'success' ? 'bg-green-100 text-green-700' :
    tone === 'danger' ? 'bg-red-100 text-red-700' :
    tone === 'warning' ? 'bg-yellow-100 text-yellow-700' :
    'bg-slate-100 text-slate-800';
  return <span className={`px-2 py-1 rounded text-xs ${toneClass}`}>{children}</span>;
}
