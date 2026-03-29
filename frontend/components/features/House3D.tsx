"use client"

import React, { useState, useEffect } from "react"
import { ArrowLeft, RotateCw } from "lucide-react"

interface House3DProps {
  onBack: () => void
}

export default function House3D({ onBack }: House3DProps) {
  const [rotateX, setRotateX] = useState(20)
  const [rotateY, setRotateY] = useState(30)
  const [color, setColor] = useState("#EF4444")
  const [isAutoRotate, setIsAutoRotate] = useState(false)

  useEffect(() => {
    if (!isAutoRotate) return

    const interval = setInterval(() => {
      setRotateY((prev) => (prev + 1) % 360)
    }, 50)

    return () => clearInterval(interval)
  }, [isAutoRotate])

  const colors = [
    { name: "Red", value: "#EF4444" },
    { name: "Blue", value: "#3B82F6" },
    { name: "Green", value: "#10B981" },
    { name: "Gray", value: "#6B7280" },
    { name: "Orange", value: "#F97316" },
    { name: "Purple", value: "#8B5CF6" },
  ]

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
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          3D House Preview
        </h3>
        <p className="text-gray-600">
          Visualize your construction in 3D with custom colors
        </p>
      </div>

      {/* 3D Viewport */}
      <div className="relative w-full h-80 bg-linear-to-br from-blue-100 to-blue-50 rounded-lg overflow-hidden flex items-center justify-center perspective border-2 border-gray-200">
        <style>{`
          @supports (perspective: 1000px) {
            .house-3d-container {
              perspective: 1000px;
              transform-style: preserve-3d;
            }
            
            .house-3d {
              width: 200px;
              height: 200px;
              transform-style: preserve-3d;
              transform: rotateX(${rotateX}deg) rotateY(${rotateY}deg);
              transition: transform 0.1s linear;
            }
            
            .house-face {
              position: absolute;
              width: 100%;
              height: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: bold;
              color: white;
              opacity: 0.9;
              border: 2px solid rgba(255, 255, 255, 0.5);
            }
            
            .front { background-color: ${color}; transform: translateZ(100px); }
            .back { background-color: ${color}; transform: rotateY(180deg) translateZ(100px); }
            .right { background-color: ${color}; transform: rotateY(90deg) translateZ(100px); }
            .left { background-color: ${color}; transform: rotateY(-90deg) translateZ(100px); }
            .top { background-color: ${color}; transform: rotateX(90deg) translateZ(100px); }
            .bottom { background-color: ${color}; transform: rotateX(-90deg) translateZ(100px); }
            
            .roof {
              position: absolute;
              width: 200px;
              height: 120px;
              bottom: 100px;
              left: 0;
              display: flex;
              overflow: hidden;
              perspective: 1000px;
            }
            
            .roof-face {
              flex: 1;
              background-color: ${color};
              opacity: 0.7;
              border: 2px solid rgba(255, 255, 255, 0.5);
              clip-path: polygon(0 100%, 50% 0, 100% 100%);
            }
          }
        `}</style>

        <div className="house-3d-container w-full h-full flex items-center justify-center">
          <div className="house-3d">
            <div className="house-face front">Front</div>
            <div className="house-face back">Back</div>
            <div className="house-face right">Right</div>
            <div className="house-face left">Left</div>
            <div className="house-face top">Top</div>
            <div className="house-face bottom">Bottom</div>
          </div>
        </div>

        {/* Fallback message for non-supporting browsers */}
        <p className="absolute bottom-4 left-4 right-4 text-xs text-gray-600 text-center">
          Tip: Use mouse to rotate or enable Auto-Rotate
        </p>
      </div>

      {/* Controls */}
      <div className="space-y-4">
        {/* Auto Rotate */}
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-gray-700">
            Auto Rotate
          </label>
          <button
            onClick={() => setIsAutoRotate(!isAutoRotate)}
            className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
              isAutoRotate ? "bg-red-600" : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                isAutoRotate ? "translate-x-7" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        {/* Rotation Controls */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Manual Rotation
          </label>
          <div className="space-y-2">
            <div>
              <p className="text-xs text-gray-600 mb-1">X Rotation: {rotateX}°</p>
              <input
                type="range"
                min="-90"
                max="90"
                value={rotateX}
                onChange={(e) => setRotateX(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-red-600"
              />
            </div>
            <div>
              <p className="text-xs text-gray-600 mb-1">Y Rotation: {rotateY}°</p>
              <input
                type="range"
                min="0"
                max="360"
                value={rotateY}
                onChange={(e) => setRotateY(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-red-600"
              />
            </div>
          </div>
        </div>

        {/* Color Selection */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            House Color
          </label>
          <div className="grid grid-cols-3 gap-2">
            {colors.map((c) => (
              <button
                key={c.value}
                onClick={() => setColor(c.value)}
                className={`p-3 rounded-lg text-center transition-all ${
                  color === c.value
                    ? "ring-2 ring-offset-2 ring-red-600"
                    : "hover:shadow-md"
                }`}
              >
                <div
                  className="w-full h-12 rounded mb-2 border-2 border-gray-200"
                  style={{ backgroundColor: c.value }}
                />
                <p className="text-xs font-semibold text-gray-700">{c.name}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Reset Button */}
      <button
        onClick={() => {
          setRotateX(20)
          setRotateY(30)
          setColor("#EF4444")
          setIsAutoRotate(false)
        }}
        className="w-full px-4 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-all flex items-center justify-center gap-2"
      >
        <RotateCw size={20} />
        Reset View
      </button>
    </div>
  )
}
