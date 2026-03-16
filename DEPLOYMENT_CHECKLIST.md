# 🚀 DEPLOYMENT CHECKLIST - LUXELEADPRO PHASE 2

## Pre-Deployment (Do This First)

### Step 1: Supabase Setup ⏱️ 5 minutes

- [ ] Sign up for Supabase (free tier works great)
  - Go to https://supabase.com
  - Click "Start your project"
  - Create new project
  
- [ ] Copy your credentials:
  - [ ] Project URL (Settings → API)
  - [ ] Anon Key (Settings → API)
  - [ ] (Save these somewhere safe!)

- [ ] Create database tables (copy/paste SQL):
  - [ ] Open Supabase SQL Editor
  - [ ] Paste the SQL from `SETUP_GUIDE.md` (the "Setup Supabase Database" section)
  - [ ] Run it
  - [ ] Tables created: ✅ user_profiles, leads, appointments

### Step 2: Local Setup ⏱️ 10 minutes

- [ ] Clone/open project: `C:\Users\rober\.openclaw\workspace\luxeleadpro-site`

- [ ] Fill in `.env.local`:
  ```env
  NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
  NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
  ```

- [ ] Install dependencies:
  ```bash
  npm install
  ```

- [ ] Run locally to test:
  ```bash
  npm run dev
  ```
  - [ ] Opens at http://localhost:3000
  - [ ] Homepage loads
  - [ ] Can click to signup
  - [ ] Can login
  - [ ] Can access agent dashboard

### Step 3: Test Complete Flow ⏱️ 10 minutes

- [ ] **Test Agent Signup**
  1. Go to http://localhost:3000/agent/signup
  2. Fill form:
     - Email: `testagent@test.com`
     - Password: `TestPassword123!`
     - Confirm: `TestPassword123!`
     - First: `John`
     - Last: `Doe`
     - Office: `Test Office`
  3. Click "Create Account"
  4. Should see success and redirect to login
  5. ✅ Check: Can you see login page?

- [ ] **Test Agent Login**
  1. Go to http://localhost:3000/agent/login
  2. Enter email & password from above
  3. Click "Sign In"
  4. Should redirect to `/agent` dashboard
  5. ✅ Check: Do you see "Welcome, John!"?

- [ ] **Test Protected Routes**
  1. Open new tab/incognito
  2. Try to access http://localhost:3000/agent directly
  3. ✅ Check: Does it redirect you to login?

- [ ] **Test Logout**
  1. On agent dashboard, click "Logout" in header
  2. ✅ Check: Redirects to home page?

- [ ] **Test Manager Login**
  1. Go to http://localhost:3000/manager/login
  2. ✅ Check: Do you see manager login page?

- [ ] **Test Pricing Page**
  1. Go to http://localhost:3000/pricing
  2. ✅ Check: Do you see all 3 pricing tiers?

- [ ] **Test Homepage**
  1. Go to http://localhost:3000
  2. ✅ Check: Do login buttons work?

- [ ] **Test Mobile Responsive**
  1. Press F12 (DevTools)
  2. Click mobile icon (top left)
  3. ✅ Check: Pages look good on phone?

### Step 4: Pre-Deployment Check ⏱️ 5 minutes

- [ ] No console errors (check DevTools → Console)
- [ ] All links work
- [ ] Forms validate
- [ ] Buttons are clickable
- [ ] Styling looks professional
- [ ] No broken images

---

## Deployment to Vercel ⏱️ 10 minutes

### Option A: Deploy from GitHub (Recommended)

1. [ ] Go to https://vercel.com
2. [ ] Sign up or login
3. [ ] Click "New Project"
4. [ ] Select repository: `luxeleadpro-site`
5. [ ] Click "Import"

**Configure Build Settings:**
- [ ] Framework: `Next.js` (auto-detected)
- [ ] Build Command: `next build` (default)
- [ ] Output Directory: `.next` (default)

**Add Environment Variables:**
- [ ] Click "Environment Variables"
- [ ] Add:
  - Name: `NEXT_PUBLIC_SUPABASE_URL`
  - Value: `https://your-project.supabase.co`
  - [ ] Save
- [ ] Add:
  - Name: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - Value: `your-anon-key-here`
  - [ ] Save

6. [ ] Click "Deploy"
7. [ ] Wait for deployment to complete (3-5 minutes)
8. [ ] You'll get a public URL like: `https://luxeleadpro-site.vercel.app`

### Option B: Manual Deployment

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod

# Follow prompts and add environment variables
```

---

## Post-Deployment ⏱️ 10 minutes

- [ ] Visit your Vercel URL
- [ ] Test signup flow on live site
- [ ] Test login on live site
- [ ] Test agent dashboard
- [ ] Test pricing page
- [ ] **All tests should pass** ✅

---

## Custom Domain (Optional but Recommended) ⏱️ 15 minutes

If you have a domain (e.g., `luxeleadpro.com`):

1. [ ] In Vercel Dashboard:
   - [ ] Go to project settings
   - [ ] Click "Domains"
   - [ ] Click "Add Domain"
   - [ ] Enter your domain: `luxeleadpro.com`

2. [ ] Vercel shows DNS records
   - [ ] Copy the nameserver records

3. [ ] Go to your domain registrar:
   - [ ] (GoDaddy, Namecheap, etc.)
   - [ ] Update nameservers to Vercel's
   - [ ] Wait for propagation (can take up to 24 hours)

4. [ ] Test:
   - [ ] Once propagated, visit `https://luxeleadpro.com`
   - [ ] Should load your Vercel app

---

## Security Checklist (Before Selling) ⏱️ 20 minutes

- [ ] **Supabase Settings**
  - [ ] Go to Supabase Dashboard → Settings
  - [ ] Enable Email Verification
  - [ ] Set strong password requirements
  - [ ] Enable Rate Limiting (Auth tab)

- [ ] **Environment Variables**
  - [ ] `.env.local` NOT committed to GitHub ✅ (already in .gitignore)
  - [ ] Vercel has environment variables set
  - [ ] No keys visible in code

- [ ] **HTTPS**
  - [ ] Vercel auto-enables HTTPS ✅
  - [ ] All traffic redirects to HTTPS

- [ ] **Database Security**
  - [ ] RLS (Row Level Security) enabled ✅ (in SQL)
  - [ ] Policies restrict user access ✅ (in SQL)
  - [ ] Backups enabled in Supabase

- [ ] **Privacy & Legal**
  - [ ] `/privacy` page setup
  - [ ] `/terms` page setup
  - [ ] Links in footer

---

## Testing Checklist (Final Verification) ⏱️ 10 minutes

### Desktop Browsers
- [ ] Chrome - All pages load, forms work
- [ ] Safari - Styling looks good
- [ ] Firefox - Links work, no console errors

### Mobile Browsers
- [ ] iOS Safari - Responsive layout works
- [ ] Android Chrome - Touch buttons work
- [ ] Hamburger menu works on mobile

### Auth Flows
- [ ] Agent can signup
- [ ] Agent can login with email/password
- [ ] Agent redirected to `/agent` dashboard
- [ ] Cannot access `/agent` without login
- [ ] Cannot access `/manager` as agent
- [ ] Logout works
- [ ] Password validation shows error if too short
- [ ] Email validation shows error if invalid

### Page Tests
- [ ] Homepage loads with hero section
- [ ] Pricing page shows 3 tiers
- [ ] All links in header/footer work
- [ ] Privacy/Terms pages exist
- [ ] Mobile hamburger menu works
- [ ] No broken images
- [ ] No console errors

---

## Launch Day Checklist ⏱️ 5 minutes

- [ ] Verify Vercel deployment is live
- [ ] Test from different device/network
- [ ] Confirm database is working
- [ ] Test one full signup flow end-to-end
- [ ] Share with beta users or team
- [ ] Get feedback and iterate

---

## Troubleshooting

### "Failed to load session"
- [ ] Check Supabase URL and Anon Key in `.env.local`
- [ ] Verify Supabase project is running
- [ ] Clear browser cache and reload

### "Signup not working"
- [ ] Check browser console for errors (F12)
- [ ] Verify email is unique (not already signed up)
- [ ] Check password is 8+ characters
- [ ] Check network tab for API response

### "Login redirects to signup"
- [ ] Verify email/password are correct
- [ ] Check Supabase console → Auth → Users
- [ ] Make sure user was created

### "Styling looks broken"
- [ ] Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- [ ] Clear `.next` folder and rebuild
- [ ] Check for Tailwind CSS warnings in console

### "Mobile menu doesn't work"
- [ ] Check browser DevTools → Console for errors
- [ ] Verify Tailwind responsive classes are included
- [ ] Try different browser

---

## Success Criteria ✅

You're ready to sell when:

- [x] All pages load without errors
- [x] Signup flow works end-to-end
- [x] Login works with email/password
- [x] Protected routes prevent unauthorized access
- [x] Dashboard displays after login
- [x] Pricing page is complete
- [x] Site works on mobile
- [x] Live on Vercel with custom domain (optional)
- [x] No console errors in DevTools
- [x] Supabase database has test user

---

## Quick Reference URLs

Once deployed, your app URLs will be:

```
Production: https://luxeleadpro.vercel.app (or custom domain)

Pages:
- Home:              https://yourdomain.com/
- Pricing:           https://yourdomain.com/pricing
- Agent Signup:      https://yourdomain.com/agent/signup
- Agent Login:       https://yourdomain.com/agent/login
- Agent Dashboard:   https://yourdomain.com/agent
- Manager Login:     https://yourdomain.com/manager/login
- Manager Dashboard: https://yourdomain.com/manager
- Privacy:           https://yourdomain.com/privacy
- Terms:             https://yourdomain.com/terms
```

---

## Total Time Estimate

- **Supabase Setup:** 5 min
- **Local Setup:** 10 min
- **Testing Locally:** 10 min
- **Vercel Deployment:** 10 min
- **Custom Domain:** 15 min (optional)
- **Security Review:** 20 min
- **Final Testing:** 10 min

**Total: ~80 minutes to live production site**

---

**Ready to deploy?** Follow this checklist and you'll be live in under 2 hours! 🚀

Once live, share these links with your first prospects:
- Landing page: `https://yourdomain.com/`
- Pricing: `https://yourdomain.com/pricing`
- Agent signup: `https://yourdomain.com/agent/signup`

**Good luck selling! 💰**
