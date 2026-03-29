import { NextRequest, NextResponse } from "next/server"

interface Message {
  role: "user" | "assistant" | "system"
  content: string
}

// ========================================
// RATE LIMITING & CACHING SYSTEM
// ========================================

// In-memory rate limiting per IP (stores last request timestamp)
const rateLimitMap = new Map<string, number>()
const RATE_LIMIT_MS = 2000 // 2 seconds between requests per IP

// Response caching (stores AI responses for identical queries)
const responseCache = new Map<string, { response: string; timestamp: number }>()
const CACHE_TTL_MS = 3600000 // 1 hour cache TTL

// Request queue (processes one at a time to reduce API load)
const requestQueue: Array<() => Promise<NextResponse>> = []
let isProcessing = false

/**
 * Get client IP address from request
 */
function getClientIP(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for")
  const realIP = request.headers.get("x-real-ip")
  return forwardedFor?.split(",")[0].trim() || realIP || "unknown"
}

/**
 * Check if client has exceeded rate limit
 */
function checkRateLimit(ip: string): boolean {
  const lastRequestTime = rateLimitMap.get(ip)
  if (!lastRequestTime) {
    return true // First request, allow it
  }

  const timeSinceLastRequest = Date.now() - lastRequestTime
  return timeSinceLastRequest >= RATE_LIMIT_MS
}

/**
 * Update rate limit timestamp for IP
 */
function updateRateLimit(ip: string): void {
  rateLimitMap.set(ip, Date.now())
}

/**
 * Get cache key from message (simple hash of first user message)
 */
function getCacheKey(messages: Message[]): string {
  const userMessage = messages.find((m) => m.role === "user")?.content || ""
  return userMessage.toLowerCase().trim().substring(0, 500)
}

/**
 * Check if response is cached
 */
function getCachedResponse(
  cacheKey: string
): string | null {
  const cached = responseCache.get(cacheKey)
  if (!cached) return null

  // Check if cache expired
  if (Date.now() - cached.timestamp > CACHE_TTL_MS) {
    responseCache.delete(cacheKey)
    return null
  }

  return cached.response
}

/**
 * Cache API response
 */
function cacheResponse(cacheKey: string, response: string): void {
  responseCache.set(cacheKey, {
    response,
    timestamp: Date.now(),
  })
}

// Optimized system prompt (shorter to reduce tokens)
const SYSTEM_PROMPT = `You are an expert AI construction consultant for Shubh Construction.

Provide professional guidance on:
- Construction cost estimation & budgeting
- Material recommendations & quality standards
- Timeline planning & project management
- Design optimization & floor planning
- ROI calculations & investment analysis
- Financing options & loan guidance
- Permits, regulations & compliance
- Sustainable construction practices

Be helpful, accurate, and practical. For costs, give ranges (basic/standard/premium). For complex queries, suggest booking a consultation.

Keep responses concise with bullet points. Limit to 5-7 sentences max.`

interface ChatRequest {
  messages: Message[]
}

interface OpenAIMessage {
  role: "user" | "assistant" | "system"
  content: string
}

interface OpenAIResponse {
  id: string
  object: string
  created: number
  model: string
  choices: Array<{
    index: number
    message: {
      role: string
      content: string
    }
    finish_reason: string
  }>
  usage: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const clientIP = getClientIP(request)

    // ✅ RATE LIMITING CHECK
    if (!checkRateLimit(clientIP)) {
      const timeRemaining = Math.ceil(
        (RATE_LIMIT_MS - (Date.now() - (rateLimitMap.get(clientIP) || 0))) / 1000
      )
      return NextResponse.json(
        {
          error: `⚠️ Please wait ${timeRemaining}s before sending another message.`,
        },
        { status: 429 }
      )
    }

    // ✅ DEVELOPMENT MODE - USE MOCK RESPONSES (avoid wasting API calls)
    if (process.env.NODE_ENV === "development") {
      console.log("📝 [DEV MODE] Returning mock response instead of calling OpenAI")

      // Add realistic delay to simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800))

      const mockResponses = [
        "Construction costs in India typically range from ₹1,500-₹3,500 per square foot depending on location, design complexity, and material quality. Basic construction (₹1,500-₹2,000/sqft) is suitable for budget-conscious projects, while premium construction (₹3,000-₹3,500/sqft) includes high-quality finishes and advanced features.",
        "Most residential construction projects in Gujarat take 12-18 months for a standard 2-3 bedroom home, depending on size and complexity. Factors affecting timeline:\n• Clear approvals (1-2 months)\n• Foundation & structure (4-5 months)\n• Interior finishing (4-6 months)\n• Final inspections (1 month)",
        "For a 2BHK apartment (1,200 sqft), expect construction costs:\n• Basic: ₹18-24 lakhs\n• Standard: ₹24-36 lakhs\n• Premium: ₹36-45 lakhs\n\nThese estimates include materials and labor but exclude land acquisition and regulatory fees.",
        "Popular financing options for construction:\n1. Home Loans - 7-8.5% interest rate, 20-year tenure\n2. Construction Loans - Disbursed in phases\n3. Personal Loans - Quick approval, higher interest\n4. Builder Financing - Direct from construction company\n\nWe recommend comparing options with local banks for best rates.",
      ]

      const randomMockResponse =
        mockResponses[Math.floor(Math.random() * mockResponses.length)]

      // Update rate limit
      updateRateLimit(clientIP)

      return NextResponse.json({
        success: true,
        message: randomMockResponse,
        cached: false,
        tokens: 0,
        isDevelopmentMock: true,
      })
    }

    // Validate API key
    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      console.error("❌ OPENAI_API_KEY not configured")
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      )
    }

    // Parse request body
    const body: ChatRequest = await request.json()

    // Validate input
    if (!body.messages || !Array.isArray(body.messages)) {
      return NextResponse.json(
        { error: "Invalid request format. Expected messages array." },
        { status: 400 }
      )
    }

    if (body.messages.length === 0) {
      return NextResponse.json(
        { error: "Messages array cannot be empty" },
        { status: 400 }
      )
    }

    // ✅ CHECK CACHE FIRST
    const cacheKey = getCacheKey(body.messages)
    const cachedResponse = getCachedResponse(cacheKey)

    if (cachedResponse) {
      console.log("✅ Cache hit for query:", cacheKey.substring(0, 50))
      updateRateLimit(clientIP)
      return NextResponse.json({
        success: true,
        message: cachedResponse,
        cached: true,
        tokens: 0,
      })
    }

    // ✅ GLOBAL REQUEST LOCK - PREVENT CONCURRENT API CALLS
    if (isProcessing) {
      console.warn("⚠️ Another request is being processed. Please wait...")
      return NextResponse.json(
        {
          error:
            "⚠️ Server is processing another request. Please wait a moment.",
        },
        { status: 429 }
      )
    }

    isProcessing = true

    try {
      // ✅ LIMIT CONVERSATION HISTORY (keep only last 5 messages)
      const recentMessages = body.messages.slice(-5)

      // Prepare messages for OpenAI API
      const messages: OpenAIMessage[] = [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        ...recentMessages,
      ]

      // Call OpenAI API
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: messages,
          temperature: 0.7,
          max_tokens: 256, // ✅ REDUCED from 1024 to 256
          top_p: 0.9,
        }),
      })

      // ✅ HANDLE OPENAI RATE LIMIT (429)
      if (response.status === 429) {
        console.warn("⚠️ OpenAI API rate limit exceeded")
        return NextResponse.json(
          {
            error:
              "⚠️ Server is busy. Please wait a few seconds before trying again.",
          },
          { status: 429 }
        )
      }

      // Handle OpenAI API errors
      if (!response.ok) {
        const error = await response.json()
        console.error("❌ OpenAI API Error:", error)

        if (response.status === 401) {
          return NextResponse.json(
            { error: "API authentication failed. Check your API key." },
            { status: 401 }
          )
        }

        if (response.status === 500) {
          return NextResponse.json(
            {
              error:
                "OpenAI service unavailable. Please try again in a moment.",
            },
            { status: 503 }
          )
        }

        return NextResponse.json(
          { error: error.error?.message || "Failed to get response from AI" },
          { status: response.status }
        )
      }

      // Parse response
      const data: OpenAIResponse = await response.json()

      // Extract assistant message
      if (
        !data.choices ||
        !data.choices[0] ||
        !data.choices[0].message ||
        !data.choices[0].message.content
      ) {
        console.error("❌ Invalid OpenAI response structure:", data)
        return NextResponse.json(
          { error: "Invalid response from AI service" },
          { status: 500 }
        )
      }

      const assistantMessage = data.choices[0].message.content

      // ✅ CACHE THE RESPONSE
      cacheResponse(cacheKey, assistantMessage)

      // ✅ UPDATE RATE LIMIT FOR THIS IP
      updateRateLimit(clientIP)

      // Return success response
      return NextResponse.json({
        success: true,
        message: assistantMessage,
        cached: false,
        tokens: data.usage.total_tokens,
      })
    } finally {
      // ✅ RELEASE GLOBAL LOCK
      isProcessing = false
    }
  } catch (error) {
    console.error("❌ Chat API Error:", error)

    // Handle different error types
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Invalid request format" },
        { status: 400 }
      )
    }

    if (error instanceof Error) {
      if (error.message.includes("fetch")) {
        return NextResponse.json(
          {
            error:
              "Failed to connect to AI service. Please check your internet connection.",
          },
          { status: 503 }
        )
      }

      return NextResponse.json(
        { error: error.message || "Internal server error" },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    )
  }
}

// Optional: Add GET handler for health check
export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "Chat API",
    message: "Use POST method to send messages",
  })
}
