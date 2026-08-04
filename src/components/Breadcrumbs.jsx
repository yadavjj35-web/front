import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Breadcrumbs({ separator = '/' }) {
  const location = useLocation();
  const parts = location.pathname.split('/').filter(Boolean);
  const pathItems = parts.map((p, idx) => {
    const to = '/' + parts.slice(0, idx + 1).join('/');
    return { label: decodeURIComponent(p).replace(/-/g, ' '), to };
  });

  return (
    <nav className="text-sm text-muted mb-4" aria-label="Breadcrumb">
      <ol className="flex items-center gap-2">
        <li><Link to="/" className="text-primary">Home</Link></li>
        {pathItems.map((it, i) => (
          <li key={it.to} className="flex items-center gap-2">
            <span className="text-slate-300">{separator}</span>
            {i === pathItems.length - 1 ? (
              <span className="capitalize">{it.label}</span>
            ) : (
              <Link to={it.to} className="capitalize text-slate-600 hover:underline">{it.label}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
