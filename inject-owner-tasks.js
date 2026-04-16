const fs = require('fs');

// Fresh copy owner dashboard from Manus
const src = 'C:\\Users\\rober\\OneDrive\\Desktop\\Luxe New\\luxeleadpro-11-pages\\dashboard-owner.html';
let html = fs.readFileSync(src, 'utf8');
html = html.replace(/\"\/territories\"/g, '"/territory"');

// Inject task loading + theme + sign out script
const script = `
<script>
// Theme
if(localStorage.getItem('luxe-theme')==='dark')document.documentElement.classList.add('dark');
document.querySelectorAll('.theme-toggle').forEach(function(b){b.onclick=function(){document.documentElement.classList.toggle('dark');localStorage.setItem('luxe-theme',document.documentElement.classList.contains('dark')?'dark':'light')}});

// Sign Out
document.querySelectorAll('a').forEach(function(a){if(a.textContent.trim()==='Sign Out'){a.href='#';a.onclick=function(e){e.preventDefault();document.cookie='dashboard_auth=;path=/;max-age=0';window.location.href='/';}}});

// Load real tasks
(async function(){
  try {
    var res = await fetch('/api/owner/tasks');
    if(!res.ok) return;
    var data = await res.json();
    var tasks = data.tasks || [];
    var todo = tasks.filter(function(t){return t.status==='todo'});
    var done = tasks.filter(function(t){return t.status==='done'});
    var rob = todo.filter(function(t){return t.title.indexOf('ROB:')===0});
    var atlas = todo.filter(function(t){return t.title.indexOf('ATLAS:')===0||t.title.indexOf('MANUS:')===0});
    var other = todo.filter(function(t){return t.title.indexOf('ROB:')!==0&&t.title.indexOf('ATLAS:')!==0&&t.title.indexOf('MANUS:')!==0});
    var pct = tasks.length ? Math.round(done.length/tasks.length*100) : 0;

    var bd = 'var(--border-default)';
    var bs = 'var(--border-subtle)';
    var gld = 'var(--gold)';
    var tp = 'var(--text-primary)';
    var tm = 'var(--text-muted)';
    var bg = 'var(--bg-surface)';
    var bge = 'var(--bg-elevated)';

    function renderGroup(title, color, items) {
      if(!items.length) return '';
      var h = '<div style="font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:'+color+';margin-bottom:12px">'+title+'</div>';
      h += '<div style="background:'+bg+';border:1px solid '+bd+';border-radius:12px;margin-bottom:24px">';
      items.forEach(function(t){
        var name = t.title.replace(/^(ROB|ATLAS|MANUS): /,'');
        var pc = {urgent:'background:rgba(239,68,68,0.1);color:#DC2626',high:'background:rgba(245,158,11,0.1);color:#D97706',medium:'background:rgba(59,130,246,0.1);color:#3B82F6',low:'background:rgba(16,185,129,0.1);color:#059669'};
        h += '<div style="display:flex;align-items:flex-start;gap:12px;padding:14px 20px;border-bottom:1px solid '+bs+'">';
        h += '<input type="checkbox" data-tid="'+t.id+'" style="width:18px;height:18px;accent-color:#D4AF37;cursor:pointer;margin-top:2px;flex-shrink:0">';
        h += '<div style="flex:1;min-width:0"><div style="font-size:14px;font-weight:600;color:'+tp+'">'+name+'</div>';
        if(t.description) h += '<div style="font-size:12px;color:'+tm+';margin-top:4px;line-height:1.5">'+t.description+'</div>';
        h += '</div>';
        h += '<span style="font-size:10px;font-weight:700;padding:3px 10px;border-radius:100px;white-space:nowrap;'+(pc[t.priority]||pc.medium)+'">'+t.priority+'</span>';
        h += '</div>';
      });
      h += '</div>';
      return h;
    }

    var th = '<div style="padding:32px;border-top:1px solid '+bd+'">';
    th += '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px"><h2 style="font-family:Playfair Display,serif;font-size:24px;font-weight:700">Launch Checklist</h2><span style="font-size:13px;color:'+tm+'">'+done.length+'/'+tasks.length+' ('+pct+'%)</span></div>';
    th += '<div style="width:100%;height:8px;background:'+bge+';border-radius:4px;margin-bottom:24px"><div style="width:'+pct+'%;height:8px;background:#D4AF37;border-radius:4px"></div></div>';
    th += renderGroup('Your Tasks (Rob)', '#D4AF37', rob);
    th += renderGroup('Atlas (AI) Tasks', '#718096', atlas);
    th += renderGroup('General', '#718096', other);

    if(done.length) {
      th += '<div style="font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#718096;margin-bottom:12px">Completed ('+done.length+')</div>';
      th += '<div style="background:'+bg+';border:1px solid '+bd+';border-radius:12px;margin-bottom:24px;opacity:0.5">';
      done.forEach(function(t){
        th += '<div style="display:flex;align-items:center;gap:12px;padding:12px 20px;border-bottom:1px solid '+bs+'"><input type="checkbox" checked data-tid="'+t.id+'" style="width:18px;height:18px;accent-color:#D4AF37;cursor:pointer"><span style="font-size:14px;color:#718096;text-decoration:line-through">'+t.title.replace(/^(ROB|ATLAS|MANUS): /,'')+'</span></div>';
      });
      th += '</div>';
    }
    th += '</div>';

    var m = document.querySelector('.main');
    if(m){var d=document.createElement('div');d.innerHTML=th;m.appendChild(d);}

    document.querySelectorAll('input[data-tid]').forEach(function(cb){
      cb.onchange=function(){
        fetch('/api/owner/tasks',{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:this.getAttribute('data-tid'),status:this.checked?'done':'todo'})}).then(function(){location.reload()});
      };
    });
  } catch(e){console.log('Task error:',e);}
})();
</script>`;

html = html.replace('</body>', script + '\n</body>');
fs.writeFileSync('public/v2/dashboard-owner.html', html);
console.log('Owner dashboard: tasks injected');
