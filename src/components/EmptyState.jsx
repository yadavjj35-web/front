import React from 'react';

export default function EmptyState({ title = 'No data', message = '', children }) {
  return (
    <div className="card flex flex-col items-center justify-center p-6 text-center">
      <div className="text-lg font-semibold">{title}</div>
      {message && <div className="text-sm text-muted mt-2">{message}</div>}
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}
