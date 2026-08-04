import React, { useEffect, useState } from 'react';
import { listWorkflows } from '../services/workflowsService';
import { Skeleton } from '../components/UI/Skeleton';
import DataTable from '../components/Table/DataTable';
import Button from '../components/UI/Button';
import usePagination from '../hooks/usePagination';

export default function Workflows() {
  const [data, setData] = useState(null);
  const { page, size, next, prev, go } = usePagination({ initialPage: 1, pageSize: 20 });

  useEffect(() => {
    let mounted = true;
    setData(null);
    listWorkflows({ page, size })
      .then((r) => mounted && setData(r))
      .catch(() => mounted && setData({ items: [], page: 1, totalPages: 1 }));
    return () => (mounted = false);
  }, [page, size]);

  if (!data) return <Skeleton className="h-64" />;

  const columns = [
    { key: 'workflowId', title: 'Workflow ID' },
    { key: 'name', title: 'Name' },
    { key: 'status', title: 'Status' },
    { key: 'owner', title: 'Owner' },
    { key: 'createdAt', title: 'Created', render: (r) => new Date(r.createdAt).toLocaleString() }
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Workflows</h2>
      <DataTable columns={columns} rows={data.items} />
      <div className="mt-3 flex items-center justify-between">
        <div>Total: {data.total}</div>
        <div className="flex gap-2">
          <Button onClick={prev}>Prev</Button>
          <Button onClick={next}>Next</Button>
        </div>
      </div>
    </div>
  );
}
