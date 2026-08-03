import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function Layout({ children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-900">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar onMenu={() => setOpen((s) => !s)} />
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
}
