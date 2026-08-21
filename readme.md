# Voice-Enabled RAG System

A modern voice-enabled Retrieval-Augmented Generation (RAG) system built with Next.js, featuring real-time voice interaction, vector search, and AI-powered responses.

## Team RoopX

- **Roopam** - Team Lead & Backend Developer
- **Rahul** - Full Stack Developer
- **Vibhu** - Frontend Developer & UI/UX

## Features

- 🎤 **Voice Interface** - Natural voice input and text-to-speech output
- 🔍 **Vector Search** - Semantic search powered by Pinecone
- 🤖 **AI Integration** - Intelligent responses using OpenAI GPT models
- ⚡ **Real-time Processing** - Instant query processing and response generation
- 📊 **Performance Monitoring** - Built-in telemetry and benchmarking
- 🎨 **Modern UI** - Interactive background and responsive design

## Tech Stack

- **Framework**: Next.js 15.1 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Vector Database**: Pinecone
- **AI/ML**: OpenAI API
- **Voice**: Web Speech API
- **Deployment**: Vercel-ready

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Pinecone account and API key
- OpenAI API key

### Installation

1. Clone the repository
```bash
git clone https://github.com/arv25rahul/hhg-task2-voice-rag.git
cd hhg-task2-voice-rag
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:
- `PINECONE_API_KEY`
- `PINECONE_INDEX`
- `OPENAI_API_KEY`

4. Run the development server
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── src/
│   ├── app/              # Next.js app router pages
│   │   ├── api/          # API routes
│   │   ├── page.tsx      # Main page
│   │   └── layout.tsx    # Root layout
│   ├── components/       # React components
│   │   ├── VoiceInterface.tsx
│   │   ├── VectorExplorer.tsx
│   │   ├── TelemetryProfiler.tsx
│   │   └── InteractiveBg.tsx
│   └── lib/              # Utilities and services
│       ├── services.ts   # AI and vector services
│       └── env.ts        # Environment configuration
├── scripts/              # Utility scripts
└── docs/                 # Documentation
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## API Endpoints

### POST /api/process
Process user queries with RAG pipeline
- Input: `{ query: string }`
- Output: AI-generated response with context

### GET /api/chunks
Retrieve vector chunks from Pinecone

### POST /api/benchmark
Performance benchmarking endpoint

## Contributing

This project was developed by Team RoopX for HHGOA Task 2.

## License

MIT License - see LICENSE file for details

## Contact

Team RoopX - Voice RAG Development Team

---
Built with ❤️ by Team RoopX
