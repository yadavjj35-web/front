import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { ENDPOINTS } from '../../constants/config';
import { AreaChartComponent } from '../../components/Charts';
import { Skeleton } from '../../components/UI/Skeleton';

export default function Performance() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get(`${ENDPOINTS.analytics}/performance`).then((r) => setData(r.data)).catch(() => setData(null));
  }, []);

  if (!data) return <Skeleton className="h-64" />;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">API Performance</h2>
      <AreaChartComponent data={data.responseTime || []} dataKey="avg" xKey="date" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div className="card">Avg Response Time: {data.avg} ms</div>
        <div className="card">p95: {data.p95} ms</div>
        <div className="card">Error Rate: {data.errorRate}%</div>
      </div>
    </div>
  );
}
