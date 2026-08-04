import React from 'react';

export default function InlineLabel({ label, children }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-40 text-sm text-muted">{label}</div>
      <div className="flex-1">{children}</div>
    </div>
  );
}
