import React, { useEffect, useState } from 'react';
import { fetchHealth } from '../services/monitoringService';
import HealthCard from '../components/Monitoring/HealthCard';
import { Skeleton } from '../components/UI/Skeleton';

export default function MonitoringOverview() {
  const [health, setHealth] = useState(null);

  useEffect(() => {
    let mounted = true;
    fetchHealth().then((r) => mounted && setHealth(r)).catch(() => mounted && setHealth({ cpu: 'n/a', ram: 'n/a' }));
    return () => (mounted = false);
  }, []);

  if (!health) return <Skeleton className="h-32" />;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Monitoring Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <HealthCard label="CPU" value={health.cpu} />
        <HealthCard label="RAM" value={health.ram} />
        <HealthCard label="Redis" value={health.redis} />
      </div>
    </div>
  );
}
