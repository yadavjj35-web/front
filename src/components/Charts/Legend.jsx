import React from 'react';

export default function Legend({ items = [] }) {
  return (
    <div className="flex gap-3 items-center">
      {items.map((it) => (
        <div key={it.name} className="flex items-center gap-2 text-sm">
          <span style={{ width: 12, height: 12, background: it.color }} className="inline-block rounded" />
          <span>{it.name}</span>
        </div>
      ))}
    </div>
  );
}
