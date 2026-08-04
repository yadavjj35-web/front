import React from 'react';

export default function Avatar({ name, size = 10 }) {
  const initials = (name || 'U').split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase();
  return (
    <div className={`inline-flex items-center justify-center rounded-full bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-100`} style={{ width: `${size * 8}px`, height: `${size * 8}px` }}>
      {initials}
    </div>
  );
}
