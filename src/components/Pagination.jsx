import React from 'react';

export default function Pagination({ page = 1, total = 1, onPage }) {
  const prev = () => onPage(Math.max(1, page - 1));
  const next = () => onPage(Math.min(total, page + 1));
  return (
    <div className="flex items-center gap-2">
      <button onClick={prev} className="px-3 py-1 rounded bg-slate-100 dark:bg-slate-700">Prev</button>
      <div className="px-2">{page} / {total}</div>
      <button onClick={next} className="px-3 py-1 rounded bg-slate-100 dark:bg-slate-700">Next</button>
    </div>
  );
}
