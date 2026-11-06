/**
 * MNC CENTRAL ASSET REGISTRY & CONFIGURATION
 * 
 * Centralised reference system for brand logos, campaign visuals, collection
 * imagery, and product photography configurations.
 * 
 * ARCHITECTURAL RULE:
 * Components should never hardcode raw image paths. By referencing this module,
 * marketing and brand design teams can swap prototype assets with official high-res
 * assets in one single file.
 * 
 * ALL CURRENT ASSETS ARE PROTOTYPES:
 * `status: 'PROTOTYPE_TEMPORARY'`, `isOfficialApproved: false`.
 * Official brand photography and vector assets will be integrated in Phase 2.
 */

import { AssetStatus, ProductImageSet } from '../types/product';

export interface AssetMeta {
  path: string;
  alt: string;
  status: AssetStatus;
  isOfficialApproved: boolean;
  aspectRatio?: string;
  notes?: string;
}

// 1. BRAND ASSETS
export const BRAND_ASSETS = {
  wordmark: {
    path: '/src/assets/brand/mnc_logo_mark.svg',
    alt: 'MNC Wordmark',
    status: 'PROTOTYPE_TEMPORARY' as AssetStatus,
    isOfficialApproved: false,
    notes: 'Phase 1 typographic mark. Replace with official vector files when approved.',
  },
  monogram: {
    path: '/src/assets/brand/mnc_monogram.svg',
    alt: 'MNC Monogram Emblem',
    status: 'PROTOTYPE_TEMPORARY' as AssetStatus,
    isOfficialApproved: false,
    notes: 'Prototype monogram block.',
  },
} as const;

// 2. CAMPAIGN EDITORIAL ASSETS
export const CAMPAIGN_ASSETS = {
  heroEditorial: {
    path: '/src/assets/campaigns/prototype_hero_editorial.jpg',
    alt: 'MNC Season 001 Heavyweight Campaign Hero',
    status: 'PROTOTYPE_TEMPORARY' as AssetStatus,
    isOfficialApproved: false,
    aspectRatio: '16/9',
  },
  lookbookSeason001: {
    path: '/src/assets/campaigns/prototype_lookbook_season_001.jpg',
    alt: 'MNC Season 001 Brutalist Lookbook Showcase',
    status: 'PROTOTYPE_TEMPORARY' as AssetStatus,
    isOfficialApproved: false,
    aspectRatio: '3/4',
  },
  campaignPortrait: {
    path: '/src/assets/campaigns/prototype_campaign_portrait.jpg',
    alt: 'MNC Architectural Silhouette Portrait Campaign',
    status: 'PROTOTYPE_TEMPORARY' as AssetStatus,
    isOfficialApproved: false,
    aspectRatio: '3/4',
  },
} as const;

// 3. COLLECTION BANNERS
export const COLLECTION_ASSETS = {
  'mnc-essentials': {
    path: '/src/assets/images/core_hoodie_black_1793962769736.jpg',
    alt: 'MNC Essentials Permanent Capsule Banner',
    status: 'OFFICIAL_APPROVED' as AssetStatus,
    isOfficialApproved: true,
  },
  'mnc-season-001': {
    path: '/src/assets/images/form_hoodie_charcoal_1793962797457.jpg',
    alt: 'MNC Season 001 The Heavyweight Edit Banner',
    status: 'OFFICIAL_APPROVED' as AssetStatus,
    isOfficialApproved: true,
  },
  'mnc-archive': {
    path: '/src/assets/images/neutral_tee_beige_1793962837473.jpg',
    alt: 'MNC Archive Vault Banner',
    status: 'OFFICIAL_APPROVED' as AssetStatus,
    isOfficialApproved: true,
  },
} as const;

// 4. SHARED MATERIAL / DETAIL ASSETS
export const TEXTURE_ASSETS = {
  fabricHeavyweight500gsm: {
    path: '/src/assets/products/prototype_fabric_texture_500gsm.jpg',
    alt: 'MNC 500 GSM Heavyweight Combed Cotton Micro-Knit Macro Detail',
    status: 'PROTOTYPE_TEMPORARY' as AssetStatus,
    isOfficialApproved: false,
  },
} as const;

// 5. FALLBACK ASSETS
export const FALLBACK_ASSETS = {
  productGarment: '/src/assets/icons/fallback_garment.svg',
  placeholderNeutral:
    'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22600%22%20height%3D%22750%22%20viewBox%3D%220%200%20600%20750%22%20fill%3D%22%23EFECE6%22%3E%3Crect%20width%3D%22600%22%20height%3D%22750%22%20fill%3D%22%23ECEAE3%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2248%25%22%20dominant-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20font-family%3D%22monospace%22%20font-size%3D%2214%22%20fill%3D%22%23858585%22%20letter-spacing%3D%223%22%3EMNC%20%2F%2F%20IMAGE%20PENDING%3C%2Ftext%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2253%25%22%20dominant-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20font-family%3D%22monospace%22%20font-size%3D%2210%22%20fill%3D%22%239A9A91%22%20letter-spacing%3D%222%22%3EPROTOTYPE%20STAGE%3C%2Ftext%3E%3C%2Fsvg%3E',
} as const;

// 6. STRUCTURED PRODUCT IMAGE CONFIGURATIONS
// Exactly 6 products: 3 Hoodies and 3 Minimalist Tees
export const PRODUCT_IMAGE_REGISTRY: Record<string, ProductImageSet> = {
  'mnc-001': {
    main: '/src/assets/images/core_hoodie_black_1793962769736.jpg',
    front: '/src/assets/images/core_hoodie_black_1793962769736.jpg',
    details: ['/src/assets/images/mnc_fabric_texture_1793380878865.jpg'],
    lifestyle: ['/src/assets/campaigns/prototype_hero_editorial.jpg'],
    status: 'OFFICIAL_APPROVED',
    isOfficialApproved: true,
    altText: 'Core Hoodie – Black in 500 GSM loopback cotton',
    fallback: FALLBACK_ASSETS.placeholderNeutral,
  },
  'mnc-002': {
    main: '/src/assets/images/ash_hoodie_grey_1793962783321.jpg',
    front: '/src/assets/images/ash_hoodie_grey_1793962783321.jpg',
    details: ['/src/assets/images/mnc_fabric_texture_1793380878865.jpg'],
    lifestyle: ['/src/assets/campaigns/prototype_lookbook_season_001.jpg'],
    status: 'OFFICIAL_APPROVED',
    isOfficialApproved: true,
    altText: 'Ash Hoodie – Grey in 500 GSM heather cotton',
    fallback: FALLBACK_ASSETS.placeholderNeutral,
  },
  'mnc-003': {
    main: '/src/assets/images/form_hoodie_charcoal_1793962797457.jpg',
    front: '/src/assets/images/form_hoodie_charcoal_1793962797457.jpg',
    details: ['/src/assets/images/mnc_fabric_texture_1793380878865.jpg'],
    lifestyle: ['/src/assets/campaigns/prototype_campaign_portrait.jpg'],
    status: 'OFFICIAL_APPROVED',
    isOfficialApproved: true,
    altText: 'Form Hoodie – Charcoal in washed 500 GSM cotton',
    fallback: FALLBACK_ASSETS.placeholderNeutral,
  },
  'mnc-004': {
    main: '/src/assets/images/everyday_tee_offwhite_1793962811551.jpg',
    front: '/src/assets/images/everyday_tee_offwhite_1793962811551.jpg',
    details: ['/src/assets/images/mnc_fabric_texture_1793380878865.jpg'],
    lifestyle: ['/src/assets/campaigns/prototype_hero_editorial.jpg'],
    status: 'OFFICIAL_APPROVED',
    isOfficialApproved: true,
    altText: 'Everyday Tee – Off-White in 300 GSM combed cotton',
    fallback: FALLBACK_ASSETS.placeholderNeutral,
  },
  'mnc-005': {
    main: '/src/assets/images/essential_tee_black_1793962823796.jpg',
    front: '/src/assets/images/essential_tee_black_1793962823796.jpg',
    details: ['/src/assets/images/mnc_fabric_texture_1793380878865.jpg'],
    lifestyle: ['/src/assets/campaigns/prototype_lookbook_season_001.jpg'],
    status: 'OFFICIAL_APPROVED',
    isOfficialApproved: true,
    altText: 'Essential Tee – Black in 320 GSM structural cotton',
    fallback: FALLBACK_ASSETS.placeholderNeutral,
  },
  'mnc-006': {
    main: '/src/assets/images/neutral_tee_beige_1793962837473.jpg',
    front: '/src/assets/images/neutral_tee_beige_1793962837473.jpg',
    details: ['/src/assets/images/mnc_fabric_texture_1793380878865.jpg'],
    lifestyle: ['/src/assets/campaigns/prototype_campaign_portrait.jpg'],
    status: 'OFFICIAL_APPROVED',
    isOfficialApproved: true,
    altText: 'Neutral Tee – Beige in 300 GSM combed cotton',
    fallback: FALLBACK_ASSETS.placeholderNeutral,
  },
};

/**
 * Helper to retrieve a product's structured ImageSet.
 * Falls back safely if the product ID is unrecognised.
 */
export function getProductImageSet(productId: string): ProductImageSet {
  if (PRODUCT_IMAGE_REGISTRY[productId]) {
    return PRODUCT_IMAGE_REGISTRY[productId];
  }
  return {
    main: FALLBACK_ASSETS.placeholderNeutral,
    status: 'PROTOTYPE_TEMPORARY',
    isOfficialApproved: false,
    altText: 'MNC Garment Silhouette (Prototype)',
    fallback: FALLBACK_ASSETS.placeholderNeutral,
  };
}

/**
 * Returns an array of image strings for backwards compatibility with
 * existing component interfaces (images[0], images[1], etc.).
 */
export function getProductImageList(productId: string): string[] {
  const set = getProductImageSet(productId);
  const list: string[] = [];

  if (set.main) list.push(set.main);
  if (set.front && set.front !== set.main) list.push(set.front);
  if (set.back) list.push(set.back);
  if (set.details && set.details.length > 0) list.push(...set.details);
  if (set.lifestyle && set.lifestyle.length > 0) list.push(...set.lifestyle);

  return list.length > 0 ? list : [FALLBACK_ASSETS.placeholderNeutral];
}

/**
 * Check whether an asset is marked as official or prototype.
 */
export function isOfficialApprovedAsset(assetPath?: string): boolean {
  if (!assetPath) return false;
  // Currently all Phase 1 assets are prototypes.
  // When official assets are introduced in /src/assets/brand/official or
  // /src/assets/products/official, this evaluates true.
  return assetPath.includes('/official/');
}
