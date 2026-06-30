import { Search, X, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getProductImage } from '../utils/imageHelper';
import { allProducts, type Product } from '../data/products';

interface CartItem {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  quantity: number;
  icon: string;
}

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onAddToCart: (product: { id: string; name: string; category: string; price: number; originalPrice: number; icon: string }) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onProductClick: (product: Product) => void;
}

// Featured products for empty state
const FEATURED_IDS = [
  'fruit-1',   // Organic Alphonso Mangoes
  'nut-7',     // Organic Mixed Nuts Premium
  'salad-1',   // Classic Tropical Mix Bowl
];

const featuredProducts = FEATURED_IDS
  .map(id => allProducts.find(p => p.id === id))
  .filter(Boolean) as typeof allProducts;

export default function SearchOverlay({
  isOpen,
  onClose,
  cartItems,
  onAddToCart,
  searchQuery,
  setSearchQuery,
  onProductClick
}: SearchOverlayProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-[#FAF6F0]/95 z-50 p-4 sm:p-6 backdrop-blur-md flex flex-col justify-start items-center overflow-y-auto"
        >
          <div className="w-full max-w-2xl mt-8 sm:mt-16 mb-8">
            {/* Search Header */}
            <div className="flex justify-between items-center mb-6">
              <span className="font-serif text-xl sm:text-2xl font-bold text-neutral-900">Search Harvest & Co.</span>
              <button 
                onClick={() => { onClose(); setSearchQuery(''); }}
                className="p-2 text-neutral-500 hover:text-neutral-900 bg-white border border-neutral-200 rounded-full hover:bg-neutral-50 hover:border-neutral-300 shadow-sm transition-all cursor-pointer active:scale-95"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Input container */}
            <div className="relative flex items-center shadow-lg shadow-neutral-200/50 rounded-2xl">
              <Search className="absolute left-5 h-6 w-6 text-neutral-400" />
              <input 
                type="text"
                placeholder="Search for organic mangoes, premium walnuts, fresh salads..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-neutral-200 rounded-2xl py-4 sm:py-5 pl-14 pr-5 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#D45B0C] focus:ring-4 focus:ring-[#D45B0C]/10 transition-all text-base sm:text-lg font-medium"
                autoFocus
              />
            </div>

            {/* Empty State: Popular/Best Sellers */}
            {!searchQuery && (
              <div className="mt-10">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="h-4 w-4 text-[#D45B0C]" />
                  <span className="text-xs font-bold text-neutral-500 uppercase tracking-widest">
                    Best Sellers & Trending
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {featuredProducts.map((p) => (
                    <div 
                      key={p.id}
                      onClick={() => setSearchQuery(p.name)}
                      className="flex items-center gap-3 bg-white hover:bg-orange-50/50 p-3 rounded-xl border border-neutral-100 hover:border-[#D45B0C]/30 transition-all cursor-pointer group shadow-sm hover:shadow"
                    >
                      <div className="bg-[#FAF6F0] rounded-lg h-12 w-12 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                        {(() => {
                          const resolvedIcon = getProductImage(p.icon);
                          const isImg = resolvedIcon.includes('/') || resolvedIcon.includes('.') || resolvedIcon.startsWith('data:') || resolvedIcon.startsWith('http');
                          return isImg ? (
                            <img src={resolvedIcon} alt="" className="h-8 w-auto object-contain" />
                          ) : (
                            <span className="text-2xl select-none">{resolvedIcon}</span>
                          );
                        })()}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-neutral-900 group-hover:text-[#D45B0C] transition-colors">{p.name}</h4>
                        <p className="text-xs text-neutral-500">{p.category}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Popular Search Terms */}
                <div className="mt-8">
                  <span className="text-xs font-bold text-neutral-500 uppercase tracking-widest block mb-3.5">
                    Popular Searches
                  </span>
                  <div className="flex flex-wrap gap-2.5">
                    {['Alphonso Mangoes', 'Walnuts', 'Salads', 'Avocados'].map((term) => (
                      <button 
                        key={term}
                        onClick={() => setSearchQuery(term)}
                        className="px-4 py-2 rounded-full text-sm font-medium bg-white border border-neutral-200 hover:border-[#D45B0C] text-neutral-600 hover:text-[#D45B0C] transition-all cursor-pointer shadow-sm"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Dynamic Search Results preview */}
            {searchQuery && (
              <div className="mt-8 bg-white border border-neutral-100 rounded-3xl p-2 shadow-xl shadow-neutral-200/40">
                <div className="px-4 py-3 border-b border-neutral-100 flex justify-between items-center">
                  <span className="text-xs font-bold text-neutral-500 uppercase tracking-widest">
                    Search Results
                  </span>
                  <span className="text-xs font-semibold text-[#D45B0C] bg-orange-50 px-2 py-1 rounded-md">
                    {allProducts.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase())).length} found
                  </span>
                </div>
                
                <div className="max-h-[60vh] overflow-y-auto p-2 space-y-2">
                  {allProducts
                    .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map(p => (
                      <div 
                        key={p.id}
                        onClick={() => { onProductClick(p); onClose(); }}
                        className="flex items-center justify-between bg-white hover:bg-[#FAF6F0] p-3 rounded-2xl transition-colors border border-transparent hover:border-neutral-200 group cursor-pointer"
                      >
                        <div className="flex items-center gap-4">
                          <div className="bg-[#FAF6F0] group-hover:bg-white rounded-xl h-16 w-16 flex items-center justify-center flex-shrink-0 border border-neutral-100">
                            {(() => {
                              const resolvedIcon = getProductImage(p.icon);
                              const isImg = resolvedIcon.includes('/') || resolvedIcon.includes('.') || resolvedIcon.startsWith('data:') || resolvedIcon.startsWith('http');
                              return isImg ? (
                                <img src={resolvedIcon} alt="" className="h-10 w-auto object-contain drop-shadow-sm group-hover:scale-110 transition-transform duration-300" />
                              ) : (
                                <span className="text-3xl select-none group-hover:scale-110 transition-transform duration-300">{resolvedIcon}</span>
                              );
                            })()}
                          </div>
                          <div>
                            <h4 className="text-[15px] sm:text-base font-bold text-neutral-900 leading-snug">{p.name}</h4>
                            <p className="text-xs text-neutral-500 mt-0.5 font-medium">{p.category}</p>
                            
                            <div className="flex items-baseline gap-2 mt-1 sm:hidden">
                              <span className="text-sm font-bold text-[#D45B0C]">₹{p.price}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right hidden sm:block">
                            <span className="text-base font-bold text-[#D45B0C] block">₹{p.price}</span>
                            <span className="text-xs text-neutral-400 line-through block">₹{p.originalPrice}</span>
                          </div>
                          <button 
                            type="button"
                            onClick={(e) => { e.stopPropagation(); onAddToCart(p); onClose(); setSearchQuery(''); }}
                            className="bg-neutral-900 hover:bg-[#D45B0C] text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl cursor-pointer transition-colors shadow-md active:scale-95 flex-shrink-0"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    ))}
                  {allProducts.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                    <div className="text-center py-12 px-4">
                      <div className="text-4xl mb-4">🔍</div>
                      <h3 className="font-serif text-lg font-bold text-neutral-900 mb-2">No products found</h3>
                      <p className="text-sm text-neutral-500 max-w-sm mx-auto">We couldn't find any products matching "{searchQuery}". Try checking for typos or searching by category like "Fruits" or "Nuts".</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
