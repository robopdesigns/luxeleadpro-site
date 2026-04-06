const { chromium } = require('playwright');
const https = require('https');
const sleep = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  const browser = await chromium.connectOverCDP('http://127.0.0.1:9222');
  const ctx = browser.contexts()[0];
  
  // Get token from Supabase dashboard
  let sbPage = null;
  for (const p of ctx.pages()) {
    if (p.url().includes('supabase.com')) { sbPage = p; break; }
  }
  if (!sbPage) { console.log('No Supabase tab'); return; }
  
  const token = await sbPage.evaluate(() => {
    const raw = localStorage.getItem('supabase.dashboard.auth.token');
    if (!raw) return null;
    try { return JSON.parse(raw).access_token; } catch(e) { return null; }
  });
  if (!token) { console.log('No token'); return; }

  const projectRef = 'mqctdilesopiennycdsk';

  // Helper to call Supabase Management API
  function apiCall(method, path, body) {
    return new Promise((resolve, reject) => {
      const data = body ? JSON.stringify(body) : null;
      const opts = {
        hostname: 'api.supabase.com',
        path: `/v1/projects/${projectRef}${path}`,
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          ...(data ? { 'Content-Length': Buffer.byteLength(data) } : {})
        }
      };
      const req = https.request(opts, (res) => {
        let body = '';
        res.on('data', c => body += c);
        res.on('end', () => {
          try { resolve({ status: res.statusCode, data: JSON.parse(body) }); }
          catch(e) { resolve({ status: res.statusCode, data: body.substring(0, 300) }); }
        });
      });
      req.on('error', reject);
      if (data) req.write(data);
      req.end();
    });
  }

  // 1. Get current auth config
  console.log('Getting current auth config...');
  const config = await apiCall('GET', '/config/auth');
  console.log('Status:', config.status);
  if (config.data.SITE_URL) console.log('Current SITE_URL:', config.data.SITE_URL);
  if (config.data.URI_ALLOW_LIST) console.log('Current redirects:', config.data.URI_ALLOW_LIST);
  
  // 2. Update Site URL and redirect
  console.log('\nUpdating auth config...');
  const update = await apiCall('PATCH', '/config/auth', {
    SITE_URL: 'https://www.luxeleadpro.com',
    URI_ALLOW_LIST: 'https://www.luxeleadpro.com/**,https://luxeleadpro.com/**',
    MAILER_SUBJECTS_CONFIRMATION: 'Welcome to LuxeLeadPro — Confirm Your Email',
    MAILER_SUBJECTS_RECOVERY: 'LuxeLeadPro — Reset Your Password',
    MAILER_SUBJECTS_MAGIC_LINK: 'LuxeLeadPro — Your Login Link',
    MAILER_SUBJECTS_INVITE: 'You\'ve Been Invited to LuxeLeadPro',
  });
  console.log('Update status:', update.status);
  if (update.status !== 200) console.log('Response:', JSON.stringify(update.data).substring(0, 300));

  // 3. Update email templates
  console.log('\nUpdating email templates...');
  const emailUpdate = await apiCall('PATCH', '/config/auth', {
    MAILER_TEMPLATES_CONFIRMATION_CONTENT: `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
  <div style="text-align: center; margin-bottom: 30px;">
    <div style="display: inline-block; width: 60px; height: 60px; background: linear-gradient(135deg, #7c3aed, #d946ef); border-radius: 16px; margin-bottom: 16px;">
      <span style="color: white; font-size: 28px; font-weight: bold; line-height: 60px;">L</span>
    </div>
    <h1 style="color: #1f2937; font-size: 24px; margin: 0;">Welcome to LuxeLeadPro</h1>
    <p style="color: #6b7280; font-size: 14px; margin-top: 8px;">AI-Powered Lead Intelligence for Luxury Real Estate</p>
  </div>
  <div style="background: #f9fafb; border-radius: 12px; padding: 30px; text-align: center;">
    <p style="color: #374151; font-size: 16px; margin-bottom: 24px;">Click below to confirm your email and get started.</p>
    <a href="{{ .ConfirmationURL }}" style="display: inline-block; background: linear-gradient(135deg, #7c3aed, #d946ef); color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px;">Confirm My Email</a>
  </div>
  <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
    <p style="color: #9ca3af; font-size: 12px;">LuxeLeadPro — AI Lead Intelligence</p>
    <p style="color: #9ca3af; font-size: 12px;">luxeleadpro.com</p>
  </div>
</div>`,
    MAILER_TEMPLATES_RECOVERY_CONTENT: `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
  <div style="text-align: center; margin-bottom: 30px;">
    <div style="display: inline-block; width: 60px; height: 60px; background: linear-gradient(135deg, #7c3aed, #d946ef); border-radius: 16px; margin-bottom: 16px;">
      <span style="color: white; font-size: 28px; font-weight: bold; line-height: 60px;">L</span>
    </div>
    <h1 style="color: #1f2937; font-size: 24px; margin: 0;">Reset Your Password</h1>
  </div>
  <div style="background: #f9fafb; border-radius: 12px; padding: 30px; text-align: center;">
    <p style="color: #374151; font-size: 16px; margin-bottom: 24px;">Click below to reset your LuxeLeadPro password.</p>
    <a href="{{ .ConfirmationURL }}" style="display: inline-block; background: linear-gradient(135deg, #7c3aed, #d946ef); color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px;">Reset Password</a>
  </div>
  <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
    <p style="color: #9ca3af; font-size: 12px;">LuxeLeadPro — AI Lead Intelligence</p>
  </div>
</div>`,
  });
  console.log('Email template update:', emailUpdate.status);
  if (emailUpdate.status !== 200) console.log('Response:', JSON.stringify(emailUpdate.data).substring(0, 300));

  // 4. Verify
  console.log('\nVerifying...');
  const verify = await apiCall('GET', '/config/auth');
  console.log('SITE_URL:', verify.data.SITE_URL);
  console.log('URI_ALLOW_LIST:', verify.data.URI_ALLOW_LIST);
  console.log('Confirmation subject:', verify.data.MAILER_SUBJECTS_CONFIRMATION);
  
  console.log('\nDONE');
})().catch(e => console.log('Error:', e.message));
