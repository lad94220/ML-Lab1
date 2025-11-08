"use client";

import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [carat, setCarat] = useState<number>(0)
  const [cut, setCut] = useState<string>("")
  const [color, setColor] = useState<string>("")
  const [clarity, setClarity] = useState<string>("")
  const [predictedPrice, setPredictedPrice] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const cutOptions = ["Fair", "Good", "Very Good", "Premium", "Ideal"]
  const colorOptions = ["J", "I", "H", "G", "F", "E", "D"]
  const clarityOptions = ["IF", "VVS1", "VVS2", "VS1", "VS2", "SI1", "SI2", "I1"].reverse()

  const handlePredictPrice = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URI || "http://localhost:5000"}/api/predict`, {
        params: {
          carat,
          cut,
          color,
          clarity
      }}).then(response => {
        return response.data
      })
      setPredictedPrice(response.predicted_price)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      throw error
    }
  }

  return (
    <div className="h-screen flex items-center justify-center animate-gradient p-8">
      <div className="w-full max-w-6xl h-5/6 flex rounded-2xl shadow-2xl backdrop-blur-2xl bg-white/20 overflow-hidden">
        
        {/* Left Column - Input */}
        <div className="w-1/2 p-8 flex flex-col bg-white/30">
          <h2 className="text-3xl font-bold text-[#264653] mb-6">Diamond Details</h2>
          
          <div className="flex flex-col gap-4 flex-1">
            {/* Carat Input */}
            <div className="flex flex-col">
              <label className="text-[#264653] font-semibold mb-2">Carat</label>
              <input 
                type="number" 
                step="0.01"
                placeholder="Enter carat (e.g., 0.5)" 
                value={carat || ""} 
                onChange={(e) => setCarat(Number(e.target.value))} 
                className="px-4 py-3 rounded-lg bg-white/90 backdrop-blur border border-white/50 focus:outline-none focus:ring-2 focus:ring-[#2a9d8f]"
              />
            </div>

            {/* Cut Dropdown */}
            <div className="flex flex-col">
              <label className="text-[#264653] font-semibold mb-2">Cut</label>
              <select 
                value={cut} 
                onChange={(e) => setCut(e.target.value)}
                className="px-4 py-3 rounded-lg bg-white/90 backdrop-blur border border-white/50 focus:outline-none focus:ring-2 focus:ring-[#2a9d8f]"
              >
                <option value="">Select cut quality</option>
                {cutOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            {/* Color Dropdown */}
            <div className="flex flex-col">
              <label className="text-[#264653] font-semibold mb-2">Color</label>
              <select 
                value={color} 
                onChange={(e) => setColor(e.target.value)}
                className="px-4 py-3 rounded-lg bg-white/90 backdrop-blur border border-white/50 focus:outline-none focus:ring-2 focus:ring-[#2a9d8f]"
              >
                <option value="">Select color grade</option>
                {colorOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            {/* Clarity Dropdown */}
            <div className="flex flex-col">
              <label className="text-[#264653] font-semibold mb-2">Clarity</label>
              <select 
                value={clarity} 
                onChange={(e) => setClarity(e.target.value)}
                className="px-4 py-3 rounded-lg bg-white/90 backdrop-blur border border-white/50 focus:outline-none focus:ring-2 focus:ring-[#2a9d8f]"
              >
                <option value="">Select clarity grade</option>
                {clarityOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <button 
              onClick={handlePredictPrice}
              className="mt-auto px-6 py-4 bg-[#264653] duration-300 hover:bg-[#2a9d8f] active:scale-95 cursor-pointer text-white font-bold rounded-lg shadow-lg transition-all text-lg"
            >
              Predict Price
            </button>
          </div>
        </div>

        {/* Output */}
        <div className="w-1/2 p-8 flex flex-col items-center justify-center bg-white/10">
          <h2 className="text-3xl font-bold text-[#264653] mb-8">Prediction Result</h2>
          
          {predictedPrice !== null ? (
            isLoading ? (
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 border-4 border-[#264653]/20 border-t-[#2a9d8f] rounded-full animate-spin"></div>
                <p className="text-xl text-[#264653] font-medium">Loading...</p>
              </div>
            ) : (
              <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-12 shadow-2xl border-4 border-[#2a9d8f] animate-pulse-slow">
              <p className="text-xl text-gray-600 mb-4">Predicted Diamond Price</p>
              <p className="text-7xl font-extrabold text-[#264653] mb-4">
                ${predictedPrice?.toLocaleString()}
              </p>
              <div className="text-6xl">💎</div>
            </div>
            )
          ) : (
            <div className="text-center">
              <div className="text-8xl mb-6 opacity-30">💎</div>
              <p className="text-2xl text-[#264653] font-medium">
                Enter diamond details and<br />click predict to see the price
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
