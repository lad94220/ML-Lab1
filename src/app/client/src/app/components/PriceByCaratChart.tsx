"use client";

import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface DataPoint {
  carat: number;
  price: number;
}

interface PriceByCaratChartProps {
  data: DataPoint[];
}

export default function PriceByCaratChart({ data }: PriceByCaratChartProps) {
  return (
    <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 shadow-lg">
      <h3 className="text-xl font-bold text-[#264653] mb-4">Price vs Carat Weight</h3>
      <p className="text-sm text-gray-600 mb-4">
        Carat weight is the strongest predictor of diamond price. Larger diamonds are exponentially more expensive.
      </p>
      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis 
            type="number" 
            dataKey="carat" 
            name="Carat" 
            label={{ value: 'Carat Weight', position: 'insideBottom', offset: -10, style: { fill: '#264653' } }}
            stroke="#264653"
          />
          <YAxis 
            type="number" 
            dataKey="price" 
            name="Price" 
            label={{ value: 'Price ($)', angle: -90, position: 'insideLeft', style: { fill: '#264653' } }}
            stroke="#264653"
          />
          <Tooltip 
            cursor={{ strokeDasharray: '3 3' }}
            formatter={(value: number, name: string) => [
              name === 'Price' ? `$${value.toLocaleString()}` : value,
              name
            ]}
            contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', border: '1px solid #2a9d8f', borderRadius: '8px' }}
          />
          <Legend verticalAlign="top" height={36} />
          <Scatter 
            name="Diamonds" 
            data={data} 
            fill="#2a9d8f" 
            fillOpacity={0.6}
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
