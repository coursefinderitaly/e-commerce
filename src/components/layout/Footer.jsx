import { Link } from 'react-router-dom';
import { Heart, Instagram, Twitter, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-transparent text-bone/70 border-t border-paper/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
          
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <img src="/logo1.png" alt="Glam AURA" className="h-12 w-auto" />
            <p className="text-xs font-body text-bone/60 max-w-[250px]">
              Premium cosmetics and skincare for those who live with intention and style.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {['Shop', 'About Us', 'Contact', 'FAQ'].map((item) => (
              <Link 
                key={item} 
                to={item === 'Shop' ? '/shop' : item === 'About Us' ? '/about' : item === 'Contact' ? '/contact' : '#'} 
                className="text-xs font-body hover:text-bone transition-colors uppercase tracking-wider"
              >
                {item}
              </Link>
            ))}
          </div>

          <div className="flex gap-4">
            <a href="#" className="text-bone/40 hover:text-bone transition-colors"><Instagram size={16} /></a>
            <a href="#" className="text-bone/40 hover:text-bone transition-colors"><Twitter size={16} /></a>
            <a href="#" className="text-bone/40 hover:text-bone transition-colors"><Youtube size={16} /></a>
          </div>

        </div>

        <div className="border-t border-bone/10 mt-6 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[10px] font-body text-bone/40 uppercase tracking-widest">
            &copy; {new Date().getFullYear()} Glam AURA. All rights reserved.
          </p>
          <p className="text-[10px] font-body text-bone/30 flex items-center gap-1 uppercase tracking-widest">
            Made with <Heart size={10} className="text-berry" /> by Glam AURA
          </p>
        </div>
      </div>
    </footer>
  );
}
