import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';

import { CartItem, ProductColor } from '../types/product';
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

// Validate stored cart data before hydrating from localStorage.
const isValidCartItem = (item: unknown): item is CartItem => {
  if (!item || typeof item !== 'object') {
    return false;
  }

  const value = item as Record<string, unknown>;

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
    Boolean(value.color) &&
    typeof value.image === 'string' &&
    typeof value.slug === 'string'
  );
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const isStrictPreview =
    STOREFRONT_CONFIG.mode === 'PREVIEW' && !STOREFRONT_CONFIG.allowAddToCart;

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

      return parsed.filter(isValidCartItem);
    } catch {
      return [];
    }
  });

  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  // Synchronize cart storage with localStorage
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

  // Add item to shopping bag with compound key deduplication
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
    if (!STOREFRONT_CONFIG.allowAddToCart) {
      return;
    }

    const itemKey = `${itemData.productId}-${itemData.size}-${itemData.color.name}`;

    setItems((previous) => {
      const existingIndex = previous.findIndex((i) => i.id === itemKey);
      if (existingIndex > -1) {
        const next = [...previous];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
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
          quantity,
          image: itemData.image,
          slug: itemData.slug,
        },
      ];
    });

    // Provide instant feedback by opening the cart drawer
    setIsCartDrawerOpen(true);
  };

  // Update quantity only when quantity changes are permitted
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

          return nextQuantity > 0
            ? { ...item, quantity: nextQuantity }
            : null;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  // Remove an item from the shopping bag
  const removeFromCart = (id: string) => {
    if (!STOREFRONT_CONFIG.allowCartQuantityChanges) {
      return;
    }

    setItems((previous) => previous.filter((item) => item.id !== id));
  };

  // Clear all items from the bag
  const clearCart = () => {
    setItems([]);
  };

  // Calculate cart subtotal in MYR
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Calculate total quantity of garments
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
