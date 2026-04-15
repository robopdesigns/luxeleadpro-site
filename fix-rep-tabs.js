const fs = require('fs');

let html = fs.readFileSync('public/v2/rep-portal.html', 'utf8');

// Find what sidebar nav items exist
const navItems = html.match(/<a[^>]*>[\s\S]*?<\/a>/g) || [];
const sidebarItems = navItems.filter(n => n.includes('sidebar-nav') || !n.includes('href'));
console.log('Nav items found:', navItems.length);

// Find the main content area
const mainStart = html.indexOf('class="main"');
const mainContent = html.substring(mainStart, mainStart + 2000);
console.log('Main content preview:', mainContent.substring(0, 500));

// List all panel headers
const panels = html.match(/<h3[^>]*>[^<]+<\/h3>/g) || [];
panels.forEach(p => console.log('Panel:', p));
