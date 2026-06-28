import { useState } from 'react';
import { Gift, X, Check, Copy } from 'lucide-react';
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

interface PromoModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onAddToCart: (product: Product) => void;
  shopProducts: Product[];
}

export default function PromoModal({
  isOpen,
  onClose,
  cartItems,
  onAddToCart,
  shopProducts
}: PromoModalProps) {
  const [isCopied, setIsCopied] = useState(false);

  // Copy Promo Code function
  const handleCopyPromo = () => {
    navigator.clipboard.writeText('HARVEST40');
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-50 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-x-4 top-1/2 -translate-y-1/2 md:max-w-lg md:mx-auto bg-zinc-950 border border-white/[0.08] rounded-2xl p-6 z-50 shadow-2xl overflow-hidden"
          >
            {/* Promo Modal Header */}
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2.5 bg-orange-950/30 text-[#D45B0C] px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
                <Gift className="h-3.5 w-3.5" />
                Exclusive Offer
              </div>
              <button 
                onClick={onClose}
                className="p-1 text-neutral-400 hover:text-white rounded-full hover:bg-white/5 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Promo Modal Body */}
            <div className="mt-5 text-center">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#EDE0D4]">Seasonal Savings Card</h3>
              <p className="text-neutral-400 text-xs sm:text-sm mt-2 leading-relaxed">
                Enjoy up to <span className="text-[#D45B0C] font-semibold">40% OFF</span> our handpicked collection of fresh seasonal items. Tap below to copy your checkout coupon code.
              </p>

              {/* Simulated Coupon Box */}
              <div className="mt-6 p-4 bg-white/[0.02] border border-dashed border-white/20 rounded-xl flex items-center justify-between gap-4 max-w-sm mx-auto">
                <div className="text-left">
                  <span className="text-[10px] text-neutral-500 uppercase tracking-widest block">PROMO CODE</span>
                  <span className="text-lg font-mono font-bold tracking-wider text-white">HARVEST40</span>
                </div>
                <button 
                  onClick={handleCopyPromo}
                  className="flex items-center gap-2 bg-[#D45B0C] hover:bg-[#B84E0A] px-4 py-2 rounded-lg text-xs font-semibold text-white transition-all cursor-pointer"
                >
                  {isCopied ? (
                    <>
                      <Check className="h-3.5 w-3.5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Sample Quick Shop items */}
            <div className="mt-8 border-t border-white/[0.08] pt-5">
              <span className="text-xs font-semibold text-neutral-400 uppercase tracking-widest block mb-3.5">
                Popular Seasonal Favorites (40% OFF)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {shopProducts.map((prod) => {
                  const isInCart = cartItems.some(i => i.id === prod.id);
                  return (
                    <div key={prod.id} className="bg-white/[0.01] border border-white/[0.05] p-3 rounded-xl flex items-center justify-between hover:bg-white/[0.02] transition-colors">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="text-2xl select-none flex-shrink-0 flex items-center justify-center h-8 w-8">
                          {(() => {
                            const resolvedIcon = getProductImage(prod.icon);
                            const isImg = resolvedIcon.includes('/') || resolvedIcon.includes('.') || resolvedIcon.startsWith('data:') || resolvedIcon.startsWith('http');
                            return isImg ? (
                              <img src={resolvedIcon} alt="" className="h-6 w-auto object-contain" />
                            ) : (
                              <span>{resolvedIcon}</span>
                            );
                          })()}
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs font-semibold text-white truncate">{prod.name.split(' (')[0]}</h4>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="text-xs font-bold text-[#D45B0C]">₹{prod.price}</span>
                            <span className="text-[10px] text-neutral-500 line-through">₹{prod.originalPrice}</span>
                          </div>
                        </div>
                      </div>
                      <button 
                        onClick={() => onAddToCart(prod)}
                        className={`text-[10px] font-bold px-2.5 py-1.5 rounded-md transition-all select-none cursor-pointer ${
                          isInCart 
                            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20' 
                            : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
                        }`}
                      >
                        {isInCart ? 'In Cart' : 'Add'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Dismiss Button */}
            <div className="mt-6 flex justify-end">
              <button 
                onClick={onClose}
                className="text-xs font-medium text-neutral-400 hover:text-white px-4 py-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
              >
                Dismiss Card
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
