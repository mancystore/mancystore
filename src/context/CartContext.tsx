
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';

import { CartItem, ProductColor } from '../types/product';
import { PRODUCTS } from '../data/products';
import { STOREFRONT_CONFIG } from '../config/storefront.config';

interface CartContextType {
  items: CartItem[];

  addToCart: (
    item: {
      productId: string;
      name: string;
      price: number;
      size: string;
      color: ProductColor;
      image: string;
      slug: string;
    },
    quantity?: number
  ) => void;

  updateQuantity: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;

  subtotal: number;
  totalItems: number;

  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  openCartDrawer: () => void;
  closeCartDrawer: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = 'mnc_streetwear_cart_demo';

// Retrieve available stock for a specific product variant.
const getAvailableStock = (
  productId: string,
  size: string,
  colorName: string
): number => {
  const product = PRODUCTS.find((item) => item.id === productId);

  if (!product) {
    return 0;
  }

  if (product.variants?.length) {
    const variant = product.variants.find(
      (item) =>
        item.size === size &&
        item.color.name === colorName
    );

    return variant?.stockCount ?? 0;
  }

  return product.stockCount ?? 0;
};

// Validate stored cart data before hydrating from localStorage.
const isValidCartItem = (item: unknown): item is CartItem => {
  if (!item || typeof item !== 'object') {
    return false;
  }

  const value = item as Record<string, unknown>;

  const color =
    typeof value.color === 'object' && value.color !== null
      ? (value.color as Record<string, unknown>)
      : null;

  return (
    typeof value.id === 'string' &&
    typeof value.productId === 'string' &&
    typeof value.name === 'string' &&
    typeof value.price === 'number' &&
    Number.isFinite(value.price) &&
    value.price >= 0 &&
    typeof value.quantity === 'number' &&
    Number.isInteger(value.quantity) &&
    value.quantity > 0 &&
    typeof value.size === 'string' &&
    color !== null &&
    typeof color.name === 'string' &&
    typeof color.hex === 'string' &&
    typeof value.image === 'string' &&
    typeof value.slug === 'string'
  );
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const isStrictPreview =
    STOREFRONT_CONFIG.mode === 'PREVIEW' &&
    !STOREFRONT_CONFIG.allowAddToCart;

  const [items, setItems] = useState<CartItem[]>(() => {
    if (isStrictPreview) {
      return [];
    }

    try {
      const stored = localStorage.getItem(STORAGE_KEY);

      if (!stored) {
        return [];
      }

      const parsed: unknown = JSON.parse(stored);

      if (!Array.isArray(parsed)) {
        return [];
      }

      // Remove invalid, unavailable and sold-out variants.
      // Also correct saved quantities if they exceed available stock.
      return parsed
        .filter(isValidCartItem)
        .flatMap((item) => {
          const availableStock = getAvailableStock(
            item.productId,
            item.size,
            item.color.name
          );

          if (availableStock <= 0) {
            return [];
          }

          return [
            {
              ...item,
              quantity: Math.min(item.quantity, availableStock),
            },
          ];
        });
    } catch {
      return [];
    }
  });

  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  // Synchronize cart storage with localStorage.
  useEffect(() => {
    if (isStrictPreview) {
      setItems([]);
      setIsCartDrawerOpen(false);

      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        // Ignore unavailable LocalStorage.
      }

      return;
    }

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Ignore LocalStorage quota errors.
    }
  }, [items, isStrictPreview]);

  // Add item to shopping bag with stock validation.
  // The drawer remains closed so customers can continue browsing.
  const addToCart = (
    itemData: {
      productId: string;
      name: string;
      price: number;
      size: string;
      color: ProductColor;
      image: string;
      slug: string;
    },
    quantity: number = 1
  ) => {
    if (
      !STOREFRONT_CONFIG.allowAddToCart ||
      !Number.isInteger(quantity) ||
      quantity <= 0
    ) {
      return;
    }

    const availableStock = getAvailableStock(
      itemData.productId,
      itemData.size,
      itemData.color.name
    );

    if (availableStock <= 0) {
      return;
    }

    const itemKey = `${itemData.productId}-${itemData.size}-${itemData.color.name}`;

    setItems((previous) => {
      const existingIndex = previous.findIndex(
        (item) => item.id === itemKey
      );

      if (existingIndex > -1) {
        const next = [...previous];
        const existingItem = next[existingIndex];

        next[existingIndex] = {
          ...existingItem,
          quantity: Math.min(
            existingItem.quantity + quantity,
            availableStock
          ),
        };

        return next;
      }

      return [
        ...previous,
        {
          id: itemKey,
          productId: itemData.productId,
          name: itemData.name,
          price: itemData.price,
          size: itemData.size,
          color: itemData.color,
          quantity: Math.min(quantity, availableStock),
          image: itemData.image,
          slug: itemData.slug,
        },
      ];
    });

    // Do not automatically open the shopping bag drawer.
  };

  // Update quantity without exceeding available variant stock.
  const updateQuantity = (id: string, delta: number) => {
    if (
      !STOREFRONT_CONFIG.allowCartQuantityChanges ||
      !Number.isInteger(delta) ||
      delta === 0
    ) {
      return;
    }

    setItems((previous) =>
      previous
        .map((item) => {
          if (item.id !== id) {
            return item;
          }

          const nextQuantity = item.quantity + delta;

          if (nextQuantity <= 0) {
            return null;
          }

          // Only enforce stock limits when increasing quantity.
          if (delta > 0) {
            const availableStock = getAvailableStock(
              item.productId,
              item.size,
              item.color.name
            );

            if (availableStock <= item.quantity) {
              return item;
            }

            return {
              ...item,
              quantity: Math.min(nextQuantity, availableStock),
            };
          }

          return {
            ...item,
            quantity: nextQuantity,
          };
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  // Remove an item from the shopping bag.
  const removeFromCart = (id: string) => {
    if (!STOREFRONT_CONFIG.allowCartQuantityChanges) {
      return;
    }

    setItems((previous) => previous.filter((item) => item.id !== id));
  };

  // Clear all items from the bag.
  const clearCart = () => {
    setItems([]);
  };

  // Calculate cart subtotal in MYR.
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Calculate total quantity of garments.
  const totalItems = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const openCartDrawer = () => {
    setIsCartDrawerOpen(true);
  };

  const closeCartDrawer = () => {
    setIsCartDrawerOpen(false);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        subtotal,
        totalItems,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        openCartDrawer,
        closeCartDrawer,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};
