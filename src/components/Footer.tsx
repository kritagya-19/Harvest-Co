import { useState, FormEvent } from 'react';
import { Leaf, Truck, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FooterProps {
  onNavigateToCategory: (slug: string) => void;
}

export default function Footer({ onNavigateToCategory }: FooterProps) {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
      }, 4000);
    }
  };

  return (
    <section id="why-choose-and-footer" className="relative bg-[#FAF6F0] text-neutral-900 pb-16 z-10 border-t border-neutral-200/40">
      
      {/* Premium Split-Grid CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 pt-16">
        <div className="relative overflow-hidden bg-gradient-to-br from-[#1A3020] to-[#0D1C12] rounded-[3rem] border border-white/[0.04] p-8 sm:p-12 lg:p-16 shadow-2xl text-white">
          
          {/* Subtle light leak decoration */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/2 z-0" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            
            {/* Left side: Copy & Brand trust */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/20 px-4 py-1.5 rounded-full font-sans text-xs font-semibold tracking-wider uppercase">
                <Leaf className="h-3.5 w-3.5" />
                Join the Harvest Circle
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-white tracking-tight leading-[1.1]">
                Subscribe for <br/>
                <span className="text-[#D45B0C]">Fresh Updates</span>
              </h3>
              <p className="font-sans text-neutral-300 text-sm sm:text-base leading-relaxed font-light max-w-md">
                Subscribe to our fresh harvest updates for seasonal orchard arrivals, organic recipes, and clean living tips.
              </p>
            </div>

            {/* Right side: Email input & Quick shortcuts */}
            <div className="lg:col-span-6 space-y-8">
              
              {/* Form Input */}
              <div className="relative">
                <form onSubmit={handleSubscribe} className="relative flex items-center bg-white/[0.06] border border-white/10 rounded-full p-2 w-full shadow-inner focus-within:border-white/20 transition-colors">
                  <input 
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-transparent px-5 py-3 text-sm text-white placeholder-neutral-400 focus:outline-none min-w-0"
                  />
                  <button 
                    type="submit"
                    className="bg-[#D45B0C] hover:bg-[#B84E0A] text-white font-semibold text-sm px-7 py-3 rounded-full tracking-wide transition-all active:scale-95 cursor-pointer whitespace-nowrap shadow-md flex items-center gap-1"
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>

                <AnimatePresence>
                  {isSubscribed && (
                    <motion.p 
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="absolute text-xs font-semibold text-emerald-400 mt-2 ml-4"
                    >
                      Welcome to the Harvest circle! Thank you for subscribing. 🌾
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Quick Shopping Shortcuts Grid */}
              <div className="pt-6 border-t border-white/10">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block mb-4">
                  Or start shopping directly:
                </span>
                
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { name: "Fresh Fruits", slug: "fruits", icon: "🥭" },
                    { name: "Premium Nuts", slug: "nuts", icon: "🌰" },
                    { name: "Fruit Juices", slug: "juices", icon: "🍹" }
                  ].map(shortcut => (
                    <button
                      key={shortcut.slug}
                      onClick={() => onNavigateToCategory(shortcut.slug)}
                      className="bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] hover:border-white/10 rounded-2xl p-4 flex flex-col items-center justify-center text-center gap-2 transition-all cursor-pointer group active:scale-[0.97]"
                    >
                      <span className="text-2xl group-hover:scale-110 transition-transform">{shortcut.icon}</span>
                      <span className="font-sans text-[11px] font-semibold text-neutral-300 group-hover:text-white transition-colors">
                        {shortcut.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* Multi-Column Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-neutral-300/50 pt-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-left pb-12">
          
          {/* Column 1: Shop */}
          <div>
            <h4 className="font-serif text-sm sm:text-base font-bold text-neutral-950 mb-4 tracking-wide">
              Shop
            </h4>
            <ul className="space-y-2.5">
              {[
                { name: 'Fresh Fruits', slug: 'fruits' },
                { name: 'Premium Nuts', slug: 'nuts' },
                { name: 'Fresh Fruit Salads', slug: 'salads' },
                { name: 'Fresh Juices', slug: 'juices' },
                { name: 'Pantry Essentials', slug: null }
              ].map((item) => (
                <li key={item.name}>
                  <button 
                    onClick={() => item.slug ? onNavigateToCategory(item.slug) : document.getElementById('shop-categories')?.scrollIntoView({ behavior: 'smooth' })}
                    className="font-sans text-xs sm:text-sm text-neutral-600 hover:text-[#D45B0C] hover:underline transition-colors font-normal cursor-pointer bg-transparent border-none p-0 text-left"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Customer Service */}
          <div>
            <h4 className="font-serif text-sm sm:text-base font-bold text-neutral-950 mb-4 tracking-wide">
              Customer Service
            </h4>
            <ul className="space-y-2.5">
              {['Contact Us', 'FAQs', 'Shipping Information', 'Returns & Refunds', 'Track Your Order'].map((item) => (
                <li key={item}>
                  <a href="#" onClick={(e) => { e.preventDefault(); alert(`You clicked '${item}'. Our dedicated concierge service will guide you!`); }} className="font-sans text-xs sm:text-sm text-neutral-600 hover:text-[#D45B0C] hover:underline transition-colors font-normal">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className="font-serif text-sm sm:text-base font-bold text-neutral-950 mb-4 tracking-wide">
              Company
            </h4>
            <ul className="space-y-2.5">
              {[
                { name: 'About Harvest & Co.', highlight: true },
                { name: 'Our Story', highlight: true },
                { name: 'Sustainability', highlight: true },
                { name: 'Careers', highlight: false },
                { name: 'Blog', highlight: false }
              ].map((item) => (
                <li key={item.name}>
                  <a href="#" className={`font-sans text-xs sm:text-sm ${item.highlight ? 'text-[#D45B0C]/90 font-medium hover:text-[#B84E0A]' : 'text-neutral-600 font-normal hover:text-[#D45B0C]'} hover:underline transition-colors`}>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h4 className="font-serif text-sm sm:text-base font-bold text-neutral-950 mb-4 tracking-wide">
              Legal
            </h4>
            <ul className="space-y-2.5">
              {['Privacy Policy', 'Terms & Conditions', 'Refund Policy', 'Cookie Policy'].map((item) => (
                <li key={item}>
                  <a href="#" className="font-sans text-xs sm:text-sm text-neutral-600 hover:text-[#D45B0C] hover:underline transition-colors font-normal">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Follow Us */}
          <div>
            <h4 className="font-serif text-sm sm:text-base font-bold text-neutral-950 mb-4 tracking-wide">
              Follow Us
            </h4>
            <ul className="space-y-3">
              {[
                { name: 'Instagram', color: 'text-[#E1306C]', icon: '📸' },
                { name: 'Facebook', color: 'text-[#1877F2]', icon: '👥' },
                { name: 'Pinterest', color: 'text-[#E60023]', icon: '📌' },
                { name: 'YouTube', color: 'text-[#FF0000]', icon: '📺' }
              ].map((social) => (
                <li key={social.name}>
                  <a href="#" className="group flex items-center gap-2.5 font-sans text-xs sm:text-sm text-neutral-600 hover:text-neutral-950 transition-colors">
                    <span className={`text-base scale-95 group-hover:scale-110 transition-transform ${social.color}`}>{social.icon}</span>
                    <span className="font-normal group-hover:underline">{social.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 6: Brand Representation */}
          <div className="flex flex-col items-start justify-between min-h-[160px]">
            
            <div>
              {/* Visual leaf icon atop Harvest & Co */}
              <div className="flex items-center gap-[1px] mb-1">
                <Leaf className="h-4.5 w-4.5 text-emerald-600 fill-emerald-600/20 rotate-[12deg]" />
                <Leaf className="h-4 w-4 text-emerald-700 fill-emerald-700/10 -rotate-[35deg] -ml-1" />
              </div>
              
              {/* Styled Trademark Logo */}
              <h3 className="font-serif text-lg sm:text-xl font-bold text-neutral-900 leading-none">
                Harvest & Co.
              </h3>
              
              <p className="font-sans text-xs text-neutral-500 mt-2.5 leading-relaxed font-light max-w-[180px]">
                Bringing you the best of nature, delivered with care.
              </p>
            </div>

            {/* Payment badges */}
            <div className="flex items-center gap-2 mt-6 select-none">
              
              {/* VISA */}
              <div className="bg-[#1A1F71] text-white font-sans text-[10px] font-bold px-2.5 py-1.5 rounded-md flex items-center justify-center border border-neutral-300/40 shadow-2xs">
                <span className="italic tracking-widest text-[#F7B600]">VISA</span>
              </div>

              {/* Mastercard */}
              <div className="bg-white px-2.5 py-1.5 rounded-md flex items-center justify-center gap-0.5 border border-neutral-300/50 shadow-2xs">
                <div className="h-3 w-3 rounded-full bg-[#EB001B]" />
                <div className="h-3 w-3 rounded-full bg-[#F79E1B] -ml-1.5 opacity-90" />
              </div>

              {/* UPI */}
              <div className="bg-white border border-neutral-300/60 rounded-md px-2 py-1.5 flex items-center justify-center gap-0.5 shadow-2xs">
                <span className="font-sans text-[9px] font-bold italic tracking-tight text-[#097939]">U</span>
                <span className="font-sans text-[9px] font-bold italic tracking-tight text-[#0255A5]">P</span>
                <span className="font-sans text-[9px] font-bold italic tracking-tight text-[#EF7E22]">I</span>
              </div>

            </div>

          </div>

        </div>

        {/* Copyright Center Row */}
        <div className="border-t border-neutral-200 pt-6 pb-2 text-center w-full">
          <p className="font-sans text-xs text-neutral-400 font-normal">
            © 2025 Harvest & Co. All Rights Reserved.
          </p>
        </div>

      </div>

    </section>
  );
}
