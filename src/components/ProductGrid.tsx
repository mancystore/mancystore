import React, { useState, useMemo } from 'react';
import { Product, ProductCategory } from '../types/product';
import { ProductCard } from './ProductCard';
import { SlidersHorizontal } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  onSelectProduct: (productId: string) => void;
  initialCategory?: ProductCategory;
  initialSort?: string;
  showFilters?: boolean;
  title?: string;
  subtitle?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onSelectProduct,
  initialCategory = 'All',
  initialSort = 'featured',
  showFilters = true,
  title,
  subtitle,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>(initialCategory);
  const [sortBy, setSortBy] = useState<string>(initialSort);

  // Sync category when navigated with a category parameter
  React.useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  const categories: ProductCategory[] = ['All', 'Hoodies', 'Tees'];

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // Filter by Category
    if (selectedCategory !== 'All') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'featured':
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return result;
  }, [products, selectedCategory, sortBy]);

  return (
    <div className="w-full">
      {/* Optional Header */}
      {(title || subtitle) && (
        <div className="mb-8">
          {title && (
            <h2 className="text-2xl sm:text-3xl font-display font-black uppercase tracking-tight text-[#111111]">
              {title}
            </h2>
          )}
          {subtitle && <p className="text-xs font-mono text-[#858585] mt-1">{subtitle}</p>}
        </div>
      )}

      {/* Filter and Sort Toolbar */}
      {showFilters && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-[#111111]/12">
          {/* Category Tabs (Segmented Buttons with counts) */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const count =
                cat === 'All'
                  ? products.length
                  : products.filter((p) => p.category === cat).length;

              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer border ${
                    selectedCategory === cat
                      ? 'bg-[#111111] text-[#F5F4F0] border-[#111111] font-bold'
                      : 'bg-transparent text-[#858585] border-transparent hover:text-[#111111] hover:border-[#111111]/20'
                  }`}
                >
                  <span>{cat}</span>
                  <span className="ml-1.5 text-[11px] opacity-75">({count})</span>
                </button>
              );
            })}
          </div>

          {/* Sort Controls & Count */}
          <div className="flex items-center justify-between w-full sm:w-auto gap-4 text-xs">
            <span className="text-[#858585] font-mono text-xs tabular-nums whitespace-nowrap">
              {filteredAndSortedProducts.length} Silhouettes
            </span>

            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#858585]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#FFFFFF] border border-[#111111]/15 px-3 py-1.5 text-xs font-mono uppercase text-[#111111] outline-none cursor-pointer hover:border-[#111111]/40"
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Alphabetical A-Z</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Product Grid */}
      {filteredAndSortedProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 sm:gap-x-6 gap-y-10 sm:gap-y-14">
          {filteredAndSortedProducts.map((product, idx) => (
            <ProductCard
              key={product.id}
              product={product}
              index={idx}
              onSelect={onSelectProduct}
            />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center border border-dashed border-[#111111]/15 bg-[#EAE8E2]/40">
          <p className="text-xs font-mono uppercase tracking-widest text-[#111111]">
            No garments matching selected criteria
          </p>
          <button
            onClick={() => setSelectedCategory('All')}
            className="mt-4 px-4 py-2 bg-[#111111] text-[#F5F4F0] text-xs font-mono uppercase tracking-widest cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
