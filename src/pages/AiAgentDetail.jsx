import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchAgentStatus } from '../services/agentsService';
import { Skeleton } from '../components/UI/Skeleton';
import StatusPill from '../components/StatusPill';
import { useToast } from '../components/Toast/ToastProvider';

export default function AiAgentDetail() {
  const { name } = useParams();
  const [agent, setAgent] = useState(null);
  const { push } = useToast();

  useEffect(() => {
    let mounted = true;
    setAgent(null);
    fetchAgentStatus(name)
      .then((r) => mounted && setAgent(r))
      .catch((err) => {
        push({ title: 'Agent error', message: err.message || 'Failed to load agent' });
        mounted && setAgent({ error: true });
      });
    return () => (mounted = false);
  }, [name]);

  if (!agent) return <Skeleton className="h-80" />;
  if (agent.error) return <div className="card">Unable to load agent</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">{agent.name}</h2>
          <div className="text-sm text-muted">Role: {agent.role || 'agent'}</div>
        </div>
        <div><StatusPill status={agent.status || 'unknown'} /></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card">
          <div className="text-sm text-muted">CPU Usage</div>
          <div className="text-2xl font-bold mt-1">{agent.cpu}%</div>
          <div className="text-sm text-muted mt-2">Memory: {agent.memory} MB</div>
        </div>
        <div className="card">
          <div className="text-sm text-muted">Current Workflow</div>
          <div className="mt-1">{agent.currentWorkflow || '—'}</div>
          <div className="text-sm text-muted mt-2">Queue: {agent.queue || '—'}</div>
        </div>
        <div className="card">
          <div className="text-sm text-muted">Last Action</div>
          <div className="mt-1">{agent.lastAction || '—'}</div>
          <div className="text-sm text-muted mt-2">Uptime: {agent.uptime || '—'}</div>
        </div>
      </div>

      <div className="card">
        <h4 className="font-semibold">Execution Graph</h4>
        <pre className="text-sm mt-2 text-muted">{JSON.stringify(agent.executionGraph || {}, null, 2)}</pre>
      </div>

      <div className="card">
        <h4 className="font-semibold">Tool Usage</h4>
        <ul className="mt-2 space-y-2 text-sm">
          {(agent.toolUsage || []).map((t) => (
            <li key={t.name} className="flex justify-between">
              <div>{t.name}</div>
              <div className="text-muted">{t.count}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
