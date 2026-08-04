import React from 'react';

export default function MediaGallery({ items = [] }) {
  if (!items || items.length === 0) return <div className="text-muted">No media</div>;
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {items.map((it) => (
        <div key={it.url} className="rounded overflow-hidden border bg-white dark:bg-slate-800">
          <img src={it.url} alt={it.name || ''} className="w-full h-40 object-cover" />
          <div className="p-2 text-sm">{it.name}</div>
        </div>
      ))}
    </div>
  );
}
