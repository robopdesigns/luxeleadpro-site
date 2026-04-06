const { chromium } = require('playwright');
const https = require('https');

(async () => {
  const browser = await chromium.connectOverCDP('http://127.0.0.1:9222');
  const ctx = browser.contexts()[0];
  let sbPage = null;
  for (const p of ctx.pages()) { if (p.url().includes('supabase.com')) { sbPage = p; break; } }
  const token = await sbPage.evaluate(() => {
    try { return JSON.parse(localStorage.getItem('supabase.dashboard.auth.token')).access_token; } catch(e) { return null; }
  });

  const sql = "UPDATE auth.users SET email_confirmed_at = NOW(), updated_at = NOW() WHERE email = 'robopdesigns@gmail.com' AND email_confirmed_at IS NULL;";
  
  const data = JSON.stringify({ query: sql });
  const req = https.request({
    hostname: 'api.supabase.com',
    path: '/v1/projects/mqctdilesopiennycdsk/database/query',
    method: 'POST',
    headers: { 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(data) }
  }, res => {
    let b = '';
    res.on('data', c => b += c);
    res.on('end', () => console.log('Result:', res.statusCode, b.substring(0, 200)));
  });
  req.write(data);
  req.end();
})().catch(e => console.log('Error:', e.message));
