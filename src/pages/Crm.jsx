import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { ENDPOINTS } from '../constants/config';
import { Skeleton } from '../components/UI/Skeleton';

export default function Crm() {
  const [leads, setLeads] = useState(null);

  useEffect(() => {
    api.get(`${ENDPOINTS.crm}/leads`).then((r) => setLeads(r.data.leads)).catch(() => setLeads([]));
  }, []);

  if (!leads) return <Skeleton className="h-96" />;

  return (
    <div>
      <h2 className="text-xl font-semibold">CRM - Leads</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {leads.map((l) => (
          <div key={l.id} className="p-3 bg-white dark:bg-slate-800 rounded-md border">
            <div className="font-semibold">{l.name}</div>
            <div className="text-sm text-slate-500">{l.company}</div>
            <div className="mt-2">{l.notes}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
