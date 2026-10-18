const fs = require('fs');
const files = [
  'src/components/sections/Work.tsx',
  'src/components/sections/About.tsx',
  'src/components/sections/Contact.tsx',
  'src/components/sections/Stack.tsx'
];
files.forEach(f => {
  let c = fs.readFileSync(f, 'utf8');
  c = c.replace(/opacity-\d+/g, '');
  c = c.replace(/text-foreground\/[0-9]+/g, 'text-foreground');
  c = c.replace(/text-background\/[0-9]+/g, 'text-background');
  
  // adding reveal class
  c = c.replace(/<h2 /g, '<h2 className="reveal" ');
  c = c.replace(/<h3 /g, '<h3 className="reveal" ');
  c = c.replace(/<li /g, '<li className="reveal" ');
  
  // also add reveal to other elements if needed
  c = c.replace(/className="group relative/g, 'className="reveal group relative');
  c = c.replace(/href="mailto:/g, 'className="reveal" href="mailto:');
  
  fs.writeFileSync(f, c);
});
console.log("Done");
