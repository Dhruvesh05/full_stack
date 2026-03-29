"use client"

import React, { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { InputField, SelectField, Button, Card, ResultDisplay } from "../ui"

interface CostEstimatorProps {
  onBack: () => void
}

export default function CostEstimator({ onBack }: CostEstimatorProps) {
  const [area, setArea] = useState<string>("")
  const [floors, setFloors] = useState<string>("1")
  const [quality, setQuality] = useState<"basic" | "standard" | "premium">(
    "standard"
  )
  const [errors, setErrors] = useState<Record<string, string>>({})

  const qualityRates = {
    basic: 1200,
    standard: 1800,
    premium: 2500,
  }

  // Calculate cost breakdown
  const areaNum = parseFloat(area) || 0
  const floorsNum = parseInt(floors) || 1
  const rate = qualityRates[quality]
  const isValidArea = area && areaNum > 0
  const cost = isValidArea ? areaNum * floorsNum * rate : 0

  // Cost breakdown percentages
  const materials = Math.round(cost * 0.45) // 45% materials
  const labor = Math.round(cost * 0.35) // 35% labor
  const overhead = Math.round(cost * 0.15) // 15% overhead/permits
  const contingency = Math.round(cost * 0.05) // 5% contingency

  const handleAreaChange = (value: string) => {
    setArea(value)
    if (errors.area) setErrors({})
  }

  const handleReset = () => {
    setArea("")
    setFloors("1")
    setQuality("standard")
    setErrors({})
  }

  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold transition-colors"
      >
        <ArrowLeft size={20} />
        Back
      </button>

      <div>
        <h3 className="text-2xl font-bold text-gray-900">
          Cost Estimator
        </h3>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-semibold text-gray-700">
              Area (sq ft)
            </label>
            {area && (
              <span className="text-lg font-bold text-red-600">
                {parseInt(area).toLocaleString("en-IN")} sqft
              </span>
            )}
          </div>
          <input
            type="range"
            min="100"
            max="10000"
            step="100"
            value={area || 0}
            onChange={(e) => handleAreaChange(e.target.value)}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600"
          />
          <div className="flex justify-between text-xs text-black mt-1">
            <span>100 sqft</span>
            <span>10,000 sqft</span>
          </div>
          <InputField
            type="number"
            value={area}
            onChange={(e) => handleAreaChange(e.target.value)}
            placeholder="Or enter exact value"
            className="mt-3"
          />
        </div>

        <SelectField
          label="Number of Floors"
          value={floors}
          onChange={(e) => setFloors(e.target.value)}
          options={[
            { value: "1", label: "1 Floor" },
            { value: "2", label: "2 Floors" },
            { value: "3", label: "3 Floors" },
            { value: "4", label: "4 Floors" },
            { value: "5", label: "5 Floors" },
            { value: "6", label: "6 Floors" },
            { value: "7", label: "7 Floors" },
            { value: "8", label: "8 Floors" },
            { value: "9", label: "9 Floors" },
            { value: "10", label: "10 Floors" },
          ]}
        />

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Construction Quality
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(["basic", "standard", "premium"] as const).map((q) => (
              <button
                key={q}
                onClick={() => setQuality(q)}
                className={`p-3 rounded-2xl font-semibold text-center transition-all duration-200 ${
                  quality === q
                    ? "bg-red-600 text-white shadow-md"
                    : "bg-white text-gray-800 border-2 border-gray-200 hover:border-red-600 hover:shadow-md"
                }`}
              >
                <div className="text-xs capitalize mb-1">{q}</div>
                <div className="text-sm font-bold">
                  ₹{qualityRates[q].toLocaleString("en-IN")}
                </div>
              </button>
            ))}
          </div>

        </div>
      </div>

      {cost > 0 && (
        <div className="space-y-4">
          <Card variant="success">
            <div className="text-center mb-6">
              <p className="text-xs text-gray-600 mb-1">Estimated Total Cost</p>
              <p className="text-4xl font-bold text-red-600">
                ₹{cost.toLocaleString("en-IN")}
              </p>
              <p className="text-xs text-gray-600 mt-2">
                ₹{(cost / areaNum).toFixed(0)}/sqft
              </p>
            </div>

            {/* Cost Breakdown */}
            <div className="space-y-3">
              <p className="text-sm font-semibold text-gray-900 mb-3">Cost Breakdown</p>
              
              {[
                { label: "Materials", amount:materials, color: "bg-blue-500", percentage: 45 },
                { label: "Labor", amount: labor, color: "bg-amber-500", percentage: 35 },
                { label: "Permits & Admin", amount: overhead, color: "bg-orange-500", percentage: 15 },
                { label: "Contingency (5%)", amount: contingency, color: "bg-red-400", percentage: 5 },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-700">{item.label}</span>
                    <span className="text-sm font-semibold text-gray-900">
                      ₹{item.amount.toLocaleString("en-IN")} ({item.percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${item.color}`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t-2 border-gray-200">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-600">Area</p>
                <p className="text-lg font-bold text-gray-900">
                  {areaNum.toLocaleString("en-IN")} sqft
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-600">Floors</p>
                <p className="text-lg font-bold text-gray-900">{floorsNum}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-600">Quality</p>
                <p className="text-sm font-bold text-gray-900 capitalize">{quality}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-600">Rate/sqft/floor</p>
                <p className="text-sm font-bold text-gray-900">₹{rate.toLocaleString("en-IN")}</p>
              </div>
            </div>
          </Card>
        </div>
      )}

      <div className="flex gap-3">
        <Button variant="secondary" onClick={handleReset} className="flex-1">
          Reset
        </Button>
        <Button variant="primary" onClick={onBack} className="flex-1">
          Done
        </Button>
      </div>
    </div>
  )
}
