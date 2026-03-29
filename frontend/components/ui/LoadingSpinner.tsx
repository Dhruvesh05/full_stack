"use client"

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-gray-300 border-t-red-600 rounded-full animate-spin" />
    </div>
  )
}

export function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="h-12 bg-gray-200 rounded-lg animate-pulse"
        />
      ))}
    </div>
  )
}
