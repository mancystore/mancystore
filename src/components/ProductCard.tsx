
import React from 'react';
import { Product } from '../types/product';
import { STOREFRONT_CONFIG } from '../config/storefront.config';
import { ImageWithFallback } from './ImageWithFallback';

interface ProductCardProps {
  product: Product;
  onSelect: (productId: string) => void;
  index?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
}) => {
  const colours = product.availableColours ?? [];

  // Determine primary garment shot and optional secondary garment angle
  const primaryImage =
    product.imageSet?.main || product.images?.[0] || '';
  const secondaryImage =
    product.imageSet?.back && product.imageSet.back !== primaryImage
      ? product.imageSet.back
      : null;

  const handleSelect = () => {
    onSelect(product.id);
  };

  return (
    <button
      type="button"
      onClick={handleSelect}
      aria-label={`View ${product.name} product details`}
      className="group relative flex w-full cursor-pointer flex-col bg-[#F5F4F0] text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2"
    >
      {/* Product Image Frame */}
      <div className="relative aspect-4/5 w-full overflow-hidden border border-[#111111]/12 bg-[#E8E6E0]">
        {/* Primary Garment Image */}
        <ImageWithFallback
          src={primaryImage}
          alt={product.name}
          containerClassName="h-full w-full"
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Secondary Garment Image (Smooth Cross-Fade on Hover when available) */}
        {secondaryImage && (
          <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100">
            <ImageWithFallback
              src={secondaryImage}
              alt={`${product.name} alternate view`}
              containerClassName="h-full w-full"
              className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
            />
          </div>
        )}

        {/* Prototype Status Label */}
        {STOREFRONT_CONFIG.showPrototypeLabels && (
          <div className="absolute left-2.5 top-2.5 z-10 flex items-center justify-center bg-[#111111] px-2 py-1 text-[#F5F4F0]">
            <span className="font-mono text-[8px] leading-none uppercase tracking-[0.12em]">
              Prototype
            </span>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="flex flex-1 flex-col justify-between space-y-2 pb-2 pt-3">
        {/* Product Name */}
        <h3 className="font-display text-sm font-medium leading-snug text-[#111111] transition-colors group-hover:text-[#555555] sm:text-base">
          {product.name}
        </h3>

        {/* Category and Colour */}
        <div className="flex items-center justify-between text-xs text-[#858585]">
          <span className="capitalize">
            {product.category.toLowerCase()}
          </span>

          {colours.length > 0 && (
            <div
              className="flex items-center gap-1.5"
              aria-label={`Available colours: ${colours.map((colour) => colour.name).join(', ')}`}
            >
              {colours.map((colour) => (
                <span
                  key={colour.name}
                  title={colour.name}
                  aria-hidden="true"
                  style={{ backgroundColor: colour.hex }}
                  className="h-2.5 w-2.5 rounded-full border border-[#111111]/25"
                />
              ))}
            </div>
          )}
        </div>

        {/* Indicative Price */}
        <div className="flex items-baseline justify-between gap-2 border-t border-[#111111]/10 pt-2">
          <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#858585]">
            {STOREFRONT_CONFIG.showIndicativePrices
              ? 'Indicative price'
              : 'Price'}
          </span>

          <span className="whitespace-nowrap font-mono text-sm font-semibold tabular-nums text-[#111111] sm:text-base">
            RM {product.price}
          </span>
        </div>
      </div>
    </button>
  );
};
