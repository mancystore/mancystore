import React, { useState } from 'react';
import { Search, ShoppingBag, Menu, X, ArrowUpRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { BRAND_CONFIG } from '../config/brand.config';

interface NavbarProps {
  activePage: string;
  onNavigate: (page: string, params?: { category?: string; collection?: string; productId?: string }) => void;
  onSearchOpen: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activePage, onNavigate, onSearchOpen }) => {
  const { totalItems, openCartDrawer } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (page: string, params?: { category?: string; collection?: string }) => {
    onNavigate(page, params);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#F5F4F0]/95 backdrop-blur-md border-b border-[#111111]/12 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark (Architectural Kerning & Streetwear Authority) */}
          <div className="flex items-center shrink-0">
            <button
              onClick={() => handleNavClick('home')}
              className="text-2xl sm:text-3xl font-display font-black tracking-[0.2em] text-[#111111] uppercase hover:opacity-80 transition-opacity whitespace-nowrap cursor-pointer select-none"
              title={`${BRAND_CONFIG.name} — ${BRAND_CONFIG.tagline}`}
            >
              {BRAND_CONFIG.logo.wordmarkText}
            </button>
          </div>

          {/* Zone 2: Editorial Navigation Links */}
          <nav className="hidden md:flex items-center gap-9 text-xs font-medium uppercase tracking-[0.16em] text-[#111111]">
            <button
              onClick={() => handleNavClick('shop')}
              className={`hover:text-[#111111] transition-all py-1.5 cursor-pointer whitespace-nowrap shrink-0 relative ${
                activePage === 'shop'
                  ? 'text-[#111111] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#111111]'
                  : 'text-[#858585]'
              }`}
            >
              Catalogue
            </button>
            <button
              onClick={() => handleNavClick('collections')}
              className={`hover:text-[#111111] transition-all py-1.5 cursor-pointer whitespace-nowrap shrink-0 relative ${
                activePage === 'collections'
                  ? 'text-[#111111] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#111111]'
                  : 'text-[#858585]'
              }`}
            >
              Collections
            </button>
            <button
              onClick={() => handleNavClick('shop', { category: 'Tees' })}
              className="text-[#858585] hover:text-[#111111] transition-all py-1.5 cursor-pointer whitespace-nowrap shrink-0"
            >
              Heavyweight Tees
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`hover:text-[#111111] transition-all py-1.5 cursor-pointer whitespace-nowrap shrink-0 relative ${
                activePage === 'about'
                  ? 'text-[#111111] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#111111]'
                  : 'text-[#858585]'
              }`}
            >
              Manifesto
            </button>
          </nav>

          {/* Zone 3: Search & Bag Actions */}
          <div className="flex items-center gap-4 sm:gap-6 shrink-0">
            <button
              onClick={onSearchOpen}
              aria-label="Search garments"
              className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#111111] hover:text-[#858585] transition-colors cursor-pointer py-1"
            >
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline text-[11px]">Search</span>
            </button>

            <button
              onClick={openCartDrawer}
              aria-label="Shopping Bag"
              className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#111111] hover:opacity-80 transition-opacity cursor-pointer py-1"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline text-[11px]">Bag</span>
              <span className="font-mono text-xs font-bold bg-[#111111] text-[#F5F4F0] px-2 py-0.5 tabular-nums">
                {totalItems}
              </span>
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-[#111111] p-1 cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Editorial Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-18 z-50 bg-[#F5F4F0] border-t border-[#111111]/12 flex flex-col justify-between p-6 overflow-y-auto animate-in fade-in duration-200">
          <div className="space-y-6 pt-4">
            <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#858585]">
              MNC STOREFRONT // NAVIGATION
            </div>

            <nav className="flex flex-col divide-y divide-[#111111]/10 text-lg uppercase tracking-wider font-display font-bold">
              <button
                onClick={() => handleNavClick('shop')}
                className="py-3.5 flex justify-between items-center text-left hover:text-[#858585] transition-colors cursor-pointer"
              >
                <span>01 · Full Catalogue</span>
                <ArrowUpRight className="w-4 h-4 text-[#858585]" />
              </button>
              <button
                onClick={() => handleNavClick('collections')}
                className="py-3.5 flex justify-between items-center text-left hover:text-[#858585] transition-colors cursor-pointer"
              >
                <span>02 · Collections Archive</span>
                <ArrowUpRight className="w-4 h-4 text-[#858585]" />
              </button>
              <button
                onClick={() => handleNavClick('shop', { category: 'Tees' })}
                className="py-3.5 flex justify-between items-center text-left text-[#555555] hover:text-[#111111] transition-colors cursor-pointer"
              >
                <span>03 · Heavyweight Tees (300+ GSM)</span>
                <ArrowUpRight className="w-4 h-4 text-[#858585]" />
              </button>
              <button
                onClick={() => handleNavClick('shop', { category: 'Hoodies' })}
                className="py-3.5 flex justify-between items-center text-left text-[#555555] hover:text-[#111111] transition-colors cursor-pointer"
              >
                <span>04 · Hoodies & Outerwear</span>
                <ArrowUpRight className="w-4 h-4 text-[#858585]" />
              </button>
              <button
                onClick={() => handleNavClick('about')}
                className="py-3.5 flex justify-between items-center text-left hover:text-[#858585] transition-colors cursor-pointer"
              >
                <span>05 · Brand Manifesto</span>
                <ArrowUpRight className="w-4 h-4 text-[#858585]" />
              </button>
            </nav>
          </div>

          <div className="py-6 border-t border-[#111111]/10 space-y-3 text-xs font-mono text-[#858585]">
            <div className="flex justify-between items-center text-[#111111]">
              <span className="uppercase tracking-widest text-[10px]">Currency:</span>
              <span className="font-bold">MYR (Malaysian Ringgit)</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              MNC Contemporary Streetwear — Phase 1 Established Brand Art Direction.
            </p>
          </div>
        </div>
      )}
    </>
  );
};
