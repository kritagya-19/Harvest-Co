import { ShoppingCart, X, Minus, Plus, Trash2, Sparkles } from 'lucide-react';
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

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
  onResetCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  onResetCart
}: CartDrawerProps) {
  // Calculate Subtotals and savings
  const cartSubtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const cartOriginalSubtotal = cartItems.reduce((acc, item) => acc + (item.originalPrice * item.quantity), 0);
  const totalSavings = cartOriginalSubtotal - cartSubtotal;

  // Shipping rules
  const shippingThreshold = 999;
  const isFreeShipping = cartSubtotal >= shippingThreshold;
  const shippingCost = isFreeShipping ? 0 : 99;
  const grandTotal = cartSubtotal + shippingCost;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-50 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-zinc-950 border-l border-white/[0.08] z-50 p-6 flex flex-col justify-between shadow-2xl"
          >
            {/* Drawer Header */}
            <div>
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5 text-[#D45B0C]" />
                  <h2 className="text-lg font-serif font-bold text-white">Your Seasonal Cart</h2>
                </div>
                <button 
                  onClick={onClose}
                  className="p-1.5 text-neutral-400 hover:text-white hover:bg-white/5 rounded-full transition-colors cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Free Shipping Progress Indicator */}
              <div className="mt-4 bg-white/[0.03] border border-white/[0.05] p-3.5 rounded-xl">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-neutral-400 font-medium">Free Shipping Progress</span>
                  <span className="text-white font-semibold">
                    {isFreeShipping ? 'Unlocked! 🎉' : `₹${shippingThreshold - cartSubtotal} away`}
                  </span>
                </div>
                <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-500 rounded-full ${isFreeShipping ? 'bg-emerald-500' : 'bg-[#D45B0C]'}`}
                    style={{ width: `${Math.min((cartSubtotal / shippingThreshold) * 100, 100)}%` }}
                  />
                </div>
                <p className="text-[10px] text-neutral-400 mt-2 text-center">
                  Add items up to <span className="text-white font-medium">₹999</span> to unlock free delivery!
                </p>
              </div>

              {/* Cart Items List */}
              <div className="mt-6 space-y-4 overflow-y-auto max-h-[50vh] pr-1">
                {cartItems.length === 0 ? (
                  <div className="text-center py-12 text-neutral-500 space-y-3">
                    <span className="text-4xl">🛒</span>
                    <p className="text-sm">Your harvest cart is empty</p>
                    <button 
                      onClick={onResetCart} 
                      className="text-xs text-[#D45B0C] hover:underline cursor-pointer"
                    >
                      Reset to reference values
                    </button>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 bg-white/[0.02] hover:bg-white/[0.04] p-3 rounded-xl border border-white/[0.05] transition-colors">
                      <div className="text-2xl p-1 select-none flex-shrink-0 flex items-center justify-center h-10 w-10">
                        {(() => {
                          const resolvedIcon = getProductImage(item.icon);
                          const isImg = resolvedIcon.includes('/') || resolvedIcon.includes('.') || resolvedIcon.startsWith('data:') || resolvedIcon.startsWith('http');
                          return isImg ? (
                            <img src={resolvedIcon} alt="" className="h-8 w-auto object-contain" />
                          ) : (
                            <span>{resolvedIcon}</span>
                          );
                        })()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-white truncate">{item.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm font-semibold text-white">₹{item.price}</span>
                          <span className="text-xs text-neutral-500 line-through">₹{item.originalPrice}</span>
                          <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded font-medium">
                            Save {Math.round(((item.originalPrice - item.price)/item.originalPrice)*100)}%
                          </span>
                        </div>
                      </div>

                      {/* Quantity controls */}
                      <div className="flex items-center gap-1.5 bg-neutral-900 px-2 py-1 rounded-lg border border-white/5">
                        <button 
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="p-0.5 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="text-xs font-semibold w-5 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="p-0.5 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      {/* Remove item button */}
                      <button 
                        onClick={() => onRemoveItem(item.id)}
                        className="p-1.5 text-neutral-500 hover:text-red-400 hover:bg-red-500/5 rounded-lg transition-colors cursor-pointer"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Drawer Footer Checkout Summary */}
            <div className="border-t border-white/[0.08] pt-4 mt-4 bg-zinc-950 space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-neutral-400">
                  <span>Subtotal</span>
                  <span>₹{cartSubtotal}</span>
                </div>
                {totalSavings > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Total Savings</span>
                    <span>- ₹{totalSavings}</span>
                  </div>
                )}
                <div className="flex justify-between text-neutral-400">
                  <span>Shipping</span>
                  <span>{isFreeShipping ? 'FREE' : `₹${shippingCost}`}</span>
                </div>
                <div className="flex justify-between text-white font-semibold text-base border-t border-white/5 pt-2 mt-1">
                  <span>Total</span>
                  <span className="text-[#D45B0C]">₹{grandTotal}</span>
                </div>
              </div>

              <button 
                onClick={onCheckout}
                disabled={cartItems.length === 0}
                className="w-full bg-[#D45B0C] hover:bg-[#B84E0A] disabled:bg-neutral-800 disabled:text-neutral-500 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl transition-all shadow-lg shadow-orange-950/20 text-center cursor-pointer flex items-center justify-center gap-2"
              >
                <Sparkles className="h-4.5 w-4.5" />
                <span>Secure Checkout</span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
