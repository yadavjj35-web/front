import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { ENDPOINTS } from '../constants/config';
import { Skeleton } from '../components/UI/Skeleton';

export default function AiExecutive() {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    let mounted = true;
    api
      .get(`${ENDPOINTS.agents}/executive/status`)
      .then((r) => (mounted ? setStatus(r.data) : null))
      .catch(() => {
        if (mounted) setStatus(null);
      });
    return () => (mounted = false);
  }, []);

  if (!status) {
    return <Skeleton className="h-96" />;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">AI Executive</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="p-3 bg-white dark:bg-slate-800 rounded-md border">Thinking: {status.thinking}</div>
        <div className="p-3 bg-white dark:bg-slate-800 rounded-md border">Planning: {status.planning}</div>
        <div className="p-3 bg-white dark:bg-slate-800 rounded-md border">Delegating: {status.delegating}</div>
      </div>
      <div className="p-3 bg-white dark:bg-slate-800 rounded-md border">
        <h4 className="font-semibold">Current Task</h4>
        <div>{status.currentTask?.title || 'Idle'}</div>
        <pre className="mt-2 text-sm text-slate-500">{JSON.stringify(status.currentTask || {}, null, 2)}</pre>
      </div>
      <div className="p-3 bg-white dark:bg-slate-800 rounded-md border">
        <h4 className="font-semibold">Reasoning Timeline</h4>
        <div className="text-sm text-slate-600">{status.reasoningTimeline?.join(', ') || 'No history'}</div>
      </div>
    </div>
  );
}
