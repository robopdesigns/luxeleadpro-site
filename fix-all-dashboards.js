const fs = require('fs');
const path = require('path');

const v2 = 'public/v2';

// Re-copy fresh from Manus
const src = 'C:\\Users\\rober\\OneDrive\\Desktop\\Luxe New\\luxeleadpro-11-pages';
fs.readdirSync(src).filter(f => f.endsWith('.html')).forEach(f => {
  fs.copyFileSync(path.join(src, f), path.join(v2, f));
});
console.log('Fresh Manus files copied');

// Universal tab script that works on ALL dashboards
function makeTabScript(dashboardType) {
  return `
<script>
(function(){
  // Theme
  if(localStorage.getItem('luxe-theme')==='dark')document.documentElement.classList.add('dark');
  document.querySelectorAll('.theme-toggle').forEach(function(b){b.onclick=function(){document.documentElement.classList.toggle('dark');localStorage.setItem('luxe-theme',document.documentElement.classList.contains('dark')?'dark':'light')}});
  
  // Sign out
  document.querySelectorAll('.sidebar-nav a, .sidebar-nav button').forEach(function(el){
    if(el.textContent.trim().match(/sign out|logout/i)){
      el.onclick=function(e){e.preventDefault();document.cookie='dashboard_auth=;path=/;max-age=0';document.cookie='rep_auth=;path=/;max-age=0';window.location.href='/';}
    }
  });
})();
</script>`;
}

// Fix territory links + add scripts to each dashboard
['dashboard-owner.html','dashboard-agent.html','dashboard-manager.html','rep-portal.html'].forEach(f => {
  let html = fs.readFileSync(path.join(v2, f), 'utf8');
  html = html.replace(/\"\/territories\"/g, '"/territory"');
  html = html.replace('</body>', makeTabScript(f) + '\n</body>');
  fs.writeFileSync(path.join(v2, f), html);
  console.log('Fixed: ' + f);
});

// Fix all other pages territory links
['homepage.html','pricing.html','territory.html','demo.html','market-landing.html','login.html','components.html'].forEach(f => {
  const fp = path.join(v2, f);
  if (fs.existsSync(fp)) {
    let html = fs.readFileSync(fp, 'utf8');
    html = html.replace(/\"\/territories\"/g, '"/territory"');
    // Add theme persistence
    if (!html.includes('luxe-theme')) {
      html = html.replace('</body>', `<script>if(localStorage.getItem('luxe-theme')==='dark')document.documentElement.classList.add('dark');document.querySelectorAll('.theme-toggle').forEach(function(b){b.onclick=function(){document.documentElement.classList.toggle('dark');localStorage.setItem('luxe-theme',document.documentElement.classList.contains('dark')?'dark':'light')}});</script>\n</body>`);
    }
    fs.writeFileSync(fp, html);
  }
});

console.log('ALL DONE');
