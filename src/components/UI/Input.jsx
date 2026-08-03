import React from 'react';

export default function Input({ label, id, ...rest }) {
  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
        </label>
      )}
      <input
        id={id}
        {...rest}
        className="w-full px-3 py-2 rounded-md border bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600"
      />
    </div>
  );
}
