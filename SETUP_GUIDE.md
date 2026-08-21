# 🚀 Hacker House Goa Voice RAG - Setup Guide

## ✅ Current Status

The application is **running successfully** on http://localhost:3000 with the new Hacker House Goa theme! 

However, to enable full functionality, you need to configure the following services:

---

## 🔧 Required Configuration

### 1. MongoDB Atlas (Vector Database) - **REQUIRED for Vector Explorer**

**Current Status:** ⚠️ Not configured  
**Impact:** Vector Chunks Explorer won't load data

**Setup Steps:**
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (Free tier M0 works fine)
3. Go to **Database Access** → Create a database user with password
4. Go to **Network Access** → Allow access from anywhere (0.0.0.0/0) for testing
5. Click **Connect** → **Connect your application**
6. Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)
7. Add to `.env.local`:
   ```
   MONGODB_URI="mongodb+srv://your-username:your-password@your-cluster.mongodb.net/?retryWrites=true&w=majority"
   ```

### 2. OpenRouter API (LLM & Embeddings) - **REQUIRED for Voice RAG**

**Current Status:** ⚠️ Not configured  
**Impact:** Voice queries won't generate responses

**Setup Steps:**
1. Go to [OpenRouter](https://openrouter.ai/)
2. Sign up and navigate to **Keys** section
3. Create a new API key
4. Add to `.env.local`:
   ```
   OPENROUTER_API_KEY="sk-or-v1-your-key-here"
   ```

### 3. Sarvam AI (Speech-to-Text) - **OPTIONAL**

**Current Status:** ⚠️ Not configured  
**Impact:** Voice recording feature won't work (text queries will still work)

**Setup Steps:**
1. Go to [Sarvam AI](https://sarvam.ai/)
2. Sign up and get your API key
3. Add to `.env.local`:
   ```
   SARVAM_API_KEY="your-sarvam-key"
   ```

### 4. ElevenLabs (Alternative STT) - **OPTIONAL**

**Current Status:** ⚠️ Not configured  
**Impact:** Fallback if Sarvam AI fails

**Setup Steps:**
1. Go to [ElevenLabs](https://elevenlabs.io/)
2. Sign up and get your API key
3. Add to `.env.local`:
   ```
   ELEVENLABS_API_KEY="your-elevenlabs-key"
   ```

---

## 📁 Complete .env.local Example

Create or edit `.env.local` in the project root:

```env
# ─── AI Services ───────────────────────────────────────────────────────────────

# Sarvam AI — Speech-to-Text (Saaras v3)
SARVAM_API_KEY="your-sarvam-key"

# ElevenLabs — Optional fallback STT
ELEVENLABS_API_KEY="your-elevenlabs-key"

# OpenRouter — LLM Inference & Embeddings
OPENROUTER_API_KEY="sk-or-v1-your-openrouter-key"

# ─── MongoDB Atlas ──────────────────────────────────────────────────────────────

# MongoDB Atlas connection string
MONGODB_URI="mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority"

# Database & collection config
MONGODB_DATABASE="ai_demo"
MONGODB_COLLECTION="chunks"
```

---

## 🔄 After Configuration

1. **Save** the `.env.local` file
2. **Restart** the development server:
   - Stop the current server (Ctrl+C in terminal)
   - Run: `npm run dev`
3. **Refresh** your browser at http://localhost:3000

---

## ✨ What's Working Now (Without Configuration)

Even without API keys, you can see the beautiful new theme:

- ✅ **Matrix rain background** with falling code and palm trees
- ✅ **Neon green/cyan/orange** color scheme
- ✅ **Terminal-style UI** with HHG_RAG branding
- ✅ **Responsive design** with hover glow effects
- ✅ **All UI components** render correctly

### What Requires Configuration:

- ⚠️ **Voice Recording** → Needs Sarvam AI or ElevenLabs
- ⚠️ **Text Queries** → Needs OpenRouter API
- ⚠️ **Vector Explorer** → Needs MongoDB Atlas
- ⚠️ **Benchmark Tests** → Needs all services

---

## 🎯 Quick Start (Minimum Setup)

To get the **Voice RAG** feature working with text input only:

1. **OpenRouter** (for LLM responses)
2. **MongoDB Atlas** (for vector search)

These two services will enable:
- ✅ Text query input
- ✅ Vector database search
- ✅ AI-generated responses
- ✅ Vector chunks explorer

---

## 🐛 Troubleshooting

### "Failed to fetch vector chunks from MongoDB"
- MongoDB URI not configured in `.env.local`
- Check connection string format
- Verify database user has read/write permissions

### "Internal Server Error" on voice queries
- OpenRouter API key not configured
- Check API key is valid and has credits

### Voice recording doesn't work
- Sarvam AI or ElevenLabs key not configured
- Try using text input instead

### Port 3000 already in use
```bash
# Find and kill the process
netstat -ano | findstr :3000
taskkill /PID <process-id> /F

# Or use a different port
npm run dev -- -p 3001
```

---

## 📚 Additional Resources

- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [OpenRouter API Docs](https://openrouter.ai/docs)
- [Sarvam AI Documentation](https://docs.sarvam.ai/)
- [Next.js Environment Variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)

---

## 🎨 Theme Features (Already Active!)

Your new Hacker House Goa theme includes:

- 🌴 **Matrix rain** with interactive mouse effects
- ⚡ **Neon glow shadows** on hover
- 💚 **Color-coded components** (green=primary, cyan=secondary, orange=accent)
- 🌙 **Palm tree silhouettes** swaying in corners
- 💻 **Terminal prompt logo** with underscore cursor
- 🎯 **Space Grotesk + Fira Code** fonts

**The re-theme is 100% complete and looks amazing!** 🚀

Just add your API keys to unlock the full RAG functionality.
