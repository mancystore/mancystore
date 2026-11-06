import React, { useState } from 'react';
import { Product, ProductColor } from '../types/product';
import { useCart } from '../context/CartContext';
import { Button } from '../components/Button';
import { ProductCard } from '../components/ProductCard';
import { ImageWithFallback } from '../components/ImageWithFallback';
import {
  ArrowLeft,
  Ruler,
  Truck,
  RotateCcw,
  Plus,
  Minus,
  Check,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  ShieldCheck,
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
  const [selectedSize, setSelectedSize] = useState<string>(product.availableSizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState<ProductColor>(
    product.availableColours[0] || { name: 'Pitch Black', hex: '#111111' }
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [isAddedFeedback, setIsAddedFeedback] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'fabric' | 'care'>('details');

  // Reset variant selections when switching between products (e.g. from related products)
  React.useEffect(() => {
    setSelectedImage(0);
    setSelectedSize(product.availableSizes[0] || 'M');
    setSelectedColor(product.availableColours[0] || { name: 'Pitch Black', hex: '#111111' });
    setQuantity(1);
    setIsLightboxOpen(false);
  }, [product.id]);

  // Handle ESC key for lightbox inspection modal
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isLightboxOpen) {
        setIsLightboxOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen]);

  // Extract fabric GSM from details if available
  const gsmDetail = product.fabricDetails.find((d) => d.includes('GSM')) || '';
  const gsmBadge = gsmDetail.match(/\d+\s?GSM/i)?.[0] || 'HEAVYWEIGHT';

  // Related products
  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id && (p.category === product.category || p.collectionId === product.collectionId))
    .slice(0, 3);

  const handleAddToCart = () => {
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
      quantity
    );

    setIsAddedFeedback(true);
    setTimeout(() => setIsAddedFeedback(false), 2200);
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);
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
          <span className="text-[#111111] font-bold">{product.sku}</span>
        </div>
      </div>

      {/* Main Grid: Large Gallery Left + Sticky Purchase Module Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        {/* Left Column: Product Gallery (Col 1-7) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Large Image Frame */}
          <div className="relative aspect-[4/5] bg-[#EAE8E2] border border-[#111111]/12 overflow-hidden group select-none">
            <ImageWithFallback
              src={product.images[selectedImage] || product.images[0]}
              alt={`${product.name} view ${selectedImage + 1}`}
              containerClassName="w-full h-full cursor-zoom-in"
              className="w-full h-full object-cover object-center transition-all duration-500"
              onClick={() => setIsLightboxOpen(true)}
            />

            {/* Corner Badges */}
            <div className="absolute top-4 left-4 flex gap-2 z-10 pointer-events-none">
              <span className="bg-[#111111] text-[#F5F4F0] text-[10px] uppercase font-mono px-2.5 py-1 tracking-widest font-semibold">
                {product.collectionName}
              </span>
              <span className="bg-[#FFFFFF] text-[#111111] text-[10px] uppercase font-mono px-2.5 py-1 tracking-widest font-bold border border-[#111111]/15">
                {gsmBadge}
              </span>
            </div>

            {/* Lightbox Trigger Icon */}
            <button
              onClick={() => setIsLightboxOpen(true)}
              className="absolute top-4 right-4 bg-[#111111]/70 hover:bg-[#111111] text-[#F5F4F0] p-2 transition-colors cursor-pointer z-10"
              aria-label="Enlarge product photography"
            >
              <Maximize2 className="w-4 h-4" />
            </button>

            {/* Gallery Navigation Arrows (If multiple images) */}
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

            {/* Bottom Image Counter */}
            <div className="absolute bottom-4 right-4 bg-[#111111]/85 backdrop-blur-xs text-[#F5F4F0] text-[10px] font-mono px-2.5 py-1 z-10">
              FRAME [ 0{selectedImage + 1} / 0{product.images.length} ]
            </div>
          </div>

          {/* Thumbnail Strip with Distinct Perspectives */}
          {product.images.length > 1 && (
            <div className="grid grid-cols-3 gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`aspect-[4/3] border overflow-hidden cursor-pointer transition-all relative ${
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

        {/* Right Column: Contiguous Purchase Module (Col 8-12) */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
          {/* Header Metadata */}
          <div className="flex items-center justify-between text-xs font-mono text-[#858585]">
            <span className="uppercase tracking-widest">[ {product.category} ]</span>
            <span className="text-[#111111] font-semibold">{product.demoStock}</span>
          </div>

          {/* Product Title & Price */}
          <div className="space-y-2 border-b border-[#111111]/12 pb-6">
            <h1 className="text-3xl sm:text-4xl font-display font-black uppercase tracking-tight text-[#111111] leading-tight">
              {product.name}
            </h1>
            {product.tagline && (
              <p className="text-xs font-mono text-[#858585]">{product.tagline}</p>
            )}
            <div className="pt-2 text-2xl font-mono tabular-nums font-bold text-[#111111]">
              RM {product.price}
            </div>
          </div>

          {/* Clear Colourway Options */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="uppercase font-mono text-[#858585]">Selected Colourway:</span>
              <span className="font-mono font-bold text-[#111111] uppercase tracking-wide">
                {selectedColor.name}
              </span>
            </div>
            <div className="flex items-center gap-3">
              {product.availableColours.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color)}
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

          {/* Elegant Size Selector */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="uppercase font-mono text-[#858585]">
                Silhouette Size: <strong className="text-[#111111]">{selectedSize}</strong>
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
              {product.availableSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-3.5 text-xs font-mono uppercase font-bold transition-all cursor-pointer border ${
                    selectedSize === size
                      ? 'bg-[#111111] text-[#F5F4F0] border-[#111111] shadow-xs'
                      : 'bg-[#FFFFFF] text-[#111111] border-[#111111]/15 hover:border-[#111111]'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>

            {/* Streetwear Fit Recommendation */}
            <div className="text-[11px] font-mono text-[#858585] flex items-center justify-between pt-1">
              <span>Fit: Boxy drop-shoulder silhouette</span>
              <span>Model is 185cm wearing size L</span>
            </div>
          </div>

          {/* Quantity & Strong Add-to-Cart Interaction */}
          <div className="pt-2 space-y-3">
            <div className="flex gap-3">
              {/* Quantity Stepper */}
              <div className="flex items-center border border-[#111111] bg-[#FFFFFF] px-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 text-[#858585] hover:text-[#111111] cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-3 text-xs font-mono font-bold tabular-nums text-[#111111]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 text-[#858585] hover:text-[#111111] cursor-pointer"
                  aria-label="Increase quantity"
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
                className="relative overflow-hidden font-mono tracking-widest text-xs transition-transform active:scale-[0.99]"
              >
                {isAddedFeedback ? (
                  <span className="flex items-center justify-center gap-2 text-[#EDEBE6]">
                    <Check className="w-4 h-4 animate-in zoom-in-75" />
                    <span>Added to Bag · Opening...</span>
                  </span>
                ) : (
                  <span>Add to Bag · RM {product.price * quantity}</span>
                )}
              </Button>
            </div>
          </div>

          {/* Prototype Policy & Logistics Notice */}
          <div className="border-t border-b border-[#111111]/12 py-3.5 grid grid-cols-2 gap-3 text-[11px] text-[#666666] font-mono">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#111111] shrink-0" />
              <span>Demo courier: Free over RM 250</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-[#111111] shrink-0" />
              <span>Prototype 14-day sample exchange</span>
            </div>
          </div>

          {/* Product Details Tabs / Accordion */}
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
                  <p className="font-mono text-[#858585]">{product.fitGuide}</p>
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
                    * Prototype Notice: All yarn counts, textile densities, and finishing treatments represent targeted sample standards pending final mill production confirmation.
                  </p>
                </div>
              )}

              {activeTab === 'care' && (
                <div className="space-y-2 font-mono text-[#555555]">
                  <p>• Machine wash cold (30°C) with similar dark colours.</p>
                  <p>• Turn inside out prior to laundering to protect surface fibers.</p>
                  <p>• Hang dry flat in shade. Do not tumble dry to prevent sample shrinkage.</p>
                  <p>• Cool iron on reverse side if desired. Do not iron over graphic prints.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Full-Screen Lightbox Modal for Macro Photography Inspection */}
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
              alt="High resolution inspect view"
              className="max-h-[80vh] max-w-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="flex justify-between items-center text-[11px] font-mono text-[#858585]">
            <span>CLICK ANYWHERE OR ESC TO EXIT</span>
            <span>FRAME 0{selectedImage + 1} OF 0{product.images.length}</span>
          </div>
        </div>
      )}

      {/* Related Products Section */}
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

      {/* Mobile Sticky Buy Bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-[#F5F4F0]/95 backdrop-blur-md border-t border-[#111111]/15 p-3.5 z-30 flex items-center justify-between gap-3 shadow-xl">
        <div className="min-w-0">
          <div className="text-xs font-display font-bold text-[#111111] truncate uppercase">
            {product.name}
          </div>
          <div className="text-xs font-mono text-[#858585] flex items-center gap-2">
            <span className="text-[#111111] font-bold">RM {product.price}</span>
            <span>·</span>
            <span>Size {selectedSize}</span>
          </div>
        </div>
        <Button
          variant="primary"
          size="sm"
          onClick={handleAddToCart}
          className="shrink-0 font-mono tracking-widest text-xs px-5 py-3"
        >
          {isAddedFeedback ? '✓ Added' : 'Add to Bag'}
        </Button>
      </div>
    </div>
  );
};
