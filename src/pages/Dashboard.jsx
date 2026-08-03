import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { ENDPOINTS } from '../constants/config';
import AreaChartComponent from '../components/Charts/AreaChart';
import { Skeleton } from '../components/UI/Skeleton';
import { useToast } from '../components/Toast/ToastProvider';

function StatCard({ title, value, children }) {
  return (
    <div className="p-4 bg-white dark:bg-slate-800 rounded-md border dark:border-slate-700">
      <div className="text-sm text-slate-500">{title}</div>
      <div className="text-2xl font-semibold mt-1">{value}</div>
      <div className="mt-2 text-sm text-slate-400">{children}</div>
    </div>
  );
}

export default function Dashboard() {
  const [data, setData] = useState(null);
  const { push } = useToast();

  useEffect(() => {
    let mounted = true;
    api
      .get(ENDPOINTS.dashboard)
      .then((res) => {
        if (mounted) setData(res.data);
      })
      .catch((err) => {
        push({ title: 'Dashboard error', message: err.response?.data?.message || err.message });
      });
    return () => (mounted = false);
  }, []);

  if (!data) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Skeleton className="h-20" />
          <Skeleton className="h-20" />
          <Skeleton className="h-20" />
          <Skeleton className="h-20" />
        </div>
      </div>
    );
  }

  const {
    totalOrders,
    revenue,
    whatsappMessages,
    aiRequests,
    runningWorkflows,
    activeAgents,
    failedTasks,
    todaysSales,
    salesChart,
    ordersChart,
    aiUsageChart
  } = data;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Total Orders" value={totalOrders} />
        <StatCard title="Revenue" value={`$${revenue}`} />
        <StatCard title="WhatsApp Messages" value={whatsappMessages} />
        <StatCard title="AI Requests" value={aiRequests} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <div className="p-3 bg-white dark:bg-slate-800 rounded-md border dark:border-slate-700">
            <h4 className="font-semibold mb-2">Sales Chart</h4>
            <AreaChartComponent data={salesChart} dataKey="value" xKey="date" />
          </div>
        </div>
        <div>
          <div className="p-3 bg-white dark:bg-slate-800 rounded-md border dark:border-slate-700">
            <h4 className="font-semibold mb-2">AI Usage</h4>
            <AreaChartComponent data={aiUsageChart} dataKey="value" xKey="date" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-3 bg-white dark:bg-slate-800 rounded-md border dark:border-slate-700">
          <h4 className="font-semibold mb-2">Orders Chart</h4>
          <AreaChartComponent data={ordersChart} dataKey="count" xKey="date" />
        </div>
        <div className="p-3 bg-white dark:bg-slate-800 rounded-md border dark:border-slate-700">
          <h4 className="font-semibold mb-2">Today's Sales</h4>
          <div className="text-3xl font-bold">${todaysSales}</div>
          <div className="mt-2 text-sm text-slate-500">Running Workflows: {runningWorkflows}</div>
          <div className="mt-1 text-sm text-slate-500">Active Agents: {activeAgents}</div>
          <div className="mt-1 text-sm text-slate-500">Failed Tasks: {failedTasks}</div>
        </div>
      </div>
    </div>
  );
}
