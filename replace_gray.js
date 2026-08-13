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
    
    // Replace all occurrences of bg-gray-50 with bg-milky-100
    // Replace bg-gray-50/50 with bg-milky-100/50
    // Replace hover:bg-gray-50 with hover:bg-milky-100
    
    newContent = newContent.replace(/\bbg-gray-50\b/g, 'bg-milky-100');
    
    // Also, if there are gradient backgrounds like from-gray-50, via-gray-50, etc., replace them:
    newContent = newContent.replace(/\bfrom-gray-50\b/g, 'from-milky-100');
    newContent = newContent.replace(/\bvia-gray-50\b/g, 'via-milky-100');
    newContent = newContent.replace(/\bto-gray-50\b/g, 'to-milky-100');

    if (newContent !== content) {
      fs.writeFileSync(filePath, newContent);
      console.log(`Updated ${filePath}`);
      modifiedCount++;
    }
  }
});

console.log(`Modified ${modifiedCount} files replacing bg-gray-50 with bg-milky-100.`);
