const fs = require('fs');
const files = [
  'src/components/sections/Work.tsx',
  'src/components/sections/About.tsx',
  'src/components/sections/Contact.tsx',
  'src/components/sections/Stack.tsx'
];
files.forEach(f => {
  let c = fs.readFileSync(f, 'utf8');
  c = c.replace(/<div(?=[^>]*className=\"[^\"]*reveal[^\"]*\")/g, '<div suppressHydrationWarning');
  c = c.replace(/<h2(?=[^>]*className=\"[^\"]*reveal[^\"]*\")/g, '<h2 suppressHydrationWarning');
  c = c.replace(/<h3(?=[^>]*className=\"[^\"]*reveal[^\"]*\")/g, '<h3 suppressHydrationWarning');
  c = c.replace(/<h4(?=[^>]*className=\"[^\"]*reveal[^\"]*\")/g, '<h4 suppressHydrationWarning');
  c = c.replace(/<li(?=[^>]*className=\"[^\"]*reveal[^\"]*\")/g, '<li suppressHydrationWarning');
  c = c.replace(/<span(?=[^>]*className=\"[^\"]*reveal[^\"]*\")/g, '<span suppressHydrationWarning');
  c = c.replace(/<p(?=[^>]*className=\"[^\"]*reveal[^\"]*\")/g, '<p suppressHydrationWarning');
  
  fs.writeFileSync(f, c);
});
console.log('Done');
