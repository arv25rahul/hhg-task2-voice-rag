# Complete Setup Guide

Comprehensive setup instructions for the Voice-Enabled RAG system.

## System Requirements

### Hardware
- **RAM**: Minimum 4GB, recommended 8GB+
- **Storage**: 500MB for dependencies
- **Internet**: Stable connection for API calls

### Software
- **Node.js**: Version 18.x or higher
- **npm**: Version 9.x or higher (comes with Node.js)
- **Git**: For version control
- **Modern Browser**: Chrome, Firefox, Safari, or Edge

## Detailed Installation

### 1. Environment Setup

#### Check Node.js Version
```bash
node --version  # Should be 18.x or higher
npm --version   # Should be 9.x or higher
```

#### Install Node.js (if needed)
Download from [nodejs.org](https://nodejs.org/)

### 2. Project Installation

#### Clone Repository
```bash
git clone https://github.com/arv25rahul/hhg-task2-voice-rag.git
cd hhg-task2-voice-rag
```

#### Install Dependencies
```bash
npm install
```

This installs:
- Next.js framework
- React libraries
- Pinecone client
- OpenAI SDK
- UI components
- Type definitions

### 3. API Keys Configuration

#### Get Pinecone API Key

1. Sign up at [pinecone.io](https://www.pinecone.io/)
2. Create a new project
3. Create an index:
   - **Name**: Choose a name (e.g., `voice-rag`)
   - **Dimensions**: 1536 (for OpenAI embeddings)
   - **Metric**: Cosine
   - **Cloud**: AWS or GCP
4. Copy your API key from dashboard

#### Get OpenAI API Key

1. Sign up at [platform.openai.com](https://platform.openai.com/)
2. Navigate to API keys section
3. Create a new secret key
4. Copy and save it securely (shown only once)

#### Configure Environment File

Create `.env.local`:
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
# Pinecone Configuration
PINECONE_API_KEY=pcsk_xxxxxx_xxxxxxxxxxxxxxxxxxxxxxxx
PINECONE_INDEX=voice-rag

# OpenAI Configuration
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Optional: Model Configuration
OPENAI_MODEL=gpt-4
EMBEDDING_MODEL=text-embedding-ada-002
```

### 4. Development Server

#### Start Server
```bash
npm run dev
```

#### Verify Running
- Server runs on: `http://localhost:3000`
- API endpoints: `http://localhost:3000/api/*`

### 5. Production Build

#### Build Application
```bash
npm run build
```

#### Start Production Server
```bash
npm start
```

#### Production Checklist
- ✅ Environment variables set
- ✅ Build completes without errors
- ✅ All API endpoints tested
- ✅ Voice functionality verified
- ✅ Performance benchmarks run

## Configuration Options

### Environment Variables

| Variable | Required | Description | Default |
|----------|----------|-------------|---------|
| `PINECONE_API_KEY` | Yes | Pinecone API key | - |
| `PINECONE_INDEX` | Yes | Index name | - |
| `OPENAI_API_KEY` | Yes | OpenAI API key | - |
| `OPENAI_MODEL` | No | GPT model | gpt-4 |
| `EMBEDDING_MODEL` | No | Embedding model | text-embedding-ada-002 |

### Next.js Configuration

Edit `next.config.ts` for:
- Custom domains
- Image optimization
- API routes
- Build settings

## Common Issues

### Port Already in Use
```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
PORT=3001 npm run dev
```

### Module Not Found
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### API Key Issues
- Verify keys are correctly copied (no extra spaces)
- Check API key permissions and quota
- Ensure `.env.local` is in root directory
- Restart dev server after changing env vars

### Build Errors
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

### Voice Not Working
- Browser must support Web Speech API
- HTTPS required in production
- Check microphone permissions
- Try different browser

## Testing the Setup

### Test API Endpoints

```bash
# Test process endpoint
curl -X POST http://localhost:3000/api/process \
  -H "Content-Type: application/json" \
  -d '{"query":"test query"}'

# Test chunks endpoint
curl http://localhost:3000/api/chunks
```

### Test Voice Interface

1. Open browser console
2. Navigate to app
3. Click microphone button
4. Check for permission prompts
5. Speak a test query

## Development Tips

### Hot Reload
- Files auto-reload on save
- Clear browser cache if changes not visible

### Debugging
- Check browser console for errors
- Check terminal for server errors
- Use React DevTools for component debugging

### Code Quality
```bash
# Run linter
npm run lint

# Type checking
npx tsc --noEmit
```

## Team RoopX Notes

### Team Member Setup
1. Each member should have their own API keys
2. Share `.env.example` template, not actual keys
3. Document any custom configurations
4. Keep dependencies updated

### Version Control
- Never commit `.env.local`
- `.gitignore` already configured
- Commit only source code changes

---
Team RoopX - Comprehensive Setup Guide
