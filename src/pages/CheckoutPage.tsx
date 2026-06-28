/**
 * CheckoutPage — End-to-end checkout flow for Harvest & Co.
 * 
 * Flow: Cart Review → Coupon → Delivery Address → Payment → Order Confirmed
 * 
 * Psychology:
 * - Progress indicator reduces abandonment
 * - Savings shown at every step (anchoring)
 * - Trust signals near payment
 * - Minimal fields to reduce friction
 */

import { useState } from 'react';
import {
  ArrowLeft,
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  Check,
  Truck,
  CreditCard,
  Smartphone,
  Banknote,
  Tag,
  MapPin,
  Shield,
  Sparkles,
  ChevronRight,
  Package,
  Leaf
} from 'lucide-react';
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

interface CheckoutPageProps {
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onBack: () => void;
  onOrderComplete: () => void;
}

type CheckoutStep = 'cart' | 'address' | 'payment' | 'confirmed';

interface CouponInfo {
  code: string;
  discount: number; // percentage
  label: string;
}

const validCoupons: CouponInfo[] = [
  { code: 'HARVEST40', discount: 40, label: '40% OFF — Seasonal Harvest' },
  { code: 'FRESH20', discount: 20, label: '20% OFF — Fresh Picks' },
  { code: 'WELCOME10', discount: 10, label: '10% OFF — Welcome Offer' },
];

export default function CheckoutPage({ cartItems, onUpdateQuantity, onRemoveItem, onBack, onOrderComplete }: CheckoutPageProps) {
  const [step, setStep] = useState<CheckoutStep>('cart');
  
  // Coupon
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<CouponInfo | null>(null);
  const [couponError, setCouponError] = useState('');

  // Address
  const [address, setAddress] = useState({
    fullName: '',
    phone: '',
    email: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
  });

  // Payment
  const [paymentMethod, setPaymentMethod] = useState<'razorpay' | 'cod' | null>(null);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  // Order
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderId] = useState(`HCO-${Date.now().toString(36).toUpperCase()}`);

  // Pricing calculations
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const originalTotal = cartItems.reduce((acc, item) => acc + (item.originalPrice * item.quantity), 0);
  const productSavings = originalTotal - subtotal;
  
  const couponDiscount = appliedCoupon ? Math.round(subtotal * appliedCoupon.discount / 100) : 0;
  const afterCoupon = subtotal - couponDiscount;
  
  const shippingThreshold = 999;
  const isFreeShipping = afterCoupon >= shippingThreshold;
  const shippingCost = isFreeShipping ? 0 : 99;
  
  const totalAmount = afterCoupon + shippingCost;
  const totalSavings = productSavings + couponDiscount + (isFreeShipping ? 99 : 0);

  // Coupon logic
  const handleApplyCoupon = () => {
    setCouponError('');
    const found = validCoupons.find(c => c.code === couponInput.trim().toUpperCase());
    if (found) {
      setAppliedCoupon(found);
      setCouponInput('');
    } else {
      setCouponError('Invalid coupon code. Try HARVEST40, FRESH20, or WELCOME10.');
    }
  };

  // Address validation
  const isAddressValid = address.fullName.trim() && address.phone.trim().length >= 10 && address.email.includes('@') && address.addressLine1.trim() && address.city.trim() && address.state.trim() && address.pincode.trim().length >= 5;

  // Payment validation
  const isPaymentValid = paymentMethod !== null;

  // Place order
  const handlePlaceOrder = async () => {
    setIsPlacingOrder(true);
    setPaymentError(null);

    if (paymentMethod === 'cod') {
      setTimeout(() => {
        setStep('confirmed');
        setIsPlacingOrder(false);
        onOrderComplete();
      }, 2000);
      return;
    }

    try {
      const res = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: totalAmount * 100, // amount in paise
          currency: 'INR',
          receipt: `rcpt_${orderId}`,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to create Razorpay order');
      }

      const orderData = await res.json();

      const options = {
        key: (import.meta as any).env?.VITE_RAZORPAY_KEY_ID || 'rzp_test_T7256yxlPVKisf',
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Harvest & Co.',
        description: 'Secure Online Payment',
        order_id: orderData.order_id,
        handler: async function (response: any) {
          try {
            const verifyRes = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyRes.json();
            if (verifyRes.ok && verifyData.success) {
              setStep('confirmed');
              onOrderComplete();
            } else {
              setPaymentError(verifyData.error || 'Payment signature verification failed');
            }
          } catch (err: any) {
            console.error('Payment verification error:', err);
            setPaymentError(err.message || 'Error verifying your payment signature');
          } finally {
            setIsPlacingOrder(false);
          }
        },
        prefill: {
          name: address.fullName,
          email: address.email,
          contact: address.phone,
        },
        notes: {
          address: `${address.addressLine1}, ${address.city}, ${address.state} - ${address.pincode}`,
        },
        theme: {
          color: '#D45B0C',
        },
        modal: {
          ondismiss: function () {
            setIsPlacingOrder(false);
            setPaymentError('Payment window was closed by the user.');
          },
        },
      };

      const rzp1 = new (window as any).Razorpay(options);
      rzp1.on('payment.failed', function (response: any) {
        setPaymentError(response.error.description || 'Payment execution failed');
        setIsPlacingOrder(false);
      });
      rzp1.open();
    } catch (error: any) {
      console.error('Razorpay checkout initialization error:', error);
      setPaymentError(error.message || 'Failed to initialize Razorpay checkout');
      setIsPlacingOrder(false);
    }
  };

  const steps: { key: CheckoutStep; label: string; num: number }[] = [
    { key: 'cart', label: 'Cart', num: 1 },
    { key: 'address', label: 'Address', num: 2 },
    { key: 'payment', label: 'Payment', num: 3 },
  ];

  // Format card number with spaces
  const formatCardNumber = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(.{4})/g, '$1 ').trim();
  };

  // Format expiry
  const formatExpiry = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 4);
    if (digits.length > 2) return digits.slice(0, 2) + '/' + digits.slice(2);
    return digits;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-30 bg-[#FAF6F0] overflow-y-auto"
    >
      {/* Top Header */}
      <div className="bg-white border-b border-neutral-200/60 sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <button 
            onClick={step === 'confirmed' ? () => { onOrderComplete(); onBack(); } : step === 'cart' ? onBack : () => setStep(step === 'payment' ? 'address' : 'cart')}
            className="flex items-center gap-2 text-neutral-600 hover:text-neutral-900 transition-colors text-sm font-medium cursor-pointer group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span>{step === 'confirmed' ? 'Continue Shopping' : step === 'cart' ? 'Back to Shop' : 'Back'}</span>
          </button>

          {/* Logo */}
          <div className="flex items-center gap-1 font-serif text-lg font-bold text-neutral-900 select-none">
            <Leaf className="h-4 w-4 text-emerald-600 fill-emerald-600/30" />
            <span>Harvest & Co.</span>
          </div>

          {/* Cart count */}
          <div className="flex items-center gap-1.5 text-sm text-neutral-500">
            <ShoppingCart className="h-4 w-4" />
            <span className="font-medium">{cartItems.reduce((a, i) => a + i.quantity, 0)}</span>
          </div>
        </div>

        {/* Progress Steps */}
        {step !== 'confirmed' && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-3">
            <div className="flex items-center gap-0">
              {steps.map((s, idx) => {
                const isActive = s.key === step;
                const isPast = steps.findIndex(x => x.key === step) > idx;
                return (
                  <div key={s.key} className="flex items-center flex-1 last:flex-none">
                    <div className="flex items-center gap-2">
                      <div className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        isPast ? 'bg-emerald-600 text-white' : isActive ? 'bg-[#D45B0C] text-white' : 'bg-neutral-200 text-neutral-500'
                      }`}>
                        {isPast ? <Check className="h-3.5 w-3.5" /> : s.num}
                      </div>
                      <span className={`text-xs font-semibold hidden sm:block ${isActive ? 'text-neutral-900' : isPast ? 'text-emerald-700' : 'text-neutral-400'}`}>
                        {s.label}
                      </span>
                    </div>
                    {idx < steps.length - 1 && (
                      <div className={`flex-1 h-[2px] mx-3 rounded-full ${isPast ? 'bg-emerald-400' : 'bg-neutral-200'}`} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* STEP 1: CART REVIEW */}
      {step === 'cart' && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900 mb-6">Your Cart</h1>

          {cartItems.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-neutral-200">
              <span className="text-5xl block mb-4">🛒</span>
              <h3 className="font-serif text-xl font-bold text-neutral-900 mb-2">Your cart is empty</h3>
              <p className="text-neutral-500 text-sm mb-6">Add some premium organic products to get started.</p>
              <button onClick={onBack} className="bg-[#D45B0C] hover:bg-[#B84E0A] text-white font-semibold text-sm px-6 py-3 rounded-full cursor-pointer transition-all">
                Browse Products
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left: Cart items */}
              <div className="lg:col-span-7 space-y-3">
                {cartItems.map(item => {
                  const saving = (item.originalPrice - item.price) * item.quantity;
                  return (
                    <motion.div 
                      key={item.id} 
                      layout
                      className="bg-white rounded-2xl border border-neutral-100 p-4 sm:p-5 flex items-start gap-4 group hover:border-neutral-200 transition-colors"
                    >
                      <div className="bg-[#FAF6F0] rounded-xl h-16 w-16 sm:h-20 sm:w-20 flex items-center justify-center flex-shrink-0">
                        {(() => {
                          const resolvedIcon = getProductImage(item.icon);
                          const isImg = resolvedIcon.includes('/') || resolvedIcon.includes('.') || resolvedIcon.startsWith('data:') || resolvedIcon.startsWith('http');
                          return isImg ? (
                            <img src={resolvedIcon} alt="" className="h-12 w-auto object-contain" />
                          ) : (
                            <span className="text-3xl sm:text-4xl select-none">{resolvedIcon}</span>
                          );
                        })()}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-serif text-sm sm:text-[15px] font-bold text-neutral-900 leading-snug">{item.name}</h3>
                        <span className="text-[11px] text-neutral-400">{item.category}</span>
                        
                        <div className="flex items-baseline gap-2 mt-2">
                          <span className="text-base sm:text-lg font-bold text-neutral-900 font-sans">₹{item.price * item.quantity}</span>
                          <span className="text-xs text-neutral-400 line-through">₹{item.originalPrice * item.quantity}</span>
                          {saving > 0 && (
                            <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">Save ₹{saving}</span>
                          )}
                        </div>

                        <div className="flex items-center gap-3 mt-3">
                          <div className="flex items-center bg-neutral-100 rounded-lg overflow-hidden">
                            <button onClick={() => onUpdateQuantity(item.id, -1)} className="p-1.5 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200 transition-colors cursor-pointer">
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="text-sm font-bold text-neutral-900 w-8 text-center">{item.quantity}</span>
                            <button onClick={() => onUpdateQuantity(item.id, 1)} className="p-1.5 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200 transition-colors cursor-pointer">
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <button onClick={() => onRemoveItem(item.id)} className="text-xs text-neutral-400 hover:text-red-500 transition-colors cursor-pointer flex items-center gap-1">
                            <Trash2 className="h-3 w-3" />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}

                {/* Coupon section */}
                <div className="bg-white rounded-2xl border border-neutral-100 p-4 sm:p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Tag className="h-4 w-4 text-[#D45B0C]" />
                    <span className="text-sm font-semibold text-neutral-900">Have a coupon code?</span>
                  </div>
                  
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-emerald-600" />
                        <div>
                          <span className="text-sm font-bold text-emerald-800 font-mono">{appliedCoupon.code}</span>
                          <span className="text-xs text-emerald-600 block">{appliedCoupon.label}</span>
                        </div>
                      </div>
                      <button onClick={() => setAppliedCoupon(null)} className="text-xs text-neutral-500 hover:text-red-500 cursor-pointer font-medium">
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Enter coupon code"
                          value={couponInput}
                          onChange={(e) => { setCouponInput(e.target.value.toUpperCase()); setCouponError(''); }}
                          className="flex-1 bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#D45B0C] focus:bg-white transition-all font-mono tracking-wider"
                        />
                        <button 
                          onClick={handleApplyCoupon}
                          disabled={!couponInput.trim()}
                          className="bg-neutral-900 hover:bg-neutral-800 disabled:bg-neutral-300 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-all cursor-pointer disabled:cursor-not-allowed"
                        >
                          Apply
                        </button>
                      </div>
                      {couponError && <p className="text-xs text-red-500 mt-2">{couponError}</p>}
                      <p className="text-[11px] text-neutral-400 mt-2">Try: HARVEST40, FRESH20, WELCOME10</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Right: Order Summary */}
              <div className="lg:col-span-5">
                <div className="bg-white rounded-2xl border border-neutral-100 p-5 sm:p-6 sticky top-32">
                  <h3 className="font-serif text-lg font-bold text-neutral-900 mb-5">Order Summary</h3>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between text-neutral-600">
                      <span>Subtotal ({cartItems.reduce((a, i) => a + i.quantity, 0)} items)</span>
                      <span className="font-medium">₹{subtotal}</span>
                    </div>
                    {productSavings > 0 && (
                      <div className="flex justify-between text-emerald-600">
                        <span>Product Discount</span>
                        <span className="font-medium">-₹{productSavings}</span>
                      </div>
                    )}
                    {appliedCoupon && (
                      <div className="flex justify-between text-[#D45B0C]">
                        <span>Coupon ({appliedCoupon.code})</span>
                        <span className="font-semibold">-₹{couponDiscount}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-neutral-600">
                      <span>Shipping</span>
                      <span className={isFreeShipping ? 'text-emerald-600 font-semibold' : 'font-medium'}>
                        {isFreeShipping ? 'FREE' : `₹${shippingCost}`}
                      </span>
                    </div>

                    <div className="border-t border-neutral-100 pt-3 mt-3 flex justify-between text-neutral-900 font-bold text-lg">
                      <span>Total</span>
                      <span>₹{totalAmount}</span>
                    </div>
                  </div>

                  {totalSavings > 0 && (
                    <div className="bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3 mt-4 flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                      <span className="text-xs text-emerald-800 font-semibold">You're saving ₹{totalSavings} on this order!</span>
                    </div>
                  )}

                  <button
                    onClick={() => setStep('address')}
                    disabled={cartItems.length === 0}
                    className="w-full mt-5 bg-[#D45B0C] hover:bg-[#B84E0A] disabled:bg-neutral-300 text-white font-semibold text-sm py-3.5 rounded-xl transition-all cursor-pointer disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span>Proceed to Checkout</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>

                  <div className="flex items-center justify-center gap-4 mt-4 text-neutral-400">
                    <div className="flex items-center gap-1 text-[10px]"><Shield className="h-3 w-3" /> Secure</div>
                    <div className="flex items-center gap-1 text-[10px]"><Truck className="h-3 w-3" /> Fast Delivery</div>
                    <div className="flex items-center gap-1 text-[10px]"><Package className="h-3 w-3" /> Easy Returns</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* STEP 2: DELIVERY ADDRESS */}
      {step === 'address' && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7">
              <h2 className="font-serif text-2xl font-bold text-neutral-900 mb-1">Delivery Address</h2>
              <p className="text-sm text-neutral-500 mb-6">Where should we deliver your harvest?</p>

              <div className="bg-white rounded-2xl border border-neutral-100 p-5 sm:p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-1.5 block">Full Name *</label>
                    <input type="text" value={address.fullName} onChange={(e) => setAddress(p => ({...p, fullName: e.target.value}))} placeholder="John Doe" className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#D45B0C] focus:bg-white transition-all" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-1.5 block">Phone Number *</label>
                    <input type="tel" value={address.phone} onChange={(e) => setAddress(p => ({...p, phone: e.target.value.replace(/\D/g, '').slice(0, 10)}))} placeholder="9876543210" className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#D45B0C] focus:bg-white transition-all" />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-1.5 block">Email Address *</label>
                  <input type="email" value={address.email} onChange={(e) => setAddress(p => ({...p, email: e.target.value}))} placeholder="john@example.com" className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#D45B0C] focus:bg-white transition-all" />
                </div>

                <div>
                  <label className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-1.5 block">Address Line 1 *</label>
                  <input type="text" value={address.addressLine1} onChange={(e) => setAddress(p => ({...p, addressLine1: e.target.value}))} placeholder="House No., Building, Street" className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#D45B0C] focus:bg-white transition-all" />
                </div>

                <div>
                  <label className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-1.5 block">Address Line 2</label>
                  <input type="text" value={address.addressLine2} onChange={(e) => setAddress(p => ({...p, addressLine2: e.target.value}))} placeholder="Landmark, Area (optional)" className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#D45B0C] focus:bg-white transition-all" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-1.5 block">City *</label>
                    <input type="text" value={address.city} onChange={(e) => setAddress(p => ({...p, city: e.target.value}))} placeholder="Mumbai" className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#D45B0C] focus:bg-white transition-all" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-1.5 block">State *</label>
                    <input type="text" value={address.state} onChange={(e) => setAddress(p => ({...p, state: e.target.value}))} placeholder="Maharashtra" className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#D45B0C] focus:bg-white transition-all" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-1.5 block">Pincode *</label>
                    <input type="text" value={address.pincode} onChange={(e) => setAddress(p => ({...p, pincode: e.target.value.replace(/\D/g, '').slice(0, 6)}))} placeholder="400001" className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#D45B0C] focus:bg-white transition-all" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Summary sidebar */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl border border-neutral-100 p-5 sm:p-6 sticky top-32">
                <h3 className="font-serif text-lg font-bold text-neutral-900 mb-4">Order Summary</h3>

                <div className="space-y-2.5 mb-4 max-h-48 overflow-y-auto">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex items-center gap-3 text-sm">
                      <div className="h-6 w-6 flex items-center justify-center flex-shrink-0">
                        {(() => {
                          const resolvedIcon = getProductImage(item.icon);
                          const isImg = resolvedIcon.includes('/') || resolvedIcon.includes('.') || resolvedIcon.startsWith('data:') || resolvedIcon.startsWith('http');
                          return isImg ? (
                            <img src={resolvedIcon} alt="" className="h-5 w-auto object-contain" />
                          ) : (
                            <span className="text-lg">{resolvedIcon}</span>
                          );
                        })()}
                      </div>
                      <span className="flex-1 text-neutral-700 truncate text-xs">{item.name} × {item.quantity}</span>
                      <span className="font-semibold text-neutral-900 text-xs">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-neutral-100 pt-3 space-y-2 text-sm">
                  <div className="flex justify-between text-neutral-600">
                    <span>Subtotal</span><span>₹{subtotal}</span>
                  </div>
                  {appliedCoupon && (
                    <div className="flex justify-between text-[#D45B0C]">
                      <span>Coupon</span><span>-₹{couponDiscount}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-neutral-600">
                    <span>Shipping</span><span>{isFreeShipping ? 'FREE' : `₹${shippingCost}`}</span>
                  </div>
                  <div className="border-t border-neutral-100 pt-2 flex justify-between font-bold text-neutral-900 text-base">
                    <span>Total</span><span>₹{totalAmount}</span>
                  </div>
                </div>

                <button
                  onClick={() => setStep('payment')}
                  disabled={!isAddressValid}
                  className="w-full mt-5 bg-[#D45B0C] hover:bg-[#B84E0A] disabled:bg-neutral-300 text-white font-semibold text-sm py-3.5 rounded-xl transition-all cursor-pointer disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>Continue to Payment</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
                {!isAddressValid && (
                  <p className="text-[11px] text-neutral-400 text-center mt-2">Please fill all required fields</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: PAYMENT */}
      {step === 'payment' && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7">
              <h2 className="font-serif text-2xl font-bold text-neutral-900 mb-1">Payment Method</h2>
              <p className="text-sm text-neutral-500 mb-6">Choose how you'd like to pay</p>

              <div className="space-y-3">
                {/* Razorpay */}
                <div 
                  onClick={() => { setPaymentMethod('razorpay'); setPaymentError(null); }}
                  className={`bg-white rounded-2xl border-2 p-5 cursor-pointer transition-all ${paymentMethod === 'razorpay' ? 'border-[#D45B0C] shadow-sm' : 'border-neutral-100 hover:border-neutral-300'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${paymentMethod === 'razorpay' ? 'bg-[#D45B0C]/10' : 'bg-neutral-100'}`}>
                      <CreditCard className={`h-5 w-5 ${paymentMethod === 'razorpay' ? 'text-[#D45B0C]' : 'text-neutral-500'}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-neutral-900">Online Payment (Razorpay)</h4>
                      <p className="text-xs text-neutral-500">UPI, Cards, Netbanking, Wallets</p>
                    </div>
                    <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'razorpay' ? 'border-[#D45B0C]' : 'border-neutral-300'}`}>
                      {paymentMethod === 'razorpay' && <div className="h-2.5 w-2.5 rounded-full bg-[#D45B0C]" />}
                    </div>
                  </div>
                </div>

                {/* Cash on Delivery */}
                <div 
                  onClick={() => { setPaymentMethod('cod'); setPaymentError(null); }}
                  className={`bg-white rounded-2xl border-2 p-5 cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-[#D45B0C] shadow-sm' : 'border-neutral-100 hover:border-neutral-300'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${paymentMethod === 'cod' ? 'bg-[#D45B0C]/10' : 'bg-neutral-100'}`}>
                      <Banknote className={`h-5 w-5 ${paymentMethod === 'cod' ? 'text-[#D45B0C]' : 'text-neutral-500'}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-neutral-900">Cash on Delivery</h4>
                      <p className="text-xs text-neutral-500">Pay when your order arrives</p>
                    </div>
                    <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'cod' ? 'border-[#D45B0C]' : 'border-neutral-300'}`}>
                      {paymentMethod === 'cod' && <div className="h-2.5 w-2.5 rounded-full bg-[#D45B0C]" />}
                    </div>
                  </div>

                  <AnimatePresence>
                    {paymentMethod === 'cod' && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="mt-4 pt-4 border-t border-neutral-100">
                          <div className="bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 flex items-start gap-2">
                            <Banknote className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                            <p className="text-xs text-amber-800 leading-relaxed">
                              Please keep exact change of <strong>₹{totalAmount}</strong> ready at the time of delivery. Our delivery partner will collect the payment.
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {paymentError && (
                <div className="mt-4 bg-red-50 border border-red-200 text-red-800 text-xs rounded-xl p-4">
                  <strong>Payment Failed:</strong> {paymentError}
                </div>
              )}

              <div className="flex items-center gap-3 mt-5 px-2">
                <Shield className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                <p className="text-[11px] text-neutral-500 leading-relaxed">
                  Your payment information is encrypted and secure. We never store your card details.
                </p>
              </div>
            </div>

            {/* Right: Final summary */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl border border-neutral-100 p-5 sm:p-6 sticky top-32">
                <h3 className="font-serif text-lg font-bold text-neutral-900 mb-4">Order Details</h3>

                <div className="bg-neutral-50 rounded-xl p-3.5 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-3.5 w-3.5 text-[#D45B0C]" />
                    <span className="text-xs font-semibold text-neutral-700">Delivering to</span>
                    <button onClick={() => setStep('address')} className="text-[10px] text-[#D45B0C] font-semibold ml-auto cursor-pointer hover:underline">Edit</button>
                  </div>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    {address.fullName}, {address.phone}<br />
                    {address.addressLine1}{address.addressLine2 ? `, ${address.addressLine2}` : ''}<br />
                    {address.city}, {address.state} - {address.pincode}
                  </p>
                </div>

                <div className="space-y-2 mb-4 max-h-36 overflow-y-auto">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex items-center gap-2 text-xs">
                      <div className="h-5 w-5 flex items-center justify-center flex-shrink-0">
                        {(() => {
                          const resolvedIcon = getProductImage(item.icon);
                          const isImg = resolvedIcon.includes('/') || resolvedIcon.includes('.') || resolvedIcon.startsWith('data:') || resolvedIcon.startsWith('http');
                          return isImg ? (
                            <img src={resolvedIcon} alt="" className="h-4 w-auto object-contain" />
                          ) : (
                            <span className="text-base">{resolvedIcon}</span>
                          );
                        })()}
                      </div>
                      <span className="flex-1 text-neutral-600 truncate">{item.name} × {item.quantity}</span>
                      <span className="font-semibold text-neutral-900">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-neutral-100 pt-3 space-y-2 text-sm">
                  <div className="flex justify-between text-neutral-600"><span>Subtotal</span><span>₹{subtotal}</span></div>
                  {appliedCoupon && (
                    <div className="flex justify-between text-[#D45B0C]"><span>Coupon ({appliedCoupon.code})</span><span>-₹{couponDiscount}</span></div>
                  )}
                  <div className="flex justify-between text-neutral-600"><span>Shipping</span><span>{isFreeShipping ? 'FREE' : `₹${shippingCost}`}</span></div>
                  <div className="border-t border-neutral-100 pt-2 flex justify-between font-bold text-neutral-900 text-lg">
                    <span>Pay</span><span>₹{totalAmount}</span>
                  </div>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  disabled={!isPaymentValid || isPlacingOrder}
                  className="w-full mt-5 bg-[#D45B0C] hover:bg-[#B84E0A] disabled:bg-neutral-300 text-white font-semibold text-sm py-4 rounded-xl transition-all cursor-pointer disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-orange-900/10"
                >
                  {isPlacingOrder ? (
                    <>
                      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <Shield className="h-4 w-4" />
                      <span>Place Order · ₹{totalAmount}</span>
                    </>
                  )}
                </button>
                {!isPaymentValid && (
                  <p className="text-[11px] text-neutral-400 text-center mt-2">Select a payment method</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 4: ORDER CONFIRMED */}
      {step === 'confirmed' && (
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
          >
            <div className="mx-auto mb-6 h-24 w-24 rounded-full bg-emerald-100 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
              >
                <Check className="h-12 w-12 text-emerald-600" />
              </motion.div>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900 mb-3">Order Confirmed!</h1>
            <p className="text-neutral-500 text-sm sm:text-base leading-relaxed mb-2">
              Thank you for shopping with Harvest & Co.
            </p>
            <p className="text-xs text-neutral-400 mb-8">Order ID: <span className="font-mono font-semibold text-neutral-700">{orderId}</span></p>

            <div className="bg-white rounded-2xl border border-neutral-100 p-6 text-left mb-8 shadow-sm">
              <h3 className="font-serif text-base font-bold text-neutral-900 mb-4">Order Summary</h3>
              
              <div className="space-y-2.5 mb-4">
                {cartItems.map(item => (
                  <div key={item.id} className="flex items-center gap-3 text-sm">
                    <div className="h-6 w-6 flex items-center justify-center flex-shrink-0">
                      {(() => {
                        const resolvedIcon = getProductImage(item.icon);
                        const isImg = resolvedIcon.includes('/') || resolvedIcon.includes('.') || resolvedIcon.startsWith('data:') || resolvedIcon.startsWith('http');
                        return isImg ? (
                          <img src={resolvedIcon} alt="" className="h-5 w-auto object-contain" />
                        ) : (
                          <span className="text-xl">{resolvedIcon}</span>
                        );
                      })()}
                    </div>
                    <span className="flex-1 text-neutral-700 text-xs">{item.name} × {item.quantity}</span>
                    <span className="font-semibold text-neutral-900 text-xs">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-neutral-100 pt-3 space-y-2 text-xs text-neutral-600">
                <div className="flex justify-between"><span>Subtotal</span><span>₹{subtotal}</span></div>
                {appliedCoupon && (
                  <div className="flex justify-between text-[#D45B0C]"><span>Coupon Discount</span><span>-₹{couponDiscount}</span></div>
                )}
                <div className="flex justify-between"><span>Shipping</span><span>{isFreeShipping ? 'FREE' : `₹${shippingCost}`}</span></div>
                <div className="border-t border-neutral-100 pt-2 flex justify-between font-bold text-neutral-900 text-sm">
                  <span>Amount Paid</span><span>₹{totalAmount}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-neutral-100 p-6 text-left mb-8 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                {paymentMethod === 'razorpay' && <CreditCard className="h-4 w-4 text-[#D45B0C]" />}
                {paymentMethod === 'cod' && <Banknote className="h-4 w-4 text-[#D45B0C]" />}
                <h3 className="font-serif text-base font-bold text-neutral-900">Payment</h3>
              </div>
              <p className="text-sm text-neutral-600">
                {paymentMethod === 'razorpay' && 'Online Payment (Razorpay)'}
                {paymentMethod === 'cod' && 'Cash on Delivery'}
              </p>
            </div>

            <button
              onClick={() => { onOrderComplete(); onBack(); }}
              className="bg-[#D45B0C] hover:bg-[#B84E0A] text-white font-semibold text-sm px-8 py-4 rounded-full transition-all cursor-pointer shadow-lg inline-flex items-center gap-2"
            >
              <Sparkles className="h-4 w-4" />
              <span>Continue Shopping</span>
            </button>

            <p className="text-xs text-neutral-400 mt-4">
              A confirmation email will be sent to <span className="font-medium text-neutral-600">{address.email}</span>
            </p>
          </motion.div>
        </div>
      )}

    </motion.div>
  );
}
