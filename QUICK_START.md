# Quick Start Guide

Get the Voice RAG system up and running in minutes.

## Prerequisites Check

Before starting, ensure you have:
- ✅ Node.js 18 or higher
- ✅ npm or yarn package manager
- ✅ Pinecone account (free tier works)
- ✅ OpenAI API key

## 5-Minute Setup

### Step 1: Clone and Install (2 minutes)

```bash
git clone https://github.com/arv25rahul/hhg-task2-voice-rag.git
cd hhg-task2-voice-rag
npm install
```

### Step 2: Configure Environment (2 minutes)

1. Copy the environment template:
```bash
cp .env.example .env.local
```

2. Edit `.env.local` with your keys:
```env
PINECONE_API_KEY=your_pinecone_key_here
PINECONE_INDEX=your_index_name
OPENAI_API_KEY=your_openai_key_here
```

### Step 3: Run (1 minute)

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## First Test

1. Click the microphone button or type a query
2. Ask: "What is this system about?"
3. Get AI-powered response with voice output

## Troubleshooting

**Port 3000 already in use?**
```bash
# Use different port
PORT=3001 npm run dev
```

**Missing environment variables?**
- Check `.env.local` exists
- Verify all keys are set correctly
- Restart the dev server

**Voice not working?**
- Allow microphone permissions in browser
- Use HTTPS in production (required for voice API)

## Next Steps

- Read [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed configuration
- Check [docs/techstack.md](./docs/techstack.md) for architecture details
- Review API documentation in the main README

---
Team RoopX - Quick Start Guide
