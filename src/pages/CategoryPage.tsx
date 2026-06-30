/**
 * CategoryPage – Premium category detail view for Harvest & Co.
 * 
 * Design principles:
 * - Visual-first hero with real product imagery
 * - Clean, minimal product cards (reduce cognitive load → faster purchase decisions)
 * - Product detail drawer for deep info on click
 * - Psychological anchoring: show original price, savings, and urgency
 */

import { useState, useMemo } from 'react';
import { 
  ArrowLeft, 
  ChevronDown, 
  Plus, 
  Minus, 
  Star, 
  SlidersHorizontal,
  X,
  Truck,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  type Product, 
  getProductsByCategory, 
  getCategoryBySlug, 
  getAllTags 
} from '../data/products';
import ProductCard from '../components/ProductCard';
import { getProductImage } from '../utils/imageHelper';

// @ts-ignore
import freshFruitImg from '../../assets/ff.png';
// @ts-ignore
import premiumNutsImg from '../../assets/n.png';
// @ts-ignore
import fruitSaladImg from '../../assets/bf.png';
// @ts-ignore
import fruitsHeroBg from '../../assets/fruits.png';
// @ts-ignore
import saladHeroBg from '../../assets/salad.png';
// @ts-ignore
import nutsHeroBg from '../../assets/nuts.png';
// @ts-ignore
import juicesHeroBg from '../../assets/juice.png';

interface CartItem {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  quantity: number;
  icon: string;
}

interface CategoryPageProps {
  categorySlug: string;
  cartItems: CartItem[];
  onAddToCart: (product: { id: string; name: string; category: string; price: number; originalPrice: number; icon: string }) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  onBack: () => void;
  onProductClick: (product: Product) => void;
}

type SortOption = 'popular' | 'price-low' | 'price-high' | 'rating';

// Map category slugs to their hero images
const categoryImages: Record<string, string> = {
  fruits: fruitsHeroBg,
  nuts: nutsHeroBg,
  salads: saladHeroBg,
  juices: juicesHeroBg,
};



export default function CategoryPage({ categorySlug, cartItems, onAddToCart, onUpdateQuantity, onBack, onProductClick }: CategoryPageProps) {
  const category = getCategoryBySlug(categorySlug);
  const products = getProductsByCategory(categorySlug);
  const allTagsList = useMemo(() => getAllTags(categorySlug), [categorySlug]);

  const [sortBy, setSortBy] = useState<SortOption>('popular');
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);

  const toggleTag = (tag: string) => {
    setActiveTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const displayProducts = useMemo(() => {
    let filtered = [...products];
    if (activeTags.length > 0) {
      filtered = filtered.filter(p => activeTags.some(tag => p.tags.includes(tag)));
    }
    switch (sortBy) {
      case 'price-low': filtered.sort((a, b) => a.price - b.price); break;
      case 'price-high': filtered.sort((a, b) => b.price - a.price); break;
      case 'rating': filtered.sort((a, b) => b.rating - a.rating); break;
      default: filtered.sort((a, b) => b.reviewCount - a.reviewCount); break;
    }
    return filtered;
  }, [products, activeTags, sortBy]);

  const sortLabels: Record<SortOption, string> = {
    popular: 'Popular',
    'price-low': 'Price: Low → High',
    'price-high': 'Price: High → Low',
    rating: 'Top Rated',
  };

  if (!category) return null;

  const heroImage = categoryImages[categorySlug];
  const getCartItem = (productId: string) => cartItems.find(item => item.id === productId);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="bg-[#F7F7F7] min-h-screen"
    >

      {/* HERO SECTION */}
      <div
        className="relative overflow-hidden bg-neutral-950"
        style={{ minHeight: 'clamp(280px, 45vw, 480px)' }}
      >
        {heroImage && (
          <div className="absolute inset-0 z-0">
            <img 
              src={heroImage} 
              alt="" 
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                opacity: 0.7,
              }}
            />
            {/* Dark left-side gradient for text readability */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to right, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.3) 55%, transparent 100%)'
            }} />
          </div>
        )}

        {/* Bottom fade — blends hero into the product cards background (#FAF6F0) */}
        <div className="absolute bottom-0 left-0 right-0 h-40 z-[1] bg-gradient-to-t from-[#FAF6F0] to-transparent pointer-events-none" />

        <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden select-none">
          <span className="absolute top-[15%] right-[10%] text-7xl md:text-8xl opacity-[0.06] rotate-12">{category.icon}</span>
          <span className="absolute bottom-[20%] left-[5%] text-6xl opacity-[0.04] -rotate-12">{category.icon}</span>
          <span className="absolute top-[40%] right-[30%] text-5xl opacity-[0.03] rotate-45">{category.icon}</span>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12 sm:pt-32 sm:pb-16">
            <div className="flex items-center justify-between mb-8 sm:mb-12">
              <button 
                onClick={onBack}
                className="inline-flex items-center gap-2.5 text-neutral-200 hover:text-white transition-all duration-300 text-sm font-semibold cursor-pointer group bg-black/20 hover:bg-black/40 px-5 py-2.5 rounded-full backdrop-blur-md border border-white/15 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_32px_-4px_rgba(0,0,0,0.4)] active:scale-95 origin-left"
              >
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1.5 transition-transform duration-300" />
                <span className="tracking-wide">Back to Home</span>
              </button>
            </div>

            <div className="max-w-2xl text-left">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className="font-serif text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-white tracking-tight leading-[1.15]"
              >
                {category.tagline}
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="text-neutral-300 text-sm sm:text-[15px] leading-relaxed mt-4 max-w-lg font-light"
              >
                {category.description}
              </motion.p>
            </div>
          </div>
        </div>

      {/* FILTER & SORT BAR */}
      <div className="sticky top-0 z-20 bg-[#FAF6F0]/95 backdrop-blur-md border-b border-neutral-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-3">
          
          {/* Left Side: All Products & Popular Filters dropdown */}
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <button
              onClick={() => setActiveTags([])}
              className={`flex-shrink-0 text-xs font-semibold px-4.5 py-2.5 rounded-full border transition-all cursor-pointer ${
                activeTags.length === 0
                  ? 'bg-neutral-900 text-white border-neutral-900'
                  : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-400'
              }`}
            >
              All Products
            </button>

            {/* Popular Filters Dropdown */}
            <div className="relative z-30">
              <button
                onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
                className={`flex items-center gap-1.5 text-xs font-semibold px-4.5 py-2.5 rounded-full border transition-all cursor-pointer whitespace-nowrap ${
                  activeTags.length > 0
                    ? 'bg-[#D45B0C]/10 text-[#D45B0C] border-[#D45B0C]/30'
                    : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400'
                }`}
              >
                <span>Popular Filters</span>
                {activeTags.length > 0 && (
                  <span className="bg-[#D45B0C] text-white text-[10px] h-4.5 min-w-4.5 px-1 rounded-full flex items-center justify-center font-bold">
                    {activeTags.length}
                  </span>
                )}
                <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${isFilterDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu Panel */}
              <AnimatePresence>
                {isFilterDropdownOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-20 cursor-default" 
                      onClick={() => setIsFilterDropdownOpen(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 top-11 bg-white rounded-2xl shadow-xl border border-neutral-200/80 p-4.5 z-30 min-w-[280px] sm:min-w-[340px]"
                    >
                      <div className="flex items-center justify-between mb-3 border-b border-neutral-100 pb-2">
                        <span className="text-xs font-bold text-neutral-800 uppercase tracking-wider">Filter by Tags</span>
                        {activeTags.length > 0 && (
                          <button 
                            onClick={() => setActiveTags([])}
                            className="text-[10px] font-bold text-[#D45B0C] hover:underline cursor-pointer"
                          >
                            Clear All
                          </button>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
                        {allTagsList.map(tag => {
                          const isSelected = activeTags.includes(tag);
                          return (
                            <button
                              key={tag}
                              onClick={() => toggleTag(tag)}
                              className={`flex items-center justify-between text-left px-3 py-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-[#D45B0C]/10 text-[#D45B0C] border-[#D45B0C]/35 font-semibold'
                                  : 'bg-neutral-50 text-neutral-600 border-neutral-150 hover:bg-neutral-100 hover:border-neutral-300'
                              }`}
                            >
                              <span>{tag}</span>
                              {isSelected && <Check className="h-3.5 w-3.5 text-[#D45B0C]" />}
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Side: Sort */}
          <div className="relative flex-shrink-0 z-20">
            <button
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="flex items-center gap-1.5 text-xs font-medium text-neutral-700 bg-white border border-neutral-200 px-3.5 py-2.5 rounded-full hover:border-neutral-400 transition-colors cursor-pointer"
            >
              <SlidersHorizontal className="h-3 w-3" />
              <span className="hidden sm:inline">{sortLabels[sortBy]}</span>
              <ChevronDown className={`h-3 w-3 transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isSortOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.97 }}
                  className="absolute right-0 top-11 bg-white rounded-xl shadow-xl border border-neutral-200 overflow-hidden z-30 min-w-[180px]"
                >
                  {(Object.keys(sortLabels) as SortOption[]).map(option => (
                    <button
                      key={option}
                      onClick={() => { setSortBy(option); setIsSortOpen(false); }}
                      className={`block w-full text-left px-4 py-2.5 text-sm transition-colors cursor-pointer ${
                        sortBy === option 
                          ? 'bg-orange-50 text-[#D45B0C] font-semibold' 
                          : 'text-neutral-700 hover:bg-neutral-50'
                      }`}
                    >
                      {sortLabels[option]}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Active Filters Row (displayed conditionally beneath the main bar) */}
        {activeTags.length > 0 && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-3.5 flex flex-wrap items-center gap-2 border-t border-neutral-100/50 pt-2.5">
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mr-1">Active:</span>
            {activeTags.map(tag => (
              <span key={tag} className="flex items-center gap-1 bg-[#D45B0C]/10 border border-[#D45B0C]/20 text-[#D45B0C] text-xs font-semibold pl-3 pr-1.5 py-1 rounded-full select-none">
                {tag}
                <button 
                  onClick={() => toggleTag(tag)} 
                  className="hover:bg-[#D45B0C]/20 rounded-full p-0.5 transition-colors cursor-pointer text-[#D45B0C] ml-1"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </span>
            ))}
            <button 
              onClick={() => setActiveTags([])}
              className="text-xs text-neutral-500 hover:text-neutral-900 hover:underline font-semibold ml-2 cursor-pointer"
            >
              Clear All
            </button>
          </div>
        )}
      </div>

      {/* PRODUCT GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        <p className="text-xs text-neutral-400 mb-6 font-medium tracking-wide uppercase">
          {displayProducts.length} {displayProducts.length === 1 ? 'product' : 'products'}
          {activeTags.length > 0 && <span className="ml-1 text-[#D45B0C]">· Filtered</span>}
        </p>

        {displayProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-neutral-100">
            <span className="text-5xl mb-4 block">🔍</span>
            <h3 className="font-serif text-xl font-bold text-neutral-900 mb-2">No products found</h3>
            <p className="text-neutral-500 text-sm mb-6">Try a different filter.</p>
            <button onClick={() => setActiveTags([])} className="bg-[#D45B0C] hover:bg-[#B84E0A] text-white font-semibold text-sm px-6 py-3 rounded-full transition-all cursor-pointer">
              Show All
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
            {displayProducts.map((product, idx) => {
              const cartItem = getCartItem(product.id);
              const qty = cartItem ? cartItem.quantity : 0;

              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
                >
                  <ProductCard
                    product={product}
                    quantityInCart={qty}
                    onAddToCart={onAddToCart}
                    onUpdateQuantity={onUpdateQuantity}
                    onClick={() => onProductClick(product)}
                  />
                </motion.div>
              );
            })}
          </div>
        )}
      </div>



    </motion.div>
  );
}
