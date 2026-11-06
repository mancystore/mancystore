export type ProductCategory = 'All' | 'Tees' | 'Shirts' | 'Hoodies' | 'Long Sleeves';

export type CollectionId = 'mnc-essentials' | 'mnc-archive' | 'mnc-season-001';

export interface ProductColor {
  name: string;
  hex: string;
}

export type AssetStatus = 'PROTOTYPE_TEMPORARY' | 'OFFICIAL_APPROVED';

export interface ProductImageSet {
  main: string;
  front?: string;
  back?: string;
  details?: string[];
  lifestyle?: string[];
  status: AssetStatus;
  isOfficialApproved: boolean;
  altText: string;
  fallback?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  tagline?: string;
  description: string;
  price: number; // in MYR
  category: 'Tees' | 'Shirts' | 'Hoodies' | 'Long Sleeves';
  collectionId: CollectionId;
  collectionName: 'MNC ESSENTIALS' | 'MNC ARCHIVE' | 'MNC SEASON 001';
  availableSizes: string[];
  availableColours: ProductColor[];
  imageSet?: ProductImageSet;
  images: string[];
  demoStock: string;
  stockCount: number;
  featured: boolean;
  isNewArrival?: boolean;
  fabricDetails: string[];
  fitGuide: string;
  sku: string;
}

export interface Collection {
  id: CollectionId;
  name: string;
  seasonBadge: string;
  subtitle: string;
  description: string;
  bannerImage: string;
  productCount: number;
}

export interface CartItem {
  id: string; // product id + size + color
  productId: string;
  name: string;
  price: number;
  size: string;
  color: ProductColor;
  quantity: number;
  image: string;
  slug: string;
}
