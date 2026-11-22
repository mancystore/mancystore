
import { Collection } from '../types/product';
import { COLLECTION_ASSETS } from '../config/assets';

export const COLLECTIONS: Collection[] = [
  {
    id: 'mnc-essentials',
    name: 'MNC CORE',
    reference: 'CORE 001',
    seasonBadge: 'CORE COLLECTION',
    subtitle: 'The foundation of everyday MNC essentials.',
    description:
      'A collection built around minimalist everyday garments, considered proportions, and versatile silhouettes. Designed to establish the foundation of the MNC wardrobe.',
    bannerImage: COLLECTION_ASSETS['mnc-essentials'].path,
    productCount: 4,
  },
  {
    id: 'mnc-archive',
    name: 'MNC FORM',
    reference: 'FORM 001',
    seasonBadge: 'FORM COLLECTION',
    subtitle: 'A study of shape, proportion, and expression.',
    description:
      'An evolving exploration of distinctive silhouettes, experimental forms, and considered details. A space for MNC design development beyond the everyday.',
    bannerImage: COLLECTION_ASSETS['mnc-archive'].path,
    productCount: 1,
  },
  {
    id: 'mnc-season-001',
    name: 'MNC EDITION',
    reference: 'EDITION 001',
    seasonBadge: 'FIRST EDITION',
    subtitle: 'Distinctive pieces released in considered editions.',
    description:
      'A seasonal creative direction exploring architectural proportions, concrete-inspired colour palettes, and distinctive streetwear silhouettes.',
    bannerImage: COLLECTION_ASSETS['mnc-season-001'].path,
    productCount: 1,
  },
];
