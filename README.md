# Burn Industry Fitness — Creed Protocol

18-month athletic recomposition app for Densil McFarlane / The OBGMs.

## Stack
- React + Vite
- Supabase (data persistence)
- Vercel (hosting)
- Bebas Neue + IBM Plex Sans

## Setup

### 1. Supabase
Run `supabase-schema.sql` in your Supabase SQL editor (project: cfaizrsxwrqijhuuvdxe)

### 2. Environment Variables
In Vercel dashboard, add:
- `VITE_SUPABASE_URL` = https://cfaizrsxwrqijhuuvdxe.supabase.co
- `VITE_SUPABASE_ANON_KEY` = your anon key from Supabase → Settings → API

### 3. Deploy
Push to GitHub → Vercel auto-deploys.

## Local Dev
```
npm install
npm run dev
```
