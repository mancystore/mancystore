
import { Collection } from '../types/product';
import { COLLECTION_ASSETS } from '../config/assets';

export const COLLECTIONS: Collection[] = [
  {
    id: 'mnc-essentials',
    name: 'MNC ESSENTIALS',
    seasonBadge: 'CORE COLLECTION CONCEPT',
    subtitle: 'The foundational wardrobe of modern streetwear.',
    description:
      'A prototype collection exploring minimalist everyday silhouettes, proposed 300–500 GSM fabric weights, and considered proportions. Designed around versatility, simplicity, and everyday wear.',
    bannerImage: COLLECTION_ASSETS['mnc-essentials'].path,
    productCount: 4,
  },
  {
    id: 'mnc-season-001',
    name: 'MNC SEASON 001',
    seasonBadge: 'SEASON CONCEPT 001',
    subtitle: 'The Heavyweight Edit — Architectural volumes & brutalist lines.',
    description:
      'An exploration of architectural proportions, concrete-inspired colour palettes, and distinctive streetwear silhouettes. A creative direction for MNC’s first seasonal collection concept.',
    bannerImage: COLLECTION_ASSETS['mnc-season-001'].path,
    productCount: 1,
  },
  {
    id: 'mnc-archive',
    name: 'MNC ARCHIVE',
    seasonBadge: 'DESIGN ARCHIVE',
    subtitle: 'Experimental silhouettes, vintage-inspired tones, and considered details.',
    description:
      'A collection concept showcasing experimental silhouettes, proposed construction details, and vintage-inspired colour treatments. An evolving space for MNC design explorations.',
    bannerImage: COLLECTION_ASSETS['mnc-archive'].path,
    productCount: 1,
  },
];
