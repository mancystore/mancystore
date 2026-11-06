import React from 'react';
import { useCart } from '../context/CartContext';
import { Button } from '../components/Button';
import { Trash2, Plus, Minus, ArrowLeft, ArrowRight, ShoppingBag, ShieldCheck, Truck } from 'lucide-react';
import { ImageWithFallback } from '../components/ImageWithFallback';

interface CartProps {
  onNavigate: (page: string) => void;
  onOpenCheckout: () => void;
  onSelectProduct: (productId: string) => void;
}

export const Cart: React.FC<CartProps> = ({
  onNavigate,
  onOpenCheckout,
  onSelectProduct,
}) => {
  const { items, updateQuantity, removeFromCart, subtotal, totalItems } = useCart();

  const freeShippingThreshold = 250;
  const isFreeShipping = subtotal >= freeShippingThreshold || subtotal === 0;
  const shippingCost = isFreeShipping ? 0 : 15;
  const grandTotal = subtotal + shippingCost;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 sm:py-28 text-center space-y-6">
        <div className="w-16 h-16 bg-[#FFFFFF] border border-[#111111]/10 flex items-center justify-center mx-auto">
          <ShoppingBag className="w-8 h-8 text-[#9A9A91]" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-tight text-[#111111]">
            Your Bag is Empty
          </h1>
          <p className="text-xs sm:text-sm text-[#858585] max-w-md mx-auto">
            You haven&apos;t added any contemporary streetwear pieces to your shopping bag yet.
          </p>
        </div>
        <div className="pt-4 flex justify-center gap-4">
          <Button variant="primary" size="lg" onClick={() => onNavigate('shop')}>
            <span>Explore Essentials Catalogue</span>
            <ArrowRight className="w-4 h-4 ml-2 inline" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Page Title */}
      <div className="border-b border-[#111111]/10 pb-6 flex items-center justify-between">
        <div>
          <button
            onClick={() => onNavigate('shop')}
            className="flex items-center gap-1.5 text-xs font-mono text-[#858585] hover:text-[#111111] mb-2 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Continue Shopping</span>
          </button>
          <h1 className="text-3xl sm:text-4xl font-display font-black uppercase tracking-tight text-[#111111]">
            Shopping Bag ({totalItems})
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Items List (Col 1-8) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Complimentary Shipping Banner */}
          <div className="bg-[#FFFFFF] p-4 border border-[#111111]/10 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <Truck className="w-4 h-4 text-[#111111] shrink-0" />
              <span>
                {isFreeShipping ? (
                  <strong className="text-[#111111]">Complimentary domestic express shipping unlocked!</strong>
                ) : (
                  <span>
                    Add <strong className="text-[#111111]">RM {amountToFreeShipping}</strong> more to qualify for Free Shipping
                  </span>
                )}
              </span>
            </div>
            <span className="font-mono text-[11px] text-[#858585]">Threshold: RM 250</span>
          </div>

          {/* Table Header */}
          <div className="hidden sm:grid sm:grid-cols-12 text-xs font-mono uppercase tracking-wider text-[#858585] pb-2 border-b border-[#111111]/10">
            <div className="col-span-6">Garment Detail</div>
            <div className="col-span-2 text-center">Unit Price</div>
            <div className="col-span-2 text-center">Quantity</div>
            <div className="col-span-2 text-right">Total</div>
          </div>

          {/* Items */}
          <div className="divide-y divide-[#111111]/10">
            {items.map((item) => (
              <div key={item.id} className="py-6 first:pt-2 flex flex-col sm:grid sm:grid-cols-12 gap-4 items-center">
                {/* Col 1-6: Image + Info */}
                <div className="w-full sm:col-span-6 flex gap-4">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    onClick={() => onSelectProduct(item.productId)}
                    containerClassName="w-20 h-24 sm:w-24 sm:h-28 shrink-0 cursor-pointer"
                    className="w-full h-full object-cover bg-[#EAE8E2] border border-[#111111]/10"
                  />
                  <div className="flex flex-col justify-between py-1">
                    <div>
                      <h3
                        onClick={() => onSelectProduct(item.productId)}
                        className="text-sm font-semibold text-[#111111] hover:underline cursor-pointer"
                      >
                        {item.name}
                      </h3>
                      <div className="text-xs text-[#858585] mt-1 space-x-2">
                        <span>Size: <strong className="text-[#111111]">{item.size}</strong></span>
                        <span>·</span>
                        <span>Color: <strong className="text-[#111111]">{item.color.name}</strong></span>
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="flex items-center gap-1.5 text-xs text-[#858585] hover:text-[#111111] transition-colors cursor-pointer w-fit"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>

                {/* Col 7-8: Unit Price */}
                <div className="w-full sm:col-span-2 sm:text-center text-xs font-mono tabular-nums text-[#858585] flex justify-between sm:block">
                  <span className="sm:hidden font-sans">Unit Price:</span>
                  <span>RM {item.price}</span>
                </div>

                {/* Col 9-10: Quantity Stepper */}
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

                {/* Col 11-12: Line Total */}
                <div className="w-full sm:col-span-2 sm:text-right text-sm font-mono font-bold tabular-nums text-[#111111] flex justify-between sm:block">
                  <span className="sm:hidden font-sans font-normal text-xs text-[#858585]">Subtotal:</span>
                  <span>RM {item.price * item.quantity}</span>
                </div>
              </div>
            ))}
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
              <span>Estimated Shipping</span>
              <span className="font-mono tabular-nums text-[#111111]">
                {shippingCost === 0 ? 'FREE' : `RM ${shippingCost}`}
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
            <Button variant="primary" fullWidth size="lg" onClick={onOpenCheckout}>
              <span>Demonstration Checkout</span>
              <ArrowRight className="w-4 h-4 ml-2 inline" />
            </Button>
            <Button variant="outline" fullWidth onClick={() => onNavigate('shop')}>
              Continue Shopping
            </Button>
          </div>

          <div className="border-t border-[#111111]/10 pt-4 text-[11px] text-[#858585] space-y-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#111111] shrink-0" />
              <span>Demonstration Prototype (Phase 1)</span>
            </div>
            <p className="leading-relaxed">
              No real payments are collected. This screen allows full testing of cart math, item editing, and simulation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
