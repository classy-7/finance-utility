# Deployment Guide

This guide covers deploying FinWise to various platforms.

## Prerequisites

- Completed installation (see INSTALLATION.md)
- API keys configured (see API_INTEGRATION.md)
- Git repository with your code

## Platform-Specific Deployment

### 1. Vercel (Recommended)

Vercel is the recommended platform for Next.js applications.

#### Steps:

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-github-repo>
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure environment variables in Vercel dashboard:
     ```
     NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
     ALPHA_VANTAGE_API_KEY=your_api_key
     NEWS_API_KEY=your_api_key
     # ... other API keys
     ```
   - Click "Deploy"

3. **Custom Domain (Optional)**
   - Go to project settings in Vercel
   - Add your custom domain
   - Update DNS records as instructed

#### Environment Variables in Vercel:
- Go to Settings → Environment Variables
- Add all variables from `.env.example`
- Do not include `NEXT_PUBLIC_` prefix for server-side variables
- Include `NEXT_PUBLIC_` prefix for client-side variables

### 2. Netlify

#### Steps:

1. **Build Configuration**
   Create `netlify.toml`:
   ```toml
   [build]
     command = "pnpm build"
     publish = ".next"

   [[plugins]]
     package = "@netlify/plugin-nextjs"
   ```

2. **Deploy**
   - Go to [netlify.com](https://netlify.com)
   - "Add new site" → "Import from Git"
   - Connect your repository
   - Configure environment variables
   - Deploy

### 3. Railway

#### Steps:

1. **Install Railway CLI**
   ```bash
   npm i -g railway
   ```

2. **Login and Deploy**
   ```bash
   railway login
   railway init
   railway up
   ```

3. **Add Environment Variables**
   - Go to Railway dashboard
   - Add variables to your project

### 4. Render

#### Steps:

1. **Go to [render.com](https://render.com)**
2. "New" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - Build Command: `pnpm build`
   - Start Command: `pnpm start`
5. Add environment variables
6. Deploy

### 5. Docker

#### Create Dockerfile

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json pnpm-lock.yaml* ./
RUN corepack enable pnpm && pnpm install --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN corepack enable pnpm && pnpm build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

#### Build and Run

```bash
docker build -t finwise .
docker run -p 3000:3000 -e NEXT_PUBLIC_SITE_URL=http://localhost:3000 finwise
```

### 6. VPS (DigitalOcean, AWS, etc.)

#### Steps:

1. **Server Setup**
   ```bash
   # Update server
   sudo apt update && sudo apt upgrade -y
   
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt install -y nodejs
   
   # Install pnpm
   npm install -g pnpm
   ```

2. **Clone Repository**
   ```bash
   git clone <your-repo-url>
   cd finance-tools
   pnpm install
   pnpm build
   ```

3. **Run with PM2**
   ```bash
   npm install -g pm2
   pm2 start npm --name "finwise" -- start
   pm2 save
   pm2 startup
   ```

4. **Configure Nginx**
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

## Environment Variables Checklist

Before deploying, ensure you have:

- [ ] `NEXT_PUBLIC_SITE_URL` - Your production URL
- [ ] `NODE_ENV=production`
- [ ] Market data API keys (NSE/BSE/Alpha Vantage)
- [ ] Mutual fund API key (AMFI)
- [ ] News APIキー (NewsAPI/GNews)
- [ ] Currency API key (Exchange Rate API)
- [ ] Analytics ID (Google Analytics - optional)
- [ ] Email configuration (SMTP - optional)
- [ ] Redis URL (for caching - optional)

## Post-Deployment Checklist

- [ ] Test all calculator pages
- [ ] Verify market data is loading (if APIs connected)
- [ ] Check mobile responsiveness
- [ ] Test theme switching
- [ ] Verify watchlist functionality
- [ ] Check all trust pages load correctly
- [ ] Test contact form (if configured)
- [ ] Verify analytics are tracking
- [ ] Check for console errors
- [ ] Test on multiple browsers

## Performance Optimization

### Enable CDN

- Vercel: Automatic with Edge Network
- Netlify: Automatic with Edge Network
- Custom: Use Cloudflare or similar

### Enable Caching

- Configure Redis for production
- Set up CDN caching headers
- Use Next.js ISR (Incremental Static Regeneration)

### Optimize Images

- Use Next.js Image component
- Configure image optimization
- Use WebP format

## Security Checklist

- [ ] HTTPS enabled
- [ ] Environment variables secured
- [ ] API keys not exposed in client code
- [ ] Rate limiting configured
- [ ] CORS properly configured
- [ ] Security headers set
- [ ] Dependencies up to date
- [ ] Regular security audits

## Monitoring

### Recommended Tools

- **Vercel Analytics**: Built-in with Vercel
- **Google Analytics**: Add `NEXT_PUBLIC_GA_ID`
- **Sentry**: For error tracking
- **LogRocket**: For session replay

### Health Check Endpoint

Add health check at `/health` for monitoring services.

## Backup Strategy

- Regular database backups (if using database)
- Backup environment variables
- Git version control
- Disaster recovery plan

## Scaling

### When to Scale

- High traffic (1000+ concurrent users)
- Slow response times
- High API usage costs

### Scaling Options

- Vertical scaling (more server resources)
- Horizontal scaling (load balancer + multiple servers)
- CDN for static assets
- Database optimization

## Cost Estimation

### Vercel (Hobby Plan)
- Free: $0/month
- Pro: $20/month
- Enterprise: Custom

### Netlify
- Free: $0/month
- Pro: $19/month
- Enterprise: Custom

### VPS (DigitalOcean)
- Basic: $6/month
- Standard: $24/month
- Premium: $48/month

### API Costs
- See API_INTEGRATION.md for detailed cost breakdown

## Support

For deployment issues:
- Platform-specific documentation
- API provider support
- Contact: contact@finwise.example.com
