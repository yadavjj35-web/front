import React, { useEffect, useState } from 'react';
import { listOrders } from '../../services/ordersService';
import DataTable from '../Table/DataTable';
import { Skeleton } from '../UI/Skeleton';
import { useToast } from '../Toast/ToastProvider';
import Pagination from '../Pagination';

export default function OrdersList({ params = {} }) {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const { push } = useToast();

  useEffect(() => {
    setData(null);
    listOrders({ page, ...params })
      .then((r) => setData(r))
      .catch((err) => {
        push({ title: 'Orders error', message: err.message || 'Failed to load orders' });
        setData({ items: [], page: 1, totalPages: 1 });
      });
  }, [page, JSON.stringify(params)]);

  if (!data) return <Skeleton className="h-56" />;

  const columns = [
    { key: 'orderId', title: 'Order ID' },
    { key: 'customerName', title: 'Customer' },
    { key: 'total', title: 'Total', render: (r) => `$${r.total}` },
    { key: 'status', title: 'Status' },
    { key: 'createdAt', title: 'Created', render: (r) => new Date(r.createdAt).toLocaleString() }
  ];

  return (
    <div>
      <DataTable columns={columns} rows={data.items} />
      <div className="mt-3 flex items-center justify-between">
        <div>Total: {data.total}</div>
        <Pagination page={data.page} total={data.totalPages} onPage={(n) => setPage(n)} />
      </div>
    </div>
  );
}
