"use client"

import React from "react"

interface ResultDisplayProps {
  value: string | number
  label: string
  unit?: string
  status?: "positive" | "neutral" | "warning" | "negative"
  icon?: React.ReactNode
  breakdown?: Array<{ label: string; value: string | number }>
}

export function ResultDisplay({
  value,
  label,
  unit,
  status = "neutral",
  icon,
  breakdown,
}: ResultDisplayProps) {
  const statusColors = {
    positive: "from-green-50 to-green-100 border-green-200 text-green-700",
    neutral: "from-gray-50 to-gray-100 border-gray-200 text-gray-700",
    warning: "from-yellow-50 to-yellow-100 border-yellow-200 text-yellow-700",
    negative: "from-red-50 to-red-100 border-red-200 text-red-700",
  }

  return (
    <div className={`bg-linear-to-br ${statusColors[status]} rounded-2xl border-2 p-6 shadow-md`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{label}</p>
          <div className="flex items-baseline gap-1">
            <p className="text-4xl font-bold">{value}</p>
            {unit && <p className="text-lg font-medium text-gray-500">{unit}</p>}
          </div>
        </div>
        {icon && <div className="text-4xl">{icon}</div>}
      </div>

      {breakdown && breakdown.length > 0 && (
        <div className="mt-6 pt-6 border-t-2 space-y-2">
          {breakdown.map((item, idx) => (
            <div key={idx} className="flex justify-between text-sm">
              <span className="text-gray-600">{item.label}</span>
              <span className="font-semibold">{item.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
