import React from 'react';
import { X, Plus, Minus, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from './Button';
import { ImageWithFallback } from './ImageWithFallback';

interface CartDrawerProps {
  onOpenCheckout: () => void;
  onNavigateToCart: () => void;
  onContinueShopping: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  onOpenCheckout,
  onNavigateToCart,
  onContinueShopping,
}) => {
  const {
    items,
    updateQuantity,
    removeFromCart,
    subtotal,
    totalItems,
    isCartDrawerOpen,
    closeCartDrawer,
  } = useCart();

  if (!isCartDrawerOpen) return null;

  const freeShippingThreshold = 250;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#111111]/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={closeCartDrawer}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#F5F4F0] border-l border-[#111111]/15 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-5 border-b border-[#111111]/10 flex items-center justify-between bg-[#EAE8E2]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-[#111111]" />
              <h3 className="font-display font-bold uppercase tracking-wider text-sm text-[#111111]">
                Shopping Bag ({totalItems})
              </h3>
            </div>
            <button
              onClick={closeCartDrawer}
              aria-label="Close cart drawer"
              className="text-[#858585] hover:text-[#111111] p-1 cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Complimentary Shipping Tracker */}
          <div className="bg-[#FFFFFF] px-5 py-3 border-b border-[#111111]/10">
            <div className="flex justify-between items-center text-[11px] uppercase font-mono mb-1.5">
              <span className="text-[#858585]">
                {amountToFreeShipping === 0
                  ? 'Complimentary Shipping Qualified'
                  : `Add RM ${amountToFreeShipping} for Free Shipping`}
              </span>
              <span className="font-semibold text-[#111111]">RM 250</span>
            </div>
            <div className="w-full bg-[#EAE8E2] h-1.5 overflow-hidden">
              <div
                className="bg-[#111111] h-full transition-all duration-300"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-[#111111]/10">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
                <ShoppingBag className="w-12 h-12 text-[#9A9A91] stroke-[1.2]" />
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-[#111111]">
                    Your bag is empty
                  </h4>
                  <p className="text-xs text-[#858585] max-w-xs">
                    Explore our Season 001 collection or wardrobe essentials.
                  </p>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    closeCartDrawer();
                    onContinueShopping();
                  }}
                >
                  Shop Heavyweight Essentials
                </Button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex gap-4">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    containerClassName="w-20 h-24 shrink-0"
                    className="w-full h-full object-cover bg-[#EAE8E2] border border-[#111111]/10"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="text-xs font-semibold text-[#111111] leading-snug">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          aria-label={`Remove ${item.name}`}
                          className="text-[#858585] hover:text-[#111111] p-0.5 cursor-pointer transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] text-[#858585] mt-1 space-x-2">
                        <span>Size: <strong className="text-[#111111]">{item.size}</strong></span>
                        <span>·</span>
                        <span>Color: <strong className="text-[#111111]">{item.color.name}</strong></span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-[#111111]/20 bg-[#FFFFFF]">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 text-[#858585] hover:text-[#111111] cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-mono tabular-nums text-[#111111] font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 text-[#858585] hover:text-[#111111] cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Total Price */}
                      <div className="font-mono tabular-nums text-xs font-bold text-[#111111]">
                        RM {item.price * item.quantity}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer with Checkout Actions */}
          {items.length > 0 && (
            <div className="p-5 bg-[#EAE8E2] border-t border-[#111111]/10 space-y-3">
              <div className="flex justify-between items-center text-xs text-[#858585]">
                <span>Estimated Subtotal</span>
                <span className="font-mono tabular-nums text-sm font-bold text-[#111111]">
                  RM {subtotal}
                </span>
              </div>
              <div className="text-[10px] text-[#858585]">
                Taxes calculated at simulated checkout · Free exchange within 14 days
              </div>

              <div className="space-y-2 pt-1">
                <Button
                  variant="primary"
                  fullWidth
                  onClick={() => {
                    closeCartDrawer();
                    onOpenCheckout();
                  }}
                >
                  <span>Demonstration Checkout</span>
                  <ArrowRight className="w-4 h-4 ml-2 inline" />
                </Button>

                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => {
                    closeCartDrawer();
                    onNavigateToCart();
                  }}
                >
                  View Full Bag & Details
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
