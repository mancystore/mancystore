# MNC — DESIGN SYSTEM & VISUAL IDENTITY GUIDELINES

---

## 1. BRAND IDENTITY & ETHOS

MNC is an independent contemporary fashion brand rooted in architectural volume, textile density (300–500 GSM), and minimalist streetwear confidence.

### Established Design Philosophy
- **Form Follows Weight**: Garments are built with substantial knitwear that holds architectural structure away from the body rather than clinging.
- **Volume Follows Posture**: Calibrated boxy proportions, dropped shoulder geometry, and balanced torso lengths.
- **Understated Confidence**: No loud chest billboards or random graphic noise. Clean, purposeful design where fabric quality speaks first.

---

## 2. COLOR PALETTE

The color system is defined in `src/index.css` (CSS variables) and `src/config/brand.config.ts`:

| Token Name | Hex Code | Visual Swatch | Role & Application |
|---|---|---|---|
| `--color-mnc-black` | `#111111` | ![#111111](https://via.placeholder.com/15/111111/000000?text=+) | Primary text, primary CTA buttons, dark editorial lookbook backgrounds, borders |
| `--color-mnc-sand` | `#F5F4F0` | ![#F5F4F0](https://via.placeholder.com/15/F5F4F0/000000?text=+) | Atelier canvas background, page body, light button text |
| `--color-mnc-white` | `#FFFFFF` | ![#FFFFFF](https://via.placeholder.com/15/FFFFFF/000000?text=+) | Surface cards, modals, table backgrounds, input fields |
| `--color-mnc-muted` | `#858585` | ![#858585](https://via.placeholder.com/15/858585/000000?text=+) | Subdued metadata, secondary labels, inactive nav items, table borders |
| `--color-mnc-accent`| `#9A9A91` | ![#9A9A91](https://via.placeholder.com/15/9A9A91/000000?text=+) | Brutalist cement tone, category badge accents, monogram accent line |
| **Surface Off-Grey**| `#EAE8E2` / `#ECEAE3` | ![#EAE8E2](https://via.placeholder.com/15/EAE8E2/000000?text=+) | Modal headers, product card fallback frames, thumbnail backdrops |

---

## 3. TYPOGRAPHY SYSTEM

Typography is imported in `index.html` from Google Fonts and configured in `src/index.css`:

### 1. Display & Headings: `Outfit`
- **Family**: `'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
- **Weights**: `600` (SemiBold), `700` (Bold), `800` (ExtraBold), `900` (Black)
- **Letter Spacing**:
  - Main Headlines: `-0.02em` to `-0.05em` (`tracking-tight` / `leading-[0.92]`)
  - Brand Wordmark: `0.18em` to `0.20em` (`tracking-[0.2em]`)
- **Usage**: Brand wordmark, primary campaign slogans, product titles, section headers.

### 2. Body Text: `Plus Jakarta Sans`
- **Family**: `'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
- **Weights**: `400` (Regular), `500` (Medium), `600` (SemiBold)
- **Letter Spacing**: Normal (`0`)
- **Usage**: Editorial paragraphs, product descriptions, specs lists, modal text.

### 3. Monospace Metadata: `ui-monospace`
- **Family**: `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`
- **Weights**: `500` (Medium), `700` (Bold)
- **Letter Spacing**: `0.12em` to `0.25em` (`tracking-widest`)
- **Usage**: Garment SKUs, GSM indicators, price rows (`tabular-nums`), size guide tables, breadcrumbs.

---

## 4. SPACING & LAYOUT PRINCIPLES

- **Container Width**: Max standard width is constrained to `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`.
- **Editorial Vertical Breathing Room**:
  - Major sections on the homepage use `space-y-28 sm:space-y-36 lg:space-y-44`.
  - Section padding uses `py-16 sm:py-24 lg:py-36`.
  - Modals and drawers use `p-6` to `p-8`.
- **Dividers**: Clean, subtle horizontal and vertical hairline borders using `border-[#111111]/10` or `border-[#111111]/12`.

---

## 5. REUSABLE UI COMPONENTS

### 1. Buttons (`src/components/Button.tsx`)
Standardized button styles with uppercase typography, letter spacing, and hover animations:
- `primary`: Solid `#111111` background, `#F5F4F0` text, hover `#2A2A2A`.
- `secondary`: Light `#EDEBE6` background, `#111111` text, hover `#E2DFD8`.
- `outline`: Transparent background, `#111111` 1px border, hover `#111111` fill.
- `ghost`: Transparent background, hover `#111111]/5`.
- Sizes: `sm` (`py-2 px-4 text-[11px]`), `md` (`py-3.5 px-6 text-xs`), `lg` (`py-4 px-8 text-sm`).

### 2. Product Cards (`src/components/ProductCard.tsx`)
- **Aspect Ratio**: Standard 4:5 vertical proportion (`aspect-[4/5]`) inside an `overflow-hidden` container.
- **Hover Interaction**: Smooth secondary image swap or image scale (`scale-105 duration-700 ease-out`).
- **Badge**: Minimalist black badge in top-left corner (`text-[9px] uppercase tracking-[0.18em]`).
- **Color Swatches**: Small circular swatches (`h-2.5 w-2.5 rounded-full border border-[#111111]/25`) with color tooltip.
- **Pricing**: Tabular numbers (`tabular-nums font-mono font-semibold text-[#111111]`) with currency prefix (`RM`).

### 3. Navigation Header (`src/components/Navbar.tsx`)
- Sticky header with subtle frosted backdrop blur (`bg-[#F5F4F0]/95 backdrop-blur-md`).
- Active navigation items feature a solid 1.5px bottom underline indicator.
- Search icon with keyboard shortcut disclosure (`/`).

---

## 6. RESPONSIVE BREAKPOINTS

MNC follows standard Tailwind CSS responsive conventions:

| Breakpoint | Viewport Width | Key Layout Adaptations |
|---|---|---|
| **Mobile (`default`)** | `< 640px` | 2-column product grid (`grid-cols-2`), full-screen mobile menu drawer, stacked hero CTAs |
| **Tablet (`sm`)** | `≥ 640px` | Enhanced horizontal spacing, inline search labels |
| **Desktop (`md`)** | `≥ 768px` | Full horizontal navigation links, 3-column product grid |
| **Large Desktop (`lg`)** | `≥ 1024px` | 4-column product grid, 12-column editorial split layouts |
| **Wide (`xl` / `2xl`)** | `≥ 1280px` | Constrained `max-w-7xl` content bounds with centered gutter |

---

## 7. ACCESSIBILITY STANDARDS (WCAG)

- **Color Contrast**: All primary text (`#111111`) on background (`#F5F4F0`) achieves a contrast ratio of **14.8:1**, far exceeding WCAG AAA (7:1).
- **Interactive Focus Rings**: All buttons, links, and product cards implement explicit `focus-visible:ring-2 focus-visible:ring-[#111111]` indicators.
- **Screen Reader Labels**: Icon-only buttons (search, modal close, drawer close) feature explicit `aria-label` tags.
