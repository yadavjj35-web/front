import React from 'react';
import AgentCard from './AgentCard';

export default function AgentList({ agents = [] }) {
  if (!agents || agents.length === 0) {
    return <div className="card">No agents available</div>;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {agents.map((a) => (
        <AgentCard key={a.name} agent={a} />
      ))}
    </div>
  );
}
