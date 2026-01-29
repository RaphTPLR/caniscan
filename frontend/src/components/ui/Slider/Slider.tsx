'use client'

import React from 'react'

type Props = {
  label?: string
  min: number
  max: number
  step?: number
  value: number
  onChange: (value: number) => void
  suffix?: string
  disabled?: boolean
}

export function Slider({ label, min, max, step = 1, value, onChange, suffix, disabled }: Props) {
  return (
    <div className="w-full">
      {label && (
        <div className="mb-1 flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">{label}</label>
          <span className="text-xs text-gray-600">{value}{suffix}</span>
        </div>
      )}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        disabled={disabled}
        className="h-2 w-full cursor-pointer appearance-none rounded bg-gray-200 accent-blue-600"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
      />
    </div>
  )
}


