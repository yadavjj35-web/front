import React from 'react';
import { Link } from 'react-router-dom';

export default function MobileSidebar({ open, onClose }) {
  if (!open) return null;
  const items = [
    ['/', 'Dashboard'],
    ['/ai-executive', 'AI Executive'],
    ['/ai-agents', 'AI Agents'],
    ['/workflows', 'Workflows'],
    ['/whatsapp', 'WhatsApp'],
    ['/products', 'Products'],
    ['/orders', 'Orders'],
    ['/customers', 'Customers'],
    ['/crm', 'CRM'],
    ['/analytics', 'Analytics'],
    ['/approvals', 'Approvals'],
    ['/logs', 'Logs'],
    ['/monitoring', 'Monitoring'],
    ['/settings', 'Settings'],
    ['/profile', 'Profile']
  ];
  return (
    <div className="fixed inset-0 z-40">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute left-0 top-0 bottom-0 w-64 bg-white dark:bg-slate-800 p-3 overflow-y-auto">
        <div className="font-semibold mb-4">WA‑AI</div>
        <nav className="space-y-2">
          {items.map(([to, label]) => (
            <Link key={to} to={to} onClick={onClose} className="block px-3 py-2 rounded hover:bg-slate-100 dark:hover:bg-slate-700">
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
