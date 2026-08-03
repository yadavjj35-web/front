import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { ENDPOINTS } from '../constants/config';
import Button from '../components/UI/Button';
import { Skeleton } from '../components/UI/Skeleton';

export default function OwnerApproval() {
  const [approvals, setApprovals] = useState(null);

  useEffect(() => {
    api.get(ENDPOINTS.approvals).then((r) => setApprovals(r.data.items)).catch(() => setApprovals([]));
  }, []);

  if (!approvals) return <Skeleton className="h-96" />;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Owner Approval Center</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {approvals.map((a) => (
          <div key={a.approvalId} className="p-3 bg-white dark:bg-slate-800 rounded border">
            <div className="font-semibold">{a.metadata?.title || a.approvalId}</div>
            <div className="text-sm text-slate-500">Requested by: {a.requestedBy}</div>
            <div className="mt-2 text-sm">AI Recommendation: {a.metadata?.aiRecommendation || '—'}</div>
            <div className="mt-2">Risk: {a.metadata?.riskLevel || 'medium'}</div>
            <div className="mt-3 flex gap-2">
              <Button onClick={() => api.post(`${ENDPOINTS.approvals}/${a.approvalId}/decide`, { decision: 'approved' }).then(() => location.reload())}>Approve</Button>
              <Button onClick={() => api.post(`${ENDPOINTS.approvals}/${a.approvalId}/decide`, { decision: 'rejected' }).then(() => location.reload())} className="bg-red-600">
                Reject
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
