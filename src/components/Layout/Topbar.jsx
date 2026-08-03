import React from 'react';
import { FiMenu, FiSearch, FiBell } from 'react-icons/fi';

export default function Topbar({ onMenu }) {
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
      <div className="flex items-center gap-3">
        <button className="md:hidden p-2" onClick={onMenu}>
          <FiMenu />
        </button>
        <div className="relative">
          <input
            className="pl-9 pr-3 py-2 rounded-md border bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600"
            placeholder="Global search (press /)"
            aria-label="Global search"
          />
          <span className="absolute left-2 top-2 text-slate-400">
            <FiSearch />
          </span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button className="p-2" aria-label="Notifications">
          <FiBell />
        </button>
        <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-600" />
      </div>
    </header>
  );
}
