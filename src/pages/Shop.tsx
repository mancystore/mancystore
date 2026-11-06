import React, { useState } from 'react';
import { Product, ProductCategory } from '../types/product';
import { ProductGrid } from '../components/ProductGrid';

interface ShopProps {
  products: Product[];
  onSelectProduct: (productId: string) => void;
  initialCategory?: ProductCategory;
}

export const Shop: React.FC<ShopProps> = ({
  products,
  onSelectProduct,
  initialCategory = 'All',
}) => {
  const [selectedCollection, setSelectedCollection] = useState<string>('All');

  const filteredByCollection =
    selectedCollection === 'All'
      ? products
      : products.filter((p) => p.collectionName === selectedCollection);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Editorial Header */}
      <div className="border-b border-[#111111]/12 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="text-xs font-mono text-[#858585] mb-2 flex items-center gap-2">
            <span>Catalogue</span>
            <span>·</span>
            <span>Architectural Wardrobe</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black uppercase tracking-tight text-[#111111]">
            Streetwear Roster
          </h1>
          <p className="text-sm text-[#666666] mt-2 max-w-xl leading-relaxed">
            Everyday contemporary garments crafted with custom-knit heavyweight textiles (300–500 GSM), dropped shoulders, and minimal branding.
          </p>
        </div>

        {/* Collection Quick Switcher */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <span className="text-xs font-mono text-[#858585] whitespace-nowrap">
            Collection:
          </span>
          {['All', 'MNC ESSENTIALS', 'MNC SEASON 001', 'MNC ARCHIVE'].map((col) => (
            <button
              key={col}
              onClick={() => setSelectedCollection(col)}
              className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer border ${
                selectedCollection === col
                  ? 'bg-[#111111] text-[#F5F4F0] border-[#111111] font-bold'
                  : 'bg-[#FFFFFF] text-[#858585] border-[#111111]/12 hover:text-[#111111]'
              }`}
            >
              {col === 'All' ? 'All Collections' : col.replace('MNC ', '')}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid with full interactive categories & sorting */}
      <ProductGrid
        products={filteredByCollection}
        onSelectProduct={onSelectProduct}
        initialCategory={initialCategory}
      />
    </div>
  );
};
