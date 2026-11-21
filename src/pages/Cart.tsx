import React from 'react';
import { ArrowLeft, Eye, ShoppingBag, Plus, Minus, Trash2, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '../components/Button';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { useCart } from '../context/CartContext';
import { STOREFRONT_CONFIG } from '../config/storefront.config';

interface CartProps {
  onNavigate: (page: string) => void;
  onOpenCheckout: () => void;
  onSelectProduct: (productId: string) => void;
}

export const Cart: React.FC<CartProps> = ({
  onNavigate,
  onOpenCheckout,
}) => {
  const {
    items,
    updateQuantity,
    removeFromCart,
    subtotal,
  } = useCart();

  const isStrictPreview =
    STOREFRONT_CONFIG.mode === 'PREVIEW' && !STOREFRONT_CONFIG.allowAddToCart;

  const freeShippingThreshold = 250;
  const shippingCost = subtotal > freeShippingThreshold || subtotal === 0 ? 0 : 15;
  const grandTotal = subtotal + shippingCost;

  // Render Preview-Only Informational View
  if (isStrictPreview) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
        <button
          onClick={() => onNavigate('shop')}
          className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#858585] hover:text-[#111111] transition-colors cursor-pointer mb-12"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Return to Catalogue
        </button>

        <div className="text-center space-y-8">
          <div className="w-20 h-20 bg-[#EAE8E2] border border-[#111111]/10 flex items-center justify-center mx-auto">
            <Eye className="w-9 h-9 text-[#111111] stroke-[1.3]" />
          </div>

          <div className="space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#858585]">
              MNC / STOREFRONT STATUS
            </span>

            <h1 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight text-[#111111]">
              Preview Experience
            </h1>

            <p className="text-sm text-[#777777] max-w-lg mx-auto leading-relaxed">
              MNC is currently presenting its prototype storefront. Explore the collections,
              product concepts, and proposed specifications. Purchasing is not yet available.
            </p>
          </div>

          <div className="max-w-xl mx-auto bg-[#EAE8E2] border border-[#111111]/10 p-6 sm:p-8 text-left space-y-5">
            <div className="flex items-center justify-between border-b border-[#111111]/10 pb-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#858585]">
                Current Mode
              </span>

              <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-[#111111]">
                {STOREFRONT_CONFIG.mode}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <ShoppingBag className="w-4 h-4 text-[#858585] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-[#111111]">
                    Purchasing Disabled
                  </p>
                  <p className="text-[11px] text-[#777777] leading-relaxed mt-1">
                    Add-to-cart and checkout functions are unavailable during this design preview.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Eye className="w-4 h-4 text-[#858585] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-[#111111]">
                    Prototype Catalogue
                  </p>
                  <p className="text-[11px] text-[#777777] leading-relaxed mt-1">
                    Product imagery, prices, fabric details, and specifications are preliminary concepts subject to confirmation.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <Button
              variant="primary"
              size="lg"
              onClick={() => onNavigate('shop')}
            >
              Explore MNC Catalogue
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Render Interactive Shopping Bag View
  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20 sm:py-28 text-center space-y-6">
        <div className="w-16 h-16 bg-[#EAE8E2] border border-[#111111]/10 flex items-center justify-center mx-auto">
          <ShoppingBag className="w-8 h-8 text-[#9A9A91] stroke-[1.2]" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-display font-black uppercase tracking-tight text-[#111111]">
            Your Shopping Bag is Empty
          </h1>
          <p className="text-xs sm:text-sm text-[#858585] max-w-sm mx-auto leading-relaxed">
            There are currently no garments in your bag. Explore our heavyweight essentials or Season 001 collection.
          </p>
        </div>

        <div className="pt-4">
          <Button variant="primary" size="lg" onClick={() => onNavigate('shop')}>
            Explore MNC Catalogue
            <ArrowRight className="w-4 h-4 ml-2 inline" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Editorial Header */}
      <div className="border-b border-[#111111]/12 pb-6 flex justify-between items-end">
        <div>
          <div className="text-xs font-mono text-[#858585] mb-1">
            Shopping Bag // Order Review
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight text-[#111111]">
            Selected Garments
          </h1>
        </div>

        <span className="text-xs font-mono text-[#858585]">
          [ {items.length} Distinct Silhouettes ]
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Cart Items Table (Col 1-8) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="divide-y divide-[#111111]/10 border-t border-b border-[#111111]/10">
            {items.map((item) => (
              <div
                key={item.id}
                className="py-6 flex flex-col sm:grid sm:grid-cols-12 gap-4 sm:gap-6 items-start sm:items-center"
              >
                {/* Garment Thumbnail & Details (Col 1-6) */}
                <div className="w-full sm:col-span-6 flex gap-4">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    containerClassName="w-20 h-24 sm:w-24 sm:h-28 shrink-0"
                    className="w-full h-full object-cover bg-[#EAE8E2] border border-[#111111]/10"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-semibold text-[#111111] leading-snug">
                        {item.name}
                      </h3>

                      <div className="text-xs font-mono text-[#858585] mt-1 space-y-0.5">
                        <div>
                          Size: <strong className="text-[#111111]">{item.size}</strong>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span>Colour:</span>
                          <span
                            className="w-2 h-2 rounded-full border border-[#111111]/20 inline-block"
                            style={{ backgroundColor: item.color.hex }}
                          />
                          <strong className="text-[#111111]">{item.color.name}</strong>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="flex items-center gap-1.5 text-xs text-[#858585] hover:text-[#111111] transition-colors cursor-pointer w-fit mt-2"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>

                {/* Unit Price (Col 7-8) */}
                <div className="w-full sm:col-span-2 sm:text-center text-xs font-mono tabular-nums text-[#858585] flex justify-between sm:block">
                  <span className="sm:hidden font-sans">Unit Price:</span>
                  <span>RM {item.price}</span>
                </div>

                {/* Quantity Stepper (Col 9-10) */}
                <div className="w-full sm:col-span-2 flex justify-between sm:justify-center items-center">
                  <span className="sm:hidden text-xs text-[#858585]">Quantity:</span>
                  <div className="flex items-center border border-[#111111] bg-[#FFFFFF]">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="p-1.5 text-[#858585] hover:text-[#111111] cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-3 text-xs font-mono font-bold tabular-nums text-[#111111]">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="p-1.5 text-[#858585] hover:text-[#111111] cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Line Total (Col 11-12) */}
                <div className="w-full sm:col-span-2 sm:text-right text-sm font-mono font-bold tabular-nums text-[#111111] flex justify-between sm:block">
                  <span className="sm:hidden font-sans font-normal text-xs text-[#858585]">Subtotal:</span>
                  <span>RM {item.price * item.quantity}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <button
              onClick={() => onNavigate('shop')}
              className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#858585] hover:text-[#111111] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Continue Shopping</span>
            </button>
          </div>
        </div>

        {/* Order Summary (Col 9-12) */}
        <div className="lg:col-span-4 bg-[#FFFFFF] border border-[#111111]/10 p-6 space-y-6">
          <h2 className="text-base font-display font-bold uppercase tracking-wider text-[#111111] border-b border-[#111111]/10 pb-4">
            Order Summary
          </h2>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between text-[#858585]">
              <span>Merchandise Subtotal</span>
              <span className="font-mono tabular-nums text-[#111111] font-semibold">RM {subtotal}</span>
            </div>
            <div className="flex justify-between text-[#858585]">
              <span>Domestic Express Shipping</span>
              <span className="font-mono tabular-nums text-[#111111]">
                {shippingCost === 0 ? 'FREE (Threshold met)' : `RM ${shippingCost}`}
              </span>
            </div>
            <div className="flex justify-between text-[#858585]">
              <span>Currency</span>
              <span className="font-mono text-[#111111]">MYR (RM)</span>
            </div>

            <div className="border-t border-[#111111]/10 pt-4 flex justify-between items-baseline text-sm font-bold text-[#111111]">
              <span className="uppercase tracking-wider">Estimated Total</span>
              <span className="font-mono tabular-nums text-lg">RM {grandTotal}</span>
            </div>
          </div>

          <div className="pt-2 space-y-3">
            <Button variant="primary" fullWidth size="lg" onClick={onOpenCheckout} className="cursor-pointer">
              <span>Demonstration Checkout</span>
              <ArrowRight className="w-4 h-4 ml-2 inline" />
            </Button>
            <Button variant="outline" fullWidth onClick={() => onNavigate('shop')} className="cursor-pointer">
              Continue Shopping
            </Button>
          </div>

          <div className="border-t border-[#111111]/10 pt-4 text-[11px] text-[#858585] space-y-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#111111] shrink-0" />
              <span>Demonstration Prototype (Phase 2)</span>
            </div>
            <p className="leading-relaxed">
              No real payments are collected. This screen allows full testing of cart calculations, item editing, and order simulations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
