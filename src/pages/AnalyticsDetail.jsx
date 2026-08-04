import React, { useEffect, useState } from 'react';
import { fetchAnalytics } from '../services/analyticsService';
import AreaChartComponent from '../components/Charts/AreaChart';
import { Skeleton } from '../components/UI/Skeleton';

export default function AnalyticsDetail() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchAnalytics().then((r) => setData(r)).catch(() => setData(null));
  }, []);

  if (!data) return <Skeleton className="h-64" />;

  return (
    <div>
      <h2 className="text-xl font-semibold">Analytics Details</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        <AreaChartComponent data={data.revenue} dataKey="value" xKey="date" />
        <AreaChartComponent data={data.aiUsage} dataKey="tokens" xKey="date" />
      </div>
    </div>
  );
}
