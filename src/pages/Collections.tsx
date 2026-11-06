import React, { useState } from 'react';
import { Collection, Product } from '../types/product';
import { ProductCard } from '../components/ProductCard';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { ArrowRight, Layers, Box, Check } from 'lucide-react';

interface CollectionsProps {
  collections: Collection[];
  products: Product[];
  onSelectProduct: (productId: string) => void;
  selectedCollectionId?: string;
  onNavigate: (page: string) => void;
}

export const Collections: React.FC<CollectionsProps> = ({
  collections,
  products,
  onSelectProduct,
  selectedCollectionId,
  onNavigate,
}) => {
  const [activeColId, setActiveColId] = useState<string>(
    selectedCollectionId || collections[0]?.id || 'mnc-essentials'
  );

  React.useEffect(() => {
    if (selectedCollectionId) {
      setActiveColId(selectedCollectionId);
    }
  }, [selectedCollectionId]);

  const activeCollection =
    collections.find((c) => c.id === activeColId) || collections[0];

  const collectionProducts = products.filter(
    (p) => p.collectionId === activeCollection.id
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-14">
      {/* Editorial Header */}
      <div className="border-b border-[#111111]/12 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-xs font-mono text-[#858585] mb-2 flex items-center gap-2">
            <span>MNC Archive & Capsules</span>
            <span>·</span>
            <span>Season 001</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black uppercase tracking-tight text-[#111111]">
            Collections Roster
          </h1>
        </div>
        <div className="text-xs font-mono text-[#858585]">
          3 Distinct Universes
        </div>
      </div>

      {/* Collection Selector Tabs */}
      <div className="flex gap-2 border-b border-[#111111]/12 pb-4 overflow-x-auto scrollbar-none">
        {collections.map((col, idx) => (
          <button
            key={col.id}
            onClick={() => setActiveColId(col.id)}
            className={`px-4 sm:px-5 py-2.5 text-xs font-mono uppercase tracking-widest transition-all whitespace-nowrap cursor-pointer border ${
              activeColId === col.id
                ? 'bg-[#111111] text-[#F5F4F0] border-[#111111] font-bold'
                : 'bg-[#FFFFFF] text-[#858585] border-[#111111]/12 hover:text-[#111111] hover:border-[#111111]/30'
            }`}
          >
            <span className="text-[10px] mr-2 text-[#9A9A91]">0{idx + 1} //</span>
            <span>{col.name}</span>
          </button>
        ))}
      </div>

      {/* Active Collection Editorial Showcase Banner */}
      <div className="bg-[#111111] text-[#F5F4F0] border border-[#222222] overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 p-6 sm:p-12 lg:p-14 space-y-6">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#9A9A91] bg-[#222222] border border-[#333333] px-2.5 py-1">
                {activeCollection.seasonBadge}
              </span>
              <span className="text-[10px] font-mono text-[#858585]">
                REF: {activeCollection.id.toUpperCase()}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black uppercase tracking-tight text-[#F5F4F0] leading-[0.95]">
              {activeCollection.name}
            </h2>

            <p className="text-sm font-medium text-[#C7C6C0]">
              {activeCollection.subtitle}
            </p>

            <p className="text-xs sm:text-sm text-[#858585] leading-relaxed">
              {activeCollection.description}
            </p>

            <div className="pt-4 border-t border-[#262626] flex items-center justify-between text-xs font-mono text-[#9A9A91]">
              <span>AVAILABLE SILHOUETTES: {collectionProducts.length}</span>
              <span>CURRENCY: MYR (RM)</span>
            </div>
          </div>

          <div className="lg:col-span-6 aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] bg-[#1E1E1E] overflow-hidden">
            <ImageWithFallback
              src={activeCollection.bannerImage}
              alt={activeCollection.name}
              containerClassName="w-full h-full"
              className="w-full h-full object-cover object-center scale-101 hover:scale-104 transition-transform duration-700"
            />
          </div>
        </div>
      </div>

      {/* Garments in this Collection */}
      <div className="space-y-8">
        <div className="flex justify-between items-center pb-3 border-b border-[#111111]/12">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-display font-bold uppercase tracking-tight text-[#111111]">
              {activeCollection.name} Silhouettes
            </h3>
            <span className="text-xs font-mono text-[#858585]">
              [ {collectionProducts.length} Items ]
            </span>
          </div>

          <button
            onClick={() => onNavigate('shop')}
            className="text-xs font-mono uppercase tracking-widest text-[#111111] hover:text-[#858585] transition-colors cursor-pointer"
          >
            View All Catalogue →
          </button>
        </div>

        {collectionProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {collectionProducts.map((product, idx) => (
              <ProductCard
                key={product.id}
                product={product}
                index={idx}
                onSelect={onSelectProduct}
              />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center bg-[#FFFFFF] border border-[#111111]/12 p-8 space-y-3">
            <p className="text-xs font-mono uppercase tracking-widest text-[#111111]">
              Upcoming Archive Vault Release
            </p>
            <p className="text-xs text-[#858585] max-w-sm mx-auto">
              Garments for this archive series are currently in pre-release staging.
            </p>
            <button
              onClick={() => onNavigate('shop')}
              className="px-4 py-2 bg-[#111111] text-[#F5F4F0] text-xs font-mono uppercase tracking-widest cursor-pointer"
            >
              Browse Full Shop
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
