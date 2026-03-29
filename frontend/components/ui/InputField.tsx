"use client"

import React from "react"

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
  helperText?: string
}

const numberInputStyle = `
  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type="number"] {
    -moz-appearance: textfield;
  }
`

export function InputField({
  label,
  error,
  icon,
  helperText,
  className = "",
  ...props
}: InputFieldProps) {
  return (
    <div className="w-full">
      <style>{numberInputStyle}</style>
      {label && (
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          {label}
          {props.required && <span className="text-red-600 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-3.5 text-gray-400">{icon}</div>
        )}
        <input
          className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none placeholder:text-black text-black ${
            icon ? "pl-12" : ""
          } ${
            error
              ? "border-red-500 focus:ring-2 focus:ring-red-200"
              : "border-gray-300 focus:border-red-600 focus:ring-2 focus:ring-red-100"
          } ${className}`}
          {...props}
        />
      </div>
      {error && <p className="text-red-600 text-xs mt-2 font-medium">{error}</p>}
      {helperText && !error && (
        <p className="text-gray-600 text-xs mt-2">{helperText}</p>
      )}
    </div>
  )
}
