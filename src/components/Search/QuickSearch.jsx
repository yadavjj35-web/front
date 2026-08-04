import React, { useState } from 'react';
import GlobalSearch from '../GlobalSearch/GlobalSearch';

export default function QuickSearch() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button className="px-3 py-2 rounded bg-slate-100 dark:bg-slate-700" onClick={() => setOpen((s) => !s)}>
        Quick Search
      </button>
      {open && <div className="mt-2"><GlobalSearch onSelect={() => setOpen(false)} /></div>}
    </div>
  );
}
