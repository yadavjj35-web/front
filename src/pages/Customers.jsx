import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { ENDPOINTS } from '../constants/config';
import { Skeleton } from '../components/UI/Skeleton';

export default function Customers() {
  const [customers, setCustomers] = useState(null);

  useEffect(() => {
    api.get(ENDPOINTS.customers).then((r) => setCustomers(r.data.customers)).catch(() => setCustomers([]));
  }, []);

  if (!customers) return <Skeleton className="h-96" />;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Customers</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {customers.map((c) => (
          <div key={c.id} className="p-3 bg-white dark:bg-slate-800 rounded-md border">
            <div className="font-semibold">{c.name}</div>
            <div className="text-sm text-slate-500">{c.email}</div>
            <div className="mt-2 text-sm">Orders: {c.ordersCount}</div>
            <div className="mt-1 text-sm">Last purchase: {c.lastPurchase ? new Date(c.lastPurchase).toLocaleDateString() : '—'}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
