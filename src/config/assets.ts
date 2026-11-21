
/**
 * MNC CENTRAL ASSET REGISTRY & CONFIGURATION
 *
 * Centralised reference system for:
 * - Brand assets
 * - Campaign visuals
 * - Collection banners
 * - Product photography
 * - Shared textures
 * - Fallback images
 *
 * All current assets are prototypes.
 * Official assets must be explicitly approved before
 * their status is changed.
 *
 * Vite processes static assets through new URL()
 * for development and production builds.
 */

import type { AssetStatus, ProductImageSet } from '../types/product';

// ============================================
// ASSET METADATA
// ============================================

export interface AssetMeta {
  path: string;
  alt: string;
  status: AssetStatus;
  isOfficialApproved: boolean;
  aspectRatio?: string;
  notes?: string;
}

// ============================================
// 1. BRAND ASSETS
// ============================================

export const BRAND_ASSETS = {
  wordmark: {
    path: new URL('../assets/brand/mnc_logo_mark.svg', import.meta.url).href,
    alt: 'MNC Wordmark',
    status: 'PROTOTYPE_TEMPORARY' as AssetStatus,
    isOfficialApproved: false,
    notes: 'Prototype typographic mark. Pending official approval.',
  },

  monogram: {
    path: new URL('../assets/brand/mnc_monogram.svg', import.meta.url).href,
    alt: 'MNC Monogram Emblem',
    status: 'PROTOTYPE_TEMPORARY' as AssetStatus,
    isOfficialApproved: false,
    notes: 'Prototype monogram. Pending official approval.',
  },
} as const;

// ============================================
// 2. CAMPAIGN EDITORIAL ASSETS
// ============================================

export const CAMPAIGN_ASSETS = {
  heroEditorial: {
    path: new URL('../assets/campaigns/prototype_hero_editorial.jpg', import.meta.url).href,
    alt: 'MNC Season 001 Campaign Hero',
    status: 'PROTOTYPE_TEMPORARY' as AssetStatus,
    isOfficialApproved: false,
    aspectRatio: '16/9',
  },

  lookbookSeason001: {
    path: new URL('../assets/campaigns/prototype_lookbook_season_001.jpg', import.meta.url).href,
    alt: 'MNC Season 001 Lookbook',
    status: 'PROTOTYPE_TEMPORARY' as AssetStatus,
    isOfficialApproved: false,
    aspectRatio: '3/4',
  },

  campaignPortrait: {
    path: new URL('../assets/campaigns/prototype_campaign_portrait.jpg', import.meta.url).href,
    alt: 'MNC Architectural Silhouette Campaign',
    status: 'PROTOTYPE_TEMPORARY' as AssetStatus,
    isOfficialApproved: false,
    aspectRatio: '3/4',
  },
} as const;

// ============================================
// 3. COLLECTION BANNERS
// ============================================

export const COLLECTION_ASSETS = {
  'mnc-essentials': {
    path: new URL('../assets/images/core_hoodie_black_1793962769736.jpg', import.meta.url).href,
    alt: 'MNC Essentials Collection Banner',
    status: 'PROTOTYPE_TEMPORARY' as AssetStatus,
    isOfficialApproved: false,
  },

  'mnc-season-001': {
    path: new URL('../assets/images/form_hoodie_charcoal_1793962797457.jpg', import.meta.url).href,
    alt: 'MNC Season 001 Collection Banner',
    status: 'PROTOTYPE_TEMPORARY' as AssetStatus,
    isOfficialApproved: false,
  },

  'mnc-archive': {
    path: new URL('../assets/images/neutral_tee_beige_1793962837473.jpg', import.meta.url).href,
    alt: 'MNC Archive Collection Banner',
    status: 'PROTOTYPE_TEMPORARY' as AssetStatus,
    isOfficialApproved: false,
  },
} as const;

// ============================================
// 4. SHARED MATERIAL / DETAIL ASSETS
// ============================================

export const TEXTURE_ASSETS = {
  fabricHeavyweight500gsm: {
    path: new URL('../assets/products/prototype_fabric_texture_500gsm.jpg', import.meta.url).href,
    alt: 'Prototype 500 GSM Heavyweight Cotton Fabric Texture',
    status: 'PROTOTYPE_TEMPORARY' as AssetStatus,
    isOfficialApproved: false,
  },
} as const;

// ============================================
// 5. FALLBACK ASSETS
// ============================================

export const FALLBACK_ASSETS = {
  productGarment: new URL('../assets/icons/fallback_garment.svg', import.meta.url).href,

  placeholderNeutral:
    'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22600%22%20height%3D%22750%22%20viewBox%3D%220%200%20600%20750%22%20fill%3D%22%23EFECE6%22%3E%3Crect%20width%3D%22600%22%20height%3D%22750%22%20fill%3D%22%23ECEAE3%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2248%25%22%20dominant-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20font-family%3D%22monospace%22%20font-size%3D%2214%22%20fill%3D%22%23858585%22%20letter-spacing%3D%223%22%3EMNC%20%2F%2F%20IMAGE%20PENDING%3C/text%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2253%25%22%20dominant-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20font-family%3D%22monospace%22%20font-size%3D%2210%22%20fill%3D%22%239A9A91%22%20letter-spacing%3D%222%22%3EPROTOTYPE%20STAGE%3C/text%3E%3C/svg%3E',
} as const;

// ============================================
// 6. PRODUCT IMAGE REGISTRY
// ============================================

const PROTOTYPE_STATUS: AssetStatus = 'PROTOTYPE_TEMPORARY';

const PRODUCT_FALLBACK = FALLBACK_ASSETS.placeholderNeutral;

const SHARED_PRODUCT_TEXTURE =
  new URL('../assets/images/mnc_fabric_texture_1793380878865.jpg', import.meta.url).href;

export const PRODUCT_IMAGE_REGISTRY: Record<string, ProductImageSet> = {
  // MNC-001 — Core Hoodie
  'mnc-001': {
    main: new URL('../assets/images/core_hoodie_black_1793962769736.jpg', import.meta.url).href,
    front: new URL('../assets/images/core_hoodie_black_1793962769736.jpg', import.meta.url).href,
    details: [SHARED_PRODUCT_TEXTURE],
    lifestyle: [CAMPAIGN_ASSETS.heroEditorial.path],
    status: PROTOTYPE_STATUS,
    isOfficialApproved: false,
    altText: 'Core Hoodie – Black, prototype heavyweight cotton hoodie',
    fallback: PRODUCT_FALLBACK,
  },

  // MNC-002 — Ash Hoodie
  'mnc-002': {
    main: new URL('../assets/images/ash_hoodie_grey_1793962783321.jpg', import.meta.url).href,
    front: new URL('../assets/images/ash_hoodie_grey_1793962783321.jpg', import.meta.url).href,
    details: [SHARED_PRODUCT_TEXTURE],
    lifestyle: [CAMPAIGN_ASSETS.lookbookSeason001.path],
    status: PROTOTYPE_STATUS,
    isOfficialApproved: false,
    altText: 'Ash Hoodie – Grey, prototype heather cotton hoodie',
    fallback: PRODUCT_FALLBACK,
  },

  // MNC-003 — Form Hoodie
  'mnc-003': {
    main: new URL('../assets/images/form_hoodie_charcoal_1793962797457.jpg', import.meta.url).href,
    front: new URL('../assets/images/form_hoodie_charcoal_1793962797457.jpg', import.meta.url).href,
    details: [SHARED_PRODUCT_TEXTURE],
    lifestyle: [CAMPAIGN_ASSETS.campaignPortrait.path],
    status: PROTOTYPE_STATUS,
    isOfficialApproved: false,
    altText: 'Form Hoodie – Charcoal, prototype washed heavyweight hoodie',
    fallback: PRODUCT_FALLBACK,
  },

  // MNC-004 — Everyday Tee
  'mnc-004': {
    main: new URL('../assets/images/everyday_tee_offwhite_1793962811551.jpg', import.meta.url).href,
    front: new URL('../assets/images/everyday_tee_offwhite_1793962811551.jpg', import.meta.url).href,
    details: [SHARED_PRODUCT_TEXTURE],
    lifestyle: [CAMPAIGN_ASSETS.heroEditorial.path],
    status: PROTOTYPE_STATUS,
    isOfficialApproved: false,
    altText: 'Everyday Tee – Off-White, prototype heavyweight cotton tee',
    fallback: PRODUCT_FALLBACK,
  },

  // MNC-005 — Essential Tee
  'mnc-005': {
    main: new URL('../assets/images/essential_tee_black_1793962823796.jpg', import.meta.url).href,
    front: new URL('../assets/images/essential_tee_black_1793962823796.jpg', import.meta.url).href,
    details: [SHARED_PRODUCT_TEXTURE],
    lifestyle: [CAMPAIGN_ASSETS.lookbookSeason001.path],
    status: PROTOTYPE_STATUS,
    isOfficialApproved: false,
    altText: 'Essential Tee – Black, prototype heavyweight cotton tee',
    fallback: PRODUCT_FALLBACK,
  },

  // MNC-006 — Neutral Tee
  'mnc-006': {
    main: new URL('../assets/images/neutral_tee_beige_1793962837473.jpg', import.meta.url).href,
    front: new URL('../assets/images/neutral_tee_beige_1793962837473.jpg', import.meta.url).href,
    details: [SHARED_PRODUCT_TEXTURE],
    lifestyle: [CAMPAIGN_ASSETS.campaignPortrait.path],
    status: PROTOTYPE_STATUS,
    isOfficialApproved: false,
    altText: 'Neutral Tee – Beige, prototype heavyweight cotton tee',
    fallback: PRODUCT_FALLBACK,
  },
};

// ============================================
// 7. PRODUCT IMAGE HELPERS
// ============================================

/**
 * Retrieve structured product imagery.
 * Unknown product IDs receive a neutral fallback.
 */
export function getProductImageSet(productId: string): ProductImageSet {
  return (
    PRODUCT_IMAGE_REGISTRY[productId] ?? {
      main: PRODUCT_FALLBACK,
      status: PROTOTYPE_STATUS,
      isOfficialApproved: false,
      altText: 'MNC Prototype Garment Image',
      fallback: PRODUCT_FALLBACK,
    }
  );
}

/**
 * Return product images in display order.
 * Duplicate front/main images are excluded.
 */
export function getProductImageList(productId: string): string[] {
  const set = getProductImageSet(productId);

  const candidates = [
    set.main,
    set.front,
    set.back,
    ...(set.details ?? []),
    ...(set.lifestyle ?? []),
  ];

  const uniqueImages = [
    ...new Set(candidates.filter((image): image is string =>
      typeof image === 'string' && image.length > 0
    )),
  ];

  return uniqueImages.length > 0
    ? uniqueImages
    : [PRODUCT_FALLBACK];
}

// ============================================
// 8. ASSET APPROVAL VALIDATION
// ============================================

/**
 * Determine approval using registry metadata,
 * rather than assuming a folder name means approval.
 */
export function isOfficialApprovedAsset(assetPath?: string): boolean {
  if (!assetPath) return false;

  const standaloneAssets = [
    ...Object.values(BRAND_ASSETS),
    ...Object.values(CAMPAIGN_ASSETS),
    ...Object.values(COLLECTION_ASSETS),
    ...Object.values(TEXTURE_ASSETS),
  ];

  const productAssets = Object.values(PRODUCT_IMAGE_REGISTRY).flatMap(
    (set) => [
      set.main,
      set.front,
      set.back,
      ...(set.details ?? []),
      ...(set.lifestyle ?? []),
    ]
      .filter((path): path is string => Boolean(path))
      .map((path) => ({
        path,
        status: set.status,
      }))
  );

  return [...standaloneAssets, ...productAssets].some(
    (asset) =>
      asset.path === assetPath &&
      asset.status === 'OFFICIAL_APPROVED'
  );
}
