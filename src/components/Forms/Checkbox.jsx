import React from 'react';

export default function Checkbox({ label, checked, onChange }) {
  return (
    <label className="inline-flex items-center gap-2">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="form-checkbox" />
      <span>{label}</span>
    </label>
  );
}
