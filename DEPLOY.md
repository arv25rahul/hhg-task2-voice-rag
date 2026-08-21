# 🚀 Deployment Guide - Hacker House Goa Voice RAG

## Quick Deploy to Vercel (5 Minutes)

### Option 1: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally (one time)
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to production
cd c:\Users\Drago\Downloads\hhgoa_task_2-main\hhgoa_task_2-main
vercel --prod
```

### Option 2: Deploy via GitHub + Vercel Dashboard

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Hacker House Goa theme + production ready"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/hhgoa-voice-rag.git
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to https://vercel.com/new
   - Import your GitHub repository
   - Vercel auto-detects Next.js settings
   - Click "Deploy"

3. **Add Environment Variables in Vercel Dashboard**
   - Go to Project Settings → Environment Variables
   - Add these variables:
     ```
     MONGODB_URI
     OPENROUTER_API_KEY
     SARVAM_API_KEY (optional)
     ELEVENLABS_API_KEY (optional)
     ```

---

## 🔐 Environment Variables Setup

### In Vercel Dashboard:

| Variable Name | Value | Required |
|---------------|-------|----------|
| `MONGODB_URI` | `mongodb+srv://user:pass@cluster.mongodb.net/` | ✅ Yes |
| `OPENROUTER_API_KEY` | `sk-or-v1-your-key` | ✅ Yes |
| `SARVAM_API_KEY` | Your Sarvam key | ⚠️ Optional (voice) |
| `ELEVENLABS_API_KEY` | Your ElevenLabs key | ⚠️ Optional (voice) |
| `MONGODB_DATABASE` | `ai_demo` | ℹ️ Default provided |
| `MONGODB_COLLECTION` | `chunks` | ℹ️ Default provided |

---

## 📦 Pre-Deployment Checklist

Run these commands to verify everything works:

```powershell
# 1. Install dependencies
npm install

# 2. Run type checking
npx tsc --noEmit

# 3. Run build
npm run build

# 4. Test production build locally
npm run start

# 5. Open http://localhost:3000 and test all features
```

---

## 🌐 Custom Domain Setup (Optional)

### After Deploying to Vercel:

1. **In Vercel Dashboard:**
   - Go to Project → Settings → Domains
   - Add your custom domain (e.g., `hhg-rag.yourdomain.com`)

2. **In Your DNS Provider:**
   - Add CNAME record pointing to your Vercel deployment
   - Example: `hhg-rag` → `your-project.vercel.app`

3. **SSL Certificate:**
   - Vercel automatically provisions SSL (1-2 minutes)

---

## 🗄️ MongoDB Atlas Setup for Production

### Create Production Cluster:

1. **Create Cluster**
   - Log in to MongoDB Atlas
   - Create M0 FREE tier cluster (or paid tier for production)
   - Choose closest region to your users

2. **Configure Network Access**
   - Database Access → Add User (create strong password)
   - Network Access → Allow 0.0.0.0/0 (or specific Vercel IPs)

3. **Create Vector Search Index**
   ```javascript
   // In Atlas Search → Create Search Index
   {
     "fields": [
       {
         "type": "vector",
         "path": "embedding",
         "numDimensions": 1536,
         "similarity": "cosine"
       }
     ]
   }
   ```
   - Index name: `vector_index`
   - Database: `ai_demo`
   - Collection: `chunks`

4. **Index Sample Data**
   ```bash
   # Set your MongoDB URI in .env.local first
   npx tsx scripts/index-data.ts
   ```

---

## 🔍 Post-Deployment Verification

### Test These Features:

1. ✅ **Homepage loads** with matrix rain background
2. ✅ **Text query works** (type a question in the input)
3. ✅ **Voice recording** (click mic button - needs API keys)
4. ✅ **Vector explorer** loads chunks from MongoDB
5. ✅ **Benchmark** runs successfully
6. ✅ **Responsive** design on mobile
7. ✅ **Error messages** are helpful (if API keys missing)

### Performance Check:

```bash
# Run Lighthouse audit
npx lighthouse https://your-domain.vercel.app --view

# Target scores:
# Performance: 90+
# Accessibility: 95+
# Best Practices: 95+
# SEO: 90+
```

---

## 🐛 Troubleshooting Deployment

### Build Fails on Vercel:

**Error: "Module not found"**
```bash
# Solution: Clear cache and rebuild
vercel --force
```

**Error: "Environment variable not defined"**
```bash
# Solution: Add all required env vars in Vercel dashboard
# Go to Settings → Environment Variables
```

### MongoDB Connection Fails:

**Error: "Connection refused"**
```bash
# Solutions:
1. Check Network Access whitelist in Atlas (add 0.0.0.0/0)
2. Verify connection string format
3. Ensure user has correct permissions
```

### Voice Recording Not Working:

**Error: "getUserMedia not supported"**
```bash
# Solutions:
1. Ensure HTTPS is enabled (required for microphone)
2. Check browser permissions
3. Use Chrome/Firefox (best support)
```

---

## 📊 Monitoring & Analytics

### Vercel Analytics (Built-in):

- Real-time visitor tracking
- Performance metrics
- Error logs

### Optional Tools:

- **Sentry** for error tracking
- **PostHog** for product analytics
- **Vercel Speed Insights** for Core Web Vitals

---

## 🔄 Continuous Deployment

### Auto-Deploy on Git Push:

Once connected to GitHub, Vercel automatically:
1. Detects new commits
2. Builds the project
3. Runs tests (if configured)
4. Deploys to production
5. Sends deployment notification

### Branch Previews:

- Every pull request gets its own preview URL
- Test changes before merging to main

---

## 💰 Cost Estimation

### Free Tier Usage:

**Vercel:**
- ✅ Hobby plan: 100GB bandwidth/month
- ✅ Unlimited deployments
- ✅ Automatic SSL
- ✅ Global CDN

**MongoDB Atlas:**
- ✅ M0 FREE: 512MB storage
- ✅ Shared cluster
- ✅ Perfect for testing/demos

**OpenRouter:**
- 💳 Pay-as-you-go: ~$0.10 per 1000 requests
- 💳 Free tier available for testing

**Estimated Monthly Cost: $0-$5** for demo/testing

---

## 🚀 Production Scaling

### When you need to scale:

1. **Upgrade MongoDB Atlas**
   - M2 tier: $9/month
   - M5 tier: $25/month (recommended for production)

2. **Upgrade Vercel**
   - Pro: $20/month per user
   - Needed for: Team collaboration, advanced analytics

3. **Add Caching**
   - Redis for embedding cache
   - Reduces OpenRouter costs

---

## 📝 Deployment Commands Reference

```bash
# Development
npm run dev              # Start dev server

# Production Build
npm run build           # Build for production
npm run start           # Start production server

# Vercel Commands
vercel                  # Deploy to preview
vercel --prod          # Deploy to production
vercel logs            # View deployment logs
vercel env ls          # List environment variables
vercel domains         # Manage domains

# Type Checking
npx tsc --noEmit       # Check TypeScript errors

# Linting
npm run lint           # Run ESLint
```

---

## ✅ Final Deployment Checklist

Before going live:

- [ ] All environment variables configured in Vercel
- [ ] MongoDB Atlas cluster created with vector index
- [ ] Sample data indexed (`npm run tsx scripts/index-data.ts`)
- [ ] Build succeeds locally (`npm run build`)
- [ ] All features tested locally
- [ ] Custom domain configured (optional)
- [ ] SSL certificate active
- [ ] Analytics configured (optional)
- [ ] Error tracking setup (optional)
- [ ] README updated with live URL
- [ ] Project shared with team/hackathon

---

## 🎉 You're Ready!

Your Hacker House Goa Voice RAG is now:
- ✅ Fully themed and branded
- ✅ Production-ready code
- ✅ Deployed and accessible worldwide
- ✅ Monitored and optimized

**Live URL:** `https://your-project.vercel.app` 🚀

---

**Built with 🌴 & ⚡ at Hacker House Goa 2026**
**#RAGInGoa**
