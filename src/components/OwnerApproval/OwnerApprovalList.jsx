import React, { useEffect, useState } from 'react';
import ApprovalCard from './ApprovalCard';
import api from '../../services/api';
import { ENDPOINTS } from '../../constants/config';
import { Skeleton } from '../UI/Skeleton';

export default function OwnerApprovalList() {
  const [approvals, setApprovals] = useState(null);

  useEffect(() => {
    api.get(ENDPOINTS.approvals).then((r) => setApprovals(r.data.items || [])).catch(() => setApprovals([]));
  }, []);

  if (!approvals) return <Skeleton className="h-64" />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {approvals.map((a) => <ApprovalCard key={a.approvalId} approval={a} />)}
    </div>
  );
}
