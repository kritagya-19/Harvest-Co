import { ShieldCheck, Truck, Award, Sprout, Leaf } from 'lucide-react';
import { motion } from 'motion/react';

export default function WhyChooseSection() {
  return (
    <section className="relative bg-[#FAF6F0] text-neutral-900 pt-20 pb-28 z-10 border-t border-neutral-200/50">
      
      {/* Background Decorative Ambient elements */}
      <div className="absolute top-[10%] left-[-5%] w-[400px] h-[400px] bg-emerald-900/5 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] bg-amber-900/5 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 bg-[#224229]/10 text-[#224229] px-4.5 py-1.5 rounded-full font-sans text-xs font-bold tracking-wider uppercase mb-4"
          >
            Built on Trust & Integrity
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900 tracking-tight leading-[1.15]"
          >
            Why Choose Harvest & Co.?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-sans text-neutral-500 text-sm sm:text-base mt-4 leading-relaxed font-light"
          >
            We believe healthy living starts with pure food. By redefining farm-direct sourcing and holding ourselves to uncompromising quality benchmarks, we build trust in every bite.
          </motion.p>
        </div>

        {/* Premium Bento Grid Structure */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* Bento Card 1: Large Guarantee Block (Left side - Col span 6, Row span 2) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -4 }}
            className="lg:col-span-6 bg-gradient-to-br from-[#224229] to-[#14291a] text-white rounded-[2.5rem] p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden border border-white/[0.04] shadow-lg min-h-[480px]"
          >
            {/* Elegant large background twig watermark */}
            <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.6" className="absolute right-[-10%] bottom-[-10%] h-64 w-64 text-white/[0.03] pointer-events-none select-none">
              <path d="M10,90 Q50,50 90,10 M90,10 C70,30 60,60 10,90 C30,70 60,60 90,10 Z" />
              <path d="M40,60 Q50,45 65,35 M55,45 Q70,35 80,30" />
            </svg>

            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-1 bg-white/10 text-emerald-300 border border-white/10 px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-8">
                <ShieldCheck className="h-3.5 w-3.5" />
                Pure Purity Promise
              </div>

              {/* Title & Description */}
              <h3 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4 leading-tight">
                The Chemical-Free Promise
              </h3>
              <p className="font-sans text-neutral-300 text-sm leading-relaxed font-light mb-8 max-w-lg">
                Every harvest is grown, sorted, and packed without chemical ripening agents, synthetic wax coatings, or artificial preservatives. We believe food should remain as nature intended—pure, clean, and safe for your family.
              </p>
            </div>

            {/* Checklist */}
            <div className="space-y-4 border-t border-white/10 pt-8 mt-auto">
              {[
                "100% Traceable to certified local orchards",
                "Zero post-harvest ripening chemicals or sprays",
                "Independently tested for pesticide residues",
              ].map((bullet) => (
                <div key={bullet} className="flex items-center gap-3">
                  <div className="h-5 w-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-300 flex-shrink-0 text-xs">
                    ✓
                  </div>
                  <span className="font-sans text-xs sm:text-sm text-neutral-200 font-medium">
                    {bullet}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Side Cards container (Col span 6, grid within itself) */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
            
            {/* Bento Card 2: Wide Card (Top - Col span 2 on nested grid) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -4 }}
              className="sm:col-span-2 bg-white border border-[#EDE0D4]/80 rounded-[2.5rem] p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 min-h-[220px]"
            >
              <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.8" className="absolute right-0 bottom-0 h-44 w-44 text-orange-950/[0.015] pointer-events-none select-none">
                <path d="M10,90 Q50,50 90,10" />
              </svg>

              <div>
                <div className="h-11 w-11 rounded-2xl bg-[#D45B0C]/10 border border-[#D45B0C]/20 flex items-center justify-center mb-6">
                  <Truck className="h-5 w-5 text-[#D45B0C]" />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-3">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-neutral-900">
                    24-48h Farm-Direct Delivery
                  </h3>
                  <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded">
                    Ultra-Fresh
                  </span>
                </div>

                <p className="font-sans text-neutral-600 text-xs sm:text-sm leading-relaxed font-light">
                  By bypassing standard distributor warehouses, we pack your order straight at the orchard and deliver it to your doorstep. This prevents nutritional decay and preserves the premium orchard taste.
                </p>
              </div>
            </motion.div>

            {/* Bento Card 3: Small Card Left (Bottom Left) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -4 }}
              className="bg-white border border-[#EDE0D4]/80 rounded-[2.5rem] p-8 flex flex-col justify-between relative overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 min-h-[220px]"
            >
              <div>
                <div className="h-11 w-11 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6">
                  <Sprout className="h-5 w-5 text-emerald-700" />
                </div>
                
                <h3 className="font-serif text-lg sm:text-xl font-bold text-neutral-900 mb-2">
                  Certified Organic Sourcing
                </h3>
                
                <p className="font-sans text-neutral-600 text-xs leading-relaxed font-light">
                  We partner exclusively with certified growers using natural fertilizers, clean well-water irrigation, and eco-friendly soil practices.
                </p>
              </div>
            </motion.div>

            {/* Bento Card 4: Small Card Right (Bottom Right) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -4 }}
              className="bg-white border border-[#EDE0D4]/80 rounded-[2.5rem] p-8 flex flex-col justify-between relative overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 min-h-[220px]"
            >
              <div>
                <div className="h-11 w-11 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-6">
                  <Award className="h-5 w-5 text-amber-700" />
                </div>
                
                <h3 className="font-serif text-lg sm:text-xl font-bold text-neutral-900 mb-2">
                  Strict Grade-A Selection
                </h3>
                
                <p className="font-sans text-neutral-600 text-xs leading-relaxed font-light">
                  Our quality team hand-sorts every batch, selecting only the finest 1% based on size, water saturation, sugar levels, and texture.
                </p>
              </div>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
}
