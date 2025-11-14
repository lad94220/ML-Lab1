"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts';

interface ColorData {
  color: string;
  avgPrice: number;
}

interface PriceByColorChartProps {
  data: ColorData[];
}

const COLOR_COLORS: { [key: string]: string } = {
  'J': '#8d99ae',
  'I': '#9ba7ba',
  'H': '#a9b5c6',
  'G': '#b7c3d3',
  'F': '#c5d1df',
  'E': '#d3dfec',
  'D': '#e1edf8'
};

export default function PriceByColorChart({ data }: PriceByColorChartProps) {
  return (
    <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 shadow-lg">
      <h3 className="text-xl font-bold text-[#264653] mb-4">Average Price by Color Grade</h3>
      <p className="text-sm text-gray-600 mb-4">
        Color grades range from J (noticeable color) to D (colorless). Colorless diamonds are rarer and more valuable.
      </p>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis 
            dataKey="color" 
            stroke="#264653"
            tick={{ fill: '#264653' }}
            label={{ value: 'Color Grade (J=worst, D=best)', position: 'insideBottom', offset: -10, style: { fill: '#264653', fontSize: 12 } }}
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
              <Cell key={`cell-${index}`} fill={COLOR_COLORS[entry.color] || '#2a9d8f'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
