import React, { useEffect } from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, Eye, ShieldAlert } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { STOREFRONT_CONFIG } from '../config/storefront.config';
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

  const isStrictPreview =
    STOREFRONT_CONFIG.mode === 'PREVIEW' && !STOREFRONT_CONFIG.allowAddToCart;

  // Free shipping threshold in MYR
  const freeShippingThreshold = 250;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  // Handle ESC key listener to dismiss drawer
  useEffect(() => {
    if (!isCartDrawerOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeCartDrawer();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isCartDrawerOpen, closeCartDrawer]);

  if (!isCartDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close drawer backdrop"
        className="fixed inset-0 w-full h-full bg-[#111111]/60 backdrop-blur-xs transition-opacity duration-300 cursor-default"
        onClick={closeCartDrawer}
      />

      {/* Drawer Container */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10 pointer-events-none">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cart-drawer-title"
          className="pointer-events-auto relative w-screen max-w-md bg-[#F5F4F0] border-l border-[#111111]/15 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300"
        >
          {/* Header */}
          <div className="p-5 border-b border-[#111111]/10 flex items-center justify-between bg-[#EAE8E2]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-[#111111]" />
              <h3
                id="cart-drawer-title"
                className="font-display font-bold uppercase tracking-wider text-sm text-[#111111]"
              >
                {isStrictPreview
                  ? 'Storefront Preview'
                  : `Shopping Bag (${totalItems})`}
              </h3>
            </div>

            <button
              type="button"
              onClick={closeCartDrawer}
              aria-label="Close drawer"
              className="text-[#858585] hover:text-[#111111] p-1 cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Render Strict Preview Mode Notice */}
          {isStrictPreview ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center px-8 py-12 overflow-y-auto">
              <div className="w-16 h-16 flex items-center justify-center border border-[#111111]/15 bg-[#EAE8E2] mb-6">
                <Eye className="w-7 h-7 text-[#111111] stroke-[1.3]" />
              </div>

              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#858585] mb-3">
                MNC / PREVIEW MODE
              </span>

              <h4 className="text-lg font-display font-bold uppercase tracking-wide text-[#111111] mb-3">
                Purchasing Unavailable
              </h4>

              <p className="text-xs leading-relaxed text-[#777777] max-w-xs">
                You are viewing a prototype storefront. Products, prices, and specifications
                are for design preview only. Shopping and checkout are currently disabled.
              </p>

              <div className="w-full border-t border-[#111111]/10 mt-8 pt-6">
                <div className="flex justify-between text-[10px] font-mono uppercase tracking-widest text-[#858585] mb-2">
                  <span>Storefront Status</span>
                  <span className="text-[#111111] font-bold">
                    {STOREFRONT_CONFIG.mode}
                  </span>
                </div>

                <div className="bg-[#EAE8E2] border border-[#111111]/10 p-3 text-left">
                  <p className="text-[10px] leading-relaxed text-[#777777]">
                    All displayed products are prototype concepts. Final product details,
                    pricing, and availability will be announced prior to commercial drop.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* Render Interactive Shopping Bag Content */
            <>
              {/* Complimentary Shipping Tracker */}
              <div className="bg-[#FFFFFF] px-5 py-3 border-b border-[#111111]/10">
                <div className="flex justify-between items-center text-[11px] uppercase font-mono mb-1.5">
                  <span className="text-[#858585]">
                    {amountToFreeShipping === 0
                      ? 'Complimentary Shipping Qualified'
                      : `Add RM ${amountToFreeShipping} for Free Shipping`}
                  </span>
                  <span className="font-semibold text-[#111111]">RM {freeShippingThreshold}</span>
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
                              className="text-[#858585] hover:text-[#111111] p-1 cursor-pointer transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="text-[11px] font-mono text-[#858585] mt-1 space-y-0.5">
                            <div>
                              Size: <span className="font-semibold text-[#111111]">{item.size}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span>Colour:</span>
                              <span
                                className="w-2 h-2 rounded-full border border-[#111111]/20 inline-block"
                                style={{ backgroundColor: item.color.hex }}
                              />
                              <span className="font-semibold text-[#111111]">{item.color.name}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#111111]/5">
                          {/* Stepper */}
                          <div className="flex items-center border border-[#111111]/20 bg-[#FFFFFF]">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="p-1 text-[#858585] hover:text-[#111111] cursor-pointer"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-xs font-mono font-bold tabular-nums text-[#111111]">
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

                          <div className="text-xs font-mono font-bold tabular-nums text-[#111111]">
                            RM {item.price * item.quantity}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          )}

          {/* Footer */}
          <div className="p-5 bg-[#EAE8E2] border-t border-[#111111]/10 space-y-3">
            {isStrictPreview ? (
              <Button
                variant="primary"
                fullWidth
                onClick={() => {
                  closeCartDrawer();
                  onContinueShopping();
                }}
              >
                Continue Exploring
              </Button>
            ) : items.length > 0 ? (
              <>
                <div className="space-y-1.5 text-xs font-mono">
                  <div className="flex justify-between text-[#858585]">
                    <span>Subtotal:</span>
                    <span className="font-bold tabular-nums text-[#111111]">RM {subtotal}</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-[#858585]">
                    <span>Shipping:</span>
                    <span>{subtotal >= freeShippingThreshold ? 'Complimentary' : 'Calculated at checkout'}</span>
                  </div>
                </div>

                <div className="pt-2 space-y-2">
                  <Button
                    variant="primary"
                    fullWidth
                    size="md"
                    onClick={() => {
                      closeCartDrawer();
                      onOpenCheckout();
                    }}
                    className="cursor-pointer"
                  >
                    <span>Proceed to Demonstration Checkout</span>
                    <ArrowRight className="w-4 h-4 ml-2 inline" />
                  </Button>

                  <Button
                    variant="outline"
                    fullWidth
                    size="sm"
                    onClick={() => {
                      closeCartDrawer();
                      onNavigateToCart();
                    }}
                    className="cursor-pointer"
                  >
                    View Full Bag (Cart)
                  </Button>
                </div>

                <div className="pt-2 flex items-center justify-center gap-1.5 text-[10px] font-mono text-[#858585]">
                  <ShieldAlert className="w-3 h-3 text-[#9A9A91]" />
                  <span>Demonstration Sandbox · All Prices in MYR</span>
                </div>
              </>
            ) : (
              <Button
                variant="outline"
                fullWidth
                onClick={() => {
                  closeCartDrawer();
                  onContinueShopping();
                }}
              >
                Continue Shopping
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
