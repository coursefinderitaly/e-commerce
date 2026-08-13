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
    // Replace 'bg-white' in section, div wrappers, header wrappers, etc.
    // We'll just replace `className="...bg-white..."` with `bg-transparent` where it makes sense for sections.
    // Specifically targeting:
    // <section className="... bg-white">
    // <div className="... bg-white"> for big wrappers
    // Let's replace 'bg-white' with 'bg-milky-100' globally to give the milky feel, EXCEPT for ProductCard where it might need to stay white or be milky.
    
    // Instead of blind global replace, let's target specific known sections:
    const sectionsToMilky = [
      'bg-white'
    ];
    
    // Careful replace: we replace exact word boundary bg-white with bg-transparent for most large structural components.
    if (filePath.includes('BestSellers.jsx') || 
        filePath.includes('FlashDeals.jsx') || 
        filePath.includes('CategorySpotlight.jsx') || 
        filePath.includes('CategoryShowcase.jsx') || 
        filePath.includes('Testimonials.jsx') || 
        filePath.includes('TrustBadges.jsx') || 
        filePath.includes('PromoBanners.jsx') || 
        filePath.includes('Navbar.jsx') || 
        filePath.includes('App.jsx') || 
        filePath.includes('ProductDetail.jsx')) {
        
        newContent = newContent.replace(/\bbg-white\b/g, 'bg-transparent');
    }
    
    // For cards (like ProductCard, CartDrawer), we can change them to milky or leave them white.
    // Let's change ProductCard to milky-50 or transparent.
    if (filePath.includes('ProductCard.jsx')) {
        newContent = newContent.replace(/\bbg-white\b/g, 'bg-milky-50');
    }

    if (newContent !== content) {
      fs.writeFileSync(filePath, newContent);
      console.log(`Updated ${filePath}`);
      modifiedCount++;
    }
  }
});

console.log(`Modified ${modifiedCount} files to use milky/transparent backgrounds.`);
