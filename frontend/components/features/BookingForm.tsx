"use client"

import React, { useState, useEffect } from "react"
import { ArrowLeft, CheckCircle } from "lucide-react"
import emailjs from "@emailjs/browser"
import { InputField, Button, Card } from "../ui"

interface BookingFormProps {
  onBack: () => void
}

export default function BookingForm({ onBack }: BookingFormProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [submitError, setSubmitError] = useState<string>("")

  // Admin email from environment variables
  const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "shubhconstruction@gmail.com"

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "")
  }, [])

  // Get minimum date (today)
  const today = new Date().toISOString().split("T")[0]

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Please enter a valid email"
    if (!formData.phone.trim()) newErrors.phone = "Phone is required"
    else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, "")))
      newErrors.phone = "Please enter a valid 10-digit phone number"

    return newErrors
  }

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.date) newErrors.date = "Date is required"
    if (!formData.time) newErrors.time = "Time is required"

    return newErrors
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    const step1Errors = validateStep1()
    const step2Errors = validateStep2()
    return { ...step1Errors, ...step2Errors }
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (step === 1) {
      const step1Errors = validateStep1()
      if (Object.keys(step1Errors).length === 0) {
        setErrors({})
        setSubmitError("")
        setStep(2)
      } else {
        setErrors(step1Errors)
      }
    } else {
      const allErrors = validateForm()
      if (Object.keys(allErrors).length === 0) {
        setIsLoading(true)
        setSubmitError("")

        try {
          // Template parameters - EXACT MATCH with EmailJS template variables
          const templateParams = {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            date: formData.date,
            time: formData.time,
            message: formData.message || "No message provided",
          }

          // 1. SEND ADMIN EMAIL (to business owner)
          await emailjs.send(
            process.env.NEXT_PUBLIC_EMAILJS_BOOKING_SERVICE_ID || "",
            process.env.NEXT_PUBLIC_EMAILJS_ADMIN_TEMPLATE_ID || "",
            {
              ...templateParams,
              to_email: ADMIN_EMAIL, // Send to admin
              from_name: formData.name,
              reply_to: formData.email,
            }
          )

          // 2. SEND USER CONFIRMATION EMAIL (to customer)
          await emailjs.send(
            process.env.NEXT_PUBLIC_EMAILJS_BOOKING_SERVICE_ID || "",
            process.env.NEXT_PUBLIC_EMAILJS_USER_TEMPLATE_ID || "",
            {
              ...templateParams,
              to_email: formData.email, // Send to user
              from_name: "Shubh Construction",
            }
          )

          // Success - show confirmation
          console.log("✅ Booking submitted successfully:", formData)
          setIsSubmitted(true)

          // Reset form after 3 seconds
          setTimeout(() => {
            setFormData({
              name: "",
              email: "",
              phone: "",
              date: "",
              time: "",
              message: "",
            })
            setIsSubmitted(false)
            setStep(1)
            setIsLoading(false)
          }, 3000)
        } catch (error) {
          console.error("❌ Email send failed:", error)
          const errorMessage =
            error instanceof Error
              ? error.message
              : "Failed to send booking. Please try again."
          setSubmitError(errorMessage)
          setIsLoading(false)
        }
      } else {
        setErrors(allErrors)
      }
    }
  }

  const handleBackStep = () => {
    if (step === 1) {
      onBack()
    } else {
      setStep(1)
      setErrors({})
    }
  }

  if (isSubmitted) {
    return (
      <div className="space-y-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold transition-colors"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        <div className="text-center py-12">
          <CheckCircle
            size={64}
            className="text-green-600 mx-auto mb-4"
            strokeWidth={1.5}
          />
          <h3 className="text-2xl font-bold text-black mb-2">
            Booking Confirmed
          </h3>
          <p className="text-black mb-6">
            Thank you for booking a consultation with us. We&apos;ll contact you shortly.
          </p>
          <Card variant="success">
            <div className="space-y-2 text-left">
              <p>
                <span className="font-semibold text-black">Name:</span>{" "}
                {formData.name}
              </p>
              <p>
                <span className="font-semibold text-black">Email:</span>{" "}
                {formData.email}
              </p>
              <p>
                <span className="font-semibold text-black">Phone:</span>{" "}
                {formData.phone}
              </p>
              <p>
                <span className="font-semibold text-black">Date:</span>{" "}
                {formData.date}
              </p>
              <p>
                <span className="font-semibold text-black">Time:</span>{" "}
                {formData.time}
              </p>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <button
        onClick={handleBackStep}
        className="flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold transition-colors"
      >
        <ArrowLeft size={20} />
        Back
      </button>

      <div>
        <h3 className="text-2xl font-bold text-black">
          Book Consultation
        </h3>
        <p className="text-black text-sm mt-1">
          Step {step} of 2
        </p>
      </div>

      {/* Progress Bar */}
      <div className="flex gap-2 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div className={`flex-1 bg-red-600 transition-all duration-300 ${step === 1 ? "w-1/2" : "w-full"}`} />
        {step === 1 && <div className="flex-1 bg-gray-200" />}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {step === 1 ? (
          <div className="space-y-4 animate-in fade-in duration-300">
            {/* Step 1: Personal Info */}
            <InputField
              label="Full Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your full name"
              error={errors.name}
              required
            />

            <InputField
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              error={errors.email}
              required
            />

            <InputField
              label="Phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="10-digit number"
              error={errors.phone}
              required
            />

            <div className="flex gap-3 pt-4">
              <Button variant="secondary" onClick={handleBackStep} className="flex-1">
                Back
              </Button>
              <Button variant="primary" type="submit" className="flex-1">
                Next
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4 animate-in fade-in duration-300">
            {/* Step 2: Schedule */}
            <InputField
              label="Preferred Date"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              error={errors.date}
              min={today}
              required
            />

            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Preferred Time
              </label>
              <select
                name="time"
                value={formData.time}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all text-black ${
                  errors.time ? "border-red-500" : "border-gray-200"
                }`}
              >
                <option value="">Select a time</option>
                <option value="09:00">09:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="02:00">02:00 PM</option>
                <option value="03:00">03:00 PM</option>
                <option value="04:00">04:00 PM</option>
              </select>
              {errors.time && (
                <p className="text-red-500 text-xs mt-1">{errors.time}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Message (Optional)
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Project details..."
                rows={3}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all resize-none text-black placeholder:text-black"
              />
            </div>

            {/* Error Message Display */}
            {submitError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm font-semibold">❌ Error</p>
                <p className="text-red-600 text-xs mt-1">{submitError}</p>
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <Button 
                variant="secondary" 
                onClick={handleBackStep} 
                className="flex-1"
                disabled={isLoading}
              >
                Back
              </Button>
              <Button 
                variant="primary" 
                type="submit" 
                className="flex-1"
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Confirm Booking"}
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}
