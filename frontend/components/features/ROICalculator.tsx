"use client"

import React, { useState } from "react"
import { ArrowLeft, TrendingUp } from "lucide-react"
import { InputField, Button, Card, ResultDisplay } from "../ui"

interface ROICalculatorProps {
  onBack: () => void
}

type CardVariant = "default" | "success" | "warning" | "error" | "info"

export default function ROICalculator({ onBack }: ROICalculatorProps) {
  const [totalCost, setTotalCost] = useState<string>("")
  const [monthlyRent, setMonthlyRent] = useState<string>("")

  // Calculate values during render
  const costNum = parseFloat(totalCost) || 0
  const rentNum = parseFloat(monthlyRent) || 0
  
  let roi = 0
  let annualRent = 0
  let breakEvenMonths = 0
  
  if (costNum > 0 && rentNum > 0) {
    annualRent = rentNum * 12
    roi = (annualRent / costNum) * 100
    breakEvenMonths = Math.ceil(costNum / rentNum)
  }

  const handleReset = () => {
    setTotalCost("")
    setMonthlyRent("")
  }

  const getRoiVariant = (): CardVariant => {
    if (roi === 0) return "default"
    if (roi < 5) return "warning"
    if (roi < 15) return "success"
    return "success"
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
          ROI Calculator
        </h3>
      </div>

      <div className="space-y-4">
        <InputField
          label="Total Cost (₹)"
          type="number"
          value={totalCost}
          onChange={(e) => setTotalCost(e.target.value)}
          placeholder="Enter total cost"
        />

        <InputField
          label="Monthly Income (₹)"
          type="number"
          value={monthlyRent}
          onChange={(e) => setMonthlyRent(e.target.value)}
          placeholder="Enter monthly income"
        />
      </div>

      {roi > 0 && (
        <div className="space-y-4">
          {/* ROI Meter */}
          <Card variant={getRoiVariant()}>
            <div className="text-center mb-6">
              <p className="text-xs text-gray-600 mb-2">Annual Return on Investment</p>
              <p className="text-5xl font-bold text-red-600 mb-1">
                {roi.toFixed(2)}%
              </p>
              {roi < 5 && <p className="text-xs font-semibold text-orange-600">❌ Low Returns</p>}
              {roi >= 5 && roi < 10 && <p className="text-xs font-semibold text-yellow-600">⚠️ Moderate Returns</p>}
              {roi >= 10 && roi < 15 && <p className="text-xs font-semibold text-green-600">✓ Good Returns</p>}
              {roi >= 15 && <p className="text-xs font-semibold text-green-700">★ Excellent Returns</p>}
            </div>

            {/* ROI Meter Bar */}
            <div className="space-y-2">
              <div className="flex gap-1 h-12 bg-gray-200 rounded-lg overflow-hidden">
                <div className="flex-1 bg-red-500 flex items-center justify-center text-xs font-bold text-white">
                  {roi <= 5 && roi > 0 && `${roi.toFixed(1)}%`}
                </div>
                {roi > 5 && (
                  <>
                    <div className="flex-1 bg-orange-500 flex items-center justify-center text-xs font-bold text-white">
                      {roi >= 5 && roi < 10 && roi.toFixed(1) + '%'}
                    </div>
                  </>
                )}
                {roi >= 10 && (
                  <>
                    <div className="flex-1 bg-yellow-500 flex items-center justify-center text-xs font-bold text-gray-900">
                      {roi >= 10 && roi < 15 && roi.toFixed(1) + '%'}
                    </div>
                  </>
                )}
                {roi >= 15 && (
                  <>
                    <div className="flex-1 bg-green-500 flex items-center justify-center text-xs font-bold text-white">
                      {roi.toFixed(1)}%
                    </div>
                  </>
                )}
              </div>
              <div className="flex justify-between text-xs text-gray-600 px-1">
                <span>0%</span>
                <span>5%</span>
                <span>10%</span>
                <span>15%+</span>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t-2 border-gray-200">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">Annual Income</p>
                <p className="text-lg font-bold text-gray-900">
                  ₹{annualRent.toLocaleString("en-IN")}
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  ₹{parseFloat(monthlyRent).toLocaleString("en-IN")}/month
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">Break-Even</p>
                <p className="text-lg font-bold text-gray-900">
                  {breakEvenMonths} mo
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  {Math.round(breakEvenMonths / 12)}y {breakEvenMonths % 12}mo
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">5-Year Income</p>
                <p className="text-lg font-bold text-gray-900">
                  ₹{(annualRent * 5).toLocaleString("en-IN")}
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">Total Investment</p>
                <p className="text-lg font-bold text-gray-900">
                  ₹{parseFloat(totalCost).toLocaleString("en-IN")}
                </p>
              </div>
            </div>
          </Card>

          {/* ROI Assessment */}
          <Card
            variant={
              roi < 5 ? "warning" : roi < 15 ? "success" : "success"
            }
          >
            <p className="font-semibold text-gray-900 mb-2">Investment Assessment</p>
            {roi < 5 && (
              <p className="text-sm text-gray-700">
                Low returns. Consider increasing rental income or reducing upfront costs.
              </p>
            )}
            {roi >= 5 && roi < 10 && (
              <p className="text-sm text-gray-700">
                Moderate returns suitable for long-term investors with steady income expectations.
              </p>
            )}
            {roi >= 10 && roi < 15 && (
              <p className="text-sm text-gray-700">
                Good returns! This is a solid investment opportunity with strong income potential.
              </p>
            )}
            {roi >= 15 && (
              <p className="text-sm text-gray-700 font-semibold">
                Excellent returns! A high-potential investment opportunity with outstanding profitability.
              </p>
            )}
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
