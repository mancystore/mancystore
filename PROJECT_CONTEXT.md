# MNC — MASTER PROJECT CONTEXT & SOURCE OF TRUTH

---

## 1. PROJECT IDENTITY

- **Brand Name**: MNC
- **Former Identity / Entity**: MancyStore
- **Company / Entity**: MNC Contemporary Apparel Co.
- **Repository Owner**: mancystore
- **GitHub Repository**: [https://github.com/mancystore/mancystore.git](https://github.com/mancystore/mancystore.git)
- **Local Working Directory**: `MancyStore-Development`
- **Current Development Branch**: `phase-2-product-development` (tracking `origin/phase-2-product-development`)
- **Default Remote Branch**: `main`
- **Origin & Location**: Kuala Lumpur, Malaysia (with international DTC vision)
- **Primary Store Currency**: Malaysian Ringgit (`MYR` / `RM`)
- **Product Focus**:
  1. Heavyweight luxury hoodies (~500 GSM custom loopback fleece)
  2. Minimalist heavyweight blank and graphic t-shirts (300–320 GSM combed jersey)

---

## 2. BUSINESS OBJECTIVES

1. **Direct-to-Consumer (DTC) Digital Flagship**:
   Establish an owned e-commerce platform representing an independent contemporary streetwear brand, bypassing third-party marketplace commissions and wholesale markups.
2. **Accessible Luxury & Structural Permanence**:
   Reject disposable fast-fashion and thin fabrics. Position MNC around high-density knits (300–500 GSM), intentional architectural drape, dropped shoulders, and shape-retentive 3.2cm 1x1 rib collars.
3. **Transparent Pricing in Malaysian Ringgit**:
   Offer premium garments at accessible luxury price points (Hoodies: RM 329–349, Tees: RM 149–159) with clear textile disclosures.
4. **Lean & Cost-Effective Architecture**:
   - Utilize free and open-source tools (React 19, TypeScript, Vite, Tailwind CSS).
   - Avoid bloated microservice infrastructure, expensive subscription SaaS, or premature backend databases during early prototype and sampling phases.
   - Maintain a lightweight, fast-loading, highly maintainable codebase capable of zero-cost hosting on Vercel, Netlify, or Cloudflare Pages.

---

## 3. BRAND DIRECTION & VISUAL LANGUAGE

- **Aesthetic**: Contemporary streetwear culture, architectural volume, industrial nuance, and brutalist minimalism.
- **Visual Reference**: SVG Worldwide (used strictly for visual inspiration and mood direction; all product designs, silhouettes, logo marks, copy, and layouts are original MNC creations).
- **Core Visual Invariants**:
  - *Form Follows Weight*: Dense knits that hold structural volume off the body rather than clinging.
  - *Volume Follows Posture*: Dropped shoulders paired with calibrated, balanced torso lengths.
  - *Collar Integrity*: Heavyweight ~3.2cm 1x1 rib crewnecks engineered to maintain shape across domestic washing cycles.
  - *Understated Confidence*: Clean typography, generous whitespace, zero visual clutter, and avoidance of loud commercial chest billboards.
- **Color Identity Tokens**:
  - Primary / Onyx: `#111111`
  - Atelier Canvas / Sand: `#F5F4F0`
  - Surface Pure White: `#FFFFFF`
  - Brutalist Accent / Cement: `#9A9A91`
  - Subdued Metadata / Steel: `#858585`
  - Frame & Background Off-Grey: `#EAE8E2` / `#ECEAE3`

---

## 4. TECHNICAL ENVIRONMENT & STACK

| Layer | Technology | Version | Purpose in Codebase |
|---|---|---|---|
| **Core Framework** | React | `^19.0.1` | Component-based UI rendering |
| **Language** | TypeScript | `^7.0.2` | Static typing, interface contracts, and compiler verification |
| **Build Tool & Bundler** | Vite | `^8.3.0` (8.3.8) | Lightning-fast development server & production bundler |
| **CSS Engine** | Tailwind CSS | `^4.3.3` | Utility-first styling via modern `@tailwindcss/vite` plugin |
| **Iconography** | Lucide React | `^0.546.0` | Minimalist UI vector icons |
| **State Management** | React Context API | Native | Global Cart and modal visibility controller |
| **Client Persistence** | LocalStorage API | Native | Client-side cart persistence (`mnc_streetwear_cart_demo`) |
| **Typography Engine** | Google Fonts | Web | `Outfit` (Headings/Display) & `Plus Jakarta Sans` (Body) |

> [!NOTE]
> `package.json` includes `express` (`^4.21.2`) and `@google/genai` (`^2.4.0`), historical artifacts from Google AI Studio's scaffold. However, the application currently runs purely client-side via Vite. There is no active Express server or live backend process.

---

## 5. CURRENT DEVELOPMENT PHASE

**Phase 2: Product Development & Catalog Architecture**

The project completed its foundational scaffolding (**Phase 1**) and is actively refining product domain models, variant inventory structures, textile specifications, and storefront operating modes (**Phase 2**).

During Phase 2, a central `STOREFRONT_CONFIG` ("Preview Mode") was introduced to safely present the platform as an architectural prototype while physical garment manufacturing tech packs, commercial pricing, and official vector marks are being signed off.

---

## 6. REPOSITORY & GIT SPECIFICATIONS

- **Active Remote**: `origin -> https://github.com/mancystore/mancystore.git`
- **Active Branch**: `phase-2-product-development` (tracking `origin/phase-2-product-development`)
- **Default Branch**: `main`
- **Verified Commit History**:
  - `d03d90c`: *Fix Vite and esbuild dependency compatibility* (Author: `aimxnnysr`, Date: `2026-11-20T19:33:41+08:00`)
  - `0f8c088`: *feat: initialize MNC streetwear storefront application* (Author: `mancystore`, Date: `2026-11-06T20:09:16+08:00`)
  - `bfc28c3`: *Initial commit* (Author: `mancystore`, Date: `2026-11-06T20:08:45+08:00`)
- **Git Safety Protocol**:
  - Never execute `git reset --hard` or destructive operations.
  - Never force-push (`--force`) to remote branches.
  - Never discard uncommitted work.
  - Maintain clean, descriptive, and atomic commit messages.
  - Verify `npm run lint` and `npm run build` pass before staging or committing.

---

## 7. CURRENT IMPLEMENTATION STATUS

### Completed & Functional
- Single-Page Application (SPA) custom view router (`home`, `shop`, `collections`, `product-detail`, `about`, `cart`).
- Editorial campaign homepage with large focal hero imagery, brand manifesto, 3 brand pillars, Season 001 lookbook spread, and collection archive cards.
- Full catalog view (`Shop.tsx`) with category tabs, collection quick switcher, and dynamic sorting.
- Capsule collections explorer (`Collections.tsx`) supporting 3 distinct brand capsules.
- Garment inspection view (`ProductDetail.tsx`) with multi-angle photography selector, full-screen macro lightbox, fabric GSM disclosures, and collapsible specs.
- Interactive garment size guide modal (`SizeGuideModal.tsx`) providing flat-lay centimetre measurements and measurement guidelines across 4 categories.
- Instant search modal (`SearchModal.tsx`) with keyboard shortcut (`/`), live query filtering, and ESC dismissal.
- Central asset management system (`src/config/assets.ts`) with type-safe metadata and graceful fallback component (`ImageWithFallback.tsx`).
- Responsive mobile drawer navigation with high-contrast accessibility.

### Under Refinement / Gated in Preview Mode
- Shopping bag item manipulation and slide-out cart drawer (functional in Phase 1 code, temporarily gated behind `STOREFRONT_CONFIG.mode === 'PREVIEW'`).
- Demonstration checkout modal (`DemonstrationCheckoutModal.tsx` exists in codebase, unmounted in `App.tsx` during preview mode).

### Future Implementation Required
- Production checkout integration with a Malaysian-compatible payment gateway (ToyyibPay / Stripe / Curlec).
- Live inventory synchronization with a persistent backend database.
- Official brand assets replacement once vector graphics and certified photography packages are delivered.

---

## 8. KNOWN ISSUES & HISTORICAL REASSESSMENT

| Issue Description | Historical Observation | Current Status in Codebase |
|---|---|---|
| **Homepage Visual Density** | Homepage previously felt crowded with excessive small text blocks. | **RESOLVED**: Redesigned with large focal imagery, clean 3-pillar layout, and generous whitespace (`py-28` to `py-44`). |
| **Price Formatting & Alignment** | Prices felt secondary and inconsistently aligned. | **RESOLVED**: Restructured with dedicated tabular-num rows in `ProductCard.tsx` and clear visual dividers. |
| **Brand Vectors & Sign-off** | Brand assets were placeholder text or prototype vectors. | **IN PROGRESS**: Standardized in `src/assets/brand/` with explicit `PROTOTYPE_TEMPORARY` tags in registry. |
| **Vite Native Config Loader Warning** | Vite 8 logs deprecation warning regarding `__dirname`. | **SCHEDULED**: Safe migration to `import.meta.dirname` in `vite.config.ts`. |
| **Git Push Permission Error (403)** | Pushing to remote encountered HTTP 403 due to account credential mismatch (`aimxnnysr` vs `mancystore`). | **ENVIRONMENTAL**: Local work on `phase-2-product-development` is completely safe. GitHub CLI is unavailable. |

---

## 9. DEVELOPMENT CONSTRAINTS & PRINCIPLES

1. **Preserve Existing Progress**: Do not discard or rebuild working components. Apply targeted refinements.
2. **Understand Before Modifying**: Trace component dependencies, props, and contexts before editing.
3. **Evidence-Based Engineering**: Rely on actual files, terminal outputs, and compiler checks (`tsc --noEmit`, `vite build`).
4. **Zero Decorative Non-Functionality**: Buttons and controls must have clear, intentional states or explicit disabled disclosures.
5. **Responsive-First**: Every layout must be verified on desktop (1440px), tablet (768px), and mobile (375px).
6. **No Fabricated Progress**: Clearly distinguish what is fully coded versus what is UI-only or simulated.
