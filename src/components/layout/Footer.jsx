import { Link } from 'react-router-dom';
import { Heart, Instagram, Twitter, Youtube, Facebook, Mail, Phone, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 border-t border-gray-800 pt-12 pb-20 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: Brand & Contact */}
          <div>
            <Link to="/" className="flex items-center gap-2.5 mb-4 group">
              <div className="p-1 rounded-xl bg-gray-900 border border-gray-800 shadow-[0_4px_16px_rgba(0,0,0,0.4)] flex items-center justify-center group-hover:border-amber-500/30 transition-colors">
                <img
                  src="/logo1.png"
                  alt="My Glam Aura Logo"
                  className="h-10 sm:h-12 w-auto object-contain filter brightness-110 saturate-125"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="flex flex-col text-left">
                <div className="flex items-baseline">
                  <span className="font-sans font-extrabold text-base sm:text-lg tracking-tight text-white uppercase">
                    GLAM
                  </span>
                  <span className="font-display italic font-semibold text-base sm:text-lg tracking-normal text-amber-500 ml-0.5">
                    Aura
                  </span>
                </div>
                <span className="text-[7.5px] uppercase tracking-[0.25em] font-black text-amber-500/80 mt-0.5">
                  Clean Cosmetics
                </span>
              </div>
            </Link>
            <p className="text-xs text-gray-400 leading-relaxed mb-4">
              Glam Aura is your premier destination for clinical-grade clean skincare, revitalizing hair therapies, and luxury cosmetics.
            </p>
            <div className="space-y-2 text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-yellow-400" />
                <span>support@glamaura.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-yellow-400" />
                <span>+1 (800) 452-6287 (Mon-Sat 9AM - 8PM)</span>
              </div>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">
              Shop Categories
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/shop/Hair" className="hover:text-white transition-colors">
                  Hair Care & Scalp Oils
                </Link>
              </li>
              <li>
                <Link to="/shop/Skin" className="hover:text-white transition-colors">
                  Skin Serums & Creams
                </Link>
              </li>
              <li>
                <Link to="/shop/Body" className="hover:text-white transition-colors">
                  Body Soufflés & Scrubs
                </Link>
              </li>
              <li>
                <Link to="/shop/Face" className="hover:text-white transition-colors">
                  Face Foundation & Tints
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-white transition-colors font-bold text-yellow-400">
                  ⚡ All Deals & Bestsellers
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Care */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">
              Customer Support
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/profile" className="hover:text-white transition-colors">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-white transition-colors">
                  Shipping & Delivery Policy
                </Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-white transition-colors">
                  30-Day Easy Returns & Refunds
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Help Center & FAQs
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About Our Clean Promise
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Trust & Socials */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">
              Connect & Secure
            </h4>
            <p className="text-xs text-gray-400 mb-4">
              Follow our beauty journey on social media for tutorials, behind-the-scenes, and giveaway alerts.
            </p>
            <div className="flex gap-3 mb-6">
              <a href="#" className="w-9 h-9 rounded-full bg-gray-800 hover:bg-yellow-400 hover:text-black text-gray-300 flex items-center justify-center transition-colors">
                <Instagram size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-gray-800 hover:bg-yellow-400 hover:text-black text-gray-300 flex items-center justify-center transition-colors">
                <Twitter size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-gray-800 hover:bg-yellow-400 hover:text-black text-gray-300 flex items-center justify-center transition-colors">
                <Youtube size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-gray-800 hover:bg-yellow-400 hover:text-black text-gray-300 flex items-center justify-center transition-colors">
                <Facebook size={16} />
              </a>
            </div>

            <div className="flex items-center gap-2 bg-gray-800/80 p-3 rounded-xl border border-gray-700 text-[11px] text-gray-300">
              <ShieldCheck size={18} className="text-emerald-400 flex-shrink-0" />
              <span>100% Secure Checkout with 256-bit SSL Encryption</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Payment Logos & Copyright */}
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px]">
          <p className="text-gray-500">
            &copy; {new Date().getFullYear()} Glam AURA Cosmetics Inc. All rights reserved.
          </p>

          <div className="flex items-center gap-3 text-xs text-gray-400 font-bold uppercase tracking-wider">
            <span>Visa</span>
            <span>•</span>
            <span>Mastercard</span>
            <span>•</span>
            <span>Apple Pay</span>
            <span>•</span>
            <span>PayPal</span>
            <span>•</span>
            <span>Cash on Delivery</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
