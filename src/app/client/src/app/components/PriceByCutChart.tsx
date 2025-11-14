"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts';

interface CutData {
  cut: string;
  avgPrice: number;
}

interface PriceByCutChartProps {
  data: CutData[];
}

const CUT_COLORS: { [key: string]: string } = {
  'Fair': '#e63946',
  'Good': '#f77f00',
  'Very Good': '#fcbf49',
  'Premium': '#06d6a0',
  'Ideal': '#2a9d8f'
};

export default function PriceByCutChart({ data }: PriceByCutChartProps) {
  return (
    <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 shadow-lg">
      <h3 className="text-xl font-bold text-[#264653] mb-4">Average Price by Cut Quality</h3>
      <p className="text-sm text-gray-600 mb-4">
        Better cut quality generally commands higher prices. Ideal cuts maximize brilliance and sparkle.
      </p>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis 
            dataKey="cut" 
            stroke="#264653"
            tick={{ fill: '#264653' }}
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
              <Cell key={`cell-${index}`} fill={CUT_COLORS[entry.cut] || '#2a9d8f'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
