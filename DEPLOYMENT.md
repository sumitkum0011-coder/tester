# Deployment Guide

This guide covers multiple deployment options for your Python Flask + Supabase calculator application.

## Prerequisites

1. **Supabase Setup**: Ensure your Supabase project has the `transactions` table created using the provided `supabase-schema.sql`
2. **Environment Variables**: Set up your `.env` file with production values
3. **Dependencies**: Ensure all packages in `requirements.txt` are installed

## Environment Variables for Production

```bash
SUPABASE_URL=your_production_supabase_url
SUPABASE_KEY=your_production_supabase_anon_key
FLASK_ENV=production
FLASK_DEBUG=False
PORT=5000
```

## Option 1: Local Production Deployment

### Backend (Flask)
```bash
# Activate virtual environment
source venv/bin/activate

# Install production dependencies
pip install -r requirements.txt

# Run with production server
python app.py
```

### Frontend (Static Files)
```bash
# Serve static files (already running on port 8000)
python3 -m http.server 8000
```

Access at: http://localhost:8000

## Option 2: Cloud Deployment - Render (Recommended)

### 1. Backend Deployment on Render

Create `render.yaml` in project root:
```yaml
services:
  - type: web
    name: calculator-backend
    env: python
    buildCommand: pip install -r requirements.txt
    startCommand: gunicorn app:app
    envVars:
      - key: SUPABASE_URL
        sync: false
      - key: SUPABASE_KEY
        sync: false
      - key: FLASK_ENV
        value: production
      - key: PORT
        value: 5000
```

Create `gunicorn_config.py`:
```python
bind = "0.0.0.0:5000"
workers = 4
worker_class = "sync"
worker_connections = 1000
timeout = 30
keepalive = 2
```

Update `requirements.txt` to include gunicorn:
```
Flask==3.0.0
python-dotenv==1.0.0
supabase==2.3.1
flask-cors==4.0.0
gunicorn==21.2.0
```

### 2. Frontend Deployment on Netlify

Create `netlify.toml`:
```toml
[build]
  publish = "."
  command = "echo 'Static files ready'"

[[redirects]]
  from = "/api/*"
  to = "https://your-backend-url.onrender.com/api/:splat"
  status = 200
```

## Option 3: Heroku Deployment

### 1. Create Required Files

Create `Procfile`:
```
web: gunicorn app:app
```

Create `runtime.txt`:
```
python-3.11.0
```

### 2. Deploy Steps

```bash
# Install Heroku CLI and login
heroku login

# Create new app
heroku create your-calculator-backend

# Set environment variables
heroku config:set SUPABASE_URL=your_url
heroku config:set SUPABASE_KEY=your_key

# Deploy
git add .
git commit -m "Deploy to Heroku"
git push heroku main
```

## Option 4: Railway Deployment

### 1. Create `railway.json`
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "gunicorn app:app",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

### 2. Deploy via Railway CLI
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login and deploy
railway login
railway init
railway up
railway domain
```

## Option 5: Vercel Deployment (Frontend Only)

Create `vercel.json`:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "*.html",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "https://your-backend-url.com/api/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ]
}
```

## Production Checklist

### Backend Security
- [ ] Use production Supabase keys (not anon key for server)
- [ ] Enable HTTPS on all endpoints
- [ ] Set up rate limiting
- [ ] Add input validation
- [ ] Configure CORS properly for production domain

### Frontend Optimization
- [ ] Minify JavaScript and CSS
- [ ] Optimize images
- [ ] Set up proper caching headers
- [ ] Use CDN for static assets

### Database
- [ ] Enable RLS (Row Level Security) in Supabase
- [ ] Create appropriate indexes
- [ ] Set up database backups
- [ ] Monitor query performance

## Quick Start Commands

### For Render (Fastest)
1. Fork this repository
2. Connect to Render
3. Add environment variables
4. Deploy

### For Local Testing
```bash
# Backend
source venv/bin/activate
python app.py

# Frontend (new terminal)
python3 -m http.server 8000
```

## Troubleshooting

### Common Issues
1. **CORS errors**: Ensure backend URL is in CORS allowed origins
2. **Database connection**: Verify Supabase credentials
3. **Port conflicts**: Change PORT in environment variables
4. **Static files 404**: Check file paths and server configuration

### Debug Commands
```bash
# Check backend health
curl https://your-backend.com/api/transactions

# Test locally
curl http://localhost:5000/api/transactions
```

## Monitoring

- **Backend logs**: Use platform-specific logging (Render logs, Heroku logs, etc.)
- **Database**: Monitor Supabase dashboard
- **Frontend**: Use browser dev tools and platform analytics

Choose the deployment option that best fits your needs. Render is recommended for simplicity and free tier availability.