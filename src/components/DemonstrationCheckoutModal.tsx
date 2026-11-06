import React, { useState } from 'react';
import { X, ShieldAlert, CheckCircle2, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from './Button';

interface DemonstrationCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinueShopping: () => void;
}

export const DemonstrationCheckoutModal: React.FC<DemonstrationCheckoutModalProps> = ({
  isOpen,
  onClose,
  onContinueShopping,
}) => {
  const { items, subtotal, clearCart } = useCart();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: 'MNC Enthusiast',
    email: 'mancystore00@gmail.com',
    phone: '+60 12-345 6789',
    city: 'Kuala Lumpur',
    state: 'Wilayah Persekutuan',
    postalCode: '50450',
    notes: 'Please leave with front reception if unavailable.',
  });

  if (!isOpen) return null;

  const shippingCost = subtotal > 250 || subtotal === 0 ? 0 : 15;
  const grandTotal = subtotal + shippingCost;

  const handleSimulateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    clearCart();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#111111]/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#F5F4F0] w-full max-w-2xl border border-[#111111]/20 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#111111]/10 bg-[#EAE8E2]">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#858585]">
              Phase 1 Prototype Sandbox
            </div>
            <h3 className="text-lg font-display font-bold uppercase tracking-tight text-[#111111]">
              Demonstration Checkout
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close checkout preview"
            className="text-[#858585] hover:text-[#111111] p-1 cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notice Disclaimer Banner */}
        <div className="bg-[#111111] text-[#F5F4F0] px-6 py-3 flex items-start gap-3 text-xs leading-relaxed">
          <ShieldAlert className="w-4 h-4 text-[#9A9A91] shrink-0 mt-0.5" />
          <p>
            <strong className="tracking-wide">DEMONSTRATION ONLY:</strong> This is the Phase 1 architectural storefront preview. No real payments, financial transactions, or manufacturing orders are executed.
          </p>
        </div>

        {/* Content Body */}
        {!isSubmitted ? (
          <form onSubmit={handleSimulateOrder} className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
            {/* Order Items Summary */}
            <div className="border border-[#111111]/10 bg-[#FFFFFF] p-4 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-[#111111] flex justify-between">
                <span>Selected Garments ({items.length})</span>
                <span className="font-mono">Subtotal: RM {subtotal}</span>
              </div>
              <div className="divide-y divide-[#111111]/5 max-h-36 overflow-y-auto pr-2">
                {items.map((item) => (
                  <div key={item.id} className="py-2 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-9 h-10 object-cover bg-[#E5E3DC] border border-[#111111]/10"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <div className="font-semibold text-[#111111]">{item.name}</div>
                        <div className="text-[11px] text-[#858585]">
                          Size: {item.size} · {item.color.name} · Qty: {item.quantity}
                        </div>
                      </div>
                    </div>
                    <div className="font-mono tabular-nums font-medium text-[#111111]">
                      RM {item.price * item.quantity}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Simulated Delivery Information */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#111111]">
                Demonstration Shipping Information
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-[10px] uppercase font-mono text-[#858585] mb-1">
                    Recipient Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#FFFFFF] border border-[#111111]/15 px-3 py-2 text-xs outline-none focus:border-[#111111]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-mono text-[#858585] mb-1">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#FFFFFF] border border-[#111111]/15 px-3 py-2 text-xs outline-none focus:border-[#111111]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-mono text-[#858585] mb-1">
                    City / Town
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-[#FFFFFF] border border-[#111111]/15 px-3 py-2 text-xs outline-none focus:border-[#111111]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-mono text-[#858585] mb-1">
                    State / Region
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full bg-[#FFFFFF] border border-[#111111]/15 px-3 py-2 text-xs outline-none focus:border-[#111111]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-mono text-[#858585] mb-1">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className="w-full bg-[#FFFFFF] border border-[#111111]/15 px-3 py-2 text-xs outline-none focus:border-[#111111]"
                  />
                </div>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="border-t border-[#111111]/10 pt-4 space-y-2 text-xs">
              <div className="flex justify-between text-[#858585]">
                <span>Merchandise Subtotal</span>
                <span className="font-mono tabular-nums text-[#111111]">RM {subtotal}</span>
              </div>
              <div className="flex justify-between text-[#858585]">
                <span>Domestic Express Shipping</span>
                <span className="font-mono tabular-nums text-[#111111]">
                  {shippingCost === 0 ? 'FREE (Threshold met)' : `RM ${shippingCost}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#111111] pt-2 border-t border-[#111111]/10">
                <span>Demonstration Total</span>
                <span className="font-mono tabular-nums text-base">RM {grandTotal}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <Button type="button" variant="outline" onClick={onClose} fullWidth>
                Back to Cart
              </Button>
              <Button type="submit" variant="primary" fullWidth>
                Simulate Order Confirmation
              </Button>
            </div>
          </form>
        ) : (
          <div className="p-8 text-center space-y-6">
            <div className="w-14 h-14 bg-[#111111] text-[#F5F4F0] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 text-[#EDEBE6]" />
            </div>

            <div className="space-y-2">
              <div className="text-[11px] font-mono uppercase tracking-widest text-[#858585]">
                Demo Order #MNC-2026-089
              </div>
              <h3 className="text-2xl font-display font-bold uppercase tracking-tight text-[#111111]">
                Demonstration Order Received
              </h3>
              <p className="text-xs text-[#858585] max-w-md mx-auto leading-relaxed">
                Thank you for testing the MNC contemporary streetwear storefront. This interaction demonstrates the checkout routing, inventory receipt simulation, and cart reset.
              </p>
            </div>

            <div className="bg-[#EAE8E2] p-4 text-xs font-mono text-[#111111] max-w-sm mx-auto text-left space-y-1 border border-[#111111]/10">
              <div className="flex justify-between">
                <span className="text-[#858585]">Status:</span>
                <span className="font-bold">Prototype Verified</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#858585]">Currency:</span>
                <span>Malaysian Ringgit (MYR)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#858585]">Recipient:</span>
                <span>{formData.name}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-center gap-3">
              <Button
                variant="primary"
                onClick={() => {
                  setIsSubmitted(false);
                  onClose();
                  onContinueShopping();
                }}
              >
                <span>Continue Exploring Catalogue</span>
                <ArrowRight className="w-4 h-4 ml-2 inline" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
