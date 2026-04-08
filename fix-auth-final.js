const { chromium } = require('playwright');
const https = require('https');

(async () => {
  const browser = await chromium.connectOverCDP('http://127.0.0.1:9222');
  const ctx = browser.contexts()[0];
  
  // Find Supabase tab and refresh it to get new token
  let sbPage = null;
  for (const p of ctx.pages()) { if (p.url().includes('supabase.com/dashboard')) { sbPage = p; break; } }
  if (!sbPage) { console.log('No supabase tab'); return; }
  
  // Refresh page to get new token
  await sbPage.reload({ waitUntil: 'networkidle', timeout: 15000 });
  await new Promise(r => setTimeout(r, 3000));
  
  const token = await sbPage.evaluate(() => {
    try { return JSON.parse(localStorage.getItem('supabase.dashboard.auth.token')).access_token; } catch(e) { return null; }
  });
  if (!token) { console.log('No token after refresh'); return; }
  console.log('Got fresh token');

  function apiCall(method, path, body) {
    return new Promise((resolve) => {
      const data = body ? JSON.stringify(body) : null;
      const req = https.request({
        hostname: 'api.supabase.com',
        path: '/v1/projects/mqctdilesopiennycdsk' + path,
        method,
        headers: { 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json', ...(data ? { 'Content-Length': Buffer.byteLength(data) } : {}) }
      }, res => {
        let b = '';
        res.on('data', c => b += c);
        res.on('end', () => resolve({ status: res.statusCode, body: b.substring(0, 200) }));
      });
      if (data) req.write(data);
      req.end();
    });
  }

  // 1. Confirm all unconfirmed emails
  const r1 = await apiCall('POST', '/database/query', { query: "UPDATE auth.users SET email_confirmed_at = NOW(), updated_at = NOW() WHERE email_confirmed_at IS NULL;" });
  console.log('Confirm all users:', r1.status);

  // 2. Enable auto-confirm
  const r2 = await apiCall('PATCH', '/config/auth', { mailer_autoconfirm: true });
  console.log('Auto-confirm:', r2.status);

  // 3. Assign some leads to our demo agent
  const r3 = await apiCall('POST', '/database/query', { 
    query: "UPDATE public.leads SET assigned_rep_id = (SELECT id FROM public.sales_reps WHERE email = 'demo.rep@luxeleadpro.com' LIMIT 1) WHERE assigned_rep_id IS NULL LIMIT 5;" 
  });
  console.log('Assign leads to rep:', r3.status);

  console.log('DONE ✅');
})().catch(e => console.log('Error:', e.message));
