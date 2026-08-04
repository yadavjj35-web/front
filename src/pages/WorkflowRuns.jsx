import React, { useEffect, useState } from 'react';
import { listWorkflowRuns } from '../services/workflowRunsService';
import { Skeleton } from '../components/UI/Skeleton';
import DataTable from '../components/Table/DataTable';
import { useToast } from '../components/Toast/ToastProvider';
import { Link } from 'react-router-dom';

export default function WorkflowRuns() {
  const [runs, setRuns] = useState(null);
  const { push } = useToast();

  useEffect(() => {
    setRuns(null);
    listWorkflowRuns().then((r) => setRuns(r)).catch((err) => {
      push({ title: 'Workflows error', message: err.message || 'Failed to load runs' });
      setRuns({ items: [] });
    });
  }, []);

  if (!runs) return <Skeleton className="h-64" />;

  const columns = [
    { key: 'id', title: 'Run ID', render: (r) => <Link to={`/workflows/${r.id}`}>{r.id}</Link> },
    { key: 'workflowName', title: 'Workflow' },
    { key: 'status', title: 'Status' },
    { key: 'startedAt', title: 'Started', render: (r) => new Date(r.startedAt).toLocaleString() }
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Workflow Runs</h2>
      <DataTable columns={columns} rows={runs.items || []} />
    </div>
  );
}
