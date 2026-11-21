# MNC — PROJECT CHANGELOG

All entries below represent verified development changes substantiated by Git commits and audited working tree states.

---

## [2026-11-21] — Milestone 2.2: Product Variant Linkage & Milestone 2.3: Catalogue Filtering Harmonization

### Milestone
Phase 2 Product Development: Dynamic SKU / Variant Modeling & Filter Harmonization

### Changed / Created Files
- `src/data/products.ts` (Populated explicit `variants` arrays across all 6 garments with dedicated SKUs and stock counts)
- `src/pages/ProductDetail.tsx` (Bound size buttons to dynamic variant SKU, stock feedback, disabled/line-through out-of-stock states, and stock validation)
- `src/components/ProductGrid.tsx` (Added `'Shirts'` and `'Long Sleeves'` filter pills with real-time silhouette counts)
- `ROADMAP.md` (Updated completion status for Milestones 2.1, 2.2, 2.3, and 2.4)
- `DEVELOPMENT_PROGRESS.md` (Updated progress tracking)
- `CHANGELOG.md` (Logged changes)
- `NEXT_SESSION.md` (Updated session handoff brief)

### Description
1. Linked all 6 core garments in `src/data/products.ts` to typed `ProductVariant[]` structures, generating individual variant SKUs (e.g. `MNC-HD-001-BLK-M`) and stock allocations. Configured `MNC-HD-003-CHR-S` with `stockCount: 0` to enable robust out-of-stock testing.
2. Enhanced `ProductDetail.tsx` so selecting different sizes dynamically updates the breadcrumb SKU, displays live stock count feedback (`• In Stock (X units)` or `• Out of Stock`), strikes through sold-out sizes, and prevents cart additions when out of stock.
3. Expanded `ProductGrid.tsx` category pills to encompass all five domain categories (`'All'`, `'Hoodies'`, `'Tees'`, `'Shirts'`, `'Long Sleeves'`).

### Verification Result
- `npm run lint` (`tsc --noEmit`): Passed with 0 errors.
- `npm run build` (`vite build`): Passed in 931ms with **0 errors and 0 warnings**.

---

## [2026-11-21] — Milestone 2.1: Dual-Mode Cart Architecture & Milestone 2.4: Tooling Cleanliness

### Milestone
Phase 2 Product Development: Dual-Mode Cart Stabilization & Zero-Warning Vite Build

### Changed / Created Files
- `src/config/storefront.config.ts` (Updated with `DEMONSTRATION` mode and permissions)
- `src/context/CartContext.tsx` (Restored interactive `addToCart`, quantity stepper, and persistence)
- `src/components/CartDrawer.tsx` (Itemized list, free shipping tracker, quantity stepper, checkout trigger)
- `src/pages/Cart.tsx` (12-column bag review table, order summary, simulated checkout trigger)
- `src/pages/ProductDetail.tsx` (Restored quantity selector, "Add to Bag" button, mobile sticky action bar)
- `src/components/Navbar.tsx` (Restored `ShoppingBag` icon with dynamic `totalItems` counter badge)
- `src/App.tsx` (Re-mounted `DemonstrationCheckoutModal`, connected checkout handlers)
- `vite.config.ts` (Migrated from `__dirname` to `import.meta.dirname`)

### Description
1. Implemented a dual-mode storefront architecture (`PREVIEW` vs `DEMONSTRATION` vs `PRODUCTION`) via `src/config/storefront.config.ts`.
2. Fully restored the interactive client-side shopping bag with local simulation.
3. Migrated `vite.config.ts` to `path.resolve(import.meta.dirname, '.')`, eliminating the native configLoader deprecation warning.

### Verification Result
- `npm run lint` (`tsc --noEmit`): Passed with 0 errors.
- `npm run build` (`vite build`): Passed in 1.06s with 0 errors and 0 warnings.

---

## [2026-11-21] — Master Project Context, Technical Audit & Documentation Baseline

### Milestone
Phase 2 Documentation System Establishment

### Changed / Created Files
- `PROJECT_CONTEXT.md`, `ARCHITECTURE.md`, `DEVELOPMENT_PROGRESS.md`, `ROADMAP.md`, `DESIGN_SYSTEM.md`, `FILE_REFERENCE.md`, `CHANGELOG.md`, `NEXT_SESSION.md`.

### Verification Result
- `npm run lint` passed with 0 errors.
- `npm run build` completed in 1.22s.
- 23/23 static assets verified present on disk.

---

## [2026-11-20] — Tooling & Build Compatibility Fix

### Milestone
Tooling & Environment Stabilization (`d03d90c`)

---

## [2026-11-06] — Initial MNC Streetwear Storefront Application

### Milestone
Phase 1 Application Scaffolding (`0f8c088`)

---

## [2026-11-06] — Initial Repository Setup

### Milestone
Repository Initialization (`bfc28c3`)
