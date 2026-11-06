# MNC Asset Management & Brand Integration Guide

This directory contains the central visual asset structure for the **MNC Contemporary Streetwear** storefront.

---

## 1. Directory Structure

```text
src/assets/
├── brand/            # Brand wordmarks, vector logos, monograms, typographic emblems
├── campaigns/        # High-impact editorial photography, campaign hero banners, lookbooks
├── products/         # E-commerce studio garment photography (main, front, back, macro details)
├── collections/      # Capsule headers and archive vault banners
├── icons/            # Minimalist custom SVGs and placeholder fallbacks
└── README.md         # This guideline
```

---

## 2. Asset Staging: Prototype vs. Approved Official Assets

Every asset in this project is explicitly flagged:
- **`PROTOTYPE_TEMPORARY`** (`isOfficialApproved: false`): Current Phase 1 conceptual photography and sample vectors used for frontend testing and UI/UX validation.
- **`OFFICIAL_APPROVED`** (`isOfficialApproved: true`): Official high-resolution brand photography, mill-certified fabric swatches, and finalized vectorized trade-dress marks.

---

## 3. How to Replace Prototype Assets with Official Assets

All asset references are centralized in:
**`src/config/assets.ts`** and **`src/config/brand.config.ts`**.

**You do NOT need to touch or modify React components** to update assets.

### Step-by-Step Replacement:

1. **For Brand Logos & Monograms**:
   - Place official SVGs into `src/assets/brand/` (e.g. `mnc_official_wordmark.svg`).
   - Open `src/config/brand.config.ts` and `src/config/assets.ts`.
   - Update `BRAND_ASSETS.wordmark.path`, set `status: 'OFFICIAL_APPROVED'` and `isOfficialApproved: true`.

2. **For Campaign & Lookbook Visuals**:
   - Place high-res lookbook files into `src/assets/campaigns/`.
   - Update `CAMPAIGN_ASSETS.heroEditorial.path` or `CAMPAIGN_ASSETS.lookbookSeason001.path` in `src/config/assets.ts`.

3. **For Product E-Commerce Photography**:
   - Place new studio photography in `src/assets/products/`.
   - In `src/config/assets.ts`, update `PRODUCT_IMAGE_REGISTRY[productId]` with the structured views:
     ```typescript
     'mnc-001': {
       main: '/src/assets/products/official_001_main.jpg',
       front: '/src/assets/products/official_001_front.jpg',
       back: '/src/assets/products/official_001_back.jpg',
       details: [
         '/src/assets/products/official_001_detail_collar.jpg',
         '/src/assets/products/official_001_detail_fabric.jpg'
       ],
       lifestyle: [
         '/src/assets/campaigns/official_lookbook_01.jpg'
       ],
       status: 'OFFICIAL_APPROVED',
       isOfficialApproved: true,
       altText: 'MNC Essential Oversized Tee - Pitch Black',
     }
     ```

---

## 4. Photography & Asset Specifications

- **Product Cards & Main Detail**: 4:5 aspect ratio (e.g., 1600 × 2000 px). Clean neutral atelier background (`#ECEAE3` / `#F5F4F0` / dark charcoal).
- **Hero Campaign**: 16:9 or 2.4:1 cinematic ratio (e.g., 2560 × 1080 px or 1920 × 1080 px).
- **Collection Banners**: 16:10 or 4:3 ratio.
- **Logos**: Optimized SVG with clean path coordinates and geometric proportions.

---

## 5. Graceful Fallbacks

All storefront images render through `<ImageWithFallback />` (`src/components/ImageWithFallback.tsx`). If an image path is invalid or missing, it fails silently to a clean architectural placeholder with monospace branding (`MNC // ASSET PENDING`) instead of a broken browser icon.
