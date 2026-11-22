
import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { BRAND_CONFIG } from '../config/brand.config';

interface FooterProps {
  onNavigate: (page: string, params?: { category?: string; collection?: string }) => void;
  onOpenSizeGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenSizeGuide }) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsSubscribed(true);
  };

  return (
    <footer className="bg-[#111111] text-[#F5F4F0] border-t border-[#222222] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-12">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-16 border-b border-[#262626]">

          {/* Brand Philosophy */}
          <div className="md:col-span-5 space-y-3">
            <h3 className="text-3xl sm:text-4xl font-display font-black tracking-[0.18em] uppercase text-[#F5F4F0]">
              {BRAND_CONFIG.name}
            </h3>

            <p className="text-xs font-mono text-[#9A9A91] tracking-wider uppercase">
              Taiping, Malaysia
            </p>

            <p className="text-sm text-[#858585] leading-relaxed max-w-sm pt-1">
              {BRAND_CONFIG.editorialStatement}
            </p>
          </div>

          {/* Catalogue Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#9A9A91] font-semibold">
              Catalogue
            </h4>

            <ul className="space-y-2.5 text-sm text-[#C7C6C0]">
              <li>
                <button
                  onClick={() => onNavigate('shop')}
                  className="hover:text-[#FFFFFF] transition-colors cursor-pointer"
                >
                  All Products
                </button>
              </li>

              <li>
                <button
                  onClick={() => onNavigate('collections')}
                  className="hover:text-[#FFFFFF] transition-colors cursor-pointer"
                >
                  All Collections
                </button>
              </li>

              <li>
                <button
                  onClick={() => onNavigate('shop', { category: 'Tees' })}
                  className="hover:text-[#FFFFFF] transition-colors cursor-pointer"
                >
                  T-Shirts
                </button>
              </li>

              <li>
                <button
                  onClick={() => onNavigate('shop', { category: 'Hoodies' })}
                  className="hover:text-[#FFFFFF] transition-colors cursor-pointer"
                >
                  Hoodies
                </button>
              </li>
            </ul>
          </div>

          {/* Information & Brand */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#9A9A91] font-semibold">
              Information
            </h4>

            <ul className="space-y-2.5 text-sm text-[#C7C6C0]">
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#FFFFFF] transition-colors cursor-pointer"
                >
                  Brand Manifesto
                </button>
              </li>

              <li>
                <button
                  onClick={onOpenSizeGuide}
                  className="hover:text-[#FFFFFF] transition-colors cursor-pointer"
                >
                  Size & Fit Guide
                </button>
              </li>

              <li>
                <span className="text-[#858585]">Textile Standards</span>
              </li>

              <li>
                <span className="text-[#858585]">Domestic Shipping</span>
              </li>
            </ul>
          </div>

          {/* Newsletter / Dispatch */}
          <div className="md:col-span-2 space-y-5">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#9A9A91] font-semibold">
              The Dispatch
            </h4>

            <p className="text-xs text-[#858585] leading-6 max-w-xs">
              First access to upcoming releases, seasonal collections and selected updates from MNC.
            </p>

            {!isSubscribed ? (
              <form onSubmit={handleSubscribe} className="pt-2">
                <div className="relative flex items-center border-b border-[#555555] focus-within:border-[#F5F4F0] transition-colors">
                  <input
                    id="newsletter-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full bg-transparent py-3 pr-10 text-xs font-mono text-[#F5F4F0] placeholder-[#777777] outline-none"
                  />

                  <button
                    type="submit"
                    aria-label="Subscribe to newsletter"
                    className="absolute right-0 p-2 text-[#C7C6C0] hover:text-white transition-colors cursor-pointer"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex items-center gap-2 pt-3 text-xs font-mono text-[#EDEBE6]">
                <Check className="w-4 h-4 text-[#9A9A91]" />
                <span>Successfully subscribed</span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#858585] gap-4">
          <div>
            <span>© {new Date().getFullYear()} MNC. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span>Prices displayed in Malaysian Ringgit (MYR)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
