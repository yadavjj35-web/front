import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { ENDPOINTS } from '../constants/config';
import { Skeleton } from '../components/UI/Skeleton';
import LeadCard from '../components/CRM/LeadCard';

export default function CRMPipeline() {
  const [stages, setStages] = useState(null);

  useEffect(() => {
    api.get(`${ENDPOINTS.crm}/pipeline`).then((r) => setStages(r.data.stages)).catch(() => setStages([]));
  }, []);

  if (!stages) return <Skeleton className="h-64" />;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Sales Pipeline</h2>
      <div className="flex gap-4 overflow-x-auto">
        {stages.map((stage) => (
          <div key={stage.id} className="w-80">
            <div className="font-semibold mb-2">{stage.name} ({stage.items.length})</div>
            <div className="space-y-3">
              {stage.items.map((lead) => <LeadCard key={lead.id} lead={lead} />)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
