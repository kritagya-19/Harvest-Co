import { Leaf, Heart, Calendar, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

// @ts-ignore
import freshFruitImg from '../../../assets/ff.png';
// @ts-ignore
import premiumNutsImg from '../../../assets/n.png';
// @ts-ignore
import fruitSaladImg from '../../../assets/bf.png';
// @ts-ignore
import juiceIconImg from '../../../assets/juiceicon.png';

interface CategorySectionProps {
  onNavigateToCategory: (slug: string) => void;
}

export default function CategorySection({ onNavigateToCategory }: CategorySectionProps) {
  return (
    <section id="shop-categories" className="relative bg-[#FAF6F0] text-neutral-900 pb-24 z-10">
      
      {/* Premium Smooth Vertical Gradient Transition Zone */}
      <div className="absolute top-0 left-0 right-0 h-48 -translate-y-full bg-gradient-to-b from-transparent to-[#FAF6F0] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        
        {/* Section Header */}
        <div className="text-center mb-14">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900 tracking-tight">
            Shop by Category
          </h2>
          <p className="font-sans text-neutral-500 text-sm sm:text-base mt-3 max-w-xl mx-auto font-normal">
            Everything you need for a healthier lifestyle, thoughtfully curated.
          </p>
        </div>

        {/* 3-Column Portrait Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-8">
          
          {/* Card 1: Fresh Fruits */}
          <motion.div 
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="bg-[#F5EBE1] rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-end items-center h-[380px] md:h-[420px] shadow-sm hover:shadow-md transition-all relative overflow-hidden group border border-[#EDE0D4]/30"
          >
            <img 
              src={freshFruitImg} 
              alt="Fresh Fruits" 
              className="absolute top-11 left-1/2 -translate-x-1/2 h-44 w-auto object-contain select-none pointer-events-none opacity-100 drop-shadow-[0_15px_15px_rgba(0,0,0,0.35)]"
            />
            <div className="text-center z-10 w-full">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-neutral-900 mb-2">
                Fresh Fruits
              </h3>
              <p className="font-sans text-neutral-600 text-sm leading-relaxed mb-6 max-w-[200px] mx-auto">
                Sweet, juicy, and naturally fresh.
              </p>
              <button 
                onClick={() => onNavigateToCategory('fruits')}
                className="bg-[#D45B0C] hover:bg-[#B84E0A] text-white font-medium text-sm px-8 py-3 rounded-full tracking-wide transition-all active:scale-95 cursor-pointer shadow-md"
              >
                Shop Now
              </button>
            </div>
          </motion.div>

          {/* Card 2: Premium Nuts */}
          <motion.div 
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="bg-[#F5EBE1] rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-end items-center h-[380px] md:h-[420px] shadow-sm hover:shadow-md transition-all relative overflow-hidden group border border-[#EDE0D4]/30"
          >
            <img 
              src={premiumNutsImg} 
              alt="Premium Nuts" 
              className="absolute top-11 left-1/2 -translate-x-1/2 h-44 w-auto object-contain select-none pointer-events-none opacity-100 drop-shadow-[0_15px_15px_rgba(0,0,0,0.35)]"
            />
            <div className="text-center z-10 w-full">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-neutral-900 mb-2">
                Premium Nuts
              </h3>
              <p className="font-sans text-neutral-600 text-sm leading-relaxed mb-6 max-w-[200px] mx-auto">
                Protein-rich everyday nutrition.
              </p>
              <button 
                onClick={() => onNavigateToCategory('nuts')}
                className="bg-[#D45B0C] hover:bg-[#B84E0A] text-white font-medium text-sm px-8 py-3 rounded-full tracking-wide transition-all active:scale-95 cursor-pointer shadow-md"
              >
                Explore
              </button>
            </div>
          </motion.div>

          {/* Card 3: Fresh Fruit Salads */}
          <motion.div 
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="bg-[#F5EBE1] rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-end items-center h-[380px] md:h-[420px] shadow-sm hover:shadow-md transition-all relative overflow-hidden group border border-[#EDE0D4]/30"
          >
            <img 
              src={fruitSaladImg} 
              alt="Fresh Fruit Salads" 
              className="absolute top-11 left-1/2 -translate-x-1/2 h-44 w-auto object-contain select-none pointer-events-none opacity-100 drop-shadow-[0_15px_15px_rgba(0,0,0,0.35)]"
            />
            <div className="text-center z-10 w-full">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-neutral-900 mb-2">
                Fresh Fruit Salads
              </h3>
              <p className="font-sans text-neutral-600 text-sm leading-relaxed mb-6 max-w-[200px] mx-auto">
                Made fresh daily, nutrient rich and delicious.
              </p>
              <button 
                onClick={() => onNavigateToCategory('salads')}
                className="bg-[#D45B0C] hover:bg-[#B84E0A] text-white font-medium text-sm px-8 py-3 rounded-full tracking-wide transition-all active:scale-95 cursor-pointer shadow-md"
              >
                Discover
              </button>
            </div>
          </motion.div>

        </div>

        {/* Unequal Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          
          {/* Left: Freshly Pressed (4 cols / width) */}
          <motion.div 
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            onClick={() => onNavigateToCategory('juices')}
            className="lg:col-span-4 bg-[#F5EBE1] rounded-[2.5rem] p-8 sm:p-10 flex flex-col justify-between border border-[#EDE0D4]/30 shadow-sm hover:shadow-md transition-all cursor-pointer"
          >
            <div>
              <h3 className="font-serif text-2xl font-bold text-neutral-900">
                Freshly Pressed
              </h3>
              <p className="font-sans text-neutral-600 text-sm leading-relaxed mt-3">
                Enjoy refreshing cold-pressed juices made from real fruits with no added preservatives.
              </p>
            </div>

            {/* Features list */}
            <div className="mt-8 space-y-4">
              {[
                { icon: Leaf, label: "100% Natural", color: "text-emerald-600" },
                { icon: Heart, label: "No Added Sugar", color: "text-[#D45B0C]" },
                { icon: Calendar, label: "Fresh Every Day", color: "text-blue-600" },
                { icon: Sparkles, label: "Rich in Vitamins", color: "text-amber-500" }
              ].map((item, idx) => {
                const IconComp = item.icon;
                return (
                  <div key={idx} className="flex items-center gap-3.5 group">
                    <div className="border border-neutral-300 rounded-full h-10 w-10 flex items-center justify-center bg-[#FAF6F0] shadow-sm group-hover:border-neutral-500 transition-colors">
                      <IconComp className={`h-4.5 w-4.5 ${item.color}`} />
                    </div>
                    <span className="font-sans text-neutral-800 text-sm font-medium">
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Right: Sip the Goodness of Nature (8 cols / width) */}
          <motion.div 
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            className="lg:col-span-8 bg-[#F5EBE1] rounded-[2.5rem] p-8 sm:p-12 flex flex-col justify-between items-start border border-[#EDE0D4]/30 shadow-sm hover:shadow-md transition-all relative overflow-hidden min-h-[300px]"
          >
            <img
              src={juiceIconImg}
              alt="Fresh Juices"
              className="absolute -right-2 bottom-0 h-72 w-auto object-contain select-none pointer-events-none drop-shadow-[0_15px_20px_rgba(0,0,0,0.2)] opacity-90"
            />

            <div className="max-w-xl">
              <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900 leading-[1.15] tracking-tight">
                Sip the Goodness of Nature
              </h3>
              <p className="font-sans text-neutral-600 text-sm sm:text-base mt-4 max-w-sm">
                Refreshing flavors crafted from the freshest fruits.
              </p>
            </div>

            <button 
              onClick={() => onNavigateToCategory('juices')}
              className="bg-[#D45B0C] hover:bg-[#B84E0A] text-white font-semibold text-sm px-7 py-3.5 rounded-full tracking-wide transition-all active:scale-95 cursor-pointer shadow-md mt-8 inline-flex items-center gap-2"
            >
              <span>Shop Juices</span>
              <span className="text-base font-bold">→</span>
            </button>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
