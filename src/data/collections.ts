import { Collection } from '../types/product';
import { COLLECTION_ASSETS } from '../config/assets';

export const COLLECTIONS: Collection[] = [
  {
    id: 'mnc-essentials',
    name: 'MNC ESSENTIALS',
    seasonBadge: 'PERMANENT ROSTER',
    subtitle: 'The foundational wardrobe of modern streetwear.',
    description:
      'Uncompromising minimalist silhouettes in custom-milled 300–500 GSM cottons. Built for daily rotation, architectural proportion, and effortless longevity.',
    bannerImage: COLLECTION_ASSETS['mnc-essentials'].path,
    productCount: 4,
  },
  {
    id: 'mnc-season-001',
    name: 'MNC SEASON 001',
    seasonBadge: 'INAUGURAL DROP',
    subtitle: 'The Heavyweight Edit — Architectural volumes & brutalist lines.',
    description:
      'Explorations in proportion, concrete urban palettes, and directional typographic statements. Designed in limited production runs with certified organic materials.',
    bannerImage: COLLECTION_ASSETS['mnc-season-001'].path,
    productCount: 1,
  },
  {
    id: 'mnc-archive',
    name: 'MNC ARCHIVE',
    seasonBadge: 'VAULT SELECTIONS',
    subtitle: 'Experimental silhouettes, vintage sulfur dyes, and legacy cuts.',
    description:
      'A curated showcase of past prototypes, experimental seam constructions, and time-worn dye treatments preserved for collectors and design purists.',
    bannerImage: COLLECTION_ASSETS['mnc-archive'].path,
    productCount: 1,
  },
];
