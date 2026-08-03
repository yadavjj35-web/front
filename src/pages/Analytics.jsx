import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { ENDPOINTS } from '../constants/config';
import AreaChartComponent from '../components/Charts/AreaChart';
import { Skeleton } from '../components/UI/Skeleton';

export default function Analytics() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get(ENDPOINTS.analytics).then((r) => setData(r.data)).catch(() => setData(null));
  }, []);

  if (!data) return <Skeleton className="h-96" />;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Analytics Overview</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <AreaChartComponent data={data.revenue} dataKey="value" xKey="date" />
        <AreaChartComponent data={data.aiUsage} dataKey="tokens" xKey="date" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-3 bg-white dark:bg-slate-800 rounded border">Top Countries: {data.topCountries.join(', ')}</div>
        <div className="p-3 bg-white dark:bg-slate-800 rounded border">Top Products: {data.topProducts.join(', ')}</div>
        <div className="p-3 bg-white dark:bg-slate-800 rounded border">Avg Response Time: {data.avgResponseTime}ms</div>
      </div>
    </div>
  );
}
