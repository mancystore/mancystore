import React from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { Product } from '../types/product';
import { Collection } from '../types/product';
import { ProductCard } from '../components/ProductCard';
import { Button } from '../components/Button';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { CAMPAIGN_ASSETS } from '../config/assets';

interface HomeProps {
  products: Product[];
  collections: Collection[];
  onSelectProduct: (productId: string) => void;
  onNavigate: (page: string, params?: { category?: string; collection?: string }) => void;
}

export const Home: React.FC<HomeProps> = ({
  products,
  collections,
  onSelectProduct,
  onNavigate,
}) => {
  const featuredProducts = products.filter((p) => p.featured).slice(0, 4);
  const newArrivals = products.filter((p) => p.isNewArrival).slice(0, 3);

  return (
    <div className="space-y-28 sm:space-y-36 lg:space-y-44 pb-20">
      {/* 1. LARGE FASHION CAMPAIGN IMAGE-LED HERO */}
      <section className="relative bg-[#F5F4F0] border-b border-[#111111]/12 overflow-hidden">
        {/* Subtle Architectural Brandmark in Background */}
        <div className="absolute top-6 inset-x-0 flex justify-center pointer-events-none select-none overflow-hidden opacity-[0.03] leading-none">
          <span className="font-display font-black text-[22vw] tracking-[-0.05em] text-[#111111] uppercase">
            MNC
          </span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-16 sm:pb-24 relative z-10 space-y-8 sm:space-y-12">
          {/* Large Editorial Campaign Image Frame (Clean Hero Focal Point) */}
          <div className="relative aspect-[16/10] sm:aspect-[21/9] lg:aspect-[2.4/1] w-full bg-[#1A1A1A] overflow-hidden border border-[#111111]/15 shadow-sm group">
            <ImageWithFallback
              src={CAMPAIGN_ASSETS.heroEditorial.path}
              alt={CAMPAIGN_ASSETS.heroEditorial.alt}
              containerClassName="w-full h-full"
              className="w-full h-full object-cover object-center scale-101 group-hover:scale-103 transition-transform duration-1000 ease-out"
            />
          </div>

          {/* Balanced Typography Hierarchy: Headline & Supporting Description */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end pt-2">
            {/* Primary Campaign Title */}
            <div className="lg:col-span-6 space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black uppercase tracking-tight text-[#111111] leading-[0.95] text-balance">
                Architectural <br />
                Volume.
              </h1>
            </div>

            {/* Supporting Copy & Clear CTAs */}
            <div className="lg:col-span-6 space-y-6">
              <p className="text-sm sm:text-base text-[#555555] leading-relaxed max-w-xl">
                Independent contemporary streetwear engineered through dense custom-milled textiles (300–500 GSM) and intentional boxy drape. Everyday luxury designed with structural permanence.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => onNavigate('shop')}
                  className="font-mono tracking-widest text-xs px-8 group cursor-pointer"
                >
                  <span>Shop Catalogue</span>
                  <ArrowRight className="w-4 h-4 ml-2 inline group-hover:translate-x-1.5 transition-transform" />
                </Button>
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => onNavigate('collections')}
                  className="font-mono tracking-widest text-xs cursor-pointer"
                >
                  View Collections
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CONCISE BRAND INTRODUCTION (Understated, Confident, Generous Whitespace) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-t border-b border-[#111111]/12 py-16 sm:py-24 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-4 space-y-3">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-black uppercase tracking-tight text-[#111111] leading-snug">
              Form follows weight. Volume follows posture.
            </h2>
          </div>

          <div className="lg:col-span-8 space-y-8">
            <p className="text-sm sm:text-base text-[#444444] font-normal leading-relaxed max-w-2xl">
              MNC is an independent contemporary streetwear label founded on architectural proportion, textile permanence, and understated confidence. We reject lightweight disposable fast-fashion in favour of custom-milled 300–500 GSM cottons and calibrated boxy drape.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-6 border-t border-[#111111]/10">
              <div className="space-y-1.5">
                <span className="font-mono font-bold text-xs sm:text-sm text-[#111111] uppercase tracking-wider block">
                  01. Textile Density
                </span>
                <p className="text-[#666666] text-xs sm:text-sm leading-relaxed">
                  Heavyweight 300–500 GSM knits that hold structural volume without clinging.
                </p>
              </div>

              <div className="space-y-1.5">
                <span className="font-mono font-bold text-xs sm:text-sm text-[#111111] uppercase tracking-wider block">
                  02. Boxy Geometry
                </span>
                <p className="text-[#666666] text-xs sm:text-sm leading-relaxed">
                  Calibrated drop shoulders and balanced torso lengths for effortless everyday layering.
                </p>
              </div>

              <div className="space-y-1.5">
                <span className="font-mono font-bold text-xs sm:text-sm text-[#111111] uppercase tracking-wider block">
                  03. Collar Integrity
                </span>
                <p className="text-[#666666] text-xs sm:text-sm leading-relaxed">
                  Robust 3.2cm 1x1 rib necklines engineered to maintain crisp shape through repeated wear.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CURATED PRODUCT ROSTER (Cohesive Editorial Product Grid) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-[#111111]/12 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-black uppercase tracking-tight text-[#111111]">
              Featured Garments
            </h2>
          </div>

          <button
            onClick={() => onNavigate('shop')}
            className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest font-semibold text-[#111111] hover:text-[#858585] transition-colors cursor-pointer"
          >
            <span>View All ({products.length})</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 sm:gap-x-8 gap-y-10 sm:gap-y-12">
          {featuredProducts.map((product, idx) => (
            <ProductCard
              key={product.id}
              product={product}
              index={idx}
              onSelect={onSelectProduct}
            />
          ))}
        </div>
      </section>

      {/* 4. CAMPAIGN LOOKBOOK SPREAD (Editorial Runway Presentation with Generous Spacing) */}
      <section className="bg-[#111111] text-[#F5F4F0] py-20 sm:py-28 lg:py-36 border-y border-[#262626] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#2A2A2A] pb-6 gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black uppercase tracking-tight text-[#F5F4F0]">
                Lookbook: Season 001
              </h2>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onNavigate('collections')}
              className="font-mono tracking-widest text-xs cursor-pointer"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-3.5 h-3.5 ml-2 inline" />
            </Button>
          </div>

          {/* Magazine Spread Photography (Primary Visual Feature) */}
          <div className="relative aspect-[16/9] bg-[#1E1E1E] overflow-hidden border border-[#333333] group">
            <ImageWithFallback
              src={CAMPAIGN_ASSETS.lookbookSeason001.path}
              alt={CAMPAIGN_ASSETS.lookbookSeason001.alt}
              containerClassName="w-full h-full"
              className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-1000 ease-out"
            />
          </div>
        </div>
      </section>

      {/* 5. COLLECTION ARCHIVES (Photography-Led Cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 pb-4 border-b border-[#111111]/12 flex justify-between items-end">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-black uppercase tracking-tight text-[#111111]">
              Collections Archive
            </h2>
          </div>

          <button
            onClick={() => onNavigate('collections')}
            className="text-xs font-mono uppercase tracking-widest font-semibold text-[#111111] hover:text-[#858585] transition-colors cursor-pointer hidden sm:block"
          >
            All Collections Archive →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {collections.map((col) => (
            <div
              key={col.id}
              onClick={() => onNavigate('collections', { collection: col.id })}
              className="group cursor-pointer flex flex-col bg-[#FFFFFF] border border-[#111111]/12 hover:border-[#111111]/40 transition-all duration-300"
            >
              {/* Collection Photography as the Primary Focus (Badge overlays removed) */}
              <div className="aspect-[4/3] bg-[#EAE8E2] overflow-hidden relative">
                <img
                  src={col.bannerImage}
                  alt={col.name}
                  className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="p-6 flex flex-col justify-between flex-1 space-y-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-display font-bold uppercase tracking-tight text-[#111111] group-hover:text-[#555555] transition-colors">
                    {col.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#666666] mt-2 leading-relaxed line-clamp-2">
                    {col.description}
                  </p>
                </div>

                {/* Clear Collection Action */}
                <div className="pt-4 border-t border-[#111111]/10 flex justify-between items-center text-xs font-mono font-semibold uppercase tracking-wider text-[#111111] group-hover:text-[#555555] transition-colors">
                  <span>View Collection</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. NEW ARRIVALS SPOTLIGHT */}
      {newArrivals.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8 pb-4 border-b border-[#111111]/12">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-black uppercase tracking-tight text-[#111111]">
                New Arrivals
              </h2>
            </div>
            <button
              onClick={() => onNavigate('shop')}
              className="text-xs font-mono uppercase tracking-widest font-semibold text-[#111111] hover:text-[#858585] transition-colors cursor-pointer"
            >
              Shop All Catalogue →
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-5 sm:gap-x-8 gap-y-10 sm:gap-y-12">
            {newArrivals.map((product, idx) => (
              <ProductCard
                key={product.id}
                product={product}
                index={idx}
                onSelect={onSelectProduct}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
