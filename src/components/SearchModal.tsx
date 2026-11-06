import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { Product } from '../types/product';
import { ImageWithFallback } from './ImageWithFallback';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (productId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onSelectProduct }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const results: Product[] = query.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.collectionName.toLowerCase().includes(query.toLowerCase())
      )
    : PRODUCTS.slice(0, 4);

  return (
    <div className="fixed inset-0 z-50 bg-[#111111]/70 backdrop-blur-sm flex items-start justify-center pt-16 sm:pt-24 px-4">
      <div className="bg-[#F5F4F0] w-full max-w-2xl border border-[#111111]/20 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center px-4 sm:px-6 py-4 border-b border-[#111111]/10 gap-3">
          <Search className="w-5 h-5 text-[#858585] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by garment, GSM, collection or silhouette..."
            className="w-full bg-transparent text-sm sm:text-base text-[#111111] placeholder-[#858585] outline-none font-medium"
          />
          <button
            onClick={onClose}
            aria-label="Close search"
            className="text-[#858585] hover:text-[#111111] p-1 cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 divide-y divide-[#111111]/5">
          <div className="text-[11px] uppercase tracking-widest text-[#858585] mb-3">
            {query.trim() ? `Search Results (${results.length})` : 'Popular Searches / Essentials'}
          </div>

          {results.length === 0 ? (
            <div className="py-12 text-center text-sm text-[#858585]">
              No garments found matching &quot;{query}&quot;. Try searching for &quot;Tee&quot;, &quot;Hoodie&quot;, or &quot;Archive&quot;.
            </div>
          ) : (
            <div className="space-y-3 pt-2">
              {results.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    onSelectProduct(product.id);
                    onClose();
                  }}
                  className="flex items-center gap-4 p-2 hover:bg-[#EAE8E2] transition-colors cursor-pointer group"
                >
                  <ImageWithFallback
                    src={product.images[0]}
                    alt={product.name}
                    containerClassName="w-14 h-16 shrink-0"
                    className="w-full h-full object-cover bg-[#E5E3DC] border border-[#111111]/10"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] uppercase tracking-wider text-[#858585]">
                      {product.collectionName} · {product.category}
                    </div>
                    <h4 className="text-sm font-semibold text-[#111111] truncate group-hover:underline">
                      {product.name}
                    </h4>
                    <div className="text-xs font-mono tabular-nums text-[#111111] mt-0.5">
                      RM {product.price}
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#858585] group-hover:text-[#111111] transition-transform group-hover:translate-x-1 shrink-0" />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="px-6 py-3 bg-[#EAE8E2] border-t border-[#111111]/10 text-[11px] text-[#858585] flex justify-between items-center">
          <span>Press ESC to close</span>
          <span>Prices in Malaysian Ringgit (MYR)</span>
        </div>
      </div>
    </div>
  );
};
