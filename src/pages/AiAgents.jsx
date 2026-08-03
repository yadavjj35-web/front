import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { ENDPOINTS } from '../constants/config';
import { Skeleton } from '../components/UI/Skeleton';

function AgentCard({ agent }) {
  return (
    <div className="p-3 bg-white dark:bg-slate-800 rounded-md border">
      <div className="flex items-center justify-between">
        <div className="font-semibold">{agent.name}</div>
        <div className={`text-sm px-2 py-1 rounded ${agent.online ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{agent.online ? 'Online' : 'Offline'}</div>
      </div>
      <div className="mt-2 text-sm text-slate-500">CPU: {agent.cpu}%</div>
      <div className="mt-1 text-sm text-slate-500">Memory: {agent.memory}MB</div>
      <div className="mt-1 text-sm text-slate-500">Current Workflow: {agent.currentWorkflow || '—'}</div>
      <div className="mt-1 text-sm text-slate-500">Queue: {agent.queue || '—'}</div>
      <div className="mt-1 text-sm text-slate-500">Last Action: {agent.lastAction || '—'}</div>
      <div className="mt-1 text-sm text-slate-500">Uptime: {agent.uptime}</div>
    </div>
  );
}

export default function AiAgents() {
  const [agents, setAgents] = useState(null);

  useEffect(() => {
    let mounted = true;
    api
      .get(ENDPOINTS.agents)
      .then((r) => mounted && setAgents(r.data))
      .catch(() => mounted && setAgents([]));
    return () => (mounted = false);
  }, []);

  if (!agents) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Skeleton className="h-40" />
        <Skeleton className="h-40" />
        <Skeleton className="h-40" />
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">AI Agents</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {agents.map((a) => (
          <AgentCard key={a.name} agent={a} />
        ))}
      </div>
    </div>
  );
}
