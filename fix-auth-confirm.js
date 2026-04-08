const { chromium } = require('playwright');
const https = require('https');

(async () => {
  const browser = await chromium.connectOverCDP('http://127.0.0.1:9222');
  const ctx = browser.contexts()[0];
  let sbPage = null;
  for (const p of ctx.pages()) { if (p.url().includes('supabase.com')) { sbPage = p; break; } }
  if (!sbPage) { console.log('No supabase tab'); return; }
  const token = await sbPage.evaluate(() => {
    try { return JSON.parse(localStorage.getItem('supabase.dashboard.auth.token')).access_token; } catch(e) { return null; }
  });
  if (!token) { console.log('No token'); return; }

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
  const sql = "UPDATE auth.users SET email_confirmed_at = NOW(), updated_at = NOW() WHERE email_confirmed_at IS NULL;";
  const r1 = await apiCall('POST', '/database/query', { query: sql });
  console.log('Confirm all users:', r1.status);

  // 2. Enable auto-confirm so new signups don't need email verification
  const r2 = await apiCall('PATCH', '/config/auth', { mailer_autoconfirm: true });
  console.log('Auto-confirm enabled:', r2.status);

  // 3. Create a demo sales rep account in the sales_reps table
  const { createClient } = require('@supabase/supabase-js');
  const supabase = createClient('https://mqctdilesopiennycdsk.supabase.co', 'sb_publishable_82uVUxC5_4CMgQ7KNuC7Jw_SuhL8uCU');
  
  // Hash password for rep login
  const encoder = new TextEncoder();
  const pwData = encoder.encode('DemoRep2026!' + 'luxeleadpro_salt');
  const crypto = require('crypto');
  const hash = crypto.createHash('sha256').update('DemoRep2026!luxeleadpro_salt').digest('hex');
  
  const { data: repData, error: repErr } = await supabase.from('sales_reps').insert({
    name: 'Alex Demo Rep',
    email: 'demo.rep@luxeleadpro.com',
    password_hash: hash,
    status: 'active',
    phone: '(555) 123-4567'
  }).select().single();
  
  if (repErr) console.log('Rep create:', repErr.message);
  else console.log('Sales rep created:', repData.id, repData.email);

  console.log('DONE');
})().catch(e => console.log('Error:', e.message));
