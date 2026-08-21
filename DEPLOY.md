# Deployment Guide

Deploy the Voice RAG system to production environments.

## Deployment Options

### Option 1: Vercel (Recommended)

Vercel is the easiest deployment option for Next.js applications.

#### Prerequisites
- GitHub account
- Vercel account (free tier available)
- Repository pushed to GitHub

#### Steps

1. **Connect Repository**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/Login with GitHub
   - Click "New Project"
   - Import your repository: `arv25rahul/hhg-task2-voice-rag`

2. **Configure Environment Variables**
   Add these in Vercel dashboard:
   ```
   PINECONE_API_KEY=your_key
   PINECONE_INDEX=your_index
   OPENAI_API_KEY=your_key
   ```

3. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for build
   - Get your live URL: `https://your-project.vercel.app`

4. **Custom Domain (Optional)**
   - Go to Project Settings → Domains
   - Add your custom domain
   - Update DNS records as instructed

#### Vercel CLI Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Option 2: Netlify

#### Steps

1. **Connect Repository**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import existing project"
   - Connect GitHub and select repository

2. **Build Settings**
   ```
   Build command: npm run build
   Publish directory: .next
   ```

3. **Environment Variables**
   Add in Site Settings → Environment Variables

4. **Deploy**
   Click "Deploy site"

### Option 3: Docker

#### Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

#### Build and Run

```bash
# Build image
docker build -t voice-rag .

# Run container
docker run -p 3000:3000 \
  -e PINECONE_API_KEY=your_key \
  -e PINECONE_INDEX=your_index \
  -e OPENAI_API_KEY=your_key \
  voice-rag
```

#### Docker Compose

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    env_file:
      - .env.local
    restart: unless-stopped
```

Run: `docker-compose up -d`

### Option 4: AWS (EC2 or Elastic Beanstalk)

#### EC2 Deployment

1. **Launch EC2 Instance**
   - AMI: Ubuntu 22.04
   - Instance type: t2.micro or higher
   - Security group: Allow ports 22, 80, 443, 3000

2. **Connect and Setup**
```bash
# SSH into instance
ssh -i your-key.pem ubuntu@your-ip

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone repository
git clone https://github.com/arv25rahul/hhg-task2-voice-rag.git
cd hhg-task2-voice-rag

# Install dependencies
npm install

# Setup environment
nano .env.local  # Add your keys

# Build
npm run build

# Install PM2 for process management
sudo npm install -g pm2

# Start app
pm2 start npm --name "voice-rag" -- start

# Auto-start on reboot
pm2 startup
pm2 save
```

3. **Setup Nginx (Optional)**
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Option 5: Railway

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Initialize
railway init

# Add environment variables
railway variables set PINECONE_API_KEY=your_key
railway variables set PINECONE_INDEX=your_index
railway variables set OPENAI_API_KEY=your_key

# Deploy
railway up
```

## Environment Configuration

### Production Environment Variables

Always set these in your deployment platform:

```env
NODE_ENV=production
PINECONE_API_KEY=<your_key>
PINECONE_INDEX=<your_index>
OPENAI_API_KEY=<your_key>
```

### Security Best Practices

1. **Never commit secrets**
   - Use environment variables
   - Keep `.env.local` out of version control

2. **Use HTTPS**
   - Required for voice API
   - Most platforms provide free SSL

3. **Rate Limiting**
   - Implement API rate limits
   - Monitor API usage

4. **CORS Configuration**
   - Set appropriate CORS headers
   - Whitelist trusted domains only

## Post-Deployment Checklist

- ✅ Application loads without errors
- ✅ API endpoints respond correctly
- ✅ Voice interface works (requires HTTPS)
- ✅ Vector search returns results
- ✅ AI responses generate properly
- ✅ Environment variables set correctly
- ✅ Custom domain configured (if applicable)
- ✅ SSL certificate active
- ✅ Error monitoring setup
- ✅ Performance metrics tracked

## Monitoring and Maintenance

### Vercel Analytics
- Built-in analytics available
- Monitor performance and usage
- Track Web Vitals

### Error Tracking
Consider integrating:
- Sentry
- LogRocket
- Datadog

### Logging
```typescript
// Add logging to API routes
console.log('[API]', request.method, request.url);
console.error('[ERROR]', error);
```

## Troubleshooting Deployment

### Build Fails
- Check Node.js version matches requirements
- Verify all dependencies installed
- Review build logs for specific errors

### Environment Variables Not Working
- Restart deployment after adding vars
- Check variable names match exactly
- Ensure no trailing spaces in values

### API Routes Fail
- Verify base URL configuration
- Check API keys are valid
- Review CORS settings

### Voice Not Working in Production
- Confirm HTTPS is enabled
- Check browser console for errors
- Verify microphone permissions

## Scaling Considerations

### For High Traffic
- Use CDN for static assets
- Enable caching
- Consider serverless functions
- Use Redis for session management
- Implement load balancing

### Cost Optimization
- Monitor API usage
- Set usage limits
- Cache frequent queries
- Optimize vector search queries

---
Team RoopX - Deployment Guide
