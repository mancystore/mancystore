# MNC — STRATEGIC DEVELOPMENT ROADMAP

---

## 1. DEVELOPMENT PHASES OVERVIEW

```text
┌─────────────────────────┐     ┌─────────────────────────┐     ┌─────────────────────────┐
│         PHASE 1         │     │         PHASE 2         │     │         PHASE 3         │
│ Foundation & Scaffolding│ ──► │   Product Architecture  │ ──► │  Commercial Production  │
│      [COMPLETED]        │     │      [COMPLETED]        │     │       [PLANNED]         │
└─────────────────────────┘     └─────────────────────────┘     └─────────────────────────┘
```

---

## 2. PHASE 2: PRODUCT DEVELOPMENT & CATALOG ARCHITECTURE

### Milestone 2.1: Dual-Mode Cart & Working Tree Stabilization
- **Priority**: `P0` (Critical)
- **Status**: **COMPLETE & VERIFIED**
- **Deliverables**:
  - Unified `STOREFRONT_CONFIG` supporting `PREVIEW`, `DEMONSTRATION`, and `PRODUCTION`.
  - Restored interactive "Add to Bag" interaction, quantity steppers, and LocalStorage persistence.
  - Re-mounted `DemonstrationCheckoutModal.tsx` in `App.tsx`.
  - Restored `ShoppingBag` counter badge in `Navbar.tsx`.

### Milestone 2.2: Product Variant & Inventory Linkage
- **Priority**: `P1` (High)
- **Status**: **COMPLETE & VERIFIED**
- **Deliverables**:
  - Populated explicit `variants: ProductVariant[]` across all 6 garments in `src/data/products.ts`.
  - Connected size selector in `ProductDetail.tsx` to dynamically update displayed SKU (e.g. `MNC-HD-001-BLK-M`) and stock feedback.
  - Added struck-through and disabled styling for out-of-stock sizes (`stockCount === 0`), verified on `MNC-HD-003-CHR-S`.

### Milestone 2.3: Catalogue Filtering Harmonization
- **Priority**: `P2` (Medium)
- **Status**: **COMPLETE & VERIFIED**
- **Deliverables**:
  - Added `'Shirts'` and `'Long Sleeves'` categories to filter pills in `src/components/ProductGrid.tsx`.
  - Harmonized silhouette count badges and verified filter reset behavior.

### Milestone 2.4: Tooling & Build Cleanliness
- **Priority**: `P2` (Medium)
- **Status**: **COMPLETE & VERIFIED**
- **Deliverables**:
  - Updated `vite.config.ts` line 11 to `path.resolve(import.meta.dirname, '.')`.
  - Zero-warning, zero-error production builds in under 1 second.

---

## 3. PHASE 3: COMMERCIAL DEPLOYMENT & PRODUCTION READINESS (PLANNED)

### Milestone 3.1: Official Brand Asset Package Delivery
- **Priority**: `P1` (Business-dependent)
- **Status**: `Awaiting Assets`
- **Technical Requirements**:
  - Replace temporary SVG brandmarks in `src/assets/brand/` with official finalized vectorized marks.
  - Replace prototype lookbook images with certified studio photography.
  - Update `src/config/assets.ts` and `src/config/brand.config.ts` setting `status: 'OFFICIAL_APPROVED'` and `isOfficialApproved: true`.
- **Acceptance Criteria**: `isOfficialApprovedAsset()` returns `true` across all core assets.

### Milestone 3.2: Payment Gateway Integration
- **Priority**: `P1` (High)
- **Status**: `Planned`
- **Technical Requirements**:
  - Integrate an online payment solution tailored for Malaysian Ringgit (MYR):
    - Option A: **ToyyibPay** (FPX Online Banking, Malaysian local favorite, lowest fee structure).
    - Option B: **Stripe Malaysia** (Cards, Apple Pay, Google Pay, FPX).
    - Option C: **Curlec / Razorpay MY** (Local recurring & FPX).
  - Replace `DemonstrationCheckoutModal.tsx` with a production gateway redirect or hosted checkout session.
- **Dependencies**: Verified Malaysian business registration / merchant account.

### Milestone 3.3: Production Hosting & Continuous Deployment
- **Priority**: `P2` (Medium)
- **Status**: `Planned`
- **Technical Requirements**:
  - Connect GitHub repository `mancystore/mancystore` to Vercel or Cloudflare Pages.
  - Configure automatic deployment on pushes to `main`.
  - Attach custom domain (e.g. `mancystore.com` / `mnc.store`).
  - Configure custom 404 fallback routing for client-side SPA.
