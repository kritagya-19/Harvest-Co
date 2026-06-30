import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PromoModal from './components/PromoModal';
import SearchOverlay from './components/SearchOverlay';

// Sections
import HeroSection from './sections/home/HeroSection';
import CategorySection from './sections/home/CategorySection';
import BestSellersSection from './sections/home/BestSellersSection';
import WhyChooseSection from './sections/home/WhyChooseSection';

// Pages
import CategoryPage from './pages/CategoryPage';
import CheckoutPage from './pages/CheckoutPage';

import ProductModal from './components/ProductModal';
import { type Product } from './data/products';

interface CartItem {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  quantity: number;
  icon: string;
}

export default function App() {
  // Interactive UI states
  const [isPromoOpen, setIsPromoOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Navigate to a category page
  const navigateToCategory = (slug: string) => {
    setActiveCategory(slug);
    setIsCheckoutOpen(false);
    window.scrollTo({ top: 0 });
    window.history.pushState({ category: slug }, '', `#category/${slug}`);
  };

  // Navigate to checkout
  const navigateToCheckout = () => {
    setIsCheckoutOpen(true);
    window.scrollTo({ top: 0 });
    window.history.pushState({ checkout: true }, '', '#checkout');
  };

  // Browser back-button support
  useEffect(() => {
    const handlePop = (e: PopStateEvent) => {
      if (!e.state) {
        setActiveCategory(null);
        setIsCheckoutOpen(false);
      } else {
        if (e.state.category) {
          setActiveCategory(e.state.category);
          setIsCheckoutOpen(false);
        } else if (e.state.checkout) {
          setIsCheckoutOpen(true);
          setActiveCategory(null);
        }
      }
    };
    window.addEventListener('popstate', handlePop);
    return () => window.removeEventListener('popstate', handlePop);
  }, []);

  // Cart state starting with reference items
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const totalCartQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const shopProducts = [
    { id: 'p1', name: 'Organic Alphonso Mangoes (1 Box)', category: 'Fruits', price: 599, originalPrice: 999, icon: '🥭' },
    { id: 'p2', name: 'Premium Kashmiri Walnuts (500g)', category: 'Nuts', price: 400, originalPrice: 649, icon: '🌰' },
    { id: 'p3', name: 'Raw Forest Wildflower Honey (500g)', category: 'Pantry', price: 299, originalPrice: 499, icon: '🍯' },
    { id: 'p4', name: 'Cold-Pressed Mustard Oil (1L)', category: 'Pantry', price: 199, originalPrice: 299, icon: '🏺' }
  ];

  const handleAddToCart = (product: typeof shopProducts[0]) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    // Do NOT auto-open cart — user can open it via the cart icon in the Navbar
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => {
      return prev.map(item => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + delta };
        }
        return item;
      }).filter(item => item.quantity > 0);
    });
  };

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleResetCart = () => {
    setCartItems([]);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans relative overflow-x-hidden selection:bg-[#D45B0C] selection:text-white">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-orange-900/10 rounded-full blur-[150px] pointer-events-none -translate-y-1/2 z-0"></div>
      <div className="absolute top-[20%] right-1/4 w-[600px] h-[600px] bg-emerald-950/5 rounded-full blur-[180px] pointer-events-none z-0"></div>

      {/* Navbar Header */}
      {!isCheckoutOpen && (
        <Navbar 
          totalCartQuantity={totalCartQuantity}
          onCartOpen={navigateToCheckout}
          onSearchOpen={() => setIsSearchOpen(true)}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          isCategoryPage={!!activeCategory}
        />
      )}

      {/* Main Content (Home sections or Category page) */}
      <AnimatePresence mode="wait">
        {!activeCategory ? (
          <motion.div
            key="home-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <HeroSection />
            <CategorySection onNavigateToCategory={navigateToCategory} />
            <BestSellersSection 
              cartItems={cartItems} 
              onAddToCart={handleAddToCart} 
              onUpdateQuantity={updateQuantity}
              onNavigateToCategory={navigateToCategory}
              onProductClick={setSelectedProduct}
            />
            <WhyChooseSection />
          </motion.div>
        ) : (
          <motion.div
            key={`category-${activeCategory}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <CategoryPage
              categorySlug={activeCategory}
              cartItems={cartItems}
              onAddToCart={handleAddToCart}
              onUpdateQuantity={updateQuantity}
              onProductClick={setSelectedProduct}
              onBack={() => {
                setActiveCategory(null);
                window.history.back();
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <Footer onNavigateToCategory={navigateToCategory} />

      <AnimatePresence>
        {isCheckoutOpen && (
          <CheckoutPage
            cartItems={cartItems}
            onUpdateQuantity={updateQuantity}
            onRemoveItem={removeItem}
            onBack={() => {
              setIsCheckoutOpen(false);
              window.history.back();
            }}
            onBrowseProducts={() => {
              setIsCheckoutOpen(false);
              setActiveCategory(null);
              window.history.pushState(null, '', '/');
              setTimeout(() => {
                document.getElementById('shop-categories')?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            onOrderComplete={() => setCartItems([])}
          />
        )}
      </AnimatePresence>

      {/* Drawers / Overlays / Modals */}
      <PromoModal 
        isOpen={isPromoOpen}
        onClose={() => setIsPromoOpen(false)}
        cartItems={cartItems}
        onAddToCart={handleAddToCart}
        shopProducts={shopProducts}
      />

      <SearchOverlay 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        cartItems={cartItems}
        onAddToCart={handleAddToCart}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onProductClick={setSelectedProduct}
      />

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        quantityInCart={selectedProduct ? (cartItems.find(item => item.id === selectedProduct.id)?.quantity || 0) : 0}
        onAddToCart={handleAddToCart}
        onUpdateQuantity={updateQuantity}
      />
    </div>
  );
}
