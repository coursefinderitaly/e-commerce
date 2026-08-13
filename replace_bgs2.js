import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const directoryPath = path.join(__dirname, 'src');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

let modifiedCount = 0;

walkDir(directoryPath, function(filePath) {
  if (filePath.endsWith('.jsx')) {
    let content = fs.readFileSync(filePath, 'utf-8');
    let newContent = content;
    
    if (
      filePath.includes('MyProfile.jsx') ||
      filePath.includes('Auth.jsx') ||
      filePath.includes('Newsletter.jsx') ||
      filePath.includes('Hero.jsx') ||
      filePath.includes('Shop.jsx') ||
      filePath.includes('Home.jsx') ||
      filePath.includes('CartDrawer.jsx') ||
      filePath.includes('BottomNav.jsx') ||
      filePath.includes('ProductForm.jsx') ||
      filePath.includes('Modal.jsx')
    ) {
        // We replace bg-white with bg-transparent for layout wrappers, and bg-milky-50 for cards/modals
        if (filePath.includes('CartDrawer.jsx') || filePath.includes('Modal.jsx') || filePath.includes('ProductForm.jsx') || filePath.includes('Auth.jsx') || filePath.includes('MyProfile.jsx')) {
            newContent = newContent.replace(/\bbg-white\b/g, 'bg-milky-50');
            // If they had bg-white/95 or bg-white/50, replace them too
            newContent = newContent.replace(/\bbg-white\/95\b/g, 'bg-milky-50/95');
            newContent = newContent.replace(/\bbg-white\/90\b/g, 'bg-milky-50/90');
            newContent = newContent.replace(/\bbg-white\/80\b/g, 'bg-milky-50/80');
        } else {
            newContent = newContent.replace(/\bbg-white\b/g, 'bg-transparent');
            newContent = newContent.replace(/\bbg-white\/95\b/g, 'bg-transparent');
        }
    }

    if (newContent !== content) {
      fs.writeFileSync(filePath, newContent);
      console.log(`Updated ${filePath}`);
      modifiedCount++;
    }
  }
});

console.log(`Modified ${modifiedCount} files to use milky/transparent backgrounds.`);
