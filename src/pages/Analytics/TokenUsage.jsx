import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { ENDPOINTS } from '../../constants/config';
import { AreaChartComponent } from '../../components/Charts';
import { Skeleton } from '../../components/UI/Skeleton';

export default function TokenUsage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get(`${ENDPOINTS.analytics}/tokens`).then((r) => setData(r.data)).catch(() => setData(null));
  }, []);

  if (!data) return <Skeleton className="h-64" />;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Token Usage</h2>
      <AreaChartComponent data={data.usage || []} dataKey="tokens" xKey="date" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div className="card">Total Tokens: {data.totalTokens}</div>
        <div className="card">Avg Tokens / Request: {data.avgTokens}</div>
        <div className="card">Peak Day: {data.peakDay}</div>
      </div>
    </div>
  );
}
