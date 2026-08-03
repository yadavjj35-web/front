import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { ENDPOINTS } from '../constants/config';
import Button from '../components/UI/Button';
import { Skeleton } from '../components/UI/Skeleton';

export default function Orders() {
  const [orders, setOrders] = useState(null);
  const [status, setStatus] = useState('');
  const [q, setQ] = useState('');

  useEffect(() => {
    load();
  }, [status]);

  function load() {
    api.get(ENDPOINTS.orders, { params: { status, q } }).then((r) => setOrders(r.data));
  }

  if (!orders) return <Skeleton className="h-96" />;

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <select className="px-3 py-2 border rounded" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
          <option value="refunded">Refunded</option>
        </select>
        <input placeholder="Search orders" className="px-3 py-2 border rounded flex-1" value={q} onChange={(e) => setQ(e.target.value)} />
        <Button onClick={load}>Filter</Button>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded border overflow-auto">
        <table className="min-w-full">
          <thead className="text-left bg-slate-50 dark:bg-slate-700">
            <tr>
              <th className="p-3">Order</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Total</th>
              <th className="p-3">Status</th>
              <th className="p-3">Date</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.items.map((o) => (
              <tr key={o.id} className="border-b">
                <td className="p-3">{o.orderId}</td>
                <td className="p-3">{o.customerName}</td>
                <td className="p-3">${o.total}</td>
                <td className="p-3">{o.status}</td>
                <td className="p-3">{new Date(o.createdAt).toLocaleString()}</td>
                <td className="p-3">
                  <Button>View</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
