'use client';

import { ChartData } from '@/types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function ChartRenderer({ chart }: { chart: ChartData }) {
  if (chart.type === 'bar') {
    return (
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={chart.data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    );
  }
  
  return <div>Chart type {chart.type} not yet implemented</div>;
}