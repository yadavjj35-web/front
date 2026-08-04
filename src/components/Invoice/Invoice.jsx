import React, { useRef } from 'react';

export default function Invoice({ order }) {
  const ref = useRef();

  if (!order) return <div className="card">No invoice data</div>;

  return (
    <div ref={ref} className="card">
      <div className="flex items-center justify-between">
        <div>
          <div className="font-semibold">Invoice</div>
          <div className="text-sm text-muted">Order {order.orderId}</div>
        </div>
        <div className="text-right">
          <div className="font-semibold">{order.customerName}</div>
          <div className="text-sm text-muted">{order.customerEmail}</div>
        </div>
      </div>

      <div className="mt-3">
        <table className="min-w-full">
          <thead className="text-left text-sm text-muted">
            <tr>
              <th>Item</th>
              <th>Qty</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((it) => (
              <tr key={it.sku}>
                <td className="py-2">{it.name}</td>
                <td>{it.quantity}</td>
                <td>${it.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-end">
        <div className="text-right">
          <div className="text-sm">Subtotal: ${order.subtotal}</div>
          <div className="text-sm">Tax: ${order.tax}</div>
          <div className="font-bold text-lg">Total: ${order.total}</div>
        </div>
      </div>
    </div>
  );
}
