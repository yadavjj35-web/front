import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function AreaChartComponent({ data = [], dataKey = 'value', xKey = 'date', height = 250 }) {
  return (
    <div className="w-full h-64 bg-white dark:bg-slate-800 p-3 rounded-md border dark:border-slate-700">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0ea5a4" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#0ea5a4" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey={xKey} />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area type="monotone" dataKey={dataKey} stroke="#0ea5a4" fill="url(#colorUv)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
