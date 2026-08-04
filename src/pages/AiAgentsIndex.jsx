import React, { useEffect, useState } from 'react';
import { fetchAgents } from '../services/agentsService';
import AgentList from '../components/Agent/AgentList';
import { Skeleton } from '../components/UI/Skeleton';
import { useToast } from '../components/Toast/ToastProvider';

export default function AiAgentsIndex() {
  const [agents, setAgents] = useState(null);
  const { push } = useToast();

  useEffect(() => {
    setAgents(null);
    fetchAgents().then((r) => setAgents(r)).catch((err) => {
      push({ title: 'Agents error', message: err.message || 'Failed to load agents' });
      setAgents([]);
    });
  }, []);

  if (!agents) return <Skeleton className="h-64" />;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">AI Agents</h2>
      <AgentList agents={agents} />
    </div>
  );
}
