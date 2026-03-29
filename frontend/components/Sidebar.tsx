"use client"

import React, { useState, useEffect, useRef } from "react"
import { X, DollarSign, Grid3x3, TrendingUp, MapPin, MessageSquare, Calendar } from "lucide-react"
import CostEstimator from "./features/CostEstimator"
import BookingForm from "./features/BookingForm"
import LocationCost from "./features/LocationCost"
import ChatBot from "./features/ChatBot"
import FloorPlan from "./features/FloorPlan"
import ROICalculator from "./features/ROICalculator"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export type FeatureType =
  | "cost-estimator"
  | "booking"
  | "location-cost"
  | "chat"
  | "floor-plan"
  | "roi"
  | null

interface FeatureItem {
  id: FeatureType
  label: string
  category: "planning" | "financial" | "smart"
  icon: React.ReactNode
  description: string
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [activeFeature, setActiveFeature] = useState<FeatureType>(null)
  const sidebarRef = useRef<HTMLDivElement>(null)

  // Handle ESC key to close sidebar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (activeFeature) {
          setActiveFeature(null)
        } else {
          onClose()
        }
      }
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown)
      document.addEventListener("mousedown", handleClickOutside)
      return () => {
        document.removeEventListener("keydown", handleKeyDown)
        document.removeEventListener("mousedown", handleClickOutside)
      }
    }
  }, [isOpen, activeFeature, onClose])

  const features: FeatureItem[] = [
    {
      id: "cost-estimator",
      label: "Cost Estimator",
      category: "planning",
      icon: <DollarSign size={20} />,
      description: "Calculate construction costs",
    },
    {
      id: "floor-plan",
      label: "Floor Plan",
      category: "planning",
      icon: <Grid3x3 size={20} />,
      description: "Design your layout",
    },
    {
      id: "roi",
      label: "ROI Calculator",
      category: "financial",
      icon: <TrendingUp size={20} />,
      description: "Investment returns analysis",
    },
    {
      id: "location-cost",
      label: "Location Cost",
      category: "financial",
      icon: <MapPin size={20} />,
      description: "Regional rates comparison",
    },
    {
      id: "chat",
      label: "AI Assistant",
      category: "smart",
      icon: <MessageSquare size={20} />,
      description: "Expert guidance and advice",
    },
    {
      id: "booking",
      label: "Book Consultation",
      category: "smart",
      icon: <Calendar size={20} />,
      description: "Schedule with experts",
    },
  ]

  const categories = [
    { id: "planning", label: "Planning Tools" },
    { id: "financial", label: "Financial Tools" },
    { id: "smart", label: "Smart Tools" },
  ]

  const handleFeatureClick = (featureId: FeatureType) => {
    setActiveFeature(featureId)
  }

  const handleBack = () => {
    setActiveFeature(null)
  }

  const renderFeature = () => {
    switch (activeFeature) {
      case "cost-estimator":
        return <CostEstimator onBack={handleBack} />
      case "booking":
        return <BookingForm onBack={handleBack} />
      case "location-cost":
        return <LocationCost onBack={handleBack} />
      case "chat":
        return <ChatBot onBack={handleBack} />
      case "floor-plan":
        return <FloorPlan onBack={handleBack} />
      case "roi":
        return <ROICalculator onBack={handleBack} />
      default:
        return null
    }
  }

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`fixed top-0 right-0 h-screen w-full sm:w-96 bg-white shadow-2xl z-50 transition-all duration-300 ease-out transform flex flex-col ${
          isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b-2 border-gray-200 bg-linear-to-r from-red-600 to-red-700 sticky top-0 z-10">
          <div>
            <h2 className="text-xl font-bold text-white">
              {activeFeature ? "Feature" : "Tools & Features"}
            </h2>
            {!activeFeature && (
              <p className="text-red-100 text-xs mt-1">
                Select a tool to get started
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Close sidebar"
            title="Close (ESC)"
          >
            <X size={24} className="text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {activeFeature ? (
            <div className="p-6 animate-in fade-in duration-300">
              {renderFeature()}
            </div>
          ) : (
            <div className="p-6 space-y-6 animate-in fade-in duration-300">
              {categories.map((category) => {
                const categoryFeatures = features.filter(
                  (f) => f.category === category.id as "planning" | "financial" | "smart"
                )

                return (
                  <div key={category.id}>
                    <h3 className="text-sm font-bold text-gray-900 mb-3 px-2 tracking-wider uppercase">
                      {category.label}
                    </h3>
                    <div className="space-y-2">
                      {categoryFeatures.map((feature) => (
                        <button
                          key={feature.id}
                          onClick={() =>
                            handleFeatureClick(feature.id as FeatureType)
                          }
                          className={`w-full p-3 rounded-xl border-2 transition-all duration-200 text-left group ${
                            activeFeature === feature.id
                              ? "bg-linear-to-r from-red-50 to-red-100 border-red-600 shadow-md"
                              : "bg-white border-gray-200 hover:border-red-400 hover:bg-red-50 hover:shadow-sm"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`transition-all duration-200 flex items-center justify-center ${
                              activeFeature === feature.id
                                ? "text-red-600 scale-110"
                                : "text-gray-700 group-hover:text-red-600"
                            }`}>
                              {feature.icon}
                            </div>
                            <div className="flex-1">
                              <p className={`font-semibold transition-colors duration-200 ${
                                activeFeature === feature.id
                                  ? "text-red-700"
                                  : "text-gray-900 group-hover:text-red-700"
                              }`}>
                                {feature.label}
                              </p>
                              <p className="text-xs text-gray-700 mt-0.5">
                                {feature.description}
                              </p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t-2 border-gray-200 bg-gray-50/50 sticky bottom-0">
          {activeFeature ? (
            <button
              onClick={handleBack}
              className="text-red-600 hover:text-red-700 font-semibold text-sm transition-colors text-center w-full"
            >
              Back to features
            </button>
          ) : (
            <p className="text-xs text-gray-700 text-center font-medium">
              Press ESC to close • Click outside to dismiss
            </p>
          )}
        </div>
      </aside>
    </>
  )
}
