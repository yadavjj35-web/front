import React from 'react';

export default function AgentCard({ agent = {} }) {
  const {
    name,
    online,
    cpu = 0,
    memory = 0,
    currentWorkflow = '-',
    queue = '-',
    lastAction = '-',
    health = 'unknown',
    uptime = '-'
  } = agent;

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div className="font-semibold">{name}</div>
        <div className={`px-2 py-1 rounded text-xs ${online ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {online ? 'Online' : 'Offline'}
        </div>
      </div>

      <div className="mt-2 grid grid-cols-2 gap-2 text-sm text-muted">
        <div>CPU: {cpu}%</div>
        <div>Memory: {memory} MB</div>
        <div>Workflow: {currentWorkflow}</div>
        <div>Queue: {queue}</div>
        <div>Last: {lastAction}</div>
        <div>Health: {health}</div>
      </div>

      <div className="mt-3 text-xs text-muted">Uptime: {uptime}</div>
    </div>
  );
}
