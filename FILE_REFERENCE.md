# MNC — COMPLETE FILE REFERENCE & COMPONENT INDEX

This document provides a comprehensive index of all relevant source and configuration files in the MNC project.

---

## 1. ROOT CONFIGURATION & BUILD ARTIFACTS

### `package.json`
- **Path**: `package.json`
- **Responsibility**: Declares project metadata, npm build/dev scripts, and package dependencies.
- **Dependencies**: React 19, Tailwind CSS v4, Vite 8, Lucide React.
- **Exports**: Configuration manifest.
- **Related Files**: `package-lock.json`, `vite.config.ts`.
- **Status**: COMPLETE & VERIFIED.

### `vite.config.ts`
- **Path**: `vite.config.ts`
- **Responsibility**: Vite build configuration, Tailwind CSS plugin hook, React JSX transformer, and `@` path alias.
- **Dependencies**: `@vitejs/plugin-react`, `@tailwindcss/vite`, `path`, `vite`.
- **Exports**: Default Vite configuration function.
- **Related Files**: `tsconfig.json`, `package.json`.
- **Status**: COMPLETE & FUNCTIONAL (has minor `__dirname` warning scheduled for cleanup).

### `tsconfig.json`
- **Path**: `tsconfig.json`
- **Responsibility**: TypeScript compiler settings targeting modern ES2022 and bundler resolution.
- **Dependencies**: TypeScript.
- **Exports**: Compiler options.
- **Related Files**: `package.json`.
- **Status**: COMPLETE (0 compilation errors).

### `index.html`
- **Path**: `index.html`
- **Responsibility**: HTML shell, viewport settings, SEO meta tags, and Google Fonts preconnect/links.
- **Dependencies**: Google Fonts (`Outfit`, `Plus Jakarta Sans`).
- **Exports**: Web entry document.
- **Related Files**: `src/main.tsx`.
- **Status**: COMPLETE & VERIFIED.

---

## 2. APPLICATION ENTRY & GLOBAL STYLING

### `src/main.tsx`
- **Path**: `src/main.tsx`
- **Responsibility**: React 19 application root bootstrap. Mounts `<App />` into `#root`.
- **Dependencies**: `react-dom/client`, `src/App.tsx`, `src/index.css`.
- **Exports**: None (entry point).
- **Related Files**: `index.html`, `src/App.tsx`.
- **Status**: COMPLETE.

### `src/index.css`
- **Path**: `src/index.css`
- **Responsibility**: Imports Tailwind CSS v4, sets CSS design token variables, custom scrollbar styling, and editorial grid utilities.
- **Dependencies**: `@tailwindcss/vite`.
- **Exports**: None (global stylesheet).
- **Related Files**: `src/main.tsx`, `src/config/brand.config.ts`.
- **Status**: COMPLETE.

### `src/App.tsx`
- **Path**: `src/App.tsx`
- **Responsibility**: Root controller, view router (`activePage`), modal visibility manager, and global keyboard hotkey handler (`/`).
- **Dependencies**: `react`, `src/context/CartContext.tsx`, `src/data/products.ts`, `src/data/collections.ts`, page components, modal components.
- **Exports**: `default App`.
- **Related Files**: All pages and modal components.
- **Status**: COMPLETE & FUNCTIONAL.

---

## 3. UI COMPONENTS (`src/components/`)

### `src/components/AnnouncementBar.tsx`
- **Path**: `src/components/AnnouncementBar.tsx`
- **Responsibility**: Promotional top bar for drop notices or shipping disclaimers.
- **Dependencies**: `react`.
- **Exports**: `AnnouncementBar: React.FC`.
- **Related Files**: `src/App.tsx`.
- **Status**: COMPLETE (currently returns `null;` to maintain clean aesthetics).

### `src/components/Navbar.tsx`
- **Path**: `src/components/Navbar.tsx`
- **Responsibility**: Sticky header with wordmark, desktop navigation, search modal trigger, preview drawer trigger, and mobile drawer menu.
- **Dependencies**: `react`, `lucide-react`, `src/context/CartContext.tsx`, `src/config/brand.config.ts`.
- **Exports**: `Navbar: React.FC<NavbarProps>`.
- **Related Files**: `src/App.tsx`, `src/components/CartDrawer.tsx`, `src/components/SearchModal.tsx`.
- **Status**: COMPLETE & RESPONSIVE.

### `src/components/Footer.tsx`
- **Path**: `src/components/Footer.tsx`
- **Responsibility**: Editorial footer with brand manifesto statement, catalog links, size guide trigger, and interactive dispatch newsletter form.
- **Dependencies**: `react`, `lucide-react`, `src/config/brand.config.ts`.
- **Exports**: `Footer: React.FC<FooterProps>`.
- **Related Files**: `src/App.tsx`, `src/components/SizeGuideModal.tsx`.
- **Status**: COMPLETE & FUNCTIONAL.

### `src/components/Button.tsx`
- **Path**: `src/components/Button.tsx`
- **Responsibility**: Standardized button component with primary, secondary, outline, and ghost variants.
- **Dependencies**: `react`.
- **Exports**: `Button: React.FC<ButtonProps>`.
- **Related Files**: Used across all pages and modals.
- **Status**: COMPLETE & STANDARDIZED.

### `src/components/ProductCard.tsx`
- **Path**: `src/components/ProductCard.tsx`
- **Responsibility**: E-commerce card with 4:5 image ratio, secondary image hover swap, color swatches, tabular pricing, and prototype badge.
- **Dependencies**: `react`, `src/types/product.ts`, `src/config/storefront.config.ts`, `src/components/ImageWithFallback.tsx`.
- **Exports**: `ProductCard: React.FC<ProductCardProps>`.
- **Related Files**: `src/components/ProductGrid.tsx`, `src/pages/Home.tsx`, `src/pages/Collections.tsx`.
- **Status**: COMPLETE & POLISHED.

### `src/components/ProductGrid.tsx`
- **Path**: `src/components/ProductGrid.tsx`
- **Responsibility**: Interactive product catalog grid with category pill tabs, silhouette count badges, and sorting selector (price, name, featured).
- **Dependencies**: `react`, `lucide-react`, `src/types/product.ts`, `src/components/ProductCard.tsx`.
- **Exports**: `ProductGrid: React.FC<ProductGridProps>`.
- **Related Files**: `src/pages/Shop.tsx`, `src/components/ProductCard.tsx`.
- **Status**: COMPLETE & FUNCTIONAL.

### `src/components/ImageWithFallback.tsx`
- **Path**: `src/components/ImageWithFallback.tsx`
- **Responsibility**: Fault-tolerant image rendering with skeleton loader, error catch, and monospace SVG fallback placeholder.
- **Dependencies**: `react`, `src/config/assets.ts`.
- **Exports**: `ImageWithFallback: React.FC<ImageWithFallbackProps>`.
- **Related Files**: Used in `ProductCard`, `ProductDetail`, `Home`, and `Collections`.
- **Status**: COMPLETE & HIGH RELIABILITY.

### `src/components/SearchModal.tsx`
- **Path**: `src/components/SearchModal.tsx`
- **Responsibility**: Real-time modal search with auto-focus, live substring matching (name, description, GSM, collection), and ESC key dismissal.
- **Dependencies**: `react`, `lucide-react`, `src/data/products.ts`, `src/components/ImageWithFallback.tsx`.
- **Exports**: `SearchModal: React.FC<SearchModalProps>`.
- **Related Files**: `src/App.tsx`, `src/components/Navbar.tsx`.
- **Status**: COMPLETE & FUNCTIONAL.

### `src/components/SizeGuideModal.tsx`
- **Path**: `src/components/SizeGuideModal.tsx`
- **Responsibility**: Displays technical flat-lay garment measurements in centimetres (Chest, Length, Shoulder, Sleeve) across 4 product categories.
- **Dependencies**: `react`, `lucide-react`.
- **Exports**: `SizeGuideModal: React.FC<SizeGuideModalProps>`.
- **Related Files**: `src/App.tsx`, `src/pages/ProductDetail.tsx`, `src/components/Footer.tsx`.
- **Status**: COMPLETE & ACCURATE.

### `src/components/CartDrawer.tsx`
- **Path**: `src/components/CartDrawer.tsx`
- **Responsibility**: Slide-out cart drawer.
- **Dependencies**: `react`, `lucide-react`, `src/context/CartContext.tsx`, `src/config/storefront.config.ts`, `src/components/Button.tsx`.
- **Exports**: `CartDrawer: React.FC<CartDrawerProps>`.
- **Related Files**: `src/App.tsx`, `src/context/CartContext.tsx`.
- **Status**: COMPLETE (Displays Preview Notice in working tree).

### `src/components/DemonstrationCheckoutModal.tsx`
- **Path**: `src/components/DemonstrationCheckoutModal.tsx`
- **Responsibility**: Simulated delivery and sandbox order placement dialog for Phase 1 testing.
- **Dependencies**: `react`, `lucide-react`, `src/context/CartContext.tsx`, `src/components/Button.tsx`.
- **Exports**: `DemonstrationCheckoutModal: React.FC<DemonstrationCheckoutModalProps>`.
- **Related Files**: `src/App.tsx`, `src/pages/Cart.tsx`.
- **Status**: COMPLETE IN CODE (currently unmounted in `App.tsx` during preview mode).

---

## 4. PAGES (`src/pages/`)

### `src/pages/Home.tsx`
- **Path**: `src/pages/Home.tsx`
- **Responsibility**: Primary storefront experience. Renders Campaign Hero, 3 Brand Pillars, Featured Garments Grid, Lookbook Season 001, Collections Archive, and New Arrivals.
- **Dependencies**: `react`, `lucide-react`, `src/types/product.ts`, `src/components/ProductCard.tsx`, `src/components/Button.tsx`, `src/components/ImageWithFallback.tsx`, `src/config/assets.ts`.
- **Exports**: `Home: React.FC<HomeProps>`.
- **Related Files**: `src/App.tsx`, `src/data/products.ts`, `src/data/collections.ts`.
- **Status**: COMPLETE & REFINED.

### `src/pages/Shop.tsx`
- **Path**: `src/pages/Shop.tsx`
- **Responsibility**: Full catalog browsing page with collection filter pills and product grid.
- **Dependencies**: `react`, `src/types/product.ts`, `src/components/ProductGrid.tsx`.
- **Exports**: `Shop: React.FC<ShopProps>`.
- **Related Files**: `src/App.tsx`, `src/components/ProductGrid.tsx`.
- **Status**: COMPLETE & FUNCTIONAL.

### `src/pages/Collections.tsx`
- **Path**: `src/pages/Collections.tsx`
- **Responsibility**: Capsule vault view. Displays active collection showcase banner, editorial copy, and collection-specific product cards.
- **Dependencies**: `react`, `lucide-react`, `src/types/product.ts`, `src/components/ProductCard.tsx`, `src/components/ImageWithFallback.tsx`.
- **Exports**: `Collections: React.FC<CollectionsProps>`.
- **Related Files**: `src/App.tsx`, `src/data/collections.ts`.
- **Status**: COMPLETE & FUNCTIONAL.

### `src/pages/ProductDetail.tsx`
- **Path**: `src/pages/ProductDetail.tsx`
- **Responsibility**: Product detail view with thumbnail gallery, full-screen lightbox, size buttons, color chips, GSM badge, tabbed technical specs, and related garments.
- **Dependencies**: `react`, `lucide-react`, `src/types/product.ts`, `src/config/storefront.config.ts`, `src/components/ProductCard.tsx`, `src/components/ImageWithFallback.tsx`.
- **Exports**: `ProductDetail: React.FC<ProductDetailProps>`.
- **Related Files**: `src/App.tsx`, `src/components/SizeGuideModal.tsx`.
- **Status**: COMPLETE (Displays preview notices in working tree).

### `src/pages/About.tsx`
- **Path**: `src/pages/About.tsx`
- **Responsibility**: MNC Brand Manifesto. Articulates brand philosophy ("Form follows weight. Volume follows posture."), showroom environment, and the 4 Brand Invariants.
- **Dependencies**: `react`, `lucide-react`, `src/components/Button.tsx`, `src/components/ImageWithFallback.tsx`, `src/config/assets.ts`.
- **Exports**: `About: React.FC<AboutProps>`.
- **Related Files**: `src/App.tsx`.
- **Status**: COMPLETE & POLISHED.

### `src/pages/Cart.tsx`
- **Path**: `src/pages/Cart.tsx`
- **Responsibility**: Dedicated cart and order review page.
- **Dependencies**: `react`, `lucide-react`, `src/components/Button.tsx`, `src/config/storefront.config.ts`.
- **Exports**: `Cart: React.FC<CartProps>`.
- **Related Files**: `src/App.tsx`, `src/context/CartContext.tsx`.
- **Status**: COMPLETE (Displays preview notices in working tree).

---

## 5. CONTEXT, DATA & CONFIGURATION

### `src/context/CartContext.tsx` & `src/hooks/useCart.ts`
- **Path**: `src/context/CartContext.tsx`
- **Responsibility**: Global cart state provider. Manages items array, `addToCart`, `updateQuantity`, `removeFromCart`, `clearCart`, subtotal, and drawer open/close.
- **Dependencies**: `react`, `src/types/product.ts`, `src/config/storefront.config.ts`.
- **Exports**: `CartProvider`, `useCart`.
- **Related Files**: `src/hooks/useCart.ts`, `src/App.tsx`, `src/components/Navbar.tsx`.
- **Status**: COMPLETE.

### `src/types/product.ts`
- **Path**: `src/types/product.ts`
- **Responsibility**: Central domain types: `Product`, `ProductCategory`, `Collection`, `CartItem`, `ProductColor`, `ProductImageSet`, `AssetStatus`, `ProductVariant`.
- **Dependencies**: None.
- **Exports**: Domain types and interfaces.
- **Related Files**: Imported throughout the codebase.
- **Status**: COMPLETE & COMPREHENSIVE.

### `src/data/products.ts`
- **Path**: `src/data/products.ts`
- **Responsibility**: Static catalog defining 6 core garments with specifications and pricing.
- **Dependencies**: `src/types/product.ts`, `src/config/assets.ts`.
- **Exports**: `PRODUCTS: Product[]`.
- **Related Files**: `src/App.tsx`, `src/data/collections.ts`.
- **Status**: COMPLETE & VERIFIED.

### `src/data/collections.ts`
- **Path**: `src/data/collections.ts`
- **Responsibility**: Defines 3 brand collections: `MNC ESSENTIALS`, `MNC SEASON 001`, and `MNC ARCHIVE`.
- **Dependencies**: `src/types/product.ts`, `src/config/assets.ts`.
- **Exports**: `COLLECTIONS: Collection[]`.
- **Related Files**: `src/App.tsx`, `src/pages/Collections.tsx`.
- **Status**: COMPLETE & VERIFIED.

### `src/config/assets.ts`
- **Path**: `src/config/assets.ts`
- **Responsibility**: Central registry for all static assets resolved via Vite `new URL(...)`. Helper functions `getProductImageSet` and `isOfficialApprovedAsset`.
- **Dependencies**: `src/types/product.ts`.
- **Exports**: `BRAND_ASSETS`, `CAMPAIGN_ASSETS`, `COLLECTION_ASSETS`, `TEXTURE_ASSETS`, `FALLBACK_ASSETS`, `PRODUCT_IMAGE_REGISTRY`.
- **Related Files**: `src/components/ImageWithFallback.tsx`, `src/data/products.ts`.
- **Status**: COMPLETE & VERIFIED (23/23 assets present).

### `src/config/brand.config.ts`
- **Path**: `src/config/brand.config.ts`
- **Responsibility**: Master brand metadata, color tokens, typography configuration, and logo asset replacement instructions.
- **Dependencies**: None.
- **Exports**: `BRAND_CONFIG: BrandConfig`.
- **Related Files**: `src/components/Navbar.tsx`, `src/components/Footer.tsx`.
- **Status**: COMPLETE.

### `src/config/storefront.config.ts`
- **Path**: `src/config/storefront.config.ts`
- **Responsibility**: Storefront operation mode (`mode: 'PREVIEW' | 'PRODUCTION'`, purchasing permissions).
- **Dependencies**: None.
- **Exports**: `STOREFRONT_CONFIG: StorefrontConfig`.
- **Related Files**: `src/context/CartContext.tsx`, `src/pages/ProductDetail.tsx`, `src/pages/Cart.tsx`.
- **Status**: UNTRACKED FILE IN WORKING TREE (Functional).
