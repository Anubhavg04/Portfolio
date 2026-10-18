const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replacements
  content = content.replace(/text-ink(?:\/\d+)? dark:text-paper(?:\/\d+)?/g, 'text-foreground');
  content = content.replace(/text-ink dark:text-paper/g, 'text-foreground');
  
  content = content.replace(/bg-paper dark:bg-ink/g, 'bg-background');
  content = content.replace(/bg-ink(?:\/\d+)? dark:bg-paper(?:\/\d+)?/g, 'bg-foreground/5');
  
  content = content.replace(/border-ink(?:\/\d+)? dark:border-paper(?:\/\d+)?/g, 'border-foreground/10');
  
  content = content.replace(/hover:bg-ink(?:\/\d+)? dark:hover:bg-paper(?:\/\d+)?/g, 'hover:bg-foreground/5');
  
  fs.writeFileSync(filePath, content, 'utf8');
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      replaceInFile(fullPath);
    }
  }
}

walkDir(path.join(__dirname, 'src'));
console.log("Done replacing theme classes.");
