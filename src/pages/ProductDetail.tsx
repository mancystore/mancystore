
import React, { useState } from 'react';
import { Product, ProductColor } from '../types/product';
import { STOREFRONT_CONFIG } from '../config/storefront.config';
import { ProductCard } from '../components/ProductCard';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { Button } from '../components/Button';
import { useCart } from '../context/CartContext';
import {
  ArrowLeft,
  Ruler,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Plus,
  Minus,
  Check,
  ShoppingBag,
  AlertCircle,
} from 'lucide-react';

interface ProductDetailProps {
  product: Product;
  allProducts: Product[];
  onSelectProduct: (productId: string) => void;
  onBack: () => void;
  onOpenSizeGuide: () => void;
  onOpenCheckout: () => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({
  product,
  allProducts,
  onSelectProduct,
  onBack,
  onOpenSizeGuide,
}) => {
  const { addToCart } = useCart();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(
    product.availableSizes[0] || 'M'
  );
  const [selectedColor, setSelectedColor] = useState<ProductColor>(
    product.availableColours[0] || {
      name: 'Pitch Black',
      hex: '#111111',
    }
  );
  const [quantity, setQuantity] = useState(1);
  const [isAddedFeedback, setIsAddedFeedback] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<
    'details' | 'fabric' | 'care'
  >('details');

  const hasVariantData = Boolean(product.variants?.length);

  const activeVariant = product.variants?.find(
    (variant) =>
      variant.size === selectedSize &&
      variant.color.name === selectedColor.name
  );

  const isOutOfStock = hasVariantData
    ? !activeVariant || activeVariant.stockCount <= 0
    : product.stockCount <= 0;

  const availableStock = hasVariantData
    ? activeVariant?.stockCount ?? 0
    : product.stockCount;

  // Reset selections when switching products
  React.useEffect(() => {
    setSelectedImage(0);
    setSelectedSize(product.availableSizes[0] || 'M');
    setSelectedColor(
      product.availableColours[0] || {
        name: 'Pitch Black',
        hex: '#111111',
      }
    );
    setQuantity(1);
    setIsAddedFeedback(false);
    setIsLightboxOpen(false);
  }, [product.id]);

  // Reset confirmation when changing variant
  React.useEffect(() => {
    setIsAddedFeedback(false);
  }, [selectedSize, selectedColor.name]);

  // Handle ESC key for lightbox
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isLightboxOpen) {
        setIsLightboxOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen]);

  // Extract proposed fabric GSM
  const gsmDetail =
    product.fabricDetails.find((detail) => detail.includes('GSM')) || '';

  const gsmValue = gsmDetail.match(/\d+\s?GSM/i)?.[0];

  const relatedProducts = allProducts
    .filter(
      (item) =>
        item.id !== product.id &&
        (item.category === product.category ||
          item.collectionId === product.collectionId)
    )
    .slice(0, 3);

  const nextImage = () => {
    setSelectedImage(
      (previous) => (previous + 1) % product.images.length
    );
  };

  const prevImage = () => {
    setSelectedImage(
      (previous) =>
        (previous - 1 + product.images.length) % product.images.length
    );
  };

  const handleAddToCart = () => {
    if (
      !STOREFRONT_CONFIG.allowAddToCart ||
      isOutOfStock ||
      quantity > availableStock
    ) {
      return;
    }

    addToCart(
      {
        productId: product.id,
        name: product.name,
        price: product.price,
        size: selectedSize,
        color: selectedColor,
        image: product.images[0] || product.imageSet?.main || '',
        slug: product.slug,
      },
      quantity
    );

    setIsAddedFeedback(true);

    window.setTimeout(() => {
      setIsAddedFeedback(false);
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-16">
      {/* Editorial Breadcrumb */}
      <div className="flex items-center justify-between text-[11px] font-mono text-[#858585] border-b border-[#111111]/12 pb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 hover:text-[#111111] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>[ RETURN TO CATALOGUE ]</span>
        </button>

        <div className="hidden sm:flex items-center gap-2">
          <span>{product.collectionName}</span>
          <span>/</span>
          <span>{product.category}</span>
          <span>/</span>
          <span className="text-[#111111] font-bold">
            {activeVariant?.sku || `${product.sku}-${selectedSize}`}
          </span>
        </div>
      </div>

      {/* Main Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        {/* Product Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-4/5 bg-[#EAE8E2] border border-[#111111]/12 overflow-hidden group select-none">
            <ImageWithFallback
              src={product.images[selectedImage] || product.images[0]}
              alt={`${product.name} view ${selectedImage + 1}`}
              containerClassName="w-full h-full cursor-zoom-in"
              className="w-full h-full object-cover object-center transition-all duration-500"
              onClick={() => setIsLightboxOpen(true)}
            />

            <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10 pointer-events-none">
              {STOREFRONT_CONFIG.showPrototypeLabels && (
                <span className="bg-[#111111] text-[#F5F4F0] text-[10px] uppercase font-mono px-2.5 py-1 tracking-widest font-bold">
                  Prototype
                </span>
              )}

              <span className="bg-[#FFFFFF] text-[#111111] text-[10px] uppercase font-mono px-2.5 py-1 tracking-widest font-semibold border border-[#111111]/15">
                {product.collectionName}
              </span>

              {gsmValue && (
                <span className="bg-[#FFFFFF] text-[#111111] text-[10px] uppercase font-mono px-2.5 py-1 tracking-widest font-bold border border-[#111111]/15">
                  Proposed {gsmValue}
                </span>
              )}
            </div>

            <button
              onClick={() => setIsLightboxOpen(true)}
              className="absolute top-4 right-4 bg-[#111111]/70 hover:bg-[#111111] text-[#F5F4F0] p-2 transition-colors cursor-pointer z-10"
              aria-label="Enlarge product photography"
            >
              <Maximize2 className="w-4 h-4" />
            </button>

            {product.images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-[#FFFFFF]/90 hover:bg-[#FFFFFF] text-[#111111] p-2 border border-[#111111]/15 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-10"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#FFFFFF]/90 hover:bg-[#FFFFFF] text-[#111111] p-2 border border-[#111111]/15 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-10"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </>
            )}

            <div className="absolute bottom-4 right-4 bg-[#111111]/85 backdrop-blur-xs text-[#F5F4F0] text-[10px] font-mono px-2.5 py-1 z-10">
              FRAME [ 0{selectedImage + 1} / 0{product.images.length} ]
            </div>
          </div>

          {product.images.length > 1 && (
            <div className="grid grid-cols-3 gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`aspect-4/3 border overflow-hidden cursor-pointer transition-all relative ${
                    selectedImage === idx
                      ? 'border-[#111111] ring-2 ring-[#111111]'
                      : 'border-[#111111]/15 opacity-70 hover:opacity-100'
                  }`}
                >
                  <ImageWithFallback
                    src={img}
                    alt={`Product angle ${idx + 1}`}
                    containerClassName="w-full h-full"
                    className="w-full h-full object-cover"
                  />

                  <span className="absolute bottom-1 left-1 bg-[#111111]/80 text-[#F5F4F0] text-[9px] font-mono px-1">
                    0{idx + 1}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Information */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
          <div className="flex items-center justify-between text-xs font-mono text-[#858585]">
            <span className="uppercase tracking-widest">
              [ {product.category} ]
            </span>

            <span
              className={`font-semibold ${
                isOutOfStock ? 'text-red-700 font-bold' : 'text-[#111111]'
              }`}
            >
              {hasVariantData
                ? activeVariant
                  ? activeVariant.stockCount > 0
                    ? `In Stock (${activeVariant.stockCount} units)`
                    : 'Out of Stock'
                  : 'Variant Unavailable'
                : product.stockCount > 0
                  ? `In Stock (${product.stockCount} units)`
                  : 'Out of Stock'}
            </span>
          </div>

          <div className="space-y-2 border-b border-[#111111]/12 pb-6">
            <h1 className="text-3xl sm:text-4xl font-display font-black uppercase tracking-tight text-[#111111] leading-tight">
              {product.name}
            </h1>

            {product.tagline && (
              <p className="text-xs font-mono text-[#858585]">
                {product.tagline}
              </p>
            )}

            <div className="pt-2 space-y-1">
              {STOREFRONT_CONFIG.showIndicativePrices && (
                <p className="text-[10px] font-mono uppercase tracking-widest text-[#858585]">
                  Indicative price
                </p>
              )}

              <div className="text-2xl font-mono tabular-nums font-bold text-[#111111]">
                RM {product.price}
              </div>
            </div>
          </div>

          {/* Colourway Options */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="uppercase font-mono text-[#858585]">
                Selected Colourway:
              </span>

              <span className="font-mono font-bold text-[#111111] uppercase tracking-wide">
                {selectedColor.name}
              </span>
            </div>

            <div className="flex items-center gap-3">
              {product.availableColours.map((color) => (
                <button
                  key={color.name}
                  onClick={() => {
                    setSelectedColor(color);
                    setQuantity(1);
                  }}
                  className={`flex items-center gap-2 p-1.5 border text-xs cursor-pointer transition-all ${
                    selectedColor.name === color.name
                      ? 'border-[#111111] bg-[#FFFFFF] shadow-xs ring-1 ring-[#111111]'
                      : 'border-[#111111]/15 bg-transparent hover:border-[#111111]/40'
                  }`}
                >
                  <span
                    className="w-4 h-4 rounded-full border border-[#111111]/25 shrink-0"
                    style={{ backgroundColor: color.hex }}
                  />

                  <span className="font-mono text-[11px] uppercase font-semibold text-[#111111] pr-1.5">
                    {color.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Size Selector */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="uppercase font-mono text-[#858585]">
                Silhouette Size:{' '}
                <strong className="text-[#111111]">
                  {selectedSize}
                </strong>

                {activeVariant && (
                  <span className="ml-2 font-mono text-[10px] text-[#858585]">
                    [{activeVariant.sku}]
                  </span>
                )}
              </span>

              <button
                onClick={onOpenSizeGuide}
                className="flex items-center gap-1.5 text-[11px] font-mono uppercase font-bold text-[#111111] hover:underline cursor-pointer"
              >
                <Ruler className="w-3.5 h-3.5" />
                <span>Size Guide & Fits</span>
              </button>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
              {product.availableSizes.map((size) => {
                const variantForSize = product.variants?.find(
                  (variant) =>
                    variant.size === size &&
                    variant.color.name === selectedColor.name
                );

                const sizeUnavailable = hasVariantData
                  ? !variantForSize || variantForSize.stockCount <= 0
                  : product.stockCount <= 0;

                const sizeStatusLabel =
                  hasVariantData && !variantForSize
                    ? 'Unavailable'
                    : 'Sold Out';

                return (
                  <button
                    key={size}
                    onClick={() => {
                      setSelectedSize(size);
                      setQuantity(1);
                    }}
                    aria-label={`Size ${size}${
                      sizeUnavailable ? ` - ${sizeStatusLabel}` : ''
                    }`}
                    className={`relative py-3.5 text-xs font-mono uppercase font-bold transition-all cursor-pointer border ${
                      selectedSize === size
                        ? sizeUnavailable
                          ? 'bg-[#EAE8E2] text-[#858585] border-[#111111] shadow-xs'
                          : 'bg-[#111111] text-[#F5F4F0] border-[#111111] shadow-xs'
                        : sizeUnavailable
                          ? 'bg-[#EAE8E2]/60 text-[#858585] border-[#111111]/12 hover:border-[#111111]/40'
                          : 'bg-[#FFFFFF] text-[#111111] border-[#111111]/15 hover:border-[#111111]'
                    }`}
                  >
                    <span
                      className={
                        sizeUnavailable ? 'line-through opacity-70' : ''
                      }
                    >
                      {size}
                    </span>

                    {sizeUnavailable && (
                      <span className="block text-[8px] font-mono tracking-tight text-red-700 uppercase font-semibold">
                        {sizeStatusLabel}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="text-[11px] font-mono flex items-center justify-between pt-1">
              <span className="text-[#858585]">
                Proposed fit direction: Boxy drop-shoulder silhouette
              </span>

              <span
                className={`font-semibold ${
                  isOutOfStock ? 'text-red-700' : 'text-[#111111]'
                }`}
              >
                {isOutOfStock
                  ? '• Out of Stock'
                  : `• In Stock (${availableStock} units)`}
              </span>
            </div>
          </div>

          {/* Purchasing Area */}
          <div className="pt-2 border-t border-[#111111]/12 space-y-3">
            {STOREFRONT_CONFIG.allowAddToCart ? (
              <div className="space-y-4">
                {isOutOfStock ? (
                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      fullWidth
                      size="lg"
                      disabled
                      className="h-12 font-mono tracking-widest text-xs opacity-50 cursor-not-allowed border-dashed flex items-center justify-center gap-2"
                    >
                      <AlertCircle className="w-4 h-4 text-red-700" />
                      <span>
                        {hasVariantData && !activeVariant
                          ? 'Variant Unavailable'
                          : `Size ${selectedSize} Out of Stock`}
                      </span>
                    </Button>

                    <p className="text-[11px] font-mono text-center text-[#858585]">
                      Please select another available size or check back during the next release.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="flex gap-3 items-center">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-[#111111] bg-[#FFFFFF] h-12">
                        <button
                          type="button"
                          onClick={() =>
                            setQuantity((prev) => Math.max(1, prev - 1))
                          }
                          disabled={quantity <= 1}
                          aria-label="Decrease quantity"
                          className="px-3.5 h-full text-[#858585] hover:text-[#111111] disabled:opacity-30 cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>

                        <span className="px-3 text-xs font-mono font-bold tabular-nums text-[#111111]">
                          {quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            setQuantity((prev) =>
                              Math.min(availableStock, prev + 1)
                            )
                          }
                          disabled={quantity >= availableStock}
                          aria-label="Increase quantity"
                          className="px-3.5 h-full text-[#858585] hover:text-[#111111] disabled:opacity-30 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Add to Bag Button */}
                      <Button
                        variant="primary"
                        fullWidth
                        size="lg"
                        onClick={handleAddToCart}
                        disabled={quantity > availableStock}
                        className="h-12 relative overflow-hidden font-mono tracking-widest text-xs transition-transform active:scale-[0.99] cursor-pointer"
                      >
                        {isAddedFeedback ? (
                          <span className="flex items-center justify-center gap-2 text-[#EDEBE6]">
                            <Check className="w-4 h-4" />
                            <span>Added to Bag</span>
                          </span>
                        ) : (
                          <span className="flex items-center justify-center gap-2">
                            <ShoppingBag className="w-4 h-4" />
                            <span>
                              Add to Bag · RM {product.price * quantity}
                            </span>
                          </span>
                        )}
                      </Button>
                    </div>

                    {/* Inline Confirmation */}
                    <div
                      aria-live="polite"
                      className={`flex items-center justify-center gap-2 text-[11px] font-mono text-[#555555] transition-all duration-300 ${
                        isAddedFeedback
                          ? 'opacity-100 translate-y-0'
                          : 'opacity-0 -translate-y-1 pointer-events-none'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5 text-[#111111]" />
                      <span>
                        {product.name} added to your bag
                      </span>
                    </div>
                  </>
                )}

                <div className="text-[10px] font-mono text-[#858585] text-center">
                  Demonstration Storefront · Local shopping bag simulation enabled
                </div>
              </div>
            ) : (
              <div className="bg-[#EAE8E2] border border-[#111111]/10 p-4 space-y-2">
                <p className="text-[10px] font-mono uppercase tracking-widest font-bold text-[#111111]">
                  Preview Storefront
                </p>

                <p className="text-xs leading-relaxed text-[#666666]">
                  This product is a prototype concept. Purchases are currently disabled.
                  Displayed prices and specifications are indicative and subject to confirmation.
                </p>
              </div>
            )}
          </div>

          {/* Product Details Tabs */}
          <div className="space-y-4 pt-2">
            <div className="flex border-b border-[#111111]/12 gap-6 text-xs font-mono uppercase tracking-wider">
              <button
                onClick={() => setActiveTab('details')}
                className={`pb-2 transition-colors cursor-pointer relative ${
                  activeTab === 'details'
                    ? 'text-[#111111] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#111111]'
                    : 'text-[#858585] hover:text-[#111111]'
                }`}
              >
                01. Silhouette
              </button>

              <button
                onClick={() => setActiveTab('fabric')}
                className={`pb-2 transition-colors cursor-pointer relative ${
                  activeTab === 'fabric'
                    ? 'text-[#111111] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#111111]'
                    : 'text-[#858585] hover:text-[#111111]'
                }`}
              >
                02. Sample Specs
              </button>

              <button
                onClick={() => setActiveTab('care')}
                className={`pb-2 transition-colors cursor-pointer relative ${
                  activeTab === 'care'
                    ? 'text-[#111111] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#111111]'
                    : 'text-[#858585] hover:text-[#111111]'
                }`}
              >
                03. Prototype Care
              </button>
            </div>

            <div className="text-xs text-[#555555] leading-relaxed pt-1">
              {activeTab === 'details' && (
                <div className="space-y-3">
                  <p>{product.description}</p>
                  <p className="font-mono text-[#858585]">
                    {product.fitGuide}
                  </p>
                </div>
              )}

              {activeTab === 'fabric' && (
                <div className="space-y-3">
                  <ul className="space-y-2 font-mono list-disc pl-4 text-[#333333]">
                    {product.fabricDetails.map((detail, idx) => (
                      <li key={idx}>{detail}</li>
                    ))}
                  </ul>

                  <p className="text-[10px] font-mono text-[#858585] border-t border-[#111111]/10 pt-2">
                    Prototype Notice: All yarn counts, textile densities, and finishing
                    treatments represent proposed sample standards pending final production confirmation.
                  </p>
                </div>
              )}

              {activeTab === 'care' && (
                <div className="space-y-2 font-mono text-[#555555]">
                  <p>• Proposed: Machine wash cold (30°C) with similar dark colours.</p>
                  <p>• Turn inside out before washing to protect surface fibres.</p>
                  <p>• Proposed: Hang dry flat in shade. Avoid tumble drying.</p>
                  <p>• Cool iron on reverse side if required. Avoid ironing over graphic prints.</p>
                  <p className="text-[10px] text-[#858585] pt-2">
                    Care guidance is preliminary and subject to confirmation against the final garment sample.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Full-Screen Lightbox */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#111111]/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div className="flex justify-between items-center text-xs font-mono text-[#F5F4F0]">
            <span>{product.name} // HIGH RESOLUTION INSPECTION</span>

            <button
              onClick={() => setIsLightboxOpen(false)}
              className="p-2 text-[#858585] hover:text-[#FFFFFF] cursor-pointer"
              aria-label="Close photo inspection"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="max-w-4xl max-h-[80vh] mx-auto overflow-hidden flex items-center justify-center my-auto">
            <img
              src={product.images[selectedImage]}
              alt="High resolution product inspection"
              className="max-h-[80vh] max-w-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="flex justify-between items-center text-[11px] font-mono text-[#858585]">
            <span>CLICK ANYWHERE OR ESC TO EXIT</span>
            <span>
              FRAME 0{selectedImage + 1} OF 0{product.images.length}
            </span>
          </div>
        </div>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="pt-16 border-t border-[#111111]/12">
          <div className="flex justify-between items-end mb-8">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#858585] mb-1 block">
                COMPLEMENTARY SILHOUETTES
              </span>

              <h3 className="text-xl sm:text-2xl font-display font-black uppercase tracking-tight text-[#111111]">
                Complete The Wardrobe
              </h3>
            </div>

            <button
              onClick={onBack}
              className="text-xs font-mono uppercase tracking-widest font-semibold text-[#111111] hover:text-[#858585] cursor-pointer"
            >
              Back to Catalog →
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {relatedProducts.map((relProduct, idx) => (
              <ProductCard
                key={relProduct.id}
                product={relProduct}
                index={idx}
                onSelect={onSelectProduct}
              />
            ))}
          </div>
        </section>
      )}

      {/* Mobile Sticky Add to Bag Bar */}
      {STOREFRONT_CONFIG.allowAddToCart && (
        <div className="sm:hidden fixed bottom-0 inset-x-0 z-30 bg-[#F5F4F0]/95 backdrop-blur-md border-t border-[#111111]/15 p-3 flex items-center justify-between gap-3 shadow-lg">
          <div className="min-w-0">
            <div className="text-xs font-bold text-[#111111] truncate">
              {product.name}
            </div>

            <div className="text-[11px] font-mono font-semibold text-[#858585]">
              Size {selectedSize} · RM {product.price}
            </div>
          </div>

          {isOutOfStock ? (
            <Button
              variant="outline"
              size="sm"
              disabled
              className="shrink-0 font-mono tracking-widest text-xs px-5 py-3 opacity-50 cursor-not-allowed"
            >
              Sold Out
            </Button>
          ) : (
            <Button
              variant="primary"
              size="sm"
              onClick={handleAddToCart}
              disabled={quantity > availableStock}
              className="shrink-0 font-mono tracking-widest text-xs px-5 py-3 cursor-pointer"
            >
              {isAddedFeedback ? (
                <span className="flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  Added
                </span>
              ) : (
                'Add to Bag'
              )}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
