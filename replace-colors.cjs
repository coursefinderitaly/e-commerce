const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src');

const replaceInFile = (filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace colors
  content = content.replace(/text-paper(\/[0-9]+)?/g, (match, opacity) => {
    if (opacity === '/5' || opacity === '/10') return 'text-gray-100';
    if (opacity === '/40' || opacity === '/50') return 'text-gray-500';
    if (opacity === '/60' || opacity === '/70') return 'text-gray-600';
    return 'text-gray-900';
  });
  content = content.replace(/bg-paper(\/[0-9]+)?/g, (match, opacity) => {
    if (opacity === '/5' || opacity === '/10') return 'bg-gray-100';
    if (opacity === '/20') return 'bg-gray-200';
    if (opacity === '/40' || opacity === '/50') return 'bg-gray-500';
    if (opacity === '/60' || opacity === '/70') return 'bg-gray-600';
    return 'bg-gray-900';
  });
  content = content.replace(/border-paper(\/[0-9]+)?/g, (match, opacity) => {
    if (opacity === '/5' || opacity === '/10') return 'border-gray-100';
    if (opacity === '/20') return 'border-gray-200';
    return 'border-gray-200';
  });

  content = content.replace(/text-ink/g, 'text-white');
  content = content.replace(/bg-ink(\/[0-9]+)?/g, (match, opacity) => {
    if (opacity) return 'bg-white/90';
    return 'bg-white';
  });
  
  content = content.replace(/text-bone/g, 'text-gray-900');
  content = content.replace(/bg-bone/g, 'bg-gray-100');
  
  content = content.replace(/text-sage/g, 'text-green-600');
  content = content.replace(/bg-sage/g, 'bg-green-500');
  
  content = content.replace(/text-rust/g, 'text-orange-600');
  content = content.replace(/bg-rust/g, 'bg-orange-500');
  
  fs.writeFileSync(filePath, content, 'utf8');
};

const walkSync = (dir, callback) => {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filepath = path.join(dir, file);
    const stats = fs.statSync(filepath);
    if (stats.isDirectory()) {
      walkSync(filepath, callback);
    } else if (stats.isFile() && (filepath.endsWith('.jsx') || filepath.endsWith('.js'))) {
      callback(filepath);
    }
  });
};

walkSync(directoryPath, replaceInFile);
console.log('Replacement complete.');
