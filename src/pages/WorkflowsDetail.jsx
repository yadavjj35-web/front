import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getWorkflow } from '../services/workflowsService';
import { Skeleton } from '../components/UI/Skeleton';
import StatusPill from '../components/StatusPill';
import DataTable from '../components/Table/DataTable';
import { useToast } from '../components/Toast/ToastProvider';

export default function WorkflowsDetail() {
  const { id } = useParams();
  const [wf, setWf] = useState(null);
  const { push } = useToast();

  useEffect(() => {
    let mounted = true;
    setWf(null);
    getWorkflow(id)
      .then((r) => mounted && setWf(r))
      .catch((err) => {
        push({ title: 'Workflow error', message: err.message || 'Failed to load workflow' });
        mounted && setWf({ error: true });
      });
    return () => (mounted = false);
  }, [id]);

  if (!wf) return <Skeleton className="h-64" />;
  if (wf.error) return <div className="card">Unable to load workflow</div>;

  const columns = [
    { key: 'id', title: 'Task ID' },
    { key: 'type', title: 'Type' },
    { key: 'agent', title: 'Agent' },
    { key: 'status', title: 'Status', render: (r) => <StatusPill status={r.status} /> },
    { key: 'startedAt', title: 'Started', render: (r) => r.startedAt ? new Date(r.startedAt).toLocaleString() : '-' },
    { key: 'finishedAt', title: 'Finished', render: (r) => r.finishedAt ? new Date(r.finishedAt).toLocaleString() : '-' }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">{wf.name || wf.workflowId}</h2>
          <div className="text-sm text-muted">Owner: {wf.owner}</div>
        </div>
        <div><StatusPill status={wf.status} /></div>
      </div>

      <div className="card">
        <h4 className="font-semibold mb-2">Tasks</h4>
        <DataTable columns={columns} rows={wf.tasks || []} />
      </div>

      <div className="card">
        <h4 className="font-semibold">Logs</h4>
        <div className="mt-2 text-sm text-muted">
          {(wf.logs || []).map((l, i) => (
            <div key={i} className="mb-2">
              <div className="text-xs text-muted">{new Date(l.ts).toLocaleString()}</div>
              <div className="font-medium">{l.message}</div>
              <div className="text-sm text-muted">{JSON.stringify(l.meta)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
