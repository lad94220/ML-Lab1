"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import PriceByCaratChart from './PriceByCaratChart';
import PriceByCutChart from './PriceByCutChart';
import PriceByColorChart from './PriceByColorChart';
import PriceByClarityChart from './PriceByClarityChart';

interface DataInsightsProps {
  show: boolean;
}

export default function DataInsights({ show }: DataInsightsProps) {
  const [caratData, setCaratData] = useState<{ carat: number; price: number }[]>([]);
  const [cutData, setCutData] = useState<{ cut: string; avgPrice: number }[]>([]);
  const [colorData, setColorData] = useState<{ color: string; avgPrice: number }[]>([]);
  const [clarityData, setClarityData] = useState<{ clarity: string; avgPrice: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URI || "http://localhost:5000"}/api/insights`);
        
        setCaratData(response.data.caratData);
        setCutData(response.data.cutData);
        setColorData(response.data.colorData);
        setClarityData(response.data.clarityData);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch insights:', error);
        // Fallback to sample data if API fails
        const caratSample = Array.from({ length: 100 }, (_, i) => {
          const carat = 0.2 + (i * 0.05);
          const basePrice = Math.pow(carat, 2.5) * 5000 + Math.random() * 1000;
          return { carat: Number(carat.toFixed(2)), price: Math.round(basePrice) };
        });
        
        const cutAvg = [
          { cut: 'Fair', avgPrice: 4358 },
          { cut: 'Good', avgPrice: 3929 },
          { cut: 'Very Good', avgPrice: 3982 },
          { cut: 'Premium', avgPrice: 4584 },
          { cut: 'Ideal', avgPrice: 3458 }
        ];
        
        const colorAvg = [
          { color: 'J', avgPrice: 5324 },
          { color: 'I', avgPrice: 5092 },
          { color: 'H', avgPrice: 4276 },
          { color: 'G', avgPrice: 3999 },
          { color: 'F', avgPrice: 3725 },
          { color: 'E', avgPrice: 3077 },
          { color: 'D', avgPrice: 3170 }
        ];
        
        const clarityAvg = [
          { clarity: 'I1', avgPrice: 3924 },
          { clarity: 'SI2', avgPrice: 5063 },
          { clarity: 'SI1', avgPrice: 3996 },
          { clarity: 'VS2', avgPrice: 3925 },
          { clarity: 'VS1', avgPrice: 3839 },
          { clarity: 'VVS2', avgPrice: 3284 },
          { clarity: 'VVS1', avgPrice: 2831 },
          { clarity: 'IF', avgPrice: 2865 }
        ];
        
        setCaratData(caratSample);
        setCutData(cutAvg);
        setColorData(colorAvg);
        setClarityData(clarityAvg);
        setLoading(false);
      }
    };

    fetchInsights();
  }, []);

  if (!show) return null;

  return (
    <div className="w-full bg-white/10 backdrop-blur-lg rounded-2xl p-6 mt-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#264653] mb-2">Diamond Data Insights</h2>
        <p className="text-sm text-gray-700">Understanding how different factors influence diamond pricing</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center p-20">
          <div className="w-16 h-16 border-4 border-[#264653]/20 border-t-[#2a9d8f] rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="space-y-6">
            {/* Key Insights Summary */}
            <div className="bg-linear-to-r from-[#2a9d8f] to-[#264653] text-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="text-3xl">💡</span>
                Key Insights
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                  <h4 className="font-semibold mb-2">🔹 Carat Weight Impact</h4>
                  <p className="text-sm text-white/90">
                    Carat weight has an exponential relationship with price. A 2-carat diamond costs significantly more than twice a 1-carat diamond.
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                  <h4 className="font-semibold mb-2">✨ Cut Quality Matters</h4>
                  <p className="text-sm text-white/90">
                    Premium and Ideal cuts often command higher prices due to superior brilliance and light performance.
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                  <h4 className="font-semibold mb-2">🎨 Color Grading</h4>
                  <p className="text-sm text-white/90">
                    Colorless diamonds (D-F grades) are rarer and more valuable than near-colorless or tinted diamonds.
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                  <h4 className="font-semibold mb-2">🔍 Clarity's Role</h4>
                  <p className="text-sm text-white/90">
                    Higher clarity grades (VVS, IF) indicate fewer inclusions, making diamonds more desirable and expensive.
                  </p>
                </div>
              </div>
            </div>

            {/* Charts Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              <PriceByCaratChart data={caratData} />
              <PriceByCutChart data={cutData} />
              <PriceByColorChart data={colorData} />
              <PriceByClarityChart data={clarityData} />
            </div>

            {/* Additional Information */}
            <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-[#264653] mb-4">Understanding the 4 Cs of Diamonds</h3>
              <div className="grid md:grid-cols-4 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold text-[#2a9d8f] mb-2">Carat</h4>
                  <p className="text-gray-700">Measures the weight of the diamond. 1 carat = 0.2 grams. Larger carats are exponentially rarer.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-[#2a9d8f] mb-2">Cut</h4>
                  <p className="text-gray-700">Refers to how well the diamond is cut. Affects sparkle, brilliance, and overall appearance.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-[#2a9d8f] mb-2">Color</h4>
                  <p className="text-gray-700">Grades from D (colorless) to Z (light yellow). Colorless diamonds are most valuable.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-[#2a9d8f] mb-2">Clarity</h4>
                  <p className="text-gray-700">Measures internal flaws (inclusions) and surface defects (blemishes). Fewer flaws mean higher value.</p>
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}
