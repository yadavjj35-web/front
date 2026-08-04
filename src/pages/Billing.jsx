import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { ENDPOINTS } from '../constants/config';
import { Skeleton } from '../components/UI/Skeleton';
import { currency } from '../utils/format';

export default function Billing() {
  const [report, setReport] = useState(null);

  useEffect(() => {
    api.get(ENDPOINTS.billing).then((r) => setReport(r.data)).catch(() => setReport(null));
  }, []);

  if (!report) return <Skeleton className="h-64" />;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Billing Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card">
          <div className="text-sm text-muted">Total Spent</div>
          <div className="text-2xl font-bold mt-1">{currency(report.totalSpent)}</div>
        </div>
        <div className="card">
          <div className="text-sm text-muted">This Month</div>
          <div className="text-2xl font-bold mt-1">{currency(report.thisMonth)}</div>
        </div>
        <div className="card">
          <div className="text-sm text-muted">Predicted</div>
          <div className="text-2xl font-bold mt-1">{currency(report.predicted)}</div>
        </div>
      </div>

      <div className="mt-4 card">
        <h4 className="font-semibold mb-2">Recent Invoices</h4>
        <ul className="space-y-2">
          {report.invoices.map((inv) => (
            <li key={inv.id} className="flex items-center justify-between">
              <div>
                <div className="font-medium">{inv.number}</div>
                <div className="text-sm text-muted">{new Date(inv.date).toLocaleDateString()}</div>
              </div>
              <div className="text-right">
                <div>{currency(inv.amount)}</div>
                <div className="text-sm">{inv.status}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
