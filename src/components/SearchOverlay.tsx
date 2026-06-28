import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getProductImage } from '../utils/imageHelper';

interface CartItem {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  quantity: number;
  icon: string;
}

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  icon: string;
}

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onAddToCart: (product: Product) => void;
  shopProducts: Product[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function SearchOverlay({
  isOpen,
  onClose,
  cartItems,
  onAddToCart,
  shopProducts,
  searchQuery,
  setSearchQuery
}: SearchOverlayProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/95 z-50 p-6 backdrop-blur-md flex flex-col justify-start items-center"
        >
          <div className="w-full max-w-2xl mt-12 md:mt-24">
            {/* Search Header */}
            <div className="flex justify-between items-center mb-6">
              <span className="font-serif text-lg text-neutral-400">Search Harvest & Co.</span>
              <button 
                onClick={() => { onClose(); setSearchQuery(''); }}
                className="p-1.5 text-neutral-400 hover:text-white bg-white/5 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Input container */}
            <div className="relative flex items-center">
              <Search className="absolute left-4 h-6 w-6 text-neutral-400" />
              <input 
                type="text"
                placeholder="Search for organic mangoes, walnuts, forest honey..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-2xl py-4.5 pl-13 pr-4 text-white placeholder-neutral-500 focus:outline-none focus:border-[#D45B0C] focus:bg-white/[0.05] transition-all text-base sm:text-lg"
                autoFocus
              />
            </div>

            {/* Popular recommendations */}
            <div className="mt-8">
              <span className="text-xs font-semibold text-neutral-500 uppercase tracking-widest block mb-3.5">
                Popular Searches
              </span>
              <div className="flex flex-wrap gap-2.5">
                {['Alphonso Mangoes', 'Kashmiri Walnuts', 'Wildflower Honey', 'Cold-Pressed Oils', 'Fresh Avocados', 'Sourced Spices'].map((term) => (
                  <button 
                    key={term}
                    onClick={() => setSearchQuery(term)}
                    className="px-4 py-2 rounded-xl text-sm bg-white/[0.02] border border-white/[0.05] hover:border-white/20 text-neutral-300 hover:text-white transition-all cursor-pointer"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic Search Results preview */}
            {searchQuery && (
              <div className="mt-8 border-t border-white/[0.08] pt-6">
                <span className="text-xs font-semibold text-neutral-400 uppercase tracking-widest block mb-4">
                  Matching Seasonal Picks
                </span>
                <div className="space-y-3">
                  {shopProducts
                    .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map(p => (
                      <div 
                        key={p.id}
                        className="flex items-center justify-between bg-white/[0.01] hover:bg-white/[0.03] p-3.5 rounded-xl border border-white/[0.04] transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="text-2xl select-none flex-shrink-0 flex items-center justify-center h-10 w-10">
                            {(() => {
                              const resolvedIcon = getProductImage(p.icon);
                              const isImg = resolvedIcon.includes('/') || resolvedIcon.includes('.') || resolvedIcon.startsWith('data:') || resolvedIcon.startsWith('http');
                              return isImg ? (
                                <img src={resolvedIcon} alt="" className="h-8 w-auto object-contain" />
                              ) : (
                                <span>{resolvedIcon}</span>
                              );
                            })()}
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-white">{p.name}</h4>
                            <p className="text-xs text-neutral-400 mt-0.5">Category: {p.category} • Save 40%</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <span className="text-sm font-bold text-[#D45B0C]">₹{p.price}</span>
                            <span className="text-xs text-neutral-500 line-through block">₹{p.originalPrice}</span>
                          </div>
                          <button 
                            onClick={() => { onAddToCart(p); onClose(); }}
                            className="bg-[#D45B0C] hover:bg-[#B84E0A] text-white text-xs font-semibold px-3 py-2 rounded-lg cursor-pointer"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    ))}
                  {shopProducts.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                    <p className="text-sm text-neutral-500 text-center py-6">No seasonal products match your query. Try searching for "Mango" or "Walnuts"!</p>
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
