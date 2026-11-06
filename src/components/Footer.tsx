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
          {/* Brand Philosophy (Col 1-5) */}
          <div className="md:col-span-5 space-y-3">
            <h3 className="text-3xl sm:text-4xl font-display font-black tracking-[0.18em] uppercase text-[#F5F4F0]">
              {BRAND_CONFIG.name}
            </h3>
            <p className="text-xs font-mono text-[#9A9A91] tracking-wider uppercase">
              Contemporary Streetwear · Kuala Lumpur
            </p>
            <p className="text-sm text-[#858585] leading-relaxed max-w-sm pt-1">
              {BRAND_CONFIG.editorialStatement}
            </p>
          </div>

          {/* Catalogue Links (Col 6-8) */}
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
                  All Silhouettes
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('collections')}
                  className="hover:text-[#FFFFFF] transition-colors cursor-pointer"
                >
                  Collections Archive
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', { category: 'Tees' })}
                  className="hover:text-[#FFFFFF] transition-colors cursor-pointer"
                >
                  Heavyweight Tees
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', { category: 'Hoodies' })}
                  className="hover:text-[#FFFFFF] transition-colors cursor-pointer"
                >
                  Hoodies & Outerwear
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('collections', { collection: 'mnc-archive' })}
                  className="hover:text-[#FFFFFF] transition-colors cursor-pointer"
                >
                  Archive Vault
                </button>
              </li>
            </ul>
          </div>

          {/* Information & Brand (Col 9-10) */}
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

          {/* Newsletter / Dispatch (Col 11-12) */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#9A9A91] font-semibold">
              The Dispatch
            </h4>
            <p className="text-xs text-[#858585] leading-relaxed">
              Early notification for seasonal drops and limited releases.
            </p>

            {!isSubscribed ? (
              <form onSubmit={handleSubscribe} className="space-y-2 pt-1">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full bg-[#1A1A1A] border border-[#333333] px-3 py-2 text-xs font-mono text-[#F5F4F0] placeholder-[#666666] outline-none focus:border-[#9A9A91] transition-colors"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe to newsletter"
                    className="absolute right-1 top-1 bottom-1 px-2.5 bg-[#F5F4F0] text-[#111111] hover:bg-[#FFFFFF] flex items-center justify-center cursor-pointer transition-colors"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex items-center gap-2 p-2 bg-[#1A1A1A] border border-[#333333] text-xs font-mono text-[#EDEBE6]">
                <Check className="w-3.5 h-3.5 text-[#9A9A91]" />
                <span>Subscribed</span>
              </div>
            )}
          </div>
        </div>

        {/* Clean Bottom Bar */}
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
