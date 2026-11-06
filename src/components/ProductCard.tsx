import React, { useState } from 'react';
import { Product, ProductColor } from '../types/product';
import { useCart } from '../context/CartContext';
import { Check } from 'lucide-react';

import { ImageWithFallback } from './ImageWithFallback';

interface ProductCardProps {
  product: Product;
  onSelect: (productId: string) => void;
  index?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect, index: _index }) => {
  const { addToCart } = useCart();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product.availableSizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState<ProductColor>(
    product.availableColours[0] || { name: 'Pitch Black', hex: '#111111' }
  );
  const [justAdded, setJustAdded] = useState(false);

  const hasSecondaryImage = product.images.length > 1;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(
      {
        productId: product.id,
        name: product.name,
        price: product.price,
        size: selectedSize,
        color: selectedColor,
        image: product.images[0],
        slug: product.slug,
      },
      1
    );

    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  return (
    <div
      onClick={() => onSelect(product.id)}
      onMouseEnter={() => {
        setIsHovered(true);
        if (hasSecondaryImage) setCurrentImageIndex(1);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setCurrentImageIndex(0);
      }}
      className="group flex flex-col bg-[#F5F4F0] cursor-pointer transition-all duration-300 relative"
    >
      {/* Product Image Frame (Consistent 4:5 Editorial Ratio) */}
      <div className="relative aspect-[4/5] bg-[#E8E6E0] overflow-hidden border border-[#111111]/12">
        <ImageWithFallback
          src={product.images[currentImageIndex] || product.images[0]}
          alt={product.name}
          containerClassName="w-full h-full"
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-104"
          loading="lazy"
        />

        {/* Quick Add Tray on Hover (Desktop) */}
        <div
          className={`absolute inset-x-2.5 bottom-2.5 transition-all duration-200 hidden sm:flex flex-col gap-1.5 z-20 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Size Options */}
          <div className="flex gap-1 bg-[#111111]/90 backdrop-blur-sm p-1 justify-center border border-[#FFFFFF]/10">
            {product.availableSizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setSelectedSize(size)}
                className={`text-[10px] uppercase font-mono px-2 py-1 transition-all cursor-pointer ${
                  selectedSize === size
                    ? 'bg-[#F5F4F0] text-[#111111] font-bold'
                    : 'text-[#F5F4F0]/70 hover:text-[#F5F4F0]'
                }`}
              >
                {size}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={handleQuickAdd}
            className="w-full bg-[#111111] text-[#F5F4F0] hover:bg-[#262626] text-[10px] font-mono uppercase tracking-[0.2em] py-2.5 transition-colors font-medium border border-[#FFFFFF]/20 cursor-pointer flex items-center justify-center gap-1.5"
          >
            {justAdded ? (
              <span className="flex items-center gap-1 text-[#C7C6C0]">
                <Check className="w-3.5 h-3.5" /> Added to Bag
              </span>
            ) : (
              <span>Quick Add · Size {selectedSize}</span>
            )}
          </button>
        </div>
      </div>

      {/* Product Details Section (Simplified Hierarchy: Name, Price, Category/Colour) */}
      <div className="pt-3 pb-1 flex flex-col justify-between flex-1 space-y-1">
        {/* Row 1: Left-aligned Product Name and Right-aligned Price */}
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-sm sm:text-base font-display font-medium text-[#111111] group-hover:text-[#555555] transition-colors leading-snug">
            {product.name}
          </h3>
          <span className="text-sm sm:text-base font-mono tabular-nums font-semibold text-[#111111] whitespace-nowrap shrink-0">
            RM {product.price}
          </span>
        </div>

        {/* Row 2: Category and Optional Colour Selection Swatches */}
        <div className="flex items-center justify-between text-xs text-[#858585] pt-0.5">
          <span className="capitalize">{product.category.toLowerCase()}</span>

          {product.availableColours.length > 0 && (
            <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
              {product.availableColours.map((color) => (
                <button
                  key={color.name}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  title={`${color.name}`}
                  style={{ backgroundColor: color.hex }}
                  className={`w-2.5 h-2.5 rounded-full border transition-all cursor-pointer ${
                    selectedColor.name === color.name
                      ? 'ring-1 ring-[#111111] scale-110 border-[#FFFFFF]'
                      : 'border-[#111111]/25 hover:scale-110'
                  }`}
                  aria-label={`Select colour ${color.name}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
