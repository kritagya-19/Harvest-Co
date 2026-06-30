import { motion, AnimatePresence } from 'motion/react';
import { X, Star, Check, Truck, Plus, Minus } from 'lucide-react';
import { getProductImage } from '../utils/imageHelper';
import { type Product } from '../data/products';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  quantityInCart: number;
  onAddToCart: (product: Product) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
}

export default function ProductModal({ product, onClose, quantityInCart, onAddToCart, onUpdateQuantity }: ProductModalProps) {
  return (
    <AnimatePresence>
      {product && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-[100] backdrop-blur-sm"
          />

          {/* Centered Modal */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 30, stiffness: 280 }}
            className="fixed inset-4 sm:inset-8 md:inset-[5%] lg:inset-x-[20%] lg:inset-y-[4%] bg-white z-[100] shadow-2xl flex flex-col overflow-hidden rounded-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 flex-shrink-0">
              <span className="text-xs font-semibold text-neutral-400 uppercase tracking-widest">Product Details</span>
              <button 
                type="button"
                onClick={onClose}
                className="p-1.5 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded-full transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto">
              {/* Product Image/Icon */}
              <div className="bg-[#FAF6F0] flex items-center justify-center py-12 sm:py-16 relative">
                {(() => {
                  const resolvedIcon = getProductImage(product.icon);
                  const isImg = resolvedIcon.includes('/') || resolvedIcon.includes('.') || resolvedIcon.startsWith('data:') || resolvedIcon.startsWith('http');
                  return isImg ? (
                    <img 
                      src={resolvedIcon} 
                      alt={product.name} 
                      className="h-28 sm:h-32 w-auto object-contain select-none pointer-events-none drop-shadow-md"
                    />
                  ) : (
                    <span className="text-8xl sm:text-9xl select-none drop-shadow-md">{resolvedIcon}</span>
                  );
                })()}
                <div className="absolute top-4 right-4 bg-[#D45B0C] text-white text-xs font-bold px-3 py-1.5 rounded-full">
                  Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                </div>
              </div>

              <div className="px-6 py-6 space-y-5">
                {product.badge && (
                  <span className="inline-block text-white text-[10px] font-bold bg-[#224229] px-3 py-1.5 rounded-full uppercase tracking-wider">
                    {product.badge}
                  </span>
                )}

                <h2 className="font-serif text-xl sm:text-2xl font-bold text-neutral-900 leading-tight">
                  {product.name}
                </h2>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-amber-500 fill-amber-500' : 'text-neutral-200'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-sm text-neutral-700 font-semibold">{product.rating}</span>
                  <span className="text-sm text-neutral-400">({product.reviewCount.toLocaleString()} reviews)</span>
                </div>

                <div className="bg-[#FFF8F3] border border-orange-100 rounded-2xl p-4 flex items-center justify-between">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl sm:text-3xl font-bold text-neutral-900 font-sans">₹{product.price}</span>
                      <span className="text-base text-neutral-400 line-through">₹{product.originalPrice}</span>
                    </div>
                    <span className="text-xs text-emerald-600 font-semibold mt-0.5 block">
                      You save ₹{product.originalPrice - product.price}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-neutral-500">Inclusive of all taxes</span>
                  </div>
                </div>

                {product.weight && (
                  <div>
                    <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-2">Size</h4>
                    <div className="inline-flex items-center gap-2 bg-neutral-50 border-2 border-neutral-900 rounded-xl px-4 py-2.5">
                      <span className="text-sm font-bold text-neutral-900">{product.weight}</span>
                      <Check className="h-3.5 w-3.5 text-neutral-900" />
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-2">About this product</h4>
                  <p className="text-sm text-neutral-700 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-2">Highlights</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map(tag => (
                      <span key={tag} className="text-xs font-medium text-neutral-700 bg-neutral-100 border border-neutral-200 px-3 py-1.5 rounded-full flex items-center gap-1.5">
                        <Check className="h-3 w-3 text-emerald-600" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <Truck className="h-5 w-5 text-emerald-700" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-emerald-900 block">Usually delivered in 1–2 days</span>
                    <span className="text-xs text-emerald-700">Free shipping on orders above ₹999</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sticky Footer: Add to Cart */}
            <div className="border-t border-neutral-100 px-6 py-4 bg-white flex-shrink-0">
              {(() => {
                if (quantityInCart > 0) {
                  return (
                    <div className="flex items-center gap-3">
                      <div className="flex items-center bg-neutral-100 rounded-xl px-3 py-2 gap-3">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(product.id, -1)}
                          className="p-1 text-neutral-600 hover:text-neutral-900 cursor-pointer"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="text-base font-bold text-neutral-900 min-w-[1.5rem] text-center">{quantityInCart}</span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(product.id, 1)}
                          className="p-1 text-neutral-600 hover:text-neutral-900 cursor-pointer"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="flex-1 bg-emerald-600 text-white font-semibold text-sm py-3.5 rounded-xl text-center flex items-center justify-center gap-2">
                        <Check className="h-4 w-4" />
                        <span>In Your Cart · ₹{product.price * quantityInCart}</span>
                      </div>
                    </div>
                  );
                }
                return (
                  <button
                    type="button"
                    onClick={() => onAddToCart(product)}
                    className="w-full bg-[#D45B0C] hover:bg-[#B84E0A] text-white font-semibold text-base py-4 rounded-xl transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-orange-900/15"
                  >
                    <Plus className="h-4.5 w-4.5" />
                    <span>Add to Cart · ₹{product.price}</span>
                  </button>
                );
              })()}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
