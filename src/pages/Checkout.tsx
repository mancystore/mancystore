
import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ShieldAlert,
  ShoppingBag,
  MapPin,
  User,
} from 'lucide-react';

import { useCart } from '../context/CartContext';
import { STOREFRONT_CONFIG } from '../config/storefront.config';
import { Button } from '../components/Button';
import { ImageWithFallback } from '../components/ImageWithFallback';

interface CheckoutProps {
  onBackToCart: () => void;
  onContinueShopping: () => void;
  onSubmitOrder: (customerDetails: CustomerDetails) => void;
}

export interface CustomerDetails {
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  notes: string;
}

const INITIAL_FORM_DATA: CustomerDetails = {
  fullName: '',
  email: '',
  phone: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  postalCode: '',
  notes: '',
};

const formatPrice = (amount: number) =>
  `RM ${amount.toFixed(2)}`;

export const Checkout: React.FC<CheckoutProps> = ({
  onBackToCart,
  onContinueShopping,
  onSubmitOrder,
}) => {
  const { items, subtotal } = useCart();

  const [formData, setFormData] =
    useState<CustomerDetails>(INITIAL_FORM_DATA);

  const [phoneError, setPhoneError] = useState('');
  const [postcodeError, setPostcodeError] = useState('');

  const isCheckoutEnabled =
    STOREFRONT_CONFIG.allowCheckout;

  const updateField = (
    field: keyof CustomerDetails,
    value: string
  ) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setPhoneError('');
    setPostcodeError('');

    const normalizedPhone = formData.phone.replace(/[\s-]/g, '');
    const normalizedPostcode = formData.postalCode.trim();

    // Basic Malaysian phone number validation.
    if (!/^(\+?60|0)1\d{8,9}$/.test(normalizedPhone)) {
      setPhoneError('Enter a valid Malaysian mobile number.');
      return;
    }

    // Malaysian postcodes contain five digits.
    if (!/^\d{5}$/.test(normalizedPostcode)) {
      setPostcodeError('Enter a valid 5-digit postcode.');
      return;
    }

    onSubmitOrder({
      ...formData,
      phone: normalizedPhone,
      postalCode: normalizedPostcode,
    });
  };

  const inputClassName =
    'w-full bg-white border border-[#111111]/15 px-3 py-3 text-sm text-[#111111] outline-none transition-colors focus:border-[#111111] placeholder:text-[#AAAAAA]';

  const labelClassName =
    'block text-[10px] font-mono uppercase tracking-widest text-[#777777] mb-2';

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-24 text-center">
        <ShoppingBag className="w-12 h-12 mx-auto text-[#858585] mb-6 stroke-[1.2]" />

        <h1 className="text-2xl font-display font-black uppercase tracking-tight text-[#111111]">
          Your Bag Is Empty
        </h1>

        <p className="text-sm text-[#777777] mt-3 mb-8">
          Add something from the catalogue before proceeding to checkout.
        </p>

        <Button onClick={onContinueShopping}>
          Explore Catalogue
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    );
  }

  if (!isCheckoutEnabled) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-24 text-center">
        <ShieldAlert className="w-12 h-12 mx-auto text-[#858585] mb-6" />

        <h1 className="text-2xl font-display font-black uppercase tracking-tight text-[#111111]">
          Checkout Unavailable
        </h1>

        <p className="text-sm text-[#777777] mt-3 mb-8">
          Checkout is currently disabled for this storefront.
        </p>

        <Button variant="outline" onClick={onBackToCart}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Return to Shopping Bag
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-[#F5F4F0] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14">

        {/* Page Header */}
        <div className="border-b border-[#111111]/15 pb-6 mb-8">
          <button
            type="button"
            onClick={onBackToCart}
            className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#777777] hover:text-[#111111] transition-colors mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Return to Shopping Bag
          </button>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#858585]">
                MNC / ORDER PROCESSING
              </span>

              <h1 className="text-3xl sm:text-4xl font-display font-black uppercase tracking-tight text-[#111111] mt-2">
                Checkout
              </h1>
            </div>

            <span className="text-[10px] font-mono uppercase tracking-widest text-[#858585]">
              Step 01 / 01
            </span>
          </div>
        </div>

        {/* Demonstration Notice */}
        <div className="bg-[#111111] text-[#F5F4F0] p-4 sm:p-5 flex items-start gap-3 mb-10">
          <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5 text-[#BDBAB2]" />

          <div className="space-y-1">
            <p className="text-[10px] font-mono uppercase tracking-widest font-bold">
              Demonstration Environment
            </p>

            <p className="text-xs text-[#D0CEC8] leading-relaxed">
              This checkout is for storefront testing only. No real
              payments, financial transactions or fulfilment orders
              will be processed.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">

            {/* Customer Information */}
            <div className="lg:col-span-7 space-y-10">

              {/* Contact Details */}
              <section className="space-y-5">
                <div className="flex items-center gap-3 border-b border-[#111111]/15 pb-4">
                  <User className="w-4 h-4 text-[#777777]" />

                  <h2 className="text-sm font-display font-bold uppercase tracking-wider text-[#111111]">
                    Contact Information
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className={labelClassName}>
                      Full Name *
                    </label>

                    <input
                      type="text"
                      required
                      autoComplete="name"
                      maxLength={100}
                      value={formData.fullName}
                      onChange={(event) =>
                        updateField('fullName', event.target.value)
                      }
                      placeholder="Enter recipient's full name"
                      className={inputClassName}
                    />
                  </div>

                  <div>
                    <label className={labelClassName}>
                      Email Address *
                    </label>

                    <input
                      type="email"
                      required
                      autoComplete="email"
                      maxLength={254}
                      value={formData.email}
                      onChange={(event) =>
                        updateField('email', event.target.value)
                      }
                      placeholder="name@example.com"
                      className={inputClassName}
                    />
                  </div>

                  <div>
                    <label className={labelClassName}>
                      Mobile Number *
                    </label>

                    <input
                      type="tel"
                      required
                      autoComplete="tel"
                      maxLength={20}
                      value={formData.phone}
                      onChange={(event) =>
                        updateField('phone', event.target.value)
                      }
                      placeholder="+60 12 345 6789"
                      className={inputClassName}
                    />

                    {phoneError && (
                      <p className="text-[11px] text-red-700 mt-1.5">
                        {phoneError}
                      </p>
                    )}
                  </div>
                </div>
              </section>

              {/* Delivery Address */}
              <section className="space-y-5">
                <div className="flex items-center gap-3 border-b border-[#111111]/15 pb-4">
                  <MapPin className="w-4 h-4 text-[#777777]" />

                  <h2 className="text-sm font-display font-bold uppercase tracking-wider text-[#111111]">
                    Delivery Address
                  </h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className={labelClassName}>
                      Address Line 1 *
                    </label>

                    <input
                      type="text"
                      required
                      autoComplete="address-line1"
                      maxLength={150}
                      value={formData.addressLine1}
                      onChange={(event) =>
                        updateField('addressLine1', event.target.value)
                      }
                      placeholder="House number, street name"
                      className={inputClassName}
                    />
                  </div>

                  <div>
                    <label className={labelClassName}>
                      Address Line 2
                    </label>

                    <input
                      type="text"
                      autoComplete="address-line2"
                      maxLength={150}
                      value={formData.addressLine2}
                      onChange={(event) =>
                        updateField('addressLine2', event.target.value)
                      }
                      placeholder="Apartment, unit, building (optional)"
                      className={inputClassName}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClassName}>
                        City / Town *
                      </label>

                      <input
                        type="text"
                        required
                        autoComplete="address-level2"
                        maxLength={80}
                        value={formData.city}
                        onChange={(event) =>
                          updateField('city', event.target.value)
                        }
                        placeholder="City or town"
                        className={inputClassName}
                      />
                    </div>

                    <div>
                      <label className={labelClassName}>
                        State *
                      </label>

                      <select
                        required
                        autoComplete="address-level1"
                        value={formData.state}
                        onChange={(event) =>
                          updateField('state', event.target.value)
                        }
                        className={inputClassName}
                      >
                        <option value="">Select state</option>
                        <option value="Johor">Johor</option>
                        <option value="Kedah">Kedah</option>
                        <option value="Kelantan">Kelantan</option>
                        <option value="Kuala Lumpur">Kuala Lumpur</option>
                        <option value="Labuan">Labuan</option>
                        <option value="Melaka">Melaka</option>
                        <option value="Negeri Sembilan">Negeri Sembilan</option>
                        <option value="Pahang">Pahang</option>
                        <option value="Penang">Penang</option>
                        <option value="Perak">Perak</option>
                        <option value="Perlis">Perlis</option>
                        <option value="Putrajaya">Putrajaya</option>
                        <option value="Sabah">Sabah</option>
                        <option value="Sarawak">Sarawak</option>
                        <option value="Selangor">Selangor</option>
                        <option value="Terengganu">Terengganu</option>
                      </select>
                    </div>

                    <div>
                      <label className={labelClassName}>
                        Postcode *
                      </label>

                      <input
                        type="text"
                        required
                        autoComplete="postal-code"
                        inputMode="numeric"
                        maxLength={5}
                        value={formData.postalCode}
                        onChange={(event) =>
                          updateField('postalCode', event.target.value)
                        }
                        placeholder="5-digit postcode"
                        className={inputClassName}
                      />

                      {postcodeError && (
                        <p className="text-[11px] text-red-700 mt-1.5">
                          {postcodeError}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </section>

              {/* Additional Notes */}
              <section className="space-y-4">
                <h2 className="text-sm font-display font-bold uppercase tracking-wider text-[#111111] border-b border-[#111111]/15 pb-4">
                  Additional Notes
                </h2>

                <textarea
                  rows={3}
                  maxLength={500}
                  value={formData.notes}
                  onChange={(event) =>
                    updateField('notes', event.target.value)
                  }
                  placeholder="Delivery instructions or additional information (optional)"
                  className={`${inputClassName} resize-y`}
                />

                <p className="text-[10px] font-mono text-[#858585] text-right">
                  {formData.notes.length} / 500
                </p>
              </section>
            </div>

            {/* Order Summary */}
            <aside className="lg:col-span-5">
              <div className="lg:sticky lg:top-28 bg-white border border-[#111111]/12">
                <div className="p-5 border-b border-[#111111]/10">
                  <h2 className="text-sm font-display font-bold uppercase tracking-wider text-[#111111]">
                    Order Summary
                  </h2>

                  <p className="text-[10px] font-mono text-[#858585] mt-1">
                    {items.length} {items.length === 1 ? 'ITEM' : 'ITEMS'}
                  </p>
                </div>

                <div className="p-5 space-y-4 max-h-105 overflow-y-auto">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-3"
                    >
                      <div className="w-16 h-20 shrink-0">
                        <ImageWithFallback
                          src={item.image}
                          alt={item.name}
                          containerClassName="w-full h-full"
                          className="w-full h-full object-cover border border-[#111111]/10 bg-[#EAE8E2]"
                        />
                      </div>

                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <h3 className="text-xs font-semibold text-[#111111] leading-snug">
                            {item.name}
                          </h3>

                          <p className="text-[10px] font-mono text-[#858585] mt-1">
                            {item.color.name} / {item.size}
                          </p>

                          <p className="text-[10px] font-mono text-[#858585]">
                            Quantity: {item.quantity}
                          </p>
                        </div>

                        <p className="text-xs font-mono font-semibold text-[#111111] mt-2">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[#111111]/10 p-5 space-y-3">
                  <div className="flex justify-between text-xs text-[#777777]">
                    <span>Merchandise Subtotal</span>

                    <span className="font-mono text-[#111111]">
                      {formatPrice(subtotal)}
                    </span>
                  </div>

                  <div className="flex justify-between text-xs text-[#777777]">
                    <span>Shipping</span>

                    <span className="font-mono text-[#111111]">
                      Calculated at checkout
                    </span>
                  </div>

                  <div className="border-t border-[#111111]/10 pt-4 flex justify-between items-center">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#111111]">
                      Total Before Shipping
                    </span>

                    <span className="text-lg font-mono font-bold tabular-nums text-[#111111]">
                      {formatPrice(subtotal)}
                    </span>
                  </div>

                  <p className="text-[10px] text-[#858585] leading-relaxed">
                    Shipping charges and final order details are not
                    confirmed in this demonstration.
                  </p>
                </div>

                <div className="p-5 pt-0 space-y-3">
                  <Button
                    type="submit"
                    fullWidth
                    size="lg"
                    disabled={items.length === 0}
                  >
                    Submit Demonstration Order
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    fullWidth
                    onClick={onBackToCart}
                  >
                    Return to Shopping Bag
                  </Button>

                  <p className="text-[9px] font-mono uppercase tracking-wider text-center text-[#858585]">
                    No Payment Required · Prototype Environment
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </form>
      </div>
    </div>
  );
};
