# LuxeLeadPro Admin Dashboard - Deployment Guide

## Overview
A professional Next.js admin dashboard for managing LuxeLeadPro leads with real-time analytics, conversion funnel visualization, and comprehensive lead management. Features a dark theme with gold accents matching the LuxeLeadPro brand.

**Status:** ✅ Production-ready | **Demo Data:** Included | **Supabase:** Optional

## Prerequisites
- Node.js 18+ installed
- Vercel account (for hosting) - OPTIONAL if self-hosting
- Supabase account (free tier is fine) - OPTIONAL, uses mock data by default

## Quick Start (With Mock Data)

Want to see it working immediately? The dashboard works out of the box with realistic mock data!

```bash
# 1. Install dependencies
npm install

# 2. Run the dev server
npm run dev

# 3. Open http://localhost:3003 in your browser
# You'll see 25 realistic leads with various statuses
# All features work: filter, sort, export, update status, metrics, funnel
```

**No configuration needed!** The mock data includes:
- 25 realistic leads across US markets
- Mix of statuses: new, contacted, converted, lost
- Realistic contact info and GCI ranges
- Full conversion funnel visualization
- Live metrics and analytics

## Features

### Dashboard
✨ **Real-time Analytics**
- New leads this week
- Conversion rate & contact rate
- Status breakdown with percentages
- Live lead count

📊 **Conversion Funnel**
- Visual funnel showing lead progression
- Stage-by-stage metrics
- Contact and conversion rates

📋 **Lead Management**
- View all leads in a clean table
- Filter by status (new/contacted/converted/lost)
- Sort by created or updated date
- Inline status updates with dropdowns
- Email, phone, market, GCI range, timeline visibility

⬇️ **Export**
- Download all leads as CSV
- Filter before export
- Includes all lead details

🎨 **Professional Design**
- Dark theme with gold accents
- Responsive layout (desktop, tablet, mobile)
- Clean, modern interface
- LuxeLeadPro brand colors

## Step 1: Set Up Supabase Database (OPTIONAL)

**Skip this if you want to use mock data. Only do this if you want to use real Supabase data.**

1. Go to https://supabase.com and create a new project
2. Create a database (Postgres)
3. In the Supabase dashboard:
   - Go to **SQL Editor**
   - Paste the entire contents of `DATABASE_SCHEMA.sql`
   - Click **Run**
   - This creates the `leads` table with proper structure and indexes

## Step 2: Get Your Supabase Credentials (OPTIONAL)

**Only needed if you're using Supabase instead of mock data.**

1. In Supabase, go to **Settings → API**
2. Copy:
   - **Project URL** (NEXT_PUBLIC_SUPABASE_URL)
   - **Anon Public Key** (NEXT_PUBLIC_SUPABASE_ANON_KEY)
   - **Service Role Secret** (SUPABASE_SERVICE_ROLE_KEY) - KEEP THIS SECRET
3. Open `.env.local` and fill in your credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
4. The dashboard will automatically use Supabase instead of mock data

## Step 3: Test Locally

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Visit http://localhost:3003 (or 3000-3002 if ports are in use)
```

You should see:
- Dashboard with live metrics
- Conversion funnel chart
- Status breakdown pie chart
- Table with 25 realistic leads (if using mock data)
- All filtering, sorting, export working

## Step 4: Update Your Main Website Form

When users submit the LuxeLeadPro form on luxeleadpro.com, add this API call:

```javascript
fetch('https://your-dashboard-domain/api/leads', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: formData.name,
    email: formData.email,
    phone: formData.phone,
    brokerage: formData.brokerage,
    market: formData.market,
    gci_range: formData.gciRange,
    timeline: formData.timeline,
    challenge: formData.challenge,
  }),
})
.then(res => res.json())
.then(data => {
  // Then redirect to Calendly or show success
  window.location.href = 'https://calendly.com/your-link';
});
```

This works with both mock data and real Supabase!

## Step 5: Deploy to Vercel

### Option A: Deploy from GitHub (Recommended)
1. Push this folder to a GitHub repo
2. Go to https://vercel.com and click **New Project**
3. Select your GitHub repo
4. **Environment Variables (if using Supabase):**
   - `NEXT_PUBLIC_SUPABASE_URL` (your Supabase URL)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` (your Supabase anon key)
   - `SUPABASE_SERVICE_ROLE_KEY` (your Supabase service role - KEEP SECRET)
5. Click **Deploy**

**Note:** If you leave the Supabase variables empty, the dashboard will use mock data (perfect for demos!)

### Option B: Deploy with Vercel CLI
```bash
npm install -g vercel
vercel
```
Follow prompts and add environment variables when asked.

## Step 6: API Endpoints

All endpoints work with both mock data and real Supabase:

- `GET /api/leads` - Fetch all leads (with optional `?status=new` filter)
- `POST /api/leads` - Create new lead
- `GET /api/leads/[id]` - Get single lead
- `PATCH /api/leads/[id]` - Update lead status/notes
- `GET /api/leads/export` - Export as CSV (with optional `?status=converted` filter)

### Example Usage

```bash
# Get all new leads
curl https://yourdomain.com/api/leads?status=new

# Create a lead
curl -X POST https://yourdomain.com/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1-555-0123",
    "market": "New York",
    "gci_range": "$1M - $2M",
    "timeline": "Next 3 months"
  }'

# Update lead status
curl -X PATCH https://yourdomain.com/api/leads/lead_1 \
  -H "Content-Type: application/json" \
  -d '{"status": "converted"}'

# Export as CSV
curl https://yourdomain.com/api/leads/export > leads.csv
```

## Data Modes

### 🎯 Mock Data Mode (Default)
- No Supabase required
- Perfect for demos and testing
- 25 realistic example leads included
- All features fully functional
- Persists within session (resets on server restart)

**Enable:** Leave `NEXT_PUBLIC_SUPABASE_URL` empty

### 🔗 Supabase Mode
- Real persistent database
- Production-ready
- Scales automatically
- Pay-as-you-go pricing

**Enable:** Fill in your Supabase credentials in `.env.local`

## Security & Authentication

### Current Setup
- **Public API** - anyone can view/modify leads
- Good for internal use or demos
- Requires trusted network

### Production Recommendations
1. **Add API Key Validation:**
   ```javascript
   // Middleware to check API key
   if (req.headers['x-api-key'] !== process.env.API_KEY) {
     return res.status(401).json({ error: 'Unauthorized' });
   }
   ```

2. **Add Dashboard Login:**
   - Use Supabase Auth
   - Add NextAuth.js
   - Or use Vercel Authentication

3. **Environment Secrets:**
   - Never commit `.env.local`
   - Use Vercel Environment Secrets
   - Rotate Supabase keys regularly

## Maintenance

### Daily
- Check dashboard for new leads
- Update status as you contact prospects
- Review conversion metrics

### Weekly
- Export lead report for analysis
- Identify top markets/GCI ranges
- Update lead notes with call results

### Monthly
- Review conversion funnel
- Analyze contact-to-conversion rate
- Plan follow-up outreach

## Troubleshooting

### Dashboard shows "Failed to load leads"
1. Check browser console for errors
2. Verify API endpoint is running
3. If using Supabase, check credentials in `.env.local`

### Mock data not appearing
1. Ensure `NEXT_PUBLIC_SUPABASE_URL` is empty (not set to real URL)
2. Restart dev server: `npm run dev`
3. Hard refresh browser (Ctrl+Shift+R)

### Can't connect to Supabase
1. Double-check credentials
2. Verify database exists and `leads` table is created
3. Check Supabase dashboard → SQL Editor → run `SELECT COUNT(*) FROM leads;`

### Port 3000/3001/3002 already in use
Next.js automatically tries ports 3000, 3001, 3002, 3003, etc.
If all are in use, specify a port:
```bash
npm run dev -- -p 3010
```

## Support

- **Next.js Docs:** https://nextjs.org/docs
- **Supabase Docs:** https://supabase.com/docs  
- **Tailwind CSS:** https://tailwindcss.com/docs
- **React Icons:** https://react-icons.github.io/react-icons/

## License

Built for LuxeLeadPro. All rights reserved.
