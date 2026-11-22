
import React, { useState, useEffect } from 'react';

import { CartProvider } from './context/CartContext';
import { useCart } from './hooks/useCart';

import { PRODUCTS } from './data/products';
import { COLLECTIONS } from './data/collections';

import { ProductCategory, CartItem } from './types/product';

import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { CartDrawer } from './components/CartDrawer';
import { SizeGuideModal } from './components/SizeGuideModal';

import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { Collections } from './pages/Collections';
import { ProductDetail } from './pages/ProductDetail';
import { About } from './pages/About';
import { Cart } from './pages/Cart';
import { Checkout, CustomerDetails } from './pages/Checkout';
import { OrderConfirmation } from './pages/OrderConfirmation';

interface CompletedOrder {
  orderNumber: string;
  customerDetails: CustomerDetails;
  items: CartItem[];
  subtotal: number;
}

function AppContent() {
  const { items, subtotal, clearCart } = useCart();

  const [activePage, setActivePage] = useState<string>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('All');
  const [selectedCollectionId, setSelectedCollectionId] = useState<string>('mnc-essentials');

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  const [completedOrder, setCompletedOrder] = useState<CompletedOrder | null>(null);

  // Scroll to top on page navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage, selectedProductId]);

  // Global hotkey: press '/' to open search from anywhere
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === '/' &&
        !isSearchOpen &&
        !(
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement
        )
      ) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen]);

  const handleNavigate = (
    page: string,
    params?: {
      category?: string;
      collection?: string;
      productId?: string;
    }
  ) => {
    if (params?.productId) {
      setSelectedProductId(params.productId);
      setActivePage('product-detail');
      return;
    }

    if (params?.category) {
      setSelectedCategory(params.category as ProductCategory);
    } else {
      setSelectedCategory('All');
    }

    if (page === 'collections') {
      setSelectedCollectionId(params?.collection || 'mnc-essentials');
    } else if (params?.collection) {
      setSelectedCollectionId(params.collection);
    }

    setActivePage(page);
  };

  const handleSelectProduct = (productId: string) => {
    setSelectedProductId(productId);
    setActivePage('product-detail');
  };

  const currentProduct =
    PRODUCTS.find((product) => product.id === selectedProductId) ||
    PRODUCTS[0];

  const handleOpenCheckout = () => {
    setActivePage('checkout');
  };

  // Save the order snapshot before clearing the shopping bag
  const handleSubmitOrder = (customerDetails: CustomerDetails) => {
    if (items.length === 0) return;

    const order: CompletedOrder = {
      orderNumber: `MNC-${Date.now().toString().slice(-8)}`,
      customerDetails,
      items: [...items],
      subtotal,
    };

    setCompletedOrder(order);
    clearCart();
    setActivePage('order-confirmation');
  };

  const handleContinueShopping = () => {
    setCompletedOrder(null);
    setActivePage('shop');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F4F0] text-[#111111]">

      {/* Global Announcement Bar */}
      <AnnouncementBar />

      {/* Global Navigation */}
      <Navbar
        activePage={activePage}
        onNavigate={handleNavigate}
        onSearchOpen={() => setIsSearchOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activePage === 'home' && (
          <Home
            products={PRODUCTS}
            collections={COLLECTIONS}
            onSelectProduct={handleSelectProduct}
            onNavigate={handleNavigate}
          />
        )}

        {activePage === 'shop' && (
          <Shop
            products={PRODUCTS}
            onSelectProduct={handleSelectProduct}
            initialCategory={selectedCategory}
          />
        )}

        {activePage === 'collections' && (
          <Collections
            collections={COLLECTIONS}
            products={PRODUCTS}
            onSelectProduct={handleSelectProduct}
            selectedCollectionId={selectedCollectionId}
            onNavigate={handleNavigate}
          />
        )}

        {activePage === 'product-detail' && currentProduct && (
          <ProductDetail
            product={currentProduct}
            allProducts={PRODUCTS}
            onSelectProduct={handleSelectProduct}
            onBack={() => setActivePage('shop')}
            onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
            onOpenCheckout={handleOpenCheckout}
          />
        )}

        {activePage === 'about' && (
          <About onNavigate={handleNavigate} />
        )}

        {activePage === 'cart' && (
          <Cart
            onNavigate={handleNavigate}
            onOpenCheckout={handleOpenCheckout}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {activePage === 'checkout' && (
          <Checkout
            onBackToCart={() => setActivePage('cart')}
            onContinueShopping={handleContinueShopping}
            onSubmitOrder={handleSubmitOrder}
          />
        )}

        {activePage === 'order-confirmation' && completedOrder && (
          <OrderConfirmation
            orderNumber={completedOrder.orderNumber}
            customerDetails={completedOrder.customerDetails}
            items={completedOrder.items}
            subtotal={completedOrder.subtotal}
            onContinueShopping={handleContinueShopping}
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={handleSelectProduct}
      />

      {/* Cart Drawer */}
      <CartDrawer
        onOpenCheckout={handleOpenCheckout}
        onNavigateToCart={() => setActivePage('cart')}
        onContinueShopping={() => setActivePage('shop')}
      />

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        category={currentProduct?.category}
      />

    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
