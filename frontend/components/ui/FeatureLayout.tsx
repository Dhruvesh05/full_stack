"use client"

import React from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "./Button"

interface FeatureLayoutProps {
  title: string
  description?: string
  onBack: () => void
  children: React.ReactNode
  footer?: React.ReactNode
}

export function FeatureLayout({
  title,
  description,
  onBack,
  children,
  footer,
}: FeatureLayoutProps) {
  return (
    <div className="flex flex-col h-full gap-6">
      {/* Header */}
      <div className="space-y-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onBack}
          icon={<ArrowLeft size={18} />}
          className="self-start"
        >
          Back
        </Button>
        <div>
          <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
          {description && (
            <p className="text-gray-600 text-sm mt-1">{description}</p>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto space-y-4">
        {children}
      </div>

      {/* Footer */}
      {footer && (
        <div className="border-t-2 border-gray-200 pt-6">
          {footer}
        </div>
      )}
    </div>
  )
}
