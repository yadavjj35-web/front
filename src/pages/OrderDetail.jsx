import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOrder } from '../services/ordersService';
import { Skeleton } from '../components/UI/Skeleton';
import Button from '../components/UI/Button';
import Invoice from '../components/Invoice/Invoice';
import OrderTimeline from '../components/Orders/OrderTimeline';
import { useToast } from '../components/Toast/ToastProvider';

export default function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const { push } = useToast();

  useEffect(() => {
    let mounted = true;
    setOrder(null);
    getOrder(id)
      .then((r) => mounted && setOrder(r))
      .catch((err) => {
        push({ title: 'Order load error', message: err.response?.data?.message || err.message });
        mounted && setOrder({ error: true });
      });
    return () => (mounted = false);
  }, [id]);

  if (!order) return <Skeleton className="h-64" />;

  if (order.error) return <div className="card">Unable to load order.</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Order {order.orderId}</h2>
          <div className="text-sm text-muted">Placed: {new Date(order.createdAt).toLocaleString()}</div>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => window.print()}>Print</Button>
          <Button className="bg-slate-200 text-slate-900">Edit</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 card">
          <h4 className="font-semibold mb-2">Items</h4>
          <div className="divide-y">
            {order.items.map((it) => (
              <div key={it.sku} className="flex items-center gap-4 py-3">
                <img src={it.image || '/assets/icon-192.svg'} alt={it.name} className="w-20 h-20 object-cover rounded" />
                <div>
                  <div className="font-medium">{it.name}</div>
                  <div className="text-sm text-muted">SKU: {it.sku}</div>
                  <div className="text-sm mt-1">${it.price} × {it.quantity}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h4 className="font-semibold">Summary</h4>
          <div className="mt-2">
            <div className="flex justify-between"><div>Subtotal</div><div>${order.subtotal}</div></div>
            <div className="flex justify-between"><div>Shipping</div><div>${order.shipping}</div></div>
            <div className="flex justify-between"><div>Tax</div><div>${order.tax}</div></div>
            <div className="flex justify-between font-bold mt-2"><div>Total</div><div>${order.total}</div></div>
          </div>
          <div className="mt-4">
            <Button onClick={() => push({ title: 'Invoice', message: 'Invoice will be generated below' })}>Generate Invoice</Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <OrderTimeline events={order.timeline || []} />
        </div>
        <div>
          <Invoice order={order} />
        </div>
      </div>
    </div>
  );
}
