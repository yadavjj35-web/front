import React from 'react';

export default function Settings() {
  return (
    <div>
      <h2 className="text-xl font-semibold">Settings</h2>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-3 bg-white dark:bg-slate-800 rounded border">General settings</div>
        <div className="p-3 bg-white dark:bg-slate-800 rounded border">AI settings</div>
        <div className="p-3 bg-white dark:bg-slate-800 rounded border">WhatsApp</div>
        <div className="p-3 bg-white dark:bg-slate-800 rounded border">WooCommerce</div>
      </div>
    </div>
  );
}
