"use client";

import { useState } from "react";
import axios from "axios";
import DataInsights from "./components/DataInsights";

export default function Home() {
  const [carat, setCarat] = useState<string>("")
  const [cut, setCut] = useState<string>("")
  const [color, setColor] = useState<string>("")
  const [clarity, setClarity] = useState<string>("")
  const [predictedPrice, setPredictedPrice] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  const [showInsights, setShowInsights] = useState<boolean>(false)

  const cutOptions = ["Fair", "Good", "Very Good", "Premium", "Ideal"]
  const colorOptions = ["J", "I", "H", "G", "F", "E", "D"]
  const clarityOptions = ["IF", "VVS1", "VVS2", "VS1", "VS2", "SI1", "SI2", "I1"].reverse()

  const isFormValid = () => {
    const caratValue = Number(carat)
    return (
      carat && 
      !isNaN(caratValue) && 
      caratValue > 0 &&
      cut && 
      cutOptions.includes(cut) &&
      color && 
      colorOptions.includes(color) &&
      clarity && 
      clarityOptions.includes(clarity)
    )
  }

  const handlePredictPrice = async () => {
    setIsLoading(true)
    try {
      const caratValue = Number(carat)
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URI || "http://localhost:5000"}/api/predict`, {
        params: {
          carat: caratValue,
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
      setError("Failed to predict price. Please try again.")
      throw error
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center animate-gradient p-8">
      <div className="w-full max-w-6xl flex flex-col gap-6">
        {/* Main Prediction Card */}
        <div className="flex rounded-2xl shadow-2xl backdrop-blur-2xl bg-white/20 overflow-hidden">
        
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
                min="0.01"
                placeholder="Enter carat (e.g., 0.5)" 
                value={carat} 
                onChange={(e) => setCarat(e.target.value)} 
                className={`px-4 py-3 rounded-lg bg-white/90 backdrop-blur border focus:outline-none focus:ring-2 text-[#264653] ${
                  carat && (isNaN(Number(carat)) || Number(carat) <= 0)
                    ? 'border-red-400 focus:ring-red-400'
                    : 'border-white/50 focus:ring-[#2a9d8f]'
                }`}
              />
              {carat && (isNaN(Number(carat)) || Number(carat) <= 0) && (
                <span className="text-red-600 text-sm mt-1">Carat must be greater than 0</span>
              )}
            </div>

            {/* Cut Dropdown */}
            <div className="flex flex-col">
              <label className="text-[#264653] font-semibold mb-2">Cut</label>
              <div className="relative">
                <select 
                  value={cut} 
                  onChange={(e) => setCut(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/90 backdrop-blur border border-white/50 focus:outline-none focus:ring-2 focus:ring-[#2a9d8f] text-[#264653] appearance-none pr-10"
                >
                  <option value="">Select cut quality</option>
                  {cutOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg className="h-5 w-5 text-[#264653]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Color Dropdown */}
            <div className="flex flex-col">
              <label className="text-[#264653] font-semibold mb-2">Color</label>
              <div className="relative">
                <select 
                  value={color} 
                  onChange={(e) => setColor(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/90 backdrop-blur border border-white/50 focus:outline-none focus:ring-2 focus:ring-[#2a9d8f] text-[#264653] appearance-none pr-10"
                >
                  <option value="">Select color grade</option>
                  {colorOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg className="h-5 w-5 text-[#264653]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Clarity Dropdown */}
            <div className="flex flex-col">
              <label className="text-[#264653] font-semibold mb-2">Clarity</label>
              <div className="relative">
                <select 
                  value={clarity} 
                  onChange={(e) => setClarity(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/90 backdrop-blur border border-white/50 focus:outline-none focus:ring-2 focus:ring-[#2a9d8f] text-[#264653] appearance-none pr-10"
                >
                  <option value="">Select clarity grade</option>
                  {clarityOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg className="h-5 w-5 text-[#264653]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            <button 
              onClick={handlePredictPrice}
              disabled={!isFormValid()}
              className={`mt-auto px-6 py-4 font-bold rounded-lg shadow-lg transition-all text-lg ${
                isFormValid() 
                  ? 'bg-[#264653] hover:bg-[#2a9d8f] active:scale-95 cursor-pointer text-white' 
                  : 'bg-gray-400 cursor-not-allowed text-gray-200'
              }`}
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
              <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-12 shadow-2xl border-4 border-[#2a9d8f] animate-pulse-slow flex flex-col items-center">
                <p className="text-xl text-gray-600 mb-4">Predicted Diamond Price</p>
                <p className={`font-extrabold text-[#264653] mb-4 ${
                  predictedPrice?.toLocaleString().length > 10 
                  ? 'text-4xl' 
                  : predictedPrice?.toLocaleString().length > 7
                  ? 'text-5xl'
                  : 'text-7xl'
                }`}>
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
        
        {/* Data Insights Section */}
        <DataInsights show={showInsights} />
        
        {/* Toggle Insights Button */}
        <button
          onClick={() => setShowInsights(!showInsights)}
          className="self-center bg-[#264653] hover:bg-[#2a9d8f] text-white px-6 py-3 rounded-full shadow-xl font-semibold transition-all flex items-center gap-3 group hover:scale-105 active:scale-95"
          aria-label={showInsights ? "Hide data insights" : "Show data insights"}
        >
          <svg className={`w-6 h-6 transition-transform ${showInsights ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <span>{showInsights ? 'Hide' : 'Show'} Data Insights</span>
        </button>
      </div>
    </div>
  );
}
