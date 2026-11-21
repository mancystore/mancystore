
/**
 * MNC PRODUCT DATA MODEL
 * Defines catalogue products, variants, assets,
 * collections and shopping cart structures.
 */

// ============================================
// CATEGORIES & COLLECTIONS
// ============================================

export type ProductCategory =
  | 'All'
  | 'Tees'
  | 'Shirts'
  | 'Hoodies'
  | 'Long Sleeves';

export type SellableProductCategory = Exclude<
  ProductCategory,
  'All'
>;

export type CollectionId =
  | 'mnc-essentials'
  | 'mnc-archive'
  | 'mnc-season-001';

export type CollectionName =
  | 'MNC ESSENTIALS'
  | 'MNC ARCHIVE'
  | 'MNC SEASON 001';

export type ProductSize = string;

// ============================================
// PRODUCT COLOURS
// ============================================

export interface ProductColor {
  id?: string;
  name: string;
  hex: string;
}

// ============================================
// PRODUCT ASSETS
// ============================================

export type AssetStatus =
  | 'PROTOTYPE_TEMPORARY'
  | 'OFFICIAL_APPROVED';

export interface ProductImageSet {
  main: string;
  front?: string;
  back?: string;
  details?: string[];
  lifestyle?: string[];

  // Asset approval status.
  status: AssetStatus;

  // Retained for compatibility with existing components.
  isOfficialApproved: boolean;

  altText: string;
  fallback?: string;
}

// ============================================
// PRODUCT VARIANTS
// ============================================

/**
 * A variant represents one specific combination
 * of product size and colour.
 *
 * Example:
 * MNC Essential Hoodie / Black / Medium
 */

export interface ProductVariant {
  id: string;
  sku: string;

  size: ProductSize;
  color: ProductColor;

  stockCount: number;

  /**
   * Prototype stock must not be interpreted
   * as confirmed commercial availability.
   */
  isPrototype: boolean;
}

// ============================================
// PRODUCTS
// ============================================

export interface Product {
  id: string;
  name: string;
  slug: string;

  tagline?: string;
  description: string;

  price: number; // MYR

  category: SellableProductCategory;

  collectionId: CollectionId;
  collectionName: CollectionName;

  availableSizes: ProductSize[];
  availableColours: ProductColor[];

  /**
   * Optional variant-level data.
   * Can be introduced progressively without
   * breaking the existing product catalogue.
   */
  variants?: ProductVariant[];

  imageSet?: ProductImageSet;
  images: string[];

  /**
   * Legacy demonstration stock label.
   * Not a confirmation of actual availability.
   */
  demoStock: string;

  /**
   * Aggregate stock value for existing components.
   * Production inventory should use variant stock.
   */
  stockCount: number;

  featured: boolean;
  isNewArrival?: boolean;

  fabricDetails: string[];
  fitGuide: string;

  // Product-level catalogue SKU.
  sku: string;
}

// ============================================
// COLLECTIONS
// ============================================

export interface Collection {
  id: CollectionId;
  name: CollectionName;

  seasonBadge: string;
  subtitle: string;
  description: string;

  bannerImage: string;
  productCount: number;
}

// ============================================
// SHOPPING CART
// ============================================

export interface CartItem {
  /**
   * Unique cart entry:
   * productId + size + colour
   */
  id: string;

  productId: string;
  name: string;

  price: number;

  size: ProductSize;
  color: ProductColor;

  quantity: number;

  image: string;
  slug: string;
}
