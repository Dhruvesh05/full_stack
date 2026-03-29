"use client"

import React, { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { InputField, Button, Card } from "../ui"

interface FloorPlanProps {
  onBack: () => void
}

interface FloorPlanSuggestion {
  type: string
  minArea: number
  maxArea: number
  bedrooms: number
  bathrooms: number
  features: string[]
  icon: string
}

export default function FloorPlan({ onBack }: FloorPlanProps) {
  const [plotSize, setPlotSize] = useState<string>("")
  const [selectedPlan, setSelectedPlan] = useState<FloorPlanSuggestion | null>(
    null
  )

  const floorPlans: FloorPlanSuggestion[] = [
    {
      type: "1BHK",
      minArea: 500,
      maxArea: 800,
      bedrooms: 1,
      bathrooms: 1,
      features: ["Living Room", "Kitchen", "Bedroom", "Bathroom", "Balcony"],
      icon: "S",
    },
    {
      type: "2BHK",
      minArea: 800,
      maxArea: 1200,
      bedrooms: 2,
      bathrooms: 2,
      features: [
        "Living Room",
        "Kitchen",
        "2 Bedrooms",
        "2 Bathrooms",
        "Balcony",
        "Utility",
      ],
      icon: "M",
    },
    {
      type: "3BHK",
      minArea: 1200,
      maxArea: 1800,
      bedrooms: 3,
      bathrooms: 2,
      features: [
        "Living Room",
        "Kitchen",
        "3 Bedrooms",
        "2 Bathrooms",
        "Balcony",
        "Utility",
        "Store",
      ],
      icon: "L",
    },
    {
      type: "4BHK",
      minArea: 1800,
      maxArea: 2500,
      bedrooms: 4,
      bathrooms: 3,
      features: [
        "Living Room",
        "Kitchen",
        "4 Bedrooms",
        "3 Bathrooms",
        "Balcony",
        "Utility",
        "Store",
        "Garden",
      ],
      icon: "XL",
    },
  ]

  const getSuggestions = (area: number) => {
    return floorPlans.filter(
      (plan) => area >= plan.minArea && area <= plan.maxArea
    )
  }

  const suggestions =
    plotSize && parseFloat(plotSize) > 0
      ? getSuggestions(parseFloat(plotSize))
      : []

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
          Floor Plan
        </h3>
      </div>

      <InputField
        label="Plot Size (sq ft)"
        type="number"
        value={plotSize}
        onChange={(e) => {
          setPlotSize(e.target.value)
          setSelectedPlan(null)
        }}
        placeholder="Enter plot size"
      />

      {selectedPlan ? (
        <div className="space-y-4">
          <button
            onClick={() => setSelectedPlan(null)}
            className="flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold transition-colors"
          >
            <ArrowLeft size={20} />
            Back to suggestions
          </button>

          <Card variant="success">
            <div className="text-center mb-6">
              <p className="text-xs font-semibold text-gray-600 mb-2">
                Recommended Layout
              </p>
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-16 h-16 rounded-2xl bg-red-100 border-2 border-red-200 flex items-center justify-center font-bold text-red-600 text-2xl">
                  {selectedPlan.icon}
                </div>
                <div className="text-left">
                  <h4 className="text-2xl font-bold text-gray-900">
                    {selectedPlan.type}
                  </h4>
                  <p className="text-xs text-gray-600 mt-1">
                    {selectedPlan.bedrooms} BR • {selectedPlan.bathrooms} BA
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <Card variant="default">
                <p className="text-xs font-semibold text-gray-600">Size Range</p>
                <p className="text-lg font-bold text-gray-900 mt-2">
                  {selectedPlan.minArea.toLocaleString("en-IN")} - {selectedPlan.maxArea.toLocaleString("en-IN")} sq ft
                </p>
              </Card>
              <Card variant="default">
                <p className="text-xs font-semibold text-gray-600">Features</p>
                <p className="text-lg font-bold text-gray-900 mt-2">
                  {selectedPlan.features.length}
                </p>
              </Card>
            </div>

            <Card variant="default">
              <p className="text-sm font-semibold text-gray-900 mb-3">
                Included Features
              </p>
              <div className="grid grid-cols-2 gap-2">
                {selectedPlan.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="text-xs text-gray-700 flex items-center gap-2"
                  >
                    <span className="w-4 h-4 bg-red-100 rounded-full flex items-center justify-center text-xs text-red-600 font-bold">
                      ✓
                    </span>
                    {feature}
                  </div>
                ))}
              </div>
            </Card>
          </Card>

          <div className="flex gap-3">
            <Button variant="secondary" onClick={() => setSelectedPlan(null)} className="flex-1">
              Back
            </Button>
            <Button variant="primary" onClick={onBack} className="flex-1">
              Done
            </Button>
          </div>
        </div>
      ) : (
        <>
          {plotSize && parseFloat(plotSize) > 0 ? (
            <div className="space-y-4">
              <p className="text-sm font-semibold text-gray-700">
                Available layouts for {parseFloat(plotSize).toLocaleString("en-IN")} sq ft
              </p>

              {suggestions.length > 0 ? (
                <div className="space-y-2">
                  {suggestions.map((plan) => (
                    <button
                      key={plan.type}
                      onClick={() => setSelectedPlan(plan)}
                      className="w-full p-4 bg-white border-2 border-gray-200 rounded-2xl hover:border-red-400 hover:shadow-md transition-all duration-200 text-left group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center font-bold text-red-600 text-lg group-hover:bg-red-100 transition-colors">
                            {plan.icon}
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">{plan.type}</p>
                            <p className="text-xs text-gray-600">
                              {plan.bedrooms} BR • {plan.bathrooms} BA
                            </p>
                          </div>
                        </div>
                        <p className="text-red-600 font-bold group-hover:translate-x-1 transition-transform">
                          →
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <Card variant="warning">
                  <p className="font-semibold text-gray-900 mb-2">No Layouts Available</p>
                  <p className="text-sm text-gray-700">
                    Try adjusting the plot size or contact us for a custom design.
                  </p>
                </Card>
              )}
            </div>
          ) : (
            <Card variant="info">
              <p className="font-semibold text-gray-900 mb-2">Enter your plot size</p>
              <p className="text-sm text-gray-700">
                Tell us the size of your plot to see recommended floor plans
              </p>
            </Card>
          )}
        </>
      )}
    </div>
  )
}
