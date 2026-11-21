# MNC — APPLICATION ARCHITECTURE & DATA FLOW

---

## 1. ARCHITECTURAL OVERVIEW

MNC is engineered as a lean, responsive Single Page Application (SPA) built with **React 19**, **TypeScript**, **Vite**, and **Tailwind CSS v4**. It utilizes a decoupled, component-driven architecture designed to balance luxury editorial storytelling with e-commerce usability.

The application operates without an external routing library (such as `react-router-dom`), relying instead on a centralized state-driven view controller in `src/App.tsx`. This avoids client-side history desynchronization in prototype and embedded sandbox environments while keeping the production JavaScript bundle under 95 kB (gzipped).

---

## 2. COMPONENT HIERARCHY

```mermaid
graph TD
    App["App.tsx (Root Controller & View Router)"]
    CP["CartProvider (src/context/CartContext.tsx)"]
    
    App --> CP
    
    %% Global Persistent Shell
    CP --> AB["AnnouncementBar.tsx (Muted/Promotional)"]
    CP --> NB["Navbar.tsx (Sticky Editorial Header)"]
    CP --> Main["Main View Router (Conditional Render)"]
    CP --> FT["Footer.tsx (Brand Philosophy & Dispatch)"]
    
    %% Global Overlays & Modals
    CP --> SM["SearchModal.tsx (Global Shortcut '/')"]
    CP --> CD["CartDrawer.tsx (Slide-out Bag / Preview Notice)"]
    CP --> SG["SizeGuideModal.tsx (Centimetres Measurement Modal)"]
    CP --> DCM["DemonstrationCheckoutModal.tsx (Simulated Sandbox)"]
    
    %% Views
    Main --> Home["Home.tsx (Flagship Campaign View)"]
    Main --> Shop["Shop.tsx (Full Catalogue)"]
    Main --> Collections["Collections.tsx (Capsule Vault)"]
    Main --> PD["ProductDetail.tsx (Garment Inspection View)"]
    Main --> About["About.tsx (Brand Manifesto)"]
    Main --> Cart["Cart.tsx (Full Bag & Order Review)"]
    
    %% Reusable UI Elements
    Home --> PC["ProductCard.tsx"]
    Shop --> PG["ProductGrid.tsx"]
    PG --> PC
    Collections --> PC
    PD --> PC
    
    %% Media & Asset Layer
    PC --> IWF["ImageWithFallback.tsx"]
    PD --> IWF
    Home --> IWF
    Collections --> IWF
    About --> IWF
    SM --> IWF
```

---

## 3. DATA ARCHITECTURE & FLOW

```mermaid
sequenceDiagram
    autonumber
    participant App as App.tsx (State Router)
    participant Data as src/data/ (products.ts & collections.ts)
    participant Assets as src/config/assets.ts (Registry)
    participant Page as Active Page (Shop / Collections / PDP)
    participant Cart as CartContext.tsx (Global State)
    participant Storage as LocalStorage (Browser Cache)

    Note over App,Data: 1. Application Initialization
    App->>Data: Imports PRODUCTS and COLLECTIONS
    Data->>Assets: Resolves image URLs through Vite asset loader
    App->>Page: Passes down product and collection props
    
    Note over Page,Cart: 2. Browsing & User Interaction
    Page->>App: onSelectProduct(productId)
    App->>App: Updates activePage = 'product-detail'
    App->>Page: Renders ProductDetail with selected garment data
    
    Note over Cart,Storage: 3. Shopping Bag State Flow
    Cart->>Storage: Hydrates items from 'mnc_streetwear_cart_demo'
    Page->>Cart: addToCart(garment, quantity)
    Cart->>Cart: Computes subtotal, items count & validates schema
    Cart->>Storage: Persists serialized cart state to LocalStorage
    Cart->>App: Opens CartDrawer for instant visual feedback
```

---

## 4. NAVIGATION & VIEW ROUTING SYSTEM

The application uses an explicit, lightweight page controller managed in `src/App.tsx`:

- **Active View State**: `activePage: 'home' | 'shop' | 'collections' | 'product-detail' | 'about' | 'cart'`
- **Navigation Handler**: `handleNavigate(page: string, params?: { category?: string; collection?: string; productId?: string })`
- **Product Selection**: `handleSelectProduct(productId: string)` sets `selectedProductId` and switches `activePage` to `'product-detail'`.
- **Scroll Memory**: A `useEffect` hook triggers `window.scrollTo({ top: 0, behavior: 'smooth' })` on every route or product transition.
- **Global Search Shortcut**: A key listener mounts on `window` listening for `/` to immediately focus and open `SearchModal.tsx`.

---

## 5. PRODUCT & CATALOG ARCHITECTURE

### Data Models (`src/types/product.ts`)

```typescript
// Core Product Model
export interface Product {
  id: string;                                // e.g. 'mnc-001'
  name: string;                              // e.g. 'Core Hoodie – Black'
  slug: string;                              // e.g. 'core-hoodie-black'
  tagline?: string;                          // Editorial summary
  description: string;                       // Detailed garment narrative
  price: number;                             // Price in MYR (Ringgit)
  category: SellableProductCategory;         // 'Hoodies' | 'Tees' | 'Shirts' | 'Long Sleeves'
  collectionId: CollectionId;                // 'mnc-essentials' | 'mnc-season-001' | 'mnc-archive'
  collectionName: CollectionName;            // 'MNC ESSENTIALS' | 'MNC SEASON 001' | 'MNC ARCHIVE'
  availableSizes: ProductSize[];             // ['S', 'M', 'L', 'XL']
  availableColours: ProductColor[];          // Array of { name, hex }
  variants?: ProductVariant[];               // Phase 2 variant SKU structure
  imageSet?: ProductImageSet;                // Structured views (main, front, back, details, lifestyle)
  images: string[];                          // Array of resolved URLs
  stockCount: number;                        // Aggregate stock count
  featured: boolean;                         // Flag for homepage curation
  isNewArrival?: boolean;                    // Flag for new arrivals section
  fabricDetails: string[];                   // GSM, weave, knit, and construction notes
  fitGuide: string;                          // Boxy drape and length instructions
  sku: string;                               // Unique master catalogue SKU
}
```

### Central Asset Management (`src/config/assets.ts`)
To prevent broken asset references during builds, all static imagery is registered in `src/config/assets.ts` using Vite's modern URL resolution:

```typescript
new URL('../assets/images/core_hoodie_black_1793962769736.jpg', import.meta.url).href
```

All image rendering passes through `<ImageWithFallback />`, which implements:
1. Pulsing skeleton loader (`bg-[#E8E6DF] animate-pulse`).
2. Primary image render with `lazy` loading.
3. Fallback cascade to a clean architectural SVG placeholder displaying `MNC // ASSET PENDING` if images fail.

---

## 6. CART & CHECKOUT ARCHITECTURE

```mermaid
stateDiagram-v2
    [*] --> Idle: App Mounts
    Idle --> Hydrated: CartContext reads LocalStorage
    
    state StorefrontModeCheck {
        [*] --> CheckMode
        CheckMode --> PreviewMode: mode === 'PREVIEW'
        CheckMode --> ActiveMode: mode === 'PRODUCTION' or 'DEMONSTRATION'
    }
    
    PreviewMode --> ReadOnlyNotice: Cart Drawer opens informational dialog
    ActiveMode --> CartMutations: addToCart() / updateQuantity()
    
    CartMutations --> Validated: Type & numerical bounds verified
    Validated --> Persisted: Serialized to LocalStorage
    Persisted --> CheckoutReady: Subtotal >= 0 computed
    
    CheckoutReady --> DemonstrationModal: onOpenCheckout (Simulation)
    DemonstrationModal --> OrderSubmitted: Simulated Delivery & Clear Cart
    OrderSubmitted --> Idle
```

### Cart Data Model (`src/types/product.ts`)
```typescript
export interface CartItem {
  id: string;               // Unique compound key: `${productId}-${size}-${color.name}`
  productId: string;        // Parent product identifier
  name: string;             // Garment name
  price: number;            // Unit price in MYR
  size: ProductSize;        // Selected size (e.g. 'M')
  color: ProductColor;      // Selected color object
  quantity: number;         // Selected quantity (integer > 0)
  image: string;            // Primary thumbnail URL
  slug: string;             // Product slug for reverse navigation
}
```

### Storefront Configuration Gating (`src/config/storefront.config.ts`)
The cart system is governed by a central toggle:
- When `STOREFRONT_CONFIG.mode === 'PREVIEW'`, cart modifications are locked to prevent visitors from treating prototype data as real stock.
- When `STOREFRONT_CONFIG.mode === 'PRODUCTION'` or `DEMONSTRATION`, full `addToCart`, quantity modification, item removal, and checkout flows operate locally.
