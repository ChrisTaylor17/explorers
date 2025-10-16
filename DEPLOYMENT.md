# Deployment Guide

## Frontend Deployment (Vercel)

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo-url>
git push -u origin main
```

### Step 2: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure:
   - Framework Preset: **Next.js**
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`

### Step 3: Set Environment Variables in Vercel
```
NEXT_PUBLIC_SOLANA_NETWORK=devnet
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.devnet.solana.com
NEXT_PUBLIC_API_URL=<your-railway-backend-url>
```

### Step 4: Deploy
Click "Deploy" - Vercel will automatically build and deploy your frontend.

---

## Backend Deployment (Railway)

### Step 1: Deploy to Railway
1. Go to [railway.app](https://railway.app)
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your repository
5. Railway will auto-detect Node.js

### Step 2: Set Environment Variables in Railway
```
PORT=5000
MONGODB_URI=<your-mongodb-atlas-uri>
NODE_ENV=production
```

### Step 3: Get MongoDB Atlas (Free)
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster
3. Get connection string
4. Add to Railway environment variables

### Step 4: Configure Railway
Railway will automatically:
- Install dependencies
- Start server with `node server/index.js`
- Provide a public URL

### Step 5: Update Frontend
Add Railway backend URL to Vercel environment variables:
```
NEXT_PUBLIC_API_URL=https://your-app.railway.app
```

---

## Quick Deploy Commands

### One-Click Vercel Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/SocietyofExplorers)

### Railway Deploy
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template)

---

## Environment Variables Summary

### Vercel (Frontend)
- `NEXT_PUBLIC_SOLANA_NETWORK` - Solana network (devnet/mainnet-beta)
- `NEXT_PUBLIC_SOLANA_RPC_URL` - Solana RPC endpoint
- `NEXT_PUBLIC_API_URL` - Backend API URL from Railway

### Railway (Backend)
- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `NODE_ENV` - Environment (production)

---

## Post-Deployment

1. **Test the frontend**: Visit your Vercel URL
2. **Test the backend**: Visit `https://your-railway-url/api/health`
3. **Connect wallet**: Use Phantom wallet on devnet
4. **Test features**: Create NFTs, tokens, use chat

---

## Troubleshooting

### Frontend Issues
- Check Vercel build logs
- Verify environment variables
- Ensure API URL is correct

### Backend Issues
- Check Railway logs
- Verify MongoDB connection
- Check CORS settings

### CORS Configuration
If you get CORS errors, update `server/index.js`:
```javascript
const cors = require('cors')
app.use(cors({
  origin: 'https://your-vercel-app.vercel.app',
  credentials: true
}))
```
