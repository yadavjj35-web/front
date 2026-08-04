import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { ENDPOINTS } from '../../constants/config';
import { Skeleton } from '../UI/Skeleton';
import { Link } from 'react-router-dom';

export default function CustomerOrdersList({ customerId }) {
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    api.get(`${ENDPOINTS.customers}/${encodeURIComponent(customerId)}/orders`).then((r) => setOrders(r.data.orders)).catch(() => setOrders([]));
  }, [customerId]);

  if (!orders) return <Skeleton className="h-40" />;

  return (
    <div className="card">
      <h4 className="font-semibold mb-2">Purchase History</h4>
      <ul className="space-y-2">
        {orders.map((o) => (
          <li key={o.orderId} className="flex items-center justify-between">
            <div>
              <div className="font-medium">{o.orderId}</div>
              <div className="text-sm text-muted">{new Date(o.createdAt).toLocaleDateString()}</div>
            </div>
            <div className="text-right">
              <div className="font-semibold">${o.total}</div>
              <Link to={`/orders/${o.orderId}`} className="text-sm text-primary">View</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
