/**
 * MNC BRAND CONFIGURATION
 * 
 * Central source of truth for MNC brand identity, design tokens, typography,
 * and asset references.
 * 
 * IMPORTANT:
 * Official brand assets (final vectorized marks, trade-dress typography, and
 * certified campaign photography) have not yet been signed off. Current assets
 * are marked with `isOfficialApproved: false` and `status: 'PROTOTYPE_TEMPORARY'`.
 */

export interface BrandColorPalette {
  primary: string;      // #111111 (Onyx/Pitch Black)
  secondary: string;    // #F5F4F0 (Atelier Canvas Off-White)
  white: string;        // #FFFFFF (Clean Pure White)
  mutedGrey: string;    // #858585 (Subdued Metadata Grey)
  accent: string;       // #9A9A91 (Brutalist Cement Tone)
  border: string;       // #E5E4DE (Subtle divider)
}

export interface BrandTypographyConfig {
  display: string;
  body: string;
  mono: string;
  tracking: {
    tighter: string;
    tight: string;
    normal: string;
    wide: string;
    widest: string;
    editorial: string;
  };
}

export interface BrandLogoConfig {
  wordmarkText: string;
  wordmarkSvg: string;
  monogramSvg: string;
  status: 'PROTOTYPE_TEMPORARY' | 'OFFICIAL_APPROVED';
  isOfficialApproved: boolean;
  alt: string;
  replacementGuide: string;
}

export interface BrandConfig {
  name: string;
  legalName: string;
  shortName: string;
  tagline: string;
  subTagline: string;
  editorialStatement: string;
  origin: string;
  established: string;
  seasonCurrent: string;
  currency: {
    code: string;
    symbol: string;
    locale: string;
  };
  colors: BrandColorPalette;
  typography: BrandTypographyConfig;
  logo: BrandLogoConfig;
  assetStage: 'PHASE_1_PROTOTYPE' | 'PRODUCTION_READY';
  hasOfficialAssets: boolean;
}

export const BRAND_CONFIG: BrandConfig = {
  name: 'MNC',
  legalName: 'MNC Contemporary Apparel Co.',
  shortName: 'MNC',
  tagline: 'Architectural Streetwear. Structural Permanence.',
  subTagline: 'Engineered Silhouettes / Heavyweight Custom Milling / Brutalist Nuance',
  editorialStatement:
    'MNC is an independent contemporary streetwear brand grounded in architectural form, intentional volume, and uncompromised textile integrity.',
  origin: 'Kuala Lumpur / Worldwide',
  established: '2025',
  seasonCurrent: 'SEASON 001',
  currency: {
    code: 'MYR',
    symbol: 'RM',
    locale: 'en-MY',
  },
  colors: {
    primary: '#111111',
    secondary: '#F5F4F0',
    white: '#FFFFFF',
    mutedGrey: '#858585',
    accent: '#9A9A91',
    border: '#E2E0D8',
  },
  typography: {
    display: "'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    body: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    mono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
    tracking: {
      tighter: '-0.04em',
      tight: '-0.02em',
      normal: '0',
      wide: '0.05em',
      widest: '0.18em',
      editorial: '0.24em',
    },
  },
  logo: {
    wordmarkText: 'MNC',
    wordmarkSvg: '/src/assets/brand/mnc_logo_mark.svg',
    monogramSvg: '/src/assets/brand/mnc_monogram.svg',
    status: 'PROTOTYPE_TEMPORARY',
    isOfficialApproved: false,
    alt: 'MNC Contemporary Brandmark (Prototype)',
    replacementGuide:
      'When official approved SVG assets are delivered, drop the final vectors into src/assets/brand/ and update this configuration.',
  },
  assetStage: 'PHASE_1_PROTOTYPE',
  hasOfficialAssets: false,
};
