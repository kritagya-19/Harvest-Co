import { Leaf, ArrowRight, Truck } from 'lucide-react';
import { motion } from 'motion/react';

// @ts-ignore
import heroVideo from '../../../assets/hero.mp4';

interface HeroSectionProps {}

export default function HeroSection({}: HeroSectionProps) {
  return (
    <div className="relative w-full bg-black" style={{ minHeight: '100svh' }}>
      {/* Background Video — fills entire hero absolutely */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <video 
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
        />
        {/* Dark gradient overlay for text legibility */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)'
        }} />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
        style={{
          minHeight: '100svh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingTop: 'clamp(5rem, 15vw, 11rem)',
          paddingBottom: 'clamp(3rem, 8vw, 8rem)',
        }}
      >
        <div className="max-w-3xl flex flex-col items-start text-left">
        
        {/* Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="inline-flex items-center gap-1.5 bg-[#1B4332] text-[#D8F3DC] px-4 py-1.5 rounded-full font-sans text-[10px] sm:text-xs font-bold tracking-widest uppercase shadow-md select-none border border-[#2D6A4F]"
        >
          100% Organic • Chemical-Free
        </motion.div>

        {/* Heading */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
          className="font-serif text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.12] mt-6 select-none drop-shadow-lg"
        >
          Premium Organic Food,
          <span className="block mt-2 text-[#EDE0D4]">Delivered Fresh to You.</span>
        </motion.h1>

        {/* Description Paragraph */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          className="text-white/90 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl mt-6 font-medium drop-shadow-md"
        >
          Discover our handpicked collection of fresh fruits, premium nuts, delicious fruit salads, and 100% natural juices. Nature's best nutrition, safely delivered to your doorstep.
        </motion.p>

        {/* Buttons Group */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mt-8 w-full sm:w-auto"
        >
          {/* Primary Button */}
          <a 
            id="claim-savings-btn"
            href="#shop-categories"
            className="w-full sm:w-auto text-center px-8 py-4 bg-[#D45B0C] hover:bg-[#B84E0A] text-white font-semibold rounded-full tracking-wide transition-all duration-300 shadow-xl shadow-orange-950/20 active:scale-[0.98] cursor-pointer text-sm sm:text-base inline-block"
          >
            Shop Fresh Produce
          </a>

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
