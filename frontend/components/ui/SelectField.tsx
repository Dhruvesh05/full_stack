"use client"

import React from "react"

interface SelectFieldProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
  helperText?: string
  options: Array<{ value: string; label: string }>
}

export function SelectField({
  label,
  error,
  icon,
  helperText,
  options,
  className = "",
  ...props
}: SelectFieldProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          {label}
          {props.required && <span className="text-red-600 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-3.5 text-gray-400 pointer-events-none">
            {icon}
          </div>
        )}
        <select
          className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none appearance-none text-black ${
            icon ? "pl-12" : ""
          } ${
            error
              ? "border-red-500 focus:ring-2 focus:ring-red-200"
              : "border-gray-300 focus:border-red-600 focus:ring-2 focus:ring-red-100"
          } ${className}`}
          {...props}
        >
          <option value="">Select...</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="text-black">
              {opt.label}
            </option>
          ))}
        </select>
        <div className="absolute right-4 top-3.5 pointer-events-none text-gray-400">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
      {error && <p className="text-red-600 text-xs mt-2 font-medium">{error}</p>}
      {helperText && !error && (
        <p className="text-gray-600 text-xs mt-2">{helperText}</p>
      )}
    </div>
  )
}
