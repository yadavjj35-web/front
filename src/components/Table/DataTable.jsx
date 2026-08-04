import React from 'react';

export default function DataTable({ columns = [], rows = [], loading = false, rowKey = '_id' }) {
  if (loading) {
    return <div className="p-4">Loading...</div>;
  }
  return (
    <div className="overflow-auto bg-white dark:bg-slate-800 rounded border">
      <table className="min-w-full">
        <thead className="bg-slate-50 dark:bg-slate-700 text-left">
          <tr>
            {columns.map((c) => (
              <th key={c.key} className="p-3 text-sm">{c.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r[rowKey] || Math.random()} className="border-b dark:border-slate-700">
              {columns.map((c) => (
                <td key={c.key} className="p-3 text-sm">{c.render ? c.render(r) : r[c.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
