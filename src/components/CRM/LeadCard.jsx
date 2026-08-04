import React from 'react';
import { Link } from 'react-router-dom';

export default function LeadCard({ lead }) {
  return (
    <div className="card">
      <div className="font-semibold">{lead.name}</div>
      <div className="text-sm text-muted">{lead.company}</div>
      <div className="mt-2 text-sm">{lead.title}</div>
      <div className="mt-2 flex gap-2">
        <Link to={`/crm/leads/${lead.id}`} className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-700 text-sm">View</Link>
      </div>
    </div>
  );
}
