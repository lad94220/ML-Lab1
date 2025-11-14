"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts';

interface ClarityData {
  clarity: string;
  avgPrice: number;
}

interface PriceByClarityChartProps {
  data: ClarityData[];
}

const CLARITY_COLORS: { [key: string]: string } = {
  'I1': '#e63946',
  'SI2': '#f77f00',
  'SI1': '#fcbf49',
  'VS2': '#90be6d',
  'VS1': '#43aa8b',
  'VVS2': '#4d908e',
  'VVS1': '#577590',
  'IF': '#264653'
};

export default function PriceByClarityChart({ data }: PriceByClarityChartProps) {
  return (
    <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 shadow-lg">
      <h3 className="text-xl font-bold text-[#264653] mb-4">Average Price by Clarity Grade</h3>
      <p className="text-sm text-gray-600 mb-4">
        Clarity measures internal and external flaws. IF (Internally Flawless) diamonds are the most expensive.
      </p>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis 
            dataKey="clarity" 
            stroke="#264653"
            tick={{ fill: '#264653' }}
            label={{ value: 'Clarity Grade (I1=worst, IF=best)', position: 'insideBottom', offset: -10, style: { fill: '#264653', fontSize: 12 } }}
          />
          <YAxis 
            stroke="#264653"
            tick={{ fill: '#264653' }}
            label={{ value: 'Avg Price ($)', angle: -90, position: 'insideLeft', style: { fill: '#264653' } }}
          />
          <Tooltip 
            formatter={(value: number) => [`$${value.toLocaleString()}`, 'Average Price']}
            contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', border: '1px solid #2a9d8f', borderRadius: '8px' }}
          />
          <Legend verticalAlign="top" height={36} />
          <Bar dataKey="avgPrice" name="Average Price" radius={[8, 8, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={CLARITY_COLORS[entry.clarity] || '#2a9d8f'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
