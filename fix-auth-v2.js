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
  if (!token) { console.log('No token'); return; }

  function patch(body) {
    return new Promise((resolve, reject) => {
      const data = JSON.stringify(body);
      const req = https.request({
        hostname: 'api.supabase.com',
        path: '/v1/projects/mqctdilesopiennycdsk/config/auth',
        method: 'PATCH',
        headers: { 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(data) }
      }, res => {
        let b = '';
        res.on('data', c => b += c);
        res.on('end', () => resolve({ status: res.statusCode, body: b.substring(0, 200) }));
      });
      req.on('error', reject);
      req.write(data);
      req.end();
    });
  }

  // Fix site URL + redirects
  console.log('Fixing site_url...');
  let r = await patch({
    site_url: 'https://www.luxeleadpro.com',
    uri_allow_list: 'https://www.luxeleadpro.com/**,https://luxeleadpro.com/**',
  });
  console.log('Site URL:', r.status, r.body.substring(0, 100));

  // Fix email subjects
  console.log('\nFixing email subjects...');
  r = await patch({
    mailer_subjects_confirmation: 'Welcome to LuxeLeadPro — Confirm Your Email',
    mailer_subjects_recovery: 'LuxeLeadPro — Reset Your Password',
    mailer_subjects_magic_link: 'LuxeLeadPro — Your Login Link',
    mailer_subjects_invite: "You've Been Invited to LuxeLeadPro",
  });
  console.log('Subjects:', r.status);

  // Fix email templates
  console.log('\nFixing confirmation template...');
  r = await patch({
    mailer_templates_confirmation_content: `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;padding:40px 20px"><div style="text-align:center;margin-bottom:30px"><div style="display:inline-block;width:60px;height:60px;background:linear-gradient(135deg,#7c3aed,#d946ef);border-radius:16px;margin-bottom:16px"><span style="color:white;font-size:28px;font-weight:bold;line-height:60px">L</span></div><h1 style="color:#1f2937;font-size:24px;margin:0">Welcome to LuxeLeadPro</h1><p style="color:#6b7280;font-size:14px;margin-top:8px">AI-Powered Lead Intelligence for Luxury Real Estate</p></div><div style="background:#f9fafb;border-radius:12px;padding:30px;text-align:center"><p style="color:#374151;font-size:16px;margin-bottom:24px">Click below to confirm your email and get started.</p><a href="{{ .ConfirmationURL }}" style="display:inline-block;background:linear-gradient(135deg,#7c3aed,#d946ef);color:white;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:600;font-size:16px">Confirm My Email</a></div><div style="text-align:center;margin-top:30px;padding-top:20px;border-top:1px solid #e5e7eb"><p style="color:#9ca3af;font-size:12px">LuxeLeadPro — AI Lead Intelligence | luxeleadpro.com</p></div></div>`,
  });
  console.log('Confirmation template:', r.status);

  console.log('\nFixing recovery template...');
  r = await patch({
    mailer_templates_recovery_content: `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;padding:40px 20px"><div style="text-align:center;margin-bottom:30px"><div style="display:inline-block;width:60px;height:60px;background:linear-gradient(135deg,#7c3aed,#d946ef);border-radius:16px;margin-bottom:16px"><span style="color:white;font-size:28px;font-weight:bold;line-height:60px">L</span></div><h1 style="color:#1f2937;font-size:24px;margin:0">Reset Your Password</h1></div><div style="background:#f9fafb;border-radius:12px;padding:30px;text-align:center"><p style="color:#374151;font-size:16px;margin-bottom:24px">Click below to reset your LuxeLeadPro password.</p><a href="{{ .ConfirmationURL }}" style="display:inline-block;background:linear-gradient(135deg,#7c3aed,#d946ef);color:white;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:600;font-size:16px">Reset Password</a></div><div style="text-align:center;margin-top:30px;padding-top:20px;border-top:1px solid #e5e7eb"><p style="color:#9ca3af;font-size:12px">LuxeLeadPro — AI Lead Intelligence | luxeleadpro.com</p></div></div>`,
  });
  console.log('Recovery template:', r.status);

  // Verify
  console.log('\nVerifying...');
  const verify = await new Promise((resolve) => {
    https.get({ hostname: 'api.supabase.com', path: '/v1/projects/mqctdilesopiennycdsk/config/auth', headers: { 'Authorization': 'Bearer ' + token } }, res => {
      let b = '';
      res.on('data', c => b += c);
      res.on('end', () => { const d = JSON.parse(b); resolve(d); });
    });
  });
  console.log('site_url:', verify.site_url);
  console.log('uri_allow_list:', verify.uri_allow_list);
  console.log('confirmation subject:', verify.mailer_subjects_confirmation);
  console.log('template set:', verify.mailer_templates_confirmation_content?.length > 100 ? 'YES' : 'NO');
  
  console.log('\nALL DONE ✅');
})().catch(e => console.log('Error:', e.message));
