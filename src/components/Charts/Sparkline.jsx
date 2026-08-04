import React from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

export default function Sparkline({ data = [], dataKey = 'value' }) {
  return (
    <div className="w-full h-16">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <Line type="monotone" dataKey={dataKey} stroke="#0ea5a4" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
