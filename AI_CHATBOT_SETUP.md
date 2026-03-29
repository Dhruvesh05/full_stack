# AI Chatbot Integration - Complete Setup Guide

## 🎯 What's Been Implemented

A **production-ready AI chatbot system** for your construction website using OpenAI's GPT-4o-mini model. The system includes:

- ✅ Backend API route (`/app/api/chat/route.ts`)
- ✅ Frontend ChatBot component (updated)
- ✅ Secure API key handling
- ✅ Error handling & validation
- ✅ Message history management
- ✅ Loading states & UX improvements
- ✅ TypeScript support
- ✅ Production-ready code

---

## 🔧 Setup Instructions

### Step 1: Get OpenAI API Key

1. Visit [OpenAI Platform](https://platform.openai.com/account/api-keys)
2. Create a new API key
3. Copy your API key (you won't see it again!)

### Step 2: Update Environment Variables

Edit `frontend/.env.local`:

```env
OPENAI_API_KEY=sk_your_actual_api_key_here
```

**IMPORTANT:**
- Replace `sk_your_actual_api_key_here` with your real API key
- DO NOT commit this file to git
- This key is ONLY used on the backend (not exposed to frontend)

### Step 3: Verify Environment Setup

Current `.env.local` variables:

```env
# Existing variables (unchanged)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=QOb_xBt23OVQYCiZS
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_kzymcvb
NEXT_PUBLIC_EMAILJS_ADMIN_TEMPLATE_ID=template_gtnftin
NEXT_PUBLIC_EMAILJS_USER_TEMPLATE_ID=template_oy5t6us
NEXT_PUBLIC_ADMIN_EMAIL=shubhconstruction@gmail.com

# NEW - OpenAI Configuration
OPENAI_API_KEY=sk_your_actual_api_key_here
```

### Step 4: Restart Next.js Dev Server

```bash
# Stop current server (Ctrl+C)
# Navigate to frontend directory
cd frontend

# Start fresh
npm run dev
```

**Important:** Next.js requires a restart to pick up new .env.local variables!

### Step 5: Test the Chatbot

1. Open your app in browser
2. Navigate to the ChatBot feature (usually in sidebar/menu)
3. Try a quick suggestion button first
4. Type a custom question
5. You should see the AI respond!

---

## 📁 Files Created/Modified

### Created:
- **`/app/api/chat/route.ts`** - Backend API endpoint for AI chat

### Modified:
- **`/components/features/ChatBot.tsx`** - Updated with real API integration
- **`.env.local`** - Added OPENAI_API_KEY

---

## 🏗️ System Architecture

```
User Input (ChatBot.tsx)
    ↓
handleSend() function
    ↓
POST /api/chat
    ↓
Backend Route (/app/api/chat/route.ts)
    ↓
OpenAI API (gpt-4o-mini)
    ↓
Return Message
    ↓
Display in Chat UI
```

---

## 💡 How It Works

### Frontend (ChatBot.tsx)

1. User types message and hits Send
2. Message added to UI immediately
3. `sendMessage()` function calls `/api/chat`
4. Shows loading state (animated dots)
5. Receives response and displays it

```typescript
// Frontend sends this format:
{
  messages: [
    { role: "user", content: "What's the cost per sqft?" },
    { role: "assistant", content: "..." },
    { role: "user", content: "..." }
  ]
}
```

### Backend (/app/api/chat/route.ts)

1. Receives messages array
2. Adds system prompt (construction expert context)
3. Calls OpenAI API
4. Returns response to frontend

```typescript
// Backend sends to OpenAI:
{
  model: "gpt-4o-mini",
  messages: [
    { role: "system", content: "You are an expert AI construction consultant..." },
    { role: "user", content: "What's the cost per sqft?" },
    ...
  ],
  temperature: 0.7,
  max_tokens: 1024
}
```

---

## 🔐 Security Features

✅ **API Key Protection:**
- OPENAI_API_KEY is NOT exposed in frontend
- No `NEXT_PUBLIC_` prefix (server-only)
- Backend makes API calls only

✅ **Error Handling:**
- Invalid requests rejected
- API errors caught and reported
- Sensitive info not leaked

✅ **Rate Limiting:**
- OpenAI handles rate limiting
- Error messages are user-friendly

---

## 🎨 UI Features

### Message Types
- **User Messages** → Right-aligned, Red background
- **Bot Messages** → Left-aligned, Gray background
- **Error Messages** → Red background with error icon
- **Loading State** → Animated dots indicator

### Quick Suggestions
- Visible only on initial state
- Click to auto-send questions
- Helpful for first-time users

### Input Features
- Disabled while loading
- Enter key sends message
- Shift+Enter for new lines (future enhancement)
- Character limit: ~4000 (API limit)

---

## 🛠️ Customization

### Change the AI Personality

Edit the `SYSTEM_PROMPT` in `/app/api/chat/route.ts`:

```typescript
const SYSTEM_PROMPT = `You are an expert AI construction consultant for Shubh Construction. You provide professional guidance on:

- Construction cost estimation and budgeting
- Material recommendations and quality standards
- Timeline planning and project management
- Design and layout optimization
- ROI calculations and investment analysis
- Financing options and loan guidance
- Permits, regulations, and compliance
- Sustainable and eco-friendly construction
- Floor planning and space utilization
- Quality standards and safety practices

Always be helpful, accurate, and provide practical advice...`
```

### Change AI Model

In `/app/api/chat/route.ts`, change this line:

```typescript
model: "gpt-4o-mini",  // Change to "gpt-4", "gpt-3.5-turbo", etc.
```

**Model Comparison:**
- `gpt-4o-mini` - Fast, cheap, good for construction advice ✅ (Current)
- `gpt-4` - Better reasoning, slower, expensive
- `gpt-3.5-turbo` - Legacy, cheap but lower quality

### Change Temperature (Creativity)

```typescript
temperature: 0.7,  // Range: 0-2.0
// 0 = Deterministic, always same response
// 0.7 = Balanced (default)
// 1.5+ = Creative, random responses
```

### Change Max Tokens (Response Length)

```typescript
max_tokens: 1024,  // Max length of response (1 token ≈ 4 characters)
```

---

## 🔍 Testing & Debugging

### Test 1: Check API Connection

Open browser console (F12) and check for errors:

```
✅ No errors = API working
❌ 401 error = Invalid API key
❌ 429 error = Rate limited
❌ 503 error = OpenAI service down
```

### Test 2: Check Backend Logs

When running `npm run dev`, check terminal for backend logs:

```
✅ POST /api/chat 200
❌ POST /api/chat 401
❌ POST /api/chat 500
```

### Test 3: Monitor API Usage

Check [OpenAI Dashboard](https://platform.openai.com/account/billing/usage):

- View current usage
- Set budget limits
- Check remaining credits

---

## 📊 Cost Estimation

**gpt-4o-mini pricing (as of 2024):**
- Input: $0.15 per 1M tokens
- Output: $0.60 per 1M tokens

**Example:**
- Average message: ~150 input tokens + 200 output tokens
- Cost per message: ~$0.00015
- 1000 messages: ~$0.15

---

## 🚨 Troubleshooting

### Issue: "API key not configured"

**Solution:**
1. Check `.env.local` has `OPENAI_API_KEY`
2. Restart Next.js dev server
3. Verify key starts with `sk_`

### Issue: "Rate limit exceeded"

**Cause:** Too many requests in short time

**Solution:**
- Wait a few minutes
- Check OpenAI pricing plan
- Consider upgrade if heavy usage

### Issue: "Empty responses from AI"

**Cause:** Message format issue

**Solution:**
1. Check browser console for errors
2. Verify chat messages array format
3. Check OpenAI API status

### Issue: "Failed to connect to AI service"

**Cause:** Network issue or OpenAI down

**Solution:**
1. Check internet connection
2. Visit [OpenAI Status](https://status.openai.com)
3. Try again after a minute

---

## 📈 Performance Optimization

### 1. Message History Limit

Currently keeps all messages. For long chats, limit history:

```typescript
// In ChatBot.tsx sendMessage function
const recentMessages = chatHistory.slice(-10) // Last 10 messages only
const messagesForAPI: APIMessage[] = recentMessages
  .filter(msg => !msg.isError)
  .map(msg => ({ role: msg.role, content: msg.content }))
```

### 2. Add Caching

Cache common questions:

```typescript
const responseCache = new Map<string, string>()

// Check cache first
if (responseCache.has(userMessage)) {
  return responseCache.get(userMessage)
}

// Fetch from API
const response = await fetch("/api/chat", ...)
responseCache.set(userMessage, response.message)
```

### 3. Rate Limiting on Frontend

Prevent rapid-fire requests:

```typescript
const [lastMessageTime, setLastMessageTime] = useState(0)

const handleSend = async () => {
  const now = Date.now()
  if (now - lastMessageTime < 1000) return // Min 1 second between messages
  setLastMessageTime(now)
  // ... rest of code
}
```

---

## ✅ Production Checklist

Before deploying to production:

- [ ] Update OPENAI_API_KEY with production key
- [ ] Set proper rate limits
- [ ] Enable error logging/monitoring
- [ ] Set API budget limits in OpenAI
- [ ] Test with real user data
- [ ] Monitor API costs daily
- [ ] Set up alerts if ratio hits 90% budget
- [ ] Have fallback message if API fails
- [ ] Document the system for team
- [ ] Create backup plan if OpenAI unavailable

---

## 🎓 Learning Resources

- [OpenAI API Docs](https://platform.openai.com/docs/api-reference)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [TypeScript Guide](https://www.typescriptlang.org/docs/)

---

## 📞 Support

If issues persist:

1. Check [OpenAI Status Page](https://status.openai.com)
2. Review error logs in browser console
3. Verify API key validity
4. Check OpenAI API documentation
5. Contact OpenAI support if API issue

---

## 🎉 What's Next?

### Enhancement Ideas:

1. **Save Chat History** - Store in localStorage or database
2. **Export Chat** - PDF or text download
3. **Voice Input** - Speech-to-text integration
4. **Image Support** - Send project images for analysis
5. **Cost Tracking** - Monitor API usage per user
6. **Feedback System** - Rate responses (good/bad)
7. **Analytics** - Track popular questions
8. **Integration** - Auto-fill forms from chat data

---

## 📝 Quick Reference

| Component | File | Purpose |
|-----------|------|---------|
| ChatBot UI | `/components/features/ChatBot.tsx` | Frontend interface |
| API Route | `/app/api/chat/route.ts` | Backend processor |
| Environment | `/.env.local` | Configuration |

**Key Environment Variables:**
- `OPENAI_API_KEY` - Your OpenAI secret (server-only)

**Key Functions:**
- `sendMessage()` - Send message to API
- `handleSend()` - UI button handler
- `scrollToBottom()` - Auto-scroll to latest

---

Status: ✅ **Production Ready**

Last Updated: March 29, 2026
