"use client"

import React from "react"

interface CardProps {
  children: React.ReactNode
  className?: string
  variant?: "default" | "success" | "warning" | "error" | "info"
  hoverable?: boolean
  onClick?: () => void
}

export function Card({
  children,
  className = "",
  variant = "default",
  hoverable = false,
  onClick,
}: CardProps) {
  const variantClasses = {
    default: "bg-white border-gray-200",
    success: "bg-green-50 border-green-200",
    warning: "bg-yellow-50 border-yellow-200",
    error: "bg-red-50 border-red-200",
    info: "bg-blue-50 border-blue-200",
  }

  return (
    <div
      onClick={onClick}
      className={`rounded-none border-2 p-6 transition-all duration-200 ${
        variantClasses[variant]
      } ${hoverable ? "hover:shadow-lg cursor-pointer hover:border-red-300" : "shadow-md"} ${className}`}
    >
      {children}
    </div>
  )
}
