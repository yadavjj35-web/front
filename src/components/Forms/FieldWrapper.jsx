import React from 'react';

export default function FieldWrapper({ label, hint, children }) {
  return (
    <div className="space-y-1">
      {label && <div className="text-sm font-medium">{label}</div>}
      {children}
      {hint && <div className="text-xs text-muted mt-1">{hint}</div>}
    </div>
  );
}
