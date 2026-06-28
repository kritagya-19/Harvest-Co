import { motion } from 'motion/react';
import ProductCard from '../../components/ProductCard';
import { allProducts } from '../../data/products';

interface CartItem {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  quantity: number;
  icon: string;
}

interface BestSellersSectionProps {
  cartItems: CartItem[];
  onAddToCart: (product: { id: string; name: string; category: string; price: number; originalPrice: number; icon: string }) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  onNavigateToCategory?: (slug: string) => void;
}

// Pick the top product from each category (one per: fruits, nuts, salads, juices)
const FEATURED_IDS = [
  'fruit-1',   // Organic Alphonso Mangoes (fruits)
  'nut-7',     // Organic Mixed Nuts Premium (nuts)
  'salad-1',   // Classic Tropical Mix Bowl (salads)
  'juice-2',   // Alphonso Mango Nectar (juices)
];

const featuredProducts = FEATURED_IDS
  .map(id => allProducts.find(p => p.id === id))
  .filter(Boolean) as typeof allProducts;

const CATEGORY_LABELS: Record<string, { emoji: string; label: string; color: string }> = {
  fruits:  { emoji: '🍊', label: 'Fresh Fruits',  color: '#D45B0C' },
  nuts:    { emoji: '🌰', label: 'Premium Nuts',  color: '#8B5E3C' },
  salads:  { emoji: '🥗', label: 'Fruit Salads',  color: '#2D8B46' },
  juices:  { emoji: '🍹', label: 'Fresh Juices',  color: '#C74B16' },
};

export default function BestSellersSection({
  cartItems,
  onAddToCart,
  onUpdateQuantity,
  onNavigateToCategory,
}: BestSellersSectionProps) {
  return (
    <section id="best-sellers-section" className="relative bg-[#F7F7F7] text-neutral-900 pb-28 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-block text-[11px] font-bold uppercase tracking-[0.15em] text-[#D45B0C] bg-orange-50 border border-orange-100 px-4 py-1.5 rounded-full mb-4"
          >
            Handpicked For You
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900 tracking-tight"
          >
            Our Best Sellers
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="font-sans text-neutral-500 text-sm sm:text-base mt-3 font-normal max-w-md mx-auto"
          >
            One favourite from each category — the best of Harvest & Co.
          </motion.p>
        </div>

        {/* Product Cards Grid */}
        <div className="relative">
          {/* Nav Arrow — Left */}
          <button
            onClick={() => {
              const el = document.getElementById('best-sellers-scroll-container');
              if (el) el.scrollBy({ left: -320, behavior: 'smooth' });
            }}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 lg:-translate-x-6 z-20 bg-white border border-neutral-200 rounded-full h-10 w-10 sm:h-11 sm:w-11 flex items-center justify-center text-neutral-600 hover:text-neutral-900 hover:border-neutral-400 shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer lg:hidden"
            aria-label="Previous"
          >
            <span className="text-lg">‹</span>
          </button>

          {/* Nav Arrow — Right */}
          <button
            onClick={() => {
              const el = document.getElementById('best-sellers-scroll-container');
              if (el) el.scrollBy({ left: 320, behavior: 'smooth' });
            }}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 lg:translate-x-6 z-20 bg-white border border-neutral-200 rounded-full h-10 w-10 sm:h-11 sm:w-11 flex items-center justify-center text-neutral-600 hover:text-neutral-900 hover:border-neutral-400 shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer lg:hidden"
            aria-label="Next"
          >
            <span className="text-lg">›</span>
          </button>

          {/* Cards */}
          <div
            id="best-sellers-scroll-container"
            className="flex overflow-x-auto gap-5 pb-4 pt-2 px-1 snap-x snap-mandatory scrollbar-none scroll-smooth lg:grid lg:grid-cols-4 lg:overflow-x-visible"
          >
            {featuredProducts.map((product, idx) => {
              const cartItem = cartItems.find(item => item.id === product.id);
              const quantityInCart = cartItem ? cartItem.quantity : 0;
              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="min-w-[272px] sm:min-w-[300px] lg:min-w-0 snap-start flex flex-col"
                >
                  <ProductCard
                    product={product}
                    quantityInCart={quantityInCart}
                    onAddToCart={onAddToCart}
                    onUpdateQuantity={onUpdateQuantity}
                    onClick={() => onNavigateToCategory?.(product.categorySlug)}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-neutral-400 text-sm mb-4">Explore the full range across all categories</p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {Object.entries(CATEGORY_LABELS).map(([slug, meta]) => (
              <button
                key={slug}
                onClick={() => onNavigateToCategory?.(slug)}
                className="flex items-center gap-2 text-sm font-semibold text-neutral-700 hover:text-neutral-900 bg-white border border-neutral-200 hover:border-neutral-300 px-5 py-2.5 rounded-full transition-all hover:shadow-sm cursor-pointer"
              >
                {meta.emoji} {meta.label}
              </button>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
