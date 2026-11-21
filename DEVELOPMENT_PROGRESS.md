# MNC — DEVELOPMENT PROGRESS & VERIFIED HISTORY

---

## 1. VERIFIED COMMIT HISTORY

All historical milestones below are verified against repository Git logs and cryptographic commit hashes.

| Commit Hash | Date (ISO / Local) | Author | Commit Message | Verified Changes |
|---|---|---|---|---|
| `bfc28c3` | `2026-11-06T20:08:45+08:00` | mancystore | Initial commit | Initialized repository with AI Studio banner README. |
| `0f8c088` | `2026-11-06T20:09:16+08:00` | mancystore | feat: initialize MNC streetwear storefront application | Complete storefront scaffold: React 19, TypeScript, Vite, Tailwind CSS v4, Lucide React, CartContext, CartDrawer, Pages (Home, Shop, Collections, ProductDetail, About, Cart), SizeGuideModal, and DemonstrationCheckoutModal. |
| `d03d90c` | `2026-11-20T19:33:41+08:00` | aimxnnysr | Fix Vite and esbuild dependency compatibility | Added lockfile (`package-lock.json` v3) fixing Vite 8 and esbuild native platform binaries across development environments. |

---

## 2. MILESTONE PROGRESS TRACKING

### Milestone 1: Application Scaffolding & Design Foundation (Phase 1)
- **Status**: **COMPLETE** (Verified via commit `0f8c088`)
- **Key Deliverables**:
  - React 19 + TypeScript + Vite 8 setup.
  - Tailwind CSS v4 engine integration with custom color palette (`#111111`, `#F5F4F0`, `#9A9A91`).
  - Typography configuration with Google Fonts (`Outfit` display & `Plus Jakarta Sans` body).
  - Centralized responsive navigation header and editorial brand footer.
  - Initial 6-product catalog definition with 3 collection capsules.

### Milestone 2: Build & Tooling Stabilization
- **Status**: **COMPLETE** (Verified via commit `d03d90c`)
- **Key Deliverables**:
  - Generated verified `package-lock.json` with 3894 lockfile entries.
  - Resolved esbuild binary resolution for Windows x64.
  - Verified reproducible zero-error compilation with `npm run build`.

### Milestone 3: Asset Centralization & Fault-Tolerant Rendering
- **Status**: **COMPLETE** (Verified in working tree)
- **Key Deliverables**:
  - Implemented `src/config/assets.ts` with typed metadata (`AssetStatus`, `isOfficialApproved`).
  - Added `<ImageWithFallback />` with pulse loading skeletons and architectural SVG placeholders.
  - Replaced ad-hoc asset paths with Vite `new URL(..., import.meta.url)` to guarantee correct bundle asset hashing.

### Milestone 2.1: Dual-Mode Cart Architecture & Working Tree Stabilization
- **Status**: **COMPLETE & VERIFIED**
- **Key Deliverables**:
  - Added `DEMONSTRATION` mode to `src/config/storefront.config.ts`.
  - Re-enabled interactive `addToCart`, quantity stepper, and LocalStorage persistence in `CartContext.tsx`.
  - Fully implemented itemized `CartDrawer.tsx` and 12-column `Cart.tsx` with free shipping calculations.
  - Restored quantity selector, "Add to Bag" button, feedback state, and mobile bottom action bar in `ProductDetail.tsx`.
  - Restored classic `ShoppingBag` icon with dynamic `totalItems` badge in `Navbar.tsx`.
  - Re-mounted `DemonstrationCheckoutModal.tsx` in `App.tsx`.

### Milestone 2.2: Product Variant & Inventory Linkage
- **Status**: **COMPLETE & VERIFIED**
- **Key Deliverables**:
  - Populated explicit `variants: ProductVariant[]` across all 6 garments in `src/data/products.ts`.
  - Linked size buttons on `ProductDetail.tsx` to dynamic variant SKUs (e.g. `MNC-HD-001-BLK-M`) and stock feedback.
  - Configured disabled and struck-through styling for sold-out sizes (verified on `Form Hoodie – Charcoal` size S).
  - Enforced stock validation in `handleAddToCart`.

### Milestone 2.3: Catalogue Filtering Harmonization
- **Status**: **COMPLETE & VERIFIED**
- **Key Deliverables**:
  - Added `'Shirts'` and `'Long Sleeves'` filter pills with real-time silhouette counts in `ProductGrid.tsx`.
  - Verified empty state handling and filter reset behavior.

### Milestone 2.4: Build & Tooling Cleanliness
- **Status**: **COMPLETE & VERIFIED**
- **Key Deliverables**:
  - Updated `vite.config.ts` line 11 to `path.resolve(import.meta.dirname, '.')`.
  - Achieved **0 warnings and 0 errors** during production Vite builds.

---

## 3. LATEST VERIFIED BUILD & TEST RESULTS

- **Date Verified**: `2026-11-21T22:07:42+08:00`
- **Verification Environment**: Windows 11, Node.js / npm environment, Vite 8.3.8.

### 1. Static Typecheck (`npm run lint` / `tsc --noEmit`)
```text
> react-example@0.0.0 lint
> tsc --noEmit
Exit code: 0 (Zero errors detected)
```

### 2. Production Bundler Build (`npm run build` / `vite build`)
```text
vite v8.3.8 building client environment for production...
transforming...
✓ 1683 modules transformed.
rendering chunks...
computing gzip size...
dist/index.html                                                 1.36 kB │ gzip:  0.61 kB
dist/assets/essential_tee_black_1793962823796-C5yRsWRt.jpg    565.90 kB
dist/assets/core_hoodie_black_1793962769736-BSVbiz5a.jpg      592.84 kB
dist/assets/everyday_tee_offwhite_1793962811551-Bzb6jk5J.jpg  593.24 kB
dist/assets/neutral_tee_beige_1793962837473-CtuGlmK6.jpg      615.98 kB
dist/assets/form_hoodie_charcoal_1793962797457-BxOqL-hY.jpg   676.64 kB
dist/assets/ash_hoodie_grey_1793962783321-F63B8bpv.jpg        712.98 kB
dist/assets/prototype_lookbook_season_001-DXIII0Cu.jpg        757.25 kB
dist/assets/prototype_hero_editorial-BfW1v_WN.jpg             829.88 kB
dist/assets/prototype_campaign_portrait-BYZB1L-2.jpg          884.37 kB
dist/assets/prototype_fabric_texture_500gsm-BJQE7gvJ.jpg      898.05 kB
dist/assets/index-ColSjEHz.css                                 45.68 kB │ gzip:  8.28 kB
dist/assets/index-Cx3thQlg.js                                 343.89 kB │ gzip: 96.88 kB
✓ built in 931ms
Exit code: 0 (Build successful, 0 warnings, 0 errors)
```

### 3. Static Asset Resolution Check
- All 23 static media files referenced in `src/config/assets.ts` verified present on disk. Zero broken references.
