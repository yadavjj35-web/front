import React from 'react';

export default function SmallStat({ title, value, change }) {
  return (
    <div className="p-3 card">
      <div className="text-sm text-muted">{title}</div>
      <div className="text-2xl font-semibold mt-1">{value}</div>
      {change !== undefined && <div className="text-sm mt-1 text-muted">{change >= 0 ? `+${change}%` : `${change}%`}</div>}
    </div>
  );
}
