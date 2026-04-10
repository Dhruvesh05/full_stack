"use client"

import React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "danger"
  size?: "sm" | "md" | "lg"
  isLoading?: boolean
  icon?: React.ReactNode
  fullWidth?: boolean
}

export function Button({
  variant = "primary",
  size = "md",
  isLoading = false,
  icon,
  fullWidth = false,
  children,
  className = "",
  disabled = false,
  ...props
}: ButtonProps) {
  const variantClasses = {
    primary:
      "group relative inline-flex items-center gap-2 bg-white text-red-600 border border-red-600 hover:bg-red-600 hover:text-white",
    secondary:
      "bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-900 border-2 border-gray-300",
    outline:
      "border-2 border-red-600 text-red-600 hover:bg-red-50 active:bg-red-100",
    danger:
      "group relative inline-flex items-center gap-2 bg-white text-red-600 border border-red-600 hover:bg-red-600 hover:text-white",
  }

  const sizeClasses = {
    sm: "px-4 py-2 text-sm rounded-none",
    md: "px-5 py-3 text-base rounded-none",
    lg: "px-7 py-3 text-lg rounded-none",
  }

  return (
    <button
      disabled={disabled || isLoading}
      className={`font-medium transition-all duration-300 ease-out flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${
        variantClasses[variant]
      } ${sizeClasses[size]} ${fullWidth ? "w-full" : ""} ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : icon ? (
        icon
      ) : null}
      {children}
    </button>
  )
}
