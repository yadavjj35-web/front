import React from 'react';
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const COLORS = ['#0ea5a4', '#7c3aed', '#f59e0b', '#ef4444', '#06b6d4'];

export default function PieChartComponent({ data = [], dataKey = 'value', nameKey = 'name' }) {
  return (
    <div className="w-full h-64 bg-white dark:bg-slate-800 p-3 rounded-md border dark:border-slate-700">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey={dataKey} nameKey={nameKey} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
