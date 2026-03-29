"use client"

import React, { useState, useRef, useEffect } from "react"
import { ArrowLeft, Send } from "lucide-react"

interface ChatBotProps {
  onBack: () => void
}

interface ChatMessage {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
  isError?: boolean
}

interface APIMessage {
  role: "user" | "assistant"
  content: string
}

export default function ChatBot({ onBack }: ChatBotProps) {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      id: "init",
      content:
        "Hi! I'm your Shubh Construction AI assistant. Ask me about construction costs, design, materials, financing, ROI, or any other construction-related topics. How can I help you today?",
      role: "assistant",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>("")
  const [cooldownTime, setCooldownTime] = useState<number>(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const lastApiCallTimeRef = useRef<number>(0)
  const isRequestPendingRef = useRef<boolean>(false)
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)
  const cooldownIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const COOLDOWN_MS = 1500 // 1.5 seconds between API calls
  const DEBOUNCE_MS = 500 // 500ms debounce for quick suggestions

  const quickSuggestions = [
    "What's the cost per sqft?",
    "How long does construction take?",
    "2BHK cost estimate",
    "Financing options",
  ]

  // Auto-scroll to latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [chatHistory])

  // Check if API call is allowed (cooldown system)
  const canMakeApiCall = (): boolean => {
    const now = Date.now()
    const timeSinceLastCall = now - lastApiCallTimeRef.current
    return timeSinceLastCall >= COOLDOWN_MS && !isRequestPendingRef.current
  }

  // Send message to API
  const sendMessage = async (userMessage: string): Promise<void> => {
    // Input validation
    if (!userMessage.trim()) return
    if (isLoading || isRequestPendingRef.current || cooldownTime > 0) return

    setError("")
    isRequestPendingRef.current = true
    setIsLoading(true)

    // Add user message to chat immediately
    const userMessageId = `msg-${Date.now()}-user`
    const newUserMessage: ChatMessage = {
      id: userMessageId,
      content: userMessage,
      role: "user",
      timestamp: new Date(),
    }

    setChatHistory((prev) => [...prev, newUserMessage])
    setInput("")

    // Add typing indicator
    const typingIndicatorId = `msg-${Date.now()}-typing`
    const typingMessage: ChatMessage = {
      id: typingIndicatorId,
      content: "Typing...",
      role: "assistant",
      timestamp: new Date(),
      isError: false,
    }

    setChatHistory((prev) => [...prev, typingMessage])

    try {
      // Prepare messages for API (exclude error messages)
      const messagesForAPI: APIMessage[] = chatHistory
        .filter((msg) => !msg.isError)
        .map((msg) => ({
          role: msg.role,
          content: msg.content,
        }))
        .concat({
          role: "user",
          content: userMessage,
        })

      // Call our chat API with timeout
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 15000) // 15s timeout

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: messagesForAPI,
        }),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      const data = await response.json()

      // Update last API call time
      lastApiCallTimeRef.current = Date.now()

      // ✅ HANDLE 429 RATE LIMIT ERROR
      if (response.status === 429) {
        // Remove typing indicator
        setChatHistory((prev) => prev.filter((msg) => msg.id !== typingIndicatorId))

        // Show error message
        const errorMessage = data.error || "⚠️ Please wait before sending another message."
        setError(errorMessage)

        // Start cooldown countdown (2 seconds)
        setCooldownTime(2)

        const errorChatMessage: ChatMessage = {
          id: `msg-${Date.now()}-429`,
          content: errorMessage,
          role: "assistant",
          timestamp: new Date(),
          isError: true,
        }

        setChatHistory((prev) => [...prev, errorChatMessage])

        // Start countdown timer
        let remaining = 2
        if (cooldownIntervalRef.current) {
          clearInterval(cooldownIntervalRef.current)
        }

        cooldownIntervalRef.current = setInterval(() => {
          remaining--
          setCooldownTime(remaining)

          if (remaining <= 0) {
            if (cooldownIntervalRef.current) {
              clearInterval(cooldownIntervalRef.current)
            }
          }
        }, 1000)

        isRequestPendingRef.current = false
        setIsLoading(false)
        return
      }

      if (!response.ok) {
        throw new Error(
          data.error ||
            `API Error (${response.status}): Failed to get response from AI`
        )
      }

      if (!data.message) {
        throw new Error("No response received from AI")
      }

      // Remove typing indicator and add actual response
      const assistantMessage: ChatMessage = {
        id: `msg-${Date.now()}-assistant`,
        content: data.message,
        role: "assistant",
        timestamp: new Date(),
      }

      setChatHistory((prev) =>
        prev.map((msg) =>
          msg.id === typingIndicatorId ? assistantMessage : msg
        )
      )
    } catch (err) {
      // Remove typing indicator
      setChatHistory((prev) => prev.filter((msg) => msg.id !== typingIndicatorId))

      let errorMessage = "Failed to send message"

      if (err instanceof Error) {
        errorMessage = err.message
      } else if (err instanceof DOMException && err.name === "AbortError") {
        errorMessage = "⏱️ Request timeout. Please try again."
      }

      setError(errorMessage)

      // Add error message to chat
      const errorChatMessage: ChatMessage = {
        id: `msg-${Date.now()}-error`,
        content: `❌ ${errorMessage}`,
        role: "assistant",
        timestamp: new Date(),
        isError: true,
      }

      setChatHistory((prev) => [...prev, errorChatMessage])

      console.error("Chat error:", err)
    } finally {
      isRequestPendingRef.current = false
      setIsLoading(false)
    }
  }

  const handleSend = async (): Promise<void> => {
    if (!input.trim() || isLoading || cooldownTime > 0) return
    await sendMessage(input)
  }

  const handleQuickSuggestion = async (suggestion: string): Promise<void> => {
    if (isLoading || isRequestPendingRef.current || cooldownTime > 0) return

    // Clear any existing debounce timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }

    // Debounce the API call
    debounceTimerRef.current = setTimeout(async () => {
      await sendMessage(suggestion)
    }, DEBOUNCE_MS)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      if (!isLoading && input.trim()) {
        handleSend()
      }
    }
  }

  return (
    <div className="h-screen flex flex-col space-y-3">
      {/* Header */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold transition-colors"
      >
        <ArrowLeft size={20} />
        Back
      </button>

      <div>
        <h3 className="text-2xl font-bold text-black mb-1">
          Construction AI Expert
        </h3>
        <p className="text-sm text-black">
          Powered by AI | Expert Guidance on Demand
        </p>
      </div>

      {/* Chat Messages Container */}
      <div className="flex-1 bg-white rounded-lg border border-gray-200 overflow-y-auto p-4 space-y-3 flex flex-col">
        {chatHistory.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs px-4 py-3 rounded-lg text-sm transition-all ${
                message.role === "user"
                  ? "bg-red-600 text-white rounded-br-none"
                  : message.isError
                    ? "bg-red-50 text-red-700 border border-red-200 rounded-bl-none"
                    : "bg-gray-100 text-black border border-gray-300 rounded-bl-none"
              }`}
            >
              <p className="whitespace-pre-wrap break-words leading-relaxed">
                {message.content}
              </p>
              <p
                className={`text-xs mt-2 ${
                  message.role === "user"
                    ? "text-red-100"
                    : message.isError
                      ? "text-red-600"
                      : "text-gray-600"
                }`}
              >
                {message.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        ))}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 rounded-lg rounded-bl-none px-4 py-3">
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                />
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Quick Suggestions - Show only at start */}
        {chatHistory.length === 1 && !isLoading && (
          <div className="flex-1 flex flex-col justify-end pt-4">
            <p className="text-xs text-gray-600 mb-3 px-2">
              Quick questions:
            </p>
            <div className="flex flex-wrap gap-2">
              {quickSuggestions.map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuickSuggestion(suggestion)}
                  disabled={isLoading}
                  className="px-3 py-2 bg-red-50 border border-red-300 text-red-700 rounded-full text-xs font-semibold hover:bg-red-100 hover:border-red-500 transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="space-y-2">
        {error && (
          <div className="p-2 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-xs">{error}</p>
          </div>
        )}

        {cooldownTime > 0 && (
          <div className="p-2 bg-yellow-50 border border-yellow-300 rounded-lg">
            <p className="text-yellow-700 text-xs font-semibold">
              ⏱️ Please wait {cooldownTime}s before sending another message...
            </p>
          </div>
        )}

        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about construction..."
            disabled={isLoading || cooldownTime > 0}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading || isRequestPendingRef.current || cooldownTime > 0}
            className={`px-4 py-3 rounded-lg font-semibold flex items-center justify-center transition-all ${
              cooldownTime > 0
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-red-600 text-white hover:bg-red-700" 
            } disabled:opacity-60 disabled:cursor-not-allowed`}
            aria-label="Send message"
            title={
              cooldownTime > 0
                ? `Please wait ${cooldownTime} seconds...`
                : isLoading
                  ? "Waiting for response..."
                  : "Send message"
            }
          >
            {cooldownTime > 0 ? (
              <span className="text-xs font-bold">{cooldownTime}s</span>
            ) : (
              <Send size={18} />
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

