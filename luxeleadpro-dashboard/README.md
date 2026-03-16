# 🏆 LuxeLeadPro Admin Dashboard

A professional, production-ready Next.js admin dashboard for managing real estate leads. Features real-time analytics, conversion funnel visualization, and comprehensive lead management tools.

**Live Demo:** Works immediately with mock data - no setup required!

## ✨ Features

### 📊 Analytics & Metrics
- **Live Dashboard** with real-time metrics
- **New Leads This Week** tracker
- **Conversion Rate** calculator (converted ÷ new)
- **Contact Rate** calculator (contacted + converted ÷ new)
- **Lost Leads** counter
- **Status Breakdown** with percentages

### 📈 Conversion Funnel
- Visual funnel showing lead progression through stages
- Stage-by-stage lead counts and percentages
- Contact rate and conversion rate calculations
- Beautiful gradient bars with smooth animations

### 📋 Lead Management
- **View all leads** in a responsive, sortable table
- **Filter by status:** new, contacted, converted, lost
- **Sort by:** created date or updated date
- **Inline editing:** Change status with dropdown
- **Rich data:** Name, email, phone, market, GCI range, timeline

### ⬇️ Export
- **Download as CSV** with all lead details
- **Filter before export** by status
- **Timestamped files** for organization
- Excel/Google Sheets compatible

### 🎨 Design
- **Dark theme** with gold accents (LuxeLeadPro brand)
- **Responsive layout** works on desktop, tablet, mobile
- **Professional styling** with Tailwind CSS
- **Smooth animations** and transitions
- **Accessible UI** with proper contrast and semantics

### 🔄 Data Modes
- **Mock Data:** Works immediately, no setup needed
- **Supabase:** Optional real database backend
- **Automatic detection:** Uses mock data if Supabase credentials missing

## 🚀 Quick Start (2 minutes)

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open browser to http://localhost:3003
# That's it! You'll see 25 realistic leads with all features working
```

No `.env` file needed! Mock data is included and fully functional.

## 📦 What You Get

```
luxeleadpro-dashboard/
├── src/
│   ├── components/
│   │   ├── LeadsTable.tsx       # Main table with filtering & sorting
│   │   ├── MetricsCard.tsx      # Dashboard metrics
│   │   └── ConversionFunnel.tsx # Funnel visualization
│   ├── pages/
│   │   ├── api/
│   │   │   ├── leads.ts         # GET/POST leads
│   │   │   ├── leads/[id].ts    # GET/PATCH single lead
│   │   │   └── leads/export.ts  # CSV export
│   │   ├── index.tsx            # Main dashboard page
│   │   └── _app.tsx             # Next.js app wrapper
│   ├── lib/
│   │   ├── supabase.ts          # Supabase client
│   │   └── mockData.ts          # Mock data generator
│   └── styles/
│       └── globals.css          # Tailwind & custom styles
├── DATABASE_SCHEMA.sql          # Supabase schema
├── DEPLOYMENT.md                # Detailed deployment guide
└── package.json
```

## 🔧 Technology Stack

- **Framework:** Next.js 14 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS 3.4
- **Database:** Supabase (PostgreSQL) - OPTIONAL
- **Icons:** React Icons
- **Date Utils:** date-fns
- **Runtime:** Node.js 18+

## 📖 Usage Guide

### Dashboard Home
1. Open http://localhost:3003
2. See live metrics at the top
3. View conversion funnel in the middle-left
4. See status breakdown in the right panel
5. Scroll down to see all leads

### Filtering Leads
1. Click the **"All Statuses"** dropdown
2. Select a status: New, Contacted, Converted, Lost
3. Table updates automatically
4. Count shows "X of 25 leads"

### Updating Lead Status
1. Find a lead in the table
2. Click the status dropdown (blue/yellow/green/red badge)
3. Select new status
4. Table updates and metrics refresh instantly

### Exporting Data
1. (Optional) Filter by status first
2. Click **"Export CSV"** button
3. File downloads as `leads-YYYY-MM-DD.csv`
4. Open in Excel or Google Sheets

### Sorting
1. Click **"Sort by Created"** dropdown
2. Choose between Created or Updated date
3. Table resorts automatically

### Refreshing
Click **"Refresh"** button to reload data from server

## 🌐 API Endpoints

All endpoints support both mock data and Supabase:

### GET /api/leads
Fetch all leads with optional filtering

```bash
# All leads
curl http://localhost:3003/api/leads

# Filter by status
curl http://localhost:3003/api/leads?status=converted

# With sorting
curl http://localhost:3003/api/leads?sortBy=created_at&order=desc
```

Response:
```json
[
  {
    "id": "lead_1",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1-555-0123",
    "market": "New York",
    "gci_range": "$1M - $2M",
    "timeline": "Next 3 months",
    "status": "new",
    "created_at": "2026-03-14T19:00:00.000Z",
    "updated_at": "2026-03-14T19:00:00.000Z"
  }
]
```

### POST /api/leads
Create a new lead

```bash
curl -X POST http://localhost:3003/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "email": "jane@example.com",
    "phone": "+1-555-0456",
    "market": "Los Angeles",
    "gci_range": "$500K - $1M",
    "timeline": "This month"
  }'
```

### GET /api/leads/[id]
Get a single lead

```bash
curl http://localhost:3003/api/leads/lead_1
```

### PATCH /api/leads/[id]
Update a lead's status or notes

```bash
curl -X PATCH http://localhost:3003/api/leads/lead_1 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "contacted",
    "notes": "Called, interested in demo"
  }'
```

### GET /api/leads/export
Export leads as CSV

```bash
# All leads
curl http://localhost:3003/api/leads/export > leads.csv

# Filtered by status
curl http://localhost:3003/api/leads/export?status=converted > converted.csv
```

## ⚙️ Configuration

### Using Mock Data (Default)

No configuration needed! The app automatically uses mock data when Supabase credentials are not set.

Mock data includes:
- 25 diverse leads across 10 major US markets
- Mix of statuses: 64% new, 32% contacted, 4% converted
- Realistic contact info and GCI ranges
- Created dates spanning 90 days back

### Using Supabase

1. **Create a Supabase project:**
   - Go to https://supabase.com
   - Create new project
   - Wait for database to initialize

2. **Set up database schema:**
   - Open SQL Editor in Supabase
   - Copy entire contents of `DATABASE_SCHEMA.sql`
   - Paste and run

3. **Get credentials:**
   - Go to Settings → API
   - Copy Project URL
   - Copy Anon Public Key
   - Copy Service Role Secret

4. **Create `.env.local`:**
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

5. **Restart dev server:**
   ```bash
   npm run dev
   ```

Dashboard will automatically detect Supabase and use real database!

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Go to https://vercel.com → New Project
3. Select your GitHub repository
4. Add environment variables (if using Supabase):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
5. Click Deploy ✅

**Note:** You can deploy with empty env vars to use mock data!

### Deploy to Your Own Server

```bash
# Build for production
npm run build

# Start production server
npm start
```

Server will run on port 3000 by default.

## 📊 Mock Data Details

The included mock data generator creates realistic leads:

**Markets:** New York, Los Angeles, Chicago, Houston, Phoenix, Miami, Seattle, Denver, Austin, Boston

**GCI Ranges:**
- $500K - $1M
- $1M - $2M
- $2M - $5M
- $5M+
- Not Disclosed

**Timelines:**
- This month
- Next 3 months
- Next 6 months
- Next 12 months
- Exploratory

**Brokerages:**
- Remax
- Coldwell Banker
- Keller Williams
- Century 21

**Challenges:**
- Lead generation
- Team growth
- Technology upgrade
- Coaching program

## 🔒 Security

### Current Setup
- Public API (good for internal dashboards)
- Suitable for trusted networks
- Add authentication before public deployment

### Recommendations for Production
1. **Add API Key validation**
2. **Enable Supabase Row Level Security (RLS)**
3. **Use environment variables** for sensitive data
4. **Add login page** for team access
5. **Enable HTTPS** (automatic with Vercel)
6. **Rate limit API** for form submissions

See DEPLOYMENT.md for more security details.

## 🧪 Testing

### Test Status Updates
1. Open dashboard
2. Click any lead's status dropdown
3. Change to different status
4. See metrics update instantly
5. Refresh page - change persists

### Test Filtering
1. Click "All Statuses" dropdown
2. Select "Converted"
3. Table shows only converted leads
4. Count updates correctly
5. Export works with filtered data

### Test Export
1. Filter to "New" status (or leave all)
2. Click "Export CSV"
3. File downloads as `leads-YYYY-MM-DD.csv`
4. Open in Excel/Sheets
5. Verify data matches dashboard

### Test API
```bash
# Get all leads
curl http://localhost:3003/api/leads | jq

# Create lead
curl -X POST http://localhost:3003/api/leads \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com"}' | jq

# Update status
curl -X PATCH http://localhost:3003/api/leads/lead_1 \
  -H "Content-Type: application/json" \
  -d '{"status":"converted"}' | jq
```

## 📝 Customization

### Change Brand Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  'luxe-dark': '#0f0f14',      // Primary dark
  'luxe-gold': '#d4af37',      // Accent gold
  'luxe-gold-light': '#e5bf5c', // Light variant
}
```

### Change Dashboard Title
Edit `src/pages/index.tsx`:
```typescript
<h1 className="text-4xl font-bold luxe-accent">Your Title Here</h1>
```

### Adjust Mock Data Count
Edit `src/lib/mockData.ts`:
```typescript
for (let i = 0; i < 50; i++) { // Change 25 to 50
```

### Customize Table Columns
Edit `src/components/LeadsTable.tsx` to add/remove columns

### Add New Metrics
Edit `src/components/MetricsCard.tsx` to add new KPIs

## 🐛 Troubleshooting

**Dashboard shows "Failed to load leads"**
- Check browser console for errors
- Verify API is responding: `curl http://localhost:3003/api/leads`
- If using Supabase, check credentials and database

**Mock data not showing**
- Ensure `.env.local` is empty or doesn't have SUPABASE_URL set
- Restart dev server: `Ctrl+C` then `npm run dev`
- Clear browser cache and hard refresh

**Can't update lead status**
- Check network tab for API errors
- Verify database connection if using Supabase
- Check browser console for JavaScript errors

**Export not working**
- Try refreshing page first
- Check if Adblocker is blocking download
- Try different browser if persists

**Port already in use**
```bash
# Use different port
npm run dev -- -p 3010

# Or kill process using port 3000
# On Windows: netstat -ano | findstr :3000
# On Mac/Linux: lsof -i :3000
```

## 📚 File Structure Reference

```
src/pages/
├── index.tsx              Main dashboard (metrics, funnel, table)
├── _app.tsx              Next.js app wrapper
└── api/
    ├── leads.ts          GET all / POST new lead
    └── leads/
        ├── [id].ts       GET/PATCH single lead
        └── export.ts     Export to CSV

src/components/
├── LeadsTable.tsx        Filterable, sortable lead table
├── MetricsCard.tsx       4-card metric display
└── ConversionFunnel.tsx  Funnel visualization with stats

src/lib/
├── supabase.ts           Supabase client setup & types
└── mockData.ts           Mock data generator & storage

src/styles/
└── globals.css           Tailwind imports & custom styles
```

## 💡 Pro Tips

1. **Filter before export** to get specific lead lists
2. **Use status updates** to track follow-up progress
3. **Check metrics daily** to monitor pipeline health
4. **Export weekly** for CRM integration
5. **Add notes** in Supabase for context on each lead

## 📞 Support

- **Next.js Docs:** https://nextjs.org/docs
- **Supabase Docs:** https://supabase.com/docs
- **Tailwind CSS:** https://tailwindcss.com
- **React Icons:** https://react-icons.github.io/react-icons

## 📄 License

Built for LuxeLeadPro. All rights reserved.

---

**Ready to go live?** See [DEPLOYMENT.md](./DEPLOYMENT.md) for production setup.
