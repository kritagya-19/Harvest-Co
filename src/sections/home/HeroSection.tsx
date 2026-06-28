import { Leaf, ArrowRight, Truck } from 'lucide-react';
import { motion } from 'motion/react';

// @ts-ignore
import heroVideo from '../../../assets/hero.mp4';

interface HeroSectionProps {
  onPromoOpen: () => void;
}

export default function HeroSection({ onPromoOpen }: HeroSectionProps) {
  return (
    <div className="relative w-full overflow-hidden bg-black min-h-screen flex items-center">
      {/* Background Video (Edge-to-Edge) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video 
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-80"
        />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 md:pt-36 md:pb-24 lg:pt-44 lg:pb-32 w-full">
        <div className="max-w-3xl flex flex-col items-start text-left">
        
        {/* Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="inline-flex items-center gap-1.5 bg-[#D45B0C] text-white px-4 py-1.5 rounded-full font-sans text-xs font-semibold tracking-wider uppercase shadow-md select-none"
        >
          Seasonal Harvest Event • Limited Time
        </motion.div>

        {/* Heading */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
          className="font-serif text-[#EDE0D4] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.12] mt-6 select-none"
        >
          Up to 40% OFF
          <span className="block mt-2">This Season's Freshest Harvest.</span>
        </motion.h1>

        {/* Description Paragraph */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          className="text-neutral-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl mt-6 font-light"
        >
          Discover handpicked fruits, premium nuts, and wholesome pantry essentials—all thoughtfully sourced and now available at exclusive seasonal prices.
        </motion.p>

        {/* Buttons Group */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: 'easeOut' }}
          className="flex flex-wrap items-center gap-6 mt-8 w-full sm:w-auto"
        >
          {/* Primary Button */}
          <button 
            id="claim-savings-btn"
            onClick={onPromoOpen}
            className="w-full sm:w-auto text-center px-8 py-4 bg-[#D45B0C] hover:bg-[#B84E0A] text-white font-semibold rounded-full tracking-wide transition-all duration-300 shadow-xl shadow-orange-950/20 active:scale-[0.98] cursor-pointer"
          >
            Claim Your Savings
          </button>

          {/* Secondary Text Link with Arrow */}
          <button 
            id="browse-fresh-picks-btn"
            onClick={onPromoOpen}
            className="group flex items-center gap-2 text-white font-medium hover:text-[#EDE0D4] transition-colors duration-200 py-2 cursor-pointer select-none text-sm sm:text-base"
          >
            <span>Browse Fresh Picks</span>
            <ArrowRight className="h-4.5 w-4.5 group-hover:translate-x-1.5 transition-transform duration-200" />
          </button>
        </motion.div>

        {/* Footer / Benefit line */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex items-center gap-3 mt-12 sm:mt-16 text-neutral-300 select-none group"
        >
          <div className="bg-white/5 p-2 rounded-lg group-hover:bg-white/10 transition-all">
            <Truck className="h-5 w-5 text-[#D45B0C]" />
          </div>
          <span className="text-xs sm:text-sm font-medium tracking-wide">
            Free Shipping on Orders Over <span className="font-semibold text-white">₹999</span>
          </span>
        </motion.div>

      </div>
    </main>
    </div>
  );
}
