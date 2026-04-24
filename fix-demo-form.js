const fs = require('fs');

let html = fs.readFileSync('public/v2/demo.html', 'utf8');

const script = `
<script>
document.addEventListener('DOMContentLoaded', function() {
  var btns = document.querySelectorAll('.btn-gold');
  btns.forEach(function(btn) {
    if (btn.textContent.includes('Book My Strategy Call')) {
      btn.addEventListener('click', async function(e) {
        e.preventDefault();
        btn.textContent = 'Submitting...';
        btn.style.opacity = '0.7';
        
        var inputs = document.querySelectorAll('input, select, textarea');
        var firstName = '', lastName = '', email = '', phone = '', market = '', volume = '', notes = '';
        
        inputs.forEach(function(inp) {
          var val = inp.value || '';
          if (!val) return;
          var fg = inp.closest('.form-group');
          var lbl = fg ? (fg.querySelector('label') || {}).textContent || '' : '';
          lbl = lbl.toLowerCase();
          
          if (lbl.includes('first name')) firstName = val;
          else if (lbl.includes('last name')) lastName = val;
          else if (lbl.includes('email')) email = val;
          else if (lbl.includes('phone')) phone = val;
          else if (lbl.includes('market')) market = val;
          else if (lbl.includes('volume')) volume = val;
          else if (lbl.includes('interested') || inp.tagName === 'TEXTAREA') notes = val;
        });
        
        try {
          await fetch('/api/leads/capture', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              full_name: (firstName + ' ' + lastName).trim(),
              email: email,
              phone: phone,
              market_area: market,
              challenge: notes + (volume ? ' | Volume: ' + volume : '')
            })
          });
        } catch(err) { console.log('Save error:', err); }
        
        window.location.href = 'https://calendly.com/robopdesigns/strategy-call';
      });
    }
  });
});
</script>`;

html = html.replace('</body>', script + '\n</body>');
fs.writeFileSync('public/v2/demo.html', html);
console.log('Demo form fixed - saves lead + redirects to Calendly');
