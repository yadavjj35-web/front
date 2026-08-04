import React, { useEffect, useState } from 'react';
import { fetchAgents } from '../services/agentsService';
import AgentList from '../components/Agent/AgentList';
import { useToast } from '../components/Toast/ToastProvider';

export default function AgentStatusLive() {
  const [agents, setAgents] = useState([]);
  const { push } = useToast();

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const res = await fetchAgents();
        if (mounted) setAgents(res);
      } catch (err) {
        push({ title: 'Load failed', message: err.message });
      }
    }
    load();
    const iv = setInterval(load, 10000);
    return () => {
      mounted = false;
      clearInterval(iv);
    };
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Live Agent Status</h2>
      <AgentList agents={agents} />
    </div>
  );
}
