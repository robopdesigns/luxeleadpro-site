const fs = require('fs');

let html = fs.readFileSync('public/v2/rep-portal.html', 'utf8');

// Find the </main> or end of main content to inject tab content sections
const mainEndIdx = html.indexOf('</body>');

// Build the scripts/training content
const scriptsContent = `
<div id="tab-scripts" style="display:none;padding:32px;">
  <h2 style="font-family:'Playfair Display',serif;font-size:24px;font-weight:700;color:var(--text-primary);margin-bottom:24px;">Scripts & Training</h2>
  
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:32px;">
    <a href="/training/pitch-deck.html" target="_blank" style="display:flex;align-items:flex-start;gap:16px;padding:20px;background:var(--bg-surface);border:1px solid var(--border-default);border-radius:12px;text-decoration:none;transition:all .2s;" onmouseover="this.style.borderColor='#D4AF37'" onmouseout="this.style.borderColor='var(--border-default)'">
      <div style="width:40px;height:40px;background:var(--gold-muted);border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg></div>
      <div><div style="font-size:14px;font-weight:600;color:var(--text-primary)">Pitch Deck</div><div style="font-size:12px;color:var(--text-muted);margin-top:2px">9-slide presentation for selling LuxeLeadPro</div></div>
    </a>
    <a href="/training/outreach-templates.html" target="_blank" style="display:flex;align-items:flex-start;gap:16px;padding:20px;background:var(--bg-surface);border:1px solid var(--border-default);border-radius:12px;text-decoration:none;transition:all .2s;" onmouseover="this.style.borderColor='#D4AF37'" onmouseout="this.style.borderColor='var(--border-default)'">
      <div style="width:40px;height:40px;background:var(--gold-muted);border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></div>
      <div><div style="font-size:14px;font-weight:600;color:var(--text-primary)">Cold Outreach Templates</div><div style="font-size:12px;color:var(--text-muted);margin-top:2px">Email, LinkedIn, phone, text + follow-up sequence</div></div>
    </a>
    <a href="/training/quick-start.html" target="_blank" style="display:flex;align-items:flex-start;gap:16px;padding:20px;background:var(--bg-surface);border:1px solid var(--border-default);border-radius:12px;text-decoration:none;transition:all .2s;" onmouseover="this.style.borderColor='#D4AF37'" onmouseout="this.style.borderColor='var(--border-default)'">
      <div style="width:40px;height:40px;background:var(--gold-muted);border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10"/></svg></div>
      <div><div style="font-size:14px;font-weight:600;color:var(--text-primary)">Quick Start Guide</div><div style="font-size:12px;color:var(--text-muted);margin-top:2px">Your first 4 weeks — what to do and when</div></div>
    </a>
    <a href="/training/commission-structure.html" target="_blank" style="display:flex;align-items:flex-start;gap:16px;padding:20px;background:var(--bg-surface);border:1px solid var(--border-default);border-radius:12px;text-decoration:none;transition:all .2s;" onmouseover="this.style.borderColor='#D4AF37'" onmouseout="this.style.borderColor='var(--border-default)'">
      <div style="width:40px;height:40px;background:var(--gold-muted);border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg></div>
      <div><div style="font-size:14px;font-weight:600;color:var(--text-primary)">Commission Structure</div><div style="font-size:12px;color:var(--text-muted);margin-top:2px">How much you earn per customer, per tier</div></div>
    </a>
    <a href="/training/competitive-positioning.html" target="_blank" style="display:flex;align-items:flex-start;gap:16px;padding:20px;background:var(--bg-surface);border:1px solid var(--border-default);border-radius:12px;text-decoration:none;transition:all .2s;" onmouseover="this.style.borderColor='#D4AF37'" onmouseout="this.style.borderColor='var(--border-default)'">
      <div style="width:40px;height:40px;background:var(--gold-muted);border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg></div>
      <div><div style="font-size:14px;font-weight:600;color:var(--text-primary)">Competitive Positioning</div><div style="font-size:12px;color:var(--text-muted);margin-top:2px">Why we beat Zillow, BoldLeads, CINC</div></div>
    </a>
    <a href="/docs/founding-welcome.html" target="_blank" style="display:flex;align-items:flex-start;gap:16px;padding:20px;background:var(--bg-surface);border:1px solid var(--border-default);border-radius:12px;text-decoration:none;transition:all .2s;" onmouseover="this.style.borderColor='#D4AF37'" onmouseout="this.style.borderColor='var(--border-default)'">
      <div style="width:40px;height:40px;background:var(--gold-muted);border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></div>
      <div><div style="font-size:14px;font-weight:600;color:var(--text-primary)">Welcome Kit (for clients)</div><div style="font-size:12px;color:var(--text-muted);margin-top:2px">Send to new Territory clients after close</div></div>
    </a>
  </div>

  <h3 style="font-size:16px;font-weight:700;color:var(--text-primary);margin-bottom:16px;">Talk Tracks</h3>
  <div style="display:flex;flex-direction:column;gap:12px;">
    <div style="background:var(--bg-surface);border:1px solid var(--border-default);border-radius:12px;padding:20px;">
      <div style="font-size:14px;font-weight:700;color:var(--text-primary);margin-bottom:8px;">Opening Pitch</div>
      <div style="font-size:13px;color:var(--text-secondary);line-height:1.7;">Hi [Name], this is [Your Name] from LuxeLeadPro. We're the only AI platform that both scores AND delivers verified luxury buyer leads directly to agents like you. Our agents wake up every morning knowing exactly who to call. Do you have 2 minutes?</div>
    </div>
    <div style="background:var(--bg-surface);border:1px solid var(--border-default);border-radius:12px;padding:20px;">
      <div style="font-size:14px;font-weight:700;color:var(--text-primary);margin-bottom:8px;">The Territory Close (Best)</div>
      <div style="font-size:13px;color:var(--text-secondary);line-height:1.7;">Here's what our top agents are doing — they're locking in a territory. For $1,499/month, you own your ZIP codes exclusively. Nobody else gets leads in your area. We deliver 30-50 leads/month, our AI sends the first touch automatically. One closed deal pays for 6+ months.</div>
    </div>
    <div style="background:var(--bg-surface);border:1px solid var(--border-default);border-radius:12px;padding:20px;">
      <div style="font-size:14px;font-weight:700;color:var(--text-primary);margin-bottom:8px;">Objection: Too Expensive</div>
      <div style="font-size:13px;color:var(--text-secondary);line-height:1.7;">What's one luxury deal worth in commission? $15K? $25K? Our Intelligence plan is $249/month — that's $8/day. If it helps you close just ONE extra deal this year, that's a 50-100x return.</div>
    </div>
    <div style="background:var(--bg-surface);border:1px solid var(--border-default);border-radius:12px;padding:20px;">
      <div style="font-size:14px;font-weight:700;color:var(--text-primary);margin-bottom:8px;">Objection: Already Use Zillow</div>
      <div style="font-size:13px;color:var(--text-secondary);line-height:1.7;">Right, and so does every other agent in your ZIP code. Zillow sells the same lead to 3-5 agents. With our Territory plan, you're the ONLY agent getting leads in your area. Exclusivity is the whole game in luxury.</div>
    </div>
  </div>
</div>

<div id="tab-goals" style="display:none;padding:32px;">
  <h2 style="font-family:'Playfair Display',serif;font-size:24px;font-weight:700;color:var(--text-primary);margin-bottom:24px;">Goals & Rewards</h2>
  
  <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px;margin-bottom:32px;">
    <div style="background:var(--bg-surface);border:1px solid var(--border-default);border-radius:12px;padding:20px;text-align:center;">
      <div style="font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--text-muted);margin-bottom:8px;">THIS MONTH</div>
      <div style="font-family:'JetBrains Mono',monospace;font-size:28px;font-weight:700;color:#D4AF37;">$0</div>
      <div style="font-size:12px;color:var(--text-muted);margin-top:4px;">Commissions earned</div>
    </div>
    <div style="background:var(--bg-surface);border:1px solid var(--border-default);border-radius:12px;padding:20px;text-align:center;">
      <div style="font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--text-muted);margin-bottom:8px;">ACTIVE CUSTOMERS</div>
      <div style="font-family:'JetBrains Mono',monospace;font-size:28px;font-weight:700;color:var(--text-primary);">0</div>
      <div style="font-size:12px;color:var(--text-muted);margin-top:4px;">3+ months active</div>
    </div>
    <div style="background:var(--bg-surface);border:1px solid var(--border-default);border-radius:12px;padding:20px;text-align:center;">
      <div style="font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--text-muted);margin-bottom:8px;">NEXT MILESTONE</div>
      <div style="font-family:'JetBrains Mono',monospace;font-size:28px;font-weight:700;color:var(--text-primary);">10</div>
      <div style="font-size:12px;color:var(--text-muted);margin-top:4px;">customers for $500 bonus</div>
    </div>
  </div>

  <h3 style="font-size:16px;font-weight:700;color:var(--text-primary);margin-bottom:16px;">Incentive Bonuses</h3>
  <div style="display:flex;flex-direction:column;gap:8px;">
    <div style="display:flex;align-items:center;gap:16px;padding:16px 20px;background:var(--bg-surface);border:1px solid var(--border-default);border-radius:12px;">
      <div style="font-size:24px;">&#9733;</div>
      <div style="flex:1"><div style="font-size:14px;font-weight:700;color:var(--text-primary);">10 Active Customers (3+ months)</div><div style="font-size:13px;color:#D4AF37;">$500 Cash Bonus</div></div>
      <span style="font-size:10px;font-weight:700;padding:4px 12px;border-radius:100px;background:var(--bg-elevated);color:var(--text-muted);">LOCKED</span>
    </div>
    <div style="display:flex;align-items:center;gap:16px;padding:16px 20px;background:var(--bg-surface);border:1px solid var(--border-default);border-radius:12px;">
      <div style="font-size:24px;">&#9734;</div>
      <div style="flex:1"><div style="font-size:14px;font-weight:700;color:var(--text-primary);">25 Active Customers (3+ months)</div><div style="font-size:13px;color:#D4AF37;">$1,500 Cash Bonus + 5% raise on recurring</div></div>
      <span style="font-size:10px;font-weight:700;padding:4px 12px;border-radius:100px;background:var(--bg-elevated);color:var(--text-muted);">LOCKED</span>
    </div>
    <div style="display:flex;align-items:center;gap:16px;padding:16px 20px;background:var(--bg-surface);border:1px solid var(--border-default);border-radius:12px;">
      <div style="font-size:24px;">&#9830;</div>
      <div style="flex:1"><div style="font-size:14px;font-weight:700;color:var(--text-primary);">50 Active Customers (3+ months)</div><div style="font-size:13px;color:#D4AF37;">$5,000 Cash Bonus + Senior Rep title</div></div>
      <span style="font-size:10px;font-weight:700;padding:4px 12px;border-radius:100px;background:var(--bg-elevated);color:var(--text-muted);">LOCKED</span>
    </div>
    <div style="display:flex;align-items:center;gap:16px;padding:16px 20px;background:var(--bg-surface);border:1px solid var(--border-default);border-radius:12px;">
      <div style="font-size:24px;">&#9813;</div>
      <div style="flex:1"><div style="font-size:14px;font-weight:700;color:var(--text-primary);">100 Active Customers (3+ months)</div><div style="font-size:13px;color:#D4AF37;">$15,000 Cash Bonus + Revenue Share + Team Lead</div></div>
      <span style="font-size:10px;font-weight:700;padding:4px 12px;border-radius:100px;background:var(--bg-elevated);color:var(--text-muted);">LOCKED</span>
    </div>
  </div>
</div>
`;

// Find the closing </div> of the main content area (before the scripts)
// The main div ends before our injected scripts
const scriptIdx = html.indexOf('<script>');
const mainCloseIdx = html.lastIndexOf('</div>', scriptIdx);

// Insert the tab content sections and update the tab switching script
const tabSwitchScript = `
<script>
document.addEventListener('DOMContentLoaded', function() {
  var mainContent = document.querySelector('.main');
  var defaultContent = mainContent ? mainContent.innerHTML : '';
  
  // Wrap default content in a tab div
  if (mainContent) {
    var wrapper = document.createElement('div');
    wrapper.id = 'tab-dashboard';
    wrapper.innerHTML = defaultContent;
    mainContent.innerHTML = '';
    mainContent.appendChild(wrapper);
    
    // Move tab content into main
    var scripts = document.getElementById('tab-scripts');
    var goals = document.getElementById('tab-goals');
    if (scripts) mainContent.appendChild(scripts);
    if (goals) mainContent.appendChild(goals);
  }
  
  // Tab switching
  document.querySelectorAll('.sidebar-nav a').forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelectorAll('.sidebar-nav a').forEach(function(l) { l.classList.remove('active'); });
      this.classList.add('active');
      
      var text = this.textContent.trim().toLowerCase();
      var tabs = ['tab-dashboard', 'tab-scripts', 'tab-goals'];
      tabs.forEach(function(t) { var el = document.getElementById(t); if(el) el.style.display = 'none'; });
      
      if (text.includes('dashboard') || text.includes('overview')) {
        document.getElementById('tab-dashboard').style.display = 'block';
      } else if (text.includes('script') || text.includes('training')) {
        document.getElementById('tab-scripts').style.display = 'block';
      } else if (text.includes('goal') || text.includes('commission') || text.includes('reward')) {
        document.getElementById('tab-goals').style.display = 'block';
      } else if (text.includes('sign out') || text.includes('logout')) {
        document.cookie = 'rep_auth=; path=/; max-age=0';
        window.location.href = '/';
      } else {
        // Default show dashboard
        document.getElementById('tab-dashboard').style.display = 'block';
      }
    });
  });
});
</script>`;

// Remove old scripts and add new ones
html = html.replace(/<script>[\s\S]*?<\/script>/g, '');
html = html.replace('</body>', scriptsContent + '\n' + tabSwitchScript + '\n</body>');

fs.writeFileSync('public/v2/rep-portal.html', html);
console.log('Rep portal: tabs with real content added');
