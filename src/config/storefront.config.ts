/**
 * MNC STOREFRONT CONFIGURATION
 *
 * Central source of truth for storefront operating mode and purchasing permissions.
 *
 * MODES:
 * - 'PREVIEW': Read-only architectural showcase. Products are prototypes, prices are indicative,
 *              purchasing is disabled, and informational prototype notices are displayed.
 * - 'DEMONSTRATION': Interactive local prototype. Visitors can select sizes/colours, add items
 *                    to the shopping bag, adjust quantities, review order summaries, and test simulated checkout.
 * - 'PRODUCTION': Live e-commerce store with real gateway payments and backend order management.
 */

export type StorefrontMode = 'PREVIEW' | 'DEMONSTRATION' | 'PRODUCTION';

export interface StorefrontConfig {
  mode: StorefrontMode;
  allowPurchases: boolean;
  allowAddToCart: boolean;
  allowCheckout: boolean;
  allowCartQuantityChanges: boolean;
  showPrototypeLabels: boolean;
  showIndicativePrices: boolean;
}

export const STOREFRONT_CONFIG: StorefrontConfig = {
  mode: 'DEMONSTRATION', // Set to DEMONSTRATION for interactive local bag & checkout testing
  allowPurchases: true,
  allowAddToCart: true,
  allowCheckout: true,
  allowCartQuantityChanges: true,
  showPrototypeLabels: true,
  showIndicativePrices: true,
};

export const isPreviewMode = () => STOREFRONT_CONFIG.mode === 'PREVIEW';
export const isDemoMode = () => STOREFRONT_CONFIG.mode === 'DEMONSTRATION';
export const isProductionMode = () => STOREFRONT_CONFIG.mode === 'PRODUCTION';
