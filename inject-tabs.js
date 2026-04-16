const fs = require('fs');
const path = require('path');
const v2 = 'public/v2';

// Fresh copy from Manus source
const src = 'C:\\Users\\rober\\OneDrive\\Desktop\\Luxe New\\luxeleadpro-11-pages';
fs.readdirSync(src).filter(f => f.endsWith('.html')).forEach(f => {
  fs.copyFileSync(path.join(src, f), path.join(v2, f));
});
console.log('Fresh Manus files copied');

// Fix territory links in all files
fs.readdirSync(v2).filter(f => f.endsWith('.html')).forEach(f => {
  let html = fs.readFileSync(path.join(v2, f), 'utf8');
  html = html.replace(/\"\/territories\"/g, '"/territory"');
  fs.writeFileSync(path.join(v2, f), html);
});

// The universal script to make sidebar tabs work via content sections
// The Manus HTML puts ALL content on one page - the sidebar links just need to scroll or show/hide
// Actually, looking at the HTML structure, all content IS visible - sidebar links are just anchors
// The real issue is Sign Out needs to work

const universalScript = `
<script>
// Theme persistence
if(localStorage.getItem('luxe-theme')==='dark')document.documentElement.classList.add('dark');

// Make all theme toggles work
document.querySelectorAll('.theme-toggle').forEach(function(b){
  b.onclick=function(){
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('luxe-theme',document.documentElement.classList.contains('dark')?'dark':'light');
  }
});

// Make Sign Out work
document.querySelectorAll('a').forEach(function(a){
  if(a.textContent.trim()==='Sign Out'){
    a.href='#';
    a.onclick=function(e){
      e.preventDefault();
      document.cookie='dashboard_auth=;path=/;max-age=0';
      document.cookie='rep_auth=;path=/;max-age=0';
      window.location.href='/';
    }
  }
});

// Make sidebar nav highlight on click
document.querySelectorAll('.sidebar-nav a').forEach(function(a){
  a.addEventListener('click',function(){
    document.querySelectorAll('.sidebar-nav a').forEach(function(l){l.classList.remove('active')});
    this.classList.add('active');
  });
});
</script>`;

// Inject into all dashboard files
['dashboard-owner.html', 'dashboard-agent.html', 'dashboard-manager.html', 'rep-portal.html'].forEach(f => {
  const fp = path.join(v2, f);
  let html = fs.readFileSync(fp, 'utf8');
  
  // Only inject if not already injected
  if (!html.includes('luxe-theme')) {
    html = html.replace('</body>', universalScript + '\n</body>');
    fs.writeFileSync(fp, html);
    console.log('Injected:', f);
  } else {
    console.log('Already has script:', f);
  }
});

// Also inject into marketing pages
['homepage.html', 'pricing.html', 'territory.html', 'demo.html', 'market-landing.html'].forEach(f => {
  const fp = path.join(v2, f);
  if (!fs.existsSync(fp)) return;
  let html = fs.readFileSync(fp, 'utf8');
  if (!html.includes('luxe-theme')) {
    const themeScript = `<script>if(localStorage.getItem('luxe-theme')==='dark')document.documentElement.classList.add('dark');document.querySelectorAll('.theme-toggle').forEach(function(b){b.onclick=function(){document.documentElement.classList.toggle('dark');localStorage.setItem('luxe-theme',document.documentElement.classList.contains('dark')?'dark':'light')}});</script>`;
    html = html.replace('</body>', themeScript + '\n</body>');
    fs.writeFileSync(fp, html);
  }
});

console.log('ALL DONE');
