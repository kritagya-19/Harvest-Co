import { motion } from 'motion/react';
import { ShoppingCart, Plus, Minus, Check, Star } from 'lucide-react';
import { type Product } from '../data/products';
import { getProductImage } from '../utils/imageHelper';

interface ProductCardProps {
  key?: string | number;
  product: Product;
  quantityInCart: number;
  onAddToCart: (product: { id: string; name: string; category: string; price: number; originalPrice: number; icon: string }) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  onClick?: () => void;
  className?: string;
}

export default function ProductCard({
  product,
  quantityInCart,
  onAddToCart,
  onUpdateQuantity,
  onClick,
  className = ""
}: ProductCardProps) {
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  const isInCart = quantityInCart > 0;

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={`bg-white rounded-3xl flex flex-col justify-between h-[435px] relative overflow-hidden shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-all duration-350 border border-neutral-100/80 group ${className}`}
    >
      {/* Clickable Card Area */}
      <div 
        className={`flex-1 flex flex-col p-5 ${onClick ? 'cursor-pointer' : ''}`}
        onClick={onClick}
      >
        {/* Top Meta info row: Badge and Discount */}
        <div className="flex items-center justify-between gap-2 mb-3.5 z-10 w-full">
          {product.badge ? (
            <span className="inline-flex items-center bg-emerald-900/10 text-emerald-800 text-[10px] font-bold px-3 py-1.5 rounded-full tracking-wider select-none uppercase">
              {product.badge}
            </span>
          ) : (
            <span className="inline-flex items-center bg-neutral-100 text-neutral-600 text-[10px] font-bold px-3 py-1.5 rounded-full tracking-wider select-none uppercase">
              Organic
            </span>
          )}
          {discount > 0 && (
            <span className="text-[10px] font-extrabold text-orange-700 bg-orange-50 border border-orange-100/50 px-2 py-1 rounded-lg select-none">
              -{discount}%
            </span>
          )}
        </div>

        {/* Product Media Area (Wrapper for standard sizing) */}
        <div className="flex items-center justify-center mb-5 flex-shrink-0 z-10 h-32 w-full relative group-hover:scale-105 transition-transform duration-500">
          <div className="absolute inset-0 bg-neutral-50/50 rounded-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          {(() => {
            const resolvedIcon = getProductImage(product.icon);
            const isImg = resolvedIcon.includes('/') || resolvedIcon.includes('.') || resolvedIcon.startsWith('data:') || resolvedIcon.startsWith('http');
            return isImg ? (
              <img 
                src={resolvedIcon} 
                alt={product.name} 
                className="h-28 w-auto object-contain select-none pointer-events-none drop-shadow-[0_8px_16px_rgba(0,0,0,0.06)]"
              />
            ) : (
              <span className="text-6xl select-none inline-block drop-shadow-md">
                {resolvedIcon}
              </span>
            );
          })()}
        </div>

        {/* Details Area */}
        <div className="z-10 flex-1 flex flex-col justify-start">
          {/* Rating Badge */}
          {product.rating !== undefined && (
            <div className="flex items-center gap-1.5 mb-2.5">
              <div className="flex items-center bg-amber-500/10 text-amber-600 px-2 py-0.5 rounded-full text-[10px] font-bold gap-0.5 border border-amber-500/10">
                <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                <span>{product.rating}</span>
              </div>
              {product.reviewCount !== undefined && (
                <span className="text-neutral-400 text-[10px] font-medium font-sans">
                  ({product.reviewCount.toLocaleString()} reviews)
                </span>
              )}
            </div>
          )}

          {/* Name & Size details */}
          <h3 className="font-serif text-[15px] sm:text-base font-bold text-neutral-900 leading-snug group-hover:text-[#D45B0C] transition-colors duration-250 line-clamp-2">
            {product.name}
          </h3>
          {product.weight && (
            <span className="text-xs text-neutral-400 mt-1 block font-sans font-medium">
              Net Qty: {product.weight}
            </span>
          )}
        </div>
      </div>

      {/* Footer Area: Pricing and Add-to-Cart CTA */}
      <div className="bg-neutral-50/50 border-t border-neutral-100/60 p-5 z-10 flex flex-col justify-end">
        {/* Pricing */}
        <div className="flex items-baseline gap-1.5 mb-3.5">
          <span className="text-2xl font-bold text-neutral-900 font-sans tracking-tight">₹{product.price}</span>
          {product.originalPrice > product.price && (
            <span className="text-xs text-neutral-400 line-through font-medium">₹{product.originalPrice}</span>
          )}
        </div>

        {/* Action Button / Qty Selector */}
        {isInCart ? (
          <div className="flex items-center justify-between bg-neutral-900 text-white rounded-2xl px-3 py-2.5 shadow-md shadow-neutral-900/10 transition-all duration-300">
            <button
              onClick={(e) => { e.stopPropagation(); onUpdateQuantity(product.id, -1); }}
              className="p-1 hover:bg-white/10 rounded-md transition-colors cursor-pointer text-white/80 hover:text-white"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="text-sm font-bold min-w-[1.5rem] text-center">{quantityInCart}</span>
            <button
              onClick={(e) => { e.stopPropagation(); onUpdateQuantity(product.id, 1); }}
              className="p-1 hover:bg-white/10 rounded-md transition-colors cursor-pointer text-white/80 hover:text-white"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
            <span className="text-[10px] font-bold text-emerald-400 ml-1.5 flex items-center gap-0.5 select-none bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              <Check className="h-3 w-3" /> Added
            </span>
          </div>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart({
                id: product.id,
                name: product.name,
                category: product.category,
                price: product.price,
                originalPrice: product.originalPrice,
                icon: product.icon,
              });
            }}
            className="w-full bg-[#D45B0C] hover:bg-[#B84E0A] text-white font-bold text-sm py-3.5 rounded-2xl transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-orange-950/15 group-hover:shadow-orange-950/20"
          >
            <span>Add to Cart</span>
            <ShoppingCart className="h-4 w-4" />
          </button>
        )}
      </div>
    </motion.div>
  );
}
