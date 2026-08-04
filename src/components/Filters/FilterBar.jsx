import React from 'react';
import Button from '../UI/Button';

export default function FilterBar({ children, onApply, onReset }) {
  return (
    <div className="flex items-center gap-3 bg-white dark:bg-slate-800 p-3 rounded border dark:border-slate-700">
      <div className="flex-1 flex items-center gap-2">{children}</div>
      <div className="flex gap-2">
        <Button onClick={onApply}>Apply</Button>
        <button onClick={onReset} className="px-3 py-2 rounded bg-slate-100 dark:bg-slate-700">Reset</button>
      </div>
    </div>
  );
}
