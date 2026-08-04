import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function BarChartComponent({ data = [], dataKey = 'value', xKey = 'name' }) {
  return (
    <div className="w-full h-64 bg-white dark:bg-slate-800 p-3 rounded-md border dark:border-slate-700">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xKey} />
          <YAxis />
          <Tooltip />
          <Bar dataKey={dataKey} fill="#0ea5a4" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
