
import React from 'react';
import {
  CheckCircle2,
  ArrowRight,
  Package,
  MapPin,
  User,
  Mail,
  Phone,
  ShoppingBag,
} from 'lucide-react';

import { Button } from '../components/Button';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { CartItem } from '../types/product';
import { CustomerDetails } from './Checkout';

interface OrderConfirmationProps {
  orderNumber: string;
  customerDetails: CustomerDetails;
  items: CartItem[];
  subtotal: number;
  onContinueShopping: () => void;
}

export function OrderConfirmation({
  orderNumber,
  customerDetails,
  items,
  subtotal,
  onContinueShopping,
}: OrderConfirmationProps) {
  const formatPrice = (price: number) =>
    `RM ${price.toFixed(2)}`;

  return (
    <section className="min-h-screen bg-[#F5F4F0] px-5 py-16 md:px-10">
      <div className="mx-auto max-w-4xl">

        {/* Confirmation Header */}
        <div className="mb-12 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-black text-white">
            <CheckCircle2 size={30} strokeWidth={1.5} />
          </div>

          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500">
            MNC — Order Summary
          </p>

          <h1 className="mb-4 text-3xl font-semibold tracking-tight md:text-5xl">
            Thank you for your order.
          </h1>

          <p className="mx-auto max-w-lg text-sm leading-6 text-neutral-600">
            Your demonstration order has been recorded for preview.
            No payment has been processed.
          </p>
        </div>

        {/* Demo Notice */}
        <div className="mb-8 border border-neutral-300 bg-white p-5">
          <div className="flex items-start gap-3">
            <Package className="mt-0.5 shrink-0" size={19} />

            <div>
              <h2 className="mb-1 text-sm font-semibold">
                Demonstration order only
              </h2>

              <p className="text-xs leading-5 text-neutral-600">
                This storefront currently operates in demonstration mode.
                No real payment, shipment, or fulfilment has been initiated.
              </p>
            </div>
          </div>
        </div>

        {/* Order Reference */}
        <div className="mb-8 border border-neutral-200 bg-white p-6">
          <p className="mb-2 text-xs uppercase tracking-widest text-neutral-500">
            Order reference
          </p>

          <p className="text-xl font-semibold tracking-wide">
            {orderNumber}
          </p>
        </div>

        {/* Customer Details */}
        <div className="mb-8 border border-neutral-200 bg-white p-6">
          <h2 className="mb-6 text-sm font-semibold uppercase tracking-widest">
            Customer details
          </h2>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="flex gap-3">
              <User size={17} className="mt-0.5 shrink-0 text-neutral-500" />
              <div>
                <p className="mb-1 text-xs text-neutral-500">Full name</p>
                <p className="text-sm">{customerDetails.fullName}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Mail size={17} className="mt-0.5 shrink-0 text-neutral-500" />
              <div>
                <p className="mb-1 text-xs text-neutral-500">Email</p>
                <p className="break-all text-sm">{customerDetails.email}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Phone size={17} className="mt-0.5 shrink-0 text-neutral-500" />
              <div>
                <p className="mb-1 text-xs text-neutral-500">Phone</p>
                <p className="text-sm">{customerDetails.phone}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <MapPin size={17} className="mt-0.5 shrink-0 text-neutral-500" />
              <div>
                <p className="mb-1 text-xs text-neutral-500">Delivery address</p>
                <p className="text-sm leading-6">
                  {customerDetails.addressLine1}
                  {customerDetails.addressLine2 && (
                    <>
                      <br />
                      {customerDetails.addressLine2}
                    </>
                  )}
                  <br />
                  {customerDetails.postalCode} {customerDetails.city}
                  <br />
                  {customerDetails.state}
                </p>
              </div>
            </div>
          </div>

          {customerDetails.notes && (
            <div className="mt-6 border-t border-neutral-200 pt-5">
              <p className="mb-1 text-xs text-neutral-500">
                Additional notes
              </p>
              <p className="text-sm">{customerDetails.notes}</p>
            </div>
          )}
        </div>

        {/* Ordered Items */}
        <div className="mb-8 border border-neutral-200 bg-white p-6">
          <h2 className="mb-6 text-sm font-semibold uppercase tracking-widest">
            Order items
          </h2>

          <div className="space-y-5">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4"
              >
                <div className="h-24 w-20 shrink-0 overflow-hidden bg-neutral-100">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="flex min-w-0 flex-1 justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-medium">
                      {item.name}
                    </h3>

                    <p className="mt-1 text-xs text-neutral-500">
                      {item.color.name} / {item.size}
                    </p>

                    <p className="mt-1 text-xs text-neutral-500">
                      Quantity: {item.quantity}
                    </p>
                  </div>

                  <p className="shrink-0 text-sm font-medium">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-7 space-y-3 border-t border-neutral-200 pt-5 text-sm">
            <div className="flex justify-between">
              <span className="text-neutral-500">Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-neutral-500">Shipping</span>
              <span className="text-neutral-500">
                Calculated at checkout
              </span>
            </div>

            <div className="flex justify-between border-t border-neutral-200 pt-4 font-semibold">
              <span>Total before shipping</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
          </div>
        </div>

        {/* Continue Shopping */}
        <div className="text-center">
          <Button onClick={onContinueShopping}>
            <span className="flex items-center justify-center gap-2">
              <ShoppingBag size={16} />
              Continue Shopping
              <ArrowRight size={16} />
            </span>
          </Button>
        </div>

      </div>
    </section>
  );
}
