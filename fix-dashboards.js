const fs = require('fs');
const path = require('path');

const v2Dir = 'public/v2';
const srcDir = 'C:\\Users\\rober\\OneDrive\\Desktop\\Luxe New\\luxeleadpro-11-pages';

// Fresh copy ALL files from Manus source
const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.html'));
files.forEach(f => {
  fs.copyFileSync(path.join(srcDir, f), path.join(v2Dir, f));
});
console.log(`Copied ${files.length} fresh Manus files`);

// Fix territory links in all files
files.forEach(f => {
  const fp = path.join(v2Dir, f);
  let html = fs.readFileSync(fp, 'utf8');
  html = html.replace(/\"\/territories\"/g, '"/territory"');
  fs.writeFileSync(fp, html);
});

// Make sidebar nav tabs work by adding click handlers
const sidebarScript = `
<script>
document.addEventListener('DOMContentLoaded', function() {
  // Make sidebar links highlight on click
  document.querySelectorAll('.sidebar-nav a').forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelectorAll('.sidebar-nav a').forEach(function(l) { l.classList.remove('active'); });
      this.classList.add('active');
      
      // Show/hide content sections based on tab name
      var tabName = this.textContent.trim().toLowerCase();
      document.querySelectorAll('[data-tab]').forEach(function(s) { s.style.display = 'none'; });
      var target = document.querySelector('[data-tab="' + tabName + '"]');
      if (target) target.style.display = 'block';
    });
  });
  
  // Sign Out functionality
  document.querySelectorAll('.sidebar-nav a').forEach(function(link) {
    if (link.textContent.trim() === 'Sign Out') {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        document.cookie = 'dashboard_auth=; path=/; max-age=0';
        document.cookie = 'rep_auth=; path=/; max-age=0';
        window.location.href = '/';
      });
    }
  });
});
</script>`;

// Owner dashboard - add data + nav script
let owner = fs.readFileSync(path.join(v2Dir, 'dashboard-owner.html'), 'utf8');
const ownerDataScript = `
<script>
(async function() {
  try {
    var res = await fetch('/api/owner/stats');
    if (!res.ok) return;
    var d = await res.json();
    var leads = d.leads || [];
    var reps = d.reps || [];
    var tasks = d.tasks || [];
    var todo = tasks.filter(function(t){return t.status==='todo'});
    var done = tasks.filter(function(t){return t.status==='done'});
    
    var kpis = document.querySelectorAll('.kpi-card');
    if(kpis[0]){kpis[0].querySelector('.label').textContent='MONTHLY REVENUE';kpis[0].querySelector('.value').textContent='$0';kpis[0].querySelector('.change').textContent='Pre-launch';}
    if(kpis[1]){kpis[1].querySelector('.label').textContent='TOTAL LEADS';kpis[1].querySelector('.value').textContent=leads.length;kpis[1].querySelector('.change').textContent=leads.length+' total leads';}
    if(kpis[2]){kpis[2].querySelector('.label').textContent='ACTIVE REPS';kpis[2].querySelector('.value').textContent=reps.length;kpis[2].querySelector('.change').textContent=reps.length+' active reps';}
    if(kpis[3]){kpis[3].querySelector('.label').textContent='OPEN TASKS';kpis[3].querySelector('.value').textContent=todo.length;kpis[3].querySelector('.change').textContent=done.length+' completed';}
  } catch(e){console.log('Data error:',e);}
})();
</script>`;
owner = owner.replace('</body>', ownerDataScript + '\n' + sidebarScript + '\n</body>');
fs.writeFileSync(path.join(v2Dir, 'dashboard-owner.html'), owner);
console.log('Owner dashboard: data + nav scripts added');

// Rep portal - add data script
let rep = fs.readFileSync(path.join(v2Dir, 'rep-portal.html'), 'utf8');
const repDataScript = `
<script>
(async function() {
  try {
    var res = await fetch('/api/rep/data');
    if (!res.ok) { window.location.href = '/rep/login'; return; }
    var d = await res.json();
    var h1 = document.querySelector('.dash-header h1');
    if (h1 && d.rep) h1.textContent = 'Welcome, ' + d.rep.name;
    
    var kpis = document.querySelectorAll('.kpi-card');
    if(kpis[0]){kpis[0].querySelector('.value').textContent='$0';kpis[0].querySelector('.change').textContent='30% first month / 10% recurring';}
    if(kpis[1]){kpis[1].querySelector('.value').textContent=(d.activities||[]).filter(function(a){return a.type==='demo'}).length;kpis[1].querySelector('.change').textContent=(d.activities||[]).length+' total activities';}
    if(kpis[2]){kpis[2].querySelector('.value').textContent='0%';}
    if(kpis[3]){kpis[3].querySelector('.value').textContent=(d.leads||[]).length;}
  } catch(e){console.log('Rep data error:',e);}
})();
</script>`;
rep = rep.replace('</body>', repDataScript + '\n' + sidebarScript + '\n</body>');
fs.writeFileSync(path.join(v2Dir, 'rep-portal.html'), rep);
console.log('Rep portal: data + nav scripts added');

// Agent dashboard - add nav script
let agent = fs.readFileSync(path.join(v2Dir, 'dashboard-agent.html'), 'utf8');
agent = agent.replace('</body>', sidebarScript + '\n</body>');
fs.writeFileSync(path.join(v2Dir, 'dashboard-agent.html'), agent);
console.log('Agent dashboard: nav script added');

// Manager dashboard - add nav script
let manager = fs.readFileSync(path.join(v2Dir, 'dashboard-manager.html'), 'utf8');
manager = manager.replace('</body>', sidebarScript + '\n</body>');
fs.writeFileSync(path.join(v2Dir, 'dashboard-manager.html'), manager);
console.log('Manager dashboard: nav script added');

console.log('ALL DONE');
